let notebookId = window.location.href.split("/").slice(-1);

let sectionRow;
let noteRow;
let navbar;

let openSection;

$(document).ready(() => {
    navbar = $("#navbar")
    sectionRow = $("#sections");
    noteRow = $("#notes");
    sectionRow.offset({top:0, left:-sectionRow.width()});
    getSections();
})

function getSections(){
    $.get(`/noted/notebook/${notebookId}/section`, (response)=>{
        sectionRow.append(response.map(createSectionButton));
        slideOut();
    });
}

function getNotesList(sectionId){
    openSection = sectionId;
    $.get(`/noted/notebook/${notebookId}/section/${sectionId}/note`, (response)=>{
        noteRow.css("display","grid");
        noteRow.empty();
        noteRow.append(response.map(createNoteButton));
    });
}

function getNotePage(noteId){
    $("#content").attr({src: `/noted/notebook/${notebookId}/section/${openSection}/note/${noteId}`});
    //$.get(`/noted/notebook/${notebookId}/section/${openSection}/note/${noteId}`, (response)=>{});
}

function createSectionButton(section){
    return $(`<button onclick="getNotesList('${section.id}')" class="ring-0 h-12 content-center text-center w-full text-white text-xs hover:shadow-inner hover:bg-blue-800">${section.displayName}</button>`)
}
function createNoteButton(note){
    return $(`<button onclick="getNotePage('${note.id}')" class="ring-0 h-12 content-center text-center w-full text-white text-xs hover:shadow-inner hover:bg-blue-800">${note.title}</button>`)
}

function slideOut(){
    slideAnimation(-sectionRow.width(), 0); 
}

function slideAnimation(pos, endpointX){
    function animate(){
        pos += 5
        sectionRow.offset({top:0, left:pos})
        if(pos < endpointX){
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate)
}

