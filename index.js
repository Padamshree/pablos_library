let myLibrary = [];

function Book(bookName, bookAuthor, bookPages, bookStatus) {
    this.name = bookName;
    this.author = bookAuthor;
    this.pages = bookPages;
    this.status = bookStatus;
}

updateLocal = () => {
    localStorage.setItem("myLib", JSON.stringify(myLibrary));
}

getLocal = () => {
    let storeLib = JSON.parse(localStorage.getItem("myLib"));
    if (storeLib === null) {
        const fillerBook = new Book("Main Kisna Hoon", "Kansa Mama", "1024", "Ongoing");
        myLibrary.push(fillerBook);
    } else {
        myLibrary = [...storeLib];
    }
}

getLocal();

renderBooks = (library) => {
    library.forEach((book, index) => {
        const mainContainer = document.querySelector('.display-books');
    
        let newDiv = document.createElement("div");
        mainContainer.appendChild(newDiv).className = `book-cell`;
        newDiv.id = `book-id${index}`;
    
        let bookName = document.createElement("div");
        bookName.innerHTML = `Book: ${book.name}`;
        newDiv.appendChild(bookName);

        let authorName = document.createElement("div");
        authorName.innerHTML = `Author: ${book.author}`;
        newDiv.appendChild(authorName);

        let pages = document.createElement("div");
        pages.innerHTML = `Book: ${book.pages}`;
        newDiv.appendChild(pages);

        let toggleStatus = document.createElement("button");
        newDiv.appendChild(toggleStatus).className = `toggle-status`;
        toggleStatus.id = `readToggle${index}`;
        toggleStatus.innerHTML = book.status;
        if (book.status === 'Ongoing') {
            toggleStatus.style.backgroundColor = '#ff6f3b';
        } else {
            toggleStatus.style.backgroundColor = '#72ff3b';
        }
        toggleStatus.setAttribute("onclick", `toggleRead(${index});`)

        let cancelBook = document.createElement("button");
        cancelBook.innerHTML = 'Delete';
        newDiv.appendChild(cancelBook).className = 'cancel';
        cancelBook.setAttribute("onclick", `deleteBook(${index});`);
    })
}

renderBooks(myLibrary);

document.getElementById("add-book").addEventListener("submit", (e) => {
    e.preventDefault();

    let form = document.getElementById('add-book');
    const bookName = form.elements[0].value;
    const author = form.elements[1].value;
    const pages = form.elements[2].value;
    const status = form.elements[3].value;

    let book = new Book(bookName, author, pages, status);
    for (i=0; i<myLibrary.length; i++) {
        document.querySelector('.book-cell').remove();
    }
    myLibrary.push(book);
    updateLocal();
    renderBooks(myLibrary);

    document.querySelector('.book-popup').style.display = "none";
    togglePopup();
    document.getElementById('add-book').reset();
})

toggleRead = (idx) => {
    let btnId = document.getElementById(`readToggle${idx}`);
    let bookId = myLibrary[idx];
    
    if (bookId.status === 'Read') {
        bookId.status = 'Ongoing'
        btnId.innerHTML = bookId.status;
        btnId.style.backgroundColor = '#ff6f3b';
    } else {
        bookId.status = 'Read'
        btnId.innerHTML = bookId.status;
        btnId.style.backgroundColor = '#72ff3b';
    }
    updateLocal();
}

deleteBook = (idx) => {
   let updList = myLibrary.filter((book, index) => index !== idx);
   for (i=0; i<myLibrary.length; i++) {
    document.querySelector('.book-cell').remove();
    }
   myLibrary = [...updList];
   updateLocal();
   renderBooks(myLibrary);
}

openAddBook = () => {
    document.querySelector('.book-popup').style.display = "block";
}

closeAddBook = () => {
    document.querySelector('.book-popup').style.display = "none";
}

togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");
}

document.querySelector('.open-btn').addEventListener('click', openAddBook);
document.querySelector('.close-popup').addEventListener('click', closeAddBook);