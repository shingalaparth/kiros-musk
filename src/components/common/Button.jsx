import React from "react";

const Button = ({ text, onClick, variant = "primary", className = "" }) => {
    const baseStyles = "px-8 py-3 font-medium text-sm tracking-wider transition-all duration-300 ease-out border rounded-full";

    const variants = {
        primary: "border-kiros-amber text-kiros-amber hover:bg-kiros-amber hover:text-kiros-black shadow-[0_0_15px_-5px_theme('colors.kiros.amber')]",
        outline: "border-kiros-white/20 text-kiros-white hover:border-kiros-white hover:bg-white/5",
        text: "border-transparent text-kiros-gray hover:text-kiros-white px-0"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {text}
        </button>
    );
};

export default Button;
