export class ComponentPreloader {
  constructor() {
    this.preloadedcomponent = new Set();
    this.preloadQueue = [];
  }

  async preloadComponent(importFunc, name) {
    if (this.preloadedcomponent.has(name)) {
      return;
    }

    try {
      await importFunc();
      this.preloadedcomponent.add(name);
      //console.log(`Preloaded: ${name}`);
    } catch (error) {
      console.warn(`⚠️ Failed to preload: ${name}`, error);
    }
  }

  preloadcomponent(component) {
    component.forEach(({ importFunc, name }) => {
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
      preloadedCount: this.preloadedcomponent.size,
      preloadedcomponent: Array.from(this.preloadedcomponent)
    };
  }
}

export const componentPreloader = new ComponentPreloader();

export const componentImports = {
  login: () => import('@/pages/login/Login'),
  signup: () => import('@/pages/signup/Signup'),
  
  cart: () => import('@/pages/carts/Carts'),
  checkout: () => import('@/pages/checkout/Checkout'),
  wishlist: () => import('@/pages/wishlist/Wishlists'),
  
  profile: () => import('@/pages/settings/Settings'),
  orders: () => import('@/pages/my-orders/my-orders'),
  
  productDetails: () => import('@/pages/product-details-page/ProductDetailsPage'),
  
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

  const component = routePreloads[routePath] || [];
  componentPreloader.preloadcomponent(
    component.map((importFunc, index) => ({
      importFunc,
      name: `${routePath}-${index}`
    }))
  );
};


export const initializePreloading = () => {
  // Preload critical component
  componentPreloader.preloadOnIdle(componentImports.login, 'login');
  componentPreloader.preloadOnIdle(componentImports.cart, 'cart');
  
  // Preload auth component
  const preloadAuth = () => {
    componentPreloader.preloadcomponent([
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