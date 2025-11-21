"use client";

import React, { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils'; // Zakładam, że masz tę funkcję
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // Zakładam użycie komponentów Shadcn UI Dialog
import { Input } from '@/components/ui/input'; // Zakładam użycie komponentów Input
import { Button } from '@/components/ui/button'; // Zakładam użycie komponentów Button
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// --- Placeholder na logikę i tłumaczenia z prototype'u JS ---

// Tłumaczenia (na podstawie prototypu)
const translations = {
    tippingTitle: 'Bramka Napiwkowa',
    tippingNext: 'DALEJ',
    tippingPay: 'PŁACĘ',
    tippingTermsTitle: 'Regulamin i Warunki',
    tippingSummaryLabel: 'Kwota napiwku:',
    changingButtonText: 'Przetwarzam...',
    emailPlaceholder: 'Twój adres email (opcjonalnie)',
    amountPlaceholder: 'Kwota',
    createAccountLabel: 'Stwórz konto, aby śledzić napiwki',
    termsLabel: 'Akceptuję regulamin',
    errorEmailRequired: 'Adres email jest wymagany.',
    errorInvalidEmail: 'Podaj poprawny adres email.',
    errorMinTipAmount: 'Minimalna kwota napiwku to {minAmount} {currency}.',
    errorTermsNotAccepted: 'Musisz zaakceptować regulamin.',
};

const useTranslation = (key: keyof typeof translations, replacements?: Record<string, string | number>): string => {
    let text = translations[key] || key;
    if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
            text = text.replace(`{${k}}`, String(v));
        }
    }
    return text;
};

// Logika, która imituje 3 główne kroki i zarządzanie stanem
const useTippingLogic = () => {
    const [currentStep, setCurrentStep] = useState(0); // 0, 1, 2
    const [isProcessing, setIsProcessing] = useState(false);
    const [isTermsVisible, setIsTermsVisible] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        createAccount: false,
        amount: 10.00,
        currency: 'EUR',
        termsAccepted: false,
    });
    const [localError, setLocalError] = useState('');

    // Imitacja totalSteps: 3 wizualne kroki (Email, Kwota, Płatność)
    const totalVisualSteps = 3;

    const steps = [
        { label: 'Email / Opcje', step: 0 },
        { label: 'Kwota / Regulamin', step: 1 },
        { label: 'Płatność', step: 2 },
    ];

    const stepLabels = useMemo(() => steps.map(s => s.label), []);

    const handleNext = useCallback(() => {
        setLocalError('');
        
        if (currentStep === 0) {
            // Walidacja Email/Opcje
            if (formData.createAccount && !formData.email) {
                setLocalError(useTranslation('errorEmailRequired'));
                return;
            }
            // Walidacja regex emaila tutaj... (pomijam dla UI)
            setCurrentStep(1);

        } else if (currentStep === 1) {
            // Walidacja Kwota/Regulamin
            if (formData.amount < 1) {
                 setLocalError(useTranslation('errorMinTipAmount', { minAmount: 1, currency: formData.currency }));
                 return;
            }
            if (!formData.termsAccepted) {
                 setLocalError(useTranslation('errorTermsNotAccepted'));
                 return;
            }
            // Zwykle tutaj następuje inicjalizacja Payment Intent (jak w JS prototype)
            // Ustawienie Processing na chwilę przed przejściem do kroku 2
            setIsProcessing(true);
            setTimeout(() => {
                setIsProcessing(false);
                setCurrentStep(2); // Przejście do kroku płatności
            }, 500);

        }
    }, [currentStep, formData]);

    const handlePrev = useCallback(() => {
        setLocalError('');
        setCurrentStep(prev => Math.max(0, prev - 1));
    }, []);

    const handleSubmit = useCallback(async () => {
        // Krok 2: Proces płatności
        if (currentStep === 2) {
            setIsProcessing(true);
            
            // Prawdziwa logika Stripe.confirmPayment()
            await new Promise(resolve => setTimeout(resolve, 2000)); 

            setIsProcessing(false);
            // Po sukcesie: ukrycie modala
            // hideModal();
        }
    }, [currentStep]);

    const handleClose = () => {
        setCurrentStep(0);
        setIsTermsVisible(false);
        setIsProcessing(false);
        setLocalError('');
        // Zresetowanie stanu i zamknięcie modala
    };

    return {
        currentStep,
        stepLabels,
        totalVisualSteps,
        isProcessing,
        isTermsVisible,
        formData,
        localError,
        setFormData,
        handleNext,
        handlePrev,
        handleSubmit,
        handleClose,
        setIsTermsVisible,
    };
};

