interface PixelTreeProps {
  size: number;
  variant: number; // 0-2 for visual variety
}

// Top-down view trees (8x8 pixel grids)
// Colors: 0=transparent, 1=dark green, 2=green, 3=light green, 4=trunk brown
const TREE_FRAMES = [
  // Round bushy tree (top-down)
  [
    [0,0,1,2,2,1,0,0],
    [0,1,2,3,3,2,1,0],
    [1,2,3,3,3,3,2,1],
    [2,3,3,4,4,3,3,2],
    [2,3,3,4,4,3,3,2],
    [1,2,3,3,3,3,2,1],
    [0,1,2,3,3,2,1,0],
    [0,0,1,2,2,1,0,0],
  ],
  // Pine tree (top-down, star pattern)
  [
    [0,0,0,1,1,0,0,0],
    [0,0,1,2,2,1,0,0],
    [0,1,2,3,3,2,1,0],
    [1,2,3,4,4,3,2,1],
    [1,2,3,4,4,3,2,1],
    [0,1,2,3,3,2,1,0],
    [0,0,1,2,2,1,0,0],
    [0,0,0,1,1,0,0,0],
  ],
  // Dense canopy tree
  [
    [0,1,1,2,2,1,1,0],
    [1,2,2,3,3,2,2,1],
    [1,2,3,3,3,3,2,1],
    [2,3,3,4,4,3,3,2],
    [2,3,3,4,4,3,3,2],
    [1,2,3,3,3,3,2,1],
    [1,2,2,3,3,2,2,1],
    [0,1,1,2,2,1,1,0],
  ],
];

const PALETTE = {
  0: "transparent",
  1: "#1a4a1a", // dark green
  2: "#2d6b2d", // green  
  3: "#3d8b3d", // light green
  4: "#5a3a1a", // trunk brown
};

export const PixelTree = ({ size, variant }: PixelTreeProps) => {
  const pixels = TREE_FRAMES[variant % TREE_FRAMES.length];
  const pixelSize = size / 8;

  return (
    <div style={{ width: size, height: size, position: "relative", imageRendering: "pixelated" }}>
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
                backgroundColor: PALETTE[colorIdx as keyof typeof PALETTE],
              }}
            />
          );
        })
      )}
    </div>
  );
};
