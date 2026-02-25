/**
 * RonVick Gas - Main JavaScript (Backend Integrated)
 * Handles all functionality with real API calls.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== CONFIGURATION ==========
    const API_BASE_URL = 'http://localhost:3000';  // Change to your deployed URL

    // ========== HELPER FUNCTIONS ==========
    async function fetchAPI(endpoint, options = {}) {
        const token = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        };
        const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.error || 'Request failed');
        }
        return response.json();
    }

    // ========== AUTH MANAGEMENT ==========
    function isLoggedIn() {
        return !!localStorage.getItem('authToken');
    }

    function getUser() {
        const userStr = localStorage.getItem('authUser');
        return userStr ? JSON.parse(userStr) : null;
    }

    async function login(email, password) {
        const data = await fetchAPI('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user));
        updateAuthUI();
        return data;
    }

    async function signup(name, email, password, phone = '') {
        const data = await fetchAPI('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, phone, address: '' })
        });
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('authUser', JSON.stringify(data.user));
        updateAuthUI();
        return data;
    }

    function logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        updateAuthUI();
        updateCartCount(0);
    }

    function updateAuthUI() {
        const loggedIn = isLoggedIn();
        const user = getUser();
        const userDisplay = document.getElementById('userDisplay');
        const logoutBtn = document.getElementById('logoutBtn');
        const loginLink = document.getElementById('loginLink');
        const dropdownHeader = document.getElementById('dropdownHeader');
        const userIcon = document.getElementById('userIcon');

        if (loggedIn && user) {
            if (userDisplay) userDisplay.textContent = `Hi, ${user.name.split(' ')[0]}`;
            if (logoutBtn) logoutBtn.style.display = 'inline-block';
            if (loginLink) loginLink.style.display = 'none';
            if (dropdownHeader) dropdownHeader.textContent = user.name;
            if (userIcon) userIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
        } else {
            if (userDisplay) userDisplay.textContent = '';
            if (logoutBtn) logoutBtn.style.display = 'none';
            if (loginLink) loginLink.style.display = 'inline-block';
            if (dropdownHeader) dropdownHeader.textContent = 'Account';
            if (userIcon) userIcon.innerHTML = '<i class="fas fa-user-circle"></i>';
        }
    }

    // ========== CART MANAGEMENT ==========
    async function fetchCart() {
        if (!isLoggedIn()) return null;
        try {
            return await fetchAPI('/api/cart');
        } catch (error) {
            console.error('Error fetching cart:', error);
            return null;
        }
    }

    async function updateCartCountFromServer() {
        if (!isLoggedIn()) {
            updateCartCount(0);
            return;
        }
        const cart = await fetchCart();
        if (cart && cart.items) {
            const total = cart.items.reduce((sum, item) => sum + item.quantity, 0);
            updateCartCount(total);
        } else {
            updateCartCount(0);
        }
    }

    function updateCartCount(count) {
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
    }

    async function addToCart(productId, quantity = 1) {
        if (!isLoggedIn()) {
            openAuthModal();
            return;
        }
        try {
            await fetchAPI('/api/cart/add', {
                method: 'POST',
                body: JSON.stringify({ productId, quantity })
            });
            await updateCartCountFromServer();
            alert('Item added to cart!');
        } catch (error) {
            alert('Failed to add item: ' + error.message);
        }
    }

    // ========== PRODUCTS ==========
    async function loadPopularProducts() {
        try {
            const products = await fetchAPI('/api/products');
            // For demo, show first 4 products as "popular"
            const popular = products.slice(0, 4);
            renderProducts(popular, document.getElementById('popularProductsGrid'));
        } catch (error) {
            console.error('Error loading products:', error);
            document.getElementById('popularProductsGrid').innerHTML = '<p class="error">Failed to load products.</p>';
        }
    }

    function renderProducts(products, container) {
        if (!container) return;
        container.innerHTML = products.map(product => {
            const badgeHtml = product.isBestSeller ? '<div class="product-badges"><span class="product-badge best-seller">Best Seller</span></div>' :
                              product.discount > 0 ? `<div class="product-badges"><span class="product-badge discount">-${product.discount}%</span></div>` :
                              product.createdAt && (Date.now() - new Date(product.createdAt).getTime() < 7*24*60*60*1000) ? '<div class="product-badges"><span class="product-badge new">New</span></div>' : '';
            const oldPrice = product.discount > 0 ? product.price / (1 - product.discount/100) : null;
            const oldPriceHtml = oldPrice ? `<span class="old-price">UGX ${Math.round(oldPrice).toLocaleString()}</span>` : '';
            const ratingStars = Array(5).fill(0).map((_, i) => {
                // Assuming rating out of 5, you might need to adjust
                if (i < 4) return '<i class="fas fa-star"></i>';
                if (i < 5) return '<i class="fas fa-star-half-alt"></i>';
                return '<i class="far fa-star"></i>';
            }).join('');

            return `
                <div class="product-card" data-product-id="${product._id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.imageUrl || './assets/images/placeholder.jpg'}">
                    ${badgeHtml}
                    <div class="product-img">
                        <img src="${product.imageUrl || './assets/images/placeholder.jpg'}" alt="${product.name}">
                        <div class="product-actions">
                            <button class="quick-view" title="Quick View"><i class="fas fa-eye"></i></button>
                            <button class="add-to-wishlist" title="Add to Wishlist"><i class="far fa-heart"></i></button>
                        </div>
                    </div>
                    <div class="product-info">
                        <p class="product-category">${product.category || 'General'}</p>
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">
                            <span class="current-price">UGX ${product.price.toLocaleString()}</span>
                            ${oldPriceHtml}
                        </div>
                        <div class="product-rating">
                            <div class="stars">${ratingStars}</div>
                            <span class="rating-count">(0)</span>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
        }).join('');
        attachProductCardEvents();
    }

    function attachProductCardEvents() {
        // Quick view
        document.querySelectorAll('.quick-view').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                openQuickView(btn.closest('.product-card'));
            });
        });
        // Add to cart
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                const card = btn.closest('.product-card');
                const productId = card.dataset.productId;
                addToCart(productId, 1);
            });
        });
        // Wishlist
        document.querySelectorAll('.add-to-wishlist').forEach(btn => {
            btn.addEventListener('click', e => {
                e.stopPropagation();
                if (!isLoggedIn()) {
                    openAuthModal();
                    return;
                }
                const icon = btn.querySelector('i');
                icon.classList.toggle('far');
                icon.classList.toggle('fas');
                if (icon.classList.contains('fas')) {
                    btn.style.color = '#e74c3c';
                    // Optional: call wishlist API later
                } else {
                    btn.style.color = '';
                }
            });
        });
    }

    // ========== QUICK VIEW ==========
    function openQuickView(card) {
        const modal = document.getElementById('quickViewModal');
        const img = card.querySelector('.product-img img').src;
        const title = card.querySelector('.product-title').textContent;
        const category = card.querySelector('.product-category').textContent;
        const currentPrice = card.querySelector('.current-price').textContent;
        const oldPrice = card.querySelector('.old-price') ? card.querySelector('.old-price').textContent : null;
        const rating = card.querySelector('.product-rating').innerHTML;
        const id = card.dataset.productId;
        const price = parseFloat(card.dataset.productPrice);
        const image = card.dataset.productImage;

        const content = `
            <div class="quick-view-img">
                <img src="${img}" alt="${title}">
            </div>
            <div class="quick-view-info">
                <span class="quick-view-category">${category}</span>
                <h2>${title}</h2>
                <div class="quick-view-price">
                    ${currentPrice}
                    ${oldPrice ? `<span class="quick-view-old-price">${oldPrice}</span>` : ''}
                </div>
                <div class="quick-view-rating">${rating}</div>
                <p class="quick-view-description">
                    High-quality gas product from RonVick Gas. Suitable for home or industrial use.
                </p>
                <div class="quick-view-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn btn-primary quick-add-to-cart" data-id="${id}" data-name="${title}" data-price="${price}" data-image="${image}">Add to Cart</button>
                </div>
                <div class="quick-view-meta">
                    <span><strong>Category:</strong> ${category}</span>
                    <span><strong>Availability:</strong> In Stock</span>
                    <span><strong>Delivery:</strong> Free in Kasana Luwero</span>
                </div>
            </div>
        `;
        document.querySelector('.quick-view-content').innerHTML = content;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Quantity controls
        const minus = modal.querySelector('.minus');
        const plus = modal.querySelector('.plus');
        const qtyInput = modal.querySelector('.quantity-input');
        minus?.addEventListener('click', () => {
            if (qtyInput.value > 1) qtyInput.value = parseInt(qtyInput.value) - 1;
        });
        plus?.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });

        // Quick add to cart
        modal.querySelector('.quick-add-to-cart').addEventListener('click', function() {
            const quantity = parseInt(qtyInput.value) || 1;
            addToCart(this.dataset.id, quantity);
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // ========== MOBILE NAVIGATION ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navClose = document.getElementById('navClose');

    function openMobileNav() {
        navLinks.classList.add('active');
        hamburger.classList.add('active');
    }

    function closeMobileNav() {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }

    if (hamburger) {
        hamburger.addEventListener('click', openMobileNav);
    }
    if (navClose) {
        navClose.addEventListener('click', closeMobileNav);
    }
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileNav();
        }
    });

    // ========== HERO SLIDER (unchanged) ==========
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-slider-dots .dot');
    let currentSlide = 0;
    if (heroSlides.length) {
        function showSlide(index) {
            heroSlides.forEach(s => s.classList.remove('active'));
            heroDots.forEach(d => d.classList.remove('active'));
            heroSlides[index].classList.add('active');
            heroDots[index].classList.add('active');
            currentSlide = index;
        }
        document.querySelector('.slider-next')?.addEventListener('click', () => {
            showSlide((currentSlide + 1) % heroSlides.length);
        });
        document.querySelector('.slider-prev')?.addEventListener('click', () => {
            showSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length);
        });
        heroDots.forEach((dot, i) => {
            dot.addEventListener('click', () => showSlide(i));
        });
        setInterval(() => {
            showSlide((currentSlide + 1) % heroSlides.length);
        }, 5000);
    }

    // ========== TESTIMONIALS SLIDER (unchanged) ==========
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
    let currentTestimonial = 0;
    if (testimonialCards.length) {
        function showTestimonial(index) {
            testimonialCards.forEach(c => c.classList.remove('active'));
            testimonialDots.forEach(d => d.classList.remove('active'));
            testimonialCards[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        document.querySelector('.testimonial-next')?.addEventListener('click', () => {
            showTestimonial((currentTestimonial + 1) % testimonialCards.length);
        });
        document.querySelector('.testimonial-prev')?.addEventListener('click', () => {
            showTestimonial((currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length);
        });
        testimonialDots.forEach((dot, i) => {
            dot.addEventListener('click', () => showTestimonial(i));
        });
        setInterval(() => {
            showTestimonial((currentTestimonial + 1) % testimonialCards.length);
        }, 7000);
    }

    // ========== AUTH MODAL ==========
    const authModal = document.getElementById('authModal');
    const loginTab = document.getElementById('loginTab');
    const signupTab = document.getElementById('signupTab');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    const closeAuthModal = document.getElementById('closeAuthModal');

    function openAuthModal() {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Tab switching
    loginTab?.addEventListener('click', () => {
        loginTab.classList.add('active');
        signupTab.classList.remove('active');
        loginForm.classList.add('active');
        signupForm.classList.remove('active');
    });
    signupTab?.addEventListener('click', () => {
        signupTab.classList.add('active');
        loginTab.classList.remove('active');
        signupForm.classList.add('active');
        loginForm.classList.remove('active');
    });
    // Links inside forms
    switchToSignup?.addEventListener('click', (e) => {
        e.preventDefault();
        signupTab.click();
    });
    switchToLogin?.addEventListener('click', (e) => {
        e.preventDefault();
        loginTab.click();
    });

    // Login form submit
    loginForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        try {
            await login(email, password);
            closeModal(authModal);
        } catch (error) {
            alert('Login failed: ' + error.message);
        }
    });

    // Signup form submit
    signupForm?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirm = document.getElementById('signupConfirmPassword').value;
        if (password !== confirm) {
            alert('Passwords do not match');
            return;
        }
        try {
            await signup(name, email, password);
            closeModal(authModal);
        } catch (error) {
            alert('Signup failed: ' + error.message);
        }
    });

    // Close modal
    closeAuthModal?.addEventListener('click', () => closeModal(authModal));
    window.addEventListener('click', e => {
        if (e.target === authModal) closeModal(authModal);
    });

    // Open auth modal from login link
    document.getElementById('loginLink')?.addEventListener('click', e => {
        e.preventDefault();
        openAuthModal();
    });

    // User icon dropdown
    const userIcon = document.getElementById('userIcon');
    const userDropdown = document.getElementById('userDropdown');
    if (userIcon && userDropdown) {
        userIcon.addEventListener('click', (e) => {
            e.preventDefault();
            userDropdown.classList.toggle('active');
        });
        document.addEventListener('click', (e) => {
            if (!userIcon.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.remove('active');
            }
        });
    }

    // Logout from dropdown
    document.getElementById('dropdownLogout')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        userDropdown.classList.remove('active');
        window.location.reload(); // Refresh to reflect logged out state
    });

    // Logout from top bar
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        window.location.reload();
    });

    // Mobile user icon
    document.getElementById('mobileUserIcon')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn()) {
            openAuthModal();
        } else {
            window.location.href = './account/index.html';
        }
    });

    // ========== NEWSLETTER FORM ==========
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing! (Feature coming soon)');
        e.target.reset();
    });

    // ========== STICKY HEADER ==========
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });

    // ========== MOBILE BOTTOM NAV ACTIVE ==========
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === '#' && currentPage === 'index.html') item.classList.add('active');
        else if (href && href.includes(currentPage)) item.classList.add('active');
    });

    // ========== INITIALIZATION ==========
    updateAuthUI();
    updateCartCountFromServer();
    loadPopularProducts();

    // Also handle quick view modal close (existing code remains)
    document.querySelectorAll('.modal-close').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            e.target.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});