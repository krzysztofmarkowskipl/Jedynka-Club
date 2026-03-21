import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4"
          >
            Skontaktuj się z nami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Masz pytania dotyczące naboru, treningów czy funkcjonowania klubu? 
            Napisz do nas, a z przyjemnością Ci odpowiemy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-xl">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Informacje kontaktowe</h3>
              
              <ul className="space-y-8">
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Adres</h4>
                    <p className="text-muted-foreground leading-relaxed">Pływalnia Miejska "Delfin"<br/>ul. Pływacka 12<br/>00-123 Warszawa</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Telefon</h4>
                    <p className="text-muted-foreground">+48 123 456 789<br/>+48 987 654 321</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">E-mail</h4>
                    <p className="text-muted-foreground">kontakt@kpjedynka.pl<br/>zarzad@kpjedynka.pl</p>
                  </div>
                </li>
                
                <li className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Godziny treningów</h4>
                    <p className="text-muted-foreground">Poniedziałek - Piątek: 16:00 - 20:00<br/>Sobota: 08:00 - 12:00</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col"
          >
            <div className="bg-card rounded-[2.5rem] p-8 md:p-12 border border-border/50 shadow-xl flex-1">
              <h3 className="text-2xl font-display font-bold text-foreground mb-8">Napisz wiadomość</h3>
              
              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Wiadomość wysłana! (Mock)'); }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-semibold text-foreground">Imię i nazwisko</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-semibold text-foreground">E-mail</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                      placeholder="jan@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-semibold text-foreground">Temat</label>
                  <input 
                    type="text" 
                    id="subject" 
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="Wpisz temat wiadomości"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-foreground">Wiadomość</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                    placeholder="Wpisz treść..."
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Send className="w-5 h-5" />
                  Wyślij wiadomość
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
