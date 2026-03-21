import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";

const ACHIEVEMENTS = [
  { year: "2023", title: "Mistrzostwo Polski Juniorów", desc: "Anna Kowalska, 200m styl wolny", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
  { year: "2023", title: "2. miejsce - Puchar Polski", desc: "Michał Nowak, 100m motyl", icon: Medal, color: "text-slate-400", bg: "bg-slate-400/10" },
  { year: "2023", title: "Rekord Klubowy", desc: "Katarzyna Wiśniewska, 50m grzbietowy", icon: Star, color: "text-primary", bg: "bg-primary/10" },
  { year: "2022", title: "Mistrzostwo Województwa", desc: "Piotr Zając, 200m żabka", icon: Award, color: "text-amber-500", bg: "bg-amber-500/10" },
  { year: "2022", title: "Złoty medal - Olimpiada Młodzieży", desc: "Anna Kowalska", icon: Trophy, color: "text-amber-400", bg: "bg-amber-400/10" },
];

export default function Achievements() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background relative overflow-hidden">
      {/* Background graphic */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none z-0 mix-blend-overlay">
        <img src={`${import.meta.env.BASE_URL}images/water-texture.png`} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4"
          >
            Nasze Osiągnięcia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground"
          >
            Lata ciężkiej pracy, potu i wyrzeczeń przekute w medale i rekordy. 
            Jesteśmy dumni z każdego startu naszych reprezentantów.
          </motion.p>
        </div>

        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/80 transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {ACHIEVEMENTS.map((ach, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = ach.icon;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } pl-12 md:pl-0`}
                >
                  {/* Timeline Dot */}
                  <div className={`absolute left-4 md:left-1/2 w-12 h-12 rounded-full border-4 border-background ${ach.bg} ${ach.color} flex items-center justify-center transform -translate-x-1/2 shadow-lg z-10`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div className="bg-card p-6 rounded-3xl border border-border/50 shadow-md hover:shadow-xl transition-shadow duration-300">
                      <span className="inline-block px-3 py-1 rounded-full bg-muted text-foreground text-sm font-bold mb-3">
                        {ach.year}
                      </span>
                      <h3 className="text-xl font-bold font-display text-foreground mb-2">{ach.title}</h3>
                      <p className="text-muted-foreground">{ach.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-24 bg-gradient-to-r from-primary to-blue-600 rounded-[3rem] p-10 text-center text-white shadow-2xl shadow-primary/30 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://pixabay.com/get/g4ee7639b2465dfa7ce347f1105dbd2af4605c22c7d4ed3797667a95539a37e7a8c6cbe1a2a1aefd45cd6d362e4d28ae84544c45985b0f2632e91cf591bfc5270_1280.jpg')] opacity-10 bg-cover bg-center mix-blend-overlay" />
          <h2 className="relative z-10 text-3xl font-display font-bold mb-4">Tworzymy Historię</h2>
          <p className="relative z-10 text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Nasze sukcesy to wynik pasji, profesjonalnego podejścia i niesamowitego ducha drużyny. Razem przesuwamy granice możliwości.
          </p>
          <Trophy className="relative z-10 w-16 h-16 mx-auto text-white/50" />
        </motion.div>
      </div>
    </div>
  );
}
