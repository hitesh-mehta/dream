
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AtSign, Beaker, Github, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthFormProps {
  isLogin?: boolean;
}

export function AuthForm({ isLogin = true }: AuthFormProps) {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created successfully",
        description: isLogin 
          ? "You have been logged in to your account" 
          : "Welcome to DREAM. You can now log in to your account",
      });
      
      // Redirect would happen here in a real app
    } catch (error) {
      toast({
        title: "Authentication error",
        description: "An error occurred during authentication. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{isLogin ? "Log in" : "Create an account"}</CardTitle>
        <CardDescription>
          {isLogin 
            ? "Enter your credentials to access your account" 
            : "Fill in the information below to create your account"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="password">Password</Label>
              {isLogin && (
                <Link to="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot password?
                </Link>
              )}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading 
              ? (isLogin ? "Logging in..." : "Creating account...") 
              : (isLogin ? "Log in" : "Create account")}
          </Button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">or continue with</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <Button variant="outline" className="w-full">
            <Github className="h-4 w-4 mr-2" />
            Github
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link 
            to={isLogin ? "/signup" : "/login"} 
            className="text-primary hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function Auth() {
  const [activeTab, setActiveTab] = useState<string>("login");
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-background">
      <div className="w-full max-w-md mx-auto mb-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center space-x-2">
            <Beaker className="h-8 w-8 text-primary" />
            <span className="font-bold text-2xl tracking-tight">DREAM</span>
          </Link>
          <h1 className="text-2xl font-bold mt-6 mb-2">Welcome to DREAM</h1>
          <p className="text-muted-foreground">
            Drug Research Enhancement and Acceleration Matrix
          </p>
        </div>
      </div>
      
      <Tabs 
        defaultValue="login" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full max-w-md mx-auto"
      >
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="login">Log in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <AuthForm isLogin={true} />
        </TabsContent>
        
        <TabsContent value="signup">
          <AuthForm isLogin={false} />
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          By continuing, you agree to DREAM's{" "}
          <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
