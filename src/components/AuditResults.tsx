import React, { useMemo, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Zap, 
  DollarSign, 
  Users, 
  Clock, 
  Target,
  BarChart3,
  FileText,
  Sparkles,
  TrendingUp,
  BrainCircuit,
  ShieldCheck,
  LayoutDashboard,
  LineChart,
  Navigation,
  ChevronRight,
  Info,
  Calendar,
  Lock,
  Download
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Funnel,
  FunnelChart,
  LabelList,
  Cell,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { cn } from '../lib/utils';

interface AuditResultsProps {
  answers: Record<number, string | string[]>;
  companyName: string;
}

const CountUp = ({ end, duration = 2000, suffix = "" }: { end: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [end, duration]);
  return <>{count.toLocaleString()}{suffix}</>;
};

export const AuditResults = ({ answers, companyName }: AuditResultsProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const calculations = useMemo(() => {
    // 1. Inputs Parsing
    const empCountStr = answers[1]?.toString() || "0";
    const empCount = empCountStr.includes("50") ? 75 : empCountStr.includes("26") ? 40 : empCountStr.includes("11") ? 20 : empCountStr.includes("6") ? 8 : 3;
    
    // Check for existing tools to avoid nonsense savings
    const hasATS = answers[16]?.toString().includes("moderní") || answers[16]?.toString().includes("interní");
    const hasAIComm = answers[17]?.toString().includes("50") || answers[17]?.toString().includes("částečně");
    const hasTalentPool = answers[18]?.toString().includes("oslovujeme");
    const hasFastProcess = answers[6]?.toString().includes("týden") || answers[6]?.toString().includes("1–2");

    // Benchmark savings for similar sized companies (Market Data)
    const benchmarkMonthlySaving = Math.round(empCount * 1200 + 15000); // Realistic market benchmark
    
    // Efficiency Score (0-100) - Much more robust mapping
    let score = 50;
    
    // Strategy (answers[5])
    if (answers[5]?.toString().includes("jasně definovaný")) score += 25;
    else if (answers[5]?.toString().includes("existuje")) score += 10;
    
    // Technology (answers[16])
    if (hasATS) score += 15;
    
    // Communication (answers[17] & answers[12])
    if (hasAIComm) score += 10;
    if (answers[12]?.toString().includes("24 hodin")) score += 10;
    else if (answers[12]?.toString().includes("1–3 dny")) score += 5;

    // Talent Pool (answers[18])
    if (hasTalentPool) score += 15;
    
    // Constraints
    if (answers[14]?.toString().includes("30") || answers[14]?.toString().includes("16")) score -= 15;

    return {
      score: Math.min(Math.max(score, 15), 98),
      benchmarkMonthlySaving,
      hasATS,
      hasAIComm,
      hasTalentPool,
      hasFastProcess,
      empCount
    };
  }, [answers]);

  const chapters = [
    { title: "Exekutivní shrnutí", icon: LayoutDashboard },
    { title: "Tržní srovnání úspor", icon: BarChart3 },
    { title: "Analýza rizik (Radar)", icon: Target },
    { title: "Procesní trychtýř", icon: Zap },
    { title: "Roadmapa rozvoje", icon: Navigation },
  ];

  const radarData = [
    { subject: 'Technologie', A: calculations.hasATS ? 95 : 35, fullMark: 100 },
    { subject: 'Komunikace', A: (answers[12]?.toString().includes("24 hodin") || answers[17]?.toString().includes("AI")) ? 92 : 45, fullMark: 100 },
    { subject: 'Candidate Exp.', A: (answers[20] === "ano" || answers[12]?.toString().includes("24 hodin")) ? 90 : 30, fullMark: 100 },
    { subject: 'Onboarding', A: answers[19]?.toString().includes("týdne") ? 95 : 55, fullMark: 100 },
    { subject: 'Strategie', A: answers[5]?.toString().includes("jasně definovaný") ? 98 : 40, fullMark: 100 },
    { subject: 'Rychlost', A: calculations.hasFastProcess ? 100 : 40, fullMark: 100 },
  ];

  const funnelData = [
    { name: 'Oslovení', value: 1000, fill: '#2dd4bf' },
    { name: 'Zájemci', value: 300, fill: '#0ea5e9' },
    { name: 'Pohovory', value: 80, fill: '#8b5cf6' },
    { name: 'Nabídky', value: 15, fill: '#f43f5e' },
    { name: 'Nástupy', value: 10, fill: '#eab308' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[90vh] flex flex-col items-center justify-center p-8 text-center bg-primary overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
          <motion.div 
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 3, ease: "linear" }}
            className="w-full h-full bg-accent glow-accent"
          />
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12 max-w-lg">
          <div className="relative">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="w-56 h-56 border-[2px] border-white/5 border-t-accent rounded-full mx-auto" />
            <div className="absolute inset-0 flex items-center justify-center">
              <BrainCircuit className="text-accent animate-pulse" size={70} />
            </div>
            <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full animate-pulse" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-display font-black text-white">Validace strategických dat</h2>
            <div className="flex flex-col gap-2">
              <LoadingStep delay={0} text="Analýza tržních benchmarků pro {companyName}..." />
              <LoadingStep delay={0.8} text="Porovnání efektivity procesů..." />
              <LoadingStep delay={1.5} text="Výpočet potenciálu automatizace..." />
              <LoadingStep delay={2.2} text="Generování expertní roadmapy..." />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-[95vh] bg-[#0A0F1C] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl">
      <aside className="w-80 border-r border-white/10 bg-primary p-8 flex flex-col justify-between hidden md:flex no-print">
        <div className="space-y-10">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Team Octopus" className="w-10 h-10 object-contain rounded-xl" />
            <div>
              <div className="text-[10px] font-black text-accent uppercase tracking-[0.2em] leading-none mb-1">Strategický Audit</div>
              <div className="text-lg font-display font-black text-white leading-none uppercase tracking-tighter">Octopus AI</div>
            </div>
          </div>

          <nav className="space-y-2">
            {chapters.map((ch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveChapter(idx)}
                className={cn(
                  "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group text-left",
                  activeChapter === idx 
                    ? "bg-accent/10 border border-accent/20 text-white" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                )}
              >
                <ch.icon size={20} className={activeChapter === idx ? "text-accent" : "text-slate-600 group-hover:text-slate-400"} />
                <span className="font-bold text-sm tracking-tight">{ch.title}</span>
                {activeChapter === idx && <ChevronRight size={16} className="ml-auto text-accent" />}
              </button>
            ))}
          </nav>
        </div>

        <div className="space-y-6">
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex items-center gap-2 text-highlight text-xs font-black uppercase tracking-wider mb-2">
              <ShieldCheck size={14} />
              Důvěrný report
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
              Tento report je určen výhradně pro management firmy {companyName} a obsahuje strategická data.
            </p>
          </div>
          <button 
            onClick={() => window.print()}
            className="w-full py-4 bg-white text-primary font-black rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/5"
          >
            <Download size={18} />
            Stáhnout PDF
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#0D121F] relative">
        <header className="sticky top-0 z-30 flex items-center justify-between px-10 py-6 bg-[#0D121F]/80 backdrop-blur-xl border-b border-white/5 no-print">
          <div className="flex items-center gap-4">
            <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
              <Calendar size={14} className="text-accent" />
              <span className="text-xs font-bold text-slate-400">{new Date().toLocaleDateString('cs-CZ')}</span>
            </div>
            <div className="px-3 py-1 bg-gradient-to-r from-highlight/20 to-accent/20 rounded-lg border border-white/10 flex items-center gap-2">
              <Sparkles size={14} className="text-white animate-pulse" />
              <span className="text-xs font-black text-white uppercase tracking-widest">AI Audit Pro</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs font-bold text-slate-500">Subjekt:</div>
              <div className="text-sm font-black text-white">{companyName}</div>
            </div>
          </div>
        </header>

        <div className="p-10 max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-12"
            >
              {activeChapter === 0 && <ChapterExecutiveSummary calculations={calculations} companyName={companyName} answers={answers} />}
              {activeChapter === 1 && <ChapterMarketSavings calculations={calculations} answers={answers} />}
              {activeChapter === 2 && <ChapterBenchmarking radarData={radarData} calculations={calculations} answers={answers} />}
              {activeChapter === 3 && <ChapterProcessAnalysis answers={answers} funnelData={funnelData} calculations={calculations} />}
              {activeChapter === 4 && <ChapterRoadmap calculations={calculations} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

const ChapterExecutiveSummary = ({ calculations, companyName }: any) => (
  <div className="space-y-12">
    <div className="flex flex-col md:flex-row gap-12 items-center">
      <div className="relative group">
        <svg className="w-72 h-72 -rotate-90">
          <circle cx="144" cy="144" r="125" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
          <motion.circle 
            initial={{ strokeDashoffset: 785 }}
            animate={{ strokeDashoffset: 785 - (785 * calculations.score / 100) }}
            transition={{ duration: 2, ease: "easeOut" }}
            cx="144" cy="144" r="125" fill="none" stroke="#6366F1" strokeWidth="12"
            strokeDasharray="785" strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-8xl font-display font-black text-white leading-none">
            <CountUp end={calculations.score} />
          </span>
          <span className="text-accent font-black tracking-[0.2em] uppercase text-sm mt-3">Skóre Vyspělosti</span>
        </div>
      </div>

      <div className="flex-1 space-y-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-display font-black text-white leading-tight">Analýza náborového ecosystemu {companyName}</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-accent to-highlight rounded-full" />
        </div>
        <p className="text-xl text-slate-400 font-medium leading-relaxed">
          Váš náborový proces vykazuje úroveň vyspělosti <span className="text-white font-bold">{calculations.score}%</span>. 
          {calculations.score > 85 
            ? " Patříte mezi technologické lídry, kteří efektivně kombinují automatizaci s lidským přístupem." 
            : calculations.score > 60 
            ? " Máte solidní základy, ale stále existují oblasti, kde manuální práce brzdí váš růst." 
            : " Současný proces je postaven na manuální bázi, což zvyšuje riziko chyb a zpomaluje obsazování klíčových pozic."}
        </p>
        <div className="grid grid-cols-2 gap-4">
          <SummaryPoint 
            icon={Target} 
            title="Silná stránka" 
            text={calculations.score > 80 ? "Digitální infrastruktura" : "Osobní přístup"} 
          />
          <SummaryPoint 
            icon={TrendingUp} 
            title="Potenciál" 
            text={calculations.hasAIComm ? "Škálování procesů" : "AI Automatizace"} 
          />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <InfoBox 
        title="Vliv na Business" 
        text={calculations.score > 85 ? "Váš proces je vysoce škálovatelný a připravený na masivní růst bez navyšování administrativy." : "Aktuální administrativní zátěž může při rychlém růstu způsobit kolaps náborové pipeline."} 
        color="border-accent/30" 
      />
      <InfoBox 
        title="Tržní Pozice" 
        text={calculations.score > 85 ? "Svými parametry překonáváte 90 % firem v segmentu." : "Pohybujete se v tržním průměru, což v boji o top talenty nemusí stačit."} 
        color="border-highlight/30" 
      />
      <InfoBox 
        title="Strategický Výhled" 
        text={calculations.hasAIComm ? "Zaměřte se na prediktivní analytiku a predikci fluktuace." : "Prioritou je sjednocení dat a odstranění manuálního screeningu."} 
        color="border-white/10" 
      />
    </div>
  </div>
);

const ChapterMarketSavings = ({ calculations }: any) => (
  <div className="space-y-10">
    <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-12 relative overflow-hidden text-center">
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
        <h3 className="text-3xl font-display font-black text-white">Tržní potenciál úspor skrze automatizaci</h3>
        <p className="text-slate-400 text-lg font-medium leading-relaxed">
          Firmy o velikosti <span className="text-white font-bold">{calculations.empCount} zaměstnanců</span>, které přecházejí na plnou AI automatizaci náboru, realizují v průměru:
        </p>
        <div className="text-8xl font-display font-black text-highlight tracking-tighter drop-shadow-[0_0_30px_rgba(20,184,166,0.3)]">
          <CountUp end={calculations.benchmarkMonthlySaving} suffix=" Kč" />
        </div>
        <div className="text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Měsíční úspora na provozních nákladech</div>

        <div className="mt-12 p-10 bg-white/5 border border-white/10 rounded-[2.5rem] text-left space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center text-accent">
              <Sparkles size={20} />
            </div>
            <h4 className="text-xl font-bold text-white">Stav vašeho ekosystému:</h4>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <StatusBadge active={calculations.hasATS} text="Moderní ATS / Systém" />
            <StatusBadge active={calculations.hasAIComm} text="AI Komunikace" />
            <StatusBadge active={calculations.hasTalentPool} text="Aktivní Talent Pool" />
            <StatusBadge active={calculations.hasFastProcess} text="Rychlá zpětná vazba" />
          </div>
          
          <p className="text-sm text-slate-400 italic pt-4">
            {calculations.score > 85 
              ? "Vzhledem k vaší vysoké míře digitalizace již většinu těchto úspor realizujete. Váš systém je nastaven efektivně." 
              : "Identifikovali jsme oblasti, kde manuální práce stále tvoří zbytečné výdaje. Tyto úspory jsou pro vás přímo dosažitelné."}
          </p>
        </div>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ active, text }: { active: boolean, text: string }) => (
  <div className={cn("flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all", active ? "bg-accent/10 border-accent/20 text-white" : "bg-white/5 border-white/5 text-slate-500")}>
    <div className={cn("w-2.5 h-2.5 rounded-full", active ? "bg-accent glow-accent" : "bg-slate-700")} />
    <span className="text-sm font-bold tracking-tight">{text}</span>
    {active && <span className="ml-auto text-[10px] font-black uppercase text-accent">Aktivní</span>}
  </div>
);

const ChapterProcessAnalysis = ({ funnelData, calculations }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="md:col-span-2 p-10 bg-white/5 border border-white/10 rounded-3xl space-y-8">
      <div className="flex justify-between items-center px-4">
        <h3 className="text-2xl font-display font-black text-white">Náborový trychtýř (Model)</h3>
        <span className="text-xs font-bold text-accent px-3 py-1 bg-accent/10 rounded-full">
          Průchodnost: {calculations.score}%
        </span>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <FunnelChart>
            <Funnel data={funnelData} dataKey="value" isAnimationActive>
              <LabelList position="right" fill="#94a3b8" stroke="none" dataKey="name" />
            </Funnel>
          </FunnelChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="space-y-6">
      <AnalyticCard 
        title="Technologický Dluh" 
        value={calculations.hasATS ? "Nízký" : "Kritický"} 
        desc={calculations.hasATS ? "Vaše investice do systému se vrací v přehlednosti dat a rychlosti procesu." : "Absence specializovaného systému vede k roztříštěným datům a ztrátě talentů."} 
      />
      <AnalyticCard 
        title="Odezva Trhu" 
        value={calculations.hasAIComm ? "Blesková" : "Standardní"} 
        desc={calculations.hasAIComm ? "Kandidáti dostávají zpětnou vazbu v reálném čase, což dramaticky zvyšuje konverzi." : "Manuální komunikace vytváří prodlevy, které mohou vést k odchodu kandidátů ke konkurenci."} 
      />
    </div>
  </div>
);

const ChapterBenchmarking = ({ radarData, calculations }: any) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
    <div className="md:col-span-2 p-10 bg-white/5 border border-white/10 rounded-[3rem] relative">
      <h3 className="text-2xl font-display font-black text-white mb-8 text-center uppercase tracking-widest">Radar Rizik a Příležitostí</h3>
      <div className="h-[450px]">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
            <Radar name="Status Quo" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.4} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
    <div className="space-y-8">
      <h4 className="text-xl font-bold text-white">Srovnání Indexů</h4>
      <div className="space-y-6">
        <BenchmarkLine label="Rychlost odpovědi" val={radarData.find((r: any) => r.subject === 'Rychlost')?.A} color="bg-accent" />
        <BenchmarkLine label="Kvalita komunikace" val={radarData.find((r: any) => r.subject === 'Komunikace')?.A} color="bg-highlight" />
        <BenchmarkLine label="Strategická shoda" val={radarData.find((r: any) => r.subject === 'Strategie')?.A} color="bg-indigo-500" />
      </div>
      <div className="p-8 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[2rem] text-sm text-slate-400 font-medium leading-relaxed">
        {calculations.score > 85 
          ? "Váš profil odpovídá 'Market Leader' kategorii. Fokusujte se na inovace v oblasti candidate marketing."
          : "Váš profil vykazuje disproporci mezi strategickým záměrem a technickou realizací."}
      </div>
    </div>
  </div>
);

