import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageSquare, Send, User, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/_protected/chats")({
  component: Chats,
  head: () => ({ meta: [{ title: "Chats & Support — Fourspring Consort Admin" }] }),
});

const mockConversations = [
  { id: "1", name: "Adebayo Ogun", product: "FindWorkers", lastMessage: "I need help with job posting", time: "2m", unread: true },
  { id: "2", name: "Chioma Nwafor", product: "Business Command", lastMessage: "How do I export reports?", time: "15m", unread: true },
  { id: "3", name: "Emeka Eze", product: "Elevate Website", lastMessage: "Thank you for the support!", time: "1h", unread: false },
  { id: "4", name: "Fatima Bello", product: "FindWorkers", lastMessage: "Can I upgrade my plan?", time: "3h", unread: false },
  { id: "5", name: "Grace Okafor", product: "Business Command", lastMessage: "Great product!", time: "1d", unread: false },
];

const mockMessages = [
  { sender: "customer", text: "Hi, I need help with posting a job on FindWorkers.", time: "2:30 PM" },
  { sender: "admin", text: "Hello! I'd be happy to help. What kind of job are you looking to post?", time: "2:32 PM" },
  { sender: "customer", text: "I need a frontend developer for a 3-month contract.", time: "2:33 PM" },
  { sender: "customer", text: "I tried creating the listing but got stuck on the skills section.", time: "2:33 PM" },
];

function Chats() {
  const [selected, setSelected] = useState(mockConversations[0]);
  const [reply, setReply] = useState("");

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Chats & Support</h2>
        <p className="text-sm text-muted-foreground mt-1">Manage customer conversations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
        {/* Conversation list */}
        <div className="bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-3 border-b border-border">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 py-2 bg-background border border-input rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {mockConversations.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full p-3 text-left hover:bg-admin-surface transition-colors ${selected.id === c.id ? "bg-admin-surface" : ""}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-[10px] text-muted-foreground">{c.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground truncate mr-2">{c.lastMessage}</span>
                  {c.unread && <span className="w-2 h-2 rounded-full bg-admin-brand shrink-0" />}
                </div>
                <span className="text-[10px] text-admin-brand mt-1 block">{c.product}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat panel */}
        <div className="md:col-span-2 bg-card border border-border rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <p className="font-semibold text-foreground">{selected.name}</p>
              <p className="text-xs text-muted-foreground">{selected.product}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-admin-stat-green/10 text-admin-stat-green rounded-full">Active</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {mockMessages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === "admin" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[70%] px-4 py-2.5 rounded-2xl text-sm ${
                  m.sender === "admin"
                    ? "bg-admin-brand text-admin-brand-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  <p>{m.text}</p>
                  <p className={`text-[10px] mt-1 ${m.sender === "admin" ? "text-white/60" : "text-muted-foreground"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 border-t border-border flex gap-2">
            <input
              type="text"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="Type a reply..."
              className="flex-1 px-4 py-2.5 bg-background border border-input rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-admin-brand/30"
            />
            <button className="px-4 py-2.5 bg-admin-brand text-admin-brand-foreground rounded-xl hover:opacity-90 transition-opacity">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
