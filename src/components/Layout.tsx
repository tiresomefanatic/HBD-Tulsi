import React, { useEffect, useState } from 'react';

const EmojiBackground = () => {
  const [emojiElements, setEmojiElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const emojis = ['🎂', '🎈', '🎁', '🎉', '🍰', '🧁', '🍭', '🎊', '❤️'];
    const newEmojiElements = [];

    for (let i = 0; i < 50; i++) {
      const emoji = emojis[Math.floor(Math.random() * emojis.length)];
      const style: React.CSSProperties = {
        position: 'fixed',
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 2 + 1}rem`,
        opacity: 0.3,
        animation: `float ${Math.random() * 10 + 20}s linear infinite`,
        animationDelay: `-${Math.random() * 20}s`,
        zIndex: 0,
      };
      newEmojiElements.push(<span key={i} style={style}>{emoji}</span>);
    }

    setEmojiElements(newEmojiElements);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(10px, 10px) rotate(120deg); }
          66% { transform: translate(-10px, 10px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }
      `}</style>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {emojiElements}
      </div>
    </>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 to-teal-400 overflow-x-hidden">
      <EmojiBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Layout;
