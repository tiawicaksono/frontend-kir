import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Sidebar({ children }: Props) {
  return <aside className="w-72 border-r h-screen bg-white">{children}</aside>;
}
