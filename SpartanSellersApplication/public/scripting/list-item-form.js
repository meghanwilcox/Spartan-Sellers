document.addEventListener('DOMContentLoaded', () => {
    //retrive data from the input forms
    const listItemForm = document.getElementById('list-item-form');
    const itemTitleInput = document.getElementById('item-title');
    const itemDescriptionInput = document.getElementById('item-description');
    // const itemPhotoInput = document.getElementById('item-photo-upload');
    const itemCategoryInput = document.getElementById('item-category-selct');
    const itemConditionInput = document.getElementById('item-condition-selct');
    const itemPriceInput = document.getElementById('item-price');

    // Add event listener to the form submission
    listItemForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent default form submission

        const userName = sessionStorage.getItem('userName');

        //formulate the JSON object
        const itemData = {
            userName: userName,
            itemName: itemTitleInput.value,
            description: itemDescriptionInput.value,
            category: itemCategoryInput.value,
            condition: itemConditionInput.value,
            itemPrice: itemPriceInput.value,
            approval_status: false // Assuming default value for approval_status

        };

        try {
            // Send POST request to the registration endpoint
            const response = await fetch('http://localhost:3000/item/create-new-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData )
            });

            if (response.ok) {
                alert('Item created successfully!');
                // Redirect to some page after successful registration if needed
                window.location.href = 'main-seller.html';
            } else {
                const errorMessage = await response.text();
                alert(`Failed to create item: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error listing item', error);
            alert('An error occurred while listing item. Please try again later.');
        }
    });

});

