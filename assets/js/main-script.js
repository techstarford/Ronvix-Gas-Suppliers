document.addEventListener('DOMContentLoaded', function() {
    // ========== EXISTING CODE (Mobile nav, sliders, etc.) ==========
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Hero Slider (if on homepage)
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length) {
        const heroDots = document.querySelectorAll('.hero-slider-dots .dot');
        let currentSlide = 0;
        
        function showSlide(index) {
            heroSlides.forEach(slide => slide.classList.remove('active'));
            heroDots.forEach(dot => dot.classList.remove('active'));
            
            heroSlides[index].classList.add('active');
            heroDots[index].classList.add('active');
            currentSlide = index;
        }
        
        const nextBtn = document.querySelector('.slider-next');
        const prevBtn = document.querySelector('.slider-prev');
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                let nextSlide = (currentSlide + 1) % heroSlides.length;
                showSlide(nextSlide);
            });
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                let prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
                showSlide(prevSlide);
            });
        }
        
        heroDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
            });
        });
        
        setInterval(function() {
            let nextSlide = (currentSlide + 1) % heroSlides.length;
            showSlide(nextSlide);
        }, 5000);
    }
    
    // Testimonials Slider (if on homepage)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length) {
        const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonialCards.forEach(card => card.classList.remove('active'));
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            
            testimonialCards[index].classList.add('active');
            testimonialDots[index].classList.add('active');
            currentTestimonial = index;
        }
        
        const nextTesti = document.querySelector('.testimonial-next');
        const prevTesti = document.querySelector('.testimonial-prev');
        if (nextTesti) {
            nextTesti.addEventListener('click', function() {
                let nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                showTestimonial(nextTestimonial);
            });
        }
        if (prevTesti) {
            prevTesti.addEventListener('click', function() {
                let prevTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
                showTestimonial(prevTestimonial);
            });
        }
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showTestimonial(index);
            });
        });
        
        setInterval(function() {
            let nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
            showTestimonial(nextTestimonial);
        }, 7000);
    }
    
    // ========== CART‑RELATED CODE ==========
    // Add to cart buttons (on any page)
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            if (!productCard) return;
            
            // Extract product data (customise according to your HTML structure)
            const productId = productCard.dataset.productId || 'prod_' + Math.random().toString(36).substr(2, 9);
            const productName = productCard.querySelector('.product-title')?.textContent || 'Product';
            const priceText = productCard.querySelector('.current-price')?.textContent || 'UGX 0';
            const price = parseFloat(priceText.replace(/[^0-9.-]+/g, '')) || 0;
            const productImg = productCard.querySelector('.product-img img')?.src || '';
            
            cart.addItem({
                id: productId,
                name: productName,
                price: price,
                image: productImg,
                quantity: 1
            });
            
            // Optional visual feedback
            alert(`${productName} added to cart!`);
        });
    });
    
    // Add to wishlist (unchanged)
    document.querySelectorAll('.add-to-wishlist').forEach(btn => {
        btn.addEventListener('click', function() {
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
    
    // Quick view modal (unchanged but uses cart for add)
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modalClose = document.querySelector('.modal-close');
    
    if (quickViewModal) {
        quickViewBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const productCard = this.closest('.product-card');
                if (!productCard) return;
                
                const productImg = productCard.querySelector('.product-img img').src;
                const productTitle = productCard.querySelector('.product-title').textContent;
                const productCategory = productCard.querySelector('.product-category').textContent;
                const currentPrice = productCard.querySelector('.current-price').textContent;
                const oldPrice = productCard.querySelector('.old-price') ? productCard.querySelector('.old-price').textContent : null;
                const rating = productCard.querySelector('.product-rating').innerHTML;
                
                const quickViewContent = `
                    <div class="quick-view-img">
                        <img src="${productImg}" alt="${productTitle}">
                    </div>
                    <div class="quick-view-info">
                        <span class="quick-view-category">${productCategory}</span>
                        <h2>${productTitle}</h2>
                        <div class="quick-view-price">
                            ${currentPrice}
                            ${oldPrice ? `<span class="quick-view-old-price">${oldPrice}</span>` : ''}
                        </div>
                        <div class="quick-view-rating">
                            ${rating}
                        </div>
                        <p class="quick-view-description">
                            This premium gas product is designed for both home and industrial use, featuring the highest safety standards and durability. Perfect for various applications with guaranteed performance.
                        </p>
                        <div class="quick-view-actions">
                            <div class="quantity-selector">
                                <button class="quantity-btn minus">-</button>
                                <input type="number" class="quantity-input" value="1" min="1">
                                <button class="quantity-btn plus">+</button>
                            </div>
                            <button class="btn btn-primary quick-add-to-cart">Add to Cart</button>
                        </div>
                        <div class="quick-view-meta">
                            <span><strong>Category:</strong> ${productCategory}</span>
                            <span><strong>Availability:</strong> In Stock</span>
                            <span><strong>Delivery:</strong> Free delivery in Kasana Luwero</span>
                        </div>
                    </div>
                `;
                
                document.querySelector('.quick-view-content').innerHTML = quickViewContent;
                quickViewModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                
                // Quick view Add to Cart
                document.querySelector('.quick-add-to-cart').addEventListener('click', function() {
                    const quantity = parseInt(document.querySelector('.quantity-input').value) || 1;
                    cart.addItem({
                        id: 'prod_' + Date.now(),
                        name: productTitle,
                        price: parseFloat(currentPrice.replace(/[^0-9.-]+/g, '')) || 0,
                        image: productImg,
                        quantity: quantity
                    });
                    alert(`${quantity} × ${productTitle} added to cart!`);
                    quickViewModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
                
                // Quantity controls
                document.querySelector('.quantity-btn.minus').addEventListener('click', function() {
                    const input = document.querySelector('.quantity-input');
                    if (parseInt(input.value) > 1) {
                        input.value = parseInt(input.value) - 1;
                    }
                });
                
                document.querySelector('.quantity-btn.plus').addEventListener('click', function() {
                    const input = document.querySelector('.quantity-input');
                    input.value = parseInt(input.value) + 1;
                });
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', function() {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === quickViewModal) {
                quickViewModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ========== CART PAGE SPECIFIC ==========
    if (window.location.pathname.includes('/cart/')) {
        loadCartPage();
    }
    
    // Mobile bottom nav active state
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    mobileNavItems.forEach(item => {
        const link = item.getAttribute('href');
        if (link && currentPage.includes(link.replace('.html', ''))) {
            item.classList.add('active');
        }
    });
    
    // Sticky header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            header.classList.toggle('sticky', window.scrollY > 50);
        }
    });
});

/**
 * Load and display cart items on the cart page.
 */
function loadCartPage() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const cartSummary = document.querySelector('.cart-summary');
    const emptyCart = document.querySelector('.empty-cart');
    const loadingEl = document.querySelector('.cart-loading');
    
    if (!cartWrapper) return;
    
    const items = cart.getItems();
    
    // Hide loading
    if (loadingEl) loadingEl.style.display = 'none';
    
    if (items.length === 0) {
        // Show empty cart
        if (emptyCart) emptyCart.style.display = 'block';
        if (cartSummary) cartSummary.style.display = 'none';
        return;
    }
    
    // Show summary and hide empty cart
    if (emptyCart) emptyCart.style.display = 'none';
    if (cartSummary) cartSummary.style.display = 'block';
    
    // Build cart items HTML
    let html = '<div class="cart-items">';
    items.forEach(item => {
        html += `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
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
    
    // Update summary totals
    updateCartSummary();
    
    // Attach event listeners for quantity changes and removal
    attachCartItemEvents();
}

function updateCartSummary() {
    const subtotal = cart.getSubtotal();
    const subtotalEl = document.querySelector('.subtotal-amount');
    const totalEl = document.querySelector('.total-amount');
    if (subtotalEl) subtotalEl.textContent = `UGX ${subtotal.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `UGX ${subtotal.toLocaleString()}`; // delivery free
}

function attachCartItemEvents() {
    // Quantity decrease
    document.querySelectorAll('.cart-item .dec').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.nextElementSibling;
            const newVal = parseInt(input.value) - 1;
            if (newVal >= 1) {
                input.value = newVal;
                const productId = input.dataset.id;
                cart.updateQuantity(productId, newVal);
                // Update item total line
                updateItemTotal(productId);
            }
        });
    });
    
    // Quantity increase
    document.querySelectorAll('.cart-item .inc').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const newVal = parseInt(input.value) + 1;
            input.value = newVal;
            const productId = input.dataset.id;
            cart.updateQuantity(productId, newVal);
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
            cart.updateQuantity(productId, newVal);
            updateItemTotal(productId);
        });
    });
    
    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.dataset.id;
            cart.removeItem(productId);
            // Remove the DOM element
            this.closest('.cart-item').remove();
            // If cart becomes empty, show empty message
            if (cart.getItems().length === 0) {
                document.querySelector('.cart-wrapper').innerHTML = '';
                document.querySelector('.cart-summary').style.display = 'none';
                document.querySelector('.empty-cart').style.display = 'block';
            } else {
                updateCartSummary();
            }
        });
    });
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            // Redirect to checkout page (create later)
            alert('Proceeding to checkout – backend integration pending.');
            // window.location.href = '../checkout/index.html';
        });
    }
}

function updateItemTotal(productId) {
    const items = cart.getItems();
    const item = items.find(i => i.id === productId);
    if (!item) return;
    const itemRow = document.querySelector(`.cart-item[data-id="${productId}"]`);
    if (itemRow) {
        const totalCell = itemRow.querySelector('.cart-item-total');
        totalCell.textContent = `UGX ${(item.price * item.quantity).toLocaleString()}`;
    }
    updateCartSummary();
}