document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Validate form
        if (!validateForm(name, email, subject, message)) {
            return;
        }

        // Simulate form submission
        showLoadingState();
        
        // Simulate API call
        setTimeout(() => {
            // Reset form
            contactForm.reset();
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.');
            
            // Reset button
            hideLoadingState();
        }, 1500);
    });
});

// Form validation
function validateForm(name, email, subject, message) {
    // Reset previous error states
    clearErrors();

    let isValid = true;

    // Validate name
    if (name.trim() === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    }

    // Validate email
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate subject
    if (subject.trim() === '') {
        showError('subject', 'Please enter a subject');
        isValid = false;
    }

    // Validate message
    if (message.trim() === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    }

    return isValid;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show error message
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.classList.add('is-invalid');
    field.parentNode.appendChild(errorDiv);
}

// Clear all error messages
function clearErrors() {
    document.querySelectorAll('.is-invalid').forEach(field => {
        field.classList.remove('is-invalid');
    });
    document.querySelectorAll('.invalid-feedback').forEach(errorDiv => {
        errorDiv.remove();
    });
}

// Show loading state
function showLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
}

// Hide loading state
function hideLoadingState() {
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.disabled = false;
    submitButton.textContent = 'Send Message';
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
