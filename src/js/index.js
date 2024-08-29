import "../styles/output.css";
import "./CustomElements.js";

// Elemen HTML
const addBtn = document.getElementById("add-btn");
const closeBtn = document.getElementById("close-btn");
const addFormSection = document.getElementById("add-form");
const modalBackdrop = document.getElementById("modal-backdrop");
const notes = document.getElementById("notes");
const archiveNotes = document.getElementById("archived-notes");
const addForm = document.querySelector("form");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const saveBtn = document.querySelector(".save-btn");

const endPoint = process.env.APP_ENDPOINT;

// Fungsi API
async function fetchNotes() {
  try {
    const response = await fetch(`${endPoint}/notes`, {
      method: "GET",
    });
    const result = await response.json();
    if (response.ok) {
      return result.data;
    } else {
      console.error("Failed to fetch notes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

async function fetchArchivedNotes() {
  try {
    const response = await fetch(`${endPoint}/notes/archived`, {
      method: "GET",
    });
    const result = await response.json();

    if (response.ok) {
      return result.data;
    } else {
      console.error("Failed to fetch notes:", result.message);
      return [];
    }
  } catch (error) {
    console.error("Error fetching notes:", error);
    return [];
  }
}

async function createNote(note) {
  showLoading();
  try {
    const response = await fetch(`${endPoint}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return result.data;
    } else {
      console.error("Failed to create note:", result.message);
    }
  } catch (error) {
    console.error("Error creating note:", error);
  } finally {
    hideLoading();
  }
}

async function archivingNote(noteId) {
  showLoading();
  try {
    const response = await fetch(`${endPoint}/notes/${noteId}/archive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return result.message;
    } else {
      console.error(`Failed with:`, result.message);
    }
  } catch (error) {
    console.error(`Error note:`, error);
  } finally {
    alert("Succes archieving note!");
    hideLoading();
  }
}

async function unarchivingNote(noteId) {
  showLoading();
  try {
    const response = await fetch(`${endPoint}/notes/${noteId}/unarchive`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return result.message;
    } else {
      console.error(`Failed with:`, result.message);
    }
  } catch (error) {
    console.error(`Error note:`, error);
  } finally {
    alert("Succes unarchieving note!");
    hideLoading();
  }
}

async function deleteNoteById(noteId) {
  showLoading();
  try {
    const response = await fetch(`${endPoint}/notes/${noteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      return result.message;
    } else {
      console.error("Failed to delete note:", result.message);
    }
  } catch (error) {
    console.error("Error deleting note:", error);
  } finally {
    alert("Succes deleting note!");
    hideLoading();
  }
}

// Tampilkan catatan
async function displayNotes() {
  const allNotes = await fetchNotes();
  const archivedNotes = await fetchArchivedNotes();

  notes.innerHTML = "";
  archiveNotes.innerHTML = "";

  allNotes.forEach((note) => {
    const noteHTML = `
      <div class="note w-[23%] max-sm:w-[48%] max-lg:w-[48%] grid content-between cursor-pointer" id="note-${note.id}">
        <div>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${note.id} </p>
          <h1 class="font-bold text-lg max-sm:text-sm"> ${note.title} </h1>
          <p class="text-sm mt-2 max-sm:text-xs text-gray-700"> ${note.body} </p>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${note.createdAt} </p>
        </div>
        <div class="flex gap-2 text-sm mt-5">
          <button type="button" data-id=${note.id} class="archive-btn bg-gray-300 max-sm:text-xs py-2 px-3 h-10 rounded-2xl text-black max-sm:py-1">Archive</button>
          <button type="button" data-id=${note.id} class="delete-btn px-3 rounded-2xl bg-red-500 py-2 h-10 max-sm:py-1 text-white max-sm:text-xs">Delete</button>
        </div>
      </div>
    `;

    notes.innerHTML += noteHTML;
  });

  archivedNotes.forEach((note) => {
    const noteHTML = `
      <div class="note w-[23%] max-sm:w-[48%] max-lg:w-[48%] grid content-between cursor-pointer" id="note-${note.id}">
        <div>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${note.id} </p>
          <h1 class="font-bold text-lg max-sm:text-sm"> ${note.title} </h1>
          <p class="text-sm mt-2 max-sm:text-xs text-gray-700"> ${note.body} </p>
          <p class="text-sm mt-2 text-[10px] text-gray-700"> ${note.createdAt} </p>
        </div>
        <div class="flex gap-2 text-sm mt-5">
          <button type="button" data-id=${note.id} class="unarchive-btn bg-green-300 py-2 px-3 rounded-2xl h-10 text-black max-sm:text-xs">Unarchive</button>
          <button type="button" data-id=${note.id} class="delete-btn px-3 rounded-2xl bg-red-500 py-2 h-10 max-sm:py-1 text-white max-sm:text-xs">Delete</button>
        </div>
      </div>
    `;

    archiveNotes.innerHTML += noteHTML;
  });

  // Add event listeners after the notes have been rendered
  document.querySelectorAll(".archive-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const noteID = e.target.getAttribute("data-id");
      await archivingNote(noteID);
      displayNotes(); // Refresh notes display
    });
  });

  document.querySelectorAll(".unarchive-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const noteID = e.target.getAttribute("data-id");
      await unarchivingNote(noteID);
      displayNotes(); // Refresh notes display
    });
  });

  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", async (e) => {
      const noteID = e.target.getAttribute("data-id");
      if (confirm("Delete this Note?")) {
        await deleteNoteById(noteID);
        displayNotes(); // Refresh notes display
      }
    });
  });
}

// submit create note
addForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value;
  const body = bodyInput.value;

  const newNote = {
    title: title,
    body: body,
  };
  await createNote(newNote);
  alert("Success Added note!");

  displayNotes();
  titleInput.value = "";
  bodyInput.value = "";
  addFormSection.classList.add("hidden");
  modalBackdrop.classList.add("hidden");
});

// Validasi Form
titleInput.addEventListener("input", validateForm);
bodyInput.addEventListener("input", validateForm);

function validateForm() {
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  saveBtn.disabled = title === "" || body === "";
}

displayNotes();

addBtn.addEventListener("click", () => {
  titleInput.value = "";
  bodyInput.value = "";
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

function showLoading() {
  document.getElementById("loading-indicator").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loading-indicator").classList.add("hidden");
}
