
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, AlertCircle, Clock, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SupportTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SupportTicketModal = ({ isOpen, onClose }: SupportTicketModalProps) => {
  const [formData, setFormData] = useState({
    subject: "",
    category: "",
    priority: "",
    service: "",
    description: "",
    steps: "",
    impact: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.subject || !formData.category || !formData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const ticketId = Math.floor(Math.random() * 10000);
      toast({
        title: "Support Ticket Created!",
        description: `Your ticket #${ticketId} has been created. Our team will respond within 2 hours.`,
      });
      setIsSubmitting(false);
      onClose();
      setFormData({
        subject: "",
        category: "",
        priority: "",
        service: "",
        description: "",
        steps: "",
        impact: ""
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="h-6 w-6 text-blue-600" />
            Create Support Ticket
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Quick Info Card */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900">Before creating a ticket</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Check our <span className="underline cursor-pointer">Knowledge Base</span> for common solutions. 
                    For urgent issues, use our Live Chat feature.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ticket Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
              <Input
                id="subject"
                placeholder="Brief description of your issue"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                <Select onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical Issue</SelectItem>
                    <SelectItem value="billing">Billing & Payments</SelectItem>
                    <SelectItem value="account">Account Management</SelectItem>
                    <SelectItem value="performance">Performance Issues</SelectItem>
                    <SelectItem value="security">Security Concerns</SelectItem>
                    <SelectItem value="feature">Feature Request</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        Low - General question
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        Medium - Affects some users
                      </div>
                    </SelectItem>
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        High - Business impact
                      </div>
                    </SelectItem>
                    <SelectItem value="critical">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        Critical - Service down
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="service">Affected Service</Label>
              <Select onValueChange={(value) => handleInputChange("service", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service (if applicable)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crm-suite">CRM Suite Pro</SelectItem>
                  <SelectItem value="cloud-infrastructure">Cloud Infrastructure</SelectItem>
                  <SelectItem value="dev-platform">Development Platform</SelectItem>
                  <SelectItem value="all">All Services</SelectItem>
                  <SelectItem value="none">Not service-specific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Problem Description <span className="text-red-500">*</span></Label>
              <Textarea
                id="description"
                placeholder="Please describe the issue in detail..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="steps">Steps to Reproduce (if applicable)</Label>
              <Textarea
                id="steps"
                placeholder="1. First I did...&#10;2. Then I clicked...&#10;3. The error occurred when..."
                value={formData.steps}
                onChange={(e) => handleInputChange("steps", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="impact">Business Impact</Label>
              <Select onValueChange={(value) => handleInputChange("impact", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="How is this affecting your business?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no-impact">No business impact</SelectItem>
                  <SelectItem value="minor">Minor inconvenience</SelectItem>
                  <SelectItem value="moderate">Moderate impact on productivity</SelectItem>
                  <SelectItem value="significant">Significant business disruption</SelectItem>
                  <SelectItem value="critical">Critical - Business operations stopped</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* File Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">
                Drag & drop files here or <span className="text-blue-600 cursor-pointer underline">browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Screenshots, logs, or documents (max 10MB each)
              </p>
            </div>
          </div>

          {/* Response Time Info */}
          <Card className="bg-gray-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-sm">Expected Response Times</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Low Priority:</span>
                  <Badge variant="outline">24 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Medium Priority:</span>
                  <Badge variant="outline">8 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span>High Priority:</span>
                  <Badge variant="outline">2 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Critical:</span>
                  <Badge variant="outline">30 minutes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Ticket"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SupportTicketModal;
