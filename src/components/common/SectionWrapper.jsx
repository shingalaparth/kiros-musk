import React from "react";
import { motion } from "framer-motion";
import { staggerContainer } from "../../utils/motion";

const SectionWrapper = ({ children, idName, className = "" }) => {
    return (
        <motion.section
            variants={staggerContainer()}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className={`relative z-0 mx-auto max-w-7xl px-6 py-16 sm:px-16 ${className}`}
            id={idName}
        >
            {children}
        </motion.section>
    );
};

export default SectionWrapper;
