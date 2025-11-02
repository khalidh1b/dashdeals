export class ComponentPreloader {
  constructor() {
    this.preloadedComponents = new Set();
    this.preloadQueue = [];
  }

  async preloadComponent(importFunc, name) {
    if (this.preloadedComponents.has(name)) {
      return;
    }

    try {
      await importFunc();
      this.preloadedComponents.add(name);
      //console.log(`Preloaded: ${name}`);
    } catch (error) {
      console.warn(`⚠️ Failed to preload: ${name}`, error);
    }
  }

  preloadComponents(components) {
    components.forEach(({ importFunc, name }) => {
      this.preloadComponent(importFunc, name);
    });
  }

  preloadOnHover(element, importFunc, name, delay = 200) {
    let timeoutId;

    const handleMouseEnter = () => {
      timeoutId = setTimeout(() => {
        this.preloadComponent(importFunc, name);
      }, delay);
    };

    const handleMouseLeave = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    // Return cleanup function
    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }

  preloadOnIntersection(element, importFunc, name, threshold = 0.1) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.preloadComponent(importFunc, name);
            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    // Return cleanup function
    return () => observer.disconnect();
  }

  preloadOnIdle(importFunc, name) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        this.preloadComponent(importFunc, name);
      });
    } else {
      setTimeout(() => {
        this.preloadComponent(importFunc, name);
      }, 1000);
    }
  }

  getStats() {
    return {
      preloadedCount: this.preloadedComponents.size,
      preloadedComponents: Array.from(this.preloadedComponents)
    };
  }
};

export const componentPreloader = new ComponentPreloader();

export const componentImports = {
  login: () => import('@/pages/Login/Login'),
  signup: () => import('@/pages/Signup/Signup'),
  
  cart: () => import('@/pages/Carts/Carts'),
  checkout: () => import('@/pages/CheckOut/Checkout'),
  wishlist: () => import('@/pages/Wishlist/Wishlists'),
  
  profile: () => import('@/pages/Settings/Settings'),
  orders: () => import('@/pages/MyOrders/MyOrders'),
  
  productDetails: () => import('@/pages/ProductDetailsPage/ProductDetailsPage'),
  
  paymentSuccess: () => import('@/components/payment/payment-success/PaymentSuccess'),
  paymentCancel: () => import('@/components/payment/payment-canceled/PaymentCanceled'),
  
  stripeElements: () => import('@/components/payment/stripe-elements-wrapper'),
};


export const preloadForRoute = (routePath) => {
  const routePreloads = {
    '/': [],
    '/login': [componentImports.login],
    '/signup': [componentImports.signup],
    '/carts': [componentImports.cart, componentImports.checkout],
    '/checkout': [componentImports.checkout, componentImports.stripeElements],
    '/wishlist': [componentImports.wishlist],
    '/settings': [componentImports.profile],
    '/myorders': [componentImports.orders],
    '/productDetailsPage': [componentImports.productDetails],
    '/paymentsuccess': [componentImports.paymentSuccess],
    '/paymentcancel': [componentImports.paymentCancel],
  };

  const components = routePreloads[routePath] || [];
  componentPreloader.preloadComponents(
    components.map((importFunc, index) => ({
      importFunc,
      name: `${routePath}-${index}`
    }))
  );
};


export const initializePreloading = () => {
  // Preload critical components
  componentPreloader.preloadOnIdle(componentImports.login, 'login');
  componentPreloader.preloadOnIdle(componentImports.cart, 'cart');
  
  // Preload auth components
  const preloadAuth = () => {
    componentPreloader.preloadComponents([
      { importFunc: componentImports.login, name: 'login-hover' },
      { importFunc: componentImports.signup, name: 'signup-hover' }
    ]);
  };

  setTimeout(() => {
    const loginLinks = document.querySelectorAll('a[href*="login"], a[href*="signup"]');
    loginLinks.forEach(link => {
      componentPreloader.preloadOnHover(link, preloadAuth, 'auth-nav');
    });
  }, 1000);
};