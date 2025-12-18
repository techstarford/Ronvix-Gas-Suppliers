// Product Data - 32 gas cylinders with all brands and sizes
const gasCylinders = [
    {
        id: 1,
        name: "Shell Gas Cylinder 6kg",
        brand: "shell",
        size: "6kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 55000,
        oldPrice: 65000,
        rating: 4.5,
        reviews: 24,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Compact Shell gas cylinder perfect for single persons or small families. UN certified for safety.",
        features: ["UN Certified", "5-year warranty", "Safety valve included"]
    },
    {
        id: 2,
        name: "Total Gas Cylinder 13kg",
        brand: "total",
        size: "13kg",
        type: "lpg",
        certification: ["uncertified", "iso", "safety"],
        price: 95000,
        oldPrice: 110000,
        rating: 4.8,
        reviews: 36,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Standard size Total gas cylinder suitable for families of 3-4 persons. ISO certified quality.",
        features: ["ISO Certified", "Durable construction", "Easy to refill"]
    },
    {
        id: 3,
        name: "Oryx Gas Cylinder 25kg",
        brand: "oryx",
        size: "25kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 180000,
        oldPrice: 200000,
        rating: 4.7,
        reviews: 28,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Large Oryx gas cylinder ideal for medium families or small restaurants.",
        features: ["High capacity", "Stable base", "Safety tested"]
    },
    {
        id: 4,
        name: "Shell Gas Cylinder 50kg",
        brand: "shell",
        size: "50kg",
        type: "industrial",
        certification: ["uncertified", "iso", "safety"],
        price: 320000,
        oldPrice: 350000,
        rating: 4.9,
        reviews: 42,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Commercial grade Shell gas cylinder for hotels, restaurants, and institutions.",
        features: ["Industrial grade", "ISO Certified", "Heavy duty"]
    },
    {
        id: 5,
        name: "Stabex Gas Cylinder 13kg",
        brand: "stabex",
        size: "13kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 90000,
        oldPrice: 105000,
        rating: 4.4,
        reviews: 19,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Reliable Stabex gas cylinder with enhanced safety features for peace of mind.",
        features: ["Safety lock", "Durable valve", "Easy to transport"]
    },
    {
        id: 6,
        name: "Hass Gas Cylinder 6kg",
        brand: "hass",
        size: "6kg",
        type: "lpg",
        certification: ["safety"],
        price: 48000,
        oldPrice: null,
        rating: 4.2,
        reviews: 15,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Affordable Hass gas cylinder perfect for students and small households.",
        features: ["Budget friendly", "Lightweight", "Easy to use"]
    },
    {
        id: 7,
        name: "Hashi Gas Cylinder 25kg",
        brand: "hashi",
        size: "25kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 175000,
        oldPrice: 190000,
        rating: 4.3,
        reviews: 22,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Durable Hashi gas cylinder designed for extended family use.",
        features: ["Rust resistant", "Stable design", "Long lasting"]
    },
    {
        id: 8,
        name: "Mogas Gas Cylinder 13kg",
        brand: "mogas",
        size: "13kg",
        type: "lpg",
        certification: ["safety"],
        price: 92000,
        oldPrice: null,
        rating: 4.1,
        reviews: 17,
        inStock: false,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Modern Mogas gas cylinder with sleek design and reliable performance.",
        features: ["Modern design", "Easy grip handle", "Safety certified"]
    },
    {
        id: 9,
        name: "Meru Gas Cylinder 6kg",
        brand: "meru",
        size: "6kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 52000,
        oldPrice: 60000,
        rating: 4.6,
        reviews: 21,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Eco-friendly Meru gas cylinder made with sustainable materials.",
        features: ["Eco-friendly", "Lightweight", "Portable"]
    },
    {
        id: 10,
        name: "Total Gas Cylinder 50kg",
        brand: "total",
        size: "50kg",
        type: "industrial",
        certification: ["uncertified", "iso", "safety"],
        price: 310000,
        oldPrice: 340000,
        rating: 4.8,
        reviews: 31,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Heavy duty Total gas cylinder for commercial and industrial applications.",
        features: ["Industrial strength", "ISO Certified", "High pressure"]
    },
    {
        id: 11,
        name: "Oryx Gas Cylinder 6kg",
        brand: "oryx",
        size: "6kg",
        type: "lpg",
        certification: ["safety"],
        price: 50000,
        oldPrice: null,
        rating: 4.4,
        reviews: 18,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Compact Oryx gas cylinder with premium safety features.",
        features: ["Premium quality", "Safety valve", "Compact design"]
    },
    {
        id: 12,
        name: "Shell Gas Cylinder 25kg",
        brand: "shell",
        size: "25kg",
        type: "lpg",
        certification: ["uncertified", "iso", "safety"],
        price: 190000,
        oldPrice: 210000,
        rating: 4.7,
        reviews: 29,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Shell gas cylinder for medium to large families with ISO certification.",
        features: ["ISO Certified", "Durable", "Family size"]
    },
    {
        id: 13,
        name: "Stabex Gas Cylinder 25kg",
        brand: "stabex",
        size: "25kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 185000,
        oldPrice: 200000,
        rating: 4.5,
        reviews: 23,
        inStock: false,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Stabex gas cylinder with enhanced durability for long-term use.",
        features: ["Enhanced durability", "Safety tested", "Rust proof"]
    },
    {
        id: 14,
        name: "Hass Gas Cylinder 13kg",
        brand: "hass",
        size: "13kg",
        type: "lpg",
        certification: ["safety"],
        price: 88000,
        oldPrice: null,
        rating: 4.3,
        reviews: 20,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Affordable Hass gas cylinder suitable for small to medium families.",
        features: ["Affordable", "Reliable", "Easy maintenance"]
    },
    {
        id: 15,
        name: "Hashi Gas Cylinder 50kg",
        brand: "hashi",
        size: "50kg",
        type: "industrial",
        certification: ["uncertified", "safety"],
        price: 295000,
        oldPrice: 320000,
        rating: 4.6,
        reviews: 26,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Commercial Hashi gas cylinder for businesses and large institutions.",
        features: ["Commercial grade", "Heavy duty", "Long lifespan"]
    },
    {
        id: 16,
        name: "Mogas Gas Cylinder 25kg",
        brand: "mogas",
        size: "25kg",
        type: "lpg",
        certification: ["safety"],
        price: 178000,
        oldPrice: 195000,
        rating: 4.2,
        reviews: 16,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Modern design Mogas gas cylinder with advanced safety features.",
        features: ["Modern design", "Advanced safety", "Easy to handle"]
    },
    {
        id: 17,
        name: "Meru Gas Cylinder 13kg",
        brand: "meru",
        size: "13kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 94000,
        oldPrice: 105000,
        rating: 4.7,
        reviews: 25,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Eco-friendly Meru gas cylinder with sustainable manufacturing.",
        features: ["Sustainable", "Energy efficient", "Environment friendly"]
    },
    {
        id: 18,
        name: "Total Gas Cylinder 6kg",
        brand: "total",
        size: "6kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 53000,
        oldPrice: 60000,
        rating: 4.5,
        reviews: 22,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Compact Total gas cylinder with premium build quality.",
        features: ["Premium build", "Compact size", "Easy storage"]
    },
    {
        id: 19,
        name: "Oryx Gas Cylinder 13kg",
        brand: "oryx",
        size: "13kg",
        type: "lpg",
        certification: ["uncertified", "iso", "safety"],
        price: 97000,
        oldPrice: 110000,
        rating: 4.8,
        reviews: 33,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Standard Oryx gas cylinder with ISO certification for assured quality.",
        features: ["ISO Certified", "Standard size", "Reliable performance"]
    },
    {
        id: 20,
        name: "Shell Oxygen Cylinder 10L",
        brand: "shell",
        size: "10L",
        type: "oxygen",
        certification: ["uncertified", "iso", "safety"],
        price: 250000,
        oldPrice: 280000,
        rating: 4.9,
        reviews: 38,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Medical grade Shell oxygen cylinder for healthcare and industrial use.",
        features: ["Medical grade", "ISO Certified", "High purity"]
    },
    {
        id: 21,
        name: "Stabex Gas Cylinder 50kg",
        brand: "stabex",
        size: "50kg",
        type: "industrial",
        certification: ["uncertified", "safety"],
        price: 300000,
        oldPrice: 330000,
        rating: 4.6,
        reviews: 27,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Industrial Stabex gas cylinder for commercial cooking applications.",
        features: ["Industrial use", "Heavy duty", "Commercial grade"]
    },
    {
        id: 22,
        name: "Hass Gas Cylinder 25kg",
        brand: "hass",
        size: "25kg",
        type: "lpg",
        certification: ["safety"],
        price: 170000,
        oldPrice: 185000,
        rating: 4.4,
        reviews: 19,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Affordable Hass gas cylinder for medium to large families.",
        features: ["Budget friendly", "Large capacity", "Durable"]
    },
    {
        id: 23,
        name: "Mogas Gas Cylinder 50kg",
        brand: "mogas",
        size: "50kg",
        type: "industrial",
        certification: ["safety"],
        price: 290000,
        oldPrice: 315000,
        rating: 4.3,
        reviews: 18,
        inStock: false,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Modern Mogas gas cylinder designed for commercial kitchens.",
        features: ["Modern design", "Commercial use", "Efficient"]
    },
    {
        id: 24,
        name: "Meru Gas Cylinder 25kg",
        brand: "meru",
        size: "25kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 182000,
        oldPrice: 200000,
        rating: 4.7,
        reviews: 24,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Eco-friendly Meru gas cylinder with large capacity for families.",
        features: ["Eco-friendly", "Large capacity", "Sustainable"]
    },
    {
        id: 25,
        name: "Total Oxygen Cylinder 5L",
        brand: "total",
        size: "5L",
        type: "oxygen",
        certification: ["uncertified", "iso", "safety"],
        price: 150000,
        oldPrice: 170000,
        rating: 4.8,
        reviews: 30,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Smaller Total oxygen cylinder for medical and therapeutic use.",
        features: ["Medical use", "Portable", "ISO Certified"]
    },
    {
        id: 26,
        name: "Shell Disposable Cylinder 3kg",
        brand: "shell",
        size: "3kg",
        type: "disposable",
        certification: ["safety"],
        price: 35000,
        oldPrice: null,
        rating: 4.2,
        reviews: 14,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Convenient Shell disposable gas cylinder for camping and emergencies.",
        features: ["Disposable", "Portable", "Emergency use"]
    },
    {
        id: 27,
        name: "Oryx Refillable Cylinder 13kg",
        brand: "oryx",
        size: "13kg",
        type: "refillable",
        certification: ["uncertified", "safety"],
        price: 105000,
        oldPrice: 120000,
        rating: 4.6,
        reviews: 26,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Oryx refillable gas cylinder with easy refill mechanism.",
        features: ["Refillable", "Easy mechanism", "Cost effective"]
    },
    {
        id: 28,
        name: "Hashi Gas Cylinder 13kg",
        brand: "hashi",
        size: "13kg",
        type: "lpg",
        certification: ["uncertified", "safety"],
        price: 91000,
        oldPrice: 100000,
        rating: 4.4,
        reviews: 21,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Standard Hashi gas cylinder for everyday cooking needs.",
        features: ["Everyday use", "Reliable", "Value for money"]
    },
    {
        id: 29,
        name: "Stabex Gas Cylinder 6kg",
        brand: "stabex",
        size: "6kg",
        type: "lpg",
        certification: ["safety"],
        price: 49000,
        oldPrice: null,
        rating: 4.3,
        reviews: 16,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Compact Stabex gas cylinder with enhanced safety features.",
        features: ["Compact size", "Enhanced safety", "Easy to store"]
    },
    {
        id: 30,
        name: "Mogas Gas Cylinder 6kg",
        brand: "mogas",
        size: "6kg",
        type: "lpg",
        certification: ["safety"],
        price: 47000,
        oldPrice: null,
        rating: 4.1,
        reviews: 13,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Modern design Mogas gas cylinder in compact size.",
        features: ["Modern design", "Compact", "Stylish"]
    },
    {
        id: 31,
        name: "Meru Industrial Cylinder 50kg",
        brand: "meru",
        size: "50kg",
        type: "industrial",
        certification: ["uncertified", "safety"],
        price: 285000,
        oldPrice: 310000,
        rating: 4.5,
        reviews: 23,
        inStock: true,
        image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Eco-friendly industrial gas cylinder from Meru for businesses.",
        features: ["Eco-friendly", "Industrial grade", "Sustainable"]
    },
    {
        id: 32,
        name: "Total Refillable Cylinder 25kg",
        brand: "total",
        size: "25kg",
        type: "refillable",
        certification: ["uncertified", "iso", "safety"],
        price: 195000,
        oldPrice: 215000,
        rating: 4.7,
        reviews: 28,
        inStock: true,
        image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        description: "Total refillable gas cylinder with ISO certification for quality assurance.",
        features: ["Refillable", "ISO Certified", "Large capacity"]
    }
];

