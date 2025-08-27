/**
 * Portfolio Futuriste - MABIALA EULOGE
 * Étudiant Ingénieur Informatique - ESIEA
 * 
 * Portfolio révolutionnaire avec animations GSAP et design futuriste
 * Architecte du futur numérique
 * 
 * @author MABIALA EULOGE
 * @version 2.0.0 - Futuristic Edition
 * @created 2024-2025
 */

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUp, Zap } from 'lucide-react';
import AnimatedHeart from './components/ui/animated-heart';
import AnimatedCoffee from './components/ui/animated-coffee';
import {
  optimizeAnimations,
  createOptimizedGSAPContext,
  throttle,
  preloadCriticalAssets,
  setCSSAnimationVars
} from './utils/performance';

// Composants futuristes
import FuturisticNavigation from './components/FuturisticNavigation';
import FuturisticHero from './components/FuturisticHero';
import FuturisticAbout from './components/FuturisticAbout';
import FuturisticSkills from './components/FuturisticSkills';
import FuturisticProjects from './components/FuturisticProjects';
import FuturisticContact from './components/FuturisticContact';
import OptimizedCosmicBackground from './components/OptimizedCosmicBackground';

import './App.css';

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef();
  const scrollButtonRef = useRef();

  useEffect(() => {
    // Optimisations de performance initiales
    const { isLowEnd, reducedMotion } = optimizeAnimations();
    setCSSAnimationVars();
    preloadCriticalAssets();

    const ctx = createOptimizedGSAPContext(() => {
      // Animation du bouton de scroll avec magnétisme (optimisée)
      if (scrollButtonRef.current) {
        gsap.set(scrollButtonRef.current, {
          scale: 0.8,
          opacity: 0,
          rotation: -180,
          willChange: 'transform, opacity'
        });

        ScrollTrigger.create({
          start: "top -500",
          end: "max",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
          refreshPriority: -1,
          onEnter: () => {
            gsap.to(scrollButtonRef.current, {
              scale: 1,
              opacity: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)"
            });
          },
          onLeave: () => {
            gsap.to(scrollButtonRef.current, {
              scale: 0.8,
              opacity: 0,
              rotation: 180,
              duration: 0.3
            });
          }
        });

        // Effet de rotation continue (optimisé)
        if (!reducedMotion) {
          gsap.to(scrollButtonRef.current.querySelector('.icon-rotate'), {
            rotation: 360,
            duration: isLowEnd ? 6 : 3,
            ease: "none",
            repeat: -1
          });
        }
      }

      // Parallax global pour les sections (optimisé)
      const sections = gsap.utils.toArray('section');
      sections.forEach((section, index) => {
        if (section.id !== 'hero') {
          gsap.fromTo(section,
            { y: isLowEnd ? 20 : 50, opacity: 0.8 },
            {
              y: 0,
              opacity: 1,
              duration: isLowEnd ? 0.5 : 1,
              ease: "easeOut",
              scrollTrigger: {
                trigger: section,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                fastScrollEnd: true,
                refreshPriority: -1
              }
            }
          );
        }
      });

      // Effet de curseur personnalisé optimisé
      const cursor = document.querySelector('.custom-cursor');
      if (cursor && !reducedMotion && !isLowEnd) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let isMoving = false;

        const throttledMouseMove = throttle((e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
          isMoving = true;
        }, 16); // 60fps max

        document.addEventListener('mousemove', throttledMouseMove);

        const animateCursor = () => {
          if (isMoving) {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            gsap.set(cursor, {
              x: cursorX,
              y: cursorY,
              force3D: true
            });

            // Arrêter l'animation si le curseur est proche de la position cible
            if (Math.abs(mouseX - cursorX) < 0.1 && Math.abs(mouseY - cursorY) < 0.1) {
              isMoving = false;
            }
          }

          requestAnimationFrame(animateCursor);
        };

        animateCursor();
      } else if (cursor && (reducedMotion || isLowEnd)) {
        // Curseur simple pour les devices moins performants
        cursor.style.display = 'none';
      }

    }, appRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "easeOut"
    });
  };

  return (
    <div ref={appRef} className="relative bg-slate-900 overflow-x-hidden">
      
      {/* Curseur personnalisé futuriste */}
      <div className="custom-cursor fixed w-8 h-8 pointer-events-none z-[60] mix-blend-difference performance-optimized">
        <div className="w-full h-full border-2 border-cyan-400 rounded-full opacity-80">
          <div className="absolute inset-1 bg-cyan-400/20 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Fond cosmique optimisé */}
      <OptimizedCosmicBackground />

      {/* Navigation futuriste */}
      <FuturisticNavigation />

      {/* Contenu principal */}
      <main className="relative z-10">
        <FuturisticHero />
        <FuturisticAbout />
        <FuturisticSkills />
        <FuturisticProjects />
        <FuturisticContact />
      </main>

      {/* Footer futuriste */}
      <footer className="relative z-10 bg-gradient-to-t from-slate-900 via-slate-800 to-transparent py-12 border-t border-cyan-400/20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                EULOGE MABIALA
              </span>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 mb-4"
            >
              Architecte du futur numérique • Ingénieur en devenir • Innovateur passionné
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-sm text-gray-500"
            >
              <p className="flex items-center justify-center gap-2 flex-wrap">
                © 2025 Euloge Mabiala. Conçu avec <AnimatedHeart size={16} /> et beaucoup de <AnimatedCoffee size={16} />
              </p>
              <p className="mt-1">
                Portfolio futuriste propulsé par{' '}
                <span className="text-cyan-400 font-medium">React</span>,{' '}
                <span className="text-purple-400 font-medium">GSAP</span> &{' '}
                <span className="text-pink-400 font-medium">Framer Motion</span>
              </p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Bouton de scroll vers le haut futuriste */}
      <motion.button
        ref={scrollButtonRef}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 z-40 group overflow-hidden"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <ArrowUp className="icon-rotate w-6 h-6 text-white" />
        </div>
        
        {/* Effet de pulsation */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl animate-ping opacity-20" />
      </motion.button>

      {/* Indicateur de chargement holographique */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="fixed inset-0 bg-slate-900 z-[70] flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto mb-4"
          />
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-cyan-400 font-medium"
          >
            Initialisation du futur...
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}

export default App;
