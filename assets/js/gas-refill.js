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

// DOM Elements
const refillBookingForm = document.getElementById('refillBookingForm');
const formSteps = document.querySelectorAll('.form-step');
const nextButtons = document.querySelectorAll('.btn-next');
const prevButtons = document.querySelectorAll('.btn-prev');
const gasTypeOptions = document.querySelectorAll('.gas-type-option');
const cylinderBrandSelect = document.getElementById('cylinderBrand');
const otherBrandContainer = document.getElementById('otherBrandContainer');
const otherBrandInput = document.getElementById('otherBrand');
const cylinderQuantity = document.getElementById('cylinderQuantity');
const quantityMinus = document.querySelector('.quantity-btn.minus');
const quantityPlus = document.querySelector('.quantity-btn.plus');
const sizeGroups = document.querySelectorAll('.size-group');
const sizeOptions = document.querySelectorAll('.size-option');
const deliveryDate = document.getElementById('deliveryDate');
const serviceTypeOptions = document.querySelectorAll('input[name="serviceType"]');
const paymentOptions = document.querySelectorAll('input[name="paymentMethod"]');
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
const modalClose = document.querySelectorAll('.modal-close');
const faqItems = document.querySelectorAll('.faq-item');

// Global Variables
let currentStep = 1;
let selectedGasType = 'lpg';
let selectedCylinderSize = null;
let selectedSizePrice = 0;
let totalAmount = 0;
let bookingData = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    updateOrderSummary();
    initializeFlatpickr();
    updateCalculator();
});

function initializePage() {
    // Set initial active step
    showStep(currentStep);
    
    // Set default values
    document.querySelector('.gas-type-option[data-type="lpg"]').classList.add('active');
    document.querySelector('.size-group[data-gas="lpg"]').classList.add('active');
    
     // Initialize brand grid
    initializeBrandGrid();

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
    document.querySelector('input[name="deliveryTime"][value="morning"]').checked = true;
    
    // Set default service type
    document.querySelector('input[name="serviceType"][value="pickup"]').checked = true;
    
    // Set default payment method
    document.querySelector('input[name="paymentMethod"][value="cash"]').checked = true;
    
    // Initialize FAQ
    initializeFAQ();
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
    
    // Brand selection
   /*  cylinderBrandSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherBrandContainer.style.display = 'block';
            otherBrandInput.required = true;
        } else {
            otherBrandContainer.style.display = 'none';
            otherBrandInput.required = false;
        }
    }); */

    const otherBrandInput = document.getElementById('otherBrand');
    if (otherBrandInput) {
        otherBrandInput.addEventListener('input', function() {
            if (this.value.trim()) {
                clearError(this);
            }
        });
    }
    
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
        // Size selection - UPDATE THIS
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            const size = this.dataset.size;
            const price = parseInt(this.dataset.price);
            
            // Get the radio button inside this option
            const radioButton = this.querySelector('input[type="radio"]');
            
            // Check the radio button
            if (radioButton) {
                radioButton.checked = true;
            }
            
            selectCylinderSize(size, price);
        });
    });
    
    // Service type change
    serviceTypeOptions.forEach(option => {
        option.addEventListener('change', updateOrderSummary);
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
    
    // Modal close buttons
    modalClose.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });
    
    // Print receipt
    printReceipt.addEventListener('click', function() {
        window.print();
    });
    
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
    const currentStepElement = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
    
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
            const cylinderBrand = document.getElementById('cylinderBrand');
            const selectedSize = document.querySelector('input[name="cylinderSize"]:checked');
            
            if (!cylinderBrand.value) {
                showError(cylinderBrand, 'Please select a cylinder brand');
                isValid = false;
            } else {
                clearError(cylinderBrand);
            }
            
            if (!selectedSize) {
                alert('Please select a cylinder size');
                isValid = false;
            }
            
            if (cylinderBrand.value === 'other' && !otherBrandInput.value.trim()) {
                showError(otherBrandInput, 'Please specify the brand name');
                isValid = false;
            } else if (cylinderBrand.value === 'other') {
                clearError(otherBrandInput);
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
    const formGroup = input.closest('.form-group') || input.closest('.selection-group');
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
    const formGroup = input.closest('.form-group') || input.closest('.selection-group');
    input.style.borderColor = '';
    
    const errorElement = formGroup.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}

