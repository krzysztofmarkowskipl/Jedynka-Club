import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Trophy, Users, Clock, Calendar } from "lucide-react";
import { useListNews } from "@workspace/api-client-react";
import { formatDate } from "@/lib/utils";

export default function Home() {
  const { data: news, isLoading } = useListNews();
  const latestNews = news?.slice(0, 3) || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-swimmer.png"
            alt="Pływak sportowy podczas wyścigu"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient only at bottom and left edge — center stays clear */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content pinned to bottom-left */}
        <div className="absolute inset-0 z-10 flex items-end">
          <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full pb-20 md:pb-28">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-xl"
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-none mb-4 drop-shadow-lg">
                Klub Pływacki<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Jedynka
                </span>
              </h1>
              <p className="text-base md:text-lg text-white/75 leading-relaxed font-light mb-8 max-w-sm">
                Trenuj z najlepszymi, przekraczaj własne granice i zdobywaj medale.
              </p>
              <div className="flex flex-row gap-3">
                <Link
                  href="/kontakt"
                  className="px-6 py-3 rounded-full font-bold text-sm bg-gradient-to-r from-primary to-blue-600 text-white shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Dołącz do nas
                </Link>
                <Link
                  href="/aktualnosci"
                  className="px-6 py-3 rounded-full font-bold text-sm bg-white/10 backdrop-blur-md border border-white/25 text-white hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  Aktualności
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background relative z-20 -mt-10 rounded-t-[3rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-3xl shadow-lg border border-border/50 text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display font-bold text-foreground mb-2">1968</h3>
              <p className="text-muted-foreground font-medium">Rok założenia</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card p-8 rounded-3xl shadow-lg border border-border/50 text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display font-bold text-foreground mb-2">85+</h3>
              <p className="text-muted-foreground font-medium">Aktywnych członków</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card p-8 rounded-3xl shadow-lg border border-border/50 text-center group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="w-16 h-16 mx-auto bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Trophy className="w-8 h-8" />
              </div>
              <h3 className="text-4xl font-display font-bold text-foreground mb-2">150+</h3>
              <p className="text-muted-foreground font-medium">Zdobytych medali</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Najnowsze wieści</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">Bądź na bieżąco z życiem naszego klubu, wynikami zawodów i wydarzeniami.</p>
            </div>
            <Link 
              href="/aktualnosci" 
              className="hidden md:flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
            >
              Wszystkie aktualności
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-3xl h-[400px] animate-pulse border border-border/50 shadow-sm" />
              ))}
            </div>
          ) : latestNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {latestNews.map((article, idx) => (
                <motion.article 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card rounded-3xl overflow-hidden shadow-lg border border-border/50 hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="h-48 overflow-hidden relative">
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <Trophy className="w-12 h-12 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold font-display mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                      {article.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all mt-auto">
                      Czytaj dalej <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border/50 rounded-3xl p-12 text-center text-muted-foreground">
              Brak aktualności w tym momencie.
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
            <Link 
              href="/aktualnosci" 
              className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors group"
            >
              Wszystkie aktualności
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
