
import { FeatureCard } from "./FeatureCard";
import { AlignCenter, Atom, BrainCircuit, BookOpen, Database, Beaker, Gauge, Microscope, Dna } from "lucide-react";

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-background/95 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Tools for Drug Discovery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform combines cutting-edge AI with scientific expertise
            to accelerate every stage of the drug discovery process.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard 
            title="Inverse Molecular Design" 
            description="Specify desired therapeutic properties and generate novel molecular structures that match your requirements."
            icon={<Atom className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Multi-Scale Simulations" 
            description="Run powerful simulations from quantum mechanics to biological systems to predict compound behavior."
            icon={<BrainCircuit className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Experiment Assistant" 
            description="Get AI recommendations for optimal lab protocols and testing sequences based on your research goals."
            icon={<BookOpen className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Knowledge Database" 
            description="Access a vast repository of molecular structures, properties, and research insights to inform your discovery process."
            icon={<Database className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Binding Affinity Analysis" 
            description="Predict how strongly your compounds will interact with target proteins using our advanced scoring functions."
            icon={<AlignCenter className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Property Prediction" 
            description="Accurately forecast ADMET properties, toxicity profiles, and pharmacokinetic behavior before synthesis."
            icon={<Gauge className="h-5 w-5" />}
          />

          <FeatureCard 
            title="Fragment-Based Design" 
            description="Build compounds systematically by exploring optimal fragments and their combinations for your targets."
            icon={<Dna className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="Chemical Synthesis Planning" 
            description="Generate practical synthetic routes for your designed compounds with cost and feasibility estimates."
            icon={<Beaker className="h-5 w-5" />}
          />
          
          <FeatureCard 
            title="In Silico Screening" 
            description="Screen millions of compounds virtually to identify the most promising candidates for further testing."
            icon={<Microscope className="h-5 w-5" />}
          />
        </div>
      </div>
    </section>
  );
}
