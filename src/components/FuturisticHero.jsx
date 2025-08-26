import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, Linkedin, Mail, MapPin, ArrowDown, Code, Brain, Zap, Rocket } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(TextPlugin, ScrollTrigger);

const FuturisticHero = () => {
  const containerRef = useRef();
  const heroRef = useRef();
  const textRef = useRef();
  const orbRef = useRef();
  const particlesRef = useRef([]);
  const cursorRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'entrée du texte avec effet de frappe
      gsap.fromTo(textRef.current.querySelector('.hero-title'),
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 1.5,
          ease: "power3.out",
          delay: 0.5
        }
      );

      // Animation du texte en dactylographie
      gsap.to(textRef.current.querySelector('.typing-text'), {
        text: personalInfo.title,
        duration: 2,
        ease: "none",
        delay: 1
      });

      // Animation de l'orbe flottante
      gsap.to(orbRef.current, {
        y: -20,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });

      // Animation des particules
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: -100,
            x: Math.random() * 200 - 100,
            rotation: 360,
            opacity: 0,
            duration: 3 + Math.random() * 2,
            ease: "power2.out",
            repeat: -1,
            delay: index * 0.2
          });
        }
      });

      // Parallax au scroll
      gsap.to(heroRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });

      // Animation du curseur personnalisé
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Curseur personnalisé */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{ transform: 'translate(-50%, -50%)' }}
      />

      <section 
        ref={containerRef}
        className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
      >
        {/* Fond animé avec grille futuriste */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/20 via-transparent to-transparent" />
          <div className="absolute inset-0 opacity-30">
            {/* Grille futuriste */}
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(0, 255, 255, 0.3)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Particules flottantes */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              ref={el => particlesRef.current[i] = el}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Contenu principal */}
        <div ref={heroRef} className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Texte et informations */}
              <div ref={textRef} className="text-white space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 text-cyan-400 font-medium">
                    <Code className="w-5 h-5" />
                    <span className="text-sm tracking-wider uppercase">Future Engineer</span>
                  </div>
                  
                  <h1 className="hero-title text-6xl lg:text-8xl font-black leading-tight">
                    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {personalInfo.name.split(' ')[0]}
                    </span>
                    <br />
                    <span className="text-white">
                      {personalInfo.name.split(' ')[1]}
                    </span>
                  </h1>
                  
                  <div className="h-12 overflow-hidden">
                    <p className="typing-text text-2xl lg:text-3xl text-cyan-300 font-light"></p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                  className="space-y-6"
                >
                  <p className="text-xl text-gray-300 leading-relaxed max-w-xl">
                    Architecte du futur numérique, je conçois des expériences technologiques 
                    qui repoussent les limites de l'innovation.
                  </p>

                  {/* Boutons d'action futuristes */}
                  <div className="flex flex-wrap gap-4">
                    <motion.button
                      onClick={scrollToAbout}
                      className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Rocket className="w-5 h-5" />
                        Explorer mon univers
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>

                    <motion.button
                      className="group relative px-8 py-4 border-2 border-cyan-400 rounded-xl font-semibold text-cyan-400 overflow-hidden transition-all duration-300 hover:text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Brain className="w-5 h-5" />
                        Voir mes projets IA
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </motion.button>
                  </div>

                  {/* Réseaux sociaux avec effet néon */}
                  <div className="flex gap-4">
                    {[
                      { icon: Github, url: personalInfo.github, color: 'hover:shadow-white/20' },
                      { icon: Linkedin, url: personalInfo.linkedin, color: 'hover:shadow-blue-400/20' },
                      { icon: Mail, url: `mailto:${personalInfo.email}`, color: 'hover:shadow-cyan-400/20' }
                    ].map(({ icon: Icon, url, color }, index) => (
                      <motion.a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-4 border border-gray-600 rounded-xl hover:border-cyan-400 hover:shadow-lg ${color} transition-all duration-300 group`}
                        whileHover={{ y: -5, scale: 1.1 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 + index * 0.1 }}
                      >
                        <Icon className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors duration-300" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Localisation */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="flex items-center gap-3 text-gray-300"
                  >
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span>{personalInfo.location}</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-green-400 text-sm">Disponible</span>
                  </motion.div>
                </motion.div>
              </div>

              {/* Visualisation 3D interactive */}
              <div className="relative flex justify-center items-center">
                <motion.div
                  className="relative w-96 h-96"
                  animate={{
                    rotateY: mousePosition.x * 10,
                    rotateX: mousePosition.y * 10,
                  }}
                  transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                >
                  {/* Orbe centrale */}
                  <div 
                    ref={orbRef}
                    className="absolute inset-8 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full shadow-2xl shadow-cyan-400/50"
                  >
                    <div className="absolute inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-inner">
                      <div className="absolute inset-4 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full shadow-inner flex items-center justify-center">
                        <Zap className="w-16 h-16 text-white animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Anneaux orbitaux */}
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="absolute inset-0 border-2 border-cyan-400/30 rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 10 + index * 5,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      style={{
                        margin: `${index * 20}px`,
                      }}
                    >
                      <div className={`absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full -top-2 left-1/2 transform -translate-x-1/2`} />
                    </motion.div>
                  ))}

                  {/* Icônes technologiques flottantes */}
                  {[
                    { icon: '⚛️', position: { top: '10%', right: '10%' } },
                    { icon: '🐍', position: { bottom: '10%', left: '10%' } },
                    { icon: '🤖', position: { top: '10%', left: '10%' } },
                    { icon: '🔒', position: { bottom: '10%', right: '10%' } }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center text-2xl shadow-lg border border-cyan-400/30"
                      style={tech.position}
                      animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, 0, -5, 0]
                      }}
                      transition={{
                        duration: 3 + index,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      {tech.icon}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll futuriste */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer group"
          onClick={scrollToAbout}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="flex flex-col items-center gap-3 text-cyan-400">
            <span className="text-sm font-medium tracking-wider uppercase opacity-80">
              Découvrir
            </span>
            <div className="relative">
              <ArrowDown className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 blur-sm bg-cyan-400 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300" />
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default FuturisticHero;
