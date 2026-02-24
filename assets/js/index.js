/**
 * RonVick Gas - Main JavaScript
 * Handles all functionality: mobile nav, sliders, cart, auth, modals, dynamic products.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== DATA ==========
    const productsData = [
        {
            id: 'prod_50kg_cylinder',
            name: 'Heavy Duty Gas Cylinder - 50kg',
            category: 'LPG Cylinders',
            price: 299999,
            oldPrice: 349999,
            image: './assets/images/gas2.jpg',
            rating: 4.5,
            reviews: 24,
            badge: 'best-seller'
        },
        {
            id: 'prod_regulator',
            name: 'Premium Gas Pressure Regulator',
            category: 'Accessories',
            price: 49999,
            oldPrice: null,
            image: './assets/images/accessories/Gas cylinder LPG bottle regulator.jpg',
            rating: 4,
            reviews: 18,
            badge: 'new'
        },
        {
            id: 'prod_stove',
            name: 'Portable Gas Stove with Cylinder',
            category: 'Cooking Equipment',
            price: 89999,
            oldPrice: 109999,
            image: './assets/images/gas2.jpg',
            rating: 5,
            reviews: 42,
            badge: null
        },
        {
            id: 'prod_detector',
            name: 'Digital Gas Leak Detector',
            category: 'Safety Equipment',
            price: 59999,
            oldPrice: 79999,
            image: './assets/images/accessories/gas leak detector.jpg',
            rating: 4,
            reviews: 31,
            badge: 'discount'
        }
    ];

    // ========== CART MANAGEMENT (localStorage) ==========
    const CART_STORAGE_KEY = 'ronvick_cart';

    function getCart() {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
    }

    function addToCart(product) {
        const cart = getCart();
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity += product.quantity || 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: product.quantity || 1
            });
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

    // ========== AUTH MANAGEMENT (localStorage) ==========
    const AUTH_TOKEN_KEY = 'authToken';
    const AUTH_USER_KEY = 'authUser';

    function isLoggedIn() {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }

    function getUser() {
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    function login(email, password) {
        // Simulate login - replace with actual API call
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = { name: email.split('@')[0], email: email };
                localStorage.setItem(AUTH_TOKEN_KEY, 'fake-jwt-token');
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                updateAuthUI();
                resolve({ success: true, user });
            }, 500);
        });
    }

    function signup(name, email, password) {
        // Simulate signup
        return new Promise((resolve) => {
            setTimeout(() => {
                const user = { name: name, email: email };
                localStorage.setItem(AUTH_TOKEN_KEY, 'fake-jwt-token');
                localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
                updateAuthUI();
                resolve({ success: true, user });
            }, 500);
        });
    }

    function logout() {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_USER_KEY);
        updateAuthUI();
        // Optionally clear cart? Decide later.
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

    // ========== MOBILE NAVIGATION ==========
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

    // ========== HERO SLIDER ==========
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

    // ========== TESTIMONIALS SLIDER ==========
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

    // ========== POPULAR PRODUCTS RENDERING ==========
    const productsGrid = document.getElementById('popularProductsGrid');
    if (productsGrid) {
        productsGrid.innerHTML = productsData.map(product => {
            const badgeHtml = product.badge ? 
                `<div class="product-badges"><span class="product-badge ${product.badge}">${product.badge.replace('-', ' ')}</span></div>` : '';
            const oldPriceHtml = product.oldPrice ? 
                `<span class="old-price">UGX ${product.oldPrice.toLocaleString()}</span>` : '';
            const ratingStars = Array(5).fill(0).map((_, i) => {
                const starValue = i + 1;
                if (product.rating >= starValue) return '<i class="fas fa-star"></i>';
                if (product.rating > starValue - 1 && product.rating < starValue) return '<i class="fas fa-star-half-alt"></i>';
                return '<i class="far fa-star"></i>';
            }).join('');

            return `
                <div class="product-card" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}">
                    ${badgeHtml}
                    <div class="product-img">
                        <img src="${product.image}" alt="${product.name}">
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
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // ========== PRODUCT CARD CLICK (Quick View) ==========
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.add-to-cart') || e.target.closest('.quick-view') || e.target.closest('.add-to-wishlist')) return;
            openQuickView(this);
        });
    });

    // ========== QUICK VIEW FUNCTION ==========
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
                    This premium gas product is designed for both home and industrial use, featuring the highest safety standards and durability.
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
                    <span><strong>Delivery:</strong> Free delivery in Kasana Luwero</span>
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
            addToCart({
                id: this.dataset.id,
                name: this.dataset.name,
                price: parseFloat(this.dataset.price),
                image: this.dataset.image,
                quantity: quantity
            });
            alert(`${quantity} × ${this.dataset.name} added to cart!`);
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Close quick view modal
    const quickViewModal = document.getElementById('quickViewModal');
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

    // ========== ADD TO CART BUTTONS ==========
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const card = this.closest('.product-card');
            if (!card) return;
            addToCart({
                id: card.dataset.productId,
                name: card.dataset.productName,
                price: parseFloat(card.dataset.productPrice),
                image: card.dataset.productImage,
                quantity: 1
            });
            alert(`${card.dataset.productName} added to cart!`);
        });
    });

    // ========== WISHLIST BUTTONS ==========
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isLoggedIn()) {
                openAuthModal();
                return;
            }
            const icon = this.querySelector('i');
            icon.classList.toggle('far');
            icon.classList.toggle('fas');
            if (icon.classList.contains('fas')) {
                this.style.color = '#e74c3c';
                alert('Added to wishlist!');
            } else {
                this.style.color = '';
            }
        });
    });

    // ========== QUICK VIEW BUTTONS ==========
    document.querySelectorAll('.quick-view').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            openQuickView(this.closest('.product-card'));
        });
    });

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
        const result = await login(email, password);
        if (result.success) {
            closeModal(authModal);
        } else {
            alert('Login failed');
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
        const result = await signup(name, email, password);
        if (result.success) {
            closeModal(authModal);
        } else {
            alert('Signup failed');
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
        // Close dropdown when clicking outside
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
        // Optionally reload page to reset UI
        window.location.reload();
    });

    // Logout from top bar
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        window.location.reload();
    });

    // Mobile user icon opens auth modal if not logged in, else shows dropdown? For simplicity, open auth modal if not logged in.
    document.getElementById('mobileUserIcon')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn()) {
            openAuthModal();
        } else {
            // Could navigate to account page
            window.location.href = './account/index.html';
        }
    });

    // ========== NEWSLETTER FORM ==========
    document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing!');
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

    // ========== INITIAL UI UPDATE ==========
    updateCartCount();
    updateAuthUI();
});