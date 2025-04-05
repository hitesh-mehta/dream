
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Download, Eye, FileDown, Filter, Grid, List, Search, SortAsc, Star, Trash, UserPlus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Example molecule data for the results page
const molecules = [
  { 
    id: 'DREAM-142857',
    name: 'DREAM-142857',
    formula: 'C₂₃H₂₇N₃O₄',
    bindingAffinity: 8.2,
    ic50: 12.5,
    drugLikeness: 0.85,
    synthesizability: 0.75,
    safetyScore: 0.92,
    date: '2025-03-28',
    status: 'active',
    favorite: true
  },
  { 
    id: 'DREAM-271828',
    name: 'DREAM-271828',
    formula: 'C₂₁H₂₃N₂O₃F',
    bindingAffinity: 7.8,
    ic50: 22.1,
    drugLikeness: 0.91,
    synthesizability: 0.65,
    safetyScore: 0.88,
    date: '2025-03-25',
    status: 'active',
    favorite: false
  },
  { 
    id: 'DREAM-314159',
    name: 'DREAM-314159',
    formula: 'C₂₄H₃₀N₄O₂',
    bindingAffinity: 8.4,
    ic50: 8.2,
    drugLikeness: 0.78,
    synthesizability: 0.60,
    safetyScore: 0.85,
    date: '2025-03-22',
    status: 'active',
    favorite: true
  },
  { 
    id: 'DREAM-161803',
    name: 'DREAM-161803',
    formula: 'C₂₅H₂₈N₃O₅S',
    bindingAffinity: 7.2,
    ic50: 48.3,
    drugLikeness: 0.83,
    synthesizability: 0.72,
    safetyScore: 0.79,
    date: '2025-03-18',
    status: 'inactive',
    favorite: false
  },
  { 
    id: 'DREAM-173205',
    name: 'DREAM-173205',
    formula: 'C₂₂H₂₆N₂O₃',
    bindingAffinity: 6.9,
    ic50: 67.4,
    drugLikeness: 0.92,
    synthesizability: 0.88,
    safetyScore: 0.93,
    date: '2025-03-15',
    status: 'inactive',
    favorite: false
  },
  { 
    id: 'DREAM-236067',
    name: 'DREAM-236067',
    formula: 'C₂₂H₂₈N₃O₄P',
    bindingAffinity: 8.0,
    ic50: 15.7,
    drugLikeness: 0.80,
    synthesizability: 0.68,
    safetyScore: 0.86,
    date: '2025-03-12',
    status: 'active',
    favorite: false
  }
];

// Chart data for the dashboard
const propertyComparisonData = [
  { name: 'DREAM-142857', affinity: 8.2, drugLikeness: 8.5, safety: 9.2 },
  { name: 'DREAM-271828', affinity: 7.8, drugLikeness: 9.1, safety: 8.8 },
  { name: 'DREAM-314159', affinity: 8.4, drugLikeness: 7.8, safety: 8.5 },
  { name: 'DREAM-236067', affinity: 8.0, drugLikeness: 8.0, safety: 8.6 },
];

const timelineData = [
  { date: 'March 12', molecules: 1 },
  { date: 'March 15', molecules: 2 },
  { date: 'March 18', molecules: 3 },
  { date: 'March 22', molecules: 4 },
  { date: 'March 25', molecules: 5 },
  { date: 'March 28', molecules: 6 },
];

// View modes for molecules list
type ViewMode = 'grid' | 'list';

