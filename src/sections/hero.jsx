import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

// Import all bottle images
import bottle1 from "../assets/product_transparent/transparent bottle.png";
import bottle2 from "../assets/product_transparent/2.png";
import bottle3 from "../assets/product_transparent/3.png";
import bottle4 from "../assets/product_transparent/4.png";
import bottle5 from "../assets/product_transparent/5.png";
import bottle6 from "../assets/product_transparent/6.png";
import bottle7 from "../assets/product_transparent/7.png";
import bottle8 from "../assets/product_transparent/8.png";

const BOTTLES = [
    { id: 1, src: bottle1, name: "Classic Musk" },
    { id: 2, src: bottle2, name: "Tropical Twist" },
    { id: 3, src: bottle3, name: "Royal Rose" },
    { id: 4, src: bottle4, name: "Lush Litchi" },
    { id: 5, src: bottle5, name: "Mango Magic" },
    { id: 6, src: bottle6, name: "Guava Gold" },
    { id: 7, src: bottle7, name: "Berry Bliss" },
    { id: 8, src: bottle8, name: "Citrus Surge" },
];

const CALLOUTS = [
    { id: 1, label: "Real Fruit", angle: -30, length: 140 },
    { id: 2, label: "Zero Sugar", angle: 30, length: 130 },
    { id: 3, label: "Premium Fizz", angle: 160, length: 120 },
    { id: 4, label: "Pure Water", angle: -150, length: 135 },
];

