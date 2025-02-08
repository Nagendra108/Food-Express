// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const DELIVERY_FEE = 2.99;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    updateOrderSummary();
    setupPaymentMethodToggle();
    setupFormValidation();
});

// Update order summary
function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');

    // Clear existing items
    orderItems.innerHTML = '';

    // Add each item to the summary
    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'order-item d-flex justify-content-between align-items-center mb-3';
        itemElement.innerHTML = `
            <div>
                <h6 class="mb-0">${item.name}</h6>
                <small class="text-muted">${item.description}</small>
            </div>
            <div class="d-flex align-items-center">
                <span class="me-3">$${item.price.toFixed(2)}</span>
                <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        orderItems.appendChild(itemElement);
    });

    // Calculate and update totals
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const total = subtotal + DELIVERY_FEE;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    // Show empty cart message if no items
    if (cart.length === 0) {
        orderItems.innerHTML = '<p class="text-muted">Your cart is empty. Add some items from our <a href="menu.html">menu</a>.</p>';
    }
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateOrderSummary();
    showNotification('Item removed from cart');
}

// Setup payment method toggle
function setupPaymentMethodToggle() {
    const creditCardRadio = document.getElementById('creditCard');
    const cashOnDeliveryRadio = document.getElementById('cashOnDelivery');
    const creditCardForm = document.getElementById('creditCardForm');

    function toggleCreditCardForm() {
        creditCardForm.style.display = creditCardRadio.checked ? 'block' : 'none';
        const creditCardInputs = creditCardForm.querySelectorAll('input');
        creditCardInputs.forEach(input => {
            input.required = creditCardRadio.checked;
        });
    }

    creditCardRadio.addEventListener('change', toggleCreditCardForm);
    cashOnDeliveryRadio.addEventListener('change', toggleCreditCardForm);
}

// Setup form validation
function setupFormValidation() {
    // Card number validation
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})/g, '$1 ').trim();
        e.target.value = value.substring(0, 19);
    });

    // Expiry date validation
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        e.target.value = value.substring(0, 5);
    });

    // CVV validation
    const cvv = document.getElementById('cvv');
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
    });

    // Phone number validation
    const phone = document.getElementById('phone');
    phone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 6) {
            value = value.substring(0, 3) + '-' + value.substring(3, 6) + '-' + value.substring(6);
        } else if (value.length >= 3) {
            value = value.substring(0, 3) + '-' + value.substring(3);
        }
        e.target.value = value.substring(0, 12);
    });
}

// Place order
function placeOrder() {
    if (!validateOrder()) {
        return;
    }

    // Show loading state
    const orderButton = document.querySelector('button[onclick="placeOrder()"]');
    orderButton.disabled = true;
    orderButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';

    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show success message
        showNotification('Order placed successfully! You will receive a confirmation email shortly.');

        // Reset form
        document.getElementById('orderForm').reset();
        if (document.getElementById('creditCard').checked) {
            document.getElementById('creditCardForm').reset();
        }

        // Reset button
        orderButton.disabled = false;
        orderButton.textContent = 'Place Order';

        // Update order summary
        updateOrderSummary();

        // Redirect to confirmation page after a delay
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// Validate order
function validateOrder() {
    if (cart.length === 0) {
        showNotification('Please add items to your cart before placing an order', 'error');
        return false;
    }

    const form = document.getElementById('orderForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }

    if (document.getElementById('creditCard').checked) {
        const creditCardForm = document.getElementById('creditCardForm');
        if (!creditCardForm.checkValidity()) {
            creditCardForm.reportValidity();
            return false;
        }
    }

    return true;
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3`;
    notification.style.zIndex = '1000';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