// --- Komponent paska postępu ---

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
    stepLabels: string[];
}

const ProgressBar = memo<ProgressBarProps>(({ currentStep, totalSteps, stepLabels }) => {
    const progressWidth = ((currentStep + 1) / totalSteps) * 100;
    const accentColor = 'bg-pink-600';

    return (
        <div className="w-full mb-6 pt-4 px-6">
            <div className="flex justify-between relative mb-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                    <div key={index} className="flex flex-col items-center flex-1 z-10">
                        <div 
                            className={cn(
                                "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300",
                                index <= currentStep ? "bg-white text-black border-2 border-pink-600" : "bg-gray-700 text-gray-400 border-2 border-gray-700"
                            )}
                        >
                            {index + 1}
                        </div>
                        <span className={cn(
                            "text-xs mt-1 transition-colors duration-300",
                            index <= currentStep ? "text-pink-600 font-medium" : "text-gray-500"
                        )}>
                            {stepLabels[index]}
                        </span>
                    </div>
                ))}
            </div>
            
            <div className="h-1 bg-gray-700 rounded-full relative overflow-hidden">
                <div 
                    className={cn(
                        "h-full rounded-full transition-all duration-500 ease-in-out",
                        accentColor
                    )} 
                    style={{ width: `${progressWidth}%` }} 
                />
            </div>
        </div>
    );
});

ProgressBar.displayName = 'ProgressBar';

// --- Komponent kroku 0: Email/Opcje ---

interface Step0EmailProps {
    formData: ReturnType<typeof useTippingLogic>['formData'];
    setFormData: ReturnType<typeof useTippingLogic>['setFormData'];
}

const Step0Email = ({ formData, setFormData }: Step0EmailProps) => (
    <div className="space-y-6 px-6 py-4">
        <div className="flex items-center space-x-2">
            <Checkbox
                id="createAccount"
                checked={formData.createAccount}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, createAccount: Boolean(checked) }))}
                className="border-pink-600 data-[state=checked]:bg-pink-600 data-[state=checked]:text-white"
            />
            <Label htmlFor="createAccount" className="text-gray-300 cursor-pointer text-sm">
                {useTranslation('createAccountLabel')}
            </Label>
        </div>
        
        <div className={cn("transition-all duration-300", formData.createAccount ? 'visible opacity-100 h-auto' : 'invisible opacity-0 h-0 p-0 m-0')}>
            <Label htmlFor="email" className="text-gray-400 text-sm mb-1 block">Email</Label>
            <Input
                id="email"
                type="email"
                placeholder={useTranslation('emailPlaceholder')}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-600"
            />
        </div>
    </div>
);

// --- Komponent kroku 1: Kwota/Regulamin ---

