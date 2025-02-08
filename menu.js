// Menu categories and items data
const menuData = {
    categories: ['All', 'Burgers', 'Pizza', 'Pasta', 'Salads', 'Desserts', 'Beverages'],
    items: [
        {
            name: 'Classic Burger',
            category: 'Burgers',
            description: 'Juicy beef patty with fresh vegetables',
            price: 12.99,
            image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80'
        },
        {
            name: 'Margherita Pizza',
            category: 'Pizza',
            description: 'Fresh tomatoes, mozzarella, and basil',
            price: 14.99,
            image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80'
        },
        {
            name: 'Chicken Pasta',
            category: 'Pasta',
            description: 'Creamy pasta with grilled chicken',
            price: 13.99,
            image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80'
        },
        {
            name: 'Caesar Salad',
            category: 'Salads',
            description: 'Fresh romaine lettuce with Caesar dressing',
            price: 9.99,
            image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80'
        },
        {
            name: 'Chocolate Cake',
            category: 'Desserts',
            description: 'Rich chocolate cake with ganache',
            price: 7.99,
            image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80'
        },
        {
            name: 'Iced Coffee',
            category: 'Beverages',
            description: 'Cold brewed coffee with milk',
            price: 4.99,
            image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80'
        }
    ]
};

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to create category buttons
function createCategoryButtons() {
    const categoryButtons = document.getElementById('categoryButtons');
    menuData.categories.forEach(category => {
        const button = document.createElement('button');
        button.className = 'btn btn-outline-primary me-2 mb-2';
        button.textContent = category;
        button.addEventListener('click', () => filterMenuItems(category));
        categoryButtons.appendChild(button);
    });
}

// Function to create menu item card
function createMenuItemCard(item) {
    return `
        <div class="col-md-4 menu-item" data-category="${item.category}">
            <div class="card dish-card">
                <img src="${item.image}" class="card-img-top dish-img" alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-text">${item.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">$${item.price.toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${JSON.stringify(item)})">
                            <i class="fas fa-cart-plus me-2"></i>Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to filter menu items by category
function filterMenuItems(category) {
    const menuItems = document.getElementById('menuItems');
    const items = category === 'All' 
        ? menuData.items 
        : menuData.items.filter(item => item.category === category);
    
    menuItems.innerHTML = items.map(item => createMenuItemCard(item)).join('');
}

// Function to add item to cart
function addToCart(item) {
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartPreview();
    updateCartCount();
    showNotification(`${item.name} added to cart!`);
}

// Function to update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;
    
    // Show/hide the badge based on cart items
    if (cart.length === 0) {
        cartCount.style.display = 'none';
    } else {
        cartCount.style.display = 'block';
    }
}

// Function to update cart preview
function updateCartPreview() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = cart.map((item, index) => `
        <div class="cart-item mb-2">
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
        cartItems.innerHTML = '<p class="text-muted">Your cart is empty</p>';
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

// Function to show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
    notification.style.zIndex = '1000';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    createCategoryButtons();
    filterMenuItems('All');
    updateCartPreview();
    updateCartCount();

    // Search functionality
    const searchInput = document.getElementById('searchMenu');
    const searchButton = document.getElementById('searchButton');

    function searchMenuItems() {
        const searchTerm = searchInput.value.toLowerCase();
        const menuItems = document.getElementById('menuItems');
        const filteredItems = menuData.items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) || 
            item.description.toLowerCase().includes(searchTerm)
        );
        menuItems.innerHTML = filteredItems.map(item => createMenuItemCard(item)).join('');
    }

    searchButton.addEventListener('click', searchMenuItems);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') searchMenuItems();
    });

    // Close cart when clicking outside
    document.addEventListener('click', function(e) {
        const cartPreview = document.querySelector('.cart-preview');
        const cartButton = document.getElementById('cartButton');
        
        if (!cartPreview.contains(e.target) && !cartButton.contains(e.target)) {
            cartPreview.style.transform = 'translateX(100%)';
        }
    });
});
