import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, CheckCircle2, Mail, Phone, Globe, User, Building2, Sparkles, ShieldCheck, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';
import { AuditResults } from './AuditResults';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Question {
  id: number;
  block: string;
  text: string;
  type: 'select' | 'multi-select' | 'open';
  options?: string[];
}

const auditBlocks = [
  "BLOK 1 – Kontext firmy",
  "BLOK 2 – Strategie náboru",
  "BLOK 3 – Organizace náboru",
  "BLOK 4 – Proces výběru",
  "BLOK 5 – Výsledky náboru",
  "BLOK 6 – Technologie",
  "BLOK 7 – Strategická otázka",
  "BLOK 8 – Kvalifikace leadu"
];

const auditQuestions: Question[] = [
  // BLOK 1
  { id: 1, block: auditBlocks[0], text: "Kolik zaměstnanců má vaše firma aktuálně?", type: 'select', options: ["1–5", "6–10", "11–25", "26–50", "více než 50"] },
  { id: 2, block: auditBlocks[0], text: "Kdo ve vaší firmě nese hlavní odpovědnost za nábor zaměstnanců?", type: 'select', options: ["majitel firmy", "manažer oddělení", "HR specialista", "administrativní pracovník", "externí agentura"] },
  { id: 3, block: auditBlocks[0], text: "Jak často vaše firma potřebuje obsazovat nové pracovní pozice?", type: 'select', options: ["několikrát ročně", "přibližně jednou za měsíc", "několikrát měsíčně", "průběžně"] },
  // BLOK 2
  { id: 4, block: auditBlocks[1], text: "Jakým způsobem vaše firma obvykle hledá nové zaměstnance?", type: 'multi-select', options: ["pracovní portály", "sociální sítě", "doporučení zaměstnanců", "personální agentury", "vlastní databáze kandidátů"] },
  { id: 5, block: auditBlocks[1], text: "Jak byste popsal současný náborový proces ve vaší firmě?", type: 'select', options: ["máme jasně definovaný proces", "proces existuje, ale není vždy dodržován", "nábor řešíme individuálně podle situace", "proces není definovaný"] },
  { id: 6, block: auditBlocks[1], text: "Jak dlouho obvykle trvá obsadit novou pozici od prvního zveřejnění inzerátu po přijetí kandidáta?", type: 'select', options: ["méně než 1 týden", "1–2 týdny", "2–4 týdny", "více než měsíc"] },
  // BLOK 3
  { id: 7, block: auditBlocks[2], text: "Jak evidujete kandidáty během náborového procesu?", type: 'select', options: ["HR systém", "tabulka / Excel", "emailová komunikace", "jiný způsob"] },
  { id: 8, block: auditBlocks[2], text: "Kolik lidí je obvykle zapojeno do rozhodování o přijetí kandidáta?", type: 'select', options: ["1 osoba", "2 osoby", "3–4 osoby", "více než 4 osoby"] },
  { id: 9, block: auditBlocks[2], text: "Kolik času týdně přibližně věnujete náboru zaměstnanců?", type: 'select', options: ["méně než 2 hodiny", "2–5 hodin", "5–10 hodin", "více než 10 hodin"] },
  // BLOK 4
  { id: 10, block: auditBlocks[3], text: "Kolik kroků obvykle kandidát absolvuje během výběrového řízení?", type: 'select', options: ["1 krok", "2 kroky", "3 kroky", "více než 3 kroky"] },
  { id: 11, block: auditBlocks[3], text: "Jakým způsobem probíhá první kontakt s kandidátem?", type: 'select', options: ["telefonicky", "email", "online pohovor", "osobní schůzka"] },
  { id: 12, block: auditBlocks[3], text: "Jak dlouho obvykle trvá rozhodnutí o přijetí kandidáta po prvním pohovoru?", type: 'select', options: ["do 24 hodin", "1–3 dny", "do týdne", "déle"] },
  // BLOK 5
  { id: 13, block: auditBlocks[4], text: "Jak často se stane, že je nutné obsazovat stejnou pozici znovu během krátké doby?", type: 'select', options: ["téměř nikdy", "občas", "poměrně často", "velmi často"] },
  { id: 14, block: auditBlocks[4], text: "Kolik nových zaměstnanců odejde během prvních 3 měsíců (zkušební doba)?", type: 'select', options: ["0–5 %", "6–15 %", "16–30 %", "více než 30 %"] },
  { id: 15, block: auditBlocks[4], text: "Znáte přesnou cenu za jeden nábor (Cost per Hire) včetně času manažerů?", type: 'select', options: ["ano, přesně", "máme hrubý odhad", "nevíme/nesledujeme"] },
  // BLOK 6
  { id: 16, block: auditBlocks[5], text: "Používáte při náboru nějaké nástroje nebo software (ATS)?", type: 'select', options: ["moderní ATS (Teamio, Recruitee atd.)", "vlastní interní systém", "pouze Excel / Tabulky", "nepoužíváme nic specialized"] },
  { id: 17, block: auditBlocks[5], text: "Jak velká část komunikace s kandidáty probíhá aktivně přes AI nebo automatizaci?", type: 'select', options: ["více než 50 %", "částečně (šablony)", "minimálně", "vše píšeme manuálně"] },
  { id: 18, block: auditBlocks[5], text: "Jakým způsobem pracujete s nezískanými kandidáty (Talent Pool)?", type: 'select', options: ["máme databázi a pravidelně je oslovujeme", "máme databázi, ale nevyužíváme ji", "databázi nemáme"] },
  // BLOK 7
  { id: 19, block: auditBlocks[6], text: "Jak dlouho průměrně trvá plný 'Onboarding' (zaškolení) nového kolegy?", type: 'select', options: ["do 1 týdne", "2–4 týdny", "1–3 měsíce", "déle než 3 měsíce"] },
  { id: 20, block: auditBlocks[6], text: "Měříte zpětnou vazbu od kandidátů na váš náborový proces?", type: 'select', options: ["ano, systematicky", "pouze náhodně", "neměříme"] },
  { id: 21, block: auditBlocks[6], text: "Jaký je podle vás největší strategický limit vašeho náboru?", type: 'open' },
  // BLOK 8
  { id: 22, block: auditBlocks[7], text: "Plánujete v nejbližších 6 měsících navyšovat počet zaměstnanců?", type: 'select', options: ["o více než 20 %", "o 5–20 %", "budeme spíše stabilizovat", "budeme snižovat stavy"] },
  { id: 23, block: auditBlocks[7], text: "Jak důležité je pro vaši firmu zrychlit nebo zefektivnit nábor pomocí AI?", type: 'select', options: ["kritická priorita", "střední důležitost", "řešíme jiné priority", "vůbec"] },
  { id: 24, block: auditBlocks[7], text: "Jste osoba s rozhodovací pravomocí pro investice do HR technologií?", type: 'select', options: ["ano", "částečně", "ne, jsem koncový uživatel"] },
];

