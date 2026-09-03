const STORAGE_KEY = 'mono-cart';
let cart = [];

try {
  cart = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
} catch (error) {
  cart = [];
}

const RATINGS_STORAGE_KEY = 'mono-product-ratings';
const USER_RATINGS_STORAGE_KEY = 'mono-user-product-ratings';
const REVIEWS_STORAGE_KEY = 'mono-product-reviews';
let currentSort = 'highest-rating';
let currentFilter = 'all';

const PRODUCT_TAG_CONFIG = {
  1: ['female'],
  2: ['male'],
  3: ['unisex'],
  4: ['female'],
  5: ['female'],
  6: ['male'],
  7: ['male'],
  8: ['unisex']
};

PRODUCT_TAG_CONFIG[9] = ['unisex'];

const products = [
  {
    id: 1,
    name: 'Cherry Blossoms',
    brand: 'Mono Fine Fragrances',
    badge: 'Premium Choice',
    desc: 'Soft floral notes with understated elegance.',
    description: 'Cherry Blossoms is a luminous floral signature that opens with petal-soft brightness and settles into an elegant, wearable trail that feels polished all day long.',
    price100: 999,
    price50: 650,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Cherry.jpeg',
    images: ['Mono Cherry.jpeg', 'cherry blossom.PNG'],
    category: 'Floral',
    scent: 'Cherry Blossom Petals',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[1] || [],
    features: ['Long-lasting fragrance memory', 'Ideal for daywear and soft occasions', 'Premium bottle presentation'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Cherry Blossom Petals'],
      ['Special Feature', 'Elegant floral projection'],
      ['Best For', 'Daily wear and gifting']
    ],
    reviews: [
      { name: 'Ananya', title: 'Elegant and wearable', text: 'This feels soft, graceful, and beautifully balanced. I reach for it every day.' },
      { name: 'Rhea', title: 'Perfect gift pick', text: 'The bottle looks premium, and the scent is classy without being overpowering.' }
    ]
  },
  {
    id: 2,
    name: 'Into The Blues',
    brand: 'Mono Fine Fragrances',
    badge: 'Cool Signature',
    desc: 'A cool, confident signature with fresh depth.',
    description: 'Into The Blues delivers a crisp, layered freshness with clean aquatic undertones and a smooth woody finish that leaves a confident, modern aura.',
    price100: 999,
    price50: 650,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Blue.JPG',
    images: ['Mono Blue.JPG', 'blue.PNG'],
    category: 'Fresh Woody',
    scent: 'Blue Woods & Rain',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[2] || [],
    features: ['Fresh opening notes', 'Clean and crisp finish', 'Perfect for smart casual styling'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Blue Woods & Rain'],
      ['Special Feature', 'Clean fresh profile'],
      ['Best For', 'Workdays and weekend outings']
    ],
    reviews: [
      { name: 'Tara', title: 'Fresh and versatile', text: 'The cool opening stays clean all day, and the dry down is smooth and subtle.' },
      { name: 'Kabir', title: 'Great everyday scent', text: 'I love how confident it feels without becoming too strong.' }
    ]
  },
  {
    id: 3,
    name: 'Mono 7',
    brand: 'Mono Fine Fragrances',
    badge: 'All-Day Essential',
    desc: 'Balanced and timeless, designed for every hour.',
    description: 'Mono 7 is a balanced blend that feels timeless and refined, pairing a quiet floral heart with a smooth warm base that suits every hour of the day.',
    price100: 875,
    price50: 600,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono 7.PNG',
    images: ['Mono 7.PNG', 'mon7.PNG'],
    category: 'Timeless Blend',
    scent: 'Soft amber florals',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[3] || [],
    features: ['Balanced day-to-night wear', 'Smooth warm dry down', 'Easy to layer and gift'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Soft amber florals'],
      ['Special Feature', 'Versatile signature profile'],
      ['Best For', 'All-day wear and gifting']
    ],
    reviews: [
      { name: 'Ishita', title: 'A daily go-to', text: 'This is one of those scents you can wear anywhere without thinking about it.' },
      { name: 'Anish', title: 'Balanced and elegant', text: 'The finish feels soft, classy, and polished after a few minutes.' }
    ]
  },
  {
    id: 4,
    name: 'Mono Flora',
    brand: 'Mono Fine Fragrances',
    badge: 'Soft Bloom',
    desc: 'A graceful floral blend with a polished finish.',
    description: 'Mono Flora opens like a luminous bouquet and settles into a polished floral trail that feels graceful, sensual, and beautifully modern.',
    price100: 875,
    price50: 600,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Floral.PNG',
    images: ['Mono Floral.PNG', 'flora.PNG'],
    category: 'Floral',
    scent: 'Blooming florals',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[4] || [],
    features: ['Soft bloom opening', 'Polished aura', 'Elegant gifting appeal'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Blooming florals'],
      ['Special Feature', 'Graceful floral lift'],
      ['Best For', 'Perk-up and occasion wear']
    ],
    reviews: [
      { name: 'Naina', title: 'Lovely floral feel', text: 'It stays clean and soft, never too heavy. The bottle feels premium too.' },
      { name: 'Leeza', title: 'Perfect for dates', text: 'The floral opening is very attractive and the base keeps it elegant.' }
    ]
  },
  {
    id: 5,
    name: 'Mono Malone',
    brand: 'Mono Fine Fragrances',
    badge: 'Rare Blend',
    desc: 'A refined fragrance with a rich and polished character.',
    description: 'Mono Malone gives you a deeper, richer aura with polished woods and a refined warmth that elevates formal dressing and memorable evenings.',
    price100: 1500,
    price50: 940,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Malone.PNG',
    images: ['Mono Malone.PNG', 'malone.PNG'],
    category: 'Warm Woody',
    scent: 'Rich woods & velvet warmth',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[5] || [],
    features: ['Refined and warm dry down', 'Suitable for evening styling', 'Statement-making depth'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Rich woods & velvet warmth'],
      ['Special Feature', 'Polished, long-lingering warmth'],
      ['Best For', 'Evenings and formal looks']
    ],
    reviews: [
      { name: 'Dev', title: 'Very rich profile', text: 'Definitely feels special and premium, especially for evenings and dinner wear.' },
      { name: 'Meera', title: 'Sophisticated finish', text: 'The richness comes through beautifully without feeling too loud.' }
    ]
  },
  {
    id: 6,
    name: 'Mono Noire',
    brand: 'Mono Fine Fragrances',
    badge: 'Dark & Bold',
    desc: 'A bold and sophisticated scent with timeless depth.',
    description: 'Mono Noire is a bold signature for evenings—deep, polished, and rich with dark floral warmth that leaves a timeless lasting impression.',
    price100: 1500,
    price50: 940,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Noire.PNG',
    images: ['Mono Noire.PNG', 'noire.PNG'],
    category: 'Bold Woody',
    scent: 'Dark florals & depth',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[6] || [],
    features: ['Bold evening profile', 'Timeless depth', 'Strong presence and gift appeal'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Dark florals & depth'],
      ['Special Feature', 'Long lasting statement'],
      ['Best For', 'Evenings and special moments']
    ],
    reviews: [
      { name: 'Sara', title: 'Statement scent', text: 'This one has real presence. It feels luxurious and memorable.' },
      { name: 'Neha', title: 'Luxury evening perfume', text: 'Deep and smooth with a finish that lingers in the best possible way.' }
    ]
  }
  ,
  {
    id: 7,
    name: 'Paradise',
    brand: 'Mono Fine Fragrances',
    badge: 'Tropical Bloom',
    desc: 'A bright, uplifting floral with sunlit depth.',
    description: 'Mono Paradise is a vibrant, joyful composition that opens with zesty top notes and blooms into a lush floral heart, finishing on a warm, comfortable base.',
    price100: 999,
    price50: 650,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Paradise.jpeg',
    images: ['Mono Paradise.jpeg', 'paradise.PNG'],
    category: 'Floral',
    scent: 'Tropical florals & citrus',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[7] || [],
    features: ['Sunny floral opening', 'Comfortable warm dry down', 'Perfect for daytime occasions'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Tropical florals & citrus'],
      ['Special Feature', 'Bright, easy-to-wear profile'],
      ['Best For', 'Daytime and casual wear']
    ],
    reviews: []
  },
  {
    id: 8,
    name: 'AfterGlow',
    brand: 'Mono Fine Fragrances',
    badge: 'Evening Glow',
    desc: 'A warm, intimate scent created for evenings.',
    description: 'Mono AfterGlow wraps you in a comforting, sensual trail with soft ambered facets and a cozy, memorable finish.',
    price100: 0,
    price50: 899,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono AfterGlow.jpeg',
    images: ['Mono AfterGlow.jpeg', 'afterglow.PNG'],
    category: 'Warm Amber',
    scent: 'Amber & soft woods',
    volume: '50 ml',
    tags: PRODUCT_TAG_CONFIG[8] || [],
    features: ['Warm amber depth', 'Intimate projection', 'Perfect for evening wear'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '50 Millilitres'],
      ['Scent', 'Amber & soft woods'],
      ['Special Feature', 'Cozy evening warmth'],
      ['Best For', 'Evenings and special moments']
    ],
    reviews: []
  }
  ,
  {
    id: 9,
    name: 'Je T\'aime',
    brand: 'Mono Fine Fragrances',
    badge: 'Romantic Bloom',
    desc: 'A tender, luminous floral for intimate moments.',
    description: 'Mono Je T\'aime is a delicate, romantic fragrance that opens with soft florals and settles into a warm, embracing base.',
    price100: 700,
    price50: 580,
    rating: 0,
    ratingCount: 0,
    ratingTotal: 0,
    userRating: 0,
    image: 'Mono Je T\'aime.jpeg',
    images: ['Mono Je T\'aime.jpeg', 'je taime.PNG'],
    category: 'Floral',
    scent: 'Tender roses & soft musk',
    volume: '100 ml',
    tags: PRODUCT_TAG_CONFIG[9] || [],
    features: ['Soft romantic florals', 'Gentle, long-lasting finish', 'Elegant bottle presentation'],
    details: [
      ['Brand', 'Mono Fine Fragrances'],
      ['Item Form', 'Liquid'],
      ['Volume', '100 Millilitres'],
      ['Scent', 'Tender roses & soft musk'],
      ['Special Feature', 'Romantic floral lift'],
      ['Best For', 'Evenings and special moments']
    ],
    reviews: []
  }
];

