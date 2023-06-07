class Book {
  /**
   * Creates a new instance of the Book class.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Collection {
  /**
   * Creates a new instance of the Collection class.
   * Initializes the books array and loads books from local storage if available.
   */
  constructor() {
    this.books = [];
    this.loadBooks();
  }

  /**
   * Loads the books from local storage and populates the books array.
   */
  loadBooks() {
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      this.books = JSON.parse(storedBooks).map(
        ({ title, author }) => new Book(title, author)
      );
    }
  }

  /**
   * Updates the local storage with the current books array.
   */
  updateLocalStorage() {
    localStorage.setItem("books", JSON.stringify(this.books));
  }

  /**
   * Adds a new book to the collection.
   * @param {string} title - The title of the book.
   * @param {string} author - The author of the book.
   */
  addBook(title, author) {
    const newBook = new Book(title, author);
    this.books.push(newBook);
    this.updateLocalStorage();
  }

  /**
   * Removes a book from the collection.
   * @param {number} index - The index of the book to remove.
   */
  removeBook(index) {
    this.books.splice(index, 1);
    this.updateLocalStorage();
  }
}
