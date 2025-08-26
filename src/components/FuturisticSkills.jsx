import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, Database, Wrench, Brain, Users, Lightbulb, 
  Zap, Cpu, Globe, Shield, Rocket, Star 
} from 'lucide-react';
import { skills, tools, softSkills } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const FuturisticSkills = () => {
  const containerRef = useRef();
  const skillBarsRef = useRef([]);
  const radarRef = useRef();
  const cardsRef = useRef([]);
  const particlesRef = useRef([]);
  const [activeSkill, setActiveSkill] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation des barres de compétences avec effet de progression
      skillBarsRef.current.forEach((bar, index) => {
        if (bar) {
          const progressBar = bar.querySelector('.skill-progress');
          const percentage = bar.dataset.skill || 0;
          
          gsap.fromTo(progressBar,
            { width: '0%', opacity: 0 },
            {
              width: `${percentage}%`,
              opacity: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: bar,
                start: "top 80%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );

          // Effet de pulsation sur les barres
          gsap.to(progressBar, {
            boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)",
            duration: 2,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
            scrollTrigger: {
              trigger: bar,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          });
        }
      });

      // Animation du radar chart
      if (radarRef.current) {
        const radarElements = radarRef.current.querySelectorAll('.radar-point');
        radarElements.forEach((point, index) => {
          gsap.fromTo(point,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: radarRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );
        });
      }

      // Animation des cartes avec effet 3D
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card,
            {
              rotationY: 45,
              z: -100,
              opacity: 0
            },
            {
              rotationY: 0,
              z: 0,
              opacity: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.2
            }
          );
        }
      });

      // Animation des particules flottantes
      particlesRef.current.forEach((particle, index) => {
        if (particle) {
          gsap.to(particle, {
            y: -50,
            x: Math.random() * 100 - 50,
            rotation: 360,
            opacity: 0,
            duration: 4 + Math.random() * 2,
            ease: "power2.out",
            repeat: -1,
            delay: Math.random() * 2
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const getSkillIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <Code className="w-6 h-6" />;
      case 'backend':
        return <Database className="w-6 h-6" />;
      case 'tools':
        return <Wrench className="w-6 h-6" />;
      default:
        return <Code className="w-6 h-6" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'frontend':
        return { from: 'from-cyan-400', to: 'to-blue-600', bg: 'bg-cyan-400' };
      case 'backend':
        return { from: 'from-purple-400', to: 'to-pink-600', bg: 'bg-purple-400' };
      case 'tools':
        return { from: 'from-yellow-400', to: 'to-orange-600', bg: 'bg-yellow-400' };
      default:
        return { from: 'from-gray-400', to: 'to-gray-600', bg: 'bg-gray-400' };
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categoryNames = {
    frontend: 'Interface Futuriste',
    backend: 'Architecture Backend',
    tools: 'Arsenal Technologique'
  };

  const skillLevels = [
    { label: 'Expert', min: 90, color: 'from-green-400 to-emerald-600' },
    { label: 'Avancé', min: 80, color: 'from-blue-400 to-cyan-600' },
    { label: 'Intermédiaire', min: 70, color: 'from-yellow-400 to-orange-600' },
    { label: 'Débutant', min: 0, color: 'from-red-400 to-pink-600' }
  ];

  return (
    <section 
      ref={containerRef}
      id="skills" 
      className="relative py-20 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 overflow-hidden"
    >
      {/* Particules flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={el => particlesRef.current[i] = el}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Fond avec grille */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* En-tête de section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-purple-400/10 border border-purple-400/30 rounded-full mb-6">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-purple-400 font-medium">Compétences</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Arsenal
            </span>
            <br />
            <span className="text-white">Technologique</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Maîtrise d'un écosystème technologique avancé pour créer des solutions 
            innovantes et performantes.
          </p>
        </motion.div>

        {/* Dashboard des compétences techniques */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
            const colors = getCategoryColor(category);
            return (
              <div
                key={category}
                ref={el => cardsRef.current[categoryIndex] = el}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.from}/5 ${colors.to}/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className={`w-14 h-14 bg-gradient-to-br ${colors.from} ${colors.to} rounded-2xl flex items-center justify-center shadow-lg`}>
                      {getSkillIcon(category)}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {categoryNames[category]}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {categorySkills.length} technologies
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {categorySkills.map((skill, index) => (
                      <div
                        key={skill.name}
                        ref={el => skillBarsRef.current[categoryIndex * 10 + index] = el}
                        data-skill={skill.level}
                        className="group/skill cursor-pointer"
                        onMouseEnter={() => setActiveSkill(skill)}
                        onMouseLeave={() => setActiveSkill(null)}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="font-semibold text-white group-hover/skill:text-cyan-400 transition-colors duration-300">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-gray-300">
                              {skill.level}%
                            </span>
                            {skill.level >= 90 && (
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            )}
                          </div>
                        </div>
                        
                        <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden">
                          <div
                            className="skill-progress absolute top-0 left-0 h-full rounded-full"
                            style={{
                              background: `linear-gradient(90deg, ${skill.color}, ${skill.color}dd)`
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-full" />
                        </div>
                        
                        {/* Niveau de compétence */}
                        <div className="mt-2">
                          {skillLevels.map((level) => {
                            if (skill.level >= level.min) {
                              return (
                                <span
                                  key={level.label}
                                  className={`inline-block text-xs px-2 py-1 bg-gradient-to-r ${level.color} text-white rounded-full font-medium`}
                                >
                                  {level.label}
                                </span>
                              );
                            }
                            return null;
                          }).slice(0, 1)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar Chart 3D */}
        <div className="mb-16">
          <div 
            ref={radarRef}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                Vue d'Ensemble <span className="text-cyan-400">360°</span>
              </h3>
              <p className="text-gray-400">Visualisation interactive de mes compétences principales</p>
            </div>
            
            <div className="relative max-w-lg mx-auto">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                {/* Grilles concentriques */}
                {[80, 120, 160, 200].map((radius, index) => (
                  <circle
                    key={radius}
                    cx="200"
                    cy="200"
                    r={radius}
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                    className={index === 3 ? 'stroke-cyan-400/30' : ''}
                  />
                ))}
                
                {/* Lignes radiales */}
                {skills.slice(0, 6).map((_, index) => {
                  const angle = (index * 60) - 90;
                  const x = 200 + 200 * Math.cos(angle * Math.PI / 180);
                  const y = 200 + 200 * Math.sin(angle * Math.PI / 180);
                  return (
                    <line
                      key={index}
                      x1="200"
                      y1="200"
                      x2={x}
                      y2={y}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                  );
                })}
                
                {/* Points de compétences */}
                {skills.slice(0, 6).map((skill, index) => {
                  const angle = (index * 60) - 90;
                  const radius = (skill.level / 100) * 180 + 20;
                  const x = 200 + radius * Math.cos(angle * Math.PI / 180);
                  const y = 200 + radius * Math.sin(angle * Math.PI / 180);
                  
                  return (
                    <g key={skill.name}>
                      <circle
                        className="radar-point"
                        cx={x}
                        cy={y}
                        r="8"
                        fill={skill.color}
                        stroke="white"
                        strokeWidth="2"
                      />
                      <text
                        x={200 + (radius + 30) * Math.cos(angle * Math.PI / 180)}
                        y={200 + (radius + 30) * Math.sin(angle * Math.PI / 180)}
                        textAnchor="middle"
                        className="text-sm fill-white font-medium"
                        dominantBaseline="middle"
                      >
                        {skill.name}
                      </text>
                    </g>
                  );
                })}
                
                {/* Polygone de connexion */}
                <polygon
                  points={skills.slice(0, 6).map((skill, index) => {
                    const angle = (index * 60) - 90;
                    const radius = (skill.level / 100) * 180 + 20;
                    const x = 200 + radius * Math.cos(angle * Math.PI / 180);
                    const y = 200 + radius * Math.sin(angle * Math.PI / 180);
                    return `${x},${y}`;
                  }).join(' ')}
                  fill="rgba(0, 255, 255, 0.1)"
                  stroke="rgb(0, 255, 255)"
                  strokeWidth="2"
                  strokeOpacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Outils et Soft Skills */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outils technologiques */}
          <div 
            ref={el => cardsRef.current[3] = el}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Technologies Avancées</h3>
                <p className="text-gray-400">Stack technologique moderne</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group relative px-4 py-3 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-purple-400/50 transition-all duration-300 cursor-default"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-sm font-medium text-white group-hover:text-purple-300 transition-colors duration-300">
                    {tool}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Compétences humaines */}
          <div 
            ref={el => cardsRef.current[4] = el}
            className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl flex items-center justify-center">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Intelligence Humaine</h3>
                <p className="text-gray-400">Soft skills développées</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group flex items-center gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-cyan-400/50 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <span className="font-medium text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {skill}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Tooltip pour les compétences actives */}
        {activeSkill && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed top-4 right-4 z-50 bg-gray-900/95 backdrop-blur-xl border border-cyan-400/50 rounded-2xl p-6 max-w-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: activeSkill.color }}
              />
              <h4 className="text-lg font-bold text-white">{activeSkill.name}</h4>
            </div>
            <div className="text-cyan-400 text-2xl font-black mb-2">
              {activeSkill.level}%
            </div>
            <p className="text-gray-300 text-sm">
              Niveau {activeSkill.level >= 90 ? 'Expert' : 
                     activeSkill.level >= 80 ? 'Avancé' : 
                     activeSkill.level >= 70 ? 'Intermédiaire' : 'Débutant'}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FuturisticSkills;
