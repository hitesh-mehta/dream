
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Atom, Beaker, Brain, Download, Eye, RotateCw, Save, Send, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Placeholder for the 3D viewer that would use a library like 3DMol.js or NGL
function MoleculeViewer() {
  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-secondary/30 rounded-lg border border-border/50">
      <div className="text-center p-8">
        <Atom className="h-16 w-16 text-primary/50 mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">3D Molecule Viewer</p>
        <p className="text-xs text-muted-foreground mt-2">WebGL-based visualization would render here</p>
      </div>
    </div>
  );
}

export default function MolecularDesigner() {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("structure");

  const handleGenerate = () => {
    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "Molecule generated successfully",
        description: "New molecular structure created based on your parameters.",
      });
      setSelectedTab("structure");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left sidebar - Input panel */}
            <div className="w-full lg:w-1/3 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold mb-4">Design Parameters</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="target">Target Protein</Label>
                      <Select defaultValue="ace2">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ace2">ACE2 Receptor</SelectItem>
                          <SelectItem value="spike">SARS-CoV-2 Spike</SelectItem>
                          <SelectItem value="il6">IL-6 Receptor</SelectItem>
                          <SelectItem value="egfr">EGFR</SelectItem>
                          <SelectItem value="her2">HER2</SelectItem>
                          <SelectItem value="custom">Custom Target</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="scaffoldType">Scaffold Type</Label>
                      <Select defaultValue="heterocyclic">
                        <SelectTrigger>
                          <SelectValue placeholder="Select scaffold type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heterocyclic">Heterocyclic</SelectItem>
                          <SelectItem value="peptide">Peptide-based</SelectItem>
                          <SelectItem value="natural">Natural Product-like</SelectItem>
                          <SelectItem value="fragment">Fragment-based</SelectItem>
                          <SelectItem value="macrocyclic">Macrocyclic</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="requirements">Therapeutic Requirements</Label>
                      <Textarea 
                        id="requirements" 
                        placeholder="Describe desired therapeutic properties and constraints..."
                        className="resize-none h-32"
                      />
                    </div>
                    
                    <div>
                      <Label>Binding Affinity Target (nM)</Label>
                      <div className="pt-2">
                        <Slider defaultValue={[50]} max={100} step={1} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Higher Affinity</span>
                        <span>Lower Affinity</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Drug-likeness Importance</Label>
                      <div className="pt-2">
                        <Slider defaultValue={[75]} max={100} step={1} />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Less Important</span>
                        <span>More Important</span>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="smiles">Starting Structure (optional)</Label>
                      <Input 
                        id="smiles" 
                        placeholder="Enter SMILES or InChI..." 
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        Leave empty for de novo design
                      </p>
                    </div>
                    
                    <Button 
                      onClick={handleGenerate} 
                      className="w-full"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Generate Molecule
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Right content area - Viewer and results */}
            <div className="w-full lg:w-2/3 space-y-6">
              {/* 3D Viewer */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between p-4 border-b border-border/50">
                    <h2 className="text-xl font-bold">Molecular Visualization</h2>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" /> View Options
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" /> Export
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <MoleculeViewer />
                  </div>
                </CardContent>
              </Card>
              
              {/* Results Tabs */}
              <Card>
                <CardContent className="p-0">
                  <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                      <TabsList className="grid w-full max-w-md grid-cols-3">
                        <TabsTrigger value="structure">Structure</TabsTrigger>
                        <TabsTrigger value="properties">Properties</TabsTrigger>
                        <TabsTrigger value="interactions">Interactions</TabsTrigger>
                      </TabsList>
                      
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-1" /> Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <Beaker className="h-4 w-4 mr-1" /> Simulate
                        </Button>
                      </div>
                    </div>
                    
                    <TabsContent value="structure" className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium mb-2">Structure Information</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Molecular Formula:</span>
                              <span className="text-sm font-mono">C₂₃H₂₇N₃O₄</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Molecular Weight:</span>
                              <span className="text-sm">409.48 g/mol</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">LogP:</span>
                              <span className="text-sm">2.45</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">H-Bond Donors:</span>
                              <span className="text-sm">2</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">H-Bond Acceptors:</span>
                              <span className="text-sm">5</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Rotatable Bonds:</span>
                              <span className="text-sm">6</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-2">SMILES Notation</h3>
                          <div className="bg-secondary/30 p-3 rounded-md font-mono text-xs overflow-x-auto">
                            CC(C)(C)c1ccc(c(c1)O)C(=O)NC2CCN(CC2)Cc3cccnc3
                          </div>
                          
                          <h3 className="text-sm font-medium mt-4 mb-2">Synthetic Accessibility</h3>
                          <div className="flex items-center space-x-2">
                            <div className="w-full bg-secondary/50 rounded-full h-2.5">
                              <div className="bg-highlight-green h-2.5 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                            <span className="text-sm">7.5/10</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Highly synthesizable with standard procedures
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="properties" className="p-4">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Pharmacokinetic Properties</h3>
                          <div className="space-y-4">
                            <PropertyBar 
                              label="Oral Bioavailability" 
                              value={68} 
                              color="highlight-blue" 
                              description="Predicted F value of 68%" 
                            />
                            <PropertyBar 
                              label="Blood-Brain Barrier" 
                              value={30} 
                              color="highlight-purple" 
                              description="Low BBB penetration" 
                            />
                            <PropertyBar 
                              label="Plasma Protein Binding" 
                              value={92} 
                              color="highlight-pink" 
                              description="Highly protein-bound" 
                            />
                            <PropertyBar 
                              label="Metabolic Stability" 
                              value={75} 
                              color="highlight-green" 
                              description="Good metabolic stability" 
                            />
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Toxicity Predictions</h3>
                          <div className="space-y-4">
                            <PropertyBar 
                              label="hERG Inhibition" 
                              value={15} 
                              color="highlight-green" 
                              description="Low cardiac toxicity risk" 
                              inversed
                            />
                            <PropertyBar 
                              label="Hepatotoxicity" 
                              value={25} 
                              color="highlight-green" 
                              description="Low liver toxicity risk" 
                              inversed
                            />
                            <PropertyBar 
                              label="Mutagenicity" 
                              value={5} 
                              color="highlight-green" 
                              description="Non-mutagenic" 
                              inversed
                            />
                            <PropertyBar 
                              label="Cytotoxicity" 
                              value={22} 
                              color="highlight-green" 
                              description="Low cytotoxicity potential" 
                              inversed
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-sm font-medium mb-3">Lipinski's Rule of Five Compliance</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <RuleCheck rule="MW < 500" value="409.48" status={true} />
                          <RuleCheck rule="LogP < 5" value="2.45" status={true} />
                          <RuleCheck rule="H-Donors ≤ 5" value="2" status={true} />
                          <RuleCheck rule="H-Acceptors ≤ 10" value="5" status={true} />
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="interactions" className="p-4">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-sm font-medium mb-3">Binding Prediction</h3>
                          <Card className="bg-secondary/30 p-4">
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">Binding Affinity (pKi):</span>
                              <span className="text-sm font-semibold">8.2</span>
                            </div>
                            <div className="flex justify-between mb-2">
                              <span className="text-sm font-medium">IC50:</span>
                              <span className="text-sm font-semibold">12.5 nM</span>
                            </div>
                            <div className="flex justify-between mb-4">
                              <span className="text-sm font-medium">Ligand Efficiency:</span>
                              <span className="text-sm font-semibold">0.42 kcal/mol/heavy atom</span>
                            </div>
                            
                            <h4 className="text-xs font-medium text-muted-foreground mb-2">Key Interactions:</h4>
                            <ul className="text-xs space-y-1 pl-5 list-disc">
                              <li>Hydrogen bond with ARG-123 (2.8 Å)</li>
                              <li>π-π stacking with TYR-456</li>
                              <li>Hydrophobic interaction with LEU-789 pocket</li>
                              <li>Salt bridge with GLU-234</li>
                            </ul>
                          </Card>
                          
                          <h3 className="text-sm font-medium mt-4 mb-3">Off-Target Interactions</h3>
                          <Card className="bg-secondary/30 p-4">
                            <div className="space-y-3">
                              <OffTargetBar target="Dopamine D2" value={15} />
                              <OffTargetBar target="5-HT2A" value={8} />
                              <OffTargetBar target="hERG" value={12} />
                              <OffTargetBar target="CYP3A4" value={35} />
                            </div>
                          </Card>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium mb-3">Interactive Map</h3>
                          <div className="aspect-square bg-secondary/30 rounded-lg border border-border/50 flex items-center justify-center">
                            <div className="text-center">
                              <Brain className="h-12 w-12 text-primary/50 mx-auto mb-3" />
                              <p className="text-sm text-muted-foreground">Interaction Map</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Visual representation of protein-ligand interactions
                              </p>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <Button>
                              <Send className="h-4 w-4 mr-2" />
                              Send to Simulation
                            </Button>
                          </div>
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

interface PropertyBarProps {
  label: string;
  value: number;
  color: string;
  description: string;
  inversed?: boolean;
}

function PropertyBar({ label, value, color, description, inversed = false }: PropertyBarProps) {
  // For inversed properties (like toxicity), lower is better
  const displayValue = inversed ? 100 - value : value;
  const valueColor = inversed 
    ? (value <= 33 ? "highlight-green" : value <= 66 ? "highlight-orange" : "highlight-pink")
    : color;
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm">{label}</span>
        <span className="text-sm font-medium">{displayValue}%</span>
      </div>
      <div className="w-full bg-secondary/50 rounded-full h-2.5">
        <div className={`bg-${valueColor} h-2.5 rounded-full`} style={{ width: `${displayValue}%` }}></div>
      </div>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

interface RuleCheckProps {
  rule: string;
  value: string;
  status: boolean;
}

function RuleCheck({ rule, value, status }: RuleCheckProps) {
  return (
    <div className={`p-3 rounded-lg border ${status ? 'border-highlight-green/30 bg-highlight-green/5' : 'border-highlight-pink/30 bg-highlight-pink/5'}`}>
      <div className="text-xs font-medium mb-1">{rule}</div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-mono">{value}</span>
        <span className={status ? 'text-highlight-green' : 'text-highlight-pink'}>
          {status ? '✓' : '✗'}
        </span>
      </div>
    </div>
  );
}

interface OffTargetBarProps {
  target: string;
  value: number;
}

function OffTargetBar({ target, value }: OffTargetBarProps) {
  // Color based on risk level
  const color = value <= 20 ? "highlight-green" : value <= 50 ? "highlight-orange" : "highlight-pink";
  
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span>{target}</span>
        <span>{value}% similarity</span>
      </div>
      <div className="w-full bg-secondary/50 rounded-full h-1.5">
        <div className={`bg-${color} h-1.5 rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
}
