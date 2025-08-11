import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Bot, User, Send, Sparkles, TrendingUp, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  botType?: 'news' | 'fact' | 'trending';
}

interface ChatInterfaceProps {
  selectedBot: string | null;
  onBotSelect: (bot: string) => void;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const BOTS = [
  {
    id: 'news',
    name: 'News Summary Bot',
    description: 'Get personalized news summaries tailored to your interests',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    example: "Get me today's tech news summary"
  },
  {
    id: 'fact',
    name: 'Fact Checker Bot',
    description: 'Verify information instantly with reliable sources',
    icon: Shield,
    color: 'from-green-500 to-emerald-500',
    example: "Is it true that AI will replace all jobs by 2030?"
  },
  {
    id: 'trending',
    name: 'Trending Topics Bot',
    description: 'Discover what\'s trending worldwide right now',
    icon: TrendingUp,
    color: 'from-purple-500 to-pink-500',
    example: "What's trending in technology today?"
  }
];

const TypingIndicator = () => (
  <div className="flex items-center space-x-2 p-4">
    <div className="chat-bubble-bot">
      <div className="typing-dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </div>
);

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  selectedBot,
  onBotSelect,
  messages,
  onSendMessage,
  isLoading
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (selectedBot && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedBot]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && selectedBot) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleExampleClick = (example: string) => {
    if (selectedBot) {
      onSendMessage(example);
    }
  };

  if (!selectedBot) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Welcome to News Bot
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Your AI-powered news companion. Choose a bot below to get started with personalized news, fact-checking, or trending topics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          {BOTS.map((bot, index) => {
            const IconComponent = bot.icon;
            return (
              <Card
                key={bot.id}
                className={cn(
                  "bot-card group relative overflow-hidden",
                  "animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => onBotSelect(bot.id)}
              >
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity",
                  bot.color
                )} />
                
                <div className="relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-lg bg-gradient-to-br flex items-center justify-center mb-4",
                    bot.color
                  )}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{bot.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{bot.description}</p>
                  
                  <div className="bg-muted/50 rounded-lg p-3 text-xs text-muted-foreground">
                    <span className="text-primary font-medium">Try: </span>
                    "{bot.example}"
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const currentBot = BOTS.find(bot => bot.id === selectedBot);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          {currentBot && (
            <>
              <div className={cn(
                "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                currentBot.color
              )}>
                <currentBot.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold">{currentBot.name}</h2>
                <p className="text-sm text-muted-foreground">{currentBot.description}</p>
              </div>
            </>
          )}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onBotSelect('')}
          className="text-muted-foreground hover:text-foreground"
        >
          Switch Bot
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.length === 0 && currentBot && (
          <div className="text-center py-8 animate-fade-in-up">
            <div className={cn(
              "w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center mx-auto mb-4 animate-pulse-glow",
              currentBot.color
            )}>
              <currentBot.icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start chatting with {currentBot.name}</h3>
            <p className="text-muted-foreground mb-6">{currentBot.description}</p>
            
            <div className="bg-muted/30 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-muted-foreground mb-2">Try this example:</p>
              <button
                onClick={() => handleExampleClick(currentBot.example)}
                className="text-primary hover:text-primary/80 text-sm font-medium transition-colors cursor-pointer"
              >
                "{currentBot.example}"
              </button>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div key={message.id} className="chat-message">
            <div className={cn(
              "flex items-start space-x-3",
              message.type === 'user' ? 'justify-end' : 'justify-start'
            )}>
              {message.type === 'bot' && (
                <div className={cn(
                  "w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                  currentBot?.color || 'from-blue-500 to-cyan-500'
                )}>
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={cn(
                message.type === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'
              )}>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              </div>
              
              {message.type === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-[hsl(var(--chat-user))] flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex space-x-3">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={`Ask ${currentBot?.name.split(' ')[0]} something...`}
            className="chat-input flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            disabled={!inputValue.trim() || isLoading}
            className="btn-news px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};