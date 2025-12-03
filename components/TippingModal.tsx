"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, Loader2, ChevronDown } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useToast } from '@/context/ToastContext';

// Use environment variable for the publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const StripeLogo = () => (
    <svg viewBox="0 0 60 25" xmlns="http://www.w3.org/2000/svg" width="38" height="16" className="opacity-80 grayscale">
        <path fill="#000" d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.03c-1.08.54-2.72.85-4.44.85-4.54 0-7.2-2.5-7.2-7.52 0-3.47 2.02-7.51 7.02-7.51 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04.69-.15.93a15.8 15.8 0 0 0 .02-.02zm-3.82-3.37c-.03-1.78-1.24-2.61-2.7-2.61-2.02 0-3.26 1.68-3.66 3.22h6.39l-.03-.6zM32.8 5.6h3.9v13.6h-3.9V5.6zm-13.96 9.8c-1.37 0-2.45-.6-3.05-1.55v1.45h-3.7V5.6h3.9v3.8c.7-.9 1.83-1.6 3.37-1.6 3.75 0 5.86 2.85 5.86 6.8 0 3.3-1.67 6.1-5.63 6.1l-.75-.05zm-1.08-9.1c-2.43 0-4.05 1.87-4.05 5.3 0 3.16 1.68 5.15 4.02 5.15 1.94 0 3.4-1.3 3.4-4.8 0-3.9-1.92-5.64-3.37-5.64zm-8.8 9.1c-1.27 0-2.35-.55-2.9-1.45v5.35H2.36V5.6h3.9v3.7c.66-.9 1.8-1.55 3.3-1.55 3.7 0 5.83 2.8 5.83 6.8 0 3.3-1.66 6.15-5.66 6.15l-.77-.05zm-1.08-9.1c-2.45 0-4.07 1.85-4.07 5.3 0 3.2 1.68 5.15 4.02 5.15 1.94 0 3.4-1.35 3.4-4.8 0-3.95-1.92-5.65-3.35-5.65zm43.37 9.1c-1.3 0-2.38-.55-2.93-1.45v1.35h-3.9V5.6h3.9v3.7c.65-.9 1.78-1.55 3.3-1.55 3.73 0 5.86 2.8 5.86 6.8 0 3.3-1.66 6.15-5.62 6.15l-.77-.05-.02.01-.06.01.24-.02zm-1.08-9.1c-2.45 0-4.07 1.85-4.07 5.3 0 3.2 1.68 5.15 4.02 5.15 1.94 0 3.4-1.35 3.4-4.8 0-3.95-1.93-5.65-3.35-5.65zM41.76 9.4c-1.93 0-3.32 1.35-3.32 3.9 0 2.44 1.32 3.86 3.1 3.86.75 0 1.5-.2 2.05-.4v3.1a6.6 6.6 0 0 1-2.92.57c-3.7 0-6.13-2.6-6.13-7 0-4.32 2.56-7.1 6.36-7.1 1.25 0 2.37.26 2.85.55v3.1c-.5-.4-1.16-.6-2-.6z"/>
    </svg>
);

const CheckoutForm = ({ clientSecret, onClose }: { clientSecret: string; onClose: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Use current location as return_url, but backend webhook handles fulfillment
                return_url: window.location.href,
            },
            redirect: "if_required", // Prevent redirect if not 3DS
        });

        if (error) {
            addToast(error.message || "Wystąpił błąd płatności.", "error");
            setIsLoading(false);
        } else {
            addToast("Płatność zakończona sukcesem! Konto Patrona zostanie aktywowane wkrótce.", "success");
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <PaymentElement />
            <button
                disabled={isLoading || !stripe || !elements}
                className="w-full mt-4 py-3 rounded-lg font-black text-lg text-white bg-neutral-900 border border-black/20 shadow-md hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
            >
                {isLoading ? <span className="animate-pulse">PRZETWARZANIE...</span> : "ZAPŁAĆ"}
            </button>
        </form>
    );
};