// Global variables
let currentProducts = [...gasCylinders];
let currentPage = 1;
const productsPerPage = 12;
let cartCount = 0;
let wishlist = new Set();
let compareSet = new Set();

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const noResults = document.getElementById('noResults');
const pagination = document.getElementById('pagination');
const showingCount = document.getElementById('showingCount');
const totalCount = document.getElementById('totalCount');
const activeFilters = document.getElementById('activeFilters');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const filterToggle = document.getElementById('filterToggle');
const productsSidebar = document.getElementById('productsSidebar');
const sidebarClose = document.getElementById('sidebarClose');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const viewBtns = document.querySelectorAll('.view-btn');
const quickViewModal = document.getElementById('quickViewModal');
const cartModal = document.getElementById('cartModal');
const continueShoppingBtn = document.getElementById('continueShopping');
const cartItemName = document.getElementById('cartItemName');
const activeFilterCount = document.querySelector('.active-filter-count');

// Filter state
let filters = {
    size: 'all',
    brands: ['all'],
    minPrice: 0,
    maxPrice: 500000,
    types: ['all'],
    certifications: ['all'],
    availability: ['all'],
    search: ''
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    renderProducts();
    updateActiveFilterCount();
});

function initializePage() {
    // Initialize price slider
    const priceSlider = document.getElementById('priceSlider');
    const minPriceInput = document.getElementById('minPrice');
    const maxPriceInput = document.getElementById('maxPrice');
    
    noUiSlider.create(priceSlider, {
        start: [0, 500000],
        connect: true,
        range: {
            'min': 0,
            'max': 500000
        },
        step: 10000,
        format: {
            to: function(value) {
                return Math.round(value);
            },
            from: function(value) {
                return Number(value);
            }
        }
    });
    
    priceSlider.noUiSlider.on('update', function(values) {
        const [min, max] = values;
        minPriceInput.value = Math.round(min);
        maxPriceInput.value = Math.round(max);
        filters.minPrice = Math.round(min);
        filters.maxPrice = Math.round(max);
    });
    
    minPriceInput.addEventListener('change', function() {
        priceSlider.noUiSlider.set([this.value, null]);
    });
    
    maxPriceInput.addEventListener('change', function() {
        priceSlider.noUiSlider.set([null, this.value]);
    });
    
    // Initialize brand search
    const brandSearch = document.getElementById('brandSearch');
    brandSearch.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const brandOptions = document.querySelectorAll('.brand-option');
        
        brandOptions.forEach(option => {
            const brandName = option.querySelector('.brand-name').textContent.toLowerCase();
            if (brandName.includes(searchTerm) || searchTerm === '') {
                option.style.display = 'flex';
            } else {
                option.style.display = 'none';
            }
        });
    });
    
    // Setup footer filter links
    document.querySelectorAll('[data-filter-size]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const size = this.getAttribute('data-filter-size');
            document.querySelector(`.size-option[data-size="${size}"] input`).checked = true;
            filters.size = size;
            applyFilters();
        });
    });
}

