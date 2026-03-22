import { ReactNode, useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets, Sun, Moon, MapPin, Phone, Mail, ChevronRight, Search } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";
import { useListNews } from "@workspace/api-client-react";

const NAV_LINKS = [
  { href: "/", label: "Strona Główna" },
  { href: "/aktualnosci", label: "Aktualności" },
  { href: "/zawodnicy", label: "Zawodnicy" },
  { href: "/osiagniecia", label: "Osiągnięcia" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [location, navigate] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { data: allNews } = useListNews();

  const searchResults = searchQuery.trim().length >= 2
    ? (allNews ?? []).filter(
        (a) =>
          a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setSearchQuery("");
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-primary">
      {/* Navigation */}
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b border-transparent",
          isScrolled || isMobileMenuOpen
            ? "bg-background/80 backdrop-blur-xl border-border/50 shadow-sm py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
            >
              <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                <img 
                  src={`${import.meta.env.BASE_URL}images/logo.png`} 
                  alt="KP Jedynka Logo" 
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className={cn(
                "font-display font-bold text-xl tracking-tight transition-colors duration-300",
                !isScrolled && location === '/' ? "text-white drop-shadow-md" : "text-foreground"
              )}>
                KP Jedynka
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1 bg-background/50 backdrop-blur-md p-1 rounded-full border border-border/50 shadow-sm">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    location === link.href
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                      : "text-foreground/80 hover:text-foreground hover:bg-muted"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-2">
              {/* Search */}
              <div ref={searchContainerRef} className="relative">
                <div className={cn(
                  "flex items-center transition-all duration-300 rounded-full overflow-visible",
                  isSearchOpen
                    ? "bg-background/90 backdrop-blur-md border border-border/60 shadow-md pl-3 pr-1 py-1"
                    : ""
                )}>
                  <AnimatePresence>
                    {isSearchOpen && (
                      <motion.input
                        ref={searchInputRef}
                        key="search-input"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 180, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        type="text"
                        placeholder="Szukaj..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") { setIsSearchOpen(false); setSearchQuery(""); }
                        }}
                        className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                      />
                    )}
                  </AnimatePresence>
                  <button
                    onClick={() => { setIsSearchOpen(!isSearchOpen); if (isSearchOpen) setSearchQuery(""); }}
                    className={cn(
                      "p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 shrink-0",
                      !isScrolled && location === '/' && !isSearchOpen
                        ? "bg-black/20 text-white hover:bg-black/40 backdrop-blur-md"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    )}
                    aria-label="Wyszukaj"
                  >
                    {isSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                  </button>
                </div>

                {/* Search results dropdown */}
                <AnimatePresence>
                  {isSearchOpen && searchQuery.trim().length >= 2 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-80 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-xl overflow-hidden z-50"
                    >
                      {searchResults.length > 0 ? (
                        <div className="py-2">
                          <p className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Aktualności
                          </p>
                          {searchResults.map((article) => (
                            <button
                              key={article.id}
                              onClick={() => { navigate("/aktualnosci"); setIsSearchOpen(false); setSearchQuery(""); }}
                              className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex flex-col gap-0.5"
                            >
                              <span className="text-sm font-medium text-foreground line-clamp-1">{article.title}</span>
                              <span className="text-xs text-muted-foreground line-clamp-1">{article.excerpt}</span>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                          Brak wyników dla „{searchQuery}"
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2.5 rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50",
                  !isScrolled && location === '/' ? "bg-black/20 text-white hover:bg-black/40 backdrop-blur-md" : "bg-muted text-foreground hover:bg-muted/80"
                )}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <Link 
                href="/admin" 
                className={cn(
                  "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:translate-y-0",
                  !isScrolled && location === '/' 
                    ? "bg-white text-primary hover:bg-white/90" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25"
                )}
              >
                Panel CMS
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 md:hidden">
              <button
                onClick={toggleTheme}
                className={cn(
                  "p-2 rounded-full",
                  !isScrolled && location === '/' ? "text-white" : "text-foreground"
                )}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={cn(
                  "p-2 -mr-2",
                  !isScrolled && location === '/' && !isMobileMenuOpen ? "text-white" : "text-foreground"
                )}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl absolute top-full left-0 w-full overflow-hidden"
            >
              <div className="px-4 py-6 space-y-2">
                {/* Mobile search */}
                <div className="relative mb-4">
                  <div className="flex items-center bg-muted rounded-xl px-3 py-2 gap-2">
                    <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                    <input
                      type="text"
                      placeholder="Szukaj..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                    />
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")}>
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    )}
                  </div>
                  {searchQuery.trim().length >= 2 && (
                    <div className="mt-1 bg-background border border-border/60 rounded-xl overflow-hidden shadow-lg">
                      {searchResults.length > 0 ? (
                        searchResults.map((article) => (
                          <button
                            key={article.id}
                            onClick={() => { navigate("/aktualnosci"); setIsMobileMenuOpen(false); setSearchQuery(""); }}
                            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border/30 last:border-0"
                          >
                            <p className="text-sm font-medium text-foreground line-clamp-1">{article.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{article.excerpt}</p>
                          </button>
                        ))
                      ) : (
                        <p className="px-4 py-3 text-sm text-muted-foreground">Brak wyników dla „{searchQuery}"</p>
                      )}
                    </div>
                  )}
                </div>

                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-base font-medium transition-colors",
                      location === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-border/50">
                  <Link 
                    href="/admin" 
                    className="flex items-center justify-between w-full px-4 py-3 rounded-xl bg-secondary text-secondary-foreground font-medium"
                  >
                    Panel Administratora
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground pt-16 pb-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[100px] rounded-full pointer-events-none transform translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-12">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center gap-3 mb-6 inline-flex">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">KP Jedynka</span>
              </Link>
              <p className="text-secondary-foreground/70 leading-relaxed max-w-md mb-8">
                Wychowujemy mistrzów pływania od 1968 roku. Dołącz do nas i rozwijaj swoją pasję w profesjonalnym środowisku pod okiem najlepszych trenerów.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-lg mb-6">Szybkie linki</h3>
              <ul className="space-y-4">
                {NAV_LINKS.slice(1, 5).map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-secondary-foreground/70 hover:text-primary transition-colors inline-flex items-center gap-2">
                      <ChevronRight className="w-4 h-4" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-display font-bold text-lg mb-6">Kontakt</h3>
              <ul className="space-y-4 text-secondary-foreground/70">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>ul. Pływacka 12<br/>00-123 Warszawa</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span>+48 123 456 789</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span>kontakt@kpjedynka.pl</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/50">
              © {new Date().getFullYear()} Klub Pływacki Jedynka. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-6 text-sm text-secondary-foreground/50">
              <a href="#" className="hover:text-primary transition-colors">Polityka prywatności</a>
              <a href="#" className="hover:text-primary transition-colors">Regulamin</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
