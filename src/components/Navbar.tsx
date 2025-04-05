import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Beaker, BrainCircuit, Atom, BookOpen, Database } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Beaker className="h-7 w-7 text-primary" />
              <span className="font-bold text-xl tracking-tight">DREAM</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLink to="/designer" icon={<Atom className="h-4 w-4 mr-1" />}>Designer</NavLink>
              <NavLink to="/simulation" icon={<BrainCircuit className="h-4 w-4 mr-1" />}>Simulation</NavLink>
              <NavLink to="/assistant" icon={<BookOpen className="h-4 w-4 mr-1" />}>Assistant</NavLink>
              <NavLink to="/results" icon={<Database className="h-4 w-4 mr-1" />}>Results</NavLink>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeSwitcher />
            <Button variant="ghost" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign up</Link>
            </Button>
          </div>
          <div className="flex items-center md:hidden">
            <ThemeSwitcher />
            <Button variant="ghost" size="icon" onClick={toggleMobileMenu} className="ml-2">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-md border-b border-border/50">
          <MobileNavLink to="/designer" icon={<Atom className="h-4 w-4 mr-2" />}>Designer</MobileNavLink>
          <MobileNavLink to="/simulation" icon={<BrainCircuit className="h-4 w-4 mr-2" />}>Simulation</MobileNavLink>
          <MobileNavLink to="/assistant" icon={<BookOpen className="h-4 w-4 mr-2" />}>Assistant</MobileNavLink>
          <MobileNavLink to="/results" icon={<Database className="h-4 w-4 mr-2" />}>Results</MobileNavLink>
          <div className="pt-4 pb-3 border-t border-border/30">
            <MobileNavLink to="/login">Log in</MobileNavLink>
            <div className="mt-3 px-2">
              <Button className="w-full" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1 rounded-md transition-colors duration-200"
    >
      {icon}
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children, icon }: { to: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="flex items-center text-base font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-md transition-colors duration-200"
    >
      {icon}
      {children}
    </Link>
  );
}