function setupEventListeners() {
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    sidebarClose.addEventListener('click', () => productsSidebar.classList.remove('active'));
    filterToggle.addEventListener('click', () => productsSidebar.classList.add('active'));
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
        if (!productsSidebar.contains(event.target) && event.target !== filterToggle) {
            productsSidebar.classList.remove('active');
        }
    });
    
    // View mode toggle
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.dataset.view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', applySearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') applySearch();
    });
    
    // Size filter
    document.querySelectorAll('.size-option input').forEach(radio => {
        radio.addEventListener('change', function() {
            filters.size = this.value;
        });
    });
    
    // Brand filter
    document.querySelectorAll('.brand-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const brand = this.value;
            const allBrandsCheckbox = document.querySelector('.brand-checkbox[value="all"]');
            
            if (brand === 'all') {
                if (this.checked) {
                    document.querySelectorAll('.brand-checkbox:not([value="all"])').forEach(cb => {
                        cb.checked = false;
                    });
                    filters.brands = ['all'];
                }
            } else {
                allBrandsCheckbox.checked = false;
                if (this.checked) {
                    filters.brands.push(brand);
                } else {
                    filters.brands = filters.brands.filter(b => b !== brand);
                }
                
                if (filters.brands.length === 0) {
                    allBrandsCheckbox.checked = true;
                    filters.brands = ['all'];
                }
            }
        });
    });
    
    // Type filter
    document.querySelectorAll('.type-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const type = this.value;
            const allTypesCheckbox = document.querySelector('.type-checkbox[value="all"]');
            
            if (type === 'all') {
                if (this.checked) {
                    document.querySelectorAll('.type-checkbox:not([value="all"])').forEach(cb => {
                        cb.checked = false;
                    });
                    filters.types = ['all'];
                }
            } else {
                allTypesCheckbox.checked = false;
                if (this.checked) {
                    filters.types.push(type);
                } else {
                    filters.types = filters.types.filter(t => t !== type);
                }
                
                if (filters.types.length === 0) {
                    allTypesCheckbox.checked = true;
                    filters.types = ['all'];
                }
            }
        });
    });
    
    // Certification filter
    document.querySelectorAll('.certification-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const cert = this.value;
            const allCertCheckbox = document.querySelector('.certification-checkbox[value="all"]');
            
            if (cert === 'all') {
                if (this.checked) {
                    document.querySelectorAll('.certification-checkbox:not([value="all"])').forEach(cb => {
                        cb.checked = false;
                    });
                    filters.certifications = ['all'];
                }
            } else {
                allCertCheckbox.checked = false;
                if (this.checked) {
                    filters.certifications.push(cert);
                } else {
                    filters.certifications = filters.certifications.filter(c => c !== cert);
                }
                
                if (filters.certifications.length === 0) {
                    allCertCheckbox.checked = true;
                    filters.certifications = ['all'];
                }
            }
        });
    });
    
    // Availability filter
    document.querySelectorAll('.availability-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const availability = this.value;
            const allAvailabilityCheckbox = document.querySelector('.availability-checkbox[value="all"]');
            
            if (availability === 'all') {
                if (this.checked) {
                    document.querySelectorAll('.availability-checkbox:not([value="all"])').forEach(cb => {
                        cb.checked = false;
                    });
                    filters.availability = ['all'];
                }
            } else {
                allAvailabilityCheckbox.checked = false;
                if (this.checked) {
                    filters.availability.push(availability);
                } else {
                    filters.availability = filters.availability.filter(a => a !== availability);
                }
                
                if (filters.availability.length === 0) {
                    allAvailabilityCheckbox.checked = true;
                    filters.availability = ['all'];
                }
            }
        });
    });
    
    // Filter actions
    applyFiltersBtn.addEventListener('click', applyFilters);
    resetFiltersBtn.addEventListener('click', resetFilters);
    clearFiltersBtn.addEventListener('click', resetFilters);
    
    // Sorting
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
        renderProducts();
    });
    
    // Modal close buttons
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Continue shopping
    continueShoppingBtn.addEventListener('click', () => cartModal.classList.remove('active'));
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function applySearch() {
    filters.search = searchInput.value.toLowerCase();
    applyFilters();
}

