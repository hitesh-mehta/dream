import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Trusted by Leading Research Teams</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See how researchers and organizations are accelerating their discovery pipeline with DREAM.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
              organization={testimonial.organization}
              highlightColor={testimonial.highlightColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  quote: string;
  author: string;
  title: string;
  organization: string;
  avatarSrc?: string;
  highlightColor?: string;
}

function TestimonialCard({ 
  quote, 
  author, 
  title, 
  organization, 
  avatarSrc,
  highlightColor = "highlight-purple"
}: TestimonialCardProps) {
  return (
    <div className="glass-card rounded-lg p-8 h-full flex flex-col">
      <div className={cn("mb-6 text-" + highlightColor)}>
        <Quote className="h-6 w-6" />
      </div>
      <blockquote className="flex-1 text-muted-foreground italic mb-6 text-sm">
        "{quote}"
      </blockquote>
      <div className="flex items-center">
        <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
          {avatarSrc ? (
            <img src={avatarSrc} alt={author} className="w-10 h-10 rounded-full" />
          ) : (
            <span className="text-sm font-bold">{author.charAt(0)}</span>
          )}
        </div>
        <div>
          <div className="font-medium">{author}</div>
          <div className="text-xs text-muted-foreground">{title}, {organization}</div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    quote: "DREAM has transformed our early-stage discovery process. What used to take months now happens in weeks, with higher success rates in our lead validation.",
    author: "Dr. Sarah Chen",
    title: "Research Director",
    organization: "NovaCure Therapeutics",
    highlightColor: "highlight-purple"
  },
  {
    quote: "The simulation capabilities are unmatched. We've been able to accurately predict binding affinities that correlate strongly with our wet lab results.",
    author: "Prof. Michael Rodriguez",
    title: "Principal Investigator",
    organization: "Stanford University",
    highlightColor: "highlight-blue"
  },
  {
    quote: "As a small biotech, DREAM gives us computational power that used to be available only to big pharma. It's leveled the playing field for innovation.",
    author: "Amelia Patel",
    title: "CEO",
    organization: "Quantum Biologics",
    highlightColor: "highlight-green"
  },
  {
    quote: "The AI-guided protocol optimization saved us countless hours in the lab. We've reduced our experimental cycles by 40% while improving outcomes.",
    author: "Dr. James Wilson",
    title: "Lab Director",
    organization: "Precision Medicines",
    highlightColor: "highlight-pink"
  },
  {
    quote: "Integration with our existing workflow was seamless. The platform adapts to our methodologies rather than forcing us to change our approach.",
    author: "Dr. Elena Petrov",
    title: "Head of Discovery",
    organization: "GlobalPharm",
    highlightColor: "highlight-orange"
  },
  {
    quote: "The insights dashboard has become essential for our team meetings. It transforms complex data into actionable decisions that drive our research forward.",
    author: "Thomas Nakamura",
    title: "Data Science Lead",
    organization: "BioPioneer Institute",
    highlightColor: "highlight-blue"
  }
];
