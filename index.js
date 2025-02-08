// 1. Ways to print in JavaScript
// console.log("Hello World"); 
// alert("Hello World");
// document.write("this is document write");

// 2. JavaScript Console API(Application Programming Interface)
// console.log("Hello World", 4 + 6, "Another Log");
// console.warn("This is warning");
// console.error("This is an error");

// 3. JavaScript Variables
// What is Variables? - Container to store data values
var number1 = 36;
var number2 = 26;
// console.log(number1 + number2);
// console.log("Congratulations !!!");

// 4. Number Types in JavaScript
// Numbers

var num1 = 460;
var num2 = 364.40;

// Objects
var marks = {
    Dinesh: 34,
    Mukesh: 67,
    Diksha: 72.5
}
// console.log(marks);

// Booleans variables and values
var a = true;
var b = false;
// console.log(a, b);

var und;
// console.log(und);

var n = null;
// console.log(n);

/*
Very High level, There are 2 types of Data Types in JavaScript
1. Primitive Data Types : undefined, string, boolean, symbol, null, number
2. Reference Data Types : Arrays and Objects

*/

var arr = [1, "NK", 3, true, 5];

// // Operators in JavaScripts

// Arithmatic Operators
var a = 53;
var b = 34;
// console.log("The Value of a + b is : ", a+b);
// console.log("The Value of a - b is : ", a-b);
// console.log("The Value of a * b is : ", a*b);
// console.log("The Value of a / b is : ", a/b);

// Assignment Operators
var c = a;
c += 2;
// c -= 2;
// c *= 2;
// c /= 2;
// console.log(c);

// Comparison Operators
var x = 36;
var y = 20;
// console.log(x == y);
// console.log(x >= y);
// console.log(x <= y);
// console.log(x != y);
// console.log(x > y);
// console.log(y < x);

// // Logical AND Operators
// console.log("Logical AND Operators")
// console.log(true && true);
// console.log(true && false);
// console.log(false && true);
// console.log(false && false);

// // Logical OR Operators
// console.log("Logical OR Operators")
// console.log(true || true);
// console.log(true || false);
// console.log(false || true);
// console.log(false || false);

// // Logical NOT Operators
// console.log("Logical NOT Operators")
// console.log(!true);
// console.log(!false);

// // Functions in JavaScripts

// function avg(a,b){
//     return (a + b)/2;
// }

function avg(a, b) {
    c = (a + b) / 2;
    return c;
}

// DRY = Do not Repeat Yourself
c1 = avg(10, 12);
c2 = avg(10, 30);
console.log(c1, c2);

// Popular dishes data
const popularDishes = [
    {
        name: 'Classic Burger',
        description: 'Juicy beef patty with fresh vegetables',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80'
    },
    {
        name: 'Margherita Pizza',
        description: 'Fresh tomatoes, mozzarella, and basil',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80'
    },
    {
        name: 'Chicken Pasta',
        description: 'Creamy pasta with grilled chicken',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&q=80'
    }
];

// Function to create dish cards
function createDishCard(dish) {
    return `
        <div class="col-md-4">
            <div class="card dish-card">
                <img src="${dish.image}" class="card-img-top dish-img" alt="${dish.name}">
                <div class="card-body">
                    <h5 class="card-title">${dish.name}</h5>
                    <p class="card-text">${dish.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="h5 mb-0">$${dish.price}</span>
                        <button class="btn btn-primary" onclick="addToCart('${dish.name}')">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to populate popular dishes
function populatePopularDishes() {
    const dishesContainer = document.getElementById('popularDishes');
    if (dishesContainer) {
        dishesContainer.innerHTML = popularDishes.map(dish => createDishCard(dish)).join('');
    }
}

// Cart functionality
let cart = [];

function addToCart(dishName) {
    const dish = popularDishes.find(d => d.name === dishName);
    if (dish) {
        cart.push(dish);
        showNotification(`${dishName} added to cart!`);
    }
}

// Show notification
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

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize popular dishes
    populatePopularDishes();

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to features on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-up');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.feature-card').forEach(card => {
        observer.observe(card);
    });
});
