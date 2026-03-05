import React from "react";

export function Button({
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "1px solid #ccc",
        background: "#eee",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}
