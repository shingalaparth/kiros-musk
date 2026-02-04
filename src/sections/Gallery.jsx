import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionWrapper from '../components/common/SectionWrapper';

// Import images
import roseBottle from "../assets/Product/rose bottle.webp";
import litchiBottle from "../assets/Product/litchi bottle.webp";
import mangoBottle from "../assets/Product/mango bottle.webp";
import lemonBottle from "../assets/Product/lemon bottle.webp";
import guavaBottle from "../assets/Product/guava bottle.webp";
import strawberryBottle from "../assets/Product/strawberry bottle.webp";
import kachiMangoBottle from "../assets/Product/kachi mango.webp";
import varyakuBottle from "../assets/Product/varyaku bottle.webp";

const IMAGES = [
    { src: roseBottle, title: "Royal Rose", subtitle: "Floral" },
    { src: litchiBottle, title: "Lush Litchi", subtitle: "Sweet" },
    { src: mangoBottle, title: "Mango Magic", subtitle: "Tropical" },
    { src: lemonBottle, title: "Citrus Lemon", subtitle: "Zesty" },
    { src: guavaBottle, title: "Guava Gold", subtitle: "Exotic" },
    { src: strawberryBottle, title: "Berry Bliss", subtitle: "Juicy" },
    { src: kachiMangoBottle, title: "Kachi Mango", subtitle: "Tangy" },
    { src: varyakuBottle, title: "Varyaku", subtitle: "Fusion" },
];

const GalleryItem = ({ item }) => {
    return (
        <motion.div
            className="group relative flex-shrink-0 w-[280px] sm:w-[320px] md:w-[400px] aspect-[3/4] rounded-2xl overflow-hidden bg-white/5 border border-white/10"
            whileHover={{ y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            {/* Image Container with Parallax Effect */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                {/* Glow Background */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-700 ease-out group-hover:scale-105"
                />
            </div>

            {/* Overlay Content */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-kiros-amber text-xs uppercase tracking-widest font-medium mb-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {item.subtitle}
                </p>
                <h3 className="text-white font-serif text-2xl md:text-3xl">
                    {item.title}
                </h3>
            </div>
        </motion.div>
    );
};

const Gallery = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
    });

    // Horizontal Scroll Trigger
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

    return (
        <section ref={containerRef} className="relative bg-kiros-black py-20 overflow-hidden">
            <SectionWrapper>
                <div className="text-center mb-16 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-widest text-kiros-amber mb-4 block"
                    >
                        Visual Journey
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-6xl text-kiros-white mb-4"
                    >
                        The Collection
                    </motion.h2>
                    <div className="h-0.5 w-24 bg-kiros-amber mx-auto opacity-50" />
                </div>
            </SectionWrapper>

            {/* Horizontal Scroll Area */}
            <div className="relative w-full overflow-x-auto pb-12 hide-scrollbar cursor-grab active:cursor-grabbing pl-4 md:pl-[max(1rem,calc((100vw-1280px)/2))]">
                <motion.div
                    className="flex gap-4 md:gap-8 w-max px-4"
                    drag="x"
                    dragConstraints={{ right: 0, left: -((IMAGES.length * 420) - window.innerWidth) }}
                >
                    {IMAGES.map((item, index) => (
                        <GalleryItem key={index} item={item} />
                    ))}
                </motion.div>
            </div>

            {/* Hint */}
            <div className="flex justify-center mt-8 gap-2 items-center opacity-40">
                <span className="text-white text-xs uppercase tracking-widest">Drag to Explore</span>
                <div className="w-12 h-[1px] bg-white" />
            </div>

            <style>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Gallery;