const Step1Amount = ({ formData, setFormData }: Step0EmailProps) => {
    
    // Waluty z Prototype
    const availableCurrencies = ['EUR', 'PLN', 'USD', 'GBP'];

    return (
        <div className="space-y-6 px-6 py-4">
            <Label className="text-gray-400 text-sm mb-1 block">Kwota Napiwku</Label>
            <div className="flex gap-4">
                <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min={formData.currency === 'PLN' ? 5 : 1}
                    placeholder={useTranslation('amountPlaceholder')}
                    value={formData.amount || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, amount: parseFloat(e.target.value) || 0 }))}
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-pink-600"
                />
                <Select
                    value={formData.currency}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
                >
                    <SelectTrigger className="w-[100px] bg-gray-800 border-gray-700 text-white focus:ring-pink-600">
                        <SelectValue placeholder="PLN" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {availableCurrencies.map(c => (
                            <SelectItem key={c} value={c} className="hover:bg-gray-700">
                                {c}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex items-start space-x-2 pt-4">
                <Checkbox
                    id="termsAccepted"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: Boolean(checked) }))}
                    className="border-pink-600 data-[state=checked]:bg-pink-600 data-[state=checked]:text-white mt-1"
                />
                <Label htmlFor="termsAccepted" className="text-gray-300 cursor-pointer text-sm">
                    {useTranslation('termsLabel')} (
                    <span 
                        data-action="show-terms" 
                        className="text-pink-600 hover:text-pink-400 transition cursor-pointer"
                        // W prawdziwej implementacji: onClick={() => setIsTermsVisible(true)}
                    >
                        pokaż
                    </span>)
                </Label>
            </div>
        </div>
    );
};

// --- Komponent kroku 2: Płatność (Stripe) ---

interface Step2PaymentProps {
    formData: ReturnType<typeof useTippingLogic>['formData'];
    isProcessing: boolean;
}

const Step2Payment = ({ formData, isProcessing }: Step2PaymentProps) => (
    <div className="space-y-6 px-6 py-4">
        {/* Podsumowanie (z prototype JS) */}
        <p id="tippingSummaryAmount" className="text-lg font-semibold text-center text-pink-500 border-b border-gray-700 pb-2">
            {useTranslation('tippingSummaryLabel')} {(formData.amount || 0).toFixed(2)} {formData.currency.toUpperCase()}
        </p>

        <Label className="text-gray-400 text-sm mb-2 block">Dane do płatności</Label>
        
        {/* Placeholder dla Payment Element (później zastąpiony przez Stripe UI) */}
        <div id="payment-element" className={cn(
            "min-h-[150px] bg-gray-800 p-3 rounded-lg border-2 border-gray-700 flex items-center justify-center transition-all duration-300",
            !isProcessing && "opacity-100",
            isProcessing && "opacity-50" // Styl podczas przetwarzania
        )}>
            {isProcessing ? (
                <p className="text-pink-500 font-medium">{useTranslation('changingButtonText')}</p>
            ) : (
                <p className="text-gray-500">Stripe Payment Element (ładowanie formularza)</p>
            )}
        </div>

        {/* Możliwa wiadomość z płatności (z prototype JS) */}
        <div id="payment-message" className="text-red-500 text-sm" />
    </div>
);


// --- Główny komponent modala ---