const ChapterRoadmap = ({ calculations }: any) => {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-display font-black text-white tracking-tight leading-tight">Strategická roadmapa <span className="text-highlight">optimalizace</span></h2>
        <p className="text-slate-400 font-medium max-w-2xl mx-auto">Další kroky pro posílení vaší tržní pozice a odstranění zbývajících manuálních bariér.</p>
      </div>
      
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-white/5 hidden md:block" />
        <div className="space-y-12 relative z-10">
          <RoadmapItem 
            step="01" days="30" title="Konsolidace Dat & AI Scoring" 
            desc="Sjednocení všech náborových kanálů a nasazení automatického vyhodnocování životopisů na základě vašich KPI." 
            active={!calculations.hasATS} 
            alreadyInUsage={calculations.hasATS}
          />
          <RoadmapItem 
            step="02" days="60" title="Prediktivní Matching Talent Poolu" 
            desc="Automatické oživování vaší databáze kandidátů. AI sama navrhne vhodné kandidáty z minulosti pro nové pozice." 
            active={calculations.hasATS && !calculations.hasTalentPool}
            alreadyInUsage={calculations.hasTalentPool}
          />
          <RoadmapItem 
            step="03" days="90" title="Plná AI Orchestrace" 
            desc="Nasazení konverzačních AI agentů pro prvotní screening a automatické plánování schůzek bez zásahu člověka." 
            active={calculations.hasATS && calculations.hasTalentPool && !calculations.hasAIComm}
            alreadyInUsage={calculations.hasAIComm}
          />
        </div>
      </div>

      <div className="p-10 bg-gradient-to-br from-indigo-500/20 to-highlight/10 border border-white/10 rounded-[2.5rem] text-center space-y-4">
        <h3 className="text-2xl font-display font-black text-white italic">"Firma {calculations.score > 85 ? 'jako vaše již staví na silných technologických základech. Dalším krokem je hyper-personalizace.' : 'vašeho typu dosáhne největšího zrychlení skrze eliminaci manuálního screeningu.'}"</h3>
        <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Strategické doporučení platformy Octopus</p>
      </div>
    </div>
  );
};