function selectGasType(gasType) {
    selectedGasType = gasType;
    
    // Update UI
    gasTypeOptions.forEach(option => {
        option.classList.remove('active');
        if (option.dataset.type === gasType) {
            option.classList.add('active');
        }
    });
    
    // Show relevant size options
    sizeGroups.forEach(group => {
        group.classList.remove('active');
        if (group.dataset.gas === gasType) {
            group.classList.add('active');
        }
    });
    
    // Reset selected size - ADD THIS
    document.querySelectorAll('input[name="cylinderSize"]').forEach(radio => {
        radio.checked = false;
    });
    selectedCylinderSize = null;
    selectedSizePrice = 0;
    
    // Also unselect any active size option styling
    sizeOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    updateOrderSummary();
}

/*function selectCylinderSize(size, price) {
    selectedCylinderSize = size;
    selectedSizePrice = price;
    updateOrderSummary();
}*/

function selectCylinderSize(size, price) {
    selectedCylinderSize = size;
    selectedSizePrice = price;
    
    // Remove selected class from all size options
    sizeOptions.forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to the clicked option
    const clickedOption = document.querySelector(`.size-option[data-size="${size}"]`);
    if (clickedOption) {
        clickedOption.classList.add('selected');
    }
    
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
    document.getElementById('summaryGasType').textContent = `${gasType} ${sizeLabel}`;
    document.getElementById('summaryQuantity').textContent = `${quantity} cylinder${quantity > 1 ? 's' : ''}`;
    document.getElementById('summaryRefillFee').textContent = `UGX ${refillFee.toLocaleString()}`;
    document.getElementById('summaryServiceFee').textContent = `UGX ${serviceFee.toLocaleString()}`;
    document.getElementById('summaryTotal').textContent = `UGX ${totalAmount.toLocaleString()}`;
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
    calcTotal.textContent = `UGX ${total.toLocaleString()}`;
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
            brand: cylinderBrandSelect.value === 'other' ? otherBrandInput.value : cylinderBrandSelect.value,
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
    
    // Reset form after delay
    setTimeout(() => {
        // resetForm();
    }, 3000);
    
    // In a real application, you would send this data to your server
    console.log('Booking submitted:', bookingData);
    
    // For demo purposes, we'll log to console and show alert
    alert(`Booking submitted! Order ID: ${bookingData.orderId}\nWe'll contact you shortly.`);
}

function generateOrderId() {
    const prefix = 'RVG';
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${year}-${random}`;
}

function updateSuccessModal() {
    orderId.textContent = bookingData.orderId;
    orderService.textContent = `${getGasTypeName(bookingData.cylinder.gasType)} ${bookingData.cylinder.size.toUpperCase()} Refill`;
    orderTotal.textContent = `UGX ${bookingData.pricing.total.toLocaleString()}`;
    
    // Format delivery info
    const timeLabels = {
        'morning': 'Morning (8AM - 12PM)',
        'afternoon': 'Afternoon (12PM - 4PM)',
        'evening': 'Evening (4PM - 7PM)'
    };
    
    const date = new Date(bookingData.delivery.date);
    const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    orderDelivery.textContent = `${formattedDate} - ${timeLabels[bookingData.delivery.time]}`;
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
    totalAmount = 0;
    
    // Reset UI
    gasTypeOptions.forEach(option => option.classList.remove('active'));
    document.querySelector('.gas-type-option[data-type="lpg"]').classList.add('active');
    
    sizeGroups.forEach(group => group.classList.remove('active'));
    document.querySelector('.size-group[data-gas="lpg"]').classList.add('active');
    
    document.querySelectorAll('input[name="cylinderSize"]').forEach(radio => radio.checked = false);
    
    otherBrandContainer.style.display = 'none';
    otherBrandInput.required = false;
    
    cylinderQuantity.value = 1;

     // Reset brand selection
    const firstBrand = document.querySelector('.brand-option[data-value="shell"]');
    if (firstBrand) {
        firstBrand.click();
    }
    
    // Reset date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const formattedDate = tomorrow.toISOString().split('T')[0];
    deliveryDate.value = formattedDate;
    
    // Reset defaults
    document.querySelector('input[name="deliveryTime"][value="morning"]').checked = true;
    document.querySelector('input[name="serviceType"][value="pickup"]').checked = true;
    document.querySelector('input[name="paymentMethod"][value="cash"]').checked = true;
    
    // Update summary
    updateOrderSummary();
}

function toggleMobileMenu() {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
}

function initializeFlatpickr() {
    flatpickr('.datepicker', {
        minDate: 'today',
        dateFormat: 'Y-m-d',
        disable: [
            function(date) {
                return date.getDay() === 0; // Disable Sundays
            }
        ]
    });
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

// Initialize calculator with default values
function initializeCalculator() {
    calcSize.value = '13kg';
    calcQuantity.value = 1;
    updateCalculator();
}

// Add to cart functionality (for emergency refills)
function addToCart(item) {
    let cartItems = parseInt(cartCount.textContent) || 0;
    cartItems++;
    cartCount.textContent = cartItems;
    
    // Visual feedback
    const originalText = item.innerHTML;
    item.innerHTML = '<i class="fas fa-check"></i> Added';
    item.style.backgroundColor = '#2ecc71';
    
    setTimeout(() => {
        item.innerHTML = originalText;
        item.style.backgroundColor = '';
    }, 2000);
}

// Initialize calculator on page load
window.addEventListener('load', initializeCalculator);

// Brand data with logos (using Font Awesome icons)
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

// Initialize brand grid
function initializeBrandGrid() {
    const brandGrid = document.querySelector('.brand-grid-options');
    if (!brandGrid) return;
    
    brandGrid.innerHTML = '';
    
    brandData.forEach(brand => {
        const brandOption = document.createElement('div');
        brandOption.className = 'brand-option';
        brandOption.dataset.value = brand.id;
        
        brandOption.innerHTML = `
            <input type="radio" name="cylinderBrand" value="${brand.id}" id="brand_${brand.id}" style="display: none;">
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
        
        brandGrid.appendChild(brandOption);
    });
    
    // Select first brand by default
    setTimeout(() => {
        selectBrand('shell');
    }, 100);
}

