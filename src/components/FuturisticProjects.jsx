import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Github, ExternalLink, X, Play, Pause, Eye, Star,
  Zap, Rocket, Shield, Brain, Globe, Code,
  ChevronLeft, ChevronRight, Filter
} from 'lucide-react';
import { projects } from '../data/portfolioData';
import AnimatedIcon from './ui/animated-icon';

gsap.registerPlugin(ScrollTrigger);

const FuturisticProjects = () => {
  const containerRef = useRef();
  const projectsRef = useRef([]);
  const hologramRef = useRef();
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation d'entrée des cartes projet avec effet holographique
      projectsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              rotationY: 45,
              z: -200,
              opacity: 0,
              scale: 0.8
            },
            {
              rotationY: 0,
              z: 0,
              opacity: 1,
              scale: 1,
              duration: 1.2,
              ease: "easeOut",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.15
            }
          );

          // Effet de survol holographique
          const handleMouseEnter = () => {
            gsap.to(card, {
              rotationY: 5,
              rotationX: 5,
              z: 50,
              scale: 1.05,
              duration: 0.4,
              ease: "easeOut"
            });
          };

          const handleMouseLeave = () => {
            gsap.to(card, {
              rotationY: 0,
              rotationX: 0,
              z: 0,
              scale: 1,
              duration: 0.4,
              ease: "easeOut"
            });
          };

          card.addEventListener('mouseenter', handleMouseEnter);
          card.addEventListener('mouseleave', handleMouseLeave);
        }
      });

      // Animation du hologramme central
      if (hologramRef.current) {
        gsap.to(hologramRef.current, {
          rotation: 360,
          duration: 20,
          ease: "none",
          repeat: -1
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Auto-play pour le carousel
  useEffect(() => {
    if (isPlaying && filteredProjects.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredProjects.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, filter]);

  const getProjectIcon = (project) => {
    if (project.title.toLowerCase().includes('ai') || project.title.toLowerCase().includes('intelligence')) {
      return <Brain className="w-6 h-6" />;
    } else if (project.title.toLowerCase().includes('security') || project.title.toLowerCase().includes('sécurité')) {
      return <Shield className="w-6 h-6" />;
    } else if (project.title.toLowerCase().includes('web') || project.title.toLowerCase().includes('app')) {
      return <Globe className="w-6 h-6" />;
    }
    return <Code className="w-6 h-6" />;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'terminé':
        return { bg: 'bg-green-500/20', border: 'border-green-400', text: 'text-green-400' };
      case 'en-cours':
        return { bg: 'bg-yellow-500/20', border: 'border-yellow-400', text: 'text-yellow-400' };
      case 'elaboration':
        return { bg: 'bg-blue-500/20', border: 'border-blue-400', text: 'text-blue-400' };
      default:
        return { bg: 'bg-gray-500/20', border: 'border-gray-400', text: 'text-gray-400' };
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'Tous', count: projects.length, icon: Globe },
    { value: 'featured', label: 'Phares', count: projects.filter(p => p.featured).length, icon: Star },
    { value: 'terminé', label: 'Terminés', count: projects.filter(p => p.status === 'terminé').length, icon: Zap },
    { value: 'en-cours', label: 'En cours', count: projects.filter(p => p.status === 'en-cours').length, icon: Rocket }
  ];

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900/50 to-slate-900 overflow-hidden"
    >
      {/* Hologramme de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          ref={hologramRef}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-5"
        >
          <div className="absolute inset-0 border-2 border-cyan-400 rounded-full animate-pulse" />
          <div className="absolute inset-4 border border-purple-400 rounded-full" />
          <div className="absolute inset-8 border border-cyan-400 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full blur-xl" />
        </div>
      </div>

      {/* Grille énergétique */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(128,0,255,0.3)_1px,transparent_1px)] bg-[size:100px_100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* En-tête avec effet néon */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <AnimatedIcon icon={Rocket} size={20} color="#00ffff" animation="bounce" />
            <span className="text-cyan-400 font-medium">Projets Innovants</span>
          </div>
          
          <h2 className="text-5xl lg:text-7xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Créations
            </span>
            <br />
            <span className="text-white">Futuristes</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Portfolio de projets révolutionnaires mêlant intelligence artificielle, 
            cybersécurité et expériences utilisateur de nouvelle génération.
          </p>
        </motion.div>

        {/* Filtres futuristes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {filterOptions.map((option, index) => (
            <motion.button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`group relative px-6 py-3 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                filter === option.value
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-600/50'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <AnimatedIcon
                icon={option.icon}
                size={20}
                animation={filter === option.value ? 'glow' : 'hover'}
                color={filter === option.value ? '#ffffff' : 'currentColor'}
                className="relative z-10"
              />
              <span className="relative z-10">{option.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full relative z-10 ${
                filter === option.value
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-700 text-gray-300'
              }`}>
                {option.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Carousel de projets phares */}
        {filter === 'all' || filter === 'featured' ? (
          <div className="mb-16">
            <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-white">Projets Phares</h3>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 bg-cyan-500/20 border border-cyan-400/30 rounded-xl hover:bg-cyan-500/30 transition-colors duration-300"
                  >
                    <AnimatedIcon
                      icon={isPlaying ? Pause : Play}
                      size={20}
                      color="#00ffff"
                      animation="pulse"
                    />
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length)}
                      className="p-2 bg-gray-700/50 border border-gray-600/30 rounded-xl hover:bg-gray-600/50 transition-colors duration-300"
                    >
                      <AnimatedIcon icon={ChevronLeft} size={20} color="white" animation="hover" />
                    </button>
                    <button
                      onClick={() => setCurrentSlide((prev) => (prev + 1) % filteredProjects.length)}
                      className="p-2 bg-gray-700/50 border border-gray-600/30 rounded-xl hover:bg-gray-600/50 transition-colors duration-300"
                    >
                      <AnimatedIcon icon={ChevronRight} size={20} color="white" animation="hover" />
                    </button>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {filteredProjects[currentSlide] && (
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8 items-center"
                  >
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-2xl">
                        <img
                          src={filteredProjects[currentSlide].image}
                          alt={filteredProjects[currentSlide].title}
                          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        
                        {/* Badge de statut */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(filteredProjects[currentSlide].status).bg} ${getStatusColor(filteredProjects[currentSlide].status).border} ${getStatusColor(filteredProjects[currentSlide].status).text}`}>
                          {filteredProjects[currentSlide].status === 'terminé' ? 'Terminé' : 
                           filteredProjects[currentSlide].status === 'en-cours' ? 'En cours' : 'En élaboration'}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-xl flex items-center justify-center">
                            {getProjectIcon(filteredProjects[currentSlide])}
                          </div>
                          {filteredProjects[currentSlide].featured && (
                            <div className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full">
                              <AnimatedIcon icon={Star} size={12} color="#fbbf24" animation="pulse" />
                              <span className="text-yellow-400 text-xs font-semibold">Projet Phare</span>
                            </div>
                          )}
                        </div>
                        
                        <h4 className="text-3xl font-bold text-white mb-4">
                          {filteredProjects[currentSlide].title}
                        </h4>
                        
                        <p className="text-gray-300 leading-relaxed mb-6">
                          {filteredProjects[currentSlide].description.split('\n')[0]}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {filteredProjects[currentSlide].technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-lg text-sm font-medium border border-cyan-400/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <motion.button
                          onClick={() => setSelectedProject(filteredProjects[currentSlide])}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold text-white hover:scale-105 transition-transform duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Eye className="w-5 h-5" />
                          Voir le projet
                        </motion.button>
                        
                        {filteredProjects[currentSlide].demo && (
                          <motion.a
                            href={filteredProjects[currentSlide].demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-xl font-semibold text-white hover:border-cyan-400 hover:scale-105 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-5 h-5" />
                            Demo
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicateurs de slide */}
              <div className="flex justify-center gap-2 mt-8">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide 
                        ? 'bg-cyan-400 w-8' 
                        : 'bg-gray-600 hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {/* Grille de projets holographiques */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                ref={el => projectsRef.current[index] = el}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden hover:border-cyan-400/50 transition-all duration-500"
                style={{ perspective: '1000px' }}
              >
                {/* Effet holographique */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Badge featured */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-current" />
                    Phare
                  </div>
                )}

                {/* Badge statut */}
                <div className={`absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(project.status).bg} ${getStatusColor(project.status).border} ${getStatusColor(project.status).text}`}>
                  {project.status === 'terminé' ? 'Terminé' : 
                   project.status === 'en-cours' ? 'En cours' : 'En élaboration'}
                </div>

                {/* Image avec overlay interactif */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Actions en survol */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-200"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <AnimatedIcon icon={Eye} size={20} color="#1f2937" animation="hover" />
                    </motion.button>
                    
                    {project.github && (
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-200"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatedIcon icon={Github} size={20} color="#1f2937" animation="hover" />
                      </motion.a>
                    )}
                    
                    {project.demo && (
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:scale-110 transition-transform duration-200"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <AnimatedIcon icon={ExternalLink} size={20} color="#1f2937" animation="hover" />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Contenu */}
                <div className="relative z-10 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-lg flex items-center justify-center">
                      {getProjectIcon(project)}
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description.split('\n')[0]}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs font-medium border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Métriques */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal de détail de projet */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-cyan-400/30"
                onClick={(e) => e.stopPropagation()}
              >
                {/* En-tête du modal */}
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-80 object-cover rounded-t-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl" />
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors duration-200"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                  
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border mb-4 ${getStatusColor(selectedProject.status).bg} ${getStatusColor(selectedProject.status).border} ${getStatusColor(selectedProject.status).text}`}>
                      {selectedProject.status === 'terminé' ? 'Terminé' : 
                       selectedProject.status === 'en-cours' ? 'En cours' : 'En élaboration'}
                    </div>
                    
                    <h2 className="text-4xl font-bold text-white mb-2">
                      {selectedProject.title}
                    </h2>
                  </div>
                </div>

                {/* Contenu du modal */}
                <div className="p-8">
                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Description */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="prose prose-gray max-w-none">
                        {selectedProject.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="text-gray-300 leading-relaxed mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-xl font-bold text-white mb-4">Arsenal Technologique</h4>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {selectedProject.technologies.map((tech) => (
                            <div
                              key={tech}
                              className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 rounded-xl text-sm font-medium text-cyan-300 text-center hover:scale-105 transition-transform duration-200"
                            >
                              {tech}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Métriques */}
                      {selectedProject.metrics && (
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50">
                          <h4 className="text-xl font-bold text-white mb-4">Performances</h4>
                          <div className="space-y-4">
                            {Object.entries(selectedProject.metrics).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between">
                                <span className="text-gray-400 capitalize">{key}</span>
                                <span className="font-bold text-cyan-400">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-3">
                        {selectedProject.demo && (
                          <motion.a
                            href={selectedProject.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl font-semibold text-white hover:scale-105 transition-transform duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-5 h-5" />
                            Voir la démo
                          </motion.a>
                        )}
                        
                        {selectedProject.github && (
                          <motion.a
                            href={selectedProject.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-gray-600 rounded-2xl font-semibold text-white hover:border-cyan-400 hover:scale-105 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-5 h-5" />
                            Code source
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FuturisticProjects;
