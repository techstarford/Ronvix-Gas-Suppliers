document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Hero Slider
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroDots = document.querySelectorAll('.hero-slider-dots .dot');
    let currentSlide = 0;
    
    function showSlide(index) {
        heroSlides.forEach(slide => slide.classList.remove('active'));
        heroDots.forEach(dot => dot.classList.remove('active'));
        
        heroSlides[index].classList.add('active');
        heroDots[index].classList.add('active');
        currentSlide = index;
    }
    
    document.querySelector('.slider-next').addEventListener('click', function() {
        let nextSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(nextSlide);
    });
    
    document.querySelector('.slider-prev').addEventListener('click', function() {
        let prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        showSlide(prevSlide);
    });
    
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Auto slide change
    setInterval(function() {
        let nextSlide = (currentSlide + 1) % heroSlides.length;
        showSlide(nextSlide);
    }, 5000);
    
    // Testimonials Slider
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialDots = document.querySelectorAll('.testimonials-dots .dot');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonialCards.forEach(card => card.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        testimonialCards[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        currentTestimonial = index;
    }
    
    document.querySelector('.testimonial-next').addEventListener('click', function() {
        let nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextTestimonial);
    });
    
    document.querySelector('.testimonial-prev').addEventListener('click', function() {
        let prevTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length;
        showTestimonial(prevTestimonial);
    });
    
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });
    
    // Auto testimonial change
    setInterval(function() {
        let nextTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(nextTestimonial);
    }, 7000);
    
    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const cartCount = document.querySelectorAll('.cart-count');
            
            // Update all cart counts
            cartCount.forEach(count => {
                let currentCount = parseInt(count.textContent);
                count.textContent = currentCount + 1;
            });
            
            // Show confirmation
            alert(`${productName} has been added to your cart!`);
        });
    });
    
    // Add to wishlist functionality
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
    
    // Quick view modal
    const quickViewModal = document.getElementById('quickViewModal');
    const quickViewBtns = document.querySelectorAll('.quick-view');
    const modalClose = document.querySelector('.modal-close');
    
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
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
                        <button class="btn btn-primary add-to-cart">Add to Cart</button>
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
            
            // Add event listeners to new elements
            document.querySelector('.add-to-cart').addEventListener('click', function() {
                const cartCount = document.querySelectorAll('.cart-count');
                cartCount.forEach(count => {
                    let currentCount = parseInt(count.textContent);
                    const quantity = parseInt(document.querySelector('.quantity-input').value);
                    count.textContent = currentCount + quantity;
                });
                
                alert(`${quantity} ${productTitle}(s) added to cart!`);
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
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === quickViewModal) {
            quickViewModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Mobile bottom nav active state
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    mobileNavItems.forEach(item => {
        const link = item.getAttribute('href');
        if ((currentPage === 'index.html' && link === 'index.html') || 
            (currentPage !== 'index.html' && link !== 'index.html' && currentPage.includes(link.replace('.html', '')))) {
            item.classList.add('active');
        }
    });
    
    // Sticky header on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        header.classList.toggle('sticky', window.scrollY > 50);
    });
});