/* Gift sets (3-in-1) */
const giftSets = [
  {
    id: 1,
    name: 'The Gentlemen\'s Set',
    price: 2300,
    items: [3, 7, 2],
    included: [
      { name: 'Mono 7', price: 600 },
      { name: 'Paradise', price: 650 },
      { name: 'Into The Blues', price: 650 }
    ],
    image: 'maleset.jpeg'
  },
  {
    id: 2,
    name: 'The Lady\'s Collection',
    price: 2300,
    items: [1, 5, 4],
    included: [
      { name: 'Cherry Blossoms', price: 650 },
      { name: 'Malone', price: 940 },
      { name: 'AfterGlow', price: 899 }
    ],
    image: 'femaleset.jpeg'
  },
  {
    id: 3,
    name: 'Universal Set',
    price: 2500,
    items: [3, 9, 8],
    included: [
      { name: 'Mono 7', price: 600 },
      { name: 'Je T\'aime', price: 580 },
      { name: 'AfterGlow', price: 899 }
    ],
    image: 'universal.jpeg'
  },
  {
    id: 4,
    name: 'Custom Set',
    price: 2300,
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    included: [],
    image: 'set%204.jpeg',
    isCustom: true
  }
];


function getStoredUserRatings() {
  try {
    return JSON.parse(localStorage.getItem(USER_RATINGS_STORAGE_KEY) || '{}');
  } catch (error) {
    return {};
  }
}

function escapeHtml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[&<>"'`]/g, (s) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;', '`':'&#96;'}[s]));
}

function saveUserRatings(userRatings) {
  localStorage.setItem(USER_RATINGS_STORAGE_KEY, JSON.stringify(userRatings));
}

function loadStoredRatings() {
  try {
    const savedRatings = JSON.parse(localStorage.getItem(RATINGS_STORAGE_KEY) || '{}');
    const userRatings = getStoredUserRatings();

    products.forEach((product) => {
      const savedProduct = savedRatings[product.id];
      if (savedProduct && typeof savedProduct === 'object') {
        product.rating = Number(savedProduct.average || 0);
        product.ratingCount = Number(savedProduct.count || 0);
        product.ratingTotal = Number(savedProduct.total || 0);
      } else {
        product.rating = 0;
        product.ratingCount = 0;
        product.ratingTotal = 0;
      }

      product.userRating = Number(userRatings[product.id] || 0);
    });
  } catch (error) {
    console.error('Unable to load product ratings:', error);
  }
}

function saveRatings() {
  const ratings = products.reduce((accumulator, product) => {
    accumulator[product.id] = { average: product.rating, count: product.ratingCount, total: product.ratingTotal };
    return accumulator;
  }, {});
  localStorage.setItem(RATINGS_STORAGE_KEY, JSON.stringify(ratings));
}

function getStoredReviews() {
  try {
    return JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
  } catch (error) {
    return {};
  }
}

function saveReviews() {
  const reviews = products.reduce((accumulator, product) => {
    accumulator[product.id] = product.reviews;
    return accumulator;
  }, {});
  localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
}

async function loadStoredReviews() {
  const allReviewsResponse = await fetchReviewsFromServer();
  if (allReviewsResponse) {
    products.forEach((product) => {
      const savedProductReviews = allReviewsResponse[product.id];
      if (Array.isArray(savedProductReviews)) {
        product.reviews = savedProductReviews;
      }
    });
    return;
  }

  const savedReviews = getStoredReviews();

  products.forEach((product) => {
    const savedProductReviews = savedReviews[product.id];
    if (Array.isArray(savedProductReviews) && savedProductReviews.length > 0) {
      product.reviews = savedProductReviews;
    }
  });
}

async function fetchReviewsFromServer() {
  try {
    const response = await fetch('/api/reviews');
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.reviews || null;
  } catch (error) {
    return null;
  }
}

let liveReviewsTimer = null;

function initLiveReviewSync() {
  if (window.location.protocol === 'file:') {
    window.addEventListener('storage', (event) => {
      if (event.key !== REVIEWS_STORAGE_KEY) return;
      loadStoredReviews();
      if (document.getElementById('product-list')) {
        loadProducts();
      }
      if (document.getElementById('product-detail')) {
        loadProductDetail();
      }
    });
    return;
  }

  if (liveReviewsTimer) {
    clearInterval(liveReviewsTimer);
  }

  liveReviewsTimer = window.setInterval(async () => {
    const serverReviews = await fetchReviewsFromServer();
    if (!serverReviews) return;

    let changed = false;
    products.forEach((product) => {
      const updatedReviews = serverReviews[product.id];
      if (Array.isArray(updatedReviews) && updatedReviews.length !== product.reviews.length) {
        product.reviews = updatedReviews;
        changed = true;
      }
    });

    if (changed) {
      if (document.getElementById('product-detail')) {
        loadProductDetail();
      }
    }
  }, 4000);
}

function notifyLiveReviewUpdate() {
  window.dispatchEvent(new CustomEvent('mono-reviews-updated'));
}

