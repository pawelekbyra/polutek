"use client";

import React, { useState, useEffect, useRef } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useStore } from '@/store/useStore';
import { X, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// Logo Stripe w wersji CZARNEJ
const StripeLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="25" viewBox="0 0 120 60" fillRule="evenodd" fill="#000000">
        <path d="M101.547 30.94c0-5.885-2.85-10.53-8.3-10.53-5.47 0-8.782 4.644-8.782 10.483 0 6.92 3.908 10.414 9.517 10.414 2.736 0 4.805-.62 6.368-1.494v-4.598c-1.563.782-3.356 1.264-5.632 1.264-2.23 0-4.207-.782-4.46-3.494h11.24c0-.3.046-1.494.046-2.046zM90.2 28.757c0-2.598 1.586-3.678 3.035-3.678 1.402 0 2.897 1.08 2.897 3.678zm-14.597-8.345c-2.253 0-3.7 1.057-4.506 1.793l-.3-1.425H65.73v26.805l5.747-1.218.023-6.506c.828.598 2.046 1.448 4.07 1.448 4.115 0 7.862-3.3 7.862-10.598-.023-6.667-3.816-10.3-7.84-10.3zm-1.38 15.84c-1.356 0-2.16-.483-2.713-1.08l-.023-8.53c.598-.667 1.425-1.126 2.736-1.126 2.092 0 3.54 2.345 3.54 5.356 0 3.08-1.425 5.38-3.54 5.38zm-16.4-17.196l5.77-1.24V13.15l-5.77 1.218zm0 1.747h5.77v20.115h-5.77zm-6.185 1.7l-.368-1.7h-4.966V40.92h5.747V27.286c1.356-1.77 3.655-1.448 4.368-1.195v-5.287c-.736-.276-3.425-.782-4.782 1.7zm-11.494-6.7L34.535 17l-.023 18.414c0 3.402 2.552 5.908 5.954 5.908 1.885 0 3.264-.345 4.023-.76v-4.667c-.736.3-4.368 1.356-4.368-2.046V25.7h4.368v-4.897h-4.37zm-15.54 10.828c0-.897.736-1.24 1.954-1.24a12.85 12.85 0 0 1 5.7 1.47V21.47c-1.908-.76-3.793-1.057-5.7-1.057-4.667 0-7.77 2.437-7.77 6.506 0 6.345 8.736 5.333 8.736 8.07 0 1.057-.92 1.402-2.207 1.402-1.908 0-4.345-.782-6.276-1.84v5.47c2.138.92 4.3 1.3 6.276 1.3 4.782 0 8.07-2.368 8.07-6.483-.023-6.85-8.782-5.632-8.782-8.207z"/>
    </svg>
);

const CheckoutForm = ({ clientSecret, onClose }: { clientSecret: string, onClose: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { addToast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const { t } = useTranslation();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: 'if_required',
        });

        if (error) {
            addToast(error.message || 'Wystąpił błąd', 'error');
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            addToast('Płatność udana!', 'success');
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4 min-h-[200px]">
                <PaymentElement 
                    options={{ 
                        layout: 'tabs',
                        appearance: {
                            theme: 'stripe',
                            variables: {
                                colorPrimary: '#000000',
                                colorBackground: '#f3f4f6', // Lekko szare tło inputów w Stripe
                                colorText: '#000000',
                                borderRadius: '8px',
                                spacingUnit: '4px',
                            },
                            rules: {
                                '.Input': {
                                    border: '2px solid transparent',
                                    backgroundColor: '#f3f4f6', // Szare inputy
                                    color: '#000000',
                                },
                                '.Input:focus': {
                                    border: '2px solid #000000', // Czarna ramka przy focus
                                    backgroundColor: '#ffffff', // Białe tło przy focus
                                }
                            }
                        }
                    }} 
                />
            </div>
            <button
                disabled={isProcessing || !stripe || !elements}
                className="w-full py-4 rounded-xl font-black text-white text-lg bg-black hover:bg-neutral-800 transition-all disabled:opacity-50 tracking-widest uppercase shadow-[0_10px_20px_rgba(0,0,0,0.1)] active:scale-[0.98]"
            >
                {isProcessing ? (t('processing') || "PRZETWARZANIE...") : "ZAPŁAĆ TERAZ"}
            </button>
        </form>
    );
};

