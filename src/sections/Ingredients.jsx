    import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Leaf, Droplets, Zap, Wind } from "lucide-react";
import SectionWrapper from "../components/common/SectionWrapper";

const IngredientCard = ({ icon: Icon, title, description, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center p-5 sm:p-6 md:p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-kiros-amber/50 transition-colors duration-300 group"
    >
        <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-full bg-black/30 group-hover:bg-kiros-amber/20 transition-colors">
            <Icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-kiros-gray group-hover:text-kiros-amber transition-colors" />
        </div>
        <h3 className="mb-2 sm:mb-3 font-serif text-lg sm:text-xl font-medium text-kiros-white">{title}</h3>
        <p className="text-xs sm:text-sm leading-relaxed text-kiros-gray">{description}</p>
    </motion.div>
);

const Ingredients = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["15%", "-15%"]);

    const ingredients = [
        {
            icon: Leaf,
            title: "Real Fruit",
            description: "Sourced from the finest orchards for authentic taste."
        },
        {
            icon: Droplets,
            title: "Pure Water",
            description: "Filtered through volcanic rock for mineral balance."
        },
        {
            icon: Zap,
            title: "Natural Energy",
            description: "Green coffee beans for smooth, sustained lift."
        },
        {
            icon: Wind,
            title: "Crisp Fizz",
            description: "Fine bubbles that dance on the palate."
        }
    ];

    return (
        <section ref={targetRef} className="relative overflow-hidden bg-kiros-black" id="ingredients">
            {/* Background Parallax Text - Hidden on mobile */}
            <motion.div
                style={{ x }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.02] pointer-events-none select-none z-0 hidden sm:block"
            >
                <span className="font-serif text-[10rem] md:text-[16rem] font-black leading-none tracking-tighter">CRAFTED • PURE • REAL</span>
            </motion.div>

            <SectionWrapper className="relative z-10 py-12 sm:py-16 md:py-24">
                <div className="mb-8 sm:mb-12 md:mb-16 text-center">
                    <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-kiros-amber">
                        Crafted with Care
                    </span>
                    <h2 className="mt-3 sm:mt-4 font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-kiros-white">
                        Integrity in Ingredients
                    </h2>
                </div>

                {/* Grid: 2 cols on mobile, 4 on desktop */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:grid-cols-4">
                    {ingredients.map((item, index) => (
                        <IngredientCard key={item.title} {...item} index={index} />
                    ))}
                </div>
            </SectionWrapper>
        </section>
    );
};

export default Ingredients;
