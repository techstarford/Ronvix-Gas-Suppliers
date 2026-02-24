/**
 * RonVick Gas - Products Page
 * Complete production script with full‑card quick view.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== CONSTANTS ==========
    const CART_STORAGE_KEY = 'ronvick_cart';
    const WISHLIST_STORAGE_KEY = 'ronvick_wishlist';
    const AUTH_TOKEN_KEY = 'authToken';
    const AUTH_USER_KEY = 'authUser';

    // ========== ALL PRODUCTS DATA (24 items) ==========
    const allProducts = [
        {
            id: 'prod_50kg',
            name: 'Heavy Duty Gas Cylinder - 50kg',
            category: 'LPG Cylinders',
            price: 299999,
            oldPrice: 349999,
            image: '../assets/images/gas1.jpg',
            rating: 4.5,
            reviews: 24,
            badge: 'best-seller',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_regulator',
            name: 'Premium Gas Pressure Regulator',
            category: 'Accessories',
            price: 49999,
            oldPrice: null,
            image: '../assets/images/accessories/Gas cylinder LPG bottle regulator.jpg',
            rating: 4,
            reviews: 18,
            badge: 'new',
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_stove',
            name: 'Portable Gas Stove with Cylinder',
            category: 'Cooking Equipment',
            price: 89999,
            oldPrice: 109999,
            image: '../assets/images/gas4.jpg',
            rating: 5,
            reviews: 42,
            badge: null,
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_detector',
            name: 'Digital Gas Leak Detector',
            category: 'Safety Equipment',
            price: 59999,
            oldPrice: 79999,
            image: '../assets/images/accessories/CEM Gas Leak Detector Pro in Tools & Hardware _ Hand Tools _ Measuring & Levels.jpg',
            rating: 4,
            reviews: 31,
            badge: 'discount',
            brand: 'SafeGas',
            inStock: true
        },
        {
            id: 'prod_oxygen10l',
            name: 'Medical Oxygen Cylinder - 10L',
            category: 'Oxygen Cylinders',
            price: 199999,
            oldPrice: null,
            image: '../assets/images/accessories/Portable Oxygen Cylinder For Rent In Bangalore.jpg',
            rating: 4.5,
            reviews: 15,
            badge: null,
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_cart',
            name: 'Heavy Duty Cylinder Transport Cart',
            category: 'Accessories',
            price: 129999,
            oldPrice: null,
            image: '../assets/images/accessories/Gas Cylinder Trolley.jpg',
            rating: 5,
            reviews: 12,
            badge: null,
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_camping',
            name: 'Camping Gas Kit with 5kg Cylinder',
            category: 'Outdoor',
            price: 149999,
            oldPrice: 179999,
            image: '../assets/images/camping gas kit.jpg',
            rating: 4.5,
            reviews: 27,
            badge: 'new',
            brand: 'FlameMaster',
            inStock: true
        },
        {
            id: 'prod_hose',
            name: 'High Pressure Gas Hose - 2m',
            category: 'Accessories',
            price: 29999,
            oldPrice: null,
            image: '../assets/images/accessories/Pigtail Hose Pipe.jpg',
            rating: 4,
            reviews: 8,
            badge: null,
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_13kg',
            name: 'Standard Gas Cylinder - 13kg',
            category: 'LPG Cylinders',
            price: 99999,
            oldPrice: null,
            image: '../assets/images/Oryx Gas 13kg Cylinder + Regulator + Hosepipe.jpg',
            rating: 5,
            reviews: 36,
            badge: 'best-seller',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_burner',
            name: 'Commercial Gas Burner',
            category: 'Cooking Equipment',
            price: 79999,
            oldPrice: 89999,
            image: '../assets/images/accessories/Burner  aluminum gas cover.jpg',
            rating: 4.5,
            reviews: 19,
            badge: null,
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_grill',
            name: 'Portable Gas Grill',
            category: 'Outdoor',
            price: 119999,
            oldPrice: 149999,
            image: '../assets/images/accessories/Butane Grill Stove, Portable Camping Grill Gas Stove, Portable Butane Gas Stove.jpg',
            rating: 4,
            reviews: 14,
            badge: 'discount',
            brand: 'FlameMaster',
            inStock: true
        },
        {
            id: 'prod_heater',
            name: 'Indoor Gas Heater',
            category: 'Heating',
            price: 159999,
            oldPrice: null,
            image: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
            rating: 4.5,
            reviews: 11,
            badge: null,
            brand: 'SafeGas',
            inStock: true
        },
        {
            id: 'prod_6kg',
            name: 'Eco-Friendly Gas Cylinder - 6kg',
            category: 'LPG Cylinders',
            price: 69999,
            oldPrice: null,
            image: '../assets/images/6kg Gas Cylinder.jpg',
            rating: 4,
            reviews: 7,
            badge: 'new',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_adapter',
            name: 'Universal Gas Adapter',
            category: 'Accessories',
            price: 19999,
            oldPrice: null,
            image: '../assets/images/accessories/Universal Adapter Quickly Attach System For Camp Stove Grills And Cookers.jpg',
            rating: 3.5,
            reviews: 5,
            badge: null,
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_oven',
            name: 'Professional Gas Oven',
            category: 'Cooking Equipment',
            price: 249999,
            oldPrice: 299999,
            image: '../assets/images/accessories/Professional Propane Range in Stainless Steel, LRG3601ULP - 36 _ Stainless Steel.jpg',
            rating: 5,
            reviews: 28,
            badge: 'best-seller',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_mask',
            name: 'Industrial Gas Mask',
            category: 'Safety Equipment',
            price: 89999,
            oldPrice: null,
            image: '../assets/images/gas-safety-gear/industrial face mask.jpg',
            rating: 4,
            reviews: 13,
            badge: null,
            brand: 'SafeGas',
            inStock: true
        },
        {
            id: 'prod_25kg',
            name: 'Standard Gas Cylinder - 25kg',
            category: 'LPG Cylinders',
            price: 179999,
            oldPrice: 199999,
            image: '../assets/images/cooking gas 8.jpg',
            rating: 4.5,
            reviews: 21,
            badge: 'discount',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_valve',
            name: 'Safety Gas Valve',
            category: 'Accessories',
            price: 24999,
            oldPrice: null,
            image: '../assets/images/accessories/gas valve (1).jpg',
            rating: 4,
            reviews: 9,
            badge: null,
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_cooker',
            name: '4-Burner Gas Cooker',
            category: 'Cooking Equipment',
            price: 199999,
            oldPrice: null,
            image: '../assets/images/accessories/Stove 4 Burner Gas Cooker Inox Stainless Steel Bulit In Hobs.jpg',
            rating: 4.5,
            reviews: 17,
            badge: 'new',
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_alarm',
            name: 'Smart Gas Leak Alarm',
            category: 'Safety Equipment',
            price: 69999,
            oldPrice: null,
            image: '../assets/images/accessories/Gas Leak alarm Wifi Home Gas Alarm Tuya App Monitor Mini Gas Detector Home.jpg',
            rating: 4,
            reviews: 8,
            badge: null,
            brand: 'SafeGas',
            inStock: true
        },
        {
            id: 'prod_3kg',
            name: 'Compact Gas Cylinder - 3kg',
            category: 'LPG Cylinders',
            price: 49999,
            oldPrice: null,
            image: '../assets/images/cooking gas 7.jpg',
            rating: 3.5,
            reviews: 6,
            badge: null,
            brand: 'RonVick',
            inStock: true
        },
        {
            id: 'prod_connector',
            name: 'Flexible Gas Connector',
            category: 'Accessories',
            price: 34999,
            oldPrice: 39999,
            image: '../assets/images/accessories/gas connector.jpg',
            rating: 4.5,
            reviews: 11,
            badge: 'discount',
            brand: 'GasPro',
            inStock: true
        },
        {
            id: 'prod_waterheater',
            name: 'Instant Gas Water Heater',
            category: 'Heating',
            price: 229999,
            oldPrice: null,
            image: '../assets/images/accessories/Natural and LP Gas Commercial Gas Water Heater, 100 gal_, 120V AC.jpg',
            rating: 4,
            reviews: 10,
            badge: null,
            brand: 'SafeGas',
            inStock: true
        },
        {
            id: 'prod_safetykit',
            name: 'Complete Gas Safety Kit',
            category: 'Safety Equipment',
            price: 129999,
            oldPrice: null,
            image: '../assets/images/accessories/safety kit.jpg',
            rating: 5,
            reviews: 23,
            badge: 'best-seller',
            brand: 'SafeGas',
            inStock: true
        }
    ];

    // ========== STATE ==========
    let filteredProducts = [];
    let currentPage = 1;
    let itemsPerPage = 12;
    let currentSort = 'default';
    let currentView = 'grid';
    let activeFilters = {
        categories: ['all'],
        brands: ['all'],
        availability: ['all'],
        ratings: ['all'],
        priceMin: 0,
        priceMax: 1000000,
        search: ''
    };

    // ========== RENDER PRODUCTS ==========
    function renderProducts() {
        const grid = document.getElementById('productsGrid');
        if (!grid) return;

        filteredProducts = filterProducts(allProducts);
        sortProducts();

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const paginatedProducts = filteredProducts.slice(start, end);

        if (paginatedProducts.length === 0) {
            grid.innerHTML = '<p class="no-products">No products found.</p>';
        } else {
            grid.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
        }

        updatePagination();
        updateProductCounts();
        attachProductEventListeners();
        updateCategoryCounts();
    }

    function createProductCard(product) {
        const badgeHtml = product.badge ? 
            `<div class="product-badges"><span class="product-badge ${product.badge}">${product.badge.replace('-', ' ')}</span></div>` : '';
        const oldPriceHtml = product.oldPrice ? 
            `<span class="old-price">UGX ${product.oldPrice.toLocaleString()}</span>` : '';
        const ratingStars = generateRatingStars(product.rating);

        return `
            <div class="product-card" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                ${badgeHtml}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='../assets/images/placeholder.jpg'">
                    <div class="product-actions">
                        <button class="quick-view" title="Quick View"><i class="fas fa-eye"></i></button>
                        <button class="add-to-wishlist" title="Add to Wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">UGX ${product.price.toLocaleString()}</span>
                        ${oldPriceHtml}
                    </div>
                    <div class="product-rating">
                        <div class="stars">${ratingStars}</div>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                </div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    }

    function generateRatingStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) stars += '<i class="fas fa-star"></i>';
            else if (rating > i - 1 && rating < i) stars += '<i class="fas fa-star-half-alt"></i>';
            else stars += '<i class="far fa-star"></i>';
        }
        return stars;
    }

    // ========== EVENT LISTENERS FOR PRODUCT CARDS ==========
    function attachProductEventListeners() {
        document.querySelectorAll('.product-card').forEach(card => {
            card.removeEventListener('click', handleCardClick);
            card.addEventListener('click', handleCardClick);

            const addToCartBtn = card.querySelector('.add-to-cart');
            if (addToCartBtn) {
                addToCartBtn.removeEventListener('click', handleAddToCart);
                addToCartBtn.addEventListener('click', handleAddToCart);
            }

            const quickViewBtn = card.querySelector('.quick-view');
            if (quickViewBtn) {
                quickViewBtn.removeEventListener('click', handleQuickView);
                quickViewBtn.addEventListener('click', handleQuickView);
            }

            const wishlistBtn = card.querySelector('.add-to-wishlist');
            if (wishlistBtn) {
                wishlistBtn.removeEventListener('click', handleWishlist);
                wishlistBtn.addEventListener('click', handleWishlist);
            }
        });
    }

    function handleCardClick(e) {
        if (e.target.closest('button')) return;
        const card = e.currentTarget;
        openQuickView(card);
    }

    function handleAddToCart(e) {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget.closest('.product-card');
        if (!card) return;
        addToCartFromCard(card);
    }

    function handleQuickView(e) {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget.closest('.product-card');
        if (card) openQuickView(card);
    }

    function handleWishlist(e) {
        e.preventDefault();
        e.stopPropagation();
        const card = e.currentTarget.closest('.product-card');
        if (!card) return;
        toggleWishlist(card);
    }

    // ========== FILTER FUNCTIONS ==========
    function filterProducts(products) {
        return products.filter(product => {
            if (!activeFilters.categories.includes('all') && activeFilters.categories.length > 0) {
                if (!activeFilters.categories.includes(product.category)) return false;
            }
            if (product.price < activeFilters.priceMin || product.price > activeFilters.priceMax) return false;
            if (!activeFilters.brands.includes('all') && activeFilters.brands.length > 0) {
                if (!activeFilters.brands.includes(product.brand)) return false;
            }
            if (!activeFilters.availability.includes('all') && activeFilters.availability.length > 0) {
                if (activeFilters.availability.includes('in_stock') && !product.inStock) return false;
                if (activeFilters.availability.includes('out_of_stock') && product.inStock) return false;
            }
            if (!activeFilters.ratings.includes('all') && activeFilters.ratings.length > 0) {
                const minRating = Math.min(...activeFilters.ratings.map(r => parseInt(r)));
                if (product.rating < minRating) return false;
            }
            if (activeFilters.search) {
                const searchLower = activeFilters.search.toLowerCase();
                return product.name.toLowerCase().includes(searchLower) || 
                       product.category.toLowerCase().includes(searchLower);
            }
            return true;
        });
    }

    function sortProducts() {
        switch (currentSort) {
            case 'price_asc':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_desc':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                filteredProducts.sort((a, b) => b.reviews - a.reviews);
                break;
            case 'newest':
                filteredProducts.sort((a, b) => b.id.localeCompare(a.id));
                break;
            default:
                filteredProducts.sort((a, b) => a.id.localeCompare(b.id));
                break;
        }
    }

    // ========== PAGINATION ==========
    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const paginationEl = document.getElementById('pagination');
        if (!paginationEl) return;

        let html = '';
        if (totalPages > 1) {
            html += `<button class="page-btn ${currentPage === 1 ? 'disabled' : ''}" data-page="${currentPage - 1}" ${currentPage === 1 ? 'disabled' : ''}><i class="fas fa-chevron-left"></i></button>`;
            for (let i = 1; i <= totalPages; i++) {
                html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
            }
            html += `<button class="page-btn ${currentPage === totalPages ? 'disabled' : ''}" data-page="${currentPage + 1}" ${currentPage === totalPages ? 'disabled' : ''}><i class="fas fa-chevron-right"></i></button>`;
        }
        paginationEl.innerHTML = html;

        paginationEl.querySelectorAll('.page-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.classList.contains('disabled')) return;
                const page = parseInt(this.dataset.page);
                if (!isNaN(page)) {
                    currentPage = page;
                    renderProducts();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        });
    }

    function updateProductCounts() {
        const totalEl = document.getElementById('totalProducts');
        const startEl = document.getElementById('showingStart');
        const endEl = document.getElementById('showingEnd');
        if (totalEl) totalEl.textContent = filteredProducts.length;
        if (startEl) startEl.textContent = filteredProducts.length ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length) : 0;
        if (endEl) endEl.textContent = filteredProducts.length ? Math.min(currentPage * itemsPerPage, filteredProducts.length) : 0;
    }

    function updateCategoryCounts() {
        const counts = {
            'LPG Cylinders': allProducts.filter(p => p.category === 'LPG Cylinders').length,
            'Oxygen Cylinders': allProducts.filter(p => p.category === 'Oxygen Cylinders').length,
            'Accessories': allProducts.filter(p => p.category === 'Accessories').length,
            'Safety Equipment': allProducts.filter(p => p.category === 'Safety Equipment').length,
            'Cooking Equipment': allProducts.filter(p => p.category === 'Cooking Equipment').length,
            'Outdoor': allProducts.filter(p => p.category === 'Outdoor').length,
            'Heating': allProducts.filter(p => p.category === 'Heating').length
        };
        document.getElementById('catCountAll').textContent = `(${allProducts.length})`;
        document.getElementById('catCountLpg').textContent = `(${counts['LPG Cylinders']})`;
        document.getElementById('catCountOxygen').textContent = `(${counts['Oxygen Cylinders']})`;
        document.getElementById('catCountAccessories').textContent = `(${counts['Accessories']})`;
        document.getElementById('catCountSafety').textContent = `(${counts['Safety Equipment']})`;
        document.getElementById('catCountCooking').textContent = `(${counts['Cooking Equipment']})`;
        document.getElementById('catCountOutdoor').textContent = `(${counts['Outdoor']})`;
        document.getElementById('catCountHeating').textContent = `(${counts['Heating']})`;
    }

    // ========== CART FUNCTIONS ==========
    function getCart() {
        return JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '[]');
    }

    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
        window.dispatchEvent(new Event('cartUpdated'));
    }

    function addToCartFromCard(card) {
        const product = {
            id: card.dataset.productId,
            name: card.dataset.productName,
            price: parseFloat(card.dataset.productPrice),
            image: card.dataset.productImage,
            quantity: 1
        };
        addToCart(product);
        alert(`${product.name} added to cart!`);
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += product.quantity || 1;
        } else {
            cart.push(product);
        }
        saveCart(cart);
    }

    function updateCartCount() {
        const cart = getCart();
        const total = cart.reduce((sum, item) => sum + item.quantity, 0);
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = total;
        });
    }

    // ========== WISHLIST FUNCTIONS ==========
    function getWishlist() {
        return JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    }

    function saveWishlist(wishlist) {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    }

    function toggleWishlist(card) {
        if (!isLoggedIn()) {
            openAuthModal();
            return;
        }
        const productId = card.dataset.productId;
        const wishlist = getWishlist();
        const index = wishlist.findIndex(item => item.id === productId);
        const icon = card.querySelector('.add-to-wishlist i');
        if (index === -1) {
            wishlist.push({
                id: productId,
                name: card.dataset.productName,
                price: parseFloat(card.dataset.productPrice),
                image: card.dataset.productImage
            });
            icon.classList.remove('far');
            icon.classList.add('fas');
            card.querySelector('.add-to-wishlist').style.color = '#e74c3c';
            alert('Added to wishlist!');
        } else {
            wishlist.splice(index, 1);
            icon.classList.remove('fas');
            icon.classList.add('far');
            card.querySelector('.add-to-wishlist').style.color = '';
        }
        saveWishlist(wishlist);
    }

    // ========== AUTH FUNCTIONS ==========
    function isLoggedIn() {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }

    function getUser() {
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    function updateAuthUI() {
        const loggedIn = isLoggedIn();
        const user = getUser();
        const userDisplay = document.getElementById('userDisplay');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginLink = document.getElementById('loginLink');
        const dropdownHeader = document.getElementById('dropdownHeader');

        if (loggedIn && user) {
            if (userDisplay) userDisplay.textContent = `Hi, ${user.name.split(' ')[0]}`;
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (loginLink) loginLink.style.display = 'none';
            if (dropdownHeader) dropdownHeader.textContent = user.name;
        } else {
            if (userDisplay) userDisplay.textContent = '';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (loginLink) loginLink.style.display = 'inline-block';
            if (dropdownHeader) dropdownHeader.textContent = 'Account';
        }
    }

    // ========== AUTH MODAL ==========
    const authModal = document.getElementById('authModal');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const closeAuthModal = document.getElementById('closeAuthModal');

    function openAuthModal() {
        if (authModal) {
            authModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (loginTab && signupTab && loginForm && signupForm) {
        loginTab.addEventListener('click', () => {
            loginTab.classList.add('active');
            signupTab.classList.remove('active');
            loginForm.classList.add('active');
            signupForm.classList.remove('active');
        });
        signupTab.addEventListener('click', () => {
            signupTab.classList.add('active');
            loginTab.classList.remove('active');
            signupForm.classList.add('active');
            loginForm.classList.remove('active');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            setTimeout(() => {
                const user = { name: email.split('@')[0], email };
                localStorage.setItem(AUTH_TOKEN_KEY, 'fake-token');
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                closeModal(authModal);
                updateAuthUI();
                alert('Logged in successfully');
            }, 500);
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirmPassword').value;
            if (password !== confirm) {
                alert('Passwords do not match');
                return;
            }
            setTimeout(() => {
                const user = { name, email };
                localStorage.setItem(AUTH_TOKEN_KEY, 'fake-token');
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                closeModal(authModal);
                updateAuthUI();
                alert('Account created successfully');
            }, 500);
        });
    }

    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', () => closeModal(authModal));
    }
    window.addEventListener('click', e => {
        if (e.target === authModal) closeModal(authModal);
    });

    document.getElementById('loginLink')?.addEventListener('click', e => {
        e.preventDefault();
        openAuthModal();
    });

    document.getElementById('dropdownLogout')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        window.location.reload();
    });
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        window.location.reload();
    });

    document.getElementById('mobileUserIcon')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn()) {
            openAuthModal();
        } else {
            window.location.href = '../account/index.html';
        }
    });

    // ========== QUICK VIEW MODAL ==========
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.querySelector('.modal-close');

    function openQuickView(card) {
        const productId = card.dataset.productId;
        const productName = card.dataset.productName;
        const productPrice = parseFloat(card.dataset.productPrice);
        const productImage = card.dataset.productImage;
        const productCategory = card.querySelector('.product-category').textContent;
        const productRating = card.querySelector('.product-rating').innerHTML;
        const currentPrice = card.querySelector('.current-price').textContent;
        const oldPrice = card.querySelector('.old-price') ? card.querySelector('.old-price').textContent : null;

        const content = `
            <div class="quick-view-img">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="quick-view-info">
                <span class="quick-view-category">${productCategory}</span>
                <h2>${productName}</h2>
                <div class="quick-view-price">
                    ${currentPrice}
                    ${oldPrice ? `<span class="quick-view-old-price">${oldPrice}</span>` : ''}
                </div>
                <div class="quick-view-rating">${productRating}</div>
                <p class="quick-view-description">
                    This premium gas product is designed for both home and industrial use, featuring the highest safety standards and durability.
                </p>
                <div class="quick-view-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn btn-primary quick-add-to-cart" data-id="${productId}" data-name="${productName}" data-price="${productPrice}" data-image="${productImage}">Add to Cart</button>
                </div>
                <div class="quick-view-meta">
                    <span><strong>Category:</strong> ${productCategory}</span>
                    <span><strong>Availability:</strong> In Stock</span>
                    <span><strong>Delivery:</strong> Free delivery in Kasana Luwero</span>
                </div>
            </div>
        `;
        document.querySelector('.quick-view-content').innerHTML = content;
        quickViewModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        const minus = quickViewModal.querySelector('.minus');
        const plus = quickViewModal.querySelector('.plus');
        const qtyInput = quickViewModal.querySelector('.quantity-input');
        minus?.addEventListener('click', () => {
            if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
        });
        plus?.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });

        quickViewModal.querySelector('.quick-add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(qtyInput.value) || 1;
            addToCart({
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                quantity: quantity
            });
            alert(`${quantity} × ${this.dataset.name} added to cart!`);
            closeModal(quickViewModal);
        });
    }

    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal(quickViewModal));
    }
    window.addEventListener('click', e => {
        if (e.target === quickViewModal) closeModal(quickViewModal);
    });

    // ========== FILTER EVENT LISTENERS ==========
    function initFilters() {
        document.querySelectorAll('#categoryFilter input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#categoryFilter input[type="checkbox"]:not([value="all"])').forEach(c => c.checked = false);
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#categoryFilter input[value="all"]');
                    if (allCheck) allCheck.checked = false;
                }
            });
        });

        document.querySelectorAll('#brandFilter input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#brandFilter input[type="checkbox"]:not([value="all"])').forEach(c => c.checked = false);
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#brandFilter input[value="all"]');
                    if (allCheck) allCheck.checked = false;
                }
            });
        });

        document.querySelectorAll('#availabilityFilter input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#availabilityFilter input[type="checkbox"]:not([value="all"])').forEach(c => c.checked = false);
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#availabilityFilter input[value="all"]');
                    if (allCheck) allCheck.checked = false;
                }
            });
        });

        document.querySelectorAll('#ratingFilter input[type="checkbox"]').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#ratingFilter input[type="checkbox"]:not([value="all"])').forEach(c => c.checked = false);
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#ratingFilter input[value="all"]');
                    if (allCheck) allCheck.checked = false;
                }
            });
        });

        const priceRange = document.getElementById('priceRange');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        if (priceRange && minPrice && maxPrice) {
            priceRange.addEventListener('input', function() {
                minPrice.value = this.value;
            });
            minPrice.addEventListener('input', function() {
                if (parseInt(this.value) > parseInt(maxPrice.value)) {
                    this.value = maxPrice.value;
                }
                priceRange.value = this.value;
            });
            maxPrice.addEventListener('input', function() {
                if (parseInt(this.value) < parseInt(minPrice.value)) {
                    this.value = minPrice.value;
                }
            });
        }

        document.getElementById('applyFilters')?.addEventListener('click', function() {
            activeFilters.categories = Array.from(document.querySelectorAll('#categoryFilter input[type="checkbox"]:checked')).map(cb => cb.value);
            activeFilters.brands = Array.from(document.querySelectorAll('#brandFilter input[type="checkbox"]:checked')).map(cb => cb.value);
            activeFilters.availability = Array.from(document.querySelectorAll('#availabilityFilter input[type="checkbox"]:checked')).map(cb => cb.value);
            activeFilters.ratings = Array.from(document.querySelectorAll('#ratingFilter input[type="checkbox"]:checked')).map(cb => cb.value);
            activeFilters.priceMin = parseInt(minPrice?.value) || 0;
            activeFilters.priceMax = parseInt(maxPrice?.value) || 1000000;
            activeFilters.search = document.getElementById('searchInput')?.value || '';

            currentPage = 1;
            renderProducts();

            document.getElementById('productsSidebar')?.classList.remove('active');
            document.body.style.overflow = '';
        });

        document.getElementById('resetFilters')?.addEventListener('click', function() {
            document.querySelectorAll('#categoryFilter input[type="checkbox"]').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#brandFilter input[type="checkbox"]').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#availabilityFilter input[type="checkbox"]').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#ratingFilter input[type="checkbox"]').forEach(cb => cb.checked = cb.value === 'all');
            if (minPrice) minPrice.value = 0;
            if (maxPrice) maxPrice.value = 1000000;
            if (priceRange) priceRange.value = 500000;
            document.getElementById('searchInput').value = '';

            activeFilters = {
                categories: ['all'],
                brands: ['all'],
                availability: ['all'],
                ratings: ['all'],
                priceMin: 0,
                priceMax: 1000000,
                search: ''
            };
            currentPage = 1;
            renderProducts();
        });

        document.getElementById('searchBtn')?.addEventListener('click', function() {
            activeFilters.search = document.getElementById('searchInput').value;
            currentPage = 1;
            renderProducts();
        });

        document.getElementById('searchInput')?.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                activeFilters.search = this.value;
                currentPage = 1;
                renderProducts();
            }
        });
    }

    // ========== VIEW MODE TOGGLE ==========
    function initViewMode() {
        const viewBtns = document.querySelectorAll('.view-btn');
        const productsGrid = document.getElementById('productsGrid');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                currentView = this.dataset.view;
                if (currentView === 'list') {
                    productsGrid.classList.add('list-view');
                } else {
                    productsGrid.classList.remove('list-view');
                }
            });
        });
    }

    // ========== SORTING ==========
    function initSorting() {
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                currentSort = this.value;
                renderProducts();
            });
        }
    }

    // ========== MOBILE NAVIGATION ==========
    function initMobileNav() {
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('navLinks');
        if (hamburger) {
            hamburger.addEventListener('click', function() {
                this.classList.toggle('active');
                navLinks.classList.toggle('active');
            });
        }
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        const filterToggle = document.getElementById('filterToggle');
        const productsSidebar = document.getElementById('productsSidebar');
        const sidebarClose = document.getElementById('sidebarClose');
        if (filterToggle && productsSidebar && sidebarClose) {
            filterToggle.addEventListener('click', () => {
                productsSidebar.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            sidebarClose.addEventListener('click', () => {
                productsSidebar.classList.remove('active');
                document.body.style.overflow = '';
            });
            window.addEventListener('click', (e) => {
                if (e.target === productsSidebar) {
                    productsSidebar.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }

        document.querySelectorAll('.filter-title').forEach(title => {
            title.addEventListener('click', function() {
                const section = this.closest('.filter-section');
                section.classList.toggle('collapsed');
            });
        });
    }

    // ========== USER DROPDOWN ==========
    function initUserDropdown() {
        const userIcon = document.getElementById('userIcon');
        const userDropdown = document.getElementById('userDropdown');
        if (userIcon && userDropdown) {
            userIcon.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                userDropdown.classList.toggle('active');
            });
            document.addEventListener('click', (e) => {
                if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
                    userDropdown.classList.remove('active');
                }
            });
        }
    }

    // ========== STICKY HEADER ==========
    function initStickyHeader() {
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (header) {
                header.classList.toggle('sticky', window.scrollY > 50);
            }
        });
    }

    // ========== INITIALISE ==========
    function init() {
        renderProducts();
        initFilters();
        initViewMode();
        initSorting();
        initMobileNav();
        initUserDropdown();
        initStickyHeader();
        updateCartCount();
        updateAuthUI();

        window.addEventListener('storage', function(e) {
            if (e.key === CART_STORAGE_KEY) {
                updateCartCount();
            }
        });
        window.addEventListener('cartUpdated', updateCartCount);
    }

    init();
});