function applyFilters() {
    currentPage = 1;
    filterProducts();
    renderProducts();
    updateActiveFilterCount();
    productsSidebar.classList.remove('active');
}

function resetFilters() {
    // Reset filter state
    filters = {
        size: 'all',
        brands: ['all'],
        minPrice: 0,
        maxPrice: 500000,
        types: ['all'],
        certifications: ['all'],
        availability: ['all'],
        search: ''
    };
    
    // Reset UI
    document.querySelector('.size-option[data-size="all"] input').checked = true;
    document.querySelectorAll('.size-option:not([data-size="all"]) input').forEach(radio => {
        radio.checked = false;
    });
    
    document.querySelector('.brand-checkbox[value="all"]').checked = true;
    document.querySelectorAll('.brand-checkbox:not([value="all"])').forEach(cb => {
        cb.checked = false;
    });
    
    document.querySelector('.type-checkbox[value="all"]').checked = true;
    document.querySelectorAll('.type-checkbox:not([value="all"])').forEach(cb => {
        cb.checked = false;
    });
    
    document.querySelector('.certification-checkbox[value="all"]').checked = true;
    document.querySelectorAll('.certification-checkbox:not([value="all"])').forEach(cb => {
        cb.checked = false;
    });
    
    document.querySelector('.availability-checkbox[value="all"]').checked = true;
    document.querySelectorAll('.availability-checkbox:not([value="all"])').forEach(cb => {
        cb.checked = false;
    });
    
    searchInput.value = '';
    
    // Reset price slider
    const priceSlider = document.getElementById('priceSlider');
    priceSlider.noUiSlider.set([0, 500000]);
    document.getElementById('minPrice').value = 0;
    document.getElementById('maxPrice').value = 500000;
    
    // Reset sort
    sortSelect.value = 'default';
    
    // Apply reset
    applyFilters();
}

