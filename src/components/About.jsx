import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Target, Calendar } from 'lucide-react';
import { personalInfo, timeline, education, experiences } from '../data/portfolioData';

const About = () => {
  const getTimelineIcon = (type) => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-5 h-5" />;
      case 'work':
        return <Briefcase className="w-5 h-5" />;
      case 'goal':
        return <Target className="w-5 h-5" />;
      default:
        return <Calendar className="w-5 h-5" />;
    }
  };

  const getTimelineColor = (type) => {
    switch (type) {
      case 'education':
        return 'from-blue-500 to-purple-500';
      case 'work':
        return 'from-green-500 to-blue-500';
      case 'goal':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            À Propos de Moi
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-8" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mon Parcours</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {personalInfo.description}
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Vision</h4>
                  <p className="text-gray-700">
                    Contribuer à l'innovation technologique en développant des solutions 
                    qui ont un impact positif sur la société, particulièrement dans les 
                    domaines de l'IA et de la cybersécurité.
                  </p>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border-l-4 border-orange-500">
                  <h4 className="font-semibold text-gray-900 mb-2">Objectif</h4>
                  <p className="text-gray-700">
                    {personalInfo.availability}
                  </p>
                </div>
              </div>
            </div>

            {/* Education & Experience Cards */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                  Formation
                </h4>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-gray-900">{edu.title}</h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {edu.date}
                      </span>
                    </div>
                    <p className="text-blue-600 font-medium mb-1">{edu.institution}</p>
                    <p className="text-gray-700 text-sm">{edu.description}</p>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-500" />
                  Expérience
                </h4>
                {experiences.map((exp, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-semibold text-gray-900">{exp.title}</h5>
                      <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {exp.date}
                      </span>
                    </div>
                    <p className="text-green-600 font-medium mb-1">{exp.institution}</p>
                    <p className="text-gray-700 text-sm mb-2">{exp.description}</p>
                    {exp.skills && (
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Interactive Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Timeline Interactive
              </h3>
              
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-orange-500" />
                
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative flex items-start mb-8 last:mb-0"
                  >
                    {/* Timeline Icon */}
                    <motion.div
                      className={`relative z-10 w-16 h-16 bg-gradient-to-r ${getTimelineColor(item.type)} rounded-full flex items-center justify-center text-white shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {getTimelineIcon(item.type)}
                    </motion.div>
                    
                    {/* Timeline Content */}
                    <motion.div
                      className="ml-6 flex-1"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="bg-white rounded-lg p-4 shadow-md border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{item.title}</h4>
                          <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {item.year}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm">{item.description}</p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

