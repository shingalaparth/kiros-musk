import React from "react";
import { BRAND_NAME } from "../constants";

const Closing = () => {
    return (
        <footer className="bg-kiros-black py-12 sm:py-16 md:py-20 text-center border-t border-white/5">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <h2 className="mb-3 sm:mb-4 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-kiros-white">
                    {BRAND_NAME.toUpperCase()}
                </h2>

                <p className="text-xs sm:text-sm uppercase tracking-widest text-kiros-amber mb-6 sm:mb-8">
                    KIROS MUSK LLP
                </p>

                <p className="mb-8 sm:mb-12 text-sm sm:text-base md:text-lg font-light tracking-wide text-kiros-gray max-w-2xl mx-auto leading-relaxed">
                    Join us in our love of food & drink. Elevate your senses with premium refreshments crafted from the finest ingredients.
                </p>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
                    <a href="#philosophy" className="text-xs sm:text-sm uppercase tracking-widest text-kiros-gray hover:text-kiros-amber transition-colors py-1">
                        Philosophy
                    </a>
                    <a href="#product" className="text-xs sm:text-sm uppercase tracking-widest text-kiros-gray hover:text-kiros-amber transition-colors py-1">
                        Products
                    </a>
                    <a href="#ingredients" className="text-xs sm:text-sm uppercase tracking-widest text-kiros-gray hover:text-kiros-amber transition-colors py-1">
                        Ingredients
                    </a>
                    <a href="#contact" className="text-xs sm:text-sm uppercase tracking-widest text-kiros-gray hover:text-kiros-amber transition-colors py-1">
                        Contact
                    </a>
                </div>

                {/* Contact Info */}
                <div className="mb-8 sm:mb-12 text-kiros-gray space-y-2 text-sm sm:text-base">
                    <p>Valkal, Olpad, Surat, Gujarat, India</p>
                    <p>
                        <a href="tel:8758724055" className="hover:text-kiros-amber transition-colors">
                            8758724055
                        </a>
                    </p>
                </div>

                {/* Copyright */}
                <div className="text-[10px] sm:text-xs text-kiros-gray/30">
                    &copy; {new Date().getFullYear()} KIROS MUSK LLP. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Closing;
