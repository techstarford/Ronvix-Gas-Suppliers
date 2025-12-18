// Cylinder Details Page Functionality

// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const zoomBtn = document.getElementById('zoomBtn');
const zoomModal = document.getElementById('zoomModal');
const zoomedImage = document.getElementById('zoomedImage');
const modalClose = document.querySelectorAll('.modal-close');
const quantityInput = document.getElementById('quantity');
const minusBtn = document.querySelector('.qty-btn.minus');
const plusBtn = document.querySelector('.qty-btn.plus');
const addToCartBtn = document.querySelector('.btn-add-to-cart');
const wishlistBtn = document.querySelector('.btn-wishlist');
const compareBtn = document.querySelector('.btn-compare');
const buyNowBtn = document.querySelector('.btn-buy-now');
const cartModal = document.getElementById('cartModal');
const compareModal = document.getElementById('compareModal');
const continueShoppingBtn = document.getElementById('continueShopping');
const clearCompareBtn = document.getElementById('clearCompare');
const addToCartComparedBtn = document.getElementById('addToCartCompared');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const faqItems = document.querySelectorAll('.faq-item');
const filterBtns = document.querySelectorAll('.filter-btn');
const reviewStars = document.querySelectorAll('.rating-input i');
const helpfulBtns = document.querySelectorAll('.helpful-btn');
const bundleCheckboxes = document.querySelectorAll('.bundle-checkbox input');
const bundleAddBtn = document.querySelector('.btn-bundle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const galleryPrev = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');

// Global Variables
let cartCount = 0;
let wishlistItems = new Set();
let compareItems = new Set();
let currentImageIndex = 0;
let selectedRating = 0;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updateCartCount();
    initializeThumbnailGallery();
});

function initializePage() {
    // Set initial active thumbnail
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
    
    // Initialize rating stars
    reviewStars.forEach(star => {
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.dataset.rating);
            updateRatingStars(selectedRating);
        });
        
        star.addEventListener('mouseover', function() {
            const rating = parseInt(this.dataset.rating);
            highlightStars(rating);
        });
        
        star.addEventListener('mouseout', function() {
            updateRatingStars(selectedRating);
        });
    });
    
    // Initialize FAQ
    initializeFAQ();
}

function setupEventListeners() {
    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Image gallery
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            setActiveThumbnail(index);
            const imageUrl = this.dataset.image;
            mainImage.src = imageUrl;
            mainImage.alt = this.querySelector('img').alt;
        });
    });
    
    // Gallery navigation
    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', showPreviousImage);
        galleryNext.addEventListener('click', showNextImage);
    }
    
    // Zoom functionality
    zoomBtn.addEventListener('click', openZoomModal);
    mainImage.addEventListener('click', openZoomModal);
    
    // Quantity controls
    minusBtn.addEventListener('click', decreaseQuantity);
    plusBtn.addEventListener('click', increaseQuantity);
    quantityInput.addEventListener('change', validateQuantity);
    
    // Action buttons
    addToCartBtn.addEventListener('click', addToCart);
    wishlistBtn.addEventListener('click', toggleWishlist);
    compareBtn.addEventListener('click', addToCompare);
    buyNowBtn.addEventListener('click', buyNow);
    
    // Bundle functionality
    bundleCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBundlePrice);
    });
    bundleAddBtn.addEventListener('click', addBundleToCart);
    
    // Modal close buttons
    modalClose.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Close modal on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Continue shopping
    continueShoppingBtn.addEventListener('click', () => cartModal.classList.remove('active'));
    
    // Compare modal actions
    clearCompareBtn.addEventListener('click', clearCompare);
    addToCartComparedBtn.addEventListener('click', addComparedToCart);
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
    
    // Review filters
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterReviews(this.textContent);
        });
    });
    
    // Helpful buttons
    helpfulBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const currentCount = parseInt(this.textContent.match(/\d+/)[0]);
            this.innerHTML = `<i class="fas fa-thumbs-up"></i> Helpful (${currentCount + 1})`;
            this.classList.add('active');
            this.disabled = true;
        });
    });
    
    // FAQ toggles
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            item.classList.toggle('active');
        });
    });
    
    // Keyboard navigation for gallery
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
}

function initializeThumbnailGallery() {
    // Set up thumbnail gallery navigation
    const thumbnailContainer = document.querySelector('.thumbnail-gallery');
    
    if (galleryPrev && galleryNext) {
        galleryPrev.addEventListener('click', () => {
            thumbnailContainer.scrollBy({ left: -100, behavior: 'smooth' });
        });
        
        galleryNext.addEventListener('click', () => {
            thumbnailContainer.scrollBy({ left: 100, behavior: 'smooth' });
        });
    }
}

