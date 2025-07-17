// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Light Switch Demo
    const lightSwitch = document.getElementById('lightSwitch');
    const light = document.getElementById('light');

    lightSwitch.addEventListener('click', () => {
        light.classList.toggle('on');
    });

    // Keyboard Events Demo
    const keyInput = document.getElementById('keyInput');
    const keyDisplay = document.getElementById('keyDisplay');

    keyInput.addEventListener('keydown', (event) => {
        keyDisplay.textContent = `Last Key Pressed: ${event.key} (Key Code: ${event.keyCode})`;
        // Add a temporary highlight effect
        keyDisplay.style.backgroundColor = '#e3f2fd';
        setTimeout(() => {
            keyDisplay.style.backgroundColor = '#f8f9fa';
        }, 200);
    });

    // Mouse Events Demo
    const mouseBox = document.getElementById('mouseBox');
    const mousePosition = document.getElementById('mousePosition');

    mouseBox.addEventListener('mousemove', (event) => {
        // Get relative position within the box
        const rect = mouseBox.getBoundingClientRect();
        const x = Math.round(event.clientX - rect.left);
        const y = Math.round(event.clientY - rect.top);
        mousePosition.textContent = `X: ${x}px, Y: ${y}px`;
    });

    mouseBox.addEventListener('mouseenter', () => {
        mouseBox.style.backgroundColor = '#e3f2fd';
    });

    mouseBox.addEventListener('mouseleave', () => {
        mouseBox.style.backgroundColor = '#f8f9fa';
        mousePosition.textContent = 'Move mouse here';
    });

    // Event Bubbling Demo
    const bubbleLog = document.getElementById('bubbleLog');
    const containers = ['child', 'parent', 'grandparent'];

    containers.forEach(id => {
        const element = document.getElementById(id);
        element.addEventListener('click', (event) => {
            // Log the event
            const newLog = document.createElement('div');
            newLog.textContent = `Clicked ${id}!`;
            bubbleLog.insertBefore(newLog, bubbleLog.firstChild);

            // Add highlight effect
            const originalColor = element.style.backgroundColor;
            element.style.backgroundColor = '#bde0fe';
            setTimeout(() => {
                element.style.backgroundColor = originalColor;
            }, 200);

            // Uncomment the next line to stop event bubbling
            // event.stopPropagation();
        });
    });

    // Form Events Demo
    const demoForm = document.getElementById('demoForm');
    const formInput = document.getElementById('formInput');
    const formResult = document.getElementById('formResult');

    formInput.addEventListener('input', (event) => {
        // Real-time validation example
        if (event.target.value.length < 3) {
            formInput.style.borderColor = '#ff6b6b';
        } else {
            formInput.style.borderColor = '#2ecc71';
        }
    });

    demoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent actual form submission

        const name = formInput.value;
        formResult.textContent = `Form submitted! Hello, ${name}!`;
        formResult.style.display = 'block';
        formResult.style.backgroundColor = '#d4edda';
        formResult.style.color = '#155724';

        // Reset form and hide message after 3 seconds
        setTimeout(() => {
            demoForm.reset();
            formResult.style.display = 'none';
            formInput.style.borderColor = '#ddd';
        }, 3000);
    });

    // Add a welcome message using the DOMContentLoaded event
    console.log('All demos loaded and ready to interact!');
}); 