import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, Video, Phone, MoveVertical as MoreVertical, Search, Sparkles } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppLayout } from "@/components/layout/AppLayout";
import { useMessages } from "@/hooks/useMessages";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { formatRelativeTime } from "@/lib/utils";

const Messages = () => {
  const [selectedMatchId, setSelectedMatchId] = useState<string>("");
  const [messageText, setMessageText] = useState("");
  
  const { conversations, loading: conversationsLoading } = useMessages();
  const { messages, loading: messagesLoading, sendMessage } = useMessages(selectedMatchId);

  const selectedConversation = conversations.find(c => c.match_id === selectedMatchId);

  const handleSendMessage = async () => {
    if (messageText.trim()) {
      const success = await sendMessage(selectedMatchId, messageText);
      if (success) {
        setMessageText("");
      }
    }
  };

  // Select first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !selectedMatchId) {
      setSelectedMatchId(conversations[0].match_id);
    }
  }, [conversations, selectedMatchId]);

  return (
    <AppLayout currentPage="messages">
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
              {conversationsLoading ? (
                <LoadingSpinner size="md" text="Loading conversations..." />
              ) : conversations.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No conversations yet</p>
                </div>
              ) : (
              <div className="space-y-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.match_id}
                    onClick={() => setSelectedMatchId(conversation.match_id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedMatchId === conversation.match_id
                        ? "bg-primary/10 border border-primary/20"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {conversation.other_user.display_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        {/* Always show as online for now */}
                        {true && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-secondary rounded-full border-2 border-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-foreground text-sm truncate">
                            {conversation.other_user.display_name}
                          </h3>
                          <span className="text-xs text-muted-foreground">
                            {conversation.last_message 
                              ? formatRelativeTime(conversation.last_message.created_at)
                              : 'No messages'
                            }
                          </span>
                        </div>
                        <p className={`text-sm truncate ${
                          conversation.unread_count > 0 ? "text-foreground font-medium" : "text-muted-foreground"
                        }`}>
                          {conversation.last_message?.content || 'Start a conversation'}
                        </p>
                      </div>
                      {conversation.unread_count > 0 && (
                        <div className="min-w-[20px] h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {conversation.unread_count}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              )}
            </ScrollArea>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 shadow-card overflow-hidden flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between bg-gradient-card">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {selectedConversation?.other_user.display_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {selectedConversation?.other_user.display_name || 'Select a conversation'}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Online
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
              {!selectedMatchId ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select a conversation to start messaging</p>
                </div>
              ) : messagesLoading ? (
                <LoadingSpinner size="md" text="Loading messages..." />
              ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender_id === selectedConversation?.other_user.id ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                        message.sender_id === selectedConversation?.other_user.id
                          ? "bg-muted text-foreground"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span
                          className={`text-xs ${
                            message.sender_id === selectedConversation?.other_user.id
                              ? "text-muted-foreground"
                              : "text-primary-foreground/70"
                          }`}
                        >
                          {formatRelativeTime(message.created_at)}
                        </span>
                        {message.sender_id !== selectedConversation?.other_user.id && message.read_at && (
                          <span className="text-xs text-primary-foreground/70">✓✓</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              )}
            </ScrollArea>

            {/* AI Assistant Suggestion */}
            {selectedMatchId && (
              <div className="px-4 py-2 bg-primary/5 border-t border-border">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>AI suggests: "How about scheduling a follow-up session?"</span>
              </div>
            </div>
            )}

            {/* Message Input */}
            {selectedMatchId && (
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
            )}
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
