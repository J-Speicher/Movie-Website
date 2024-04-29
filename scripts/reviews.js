function init() {
    console.log('initializing reviews page...');
    populateFromLocalStorage();
    document.getElementById('submit-review').addEventListener('click', submitReview);
    document.getElementById('reset-reviews').addEventListener('click', clearList);
}

function addItemToList(item) {
    const list = document.getElementById('reviews');
    const tempList = document.createElement('li');
    tempList.textContent = item;
    list.appendChild(tempList);
}

function clearList() {
    console.log('clearing list');
    localStorage.removeItem('reviews');
    document.getElementById('reviews').innerHTML = '';
}

function submitReview() {
    console.log('submitting review...');
    const title = document.getElementById('title').value;
    const review = document.getElementById('review').value;
    const reviewText = `${title}: ${review}`;
    addItemToList(reviewText);
    saveReviewToLocalStorage(reviewText);
}

function saveReviewToLocalStorage(review) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function populateFromLocalStorage() {
    console.log('populating from local storage...');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(review => addItemToList(review));
}

init(); // Call the init function to initialize the page
