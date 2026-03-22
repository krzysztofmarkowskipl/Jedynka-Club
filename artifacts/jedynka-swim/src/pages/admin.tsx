import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Edit2, Trash2, X, Lock, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useListNews, 
  useCreateNews, 
  useUpdateNews, 
  useDeleteNews,
  getListNewsQueryKey 
} from "@workspace/api-client-react";
import type { NewsArticle } from "@workspace/api-client-react";

// Form validation schema based on OpenAPI types
const formSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  content: z.string().min(1, "Treść jest wymagana"),
  excerpt: z.string().min(1, "Zajawka jest wymagana"),
  imageUrl: z.string().url("Musi być poprawnym URL").optional().or(z.literal("")),
  publishedAt: z.string().min(1, "Data publikacji jest wymagana")
});

type FormValues = z.infer<typeof formSchema>;

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  const queryClient = useQueryClient();
  const { data: news, isLoading } = useListNews();
  
  const createMutation = useCreateNews({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewsQueryKey() });
        setIsModalOpen(false);
        resetForm();
      }
    }
  });

  const updateMutation = useUpdateNews({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewsQueryKey() });
        setIsModalOpen(false);
        resetForm();
      }
    }
  });

  const deleteMutation = useDeleteNews({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getListNewsQueryKey() });
      }
    }
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      publishedAt: new Date().toISOString().substring(0, 16)
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "KPJedynka@2024") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Nieprawidłowy login lub hasło");
    }
  };

  const resetForm = () => {
    setEditingArticle(null);
    reset({
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      publishedAt: new Date().toISOString().substring(0, 16)
    });
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (article: NewsArticle) => {
    setEditingArticle(article);
    reset({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      imageUrl: article.imageUrl || "",
      publishedAt: new Date(article.publishedAt).toISOString().substring(0, 16)
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data: FormValues) => {
    // API requires nullable imageUrl handling
    const submitData = {
      ...data,
      imageUrl: data.imageUrl || null,
      publishedAt: new Date(data.publishedAt).toISOString()
    };

    if (editingArticle) {
      updateMutation.mutate({ id: editingArticle.id, data: submitData });
    } else {
      createMutation.mutate({ data: submitData });
    }
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Czy na pewno chcesz usunąć ten wpis?")) {
      deleteMutation.mutate({ id });
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card p-8 md:p-12 rounded-[2rem] shadow-xl border border-border/50 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h1 className="font-display font-bold text-3xl mb-2 text-foreground">Panel CMS</h1>
          <p className="text-muted-foreground mb-8">Zaloguj się, aby zarządzać treścią</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Login"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-center text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              <input
                type="password"
                placeholder="Hasło"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-center text-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {error && <p className="text-destructive text-sm font-medium">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Zaloguj się
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">Zarządzanie aktualnościami</h1>
            <p className="text-muted-foreground">Dodawaj, edytuj lub usuwaj wpisy na stronie.</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={openCreateModal}
              className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20"
            >
              <Plus className="w-5 h-5" />
              Nowy wpis
            </button>
            <button 
              onClick={() => setIsAuthenticated(false)}
              className="p-3 bg-secondary text-secondary-foreground rounded-xl hover:bg-secondary/80 transition-colors"
              title="Wyloguj"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="bg-card rounded-3xl border border-border/50 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-muted/50 border-b border-border/50">
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">Tytuł</th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground">Data Publikacji</th>
                  <th className="px-6 py-4 text-sm font-semibold text-foreground text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {isLoading ? (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Ładowanie...</td></tr>
                ) : news?.length === 0 ? (
                  <tr><td colSpan={4} className="p-8 text-center text-muted-foreground">Brak wpisów w bazie.</td></tr>
                ) : (
                  news?.map((article) => (
                    <tr key={article.id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-muted-foreground">#{article.id}</td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-foreground">{article.title}</p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">{article.excerpt}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">
                        {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => openEditModal(article)}
                            className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(article.id)}
                            className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal / Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
              onClick={() => setIsModalOpen(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-3xl border border-border shadow-2xl z-[101] p-6 md:p-8"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display font-bold text-foreground">
                  {editingArticle ? 'Edytuj wpis' : 'Nowy wpis'}
                </h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Tytuł</label>
                  <input 
                    {...register("title")}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                  {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Zajawka (krótki opis na liście)</label>
                  <textarea 
                    {...register("excerpt")}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                  {errors.excerpt && <p className="text-destructive text-sm">{errors.excerpt.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">Pełna treść</label>
                  <textarea 
                    {...register("content")}
                    rows={6}
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                  />
                  {errors.content && <p className="text-destructive text-sm">{errors.content.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">URL obrazka (opcjonalnie)</label>
                    <input 
                      {...register("imageUrl")}
                      type="url"
                      placeholder="https://..."
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    {errors.imageUrl && <p className="text-destructive text-sm">{errors.imageUrl.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Data i czas publikacji</label>
                    <input 
                      {...register("publishedAt")}
                      type="datetime-local"
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                    {errors.publishedAt && <p className="text-destructive text-sm">{errors.publishedAt.message}</p>}
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3 border-t border-border/50">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3 font-semibold text-foreground bg-muted hover:bg-muted/80 rounded-xl transition-colors"
                  >
                    Anuluj
                  </button>
                  <button 
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="px-6 py-3 font-bold text-primary-foreground bg-primary hover:bg-primary/90 rounded-xl shadow-lg shadow-primary/20 transition-all disabled:opacity-50"
                  >
                    {createMutation.isPending || updateMutation.isPending ? 'Zapisywanie...' : 'Zapisz wpis'}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