// Molecule detail component for Dialog
function MoleculeDetail({ molecule }: { molecule: typeof molecules[0] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="bg-secondary/30 rounded-lg aspect-square flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl font-mono text-foreground/70">
              {molecule.formula.split('').map((char, index) => {
                if (char >= '0' && char <= '9') {
                  return <sub key={index}>{char}</sub>;
                }
                return <span key={index}>{char}</span>;
              })}
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-bold">{molecule.name}</h3>
          <p className="text-sm text-muted-foreground">Generated on {molecule.date}</p>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Binding Affinity (pKi)</span>
              <span className="text-sm font-medium">{molecule.bindingAffinity}</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full">
              <div className="h-2 bg-highlight-purple rounded-full" style={{ width: `${(molecule.bindingAffinity / 10) * 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Drug-likeness</span>
              <span className="text-sm font-medium">{molecule.drugLikeness * 10}/10</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full">
              <div className="h-2 bg-highlight-blue rounded-full" style={{ width: `${molecule.drugLikeness * 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Synthesizability</span>
              <span className="text-sm font-medium">{molecule.synthesizability * 10}/10</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full">
              <div className="h-2 bg-highlight-green rounded-full" style={{ width: `${molecule.synthesizability * 100}%` }}></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm">Safety Score</span>
              <span className="text-sm font-medium">{molecule.safetyScore * 10}/10</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full">
              <div className="h-2 bg-highlight-pink rounded-full" style={{ width: `${molecule.safetyScore * 100}%` }}></div>
            </div>
          </div>
        </div>
        
        <div className="pt-4 border-t border-border flex justify-between">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            View in Designer
          </Button>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Download Data
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Results() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedMolecule, setSelectedMolecule] = useState<typeof molecules[0] | null>(null);
  
  // Filter molecules based on search query
  const filteredMolecules = molecules.filter(molecule => 
    molecule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    molecule.formula.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0">
              <div>
                <h1 className="text-2xl font-bold">Results & Insights</h1>
                <p className="text-muted-foreground">Analyze and compare your molecular designs</p>
              </div>
              
              <div className="flex space-x-3">
                <Button variant="outline">
                  <FileDown className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            {/* Dashboard tabs */}
            <Tabs defaultValue="molecules">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="molecules">Molecules</TabsTrigger>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              </TabsList>
              
              {/* Molecules tab */}
              <TabsContent value="molecules" className="pt-6">
                {/* Search and filter controls */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search molecules..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <SortAsc className="h-4 w-4 mr-2" />
                      Sort
                    </Button>
                    <div className="flex border border-border rounded-md">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setViewMode('grid')}
                        className={viewMode === 'grid' ? 'bg-secondary' : ''}
                      >
                        <Grid className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setViewMode('list')}
                        className={viewMode === 'list' ? 'bg-secondary' : ''}
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Molecules list */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMolecules.map((molecule) => (
                      <Dialog key={molecule.id}>
                        <DialogTrigger asChild>
                          <Card className="overflow-hidden cursor-pointer hover:shadow-md transition-all duration-300">
                            <CardContent className="p-0">
                              <div className="aspect-square bg-secondary/30 flex items-center justify-center">
                                <div className="text-center">
                                  <div className="text-3xl font-mono text-foreground/70">
                                    {molecule.formula.split('').map((char, index) => {
                                      if (char >= '0' && char <= '9') {
                                        return <sub key={index}>{char}</sub>;
                                      }
                                      return <span key={index}>{char}</span>;
                                    })}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{molecule.name}</h3>
                                    <p className="text-xs text-muted-foreground">{molecule.date}</p>
                                  </div>
                                  
                                  <div className={`rounded-full h-2 w-2 mt-1 ${molecule.status === 'active' ? 'bg-highlight-green' : 'bg-muted'}`}></div>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 gap-2">
                                  <div className="text-xs">
                                    <span className="text-muted-foreground">Binding:</span>
                                    <span className="ml-1 font-medium">{molecule.bindingAffinity}</span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-muted-foreground">IC₅₀:</span>
                                    <span className="ml-1 font-medium">{molecule.ic50} nM</span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-muted-foreground">Likeness:</span>
                                    <span className="ml-1 font-medium">{(molecule.drugLikeness * 10).toFixed(1)}</span>
                                  </div>
                                  <div className="text-xs">
                                    <span className="text-muted-foreground">Safety:</span>
                                    <span className="ml-1 font-medium">{(molecule.safetyScore * 10).toFixed(1)}</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-3xl">
                          <DialogHeader>
                            <DialogTitle>Molecule Details</DialogTitle>
                            <DialogDescription>Comprehensive data for this molecule</DialogDescription>
                          </DialogHeader>
                          <MoleculeDetail molecule={molecule} />
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-md border border-border overflow-hidden">
                    <div className="bg-muted/40 px-4 py-3 text-sm font-medium grid grid-cols-12 gap-4">
                      <div className="col-span-3">Molecule</div>
                      <div className="col-span-2">Formula</div>
                      <div className="col-span-4 grid grid-cols-4">
                        <div>Binding</div>
                        <div>IC₅₀</div>
                        <div>Likeness</div>
                        <div>Safety</div>
                      </div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    
                    <ScrollArea className="h-[500px]">
                      {filteredMolecules.map((molecule) => (
                        <Dialog key={molecule.id}>
                          <div key={molecule.id} className="px-4 py-3 text-sm grid grid-cols-12 gap-4 border-t border-border hover:bg-secondary/10 transition-colors">
                            <div className="col-span-3 flex items-center">
                              <div className={`h-2 w-2 rounded-full mr-2 ${molecule.status === 'active' ? 'bg-highlight-green' : 'bg-muted'}`}></div>
                              <DialogTrigger asChild>
                                <button className="font-medium text-left hover:underline">{molecule.name}</button>
                              </DialogTrigger>
                              {molecule.favorite && <Star className="h-3 w-3 text-yellow-500 ml-2" />}
                            </div>
                            
                            <div className="col-span-2 font-mono text-xs flex items-center">
                              {molecule.formula}
                            </div>
                            
                            <div className="col-span-4 grid grid-cols-4">
                              <div>{molecule.bindingAffinity}</div>
                              <div>{molecule.ic50} nM</div>
                              <div>{(molecule.drugLikeness * 10).toFixed(1)}</div>
                              <div>{(molecule.safetyScore * 10).toFixed(1)}</div>
                            </div>
                            
                            <div className="col-span-2 text-muted-foreground flex items-center">
                              {molecule.date}
                            </div>
                            
                            <div className="col-span-1 flex space-x-2 items-center">
                              <button title="View Details">
                                <Eye className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                              </button>
                              <button title="Download">
                                <Download className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                              </button>
                              <button title="Delete">
                                <Trash className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                              </button>
                            </div>
                          </div>
                          <DialogContent className="sm:max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Molecule Details</DialogTitle>
                              <DialogDescription>Comprehensive data for this molecule</DialogDescription>
                            </DialogHeader>
                            <MoleculeDetail molecule={molecule} />
                          </DialogContent>
                        </Dialog>
                      ))}
                    </ScrollArea>
                  </div>
                )}
              </TabsContent>
              
              {/* Dashboard tab */}
              <TabsContent value="dashboard" className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Molecules</h3>
                        <div className="text-3xl font-bold">{molecules.length}</div>
                        <p className="text-xs text-highlight-green mt-1">
                          <Check className="h-3 w-3 inline mr-1" />
                          {molecules.filter(m => m.status === 'active').length} active
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Binding</h3>
                        <div className="text-3xl font-bold">
                          {(molecules.reduce((sum, m) => sum + m.bindingAffinity, 0) / molecules.length).toFixed(1)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">pKi</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Top IC₅₀</h3>
                        <div className="text-3xl font-bold">
                          {Math.min(...molecules.map(m => m.ic50))}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">nM</p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-6">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Safety</h3>
                        <div className="text-3xl font-bold">
                          {(Math.max(...molecules.map(m => m.safetyScore)) * 10).toFixed(1)}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">/10</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Growth chart */}
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium mb-4">Molecule Development Timeline</h3>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={timelineData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="molecules" fill="#8B5CF6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Property comparison */}
                  <Card className="md:col-span-2">
                    <CardContent className="p-6">
                      <h3 className="text-sm font-medium mb-4">Property Comparison (Active Molecules)</h3>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={propertyComparisonData}
                            layout="vertical"
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" domain={[0, 10]} />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            <Bar dataKey="affinity" name="Binding Affinity" fill="#8B5CF6" />
                            <Bar dataKey="drugLikeness" name="Drug-likeness" fill="#06B6D4" />
                            <Bar dataKey="safety" name="Safety Score" fill="#EC4899" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
