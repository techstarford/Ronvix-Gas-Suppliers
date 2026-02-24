/**
 * RonVick Gas - Cart Page JavaScript (Fixed with image paths)
 * Handles cart operations, authentication, and UI.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('Cart page script loaded');

    // ========== CART MANAGEMENT (localStorage) ==========
    const CART_STORAGE_KEY = 'ronvick_cart';
    const AUTH_TOKEN_KEY = 'authToken';
    const AUTH_USER_KEY = 'authUser';

    // Cart functions
    function getCart() {
        const cart = localStorage.getItem(CART_STORAGE_KEY);
        return cart ? JSON.parse(cart) : [];
    }

    function saveCart(cart) {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
        updateCartCount();
        window.dispatchEvent(new Event('cartUpdated'));
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

    function updateQuantity(productId, newQuantity) {
        const cart = getCart();
        const item = cart.find(item => item.id === productId);
        if (item) {
            if (newQuantity <= 0) {
                removeItem(productId);
                return;
            }
            item.quantity = newQuantity;
            saveCart(cart);
        }
    }

    function removeItem(productId) {
        let cart = getCart();
        cart = cart.filter(item => item.id !== productId);
        saveCart(cart);
    }

    function getTotalCount() {
        const cart = getCart();
        return cart.reduce((total, item) => total + item.quantity, 0);
    }

    function getSubtotal() {
        const cart = getCart();
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    function updateCartCount() {
        const count = getTotalCount();
        document.querySelectorAll('.cart-count').forEach(el => {
            el.textContent = count;
        });
        console.log('Cart count updated to', count);
    }

    // ========== AUTH MANAGEMENT ==========
    function isLoggedIn() {
        return !!localStorage.getItem(AUTH_TOKEN_KEY);
    }

    function getUser() {
        const userStr = localStorage.getItem(AUTH_USER_KEY);
        return userStr ? JSON.parse(userStr) : null;
    }

    function login(email, password) {
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
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // ========== USER DROPDOWN TOGGLE ==========
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

    // Tab switching
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

    // Login form submit
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
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
    }

    // Signup form submit
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
            const result = await signup(name, email, password);
            if (result.success) {
                closeModal(authModal);
            } else {
                alert('Signup failed');
            }
        });
    }

    // Close modal
    if (closeAuthModal) {
        closeAuthModal.addEventListener('click', () => closeModal(authModal));
    }
    window.addEventListener('click', e => {
        if (e.target === authModal) closeModal(authModal);
    });

    // Open auth modal from login link
    document.getElementById('loginLink')?.addEventListener('click', e => {
        e.preventDefault();
        openAuthModal();
    });

    // Logout from dropdown
    document.getElementById('dropdownLogout')?.addEventListener('click', (e) => {
        e.preventDefault();
        logout();
        if (userDropdown) userDropdown.classList.remove('active');
        window.location.reload();
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
            window.location.href = '../account/index.html';
        }
    });

    // ========== CART PAGE FUNCTIONS ==========
    function loadCartPage() {
        console.log('loadCartPage called');

        const cartWrapper = document.querySelector('.cart-wrapper');
        const cartSummary = document.querySelector('.cart-summary');
        const emptyCart = document.querySelector('.empty-cart');
        const loadingEl = document.querySelector('.cart-loading');

        if (!cartWrapper) {
            console.error('Cart wrapper not found!');
            if (loadingEl) loadingEl.style.display = 'none';
            if (emptyCart) emptyCart.style.display = 'block';
            return;
        }

        if (loadingEl) loadingEl.style.display = 'none';

        const items = getCart();
        console.log('Cart items:', items);

        if (items.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (cartSummary) cartSummary.style.display = 'none';
            cartWrapper.innerHTML = '';
            return;
        }

        if (emptyCart) emptyCart.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'block';

        // Build cart items HTML with corrected image paths
        let html = '<div class="cart-items">';
        items.forEach(item => {
            // Fix image path for cart page
            let imageSrc = item.image || '';
            if (imageSrc.startsWith('./')) {
                // Convert ./assets/images/... to ../assets/images/...
                imageSrc = '../' + imageSrc.substring(2);
            } else if (imageSrc.startsWith('/')) {
                // Absolute path from root – keep as is (will work if assets are at root)
                // No change needed
            } else if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data:')) {
                // If it's just a filename, assume it's in assets/images and go up one level
                imageSrc = '../assets/images/' + imageSrc;
            }
            // Fallback placeholder if image fails to load
            const placeholderSrc = '../assets/images/placeholder.jpg'; // create this placeholder image

            html += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-image">
                        <img src="${imageSrc}" alt="${item.name}" 
                             onerror="this.src='${placeholderSrc}'">
                    </div>
                    <div class="cart-item-details">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">UGX ${item.price.toLocaleString()}</div>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn dec">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                        <button class="quantity-btn inc">+</button>
                    </div>
                    <div class="cart-item-total">
                        UGX ${(item.price * item.quantity).toLocaleString()}
                    </div>
                    <button class="cart-item-remove" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            `;
        });
        html += '</div>';

        cartWrapper.innerHTML = html;
        console.log('Cart items rendered');

        updateCartSummary();
        attachCartItemEvents();
    }

    function updateCartSummary() {
        const subtotal = getSubtotal();
        const subtotalEl = document.querySelector('.subtotal-amount');
        const totalEl = document.querySelector('.total-amount');
        if (subtotalEl) subtotalEl.textContent = `UGX ${subtotal.toLocaleString()}`;
        if (totalEl) totalEl.textContent = `UGX ${subtotal.toLocaleString()}`;
    }

    function attachCartItemEvents() {
        // Decrease quantity
        document.querySelectorAll('.cart-item .dec').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.nextElementSibling;
                const newVal = parseInt(input.value) - 1;
                if (newVal >= 1) {
                    input.value = newVal;
                    const productId = input.dataset.id;
                    updateQuantity(productId, newVal);
                    updateItemTotal(productId);
                }
            });
        });

        // Increase quantity
        document.querySelectorAll('.cart-item .inc').forEach(btn => {
            btn.addEventListener('click', function() {
                const input = this.previousElementSibling;
                const newVal = parseInt(input.value) + 1;
                input.value = newVal;
                const productId = input.dataset.id;
                updateQuantity(productId, newVal);
                updateItemTotal(productId);
            });
        });

        // Manual quantity change
        document.querySelectorAll('.cart-item .quantity-input').forEach(input => {
            input.addEventListener('change', function() {
                let newVal = parseInt(this.value);
                if (isNaN(newVal) || newVal < 1) newVal = 1;
                this.value = newVal;
                const productId = this.dataset.id;
                updateQuantity(productId, newVal);
                updateItemTotal(productId);
            });
        });

        // Remove item
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const productId = this.dataset.id;
                removeItem(productId);
                this.closest('.cart-item').remove();
                if (getCart().length === 0) {
                    const cartWrapper = document.querySelector('.cart-wrapper');
                    const cartSummary = document.querySelector('.cart-summary');
                    const emptyCart = document.querySelector('.empty-cart');
                    if (cartWrapper) cartWrapper.innerHTML = '';
                    if (cartSummary) cartSummary.style.display = 'none';
                    if (emptyCart) emptyCart.style.display = 'block';
                } else {
                    updateCartSummary();
                }
            });
        });

        // Checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                alert('Proceeding to checkout – backend integration pending.');
            });
        }
    }

    function updateItemTotal(productId) {
        const items = getCart();
        const item = items.find(i => i.id === productId);
        if (!item) return;
        const itemRow = document.querySelector(`.cart-item[data-id="${productId}"]`);
        if (itemRow) {
            const totalCell = itemRow.querySelector('.cart-item-total');
            totalCell.textContent = `UGX ${(item.price * item.quantity).toLocaleString()}`;
        }
        updateCartSummary();
    }

    // ========== INITIALIZE ==========
    updateCartCount();
    updateAuthUI();
    loadCartPage();

    // Listen for cart updates from other tabs
    window.addEventListener('storage', function(e) {
        if (e.key === CART_STORAGE_KEY) {
            console.log('Cart updated from another tab');
            updateCartCount();
            loadCartPage();
        }
    });

    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', function() {
        console.log('Cart updated in this tab');
        updateCartCount();
        loadCartPage();
    });

    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });

    // Mobile bottom nav active state
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === './index.html' && currentPage === 'index.html') item.classList.add('active');
        else if (href && href.includes(currentPage)) item.classList.add('active');
    });
});