async function getNotebooks(){
    const notebooks = await fetch("noted/notebook");
    return notebooks.json();
}

async function getSections(notebookId){
    const sections = await fetch(`noted/notebook/${notebookId}/sections`)
    return sections.json();
}

async function getNotesList(sectionId){
    const notes = await fetch(`noted/section/${sectionId}/notes`);
    return notes.json()
}

async function getNote(noteId){
    const note = await fetch(`noted/note/${noteId}`);
    return note.text();
}