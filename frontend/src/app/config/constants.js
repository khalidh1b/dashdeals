export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    JWT: '/auth/jwt',
    LOGOUT: '/auth/logout'
  },
  PRODUCTS: {
    GET_ALL: '/products',
    GET_BY_ID: '/products/:id',
    GET_FLASH_SALES: '/products/flashSales',
    GET_BEST_SELLING: '/products/bestSelling'
  },
  CART: {
    GET: '/cart',
    ADD: '/cart/add',
    UPDATE: '/cart/update/:id',
    DELETE: '/cart/delete/:id'
  },
  ORDERS: {
    GET: '/orders',
    CREATE: '/orders/create',
    UPDATE_STATUS: '/orders/update-status/:id'
  },
  PAYMENT: {
    CREATE_INTENT: '/payment/create-intent',
    CONFIRM: '/payment/confirm'
  }
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'dashdeals-access-token',
  USER_PREFERENCES: 'dashdeals-user-preferences',
  CART_ITEMS: 'dashdeals-cart-items',
  WISHLIST_ITEMS: 'dashdeals-wishlist-items'
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/signup',
  PRODUCTS: '/products',
  PRODUCT_DETAILS: '/productDetailsPage/:id',
  CART: '/carts',
  CHECKOUT: '/checkout',
  ORDERS: '/myorders',
  WISHLIST: '/wishlist',
  PROFILE: '/settings/profile',
  SETTINGS: '/settings'
};

export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1
};