import noteDataSource from "./notesData.js";
import "../styles/output.css";
import "./components/CustomUI.js";

let noteData = noteDataSource;
// action btn
const addBtn = document.getElementById("add-btn");
// modal button
const closeBtn = document.getElementById("close-btn");
// components
const addFormSection = document.getElementById("add-form");
const modalBackdrop = document.getElementById("modal-backdrop");
const notes = document.getElementById("notes");
const archiveNotes = document.getElementById("archived-notes");
// web komponen
const addForm = document.querySelector("form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const saveBtn = document.querySelector(".save-btn");

let editNoteId = null;

function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(noteData));
}

function loadNotesFromLocalStorage() {
  const savedNotes = localStorage.getItem("notes");
  if (savedNotes) {
    return JSON.parse(savedNotes);
  }
  return noteDataSource;
}

function displayNotes(data, targetElement) {
  targetElement.innerHTML = "";
  data.forEach((note) => {
    targetElement.innerHTML += `
      <div class="note w-[23%] max-sm:w-[48%] max-lg:w-[48%] grid content-between cursor-pointer" id="note-${
        note.id
      }">
        <div>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${note.id} </p>
          <h1 class="font-bold text-lg max-sm:text-sm"> ${note.title} </h1>
          <p class="text-sm mt-2 max-sm:text-xs text-gray-700"> ${
            note.body
          } </p>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${
            note.createdAt
          } </p>
        </div>
        <div class="flex gap-2 text-sm mt-5">
          ${
            !note.archived
              ? `<button type="button" data-id=${note.id} class="edit-btn bg-yellow-400 max-sm:text-xs rounded-2xl py-2 px-3 h-10 text-black">Edit</button>
                 <button type="button" data-id=${note.id} class="archive-btn bg-gray-300 max-sm:text-xs py-2 px-3 h-10 rounded-2xl text-black max-sm:py-1">Archive</button>`
              : `<button type="button" data-id=${note.id} class="unarchive-btn bg-green-300 py-2 px-3 rounded-2xl h-10 text-black max-sm:text-xs">Unarchive</button>`
          }
          <button type="button" data-id=${
            note.id
          } class="delete-btn px-3 rounded-2xl bg-red-500 py-2 h-10 max-sm:py-1 text-white max-sm:text-xs">Delete</button>
        </div>
      </div>
    `;
  });

  document.querySelectorAll(".archive-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const noteID = e.target.getAttribute("data-id");
      let note = noteData.find((note) => note.id === noteID);
      note.archived = true;
      saveNotesToLocalStorage();
      refreshNotesDisplay();
    });
  });

  document.querySelectorAll(".unarchive-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const noteID = e.target.getAttribute("data-id");
      let note = noteData.find((note) => note.id === noteID);
      note.archived = false;
      saveNotesToLocalStorage();
      refreshNotesDisplay();
      alert("Success Unarchived note !");
    });
  });

  document.querySelectorAll(".edit-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const noteID = e.target.getAttribute("data-id");
      let note = noteData.find((note) => note.id === noteID);
      editNoteId = note.id;
      titleInput.value = note.title;
      bodyInput.value = note.body;
      addFormSection.classList.remove("hidden");
      modalBackdrop.classList.remove("hidden");
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    // Remove any existing event listeners to avoid duplicates
    button.removeEventListener("click", handleDelete);

    // Add the event listener for delete action
    button.addEventListener("click", handleDelete);
  });

  function handleDelete(e) {
    const noteID = e.target.getAttribute("data-id");
    let noteIndex = noteData.findIndex((note) => note.id === noteID);
    let choice = confirm("Delete this Note??");

    if (choice === true) {
      noteData.splice(noteIndex, 1);
      saveNotesToLocalStorage();
      refreshNotesDisplay();
    }
  }
}

function refreshNotesDisplay() {
  displayNotes(
    noteData.filter((n) => !n.archived),
    notes
  );
  displayNotes(
    noteData.filter((n) => n.archived),
    archiveNotes
  );
}

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const body = bodyInput.value;

  if (editNoteId) {
    let note = noteData.find((note) => note.id === editNoteId);
    note.title = title;
    note.body = body;
  } else {
    const newNote = {
      id: new Date().getTime().toString(),
      title: title,
      body: body,
      archived: false,
    };
    noteData.push(newNote);
    alert("Success Added note !");
  }

  saveNotesToLocalStorage();
  refreshNotesDisplay();

  titleInput.value = "";
  bodyInput.value = "";
  editNoteId = null;
  addFormSection.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});

// Validation
titleInput.addEventListener("input", validateForm);
bodyInput.addEventListener("input", validateForm);

function validateForm() {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  if (title === "" || body === "") {
    saveBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
  }
}

noteData = loadNotesFromLocalStorage();
refreshNotesDisplay();

addBtn.addEventListener("click", () => {
  titleInput.value = "";
  bodyInput.value = "";
  editNoteId = null;
  addFormSection.classList.remove("hidden");
  modalBackdrop.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  addFormSection.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    modalBackdrop.classList.add("hidden");
  }
});
