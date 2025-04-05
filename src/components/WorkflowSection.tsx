
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function WorkflowSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Streamlined Discovery Workflow</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our end-to-end platform guides you through each step of the drug discovery process,
            from initial design to experimental validation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-16">
          {workflowSteps.map((step, index) => (
            <WorkflowStep 
              key={index}
              number={index + 1}
              title={step.title}
              description={step.description}
              features={step.features}
              isLast={index === workflowSteps.length - 1}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" className="px-8">
            <Link to="/designer">Start Your Discovery Journey</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

interface WorkflowStepProps {
  number: number;
  title: string;
  description: string;
  features: string[];
  isLast?: boolean;
}

function WorkflowStep({ number, title, description, features, isLast }: WorkflowStepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4 z-10">
          {number}
        </div>
        {!isLast && (
          <div className="hidden lg:block absolute top-6 left-[calc(50%+20px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-primary to-transparent" />
        )}
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground mb-6 text-center">{description}</p>
        <ul className="space-y-2 w-full">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mr-2" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const workflowSteps = [
  {
    title: "Design",
    description: "Create and optimize molecular structures based on your therapeutic goals",
    features: [
      "AI-powered structure generation",
      "Target-based design workflows",
      "Fragment-based approach",
      "Scaffold hopping"
    ]
  },
  {
    title: "Simulate",
    description: "Predict properties and behavior across multiple scales",
    features: [
      "Binding affinity calculation",
      "ADMET property prediction",
      "Quantum mechanics simulations",
      "Molecular dynamics"
    ]
  },
  {
    title: "Experiment",
    description: "Plan and optimize your lab work with AI assistance",
    features: [
      "Protocol recommendation",
      "Experiment planning",
      "Resource optimization",
      "Testing sequence design"
    ]
  },
  {
    title: "Analyze",
    description: "Gather insights and make data-driven decisions",
    features: [
      "Result visualization",
      "Comparative analysis",
      "Pattern recognition",
      "Automated reporting"
    ]
  }
];
