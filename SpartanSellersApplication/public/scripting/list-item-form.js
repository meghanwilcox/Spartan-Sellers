document.addEventListener('DOMContentLoaded', () => {

    const newItemForm = document.getElementById('list-item-form');
    const itemTitle = document.getElementById('item-title');
    const itemDescription = document.getElementById('item-description');
    const itemPhotoURL = document.getElementById('item-photo-upload');
    const itemCategory = document.getElementById('item-category-select');
    const itemCondition = document.getElementById('item-condition-select');
    const itemPrice = document.getElementById('item-price');

    newItemForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        //formulate the JSON object
        const itemData = {
            userName: //NEED TO ADD GLOBAL USER INFO HERE,
            itemName: itemTitle.value,
            itemPrice: itemPrice.value,
            description: itemDescription.value,
            condition: itemCondition.value,
            category: itemCategory.value,
            approval_status: 0
        };

        try {
            // Send POST request to the registration endpoint
            const response = await fetch('http://localhost:3000/item/create-new-listing', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemData)
            });

            if (response.ok) {
                alert('Item created successfully!');
                // Clear the input fields
                SSNInput.value = '';
                DOBInput.value = '';
                fnameInput.value = '';
                minitInput.value = '';
                lnameInput.value = '';
                addressInput.value = '';
            } 
        } catch (error) {
            alert('Error creating item');
        }
        
    });

    });