function filterProducts() {
    currentProducts = gasCylinders.filter(product => {
        // Size filter
        if (filters.size !== 'all' && product.size !== filters.size) {
            return false;
        }
        
        // Brand filter
        if (!filters.brands.includes('all') && !filters.brands.includes(product.brand)) {
            return false;
        }
        
        // Price filter
        if (product.price < filters.minPrice || product.price > filters.maxPrice) {
            return false;
        }
        
        // Type filter
        if (!filters.types.includes('all') && !filters.types.includes(product.type)) {
            return false;
        }
        
        // Certification filter
        if (!filters.certifications.includes('all')) {
            const hasCert = filters.certifications.some(cert => 
                product.certification.includes(cert)
            );
            if (!hasCert) return false;
        }
        
        // Availability filter
        if (!filters.availability.includes('all')) {
            if (filters.availability.includes('in-stock') && !product.inStock) {
                return false;
            }
            if (filters.availability.includes('pre-order') && product.inStock) {
                return false;
            }
        }
        
        // Search filter
        if (filters.search) {
            const searchTerms = filters.search.toLowerCase().split(' ');
            const productText = (
                product.name + ' ' + 
                product.brand + ' ' + 
                product.size + ' ' + 
                product.description
            ).toLowerCase();
            
            if (!searchTerms.every(term => productText.includes(term))) {
                return false;
            }
        }
        
        return true;
    });
    
    // Update counts
    totalCount.textContent = currentProducts.length;
    updateActiveFiltersDisplay();
}

function sortProducts(sortType) {
    switch(sortType) {
        case 'price-low':
            currentProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            currentProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            currentProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'popular':
            currentProducts.sort((a, b) => b.reviews - a.reviews);
            break;
        case 'new':
            currentProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            currentProducts.sort((a, b) => a.id - b.id);
    }
}

