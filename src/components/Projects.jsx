import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github,
  ExternalLink,
  X,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  Clock,
  FileText,
  Filter,
  Sparkles,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import ShinyText from '@/components/ui/shiny-text';
import SplitText from '@/components/ui/split-text';
import MagneticButton from '@/components/ui/magnetic-button';
import ParticleButton from '@/components/ui/particle-button';
import { projects } from '../data/portfolioData';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'terminé':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'en-cours':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'elaboration':
        return <FileText className="w-4 h-4 text-blue-500" />;
      default:
        return <FileText className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'terminé':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'en-cours':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'elaboration':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filter === 'all') return true;
    if (filter === 'featured') return project.featured;
    return project.status === filter;
  });

  const filterOptions = [
    { value: 'all', label: 'Tous les projets', count: projects.length },
    { value: 'featured', label: 'Projets phares', count: projects.filter(p => p.featured).length },
    { value: 'terminé', label: 'Terminés', count: projects.filter(p => p.status === 'terminé').length },
    { value: 'en-cours', label: 'En cours', count: projects.filter(p => p.status === 'en-cours').length },
    { value: 'elaboration', label: 'En élaboration', count: projects.filter(p => p.status === 'elaboration').length }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <ShinyText className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            <SplitText delay={0.1}>
              Mes Projets
            </SplitText>
          </ShinyText>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          />
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Une sélection de projets qui démontrent mes compétences techniques
            et ma passion pour l'innovation technologique.
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filterOptions.map((option, index) => (
            <MagneticButton key={option.value} strength={0.2}>
              <motion.button
                onClick={() => setFilter(option.value)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 flex items-center gap-2 relative overflow-hidden ${
                  filter === option.value
                    ? 'bg-gradient-to-r from-blue-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-orange-400/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.6 }}
                />
                <Filter className="w-4 h-4 relative z-10" />
                <span className="relative z-10">{option.label}</span>
                <span className={`text-xs px-2 py-1 rounded-full relative z-10 ${
                  filter === option.value
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {option.count}
                </span>
              </motion.button>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
                whileHover={{ y: -10 }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <Star className="w-3 h-3" fill="currentColor" />
                    <span>Phare</span>
                    <Sparkles className="w-3 h-3" />
                  </motion.div>
                )}

                {/* Status Badge */}
                <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(project.status)}`}>
                  {getStatusIcon(project.status)}
                  {project.status === 'terminé' ? 'Terminé' : 
                   project.status === 'en-cours' ? 'En cours' : 'En élaboration'}
                </div>

                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <MagneticButton strength={0.4}>
                      <motion.button
                        onClick={() => setSelectedProject(project)}
                        className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 border border-white/20"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <ExternalLink className="w-5 h-5 text-gray-700" />
                      </motion.button>
                    </MagneticButton>
                    {project.github && (
                      <MagneticButton strength={0.4}>
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors duration-200 border border-white/20"
                          whileHover={{ scale: 1.2, rotate: -10 }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ scale: 0, rotate: 180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          <Github className="w-5 h-5 text-gray-700" />
                        </motion.a>
                      </MagneticButton>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description.split('\n')[0]}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Metrics */}
                  {project.metrics && (
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                      {Object.entries(project.metrics).slice(0, 2).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Detail Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(selectedProject.status)}`}>
                    {getStatusIcon(selectedProject.status)}
                    {selectedProject.status === 'terminé' ? 'Terminé' : 
                     selectedProject.status === 'en-cours' ? 'En cours' : 'En élaboration'}
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {selectedProject.title}
                  </h2>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Description */}
                    <div className="lg:col-span-2">
                      <div className="prose prose-gray max-w-none">
                        {selectedProject.description.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {/* Technologies */}
                      <div className="mt-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Technologies utilisées</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                      {/* Metrics */}
                      {selectedProject.metrics && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">Métriques</h4>
                          <div className="space-y-2">
                            {Object.entries(selectedProject.metrics).map(([key, value]) => (
                              <div key={key} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 capitalize">{key}</span>
                                <span className="font-medium text-gray-900">{value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="space-y-3">
                        {selectedProject.demo && (
                          <ParticleButton
                            className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600"
                            onClick={() => window.open(selectedProject.demo, '_blank', 'noopener noreferrer')}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Voir la démo
                          </ParticleButton>
                        )}
                        {selectedProject.github && (
                          <MagneticButton strength={0.3} className="w-full">
                            <Button
                              asChild
                              variant="outline"
                              className="w-full hover:bg-gray-50 transition-all duration-300"
                            >
                              <a href={selectedProject.github} target="_blank" rel="noopener noreferrer">
                                <Github className="w-4 h-4 mr-2" />
                                Code source
                              </a>
                            </Button>
                          </MagneticButton>
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

export default Projects;
