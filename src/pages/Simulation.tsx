
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Check, ChevronDown, ChevronRight, Download, Play, RotateCw, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Example simulation data
const simulationData = {
  bindingEnergy: -9.2,
  bindingModes: 8,
  stabilityIndex: 0.85,
  proteinSystemInteractions: [
    { name: 'Van der Waals', value: 75 },
    { name: 'Hydrogen Bonding', value: 82 },
    { name: 'Electrostatic', value: 63 },
    { name: 'Hydrophobic', value: 91 },
    { name: 'π-Stacking', value: 58 },
  ],
  safetyScores: [
    { name: 'hERG Inhibition', prediction: 0.12, threshold: 0.5 },
    { name: 'Hepatotoxicity', prediction: 0.23, threshold: 0.5 },
    { name: 'Nephrotoxicity', prediction: 0.09, threshold: 0.5 },
    { name: 'Cardiotoxicity', prediction: 0.18, threshold: 0.5 },
    { name: 'Mutagenicity', prediction: 0.05, threshold: 0.5 },
  ],
  bioavailabilityFactors: [
    { name: 'Solubility', value: 72 },
    { name: 'Permeability', value: 85 },
    { name: 'Metabolic Stability', value: 68 },
    { name: 'Plasma Protein Binding', value: 45 },
    { name: 'P-gp Substrate', value: 32 },
  ]
};

