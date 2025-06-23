
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Cloud, Users, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ServiceApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: "SaaS" | "IaaS" | "PaaS" | null;
}

const ServiceApplicationModal = ({ isOpen, onClose, serviceType }: ServiceApplicationModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceName: "",
    businessUse: "",
    expectedUsers: "",
    budget: "",
    timeline: "",
    requirements: "",
    companySize: "",
    industry: "",
    compliance: "",
    support: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const serviceDetails = {
    SaaS: {
      title: "Software as a Service",
      icon: Users,
      description: "Ready-to-use applications and software solutions",
      examples: ["CRM Systems", "Email Marketing", "Project Management", "Analytics Platforms"],
      pricing: "Starting from $29/user/month"
    },
    IaaS: {
      title: "Infrastructure as a Service", 
      icon: Cloud,
      description: "Scalable computing resources and infrastructure",
      examples: ["Virtual Machines", "Storage Solutions", "Network Services", "Load Balancers"],
      pricing: "Starting from $0.05/hour"
    },
    PaaS: {
      title: "Platform as a Service",
      icon: Shield,
      description: "Development platforms and deployment tools",
      examples: ["Development Frameworks", "Database Services", "API Management", "CI/CD Tools"],
      pricing: "Starting from $15/app/month"
    }
  };

  const currentService = serviceType ? serviceDetails[serviceType] : null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted Successfully!",
        description: `Your ${serviceType} application has been submitted for review. You'll receive an email confirmation shortly.`,
      });
      setIsSubmitting(false);
      onClose();
      setStep(1);
      setFormData({
        serviceName: "",
        businessUse: "",
        expectedUsers: "",
        budget: "",
        timeline: "",
        requirements: "",
        companySize: "",
        industry: "",
        compliance: "",
        support: ""
      });
    }, 2000);
  };

  if (!currentService) return null;

  const ServiceIcon = currentService.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ServiceIcon className="h-6 w-6 text-blue-600" />
            Apply for {currentService.title}
          </DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ServiceIcon className="h-5 w-5" />
                  Service Overview
                </CardTitle>
                <CardDescription>{currentService.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">What's included:</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {currentService.examples.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pricing:</span>
                  <Badge variant="outline">{currentService.pricing}</Badge>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <div>
                <Label htmlFor="serviceName">Service/Solution Name</Label>
                <Input
                  id="serviceName"
                  placeholder="e.g., Customer CRM System"
                  value={formData.serviceName}
                  onChange={(e) => handleInputChange("serviceName", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="businessUse">Business Use Case</Label>
                <Textarea
                  id="businessUse"
                  placeholder="Describe how you plan to use this service..."
                  value={formData.businessUse}
                  onChange={(e) => handleInputChange("businessUse", e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technical Requirements</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expectedUsers">Expected Users</Label>
                <Select onValueChange={(value) => handleInputChange("expectedUsers", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select user count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 users</SelectItem>
                    <SelectItem value="11-50">11-50 users</SelectItem>
                    <SelectItem value="51-200">51-200 users</SelectItem>
                    <SelectItem value="201-1000">201-1000 users</SelectItem>
                    <SelectItem value="1000+">1000+ users</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="budget">Monthly Budget</Label>
                <Select onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-500">Under $500</SelectItem>
                    <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                    <SelectItem value="10000+">$10,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="timeline">Implementation Timeline</Label>
              <Select onValueChange={(value) => handleInputChange("timeline", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="When do you need this deployed?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">As soon as possible</SelectItem>
                  <SelectItem value="1-month">Within 1 month</SelectItem>
                  <SelectItem value="2-3-months">2-3 months</SelectItem>
                  <SelectItem value="3-6-months">3-6 months</SelectItem>
                  <SelectItem value="6-months+">6+ months</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="requirements">Specific Requirements</Label>
              <Textarea
                id="requirements"
                placeholder="Any specific technical requirements, integrations, or compliance needs..."
                value={formData.requirements}
                onChange={(e) => handleInputChange("requirements", e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companySize">Company Size</Label>
                <Select onValueChange={(value) => handleInputChange("companySize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="startup">Startup (1-10)</SelectItem>
                    <SelectItem value="small">Small (11-50)</SelectItem>
                    <SelectItem value="medium">Medium (51-200)</SelectItem>
                    <SelectItem value="large">Large (201-1000)</SelectItem>
                    <SelectItem value="enterprise">Enterprise (1000+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="industry">Industry</Label>
                <Select onValueChange={(value) => handleInputChange("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="compliance">Compliance Requirements</Label>
              <Select onValueChange={(value) => handleInputChange("compliance", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select compliance needs" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific requirements</SelectItem>
                  <SelectItem value="gdpr">GDPR</SelectItem>
                  <SelectItem value="hipaa">HIPAA</SelectItem>
                  <SelectItem value="sox">SOX</SelectItem>
                  <SelectItem value="pci">PCI DSS</SelectItem>
                  <SelectItem value="multiple">Multiple compliance needs</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="support">Support Level Needed</Label>
              <Select onValueChange={(value) => handleInputChange("support", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select support level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (Email support)</SelectItem>
                  <SelectItem value="standard">Standard (Email + Chat)</SelectItem>
                  <SelectItem value="premium">Premium (24/7 Phone + Priority)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (Dedicated support)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-4">
          <div className="flex space-x-1">
            {[1, 2, 3].map((stepNum) => (
              <div
                key={stepNum}
                className={`h-2 w-8 rounded ${
                  stepNum <= step ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            {step < 3 && (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
            {step === 3 && (
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceApplicationModal;