export const TippingModal = () => {
    const { 
        currentStep, 
        stepLabels, 
        totalVisualSteps, 
        isProcessing, 
        isTermsVisible,
        formData, 
        localError,
        setFormData, 
        handleNext, 
        handlePrev, 
        handleSubmit, 
        handleClose,
        setIsTermsVisible
    } = useTippingLogic(); // Hook do zarządzania całą logiką

    // Tytuł w zależności od widoczności regulaminu
    const title = isTermsVisible ? useTranslation('tippingTermsTitle') : useTranslation('tippingTitle');

    const renderStepContent = () => {
        if (isTermsVisible) {
            // Krok 4: Regulamin (wyświetlany na wierzchu)
            return (
                <div className="px-6 py-4 h-[300px] overflow-y-auto text-gray-400 text-sm">
                    <p className="mb-4">To jest miejsce na szczegółowy regulamin dotyczący napiwków i płatności.</p>
                    <p className="mb-4">Zgodnie z prototypem, ta treść jest wyświetlana, gdy użytkownik kliknie "pokaż" obok checkboxa z akceptacją regulaminu.</p>
                    <p className="mb-4">W tej wersji na React, w przeciwieństwie do prototypu, używamy oddzielnego stanu `isTermsVisible` w celu uniknięcia komplikacji z przejściem kroków, a przyciski nawigacyjne są ukrywane (jak w prototypie).</p>
                    {/* Wstaw tu rzeczywisty tekst regulaminu */}
                </div>
            );
        }

        switch (currentStep) {
            case 0:
                return <Step0Email formData={formData} setFormData={setFormData} />;
            case 1:
                return <Step1Amount formData={formData} setFormData={setFormData} />;
            case 2:
                return <Step2Payment formData={formData} isProcessing={isProcessing} />;
            case 3:
                // Zgodnie z prototypem, krok 3 to Processing/Success
                return (
                    <div className="text-center p-8">
                        <svg className="mx-auto w-16 h-16 text-pink-600 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"></circle>
                            <path fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" className="opacity-75"></path>
                        </svg>
                        <h3 className="mt-4 text-xl font-semibold text-white">{useTranslation('changingButtonText')}</h3>
                        <p className="mt-2 text-gray-400">Proszę nie zamykać okna...</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Dialog open={true} onOpenChange={handleClose}>
            <DialogContent 
                className={cn(
                    // Ograniczona szerokość (nie na całą szerokość, max-w-lg to dobry kompromis)
                    "max-w-lg w-full bg-gray-900 text-white p-0 border-gray-700",
                    isTermsVisible ? "max-w-xl" : "max-w-md"
                )}
                // Obsługa zamknięcia na Esc lub kliknięcie poza modalem
            >
                {/* Header z tytułem i przyciskiem zamknięcia */}
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="text-center text-2xl font-bold text-white relative">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {/* Pasek postępu (ukryty dla widoku Regulaminu/Przetwarzania) */}
                {!isTermsVisible && currentStep < 3 && (
                    <ProgressBar 
                        currentStep={currentStep} 
                        totalSteps={totalVisualSteps} 
                        stepLabels={stepLabels}
                    />
                )}
                
                {/* Treść kroku */}
                <div className="flex-1 min-h-[250px] overflow-y-auto">
                    {renderStepContent()}
                </div>

                {/* Stopka z przyciskami nawigacyjnymi i błędami (ukryta dla Regulaminu/Przetwarzania) */}
                {!isTermsVisible && currentStep < 3 && (
                    <div className="px-6 py-4 border-t border-gray-800">
                        {localError && (
                            <p className="text-red-400 text-sm mb-4 text-center">{localError}</p>
                        )}
                        
                        <div className="flex justify-between items-center gap-4">
                            {/* Przycisk Wstecz (ukryty w pierwszym kroku) */}
                            {currentStep > 0 && (
                                <Button
                                    variant="outline"
                                    onClick={handlePrev}
                                    className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                                    disabled={isProcessing}
                                >
                                    &larr; Wstecz
                                </Button>
                            )}

                            {/* Przycisk Dalej / Płacę */}
                            {currentStep < 2 ? (
                                <Button
                                    onClick={handleNext}
                                    disabled={isProcessing}
                                    className={cn(
                                        "w-full bg-pink-600 text-white font-bold hover:bg-pink-700 transition duration-150",
                                        currentStep > 0 && "ml-auto" // Wyrównanie do prawej w kroku 1
                                    )}
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center">
                                            <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                            {useTranslation('changingButtonText')}
                                        </div>
                                    ) : (
                                        useTranslation('tippingNext')
                                    )}
                                </Button>
                            ) : (
                                <Button
                                    onClick={handleSubmit}
                                    disabled={isProcessing}
                                    className="w-full bg-pink-600 text-white font-bold hover:bg-pink-700 transition duration-150"
                                >
                                    {isProcessing ? (
                                        <div className="flex items-center">
                                            <span className="animate-spin mr-2 border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>
                                            {useTranslation('changingButtonText')}
                                        </div>
                                    ) : (
                                        useTranslation('tippingPay')
                                    )}
                                </Button>
                            )}
                        </div>
                    </div>
                )}
                
                {/* Stopka dla widoku Regulaminu (z przyciskiem Powrót) */}
                {isTermsVisible && (
                    <div className="px-6 py-4 border-t border-gray-800 flex justify-end">
                        <Button
                            onClick={() => setIsTermsVisible(false)}
                            variant="outline"
                            className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700"
                        >
                            &larr; Powrót do Płatności
                        </Button>
                    </div>
                )}

            </DialogContent>
        </Dialog>
    );
};
