// Get all the form elements we need
const form = document.querySelector('#form');
const usernameInput = document.querySelector('#username');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#cpassword');

// When form is submitted, check if everything is valid
form.addEventListener('submit', function (e) {
    // Check all fields - if any are invalid, stop the form from submitting
    if (!checkAllFields()) {
        e.preventDefault(); // Stop form submission
    }
});

// Main function to check all form fields
function checkAllFields() {
    // Get the values from each input
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Track if everything is valid
    let allFieldsValid = true;

    // Check username
    if (username === '') {
        showError(usernameInput, 'Please enter a username');
        allFieldsValid = false;
    } else {
        showSuccess(usernameInput);
    }

    // Check email
    if (email === '') {
        showError(emailInput, 'Please enter an email');
        allFieldsValid = false;
    } else if (!isValidEmail(email)) {
        showError(emailInput, 'Please enter a valid email address');
        allFieldsValid = false;
    } else {
        showSuccess(emailInput);
    }

    // Check password
    if (password === '') {
        showError(passwordInput, 'Please enter a password');
        allFieldsValid = false;
    } else if (password.length < 8) {
        showError(passwordInput, 'Password must be at least 8 characters');
        allFieldsValid = false;
    } else {
        showSuccess(passwordInput);
    }

    // Check confirm password
    if (confirmPassword === '') {
        showError(confirmPasswordInput, 'Please confirm your password');
        allFieldsValid = false;
    } else if (confirmPassword !== password) {
        showError(confirmPasswordInput, 'Passwords do not match');
        allFieldsValid = false;
    } else {
        showSuccess(confirmPasswordInput);
    }

    // Return true only if ALL fields are valid
    return allFieldsValid;
}

// Show error message and style for an input field
function showError(inputElement, message) {
    // Find the parent container of the input
    const inputContainer = inputElement.parentElement;

    // Find the error message element inside the container
    const errorMessage = inputContainer.querySelector('.error');

    // Set the error message text
    errorMessage.innerText = message;

    // Add error styling and remove success styling
    inputContainer.classList.add('error');
    inputContainer.classList.remove('success');
}

// Show success style for an input field
function showSuccess(inputElement) {
    // Find the parent container of the input
    const inputContainer = inputElement.parentElement;

    // Find the error message element inside the container
    const errorMessage = inputContainer.querySelector('.error');

    // Clear any error message
    errorMessage.innerText = '';

    // Add success styling and remove error styling
    inputContainer.classList.add('success');
    inputContainer.classList.remove('error');
}

// Check if an email address is valid
function isValidEmail(email) {
    // Simple email pattern check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}