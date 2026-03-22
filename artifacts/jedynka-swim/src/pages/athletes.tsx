import { motion } from "framer-motion";
import { User } from "lucide-react";

const ATHLETES = [
  { name: "Anna Kowalska", age: 19, style: "Styl wolny", events: "200m, 400m", image: "/images/athletes/anna-kowalska.png" },
  { name: "Michał Nowak", age: 22, style: "Motyl", events: "100m, 200m", image: "/images/athletes/michal-nowak.png" },
  { name: "Katarzyna Wiśniewska", age: 17, style: "Grzbietowy", events: "50m, 100m", image: "/images/athletes/katarzyna-wisniewska.png" },
  { name: "Piotr Zając", age: 21, style: "Żabka", events: "100m, 200m", image: "/images/athletes/piotr-zajac.png" },
  { name: "Marta Kamińska", age: 20, style: "Czterostyl", events: "200m, 400m", image: "/images/athletes/marta-kaminska.png" },
  { name: "Tomasz Lewandowski", age: 23, style: "Styl wolny", events: "50m, 100m", image: "/images/athletes/tomasz-lewandowski.png" },
];

export default function Athletes() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4"
          >
            Nasi Zawodnicy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Poznaj dumę naszego klubu. Młodzi, ambitni i pełni pasji sportowcy, którzy na co dzień trenują pod okiem najlepszych szkoleniowców.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {ATHLETES.map((athlete, idx) => (
            <motion.div
              key={athlete.name}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="group"
            >
              <div className="bg-card rounded-[2.5rem] p-4 border border-border/50 shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 relative">
                  {/* landing page swimmers stock portraits */}
                  <img 
                    src={athlete.image} 
                    alt={athlete.name}
                    className="w-full h-full object-cover filter grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-display font-bold text-2xl drop-shadow-md">{athlete.name}</h3>
                    <p className="text-white/80 font-medium">{athlete.age} lat</p>
                  </div>
                </div>

                <div className="px-4 pb-4">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Główny styl</p>
                        <p className="font-medium text-foreground">{athlete.style}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-secondary/50 text-foreground flex items-center justify-center shrink-0 border border-border">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Dystanse</p>
                        <p className="font-medium text-foreground">{athlete.events}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