const LoadingStep = ({ text, delay }: { text: string, delay: number }) => (
  <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay }}
    className="flex items-center gap-3 text-slate-400 font-medium text-sm py-1">
    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
    {text}
  </motion.div>
);

const SummaryPoint = ({ icon: Icon, title, text }: any) => (
  <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-1">
    <div className="flex items-center gap-2 text-accent font-black text-[10px] uppercase tracking-widest">
      <Icon size={14} />
      {title}
    </div>
    <div className="text-white font-bold text-sm tracking-tight">{text}</div>
  </div>
);

const InfoBox = ({ title, text, color }: any) => (
  <div className={cn("p-6 bg-white/5 border-l-4 rounded-r-2xl space-y-2", color)}>
    <h5 className="text-white font-black text-xs uppercase tracking-wider">{title}</h5>
    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">{text}</p>
  </div>
);

const AnalyticCard = ({ title, value, desc }: any) => (
  <div className="p-8 bg-white/5 border border-white/10 rounded-3xl space-y-3">
    <div className="text-highlight font-black text-[10px] uppercase tracking-[0.3em]">{title}</div>
    <div className="text-4xl font-display font-black text-white">{value}</div>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
  </div>
);

const BenchmarkLine = ({ label, val, color }: any) => (
  <div className="space-y-2">
    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
      <span>{label}</span>
      <span className="text-white">{val}%</span>
    </div>
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div initial={{ width: 0 }} animate={{ width: `${val}%` }} className={cn("h-full", color)} />
    </div>
  </div>
);

