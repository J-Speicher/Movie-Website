function init() {
    console.log('initializing reviews page...');
    populateFromLocalStorage();
    document.getElementById('submit-bookmark').addEventListener('click', submitBookmark);
    document.getElementById('reset-bookmarks').addEventListener('click', clearList);
    document.getElementById('export-bookmarks').addEventListener('click', exportBookmarks);
}

function addItemToList(item) {
    const list = document.getElementById('bookmarks');
    const tempList = document.createElement('li');
    tempList.textContent = item;
    list.appendChild(tempList);
}

function clearList() {
    console.log('clearing list');
    localStorage.removeItem('bookmarks');
    document.getElementById('bookmarks').innerHTML = '';
}

function submitBookmark() {
    console.log('submitting bookmark...');
    const title = document.getElementById('title').value;
    const genres = document.getElementById('genres').value;
    const cast = document.getElementById('cast').value;
    const reason = document.getElementById('reason').value;
    const bookmarkText = `${title}, a(n) ${genres} movie starring: ${cast} because ${reason}\n`;
    addItemToList(bookmarkText);
    saveBookmarkToLocalStorage(bookmarkText);
}

function saveBookmarkToLocalStorage(bookmark) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function populateFromLocalStorage() {
    console.log('populating from local storage...');
    const reviews = JSON.parse(localStorage.getItem('bookmarks')) || [];
    reviews.forEach(review => addItemToList(review));
}

function exportBookmarks() {
    console.log('exporting bookmarks...');
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    const bookmarkText = "// My Bookmarks:\n" + bookmarks.join('\n');
    const blob = new Blob([bookmarkText], {type: 'application/json'});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bookmarks.json';
    a.click();
}

init(); // Call the init function to initialize the page