function getFilteredProducts() {
  const filteredProducts = currentFilter === 'all'
    ? [...products]
    : products.filter((product) => product.tags && product.tags.includes(currentFilter));

  const sortedProducts = [...filteredProducts];

  sortedProducts.sort((a, b) => {
    switch (currentSort) {
      case 'lowest-rating':
        return a.rating - b.rating;
      case 'price-low':
        return a.price100 - b.price100;
      case 'price-high':
        return b.price100 - a.price100;
      case 'highest-rating':
      default:
        return b.rating - a.rating;
    }
  });

  return sortedProducts;
}

function setSort(sortKey) {
  currentSort = sortKey;
  loadProducts();
}

function setFilter(filterKey) {
  currentFilter = filterKey;
  loadProducts();
}

function setProductRating(productId, rating) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const userRatings = getStoredUserRatings();
  const previousUserRating = Number(userRatings[productId] || 0);

  if (previousUserRating) {
    product.ratingTotal = Math.max(0, product.ratingTotal - previousUserRating + rating);
  } else {
    product.ratingCount += 1;
    product.ratingTotal += rating;
  }

  product.userRating = rating;
  userRatings[productId] = rating;

  product.rating = product.ratingCount ? Number((product.ratingTotal / product.ratingCount).toFixed(1)) : 0;
  saveRatings();
  saveUserRatings(userRatings);

  if (document.getElementById('product-list')) {
    loadProducts();
  }

  if (document.getElementById('gift-list')) {
    loadGiftSets();
  }

  if (document.getElementById('product-detail')) {
    loadProductDetail();
  }
}

const LOGO_INTRO_SESSION_KEY = 'mono-logo-intro-shown';

function initLogoIntro() {
  const overlay = document.getElementById('logo-intro-overlay');
  const video = document.getElementById('logo-intro-video');
  const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html') || window.location.pathname.endsWith('index.html');

  if (!overlay || !video || !isHomePage) {
    return;
  }

  if (sessionStorage.getItem(LOGO_INTRO_SESSION_KEY) === '1') {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    return;
  }

  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');

  const hideIntro = () => {
    overlay.classList.add('hidden');
    overlay.setAttribute('aria-hidden', 'true');
    sessionStorage.setItem(LOGO_INTRO_SESSION_KEY, '1');
  };

  video.muted = true;
  video.defaultPlaybackRate = 1.5;
  video.playbackRate = 2.0;
  video.play().catch(() => {});
  video.addEventListener('ended', hideIntro, { once: true });
  window.setTimeout(hideIntro, 5000);
}

async function initApp() {
  updateCartCount();
  initCartToast();
  initLogoIntro();
  initNavHideOnScroll();
  initHamburgerMenu();
  initLiveReviewSync();

  loadStoredRatings();
  await loadStoredReviews();

  if (document.getElementById('product-list')) {
    loadProducts();
  }

  if (document.getElementById('product-detail')) {
    loadProductDetail();
  }

  if (document.getElementById('cart-items') || document.getElementById('checkout-summary-list') || document.getElementById('cart-total') || document.getElementById('checkout-total')) {
    renderCart();
  }

  const form = document.getElementById('checkout-form');
  if (form) {
    form.addEventListener('submit', handleCheckout);
  }

  initRefillFlow();
}

function initCartToast() {
  if (document.getElementById('cart-toast')) return;

  const toast = document.createElement('div');
  toast.id = 'cart-toast';
  toast.className = 'cart-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  document.body.appendChild(toast);
}

function showCartToast(message) {
  initCartToast();
  const toast = document.getElementById('cart-toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showCartToast.timeoutId);
  showCartToast.timeoutId = window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);
}

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const navContainer = document.querySelector('.nav-container');

  if (!hamburger || !navContainer) return;
  const mobileNav = document.getElementById('mobile-nav');

  const mobileClose = mobileNav ? mobileNav.querySelector('.mobile-close') : null;
  if (mobileClose) {
    mobileClose.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.remove('active');
      navContainer.classList.remove('mobile-active');
      if (mobileNav) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
      const shopMenuEl = document.querySelector('.shop-menu');
      if (shopMenuEl) shopMenuEl.classList.remove('open');
      const shopToggleEl = document.querySelector('.shop-toggle');
      if (shopToggleEl) shopToggleEl.setAttribute('aria-expanded', 'false');
      const submenuEl = document.querySelector('.shop-submenu');
      if (submenuEl) submenuEl.setAttribute('aria-hidden', 'true');
    });
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(!!isActive));
    navContainer.classList.toggle('mobile-active');
    if (mobileNav) {
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', String(!isActive));
    }
  });

  // Also handle touchstart for iOS/touch devices where click may not fire reliably
  const hamburgerToggleHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isActive = hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', String(!!isActive));
    navContainer.classList.toggle('mobile-active');
    if (mobileNav) {
      mobileNav.classList.toggle('open');
      mobileNav.setAttribute('aria-hidden', String(!isActive));
    }
  };

  hamburger.addEventListener('touchstart', hamburgerToggleHandler, { passive: false });

  const navLinks = navContainer.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navContainer.classList.remove('mobile-active');
      const shopMenu = document.querySelector('.shop-menu');
      if (shopMenu) shopMenu.classList.remove('open');
      const shopToggle = document.querySelector('.shop-toggle');
      if (shopToggle) shopToggle.setAttribute('aria-expanded', 'false');
      const submenu = document.querySelector('.shop-submenu');
      if (submenu) submenu.setAttribute('aria-hidden', 'true');
      if (mobileNav) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    });
  });

  if (mobileNav) {
    const mlinks = mobileNav.querySelectorAll('a');
    mlinks.forEach((a) => {
      const closeMobileNav = () => {
        hamburger.classList.remove('active');
        navContainer.classList.remove('mobile-active');
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      };
        a.addEventListener('click', closeMobileNav);
        // Use touchend so the native navigation isn't prevented on touch devices
        a.addEventListener('touchend', () => { closeMobileNav(); });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
      hamburger.classList.remove('active');
      navContainer.classList.remove('mobile-active');
      if (mobileNav) {
        mobileNav.classList.remove('open');
        mobileNav.setAttribute('aria-hidden', 'true');
      }
    }
  });

  const shopToggle = document.querySelector('.shop-toggle');
  const shopMenu = document.querySelector('.shop-menu');
  if (shopToggle && shopMenu) {
    shopToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = shopMenu.classList.toggle('open');
      shopToggle.setAttribute('aria-expanded', String(!!isOpen));
      const submenu = shopMenu.querySelector('.shop-submenu');
      if (submenu) submenu.setAttribute('aria-hidden', String(!isOpen));
    });

    // touch support for shop toggle
    shopToggle.addEventListener('touchstart', (e) => { e.preventDefault(); e.stopPropagation(); const isOpen = shopMenu.classList.toggle('open'); shopToggle.setAttribute('aria-expanded', String(!!isOpen)); const submenu = shopMenu.querySelector('.shop-submenu'); if (submenu) submenu.setAttribute('aria-hidden', String(!isOpen)); }, { passive: false });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.shop-menu')) {
        shopMenu.classList.remove('open');
        shopToggle.setAttribute('aria-expanded', 'false');
        const submenu = shopMenu.querySelector('.shop-submenu');
        if (submenu) submenu.setAttribute('aria-hidden', 'true');
      }
    });
  }
}

function initNavHideOnScroll() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > lastScroll && currentScroll > 120) {
      nav.classList.add('nav-hidden');
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScroll = currentScroll;
  });
}

