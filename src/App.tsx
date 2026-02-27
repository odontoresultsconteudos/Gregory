import { motion, useScroll, useTransform, useSpring, useMotionValue } from "motion/react";
import { 
  Zap, 
  Target, 
  TrendingUp, 
  Instagram, 
  MessageCircle, 
  CheckCircle2, 
  Smartphone, 
  BarChart3, 
  PenTool, 
  Video, 
  Users,
  ArrowRight,
  Star,
  ShieldCheck,
  Clock,
  Home,
  Briefcase,
  Layout,
  DollarSign
} from "lucide-react";
import { useRef, useEffect, useState, useMemo } from "react";

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: any[] = [];
    const particleCount = 60;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update(mX: number, mY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Mouse interaction
        const dx = mX - this.x;
        const dy = mY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 200) {
          this.x -= dx / 50;
          this.y -= dy / 50;
        }

        if (this.x > canvas.width) this.x = 0;
        else if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        else if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = `rgba(0, 71, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(mouseX.get(), mouseY.get());
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    resize();
    init();
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-40" />;
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Início", icon: Home, href: "#" },
    { name: "Serviços", icon: Briefcase, href: "#servicos" },
    { name: "Cases", icon: Layout, href: "#cases" },
    { name: "Preços", icon: DollarSign, href: "#precos" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6 pointer-events-none">
      <motion.div 
        animate={{ 
          y: scrolled ? 0 : 10,
          scale: scrolled ? 0.95 : 1,
          backgroundColor: scrolled ? "rgba(5, 5, 5, 0.8)" : "rgba(255, 255, 255, 0.05)"
        }}
        className="glass px-6 md:px-8 py-3 rounded-full flex items-center gap-4 md:gap-8 pointer-events-auto shadow-2xl"
      >
        <motion.span 
          whileHover={{ scale: 1.05 }}
          className="font-bold tracking-tighter text-lg md:text-xl cursor-pointer"
        >
          AGÊNCIA <span className="text-brand-blue">NAVENA</span>
        </motion.span>
        
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <motion.a
              key={item.name}
              href={item.href}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity group"
            >
              <item.icon size={14} className="text-brand-blue group-hover:scale-110 transition-transform" />
              {item.name}
            </motion.a>
          ))}
        </div>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-blue text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,71,255,0.4)] transition-all"
        >
          Contato
        </motion.button>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-4 bg-mesh">
      <ParticleBackground />
      
      <motion.div style={{ y, opacity, scale }} className="relative z-10 text-center max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-[10px] font-black tracking-[0.3em] uppercase mb-10 text-blue-400 border-blue-500/20"
        >
          <Zap size={14} className="animate-pulse" /> Proposta Comercial • 2026
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-7xl md:text-[10rem] font-black tracking-tighter mb-8 leading-[0.85] uppercase"
        >
          AGÊNCIA <br />
          <span className="gradient-text drop-shadow-[0_0_30px_rgba(0,71,255,0.3)]">NAVENA</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl opacity-50 font-medium mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          Performance digital de elite para lojistas de iPhone. 
          <span className="block mt-2 font-bold text-white italic">Dominamos o tráfego, você domina as vendas.</span>
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6"
        >
          <motion.button 
            whileHover={{ scale: 1.05, x: 5 }}
            className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center gap-3 group"
          >
            Começar Agora <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <div className="flex items-center gap-4">
            {[Target, TrendingUp, BarChart3].map((Icon, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                whileHover={{ y: -5, backgroundColor: "rgba(0, 71, 255, 0.2)" }}
                className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-brand-blue"
              >
                <Icon size={24} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient Orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-brand-blue/20 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, description, features, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass p-8 rounded-[2rem] relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
      <Icon size={120} />
    </div>
    
    <div className="w-16 h-16 bg-brand-blue/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="text-brand-blue" size={32} />
    </div>
    
    <h3 className="text-3xl font-bold mb-4 tracking-tight">{title}</h3>
    <p className="text-white/60 mb-8 leading-relaxed">{description}</p>
    
    <div className="space-y-4">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-start gap-3">
          <CheckCircle2 className="text-brand-blue shrink-0 mt-1" size={18} />
          <span className="text-sm font-medium text-white/80">{f}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Target,
      title: "Tráfego Pago",
      description: "Anúncios estratégicos que levam compradores certos até o seu negócio — no momento exato da intenção de compra.",
      features: [
        "Gestão de Tráfego Pago (Meta, Google, TikTok)",
        "Copy persuasiva para anúncios",
        "Relatório Quinzenal de métricas",
        "Relatório Mensal Completo (ROI, Otimizações)",
        "Reunião de Alinhamento mensal",
        "Suporte via WhatsApp em tempo real",
        "Google Meu Negócio (Bônus)"
      ]
    },
    {
      icon: Instagram,
      title: "Social Media",
      description: "Presença digital consistente que constrói autoridade, cria audiência e prepara o público para comprar.",
      features: [
        "Calendário de Conteúdos estratégico",
        "15 Posts mensais no Feed",
        "Legendas Profissionais com foco em conversão",
        "7 Vídeos Editados (Reels/Stories)",
        "6 Artes + 2 Carrosséis exclusivos",
        "Cronograma de Stories diário",
        "Acompanhamento de Métricas de engajamento"
      ]
    },
    {
      icon: PenTool,
      title: "Designer & Editor",
      description: "Conteúdo visual que para o scroll, comunica qualidade premium e transforma atenção em decisão de compra.",
      features: [
        "7 Vídeos Editados com cortes e efeitos premium",
        "3 Artes para Feed estratégicas",
        "Material visual para Tráfego Pago incluso",
        "Cronograma de Stories visual",
        "Capas Profissionais (Thumbnails)",
        "Análise de desempenho criativo"
      ]
    }
  ];

  return (
    <section id="servicos" className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">Nossa Expertise</h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter">SOLUÇÕES QUE <span className="gradient-text">VENDEM</span></p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => <ServiceCard key={i} {...s} index={i} />)}
      </div>
    </section>
  );
};

const CaseCard = ({ name, followers, image, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="glass rounded-3xl overflow-hidden group cursor-pointer"
  >
    <div className="aspect-[9/16] relative">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full border-2 border-brand-blue p-0.5">
            <img src={image} className="w-full h-full rounded-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <div>
            <p className="font-bold text-sm">@{name}</p>
            <p className="text-[10px] opacity-60 uppercase tracking-widest">{followers} Seguidores</p>
          </div>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map(s => <Star key={s} size={10} className="fill-brand-blue text-brand-blue" />)}
        </div>
      </div>
    </div>
  </motion.div>
);

const Cases = () => {
  const cases = [
    { name: "ir_phones", followers: "47.2k", image: "https://picsum.photos/seed/irphones/400/700" },
    { name: "greenrexloja", followers: "17k", image: "https://picsum.photos/seed/greenrex/400/700" },
    { name: "vnstoreord", followers: "35.1k", image: "https://picsum.photos/seed/vnstore/400/700" },
    { name: "_dangershopp", followers: "11.1k", image: "https://picsum.photos/seed/danger/400/700" },
    { name: "tatabah10", followers: "17.1k", image: "https://picsum.photos/seed/tatabah/400/700" }
  ];

  return (
    <section id="cases" className="py-32 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">Resultados Reais</h2>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">CASES DE <span className="gradient-text">SUCESSO</span></p>
          <p className="mt-4 opacity-50 font-medium">Lojistas de iPhone que já confiam na Navena para crescer no digital.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {cases.map((c, i) => <CaseCard key={i} {...c} index={i} />)}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const items = [
    { title: "Tráfego Pago", price: "2.000", desc: "Gestão completa de anúncios pagos" },
    { title: "Social Media", price: "1.500", desc: "Gestão completa das redes sociais" },
    { title: "Designer / Editor", price: "1.500", desc: "Produção de conteúdo visual e vídeo" }
  ];

  return (
    <section id="precos" className="py-32 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">Transparência</h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter">VALORES <span className="gradient-text">INDIVIDUAIS</span></p>
      </div>

      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="glass p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h4 className="text-xl font-bold">{item.title}</h4>
              <p className="text-sm opacity-50">{item.desc}</p>
            </div>
            <div className="text-right">
              <span className="text-xs opacity-50 mr-2">R$</span>
              <span className="text-3xl font-black">{item.price}</span>
              <span className="text-xs opacity-50 ml-1">/mês</span>
            </div>
          </div>
        ))}
        <div className="pt-8 border-t border-white/10 flex justify-between items-center">
          <p className="font-bold opacity-50 uppercase tracking-widest text-sm">Total Contratando Separado</p>
          <p className="text-4xl font-black text-brand-blue">R$ 5.000<span className="text-xs ml-1">/mês</span></p>
        </div>
      </div>
    </section>
  );
};

const PlanCard = ({ title, price, features, badge, popular, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className={`glass p-10 rounded-[2.5rem] relative flex flex-col ${popular ? 'border-brand-blue/50 ring-1 ring-brand-blue/20' : ''}`}
  >
    {badge && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-brand-blue/20">
        {badge}
      </div>
    )}
    
    <div className="mb-8">
      <h3 className="text-2xl font-black mb-2 uppercase tracking-tight">{title}</h3>
      <div className="flex items-baseline gap-1">
        <span className="text-sm opacity-50 font-bold">R$</span>
        <span className="text-5xl font-black">{price}</span>
        <span className="text-sm opacity-50 font-bold">/mês</span>
      </div>
    </div>

    <div className="flex-1 space-y-4 mb-10">
      {features.map((f: string, i: number) => (
        <div key={i} className="flex items-start gap-3">
          <ArrowRight className="text-brand-blue shrink-0 mt-1" size={14} />
          <span className="text-sm font-medium text-white/70">{f}</span>
        </div>
      ))}
    </div>

    <button className={`w-full py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${popular ? 'bg-brand-blue text-white hover:scale-[1.02]' : 'glass hover:bg-white/10'}`}>
      Selecionar Plano <Zap size={16} />
    </button>
  </motion.div>
);

const Plans = () => {
  const plans = [
    {
      title: "Performance Base",
      price: "1.500",
      badge: "Plano 01 — Entrada",
      features: [
        "Tráfego em 1 plataforma",
        "Copy para anúncios",
        "Relatório quinzenal e mensal",
        "1 reunião de alinhamento mensal",
        "Suporte no WhatsApp",
        "Google Meu Negócio (bônus)",
        "Setup de contas incluso"
      ]
    },
    {
      title: "Performance Avançada",
      price: "2.200",
      badge: "Plano 02 — Mais Escolhido",
      popular: true,
      features: [
        "Meta Ads + Google Ads",
        "7 Vídeos + 3 Artes (material de tráfego)",
        "Cronograma de Stories",
        "Acompanhamento de métricas",
        "Copy para anúncios",
        "Relatório quinzenal e mensal",
        "Reunião de alinhamento mensal",
        "Suporte no WhatsApp",
        "Google Meu Negócio",
        "Setup de contas incluso"
      ]
    },
    {
      title: "Performance Total",
      price: "3.000",
      badge: "Plano 03 — O Mais Completo",
      features: [
        "Meta Ads + Google + TikTok",
        "Social Media + Designer completo",
        "Calendário de Conteúdos + suporte",
        "15 posts mensais no feed",
        "7 Vídeos + 6 Artes + 2 Carrosséis",
        "5 Vídeos exclusivos para tráfego",
        "Legendas e capas profissionais",
        "Cronograma de Stories",
        "Acompanhamento de métricas",
        "Copy para anúncios",
        "Relatório quinzenal e mensal",
        "Reunião de alinhamento mensal",
        "Suporte no WhatsApp",
        "Google Meu Negócio",
        "Setup de contas incluso"
      ]
    }
  ];

  return (
    <section className="py-32 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand-blue mb-4">Nossos Planos</h2>
        <p className="text-4xl md:text-5xl font-black tracking-tighter">ESTRUTURA <span className="gradient-text">COMPLETA</span></p>
        <p className="mt-4 opacity-50 font-medium">Escolha o nível de aceleração ideal para sua loja.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {plans.map((p, i) => <PlanCard key={i} {...p} index={i} />)}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-20 px-4 border-t border-white/5 bg-mesh">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
      <div className="text-center md:text-left">
        <span className="font-bold tracking-tighter text-2xl">AGÊNCIA <span className="text-brand-blue">NAVENA</span></span>
        <p className="mt-2 opacity-50 text-sm max-w-xs">Transformando tráfego em lucro real para lojistas de iPhone em todo o Brasil.</p>
      </div>
      
      <div className="flex gap-4">
        <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors">
          <Instagram size={20} />
        </a>
        <a href="#" className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-brand-blue transition-colors">
          <MessageCircle size={20} />
        </a>
      </div>

      <div className="text-center md:text-right">
        <p className="text-xs opacity-30 uppercase tracking-widest font-bold">© 2026 Agência Navena. Todos os direitos reservados.</p>
        <p className="text-[10px] opacity-20 mt-1">Desenvolvido com foco em performance.</p>
      </div>
    </div>
  </footer>
);

const FloatingCTA = () => (
  <motion.button 
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl shadow-green-500/20 flex items-center gap-2 group"
  >
    <MessageCircle size={24} />
    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-bold whitespace-nowrap">
      Falar no WhatsApp
    </span>
  </motion.button>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Cases />
      <Pricing />
      <Plans />
      <Footer />
      <FloatingCTA />
      
      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-[10%] left-[5%] w-96 h-96 bg-brand-blue/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>
    </div>
  );
}
