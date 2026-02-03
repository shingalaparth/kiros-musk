import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";

const Philosophy = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);

    // Line animation - grows as you scroll down, shrinks as you scroll up
    const lineScaleY = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0.3]);
    const lineOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.8], [0, 1, 0.5]);

    return (
        <section ref={targetRef} className="relative overflow-hidden bg-kiros-black" id="philosophy">
            {/* Background Parallax Text */}
            <motion.div
                style={{ x }}
                className="absolute top-1/2 left-0 -translate-y-1/2 w-full whitespace-nowrap opacity-[0.025] pointer-events-none select-none z-0"
            >
                <span className="font-serif text-[18rem] font-black leading-none tracking-tighter">PHILOSOPHY</span>
            </motion.div>

            <SectionWrapper className="relative z-10 min-h-[80vh] flex items-center justify-center">
                <div className="flex flex-col items-center text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mb-8 text-sm font-medium uppercase tracking-[0.3em] text-kiros-amber"
                    >
                        Our Philosophy
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="max-w-4xl font-serif text-4xl font-light leading-snug text-kiros-white md:text-6xl"
                    >
                        Not just a drink. <br />
                        <span className="text-kiros-gray opacity-80">A ritual of refinement.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="mt-12 max-w-2xl text-lg font-light leading-relaxed text-kiros-gray md:text-xl"
                    >
                        Kiros Musk was born from a desire to elevate the everyday moment.
                        We believe true luxury lies in the details—the crisp snap of a cap,
                        the rush of carbonation, and the authentic taste of nature's finest fruits,
                        captured without compromise.
                    </motion.p>

                    {/* Animated Line - Scroll Linked */}
                    <motion.div
                        style={{
                            scaleY: lineScaleY,
                            opacity: lineOpacity
                        }}
                        className="mt-16 h-[120px] w-[2px] bg-gradient-to-b from-kiros-amber via-kiros-amber/50 to-transparent origin-top"
                    />

                    {/* Scroll Down Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-4 text-kiros-gray/50 text-xs uppercase tracking-widest"
                    >
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            className="inline-block"
                        >
                            ↓
                        </motion.span>
                    </motion.div>
                </div>
            </SectionWrapper>
        </section>
    );
};

export default Philosophy;
