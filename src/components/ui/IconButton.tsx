import type { ReactNode } from "react";

interface Props {
  label: string;
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export default function IconButton({ label, children, onClick, disabled }: Props) {
  return (
    <button type="button" className="icon-btn" aria-label={label} title={label} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