function loadProducts() {
  const container = document.getElementById('product-list');
  const sortControls = document.getElementById('sort-controls');
  if (!container) return;

  if (sortControls) {
    sortControls.innerHTML = `
      <div class="sort-controls-inner">
        <label class="sort-menu-group">
          <span class="sort-label">Sort By</span>
          <select class="sort-select" onchange="setSort(this.value)">
            <option value="highest-rating" ${currentSort === 'highest-rating' ? 'selected' : ''}>Highest Rating</option>
            <option value="lowest-rating" ${currentSort === 'lowest-rating' ? 'selected' : ''}>Lowest Rating</option>
            <option value="price-low" ${currentSort === 'price-low' ? 'selected' : ''}>Price Low To High</option>
            <option value="price-high" ${currentSort === 'price-high' ? 'selected' : ''}>Price High To Low</option>
          </select>
        </label>
      </div>
      <div class="sort-controls-inner filter-controls">
        <label class="sort-menu-group">
          <span class="sort-label">Filter By</span>
          <select class="sort-select" onchange="setFilter(this.value)">
            <option value="all" ${currentFilter === 'all' ? 'selected' : ''}>All</option>
            <option value="male" ${currentFilter === 'male' ? 'selected' : ''}>Male</option>
            <option value="female" ${currentFilter === 'female' ? 'selected' : ''}>Female</option>
            <option value="unisex" ${currentFilter === 'unisex' ? 'selected' : ''}>Unisex</option>
          </select>
        </label>
      </div>
    `;
  }

  container.innerHTML = '';

  getFilteredProducts().forEach((product) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    let sizeOptions = '';
    const has100 = !!(product.price100 && product.price100 > 0);
    const has50 = !!(product.price50 && product.price50 > 0);
    if (has100) sizeOptions += `<option value="100">100 ML - ₹${product.price100}</option>`;
    if (has50) sizeOptions += `<option value="50">50 ML - ₹${product.price50}</option>`;
    const displayPrice = has100 ? product.price100 : product.price50;
    const sizeOptionCount = (has100 ? 1 : 0) + (has50 ? 1 : 0);
    const sizeHtml = sizeOptionCount === 1
      ? (has100 ? `<div class="fixed-size" style="color:#5c4634">Size: 100 ML - ₹${product.price100}</div>` : `<div class="fixed-size" style="color:#5c4634">Size: 50 ML - ₹${product.price50}</div>`)
      : `
          <label>
            Size
            <select id="size-${product.id}">
              ${sizeOptions}
            </select>
          </label>`;

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
      <div class="shop-price-row">
        <span class="shop-price" id="shop-price-${product.id}">₹${displayPrice}</span>
      </div>
      <span class="product-tags" data-tags="${product.tags.join(',')}"></span>
      ${sizeHtml}
      <div class="product-card-actions">
        <a class="view-details-btn" href="product.html?id=${product.id}">View details</a>
      </div>
    `;

    const sizeSelect = card.querySelector(`#size-${product.id}`);
    const priceDisplay = card.querySelector(`#shop-price-${product.id}`);
    if (sizeSelect && priceDisplay) {
      sizeSelect.addEventListener('change', () => {
        updateProductPriceDisplay(product.id, sizeSelect.value);
      });
    }

    container.appendChild(card);
  });
}

function loadGiftSets() {
  const container = document.getElementById('gift-list');
  if (!container) return;
  try {
    container.innerHTML = '';

    if (!Array.isArray(giftSets) || giftSets.length === 0) {
      container.innerHTML = '<p class="empty-gifts">No gift sets available at the moment.</p>';
      return;
    }

    giftSets.forEach((set, idx) => {
      const setItems = set.items.map((id) => products.find((p) => p.id === id)).filter(Boolean);
      if (!setItems || setItems.length === 0) {
        // Skip sets without valid products
        return;
      }

      const itemListHtml = set.included.length
        ? set.included.map((item) => `<li>${item.name} — ₹${item.price}</li>`).join('')
        : '<li>Select any 3 perfumes</li>';
      const total = set.price;
      const fallbackImage = setItems[0] && setItems[0].image ? setItems[0].image : 'gift.jpeg';

      const card = document.createElement('div');
      card.className = 'product-card gift-card';
      card.innerHTML = `
        <div class="product-image">
          <img src="${set.image || fallbackImage}" alt="${set.name}" onerror="this.onerror=null;this.src='${fallbackImage}';">
        </div>
        <h3>${set.name}</h3>
        <ul class="gift-items">${itemListHtml}</ul>
        <div class="shop-price-row">
          <span class="shop-price">₹${total}</span>
        </div>
        <div class="product-card-actions">
          <a class="view-details-btn" href="product.html?gift=${set.id}">View details</a>
        </div>
      `;

      container.appendChild(card);
    });
    } catch (err) {
      console.error('Error rendering gift sets', err);
      container.innerHTML = '<p class="empty-gifts">Unable to load gift sets.</p>';
    }
}

function addSetToCart(setId) {
  const set = giftSets.find((s) => s.id === setId);
  if (!set) return;

  const noteEl = document.getElementById(`note-${setId}`) || document.getElementById(`gift-note-${setId}`);
  const note = noteEl ? noteEl.value.trim() : '';

  if (set.isCustom) {
    // Build a list of selected product IDs, counting duplicates by quantity
    const selected = [];
    Array.from(document.querySelectorAll('.custom-gift-row, .category-item')).forEach((row) => {
      const pid = Number(row.dataset.productId);
      const qty = Math.max(0, Number(row.dataset.quantity || 0));
      for (let i = 0; i < qty; i++) selected.push(pid);
    });

    if (selected.length !== 3) {
      showCartToast('Please select exactly 3 perfumes for your custom set.');
      return;
    }

    const selectedProducts = selected.map((id) => products.find((p) => p.id === id)).filter(Boolean);
    if (selectedProducts.length !== 3) {
      showCartToast('Some selected perfumes are unavailable. Please try again.');
      return;
    }

    cart.push({
      name: set.name,
      size: 'Custom 3 in 1 set',
      qty: 1,
      price: set.price,
      total: set.price,
      note,
      isSet: true,
      items: selectedProducts.map((p) => p.name)
    });

    saveCart();
    updateCartCount();
    renderCart();
    showCartToast(`${set.name} added to cart.`);
    return;
  }

  const setItems = set.items.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const total = set.price;

  cart.push({
    name: set.name,
    size: '3 in 1 set',
    qty: 1,
    price: total,
    total: total,
    note,
    isSet: true,
    items: setItems.map((p) => p.name)
  });

  saveCart();
  updateCartCount();
  renderCart();
  showCartToast(`${set.name} added to cart.`);
}

function addProductDirectToCart(id, qty = 1) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  const size = (product.price100 && product.price100 > 0) ? '100' : '50';
  const price = size === '100' ? product.price100 : product.price50;

  cart.push({
    name: product.name,
    size: `${size} ML`,
    qty: qty,
    price,
    total: price * qty
  });

  saveCart();
  updateCartCount();
  renderCart();
  showCartToast(`${product.name} added to cart.`);
}

function buyProductDirect(id) {
  addProductDirectToCart(id, 1);
  window.location.href = 'checkout.html';
}

function buySetNow(setId) {
  addSetToCart(setId);
  window.location.href = 'checkout.html';
}

function updateProductPriceDisplay(productId, sizeValue) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  let price;
  if (sizeValue === '50') {
    price = product.price50;
  } else {
    price = (product.price100 && product.price100 > 0) ? product.price100 : product.price50;
  }

  const shopPriceDisplay = document.getElementById(`shop-price-${productId}`);
  if (shopPriceDisplay) {
    shopPriceDisplay.textContent = `₹${price}`;
  }

  const detailPriceDisplay = document.querySelector('#product-detail .product-price');
  if (detailPriceDisplay) {
    detailPriceDisplay.textContent = `₹${price}`;
  }
}

function getGalleryImages(images, fallbackImage) {
  const validImages = Array.isArray(images) ? images.filter(Boolean) : [];
  return validImages.length ? validImages : [fallbackImage].filter(Boolean);
}