const RoadmapItem = ({ step, days, title, desc, active, alreadyInUsage }: any) => (
  <div className={cn("flex gap-6 group transition-opacity", alreadyInUsage ? "opacity-60" : "opacity-100")}>
    <div className={cn(
      "w-16 h-16 rounded-3xl flex-shrink-0 flex items-center justify-center font-black text-xl border transition-all", 
      alreadyInUsage ? "bg-white/5 border-white/10 text-slate-400" :
      active ? "bg-accent border-accent text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]" : 
      "bg-white/5 border-white/10 text-slate-500"
    )}>
      {alreadyInUsage ? <CheckCircle2 size={24} /> : step}
    </div>
    <div className="flex-1 space-y-3 pb-8 border-b border-white/5 group-last:border-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h4 className={cn("text-2xl font-display font-black", alreadyInUsage ? "text-slate-400 line-through" : "text-white")}>{title}</h4>
          <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">Dny {days}</span>
        </div>
        {alreadyInUsage && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/20 border border-accent/30 rounded-xl">
             <CheckCircle2 size={14} className="text-accent" />
              <span className="text-xs font-black text-white uppercase tracking-tight">Již aktivováno</span>
          </div>
        )}
      </div>
      <p className="text-slate-400 font-medium leading-relaxed max-w-2xl text-sm italic">
        {alreadyInUsage ? "Váš aktuální systém již tuto funkcionalitu plně zajišťuje." : desc}
      </p>
    </div>
  </div>
);
