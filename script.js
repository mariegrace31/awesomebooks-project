// Create a class called BookCollection to manage the books
class BookCollection {
  // The constructor is called when creating an instance of the class
  constructor() {
    // Initialize the books array by retrieving the stored books from local storage
    this.books = this.retrieveBooksFromLocalStorage();
    // Display the books in the UI
    this.displayBooks();
  }

  // Arrow function to retrieve the books from local storage
  retrieveBooksFromLocalStorage = () => {
    // Retrieve the stored books from local storage
    const storedBooks = localStorage.getItem('books');
    return storedBooks ? JSON.parse(storedBooks) : [];
  };

  // Method to update the stored books in local storage
  updateLocalStorage() {
    // Convert the books array to JSON and store it in the 'books' key of local storage
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  // Method to display the books in the UI
  displayBooks() {
    // Get the DOM element for the books container
    const booksDiv = document.getElementById('books');
    // Clear the books container
    booksDiv.innerHTML = '';

    // Check if there are any books
    if (this.books.length === 0) {
      // If there are no books, display a message indicating so
      booksDiv.innerHTML = '<p>No books found.</p>';
    } else {
      // If there are books, create an unordered list element
      const ul = document.createElement('ul');

      // Iterate over each book in the books array
      this.books.forEach((book, index) => {
        // Create a list item element to display the book details
        const li = document.createElement('li');
        li.textContent = `${book.title} by ${book.author}`;

        // Add alternating background colors to the list items
        if (index % 2 === 0) {
          li.classList.add('even');
        } else {
          li.classList.add('odd');
        }

        // Create a remove button for each book
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('removeButton');
        removeBtn.type = 'button';
        removeBtn.textContent = 'Remove';

        // Add an event listener to the remove button to handle book removal
        removeBtn.addEventListener('click', () => {
          // Call the removeBook method, passing the index of the book to remove
          this.removeBook(index);
        });

        // Append the remove button to the list item
        li.appendChild(removeBtn);
        // Append the list item to the unordered list
        ul.appendChild(li);
      });

      // Append the unordered list to the books container
      booksDiv.appendChild(ul);
    }
  }

  // Method to add a new book to the collection
  addBook(title, author) {
    // Create a book object with the given title and author
    const book = { title, author };
    // Add the book object to the books array
    this.books.push(book);
    // Display the updated list of books in the UI
    this.displayBooks();
    // Update the stored books in local storage
    this.updateLocalStorage();
  }

  // Method to remove a book from the collection
  removeBook(index) {
    // Remove the book at the specified index from the books array
    this.books.splice(index, 1);
    // Display the updated list of books in the UI
    this.displayBooks();
    // Update the stored books in local storage
    this.updateLocalStorage();
  }
}

// Create an instance of the BookCollection class to manage the books
const bookCollection = new BookCollection();

// Add an event listener to the add button
document.getElementById('addButton').addEventListener('click', () => {
  // Get the values of the title and author inputs
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  // Call the addBook method of the bookCollection instance, passing the title and author
  bookCollection.addBook(title, author);
});

// Get the time element
const timeElement = document.getElementById('time');

// Function to update the time
function updateTime() {
  const currentTime = new Date();
  const day = currentTime.getDay();
  const month = currentTime.toLocaleString('default', { month: 'long' });
  const year = currentTime.getFullYear();
  let hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();

  // Get the appropriate suffix for the day
  let daySuffix = 'th';
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = 'st';
  } else if (day === 2 || day === 22) {
    daySuffix = 'nd';
  } else if (day === 3 || day === 23) {
    daySuffix = 'rd';
  }

  // Convert hours to 12-hour format and determine AM/PM
  let ampm = '';
  if (hours >= 12) {
    ampm = 'pm';
  } else {
    ampm = 'am';
  }
  if (hours > 12) {
    hours -= 12;
  }

  const displayedTime = `${month} ${day}${daySuffix}  ${year}, ${hours}:${minutes}:${seconds} ${ampm}`;

  // Update the time element
  timeElement.textContent = displayedTime;
}

// Call the updateTime function to display the current time
updateTime();

// Update the time every second
setInterval(updateTime, 1000);
