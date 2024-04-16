document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Fetch flagged users from the server
        const response = await fetch('http://localhost:3000/user/get-flagged-users');
        if (!response.ok) {
            throw new Error(`Failed to fetch flagged users: ${response.statusText}`);
        }
        const flaggedUsers = await response.json();
        
        // Display flagged users or a message if there are none
        const flaggedUsersContainer = document.getElementById('user-to-be-approved-list-container');
        if (flaggedUsers.length > 0) {
            flaggedUsers.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.classList.add('user-to-be-approved');
                userDiv.innerHTML = `
                    <div class="user-to-be-approved-title">${user.userName}</div>
                    <button class="remove-flag-button" onclick="removeFlag('${user.userName}')">Remove Flag</button>
                    <button class="remove-user-button" onclick="removeUser('${user.userName}')">Remove User</button>
                `;
                flaggedUsersContainer.appendChild(userDiv);
            });
        } else {
            flaggedUsersContainer.innerHTML = '<p>No flagged users</p>';
        }
    } catch (error) {
        console.error('Error fetching flagged users:', error);
        alert('An error occurred while fetching flagged users. Please try again later.');
    }
});

async function removeFlag(userName) {
    if (confirm("Are you sure you want to remove the flag from this user?")) {
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

async function removeUser(userName) {
    if (confirm("Are you sure you want to remove this user?")) {
        try {
            const response = await fetch('http://localhost:3000/user/remove-user', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userName })
            });

            if (response.ok) {
                alert('User removed successfully!');
                location.reload(); // Refresh the page to reflect the changes
            } else {
                const errorMessage = await response.text();
                alert(`Failed to remove user: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error removing user:', error);
            alert('An error occurred while removing user. Please try again later.');
        }
    }
}