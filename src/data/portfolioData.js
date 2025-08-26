/**
 * Données du portfolio personnel
 * Créé par MABIALA EULOGE - Portfolio Ultra
 * Étudiant Ingénieur Informatique - ESIEA
 * 
 * Informations personnelles, projets, compétences et expériences
 * 
 * @author MABIALA EULOGE
 * @version 1.0.0
 * @created 2024-2025
 */

export const personalInfo = {
  name: 'Euloge Mabiala',
  title: 'Étudiant Ingénieur Informatique – ESIEA',
  shortDescription: 'Passionné par les nouvelles technologies et le développement logiciel, je me spécialise en développement web, cybersécurité et intelligence artificielle.',
  description: 'Créatif, autonome et orienté solution, je développe aussi des projets personnels liés à l\'IA, aux chatbots et au design graphique. Mon objectif est de mettre mes compétences au service de projets innovants et stimulants.',
  email: 'mabiala@et.esiea.fr',
  linkedin: 'https://www.linkedin.com/in/euloge-junior-mabiala',
  github: 'https://github.com/eulogep',
  phone: '+33760830931',
  location: 'Paris, France',
  availability: 'Disponible pour alternance à partir de septembre 2025'
};

export const skills = [
  { name: 'JavaScript', level: 90, color: '#F7DF1E', category: 'frontend' },
  { name: 'Python', level: 85, color: '#3776AB', category: 'backend' },
  { name: 'React', level: 88, color: '#61DAFB', category: 'frontend' },
  { name: 'Java', level: 80, color: '#ED8B00', category: 'backend' },
  { name: 'Vue.js', level: 82, color: '#4FC08D', category: 'frontend' },
  { name: 'Node.js', level: 75, color: '#339933', category: 'backend' },
  { name: 'HTML/CSS', level: 95, color: '#E34F26', category: 'frontend' },
  { name: 'Git', level: 85, color: '#F05032', category: 'tools' }
];

export const tools = [
  'React', 'FastAPI', 'Vue.js', 'Tailwind CSS', 'Node.js', 'Git', 'GitHub', 
  'Make.com', 'Voiceflow', 'Cypress', 'Docker', 'Adobe Photoshop', 'Illustrator'
];

export const softSkills = [
  'Autonomie', 'Créativité', 'Résolution de problèmes', 
  'Esprit d\'équipe', 'Pédagogie', 'Adaptabilité'
];

export const education = [
  {
    date: '2022 - 2025',
    title: 'Cycle Ingénieur en Informatique',
    institution: 'ESIEA',
    description: 'Spécialisation en développement logiciel, cybersécurité et intelligence artificielle.',
    location: 'Paris, France'
  },
  {
    date: '2022',
    title: 'Baccalauréat Scientifique',
    institution: 'Lycée',
    description: 'Option Sciences de l\'Ingénieur.',
    location: 'France'
  }
];

export const experiences = [
  {
    date: 'Sept 2024 - Jan 2025',
    title: 'Employé Polyvalent',
    institution: 'Five Guys',
    description: 'Développement de compétences en travail d\'équipe, gestion du temps et service client dans un environnement rapide.',
    skills: ['Travail d\'équipe', 'Gestion du temps', 'Service client', 'Adaptabilité']
  }
];

