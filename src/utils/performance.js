// Utilities pour optimiser les performances des animations

export const optimizeAnimations = () => {
  // Détecter les capacités du device
  const isLowEnd = () => {
    return (
      navigator.hardwareConcurrency <= 2 || 
      navigator.deviceMemory <= 2 ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  };

  // Optimisations pour les devices moins performants
  if (isLowEnd()) {
    document.documentElement.style.setProperty('--animation-duration', '0.1s');
    document.documentElement.style.setProperty('--animation-enabled', '0');
  }

  return {
    isLowEnd: isLowEnd(),
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };
};

// Hook pour la gestion performante des animations GSAP
export const createOptimizedGSAPContext = (callback, dependencies = []) => {
  const ctx = gsap.context(() => {
    // Configuration optimisée pour tous les devices
    gsap.config({
      force3D: true,
      nullTargetWarn: false,
      trialWarn: false,
      autoSleep: 60
    });

    // Préférences utilisateur pour motion réduite
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(10); // Accélère toutes les animations
      gsap.set('*', { duration: 0.01 }); // Animations ultra-rapides
    }

    callback();
  });

  return ctx;
};

// Debounce pour les événements de scroll et resize
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle pour les animations en temps réel
export const throttle = (func, limit) => {
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
};

// Observer d'intersection optimisé
export const createOptimizedIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, defaultOptions);
};

// Gestion intelligente des animations au scroll
export const createSmartScrollTrigger = (config) => {
  const optimizedConfig = {
    ...config,
    refreshPriority: -1, // Priorité plus basse pour éviter les conflits
    fastScrollEnd: true,
    preventOverlaps: true,
    ...config
  };

  return ScrollTrigger.create(optimizedConfig);
};

// Préchargement intelligent des ressources
export const preloadCriticalAssets = () => {
  const criticalImages = [
    'https://cdn.builder.io/api/v1/image/assets%2F76eae3a0da234018810650d19cb2619e%2F908872988d904393ae907200811c2e75?format=webp&width=800'
  ];

  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Nettoyage automatique des animations
export const cleanupAnimations = (animations = []) => {
  animations.forEach(animation => {
    if (animation && typeof animation.kill === 'function') {
      animation.kill();
    }
  });
};

// CSS custom properties pour les animations responsives
export const setCSSAnimationVars = () => {
  const root = document.documentElement;
  const devicePixelRatio = window.devicePixelRatio || 1;
  const isRetina = devicePixelRatio > 1;
  
  // Ajuster les animations selon la densité d'écran
  root.style.setProperty('--animation-quality', isRetina ? '1' : '0.8');
  root.style.setProperty('--blur-quality', isRetina ? '20px' : '10px');
  root.style.setProperty('--shadow-quality', isRetina ? '30px' : '15px');
};