const TippingModal: React.FC = () => {
    const { activeModal, closeTippingModal } = useStore();
    const isOpen = activeModal === 'tipping';

    // Add 'email' to formData
    const [formData, setFormData] = useState({
        email: '',
        amount: 5.00,
        currency: 'PLN',
        message: '',
        terms_accepted: false
    });

    const [currentStep, setCurrentStep] = useState(0); // 0: Start, 1: Email, 2: Amount/Terms, 3: Payment
    const [showTerms, setShowTerms] = useState(false);
    const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const { addToast } = useToast();

    const currencies = ['PLN', 'EUR', 'USD'];

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setFormData({
                email: '',
                amount: 5.00,
                currency: 'PLN',
                message: '',
                terms_accepted: false
            });
            setShowTerms(false);
            setClientSecret(null);
            setIsProcessing(false);
        }
    }, [isOpen]);

    const handleNext = async () => {
        if (currentStep === 0) {
            setCurrentStep(1);
        } else if (currentStep === 1) {
            // Validate Email
            if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
                addToast("Proszę podać poprawny adres e-mail.", "error");
                return;
            }
            setCurrentStep(2);
        } else if (currentStep === 2) {
            // Validate Amount & Terms
            if (!formData.terms_accepted) {
                addToast("Musisz zaakceptować regulamin.", "error");
                return;
            }
            if (formData.amount < 1.00) {
                addToast("Minimalna kwota to 1.00", "error");
                return;
            }

            // Create Payment Intent
            setIsProcessing(true);
            try {
                const res = await fetch('/api/create-payment-intent', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        amount: formData.amount,
                        currency: formData.currency.toLowerCase(),
                        email: formData.email
                    })
                });

                const data = await res.json();
                if (data.error) {
                    addToast(data.error, "error");
                    setIsProcessing(false);
                } else {
                    setClientSecret(data.clientSecret);
                    setCurrentStep(3);
                    setIsProcessing(false);
                }
            } catch (err) {
                addToast("Błąd połączenia z serwerem.", "error");
                setIsProcessing(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeTippingModal}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
                    />

                    <motion.div
                        initial={{ y: "100%", opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        exit={{ y: "100%", opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full max-w-md bg-[#e5e5e5]/90 backdrop-blur-xl shadow-2xl rounded-t-[2rem] sm:rounded-[2rem] overflow-hidden pointer-events-auto flex flex-col max-h-[90vh] sm:h-auto relative mx-4 mb-0 sm:mb-4 border border-white/20"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-white/40">
                            <h2 className="text-xl font-black tracking-tight text-neutral-900 drop-shadow-sm flex items-center gap-2">
                                {showTerms ? "REGULAMIN" : (
                                    currentStep === 0 ? "WESPRZYJ TWÓRCĘ" :
                                    currentStep === 1 ? "TWÓJ EMAIL" :
                                    currentStep === 2 ? "KWOTA" : "PŁATNOŚĆ"
                                )}
                            </h2>
                            <button
                                onClick={closeTippingModal}
                                className="p-2 rounded-full hover:bg-black/10 transition-colors group"
                            >
                                <X size={20} className="text-black/60 group-hover:text-black transition-colors" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto custom-scrollbar bg-gradient-to-b from-transparent to-white/10 min-h-[300px] flex flex-col">

                            {showTerms ? (
                                <div className="text-sm text-black/80 space-y-4 font-medium leading-relaxed">
                                    <p>1. Dokonując wpłaty, dobrowolnie wspierasz twórcę serwisu Polutek.</p>
                                    <p>2. Wpłata jest jednorazowa i bezzwrotna. Nie stanowi zakupu towaru ani usługi w rozumieniu prawa konsumenckiego.</p>
                                    <p>3. Twoje dane (e-mail) są przetwarzane wyłącznie w celu realizacji płatności i ewentualnego kontaktu w sprawach technicznych (np. nadanie statusu Patrona).</p>
                                    <p>4. Płatności obsługuje Stripe. Nie przechowujemy Twoich danych karty płatniczej.</p>
                                    <button onClick={() => setShowTerms(false)} className="w-full mt-4 py-2 bg-black/10 rounded-lg font-bold text-black hover:bg-black/20 transition-colors">
                                        Powrót
                                    </button>
                                </div>
                            ) : (
                                <AnimatePresence mode="wait">
                                    {currentStep === 0 && (
                                        <motion.div
                                            key="step0"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1 flex flex-col justify-center"
                                        >
                                            <p className="text-center text-black/70 font-medium px-4">
                                                Dołącz do grona Patronów i wesprzyj rozwój projektu! <br/>
                                                Każda wpłata to krok milowy dla naszej AI.
                                            </p>
                                            <div className="flex justify-center">
                                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-yellow-300 to-yellow-500 shadow-lg flex items-center justify-center animate-pulse">
                                                    <span className="text-4xl">👑</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1 flex flex-col justify-center"
                                        >
                                            <label className="block text-sm font-bold text-black/60 uppercase tracking-wide ml-1">Adres E-mail</label>
                                            <input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="twoj@email.com"
                                                className="w-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-lg font-semibold text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white/80 transition-all"
                                                autoFocus
                                            />
                                            <p className="text-xs text-black/50 px-1">
                                                Na ten adres wyślemy potwierdzenie i przypiszemy status Patrona.
                                            </p>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-6 flex-1 flex flex-col justify-center"
                                        >
                                            <div className="relative">
                                                <label className="block text-sm font-bold text-black/60 uppercase tracking-wide ml-1 mb-2">Kwota Wsparcia</label>
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        value={formData.amount}
                                                        onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                                                        step="0.01"
                                                        min="1.00"
                                                        className="flex-1 bg-white/50 border border-black/10 rounded-xl px-4 py-3 text-3xl font-black text-black placeholder:text-black/30 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white/80 transition-all text-center"
                                                    />

                                                    <div className="relative">
                                                        <button
                                                            onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                                                            className="h-full bg-white/50 border border-black/10 rounded-xl px-4 py-3 flex items-center gap-2 font-bold text-black hover:bg-white/80 transition-all"
                                                        >
                                                            {formData.currency} <ChevronDown size={16} />
                                                        </button>
                                                        <AnimatePresence>
                                                            {isCurrencyDropdownOpen && (
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                                    animate={{ opacity: 1, scale: 1 }}
                                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                                    className="absolute top-0 right-0 min-w-[120px] bg-[#d1d5db] border border-black/10 rounded-xl shadow-xl overflow-hidden z-[100]"
                                                                >
                                                                    {currencies.map((curr) => (
                                                                        <button
                                                                            key={curr}
                                                                            onClick={() => {
                                                                                setFormData({ ...formData, currency: curr });
                                                                                setIsCurrencyDropdownOpen(false);
                                                                            }}
                                                                            className={cn(
                                                                                "w-full flex items-center justify-between px-4 py-3 font-bold transition-colors text-black",
                                                                                formData.currency === curr ? "bg-black/10" : "hover:bg-black/5"
                                                                            )}
                                                                        >
                                                                            {curr} {formData.currency === curr && <Check size={16} />}
                                                                        </button>
                                                                    ))}
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className="flex items-center justify-center gap-3 cursor-pointer group"
                                                onClick={() => setFormData(prev => ({ ...prev, terms_accepted: !prev.terms_accepted }))}
                                            >
                                                <div className={cn(
                                                    "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                                                    formData.terms_accepted ? "bg-neutral-900 border-neutral-900" : "border-black/30 bg-white/20"
                                                )}>
                                                    {formData.terms_accepted && <Check size={16} className="text-white" strokeWidth={3} />}
                                                </div>
                                                <p className="text-sm font-medium text-black/70 select-none">
                                                    Akceptuję <span className="underline decoration-black/30 hover:text-black" onClick={(e) => { e.stopPropagation(); setShowTerms(true); }}>regulamin</span>
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="space-y-4 flex-1"
                                        >
                                            <div className="text-center mb-4">
                                                <div className="inline-block bg-black/5 border border-black/10 px-6 py-2 rounded-full">
                                                    <span className="text-xl font-black text-black">{formData.amount.toFixed(2)} {formData.currency}</span>
                                                </div>
                                                <p className="text-xs text-black/50 mt-1">{formData.email}</p>
                                            </div>

                                            {clientSecret && (
                                                <div className="bg-white/40 p-4 rounded-xl border border-black/10">
                                                    <Elements
                                                        stripe={stripePromise}
                                                        options={{
                                                            clientSecret,
                                                            appearance: {
                                                                theme: 'stripe',
                                                                variables: {
                                                                    colorPrimary: '#000000',
                                                                    colorBackground: '#ffffff',
                                                                    borderRadius: '8px',
                                                                }
                                                            }
                                                        }}
                                                    >
                                                        <CheckoutForm clientSecret={clientSecret} onClose={closeTippingModal} />
                                                    </Elements>
                                                </div>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            )}
                        </div>

                        {/* Footer Buttons */}
                        {currentStep < 3 && !showTerms && (
                            <div className="px-6 pb-6 pt-4 flex gap-3 bg-white/20 border-t border-white/20 backdrop-blur-md z-20">
                                {currentStep > 0 && (
                                    <button
                                        onClick={handleBack}
                                        className="px-5 py-3 rounded-xl font-bold text-black/60 bg-white/40 border border-black/5 hover:bg-white/60 transition-colors"
                                    >
                                        Wstecz
                                    </button>
                                )}
                                <button
                                    onClick={handleNext}
                                    disabled={isProcessing}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-lg text-white bg-neutral-900 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    {isProcessing ? <Loader2 className="animate-spin" /> : "DALEJ"} <ArrowRight size={20} />
                                </button>
                            </div>
                        )}

                        <div className="pb-3 pt-2 flex items-center justify-center bg-black/5 border-t border-black/5">
                             <div className="flex items-center gap-[3px] opacity-40 hover:opacity-80 transition-opacity">
                                  <span className="text-[9px] text-black font-bold uppercase tracking-widest">Powered by</span>
                                  <StripeLogo />
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default TippingModal;
