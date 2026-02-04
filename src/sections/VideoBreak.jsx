import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/kiros musk logos/logo.png";

const BEVERAGES = [
    {
        id: 1,
        name: "Cold Cocoa",
        tagline: "Rich & Chocolaty",
        videoSrc: "/src/assets/product video/kiros musk cold cocoa.mp4",
        features: [
            "Rich & Chocolaty flavor with quality cocoa",
            "Creamy & Smooth Surti-style texture",
            "Chilled to Perfection, served ice-cold"
        ],
        description: "A robust chocolate experience achieved using quality cocoa powder. Creamy, smooth, and served ice-cold for the perfect indulgence.",
        color: "#D2691E"
    },
    {
        id: 2,
        name: "Cold Coffee",
        tagline: "Classic Indian Style",
        videoSrc: "/src/assets/product video/cold coffee.mp4",
        features: [
            "Creamy, frothy coffee shake",
            "Blended perfectly with ice",
            "Garnished with chocolate syrup"
        ],
        description: "Classic Indian cold coffee - a creamy, frothy shake made by blending instant coffee, sugar, milk, and ice. Pure refreshment.",
        color: "#8B4513"
    }
];

const VideoBreak = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef(null);
    const currentBeverage = BEVERAGES[activeIndex];

    // Auto-rotate every 8 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % BEVERAGES.length);
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Reset video loaded state when changing beverages
    useEffect(() => {
        setVideoLoaded(false);
    }, [activeIndex]);

    return (
        <section className="relative min-h-screen w-full overflow-hidden bg-kiros-black" id="beverages">
            {/* Video Background - Lazy loaded */}
            <div className="absolute inset-0">
                {/* Loading state */}
                {!videoLoaded && (
                    <div className="absolute inset-0 bg-kiros-charcoal flex items-center justify-center">
                        <div className="w-12 h-12 border-2 border-kiros-amber border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                <AnimatePresence mode="wait">
                    <motion.video
                        key={currentBeverage.id}
                        ref={videoRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: videoLoaded ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onLoadedData={() => setVideoLoaded(true)}
                        className="h-full w-full object-cover"
                    >
                        <source src={currentBeverage.videoSrc} type="video/mp4" />
                    </motion.video>
                </AnimatePresence>

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-20 flex min-h-screen items-center">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left Side - Info */}
                        <motion.div
                            key={`info-${currentBeverage.id}`}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Logo */}
                            <img
                                src={logo}
                                alt="Kiros Musk"
                                className="h-10 sm:h-12 md:h-16 w-auto mb-4 sm:mb-8 opacity-90"
                                loading="lazy"
                            />

                            <span className="text-xs sm:text-sm uppercase tracking-widest text-kiros-amber mb-2 sm:mb-4 block">
                                Premium Beverages
                            </span>

                            <div className="flex items-center gap-2 sm:gap-4 mb-2 sm:mb-4">
                                <span className="text-3xl sm:text-4xl md:text-5xl">{currentBeverage.icon}</span>
                                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-white">
                                    {currentBeverage.name}
                                </h2>
                            </div>

                            <p
                                className="text-base sm:text-xl md:text-2xl font-light mb-4 sm:mb-8 uppercase tracking-wider sm:tracking-widest"
                                style={{ color: currentBeverage.color }}
                            >
                                {currentBeverage.tagline}
                            </p>

                            <p className="text-kiros-gray text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-8 max-w-md">
                                {currentBeverage.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-4 mb-10">
                                {currentBeverage.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + i * 0.15 }}
                                        className="flex items-center gap-4 text-white"
                                    >
                                        <span
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                                            style={{ backgroundColor: `${currentBeverage.color}30`, color: currentBeverage.color }}
                                        >
                                            ✓
                                        </span>
                                        <span className="text-lg">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            {/* Toggle Buttons */}
                            <div className="flex gap-4">
                                {BEVERAGES.map((bev, index) => (
                                    <button
                                        key={bev.id}
                                        onClick={() => setActiveIndex(index)}
                                        className={`px-8 py-4 rounded-xl border-2 transition-all duration-300 font-medium ${activeIndex === index
                                            ? 'bg-kiros-amber text-kiros-black border-kiros-amber shadow-lg shadow-kiros-amber/30'
                                            : 'bg-white/10 text-white border-white/20 hover:border-kiros-amber/50 backdrop-blur-sm'
                                            }`}
                                    >
                                        <span className="mr-2">{bev.icon}</span>
                                        {bev.name}
                                    </button>
                                ))}
                            </div>

                            {/* Progress Indicator */}
                            <div className="flex gap-2 mt-8">
                                {BEVERAGES.map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-1 rounded-full overflow-hidden bg-white/20"
                                        style={{ width: activeIndex === index ? 60 : 20 }}
                                    >
                                        <motion.div
                                            className="h-full bg-kiros-amber"
                                            initial={{ width: "0%" }}
                                            animate={{ width: activeIndex === index ? "100%" : "0%" }}
                                            transition={{ duration: activeIndex === index ? 8 : 0 }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Right Side - Empty for video visibility */}
                        <div className="hidden lg:block" />
                    </div>
                </div>
            </div>

            {/* Bottom Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-kiros-black to-transparent z-10" />

            {/* Top Gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-kiros-charcoal to-transparent z-10" />
        </section>
    );
};

export default VideoBreak;