function setActiveThumbnail(index) {
    thumbnails.forEach((thumb, i) => {
        thumb.classList.remove('active');
        if (i === index) {
            thumb.classList.add('active');
            currentImageIndex = index;
        }
    });
}

function showPreviousImage() {
    let newIndex = currentImageIndex - 1;
    if (newIndex < 0) newIndex = thumbnails.length - 1;
    
    const thumbnail = thumbnails[newIndex];
    const imageUrl = thumbnail.dataset.image;
    mainImage.src = imageUrl;
    mainImage.alt = thumbnail.querySelector('img').alt;
    setActiveThumbnail(newIndex);
}

function showNextImage() {
    let newIndex = currentImageIndex + 1;
    if (newIndex >= thumbnails.length) newIndex = 0;
    
    const thumbnail = thumbnails[newIndex];
    const imageUrl = thumbnail.dataset.image;
    mainImage.src = imageUrl;
    mainImage.alt = thumbnail.querySelector('img').alt;
    setActiveThumbnail(newIndex);
}

function openZoomModal() {
    zoomedImage.src = mainImage.src;
    zoomedImage.alt = mainImage.alt;
    zoomModal.classList.add('active');
}

function decreaseQuantity() {
    let value = parseInt(quantityInput.value);
    if (value > 1) {
        quantityInput.value = value - 1;
    }
}

function increaseQuantity() {
    let value = parseInt(quantityInput.value);
    if (value < 10) {
        quantityInput.value = value + 1;
    }
}

function validateQuantity() {
    let value = parseInt(quantityInput.value);
    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    } else if (value > 10) {
        quantityInput.value = 10;
    }
}

function addToCart() {
    const quantity = parseInt(quantityInput.value);
    const productName = document.querySelector('.product-title').textContent;
    const price = parseFloat(document.querySelector('.current-price .price').textContent.replace(/[^0-9.]/g, ''));
    
    cartCount += quantity;
    updateCartCount();
    
    // Show cart modal
    cartModal.classList.add('active');
    
    // Update button text temporarily
    const originalText = addToCartBtn.innerHTML;
    addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added to Cart';
    addToCartBtn.style.backgroundColor = '#2ecc71';
    
    setTimeout(() => {
        addToCartBtn.innerHTML = originalText;
        addToCartBtn.style.backgroundColor = '';
    }, 2000);
    
    // In a real application, you would send this to your backend
    console.log(`Added ${quantity} x ${productName} to cart. Total: UGX ${price * quantity}`);
}

function toggleWishlist() {
    const productId = 'shell-13kg-001';
    
    if (wishlistItems.has(productId)) {
        wishlistItems.delete(productId);
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i> Add to Wishlist';
        wishlistBtn.classList.remove('active');
        showNotification('Removed from wishlist', 'info');
    } else {
        wishlistItems.add(productId);
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i> In Wishlist';
        wishlistBtn.classList.add('active');
        showNotification('Added to wishlist', 'success');
    }
}

function addToCompare() {
    const productId = 'shell-13kg-001';
    const productName = document.querySelector('.product-title').textContent;
    
    if (compareItems.has(productId)) {
        compareItems.delete(productId);
        showNotification('Removed from compare', 'info');
    } else {
        if (compareItems.size >= 4) {
            showNotification('You can compare up to 4 products', 'warning');
            return;
        }
        compareItems.add(productId);
        showNotification('Added to compare', 'success');
        updateCompareModal();
        compareModal.classList.add('active');
    }
}

function buyNow() {
    addToCart();
    // In a real application, you would redirect to checkout
    setTimeout(() => {
        window.location.href = '../cart/index.html';
    }, 1000);
}

function updateBundlePrice() {
    // Calculate bundle price
    let total = 0;
    let originalTotal = 0;
    
    bundleCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const priceText = checkbox.closest('.bundle-item-detail').querySelector('.item-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            total += price;
            originalTotal += price;
        }
    });
    
    // Apply discount for bundle
    const discount = 0.12; // 12% discount
    const discountedTotal = total * (1 - discount);
    const savings = total - discountedTotal;
    
    // Update display
    document.querySelector('.original-price').textContent = `UGX ${originalTotal.toLocaleString()}`;
    document.querySelector('.bundle-price').textContent = `UGX ${Math.round(discountedTotal).toLocaleString()}`;
    document.querySelector('.bundle-savings-amount strong').textContent = `UGX ${Math.round(savings).toLocaleString()}`;
}

