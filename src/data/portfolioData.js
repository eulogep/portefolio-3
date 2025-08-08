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
    github: '/projet en plus/',
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
    id: 'chatbot-voiceflow',
    title: 'Chatbot IA Voiceflow',
    description: 'Assistant éducatif et commercial avec intégration API, Google Sheets, et Make.com.',
    technologies: ['Voiceflow', 'API', 'Google Sheets', 'Make.com'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/ai-chatbot-voiceflow',
    demo: 'https://voiceflow-chatbot-demo.vercel.app/',
    status: 'en-cours',
    featured: true,
    metrics: {
      conversations: '500+ conversations',
      accuracy: '92% précision',
      integrations: '3 APIs'
    }
  },
  {
    id: 'beewise-dashboard',
    title: 'BeeWise – Dashboard IoT Apiculture',
    description: 'Collecte de données API, Redis, Bot Discord, et visualisation Python.',
    technologies: ['Python', 'Redis', 'Discord Bot', 'IoT'],
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&h=600&fit=crop',
    github: 'https://gitlab.com/mabialaeulogejunior-group/beewise-dashboard',
    demo: 'https://beewise-demo.vercel.app/',
    status: 'elaboration',
    featured: false,
    metrics: {
      sensors: '12 capteurs',
      data: '10k+ points de données',
      alerts: 'Alertes temps réel'
    }
  },
  {
    id: 'hip-hop-master',
    title: 'Hip-Hop Master – Formation Danse',
    description: 'Site web de formation en danse hip-hop avec système de réservation et gestion des cours.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/hip-hop-master',
    demo: 'https://hip-hop-master.vercel.app/',
    status: 'terminé',
    featured: true,
    metrics: {
      users: '200+ utilisateurs',
      bookings: '150+ réservations',
      revenue: 'Système de paiement'
    }
  },
  {
    id: 'mentorbot-evolution',
    title: 'MentorBot Evolution',
    description: 'Assistant IA avancé pour le mentorat et l\'accompagnement personnalisé.',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/mentorbot-evolution',
    demo: 'https://eulogep.github.io/mentorbotevolution/',
    status: 'en-cours',
    featured: false,
    metrics: {
      sessions: '300+ sessions',
      satisfaction: '4.8/5 étoiles',
      features: 'IA conversationnelle'
    }
  },
  {
    id: 'simulateur-brute-force',
    title: 'Simulateur Brute Force',
    description: 'Outil éducatif pour comprendre les attaques par force brute.',
    technologies: ['Python', 'Flask', 'JavaScript', 'Bootstrap'],
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
    github: 'https://github.com/eulogep/simulateur-brute-force',
    demo: 'https://eulogep.github.io/Simulateur-Brute-Force/',
    status: 'terminé',
    featured: true,
    metrics: {
      simulations: '1000+ simulations',
      educational: 'Outil pédagogique',
      security: 'Sensibilisation sécurité'
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

