import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

interface User {
  id: number;
  name: string;
  age: number;
  distance: number;
  favoriteDrink: string;
  image: string;
  location: string;
  isOnline: boolean;
}

const users: Record<number, User> = {
  1: {
    id: 1,
    name: "Лена",
    age: 28,
    distance: 0.1,
    favoriteDrink: "Виски",
    image: "/img/481bdb0d-8051-4660-9c4a-3c09d69b77ab.jpg",
    location: "Центр",
    isOnline: true
  },
  2: {
    id: 2,
    name: "Анна",
    age: 25,
    distance: 0.5,
    favoriteDrink: "Мартини",
    image: "/img/4e3303bb-0cc5-4cda-9526-5878a55f7dfa.jpg",
    location: "Арбат",
    isOnline: true
  }
};

const mockMessages: Record<number, Message[]> = {
  1: [
    { id: 1, text: "Привет! Увидел, что ты тоже любишь виски 🥃", sender: 'me', timestamp: new Date(Date.now() - 300000) },
    { id: 2, text: "Привет! Да, обожаю хороший односолодовый", sender: 'other', timestamp: new Date(Date.now() - 240000) },
    { id: 3, text: "Отлично! А какой твой любимый?", sender: 'me', timestamp: new Date(Date.now() - 180000) },
    { id: 4, text: "Люблю Macallan и Glenfiddich. А твой?", sender: 'other', timestamp: new Date(Date.now() - 120000) },
  ],
  2: [
    { id: 1, text: "Привет! Хочешь встретиться за мартини?", sender: 'me', timestamp: new Date(Date.now() - 600000) },
    { id: 2, text: "Привет! Звучит заманчиво ✨", sender: 'other', timestamp: new Date(Date.now() - 480000) },
  ]
};

const drinkSuggestions = [
  "Встретимся за виски? 🥃",
  "Пойдем в коктейль-бар? 🍸",
  "Знаю отличное место для вина 🍷",
  "Как насчет крафтового пива? 🍺"
];

export default function Chat() {
  const [searchParams] = useSearchParams();
  const userId = parseInt(searchParams.get('user') || '1');
  const user = users[userId];
  
  const [messages, setMessages] = useState<Message[]>(mockMessages[userId] || []);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'me',
      timestamp: new Date()
    };

    setMessages([...messages, message]);
    setNewMessage('');
    
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "Звучит интересно! 😊",
          "Согласна, это отличная идея!",
          "Да, давай встретимся!",
          "Когда тебе удобно?",
          "Отлично! Я знаю хорошее место"
        ];
        const response: Message = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: 'other',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1500);
    }, 500);
  };

  const sendSuggestion = (suggestion: string) => {
    const message: Message = {
      id: messages.length + 1,
      text: suggestion,
      sender: 'me',
      timestamp: new Date(),
      type: 'suggestion'
    };
    setMessages([...messages, message]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <div className="bg-card/80 backdrop-blur-sm border-b shadow-sm p-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => window.history.back()}
            className="p-2"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <img 
                src={user.image} 
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="flex-1">
              <h2 className="font-semibold">{user.name}, {user.age}</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Icon name="MapPin" size={12} />
                {user.distance < 1 ? 
                  `${Math.round(user.distance * 1000)} м` : 
                  `${user.distance.toFixed(1)} км`
                } • {user.location}
              </p>
            </div>

            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {user.favoriteDrink}
            </Badge>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 pb-2 overflow-y-auto">
        <div className="max-w-md mx-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  message.sender === 'me'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border rounded-bl-md'
                } ${
                  message.type === 'suggestion' ? 'bg-gradient-to-r from-primary to-primary/80' : ''
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p 
                  className={`text-xs mt-1 ${
                    message.sender === 'me' 
                      ? 'text-primary-foreground/70' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-card border p-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="p-4 pt-2">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {drinkSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => sendSuggestion(suggestion)}
                className="whitespace-nowrap rounded-full bg-card/50 backdrop-blur-sm hover:bg-primary/10"
              >
                {suggestion}
              </Button>
            ))}
          </div>
          
          {/* Message Input */}
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Напишите сообщение..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 rounded-full bg-card/80 backdrop-blur-sm border-0"
            />
            <Button 
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="rounded-full px-4"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}