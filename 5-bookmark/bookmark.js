const addBookmarkBtn = document.querySelector("#add-bookmark");
const bookmarkList = document.querySelector("#bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.querySelector("#bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmarks);

function loadBookmarks(params) {}

addBookmarkBtn.addEventListener("click", () => {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name || !url) {
    alert("Please enter all info");
    return;
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("please enter a valid url starting with http:// or https://");
      return;
    }

    addBookmark(name, url);
    saveBookmark(name, url);
    bookmarkNameInput.value = "";
    bookmarkUrlInput.value = "";
  }
});

function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");

  link.textContent = name;
  link.href = url;
  link.target = "_blank";

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "remove";
  removeBtn.addEventListener("click", () => {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
  });

  li.appendChild(link);
  li.appendChild(removeBtn);

  bookmarkList.appendChild(li);
}

function getBookmarkFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveBookmark(name, url) {
  const bookmarks = getBookmarkFromStorage();
  bookmarks.push(name, url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
function removeBookmarkFromStorage(name, url) {
  const bookmarks = getBookmarkFromStorage()
  bookmarks = bookmarks.filter(bookmark => bookmark.name !== name || bookmark.url !== url)
}

function loadBookmarks() {
  const bookmarks = getBookmarkFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}
