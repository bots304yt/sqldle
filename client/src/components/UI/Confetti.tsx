import React, { useEffect, useRef } from 'react';

const SHAPES = ['square', 'triangle'];
const COLOR_DIGIT = "ABCDEF1234567890";

export default function Confetti() {
    const containerRef = useRef<HTMLDivElement>(null);

    const generateRandomColor = () => {
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += COLOR_DIGIT[Math.floor(Math.random() * COLOR_DIGIT.length)];
        }
        return color;
    };

    const generateConfetti = () => {
        const container = containerRef.current;
        if (container) {
            for (let i = 0; i < 50; i++) {
                const confetti = document.createElement('div');
                const positionX = Math.random() * window.innerWidth;
                const positionY = Math.random() * window.innerHeight;
                const rotation = Math.random() * 360;
                const size = Math.floor(Math.random() * (20 - 5 + 1)) + 5;
                confetti.style.left = `${positionX}px`;
                confetti.style.top = `${positionY}px`;
                confetti.style.transform = `rotate(${rotation}deg)`;
                confetti.className = 'confetti ' + SHAPES[Math.floor(Math.random() * SHAPES.length)];
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size}px`;
                confetti.style.backgroundColor = generateRandomColor();
                container.appendChild(confetti);
                // Remove confetti element after animation duration (4 seconds)
                setTimeout(() => {
                    container.removeChild(confetti);
                }, 4000);
            }
        }
    };

    useEffect(() =>{
        generateConfetti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div className='fixed top-0 left-0 w-full h-full pointer-events-none' ref={containerRef} id="confetti-container"></div>);
}