// Single animated callout that fades in/out
const AnimatedCallout = ({ label, angle, length, isVisible }) => {
    const endX = Math.cos((angle * Math.PI) / 180) * length;
    const endY = Math.sin((angle * Math.PI) / 180) * length;
    // Gentle curve stats
    const cpX = Math.cos(((angle - 20) * Math.PI) / 180) * (length * 0.4);
    const cpY = Math.sin(((angle - 20) * Math.PI) / 180) * (length * 0.4);
    const pathD = `M 0,0 Q ${cpX},${cpY} ${endX},${endY}`;
    const textAnchor = endX > 0 ? "start" : "end";
    const textOffset = endX > 0 ? 10 : -10;

    return (
        <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <motion.circle
                cx="0"
                cy="0"
                r="3"
                fill="#D4AF37"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                style={{ filter: "drop-shadow(0 0 5px #D4AF37)" }}
            />
            <motion.path
                d={pathD}
                stroke="rgba(212,175,55,0.4)"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: isVisible ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            />
            <motion.circle
                cx={endX}
                cy={endY}
                r="2"
                fill="#D4AF37"
                initial={{ scale: 0 }}
                animate={{ scale: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
            />
            <motion.text
                x={endX + textOffset}
                y={endY + 4}
                fill="rgba(255,255,255,0.8)"
                fontSize="10"
                fontWeight="400"
                letterSpacing="0.15em"
                textAnchor={textAnchor}
                initial={{ opacity: 0, x: textOffset * 0.5 }}
                animate={{ opacity: isVisible ? 1 : 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                {label.toUpperCase()}
            </motion.text>
        </motion.g>
    );
};

// Linear offset calculator (left-to-right flow only)
// Maps bottle position relative to current center
const getOffset = (idx, index, length) => {
    // Calculate raw difference
    let diff = idx - index;

    // Normalize to positive range [0, length-1]
    if (diff < 0) diff += length;

    // Map to display positions (left-to-right conveyor belt):
    // 0 = center, -1 = left of center, +1 = right of center
    if (diff === 0) return 0;  // Center
    if (diff === length - 1) return -1; // Left (wraps from end)
    if (diff === 1) return 1;  // Right
    if (diff === length - 2) return -2; // Far left (entering)
    if (diff === 2) return 2;  // Far right (exiting)

    // Everything else off-screen
    return diff > length / 2 ? -3 : 3;
};

// Position config (LEFT = entering, RIGHT = exiting)
// Smooth opacity gradient for seamless transitions
const getValuesForOffset = (k) => {
    // Center - Full brightness
    if (k === 0) return { x: "0vw", scale: 1, opacity: 1, blur: "0px", zIndex: 10 };

    // Adjacent bottles - Slightly dimmed (smooth step)
    if (k === -1) return { x: "-25vw", scale: 0.82, opacity: 0.65, blur: "3px", zIndex: 5 };
    if (k === 1) return { x: "25vw", scale: 0.82, opacity: 0.65, blur: "3px", zIndex: 5 };

    // Far bottles - More dimmed (gradual fade)
    if (k <= -2) return { x: "-50vw", scale: 0.65, opacity: 0.35, blur: "5px", zIndex: 0 };
    if (k >= 2) return { x: "50vw", scale: 0.65, opacity: 0.35, blur: "5px", zIndex: 0 };

    // Default off-screen
    return { x: k < 0 ? "-60vw" : "60vw", scale: 0.5, opacity: 0.15, blur: "8px", zIndex: 0 };
};

const Hero = () => {
    // Use a virtual index to handle infinite spinning without jumps
    const [index, setIndex] = useState(0);
    const [activeCallout, setActiveCallout] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const containerRef = useRef(null);

    // --- FLOATING MOTION (Decoupled & Continuous) ---
    const floatY = useMotionValue(0);
    useEffect(() => {
        let direction = 1;
        // initial move
        floatY.set(12);
        const interval = setInterval(() => {
            direction *= -1;
            floatY.set(direction * 12);
        }, 3500);
        return () => clearInterval(interval);
    }, []);
    const smoothFloatY = useSpring(floatY, { stiffness: 15, damping: 20 });

    // Scroll FX - Using scrollY (pixels) for stability instead of progress
    const { scrollY } = useScroll(); // Global scroll Y
    // Opacity fades out after 100px scroll, avoids 'idle' 0 opacity issues
    const opacitySide = useTransform(scrollY, [0, 300], [1, 0.4]);
    const opacityAll = useTransform(scrollY, [0, 500], [1, 0]);

    useEffect(() => {
        setTimeout(() => setLoaded(true), 600);
    }, []);

    // --- CAROUSEL ROTATION ---
    useEffect(() => {
        if (!loaded) return;

        // Bottle Rotation: Every 7 seconds
        const bottleInterval = setInterval(() => {
            // Safe decrementor ensuring positive index
            setIndex((prev) => (prev - 1 + BOTTLES.length) % BOTTLES.length);
            setActiveCallout(0); // Reset callout sequence
        }, 7000);

        // Callout Cycle: Faster cycle (1.8s) so all arrows show during the 7s window
        const calloutInterval = setInterval(() => {
            setActiveCallout((prev) => {
                if (prev >= CALLOUTS.length - 1) return prev;
                return prev + 1;
            });
        }, 1200);

        // Cleanup intervals on unmount
        return () => {
            clearInterval(bottleInterval);
            clearInterval(calloutInterval);
        };
    }, [loaded]);

    // Determine current center bottle for text display
    const centerBottle = BOTTLES[index];

    return (
        <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-[#050505]">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]">
                <svg className="h-full w-full">
                    <filter id="noise3"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" /></filter>
                    <rect width="100%" height="100%" filter="url(#noise3)" />
                </svg>
            </div>
            <div className="absolute inset-0 z-0 bg-radial-gradient-hero pointer-events-none" />

            {/* Main Area */}
            <motion.div
                className="relative z-10 flex h-full w-full items-center justify-center"
                style={{ opacity: opacityAll }}
            >
                <div className="relative h-[50vh] sm:h-[55vh] md:h-[65vh] w-full flex items-center justify-center max-w-7xl mx-auto px-4">
                    {/* Ambient Glow */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[45%] w-[200px] sm:w-[300px] md:w-[400px] h-[200px] sm:h-[300px] md:h-[400px] bg-kiros-amber/5 rounded-full blur-[60px] md:blur-[80px] pointer-events-none" />

                    {/* RENDER ALL BOTTLES KEEPING THEM MOUNTED */}
                    {BOTTLES.map((bottle, idx) => {
                        // Robust offset calculation
                        const k = getOffset(idx, index, BOTTLES.length);
                        const values = getValuesForOffset(k);
                        const isCenter = k === 0;

                        return (
                            <motion.div
                                key={bottle.id}
                                className="absolute origin-center"
                                animate={{
                                    x: values.x,
                                    scale: values.scale,
                                    opacity: values.opacity,
                                    filter: `blur(${values.blur})`,
                                    zIndex: values.zIndex,
                                }}
                                transition={{
                                    duration: 1.1,
                                    ease: [0.22, 1, 0.36, 1], // Luxury cubic-bezier
                                }}
                                style={{
                                    // Independent smooth float Y for center only
                                    y: isCenter ? smoothFloatY : 0,
                                    // Opacity managed by pixel-scroll logic
                                    opacity: isCenter ? 1 : opacitySide
                                }}
                            >
                                <img
                                    src={bottle.src}
                                    alt={bottle.name}
                                    loading="lazy"
                                    className="h-[35vh] sm:h-[45vh] md:h-[55vh] lg:h-[65vh] w-auto object-contain transition-all duration-1000"
                                    style={{
                                        filter: isCenter
                                            ? "drop-shadow(0 25px 50px rgba(0,0,0,0.8)) brightness(1.05)"
                                            : "brightness(0.5) grayscale(20%)"
                                    }}
                                />

                                {/* CALLOUTS - Visible on all screens with responsive sizing */}
                                <div className={`absolute inset-0 transition-opacity duration-500 ${isCenter ? 'opacity-100 delay-500' : 'opacity-0'}`}>
                                    {isCenter && (
                                        <motion.svg
                                            viewBox="0 0 600 600"
                                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] md:w-[600px] h-[280px] sm:h-[400px] md:h-[600px] pointer-events-none overflow-visible z-20"
                                            preserveAspectRatio="xMidYMid meet"
                                        >
                                            <g transform="translate(300, 300)">
                                                {CALLOUTS.map((c, i) => (
                                                    <AnimatedCallout
                                                        key={c.id}
                                                        {...c}
                                                        isVisible={activeCallout === i}
                                                    />
                                                ))}
                                            </g>
                                        </motion.svg>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Text Info (Bottom) */}
            <motion.div
                className="absolute bottom-8 sm:bottom-12 left-0 w-full text-center z-20 pointer-events-none px-4"
                style={{ opacity: opacityAll }}
            >
                <div className="relative h-16 sm:h-20 overflow-hidden">
                    {/* Simple fade/slide for text */}
                    {BOTTLES.map((b, idx) => {
                        if (idx !== index) return null;
                        return (
                            <motion.div
                                key={b.id}
                                className="absolute inset-0 flex flex-col items-center justify-center"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-kiros-amber mb-1 sm:mb-2">
                                    Premium Selection
                                </p>
                                <h1 className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl text-kiros-white tracking-widest">
                                    {b.name.toUpperCase()}
                                </h1>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>

            <style>{`
        .bg-radial-gradient-hero {
          background: radial-gradient(circle at 50% 50%, transparent 20%, #050505 90%);
        }
      `}</style>
        </section>
    );
};

export default Hero;
