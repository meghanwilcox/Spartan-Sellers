document.addEventListener('DOMContentLoaded', () => {
    //retrive data from the input forms
    const registerForm = document.getElementById('register-form');
    const userNameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const emailInput = document.getElementById('email');
    const firstNameInput = document.getElementById('firstname');
    const lastNameInput = document.getElementById('lastname');
    
    // Add event listener to the form submission
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        // Regular expression to match UNCG email format
        const uncgEmailRegex = /^[^\s@]+@uncg\.edu$/i;

        // Check if the email matches the UNCG email format
        if (!uncgEmailRegex.test(emailInput.value)) {
            return;
        }

        //formulate the JSON object
        const userData = {
            userName: userNameInput.value,
            password: passwordInput.value,
            email: emailInput.value,
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            isAdmin: false // Assuming default value for isAdmin
        };
    
        try {
            // Send POST request to the registration endpoint
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
    
            if (response.ok) {
                alert('User registered successfully!');
                // Redirect to some page after successful registration if needed
                window.location.href = 'main-buyer.html';
            } else {
                const errorMessage = await response.text();
                alert(`Failed to register user: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            alert('An error occurred while registering user. Please try again later.');
        }
    });
    
});

