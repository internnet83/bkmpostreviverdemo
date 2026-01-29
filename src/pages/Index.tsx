import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, Play, Sparkles, Edit3, AlertTriangle, Settings2, Globe, ChevronDown, Building2, ShoppingCart, Headphones, Users, Plane, Heart, GraduationCap, Home, Filter, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

// interface ReceivedMessage {
//   id: number;
//   origin: string;
//   data: unknown;
//   timestamp: Date;
//   isValid: boolean;
// }

const ALLOWED_ORIGINS: string[] = ["*"];

const Index = () => {
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [promptContent, setPromptContent] = useState("");

  // const isOriginAllowed = (origin: string): boolean => {
  //   if (ALLOWED_ORIGINS.includes("*")) return true;
  //   return ALLOWED_ORIGINS.includes(origin);
  // };

  // const sendAcknowledgment = useCallback((origin: string) => {
  //   const ackMessage = {
  //     type: "ACK",
  //     message: "Message received successfully",
  //     timestamp: new Date().toISOString(),
  //   };

  //   try {
  //     if (window.parent && window.parent !== window) {
  //       window.parent.postMessage(ackMessage, origin === "*" ? "*" : origin);
  //       console.log("📤 ACK sent to parent:", ackMessage);
  //     } else if (window.opener) {
  //       window.opener.postMessage(ackMessage, origin === "*" ? "*" : origin);
  //       console.log("📤 ACK sent to opener:", ackMessage);
  //     }
  //   } catch (error) {
  //     console.error("Failed to send ACK:", error);
  //   }
  // }, []);

  // const handleMessage = useCallback(
  //   (event: MessageEvent) => {
  //     const isValid = isOriginAllowed(event.origin);

  //     const receivedMessage: ReceivedMessage = {
  //       id: Date.now(),
  //       origin: event.origin,
  //       data: event.data,
  //       timestamp: new Date(),
  //       isValid,
  //     };

  //     console.log("📨 Message received:", {
  //       origin: event.origin,
  //       data: event.data,
  //       isValid,
  //     });

  //     setMessages((prev) => [receivedMessage, ...prev].slice(0, 50));

  //     if (isValid) {
  //       sendAcknowledgment(event.origin);
  //     }
  //   },
  //   [sendAcknowledgment]
  // );

  // useEffect(() => {
  //   window.addEventListener("message", handleMessage);
  //   setIsListening(true);
  //   console.log("🎧 Message listener active");

  //   return () => {
  //     window.removeEventListener("message", handleMessage);
  //     setIsListening(false);
  //     console.log("🔇 Message listener removed");
  //   };
  // }, [handleMessage]);

  // const formatData = (data: unknown): string => {
  //   try {
  //     return JSON.stringify(data, null, 2);
  //   } catch {
  //     return String(data);
  //   }
  // };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Prompt Playground</span>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
          <Play className="h-4 w-4" />
          Test Prompt
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Prompt History */}
        <aside className="w-56 border-r border-border bg-card flex flex-col">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <div>
                <div className="font-medium text-foreground text-sm">Prompt History</div>
                <div className="text-xs text-muted-foreground">{messages.length > 0 ? `${messages.length} messages` : "20 versions"}</div>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto px-3 pb-3 space-y-3">
            {historyItems.map((item, index) => (
              <div key={index} className="bg-background border border-border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="text-xs font-medium text-foreground leading-tight">{item.title}</div>
                  <Badge variant="outline" className={`text-[10px] px-1.5 py-0 ${item.statusColor} border-current`}>
                    {item.status}
                  </Badge>
                </div>
                {item.score && <div className="text-xs font-medium text-foreground">{item.score}</div>}
                <div className="text-[10px] text-muted-foreground">{item.date}</div>
                <div className="text-[10px] text-muted-foreground leading-relaxed">{item.description}</div>
                {item.metrics && (
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                      P {item.metrics.p}
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-muted-foreground">
                      U {item.metrics.u}
                    </Badge>
                  </div>
                )}
                <div className="space-y-1">
                  {item.tags.map((tag, tagIndex) => (
                    <div key={tagIndex} className={`text-[10px] px-2 py-1 rounded ${tag.color} leading-tight`}>
                      {tag.label}
                    </div>
                  ))}
                  {item.extra && (
                    <div className="text-[10px] text-muted-foreground">{item.extra}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 space-y-6">
          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Sparkles className="h-4 w-4" />
                Optimize with AI
              </Button>
              <Button variant="outline" className="gap-2 text-muted-foreground">
                <Edit3 className="h-4 w-4" />
                Optimize Manually
              </Button>
            </div>
            <Badge variant="outline" className="text-destructive border-destructive gap-1.5 px-3 py-1.5">
              <AlertTriangle className="h-4 w-4" />
              Setup Required
            </Badge>
          </div>

          {/* Models Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium text-foreground">Models</span>
            </div>
            <div className="flex gap-3">
              <Select defaultValue="vitos">
                <SelectTrigger className="w-40 bg-card">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vitos">
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-4 w-4" />
                      Vitos
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-44 bg-card">
                  <SelectValue placeholder="Select Version" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="v1">Version 1</SelectItem>
                  <SelectItem value="v2">Version 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Edit3 className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Prompt</span>
            </div>
            <Textarea
              placeholder="Enter your prompt here... Describe what you want your AI assistant to do."
              className="min-h-[200px] bg-card border-border resize-none text-foreground placeholder:text-muted-foreground"
              value={promptContent}
              onChange={(e) => setPromptContent(e.target.value)}
            />
          </div>

          {/* Categories Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-foreground">Categories</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start gap-3 h-11 bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <category.icon className="h-4 w-4" />
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-64 border-l border-border bg-card flex flex-col">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button className="flex-1 px-4 py-3 text-sm font-medium text-primary border-b-2 border-primary flex items-center justify-center gap-2">
              <Settings2 className="h-4 w-4" />
              Other Details
            </button>
            <button className="flex-1 px-4 py-3 text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
              <Edit3 className="h-4 w-4" />
              Guidelines
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Language Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="font-medium text-foreground text-sm">Language</span>
              </div>
              <Select defaultValue="auto">
                <SelectTrigger className="w-full bg-background">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select Language" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto-detect</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                The AI will automatically detect and respond in the user's language.
              </p>
            </div>

            {/* Advanced Settings */}
            <Collapsible>
              <CollapsibleTrigger className="flex items-center justify-between w-full py-2">
                <div className="flex items-center gap-2">
                  <Settings2 className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground text-sm">Advanced Settings</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2 space-y-2">
                <p className="text-xs text-muted-foreground">
                  Configure advanced model parameters here.
                </p>
              </CollapsibleContent>
            </Collapsible>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Index;
