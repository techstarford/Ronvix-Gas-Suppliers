// Price Data Structure
const refillingPrices = {
    lpg: {
        '3kg': 15000,
        '6kg': 25000,
        '13kg': 45000,
        '25kg': 85000,
        '50kg': 165000
    },
    oxygen: {
        '5L': 75000,
        '10L': 140000,
        '20L': 270000
    },
    industrial: {
        '10kg': 55000,
        '20kg': 105000,
        '40kg': 205000
    }
};

// Service fee for pickup service
const SERVICE_FEE = 5000;

// Brand data with logos and colors
const brandData = [
    { id: 'shell', name: 'Shell', icon: 'fas fa-gas-pump', color: '#ff0000' },
    { id: 'total', name: 'Total', icon: 'fas fa-gas-pump', color: '#0047ab' },
    { id: 'oryx', name: 'Oryx', icon: 'fas fa-fire', color: '#ff6600' },
    { id: 'stabex', name: 'Stabex', icon: 'fas fa-bolt', color: '#008000' },
    { id: 'hass', name: 'Hass', icon: 'fas fa-industry', color: '#800080' },
    { id: 'hashi', name: 'Hashi', icon: 'fas fa-fire-alt', color: '#ff4500' },
    { id: 'mogas', name: 'Mogas', icon: 'fas fa-oil-can', color: '#333333' },
    { id: 'meru', name: 'Meru', icon: 'fas fa-mountain', color: '#0066cc' },
    { id: 'other', name: 'Other', icon: 'fas fa-question-circle', color: '#666666' }
];

// DOM Elements
const refillBookingForm = document.getElementById('refillBookingForm');
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');
const gasTypeOptions = document.querySelectorAll('.gas-type-option');
const brandGridOptions = document.getElementById('brandGridOptions');
const otherBrandContainer = document.getElementById('otherBrandContainer');
const otherBrandInput = document.getElementById('otherBrand');
const cylinderQuantity = document.getElementById('cylinderQuantity');
const quantityMinus = document.querySelector('.quantity-btn.minus');
const quantityPlus = document.querySelector('.quantity-btn.plus');
const sizeGroups = document.querySelectorAll('.size-group');
const sizeOptions = document.querySelectorAll('.size-option');
const deliveryDate = document.getElementById('deliveryDate');
const serviceTypeOptions = document.querySelectorAll('.service-option');
const timeOptions = document.querySelectorAll('.time-option');
const paymentOptions = document.querySelectorAll('.payment-option');
const calcSize = document.getElementById('calcSize');
const calcQuantity = document.getElementById('calcQuantity');
const calcMinus = document.querySelector('.calc-btn.minus');
const calcPlus = document.querySelector('.calc-btn.plus');
const calcTotal = document.getElementById('calcTotal');
const successModal = document.getElementById('successModal');
const orderId = document.getElementById('orderId');
const orderService = document.getElementById('orderService');
const orderTotal = document.getElementById('orderTotal');
const orderDelivery = document.getElementById('orderDelivery');
const printReceipt = document.getElementById('printReceipt');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const cartCount = document.querySelector('.cart-count');
const modalClose = document.querySelector('.modal-close');
const faqItems = document.querySelectorAll('.faq-item');

// Summary elements
const summaryGasType = document.getElementById('summaryGasType');
const summaryQuantity = document.getElementById('summaryQuantity');
const summaryRefillFee = document.getElementById('summaryRefillFee');
const summaryServiceFee = document.getElementById('summaryServiceFee');
const summaryTotal = document.getElementById('summaryTotal');

// Global Variables
let currentStep = 1;
let selectedGasType = 'lpg';
let selectedCylinderSize = null;
let selectedSizePrice = 0;
let selectedBrand = null;
let totalAmount = 0;
let bookingData = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    initializeBrandGrid();
    updateOrderSummary();
    initializeFlatpickr();
    updateCalculator();
    initializeFAQ();
});

