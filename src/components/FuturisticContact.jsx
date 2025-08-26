import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, Phone, MapPin, Send, Github, Linkedin, 
  MessageCircle, Zap, Globe, Rocket, Star,
  CheckCircle, AlertCircle, User, Building
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger);

const FuturisticContact = () => {
  const containerRef = useRef();
  const formRef = useRef();
  const orbsRef = useRef([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animation des orbes flottantes
      orbsRef.current.forEach((orb, index) => {
        if (orb) {
          gsap.to(orb, {
            y: -30,
            x: Math.sin(index) * 50,
            rotation: 360,
            duration: 4 + index,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1
          });
        }
      });

      // Animation du formulaire
      if (formRef.current) {
        const formElements = formRef.current.querySelectorAll('.form-element');
        formElements.forEach((element, index) => {
          gsap.fromTo(element,
            {
              y: 50,
              opacity: 0,
              rotationX: 30
            },
            {
              y: 0,
              opacity: 1,
              rotationX: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
              },
              delay: index * 0.1
            }
          );
        });
      }

      // Animation du scan holographique
      const scanLine = containerRef.current.querySelector('.scan-line');
      if (scanLine) {
        gsap.to(scanLine, {
          y: 400,
          duration: 3,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    // Simulation d'envoi de formulaire
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => {
        setFormStatus('idle');
        setFormData({
          name: '',
          email: '',
          company: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 2000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: 'from-cyan-400 to-blue-600',
      description: 'Contactez-moi directement'
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: 'from-purple-400 to-pink-600',
      description: 'Appelez-moi'
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: personalInfo.location,
      href: '#',
      color: 'from-green-400 to-emerald-600',
      description: 'Ma région'
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personalInfo.github,
      color: 'hover:bg-gray-700',
      description: 'Mes projets open source'
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personalInfo.linkedin,
      color: 'hover:bg-blue-600',
      description: 'Mon réseau professionnel'
    },
    {
      icon: Globe,
      label: 'Portfolio',
      href: '#',
      color: 'hover:bg-cyan-600',
      description: 'Explorez mes créations'
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="contact" 
      className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 overflow-hidden"
    >
      {/* Fond holographique avec scan */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-400/10 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-400/10 via-transparent to-transparent" />
        
        {/* Ligne de scan holographique */}
        <div className="scan-line absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />
      </div>

      {/* Orbes flottantes */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            ref={el => orbsRef.current[i] = el}
            className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-20 blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Grille énergétique */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.5)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
            <MessageCircle className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-400 font-medium">Contact</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Connectons
            </span>
            <br />
            <span className="text-white">Le Futur</span>
          </h2>
          
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto mb-8 rounded-full" />
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Prêt à transformer vos idées en réalité digitale ? 
            Collaborons pour créer l'impossible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Informations de contact */}
          <div className="space-y-8">
            {/* Méthodes de contact */}
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group block"
                >
                  <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                    
                    <div className="relative z-10 flex items-center gap-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${method.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <method.icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                          {method.label}
                        </h3>
                        <p className="text-gray-400 text-sm mb-1">{method.description}</p>
                        <p className="text-gray-300 font-medium">{method.value}</p>
                      </div>
                      
                      <div className="w-8 h-8 bg-gray-700/50 rounded-full flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors duration-300">
                        <Zap className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Réseaux sociaux */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <Star className="w-6 h-6 text-cyan-400" />
                Réseaux Sociaux
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative p-4 bg-gray-800/40 rounded-xl border border-gray-700/30 hover:border-cyan-400/50 transition-all duration-300 text-center ${social.color}`}
                    whileHover={{ y: -5, scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <social.icon className="w-8 h-8 text-gray-300 mx-auto mb-2 group-hover:text-white transition-colors duration-300" />
                    <p className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                      {social.label}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{social.description}</p>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* CTA disponibilité */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur-xl border border-cyan-400/30 rounded-2xl p-6 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-400/10 animate-pulse" />
              
              <div className="relative z-10">
                <div className="w-3 h-3 bg-green-400 rounded-full mx-auto mb-3 animate-pulse" />
                <h3 className="text-lg font-bold text-white mb-2">Disponible pour missions</h3>
                <p className="text-cyan-300 text-sm">{personalInfo.availability}</p>
              </div>
            </motion.div>
          </div>

          {/* Formulaire de contact futuriste */}
          <div ref={formRef} className="relative">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <Rocket className="w-8 h-8 text-cyan-400" />
                  <h3 className="text-2xl font-bold text-white">Lançons un projet</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="form-element">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Nom complet
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        placeholder="Votre nom"
                      />
                    </div>
                    
                    <div className="form-element">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Building className="w-4 h-4 inline mr-2" />
                      Entreprise (optionnel)
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                      placeholder="Votre entreprise"
                    />
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Zap className="w-4 h-4 inline mr-2" />
                      Sujet
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white focus:border-cyan-400 focus:outline-none transition-colors duration-300"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="alternance">Alternance / Stage</option>
                      <option value="projet">Collaboration projet</option>
                      <option value="freelance">Mission freelance</option>
                      <option value="conseil">Conseil technique</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>

                  <div className="form-element">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <MessageCircle className="w-4 h-4 inline mr-2" />
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:border-cyan-400 focus:outline-none transition-colors duration-300 resize-none"
                      placeholder="Décrivez votre projet ou votre demande..."
                    />
                  </div>

                  <div className="form-element">
                    <motion.button
                      type="submit"
                      disabled={formStatus === 'loading'}
                      className={`w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                        formStatus === 'loading'
                          ? 'bg-gray-600 cursor-not-allowed'
                          : formStatus === 'success'
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:scale-105'
                      }`}
                      whileHover={formStatus === 'idle' ? { scale: 1.05 } : {}}
                      whileTap={formStatus === 'idle' ? { scale: 0.95 } : {}}
                    >
                      {formStatus === 'loading' && (
                        <>
                          <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      )}
                      {formStatus === 'success' && (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Message envoyé !
                        </>
                      )}
                      {formStatus === 'idle' && (
                        <>
                          <Send className="w-5 h-5" />
                          Envoyer le message
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-green-500/20 border border-green-400/30 rounded-xl text-center"
                  >
                    <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <p className="text-green-400 font-medium">
                      Merci ! Je vous répondrai dans les plus brefs délais.
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FuturisticContact;
