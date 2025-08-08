import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Wrench, Brain, Users, Lightbulb } from 'lucide-react';
import { skills, tools, softSkills } from '../data/portfolioData';

const Skills = () => {
  const [animatedSkills, setAnimatedSkills] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedSkills(skills);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getSkillIcon = (category) => {
    switch (category) {
      case 'frontend':
        return <Code className="w-5 h-5" />;
      case 'backend':
        return <Database className="w-5 h-5" />;
      case 'tools':
        return <Wrench className="w-5 h-5" />;
      default:
        return <Code className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'frontend':
        return 'from-blue-500 to-purple-500';
      case 'backend':
        return 'from-green-500 to-blue-500';
      case 'tools':
        return 'from-orange-500 to-red-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Compétences & Expertise
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-orange-500 mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Une expertise technique solide combinée à des soft skills développées 
            pour créer des solutions innovantes et impactantes.
          </p>
        </motion.div>

        {/* Technical Skills Dashboard */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 bg-gradient-to-r ${getCategoryColor(category)} rounded-lg`}>
                  {getSkillIcon(category)}
                </div>
                <h3 className="text-xl font-bold capitalize">
                  {category === 'frontend' ? 'Frontend' : 
                   category === 'backend' ? 'Backend' : 'Outils'}
                </h3>
              </div>

              <div className="space-y-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm font-bold">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-white/30 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radar Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-16"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Vue d'ensemble des compétences</h3>
          
          <div className="relative w-full max-w-md mx-auto aspect-square">
            {/* Radar Chart Background */}
            <svg className="w-full h-full" viewBox="0 0 200 200">
              {/* Grid circles */}
              {[20, 40, 60, 80].map((radius) => (
                <circle
                  key={radius}
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              ))}
              
              {/* Grid lines */}
              {skills.slice(0, 6).map((_, index) => {
                const angle = (index * 60) - 90;
                const x = 100 + 80 * Math.cos(angle * Math.PI / 180);
                const y = 100 + 80 * Math.sin(angle * Math.PI / 180);
                return (
                  <line
                    key={index}
                    x1="100"
                    y1="100"
                    x2={x}
                    y2={y}
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="1"
                  />
                );
              })}
              
              {/* Skill points */}
              {skills.slice(0, 6).map((skill, index) => {
                const angle = (index * 60) - 90;
                const radius = (skill.level / 100) * 80;
                const x = 100 + radius * Math.cos(angle * Math.PI / 180);
                const y = 100 + radius * Math.sin(angle * Math.PI / 180);
                
                return (
                  <motion.g key={skill.name}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="4"
                      fill={skill.color}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                    />
                    <text
                      x={100 + (radius + 15) * Math.cos(angle * Math.PI / 180)}
                      y={100 + (radius + 15) * Math.sin(angle * Math.PI / 180)}
                      textAnchor="middle"
                      className="text-xs fill-white font-medium"
                    >
                      {skill.name}
                    </text>
                  </motion.g>
                );
              })}
              
              {/* Connecting lines */}
              <motion.polygon
                points={skills.slice(0, 6).map((skill, index) => {
                  const angle = (index * 60) - 90;
                  const radius = (skill.level / 100) * 80;
                  const x = 100 + radius * Math.cos(angle * Math.PI / 180);
                  const y = 100 + radius * Math.sin(angle * Math.PI / 180);
                  return `${x},${y}`;
                }).join(' ')}
                fill="rgba(0, 102, 255, 0.2)"
                stroke="#0066FF"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                transition={{ duration: 2 }}
                viewport={{ once: true }}
              />
            </svg>
          </div>
        </motion.div>

        {/* Tools & Soft Skills */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Tools */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Outils & Technologies</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tools.map((tool, index) => (
                <motion.span
                  key={tool}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-2 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-all duration-200 cursor-default"
                >
                  {tool}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold">Soft Skills</h3>
            </div>
            
            <div className="space-y-3">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200"
                >
                  <Lightbulb className="w-4 h-4 text-yellow-400" />
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