export default function Simulation() {
  const { toast } = useToast();
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [simulationComplete, setSimulationComplete] = useState(false);
  const [selectedMolecule, setSelectedMolecule] = useState("molecule1");
  const [selectedSimulation, setSelectedSimulation] = useState("molecular");
  
  const runSimulation = () => {
    setIsSimulating(true);
    setProgress(0);
    setSimulationComplete(false);
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + Math.random() * 5;
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          setSimulationComplete(true);
          
          toast({
            title: "Simulation Complete",
            description: "All calculations finished successfully.",
          });
          
          return 100;
        }
        
        return newProgress;
      });
    }, 300);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold">Simulation Dashboard</h1>
                <p className="text-muted-foreground">Run predictive simulations on your molecular designs</p>
              </div>
              
              <div className="flex space-x-3">
                <Select value={selectedMolecule} onValueChange={setSelectedMolecule}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select molecule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="molecule1">DREAM-Mol-142857</SelectItem>
                    <SelectItem value="molecule2">DREAM-Mol-314159</SelectItem>
                    <SelectItem value="molecule3">DREAM-Mol-271828</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
            
            {/* Simulation controls */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="space-y-4 md:w-1/2">
                    <div>
                      <Label>Simulation Type</Label>
                      <Select value={selectedSimulation} onValueChange={setSelectedSimulation}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select simulation type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="molecular">Molecular Dynamics</SelectItem>
                          <SelectItem value="quantum">Quantum Mechanics</SelectItem>
                          <SelectItem value="docking">Molecular Docking</SelectItem>
                          <SelectItem value="admet">ADMET Prediction</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Runtime (ns)</Label>
                        <Select defaultValue="100">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                            <SelectItem value="500">500</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label>Force Field</Label>
                        <Select defaultValue="amber">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="amber">AMBER</SelectItem>
                            <SelectItem value="charmm">CHARMM</SelectItem>
                            <SelectItem value="opls">OPLS</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:w-1/3">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-full bg-highlight-green/20 flex items-center justify-center">
                          <Check className="h-4 w-4 text-highlight-green" />
                        </div>
                        <div className="text-sm">Molecule validated</div>
                      </div>
                      
                      {isSimulating ? (
                        <>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Simulation progress</span>
                              <span className="text-sm">{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} />
                          </div>
                          
                          <Button disabled className="w-full">
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            Simulating...
                          </Button>
                        </>
                      ) : (
                        <Button onClick={runSimulation} className="w-full" disabled={simulationComplete}>
                          {simulationComplete ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Simulation Complete
                            </>
                          ) : (
                            <>
                              <Play className="mr-2 h-4 w-4" />
                              Run Simulation
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Results section */}
            <div className={`transition-opacity duration-300 ${simulationComplete ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
              <Tabs defaultValue="binding">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="binding">Binding Affinity</TabsTrigger>
                    <TabsTrigger value="systemic">Systemic Response</TabsTrigger>
                    <TabsTrigger value="safety">Safety Score</TabsTrigger>
                  </TabsList>
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Results
                  </Button>
                </div>
                
                <TabsContent value="binding">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Interaction Analysis</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={simulationData.proteinSystemInteractions}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="value" fill="#8B5CF6" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Summary</h3>
                        
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Binding Energy</h4>
                            <div className="text-3xl font-bold text-highlight-purple">
                              {simulationData.bindingEnergy} kcal/mol
                            </div>
                            <p className="text-xs text-highlight-green">Strong binding affinity</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Binding Modes</h4>
                            <div className="text-3xl font-bold">
                              {simulationData.bindingModes}
                            </div>
                            <p className="text-xs text-muted-foreground">Distinct binding configurations</p>
                          </div>
                          
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium">Stability Index</h4>
                            <div className="text-3xl font-bold">
                              {simulationData.stabilityIndex}
                            </div>
                            <p className="text-xs text-highlight-green">High complex stability</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="systemic">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Bioavailability Factors</h3>
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={simulationData.bioavailabilityFactors}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="name" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="value" fill="#06B6D4" />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Pharmacokinetics</h3>
                        
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Half-life (t₁/₂)</span>
                              <span className="text-sm font-medium">8.5 hours</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full">
                              <div className="h-2 bg-highlight-blue rounded-full" style={{ width: '65%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Clearance Rate</span>
                              <span className="text-sm font-medium">12.3 mL/min/kg</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full">
                              <div className="h-2 bg-highlight-blue rounded-full" style={{ width: '42%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Volume of Distribution</span>
                              <span className="text-sm font-medium">2.8 L/kg</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full">
                              <div className="h-2 bg-highlight-blue rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Bioavailability</span>
                              <span className="text-sm font-medium">78%</span>
                            </div>
                            <div className="w-full h-2 bg-secondary rounded-full">
                              <div className="h-2 bg-highlight-blue rounded-full" style={{ width: '78%' }}></div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-6 pt-4 border-t border-border">
                          <h4 className="text-sm font-medium mb-3">Key Observations</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex">
                              <ChevronRight className="h-5 w-5 text-highlight-blue shrink-0 mr-1" />
                              <span>Good oral absorption profile</span>
                            </li>
                            <li className="flex">
                              <ChevronRight className="h-5 w-5 text-highlight-blue shrink-0 mr-1" />
                              <span>Moderate CNS penetration</span>
                            </li>
                            <li className="flex">
                              <ChevronRight className="h-5 w-5 text-highlight-blue shrink-0 mr-1" />
                              <span>Compatible with once-daily dosing</span>
                            </li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="safety">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="md:col-span-2">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-6">Toxicity Predictions</h3>
                        
                        <div className="space-y-6">
                          {simulationData.safetyScores.map((item, index) => (
                            <div key={index} className="relative">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{item.name}</span>
                                <span className="text-sm">
                                  {item.prediction < item.threshold ? (
                                    <span className="text-highlight-green">Safe</span>
                                  ) : (
                                    <span className="text-highlight-pink">Risk</span>
                                  )}
                                </span>
                              </div>
                              
                              <div className="w-full h-2 bg-secondary rounded-full">
                                <div 
                                  className={`h-2 rounded-full ${
                                    item.prediction < item.threshold 
                                      ? 'bg-highlight-green' 
                                      : 'bg-highlight-pink'
                                  }`} 
                                  style={{ width: `${(item.prediction / 1) * 100}%` }}
                                ></div>
                              </div>
                              
                              {/* Threshold marker */}
                              <div 
                                className="absolute top-[calc(100%-0.25rem)] w-0.5 h-3 bg-foreground/50" 
                                style={{ left: `${(item.threshold / 1) * 100}%` }}
                              ></div>
                              
                              <div className="flex justify-between mt-1">
                                <span className="text-xs text-muted-foreground">0.0</span>
                                <span className="text-xs text-muted-foreground">1.0</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-lg font-medium mb-4">Safety Assessment</h3>
                        
                        <div className="mb-6">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-highlight-green/20 flex items-center justify-center">
                              <Check className="h-5 w-5 text-highlight-green" />
                            </div>
                            <span className="font-medium">Overall Safety Score</span>
                          </div>
                          
                          <div className="text-4xl font-bold text-highlight-green mb-2">85/100</div>
                          <p className="text-sm text-muted-foreground">Favorable safety profile with minimal concerns</p>
                        </div>
                        
                        <div className="space-y-3 border-t border-border pt-4">
                          <div className="flex items-start space-x-2">
                            <AlertCircle className="h-5 w-5 text-highlight-orange shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Minor CYP3A4 Interaction</p>
                              <p className="text-xs text-muted-foreground">
                                Potential for mild drug-drug interactions through CYP3A4 inhibition
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-2">
                            <ChevronDown className="h-5 w-5 text-highlight-blue shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">Reactive Metabolites</p>
                              <p className="text-xs text-muted-foreground">
                                Low probability of forming reactive metabolites
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
