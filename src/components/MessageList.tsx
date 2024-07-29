// components/MessageList.tsx
import React, { useEffect, useState, useRef } from 'react';

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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
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
        boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
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

  useEffect(() => {
    fetch('/api/messages')
      .then(response => response.json())
      .then(data => setMessages(data))
      .catch(error => console.error('Error fetching messages:', error));
  }, []);

  return (
    <div className="bg-transparent py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Birthday Messages</h2>
        <ul className="space-y-8">
          {messages.map((msg) => (
            <MessageCard key={msg._id} message={msg} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MessageList;