function renderProducts() {
    loadingSpinner.style.display = 'block';
    productsGrid.innerHTML = '';
    
    setTimeout(() => {
        const startIndex = (currentPage - 1) * productsPerPage;
        const endIndex = startIndex + productsPerPage;
        const pageProducts = currentProducts.slice(startIndex, endIndex);
        
        if (pageProducts.length === 0) {
            noResults.style.display = 'block';
            productsGrid.style.display = 'none';
            pagination.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            productsGrid.style.display = 'grid';
            pagination.style.display = 'flex';
            
            pageProducts.forEach(product => {
                const productCard = createProductCard(product);
                productsGrid.appendChild(productCard);
            });
            
            updatePagination();
            updateShowingCount();
        }
        
        loadingSpinner.style.display = 'none';
    }, 300);
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.dataset.id = product.id;
    
    // Determine badges
    let badges = '';
    if (product.rating >= 4.7) {
        badges += '<span class="product-badge best-seller">Best Seller</span>';
    }
    if (!product.oldPrice && product.id <= 5) {
        badges += '<span class="product-badge new">New</span>';
    }
    if (product.oldPrice && (product.price / product.oldPrice) < 0.9) {
        const discount = Math.round((1 - product.price / product.oldPrice) * 100);
        badges += `<span class="product-badge discount">-${discount}%</span>`;
    }
    if (product.inStock && product.size === '50kg') {
        badges += '<span class="product-badge free-delivery">Free Delivery</span>';
    }
    
    // Create rating stars
    const ratingStars = createRatingStars(product.rating);
    
    // Create specs
    const specs = `
        <div class="product-spec">
            <i class="fas fa-weight"></i>
            <span>${product.size}</span>
        </div>
        <div class="product-spec">
            <i class="fas fa-certificate"></i>
            <span>${product.certification.length} Certifications</span>
        </div>
        <div class="product-spec">
            <i class="fas fa-check-circle"></i>
            <span>${product.inStock ? 'In Stock' : 'Pre-Order'}</span>
        </div>
    `;
    
    card.innerHTML = `
        <div class="product-badges">
            ${badges}
        </div>
        <div class="product-img">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
                <button class="quick-view" title="Quick View" data-id="${product.id}">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="add-to-wishlist ${wishlist.has(product.id) ? 'active' : ''}" title="Add to Wishlist" data-id="${product.id}">
                    <i class="${wishlist.has(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
                <button class="add-to-compare" title="Add to Compare" data-id="${product.id}">
                    <i class="fas fa-exchange-alt"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-meta">
                <p class="product-category">${product.type.toUpperCase()}</p>
                <span class="product-brand">${product.brand.toUpperCase()}</span>
            </div>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-specs">
                ${specs}
            </div>
            <p class="product-description">${product.description}</p>
            <div class="product-footer">
                <div class="product-price">
                    <span class="current-price">UGX ${product.price.toLocaleString()}</span>
                    ${product.oldPrice ? `<span class="old-price">UGX ${product.oldPrice.toLocaleString()}</span>` : ''}
                </div>
                <div class="product-rating">
                    ${ratingStars}
                    <span class="rating-count">(${product.reviews})</span>
                </div>
            </div>
            <button class="add-to-cart" data-id="${product.id}">
                <i class="fas fa-shopping-cart"></i>
                Add to Cart
            </button>
        </div>
    `;
    
    // Add event listeners to buttons
    const addToCartBtn = card.querySelector('.add-to-cart');
    const quickViewBtn = card.querySelector('.quick-view');
    const wishlistBtn = card.querySelector('.add-to-wishlist');
    const compareBtn = card.querySelector('.add-to-compare');
    
    addToCartBtn.addEventListener('click', () => addToCart(product));
    quickViewBtn.addEventListener('click', () => showQuickView(product));
    wishlistBtn.addEventListener('click', () => toggleWishlist(product, wishlistBtn));
    compareBtn.addEventListener('click', () => addToCompare(product));
    
    return card;
}

function createRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return `<div class="stars">${stars}</div>`;
}

function updatePagination() {
    const totalPages = Math.ceil(currentProducts.length / productsPerPage);
    pagination.innerHTML = '';
    
    if (totalPages <= 1) {
        pagination.style.display = 'none';
        return;
    }
    
    // Previous button
    const prevBtn = document.createElement('button');
    prevBtn.className = `page-btn ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
        }
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        const firstPageBtn = document.createElement('button');
        firstPageBtn.className = 'page-btn';
        firstPageBtn.textContent = '1';
        firstPageBtn.addEventListener('click', () => {
            currentPage = 1;
            renderProducts();
        });
        pagination.appendChild(firstPageBtn);
        
        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.className = 'page-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
        });
        pagination.appendChild(pageBtn);
    }
    
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.className = 'page-dots';
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
        
        const lastPageBtn = document.createElement('button');
        lastPageBtn.className = 'page-btn';
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener('click', () => {
            currentPage = totalPages;
            renderProducts();
        });
        pagination.appendChild(lastPageBtn);
    }
    
    // Next button
    const nextBtn = document.createElement('button');
    nextBtn.className = `page-btn ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderProducts();
        }
    });
    pagination.appendChild(nextBtn);
}

function updateShowingCount() {
    const startIndex = (currentPage - 1) * productsPerPage + 1;
    const endIndex = Math.min(currentPage * productsPerPage, currentProducts.length);
    showingCount.textContent = `${startIndex}-${endIndex}`;
}

