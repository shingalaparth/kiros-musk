import React, { useState, useEffect } from "react";
import { NAV_LINKS, BRAND_NAME } from "../../constants";
import logo from "../../assets/kiros musk logos/logo.png";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) setMobileMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 z-50 w-full px-4 sm:px-6 py-2 transition-all duration-500 ${scrolled || mobileMenuOpen
                    ? "bg-kiros-black/95 backdrop-blur-lg shadow-lg shadow-black/20"
                    : "bg-gradient-to-b from-black/60 via-black/30 to-transparent"
                    }`}
            >
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    {/* Logo */}
                    <a
                        href="#"
                        className="flex items-center gap-2 group"
                        onClick={() => window.scrollTo(0, 0)}
                    >
                        <img
                            src={logo}
                            alt={BRAND_NAME}
                            className="h-10 sm:h-12 md:h-14 w-auto object-contain drop-shadow-[0_2px_10px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105"
                        />
                    </a>

                    {/* Desktop Links */}
                    <ul className="hidden gap-8 lg:gap-10 md:flex items-center">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="text-xs sm:text-sm font-medium uppercase tracking-widest text-kiros-white/80 transition-all duration-300 hover:text-kiros-amber"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Menu Button */}
                    <button
                        className="flex md:hidden text-kiros-white focus:outline-none p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="relative w-6 h-5">
                            <span className={`absolute left-0 h-0.5 w-6 bg-kiros-white transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-2.5 rotate-45' : 'top-0'}`} />
                            <span className={`absolute left-0 top-2.5 h-0.5 w-6 bg-kiros-white transform transition-all duration-300 ease-in-out -translate-y-1/2 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                            <span className={`absolute left-0 h-0.5 w-6 bg-kiros-white transform transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'top-2.5 -rotate-45' : 'bottom-0'}`} />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="flex flex-col items-center gap-4 py-6">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-base font-medium uppercase tracking-widest text-kiros-white/80 transition-colors hover:text-kiros-amber py-2 block"
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Overlay when mobile menu is open */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Navbar;