function initializePage() {
    // Set initial active step
    showStep(currentStep);
    
    // Set default values
    document.querySelector('.gas-type-option[data-type="lpg"]').classList.add('active');
    document.querySelector('.size-group[data-gas="lpg"]').classList.add('active');
    
    // Initialize date picker
    if (deliveryDate) {
        flatpickr(deliveryDate, {
            minDate: 'today',
            dateFormat: 'Y-m-d',
            disable: [
                function(date) {
                    // Disable Sundays
                    return date.getDay() === 0;
                }
            ]
        });
    }
    
    // Set default delivery date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    if (deliveryDate) {
        deliveryDate.value = formattedDate;
    }
    
    // Set default time to morning
    document.querySelector('.time-option').classList.add('active');
    
    // Set default service type
    document.querySelector('.service-option').classList.add('active');
    
    // Set default payment method
    document.querySelector('.payment-option').classList.add('active');
    
    // Select default size (13kg LPG)
    const defaultSizeOption = document.querySelector('.size-option[data-size="13kg"]');
    if (defaultSizeOption) {
        defaultSizeOption.click();
    }
}

function setupEventListeners() {
    // Navigation
    hamburger.addEventListener('click', toggleMobileMenu);
    
    // Form navigation
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateStep(currentStep)) {
                currentStep = nextStep;
                showStep(currentStep);
                updateOrderSummary();
            }
        });
    });
    
    prevButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            currentStep = prevStep;
            showStep(currentStep);
        });
    });
    
    // Gas type selection
    gasTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const gasType = this.dataset.type;
            selectGasType(gasType);
        });
    });
    
    // Quantity controls
    quantityMinus.addEventListener('click', function() {
        let value = parseInt(cylinderQuantity.value);
        if (value > 1) {
            cylinderQuantity.value = value - 1;
            updateOrderSummary();
        }
    });
    
    quantityPlus.addEventListener('click', function() {
        let value = parseInt(cylinderQuantity.value);
        if (value < 10) {
            cylinderQuantity.value = value + 1;
            updateOrderSummary();
        }
    });
    
    // Size selection
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all size options
            document.querySelectorAll('.size-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            const size = this.dataset.size;
            const price = parseInt(this.dataset.price);
            
            // Update the hidden radio button
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
            
            selectCylinderSize(size, price);
        });
    });
    
    // Service type selection
    serviceTypeOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.service-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
            
            updateOrderSummary();
        });
    });
    
    // Time selection
    timeOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.time-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
        });
    });
    
    // Payment method selection
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(opt => {
                opt.classList.remove('active');
            });
            this.classList.add('active');
            
            const radioButton = this.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
        });
    });
    
    // Calculator controls
    calcMinus.addEventListener('click', function() {
        let value = parseInt(calcQuantity.value);
        if (value > 1) {
            calcQuantity.value = value - 1;
            updateCalculator();
        }
    });
    
    calcPlus.addEventListener('click', function() {
        let value = parseInt(calcQuantity.value);
        if (value < 10) {
            calcQuantity.value = value + 1;
            updateCalculator();
        }
    });
    
    calcSize.addEventListener('change', updateCalculator);
    calcQuantity.addEventListener('input', updateCalculator);
    
    // Form submission
    refillBookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateStep(3)) {
            submitBooking();
        }
    });
    
    // Modal close
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            successModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    // Print receipt
    if (printReceipt) {
        printReceipt.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Footer calculator links
    document.querySelectorAll('[data-calc-size]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const size = this.getAttribute('data-calc-size');
            const option = Array.from(calcSize.options).find(opt => opt.value === size);
            if (option) {
                calcSize.value = size;
                updateCalculator();
                // Scroll to calculator
                document.querySelector('.calculator').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Other brand input validation
    if (otherBrandInput) {
        otherBrandInput.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(this);
            }
        });
    }
    
    // Emergency button
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'tel:0788971271';
        });
    }
}

