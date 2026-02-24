/**
 * RonVick Gas - Gas Cylinders Page
 * Complete production script with full product data, filters, cart, wishlist, auth.
 */

document.addEventListener('DOMContentLoaded', function() {
    // ========== CONSTANTS ==========
    const CART_STORAGE_KEY = 'ronvick_cart';
    const WISHLIST_STORAGE_KEY = 'ronvick_wishlist';
    const AUTH_TOKEN_KEY = 'authToken';
    const AUTH_USER_KEY = 'authUser';

    // ========== ALL GAS CYLINDERS DATA (32 products) ==========
    const allProducts = [
        // Shell
        { id: 'shell-6kg-001', name: 'Shell Gas Cylinder - 6kg', size: '6kg', brand: 'Shell', type: 'LPG (Cooking Gas)', price: 55000, oldPrice: null, image: '../../assets/images/shell-6kg.jpg', rating: 4.5, reviews: 24, badge: 'best-seller', inStock: true, certification: 'UN Certified', description: 'Portable 6kg gas cylinder from Shell, ideal for small families.' },
        { id: 'shell-13kg-002', name: 'Shell Gas Cylinder - 13kg', size: '13kg', brand: 'Shell', type: 'LPG (Cooking Gas)', price: 95000, oldPrice: 105000, image: '../../assets/images/shell-13kg.jpg', rating: 4.7, reviews: 56, badge: 'discount', inStock: true, certification: 'UN Certified', description: 'Standard 13kg cylinder, perfect for medium households.' },
        { id: 'shell-25kg-003', name: 'Shell Gas Cylinder - 25kg', size: '25kg', brand: 'Shell', type: 'LPG (Cooking Gas)', price: 165000, oldPrice: null, image: '../../assets/images/shell-25kg.jpg', rating: 4.6, reviews: 32, badge: null, inStock: true, certification: 'ISO Certified', description: 'Large 25kg cylinder for extended use.' },
        { id: 'shell-50kg-004', name: 'Shell Gas Cylinder - 50kg', size: '50kg', brand: 'Shell', type: 'LPG (Cooking Gas)', price: 295000, oldPrice: 320000, image: '../../assets/images/shell-50kg.jpg', rating: 4.8, reviews: 18, badge: 'best-seller', inStock: true, certification: 'UN Certified', description: 'Commercial 50kg cylinder, ideal for restaurants.' },
        { id: 'shell-oxygen-6kg-005', name: 'Shell Oxygen Cylinder - 6kg', size: '6kg', brand: 'Shell', type: 'Oxygen', price: 65000, oldPrice: null, image: '../../assets/images/shell-oxygen-6kg.jpg', rating: 4.4, reviews: 9, badge: 'new', inStock: true, certification: 'ISO Certified', description: 'Medical oxygen cylinder, portable.' },
        // Total
        { id: 'total-6kg-006', name: 'Total Gas Cylinder - 6kg', size: '6kg', brand: 'Total', type: 'LPG (Cooking Gas)', price: 53000, oldPrice: null, image: '../../assets/images/total-6kg.jpg', rating: 4.3, reviews: 15, badge: null, inStock: true, certification: 'UN Certified' },
        { id: 'total-13kg-007', name: 'Total Gas Cylinder - 13kg', size: '13kg', brand: 'Total', type: 'LPG (Cooking Gas)', price: 92000, oldPrice: 99000, image: '../../assets/images/total-13kg.jpg', rating: 4.5, reviews: 27, badge: 'discount', inStock: true, certification: 'UN Certified' },
        { id: 'total-25kg-008', name: 'Total Gas Cylinder - 25kg', size: '25kg', brand: 'Total', type: 'LPG (Cooking Gas)', price: 158000, oldPrice: null, image: '../../assets/images/total-25kg.jpg', rating: 4.6, reviews: 14, badge: null, inStock: true, certification: 'ISO Certified' },
        { id: 'total-50kg-009', name: 'Total Gas Cylinder - 50kg', size: '50kg', brand: 'Total', type: 'LPG (Cooking Gas)', price: 288000, oldPrice: 310000, image: '../../assets/images/total-50kg.jpg', rating: 4.7, reviews: 21, badge: 'best-seller', inStock: true, certification: 'UN Certified' },
        { id: 'total-oxygen-10kg-010', name: 'Total Oxygen Cylinder - 10kg', size: '10kg', brand: 'Total', type: 'Oxygen', price: 85000, oldPrice: null, image: '../../assets/images/total-oxygen-10kg.jpg', rating: 4.2, reviews: 6, badge: 'new', inStock: true, certification: 'ISO Certified' },
        // Oryx
        { id: 'oryx-6kg-011', name: 'Oryx Gas Cylinder - 6kg', size: '6kg', brand: 'Oryx', type: 'LPG (Cooking Gas)', price: 54000, oldPrice: null, image: '../../assets/images/oryx-6kg.jpg', rating: 4.4, reviews: 12, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'oryx-13kg-012', name: 'Oryx Gas Cylinder - 13kg', size: '13kg', brand: 'Oryx', type: 'LPG (Cooking Gas)', price: 93000, oldPrice: 100000, image: '../../assets/images/oryx-13kg.jpg', rating: 4.6, reviews: 23, badge: 'discount', inStock: true, certification: 'Safety Tested' },
        { id: 'oryx-25kg-013', name: 'Oryx Gas Cylinder - 25kg', size: '25kg', brand: 'Oryx', type: 'LPG (Cooking Gas)', price: 162000, oldPrice: null, image: '../../assets/images/oryx-25kg.jpg', rating: 4.5, reviews: 17, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'oryx-50kg-014', name: 'Oryx Gas Cylinder - 50kg', size: '50kg', brand: 'Oryx', type: 'LPG (Cooking Gas)', price: 292000, oldPrice: null, image: '../../assets/images/oryx-50kg.jpg', rating: 4.7, reviews: 8, badge: 'best-seller', inStock: true, certification: 'Safety Tested' },
        { id: 'oryx-industrial-15kg-015', name: 'Oryx Industrial Gas - 15kg', size: '15kg', brand: 'Oryx', type: 'Industrial Gas', price: 125000, oldPrice: null, image: '../../assets/images/oryx-industrial.jpg', rating: 4.3, reviews: 5, badge: 'new', inStock: true, certification: 'ISO Certified' },
        // Stabex
        { id: 'stabex-6kg-016', name: 'Stabex Gas Cylinder - 6kg', size: '6kg', brand: 'Stabex', type: 'LPG (Cooking Gas)', price: 52000, oldPrice: null, image: '../../assets/images/stabex-6kg.jpg', rating: 4.2, reviews: 11, badge: null, inStock: true, certification: 'UN Certified' },
        { id: 'stabex-13kg-017', name: 'Stabex Gas Cylinder - 13kg', size: '13kg', brand: 'Stabex', type: 'LPG (Cooking Gas)', price: 91000, oldPrice: null, image: '../../assets/images/stabex-13kg.jpg', rating: 4.4, reviews: 14, badge: null, inStock: true, certification: 'UN Certified' },
        { id: 'stabex-25kg-018', name: 'Stabex Gas Cylinder - 25kg', size: '25kg', brand: 'Stabex', type: 'LPG (Cooking Gas)', price: 155000, oldPrice: 170000, image: '../../assets/images/stabex-25kg.jpg', rating: 4.5, reviews: 9, badge: 'discount', inStock: true, certification: 'UN Certified' },
        { id: 'stabex-50kg-019', name: 'Stabex Gas Cylinder - 50kg', size: '50kg', brand: 'Stabex', type: 'LPG (Cooking Gas)', price: 280000, oldPrice: null, image: '../../assets/images/stabex-50kg.jpg', rating: 4.6, reviews: 6, badge: null, inStock: true, certification: 'UN Certified' },
        // Hass
        { id: 'hass-6kg-020', name: 'Hass Gas Cylinder - 6kg', size: '6kg', brand: 'Hass', type: 'LPG (Cooking Gas)', price: 51000, oldPrice: null, image: '../../assets/images/hass-6kg.jpg', rating: 4.1, reviews: 8, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'hass-13kg-021', name: 'Hass Gas Cylinder - 13kg', size: '13kg', brand: 'Hass', type: 'LPG (Cooking Gas)', price: 89000, oldPrice: null, image: '../../assets/images/hass-13kg.jpg', rating: 4.3, reviews: 12, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'hass-25kg-022', name: 'Hass Gas Cylinder - 25kg', size: '25kg', brand: 'Hass', type: 'LPG (Cooking Gas)', price: 152000, oldPrice: null, image: '../../assets/images/hass-25kg.jpg', rating: 4.4, reviews: 7, badge: null, inStock: true, certification: 'Safety Tested' },
        // Hashi
        { id: 'hashi-6kg-023', name: 'Hashi Gas Cylinder - 6kg', size: '6kg', brand: 'Hashi', type: 'LPG (Cooking Gas)', price: 50000, oldPrice: null, image: '../../assets/images/hashi-6kg.jpg', rating: 4.0, reviews: 5, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'hashi-13kg-024', name: 'Hashi Gas Cylinder - 13kg', size: '13kg', brand: 'Hashi', type: 'LPG (Cooking Gas)', price: 88000, oldPrice: null, image: '../../assets/images/hashi-13kg.jpg', rating: 4.2, reviews: 9, badge: null, inStock: true, certification: 'Safety Tested' },
        // Mogas
        { id: 'mogas-6kg-025', name: 'Mogas Gas Cylinder - 6kg', size: '6kg', brand: 'Mogas', type: 'LPG (Cooking Gas)', price: 52500, oldPrice: null, image: '../../assets/images/mogas-6kg.jpg', rating: 4.2, reviews: 6, badge: null, inStock: true, certification: 'ISO Certified' },
        { id: 'mogas-13kg-026', name: 'Mogas Gas Cylinder - 13kg', size: '13kg', brand: 'Mogas', type: 'LPG (Cooking Gas)', price: 90500, oldPrice: null, image: '../../assets/images/mogas-13kg.jpg', rating: 4.3, reviews: 8, badge: null, inStock: true, certification: 'ISO Certified' },
        // Meru
        { id: 'meru-6kg-027', name: 'Meru Gas Cylinder - 6kg', size: '6kg', brand: 'Meru', type: 'LPG (Cooking Gas)', price: 51500, oldPrice: null, image: '../../assets/images/meru-6kg.jpg', rating: 4.1, reviews: 4, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'meru-13kg-028', name: 'Meru Gas Cylinder - 13kg', size: '13kg', brand: 'Meru', type: 'LPG (Cooking Gas)', price: 89500, oldPrice: null, image: '../../assets/images/meru-13kg.jpg', rating: 4.3, reviews: 7, badge: null, inStock: true, certification: 'Safety Tested' },
        // Additional oxygen/industrial
        { id: 'shell-oxygen-10kg-029', name: 'Shell Oxygen Cylinder - 10kg', size: '10kg', brand: 'Shell', type: 'Oxygen', price: 78000, oldPrice: null, image: '../../assets/images/shell-oxygen-10kg.jpg', rating: 4.4, reviews: 6, badge: 'new', inStock: true, certification: 'ISO Certified' },
        { id: 'total-industrial-20kg-030', name: 'Total Industrial Gas - 20kg', size: '20kg', brand: 'Total', type: 'Industrial Gas', price: 145000, oldPrice: null, image: '../../assets/images/total-industrial.jpg', rating: 4.5, reviews: 5, badge: null, inStock: true, certification: 'ISO Certified' },
        { id: 'oryx-oxygen-8kg-031', name: 'Oryx Oxygen Cylinder - 8kg', size: '8kg', brand: 'Oryx', type: 'Oxygen', price: 72000, oldPrice: null, image: '../../assets/images/oryx-oxygen.jpg', rating: 4.2, reviews: 4, badge: null, inStock: true, certification: 'Safety Tested' },
        { id: 'stabex-oxygen-12kg-032', name: 'Stabex Oxygen Cylinder - 12kg', size: '12kg', brand: 'Stabex', type: 'Oxygen', price: 95000, oldPrice: null, image: '../../assets/images/stabex-oxygen.jpg', rating: 4.3, reviews: 5, badge: null, inStock: true, certification: 'UN Certified' }
    ];

    // ========== STATE ==========
    let filteredProducts = [];
    let currentPage = 1;
    let itemsPerPage = 12;
    let currentSort = 'default';
    let currentView = 'grid';
    let activeFilters = {
        size: 'all',
        brands: ['all'],
        types: ['all'],
        certifications: ['all'],
        availability: ['all'],
        priceMin: 0,
        priceMax: 500000,
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
            grid.innerHTML = '';
            document.getElementById('noResults').style.display = 'block';
            document.getElementById('loadingSpinner').style.display = 'none';
        } else {
            document.getElementById('noResults').style.display = 'none';
            grid.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
        }

        updatePagination();
        updateProductCounts();
        attachProductEventListeners();
        updateFilterCounts();
    }

    function createProductCard(product) {
        const badgeHtml = product.badge ? 
            `<div class="product-badges"><span class="product-badge ${product.badge}">${product.badge.replace('-', ' ')}</span></div>` : '';
        const oldPriceHtml = product.oldPrice ? 
            `<span class="old-price">UGX ${product.oldPrice.toLocaleString()}</span>` : '';
        const ratingStars = generateRatingStars(product.rating);
        const inStockClass = product.inStock ? '' : 'out-of-stock';

        return `
            <div class="product-card ${inStockClass}" data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image}" data-product-brand="${product.brand}" data-product-size="${product.size}">
                ${badgeHtml}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='../../assets/images/placeholder.jpg'">
                    <div class="product-actions">
                        <button class="quick-view" title="Quick View"><i class="fas fa-eye"></i></button>
                        <button class="add-to-wishlist" title="Add to Wishlist"><i class="far fa-heart"></i></button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-meta">
                        <span class="product-category">${product.type}</span>
                        <span class="product-brand">${product.brand}</span>
                    </div>
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-specs">
                        <span class="product-spec"><i class="fas fa-weight-hanging"></i> ${product.size}</span>
                        <span class="product-spec"><i class="fas fa-certificate"></i> ${product.certification}</span>
                    </div>
                    <p class="product-description">${product.description || 'High-quality gas cylinder, certified and safe.'}</p>
                    <div class="product-footer">
                        <div class="product-price">
                            <span class="current-price">UGX ${product.price.toLocaleString()}</span>
                            ${oldPriceHtml}
                        </div>
                        <div class="product-rating">
                            <div class="stars">${ratingStars}</div>
                            <span class="rating-count">(${product.reviews})</span>
                        </div>
                    </div>
                </div>
                <button class="add-to-cart" ${!product.inStock ? 'disabled' : ''}>${product.inStock ? 'Add to Cart' : 'Out of Stock'}</button>
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
        if (card.querySelector('.add-to-cart').disabled) {
            alert('This item is out of stock.');
            return;
        }
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
            // Size filter (radio)
            if (activeFilters.size !== 'all' && product.size !== activeFilters.size) return false;

            // Brand filter (multiple checkboxes)
            if (!activeFilters.brands.includes('all') && activeFilters.brands.length > 0) {
                if (!activeFilters.brands.includes(product.brand)) return false;
            }

            // Type filter
            if (!activeFilters.types.includes('all') && activeFilters.types.length > 0) {
                if (!activeFilters.types.includes(product.type)) return false;
            }

            // Certification filter
            if (!activeFilters.certifications.includes('all') && activeFilters.certifications.length > 0) {
                if (!activeFilters.certifications.includes(product.certification)) return false;
            }

            // Availability filter
            if (!activeFilters.availability.includes('all') && activeFilters.availability.length > 0) {
                if (activeFilters.availability.includes('in-stock') && !product.inStock) return false;
                if (activeFilters.availability.includes('pre-order') && product.inStock) return false; // assume pre-order means not in stock
            }

            // Price filter
            if (product.price < activeFilters.priceMin || product.price > activeFilters.priceMax) return false;

            // Search filter
            if (activeFilters.search) {
                const searchLower = activeFilters.search.toLowerCase();
                return product.name.toLowerCase().includes(searchLower) || 
                       product.brand.toLowerCase().includes(searchLower) ||
                       product.type.toLowerCase().includes(searchLower);
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
            case 'name_asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
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
        const totalEl = document.getElementById('totalCount');
        const startEl = document.getElementById('showingStart');
        const endEl = document.getElementById('showingEnd');
        if (totalEl) totalEl.textContent = filteredProducts.length;
        if (startEl) startEl.textContent = filteredProducts.length ? Math.min((currentPage - 1) * itemsPerPage + 1, filteredProducts.length) : 0;
        if (endEl) endEl.textContent = filteredProducts.length ? Math.min(currentPage * itemsPerPage, filteredProducts.length) : 0;
    }

    function updateFilterCounts() {
        document.querySelector('.active-filter-count').textContent = 
            (activeFilters.size !== 'all' ? 1 : 0) +
            (activeFilters.brands.includes('all') ? 0 : activeFilters.brands.length) +
            (activeFilters.types.includes('all') ? 0 : activeFilters.types.length) +
            (activeFilters.certifications.includes('all') ? 0 : activeFilters.certifications.length) +
            (activeFilters.availability.includes('all') ? 0 : activeFilters.availability.length) +
            (activeFilters.search ? 1 : 0);
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
        showCartModal(product.name);
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

    function showCartModal(productName) {
        document.getElementById('cartItemName').textContent = productName;
        document.getElementById('cartModal').classList.add('active');
        document.body.style.overflow = 'hidden';
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
            window.location.href = '../../account/index.html';
        }
    });

    // ========== QUICK VIEW MODAL ==========
    const quickViewModal = document.getElementById('quickViewModal');
    const modalClose = document.querySelectorAll('.modal-close');

    function openQuickView(card) {
        const productId = card.dataset.productId;
        const productName = card.dataset.productName;
        const productPrice = parseFloat(card.dataset.productPrice);
        const productImage = card.dataset.productImage;
        const productCategory = card.querySelector('.product-category').textContent;
        const productBrand = card.querySelector('.product-brand').textContent;
        const productRating = card.querySelector('.product-rating').innerHTML;
        const currentPrice = card.querySelector('.current-price').textContent;
        const oldPrice = card.querySelector('.old-price') ? card.querySelector('.old-price').textContent : null;
        const description = card.querySelector('.product-description')?.textContent || 'High-quality gas cylinder, certified and safe.';
        const specs = Array.from(card.querySelectorAll('.product-spec')).map(el => el.textContent.trim());

        const content = `
            <div class="quick-view-img">
                <img src="${productImage}" alt="${productName}">
            </div>
            <div class="quick-view-info">
                <div class="quick-view-meta">
                    <span class="quick-view-brand">${productBrand}</span>
                    <span class="quick-view-category">${productCategory}</span>
                </div>
                <h2>${productName}</h2>
                <div class="quick-view-price">
                    ${currentPrice}
                    ${oldPrice ? `<span class="quick-view-old-price">${oldPrice}</span>` : ''}
                </div>
                <div class="quick-view-rating">
                    ${productRating}
                </div>
                <div class="quick-view-specs">
                    ${specs.map(spec => `<div class="spec-item"><span class="spec-label">${spec.split(':')[0]}</span><span class="spec-value">${spec.split(':')[1] || spec}</span></div>`).join('')}
                </div>
                <p class="quick-view-description">${description}</p>
                <div class="quick-view-actions">
                    <div class="quantity-selector">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" class="quantity-input" value="1" min="1">
                        <button class="quantity-btn plus">+</button>
                    </div>
                    <button class="btn btn-primary quick-add-to-cart" data-id="${productId}" data-name="${productName}" data-price="${productPrice}" data-image="${productImage}">Add to Cart</button>
                </div>
                <div class="quick-view-features">
                    <h4>Features</h4>
                    <div class="feature-list">
                        <div class="feature-item"><i class="fas fa-check"></i> Certified quality</div>
                        <div class="feature-item"><i class="fas fa-check"></i> Safety tested</div>
                        <div class="feature-item"><i class="fas fa-check"></i> Free delivery</div>
                        <div class="feature-item"><i class="fas fa-check"></i> 1 year warranty</div>
                    </div>
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

    modalClose.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // ========== FILTER EVENT LISTENERS ==========
    function initFilters() {
        // Size radio
        document.querySelectorAll('input[name="size"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.checked) {
                    activeFilters.size = this.value;
                }
            });
        });

        // Brand checkboxes
        document.querySelectorAll('#brandFilter .brand-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#brandFilter .brand-checkbox:not([value="all"])').forEach(c => c.checked = false);
                    activeFilters.brands = ['all'];
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#brandFilter .brand-checkbox[value="all"]');
                    if (allCheck) allCheck.checked = false;
                    activeFilters.brands = Array.from(document.querySelectorAll('#brandFilter .brand-checkbox:checked')).map(cb => cb.value);
                    if (activeFilters.brands.length === 0) {
                        // if none checked, check 'all'
                        document.querySelector('#brandFilter .brand-checkbox[value="all"]').checked = true;
                        activeFilters.brands = ['all'];
                    }
                }
            });
        });

        // Type checkboxes
        document.querySelectorAll('#typeFilter .type-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#typeFilter .type-checkbox:not([value="all"])').forEach(c => c.checked = false);
                    activeFilters.types = ['all'];
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#typeFilter .type-checkbox[value="all"]');
                    if (allCheck) allCheck.checked = false;
                    activeFilters.types = Array.from(document.querySelectorAll('#typeFilter .type-checkbox:checked')).map(cb => cb.value);
                    if (activeFilters.types.length === 0) {
                        document.querySelector('#typeFilter .type-checkbox[value="all"]').checked = true;
                        activeFilters.types = ['all'];
                    }
                }
            });
        });

        // Certification checkboxes
        document.querySelectorAll('#certificationFilter .certification-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#certificationFilter .certification-checkbox:not([value="all"])').forEach(c => c.checked = false);
                    activeFilters.certifications = ['all'];
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#certificationFilter .certification-checkbox[value="all"]');
                    if (allCheck) allCheck.checked = false;
                    activeFilters.certifications = Array.from(document.querySelectorAll('#certificationFilter .certification-checkbox:checked')).map(cb => cb.value);
                    if (activeFilters.certifications.length === 0) {
                        document.querySelector('#certificationFilter .certification-checkbox[value="all"]').checked = true;
                        activeFilters.certifications = ['all'];
                    }
                }
            });
        });

        // Availability checkboxes
        document.querySelectorAll('#availabilityFilter .availability-checkbox').forEach(cb => {
            cb.addEventListener('change', function() {
                if (this.value === 'all' && this.checked) {
                    document.querySelectorAll('#availabilityFilter .availability-checkbox:not([value="all"])').forEach(c => c.checked = false);
                    activeFilters.availability = ['all'];
                } else if (this.value !== 'all') {
                    const allCheck = document.querySelector('#availabilityFilter .availability-checkbox[value="all"]');
                    if (allCheck) allCheck.checked = false;
                    activeFilters.availability = Array.from(document.querySelectorAll('#availabilityFilter .availability-checkbox:checked')).map(cb => cb.value);
                    if (activeFilters.availability.length === 0) {
                        document.querySelector('#availabilityFilter .availability-checkbox[value="all"]').checked = true;
                        activeFilters.availability = ['all'];
                    }
                }
            });
        });

        // Price slider
        const priceSlider = document.getElementById('priceSlider');
        const minPrice = document.getElementById('minPrice');
        const maxPrice = document.getElementById('maxPrice');
        if (priceSlider && minPrice && maxPrice) {
            noUiSlider.create(priceSlider, {
                start: [0, 500000],
                connect: true,
                range: { 'min': 0, 'max': 500000 },
                step: 1000,
                format: { to: value => Math.round(value), from: value => Math.round(value) }
            });
            priceSlider.noUiSlider.on('update', (values, handle) => {
                if (handle === 0) minPrice.value = values[0];
                else maxPrice.value = values[1];
            });
            minPrice.addEventListener('change', () => {
                priceSlider.noUiSlider.set([minPrice.value, null]);
            });
            maxPrice.addEventListener('change', () => {
                priceSlider.noUiSlider.set([null, maxPrice.value]);
            });
        }

        // Apply filters
        document.getElementById('applyFilters')?.addEventListener('click', function() {
            // Update activeFilters from current UI
            activeFilters.size = document.querySelector('input[name="size"]:checked')?.value || 'all';
            activeFilters.brands = Array.from(document.querySelectorAll('#brandFilter .brand-checkbox:checked')).map(cb => cb.value);
            if (activeFilters.brands.length === 0) activeFilters.brands = ['all'];
            activeFilters.types = Array.from(document.querySelectorAll('#typeFilter .type-checkbox:checked')).map(cb => cb.value);
            if (activeFilters.types.length === 0) activeFilters.types = ['all'];
            activeFilters.certifications = Array.from(document.querySelectorAll('#certificationFilter .certification-checkbox:checked')).map(cb => cb.value);
            if (activeFilters.certifications.length === 0) activeFilters.certifications = ['all'];
            activeFilters.availability = Array.from(document.querySelectorAll('#availabilityFilter .availability-checkbox:checked')).map(cb => cb.value);
            if (activeFilters.availability.length === 0) activeFilters.availability = ['all'];
            activeFilters.priceMin = parseInt(minPrice.value) || 0;
            activeFilters.priceMax = parseInt(maxPrice.value) || 500000;
            activeFilters.search = document.getElementById('searchInput')?.value || '';

            currentPage = 1;
            renderProducts();

            document.getElementById('productsSidebar').classList.remove('active');
            document.body.style.overflow = '';
        });

        // Reset filters
        document.getElementById('resetFilters')?.addEventListener('click', function() {
            document.querySelector('input[name="size"][value="all"]').checked = true;
            document.querySelectorAll('#brandFilter .brand-checkbox').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#typeFilter .type-checkbox').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#certificationFilter .certification-checkbox').forEach(cb => cb.checked = cb.value === 'all');
            document.querySelectorAll('#availabilityFilter .availability-checkbox').forEach(cb => cb.checked = cb.value === 'all');
            if (minPrice) minPrice.value = 0;
            if (maxPrice) maxPrice.value = 500000;
            if (priceSlider) priceSlider.noUiSlider.set([0, 500000]);
            document.getElementById('searchInput').value = '';

            activeFilters = {
                size: 'all',
                brands: ['all'],
                types: ['all'],
                certifications: ['all'],
                availability: ['all'],
                priceMin: 0,
                priceMax: 500000,
                search: ''
            };
            currentPage = 1;
            renderProducts();
        });

        // Search
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

        // Brand search
        document.getElementById('brandSearch')?.addEventListener('input', function() {
            const term = this.value.toLowerCase();
            document.querySelectorAll('#brandFilter .brand-option').forEach(opt => {
                const brandName = opt.querySelector('.brand-name')?.textContent.toLowerCase() || '';
                opt.style.display = brandName.includes(term) ? 'flex' : 'none';
            });
        });

        // Clear filters button in no-results
        document.getElementById('clearFiltersBtn')?.addEventListener('click', function() {
            document.getElementById('resetFilters').click();
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

        // Footer size links
        document.querySelectorAll('.footer-col ul li a[data-filter-size]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const size = this.dataset.filterSize;
                document.querySelector(`input[name="size"][value="${size}"]`).checked = true;
                document.getElementById('applyFilters').click();
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