function selectBrand(brandId) {
    // Update UI
    document.querySelectorAll('.brand-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`.brand-option[data-value="${brandId}"]`);
    if (selectedOption) {
        selectedOption.classList.add('selected');
        const radioInput = selectedOption.querySelector('input[type="radio"]');
        if (radioInput) {
            radioInput.checked = true;
        }
    }
    
    // Show/hide other brand input
    const otherBrandContainer = document.getElementById('otherBrandContainer');
    const otherBrandInput = document.getElementById('otherBrand');
    
    if (brandId === 'other') {
        otherBrandContainer.style.display = 'block';
        otherBrandInput.required = true;
    } else {
        otherBrandContainer.style.display = 'none';
        otherBrandInput.required = false;
    }
}

// Update getSelectedBrand function
function getSelectedBrand() {
    const selectedOption = document.querySelector('.brand-option.selected');
    if (selectedOption) {
        const brandId = selectedOption.dataset.value;
        if (brandId === 'other') {
            const otherBrandInput = document.getElementById('otherBrand');
            return otherBrandInput.value.trim() || 'other';
        }
        return brandId;
    }
    return '';
}

// Update validation for Step 2 to use the new brand selection
function validateStep(stepNumber) {
    let isValid = true;
    
    switch(stepNumber) {
        case 2:
            // Remove old validation for dropdown and use new method
            const selectedBrand = getSelectedBrand();
            
            if (!selectedBrand) {
                // Show error on brand grid
                const brandGrid = document.querySelector('.brand-grid-options');
                brandGrid.style.border = '2px solid var(--danger-color)';
                brandGrid.style.borderRadius = '8px';
                setTimeout(() => {
                    brandGrid.style.border = '';
                }, 2000);
                
                isValid = false;
            } else if (selectedBrand === 'other') {
                const otherBrandInput = document.getElementById('otherBrand');
                if (!otherBrandInput.value.trim()) {
                    showError(otherBrandInput, 'Please specify the brand name');
                    isValid = false;
                } else {
                    clearError(otherBrandInput);
                }
            }
            
            const selectedSize = document.querySelector('input[name="cylinderSize"]:checked');
            if (!selectedSize && !selectedCylinderSize) {
                alert('Please select a cylinder size');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

// Update submitBooking function to get brand value
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
            brand: getSelectedBrand(), // Updated to use new function
            size: selectedCylinderSize,
            quantity: parseInt(cylinderQuantity.value)
        },
        // ... rest of your code
    };
    
    // ... rest of your submitBooking function
}