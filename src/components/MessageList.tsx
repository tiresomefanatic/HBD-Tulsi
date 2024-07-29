import React, { useEffect, useState, useRef } from 'react';
import { Loader2 } from 'lucide-react';

type Message = {
  _id: string;
  name: string;
  message: string;
  style: {
    backgroundColor: string;
    borderColor: string;
    textColor: string;
    emoji: string;
  };
};

const MessageCard: React.FC<{ message: Message }> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const currentCard = cardRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (currentCard) {
      observer.observe(currentCard);
    }

    return () => {
      if (currentCard) {
        observer.unobserve(currentCard);
      }
    };
  }, []);

  return (
    <li 
      ref={cardRef}
      className={`p-6 rounded-lg shadow-lg transition-all duration-500 ease-in-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        backgroundColor: message.style.backgroundColor,
        borderColor: message.style.borderColor,
        color: message.style.textColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        fontSize: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        {message.style.emoji}
      </div>
      <h4 className="text-2xl font-bold mb-4">{message.name}</h4>
      <p className="text-lg">{message.message}</p>
    </li>
  );
};

const MessageList: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch('/api/messages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        return response.json();
      })
      .then(data => {
        setMessages(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
        setError('Failed to load messages. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-4xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-24 h-24 text-primary animate-spin" />
          </div>
        ) : error ? (
          <p className="text-center text-destructive">{error}</p>
        ) : messages.length > 0 ? (
          <ul className="space-y-8">
            {messages.map((msg) => (
              <MessageCard key={msg._id} message={msg} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-foreground">No messages yet. Be the first to leave a birthday wish!</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;