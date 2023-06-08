//Creating a class called BooksCollection to manage the books
class BooksCollection {

    constructor() {
        this.books = this.getBooksFromLocalStorage();
        //Display the books in the UI
        this.displayBooks();
    }

    //Method to retrieve the books from the local storage
    retrieveBooksFromLocalStorage() {
      //Retrieve the books from local storage
      const storedBooks = localStorage.getItem('books');
      //if there are stored books, parse to JSON and return them as an array, otherwise return an empty array
      return storedBooks ? JSON.parse(storedBooks) : [];
    }


    //Method to update the stored books in the local storage
    updateLocalStorage() {
      //Converts the books array to a JSON string and stores it in the 'books' key of local storage
      localStorage.setItem('books', JSON.stringify(this.books));
    }

    //Method to display the books in the UI
    displayBooks() {
      //Getting the DOM element for the books container
      const booksDiv = document.getElementById('books');
      //Clearing the books container
      booksDiv.innerHTML = '';

      //Check if there are any books in the array
      if (this.books.length === 0) {
        //If there are no books, display a message indicating so.
        booksDiv.innerHTML = '<p>No Books Found!</p>';
      } else {
        //if there are books, create an unordered list element
        const ul = document.createElement('ul');

        //Iterate over each book in the array
        this.books.forEach((book, index) =>{ 
          //Create a list item element to display the book details
          const li = document.createElement('li');
          li.textContent = `${book.title} by ${book.author}`;

          //Create a remove button for each book
          const removeButton = document.createElement('button');
          removeButton.type = 'button';
          removeButton.textContent = 'Remove';

          // Add an event listener to the remove button to handle book removal
          removeButton.addEventListener('click', () => {
            this.removeBook (index);
          });
          li.appendChild(removeButton);
          ul.appendChild (li);
        });
        booksDiv.appendChild (ul); 
      }
    }
    // A method to add a new book to the collection
    addBook(title, author){
      // create a book object with a given title and author
      const book = {
        title, author
      };
      this.books.push (book);
      this.displayBooks ();
      this.updateLocalStorage();
    }

  // create a method to remove the book from the collection
  removeBook(index){
    this.books.splice (index, 1);
    this.displayBooks ();
    this.updateLocalStorage();
  }
}

// create an instance of the bookCollection class to manage the books
const bookCollection = new BooksCollection();
// Add an event listener to the add button
document.getElementById('addButton').addEventListener('click', () =>{
  const title = document.getElementById ('title').value;
  const author = document.getElementById ('auhtor').value;
  bookCollection.addBook(title, author);
})


