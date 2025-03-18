let notes = [];

// Funções para o bloco de anotações
function loadNotesFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        notes = JSON.parse(savedNotes);
        updateNotesList();
    }
}

function saveNotesToLocalStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNotesList() {
    const notesContent = document.getElementById('notesContent');
    notesContent.innerHTML = '';

    const filterPriority = document.getElementById('filterPriority').value;

    const filteredNotes = notes.filter(note => {
        return filterPriority ? note.priority === filterPriority : true;
    });

    filteredNotes.forEach((note, index) => {
        const noteItem = document.createElement('div');
        noteItem.className = 'note-item';
        noteItem.innerHTML = `
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <h4>${note.title}</h4>
                    <p>${note.content}</p>
                    <p><small>Prioridade: ${note.priority}</small></p>
                    <p><small>Data: ${note.date}</small></p>
                </div>
                <div>
                    <button class="btn btn-sm btn-primary" onclick="editNote(${index})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteNote(${index})">Excluir</button>
                </div>
            </div>
        `;
        notesContent.appendChild(noteItem);
    });
}

function editNote(index) {
    const note = notes[index];
    document.getElementById('noteTitle').value = note.title;
    document.getElementById('noteContent').value = note.content;
    document.getElementById('notePriority').value = note.priority;
    document.getElementById('noteDate').value = note.date;

    notes.splice(index, 1);
    updateNotesList();
    saveNotesToLocalStorage();
}

function deleteNote(index) {
    notes.splice(index, 1);
    updateNotesList();
    saveNotesToLocalStorage();
}

document.getElementById('noteForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    const priority = document.getElementById('notePriority').value;
    const date = document.getElementById('noteDate').value;

    const newNote = {
        title,
        content,
        priority,
        date
    };

    notes.unshift(newNote);
    updateNotesList();
    saveNotesToLocalStorage();
    this.reset();
});

// Adiciona a função ao escopo global
window.notesPage = {
    loadNotesFromLocalStorage: loadNotesFromLocalStorage
};

// Carrega as anotações ao iniciar
loadNotesFromLocalStorage();