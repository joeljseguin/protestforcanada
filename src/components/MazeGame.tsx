import { useState, useEffect, useCallback, useRef } from "react";
import { characterMap } from "@/data/characters";
import { stepSound, collectKey, hitEnemy, questComplete, getCharacterSfx } from "@/lib/retroSfx";
import { Sword, Wand2, Target, Rocket, ArrowLeft, Volume2, VolumeX } from "lucide-react";
import { startGameMusic, stopGameMusic, setMusicMood, isMusicPlaying } from "@/lib/gameMusicEngine";
import { Link } from "react-router-dom";
import { PixelCharacter } from "@/components/maze/PixelCharacter";
import { PixelTree } from "@/components/maze/PixelTree";
import { PixelChest } from "@/components/maze/PixelChest";

// ── Maze map (16×12 for fullscreen feel) ──
// 0=grass, 1=tree, 2=key, 3=enemy, 4=start, 5=path-dirt, 6=treasure chest
const COLS = 16;
const ROWS = 12;

const BASE_MAP: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,4,5,0,1,6,0,5,1,0,5,0,0,1,0,1],
  [1,0,1,0,1,0,1,0,0,0,1,1,0,1,5,1],
  [1,5,1,0,5,0,1,5,1,0,0,0,5,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,0,1,1,1,0,1],
  [1,0,0,3,0,0,0,0,0,1,0,0,3,0,0,1],
  [1,1,1,0,1,1,1,5,1,1,1,0,1,1,0,1],
  [1,0,5,0,0,0,1,0,0,0,5,0,1,0,5,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,0,0,1,1],
  [1,6,0,0,1,0,5,0,0,3,1,0,1,0,6,1],
  [1,5,1,0,0,0,1,1,1,0,0,0,1,5,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// Enemy data
type Enemy = {
  x: number;
  y: number;
  dir: number;
  type: "lobbyist" | "bureaucrat" | "billionaire";
  hp: number;
  stunned: number; // ticks remaining stunned
};

const ENEMY_CONFIG = {
  lobbyist:    { emoji: "🧑‍💼", label: "Lobbyist",    color: "hsl(25 90% 55%)" },
  bureaucrat:  { emoji: "👨‍⚖️", label: "Bureaucrat",  color: "hsl(0 72% 50%)" },
  billionaire: { emoji: "🎩",  label: "Billionaire", color: "hsl(280 60% 50%)" },
};
const ENEMY_TYPES: Array<"lobbyist" | "bureaucrat" | "billionaire"> = ["lobbyist", "bureaucrat", "billionaire"];

// Pixel tree variations for visual interest
const TREE_VARIANTS_IDX = [0, 1, 2];

interface MazeGameProps {
  characterId: string;
  onComplete: () => void;
  onXP?: (xp: number) => void;
}

const ATTACK_ICONS: Record<string, React.ReactNode> = {
  swordsmaster: <Sword className="h-5 w-5" />,
  wizard: <Wand2 className="h-5 w-5" />,
  archer: <Target className="h-5 w-5" />,
  astronaut: <Rocket className="h-5 w-5" />,
};

const ATTACK_LABELS: Record<string, string> = {
  swordsmaster: "SLASH",
  wizard: "SPELL",
  archer: "SHOOT",
  astronaut: "BLAST",
};

export const MazeGame = ({ characterId, onComplete, onXP }: MazeGameProps) => {
  const character = characterMap[characterId];
  const charSfx = getCharacterSfx(characterId);
  const containerRef = useRef<HTMLDivElement>(null);

  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [playerDir, setPlayerDir] = useState<"up" | "down" | "left" | "right">("down");
  const [hasKey, setHasKey] = useState(false);
  const [gameMap, setGameMap] = useState(() => BASE_MAP.map(r => [...r]));
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hp, setHp] = useState(5);
  const [flash, setFlash] = useState(false);
  const [attacking, setAttacking] = useState(false);
  const [attackPos, setAttackPos] = useState<{ x: number; y: number } | null>(null);
  const [message, setMessage] = useState("Find the 🔑 KEY in the forest!");
  const [score, setScore] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [musicOn, setMusicOn] = useState(true);
  const musicStartedRef = useRef(false);

  // Auto-start music on first user interaction (browser requires user gesture for audio)
  useEffect(() => {
    const startOnInteraction = () => {
      if (!musicStartedRef.current) {
        musicStartedRef.current = true;
        startGameMusic();
      }
    };
    window.addEventListener("keydown", startOnInteraction, { once: true });
    window.addEventListener("pointerdown", startOnInteraction, { once: true });
    return () => {
      stopGameMusic();
      window.removeEventListener("keydown", startOnInteraction);
      window.removeEventListener("pointerdown", startOnInteraction);
    };
  }, []);

  // Enemy proximity → mood change
  useEffect(() => {
    if (!musicOn || gameOver || won) return;
    const DANGER_DIST = 4;
    const nearEnemy = enemies.some(e => {
      if (e.stunned > 0 || e.hp <= 0) return false;
      const dist = Math.abs(e.x - playerPos.x) + Math.abs(e.y - playerPos.y);
      return dist <= DANGER_DIST;
    });
    setMusicMood(nearEnemy ? "tense" : "peaceful");
  }, [playerPos, enemies, musicOn, gameOver, won]);

  const toggleMusic = () => {
    if (isMusicPlaying()) {
      stopGameMusic();
      setMusicOn(false);
    } else {
      startGameMusic();
      setMusicOn(true);
    }
  };

  // Auto-focus
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  // Init enemies from map
  useEffect(() => {
    const e: Enemy[] = [];
    BASE_MAP.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 3) e.push({ x, y, dir: Math.floor(Math.random() * 4), type: ENEMY_TYPES[e.length % 3], hp: 3, stunned: 0 });
    }));
    setEnemies(e);
  }, []);

  // Enemy movement loop
  useEffect(() => {
    if (gameOver || won) return;
    const interval = setInterval(() => {
      setEnemies(prev => prev.map(e => {
        if (e.stunned > 0) return { ...e, stunned: e.stunned - 1 };
        const dirs = [[0, -1], [0, 1], [-1, 0], [1, 0]];
        let attempts = 0;
        let dir = e.dir;
        // 30% chance to change direction randomly
        if (Math.random() < 0.3) dir = Math.floor(Math.random() * 4);
        while (attempts < 4) {
          const nx = e.x + dirs[dir][0];
          const ny = e.y + dirs[dir][1];
          if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && gameMap[ny][nx] !== 1) {
            return { ...e, x: nx, y: ny, dir };
          }
          dir = Math.floor(Math.random() * 4);
          attempts++;
        }
        return e;
      }));
    }, 600);
    return () => clearInterval(interval);
  }, [gameOver, won, gameMap]);

  // Check enemy collision
  useEffect(() => {
    if (gameOver || won) return;
    const hit = enemies.find(e => e.x === playerPos.x && e.y === playerPos.y && e.stunned === 0);
    if (hit) {
      hitEnemy();
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
      setHp(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setGameOver(true);
          setMessage(`💀 GAME OVER — The ${hit.type} got you!`);
        } else {
          setMessage(`⚠️ ${ENEMY_CONFIG[hit.type].label} attacks! ${next} HP left`);
        }
        return next;
      });
    }
  }, [playerPos, enemies, gameOver, won]);

  const move = useCallback((dx: number, dy: number) => {
    if (gameOver || won) return;
    const dirMap: Record<string, "up" | "down" | "left" | "right"> = {
      "0,-1": "up", "0,1": "down", "-1,0": "left", "1,0": "right",
    };
    setPlayerDir(dirMap[`${dx},${dy}`] || "down");

    const nx = playerPos.x + dx;
    const ny = playerPos.y + dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
    if (gameMap[ny][nx] === 1) return;

    stepSound();
    
    // Trigger walking animation
    setIsMoving(true);
    if (moveTimeoutRef.current) clearTimeout(moveTimeoutRef.current);
    moveTimeoutRef.current = setTimeout(() => setIsMoving(false), 250);

    // Treasure chest
    if (gameMap[ny][nx] === 6) {
      collectKey();
      setScore(s => s + 10);
      setMessage("💰 Treasure chest! +10 XP");
      onXP?.(10);
      const newMap = gameMap.map(r => [...r]);
      newMap[ny][nx] = 0;
      setGameMap(newMap);
    }

    // Key
    if (gameMap[ny][nx] === 2) {
      collectKey();
      setHasKey(true);
      setMessage("🔑 KEY FOUND! Quest complete!");
      const newMap = gameMap.map(r => [...r]);
      newMap[ny][nx] = 5;
      setGameMap(newMap);
      setTimeout(() => {
        questComplete();
        setWon(true);
        setMessage("🏆 QUEST COMPLETE! You unlocked the petition!");
      }, 600);
    }

    setPlayerPos({ x: nx, y: ny });
  }, [playerPos, gameMap, gameOver, won]);

  // Attack action
  const attack = useCallback(() => {
    if (gameOver || won || attacking) return;
    charSfx();
    setAttacking(true);

    const dirOffsets: Record<string, [number, number]> = {
      up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0],
    };
    const [dx, dy] = dirOffsets[playerDir];
    const ax = playerPos.x + dx;
    const ay = playerPos.y + dy;
    setAttackPos({ x: ax, y: ay });

    // Hit enemies in attack range
    setEnemies(prev => prev.map(e => {
      if (e.x === ax && e.y === ay) {
        hitEnemy();
        const newHp = e.hp - 1;
        if (newHp <= 0) {
          setScore(s => s + 50);
          setMessage(`⚔️ ${ENEMY_CONFIG[e.type].label} defeated! +50 pts`);
          return { ...e, hp: 0, stunned: 999 }; // effectively dead
        }
        setMessage(`💥 Hit the ${ENEMY_CONFIG[e.type].label}!`);
        return { ...e, hp: newHp, stunned: 3 };
      }
      return e;
    }).filter(e => e.hp > 0));

    setTimeout(() => {
      setAttacking(false);
      setAttackPos(null);
    }, 200);
  }, [playerPos, playerDir, gameOver, won, attacking, charSfx]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": case "w": case "W": e.preventDefault(); move(0, -1); break;
        case "ArrowDown": case "s": case "S": e.preventDefault(); move(0, 1); break;
        case "ArrowLeft": case "a": case "A": e.preventDefault(); move(-1, 0); break;
        case "ArrowRight": case "d": case "D": e.preventDefault(); move(1, 0); break;
        case " ": case "Enter": e.preventDefault(); attack(); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move, attack]);

  const restart = () => {
    setPlayerPos({ x: 1, y: 1 });
    setPlayerDir("down");
    setHasKey(false);
    setGameMap(BASE_MAP.map(r => [...r]));
    setGameOver(false);
    setWon(false);
    setHp(5);
    setAttacking(false);
    setAttackPos(null);
    setScore(0);
    setMessage("Find the 🔑 KEY in the forest!");
    const e: Enemy[] = [];
    BASE_MAP.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 3) e.push({ x, y, dir: Math.floor(Math.random() * 4), type: ENEMY_TYPES[e.length % 3], hp: 3, stunned: 0 });
    }));
    setEnemies(e);
  };

  // Calc tile size to fill viewport
  const [tileSize, setTileSize] = useState(32);
  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      const h = window.innerHeight - 140; // HUD + controls
      const ts = Math.floor(Math.min(w / COLS, h / ROWS));
      setTileSize(Math.max(24, Math.min(ts, 56)));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  // Direction arrow for player sprite
  const dirArrow: Record<string, string> = { up: "↑", down: "↓", left: "←", right: "→" };

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      className="flex flex-col h-[100dvh] bg-background outline-none"
      style={{ imageRendering: "pixelated" }}
    >
      {/* HUD Bar */}
      <div className="shrink-0 ff-panel rounded-none border-x-0 border-t-0 px-3 py-2 flex items-center justify-between gap-2 z-20">
        <div className="flex items-center gap-2">
          {character && (
            <img src={character.image} alt={character.title} className="w-7 h-7 object-contain" style={{ imageRendering: "pixelated" }} />
          )}
          <span className="font-heading text-[7px] uppercase text-foreground">{character?.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="font-body text-[9px] uppercase text-muted-foreground">HP</span>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-xs ${i < hp ? "" : "opacity-20"}`}>{i < hp ? "❤️" : "🖤"}</span>
            ))}
          </div>
          <div className="ff-panel px-2 py-0.5 font-body text-[9px] uppercase text-accent">
            {hasKey ? "🔑" : "🔒"}
          </div>
          <div className="font-body text-[9px] text-accent uppercase">
            {score} pts
          </div>
          <button
            onClick={toggleMusic}
            className="ff-panel px-2 py-0.5 flex items-center gap-1 font-heading text-[7px] uppercase text-muted-foreground hover:text-accent hover:border-accent transition-colors"
            title={musicOn ? "Mute music" : "Play music"}
          >
            {musicOn ? <Volume2 className="h-3 w-3" /> : <VolumeX className="h-3 w-3" />}
          </button>
        </div>
      </div>

      {/* Back button — centered */}
      <Link
        to="/quest"
        className="shrink-0 flex items-center justify-center gap-2 py-2 bg-muted/40 border-b border-border text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        <span className="font-heading text-[9px] uppercase">Back to Missions</span>
      </Link>

      {/* Message Bar */}
      <div className={`shrink-0 px-3 py-1.5 text-center font-body text-[10px] border-b border-border ${won ? "text-accent bg-accent/10" : gameOver ? "text-destructive bg-destructive/10" : "text-muted-foreground bg-muted/30"}`}>
        {message}
      </div>

      {/* Game World — fills remaining space */}
      <div className={`flex-1 flex items-center justify-center overflow-hidden transition-all ${flash ? "bg-destructive/20" : "bg-[hsl(140_25%_12%)]"}`}>
        <div
          className="relative"
          style={{
            width: COLS * tileSize,
            height: ROWS * tileSize,
          }}
        >
          {/* Tiles */}
          {gameMap.map((row, y) =>
            row.map((cell, x) => {
              const isGrass = cell === 0 || cell === 3 || cell === 4 || cell === 6;
              const isDirt = cell === 5;
              const isTree = cell === 1;
              const isKey = cell === 2;
              const isChest = cell === 6;
              // Checkerboard grass
              const grassShade = (x + y) % 2 === 0 ? "hsl(120 30% 18%)" : "hsl(120 25% 15%)";
              const dirtShade = (x + y) % 2 === 0 ? "hsl(35 30% 22%)" : "hsl(35 25% 19%)";

              return (
                <div
                  key={`${x}-${y}`}
                  className="absolute flex items-center justify-center select-none"
                  style={{
                    left: x * tileSize,
                    top: y * tileSize,
                    width: tileSize,
                    height: tileSize,
                    backgroundColor: isTree ? "hsl(120 20% 12%)" : isDirt ? dirtShade : isGrass ? grassShade : grassShade,
                    fontSize: tileSize * 0.7,
                    lineHeight: 1,
                  }}
                >
                  {isTree && <PixelTree size={tileSize * 0.85} variant={(x * 3 + y * 7) % 3} />}
                  {isKey && <span className="animate-pulse-gold">🔑</span>}
                  {isChest && <PixelChest size={tileSize * 0.85} />}
                </div>
              );
            })
          )}

          {/* Attack effect */}
          {attackPos && (
            <div
              className="absolute flex items-center justify-center z-20 pointer-events-none animate-scale-in"
              style={{
                left: attackPos.x * tileSize,
                top: attackPos.y * tileSize,
                width: tileSize,
                height: tileSize,
                fontSize: tileSize * 0.6,
              }}
            >
              {characterId === "swordsmaster" && "⚔️"}
              {characterId === "wizard" && "✨"}
              {characterId === "archer" && "🏹"}
              {characterId === "astronaut" && "💫"}
            </div>
          )}

          {/* Enemies */}
          {enemies.map((e, i) => {
            const cfg = ENEMY_CONFIG[e.type];
            return (
              <div
                key={`enemy-${i}`}
                className={`absolute flex flex-col items-center justify-center transition-all duration-300 ${e.stunned > 0 ? "opacity-40" : ""}`}
                style={{
                  left: e.x * tileSize,
                  top: e.y * tileSize,
                  width: tileSize,
                  height: tileSize,
                  zIndex: 5,
                }}
              >
                <span style={{ fontSize: tileSize * 0.55 }}>{cfg.emoji}</span>
                {/* HP pips */}
                <div className="flex gap-px mt-px">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div
                      key={j}
                      className="rounded-full"
                      style={{
                        width: Math.max(3, tileSize * 0.1),
                        height: Math.max(3, tileSize * 0.1),
                        backgroundColor: j < e.hp ? cfg.color : "hsl(0 0% 30%)",
                      }}
                    />
                  ))}
                </div>
                {/* Name plate */}
                <span
                  className="font-heading uppercase leading-none text-center"
                  style={{
                    fontSize: Math.max(5, tileSize * 0.16),
                    color: cfg.color,
                    textShadow: "0 1px 2px hsl(0 0% 0% / 0.8)",
                  }}
                >
                  {cfg.label}
                </span>
              </div>
            );
          })}

          {/* Player */}
          <div
            className="absolute flex flex-col items-center justify-center transition-all duration-100"
            style={{
              left: playerPos.x * tileSize,
              top: playerPos.y * tileSize,
              width: tileSize,
              height: tileSize,
              zIndex: 10,
            }}
          >
            {character ? (
              <PixelCharacter
                characterId={characterId}
                direction={playerDir}
                isMoving={isMoving}
                isAttacking={attacking}
                size={tileSize * 0.9}
              />
            ) : (
              <PixelCharacter
                characterId="swordsmaster"
                direction={playerDir}
                isMoving={isMoving}
                isAttacking={attacking}
                size={tileSize * 0.9}
              />
            )}
          </div>
        </div>
      </div>

      {/* Controls — always visible */}
      <div className="shrink-0 bg-background border-t border-border px-4 py-3">
        {(won || gameOver) ? (
          <div className="flex justify-center gap-3">
            {gameOver && (
              <button onClick={restart} className="ff-panel px-5 py-3 font-heading text-[9px] uppercase text-foreground hover:text-accent hover:border-accent transition-colors">
                ▶ Try Again
              </button>
            )}
            {won && (
              <button
                onClick={() => { charSfx(); onComplete(); }}
                className="ff-panel px-5 py-3 font-heading text-[9px] uppercase text-accent animate-pulse-gold"
                style={{ borderColor: "hsl(var(--accent))" }}
              >
                ▶ Claim Reward — Sign the Petition
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-6">
            {/* D-Pad */}
            <div className="flex flex-col items-center gap-0.5">
              <button
                onClick={() => move(0, -1)}
                className="ff-panel w-11 h-11 flex items-center justify-center font-heading text-base text-foreground active:text-accent active:border-accent transition-colors"
              >
                ▲
              </button>
              <div className="flex gap-0.5">
                <button
                  onClick={() => move(-1, 0)}
                  className="ff-panel w-11 h-11 flex items-center justify-center font-heading text-base text-foreground active:text-accent active:border-accent transition-colors"
                >
                  ◄
                </button>
                <div className="w-11 h-11 flex items-center justify-center text-[8px] font-body text-muted-foreground uppercase">
                  move
                </div>
                <button
                  onClick={() => move(1, 0)}
                  className="ff-panel w-11 h-11 flex items-center justify-center font-heading text-base text-foreground active:text-accent active:border-accent transition-colors"
                >
                  ►
                </button>
              </div>
              <button
                onClick={() => move(0, 1)}
                className="ff-panel w-11 h-11 flex items-center justify-center font-heading text-base text-foreground active:text-accent active:border-accent transition-colors"
              >
                ▼
              </button>
            </div>

            {/* Attack Button */}
            <button
              onClick={attack}
              disabled={attacking}
              className={`ff-panel w-16 h-16 flex flex-col items-center justify-center gap-1 transition-all ${
                attacking
                  ? "text-accent border-accent scale-95"
                  : "text-primary hover:text-accent hover:border-accent active:scale-95"
              }`}
              style={attacking ? { borderColor: "hsl(var(--accent))" } : {}}
            >
              {ATTACK_ICONS[characterId] || <Sword className="h-5 w-5" />}
              <span className="font-heading text-[7px] uppercase">
                {ATTACK_LABELS[characterId] || "ATK"}
              </span>
            </button>
          </div>
        )}

        {/* Keyboard hint on desktop */}
        <div className="text-center mt-2 font-body text-[8px] uppercase text-muted-foreground hidden md:block">
          Arrow Keys / WASD to move — Space / Enter to attack
        </div>
      </div>
    </div>
  );
};
