import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  BarChart3, 
  Users2, 
  MessageSquare, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp,
  Target,
  FileText,
  PieChart as PieChartIcon,
  LayoutDashboard,
  Workflow,
  UserCheck,
  MessageCircle,
  UserPlus,
  BrainCircuit,
  Handshake,
  Globe,
  Sparkles
} from 'lucide-react';
import { DashboardMockup } from './components/DashboardMockup';
import { ServiceUnavailableToast } from './components/ServiceUnavailableToast';

export default function App() {
  const [hasError, setHasError] = useState(false);

  // Audit engine is not connected. Every CTA surfaces a service error.
  const openAudit = () => setHasError(true);

  return (
    <div className="min-h-screen bg-primary selection:bg-accent/30 text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-primary/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.jpg" alt="Team Octopus" className="w-12 h-12 object-contain" />
            <div className="flex flex-col -space-y-1">
              <span className="text-[10px] font-black text-accent uppercase tracking-[0.3em]">Team</span>
              <span className="text-2xl font-display font-black tracking-tighter text-white uppercase">Octopus</span>
            </div>
          </div>
          <button 
            onClick={openAudit}
            className="hidden md:block px-6 py-2.5 bg-white/5 border border-white/10 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-sm tracking-wide"
          >
            Spustit Audit
          </button>
        </div>
      </nav>

      <main className="pt-20">
        {/* SEO Metadata moved to index.html */}


        {/* HERO SECTION */}
        <section className="relative pt-24 pb-32 overflow-hidden">
        {/* Deep Obsidian Background with Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-[0.2em] mb-8"
              >
                <ShieldCheck size={16} />
                <span>Exekutivní AI HR Inteligence</span>
              </motion.div>
              
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center mb-12"
              >
                <h2 className="text-6xl md:text-8xl font-display font-black tracking-tight text-white leading-tight uppercase">
                  HLOUBKOVÁ AI HR <br />
                  <span className="text-gradient">DIAGNOSTIKA</span>
                </h2>
              </motion.div>

              
              <h1 className="sr-only">Hloubková AI HR Diagnostika</h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-slate-400 mb-14 max-w-3xl mx-auto font-medium leading-relaxed"
              >
                Odhalte kritická místa, která brzdí růst vaší firmy. Nezávislý audit, který během 7 minut identifikuje skrytá rizika a neefektivitu ve vašem hiringu.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col items-center gap-10"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md shadow-2xl">
                    <span className="text-slate-500 font-bold uppercase tracking-widest text-xs">Tržní hodnota auditu: </span>
                    <span className="text-gold font-black text-xl ml-2 tracking-wide">49 000 Kč</span>
                  </div>
                  <div className="text-highlight font-black text-xs uppercase tracking-[0.4em] animate-pulse">Časově omezený bezplatný přístup</div>
                </div>

                <button 
                  onClick={openAudit}
                  className="group relative px-14 py-8 bg-accent text-white text-3xl font-black rounded-[2rem] shadow-[0_20px_50px_rgba(99,102,241,0.4)] hover:scale-105 transition-all flex items-center gap-4 glow-accent active:scale-95"
                >
                  Spustit hloubkový audit
                  <ArrowRight size={32} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <div className="flex flex-wrap justify-center gap-10 text-xs font-black text-slate-500 uppercase tracking-[0.2em]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-highlight" />
                    7 Minut
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-highlight" />
                    Průběžný Report
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-highlight" />
                    Srovnání s trhem
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="relative mt-20">
              <div className="absolute inset-0 bg-accent/20 blur-[120px] rounded-full scale-110 opacity-50" />
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10 shadow-2xl overflow-hidden"
              >
                <img 
                  src="/src/assets/hero_dashboard.png" 
                  alt="AI HR Dashboard" 
                  className="w-full h-auto opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-20 bg-[#050915] border-y border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="text-center md:text-left">
                <h2 className="text-4xl font-display font-black text-white mb-2 tracking-tight">Auditováno 328 firem</h2>
                <p className="text-lg text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  Průměrné skóre efektivity trhu je <span className="text-accent">61 %</span>.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-8 opacity-20">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-slate-400 rounded-lg" />
                    <div className="w-20 h-4 bg-slate-300 rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BENCHMARK SECTION */}
        <section className="py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="space-y-10">
                <div className="space-y-6">
                  <h2 className="text-5xl font-display font-black text-white leading-[1.1] tracking-tight">
                    Jak si stojí vaše firma ve srovnání s leadery?
                  </h2>
                  <p className="text-xl text-slate-400 font-medium leading-relaxed">
                    Náš model analyzuje 24 kritických bodů vašeho hiringu a dává je do kontextu s anonymními daty firem vaší velikosti.
                  </p>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xs font-black text-accent uppercase tracking-[0.4em]">Klíčové výstupy auditu:</h3>
                  <ul className="space-y-6">
                    {[
                      "Přesné vyčíslení finančních ztrát náboru",
                      "Identifikace úzkých hrdel v procesu",
                      "Strategická roadmapa pro digitální transformaci"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="mt-1 w-6 h-6 rounded-lg bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 border border-accent/30">
                          <CheckCircle2 size={16} />
                        </div>
                        <span className="text-lg text-slate-300 font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-accent/20 rounded-[3rem] -rotate-3 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-white/5 p-12 rounded-[3.5rem] border border-white/10 shadow-2xl backdrop-blur-3xl overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 blur-[80px] -translate-y-1/2 translate-x-1/2" />
                  <div className="flex items-center justify-between mb-12">
                    <h4 className="font-display font-black text-white tracking-widest uppercase text-xs">Analýza trhu</h4>
                    <span className="px-3 py-1 bg-accent/20 text-accent border border-accent/30 rounded-lg text-[10px] font-black uppercase tracking-widest">Live Data</span>
                  </div>
                  <div className="space-y-8">
                    {[
                      { label: "Vaše firma (odhad)", value: 64, color: "bg-accent" },
                      { label: "Top 10% firem", value: 88, color: "bg-highlight" },
                      { label: "Průměr trhu", value: 61, color: "bg-white/10" }
                    ].map((bar, i) => (
                      <div key={i} className="space-y-3">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                          <span className="text-slate-500">{bar.label}</span>
                          <span className="text-white">{bar.value}%</span>
                        </div>
                        <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                          <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: `${bar.value}%` }}
                            transition={{ duration: 1.5, delay: i * 0.2 }}
                            className={`h-full rounded-full ${bar.color} ${bar.color === 'bg-accent' ? 'glow-accent' : ''}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DIAGNOSTIC AREAS */}
        <section className="py-32 bg-[#050915]/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-5xl font-display font-black text-white mb-6">Předmět diagnostiky</h2>
              <p className="text-xl text-slate-400 font-medium leading-relaxed">
                Hluboká analýza 5 klíčových domén, které determinují ROI vašeho personálního oddělení.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {[
                { icon: LayoutDashboard, title: "Procesní audit", desc: "Zmapování fází a eliminace redundancí." },
                { icon: Workflow, title: "AI Readiness", desc: "Potenciál pro automatizaci rutinních úkolů." },
                { icon: UserCheck, title: "Zkušenost kandidátů", desc: "Optimalizace konverzního poměru náboru." },
                { icon: MessageCircle, title: "Technologie", desc: "Efektivita využívaných digitálních nástrojů." },
                { icon: UserPlus, title: "Finanční dopad", desc: "Vyčíslení nákladů na špatný výběr a fluktuaci." }
              ].map((area, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-all group"
                >
                  <div className="w-14 h-14 bg-accent/20 text-accent rounded-2xl flex items-center justify-center mb-8 border border-accent/20 group-hover:glow-accent transition-all">
                    <area.icon size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4 leading-tight">{area.title}</h3>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{area.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-40 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-8xl font-display font-black text-white leading-tight">Získejte kontrolu nad svou <span className="text-gradient">ROI</span></h2>
                <p className="text-xl text-gold font-bold uppercase tracking-[0.5em]">
                  Limitovaný exekutivní přístup
                </p>
              </div>
              
              <button 
                onClick={openAudit}
                className="group px-16 py-10 bg-accent text-white text-3xl font-black rounded-[2.5rem] shadow-2xl shadow-accent/40 hover:scale-105 transition-all flex items-center gap-6 mx-auto glow-accent active:scale-95"
              >
                Spustit Deep Audit
                <ArrowRight size={36} className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">
                Okamžité výsledky • Zdarma • 100% diskrétní
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <div className="flex items-center gap-3">
                <img src="/logo.jpg" alt="Team Octopus" className="w-10 h-10 object-contain brightness-0 invert" />
                <span className="text-2xl font-display font-black tracking-tighter text-white uppercase">Octopus</span>
              </div>
              <p className="text-slate-500 text-sm font-medium">Digitalizace a excelentní HR díky AI inteligenci.</p>
            </div>
            <div className="flex gap-12 text-xs font-black text-slate-500 uppercase tracking-widest">
              <a href="https://teamoctopus.cz" className="hover:text-white transition-colors">Soukromí</a>
              <a href="https://teamoctopus.cz" className="hover:text-white transition-colors">Podmínky</a>
              <a href="https://teamoctopus.cz" className="hover:text-white transition-colors">Kontakt</a>
            </div>
            <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.2em]">
              © 2026 Strategická skupina Team Octopus.
            </p>
          </div>
        </div>
      </footer>

      {/* SERVICE ERROR */}
      <AnimatePresence>
        {hasError && (
          <ServiceUnavailableToast onClose={() => setHasError(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
