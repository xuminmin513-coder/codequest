import React, { useEffect, useState } from 'react';

const PARTICLE_COLORS = ['#00d4ff', '#7b2ff7', '#ffd700', '#ff2d78', '#00ff88', '#ff8c00'];
const PARTICLE_COUNT = 40;
const SHAPES = ['■', '●', '▲', '★', '◆'];

export default function Confetti() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const items = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      items.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.5,
        duration: 1.5 + Math.random() * 2,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        size: 12 + Math.floor(Math.random() * 16),
        rotation: Math.random() * 360
      });
    }
    setParticles(items);
  }, []);

  return (
    <div className="confetti-container" aria-hidden="true">
      {particles.map(p => (
        <div
          key={p.id}
          className="confetti-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            color: p.color,
            fontSize: p.size,
            transform: `rotate(${p.rotation}deg)`
          }}
        >
          {p.shape}
        </div>
      ))}
    </div>
  );
}
