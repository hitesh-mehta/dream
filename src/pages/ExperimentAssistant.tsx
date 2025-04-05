
import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Beaker, BookMarked, CheckCircle, Clock, Download, DownloadCloud, FileText, FlaskConical, Save, Send, Sparkles, UploadCloud, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

// Assistant message types
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Example protocol steps
const protocolSteps = [
  {
    title: "Reagent Preparation",
    steps: [
      "Prepare 50mL of 0.1M phosphate buffer (pH 7.4)",
      "Dissolve compound DREAM-142 in DMSO at 10mM concentration",
      "Prepare 5mL of enzyme solution (0.5mg/mL in buffer)"
    ]
  },
  {
    title: "Reaction Setup",
    steps: [
      "Add 450μL buffer to each microcentrifuge tube",
      "Add 25μL of compound solution (final: 500μM)",
      "Add 25μL of enzyme solution",
      "Vortex gently for 5 seconds"
    ]
  },
  {
    title: "Incubation and Sampling",
    steps: [
      "Incubate at 37°C with gentle shaking",
      "Sample 50μL at timepoints: 0, 15, 30, 60, 120 min",
      "Quench samples in 50μL ice-cold acetonitrile",
      "Centrifuge at 12,000g for 5 minutes"
    ]
  },
  {
    title: "Analysis",
    steps: [
      "Transfer 80μL of supernatant to HPLC vials",
      "Analyze by HPLC-MS using method DREAM-ADME-01",
      "Calculate remaining compound percentage vs time"
    ]
  }
];

// Initial messages for the chat
const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Welcome to the DREAM Experiment Assistant. I can help you design protocols, optimize experimental conditions, and analyze results for your drug discovery work. What would you like to work on today?',
    timestamp: new Date()
  }
];

