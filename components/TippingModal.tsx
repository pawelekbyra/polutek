"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/context/LanguageContext';
import { useToast } from '@/context/ToastContext';
import { useStore } from '@/store/useStore';
import { X, ChevronDown, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import StatusMessage from '@/components/ui/StatusMessage';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PK!);

// Logo Stripe w wersji BIAŁEJ
const StripeLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="33" viewBox="0 0 120 60" fillRule="evenodd" fill="#FFFFFF">
        <path d="M101.547 30.94c0-5.885-2.85-10.53-8.3-10.53-5.47 0-8.782 4.644-8.782 10.483 0 6.92 3.908 10.414 9.517 10.414 2.736 0 4.805-.62 6.368-1.494v-4.598c-1.563.782-3.356 1.264-5.632 1.264-2.23 0-4.207-.782-4.46-3.494h11.24c0-.3.046-1.494.046-2.046zM90.2 28.757c0-2.598 1.586-3.678 3.035-3.678 1.402 0 2.897 1.08 2.897 3.678zm-14.597-8.345c-2.253 0-3.7 1.057-4.506 1.793l-.3-1.425H65.73v26.805l5.747-1.218.023-6.506c.828.598 2.046 1.448 4.07 1.448 4.115 0 7.862-3.3 7.862-10.598-.023-6.667-3.816-10.3-7.84-10.3zm-1.38 15.84c-1.356 0-2.16-.483-2.713-1.08l-.023-8.53c.598-.667 1.425-1.126 2.736-1.126 2.092 0 3.54 2.345 3.54 5.356 0 3.08-1.425 5.38-3.54 5.38zm-16.4-17.196l5.77-1.24V13.15l-5.77 1.218zm0 1.747h5.77v20.115h-5.77zm-6.185 1.7l-.368-1.7h-4.966V40.92h5.747V27.286c1.356-1.77 3.655-1.448 4.368-1.195v-5.287c-.736-.276-3.425-.782-4.782 1.7zm-11.494-6.7L34.535 17l-.023 18.414c0 3.402 2.552 5.908 5.954 5.908 1.885 0 3.264-.345 4.023-.76v-4.667c-.736.3-4.368 1.356-4.368-2.046V25.7h4.368v-4.897h-4.37zm-15.54 10.828c0-.897.736-1.24 1.954-1.24a12.85 12.85 0 0 1 5.7 1.47V21.47c-1.908-.76-3.793-1.057-5.7-1.057-4.667 0-7.77 2.437-7.77 6.506 0 6.345 8.736 5.333 8.736 8.07 0 1.057-.92 1.402-2.207 1.402-1.908 0-4.345-.782-6.276-1.84v5.47c2.138.92 4.3 1.3 6.276 1.3 4.782 0 8.07-2.368 8.07-6.483-.023-6.85-8.782-5.632-8.782-8.207z"/>
    </svg>
);

