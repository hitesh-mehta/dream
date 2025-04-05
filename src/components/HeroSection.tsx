
import { Button } from "@/components/ui/button";
import { MoleculeCanvas } from "./MoleculeCanvas";
import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <div className="relative pt-32 pb-20 overflow-hidden bg-gradient-to-b from-background to-background/95">
      {/* Background pattern */}
      <div className="absolute inset-0 molecule-bg opacity-10" />
      
      {/* Content container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">
        {/* Text content */}
        <div className="w-full lg:w-1/2 z-10 mb-16 lg:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Accelerate</span> drug discovery with AI
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-xl">
            DREAM uses AI-driven simulations and molecular design to help researchers discover and optimize drug candidates faster than ever before.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild size="lg" className="font-medium px-8">
              <Link to="/designer">Get Started <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button variant="outline" size="lg" className="font-medium">
              <Play className="mr-2 h-4 w-4" /> Watch Demo
            </Button>
          </div>
        </div>
        
        {/* Visual content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-square max-w-md mx-auto lg:mx-0 lg:ml-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full opacity-30 blur-3xl animate-pulse" />
            <MoleculeCanvas className="w-full h-full z-10" />
          </div>
        </div>
      </div>
      
      {/* Stats section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">10x</p>
            <p className="text-sm text-muted-foreground mt-1">Faster Discovery</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">85%</p>
            <p className="text-sm text-muted-foreground mt-1">Prediction Accuracy</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">90+</p>
            <p className="text-sm text-muted-foreground mt-1">Research Partners</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">5.2M</p>
            <p className="text-sm text-muted-foreground mt-1">Simulations Run</p>
          </div>
        </div>
      </div>
    </div>
  );
}
