import React from 'react';
import { motion } from 'framer-motion';

const SpecialMessage: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white bg-opacity-20 backdrop-blur-lg">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-pink-500 mb-6">
            Celebrating Your Quarter Century!
          </h2>
          <p className="text-xl md:text-2xl text-white leading-relaxed mb-8">
            Tulsi, as you turn 25, may this milestone birthday be the beginning of a new chapter filled with exciting adventures, deeper wisdom, and boundless joy. Your journey so far has been incredible, and the best is yet to come!
          </p>
          <div className="text-3xl mb-4">🌟🎉🥂</div>
          <p className="text-lg md:text-xl text-white font-semibold">
            Here&apos;s to 25 years of being absolutely amazing, and to many more years of making the world brighter with your presence!
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecialMessage;