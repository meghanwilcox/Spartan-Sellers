document.addEventListener('DOMContentLoaded', async () => {
    
    function formatProducts(products) {
        const productsContainer = document.getElementById('p-container');
        productsContainer.innerHTML = ''; // Clear previous content
    
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('listed-product');
            productDiv.setAttribute('id', `${product.itemID}`); // Add ID based on product ID
            // productDiv.addEventListener('click', () => {
            //     redirectToProductDetails(product.productID);
            // });
    
            const productName = document.createElement('h2');
            productName.textContent = product.itemName;
    
            //add this in later when we make the data in the database accurate
            const productImage = document.createElement('img');
            productImage.src = `./images/${product.}`;
            // productImage.alt = product.name;
    
            const productPrice = document.createElement('p');
            productPrice.textContent = '$' + product.price.toFixed(2);
    
            productDiv.appendChild(productName);
            //productDiv.appendChild(productImage);
            productDiv.appendChild(productPrice);
    
            productsContainer.appendChild(productDiv);
        });
    }

    try {
        const category = "Accessories"; // Set the category you want to retrieve products for
        const response = await fetch('http://localhost:3000/product/get-products-by-category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: category })
        });
    
        if (response.ok) {
            const products = await response.json();
            formatProducts(products);
        } else {
            console.error('Error retrieving products accessories:', response.statusText);
        }
    } catch (error) {
        console.error('Error retrieving products accessories:', error);
    }
    
    function redirectToProductDetails(productID) {
        // Redirect to details.html page with productID as URL parameter
        window.location.href = `details.html?productID=${productID}`;
    }
    
    function extractUserIDFromURL() {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        return urlParams.get('userID');
    }
    
    const logoutButton = document.getElementById('logout-button');
    logoutButton.addEventListener('click', async () => {
        try {
            // Call the logout API endpoint
            const response = await fetch('http://localhost:3000/auth/abandon-cart', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userID: extractUserIDFromURL() // Assuming you have extracted userID already
                })
            });

            if (response.ok) {
                alert('Logout successful');
                // Redirect the user to the login page or any other page as needed
                window.location.href = 'login.html';
            } else {
                console.error('Error logging out:', response.statusText);
                alert('An error occurred while logging out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
            alert('An error occurred while logging out');
        }
    });
    
    
});