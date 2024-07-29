// components/BirthdayHero.tsx
import React, { useEffect, useRef } from 'react';
import Confetti from "@/components/magicui/confetti";
import type { ConfettiRef } from "@/components/magicui/confetti";
import SparklesText from "@/components/magicui/sparkles-text";
import confetti from 'canvas-confetti';

const BirthdayHero = ({ name = 'Tulsi' }) => {
  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    // Trigger central confetti
    setTimeout(() => {
      confettiRef.current?.fire({});
    }, 500);

    // Trigger fireworks confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Fireworks
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);

    // Trigger side confetti cannons
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];
    const end = Date.now() + 3 * 1000; // 3 seconds

    const frame = () => {
      if (Date.now() > end) return;
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
      requestAnimationFrame(frame);
    };
    frame();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="text-center w-full relative z-10">
        <h1 className="text-[11vw] sm:text-[8vw] md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-2 sm:mb-4 whitespace-nowrap leading-none">
          Happy Birthday
        </h1>
        <SparklesText 
          className="text-[20vw] sm:text-[15vw] md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold bg-clip-text mb-4 sm:mb-6 md:mb-8 leading-none text-pink-500" 
          text={name} 
        />
        <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
          Wishing you a day filled with joy and laughter!
        </p>
      </div>
      <Confetti
        ref={confettiRef}
        className="absolute left-0 top-0 z-20 w-full h-full"
      />
    </div>
  );
};

export default BirthdayHero;