function updateActiveFiltersDisplay() {
    activeFilters.innerHTML = '';
    
    // Size filter
    if (filters.size !== 'all') {
        const filter = createActiveFilter('Size', filters.size, 'size');
        activeFilters.appendChild(filter);
    }
    
    // Brand filters
    if (!filters.brands.includes('all')) {
        filters.brands.forEach(brand => {
            const filter = createActiveFilter('Brand', brand, 'brand', brand);
            activeFilters.appendChild(filter);
        });
    }
    
    // Price filter
    if (filters.minPrice > 0 || filters.maxPrice < 500000) {
        const label = `UGX ${filters.minPrice.toLocaleString()} - UGX ${filters.maxPrice.toLocaleString()}`;
        const filter = createActiveFilter('Price', label, 'price');
        activeFilters.appendChild(filter);
    }
    
    // Type filters
    if (!filters.types.includes('all')) {
        filters.types.forEach(type => {
            const filter = createActiveFilter('Type', type, 'type', type);
            activeFilters.appendChild(filter);
        });
    }
    
    // Certification filters
    if (!filters.certifications.includes('all')) {
        filters.certifications.forEach(cert => {
            const filter = createActiveFilter('Certification', cert, 'certification', cert);
            activeFilters.appendChild(filter);
        });
    }
    
    // Availability filters
    if (!filters.availability.includes('all')) {
        filters.availability.forEach(avail => {
            const filter = createActiveFilter('Availability', avail, 'availability', avail);
            activeFilters.appendChild(filter);
        });
    }
    
    // Search filter
    if (filters.search) {
        const filter = createActiveFilter('Search', filters.search, 'search');
        activeFilters.appendChild(filter);
    }
}

