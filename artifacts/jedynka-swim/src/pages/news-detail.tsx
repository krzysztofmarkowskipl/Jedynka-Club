import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { useGetNews } from "@workspace/api-client-react";
import { formatDate } from "@/lib/utils";

export default function NewsDetail() {
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const { data: article, isLoading, isError } = useGetNews(id);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-32 bg-muted animate-pulse rounded-full mb-8" />
          <div className="h-80 bg-muted animate-pulse rounded-3xl mb-8" />
          <div className="space-y-4">
            <div className="h-10 bg-muted animate-pulse rounded-xl w-3/4" />
            <div className="h-4 bg-muted animate-pulse rounded-full w-1/4" />
            <div className="space-y-2 pt-4">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="h-4 bg-muted animate-pulse rounded-full" style={{ width: `${85 + Math.random() * 15}%` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !article) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Nie znaleziono artykułu</h1>
          <p className="text-muted-foreground mb-8">Ten artykuł nie istnieje lub został usunięty.</p>
          <Link
            href="/aktualnosci"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do aktualności
          </Link>
        </div>
      </div>
    );
  }

  const readingTime = Math.max(1, Math.ceil(article.content.split(" ").length / 200));

  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/aktualnosci"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do aktualności
          </Link>
        </motion.div>

        {/* Hero image */}
        {article.imageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl overflow-hidden mb-10 shadow-xl aspect-[16/9]"
          >
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Article content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-5">
            <span className="flex items-center gap-1.5 font-medium text-primary">
              <Calendar className="w-4 h-4" />
              {formatDate(article.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {readingTime} min czytania
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-extrabold text-foreground tracking-tight leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt / Lead */}
          <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-8 pb-8 border-b border-border/50">
            {article.excerpt}
          </p>

          {/* Full content */}
          <div className="prose prose-lg dark:prose-invert max-w-none text-foreground leading-relaxed space-y-4">
            {article.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-foreground/85 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </motion.article>

        {/* Footer nav */}
        <div className="mt-16 pt-8 border-t border-border/50">
          <Link
            href="/aktualnosci"
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-semibold rounded-full hover:bg-muted/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wszystkie aktualności
          </Link>
        </div>
      </div>
    </div>
  );
}
