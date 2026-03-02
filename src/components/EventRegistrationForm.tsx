import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { CalendarEvent } from "@/data/gameData";
import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().max(500).optional(),
});

type Props = {
  event: CalendarEvent;
  onClose: () => void;
};

export const EventRegistrationForm = ({ event, onClose }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registrationSchema.safeParse({ name, email, message });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    try {
      // Insert registration into the database
      const { error: dbError } = await supabase.from("event_registrations").insert({
        event_id: event.id,
        event_title: event.title,
        user_id: user?.id || null,
        registrant_name: result.data.name,
        registrant_email: result.data.email,
        message: result.data.message || null,
        organizer_email: event.organizerEmail,
        organizer_name: event.organizer,
      });

      if (dbError) throw dbError;

      // Send notification email to organizer via edge function
      const { error: emailError } = await supabase.functions.invoke("notify-organizer", {
        body: {
          organizerEmail: event.organizerEmail,
          organizerName: event.organizer,
          eventTitle: event.title,
          eventDate: event.date,
          eventLocation: event.location,
          registrantName: result.data.name,
          registrantEmail: result.data.email,
          registrantMessage: result.data.message || "",
        },
      });

      if (emailError) {
        console.warn("Email notification failed, registration saved:", emailError);
      }

      setSuccess(true);
      toast({
        title: "Registered!",
        description: `You're signed up for "${event.title}". The organizer has been notified.`,
      });
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({
        title: "Error",
        description: err.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border-t border-border p-6 bg-muted/50 animate-fade-in">
        <div className="text-center space-y-3">
          <CheckCircle2 className="h-10 w-10 mx-auto text-green-600" />
          <div className="font-heading font-extrabold text-xl uppercase">You're In!</div>
          <p className="font-mono text-xs text-muted-foreground">
            Registration confirmed for <span className="font-bold">{event.title}</span>.
            <br />The organizer ({event.organizer}) has been notified.
          </p>
          <Button variant="outline" onClick={onClose} className="neu-border font-mono text-xs uppercase">
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-border p-6 bg-muted/50 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-heading font-extrabold uppercase text-sm">
          Register — {event.title}
        </h5>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 max-w-md">
        <div>
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="neu-border font-mono text-sm"
            maxLength={100}
          />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="neu-border font-mono text-sm"
            maxLength={255}
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
        <div>
          <Textarea
            placeholder="Message to organizer (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="neu-border font-mono text-sm min-h-[60px]"
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          className="w-full neu-border neu-shadow-sm font-mono uppercase tracking-wider text-xs gap-2"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {loading ? "Registering..." : "Register & Notify Organizer"}
        </Button>
        <p className="text-[10px] text-muted-foreground font-mono">
          Your info will be shared with <strong>{event.organizer}</strong> ({event.organizerEmail}).
        </p>
      </form>
    </div>
  );
};
