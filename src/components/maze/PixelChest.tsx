import { useEffect, useState } from "react";

interface PixelChestProps {
  size: number;
}

// Pirate treasure chest (8x8) — top-down with gold coins visible
// 0=transparent, 1=dark wood, 2=wood, 3=gold band, 4=gold coins, 5=lock/clasp
const CHEST_FRAME_1 = [
  [0,0,1,3,3,1,0,0],
  [0,1,2,3,3,2,1,0],
  [1,2,2,5,5,2,2,1],
  [1,2,4,4,4,4,2,1],
  [1,2,4,4,4,4,2,1],
  [1,2,2,2,2,2,2,1],
  [0,1,2,2,2,2,1,0],
  [0,0,1,1,1,1,0,0],
];

const CHEST_FRAME_2 = [
  [0,0,1,3,3,1,0,0],
  [0,1,2,3,3,2,1,0],
  [1,2,2,5,5,2,2,1],
  [1,2,4,4,4,4,2,1],
  [1,2,4,4,4,4,2,1],
  [1,2,2,2,2,2,2,1],
  [0,1,2,2,2,2,1,0],
  [0,0,1,1,1,1,0,0],
];

const PALETTE = {
  0: "transparent",
  1: "#3a2010", // dark wood
  2: "#6b4420", // wood
  3: "#dda520", // gold band
  4: "#ffdd44", // gold coins
  5: "#cccccc", // lock silver
};

export const PixelChest = ({ size }: PixelChestProps) => {
  const [shine, setShine] = useState(false);
  const pixelSize = size / 8;

  // Sparkle animation
  useEffect(() => {
    const interval = setInterval(() => setShine(s => !s), 600);
    return () => clearInterval(interval);
  }, []);

  const pixels = shine ? CHEST_FRAME_1 : CHEST_FRAME_2;

  return (
    <div style={{ width: size, height: size, position: "relative", imageRendering: "pixelated" }}>
      {pixels.map((row, y) =>
        row.map((colorIdx, x) => {
          if (colorIdx === 0) return null;
          // Add sparkle to gold coins
          const isGold = colorIdx === 4;
          const sparkle = isGold && shine && (x + y) % 3 === 0;
          return (
            <div
              key={`${x}-${y}`}
              style={{
                position: "absolute",
                left: x * pixelSize,
                top: y * pixelSize,
                width: pixelSize + 0.5,
                height: pixelSize + 0.5,
                backgroundColor: sparkle ? "#ffffff" : PALETTE[colorIdx as keyof typeof PALETTE],
                transition: "background-color 0.2s",
              }}
            />
          );
        })
      )}
    </div>
  );
};
