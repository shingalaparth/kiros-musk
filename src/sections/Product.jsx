import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";

// Import all product images
import roseBottle from "../assets/Product/rose bottle.webp";
import litchiBottle from "../assets/Product/litchi bottle.webp";
import mangoBottle from "../assets/Product/mango bottle.webp";
import lemonBottle from "../assets/Product/lemon bottle.webp";
import guavaBottle from "../assets/Product/guava bottle.webp";
import strawberryBottle from "../assets/Product/strawberry bottle.webp";
import kachiMangoBottle from "../assets/Product/kachi mango.webp";
import varyakuBottle from "../assets/Product/varyaku bottle.webp";

const PRODUCTS = [
    {
        id: 1,
        name: "Royal Rose",
        image: roseBottle,
        category: "Floral",
        tagline: "Elegant & Delicate",
        description: "An elegant fusion of heritage and hydration. The delicate essence of wild roses meets a sparkling effervescence.",
        color: "#FF69B4"
    },
    {
        id: 2,
        name: "Lush Litchi",
        image: litchiBottle,
        category: "Tropical",
        tagline: "Exotic Sweetness",
        description: "Exotic sweetness captured in its purest form. A tropical journey in every sip, refreshing and unmistakably bold.",
        color: "#FFB6C1"
    },
    {
        id: 3,
        name: "Mango Magic",
        image: mangoBottle,
        category: "Fruity",
        tagline: "Sunshine in a Bottle",
        description: "Pure sunshine captured in liquid form. Rich, authentic mango flavor that transports you to tropical orchards.",
        color: "#FFA500"
    },
    {
        id: 4,
        name: "Citrus Lemon",
        image: lemonBottle,
        category: "Citrus",
        tagline: "Zesty & Bright",
        description: "A burst of citrus energy that awakens your senses. Tangy, refreshing, and perfectly balanced.",
        color: "#FFF44F"
    },
    {
        id: 5,
        name: "Guava Gold",
        image: guavaBottle,
        category: "Tropical",
        tagline: "Golden Paradise",
        description: "The golden sweetness of ripe guava in every sip. Creamy, exotic, and irresistibly tropical.",
        color: "#FFD700"
    },
    {
        id: 6,
        name: "Strawberry Bliss",
        image: strawberryBottle,
        category: "Berry",
        tagline: "Pure Summer Joy",
        description: "Juicy strawberry goodness that captures the essence of summer. Sweet, luscious, and utterly refreshing.",
        color: "#FF6B6B"
    },
    {
        id: 7,
        name: "Kachi Mango",
        image: kachiMangoBottle,
        category: "Tangy",
        tagline: "Raw & Real",
        description: "The authentic taste of raw mango with a tangy twist. Bold, spicy, and uniquely Indian.",
        color: "#90EE90"
    },
    {
        id: 8,
        name: "Varyaku Berry",
        image: varyakuBottle,
        category: "Berry Fusion",
        tagline: "Wild Berry Symphony",
        description: "A complex blend of wild berries creating a rich, layered flavor experience.",
        color: "#8B4789"
    }
];

const Product = () => {
    const [activeProduct, setActiveProduct] = useState(0);
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    const x = useTransform(scrollYProgress, [0, 1], ["-30%", "5%"]);

    // Auto-rotate products every 6 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveProduct((prev) => (prev + 1) % PRODUCTS.length);
        }, 6000);

        return () => clearInterval(interval);
    }, []);

    const currentProduct = PRODUCTS[activeProduct];

    return (
        <section ref={targetRef} className="relative overflow-hidden bg-kiros-charcoal py-20" id="product">
            {/* Background Parallax text */}
            <motion.div style={{ x }} className="absolute top-20 left-0 w-full whitespace-nowrap opacity-[0.03] pointer-events-none select-none">
                <span className="font-serif text-[20rem] font-bold leading-none">TASTE THE LEGEND</span>
            </motion.div>

            <SectionWrapper>
                {/* Header */}
                <div className="mb-16 text-center relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-widest text-kiros-amber mb-4 block"
                    >
                        Premium Collection
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-4xl text-kiros-white md:text-6xl mb-4"
                    >
                        Our Flavors
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 w-24 bg-kiros-amber mx-auto"
                    />
                </div>

                {/* Featured Product Display */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 mb-10 sm:mb-16 relative z-10">
                    {/* Product Image */}
                    <motion.div
                        key={activeProduct}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative flex items-center justify-center"
                    >
                        {/* Glow Effect */}
                        <div
                            className="absolute inset-0 blur-3xl opacity-20 rounded-full"
                            style={{ backgroundColor: currentProduct.color }}
                        />
                        <img
                            src={currentProduct.image}
                            alt={currentProduct.name}
                            loading="lazy"
                            className="relative z-10 h-[35vh] sm:h-[40vh] md:h-[50vh] lg:h-[60vh] w-auto object-contain drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        key={`info-${activeProduct}`}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="flex flex-col justify-center"
                    >
                        <span
                            className="inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs uppercase tracking-wider font-semibold mb-2 sm:mb-4 w-fit"
                            style={{
                                backgroundColor: `${currentProduct.color}20`,
                                color: currentProduct.color,
                                border: `1px solid ${currentProduct.color}`
                            }}
                        >
                            {currentProduct.category}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-kiros-white mb-1 sm:mb-2">
                            {currentProduct.name}
                        </h3>
                        <p className="text-kiros-amber uppercase tracking-widest text-xs sm:text-sm mb-4 sm:mb-6">
                            {currentProduct.tagline}
                        </p>
                        <p className="text-kiros-gray text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-8 max-w-md">
                            {currentProduct.description}
                        </p>

                        {/* Badges - Hidden on very small screens */}
                        <div className="hidden sm:flex gap-2 md:gap-3 flex-wrap">
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-kiros-amber/10 border border-kiros-amber/30 rounded-full text-xs sm:text-sm text-kiros-amber">
                                Zero Sugar
                            </div>
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-green-500/10 border border-green-500/30 rounded-full text-xs sm:text-sm text-green-400">
                                Real Fruit
                            </div>
                            <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs sm:text-sm text-blue-400">
                                Pure Water
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Product Thumbnails */}
                <div className="relative z-10">
                    <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-4 scrollbar-hide">
                        {PRODUCTS.map((product, index) => (
                            <motion.button
                                key={product.id}
                                onClick={() => setActiveProduct(index)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className={`flex-shrink-0 p-2 sm:p-3 md:p-4 rounded-xl border transition-all duration-300 ${activeProduct === index
                                    ? 'bg-white/10 border-kiros-amber'
                                    : 'bg-white/5 border-white/10 hover:border-white/30'
                                    }`}
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    loading="lazy"
                                    className="h-16 sm:h-20 md:h-24 w-auto object-contain mx-auto mb-1 sm:mb-2"
                                />
                                <p className={`text-[10px] sm:text-xs md:text-sm text-center whitespace-nowrap ${activeProduct === index ? 'text-kiros-amber' : 'text-kiros-gray'
                                    }`}>
                                    {product.name}
                                </p>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Product Count Indicator */}
                <div className="flex justify-center gap-2 mt-8">
                    {PRODUCTS.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveProduct(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${activeProduct === index
                                ? 'w-8 bg-kiros-amber'
                                : 'bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
            </SectionWrapper>

            {/* Hide scrollbar */}
            <style>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default Product;
