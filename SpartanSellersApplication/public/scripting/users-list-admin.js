document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch flagged users from the server
        const response = await fetch('http://localhost:3000/user/get-flagged-users');
        if (!response.ok) {
            throw new Error(`Failed to fetch flagged users: ${response.statusText}`);
        }
        const flaggedUsers = await response.json();

        // Populate the page with flagged users
        const flaggedUsersContainer = document.getElementById('user-to-be-approved-list-container');
        flaggedUsers.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('user-to-be-approved');
            userDiv.innerHTML = `
                <div class="user-to-be-approved-title">${user.userName}</div>
                <button class="remove-button" onclick="removeFlaggedUser('${user.userName}')">Remove Flag</button>
            `;
            flaggedUsersContainer.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error fetching flagged users:', error);
        alert('An error occurred while fetching flagged users. Please try again later.');
    }
});

async function removeFlaggedUser(userName) {
    if (confirm("Are you sure you want to remove this flag from the user?")) {
        try {
            const response = await fetch('http://localhost:3000/user/remove-flagged-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName })
            });

            if (response.ok) {
                alert('Flag removed successfully!');
                location.reload(); // Refresh the page to reflect the changes
            } else {
                const errorMessage = await response.text();
                alert(`Failed to remove flag from user: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error removing flag from user:', error);
            alert('An error occurred while removing flag from user. Please try again later.');
        }
    }
}