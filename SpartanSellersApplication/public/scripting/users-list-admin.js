document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
            if (confirm("Are you sure you want to remove this user?")) {
                const userName = event.target.parentElement.querySelector('.user-to-be-approved-title').textContent.trim();
                try {
                    const response = await fetch('http://localhost:3000/auth/remove', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ userName })
                    });
   
                    if (response.ok) {
                        alert('User removed successfully!');
                        event.target.parentElement.remove();
                    } else {
                        const errorMessage = await response.text();
                        alert(`Failed to remove user: ${errorMessage}`);
                    }
                } catch (error) {
                    console.error('Error removing user:', error);
                    alert('An error occurred while removing user. Please try again later.');
                }
            }
        });
    });
});



