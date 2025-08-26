import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { User, Target, Zap, Calendar, Award, TrendingUp, Globe, Cpu } from 'lucide-react';
import { personalInfo, timeline, education, experiences } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const FuturisticAbout = () => {
  const containerRef = useRef();
  const cardsRef = useRef([]);
  const timelineRef = useRef();
  const statsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation des cartes avec effet de révélation
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(card, 
            {
              y: 100,
              opacity: 0,
              rotationX: 45,
              scale: 0.8
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.2
            }
          );
        }
      });

      // Animation de la timeline
      if (timelineRef.current) {
        const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
          gsap.fromTo(item,
            {
              x: index % 2 === 0 ? -100 : 100,
              opacity: 0
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );
        });
      }

      // Animation des statistiques avec compteurs
      statsRef.current.forEach((stat, index) => {
        if (stat) {
          const number = stat.querySelector('.stat-number');
          const target = parseInt(number.dataset.target);
          
          gsap.fromTo(stat,
            { scale: 0.5, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: stat,
                start: "top 80%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );

          gsap.to({}, {
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: stat,
              start: "top 80%",
              toggleActions: "play none none reverse"
            },
            onUpdate: function() {
              const current = Math.round(target * this.progress());
              number.textContent = current + (number.dataset.suffix || '');
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: 50, suffix: '+', label: 'Projets Réalisés', icon: Globe },
    { number: 95, suffix: '%', label: 'Taux de Réussite', icon: TrendingUp },
    { number: 8, suffix: '', label: 'Technologies Maîtrisées', icon: Cpu },
    { number: 24, suffix: '/7', label: 'Passion Continue', icon: Zap }
  ];

  return (
    <section 
      ref={containerRef}
      id="about" 
      className="relative py-20 bg-gradient-to-b from-slate-900 via-gray-900 to-slate-900 overflow-hidden"
    >
      {/* Fond animé */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent" />
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
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <User className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">À Propos</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Architecte
            </span>
            <br />
            <span className="text-white">du Futur</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ingénieur innovant passionné par les technologies émergentes, 
            je transforme les idées en solutions numériques révolutionnaires.
          </p>
        </motion.div>

        {/* Statistiques animées */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              ref={el => statsRef.current[index] = el}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 text-center hover:border-cyan-400/50 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                
                <div 
                  className="stat-number text-3xl font-black text-white mb-2"
                  data-target={stat.number}
                  data-suffix={stat.suffix}
                >
                  0{stat.suffix}
                </div>
                
                <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                
                {/* Effet de lueur */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-purple-400/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          ))}
        </div>

        {/* Contenu principal */}
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Présentation personnelle */}
          <div className="space-y-8">
            <div 
              ref={el => cardsRef.current[0] = el}
              className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Ma Mission</h3>
                </div>
                
                <p className="text-gray-300 leading-relaxed mb-6">
                  {personalInfo.description}
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2" />
                    <div>
                      <h4 className="text-cyan-400 font-semibold mb-1">Vision</h4>
                      <p className="text-gray-300 text-sm">
                        Révolutionner l'interaction homme-machine par l'innovation technologique
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 p-4 bg-gray-800/40 rounded-xl border border-gray-700/30">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
                    <div>
                      <h4 className="text-purple-400 font-semibold mb-1">Objectif</h4>
                      <p className="text-gray-300 text-sm">
                        {personalInfo.availability}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Formation et expérience */}
            <div className="space-y-6">
              <div 
                ref={el => cardsRef.current[1] = el}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-blue-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <Award className="w-6 h-6 text-cyan-400" />
                    <h4 className="text-xl font-bold text-white">Formation</h4>
                  </div>
                  
                  {education.map((edu, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-cyan-300">{edu.title}</h5>
                        <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                          {edu.date}
                        </span>
                      </div>
                      <p className="text-blue-400 font-medium text-sm mb-1">{edu.institution}</p>
                      <p className="text-gray-400 text-sm">{edu.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                ref={el => cardsRef.current[2] = el}
                className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-purple-400/50 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 to-pink-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-purple-400" />
                    <h4 className="text-xl font-bold text-white">Expérience</h4>
                  </div>
                  
                  {experiences.map((exp, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-purple-300">{exp.title}</h5>
                        <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                          {exp.date}
                        </span>
                      </div>
                      <p className="text-pink-400 font-medium text-sm mb-1">{exp.institution}</p>
                      <p className="text-gray-400 text-sm mb-2">{exp.description}</p>
                      {exp.skills && (
                        <div className="flex flex-wrap gap-1">
                          {exp.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded border border-purple-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Timeline interactive futuriste */}
          <div 
            ref={timelineRef}
            className="relative"
          >
            <div 
              ref={el => cardsRef.current[3] = el}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 h-full"
            >
              <div className="flex items-center gap-3 mb-8">
                <Calendar className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Parcours Temporel</h3>
              </div>
              
              <div className="relative">
                {/* Ligne de temps centrale */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 via-purple-400 to-cyan-400 opacity-50" />
                
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className="timeline-item relative flex items-start mb-8 last:mb-0"
                  >
                    {/* Indicateur temporel */}
                    <div className="relative z-10 w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg mr-6">
                      <div className="absolute inset-1 bg-gray-900 rounded-xl flex items-center justify-center">
                        <span className="text-sm">{item.year}</span>
                      </div>
                    </div>
                    
                    {/* Contenu */}
                    <div className="flex-1 bg-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-white">{item.title}</h4>
                        <div className={`w-3 h-3 rounded-full ${
                          item.type === 'education' ? 'bg-cyan-400' :
                          item.type === 'work' ? 'bg-purple-400' :
                          item.type === 'goal' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`} />
                      </div>
                      <p className="text-gray-300 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticAbout;
