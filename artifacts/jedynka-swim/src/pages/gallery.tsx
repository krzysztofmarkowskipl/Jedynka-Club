import { motion } from "framer-motion";

const IMAGES = [
  "https://images.unsplash.com/photo-1519315901367-f34f91d51acb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1560086968-305eb9f2702d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576610616656-d3aa5d1f4534?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1600965962361-9035dbfd1c50?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517438476312-10d79c077509?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1526550517342-e086b387edda?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554047806-cfbe1b4e28c3?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1615818985160-5f21422ab1a0?q=80&w=800&auto=format&fit=crop"
];

export default function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-extrabold text-foreground tracking-tight mb-4"
          >
            Galeria
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Uchwycone momenty pełne emocji, wysiłku i radości z wygranej.
          </motion.p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {IMAGES.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.5 }}
              className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* gallery grid swimming pool unsplash */}
              <img 
                src={src} 
                alt={`Gallery image ${idx + 1}`} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