function setupProductGallery(galleryRoot) {
  if (!galleryRoot) return;

  const track = galleryRoot.querySelector('.product-detail-gallery-track');
  const slides = Array.from(galleryRoot.querySelectorAll('.product-detail-slide'));
  const dots = Array.from(galleryRoot.querySelectorAll('.gallery-dot'));
  const prevButton = galleryRoot.querySelector('.gallery-arrow.prev');
  const nextButton = galleryRoot.querySelector('.gallery-arrow.next');

  if (!track || slides.length <= 1) {
    return;
  }

  let currentIndex = 0;
  let startTimer = null;
  let slideTimer = null;

  const updateGallery = (nextIndex) => {
    currentIndex = (nextIndex + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
      dot.setAttribute('aria-selected', String(index === currentIndex));
    });
  };

  const clearTimers = () => {
    if (startTimer) {
      clearTimeout(startTimer);
      startTimer = null;
    }
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  };

  const restartAutoPlay = () => {
    clearTimers();
    startTimer = window.setTimeout(() => {
      slideTimer = window.setInterval(() => {
        updateGallery(currentIndex + 1);
      }, 3000);
    }, 10000);
  };

  prevButton?.addEventListener('click', () => {
    updateGallery(currentIndex - 1);
    restartAutoPlay();
  });

  nextButton?.addEventListener('click', () => {
    updateGallery(currentIndex + 1);
    restartAutoPlay();
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateGallery(index);
      restartAutoPlay();
    });
  });

  updateGallery(0);
  restartAutoPlay();
}

