/**
 * Gas Refill Page JavaScript
 * Depends on global functions from index.js (cart, auth, etc.)
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ensure cart and auth are updated from global
    if (typeof updateCartCount === 'function') updateCartCount();
    if (typeof updateAuthUI === 'function') updateAuthUI();

    // Price data (only LPG)
    const refillingPrices = {
        lpg: {
            '3kg': 15000,
            '6kg': 25000,
            '13kg': 45000,
            '25kg': 85000,
            '50kg': 165000
        }
    };
    const SERVICE_FEE = 5000;

    // Brand data
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
    const brandGridOptions = document.getElementById('brandGridOptions');
    const otherBrandContainer = document.getElementById('otherBrandContainer');
    const otherBrandInput = document.getElementById('otherBrand');
    const cylinderQuantity = document.getElementById('cylinderQuantity');
    const quantityMinus = document.querySelector('.quantity-btn.minus');
    const quantityPlus = document.querySelector('.quantity-btn.plus');
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
    const modalClose = document.querySelectorAll('.modal-close');
    const faqItems = document.querySelectorAll('.faq-item');

    // Summary elements
    const summaryGasType = document.getElementById('summaryGasType');
    const summaryQuantity = document.getElementById('summaryQuantity');
    const summaryRefillFee = document.getElementById('summaryRefillFee');
    const summaryServiceFee = document.getElementById('summaryServiceFee');
    const summaryTotal = document.getElementById('summaryTotal');

    // State
    let currentStep = 1;
    let selectedCylinderSize = null;
    let selectedSizePrice = 0;
    let selectedBrand = null;
    let totalAmount = 0;
    let bookingData = {};

    // Initialize
    function init() {
        showStep(currentStep);
        initializeBrandGrid();
        initializeFlatpickr();
        updateCalculator();
        initializeFAQ();

        // Set default size (13kg)
        const defaultSize = document.querySelector('.size-option[data-size="13kg"]');
        if (defaultSize) defaultSize.click();

        // Set default date to tomorrow
        if (deliveryDate) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            deliveryDate.value = tomorrow.toISOString().split('T')[0];
        }
    }

    // Step navigation
    function showStep(stepNumber) {
        formSteps.forEach(step => step.classList.remove('active'));
        const stepEl = document.querySelector(`.form-step[data-step="${stepNumber}"]`);
        if (stepEl) {
            stepEl.classList.add('active');
            stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // Validation
    function validateStep(stepNumber) {
        let isValid = true;
        switch(stepNumber) {
            case 1:
                const name = document.getElementById('customerName');
                const phone = document.getElementById('customerPhone');
                const address = document.getElementById('customerAddress');
                if (!name.value.trim()) { showError(name, 'Name is required'); isValid = false; }
                else clearError(name);
                if (!phone.value.trim()) { showError(phone, 'Phone is required'); isValid = false; }
                else if (!/^[0-9]{10}$/.test(phone.value.replace(/\s/g, ''))) { showError(phone, 'Enter a valid 10-digit number'); isValid = false; }
                else clearError(phone);
                if (!address.value.trim()) { showError(address, 'Address is required'); isValid = false; }
                else clearError(address);
                break;
            case 2:
                if (!selectedBrand) { alert('Please select a cylinder brand'); isValid = false; }
                else if (selectedBrand === 'other' && !otherBrandInput.value.trim()) { showError(otherBrandInput, 'Specify brand name'); isValid = false; }
                else clearError(otherBrandInput);
                if (!selectedCylinderSize) { alert('Please select a cylinder size'); isValid = false; }
                break;
            case 3:
                if (!deliveryDate.value) { showError(deliveryDate, 'Select a date'); isValid = false; }
                else clearError(deliveryDate);
                if (!document.querySelector('input[name="deliveryTime"]:checked')) { alert('Select delivery time'); isValid = false; }
                if (!document.querySelector('input[name="paymentMethod"]:checked')) { alert('Select payment method'); isValid = false; }
                break;
        }
        return isValid;
    }

    function showError(input, msg) {
        const group = input.closest('.form-group') || input.closest('.selection-group') || input.closest('.other-brand-container');
        input.style.borderColor = 'var(--danger-color)';
        let err = group.querySelector('.error-message');
        if (!err) {
            err = document.createElement('div');
            err.className = 'error-message';
            group.appendChild(err);
        }
        err.textContent = msg;
    }

    function clearError(input) {
        input.style.borderColor = '';
        const group = input.closest('.form-group') || input.closest('.selection-group') || input.closest('.other-brand-container');
        const err = group.querySelector('.error-message');
        if (err) err.textContent = '';
    }

    // Brand grid
    function initializeBrandGrid() {
        if (!brandGridOptions) return;
        brandGridOptions.innerHTML = '';
        brandData.forEach(brand => {
            const opt = document.createElement('div');
            opt.className = 'brand-option';
            opt.dataset.value = brand.id;
            opt.innerHTML = `
                <input type="radio" name="cylinderBrand" value="${brand.id}" style="display:none;">
                <div class="brand-option-content">
                    <div class="brand-icon" style="color: ${brand.color}"><i class="${brand.icon}"></i></div>
                    <span class="brand-name">${brand.name}</span>
                </div>
            `;
            opt.addEventListener('click', () => selectBrand(brand.id));
            brandGridOptions.appendChild(opt);
        });
        // Default select first brand
        selectBrand('shell');
    }

    function selectBrand(brandId) {
        document.querySelectorAll('.brand-option').forEach(opt => opt.classList.remove('selected'));
        const selected = document.querySelector(`.brand-option[data-value="${brandId}"]`);
        if (selected) {
            selected.classList.add('selected');
            selected.querySelector('input[type="radio"]').checked = true;
        }
        selectedBrand = brandId;
        if (brandId === 'other') {
            otherBrandContainer.style.display = 'block';
            otherBrandInput.required = true;
        } else {
            otherBrandContainer.style.display = 'none';
            otherBrandInput.required = false;
            clearError(otherBrandInput);
        }
    }

    // Size selection
    sizeOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            const radio = this.querySelector('input[type="radio"]');
            if (radio) radio.checked = true;
            selectedCylinderSize = this.dataset.size;
            selectedSizePrice = parseInt(this.dataset.price);
            updateOrderSummary();
        });
    });

    // Quantity controls
    quantityMinus?.addEventListener('click', () => {
        let val = parseInt(cylinderQuantity.value);
        if (val > 1) {
            cylinderQuantity.value = val - 1;
            updateOrderSummary();
        }
    });
    quantityPlus?.addEventListener('click', () => {
        let val = parseInt(cylinderQuantity.value);
        if (val < 10) {
            cylinderQuantity.value = val + 1;
            updateOrderSummary();
        }
    });

    // Service type change
    serviceTypeOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            serviceTypeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input[type="radio"]').checked = true;
            updateOrderSummary();
        });
    });

    // Time & payment selections
    timeOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            timeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });
    paymentOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input[type="radio"]').checked = true;
        });
    });

    // Update order summary
    function updateOrderSummary() {
        if (!selectedCylinderSize || !selectedSizePrice) return;
        const qty = parseInt(cylinderQuantity.value);
        const service = document.querySelector('input[name="serviceType"]:checked')?.value || 'pickup';
        const refillFee = selectedSizePrice * qty;
        const serviceFee = service === 'pickup' ? SERVICE_FEE : 0;
        totalAmount = refillFee + serviceFee;

        if (summaryGasType) summaryGasType.textContent = `LPG ${selectedCylinderSize}`;
        if (summaryQuantity) summaryQuantity.textContent = `${qty} cylinder${qty>1?'s':''}`;
        if (summaryRefillFee) summaryRefillFee.textContent = `UGX ${refillFee.toLocaleString()}`;
        if (summaryServiceFee) summaryServiceFee.textContent = `UGX ${serviceFee.toLocaleString()}`;
        if (summaryTotal) summaryTotal.textContent = `UGX ${totalAmount.toLocaleString()}`;
    }

    // Calculator
    function updateCalculator() {
        const size = calcSize.value;
        const qty = parseInt(calcQuantity.value) || 1;
        const price = refillingPrices.lpg[size] || 0;
        calcTotal.textContent = `UGX ${(price * qty).toLocaleString()}`;
    }
    calcSize?.addEventListener('change', updateCalculator);
    calcQuantity?.addEventListener('input', updateCalculator);
    calcMinus?.addEventListener('click', () => {
        let val = parseInt(calcQuantity.value);
        if (val > 1) {
            calcQuantity.value = val - 1;
            updateCalculator();
        }
    });
    calcPlus?.addEventListener('click', () => {
        let val = parseInt(calcQuantity.value);
        if (val < 10) {
            calcQuantity.value = val + 1;
            updateCalculator();
        }
    });

    // Form navigation
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const next = parseInt(this.dataset.next);
            if (validateStep(currentStep)) {
                currentStep = next;
                showStep(currentStep);
                updateOrderSummary();
            }
        });
    });
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prev = parseInt(this.dataset.prev);
            currentStep = prev;
            showStep(currentStep);
        });
    });

    // Submit booking
    refillBookingForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        if (!validateStep(3)) return;

        bookingData = {
            customer: {
                name: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                email: document.getElementById('customerEmail').value,
                address: document.getElementById('customerAddress').value,
                instructions: document.getElementById('deliveryInstructions').value
            },
            cylinder: {
                gasType: 'lpg',
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

        updateSuccessModal();
        successModal.classList.add('active');
        console.log('Booking:', bookingData);
        setTimeout(() => resetForm(), 5000);
    });

    function generateOrderId() {
        return `RVG-${new Date().getFullYear()}-${Math.floor(Math.random()*10000).toString().padStart(4,'0')}`;
    }

    function updateSuccessModal() {
        if (orderId) orderId.textContent = bookingData.orderId;
        if (orderService) orderService.textContent = `LPG ${bookingData.cylinder.size.toUpperCase()} Refill`;
        if (orderTotal) orderTotal.textContent = `UGX ${bookingData.pricing.total.toLocaleString()}`;
        if (orderDelivery) {
            const timeLabels = { morning:'Morning (8-12)', afternoon:'Afternoon (12-4)', evening:'Evening (4-7)' };
            orderDelivery.textContent = `${bookingData.delivery.date} - ${timeLabels[bookingData.delivery.time]}`;
        }
    }

    function resetForm() {
        refillBookingForm.reset();
        currentStep = 1;
        showStep(currentStep);
        selectedBrand = null;
        selectBrand('shell');
        selectedCylinderSize = null;
        selectedSizePrice = 0;
        cylinderQuantity.value = 1;
        document.querySelectorAll('.size-option').forEach(o => o.classList.remove('selected'));
        document.querySelector('.size-option[data-size="13kg"]')?.click();
        document.querySelectorAll('.service-option').forEach(o => o.classList.remove('active'));
        document.querySelector('.service-option[data-service="pickup"]')?.classList.add('active');
        document.querySelector('input[name="serviceType"][value="pickup"]').checked = true;
        document.querySelectorAll('.time-option').forEach(o => o.classList.remove('active'));
        document.querySelector('.time-option[data-time="morning"]')?.classList.add('active');
        document.querySelector('input[name="deliveryTime"][value="morning"]').checked = true;
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
        document.querySelector('.payment-option[data-payment="cash"]')?.classList.add('active');
        document.querySelector('input[name="paymentMethod"][value="cash"]').checked = true;
        updateOrderSummary();
        successModal.classList.remove('active');
    }

    // Flatpickr
    function initializeFlatpickr() {
        if (typeof flatpickr !== 'undefined' && deliveryDate) {
            flatpickr(deliveryDate, {
                minDate: 'today',
                dateFormat: 'Y-m-d',
                disable: [function(date) { return date.getDay() === 0; }]
            });
        }
    }

    // FAQ accordion
    function initializeFAQ() {
        faqItems.forEach(item => {
            const q = item.querySelector('.faq-question');
            q?.addEventListener('click', () => {
                faqItems.forEach(i => { if (i !== item) i.classList.remove('active'); });
                item.classList.toggle('active');
            });
        });
    }

    // Close modals
    modalClose.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.classList.remove('active');
        });
    });
    window.addEventListener('click', e => {
        if (e.target.classList.contains('modal')) e.target.classList.remove('active');
    });

    // Print receipt
    printReceipt?.addEventListener('click', () => window.print());

    // Start
    init();
});