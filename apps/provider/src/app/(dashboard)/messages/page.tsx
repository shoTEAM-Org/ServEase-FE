"use client";

import { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, ExternalLink, Star, MoreVertical, CheckCheck, CheckCircle2 } from 'lucide-react';
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

interface Message {
  id: number;
  text?: string;
  imageUri?: string;
  timestamp: string;
  sender: 'provider' | 'customer';
}

interface Booking {
  serviceType: string;
  date: string;
  time: string;
  status: string;
}

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  rating?: number;
  bookingRef?: string;
  category: 'booking' | 'general';
  booking?: Booking;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<number | null>(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<'all' | 'booking' | 'general'>('all');

  const messageThreadRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock conversations data
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 1,
      name: 'Maria Santos',
      avatar: 'MS',
      lastMessage: 'Thank you for the excellent service!',
      timestamp: '10:30 AM',
      unread: 2,
      rating: 5,
      bookingRef: 'BK-2024-001',
      category: 'booking',
      booking: {
        serviceType: 'House Cleaning',
        date: 'March 25, 2026',
        time: '9:00 AM',
        status: 'Confirmed',
      },
      messages: [
        { id: 1, text: 'Hi! I would like to book your services for next week.', timestamp: '10:15 AM', sender: 'customer' },
        { id: 2, text: 'Hello! I\'d be happy to help. What service are you looking for?', timestamp: '10:17 AM', sender: 'provider' },
        { id: 3, text: 'I need house cleaning for a 3-bedroom apartment.', timestamp: '10:20 AM', sender: 'customer' },
        { id: 4, text: 'Perfect! I can do that. When would you prefer?', timestamp: '10:22 AM', sender: 'provider' },
        { id: 5, text: 'How about this Saturday at 9 AM?', timestamp: '10:25 AM', sender: 'customer' },
        { id: 6, text: 'Saturday at 9 AM works great for me. I\'ll see you then!', timestamp: '10:27 AM', sender: 'provider' },
        { id: 7, text: 'Thank you for the excellent service!', timestamp: '10:30 AM', sender: 'customer' },
      ],
    },
    {
      id: 2,
      name: 'John Reyes',
      avatar: 'JR',
      lastMessage: 'Can you send me the invoice?',
      timestamp: 'Yesterday',
      unread: 0,
      rating: 4,
      bookingRef: 'BK-2024-002',
      category: 'booking',
      booking: {
        serviceType: 'Plumbing Repair',
        date: 'March 23, 2026',
        time: '2:00 PM',
        status: 'Completed',
      },
      messages: [
        { id: 1, text: 'Hi, I saw your profile and I\'m interested in your plumbing services.', timestamp: 'Yesterday 3:00 PM', sender: 'customer' },
        { id: 2, text: 'Hello! I\'d be glad to help. What seems to be the issue?', timestamp: 'Yesterday 3:05 PM', sender: 'provider' },
        { id: 3, text: 'I have a leaking pipe in the bathroom.', timestamp: 'Yesterday 3:10 PM', sender: 'customer' },
        { id: 4, text: 'I can come by tomorrow to take a look. Does 2 PM work for you?', timestamp: 'Yesterday 3:15 PM', sender: 'provider' },
        { id: 5, text: 'Can you send me the invoice?', timestamp: 'Yesterday 4:00 PM', sender: 'customer' },
      ],
    },
    {
      id: 3,
      name: 'Anna Cruz',
      avatar: 'AC',
      lastMessage: 'What time can you come tomorrow?',
      timestamp: '2 days ago',
      unread: 0,
      category: 'general',
      messages: [
        { id: 1, text: 'Hello! Do you do electrical repairs?', timestamp: '2 days ago 11:00 AM', sender: 'customer' },
        { id: 2, text: 'Yes, I do! What do you need help with?', timestamp: '2 days ago 11:10 AM', sender: 'provider' },
        { id: 3, text: 'My ceiling fan stopped working.', timestamp: '2 days ago 11:15 AM', sender: 'customer' },
        { id: 4, text: 'I can check that for you. When are you available?', timestamp: '2 days ago 11:20 AM', sender: 'provider' },
        { id: 5, text: 'What time can you come tomorrow?', timestamp: '2 days ago 11:25 AM', sender: 'customer' },
      ],
    },
  ]);

  const quickReplies = ['On my way', 'Running 5 mins late', 'Completed'];

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch = conv.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterTab === 'all' ||
      (filterTab === 'booking' && conv.category === 'booking') ||
      (filterTab === 'general' && conv.category === 'general');
    return matchesSearch && matchesFilter;
  });

  const activeConversation = conversations.find((c) => c.id === selectedConversation);

  useEffect(() => {
    if (messageThreadRef.current) {
      messageThreadRef.current.scrollTop = messageThreadRef.current.scrollHeight;
    }
  }, [activeConversation?.messages]);

  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation !== null) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
      
      const newMessage: Message = {
        id: Date.now(),
        text: messageText.trim(),
        timestamp,
        sender: 'provider',
      };

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation
            ? { ...conv, messages: [...conv.messages, newMessage], lastMessage: messageText.trim() }
            : conv
        )
      );
      setMessageText('');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] font-['Inter',sans-serif] bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar: Conversation List */}
        <div className="w-[400px] border-r border-gray-100 flex flex-col bg-gray-50/30">
          <div className="p-8 space-y-6">
            <h2 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Messages</h2>
            
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#00BF63] transition-colors" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 rounded-2xl border-none shadow-sm group-focus-within:shadow-md transition-all bg-white"
              />
            </div>

            <div className="flex items-center gap-2 p-1 bg-white rounded-xl shadow-sm border border-gray-100">
              {["all", "booking", "general"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilterTab(tab as any)}
                  className={`flex-1 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${filterTab === tab ? "bg-[#00BF63] text-white" : "text-gray-400 hover:text-gray-600"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-3xl transition-all relative group ${selectedConversation === conv.id ? "bg-white shadow-lg shadow-gray-100 border border-gray-100" : "hover:bg-white/50"}`}
              >
                <div className="relative">
                   <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00BF63] to-[#00A055] flex items-center justify-center text-white font-black text-lg">
                      {conv.avatar}
                   </div>
                   {conv.unread > 0 && (
                     <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                        <span className="text-[10px] font-black text-white">{conv.unread}</span>
                     </div>
                   )}
                </div>

                <div className="flex-1 text-left min-w-0">
                   <div className="flex items-center justify-between mb-1">
                      <span className="text-[15px] font-black text-gray-900 truncate font-['Poppins',sans-serif]">{conv.name}</span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{conv.timestamp}</span>
                   </div>
                   <p className="text-xs text-gray-400 font-medium truncate leading-tight">{conv.lastMessage}</p>
                   {conv.bookingRef && (
                     <div className="mt-2 flex items-center gap-2">
                        <span className="text-[9px] font-black text-[#00BF63] bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
                           {conv.bookingRef}
                        </span>
                     </div>
                   )}
                </div>
                {selectedConversation === conv.id && <div className="absolute right-4 w-1.5 h-1.5 bg-[#00BF63] rounded-full" />}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-50 flex items-center justify-between px-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-[#00BF63] font-black text-lg border border-gray-100">
                    {activeConversation.avatar}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">{activeConversation.name}</h3>
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-[#00BF63] rounded-full animate-pulse" />
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Online Now</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                   <Button variant="ghost" className="h-12 px-6 rounded-2xl text-gray-400 font-bold hover:bg-gray-50">
                      <ExternalLink className="w-5 h-5 mr-2" /> View Profile
                   </Button>
                   <Button variant="ghost" className="h-12 w-12 rounded-2xl text-gray-400 hover:text-gray-900 p-0">
                      <MoreVertical className="w-6 h-6" />
                   </Button>
                </div>
              </div>

              {/* Booking Context Banner */}
              {activeConversation.booking && (
                <div className="px-10 py-4 bg-blue-50/30 border-b border-blue-50 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center">
                         <Star className="w-5 h-5 text-blue-500 fill-blue-500" />
                      </div>
                      <div className="flex flex-col">
                         <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">Current Booking</span>
                         <span className="text-sm font-black text-blue-900">{activeConversation.booking.serviceType} • {activeConversation.booking.date}</span>
                      </div>
                   </div>
                   <Badge className="bg-blue-100 text-blue-700 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-lg">
                      {activeConversation.booking.status}
                   </Badge>
                </div>
              )}

              {/* Messages Thread */}
              <div 
                className="flex-1 overflow-y-auto p-10 space-y-8 bg-gray-50/20"
                ref={messageThreadRef}
              >
                {activeConversation.messages.map((m) => {
                  const isP = m.sender === 'provider';
                  return (
                    <div key={m.id} className={`flex flex-col ${isP ? "items-end" : "items-start"}`}>
                       <div className={`max-w-[70%] p-5 rounded-[1.5rem] text-sm font-medium leading-relaxed shadow-sm border ${isP ? "bg-[#1E293B] text-white border-transparent rounded-tr-none" : "bg-white text-gray-900 border-gray-100 rounded-tl-none"}`}>
                          {m.text}
                       </div>
                       <div className={`mt-2 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-300 ${isP ? "flex-row-reverse" : ""}`}>
                          {m.timestamp}
                          {isP && <CheckCheck className="w-3.5 h-3.5 text-[#00BF63]" />}
                       </div>
                    </div>
                  );
                })}
              </div>

              {/* Input Area */}
              <div className="p-8 bg-white border-t border-gray-50 px-10 pb-10 space-y-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                   {quickReplies.map(r => (
                     <button
                       key={r}
                       onClick={() => setMessageText(r)}
                       className="px-6 py-2 bg-gray-50 hover:bg-[#00BF63] hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-400 transition-all whitespace-nowrap"
                     >
                       {r}
                     </button>
                   ))}
                </div>

                <div className="flex items-center gap-4 bg-gray-50/50 p-2 rounded-[2rem] border border-gray-100 shadow-inner group-focus-within:border-[#00BF63] transition-all">
                  <Button variant="ghost" className="h-14 w-14 rounded-full text-gray-400 hover:text-[#00BF63] hover:bg-white p-0">
                    <Paperclip className="w-6 h-6" />
                  </Button>
                  <textarea
                    className="flex-1 bg-transparent border-none outline-none resize-none py-4 px-2 text-sm font-bold text-gray-900 placeholder-gray-300 min-h-[56px] max-h-32"
                    placeholder="Write a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button 
                    className="h-14 px-8 rounded-[1.5rem] bg-[#00BF63] hover:bg-[#00A055] text-white font-black shadow-lg shadow-green-100 transition-all hover:scale-[1.05]"
                    onClick={handleSendMessage}
                  >
                    Send
                    <Send className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-20">
               <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-6">
                  <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center">
                     <CheckCircle2 className="w-6 h-6 text-gray-200" />
                  </div>
               </div>
               <h3 className="text-2xl font-black text-gray-900 font-['Poppins',sans-serif] tracking-tight">Select a conversation</h3>
               <p className="text-gray-400 font-medium max-w-sm mt-2 font-['Inter',sans-serif]">Connect with your clients and manage booking details directly through real-time messaging.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