const CheckoutForm = ({ clientSecret, onClose, onBack }: { clientSecret: string, onClose: () => void, onBack: () => void }) => {
    const stripe = useStripe();
    const elements = useElements();
    const { addToast } = useToast();
    const [isProcessing, setIsProcessing] = useState(false);
    const [isElementReady, setIsElementReady] = useState(false);
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
            <div className="mb-4 min-h-[200px] relative">
                 {/* Loader displayed until Stripe Element is ready */}
                 {!isElementReady && (
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        <Loader2 className="animate-spin h-8 w-8 text-pink-600" />
                    </div>
                )}
                <div className={cn("transition-opacity duration-300", isElementReady ? "opacity-100" : "opacity-0")}>
                    <PaymentElement
                        options={{
                            layout: 'tabs',
                        }}
                        onReady={() => setIsElementReady(true)}
                    />
                </div>
            </div>
            <div className="flex gap-3">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 px-6 h-10 flex items-center justify-center rounded-xl font-bold text-white bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-all text-sm uppercase tracking-wide border border-white/5"
                >
                    Wstecz
                </button>
                <button
                    disabled={isProcessing || !stripe || !elements || !isElementReady}
                    className="flex-1 h-10 rounded-xl font-bold text-white text-base bg-pink-600 hover:bg-pink-700 transition-all disabled:opacity-50 tracking-wider shadow-lg active:scale-[0.98] uppercase flex items-center justify-center gap-2"
                >
                    {isProcessing ? (
                        <div className="flex items-center justify-center gap-2">
                            <Loader2 className="animate-spin h-5 w-5" />
                        </div>
                    ) : (
                        "Napiwkuj"
                    )}
                </button>
            </div>
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
  const [lastIntentConfig, setLastIntentConfig] = useState<{ amount: number, currency: string, email: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // New key to force re-mounting of Elements on step entry
  const [paymentStepKey, setPaymentStepKey] = useState(0);

  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Validation Error State
  const [validationError, setValidationError] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoggedIn) {
        setFormData(prev => ({ ...prev, email: user?.email || '' }));
    }

    // Reset state whenever modal closes, regardless of login status
    if (!isTippingModalOpen) {
        setCurrentStep(0);
        setFormData(prev => ({ ...prev, create_account: false, terms_accepted: false, recipient: '' }));
        setIsCurrencyDropdownOpen(false);
        setShowTerms(false);
        setClientSecret(null);
        setLastIntentConfig(null);
        setValidationError(null);
        setPaymentStepKey(0);
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
    // Clear any previous error on attempt
    setValidationError(null);

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
            // Can use status message for this too, or keep as toast since it's checkbox related not value related
            setValidationError('Musisz zaakceptować Regulamin i Politykę Prywatności.');
            return;
        }

        if (formData.currency === 'PLN' && formData.amount < 5) {
            setValidationError('Kwota mniejsza niż 5 PLN.');
            return;
        }
        if (formData.currency !== 'PLN' && formData.amount < 1) {
            setValidationError(`Minimalna kwota napiwku to 1 ${formData.currency}.`);
            return;
        }

        // Reuse existing client secret if config hasn't changed
        if (clientSecret && lastIntentConfig &&
            lastIntentConfig.amount === formData.amount &&
            lastIntentConfig.currency === formData.currency &&
            lastIntentConfig.email === formData.email) {
            setPaymentStepKey(prev => prev + 1); // Force fresh mount
            setCurrentStep(3);
            return;
        }

        setIsProcessing(true);
        try {
            const res = await fetch('/api/create-payment-intent', {
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
                setLastIntentConfig({
                    amount: formData.amount,
                    currency: formData.currency,
                    email: formData.email
                });
                setPaymentStepKey(prev => prev + 1); // Force fresh mount
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
      setValidationError(null);
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

  const modalTitle = showTerms ? "Regulamin i Polityka" : "Bramka Napiwkowa";

  const stripeOptions = useMemo(() => {
    // Ensure we never pass an empty string if clientSecret is null,
    // although the component only renders if clientSecret is truthy.
    if (!clientSecret) return undefined;

    return {
      clientSecret,
      appearance: {
          theme: 'night' as const,
          variables: {
              colorPrimary: '#db2777', // bg-pink-600
              colorBackground: '#2C2C2E',
              colorText: '#ffffff',
              colorDanger: '#ff4444',
              fontFamily: 'inherit',
              borderRadius: '12px',
              spacingUnit: '4px',
          },
          rules: {
              '.Input': {
                  border: '1px solid rgba(255,255,255,0.1)',
                  backgroundColor: 'rgba(0,0,0,0.3)',
              },
              '.Input:focus': {
                  border: '1px solid #db2777', // bg-pink-600
              }
          }
      }
    };
  }, [clientSecret]);

  // Animacje: Subtelne przejścia opacity + slide
  const stepVariants = {
      initial: { x: 20, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: -20, opacity: 0 }
  };

  return (
    <AnimatePresence mode="wait">
      {isTippingModalOpen && (
        <div className="absolute inset-0 z-[10200] flex items-center justify-center pointer-events-none font-sans">
          {/* TŁO: Subtelne rozmycie (2px) i przyciemnienie */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-[-1] pointer-events-auto bg-black/70 backdrop-blur-[2px]"
            onClick={closeTippingModal}
          />
          <motion.div
            initial={{ x: tippingModalOptions.fromLeft ? '-100%' : '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: tippingModalOptions.fromLeft ? '-100%' : '100%' }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
            // KONTENER: Overflow visible, żeby dropdown mógł wystawać
            className="relative w-[90%] max-w-[420px] max-h-[85vh] flex flex-col rounded-3xl bg-[#1C1C1E] shadow-2xl pointer-events-auto border border-white/10 overflow-visible"
          >
        
        {/* NAGŁÓWEK - Adjusted for perfect centering using flexbox and removed top padding */}
        <div className="relative h-14 flex items-center justify-center px-6 text-center shrink-0 z-10 bg-[#1C1C1E] border-b border-white/5 rounded-t-3xl">
            <h2 className="text-xl font-bold text-white/50 tracking-widest">
                {modalTitle}
            </h2>
            <button
                onClick={closeTippingModal}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-full transition-colors z-50"
            >
                <X size={22} strokeWidth={2.5} />
            </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="h-1 w-full bg-white/5 relative overflow-hidden z-10">
            <motion.div
                className="h-full bg-pink-600" // Changed from #FE2C55 to bg-pink-600
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>

        {/* TREŚĆ */}
        <div className={cn(
            "flex-1 overflow-y-auto px-6 pt-6 pb-0 flex flex-col relative z-10 text-white rounded-b-3xl custom-scrollbar", // Changed pt-10 to pt-6 per user request
            isCurrencyDropdownOpen && "z-30" // Raise content z-index when dropdown is open so it covers footer
        )}>
            <AnimatePresence mode="wait" initial={false}>
                {currentStep === 0 && (
                    <motion.div
                        key="step0"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                    >
                        <div className="text-left">
                            <p className="text-base font-medium text-white/90 tracking-wide">Komu chcesz wysłać napiwek?</p>
                        </div>

                        <div className="space-y-3 pt-1">
                            <div 
                                className={cn(
                                    "flex items-center justify-start h-10 px-3 gap-3 rounded-2xl cursor-pointer transition-all duration-300 group border",
                                    formData.recipient === 'Paweł'
                                        ? "bg-[#2C2C2E] border-pink-600 shadow-[0_0_15px_rgba(219,39,119,0.15)]" // Changed highlight color
                                        : "bg-[#2C2C2E] border-white/5 hover:border-white/20 hover:bg-[#3A3A3C]"
                                )}
                                onClick={() => setFormData(prev => ({ ...prev, recipient: 'Paweł' }))}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                                    formData.recipient === 'Paweł'
                                        ? "border-pink-600" // Changed border color
                                        : "border-white/30 group-hover:border-white"
                                )}>
                                    {formData.recipient === 'Paweł' && <div className="w-2.5 h-2.5 bg-pink-600 rounded-full" />} {/* Changed fill color */}
                                </div>
                                <span className={cn("text-base font-semibold transition-colors", formData.recipient === 'Paweł' ? "text-white" : "text-white/70 group-hover:text-white")}>
                                    Pawłowi Polutkowi
                                </span>
                            </div>

                            <div 
                                className={cn(
                                    "flex items-center justify-start h-10 px-3 gap-3 rounded-2xl cursor-pointer transition-all duration-300 group border",
                                    formData.recipient === 'Nikt'
                                        ? "bg-[#2C2C2E] border-white shadow-lg" 
                                        : "bg-[#2C2C2E] border-white/5 hover:border-white/20 hover:bg-[#3A3A3C]"
                                )}
                                onClick={() => setFormData(prev => ({ ...prev, recipient: 'Nikt' }))}
                            >
                                <div className={cn(
                                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0",
                                    formData.recipient === 'Nikt'
                                        ? "border-white"
                                        : "border-white/30 group-hover:border-white"
                                )}>
                                    {formData.recipient === 'Nikt' && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                </div>
                                <span className={cn("text-base font-semibold transition-colors", formData.recipient === 'Nikt' ? "text-white" : "text-white/70 group-hover:text-white")}>
                                    Nikomu
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 1 && (
                    <motion.div
                        key="step1"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="space-y-3" // Changed from space-y-4 to space-y-3
                    >
                        <div className="text-left">
                            <p className="text-base font-medium text-white/90 tracking-wide">Czy chcesz utworzyć konto Patrona?</p>
                        </div>

                        <div className="space-y-3">
                            {!isLoggedIn && (
                                <div 
                                    className={cn(
                                        "flex items-center justify-start h-10 px-3 gap-3 rounded-2xl cursor-pointer transition-all duration-300 group border",
                                        formData.create_account 
                                            ? "bg-[#2C2C2E] border-pink-600 shadow-[0_0_15px_rgba(219,39,119,0.15)]" // Changed highlight
                                            : "bg-[#2C2C2E] border-white/5 hover:border-white/20 hover:bg-[#3A3A3C]"
                                    )}
                                    onClick={() => setFormData(prev => ({ ...prev, create_account: !prev.create_account }))}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 shrink-0", 
                                        formData.create_account 
                                            ? "border-pink-600" // Changed border
                                            : "border-white/30 group-hover:border-white"
                                    )}>
                                        {formData.create_account && <div className="w-2.5 h-2.5 bg-pink-600 rounded-full" />} {/* Changed fill */}
                                    </div>
                                    <span className={cn("text-base font-semibold transition-colors", formData.create_account ? "text-white" : "text-white/70 group-hover:text-white")}>
                                        No jacha!
                                    </span>
                                </div>
                            )}

                            <div className={cn("space-y-2 overflow-hidden transition-all duration-500", (formData.create_account) ? "max-h-[200px] opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2")}>
                                <div className="group relative">
                                    <input
                                        type="email"
                                        placeholder="Twój adres email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="relative w-full bg-black/30 border border-white/10 rounded-xl h-10 px-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-black/50 focus:border-pink-600 transition-all font-medium text-base" // Changed to h-10
                                    />
                                </div>
                                <p className="text-xs text-white/40 text-left px-2 font-medium">
                                    Na podany adres e-mail otrzymasz dane do logowania.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {currentStep === 2 && (
                    <motion.div
                        key={showTerms ? "terms" : "step2"}
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="space-y-6 flex-1 relative z-10 h-full flex flex-col"
                    >
                        {showTerms ? (
                             <div className="flex flex-col h-full overflow-hidden">
                                {/* REGULAMIN: Ustawiona wysokość i scrollowanie */}
                                <div className="flex-1 overflow-y-auto bg-black/20 border border-white/10 rounded-xl p-4 text-sm text-white/80 space-y-3 custom-scrollbar h-[50vh] max-h-[400px]">
                                    <p className="font-bold text-white">1. Postanowienia ogólne</p>
                                    <p>Korzystając z Bramki Napiwkowej, użytkownik (&quot;Darczyńca&quot;) oświadcza, że zapoznał się z niniejszym regulaminem i w pełni go akceptuje. Wpłaty są dobrowolne i mają charakter darowizny na rzecz twórcy (&quot;Beneficjent&quot;).</p>
                                    
                                    <p className="font-bold text-white">2. Płatności i Zwroty</p>
                                    <p>Wszystkie transakcje są przetwarzane przez zewnętrznego operatora płatności Stripe. Serwis nie przechowywuje pełnych danych kart płatniczych. Z uwagi na charakter usługi (darowizna cyfrowa), wpłaty są bezzwrotne, chyba że przepisy prawa stanowią inaczej. Reklamacje dotyczące błędów technicznych należy zgłaszać w ciągu 14 dni.</p>
                                    
                                    <p className="font-bold text-white">3. Prywatność i Dane Osobowe</p>
                                    <p>Administratorem danych jest właściciel serwisu. Podany adres e-mail przetwarzany jest wyłącznie w celu:</p>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Przesłania potwierdzenia transakcji.</li>
                                        <li>Utworzenia konta Patrona (jeśli zaznaczono opcję).</li>
                                        <li>Kontaktu w sprawach technicznych.</li>
                                    </ul>
                                    <p>Dane nie są udostępniane podmiotom trzecim w celach marketingowych.</p>
                                    
                                    <p className="font-bold text-white">4. Postanowienia końcowe</p>
                                    <p>Regulamin może ulec zmianie. W sprawach nieuregulowanych decydują przepisy prawa polskiego.</p>
                                    
                                    <p className="opacity-50 mt-4 italic">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                                    <p className="opacity-50 italic">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div>
                                    <h3 className="text-base font-medium text-white/90">Wybierz lub wpisz kwotę napiwku</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {suggestedAmounts.map(amount => (
                                        <button
                                            key={amount}
                                            onClick={() => {
                                                setFormData({ ...formData, amount });
                                                setValidationError(null);
                                            }}
                                            className={cn(
                                                "h-10 flex items-center justify-center rounded-xl font-bold transition-all border relative overflow-hidden group text-lg",
                                                formData.amount === amount
                                                    ? "bg-pink-600 border-pink-600 text-white shadow-lg" // Changed selected bg/border
                                                    : "bg-[#2C2C2E] border-white/5 text-white/80 hover:bg-[#3A3A3C] hover:text-white"
                                            )}
                                        >
                                            {amount} {formData.currency}
                                        </button>
                                    ))}
                                </div>

                                {/* POLE KWOTY I DROPDOWN (Z-INDEX FIX) */}
                                <div 
                                    className={cn("flex items-stretch h-10 relative transition-all", isCurrencyDropdownOpen ? "z-50" : "z-30")}
                                    ref={dropdownRef}
                                >
                                    <div className="relative flex-1 h-full">
                                        <input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => {
                                                setFormData({ ...formData, amount: Number(e.target.value) });
                                                setValidationError(null);
                                            }}
                                            className="w-full h-full bg-black/30 border border-white/10 text-center text-xl font-black text-white rounded-l-xl focus:outline-none focus:bg-black/50 focus:border-pink-600 transition-all z-10 relative" // Changed h-[60px] to h-10 and text-3xl to text-xl
                                            placeholder="0"
                                        />
                                    </div>

                                    {/* KONTENER DLA DROPDOWNA */}
                                    <div className="relative h-full w-[100px]">
                                        {/* TRIGGER - widoczny tylko gdy dropdown zamknięty, lub pod spodem */}
                                        <div
                                            className="h-full border border-l-0 border-white/10 bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-colors relative shrink-0 cursor-pointer px-4 rounded-r-xl flex items-center justify-between"
                                            onClick={() => setIsCurrencyDropdownOpen(true)}
                                        >
                                            <span className="font-bold text-base text-white select-none">{formData.currency}</span> {/* Changed text-xl to text-base */}
                                            <ChevronDown className="w-5 h-5 text-white/50" />
                                        </div>

                                        {/* ROZWIJANA LISTA - Zakrywa Trigger */}
                                        <AnimatePresence>
                                            {isCurrencyDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 1, scale: 1 }} 
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 1, scale: 1 }}
                                                    className="absolute top-0 right-0 w-full bg-[#2C2C2E] border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-[9999]"
                                                >
                                                    <div className="flex flex-col">
                                                        {currencies.map((currency) => (
                                                            <button
                                                                key={currency}
                                                                onClick={() => {
                                                                    setFormData({ ...formData, currency: currency as any });
                                                                    setIsCurrencyDropdownOpen(false);
                                                                }}
                                                                className={cn(
                                                                    "w-full flex items-center justify-between px-4 py-2 text-left font-bold transition-colors relative group text-white border-b border-white/5 last:border-0 h-10", // Changed py-4 to py-2 h-10
                                                                    formData.currency === currency
                                                                        ? "bg-white/10"
                                                                        : "hover:bg-white/5"
                                                                )}
                                                            >
                                                                <span className="text-base">{currency}</span> {/* Changed text-xl to text-base */}
                                                                {formData.currency === currency && (
                                                                    <Check size={20} className="text-pink-600" /> // Changed check color
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center justify-start gap-3 cursor-pointer group relative z-10 mt-2"
                                    onClick={() => {
                                        setFormData(prev => ({ ...prev, terms_accepted: !prev.terms_accepted }));
                                        setValidationError(null);
                                    }}
                                >
                                    <div className={cn(
                                        "w-5 h-5 rounded border flex items-center justify-center transition-all duration-200 shrink-0",
                                        formData.terms_accepted
                                            ? "bg-pink-600 border-pink-600" // Changed checkbox color
                                            : "border-white/30 bg-transparent group-hover:border-white"
                                    )}>
                                        {formData.terms_accepted && <Check size={14} className="text-white" strokeWidth={3} />}
                                    </div>
                                    <p className="text-sm font-medium text-white/50 group-hover:text-white transition-colors select-none text-left">
                                        Akceptuję <span className="underline decoration-white/30 underline-offset-2 hover:text-white cursor-pointer" onClick={(e) => { e.stopPropagation(); setShowTerms(true); }}>Regulamin i Politykę Prywatności</span>
                                    </p>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}

                {currentStep === 3 && (
                    <motion.div
                        key="step3"
                        variants={stepVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.2 }}
                        className="space-y-4 flex-1 relative z-10"
                    >
                        <div className="text-center">
                            <div className="inline-block bg-[#2C2C2E] border border-white/10 text-white px-4 py-1.5 rounded-full shadow-lg">
                                <span className="text-xl font-black">{formData.amount.toFixed(2)} {formData.currency}</span>
                            </div>
                        </div>

                        {clientSecret && stripeOptions && (
                            <div className="bg-transparent mt-2 min-h-[250px] relative">
                                <Elements 
                                    key={`${clientSecret}-${paymentStepKey}`}
                                    stripe={stripePromise} 
                                    options={stripeOptions}
                                >
                                    <CheckoutForm clientSecret={clientSecret} onClose={closeTippingModal} onBack={handleBack} />
                                </Elements>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* PRZYCISKI NAWIGACJI - widoczne tylko gdy nie czytamy regulaminu */}
        {!showTerms && (
             <div className={cn("px-6 pb-6 pt-4 flex flex-col gap-3 bg-transparent z-20 relative rounded-b-3xl", isCurrencyDropdownOpen && "z-10")}>
                <div className="flex gap-3 w-full">
                    {/*
                       If currentStep is 3 (payment), we want the Wstecz button in the footer to work as "Back from Payment"
                       or let the form handle it?
                       The user removed the "sticky" back button from CheckoutForm.
                       So we must ensure this footer button is visible in step 3.
                       Condition: currentStep > 0 shows Wstecz.
                       currentStep < 3 shows Enter (Next).
                       So in step 3, only Wstecz is shown here.
                       And CheckoutForm renders "Napiwkuj" (submit).
                       So footer has "Wstecz", Form has "Napiwkuj". Perfect.
                    */}
                    {currentStep > 0 && currentStep !== 3 && (
                        <button
                            onClick={handleBack}
                            className="flex-1 px-6 h-10 flex items-center justify-center rounded-xl font-bold text-white bg-[#2C2C2E] hover:bg-[#3A3A3C] transition-all text-sm uppercase tracking-wide border border-white/5"
                        >
                            Wstecz
                        </button>
                    )}
                    {currentStep < 3 && (
                        <button
                            onClick={handleNext}
                            disabled={isProcessing}
                            className="group flex-1 h-10 flex items-center justify-center gap-2 rounded-xl font-bold uppercase tracking-wider text-white bg-pink-600 hover:bg-pink-700 transition-all disabled:opacity-50 shadow-lg active:scale-[0.98]" // Changed to h-10
                        >
                            {isProcessing ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    {/* <span>PRZETWARZANIE...</span> removed text per user request */}
                                </div>
                            ) : (
                                "ENTER" // Changed text from DALEJ to ENTER
                            )}
                        </button>
                    )}
                </div>

                <StatusMessage
                    type="error"
                    message={validationError}
                    isVisible={!!validationError}
                    className="w-full"
                />
            </div>
        )}

        {/* STOPKA */}
        <div className="pb-4 pt-4 flex items-center justify-center bg-[#1C1C1E] z-10 border-t border-white/5 rounded-b-3xl min-h-[50px]">
             {showTerms ? (
                  <button
                    onClick={() => setShowTerms(false)}
                    className="w-auto px-4 py-2 rounded-lg font-bold text-white bg-[#3A3A3C] hover:bg-[#4A4A4C] transition-all text-xs uppercase tracking-wide"
                  >
                    Wróć
                  </button>
             ) : (
                 <div className="flex items-center gap-0 opacity-40 hover:opacity-100 transition-all duration-300">
                      <span className="text-[10px] text-white font-bold uppercase tracking-widest">Powered by</span>
                      <div className="relative flex items-center -mt-px -ml-2">
                          <StripeLogo />
                      </div>
                 </div>
             )}
        </div>
      </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TippingModal;
