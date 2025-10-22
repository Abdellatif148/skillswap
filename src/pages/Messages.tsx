import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Send, Paperclip, Video, Phone, MoreVertical, Search, MessageCircle, Bell } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatContact {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  avatar?: string;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: "me" | "other";
  read: boolean;
}

const Messages = () => {
  const navigate = useNavigate();
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [messageText, setMessageText] = useState("");

  const contacts: ChatContact[] = [
    { id: 1, name: "Sarah Chen", lastMessage: "Great session today!", timestamp: "2m ago", unread: true, online: true },
    { id: 2, name: "Alex Kumar", lastMessage: "When can we schedule next?", timestamp: "1h ago", unread: false, online: true },
    { id: 3, name: "Maria Lopez", lastMessage: "Thanks for the tips!", timestamp: "3h ago", unread: false, online: false },
    { id: 4, name: "John Smith", lastMessage: "See you tomorrow!", timestamp: "1d ago", unread: false, online: false },
  ];

  const messages: Message[] = [
    { id: 1, text: "Hi! Ready for our design session?", timestamp: "10:30 AM", sender: "other", read: true },
    { id: 2, text: "Yes! I'm excited to learn about UI design principles.", timestamp: "10:32 AM", sender: "me", read: true },
    { id: 3, text: "Perfect! Let me share some resources first.", timestamp: "10:33 AM", sender: "other", read: true },
    { id: 4, text: "Great session today! Really learned a lot about color theory.", timestamp: "11:45 AM", sender: "me", read: true },
    { id: 5, text: "I'm glad! You're making great progress. Same time next week?", timestamp: "11:47 AM", sender: "other", read: true },
  ];

  const selectedContact = contacts.find(c => c.id === selectedChat);

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center shadow-soft">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">SkillSwap</span>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                <Button variant="ghost" className="text-primary">Messages</Button>
                <Button variant="ghost" onClick={() => navigate("/profile")}>Profile</Button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
              </Button>
              <Avatar className="h-9 w-9 cursor-pointer" onClick={() => navigate("/profile")}>
                <AvatarFallback className="bg-primary text-primary-foreground">U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      {/* Messages Layout */}
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-120px)]">
          {/* Chat List */}
          <Card className="lg:col-span-1 p-4 shadow-card overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground">Messages</h2>
              <Button size="icon" variant="ghost">
                <Search className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="mb-4">
              <Input placeholder="Search conversations..." className="w-full" />
            </div>

            <ScrollArea className="flex-1 -mx-4 px-4">
              <div className="space-y-2">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedChat(contact.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat === contact.id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {contact.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground text-sm truncate">
                            {contact.name}
                          </h3>
                          <span className="text-xs text-muted-foreground">{contact.timestamp}</span>
                        </div>
                        <p className={`text-sm truncate ${
                          contact.unread ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}>
                          {contact.lastMessage}
                        </p>
                      </div>
                      {contact.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 shadow-card overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-card">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedContact?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">{selectedContact?.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedContact?.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Video className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.sender === "me"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span
                          className={`text-xs ${
                            message.sender === "me"
                              ? "text-primary-foreground/70"
                              : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </span>
                        {message.sender === "me" && message.read && (
                          <span className="text-xs text-primary-foreground/70">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* AI Assistant Suggestion */}
            <div className="px-4 py-2 bg-primary/5 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI suggests: "How about scheduling a follow-up session?"</span>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-gradient-card">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Type your message..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  className="bg-primary hover:bg-primary-dark"
                  onClick={handleSendMessage}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm">
            <MessageCircle className="h-5 w-5 text-primary" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => navigate("/profile")}>
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">U</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