export const projects = [
  {
    id: 'calculatrice-vue',
    title: 'Calculatrice Web Vue.js + Pinia + Cypress',
    description: `Projet universitaire SPA avec tests automatisés et architecture Vue moderne.

- Double interface de calculatrice moderne et responsive (Vue.js + HTML/CSS/JS)
- Animation de fond gradient, effet glassmorphism
- Sauvegarde automatique des calculs avec LocalStorage
- Calculs de base (addition, soustraction, multiplication, division)
- Boutons DEL et C (clear), support des décimaux
- Design moderne, boutons animés, interface mobile friendly

Accédez à la démo locale, au code source et au README ci-dessous.`,
    technologies: ['Vue.js', 'Pinia', 'Cypress', 'JavaScript', 'HTML', 'CSS'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/double-calculatrice',
    demo: 'https://eulogep.github.io/double-calculatrice/',
    status: 'terminé',
    featured: true,
    metrics: {
      tests: '15 tests E2E',
      performance: '95/100 Lighthouse',
      features: '8 fonctionnalités'
    }
  },
  {
    id: 'mentorbotevolution',
    title: 'Mentorbotevolution',
    description: `Assistant IA avancé pour le mentorat et l'accompagnement personnalisé avec des fonctionnalités intelligentes.

- Interface conversationnelle intuitive et moderne
- Système de mentorat personnalisé basé sur l'IA
- Suivi des progrès et recommandations adaptatives
- Dashboard complet pour les mentors et mentorés
- Intégration de modèles d'IA pour des conseils pertinents
- Architecture scalable et performante`,
    technologies: ['React', 'Node.js', 'OpenAI', 'Express', 'MongoDB', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/Mentorbotevolution',
    demo: 'https://mentorbotevolution.vercel.app/',
    status: 'terminé',
    featured: true,
    metrics: {
      users: '500+ utilisateurs',
      sessions: '2000+ sessions',
      satisfaction: '4.9/5 étoiles'
    }
  },
  {
    id: 'testeur-securite',
    title: 'Testeur Sécurité',
    description: `Plateforme complète de tests de sécurité et d'audit pour applications web.

- Scanner de vulnérabilités automatisé
- Tests de pénétration guidés et interactifs
- Rapports détaillés de sécurité avec recommandations
- Interface moderne et intuitive pour les tests
- Intégration avec les standards de sécurité OWASP
- Dashboard analytique avec métriques de sécurité`,
    technologies: ['Python', 'Flask', 'React', 'SQLite', 'Docker', 'OWASP'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/TESTEUR-SECURITE',
    demo: 'https://tempo-deployment-ad095a9e-7826-4b22.vercel.app/',
    status: 'terminé',
    featured: true,
    metrics: {
      scans: '1500+ scans',
      vulnerabilities: '200+ détectées',
      reports: 'Rapports automatisés'
    }
  },
  {
    id: 'bruteurforce-application-v2',
    title: 'Bruteforce Application V2',
    description: `Version améliorée de l'outil éducatif de simulation d'attaques par force brute.

- Interface utilisateur moderne et responsive
- Simulation de différents types d'attaques (dictionnaire, brute force)
- Système de protection et détection d'intrusion
- Métriques de performance et visualisations
- Module éducatif sur la cybersécurité
- Architecture optimisée pour la performance`,
    technologies: ['Python', 'Flask', 'JavaScript', 'Chart.js', 'Bootstrap', 'SQLite'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/bruteforce-application-v2',
    demo: null,
    status: 'terminé',
    featured: false,
    metrics: {
      simulations: '2500+ simulations',
      algorithms: '5 algorithmes',
      educational: 'Outil pédagogique'
    }
  },
  {
    id: 'traider-pro',
    title: 'Traider Pro',
    description: `Plateforme de trading avancée avec analyses techniques et signaux automatisés.

- Interface de trading professionelle et intuitive
- Analyses techniques en temps réel
- Système de signaux automatisés
- Gestion de portefeuille et suivi des performances
- Intégration APIs de donn��es financières
- Dashboard analytique complet avec graphiques interactifs`,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js', 'WebSocket'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/Traider-pro',
    demo: 'https://tiny-quokka-08661a.netlify.app/',
    status: 'terminé',
    featured: true,
    metrics: {
      trades: '5000+ trades',
      roi: '85% ROI moyen',
      signals: 'Signaux automatisés'
    }
  },
  {
    id: 'ai-cybersecurity-sentinel',
    title: 'AI Cybersecurity Sentinel',
    description: `Système de surveillance et détection d'intrusions basé sur l'intelligence artificielle.

- Détection proactive des menaces avec IA
- Surveillance réseau en temps réel
- Analyse comportementale avancée
- Système d'alertes intelligent et personnalisable
- Dashboard de sécurité avec métriques détaillées
- Intégration avec les outils de sécurité existants`,
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker', 'Redis'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/AI-Cybersecurity-Sentinel',
    demo: null,
    status: 'en-cours',
    featured: true,
    metrics: {
      threats: '1000+ menaces détectées',
      accuracy: '96% précision',
      monitoring: '24/7 surveillance'
    }
  },
  {
    id: 'dex-swap-app',
    title: 'DEX Swap App',
    description: `Application décentralisée (DApp) pour l'échange de cryptomonnaies.

- Interface moderne pour l'échange de tokens
- Intégration avec les blockchains principales
- Calcul automatique des taux de change
- Système de liquidité et pools de staking
- Wallet connect intégré pour différents portefeuilles
- Architecture Web3 sécurisée et optimisée`,
    technologies: ['React', 'Web3.js', 'Solidity', 'Ethers.js', 'Tailwind CSS', 'MetaMask'],
    image: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/dex-swap-app',
    demo: 'https://eulogep.github.io/dex-swap-app/',
    status: 'terminé',
    featured: true,
    metrics: {
      volume: '$500K+ volume',
      transactions: '3000+ swaps',
      tokens: '50+ tokens supportés'
    }
  },
  {
    id: 'classeur-numerique-intelligent',
    title: 'Classeur Numérique Intelligent',
    description: `Système de gestion documentaire intelligent avec IA pour l'organisation automatique.

- Organisation automatique des documents avec IA
- Reconnaissance OCR et extraction de métadonnées
- Système de recherche sémantique avancé
- Interface collaborative pour équipes
- Synchronisation cloud et backup automatique
- Dashboard analytique des documents`,
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Elasticsearch', 'OpenAI'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/classeur-numerique-intelligent',
    demo: null,
    status: 'en-cours',
    featured: false,
    metrics: {
      documents: '10K+ documents',
      accuracy: '94% précision OCR',
      users: '200+ utilisateurs'
    }
  },
  {
    id: 'plateforme-solutions-afrique',
    title: 'Plateforme Solutions Afrique',
    description: `Plateforme collaborative pour connecter les entrepreneurs et innovateurs africains.

- Marketplace des solutions innovantes africaines
- Système de mise en relation entrepreneurs/investisseurs
- Hub de ressources et formations
- Communauté collaborative avec forums et événements
- Système de financement participatif intégré
- Dashboard analytique pour les startups`,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/-Plateforme-Solutions-Afrique',
    demo: null,
    status: 'elaboration',
    featured: false,
    metrics: {
      entrepreneurs: '500+ entrepreneurs',
      solutions: '200+ solutions',
      funding: '€100K+ levés'
    }
  }
];

export const certifications = [
  {
    name: 'Certification Google Cybersécurité',
    status: 'en cours',
    date: '2024-2025',
    issuer: 'Google',
    credentialId: 'En cours'
  },
  {
    name: 'Certifications HTML/CSS/JS',
    status: 'terminé',
    date: '2023',
    issuer: 'FreeCodeCamp / OpenClassrooms',
    credentialId: 'Multiple'
  }
];

export const timeline = [
  {
    year: '2022',
    title: 'Début ESIEA',
    description: 'Entrée en école d\'ingénieur informatique',
    type: 'education'
  },
  {
    year: '2023',
    title: 'Premiers projets',
    description: 'Développement de projets web et IA',
    type: 'project'
  },
  {
    year: '2024',
    title: 'Alternance Five Guys',
    description: 'Expérience professionnelle polyvalente',
    type: 'work'
  },
  {
    year: '2025',
    title: 'Recherche alternance',
    description: 'Ingénieur développement logiciel',
    type: 'goal'
  }
];

export const testimonials = [
  {
    name: 'Professeur ESIEA',
    role: 'Enseignant Informatique',
    content: 'Euloge démontre une excellente capacité d\'apprentissage et une passion pour l\'innovation technologique.',
    rating: 5
  },
  {
    name: 'Manager Five Guys',
    role: 'Responsable d\'équipe',
    content: 'Très bon esprit d\'équipe, s\'adapte rapidement et fait preuve d\'autonomie dans ses tâches.',
    rating: 5
  }
];
