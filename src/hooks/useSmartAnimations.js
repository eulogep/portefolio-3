import { useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement des plugins GSAP
gsap.registerPlugin(ScrollTrigger);

export const useSmartAnimations = () => {
  const [animationSettings, setAnimationSettings] = useState({
    shouldAnimate: true,
    isLowEnd: false,
    reducedMotion: false,
    animationQuality: 'high'
  });

  useEffect(() => {
    const detectCapabilities = () => {
      // Détection des préférences utilisateur
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Détection des capacités du device
      const isLowEnd = (
        navigator.hardwareConcurrency <= 2 || 
        navigator.deviceMemory <= 2 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
      
      // Détection de la performance réseau
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
      const isSlowNetwork = connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g');
      
      // Détection de la batterie
      let isLowBattery = false;
      if ('getBattery' in navigator) {
        navigator.getBattery().then((battery) => {
          isLowBattery = battery.level < 0.2 && !battery.charging;
        });
      }
      
      // Calcul de la qualité d'animation
      let quality = 'high';
      if (reducedMotion || isLowEnd || isSlowNetwork || isLowBattery) {
        quality = 'low';
      } else if (isLowEnd) {
        quality = 'medium';
      }
      
      setAnimationSettings({
        shouldAnimate: !reducedMotion && !isLowEnd,
        isLowEnd,
        reducedMotion,
        animationQuality: quality
      });
    };

    detectCapabilities();

    // Écouter les changements de préférences
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = detectCapabilities;
    
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // Optimisation des configurations d'animation selon la qualité
  const getOptimizedConfig = useCallback((baseConfig) => {
    const { animationQuality } = animationSettings;
    
    switch (animationQuality) {
      case 'low':
        return {
          ...baseConfig,
          duration: Math.min(baseConfig.duration || 1, 0.3),
          ease: 'linear',
          reduce: true
        };
      
      case 'medium':
        return {
          ...baseConfig,
          duration: (baseConfig.duration || 1) * 0.7,
          ease: baseConfig.ease || 'easeOut'
        };
      
      default:
        return baseConfig;
    }
  }, [animationSettings]);

  // Gestionnaire pour les animations au scroll
  const createScrollAnimation = useCallback((element, config) => {
    if (!animationSettings.shouldAnimate) {
      return null;
    }
    
    const optimizedConfig = getOptimizedConfig(config);
    
    return gsap.fromTo(element, 
      optimizedConfig.from || {},
      {
        ...optimizedConfig.to,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
          fastScrollEnd: true,
          refreshPriority: -1,
          ...optimizedConfig.scrollTrigger
        }
      }
    );
  }, [animationSettings, getOptimizedConfig]);

  // Gestionnaire pour les animations continues
  const createContinuousAnimation = useCallback((element, config) => {
    if (!animationSettings.shouldAnimate) {
      return null;
    }
    
    const optimizedConfig = getOptimizedConfig(config);
    return gsap.to(element, optimizedConfig);
  }, [animationSettings, getOptimizedConfig]);

  // Throttle intelligent pour les événements
  const createSmartThrottle = useCallback((func, defaultLimit = 16) => {
    const limit = animationSettings.isLowEnd ? defaultLimit * 2 : defaultLimit;
    let inThrottle;
    
    return function() {
      const args = arguments;
      const context = this;
      
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, [animationSettings]);

  return {
    ...animationSettings,
    getOptimizedConfig,
    createScrollAnimation,
    createContinuousAnimation,
    createSmartThrottle
  };
};

export default useSmartAnimations;
