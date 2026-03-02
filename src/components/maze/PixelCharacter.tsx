import { useEffect, useState } from "react";

interface PixelCharacterProps {
  characterId: string;
  direction: "up" | "down" | "left" | "right";
  isMoving: boolean;
  isAttacking: boolean;
  size: number;
}

// 8x8 pixel art frames for knight character (each frame is a 2D array of color indices)
// Colors: 0=transparent, 1=skin, 2=armor, 3=dark, 4=highlight, 5=sword, 6=hair, 7=boots
const PALETTE: Record<string, Record<number, string>> = {
  swordsmaster: {
    0: "transparent",
    1: "#f0b088", // skin
    2: "#4488cc", // armor blue
    3: "#223344", // dark
    4: "#66aadd", // highlight
    5: "#cccccc", // sword silver
    6: "#885522", // hair
    7: "#443322", // boots
  },
  wizard: {
    0: "transparent",
    1: "#f0b088",
    2: "#7744aa", // purple robe
    3: "#332255",
    4: "#9966cc",
    5: "#ffdd44", // staff gold
    6: "#cccccc", // white hair
    7: "#554433",
  },
  archer: {
    0: "transparent",
    1: "#f0b088",
    2: "#44aa44", // green tunic
    3: "#224422",
    4: "#66cc66",
    5: "#886633", // bow brown
    6: "#cc6622", // red hair
    7: "#443322",
  },
  astronaut: {
    0: "transparent",
    1: "#f0b088",
    2: "#ccccdd", // suit white
    3: "#555566",
    4: "#ffffff",
    5: "#44aaff", // visor blue
    6: "#334455",
    7: "#666677",
  },
};

// Down-facing frames (8x8), frame 1 and frame 2 for walk cycle
const FRAMES_DOWN = [
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,1,1,6,0,0],
    [0,0,1,1,1,1,0,0],
    [0,2,2,2,2,2,2,0],
    [0,2,4,2,2,4,2,0],
    [0,0,2,2,2,2,0,0],
    [0,0,7,0,0,7,0,0],
    [0,0,3,0,0,3,0,0],
  ],
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,1,1,6,0,0],
    [0,0,1,1,1,1,0,0],
    [0,2,2,2,2,2,2,0],
    [0,2,4,2,2,4,2,0],
    [0,0,2,2,2,2,0,0],
    [0,7,0,0,0,0,7,0],
    [0,3,0,0,0,0,3,0],
  ],
];

const FRAMES_UP = [
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,6,6,6,0,0],
    [0,0,3,3,3,3,0,0],
    [0,2,2,2,2,2,2,0],
    [0,2,3,2,2,3,2,0],
    [0,0,2,2,2,2,0,0],
    [0,0,7,0,0,7,0,0],
    [0,0,3,0,0,3,0,0],
  ],
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,6,6,6,0,0],
    [0,0,3,3,3,3,0,0],
    [0,2,2,2,2,2,2,0],
    [0,2,3,2,2,3,2,0],
    [0,0,2,2,2,2,0,0],
    [0,7,0,0,0,0,7,0],
    [0,3,0,0,0,0,3,0],
  ],
];

const FRAMES_SIDE = [
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,1,1,0,0,0],
    [0,0,1,1,1,0,0,0],
    [0,0,2,2,2,2,0,0],
    [0,0,2,4,2,2,0,0],
    [0,0,2,2,2,0,0,0],
    [0,0,0,7,0,7,0,0],
    [0,0,0,3,0,3,0,0],
  ],
  [
    [0,0,0,6,6,0,0,0],
    [0,0,6,1,1,0,0,0],
    [0,0,1,1,1,0,0,0],
    [0,0,2,2,2,2,0,0],
    [0,0,2,4,2,2,0,0],
    [0,0,2,2,2,0,0,0],
    [0,0,7,0,0,0,7,0],
    [0,0,3,0,0,0,3,0],
  ],
];

// Attack frame - sword extended (side view)
const FRAME_ATTACK = [
  [0,0,0,6,6,0,0,0],
  [0,0,6,1,1,0,0,0],
  [0,0,1,1,1,0,0,0],
  [5,5,2,2,2,2,0,0],
  [5,0,2,4,2,2,0,0],
  [0,0,2,2,2,0,0,0],
  [0,0,7,0,0,7,0,0],
  [0,0,3,0,0,3,0,0],
];

export const PixelCharacter = ({ characterId, direction, isMoving, isAttacking, size }: PixelCharacterProps) => {
  const [frame, setFrame] = useState(0);
  const palette = PALETTE[characterId] || PALETTE.swordsmaster;
  const pixelSize = size / 8;

  // Walk animation cycle
  useEffect(() => {
    if (!isMoving) { setFrame(0); return; }
    const interval = setInterval(() => setFrame(f => (f + 1) % 2), 180);
    return () => clearInterval(interval);
  }, [isMoving]);

  let pixels: number[][];
  if (isAttacking) {
    pixels = FRAME_ATTACK;
  } else if (direction === "up") {
    pixels = FRAMES_UP[frame];
  } else if (direction === "left" || direction === "right") {
    pixels = FRAMES_SIDE[frame];
  } else {
    pixels = FRAMES_DOWN[frame];
  }

  const mirrorX = direction === "left";

  return (
    <div
      style={{
        width: size,
        height: size,
        transform: mirrorX ? "scaleX(-1)" : undefined,
        imageRendering: "pixelated",
        position: "relative",
      }}
    >
      {pixels.map((row, y) =>
        row.map((colorIdx, x) => {
          if (colorIdx === 0) return null;
          return (
            <div
              key={`${x}-${y}`}
              style={{
                position: "absolute",
                left: x * pixelSize,
                top: y * pixelSize,
                width: pixelSize + 0.5,
                height: pixelSize + 0.5,
                backgroundColor: palette[colorIdx],
              }}
            />
          );
        })
      )}
    </div>
  );
};
