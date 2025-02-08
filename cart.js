// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to show notification
function showNotification(message) {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div>
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
        <button class="close-btn">
            <i class="fas fa-times"></i>
        </button>
    `;

    // Add notification to body
    document.body.appendChild(notification);

    // Add click event to close button
    const closeBtn = notification.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        notification.classList.add('hide');
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.add('hide');
            setTimeout(() => notification.remove(), 300);
        }
    }, 3000);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = cart.length;
        cartCount.style.display = cart.length === 0 ? 'none' : 'block';
    }
}

// Function to update cart preview
function updateCartPreview() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item mb-3">
            <div class="d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-0">${item.name}</h6>
                    <small class="text-muted">$${item.price.toFixed(2)}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `).join('');
    
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Show empty cart message if no items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
    }
}

// Function to remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPreview();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Function to toggle cart visibility
function toggleCart() {
    const cartPreview = document.querySelector('.cart-preview');
    if (cartPreview.style.transform === 'translateX(0%)') {
        cartPreview.style.transform = 'translateX(100%)';
    } else {
        updateCartPreview(); // Update cart contents before showing
        cartPreview.style.transform = 'translateX(0%)';
    }
}

// Initialize cart functionality
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateCartPreview();

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cartPreview = document.querySelector('.cart-preview');
        const cartButton = document.getElementById('cartButton');
        
        if (!cartPreview.contains(e.target) && !cartButton.contains(e.target)) {
            cartPreview.style.transform = 'translateX(100%)';
        }
    });
});