function showStep(stepNumber) {
    formSteps.forEach(step => {
        step.classList.remove('active');
    });
    
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
        
        // Scroll to top of form
        currentStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function validateStep(stepNumber) {
    let isValid = true;
    
    switch(stepNumber) {
        case 1:
            const customerName = document.getElementById('customerName');
            const customerPhone = document.getElementById('customerPhone');
            const customerAddress = document.getElementById('customerAddress');
            
            if (!customerName.value.trim()) {
                showError(customerName, 'Name is required');
                isValid = false;
            } else {
                clearError(customerName);
            }
            
            if (!customerPhone.value.trim()) {
                showError(customerPhone, 'Phone number is required');
                isValid = false;
            } else if (!/^[0-9]{10}$/.test(customerPhone.value.replace(/\s/g, ''))) {
                showError(customerPhone, 'Please enter a valid 10-digit phone number');
                isValid = false;
            } else {
                clearError(customerPhone);
            }
            
            if (!customerAddress.value.trim()) {
                showError(customerAddress, 'Address is required');
                isValid = false;
            } else {
                clearError(customerAddress);
            }
            break;
            
        case 2:
            // Check if brand is selected
            if (!selectedBrand) {
                alert('Please select a cylinder brand');
                isValid = false;
            } else if (selectedBrand === 'other') {
                if (!otherBrandInput.value.trim()) {
                    showError(otherBrandInput, 'Please specify the brand name');
                    isValid = false;
                } else {
                    clearError(otherBrandInput);
                }
            }
            
            // Check if size is selected
            const selectedSize = document.querySelector('input[name="cylinderSize"]:checked');
            if (!selectedSize && !selectedCylinderSize) {
                alert('Please select a cylinder size');
                isValid = false;
            }
            break;
            
        case 3:
            const deliveryTime = document.querySelector('input[name="deliveryTime"]:checked');
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
            
            if (!deliveryDate.value) {
                showError(deliveryDate, 'Please select a delivery date');
                isValid = false;
            } else {
                clearError(deliveryDate);
            }
            
            if (!deliveryTime) {
                alert('Please select a delivery time');
                isValid = false;
            }
            
            if (!paymentMethod) {
                alert('Please select a payment method');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function showError(input, message) {
    const formGroup = input.closest('.form-group') || input.closest('.selection-group') || input.closest('.other-brand-container');
    input.style.borderColor = 'var(--danger-color)';
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
}

function clearError(input) {
    const formGroup = input.closest('.form-group') || input.closest('.selection-group') || input.closest('.other-brand-container');
    input.style.borderColor = '';
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function selectGasType(gasType) {
    selectedGasType = gasType;
    
    // Update UI
    gasTypeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.type === gasType) {
            option.classList.add('active');
            
            // Update hidden radio button
            const radioButton = option.querySelector('input[type="radio"]');
            if (radioButton) {
                radioButton.checked = true;
            }
        }
    });
    
    // Show relevant size options
    sizeGroups.forEach(group => {
        group.classList.remove('active');
        if (group.dataset.gas === gasType) {
            group.classList.add('active');
        }
    });
    
    // Reset selected size
    document.querySelectorAll('.size-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    document.querySelectorAll('input[name="cylinderSize"]').forEach(radio => {
        radio.checked = false;
    });
    
    selectedCylinderSize = null;
    selectedSizePrice = 0;
    
    updateOrderSummary();
}

function initializeBrandGrid() {
    if (!brandGridOptions) return;
    
    brandGridOptions.innerHTML = '';
    
    brandData.forEach(brand => {
        const brandOption = document.createElement('div');
        brandOption.className = 'brand-option';
        brandOption.dataset.value = brand.id;
        
        brandOption.innerHTML = `
            <input type="radio" name="cylinderBrand" value="${brand.id}" style="display: none;">
            <div class="brand-option-content">
                <div class="brand-icon" style="color: ${brand.color}">
                    <i class="${brand.icon}"></i>
                </div>
                <span class="brand-name">${brand.name}</span>
            </div>
        `;
        
        brandOption.addEventListener('click', function() {
            selectBrand(brand.id);
        });
        
        brandGridOptions.appendChild(brandOption);
    });
    
    // Select first brand by default
    selectBrand('shell');
}

function selectBrand(brandId) {
    // Remove selected class from all brand options
    document.querySelectorAll('.brand-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`.brand-option[data-value="${brandId}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const radioInput = selectedOption.querySelector('input[type="radio"]');
        if (radioInput) {
            radioInput.checked = true;
        }
    }
    
    selectedBrand = brandId;
    
    // Show/hide other brand input
    if (brandId === 'other') {
        otherBrandContainer.style.display = 'block';
        otherBrandInput.required = true;
    } else {
        otherBrandContainer.style.display = 'none';
        otherBrandInput.required = false;
        clearError(otherBrandInput);
    }
}

function selectCylinderSize(size, price) {
    selectedCylinderSize = size;
    selectedSizePrice = price;
    updateOrderSummary();
}

function updateOrderSummary() {
    if (!selectedCylinderSize || !selectedSizePrice) return;
    
    const quantity = parseInt(cylinderQuantity.value);
    const serviceType = document.querySelector('input[name="serviceType"]:checked').value;
    const gasType = getGasTypeName(selectedGasType);
    const sizeLabel = selectedCylinderSize.toUpperCase();
    
    // Calculate amounts
    const refillFee = selectedSizePrice * quantity;
    const serviceFee = serviceType === 'pickup' ? SERVICE_FEE : 0;
    totalAmount = refillFee + serviceFee;
    
    // Update summary elements
    if (summaryGasType) summaryGasType.textContent = `${gasType} ${sizeLabel}`;
    if (summaryQuantity) summaryQuantity.textContent = `${quantity} cylinder${quantity > 1 ? 's' : ''}`;
    if (summaryRefillFee) summaryRefillFee.textContent = `UGX ${refillFee.toLocaleString()}`;
    if (summaryServiceFee) summaryServiceFee.textContent = `UGX ${serviceFee.toLocaleString()}`;
    if (summaryTotal) summaryTotal.textContent = `UGX ${totalAmount.toLocaleString()}`;
}

function getGasTypeName(gasType) {
    const names = {
        'lpg': 'LPG',
        'oxygen': 'Oxygen',
        'industrial': 'Industrial Gas'
    };
    return names[gasType] || gasType;
}

function updateCalculator() {
    const size = calcSize.value;
    const quantity = parseInt(calcQuantity.value);
    
    // Find price based on size
    let price = 0;
    for (const gasType in refillingPrices) {
        if (refillingPrices[gasType][size]) {
            price = refillingPrices[gasType][size];
            break;
        }
    }
    
    const total = price * quantity;
    if (calcTotal) calcTotal.textContent = `UGX ${total.toLocaleString()}`;
}

function submitBooking() {
    // Collect form data
    bookingData = {
        customer: {
            name: document.getElementById('customerName').value,
            phone: document.getElementById('customerPhone').value,
            email: document.getElementById('customerEmail').value,
            address: document.getElementById('customerAddress').value,
            instructions: document.getElementById('deliveryInstructions').value
        },
        cylinder: {
            gasType: selectedGasType,
            brand: selectedBrand === 'other' ? otherBrandInput.value : selectedBrand,
            size: selectedCylinderSize,
            quantity: parseInt(cylinderQuantity.value)
        },
        delivery: {
            date: deliveryDate.value,
            time: document.querySelector('input[name="deliveryTime"]:checked').value,
            serviceType: document.querySelector('input[name="serviceType"]:checked').value
        },
        payment: {
            method: document.querySelector('input[name="paymentMethod"]:checked').value
        },
        pricing: {
            refillFee: selectedSizePrice * parseInt(cylinderQuantity.value),
            serviceFee: document.querySelector('input[name="serviceType"]:checked').value === 'pickup' ? SERVICE_FEE : 0,
            total: totalAmount
        },
        orderId: generateOrderId(),
        timestamp: new Date().toISOString()
    };
    
    // Update success modal
    updateSuccessModal();
    
    // Show success modal
    successModal.classList.add('active');
    
    // Reset form after 5 seconds
    setTimeout(() => {
        resetForm();
    }, 5000);
    
    // In a real application, you would send this data to your server
    console.log('Booking submitted:', bookingData);
}

function generateOrderId() {
    const prefix = 'RVG';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
}

function updateSuccessModal() {
    if (orderId) orderId.textContent = bookingData.orderId;
    if (orderService) orderService.textContent = `${getGasTypeName(bookingData.cylinder.gasType)} ${bookingData.cylinder.size.toUpperCase()} Refill`;
    if (orderTotal) orderTotal.textContent = `UGX ${bookingData.pricing.total.toLocaleString()}`;
    
    // Format delivery info
    const timeLabels = {
        'morning': 'Morning (8AM - 12PM)',
        'afternoon': 'Afternoon (12PM - 4PM)',
        'evening': 'Evening (4PM - 7PM)'
    };
    
    const date = new Date(bookingData.delivery.date);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    if (orderDelivery) orderDelivery.textContent = `${formattedDate} - ${timeLabels[bookingData.delivery.time]}`;
}

function resetForm() {
    // Reset form to step 1
    currentStep = 1;
    showStep(currentStep);
    
    // Reset form values
    refillBookingForm.reset();
    
    // Reset custom selections
    selectedGasType = 'lpg';
    selectedCylinderSize = null;
    selectedSizePrice = 0;
    selectedBrand = null;
    totalAmount = 0;
    
    // Reset UI
    gasTypeOptions.forEach(option => option.classList.remove('active'));
    document.querySelector('.gas-type-option[data-type="lpg"]').classList.add('active');
    
    sizeGroups.forEach(group => group.classList.remove('active'));
    document.querySelector('.size-group[data-gas="lpg"]').classList.add('active');
    
    document.querySelectorAll('.size-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    document.querySelectorAll('input[name="cylinderSize"]').forEach(radio => radio.checked = false);
    
    // Reset brand selection
    selectBrand('shell');
    
    cylinderQuantity.value = 1;
    
    // Reset date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    if (deliveryDate) {
        deliveryDate.value = formattedDate;
    }
    
    // Reset defaults
    document.querySelectorAll('.time-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('.time-option').classList.add('active');
    
    document.querySelectorAll('.service-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('.service-option').classList.add('active');
    
    document.querySelectorAll('.payment-option').forEach(opt => opt.classList.remove('active'));
    document.querySelector('.payment-option').classList.add('active');
    
    // Select default size (13kg LPG)
    const defaultSizeOption = document.querySelector('.size-option[data-size="13kg"]');
    if (defaultSizeOption) {
        defaultSizeOption.click();
    }
    
    // Update summary
    updateOrderSummary();
    
    // Hide success modal
    successModal.classList.remove('active');
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function initializeFlatpickr() {
    if (typeof flatpickr !== 'undefined' && deliveryDate) {
        flatpickr(deliveryDate, {
            minDate: 'today',
            dateFormat: 'Y-m-d',
            disable: [
                function(date) {
                    return date.getDay() === 0; // Disable Sundays
                }
            ]
        });
    }
}

function initializeFAQ() {
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// Add to cart functionality
function addToCart(item) {
    let cartItems = parseInt(cartCount.textContent) || 0;
    cartItems++;
    cartCount.textContent = cartItems;
    
    // Update mobile cart count
    const mobileCartCount = document.querySelector('.mobile-nav-item.cart-icon .cart-count');
    if (mobileCartCount) {
        mobileCartCount.textContent = cartItems;
    }
    
    // Visual feedback
    if (item) {
        const originalText = item.innerHTML;
        item.innerHTML = '<i class="fas fa-check"></i> Added';
        item.style.backgroundColor = '#2ecc71';
        
        setTimeout(() => {
            item.innerHTML = originalText;
            item.style.backgroundColor = '';
        }, 2000);
    }
}

// Initialize calculator with default values
function initializeCalculator() {
    if (calcSize && calcQuantity) {
        calcSize.value = '13kg';
        calcQuantity.value = 1;
        updateCalculator();
    }
}

// Initialize calculator on page load
window.addEventListener('load', initializeCalculator);

// Handle window resize for responsive adjustments
window.addEventListener('resize', function() {
    // You can add responsive adjustments here if needed
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const isClickInsideNav = navLinks.contains(event.target) || hamburger.contains(event.target);
    if (!isClickInsideNav && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Handle escape key to close modal
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && successModal.classList.contains('active')) {
        successModal.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});