function addBundleToCart() {
    const bundleItems = [];
    
    bundleCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const itemName = checkbox.closest('.bundle-checkbox').textContent.trim();
            const priceText = checkbox.closest('.bundle-item-detail').querySelector('.item-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            bundleItems.push({
                name: itemName,
                price: price
            });
        }
    });
    
    if (bundleItems.length === 0) {
        showNotification('Please select at least one item', 'warning');
        return;
    }
    
    cartCount += bundleItems.length;
    updateCartCount();
    
    // Show cart modal
    cartModal.classList.add('active');
    
    // Show notification
    showNotification('Bundle added to cart!', 'success');
    
    console.log('Bundle added to cart:', bundleItems);
}

function updateCompareModal() {
    const compareTable = document.querySelector('.compare-table');
    // In a real application, you would fetch compare data and populate the table
    compareTable.innerHTML = `
        <p>Comparison feature coming soon. Currently comparing ${compareItems.size} products.</p>
    `;
}

function clearCompare() {
    compareItems.clear();
    compareModal.classList.remove('active');
    showNotification('Compare list cleared', 'info');
}

function addComparedToCart() {
    // Add all compared items to cart
    cartCount += compareItems.size;
    updateCartCount();
    compareModal.classList.remove('active');
    cartModal.classList.add('active');
    showNotification('All compared items added to cart', 'success');
}

function switchTab(tabId) {
    // Update tab buttons
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabId) {
            btn.classList.add('active');
        }
    });
    
    // Update tab panes
    tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === tabId) {
            pane.classList.add('active');
        }
    });
    
    // Scroll to tab content
    document.querySelector('.product-details-tabs').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function filterReviews(filter) {
    const reviews = document.querySelectorAll('.review-card');
    
    reviews.forEach(review => {
        review.style.display = 'block';
        
        if (filter === '5 Star') {
            const stars = review.querySelectorAll('.review-stars .fas.fa-star').length;
            if (stars !== 5) review.style.display = 'none';
        } else if (filter === '4 Star') {
            const stars = review.querySelectorAll('.review-stars .fas.fa-star').length;
            if (stars !== 4) review.style.display = 'none';
        } else if (filter === 'With Photos') {
            const hasPhotos = review.querySelector('.review-photos img');
            if (!hasPhotos) review.style.display = 'none';
        } else if (filter === 'Verified Purchase') {
            const isVerified = review.querySelector('.verified-badge');
            if (!isVerified) review.style.display = 'none';
        }
    });
}

function updateRatingStars(rating) {
    reviewStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas', 'active');
        } else {
            star.classList.remove('fas', 'active');
            star.classList.add('far');
        }
    });
    
    // Update rating text
    const ratingText = document.querySelector('.rating-text');
    const texts = ['Click to rate', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];
    ratingText.textContent = texts[rating] || texts[0];
}

function highlightStars(rating) {
    reviewStars.forEach(star => {
        const starRating = parseInt(star.dataset.rating);
        if (starRating <= rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

function initializeFAQ() {
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
}

function updateCartCount() {
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#2ecc71' : type === 'warning' ? '#f39c12' : '#3498db'};
        color: white;
        padding: 15px 20px;
        border-radius: 6px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    // Add keyframe animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Ctrl + Alt + C: Add to cart
    if (e.ctrlKey && e.altKey && e.key === 'c') {
        e.preventDefault();
        addToCart();
    }
    
    // Ctrl + Alt + W: Toggle wishlist
    if (e.ctrlKey && e.altKey && e.key === 'w') {
        e.preventDefault();
        toggleWishlist();
    }
    
    // Ctrl + Alt + B: Buy now
    if (e.ctrlKey && e.altKey && e.key === 'b') {
        e.preventDefault();
        buyNow();
    }
});

// Add to cart from related products
document.querySelectorAll('.related-products .add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        
        cartCount++;
        updateCartCount();
        
        // Visual feedback
        const originalText = this.innerHTML;
        this.innerHTML = '<i class="fas fa-check"></i> Added';
        this.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = '';
        }, 2000);
        
        showNotification(`${productName} added to cart`, 'success');
    });
});

// Initialize bundle price on load
document.addEventListener('DOMContentLoaded', updateBundlePrice);