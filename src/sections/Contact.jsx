import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "../components/common/SectionWrapper";
import { Phone, MapPin, Clock, Mail, MessageCircle } from "lucide-react";

const COMPANY_INFO = {
    name: "KIROS MUSK LLP",
    phone: "8758724055",
    address: "Valkal, Olpad, Surat, Gujarat, India",
    hours: "09:00 AM – 05:00 PM",
    email: "info@kirosmusk.com",
    whatsapp: "918758724055" // Country code + number
};

const Contact = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
            setIsSubmitting(false);
            setEmail("");
            setTimeout(() => setSubmitted(false), 3000);
        }, 1000);
    };

    return (
        <section className="relative overflow-hidden bg-kiros-black py-12 sm:py-16 md:py-20" id="contact">
            <SectionWrapper>
                {/* Header */}
                <div className="mb-10 sm:mb-16 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-xs uppercase tracking-widest text-kiros-amber mb-4 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-kiros-white mb-4"
                    >
                        Visit Us
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="h-1 w-24 bg-kiros-amber mx-auto"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 mb-12 sm:mb-20">
                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="font-serif text-2xl sm:text-3xl text-kiros-white mb-4 sm:mb-6">
                                {COMPANY_INFO.name}
                            </h3>
                            <p className="text-kiros-gray text-lg leading-relaxed mb-8">
                                We love our customers! Feel free to visit during business hours or reach out to us.
                            </p>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-6">
                            {/* Address */}
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-kiros-amber/10 rounded-lg group-hover:bg-kiros-amber/20 transition-colors">
                                    <MapPin className="w-5 h-5 text-kiros-amber" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider text-kiros-amber mb-1">Location</p>
                                    <p className="text-kiros-white">{COMPANY_INFO.address}</p>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(COMPANY_INFO.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-kiros-gray hover:text-kiros-amber transition-colors mt-2 inline-block"
                                    >
                                        Get Directions →
                                    </a>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-kiros-amber/10 rounded-lg group-hover:bg-kiros-amber/20 transition-colors">
                                    <Phone className="w-5 h-5 text-kiros-amber" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider text-kiros-amber mb-1">Phone</p>
                                    <a
                                        href={`tel:${COMPANY_INFO.phone}`}
                                        className="text-kiros-white hover:text-kiros-amber transition-colors"
                                    >
                                        {COMPANY_INFO.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Hours */}
                            <div className="flex items-start gap-4 group">
                                <div className="p-3 bg-kiros-amber/10 rounded-lg group-hover:bg-kiros-amber/20 transition-colors">
                                    <Clock className="w-5 h-5 text-kiros-amber" />
                                </div>
                                <div>
                                    <p className="text-sm uppercase tracking-wider text-kiros-amber mb-1">Business Hours</p>
                                    <p className="text-kiros-white">{COMPANY_INFO.hours}</p>
                                    <p className="text-sm text-kiros-gray mt-1">Monday - Saturday</p>
                                </div>
                            </div>

                            {/* WhatsApp Button */}
                            <a
                                href={`https://wa.me/${COMPANY_INFO.whatsapp}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-6 py-4 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg transition-all group"
                            >
                                <MessageCircle className="w-5 h-5 text-green-400" />
                                <div>
                                    <p className="text-green-400 font-medium">Message us on WhatsApp</p>
                                    <p className="text-sm text-kiros-gray">Quick response guaranteed</p>
                                </div>
                            </a>
                        </div>
                    </motion.div>

                    {/* Newsletter Signup */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white/5 rounded-2xl p-8 border border-white/10"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-kiros-amber/10 rounded-lg">
                                <Mail className="w-6 h-6 text-kiros-amber" />
                            </div>
                            <div>
                                <h4 className="text-xl font-serif text-kiros-white">Join Our Mailing List</h4>
                                <p className="text-sm text-kiros-gray">Be the first to hear about new flavors!</p>
                            </div>
                        </div>

                        <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                            <div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    required
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-kiros-white placeholder-kiros-gray focus:outline-none focus:border-kiros-amber transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || submitted}
                                className={`w-full py-3 rounded-lg font-medium uppercase tracking-wider transition-all ${submitted
                                    ? 'bg-green-500 text-white'
                                    : 'bg-kiros-amber text-kiros-black hover:bg-kiros-amber/90'
                                    } disabled:opacity-50`}
                            >
                                {submitted ? '✓ Subscribed!' : isSubmitting ? 'Subscribing...' : 'Sign Up'}
                            </button>
                        </form>

                        <p className="text-xs text-kiros-gray mt-4 text-center">
                            We respect your privacy. Unsubscribe anytime.
                        </p>
                    </motion.div>
                </div>

                {/* Map Embed */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl overflow-hidden border border-white/10 h-96"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59403.64423456!2d72.7!3d21.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDE4JzAwLjAiTiA3MsKwNDInMDAuMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="KIROS MUSK Location"
                    />
                </motion.div>
            </SectionWrapper>
        </section>
    );
};

export default Contact;
