// Array to store the books
let books = [];

// Retrieve stored books from local storage
const storedBooks = localStorage.getItem('books');
if (storedBooks) {
  books = JSON.parse(storedBooks);
}

/**
 * Function to update the stored books in local storage.
 */
function updateLocalStorage() {
  localStorage.setItem('books', JSON.stringify(books));
}

/**
 * Function to display the books in the UI.
 */
function displayBooks() {
  /**
   * Function to remove a book from the collection.
   * @param {number} index - The index of the book to remove.
   */
  function removeBook(index) {
    books.splice(index, 1);
    displayBooks();
    updateLocalStorage();
  }

  const booksDiv = document.getElementById('books');
  booksDiv.innerHTML = '';

  if (books.length === 0) {
    booksDiv.innerHTML = '<p>No books found.</p>';
  } else {
    const ul = document.createElement('ul');

    books.forEach((book, index) => {
      const li = document.createElement('li');
      li.textContent = `${book.title} by ${book.author}`;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.textContent = 'Remove';
      removeBtn.addEventListener('click', () => {
        removeBook(index);
      });

      li.appendChild(removeBtn);
      ul.appendChild(li);
    });

    booksDiv.appendChild(ul);
  }
}

/**
 * Function to add a new book to the collection.
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */
function addBook(title, author) {
  const book = { title, author };
  books.push(book);
  displayBooks();
  updateLocalStorage();
}

// Event listener for add button
document.getElementById('addButton').addEventListener('click', () => {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  addBook(title, author);
});

// Initial display of books
displayBooks();
