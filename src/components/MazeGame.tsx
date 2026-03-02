import { useState, useEffect, useCallback, useRef } from "react";
import { characterMap } from "@/data/characters";
import { stepSound, collectKey, hitEnemy, questComplete, getCharacterSfx } from "@/lib/retroSfx";

// ── Maze map (20×15) ──
// 0=floor, 1=wall, 2=key, 3=bureaucrat(enemy), 4=start, 5=exit
const COLS = 20;
const ROWS = 15;
const TILE = 32;

const BASE_MAP: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,4,0,0,1,0,0,0,1,0,0,3,0,0,1,0,0,0,0,1],
  [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1,0,1,1,0,1],
  [1,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,1],
  [1,0,1,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,1,1,1],
  [1,0,0,0,0,3,1,0,0,0,0,0,1,0,3,0,0,0,0,1],
  [1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1],
  [1,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,1],
  [1,1,1,0,1,1,1,0,1,0,1,1,1,1,0,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,1,0,0,0,1,0,0,1,0,0,0,1],
  [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1,1,1,0,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

// Enemy types that wander
type Enemy = { x: number; y: number; dir: number };

const ENEMY_NAMES = ["Lobbyist", "Bureaucrat", "Billionaire"];

interface MazeGameProps {
  characterId: string;
  onComplete: () => void;
}

export const MazeGame = ({ characterId, onComplete }: MazeGameProps) => {
  const character = characterMap[characterId];
  const charSfx = getCharacterSfx(characterId);
  
  const [playerPos, setPlayerPos] = useState({ x: 1, y: 1 });
  const [hasKey, setHasKey] = useState(false);
  const [gameMap, setGameMap] = useState(() => BASE_MAP.map(r => [...r]));
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [hp, setHp] = useState(3);
  const [flash, setFlash] = useState(false);
  const [message, setMessage] = useState("Find the 🔑 KEY to unlock the petition!");
  const animFrame = useRef<number>(0);
  const lastEnemyMove = useRef(0);

  // Init enemies from map
  useEffect(() => {
    const e: Enemy[] = [];
    BASE_MAP.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 3) e.push({ x, y, dir: Math.floor(Math.random() * 4) });
    }));
    setEnemies(e);
  }, []);

  // Enemy movement loop
  useEffect(() => {
    if (gameOver || won) return;
    const interval = setInterval(() => {
      setEnemies(prev => prev.map(e => {
        const dirs = [[0,-1],[0,1],[-1,0],[1,0]];
        // Try current direction, random on wall
        let attempts = 0;
        let dir = e.dir;
        while (attempts < 4) {
          const nx = e.x + dirs[dir][0];
          const ny = e.y + dirs[dir][1];
          if (nx >= 0 && nx < COLS && ny >= 0 && ny < ROWS && gameMap[ny][nx] !== 1) {
            return { x: nx, y: ny, dir };
          }
          dir = Math.floor(Math.random() * 4);
          attempts++;
        }
        return e;
      }));
    }, 500);
    return () => clearInterval(interval);
  }, [gameOver, won, gameMap]);

  // Check enemy collision
  useEffect(() => {
    if (gameOver || won) return;
    const hit = enemies.some(e => e.x === playerPos.x && e.y === playerPos.y);
    if (hit) {
      hitEnemy();
      setFlash(true);
      setTimeout(() => setFlash(false), 200);
      setHp(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setGameOver(true);
          setMessage("💀 GAME OVER — The bureaucrats got you!");
        } else {
          setMessage(`⚠️ Hit! ${next} HP remaining`);
        }
        return next;
      });
    }
  }, [playerPos, enemies, gameOver, won]);

  const move = useCallback((dx: number, dy: number) => {
    if (gameOver || won) return;
    const nx = playerPos.x + dx;
    const ny = playerPos.y + dy;
    if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) return;
    if (gameMap[ny][nx] === 1) return;

    stepSound();
    
    if (gameMap[ny][nx] === 2) {
      collectKey();
      setHasKey(true);
      setMessage("🔑 KEY FOUND! Now find the exit... wait, there's no exit — the KEY IS the victory!");
      const newMap = gameMap.map(r => [...r]);
      newMap[ny][nx] = 0;
      setGameMap(newMap);
      
      // Won!
      setTimeout(() => {
        questComplete();
        setWon(true);
        setMessage("🏆 QUEST COMPLETE! You unlocked the petition!");
      }, 600);
    }
    
    setPlayerPos({ x: nx, y: ny });
  }, [playerPos, gameMap, gameOver, won]);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp": case "w": case "W": e.preventDefault(); move(0, -1); break;
        case "ArrowDown": case "s": case "S": e.preventDefault(); move(0, 1); break;
        case "ArrowLeft": case "a": case "A": e.preventDefault(); move(-1, 0); break;
        case "ArrowRight": case "d": case "D": e.preventDefault(); move(1, 0); break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [move]);

  const restart = () => {
    setPlayerPos({ x: 1, y: 1 });
    setHasKey(false);
    setGameMap(BASE_MAP.map(r => [...r]));
    setGameOver(false);
    setWon(false);
    setHp(3);
    setMessage("Find the 🔑 KEY to unlock the petition!");
    const e: Enemy[] = [];
    BASE_MAP.forEach((row, y) => row.forEach((cell, x) => {
      if (cell === 3) e.push({ x, y, dir: Math.floor(Math.random() * 4) });
    }));
    setEnemies(e);
  };

  // Tile colors
  const getTileColor = (cell: number) => {
    switch (cell) {
      case 1: return "hsl(228 35% 22%)";
      case 2: return "hsl(45 100% 60%)";
      default: return "hsl(228 40% 12%)";
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-8 scanline-overlay">
      <div className="container max-w-3xl">
        {/* HUD */}
        <div className="ff-panel p-4 mb-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {character && (
              <img src={character.image} alt={character.title} className="w-8 h-8 object-contain" style={{ imageRendering: "pixelated" }} />
            )}
            <div>
              <div className="font-heading text-[8px] uppercase text-foreground">{character?.name ?? "Hero"}</div>
              <div className="font-body text-[10px] text-primary uppercase">{character?.title ?? "Adventurer"}</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span className="font-body text-[10px] uppercase text-muted-foreground">HP</span>
              <div className="flex gap-0.5">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className={`w-4 h-2 rounded-sm ${i < hp ? "hp-bar" : "bg-muted"}`} />
                ))}
              </div>
            </div>
            <div className="ff-panel px-2 py-1 font-body text-[10px] uppercase text-accent">
              {hasKey ? "🔑 KEY" : "🔒 NO KEY"}
            </div>
          </div>
        </div>

        {/* Message */}
        <div className={`ff-panel p-3 mb-4 text-center font-body text-xs ${won ? "text-accent" : gameOver ? "text-destructive" : "text-muted-foreground"}`}>
          {message}
        </div>

        {/* Game Canvas */}
        <div
          className={`ff-panel p-2 mx-auto overflow-auto transition-all ${flash ? "border-destructive" : ""}`}
          style={{ maxWidth: COLS * TILE + 16 }}
        >
          <div
            className="relative"
            style={{
              width: COLS * TILE,
              height: ROWS * TILE,
              imageRendering: "pixelated",
            }}
          >
            {/* Tiles */}
            {gameMap.map((row, y) =>
              row.map((cell, x) => (
                <div
                  key={`${x}-${y}`}
                  className="absolute"
                  style={{
                    left: x * TILE,
                    top: y * TILE,
                    width: TILE,
                    height: TILE,
                    backgroundColor: getTileColor(cell),
                    border: cell === 1 ? "1px solid hsl(210 50% 30%)" : "1px solid hsl(228 30% 15%)",
                  }}
                >
                  {cell === 2 && (
                    <span className="absolute inset-0 flex items-center justify-center text-sm animate-pulse-gold">🔑</span>
                  )}
                </div>
              ))
            )}

            {/* Enemies */}
            {enemies.map((e, i) => (
              <div
                key={`enemy-${i}`}
                className="absolute flex items-center justify-center transition-all duration-400"
                style={{
                  left: e.x * TILE,
                  top: e.y * TILE,
                  width: TILE,
                  height: TILE,
                  fontSize: 18,
                }}
                title={ENEMY_NAMES[i % ENEMY_NAMES.length]}
              >
                👔
              </div>
            ))}

            {/* Player */}
            <div
              className="absolute transition-all duration-100 flex items-center justify-center"
              style={{
                left: playerPos.x * TILE,
                top: playerPos.y * TILE,
                width: TILE,
                height: TILE,
                zIndex: 10,
              }}
            >
              {character ? (
                <img
                  src={character.image}
                  alt={character.title}
                  className="w-7 h-7 object-contain drop-shadow-[0_0_4px_hsl(var(--accent)/0.6)]"
                  style={{ imageRendering: "pixelated" }}
                />
              ) : (
                <span className="text-lg">⚔️</span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="mt-4 flex flex-col items-center gap-1 md:hidden">
          <button onClick={() => move(0, -1)} className="ff-panel w-12 h-12 font-heading text-xs text-foreground active:text-accent">▲</button>
          <div className="flex gap-1">
            <button onClick={() => move(-1, 0)} className="ff-panel w-12 h-12 font-heading text-xs text-foreground active:text-accent">◄</button>
            <button onClick={() => move(0, 1)} className="ff-panel w-12 h-12 font-heading text-xs text-foreground active:text-accent">▼</button>
            <button onClick={() => move(1, 0)} className="ff-panel w-12 h-12 font-heading text-xs text-foreground active:text-accent">►</button>
          </div>
        </div>

        {/* Controls hint */}
        <div className="text-center mt-3 font-body text-[10px] uppercase text-muted-foreground hidden md:block">
          Use Arrow Keys or WASD to move — Avoid the 👔 bureaucrats!
        </div>

        {/* Win / Game Over buttons */}
        {(won || gameOver) && (
          <div className="mt-6 flex justify-center gap-4 animate-fade-in">
            {gameOver && (
              <button onClick={restart} className="ff-panel px-6 py-3 font-heading text-[10px] uppercase text-foreground hover:text-accent hover:border-accent transition-colors">
                ▶ Try Again
              </button>
            )}
            {won && (
              <button
                onClick={() => { charSfx(); onComplete(); }}
                className="ff-panel px-6 py-3 font-heading text-[10px] uppercase text-accent animate-pulse-gold"
                style={{ borderColor: "hsl(var(--accent))" }}
              >
                ▶ Claim Reward — Sign the Petition
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