function createActiveFilter(category, value, type, specificValue = null) {
    const filter = document.createElement('div');
    filter.className = 'active-filter';
    filter.innerHTML = `
        <span>${category}: ${value}</span>
        <button class="remove-filter" data-type="${type}" data-value="${specificValue || value}">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    const removeBtn = filter.querySelector('.remove-filter');
    removeBtn.addEventListener('click', function() {
        const filterType = this.dataset.type;
        const filterValue = this.dataset.value;
        
        removeFilter(filterType, filterValue);
    });
    
    return filter;
}

function removeFilter(type, value) {
    switch(type) {
        case 'size':
            filters.size = 'all';
            document.querySelector('.size-option[data-size="all"] input').checked = true;
            break;
        case 'brand':
            filters.brands = filters.brands.filter(b => b !== value);
            document.querySelector(`.brand-checkbox[value="${value}"]`).checked = false;
            if (filters.brands.length === 0) {
                filters.brands = ['all'];
                document.querySelector('.brand-checkbox[value="all"]').checked = true;
            }
            break;
        case 'price':
            filters.minPrice = 0;
            filters.maxPrice = 500000;
            const priceSlider = document.getElementById('priceSlider');
            priceSlider.noUiSlider.set([0, 500000]);
            document.getElementById('minPrice').value = 0;
            document.getElementById('maxPrice').value = 500000;
            break;
        case 'type':
            filters.types = filters.types.filter(t => t !== value);
            document.querySelector(`.type-checkbox[value="${value}"]`).checked = false;
            if (filters.types.length === 0) {
                filters.types = ['all'];
                document.querySelector('.type-checkbox[value="all"]').checked = true;
            }
            break;
        case 'certification':
            filters.certifications = filters.certifications.filter(c => c !== value);
            document.querySelector(`.certification-checkbox[value="${value}"]`).checked = false;
            if (filters.certifications.length === 0) {
                filters.certifications = ['all'];
                document.querySelector('.certification-checkbox[value="all"]').checked = true;
            }
            break;
        case 'availability':
            filters.availability = filters.availability.filter(a => a !== value);
            document.querySelector(`.availability-checkbox[value="${value}"]`).checked = false;
            if (filters.availability.length === 0) {
                filters.availability = ['all'];
                document.querySelector('.availability-checkbox[value="all"]').checked = true;
            }
            break;
        case 'search':
            filters.search = '';
            searchInput.value = '';
            break;
    }
    
    applyFilters();
}

function updateActiveFilterCount() {
    let count = 0;
    
    if (filters.size !== 'all') count++;
    if (!filters.brands.includes('all')) count += filters.brands.length;
    if (filters.minPrice > 0 || filters.maxPrice < 500000) count++;
    if (!filters.types.includes('all')) count += filters.types.length;
    if (!filters.certifications.includes('all')) count += filters.certifications.length;
    if (!filters.availability.includes('all')) count += filters.availability.length;
    if (filters.search) count++;
    
    activeFilterCount.textContent = count;
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function addToCart(product) {
    cartCount++;
    updateCartCount();
    
    // Show cart modal
    cartItemName.textContent = product.name;
    cartModal.classList.add('active');
    
    // Update button text temporarily
    const addToCartBtn = document.querySelector(`.add-to-cart[data-id="${product.id}"]`);
    const originalText = addToCartBtn.innerHTML;
    addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added';
    addToCartBtn.style.backgroundColor = '#2ecc71';
    
    setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.backgroundColor = '';
    }, 2000);
}

function updateCartCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

function showQuickView(product) {
    const modalContent = document.querySelector('.quick-view-content');
    const ratingStars = createRatingStars(product.rating);
    
    // Create features list
    const featuresList = product.features.map(feature => `
        <div class="feature-item">
            <i class="fas fa-check"></i>
            <span>${feature}</span>
        </div>
    `).join('');
    
    modalContent.innerHTML = `
        <div class="quick-view-img">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="quick-view-info">
            <h2>${product.name}</h2>
            <div class="quick-view-meta">
                <span class="quick-view-brand">${product.brand.toUpperCase()}</span>
                <span class="quick-view-category">${product.type.toUpperCase()}</span>
            </div>
            <div class="quick-view-price">
                UGX ${product.price.toLocaleString()}
                ${product.oldPrice ? `<span style="font-size: 18px; color: #95a5a6; text-decoration: line-through; margin-left: 10px;">UGX ${product.oldPrice.toLocaleString()}</span>` : ''}
            </div>
            <div class="quick-view-rating">
                ${ratingStars}
                <span class="reviews">${product.reviews} reviews</span>
            </div>
            <div class="quick-view-specs">
                <div class="spec-item">
                    <span class="spec-label">Size</span>
                    <span class="spec-value">${product.size}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Brand</span>
                    <span class="spec-value">${product.brand.charAt(0).toUpperCase() + product.brand.slice(1)}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Type</span>
                    <span class="spec-value">${product.type.toUpperCase()}</span>
                </div>
                <div class="spec-item">
                    <span class="spec-label">Availability</span>
                    <span class="spec-value">${product.inStock ? 'In Stock' : 'Pre-Order Only'}</span>
                </div>
            </div>
            <div class="quick-view-description">
                <p>${product.description}</p>
            </div>
            <div class="quick-view-actions">
                <div class="quantity-selector">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" class="quantity-input" value="1" min="1" max="10">
                    <button class="quantity-btn plus">+</button>
                </div>
                <button class="btn btn-primary add-to-cart-quick" data-id="${product.id}">
                    <i class="fas fa-shopping-cart"></i>
                    Add to Cart
                </button>
                <button class="btn btn-outline add-to-wishlist-quick ${wishlist.has(product.id) ? 'active' : ''}" data-id="${product.id}">
                    <i class="${wishlist.has(product.id) ? 'fas' : 'far'} fa-heart"></i>
                </button>
            </div>
            <div class="quick-view-features">
                <h4>Key Features</h4>
                <div class="feature-list">
                    ${featuresList}
                </div>
            </div>
        </div>
    `;
    
    // Add event listeners for quick view
    const addToCartBtn = modalContent.querySelector('.add-to-cart-quick');
    const wishlistBtn = modalContent.querySelector('.add-to-wishlist-quick');
    const minusBtn = modalContent.querySelector('.quantity-btn.minus');
    const plusBtn = modalContent.querySelector('.quantity-btn.plus');
    const quantityInput = modalContent.querySelector('.quantity-input');
    
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
        quickViewModal.classList.remove('active');
    });
    
    wishlistBtn.addEventListener('click', () => {
        toggleWishlist(product, wishlistBtn);
    });
    
    minusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });
    
    plusBtn.addEventListener('click', () => {
        let value = parseInt(quantityInput.value);
        if (value < 10) {
            quantityInput.value = value + 1;
        }
    });
    
    quickViewModal.classList.add('active');
}

function toggleWishlist(product, button) {
    if (wishlist.has(product.id)) {
        wishlist.delete(product.id);
        button.classList.remove('active');
        if (button.querySelector('i')) {
            button.innerHTML = '<i class="far fa-heart"></i>';
        }
    } else {
        wishlist.add(product.id);
        button.classList.add('active');
        if (button.querySelector('i')) {
            button.innerHTML = '<i class="fas fa-heart"></i>';
        }
        
        // Show feedback
        const originalHTML = button.innerHTML;
        if (button.classList.contains('add-to-wishlist')) {
            button.innerHTML = '<i class="fas fa-check"></i>';
            setTimeout(() => {
                button.innerHTML = originalHTML;
            }, 1000);
        }
    }
}

function addToCompare(product) {
    if (compareSet.has(product.id)) {
        compareSet.delete(product.id);
        alert(`Removed ${product.name} from compare list`);
    } else {
        if (compareSet.size >= 4) {
            alert('You can compare up to 4 products at a time');
            return;
        }
        compareSet.add(product.id);
        alert(`Added ${product.name} to compare list`);
    }
}