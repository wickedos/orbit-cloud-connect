
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, Settings, BarChart3, Calendar, Clock, Server,
  Users, Globe, Shield, Zap, Database, HardDrive
} from "lucide-react";

interface ServiceDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: {
    id: number;
    name: string;
    type: string;
    status: string;
    usage: number;
    description: string;
  } | null;
}

const ServiceDetailsModal = ({ isOpen, onClose, service }: ServiceDetailsModalProps) => {
  if (!service) return null;

  const usageData = [
    { date: "Dec 1", usage: 45 },
    { date: "Dec 2", usage: 52 },
    { date: "Dec 3", usage: 48 },
    { date: "Dec 4", usage: 61 },
    { date: "Dec 5", usage: 55 },
    { date: "Dec 6", usage: 67 },
    { date: "Dec 7", usage: service.usage }
  ];

  const metrics = {
    uptime: "99.9%",
    responseTime: "124ms",
    requests: "1.2M",
    dataTransfer: "450GB",
    activeUsers: "1,247",
    peakConcurrent: "89"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            {service.name} - Service Details
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === "Active" ? "bg-green-500" : 
                          service.status === "Pending" ? "bg-yellow-500" : "bg-red-500"
                        }`}></div>
                        <span className="font-medium">{service.status}</span>
                      </div>
                    </div>
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Current Usage</p>
                      <p className="text-2xl font-bold">{service.usage}%</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <Progress value={service.usage} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Uptime</p>
                      <p className="text-2xl font-bold">{metrics.uptime}</p>
                      <p className="text-xs text-green-600">Last 30 days</p>
                    </div>
                    <Activity className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Service Information</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Service Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service Type:</span>
                        <Badge variant="outline">{service.type}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Service ID:</span>
                        <span className="font-mono">srv_{service.id}23x{service.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Region:</span>
                        <span>US-East-1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Created:</span>
                        <span>Nov 15, 2024</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Resource Allocation</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>CPU:</span>
                        <span>4 vCPUs</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Memory:</span>
                        <span>16 GB RAM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Storage:</span>
                        <span>500 GB SSD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bandwidth:</span>
                        <span>10 TB/month</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Response Time</p>
                      <p className="text-2xl font-bold">{metrics.responseTime}</p>
                    </div>
                    <Zap className="h-8 w-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Requests</p>
                      <p className="text-2xl font-bold">{metrics.requests}</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                    <Globe className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Data Transfer</p>
                      <p className="text-2xl font-bold">{metrics.dataTransfer}</p>
                      <p className="text-xs text-gray-500">This month</p>
                    </div>
                    <Database className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Trend (Last 7 Days)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {usageData.map((day, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{day.date}</span>
                        <div className="flex items-center gap-2 flex-1 max-w-32">
                          <Progress value={day.usage} className="flex-1" />
                          <span className="text-sm font-medium w-10">{day.usage}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>CPU Usage</span>
                      <span>45%</span>
                    </div>
                    <Progress value={45} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Memory Usage</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage Usage</span>
                      <span>78%</span>
                    </div>
                    <Progress value={78} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Network I/O</span>
                      <span>23%</span>
                    </div>
                    <Progress value={23} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="configuration" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Server className="h-5 w-5" />
                    Server Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Instance Type</label>
                    <div className="p-2 bg-gray-50 rounded text-sm">c5.xlarge</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Operating System</label>
                    <div className="p-2 bg-gray-50 rounded text-sm">Ubuntu 22.04 LTS</div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Auto Scaling</label>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                      <span className="text-sm text-gray-600">Min: 1, Max: 5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Firewall Status</label>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                      <span className="text-sm text-gray-600">5 rules configured</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">SSL Certificate</label>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-800">Valid</Badge>
                      <span className="text-sm text-gray-600">Expires: Mar 2025</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Backup Schedule</label>
                    <div className="p-2 bg-gray-50 rounded text-sm">Daily at 2:00 AM UTC</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 font-mono text-sm">
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>NODE_ENV</span>
                    <span>production</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>DATABASE_URL</span>
                    <span>••••••••••••••••</span>
                  </div>
                  <div className="flex justify-between p-2 bg-gray-50 rounded">
                    <span>API_KEY</span>
                    <span>••••••••••••••••</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-4">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Variables
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Current Bill</CardTitle>
                  <CardDescription>December 1-31, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600 mb-4">$890.00</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Compute Hours</span>
                      <span>$650.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage</span>
                      <span>$120.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Data Transfer</span>
                      <span>$80.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Support</span>
                      <span>$40.00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Usage Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compute Hours</span>
                      <span>650/1000</span>
                    </div>
                    <Progress value={65} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Storage</span>
                      <span>320GB/500GB</span>
                    </div>
                    <Progress value={64} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Data Transfer</span>
                      <span>4.2TB/10TB</span>
                    </div>
                    <Progress value={42} />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">November 2024</span>
                      <p className="text-sm text-gray-600">Nov 1-30, 2024</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$823.50</span>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <span className="font-medium">October 2024</span>
                      <p className="text-sm text-gray-600">Oct 1-31, 2024</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium">$756.20</span>
                      <p className="text-sm text-green-600">Paid</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            <Settings className="h-4 w-4 mr-2" />
            Manage Service
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailsModal;
