import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useListNews } from "@workspace/api-client-react";
import { formatDate } from "@/lib/utils";

const ITEMS_PER_PAGE = 6;

export default function News() {
  const { data: news, isLoading } = useListNews();
  const [currentPage, setCurrentPage] = useState(1);

  const safeNews = news || [];
  const totalPages = Math.ceil(safeNews.length / ITEMS_PER_PAGE);
  const currentNews = safeNews.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="bg-muted/30 py-16 mb-16 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4"
          >
            Aktualności
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Śledź na bieżąco sukcesy naszych pływaków, relacje z zawodów oraz najważniejsze wydarzenia z życia klubu Jedynka.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-card rounded-3xl h-[450px] animate-pulse border border-border/50" />
            ))}
          </div>
        ) : safeNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {currentNews.map((article, idx) => (
                <motion.article 
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-3xl overflow-hidden shadow-md border border-border/50 hover:shadow-xl transition-shadow duration-300 flex flex-col group"
                >
                  <div className="h-56 overflow-hidden relative">
                    {article.imageUrl ? (
                      <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                        <span className="font-display font-bold text-3xl text-primary/20">KP JEDYNKA</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary mb-4">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.publishedAt)}
                    </div>
                    <h3 className="text-2xl font-bold font-display mb-4 text-foreground leading-tight">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 mb-6 flex-1">
                      {article.content}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-full border border-border/50 text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-full font-medium transition-colors ${
                        currentPage === i + 1 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-full border border-border/50 text-foreground hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-card rounded-3xl border border-border/50">
            <h3 className="text-2xl font-bold text-foreground mb-2">Brak wpisów</h3>
            <p className="text-muted-foreground">Aktualnie nie ma żadnych wiadomości w naszym systemie.</p>
          </div>
        )}
      </div>
    </div>
  );
}
