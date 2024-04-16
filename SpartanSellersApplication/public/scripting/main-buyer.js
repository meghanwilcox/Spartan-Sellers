
async function getAllItems() {
    try {
        const response = await fetch('http://localhost:3000/item/get-all-items');
        if (!response.ok) {
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

function displayItems(items) {
    const itemListElement = document.getElementById('item-list');
    itemListElement.innerHTML = ''; // Clear existing items
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.textContent = `${item.itemName} - ${item.itemPrice}`; 
        itemListElement.appendChild(itemElement);
    });
}

// Usage
getAllItems();

// Function to handle search when Enter key is pressed
function handleSearch(event) {
    if (event.key === 'Enter') {
        const searchKeywords = document.getElementById('search-input').value.trim();
        if (searchKeywords) {
            searchForItems(searchKeywords);
        } else {
            // Handle empty search query
            console.log('Please enter search keywords');
        }
    }
}

// Event listener for Enter key press in the search input field
document.getElementById('search-input').addEventListener('keydown', handleSearch);


async function searchForItems(keywords) {
    try {
        const response = await fetch(`http://localhost:3000/item/search?keywords=${encodeURIComponent(keywords)}`);
        if (!response.ok) {
            throw new Error('Failed to search for items');
        }
        const items = await response.json();
        console.log('Items retrieved successfully:', items);
        displayItems(items); // Call a function to display the items
    } catch (error) {
        console.error('Error searching for items:', error.message);
        // Display an error message or handle the error
    }
}

// Usage
const searchKeywords = 'your search keywords';
searchForItems(searchKeywords);