function loadGiftSetDetail(giftSetId) {
  const detailContainer = document.getElementById('product-detail');
  const set = giftSets.find((item) => item.id === giftSetId);
  if (!detailContainer || !set) return false;

  const setItems = set.items.map((id) => products.find((product) => product.id === id)).filter(Boolean);
  const total = set.price;
  const fallbackImage = setItems[0] && setItems[0].image ? setItems[0].image : 'gift.jpeg';
  const galleryImages = getGalleryImages(set.images, set.image || fallbackImage);

    if (set.isCustom) {
    detailContainer.innerHTML = `
      <div class="product-detail-layout">
        <div class="product-detail-gallery">
          <div class="product-detail-image-frame">
            <div class="product-detail-gallery-viewport">
              <div class="product-detail-gallery-track">
                ${galleryImages.map((imageSrc, index) => `
                  <div class="product-detail-slide ${index === 0 ? 'active' : ''}">
                    <img src="${imageSrc}" alt="${set.name} ${index + 1}">
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="product-detail-gallery-controls">
              <button type="button" class="gallery-arrow prev" aria-label="Previous image">←</button>
              <div class="gallery-dots" aria-label="Image navigation">
                ${galleryImages.map((_, index) => `
                  <button type="button" class="gallery-dot ${index === 0 ? 'active' : ''}" data-gallery-index="${index}" aria-label="Go to image ${index + 1}" aria-selected="${index === 0}"></button>
                `).join('')}
              </div>
              <button type="button" class="gallery-arrow next" aria-label="Next image">→</button>
            </div>
          </div>
        </div>
        <div class="product-detail-panel">
          <span class="product-badge">Custom Gift Set</span>
          <h1>${set.name}</h1>
          <div class="product-price-row">
            <span class="product-price">₹${total}</span>
            <span class="product-price-note">Inclusive of all taxes</span>
          </div>
          <p class="product-overview">Choose any 3 fragrances from the full collection and add a personal note for your gift.</p>
          <div class="custom-gift-picker-categories" aria-label="Choose 3 perfumes for your custom set">
            <div class="category" data-category="male">
              <button type="button" class="category-header" aria-expanded="false">Male <span class="chev">▾</span></button>
              <div class="category-list" style="display:none;">
                ${products.filter((p) => (p.tags || []).includes('male')).map((product) => `
                  <div class="category-item" data-product-id="${product.id}" data-quantity="0">
                    <div class="category-item-name">${product.name}</div>
                    <div class="category-item-controls">
                      <button type="button" class="cat-btn" data-action="decrease" data-product-id="${product.id}" aria-label="Decrease ${product.name}">-</button>
                      <span class="cat-count">0</span>
                      <button type="button" class="cat-btn" data-action="increase" data-product-id="${product.id}" aria-label="Increase ${product.name}">+</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="category" data-category="female">
              <button type="button" class="category-header" aria-expanded="false">Female <span class="chev">▾</span></button>
              <div class="category-list" style="display:none;">
                ${products.filter((p) => (p.tags || []).includes('female')).map((product) => `
                  <div class="category-item" data-product-id="${product.id}" data-quantity="0">
                    <div class="category-item-name">${product.name}</div>
                    <div class="category-item-controls">
                      <button type="button" class="cat-btn" data-action="decrease" data-product-id="${product.id}" aria-label="Decrease ${product.name}">-</button>
                      <span class="cat-count">0</span>
                      <button type="button" class="cat-btn" data-action="increase" data-product-id="${product.id}" aria-label="Increase ${product.name}">+</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            <div class="category" data-category="unisex">
              <button type="button" class="category-header" aria-expanded="false">Unisex <span class="chev">▾</span></button>
              <div class="category-list" style="display:none;">
                ${products.filter((p) => (p.tags || []).includes('unisex')).map((product) => `
                  <div class="category-item" data-product-id="${product.id}" data-quantity="0">
                    <div class="category-item-name">${product.name}</div>
                    <div class="category-item-controls">
                      <button type="button" class="cat-btn" data-action="decrease" data-product-id="${product.id}" aria-label="Decrease ${product.name}">-</button>
                      <span class="cat-count">0</span>
                      <button type="button" class="cat-btn" data-action="increase" data-product-id="${product.id}" aria-label="Increase ${product.name}">+</button>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
          <div class="custom-gift-summary">Selected: <strong>0</strong>/3 perfumes</div>
          <div class="custom-gift-actions" style="display:none;">
            <button type="button" class="cta-button" data-action="confirm-custom-gift">OK</button>
          </div>
          <label>
            Add a custom note
            <div class="note-wrap">
              <textarea id="gift-note-${set.id}" placeholder="Write a note for your gift set" rows="3"></textarea>
              <div class="floating-hearts" aria-hidden="true"></div>
            </div>
          </label>
          <div class="detail-actions">
            <button type="button" class="cta-button" onclick="addSetToCart(${set.id})">Add custom set to cart</button>
            <button type="button" class="buy-now-link" onclick="buySetNow(${set.id})">Buy now</button>
          </div>
        </div>
      </div>
    `;

    const picker = detailContainer.querySelector('.custom-gift-picker-categories');
    const summary = detailContainer.querySelector('.custom-gift-summary');
    const okAction = detailContainer.querySelector('[data-action="confirm-custom-gift"]');

    const refreshCustomGiftSelection = () => {
      const items = Array.from(detailContainer.querySelectorAll('.category-item'));
      let totalSelected = 0;

      items.forEach((itemEl) => {
        const qty = Number(itemEl.dataset.quantity || 0);
        const countEl = itemEl.querySelector('.cat-count');
        if (countEl) countEl.textContent = String(qty);
        totalSelected += qty;
      });

      if (summary) summary.innerHTML = `Selected: <strong>${totalSelected}</strong>/3 perfumes`;
      if (okAction) okAction.parentElement.style.display = totalSelected === 3 ? 'block' : 'none';
    };

    if (picker) {
      picker.addEventListener('click', (event) => {
        const button = event.target.closest('.cat-btn');
        if (!button) return;

        const productId = Number(button.dataset.productId);
        const action = button.dataset.action;
        const itemEl = detailContainer.querySelector(`.category-item[data-product-id="${productId}"]`);
        if (!itemEl) return;

        let quantity = Number(itemEl.dataset.quantity || 0);
        const selectedTotal = Array.from(detailContainer.querySelectorAll('.category-item')).reduce((sum, it) => sum + Number(it.dataset.quantity || 0), 0);

        if (action === 'increase') {
          if (selectedTotal >= 3) {
            showCartToast('You can only select 3 perfumes in a custom set.');
            return;
          }
          quantity += 1;
        }

        if (action === 'decrease') {
          quantity = Math.max(0, quantity - 1);
        }

        itemEl.dataset.quantity = String(quantity);
        refreshCustomGiftSelection();
      });

      // Add toggle behaviour for category headers (accordion-like)
      const headers = Array.from(picker.querySelectorAll('.category-header'));
      headers.forEach((hdr) => {
        hdr.addEventListener('click', (e) => {
          const list = hdr.nextElementSibling;
          const isOpen = list && list.style.display !== 'none';
          // close all
          headers.forEach((h) => {
            const l = h.nextElementSibling;
            if (l) {
              l.style.display = 'none';
              h.setAttribute('aria-expanded', 'false');
            }
          });
          // open chosen if was closed
          if (list && !isOpen) {
            list.style.display = 'block';
            hdr.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    // create floating hearts for the custom note area
    const noteEl = detailContainer.querySelector(`#gift-note-${set.id}`);
    const heartsContainer = detailContainer.querySelector('.floating-hearts');
    if (noteEl && heartsContainer) {
      // remove any existing hearts
      heartsContainer.innerHTML = '';
      const createHearts = (count) => {
        for (let i = 0; i < count; i++) {
          const span = document.createElement('span');
          span.className = 'floating-heart';
          const left = Math.random() * 90 + 5; // 5% - 95%
          const top = Math.random() * 70 + 10; // 10% - 80%
          const dx = (Math.random() * 180 - 90).toFixed(0) + 'px'; // -90 to 90 px drift
          const dur = (4 + Math.random() * 4).toFixed(2) + 's';
          const delay = (Math.random() * 2).toFixed(2) + 's';
          span.style.left = left + '%';
          span.style.top = top + '%';
          span.style.setProperty('--dx', dx);
          span.style.animationDuration = dur;
          span.style.animationDelay = delay;
          span.style.opacity = '0.32';
          heartsContainer.appendChild(span);
        }
      };
      createHearts(6);
    }

    if (okAction) {
      okAction.addEventListener('click', () => {
        const selectedTotal = Array.from(detailContainer.querySelectorAll('.category-item')).reduce((sum, item) => sum + Number(item.dataset.quantity || 0), 0);
        if (selectedTotal !== 3) {
          showCartToast('Please choose exactly 3 perfumes before continuing.');
          return;
        }

        const selectedNames = [];
        Array.from(detailContainer.querySelectorAll('.category-item')).forEach((item) => {
          const qty = Number(item.dataset.quantity || 0);
          if (qty > 0) {
            const pid = Number(item.dataset.productId);
            const product = products.find((p) => p.id === pid);
            for (let i = 0; i < qty; i++) {
              if (product) selectedNames.push(product.name);
            }
          }
        });

        showCartToast(`Selected: ${selectedNames.join(', ')}`);
      });
    }

    const galleryRoot = detailContainer.querySelector('.product-detail-gallery');
    setupProductGallery(galleryRoot);
    return true;
  }

  detailContainer.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-gallery">
        <div class="product-detail-image-frame">
          <div class="product-detail-gallery-viewport">
            <div class="product-detail-gallery-track">
              ${galleryImages.map((imageSrc, index) => `
                <div class="product-detail-slide ${index === 0 ? 'active' : ''}">
                  <img src="${imageSrc}" alt="${set.name} ${index + 1}">
                </div>
              `).join('')}
            </div>
          </div>
          <div class="product-detail-gallery-controls">
            <button type="button" class="gallery-arrow prev" aria-label="Previous image">←</button>
            <div class="gallery-dots" aria-label="Image navigation">
              ${galleryImages.map((_, index) => `
                <button type="button" class="gallery-dot ${index === 0 ? 'active' : ''}" data-gallery-index="${index}" aria-label="Go to image ${index + 1}" aria-selected="${index === 0}"></button>
              `).join('')}
            </div>
            <button type="button" class="gallery-arrow next" aria-label="Next image">→</button>
          </div>
        </div>
      </div>
      <div class="product-detail-panel">
        <span class="product-badge">Gift Set</span>
        <h1>${set.name}</h1>
        <div class="product-price-row">
          <span class="product-price">₹${total}</span>
          <span class="product-price-note">Inclusive of all taxes</span>
        </div>
        <p class="product-overview">A curated three-fragrance gift set from Mono Fine Fragrances.</p>
        <ul class="product-feature-list">
          ${set.included.map((item) => `<li>${item.name}</li>`).join('')}
        </ul>
        <label>
          Add a note for this gift
          <div class="note-wrap">
            <textarea id="gift-note-${set.id}" placeholder="Write a small gift note (optional)" rows="3"></textarea>
            <div class="floating-hearts" aria-hidden="true"></div>
          </div>
        </label>
        <div class="detail-actions">
          <button type="button" class="cta-button" onclick="addSetToCart(${set.id})">Add set to cart</button>
          <button type="button" class="buy-now-link" onclick="buySetNow(${set.id})">Buy now</button>
        </div>
      </div>
    </div>
    <div class="detail-info-grid">
      <div class="detail-spec-card">
        <h2>What's included</h2>
        <div class="spec-table">
          ${set.included.map((item) => `<div class="spec-row"><span>${item.name}</span><strong>₹${item.price}</strong></div>`).join('')}
        </div>
      </div>
    </div>
  `;
  // add floating hearts for non-custom gift note
  const ncNoteEl = detailContainer.querySelector(`#gift-note-${set.id}`);
  const ncHeartsContainer = detailContainer.querySelector('.floating-hearts');
  if (ncNoteEl && ncHeartsContainer) {
    ncHeartsContainer.innerHTML = '';
    const createHearts = (count) => {
      for (let i = 0; i < count; i++) {
        const span = document.createElement('span');
        span.className = 'floating-heart';
        const left = Math.random() * 90 + 5;
        const top = Math.random() * 70 + 10;
        const dx = (Math.random() * 180 - 90).toFixed(0) + 'px';
        const dur = (4 + Math.random() * 4).toFixed(2) + 's';
        const delay = (Math.random() * 2).toFixed(2) + 's';
        span.style.left = left + '%';
        span.style.top = top + '%';
        span.style.setProperty('--dx', dx);
        span.style.animationDuration = dur;
        span.style.animationDelay = delay;
        span.style.opacity = '0.6';
        ncHeartsContainer.appendChild(span);
      }
    };
    createHearts(6);
  }

  const galleryRoot = detailContainer.querySelector('.product-detail-gallery');
  setupProductGallery(galleryRoot);
  return true;
}

function loadProductDetail() {
  const detailContainer = document.getElementById('product-detail');
  if (!detailContainer) return;

  const params = new URLSearchParams(window.location.search);
  const giftSetId = Number(params.get('gift'));
  if (giftSetId && loadGiftSetDetail(giftSetId)) return;

  const productId = Number(params.get('id'));
  const product = products.find((item) => item.id === productId);

  if (!product) {
    detailContainer.innerHTML = `
      <div class="detail-empty-state">
        <h1>Product not found</h1>
        <p>Choose a fragrance from the shop to view its full details page.</p>
        <a href="shop.html" class="view-details-btn">Back to Shop</a>
      </div>
    `;
    return;
  }

  const ratingDisplay = product.rating ? product.rating.toFixed(1) : '0.0';

  const has100 = !!(product.price100 && product.price100 > 0);
  const has50 = !!(product.price50 && product.price50 > 0);
  let detailSizeOptions = '';
  if (has100) detailSizeOptions += `<option value="100">100 ML - ₹${product.price100}</option>`;
  if (has50) detailSizeOptions += `<option value="50">50 ML - ₹${product.price50}</option>`;
  const detailDisplayPrice = has100 ? product.price100 : product.price50;
  const detailSizeCount = (has100 ? 1 : 0) + (has50 ? 1 : 0);
  const detailSizeHtml = detailSizeCount === 1
    ? (has100 ? `<div class="fixed-size" style="color:#5c4634">Size: 100 ML - ₹${product.price100}</div>` : `<div class="fixed-size" style="color:#5c4634">Size: 50 ML - ₹${product.price50}</div>`)
    : `<select id="size-${product.id}" onchange="updateProductPriceDisplay(${product.id}, this.value)">${detailSizeOptions}</select>`;
  const galleryImages = getGalleryImages(product.images, product.image);

  detailContainer.innerHTML = `
    <div class="product-detail-layout">
      <div class="product-detail-gallery">
        <div class="product-detail-image-frame">
          <div class="product-detail-gallery-viewport">
            <div class="product-detail-gallery-track">
              ${galleryImages.map((imageSrc, index) => `
                <div class="product-detail-slide ${index === 0 ? 'active' : ''}">
                  <img src="${imageSrc}" alt="${product.name} ${index + 1}">
                </div>
              `).join('')}
            </div>
          </div>
          <div class="product-detail-gallery-controls">
            <button type="button" class="gallery-arrow prev" aria-label="Previous image">←</button>
            <div class="gallery-dots" aria-label="Image navigation">
              ${galleryImages.map((_, index) => `
                <button type="button" class="gallery-dot ${index === 0 ? 'active' : ''}" data-gallery-index="${index}" aria-label="Go to image ${index + 1}" aria-selected="${index === 0}"></button>
              `).join('')}
            </div>
            <button type="button" class="gallery-arrow next" aria-label="Next image">→</button>
          </div>
        </div>
      </div>
      <div class="product-detail-panel">
        <span class="product-badge">${product.badge}</span>
        <h1>${product.name}</h1>
        <div class="product-price-row">
          <span class="product-price">₹${detailDisplayPrice}</span>
          <span class="product-price-note">Inclusive of all taxes</span>
        </div>
        <p class="product-overview">${product.description}</p>
        <ul class="product-feature-list">
          ${product.features.map((feature) => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="product-selector-grid">
          <label>
            Size
            ${detailSizeHtml}
          </label>
          <label>
            Quantity
            <input type="number" id="qty-${product.id}" value="1" min="1">
          </label>
        </div>
        <div class="detail-actions">
          <button type="button" class="cta-button" onclick="addToCart(${product.id})">Add to Cart</button>
          <button type="button" class="share-button" onclick="shareProduct(${product.id})">Share</button>
          <button type="button" class="buy-now-link" onclick="buyNow(${product.id})">Buy Now</button>
        </div>
      </div>
    </div>

    <div class="detail-info-grid">
      <div class="detail-spec-card">
        <h2>About this product</h2>
        <div class="spec-table">
          ${product.details.map(([label, value]) => `
            <div class="spec-row">
              <span>${label}</span>
              <strong>${value}</strong>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="detail-spec-card">
        <h2>Customer reviews</h2>
        <div class="review-summary-box">
          <div class="review-summary-head">
            <span class="review-summary-score">${ratingDisplay}/5</span>
            <div class="rating-stars">
              ${[1, 2, 3, 4, 5].map((star) => `
                <span class="star ${Number(ratingDisplay) >= star ? 'active' : ''}">★</span>
              `).join('')}
            </div>
          </div>
          <p>${product.reviews.length} ${product.reviews.length === 1 ? 'customer review' : 'customer reviews'}</p>
        </div>
        <div class="review-form-card">
          <h3>Rate this fragrance</h3>
          <div class="review-stars" aria-label="Rate ${product.name}">
            ${[1, 2, 3, 4, 5].map((star) => `
              <button type="button" class="star-btn ${product.userRating >= star ? 'active' : ''}" onclick="setProductRating(${product.id}, ${star})" aria-label="Rate ${product.name} ${star} out of 5 stars">★</button>
            `).join('')}
          </div>
          <label class="review-field-label" for="review-text-${product.id}">Write a review</label>
          <textarea id="review-text-${product.id}" class="review-textarea" placeholder="Share your experience with ${product.name}"></textarea>
          <button type="button" class="submit-review-btn" onclick="submitReview(${product.id})">Submit Review</button>
        </div>
        <div class="review-list">
          ${product.reviews.map((review) => `
            <article class="review-card">
              <div class="review-top">
                <strong>${review.name}</strong>
                <span>${review.title}</span>
              </div>
              <p>${review.text}</p>
            </article>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const galleryRoot = detailContainer.querySelector('.product-detail-gallery');
  setupProductGallery(galleryRoot);
}

async function submitReview(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const reviewText = document.getElementById(`review-text-${productId}`);
  if (!reviewText || !reviewText.value.trim()) {
    showCartToast('Please write a short review before submitting.');
    return;
  }

  const payload = {
    productId,
    name: 'You',
    title: 'Verified buyer review',
    text: reviewText.value.trim()
  };

  try {
    const response = await fetch('/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.reviews)) {
        product.reviews = data.reviews;
      }
      saveReviews();
      notifyLiveReviewUpdate();
      loadProductDetail();
      reviewText.value = '';
      showCartToast('Your review has been added.');
      return;
    }
  } catch (error) {
    console.error('Review submission failed:', error);
  }

  const userReview = {
    name: 'You',
    title: 'Verified buyer review',
    text: reviewText.value.trim()
  };

  product.reviews.unshift(userReview);
  saveReviews();
  notifyLiveReviewUpdate();
  loadProductDetail();
  reviewText.value = '';
  showCartToast('Your review has been added.');
}

function shareProduct(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;

  const shareUrl = `${window.location.href.split('?')[0]}?id=${productId}`;

  if (navigator.share) {
    navigator.share({
      title: product.name,
      text: `Check out ${product.name} on Mono.`,
      url: shareUrl
    }).catch(() => {});
    return;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        showCartToast(`Share link copied for ${product.name}.`);
      })
      .catch(() => {
        showCartToast('Sharing is not available in this browser.');
      });
    return;
  }

  showCartToast('Sharing is not available in this browser.');
}

function buyNow(id) {
  addToCart(id);
  window.location.href = 'checkout.html';
}

function addToCart(id) {
  const sizeInput = document.getElementById(`size-${id}`);
  const qtyInput = document.getElementById(`qty-${id}`);
  if (!qtyInput) return;

  let size;
  if (sizeInput) {
    size = sizeInput.value;
  } else {
    // fallback: determine available size on product
    if (product.price50 && product.price50 > 0 && !(product.price100 && product.price100 > 0)) {
      size = '50';
    } else {
      size = '100';
    }
  }
  const qty = parseInt(qtyInput.value, 10) || 1;
  const product = products.find((item) => item.id === id);
  if (!product) return;

  const price = size === '100' ? product.price100 : product.price50;
  cart.push({
    name: product.name,
    size: `${size} ML`,
    qty,
    price,
    total: price * qty
  });

  saveCart();
  updateCartCount();
  renderCart();

  const messageBox = document.getElementById('form-message');
  showCartToast(`${product.name} — ${qty} ${qty === 1 ? 'pic' : 'pics'} has been added to the cart.`);

  if (messageBox) {
    messageBox.textContent = `${qty} × ${product.name} added to cart.`;
    messageBox.style.color = '#27ae60';
  }
}

function saveCart() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

function updateCartCount() {
  const badges = document.querySelectorAll('.cart-count-badge');
  badges.forEach((badge) => {
    badge.textContent = cart.length;
  });

  const counter = document.getElementById('cart-count');
  if (counter) {
    counter.textContent = cart.length;
  }
}

function renderCart() {
  const itemsDiv = document.getElementById('cart-items');
  const totalEl = document.getElementById('cart-total');
  const summaryDiv = document.getElementById('checkout-summary-list');
  const checkoutTotalEl = document.getElementById('checkout-total');
  const checkoutLink = document.getElementById('checkout-link');

  let total = 0;
  cart.forEach((item) => {
    total += item.total;
  });

  if (itemsDiv) {
    itemsDiv.innerHTML = '';

    if (cart.length === 0) {
      itemsDiv.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    } else {
      cart.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'cart-item';
        row.innerHTML = `
          <div>
            <strong>${item.qty} × ${item.name}</strong>
            <p>${item.size}</p>
            ${item.isSet && Array.isArray(item.items) ? `<p class="set-items">${item.items.join(' • ')}</p>` : ''}
            ${item.note ? `<p class="cart-note">Note: ${escapeHtml(item.note)}</p>` : ''}
          </div>
          <button type="button" class="remove-btn" onclick="removeItem(${index})">×</button>
        `;
        itemsDiv.appendChild(row);
      });
    }
  }

  if (summaryDiv) {
    summaryDiv.innerHTML = '';

    if (cart.length === 0) {
      summaryDiv.innerHTML = '<p class="empty-checkout">Your cart is empty. Add fragrances to continue.</p>';
    } else {
      const summaryList = document.createElement('div');
      summaryList.className = 'summary-list';

      cart.forEach((item) => {
        const itemRow = document.createElement('div');
        itemRow.className = 'summary-item';
        let inner = `
          <span>${item.qty} × ${item.name} (${item.size})</span>
          <strong>₹${item.total}</strong>
        `;

        if (item.isSet && Array.isArray(item.items) && item.items.length) {
          inner += `<div class="summary-set-items">Items: ${escapeHtml(item.items.join(', '))}</div>`;
        }

        if (item.note) {
          inner += `<div class="summary-note">Note: ${escapeHtml(item.note)}</div>`;
        }

        itemRow.innerHTML = inner;
        summaryList.appendChild(itemRow);
      });

      summaryDiv.appendChild(summaryList);
    }
  }

  if (totalEl) {
    totalEl.textContent = total;
  }

  if (checkoutTotalEl) {
    checkoutTotalEl.textContent = total;
  }

  if (checkoutLink) {
    const isDisabled = cart.length === 0;
    checkoutLink.classList.toggle('disabled', isDisabled);
    checkoutLink.setAttribute('aria-disabled', String(isDisabled));
    checkoutLink.style.pointerEvents = isDisabled ? 'none' : 'auto';
    checkoutLink.style.opacity = isDisabled ? '0.7' : '1';
  }
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartCount();
  renderCart();
}

function initRefillFlow() {
  const step1Form = document.getElementById('refill-step1-form');
  if (!step1Form) return;

  const fragranceInput = document.getElementById('refill-fragrance');
  const customSelect = document.getElementById('refill-custom-select');
  const optionsPopup = document.getElementById('refill-options-popup');
  const selectValue = document.getElementById('refill-select-value');

  if (fragranceInput && customSelect && optionsPopup && selectValue) {
    products.forEach((product) => {
      const optionButton = document.createElement('button');
      optionButton.type = 'button';
      optionButton.className = 'refill-option';
      optionButton.textContent = product.name;
      optionButton.addEventListener('click', () => {
        fragranceInput.value = product.name;
        selectValue.textContent = product.name;
        optionsPopup.querySelectorAll('.refill-option').forEach((btn) => btn.classList.remove('selected'));
        optionButton.classList.add('selected');
        optionsPopup.classList.remove('open');
        optionsPopup.setAttribute('aria-hidden', 'true');
        customSelect.setAttribute('aria-expanded', 'false');
      });
      optionsPopup.appendChild(optionButton);
    });

    customSelect.addEventListener('click', () => {
      const isOpen = optionsPopup.classList.toggle('open');
      optionsPopup.setAttribute('aria-hidden', String(!isOpen));
      customSelect.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!customSelect.contains(event.target) && !optionsPopup.contains(event.target)) {
        optionsPopup.classList.remove('open');
        optionsPopup.setAttribute('aria-hidden', 'true');
        customSelect.setAttribute('aria-expanded', 'false');
      }
    });
  }

  step1Form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fragrance = document.getElementById('refill-fragrance').value.trim();
    const fullName = document.getElementById('refill-full-name').value.trim();
    const phone = document.getElementById('refill-phone').value.trim();

    if (!fragrance || !fullName || !phone) {
      showRefillMessage('Please complete all fields to continue.', 'error');
      return;
    }

    sessionStorage.setItem('mono-refill-step1', JSON.stringify({ fragrance, fullName, phone }));
    window.location.href = 'refills-step2.html';
  });
}

async function handleCheckout(event) {
  event.preventDefault();

  const form = event.target;
  const name = document.getElementById('customer-name').value.trim();
  const number = document.getElementById('customer-number').value.trim();
  const address = document.getElementById('customer-address').value.trim();
  const messageBox = document.getElementById('form-message');

  if (!name || !number || !address) {
    if (messageBox) {
      messageBox.textContent = 'Please fill in all fields: name, mobile, and address.';
      messageBox.style.color = '#b85a5a';
    }
    return;
  }

  if (cart.length === 0) {
    if (messageBox) {
      messageBox.textContent = 'Please add at least one fragrance before placing the order.';
      messageBox.style.color = '#b85a5a';
    }
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.total, 0);
  let orderItems = '';
  cart.forEach((item) => {
    orderItems += `\n• ${item.qty}x ${item.name} (${item.size}) - ₹${item.total}`;
    if (item.isSet && Array.isArray(item.items) && item.items.length) {
      orderItems += `\n    Items: ${item.items.join(', ')}`;
    }
    if (item.note) {
      orderItems += `\n    Note: ${item.note}`;
    }
  });

  const whatsappMessage = `Hi Mono Fragrances,\n\nI would like to place an order:\n${orderItems}\n\n*Order Total: ₹${total}*\n\n*Customer Details:*\nName: ${name}\nMobile: ${number}\nAddress: ${address}`;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/919326487566?text=${encodedMessage}`;

  if (messageBox) {
    messageBox.textContent = 'Processing your order...';
    messageBox.style.color = '#c9a66b';
  }

  cart = [];
  saveCart();
  updateCartCount();
  renderCart();
  form.reset();

  if (messageBox) {
    messageBox.textContent = 'Order confirmed! Opening WhatsApp...';
    messageBox.style.color = '#27ae60';
  }

  window.open(whatsappUrl, '_blank');
}

function showRefillMessage(message, type = 'success') {
  const messageBox = document.querySelector('.refill-message');
  if (!messageBox) return;

  messageBox.textContent = message;
  messageBox.className = `refill-message ${type === 'error' ? 'refill-error' : 'refill-success'}`;
}

function initRefillStep2() {
  const form = document.getElementById('refill-step2-form');
  if (!form) return;

  const step1 = JSON.parse(sessionStorage.getItem('mono-refill-step1') || '{}');
  const summary = document.getElementById('refill-summary');
  if (summary && step1.fragrance) {
    summary.innerHTML = `
      <p><strong>Selected fragrance:</strong> ${step1.fragrance}</p>
      <p><strong>Full name:</strong> ${step1.fullName}</p>
      <p><strong>Phone no.:</strong> ${step1.phone}</p>
    `;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const address = document.getElementById('refill-address').value.trim();
    const email = document.getElementById('refill-email').value.trim();

    if (!address || !email) {
      showRefillMessage('Please add your address and email before continuing.', 'error');
      return;
    }

    const payload = { ...step1, address, email };
    const whatsappMessage = `Hi Mono Fragrances,\n\nI would like to request a refill.\n\nSelected fragrance: ${payload.fragrance}\nFull name: ${payload.fullName}\nPhone no.: ${payload.phone}\nAddress: ${payload.address}\nEmail: ${payload.email}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919326487566?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    showRefillMessage('Opening WhatsApp with your refill request...', 'success');
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  initRefillStep2();
});