export default function ExperimentAssistant() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(input),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
      
      toast({
        title: "Protocol Recommendation",
        description: "New experimental protocol generated based on your request.",
      });
    }, 1500);
  };
  
  // Placeholder AI response logic
  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('solubility') || input.includes('dissolution')) {
      return "Based on your compound's properties, I recommend using the standardized shake-flask method for solubility determination. For DREAM-142 specifically, pH-dependent solubility would be important to measure using a buffer range from 2.0 to 8.0. Would you like me to generate a detailed protocol for this experiment?";
    }
    
    if (input.includes('stability') || input.includes('degradation')) {
      return "For stability testing of your compound, we should examine both chemical and metabolic stability. Based on the structure, I recommend focusing on oxidative and pH stability first. The protocol would include forced degradation conditions with sampling at 0, 24, 48, and 72 hours. Would you like me to optimize this timeline based on your specific timeline constraints?";
    }
    
    if (input.includes('binding') || input.includes('affinity')) {
      return "For binding affinity assays with your target protein, I suggest using surface plasmon resonance (SPR) as the primary method, followed by isothermal titration calorimetry (ITC) for confirmation. Based on your compound's predicted Kd range (50-200nM), we should use a concentration series from 1nM to 1μM. I can help you design an optimal experimental layout.";
    }
    
    return "I've analyzed your request and can design a custom protocol for this experiment. Based on similar compounds in our database, I recommend starting with these parameters:\n\n- Temperature: 37°C\n- pH: 7.4 (phosphate buffer)\n- Incubation time: 3 hours\n- Sampling: Every 30 minutes\n\nWould you like me to generate a more detailed protocol based on these initial conditions?";
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chat area - takes 2/3 on desktop */}
            <Card className="lg:col-span-2">
              <CardContent className="p-0 flex flex-col h-[700px]">
                <div className="flex items-center justify-between border-b border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <BookMarked className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">Experiment Assistant</h2>
                      <p className="text-xs text-muted-foreground">AI-guided protocol design and optimization</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-4 w-4 mr-1" />
                      New
                    </Button>
                  </div>
                </div>
                
                {/* Messages area */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`flex space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <Avatar className="h-8 w-8">
                            {message.role === 'assistant' ? (
                              <>
                                <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                                <Sparkles className="h-4 w-4 text-primary" />
                              </>
                            ) : (
                              <AvatarFallback>U</AvatarFallback>
                            )}
                          </Avatar>
                          
                          <div>
                            <div 
                              className={`rounded-lg p-3 text-sm ${
                                message.role === 'assistant' 
                                  ? 'bg-secondary text-foreground' 
                                  : 'bg-primary text-primary-foreground'
                              }`}
                            >
                              {message.content.split('\n').map((text, i) => (
                                <p key={i} className={i > 0 ? 'mt-2' : ''}>
                                  {text}
                                </p>
                              ))}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Intl.DateTimeFormat('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit'
                              }).format(message.timestamp)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex space-x-2 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary">AI</AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <div className="rounded-lg p-3 text-sm bg-secondary text-foreground">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Input area */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <Textarea 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about experimental protocols, conditions optimization, or data analysis..."
                      className="resize-none min-h-[60px]"
                    />
                    <Button 
                      onClick={handleSendMessage}
                      className="shrink-0"
                      disabled={!input.trim() || isTyping}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>
                      Try: "Design a stability assay for DREAM-142"
                    </span>
                    <button className="hover:text-foreground transition-colors">
                      <UploadCloud className="h-4 w-4 inline mr-1" />
                      Upload data
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Protocol display area - takes 1/3 on desktop */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <FlaskConical className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Recommended Protocol</h3>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <DownloadCloud className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Beaker className="h-4 w-4 text-highlight-blue" />
                      <span className="font-medium">Metabolic Stability Assay</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Estimated duration: 3.5 hours</span>
                    </div>
                    
                    <div className="border-t border-border pt-4 space-y-6">
                      {protocolSteps.map((section, index) => (
                        <div key={index}>
                          <h4 className="text-sm font-medium mb-2 flex items-center">
                            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center mr-2">
                              {index + 1}
                            </span>
                            {section.title}
                          </h4>
                          <ul className="space-y-2 pl-7">
                            {section.steps.map((step, stepIndex) => (
                              <li key={stepIndex} className="text-xs flex items-start">
                                <CheckCircle className="h-3.5 w-3.5 text-highlight-green shrink-0 mt-0.5 mr-2" />
                                <span>{step}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    
                    <div className="pt-4 border-t border-border flex justify-between">
                      <Button variant="outline" size="sm">
                        <Zap className="h-4 w-4 mr-1" />
                        Optimize
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Export as PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Protocol Optimization</h3>
                  
                  <Tabs defaultValue="timeline">
                    <TabsList className="w-full">
                      <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
                      <TabsTrigger value="resources" className="flex-1">Resources</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="timeline" className="pt-4">
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <div className="w-1 h-full bg-highlight-purple"></div>
                          <div className="w-3 h-3 rounded-full bg-highlight-purple"></div>
                          <div className="ml-2">
                            <p className="text-xs font-medium">Reagent Preparation</p>
                            <p className="text-xs text-muted-foreground">0:00 - 0:30</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-1 h-full bg-highlight-blue"></div>
                          <div className="w-3 h-3 rounded-full bg-highlight-blue"></div>
                          <div className="ml-2">
                            <p className="text-xs font-medium">Reaction Setup</p>
                            <p className="text-xs text-muted-foreground">0:30 - 0:45</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-1 h-full bg-highlight-green"></div>
                          <div className="w-3 h-3 rounded-full bg-highlight-green"></div>
                          <div className="ml-2">
                            <p className="text-xs font-medium">Incubation Period</p>
                            <p className="text-xs text-muted-foreground">0:45 - 2:45</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-1 h-8 bg-highlight-pink"></div>
                          <div className="w-3 h-3 rounded-full bg-highlight-pink"></div>
                          <div className="ml-2">
                            <p className="text-xs font-medium">Sample Processing</p>
                            <p className="text-xs text-muted-foreground">2:45 - 3:15</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full bg-highlight-orange"></div>
                          <div className="ml-2">
                            <p className="text-xs font-medium">Analysis</p>
                            <p className="text-xs text-muted-foreground">3:15 - 3:30</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="resources" className="pt-4">
                      <div className="space-y-3">
                        <div className="text-xs">
                          <p className="font-medium">Equipment</p>
                          <ul className="mt-1 pl-5 list-disc text-muted-foreground">
                            <li>Incubator-shaker (37°C)</li>
                            <li>Microcentrifuge (12,000g)</li>
                            <li>HPLC-MS system</li>
                            <li>Vortex mixer</li>
                          </ul>
                        </div>
                        
                        <div className="text-xs">
                          <p className="font-medium">Materials</p>
                          <ul className="mt-1 pl-5 list-disc text-muted-foreground">
                            <li>1.5mL microcentrifuge tubes (16)</li>
                            <li>HPLC vials with inserts (12)</li>
                            <li>Micropipettes and tips</li>
                            <li>Ice bath</li>
                          </ul>
                        </div>
                        
                        <div className="text-xs">
                          <p className="font-medium">Reagents</p>
                          <ul className="mt-1 pl-5 list-disc text-muted-foreground">
                            <li>Phosphate buffer components</li>
                            <li>DMSO (analytical grade)</li>
                            <li>Acetonitrile (HPLC grade)</li>
                            <li>Human liver microsomes</li>
                            <li>NADPH regenerating system</li>
                          </ul>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
