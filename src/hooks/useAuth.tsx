import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  postal_code: string | null;
  total_xp: number;
  impact_score: number;
  missions_completed: number;
  selected_character: string | null;
};

type PendingXP = { actionType: string; missionId: string; xp: number };

const PENDING_XP_KEY = "pendingXP";

function getPendingXP(): PendingXP[] {
  try {
    return JSON.parse(localStorage.getItem(PENDING_XP_KEY) || "[]");
  } catch {
    return [];
  }
}

function addPendingXP(entry: PendingXP) {
  const queue = getPendingXP();
  queue.push(entry);
  localStorage.setItem(PENDING_XP_KEY, JSON.stringify(queue));
}

function clearPendingXP() {
  localStorage.removeItem(PENDING_XP_KEY);
}

/** Returns total queued XP for anonymous display purposes */
export function getLocalXP(): number {
  return getPendingXP().reduce((sum, e) => sum + e.xp, 0);
}

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, postalCode: string) => Promise<{ error: string | null }>;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  addXP: (actionType: string, missionId: string, xp: number) => Promise<void>;
  refreshProfile: () => Promise<void>;
  setCharacter: (characterId: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();
    if (data) setProfile(data as Profile);
  };

  // Flush queued anonymous XP to DB
  const syncPendingXP = async (userId: string) => {
    const queue = getPendingXP();
    if (queue.length === 0) return;

    // Insert all queued actions
    const rows = queue.map((e) => ({
      user_id: userId,
      action_type: e.actionType,
      mission_id: e.missionId,
      xp_earned: e.xp,
    }));
    await supabase.from("xp_actions").insert(rows);

    // Sum and add to profile total
    const totalQueued = queue.reduce((s, e) => s + e.xp, 0);
    const { data: current } = await supabase
      .from("profiles")
      .select("total_xp")
      .eq("id", userId)
      .single();
    await supabase
      .from("profiles")
      .update({ total_xp: (current?.total_xp ?? 0) + totalQueued })
      .eq("id", userId);

    clearPendingXP();
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (session?.user) {
          setTimeout(async () => {
            await syncPendingXP(session.user.id);
            await fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        syncPendingXP(session.user.id).then(() => fetchProfile(session.user.id));
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, postalCode: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { postal_code: postalCode },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error: error?.message ?? null };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error?.message ?? null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  const addXP = async (actionType: string, missionId: string, xp: number) => {
    if (!user) {
      // Queue for later sync
      addPendingXP({ actionType, missionId, xp });
      return;
    }
    await supabase.from("xp_actions").insert({
      user_id: user.id,
      action_type: actionType,
      mission_id: missionId,
      xp_earned: xp,
    });
    await supabase
      .from("profiles")
      .update({ total_xp: (profile?.total_xp ?? 0) + xp })
      .eq("id", user.id);
    await fetchProfile(user.id);
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  const setCharacter = async (characterId: string) => {
    if (!user) return;
    localStorage.setItem("selectedCharacter", characterId);
    await supabase
      .from("profiles")
      .update({ selected_character: characterId } as any)
      .eq("id", user.id);
    await fetchProfile(user.id);
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, signUp, signIn, signOut, addXP, refreshProfile, setCharacter }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
