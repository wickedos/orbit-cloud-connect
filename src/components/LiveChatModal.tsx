
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, Send, Clock, User, Bot, Paperclip, Phone, X } from "lucide-react";

interface LiveChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: "user" | "agent" | "system";
  content: string;
  timestamp: Date;
  agentName?: string;
}

const LiveChatModal = ({ isOpen, onClose }: LiveChatModalProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatStatus, setChatStatus] = useState<"connecting" | "connected" | "waiting">("connecting");
  const [agentName] = useState("Sarah Johnson");
  const [queuePosition, setQueuePosition] = useState(3);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Simulate connection process
      setTimeout(() => {
        setChatStatus("waiting");
        setMessages([{
          id: "1",
          sender: "system",
          content: "You are currently #3 in queue. Average wait time is 2-3 minutes.",
          timestamp: new Date()
        }]);
      }, 1000);

      // Simulate queue updates
      const queueInterval = setInterval(() => {
        setQueuePosition(prev => {
          if (prev > 1) {
            const newPos = prev - 1;
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              sender: "system",
              content: `You are now #${newPos} in queue.`,
              timestamp: new Date()
            }]);
            return newPos;
          } else {
            setChatStatus("connected");
            setMessages(prev => [...prev, 
              {
                id: Date.now().toString(),
                sender: "system",
                content: `${agentName} has joined the chat.`,
                timestamp: new Date()
              },
              {
                id: (Date.now() + 1).toString(),
                sender: "agent",
                content: "Hi! I'm Sarah, your customer support agent. How can I help you today?",
                timestamp: new Date(),
                agentName
              }
            ]);
            clearInterval(queueInterval);
            return 0;
          }
        });
      }, 3000);

      return () => clearInterval(queueInterval);
    }
  }, [isOpen, agentName]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");

    // Simulate agent response (only if connected)
    if (chatStatus === "connected") {
      setTimeout(() => {
        const responses = [
          "I understand your concern. Let me look into this for you.",
          "That's a great question. Let me check our documentation for the most accurate information.",
          "I can definitely help you with that. Let me pull up your account details.",
          "Thank you for the additional details. This helps me understand the issue better.",
          "I've found a solution for you. Let me walk you through the steps."
        ];

        const agentResponse: Message = {
          id: (Date.now() + 100).toString(),
          sender: "agent",
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          agentName
        };

        setMessages(prev => [...prev, agentResponse]);
      }, 1000 + Math.random() * 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md h-[600px] p-0 flex flex-col">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <div>
                <h3 className="font-semibold">Live Support</h3>
                <div className="flex items-center gap-1 text-xs text-blue-100">
                  <div className={`w-2 h-2 rounded-full ${
                    chatStatus === "connected" ? "bg-green-400" :
                    chatStatus === "waiting" ? "bg-yellow-400" : "bg-gray-400"
                  }`}></div>
                  {chatStatus === "connected" && `Connected to ${agentName}`}
                  {chatStatus === "waiting" && `Position in queue: #${queuePosition}`}
                  {chatStatus === "connecting" && "Connecting..."}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}>
                <div className={`flex gap-2 max-w-[80%] ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className={
                      message.sender === "user" ? "bg-blue-100 text-blue-600" :
                      message.sender === "agent" ? "bg-green-100 text-green-600" :
                      "bg-gray-100 text-gray-600"
                    }>
                      {message.sender === "user" ? <User className="h-4 w-4" /> :
                       message.sender === "agent" ? message.agentName?.charAt(0) || "A" :
                       <Bot className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`rounded-lg p-3 ${
                    message.sender === "user" ? "bg-blue-600 text-white" :
                    message.sender === "agent" ? "bg-gray-100 text-gray-900" :
                    "bg-yellow-50 text-yellow-800 border border-yellow-200"
                  }`}>
                    {message.sender === "agent" && (
                      <div className="text-xs font-medium mb-1 text-gray-600">
                        {message.agentName}
                      </div>
                    )}
                    <p className="text-sm">{message.content}</p>
                    <div className={`text-xs mt-1 opacity-70 ${
                      message.sender === "user" ? "text-blue-100" : "text-gray-500"
                    }`}>
                      {formatTime(message.timestamp)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Quick Actions */}
        {chatStatus === "connected" && (
          <div className="px-4 py-2 border-t bg-gray-50">
            <div className="flex gap-1 flex-wrap">
              <Button variant="outline" size="sm" className="text-xs">
                Reset Password
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Billing Question
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                Technical Issue
              </Button>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled={chatStatus !== "connected"}>
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input
              placeholder={
                chatStatus === "connected" ? "Type your message..." :
                chatStatus === "waiting" ? "Please wait to be connected..." :
                "Connecting to support..."
              }
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={chatStatus !== "connected"}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={chatStatus !== "connected" || !newMessage.trim()}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          {chatStatus === "connected" && (
            <p className="text-xs text-gray-500 mt-2">
              {agentName} is typing...
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveChatModal;