export const AuditModal = ({ isOpen, onClose }: AuditModalProps) => {
  const [step, setStep] = useState(-1); // -1 for introductory info
  const [answers, setAnswers] = useState<Record<number, string | string[]>>({});
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showContactStep, setShowContactStep] = useState<'email' | 'phone' | null>(null);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = step >= 0 ? auditQuestions[step] : null;
  const totalSteps = auditQuestions.length;
  const progress = step === -1 ? 0 : ((step + 1) / totalSteps) * 100;

  const handleBack = () => {
    if (showContactStep === 'phone') {
      setShowContactStep('email');
    } else if (showContactStep === 'email') {
      setShowContactStep(null);
      setStep(prev => prev - 1);
    } else if (step > -1) {
      setStep(prev => prev - 1);
    }
  };

  const submitAudit = async (_finalAnswers: Record<number, string | string[]>) => {
    // The audit engine is not connected. Nothing is transmitted and no report
    // is generated - the user is shown a service error instead.
    setIsSubmitting(false);
    setError('Nepodařilo se navázat spojení s AI enginem. Diagnostika je dočasně nedostupná, zkuste to prosím později.');
  };

  const handleNext = (currentAnswers = answers) => {
    if (step === 2 && !email && showContactStep !== 'email') {
      setShowContactStep('email');
      return;
    }
    if (step === 6 && !phone && showContactStep !== 'phone') {
      setShowContactStep('phone');
      return;
    }

    if (step < totalSteps - 1) {
      setStep(step + 1);
      setShowContactStep(null);
    } else {
      submitAudit(currentAnswers);
    }
  };

  const handleOptionSelect = (option: string) => {
    const isMulti = currentQuestion?.type === 'multi-select';
    let newAnswer: string | string[];

    if (isMulti) {
      const currentAnswers = (answers[currentQuestion!.id] as string[]) || [];
      newAnswer = currentAnswers.includes(option)
        ? currentAnswers.filter(a => a !== option)
        : [...currentAnswers, option];
    } else {
      newAnswer = option;
    }

    const newAnswers = { ...answers, [currentQuestion!.id]: newAnswer };
    setAnswers(newAnswers);
    
    if (!isMulti) {
      handleNext(newAnswers);
    }
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyName && name && website) {
      setStep(0);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNext();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-xl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className={cn(
          "relative w-full bg-primary border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700",
          isFinished ? "max-w-7xl h-[95vh]" : "max-w-2xl"
        )}
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />


        {/* Close & Back Buttons */}
        <div className="absolute top-8 right-8 z-50 flex items-center gap-3">
          {(step > -1 || showContactStep) && (
            <button 
              onClick={handleBack}
              className="p-2.5 text-slate-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10"
              title="Zpět"
            >
              <ChevronRight size={20} className="rotate-180" />
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-2.5 text-slate-400 hover:text-white transition-all bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full border border-white/10"
          >
            <X size={20} />
          </button>
        </div>

        {!isFinished ? (
          <div className="p-10 md:p-14 overflow-y-auto max-h-[90vh] custom-scrollbar relative z-10">
            {step === -1 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-[10px] uppercase tracking-widest">
                      <Sparkles size={14} />
                      <span>Strategická AI Inteligence</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight leading-loose">
                      Hloubkový <span className="text-gradient">HR AUDIT</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      <FeatureItem text="Finanční ROI Analýza" />
                      <FeatureItem text="Audit Manuálních Ztrát" />
                      <FeatureItem text="Digitalizační Roadmapa" />
                      <FeatureItem text="Market Benchmark" />
                    </div>
                    <p className="text-lg text-slate-400 font-medium">
                      Profesionální diagnostika v tržní hodnotě <span className="text-gold font-bold">49 000 Kč</span> doručena okamžitě.
                    </p>
                  </div>
                  
                  <form onSubmit={handleInitialSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <div className="group relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors">
                          <User size={20} />
                        </div>
                        <input 
                          type="text" required placeholder="Vaše jméno a příjmení"
                          value={name} onChange={(e) => setName(e.target.value)}
                          className="w-full pl-12 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-white placeholder:text-slate-600 transition-all font-medium"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="group relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors">
                            <Building2 size={20} />
                          </div>
                          <input 
                            type="text" required placeholder="Firma"
                            value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full pl-12 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-white placeholder:text-slate-600 transition-all font-medium"
                          />
                        </div>
                        <div className="group relative">
                          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent transition-colors">
                            <Globe size={20} />
                          </div>
                          <input 
                            type="text" required placeholder="Web (firma.cz)"
                            value={website} onChange={(e) => setWebsite(e.target.value)}
                            className="w-full pl-12 pr-5 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-white placeholder:text-slate-600 transition-all font-medium"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-col gap-4">
                      <button 
                        type="submit"
                        className="w-full py-6 bg-accent text-white font-black text-xl rounded-2xl hover:glow-accent hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:scale-95 shadow-[0_20px_40px_rgba(99,102,241,0.3)]"
                      >
                        Spustit hloubkovou diagnostiku
                        <ChevronRight size={24} />
                      </button>
                    

                  </div>
                </form>
              </motion.div>
            ) : showContactStep === 'email' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                    <Mail size={32} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white leading-tight">Kam vám máme poslat průběžný report?</h2>
                  <p className="text-slate-400 font-medium">Analyzovali jsme úvodní blok. Zadejte e-mail pro bezpečné uložení postupu a zaslání PDF.</p>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="relative group">
                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent" size={24} />
                    <input 
                      type="email" required placeholder="vas.email@firma.cz"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-14 pr-6 py-6 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-white text-xl transition-all font-medium"
                    />
                  </div>
                  <button className="w-full py-6 bg-accent text-primary font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:glow-accent transition-all active:scale-95">
                    Pokračovat v auditu
                    <ChevronRight size={24} />
                  </button>
                </form>
              </motion.div>
            ) : showContactStep === 'phone' ? (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="space-y-3">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6">
                    <Phone size={32} />
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white leading-tight">Na jakém telefonním čísle vás můžeme kontaktovat?</h2>
                  <p className="text-slate-400 font-medium">Zadejte telefon pro bezpečné odeslání výsledků a možnost následné konzultace s naším HR expertem.</p>
                </div>
                <form onSubmit={handleContactSubmit} className="space-y-5">
                  <div className="relative group">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-accent" size={24} />
                    <input 
                      type="tel" required placeholder="+420 XXX XXX XXX"
                      value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-14 pr-6 py-6 bg-white/5 border border-white/10 rounded-2xl focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-white text-xl transition-all font-medium"
                    />
                  </div>
                  <button className="w-full py-6 bg-accent text-primary font-black text-xl rounded-2xl flex items-center justify-center gap-3 hover:glow-accent transition-all active:scale-95">
                    Pokračovat v auditu
                    <CheckCircle2 size={24} />
                  </button>
                </form>
              </motion.div>
            ) : isSubmitting ? (
              <div className="py-24 flex flex-col items-center justify-center space-y-8">
                <div className="relative">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border-4 border-white/5 border-t-accent rounded-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="text-accent animate-pulse" size={40} />
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-3xl font-display font-black text-white">AI generuje váš report...</h3>
                  <p className="text-slate-400 max-w-sm mx-auto">Právě porovnáváme data {companyName} s anonymním benchmarkem trhu.</p>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-14">
                  <div className="flex justify-between items-end mb-4">
                    <div className="space-y-2">
                      <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-accent font-black text-[10px] uppercase tracking-[0.2em] rounded-md">
                        {currentQuestion?.block}
                      </span>
                      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Postup: {step + 1} / {totalSteps}</h3>
                    </div>
                    <span className="text-2xl font-black text-white font-display">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(45,212,191,0.5)]"
                    />
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    className="space-y-10"
                  >
                    <h2 className="text-3xl md:text-4xl font-display font-black text-white leading-tight">
                      {currentQuestion?.text}
                    </h2>
                    
                    {currentQuestion?.type === 'open' ? (
                      <div className="space-y-6">
                        <textarea 
                          className="w-full p-8 bg-white/5 border border-white/10 rounded-[2rem] h-56 focus:border-accent/50 focus:ring-4 focus:ring-accent/10 outline-none text-xl text-white placeholder:text-slate-700 resize-none transition-all"
                          placeholder="Zde popište hlavní bariéru vašeho náboru..."
                          value={answers[currentQuestion.id] as string || ''}
                          onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                        />
                          <button 
                            onClick={handleNext}
                            className="w-full py-6 bg-accent text-primary font-black rounded-2xl text-xl hover:glow-accent transition-all flex items-center justify-center gap-3"
                          >
                            Další krok
                            <ChevronRight size={24} />
                          </button>
                      </div>
                    ) : (
                      <div className="grid gap-4">
                        {currentQuestion?.options?.map((option, idx) => {
                          const isSelected = currentQuestion.type === 'multi-select' 
                            ? (answers[currentQuestion.id] as string[])?.includes(option)
                            : answers[currentQuestion.id] === option;
                          
                          return (
                            <button
                              key={idx}
                              onClick={() => handleOptionSelect(option)}
                              className={cn(
                                "w-full p-6 text-left rounded-2xl border-2 transition-all flex justify-between items-center group relative overflow-hidden",
                                isSelected 
                                  ? "border-accent bg-accent/10 shadow-[0_0_20px_rgba(45,212,191,0.15)]" 
                                  : "border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.08]"
                              )}
                            >
                              <div className="relative z-10 flex items-center gap-4">
                                {currentQuestion.type === 'multi-select' && (
                                  <div className={cn(
                                    "w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all",
                                    isSelected ? "bg-accent border-accent" : "border-slate-600 group-hover:border-slate-400"
                                  )}>
                                    {isSelected && <CheckCircle2 size={16} className="text-primary" />}
                                  </div>
                                )}
                                <span className={cn(
                                  "font-bold text-xl",
                                  isSelected ? "text-white" : "text-slate-400 group-hover:text-slate-200"
                                )}>
                                  {option}
                                </span>
                              </div>
                              <div className="relative z-10">
                                {!isSelected && <ChevronRight size={20} className="text-slate-600 group-hover:text-accent group-hover:translate-x-1 transition-all" />}
                                {isSelected && currentQuestion.type === 'select' && <CheckCircle2 size={24} className="text-accent" />}
                              </div>
                            </button>
                          );
                        })}
                        {currentQuestion?.type === 'multi-select' && (
                          <button 
                            onClick={handleNext}
                            className="mt-6 w-full py-6 bg-accent text-primary font-black rounded-2xl text-xl group flex items-center justify-center gap-3 hover:glow-accent transition-all"
                          >
                            Potvrdit a pokračovat
                            <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                        )}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </>
            )}
          </div>
        ) : (
          <div className="h-full overflow-y-auto custom-scrollbar">
            <AuditResults 
              answers={answers}
              companyName={companyName}
            />
          </div>
        )}
      </motion.div>
    </div>
  );
};

const FeatureItem = ({ text }: { text: string }) => (
  <div className="flex items-center gap-2 text-slate-300 font-medium bg-white/5 border border-white/10 px-3 py-2 rounded-xl text-xs">
    <CheckCircle2 size={14} className="text-accent" />
    {text}
  </div>
);
