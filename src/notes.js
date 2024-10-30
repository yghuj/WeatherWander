// Function to load notes from local storage
function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = ''; // Clear the list before loading

    notes.forEach((note, index) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        noteCard.innerHTML = `
            <h3>${note.destination}</h3>
            <p>${note.text}</p><br>
            <button onclick="editNote(${index})">Edit</button><br><br>
            <button onclick="deleteNote(${index})">Delete</button>
        `;
        notesList.appendChild(noteCard);
    });
}

// Function to add a new note
document.getElementById('add-note-button').addEventListener('click', function() {
    const destination = document.getElementById('destination').value;
    const noteText = document.getElementById('note').value;

    if (destination && noteText) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ destination, text: noteText });
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
        document.getElementById('destination').value = '';
        document.getElementById('note').value = '';
    } else {
        alert('Please enter both destination and note.');
    }
});

// Function to edit a note
function editNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const note = notes[index];
    document.getElementById('destination').value = note.destination;
    document.getElementById('note').value = note.text;

    // Remove the note after editing
    deleteNote(index);
}

// Function to delete a note
function deleteNote(index) {
    const notes = JSON.parse(localStorage .getItem('notes'));
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Load notes when the page loads
loadNotes();

function goBack() {
    window.history.back();
}