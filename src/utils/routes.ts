export const routes = {
    //Principal Pages
    NotFound: '*',
    home: '/',
    about: '/about',
    questions: '/questions',
    contact: '/contact',
    complaints_book: '/complaints_book',
    tyc: '/terms_conditions',
    privacy_policy: '/privacy_policy',

    //Shop Pages
    shop: '/shop',
    product: '/product/:id',
    shop_cart: '/shop_cart',
    checkout: '/checkout',
    thank_you: '/thank_you',

    //User Pages
    login: '/login',
    register: '/register',
    profile_user: '/profile_user',
    profile_cotization: '/profile_cotizations/:id',

    //Admin Pages
    dashboard: '/dashboard',
    dashboard_profile: '/dashboard_profile',
    
    // Products Management
    dashboard_products: '/dashboard_products',
    dashboard_product: '/dashboard_product/:id',
    dashboard_product_new: '/dashboard_product_new',
    dashboard_product_edit: '/dashboard_product_edit/:id',

    // Categories Management
    dashboard_categories: '/dashboard_categories',
    dashboard_category: '/dashboard_category/:id',
    dashboard_category_new: '/dashboard_category_new',
    dashboard_category_edit: '/dashboard_category_edit/:id',

    // Cotizations Management
    dashboard_cotizations: '/dashboard_cotizations',
    dashboard_cotization: '/dashboard_cotization/:id',

    // Users Management
    dashboard_users: '/dashboard_users',
    dashboard_user: '/dashboard_user/:id',
    dashboard_user_new: '/dashboard_user_new',
    dashboard_user_edit: '/dashboard_user_edit/:id',

    // Messages Management
    dashboard_messages: '/dashboard_messages',
    dashboard_message: '/dashboard_message/:id',
}