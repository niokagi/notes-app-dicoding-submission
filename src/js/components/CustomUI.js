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
            class="add-form mx-auto mt-[10%] gap-3 rounded-xl border-[1.5px] bg-white px-7 py-7 shadow-md max-sm:mt-[20%] max-sm:w-[65%] sm:w-[60%] md:w-[55%] lg:w-[45%]"
            id="add-form"
          >
            <h1>Write Your Note</h1>
            <form action="">
              <div class="skat">
                <label for="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Note Title"
                />
              </div>
              <div class="skat">
                <label for="body">Body</label>
                <textarea
                  name="body"
                  id="body"
                  placeholder="Note Body"
                ></textarea>
              </div>
              <div class="mt-3 flex justify-end gap-3">
                <button type="button" id="close-btn" class="cancel-btn">
                  Cancel
                </button>
                <button type="submit" class="save-btn bg-green-500" disabled>
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
