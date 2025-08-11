import React from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { useNewsChat } from '@/hooks/useNewsChat';
import heroImage from '@/assets/news-sensei-hero.jpg';

const Index = () => {
  const {
    messages,
    isLoading,
    selectedBot,
    handleSendMessage,
    handleBotSelect,
  } = useNewsChat();

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center">
              <span className="text-white font-bold text-lg">NS</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">News Bot</h1>
              <p className="text-sm text-muted-foreground">Your AI News Companion</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Only show when no bot is selected */}
      {!selectedBot && (
        <div className="relative bg-gradient-to-br from-[hsl(var(--background))] to-[hsl(var(--chat-background))] overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <img 
            src={heroImage} 
            alt="News Sensei AI" 
            className="absolute inset-0 w-full h-64 object-cover opacity-30"
          />
          <div className="relative z-10 container mx-auto px-4 py-16 text-center">
            <h2 className="text-5xl font-bold mb-6 gradient-text animate-fade-in-up">
              Welcome to News Bot
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your intelligent news companion powered by AI. Get personalized summaries, fact-check information, and discover trending topics - all in one place.
            </p>
          </div>
        </div>
      )}

      {/* Main Chat Interface */}
      <main className="flex-1 flex">
        <ChatInterface
          selectedBot={selectedBot}
          onBotSelect={handleBotSelect}
          messages={messages}
          onSendMessage={handleSendMessage}
          isLoading={isLoading}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 News Bot</p>
            <div className="flex space-x-4 mt-2 sm:mt-0">
              <span>Personalized News</span>
              <span>•</span>
              <span>Fact Checking</span>
              <span>•</span>
              <span>Trending Topics</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
