
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Cloud, 
  Users, 
  Shield, 
  BarChart3, 
  MessageCircle, 
  Settings, 
  LogOut,
  Plus,
  Activity,
  CreditCard,
  HelpCircle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const email = localStorage.getItem("userEmail");
    
    if (userType !== "customer" || !email) {
      navigate("/");
      return;
    }
    
    setUserEmail(email);
  }, [navigate]);

  const services = [
    {
      id: 1,
      name: "CRM Suite Pro",
      type: "SaaS",
      status: "Active",
      usage: 67,
      icon: Users,
      description: "Customer relationship management platform",
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      name: "Cloud Infrastructure",
      type: "IaaS",
      status: "Active",
      usage: 89,
      icon: Cloud,
      description: "Virtual machines and storage solutions",
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 3,
      name: "Development Platform",
      type: "PaaS",
      status: "Pending",
      usage: 0,
      icon: Shield,
      description: "Application development and deployment tools",
      color: "bg-yellow-100 text-yellow-800"
    }
  ];

  const supportTickets = [
    { id: 1, subject: "Storage expansion request", status: "Open", priority: "Medium" },
    { id: 2, subject: "API rate limit increase", status: "In Progress", priority: "High" },
    { id: 3, subject: "Billing inquiry", status: "Resolved", priority: "Low" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <DashboardLayout userType="customer" userEmail={userEmail} onLogout={handleLogout}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg">
          <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
          <p className="text-blue-100">
            Manage your cloud services, track usage, and get support from your dashboard.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Monthly Usage</p>
                  <p className="text-2xl font-bold">78%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <MessageCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Month</p>
                  <p className="text-2xl font-bold">$2,450</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="apply">Apply for Services</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Services</h2>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Request New Service
              </Button>
            </div>
            
            <div className="grid gap-4">
              {services.map((service) => (
                <Card key={service.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <service.icon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{service.name}</h3>
                          <p className="text-gray-600 text-sm mb-2">{service.description}</p>
                          <div className="flex items-center space-x-4">
                            <Badge variant="secondary">{service.type}</Badge>
                            <Badge className={service.color}>{service.status}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600 mb-1">Usage</p>
                        <p className="font-semibold">{service.usage}%</p>
                        <Progress value={service.usage} className="w-24 mt-1" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="apply" className="space-y-4">
            <h2 className="text-xl font-semibold">Apply for New Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="group hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <Cloud className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle>Software as a Service</CardTitle>
                  <CardDescription>
                    Ready-to-use applications and software solutions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Apply for SaaS</Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle>Infrastructure as a Service</CardTitle>
                  <CardDescription>
                    Scalable computing resources and infrastructure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Apply for IaaS</Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all cursor-pointer">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <Shield className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle>Platform as a Service</CardTitle>
                  <CardDescription>
                    Development platforms and deployment tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Apply for PaaS</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="support" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Support Center</h2>
              <Button>
                <MessageCircle className="h-4 w-4 mr-2" />
                New Support Ticket
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {supportTickets.map((ticket) => (
                      <div key={ticket.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{ticket.subject}</p>
                          <p className="text-xs text-gray-600">#{ticket.id}</p>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={ticket.status === "Resolved" ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {ticket.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Start Live Chat
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Knowledge Base
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Service Configuration
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <h2 className="text-xl font-semibold">Billing & Usage</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Bill</CardTitle>
                  <CardDescription>Billing period: Dec 1-31, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-4">$2,450.00</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>SaaS Services</span>
                      <span>$890.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IaaS Resources</span>
                      <span>$1,200.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support & Maintenance</span>
                      <span>$360.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Usage Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compute Hours</span>
                      <span>780/1000</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>450GB/500GB</span>
                    </div>
                    <Progress value={90} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Calls</span>
                      <span>89K/100K</span>
                    </div>
                    <Progress value={89} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
