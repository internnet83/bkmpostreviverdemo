import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// interface ReceivedMessage {
//   id: number;
//   origin: string;
//   data: unknown;
//   timestamp: Date;
//   isValid: boolean;
// }

// Configure allowed origins - for demo purposes, allow all origins
// In production, replace with specific parent app origin(s)
const ALLOWED_ORIGINS: string[] = ["*"]; // Use ["https://your-parent-app.com"] in production

const Index = () => {
  const [messages, setMessages] = useState<ReceivedMessage[]>([]);
  const [isListening, setIsListening] = useState(false);

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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-xl font-semibold text-foreground">
              postMessage Receiver
            </h1>
            <Badge
              variant={isListening ? "default" : "secondary"}
              className="font-mono text-xs"
            >
              <span
                className={`mr-1.5 inline-block h-2 w-2 rounded-full ${
                  isListening ? "bg-primary animate-pulse-glow" : "bg-muted-foreground"
                }`}
              />
              {isListening ? "Listening" : "Inactive"}
            </Badge>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            Embed this app in an iframe or popup to receive messages via{" "}
            <code className="rounded bg-secondary px-1.5 py-0.5 text-accent">
              window.postMessage()
            </code>
          </p>
        </div>

        {/* Messages Container */}
        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border pb-3">
            <CardTitle className="font-mono text-sm font-medium text-muted-foreground">
              Received Messages ({messages.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="mb-3 font-mono text-4xl opacity-30">📭</div>
                <p className="font-mono text-sm text-muted-foreground">
                  No messages received yet
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground/70">
                  Waiting for postMessage from parent window...
                </p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {messages.map((msg) => (
                  <div key={msg.id} className="p-4 space-y-3">
                    {/* Message Header */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <Badge
                        variant={msg.isValid ? "default" : "destructive"}
                        className="font-mono"
                      >
                        {msg.isValid ? "✓ Valid" : "✗ Blocked"}
                      </Badge>
                      <span className="font-mono text-muted-foreground">
                        from{" "}
                        <code className="rounded bg-secondary px-1.5 py-0.5 text-foreground">
                          {msg.origin || "null"}
                        </code>
                      </span>
                      <span className="font-mono text-muted-foreground/70">
                        {msg.timestamp.toLocaleTimeString()}
                      </span>
                    </div>

                    {/* Message Data */}
                    <pre className="overflow-x-auto rounded-md bg-secondary/50 p-3 font-mono text-sm text-foreground">
                      {formatData(msg.data)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Usage Instructions */}
        <Card className="border-border bg-card/50">
          <CardHeader className="pb-3">
            <CardTitle className="font-mono text-sm font-medium text-muted-foreground">
              Usage Example
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="overflow-x-auto rounded-md bg-secondary/50 p-4 font-mono text-xs text-foreground">
{`// From parent window
const iframe = document.querySelector('iframe');
iframe.contentWindow.postMessage({
  type: "TEST_MESSAGE",
  message: "Hello from parent app"
}, "*");`}
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
