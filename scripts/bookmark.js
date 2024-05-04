// initialize the page and add event listeners to the buttons
function init() {
    console.log('initializing reviews page...');
    populateFromLocalStorage();
    document.getElementById('submit-bookmark').addEventListener('click', submitBookmark);
    document.getElementById('reset-bookmarks').addEventListener('click', clearList);
    document.getElementById('export-bookmarks').addEventListener('click', exportBookmarks);
}

// Add a new item or replace existing item to the list of bookmarks
function addItemToList(title, item) {
    const list = document.getElementById('bookmarks');
    const existingBookmark = Array.from(list.children).find(function (bookmark) {
        return bookmark.dataset.title === title;
    });

    if (existingBookmark) {
        existingBookmark.textContent = item;
    } else {
        const tempList = document.createElement('li');
        tempList.dataset.title = title;
        tempList.textContent = item;
        list.appendChild(tempList);
    }

    // Save the updated bookmark list to local storage
    const bookmarks = Array.from(list.children).map(function (bookmark) {
        return bookmark.textContent;
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

// Clear the list of bookmarks and remove from local storage
function clearList() {
    console.log('clearing list');
    localStorage.removeItem('bookmarks');
    document.getElementById('bookmarks').innerHTML = '';
}

// Submit the bookmark form and add to the list of bookmarks
function submitBookmark() {
    console.log('submitting bookmark...');
    const title = document.getElementById('btitle').value;
    const genres = document.getElementById('genres').value;
    const cast = document.getElementById('cast').value;
    const reason = document.getElementById('reason').value;
    const bookmarkText = `${title}, a(n) ${genres} movie starring: ${cast} because ${reason}\n`;
    addItemToList(title, bookmarkText);
}

// Populate the list of bookmarks from local storage
function populateFromLocalStorage() {
    console.log('populating from local storage...');
    const reviews = JSON.parse(localStorage.getItem('bookmarks')) || [];
    reviews.forEach(review => {
        const [title, bookmarkText] = review.split(', a(n) ');
        addItemToList(title, review);
    });
}

// Export the list of bookmarks to a JSON file
function exportBookmarks() {
    console.log('exporting bookmarks...');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarkText = "// My Bookmarks:\n" + bookmarks.join('\n');
    const blob = new Blob([bookmarkText], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    a.click();
}

init(); // Call the init function to initialize the page
