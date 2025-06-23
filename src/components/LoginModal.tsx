
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [userType, setUserType] = useState<"customer" | "employee">("customer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem("userType", userType);
        localStorage.setItem("userEmail", email);
        
        toast({
          title: "Login Successful",
          description: `Welcome back! Redirecting to your ${userType} dashboard.`,
        });
        
        onClose();
        if (userType === "customer") {
          navigate("/customer-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      } else {
        toast({
          title: "Login Failed",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold">
            Welcome to CloudTech
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={userType} onValueChange={(value) => setUserType(value as "customer" | "employee")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="customer" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customer
            </TabsTrigger>
            <TabsTrigger value="employee" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Employee
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="customer">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 p-2 bg-blue-100 rounded-full w-fit">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Customer Portal</CardTitle>
                <CardDescription>
                  Access your services, manage applications, and get support
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="customer-email">Email</Label>
                    <Input
                      id="customer-email"
                      type="email"
                      placeholder="customer@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customer-password">Password</Label>
                    <Input
                      id="customer-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employee">
            <Card>
              <CardHeader className="text-center">
                <div className="mx-auto mb-2 p-2 bg-purple-100 rounded-full w-fit">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>Employee Portal</CardTitle>
                <CardDescription>
                  Manage customers, handle support tickets, and view analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="employee-email">Email</Label>
                    <Input
                      id="employee-email"
                      type="email"
                      placeholder="employee@cloudtech.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employee-password">Password</Label>
                    <Input
                      id="employee-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button className="text-blue-600 hover:underline">
            Contact sales to get started
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