const TippingModal = () => {
  const { isLoggedIn, user } = useUser();
  const { addToast } = useToast();
  const { t } = useTranslation();
  const { isTippingModalOpen, closeTippingModal, tippingModalOptions } = useStore();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    amount: 10,
    currency: 'PLN',
    create_account: false,
    terms_accepted: false,
    recipient: '',
  });
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
        setFormData(prev => ({ ...prev, email: user?.email || '' }));
    } else {
        if (!isTippingModalOpen) {
            setCurrentStep(0);
            setFormData(prev => ({ ...prev, create_account: false, terms_accepted: false, recipient: '' }));
            setIsCurrencyDropdownOpen(false);
            setShowTerms(false);
        }
    }
  }, [isLoggedIn, user, isTippingModalOpen]);

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
              setIsCurrencyDropdownOpen(false);
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNext = async () => {
    if (currentStep === 0) {
        if (!formData.recipient) {
            addToast('Wybierz odbiorcę, aby kontynuować.', 'error');
            return;
        }
        if (formData.recipient === 'Nikt') {
            closeTippingModal();
            return;
        }
        if (isLoggedIn) {
            setCurrentStep(2);
        } else {
            setCurrentStep(1);
        }
    }
    else if (currentStep === 1) {
        if (formData.create_account) {
            if (!formData.email) {
                addToast(t('errorEmailRequired') || 'Podaj adres email', 'error');
                return;
            }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                addToast(t('errorInvalidEmail') || 'Nieprawidłowy email', 'error');
                return;
            }
        }
        setCurrentStep(2);
    }
    else if (currentStep === 2) {
        if (!formData.terms_accepted) {
            addToast('Musisz zaakceptować regulamin i Politykę Prywatności, aby kontynuować.', 'error');
            return;
        }

        const minAmount = formData.currency === 'PLN' ? 5.00 : 1.00;
        if (formData.amount < minAmount) {
            addToast(t('errorMinTipAmount', { minAmount: minAmount.toFixed(2), currency: formData.currency }) || `Minimalna kwota to ${minAmount.toFixed(2)} ${formData.currency}`, 'error');
            return;
        }

        setIsProcessing(true);
        try {
            const res = await fetch('/api/payments/create-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: formData.amount,
                    currency: formData.currency,
                    countryCodeHint: 'PL',
                    email: formData.email,
                    createAccount: formData.create_account,
                    language: 'pl'
                }),
            });
            const data = await res.json();
            if (res.ok) {
                setClientSecret(data.clientSecret);
                setCurrentStep(3);
            } else {
                addToast(data.error || t('errorCreatingPayment') || 'Błąd tworzenia płatności', 'error');
            }
        } catch (error) {
            addToast(t('errorUnexpected') || 'Wystąpił niespodziewany błąd', 'error');
        } finally {
            setIsProcessing(false);
        }
    }
  };

  const handleBack = () => {
      if (currentStep === 2 && isLoggedIn) {
          setCurrentStep(0);
      } else if (currentStep > 0) {
          setCurrentStep(currentStep - 1);
      }
  };

  const steps = [
      { id: 0, title: "Odbiorca" },
      { id: 1, title: "Dane" },
      { id: 2, title: "Kwota" },
      { id: 3, title: "Płatność" }
  ];

  const totalSteps = isLoggedIn ? 3 : 4;
  const currentVisualStep = isLoggedIn && currentStep >= 1 ? currentStep - 1 : currentStep;
  const progress = ((currentVisualStep + 1) / totalSteps) * 100;

  const suggestedAmounts = [10, 20, 50];
  const currencies = ['PLN', 'EUR', 'USD', 'GBP'];

  return (
    <AnimatePresence mode="wait">
      {isTippingModalOpen && (
        <div className="absolute inset-0 z-[10200] flex items-center justify-center pointer-events-none">
          {/* TŁO: Lekko przyciemnione, ale czyste */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-[-1] pointer-events-auto bg-black/20 backdrop-blur-sm"
            onClick={closeTippingModal}
          />
          <motion.div
            initial={{ x: tippingModalOptions.fromLeft ? '-100%' : '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: tippingModalOptions.fromLeft ? '-100%' : '100%' }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            // KONTENER: Czysta biel z solidnym cieniem
            className="relative w-[90%] max-w-[420px] max-h-[85vh] flex flex-col rounded-3xl overflow-hidden bg-white shadow-2xl pointer-events-auto border border-black/5"
          >
        
        {/* NAGŁÓWEK */}
        <div className="relative pt-6 pb-4 px-6 text-center shrink-0 z-10 bg-white">
            <h2 className="text-2xl font-black text-black tracking-tight">
                Bramka Napiwkowa
            </h2>
            <button
                onClick={closeTippingModal}
                className="absolute right-4 top-4 p-2 text-black/40 hover:text-black hover:bg-gray-100 rounded-full transition-colors z-50"
            >
                <X size={22} strokeWidth={2.5} />
            </button>
        </div>

        {/* PROGRESS BAR: Szary tor, czarne wypełnienie */}
        <div className="h-1.5 w-full bg-gray-100 relative overflow-hidden z-10 mb-2">
            <motion.div
                className="h-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>

        {/* TREŚĆ */}
        <div className="flex-1 overflow-visible px-6 pt-4 pb-0 flex flex-col relative z-10">
            <AnimatePresence mode="wait">
                {currentStep === 0 && (
                    <motion.div
                        key="step0"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4"
                    >
                        <div className="text-left">
                            <p className="text-xl font-bold text-black tracking-wide">Komu wysyłasz hajs?</p>
                        </div>

                        <div className="space-y-3 pt-2">
                            {/* OPCJA: PAWEŁ - SZARY AKCENT */}
                            <div 
                                className={cn(
                                    "flex items-center justify-start p-5 gap-5 rounded-2xl cursor-pointer transition-all duration-300 group border-2",
                                    formData.recipient === 'Paweł'
                                        ? "bg-black border-black shadow-lg scale-[1.02]" 
                                        : "bg-gray-100 border-transparent hover:bg-gray-200"
                                )}
                                onClick={() => setFormData(prev => ({ ...prev, recipient: 'Paweł' }))}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                                    formData.recipient === 'Paweł'
                                        ? "bg-white border-white"
                                        : "border-black/30 group-hover:border-black"
                                )}>
                                    {formData.recipient === 'Paweł' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                                </div>
                                
                                <span className={cn("text-lg font-bold transition-colors", formData.recipient === 'Paweł' ? "text-white" : "text-black")}>
                                    Pawłowi Polutkowi
                                </span>
                            </div>

                            {/* OPCJA: NIKT */}
                            <div 
                                className={cn(
                                    "flex items-center justify-start p-5 gap-5 rounded-2xl cursor-pointer transition-all duration-300 group border-2",
                                    formData.recipient === 'Nikt'
                                        ? "bg-black border-black shadow-lg scale-[1.02]" 
                                        : "bg-gray-100 border-transparent hover:bg-gray-200"
                                )}
                                onClick={() => setFormData(prev => ({ ...prev, recipient: 'Nikt' }))}
                            >
                                <div className={cn(
                                    "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                                    formData.recipient === 'Nikt'
                                        ? "bg-white border-white"
                                        : "border-black/30 group-hover:border-black"
                                )}>
                                    {formData.recipient === 'Nikt' && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                                </div>
                                
                                <span className={cn("text-lg font-bold transition-colors", formData.recipient === 'Nikt' ? "text-white" : "text-black")}>
                                    Nikomu
                                </span>
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
                        className="space-y-4"
                    >
                        <div className="text-left">
                            <p className="text-xl font-bold text-black tracking-wide">Konto Patrona?</p>
                        </div>

                        <div className="space-y-4">
                            {!isLoggedIn && (
                                <div 
                                    className={cn(
                                        "flex items-center justify-start p-5 gap-4 rounded-2xl cursor-pointer transition-all duration-300 group border-2",
                                        formData.create_account 
                                            ? "bg-black border-black shadow-lg" 
                                            : "bg-gray-100 border-transparent hover:bg-gray-200"
                                    )}
                                    onClick={() => setFormData(prev => ({ ...prev, create_account: !prev.create_account }))}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0", 
                                        formData.create_account 
                                            ? "bg-white border-white" 
                                            : "border-black/30 group-hover:border-black"
                                    )}>
                                        {formData.create_account && <div className="w-2.5 h-2.5 bg-black rounded-full" />}
                                    </div>
                                    
                                    <span className={cn("text-lg font-bold transition-colors", formData.create_account ? "text-white" : "text-black")}>
                                        No jacha!
                                    </span>
                                </div>
                            )}

                            <div className={cn("space-y-2 overflow-hidden transition-all duration-500", (formData.create_account) ? "max-h-[200px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2")}>
                                <div className="group relative">
                                    {/* INPUT EMAIL: SZARY DEFAULT, BIAŁY FOCUS */}
                                    <input
                                        type="email"
                                        placeholder="Twój adres email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="relative w-full bg-gray-100 border-2 border-transparent rounded-xl px-5 py-4 text-black placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-black transition-all font-medium text-lg"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 text-center px-2 font-medium">
                                    Wyślemy tam <span className="text-black font-bold">dane do logowania</span>. Zero spamu.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        key={showTerms ? "terms" : "step2"}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 flex-1 relative z-10 h-full flex flex-col"
                    >
                        {showTerms ? (
                             <div className="flex flex-col h-full overflow-hidden">
                                <div className="mb-2">
                                    <h3 className="text-lg font-bold text-black">Regulamin i Polityka</h3>
                                </div>
                                <div className="flex-1 overflow-y-auto bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-black space-y-3 custom-scrollbar">
                                    <p className="font-bold">1. Postanowienia ogólne</p>
                                    <p>Wpłacając, akceptujesz zasady. To proste.</p>
                                    <p className="font-bold">2. Płatności</p>
                                    <p>Płatności obsługuje Stripe. Są bezzwrotne, bo to napiwek.</p>
                                    <p className="font-bold">3. Prywatność</p>
                                    <p>Szanujemy Twoje dane. Email służy tylko do wysłania potwierdzenia lub założenia konta.</p>
                                </div>
                                <div className="mt-4">
                                     <button
                                        onClick={() => setShowTerms(false)}
                                        className="w-full py-3 rounded-xl font-bold text-black bg-gray-200 hover:bg-gray-300 transition-all text-sm"
                                    >
                                        Rozumiem, wracamy
                                    </button>
                                </div>
                             </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className="text-xl font-bold text-black">Ile rzucasz?</h3>
                                </div>

                                {/* PRZYCISKI KWOT: SZARE -> CZARNE */}
                                <div className="grid grid-cols-3 gap-3">
                                    {suggestedAmounts.map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => setFormData({ ...formData, amount })}
                                            className={cn(
                                                "py-3 rounded-xl font-bold transition-all border-2 relative overflow-hidden group text-lg",
                                                formData.amount === amount
                                                    ? "bg-black border-black text-white shadow-lg"
                                                    : "bg-gray-100 border-transparent text-black hover:bg-gray-200"
                                            )}
                                        >
                                            {amount}
                                        </button>
                                    ))}
                                </div>

                                {/* POLE KWOTY: SZARY INPUT, BIAŁY FOCUS */}
                                <div className="flex items-center group" ref={dropdownRef}>
                                    <div className="relative flex-1">
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                                            className="w-full bg-gray-100 border-2 border-transparent text-center text-4xl font-black text-black py-4 rounded-l-xl focus:outline-none focus:bg-white focus:border-black focus:border-r-0 transition-all z-10 relative"
                                            placeholder="0"
                                        />
                                    </div>

                                    <div className="relative h-full">
                                        {/* TRIGGER WALUTY */}
                                        <div
                                            className="h-full border-2 border-transparent bg-gray-100 hover:bg-gray-200 transition-colors relative shrink-0 cursor-pointer pl-4 pr-10 rounded-r-xl flex items-center"
                                            onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                                        >
                                            <span className="font-black text-xl text-black select-none">{formData.currency}</span>
                                            <motion.div
                                                animate={{ rotate: isCurrencyDropdownOpen ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center"
                                            >
                                                <ChevronDown className="w-5 h-5 text-black/50" />
                                            </motion.div>
                                        </div>

                                        {/* LISTA WALUT */}
                                        <AnimatePresence>
                                            {isCurrencyDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                                    style={{ originY: 0, originX: 1 }}
                                                    className="absolute top-full right-0 mt-2 min-w-[120px] bg-white border-2 border-black rounded-xl shadow-xl overflow-hidden z-[100]"
                                                >
                                                    <div className="py-1">
                                                        {currencies.map((currency) => (
                                                            <button
                                                                key={currency}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, currency: currency as any });
                                                                    setIsCurrencyDropdownOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full flex items-center justify-between px-4 py-3 text-left font-bold transition-colors relative group text-black",
                                                                    formData.currency === currency
                                                                        ? "bg-gray-100"
                                                                        : "hover:bg-gray-50"
                                                                )}
                                                            >
                                                                <span>{currency}</span>
                                                                {formData.currency === currency && (
                                                                    <Check size={16} className="text-black" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                {/* REGULAMIN */}
                                <div
                                    className="flex items-center justify-center gap-3 cursor-pointer group relative z-10 mt-2"
                                    onClick={() => setFormData(prev => ({ ...prev, terms_accepted: !prev.terms_accepted }))}
                                >
                                    <div className={cn(
                                        "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all duration-200 shrink-0",
                                        formData.terms_accepted
                                            ? "bg-black border-black"
                                            : "border-gray-300 bg-white group-hover:border-black"
                                    )}>
                                        {formData.terms_accepted && <Check size={16} className="text-white" strokeWidth={4} />}
                                    </div>
                                    <p className="text-sm font-medium text-gray-500 group-hover:text-black transition-colors select-none">
                                        Akceptuję <span className="underline decoration-gray-300 underline-offset-2 hover:text-black cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowTerms(true); }}>regulamin i zasady</span>
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 flex-1 relative z-10"
                    >
                        <div className="text-center">
                            <div className="inline-block bg-black text-white px-6 py-2 rounded-full shadow-lg">
                                <span className="text-2xl font-black">{formData.amount.toFixed(2)} {formData.currency}</span>
                            </div>
                        </div>

                        {clientSecret && (
                            // STRIPE CONTAINER: Szare tło, brak obramowania, czysty look
                            <div className="bg-transparent mt-2">
                                <Elements 
                                    stripe={stripePromise} 
                                    options={{ 
                                        clientSecret, 
                                        appearance: { 
                                            theme: 'stripe',
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
        </div>

        {/* PRZYCISKI NAWIGACJI */}
        {currentStep < 3 && !showTerms && (
            <div className="px-6 pb-6 pt-4 flex gap-3 bg-transparent z-20 relative">
                {currentStep > 0 && (
                    <button
                        onClick={handleBack}
                        className="px-6 py-4 rounded-xl font-bold text-black bg-gray-100 hover:bg-gray-200 transition-all text-sm uppercase tracking-wide"
                    >
                        Wstecz
                    </button>
                )}
                <button
                    onClick={handleNext}
                    disabled={isProcessing}
                    className="group flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-black text-xl text-white bg-black hover:bg-neutral-800 transition-all disabled:opacity-50 tracking-widest uppercase shadow-xl active:scale-[0.98]"
                >
                    {isProcessing ? (
                        <span className="animate-pulse">PRZETWARZANIE...</span>
                    ) : (
                        "DALEJ"
                    )}
                </button>
            </div>
        )}

        {/* STOPKA Z SZARYM TŁEM */}
        <div className="pb-4 pt-4 flex items-center justify-center bg-gray-100 z-10 border-t border-gray-200">
             <div className="flex items-center gap-[6px] opacity-60 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0">
                  <span className="text-[10px] text-black font-bold uppercase tracking-widest">Powered by</span>
                  <div className="relative flex items-center -mt-px">
                      <StripeLogo />
                  </div>
             </div>
        </div>
      </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TippingModal;
