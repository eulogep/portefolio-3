import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Menu, X, Moon, Sun, Zap, Home, User, Brain, Rocket, MessageCircle } from 'lucide-react';
import AnimatedIcon from './ui/animated-icon';

gsap.registerPlugin(ScrollTrigger);

const FuturisticNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef();
  const logoRef = useRef();
  const menuItemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Détection de la section active
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation du logo
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          rotation: 360,
          duration: 10,
          ease: "none",
          repeat: -1
        });
      }

      // Animation des éléments de menu
      menuItemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(item,
            { opacity: 0, y: -20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: index * 0.1,
              ease: "easeOut"
            }
          );
        }
      });

      // Effet de glassmorphism sur scroll
      ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          if (navRef.current) {
            gsap.to(navRef.current, {
              backdropFilter: `blur(${Math.min(progress * 20, 20)}px)`,
              background: `rgba(15, 23, 42, ${Math.min(progress * 0.9, 0.9)})`,
              duration: 0.3
            });
          }
        }
      });

    }, navRef);

    return () => ctx.revert();
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'hero', label: 'Accueil', icon: Home },
    { id: 'about', label: 'À propos', icon: User },
    { id: 'skills', label: 'Compétences', icon: Brain },
    { id: 'projects', label: 'Projets', icon: Rocket },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  return (
    <>
      <motion.nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-slate-900/90 backdrop-blur-md shadow-2xl border-b border-cyan-400/20' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo futuriste */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div 
                  ref={logoRef}
                  className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl blur-lg opacity-30 animate-pulse" />
              </div>
              
              <div className="hidden md:block">
                <h1 className="text-xl font-black bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  EULOGE
                </h1>
                <p className="text-xs text-gray-400 font-medium">Future Engineer</p>
              </div>
            </motion.div>

            {/* Navigation desktop */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  ref={el => menuItemsRef.current[index] = el}
                  onClick={() => scrollToSection(item.id)}
                  className={`group relative px-6 py-3 rounded-2xl font-medium transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                      : scrollY > 50 
                        ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5' 
                        : 'text-white/80 hover:text-cyan-400 hover:bg-white/5'
                  }`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  
                  {activeSection === item.id && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>
              ))}
            </div>

            {/* Contrôles */}
            <div className="flex items-center space-x-3">
              {/* Toggle thème */}
              <motion.button
                onClick={toggleDarkMode}
                className={`p-3 rounded-2xl transition-all duration-300 ${
                  scrollY > 50 
                    ? 'text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400' 
                    : 'text-white/80 hover:bg-white/10 hover:text-cyan-400'
                } border border-gray-600/30 hover:border-cyan-400/50`}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </motion.button>
              
              {/* Menu mobile */}
              <motion.button
                onClick={toggleMenu}
                className={`lg:hidden p-3 rounded-2xl transition-all duration-300 ${
                  scrollY > 50 
                    ? 'text-gray-300 hover:bg-gray-800/50 hover:text-cyan-400' 
                    : 'text-white/80 hover:bg-white/10 hover:text-cyan-400'
                } border border-gray-600/30 hover:border-cyan-400/50`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Menu mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-t border-cyan-400/20"
            >
              <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-left ${
                        activeSection === item.id
                          ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/30'
                          : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-400/5'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeSection === item.id
                          ? 'bg-cyan-400/20 text-cyan-400'
                          : 'bg-gray-800/50 text-gray-400 group-hover:bg-cyan-400/10 group-hover:text-cyan-400'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      
                      <div>
                        <span className="font-semibold block">{item.label}</span>
                        <span className="text-xs text-gray-500">
                          {item.id === 'hero' && 'Accueil'}
                          {item.id === 'about' && 'Mon parcours'}
                          {item.id === 'skills' && 'Technologies'}
                          {item.id === 'projects' && 'Mes créations'}
                          {item.id === 'contact' && 'Me contacter'}
                        </span>
                      </div>
                      
                      {activeSection === item.id && (
                        <motion.div
                          className="ml-auto w-2 h-2 bg-cyan-400 rounded-full"
                          layoutId="activeMobile"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Indicateur de progression de lecture */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 origin-left z-50"
        style={{
          scaleX: scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        }}
      />
    </>
  );
};

export default FuturisticNavigation;
