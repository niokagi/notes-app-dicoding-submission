class NavBar extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <nav>
          <h1>Nioka Notes App</h1>
          <div class="nav-menus">
            <button id="add-btn">Add +</button>
          </div>
        </nav>
      `;
  }
}

class NoteModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section
        id="modal-backdrop"
        class="fixed inset-0 z-40 hidden bg-black bg-opacity-50"
      >
        <div
          class="add-form mx-auto mt-[10%] gap-3 rounded-xl border-[1.5px] bg-white px-7 py-7 shadow-md max-sm:mt-[20%] max-sm:w-[90%] sm:w-[80%] md:w-[60%] lg:w-[45%]"
          id="add-form"
        >
          <h1 class="text-xl font-bold mb-4">Write Your Note</h1>
          <form id="note-form">
            <div class="skat mb-4">
              <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                maxlength="20"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Note Title (max 20 character)"
                required
              />
            </div>
            <div class="skat mb-4">
              <label for="body" class="block text-sm font-medium text-gray-700">Body</label>
              <textarea
                name="body"
                id="body"
                rows="4"
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                placeholder="Note Body"
                required
              ></textarea>
            </div>
            <div class="mt-4 flex justify-end gap-3">
              <button type="button" id="close-btn" class="cancel-btn bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400">
                Cancel
              </button>
              <button type="submit" class="save-btn bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600" disabled>
                Save
              </button>
            </div>
          </form>
        </div>
      </section>
    `;
  }
}

class Footer extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `  
    <footer>
      <h3>< Nioka Note App /></h3>
      <h5 class="mt-2 text-sm text-gray-400">
        Copyright 2024 all right reserved
      </h5>
    </footer>`;
  }
}

customElements.define("nav-bar", NavBar);
customElements.define("note-modal", NoteModal);
customElements.define("my-footer", Footer);
