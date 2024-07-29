// components/MessageForm.tsx
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { AlertTriangle } from 'lucide-react';


type MessageStyle = {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  emoji: string;
};

const MessageForm: React.FC = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState<MessageStyle>({
    backgroundColor: '#ffffff',
    borderColor: '#000000',
    textColor: '#000000',
    emoji: '🎉',
  });
  const [showColorPicker, setShowColorPicker] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, message, style }),
      });
      if (response.ok) {
        setName('');
        setMessage('');
        alert('Message sent successfully!');
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleColorChange = (color: any, type: string) => {
    setStyle(prev => ({ ...prev, [type]: color.hex }));
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setStyle(prev => ({ ...prev, emoji: emojiData.emoji }));
    setShowEmojiPicker(false);
  };

  const colorOptions = [
    { key: 'backgroundColor', title: 'Background Color' },
    { key: 'borderColor', title: 'Border Color' },
    { key: 'textColor', title: 'Font Color' },
  ];

  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 rounded-lg backdrop-blur-md bg-white bg-opacity-20">
      <h2 className="text-3xl font-bold mb-6 text-pink-400">Leave Birthday Wishes for Tulsi</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-pink-400 font-semibold mb-2">Your Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white bg-opacity-50 border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-pink-400 font-semibold mb-2">Your Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-white bg-opacity-50 border border-white focus:outline-none focus:ring-2 focus:ring-pink-400"
            rows={4}
          ></textarea>
        </div>
        <div>
          <h3 className="text-pink-400 font-semibold mb-4">Customize Your Message Card</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {colorOptions.map(({ key, title }) => (
              <div key={key} className="flex flex-col items-start">
                <label className="mb-1 text-pink-400">{title}</label>
                <button
                  type="button"
                  onClick={() => setShowColorPicker(key)}
                  className="w-full h-10 rounded"
                  style={{ backgroundColor: style[key as keyof MessageStyle] }}
                >
                  <span className="sr-only">{title}</span>
                </button>
                {showColorPicker === key && (
                  <div className="absolute z-10 mt-1">
                    <div className="fixed inset-0" onClick={() => setShowColorPicker('')}></div>
                    <SketchPicker
                      color={style[key as keyof MessageStyle]}
                      onChange={(color) => handleColorChange(color, key)}
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col items-start">
              <label className="mb-1 text-pink-400">Background Emoji</label>
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="w-full px-3 py-2 rounded bg-white bg-opacity-50 border border-white focus:outline-none focus:ring-2 focus:ring-pink-400 text-2xl"
              >
                {style.emoji}
              </button>
              {showEmojiPicker && (
                <div className="absolute z-10 mt-1">
                  <div className="fixed inset-0" onClick={() => setShowEmojiPicker(false)}></div>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-pink-400 font-semibold mb-2">Preview</h3>
          <div 
            className="p-4 rounded"
            style={{
              backgroundColor: style.backgroundColor,
              borderColor: style.borderColor,
              borderWidth: 2,
              borderStyle: 'solid',
              color: style.textColor,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
              fontSize: '100px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              {style.emoji}
            </div>
            <h4 className="font-bold">{name || 'Your Name'}</h4>
            <p>{message || 'Your message will appear here'}</p>
          </div>
        </div>
        <button type="submit" className="w-full bg-pink-400 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors">
          Send Wishes
        </button>
        <div className="flex items-center space-x-2 text-red-600">
          <AlertTriangle size={20} />
          <p className="text-sm">
            Please double-check your message before submitting. It cannot be edited or removed later.
          </p>
        </div>
        
      </form>
    </div>
  );
};

export default MessageForm;