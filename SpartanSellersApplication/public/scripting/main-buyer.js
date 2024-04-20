function displayItems(items) {
    const itemListElement = document.getElementById('item-list');
    itemListElement.innerHTML = ''; // Clear existing items
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('product-item');
        
        // Create image element
        const imgElement = document.createElement('img');
        imgElement.classList.add('product-image');
        imgElement.src = `/SpartanSellersApplication/public/images/${item.itemImg}`; // Prepend base path
        imgElement.alt = item.itemName; // Set alt attribute for accessibility
        
        // Create paragraph elements for item name and price
        const nameElement = document.createElement('p');
        nameElement.textContent = item.itemName;
        
        const priceElement = document.createElement('p');
        priceElement.textContent = item.itemPrice;
        
        // Create view item button
        const viewItemButton = document.createElement('button');
        viewItemButton.classList.add('view-item-btn');
        viewItemButton.textContent = 'View Item';
        viewItemButton.addEventListener('click', () => {
            // Navigate to the product page when the button is clicked
            window.location.href = `product-two.html`;
        });
        
        // Append elements to item element
        itemElement.appendChild(viewItemButton); // Append button first
        itemElement.appendChild(imgElement);
        itemElement.appendChild(nameElement);
        itemElement.appendChild(priceElement);
        
        // Append item element to item list
        itemListElement.appendChild(itemElement);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Select all category items
    const categoryItems = document.querySelectorAll('.category-item');

    // Add click event listener to each category item
    categoryItems.forEach(category => {
        category.addEventListener('click', async function() {
            // Extract the category name from the data-category attribute
            const categoryName = category.dataset.category;

            // Call a function to fetch and display items for the selected category
            try {
                const items = await fetchItemsByCategory(categoryName);
                // Check if items are found
                if (items.length === 0) {
                    // Display a message to the user indicating no products found
                    console.log('No products found for category:', categoryName);
                    // Optionally, you can display a message or handle this case differently
                } else {
                    displayItems(items);
                }
            } catch (error) {
                console.error('Error fetching or displaying items:', error);
            }
        });
    });
});

// Function to fetch items by category
async function fetchItemsByCategory(category) {
    try {
        console.log('Attempting to fetch products in category:', category);

        const response = await fetch(`http://localhost:3000/item/get-items-by-category`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ category: category })
        });

        const items = await response.json();

        if (!items || items.length === 0) {
            console.log('No products found for category:', category);
            return [];
        }

        console.log('Products retrieved successfully:', items);
        return items;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products: ' + error.message);
    }
}

// Function to fetch all items initially or by category
async function getAllItems(category = null) {
    try {
        let response;
        if (category) {
            // Fetch items by category
            response = await fetchItemsByCategory(category);
        } else {
            // Fetch all items
            response = await fetch('http://localhost:3000/item/get-all-items');
        }

        if (!response || !response.ok) {
            throw new Error('Failed to retrieve items');
        }

        const items = await response.json();
        console.log('Items retrieved successfully:', items);
        displayItems(items); // Call a function to display the items
    } catch (error) {
        console.error('Error retrieving items:', error.message);
        // Display an error message or handle the error
    }
}


document.addEventListener('DOMContentLoaded', function() {
    // Select the "View All" category item
    const viewAllCategoryItem = document.querySelector('.category-item[data-category="View All"]');

    // Add a click event listener to the "View All" category item
    viewAllCategoryItem.addEventListener('click', async function() {
        try {
            // Fetch all items
            await getAllItems();
        } catch (error) {
            console.error('Error fetching or displaying items:', error);
        }
    });
});
    

// Function to handle search when Enter key is pressed
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        searchProducts();
    }
}

// Add event listener to ensure that the script runs after DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the search input field to detect Enter key press
    document.getElementById('search-input').addEventListener('keypress', handleKeyPress);
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch all items initially
    getAllItems();

    // Add event listener to the search input field to detect Enter key press
    document.getElementById('search-input').addEventListener('keypress', handleKeyPress);
});

async function searchProducts() {
    // Get the search keywords from the input field
    const keywords = document.getElementById('search-input').value.trim(); // Trim to remove any leading/trailing spaces

    try {
        if (keywords === '') {
            // If no keywords are entered, display the whole list of items
            await getAllItems();
        } else {
            // Make a GET request to your backend API endpoint with search keywords
            const response = await fetch(`http://localhost:3000/item/search?keywords=${keywords}`);
            const items = await response.json();

            // Get the item container
            const itemContainer = document.getElementById('item-list');

            // Clear the existing contents of the item container
            itemContainer.innerHTML = '';

            if (items.length === 0) {
                // If no items are found, display the error message
                const noResultsMessage = document.createElement('p');
                noResultsMessage.textContent = 'No products found.';
                noResultsMessage.classList.add('no-results-message');
                itemContainer.appendChild(noResultsMessage);
            } else {
                // Display the search results
                displayItems(items);
            }
        }
    } catch (error) {
        console.error('Error searching for products:', error);
    }
}
