
import { Link } from "react-router-dom";
import { Flask, Github, Twitter, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background/30 border-t border-border/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <Flask className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">DREAM</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              Drug Research Enhancement and Acceleration Matrix - Accelerating drug discovery through AI-driven simulations and molecular design.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Platform</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/designer" className="text-sm text-muted-foreground hover:text-foreground">Molecular Designer</Link></li>
                <li><Link to="/simulation" className="text-sm text-muted-foreground hover:text-foreground">Simulation</Link></li>
                <li><Link to="/assistant" className="text-sm text-muted-foreground hover:text-foreground">Experiment Assistant</Link></li>
                <li><Link to="/results" className="text-sm text-muted-foreground hover:text-foreground">Results</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Resources</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/documentation" className="text-sm text-muted-foreground hover:text-foreground">Documentation</Link></li>
                <li><Link to="/api" className="text-sm text-muted-foreground hover:text-foreground">API</Link></li>
                <li><Link to="/examples" className="text-sm text-muted-foreground hover:text-foreground">Example Molecules</Link></li>
                <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">About</Link></li>
                <li><Link to="/careers" className="text-sm text-muted-foreground hover:text-foreground">Careers</Link></li>
                <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
                <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border/30 pt-8 flex flex-col-reverse md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} DREAM. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
