import { Code } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="fixed top-0 inset-x-0 z-20 bg-background p-6 border-b w-full">
      <nav className="flex items-center justify-between">
        <Link href={"/"} className="flex items-center gap-2 text-xl">
          <Code className="w-5 h-5 text-accent" />
          ghithub_wrapped
        </Link>
      </nav>
    </header>
  );
};
