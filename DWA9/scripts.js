import { books, BOOKS_PER_PAGE, authors, genres } from "./data.js";
import { html } from "./view.js";
let bookList;
let page = 1;
/**
 * Represents an array of matched books.
 * @type {Array}
 */
let matches = books;

const starting = document.createDocumentFragment();

function renderBooksFragment(fragment, books) {
  for (const { author, id, image, title } of books) {
    const bookPreview = document.createElement("book-preview");
    bookPreview.dataset.id = id;
    bookPreview.dataset.author = authors[author];
    bookPreview.dataset.image = image;
    bookPreview.dataset.title = title;

    fragment.appendChild(bookPreview);
  }
}

export const renderInitialBooks = (matches, BOOKS_PER_PAGE) => {
  const starting = document.createDocumentFragment();
  renderBooksFragment(starting, books.slice(0, BOOKS_PER_PAGE));
  document.querySelector("[data-list-items]").appendChild(starting);
  updateListControls(matches, 1, BOOKS_PER_PAGE);
};
renderInitialBooks();
// function createBookPreview({ author, id, image, title }) {
//   const element = document.createElement("button");
//   element.classList = "preview";
//   element.setAttribute("data-preview", id);

//   element.innerHTML = `
//     <img
//         class="preview__image"
//         src="${image}"
//     />

//     <div class="preview__info">
//         <h3 class="preview__title">${title}</h3>
//         <div class="preview__author">${authors[author]}</div>
//     </div>
//   `;

//   return element;
// }

// html.list.items.appendChild(starting);

// const bookPreviewList = document.querySelector("book-preview");
// bookPreviewList.setMatches(matches);

const genreHtml = document.createDocumentFragment();
const firstGenreElement = document.createElement("option");
firstGenreElement.value = "any";
firstGenreElement.innerText = "All Genres";
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

html.search.genres.appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();
const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}

html.search.authors.appendChild(authorsHtml);

/**
 * Checks if the user prefers dark mode and sets theme accordingly.
 */
if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  html.settings.theme.value = "night";
  document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
  document.documentElement.style.setProperty("--color-light", "10, 10, 20");
} else {
  html.settings.theme.value = "day";
  document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
  document.documentElement.style.setProperty("--color-light", "255, 255, 255");
}

html.list.button.innerText = `Show more (${books.length - BOOKS_PER_PAGE})`;
html.list.button.disabled = matches.length - page * BOOKS_PER_PAGE > 0;

html.list.button.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
`;

html.search.cancel.addEventListener("click", () => {
  html.search.overlay.open = false;
});

html.settings.cancel.addEventListener("click", () => {
  html.settings.overlay.open = false;
});

html.header.search.addEventListener("click", () => {
  html.search.overlay.open = true;
  html.search.title.focus();
});

html.header.settings.addEventListener("click", () => {
  html.settings.overlay.open = true;
});

html.list.close.addEventListener("click", () => {
  html.list.active.open = false;
});

html.settings.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);

  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty("--color-light", "255, 255, 255");
  }

  html.settings.overlay.open = false;
});

/**
 * Adds an event listener to the search form to handle form submission and filtering books.
 * @param {Event} event - The submit event.
 */
function filterBooks(formData) {
  const filters = Object.fromEntries(formData);
  const filteredBooks = [];

  for (const book of books) {
    if (isBookMatchingFilters(book, filters)) {
      filteredBooks.push(book);
    }
  }

  return filteredBooks;
}

function isBookMatchingFilters(book, filters) {
  let genreMatch = filters.genre === "any";

  for (const singleGenre of book.genres) {
    if (genreMatch) break;
    if (singleGenre === filters.genre) {
      genreMatch = true;
    }
  }

  return (
    (filters.title.trim() === "" || book.title.toLowerCase().includes(filters.title.toLowerCase())) && (filters.author === "any" || book.author === filters.author) && genreMatch
  );
}
//from here
export const loadMoreBooks = (bookList) => {
  const fragment = document.createDocumentFragment();
  const start = bookList.page * bookList.booksPerPage;
  const end = (bookList.page + 1) * bookList.booksPerPage;
  renderBooksFragment(fragment, bookList.matches.slice(start, end));
  document.querySelector("[data-list-items]").appendChild(fragment);
  bookList.page += 1;
  updateListButton(bookList.matches, bookList.page, bookList.booksPerPage);
};

const updateListButton = () => {
  const remaining = Math.max(0, bookList.matches.length - bookList.page * bookList.booksPerPage);
  document.querySelector("[data-list-button]").disabled = remaining < 1;

  document.querySelector("[data-list-button]").innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining})</span>
  `;
};
//here
function updateList(result) {
  page = 1;
  matches = result;
  updateListDisplay(result);
  updateListControls();
}

function updateListDisplay(result) {
  if (result.length < 1) {
    html.list.message.classList.add("list__message_show");
  } else {
    html.list.message.classList.remove("list__message_show");
  }

  html.list.items.innerHTML = "";
  const newItems = document.createDocumentFragment();

  for (const { author, id, image, title } of result.slice(0, BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
        <img
          class="preview__image"
          src="${image}"
        />
              
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      `;

    newItems.appendChild(element);
  }

  html.list.items.appendChild(newItems);
}

function updateListControls() {
  html.list.button.disabled = matches.length - page * BOOKS_PER_PAGE < 1;

  html.list.button.innerHTML = `
      <span>Show more</span>
      <span class="list__remaining"> (${matches.length - page * BOOKS_PER_PAGE > 0 ? matches.length - page * BOOKS_PER_PAGE : 0})</span>
    `;

  window.scrollTo({ top: 0, behavior: "smooth" });
  html.search.overlay.open = false;
}

html.search.form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const result = filterBooks(formData);
  updateList(result);
});

html.list.button.addEventListener("click", () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE)) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    fragment.appendChild(element);
  }

  html.list.items.appendChild(fragment);
  page += 1;
});

function handleListItemClick(event) {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      active = findActiveBook(node.dataset.preview);
    }
  }

  if (active) {
    updateHTML(active);
  }
}

function findBookById(bookId) {
  return books.find((book) => book.id === bookId);
}

function isActiveBook(book, previewId) {
  return book.id === previewId;
}

function findActiveBook(previewId) {
  const activeBook = findBookById(previewId);
  return isActiveBook(activeBook, previewId) ? activeBook : null;
}

function updateHTML(activeBook) {
  html.list.active.open = true;
  html.list.blur.src = activeBook.image;
  html.list.image.src = activeBook.image;
  html.list.title.innerText = activeBook.title;
  html.list.subtitle.innerText = `${authors[activeBook.author]} (${new Date(activeBook.published).getFullYear()})`;
  html.list.description.innerText = activeBook.description;
}

html.list.items.addEventListener("click", handleListItemClick);
