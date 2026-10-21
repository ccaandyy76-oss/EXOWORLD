import type { CSSProperties } from "react";

interface Props {
  text: string;
  color?: string;
}

export default function StatusBadge({ text, color }: Props) {
  return (
    <span className="badge">
      <span className="badge__dot" style={color ? ({ "--c": color } as CSSProperties) : undefined} />
      {text}
    </span>
  );
}
