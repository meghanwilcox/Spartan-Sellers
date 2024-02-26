function changeTab(tabNumber) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    // Add 'active' class to the clicked tab
    const clickedTab = document.getElementById(`tab${tabNumber}`);
    clickedTab.classList.add('active');

    // Redirect to the corresponding HTML page
    if (tabNumber === 1) {
        window.location.href = 'page1.html';
    } else if (tabNumber === 2) {
        window.location.href = 'page2.html';
    }
}


function handleSearch(event) {
    if (event.key === 'Enter') {
        searchResults();
    }
}

function searchResults() {
    // Redirect to the sort page
    const searchTerm = document.querySelector('.search-bar').value;
    if (searchTerm.trim() !== '') {
        window.location.href = 'search-results.html?query=' + encodeURIComponent(searchTerm);
    }
}
