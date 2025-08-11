import { useState, useCallback } from 'react';
import { newsService } from '@/services/newsService';
import { Message } from '@/components/ChatInterface';

export const useNewsChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBot, setSelectedBot] = useState<string | null>(null);

  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const processNewsQuery = async (query: string): Promise<string> => {
    const lowercaseQuery = query.toLowerCase();
    
    // Detect query type and extract parameters
    if (lowercaseQuery.includes('trending') || lowercaseQuery.includes('popular')) {
      const response = await newsService.getTrendingTopics();
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    if (lowercaseQuery.includes('tech') || lowercaseQuery.includes('technology')) {
      const response = await newsService.getNewsByCategory('technology');
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    if (lowercaseQuery.includes('business') || lowercaseQuery.includes('finance')) {
      const response = await newsService.getNewsByCategory('business');
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    if (lowercaseQuery.includes('health')) {
      const response = await newsService.getNewsByCategory('health');
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    if (lowercaseQuery.includes('sports')) {
      const response = await newsService.getNewsByCategory('sports');
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    if (lowercaseQuery.includes('entertainment')) {
      const response = await newsService.getNewsByCategory('entertainment');
      return newsService.formatNewsForChat(response.articles, 5);
    }
    
    // Default to search
    const response = await newsService.searchNews(query);
    return newsService.formatNewsForChat(response.articles, 5);
  };

  const processTrendingQuery = async (query: string): Promise<string> => {
    const lowercaseQuery = query.toLowerCase();
    
    if (lowercaseQuery.includes('tech') || lowercaseQuery.includes('technology')) {
      const response = await newsService.searchNews('technology trending', 'popularity');
      return `🔥 **Trending in Technology:**\n\n${newsService.formatNewsForChat(response.articles, 5)}`;
    }
    
    if (lowercaseQuery.includes('world') || lowercaseQuery.includes('global')) {
      const response = await newsService.getTopHeadlines('us');
      return `🌍 **Global Trending Topics:**\n\n${newsService.formatNewsForChat(response.articles, 5)}`;
    }
    
    // Default trending
    const response = await newsService.getTrendingTopics();
    return `📈 **What's Trending Now:**\n\n${newsService.formatNewsForChat(response.articles, 5)}`;
  };

  const processFactCheck = async (query: string): Promise<string> => {
    // Extract the statement to check
    const statement = query.replace(/^(check|verify|is it true|fact check)/i, '').trim();
    
    if (!statement) {
      return `Please provide a statement to fact-check. For example:
      
• "Is it true that AI will replace all jobs by 2030?"
• "Check: Electric cars are better for the environment"
• "Verify: The moon landing was fake"`;
    }
    
    return await newsService.checkFact(statement);
  };

  const handleSendMessage = useCallback(async (content: string) => {
    if (!selectedBot) return;

    // Add user message
    addMessage({
      type: 'user',
      content,
    });

    setIsLoading(true);

    try {
      let botResponse: string;

      switch (selectedBot) {
        case 'news':
          botResponse = await processNewsQuery(content);
          break;
        case 'fact':
          botResponse = await processFactCheck(content);
          break;
        case 'trending':
          botResponse = await processTrendingQuery(content);
          break;
        default:
          botResponse = "I'm sorry, I don't understand which service you'd like to use.";
      }

      // Add bot response
      addMessage({
        type: 'bot',
        content: botResponse,
        botType: selectedBot as 'news' | 'fact' | 'trending',
      });
    } catch (error) {
      console.error('Error processing message:', error);
      addMessage({
        type: 'bot',
        content: "I'm sorry, I encountered an error while processing your request. Please try again.",
        botType: selectedBot as 'news' | 'fact' | 'trending',
      });
    } finally {
      setIsLoading(false);
    }
  }, [selectedBot, addMessage]);

  const handleBotSelect = useCallback((botId: string) => {
    setSelectedBot(botId || null);
    if (botId) {
      // Clear messages when switching bots
      setMessages([]);
    }
  }, []);

  return {
    messages,
    isLoading,
    selectedBot,
    handleSendMessage,
    handleBotSelect,
  };
};