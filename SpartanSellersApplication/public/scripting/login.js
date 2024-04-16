document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the data from the input form
    const loginForm = document.getElementById('login-form');
    const userName = document.getElementById('username');
    const password = document.getElementById('password');

    // Add event listener to the form submission
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        const userData = {
            userName: userName.value,
            password: password.value
        };

        // Send a POST request to the server to authenticate the user
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (response.ok) {
                const responseData = await response.json();
                alert('User logged in successfully!');

                //
                
                // Send a separate request to check if the user is an admin
                try {
                    //check if the user is an admin
                    const isAdminResponse = await fetch('http://localhost:3000/auth/isAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(userData)
                    });
                    
                    //if the user is an admin, redirect to admin main page
                    if (isAdminResponse.ok) {

                        const isAdminData = await isAdminResponse.json();

                        console.log('isAdmin', isAdminData);

                        if(isAdminData === true){
                            alert('User is an admin!');
                            window.location.href = 'main-admin.html';
                        } else {
                            //if user is not an admin redirect to main buyer page
                            alert('User is not an admin!');
                            window.location.href = 'main-buyer.html';
                        }
                        
                    } else { 
                        console.error('Error checking if user is an admin:', error);
                        alert('An error occurred while checking if a user is an admin');
                    }
                } catch (error) {
                    console.error('Error checking if user is an admin:', error);
                    alert('An error occurred while checking if a user is an admin');
                }
                
            } else {
                const errorMessage = await response.text();
                console.error('Error logging in:', errorMessage);
                alert('Failed to login: ' + errorMessage);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('An error occurred while logging in. Please try again later.');
        }
    });    
});