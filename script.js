const myLibrary = [
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        pages: 218,
        read: false,
    },
    {
        title: "The Lion, the Witch and the Wardrobe",
        author: "C.S. Lewis",
        pages: 208,
        read: false,
    },
    {
        title: "The Mythical Man-of-War",
        author: "H.G. Wells",
        pages: 310,
        read: false,
    },
];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        if (read) {
            return `Would you like to read ${title} by ${author}, ${pages}?`;
        } else {
            return `You have already read ${title}, by ${author}, ${pages}.`;
        }
    };
}

const renderBook = (book) => {
    const container = document.querySelector(".library");
    let bookElement = document.createElement("div");
    bookElement.classList.add("book");
    let text = document.createElement("div");
    text.classList.add("text");
    let title = document.createElement("div");
    title.classList.add("title");
    title.textContent = book.title;
    let author = document.createElement("div");
    author.classList.add("author");
    author.textContent = `By: ${book.author}`;
    let bottom = document.createElement("div");
    bottom.classList.add("bottom");
    let toggleRead = document.createElement("input");
    toggleRead.type = "checkbox";
    toggleRead.id = "read-toggle";
    toggleRead.name = "Read";
    toggleRead.value = "Read";
    let pages = document.createElement("div");
    pages.classList.add("pages");
    pages.textContent = `${book.pages} pages`;
    bottom.appendChild(toggleRead);
    bottom.appendChild(pages);
    bookElement.appendChild(text);
    text.appendChild(title);
    text.appendChild(author);
    bookElement.appendChild(bottom);

    toggleRead.addEventListener("change", (e) => {
        book.read = e.target.checked;
        console.log(book.title + " " + book.read);
        // Add these lines to update the book's appearance
        if (book.read) {
            bookElement.classList.remove("book-unread");
            bookElement.classList.add("book-read");
        } else {
            bookElement.classList.remove("book-read");
            bookElement.classList.add("book-unread");
        }
    });

    // Create cross element
    let cross = document.createElement("div");
    cross.textContent = "X";
    cross.classList.add("cross");
    cross.style.display = "none";
    bookElement.appendChild(cross);

    container.appendChild(bookElement);

    if (book.read) {
        bookElement.classList.add("book-read");
    } else {
        bookElement.classList.add("book-unread");
    }
    // Add mouseover and mouseout event listeners
    bookElement.addEventListener("mouseover", () => {
        cross.style.display = "block";
    });

    bookElement.addEventListener("mouseout", () => {
        cross.style.display = "none";
    });

    // Remove or comment out this redundant event listener
    // document.querySelector("#read-toggle").addEventListener("change", (e) => {
    //     console.log(e.target.checked);
    // });

    // Add click event listener to cross

    cross.addEventListener("mouseover", (e) => {
        cross.style.cursor = "pointer";
    });

    cross.addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("Cross clicked");

        bookElement.classList.add("flash");
        setTimeout(() => {
            bookElement.remove();
        }, 500);
    });
};

window.addEventListener("DOMContentLoaded", () => {
    for (const book of myLibrary) {
        renderBook(book);
    }

    document.querySelector(".add-book").addEventListener("click", () => {
        const dialog = document.querySelector("dialog");
        dialog.showModal();
    });

    let form = document.querySelector(".book-form");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        var formData = new FormData(form);
        console.log(formData);

        const title = formData.get("title");
        const author = formData.get("author");
        const pages = formData.get("pages");
        const read = formData.get("read") === "on";
        console.log(title, author, pages, read);

        addBookToLibrary(title, author, pages, read);

        form.reset();
        document.querySelector("dialog").close();
    });
});

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    console.log(newBook);
    renderBook(newBook);
}
