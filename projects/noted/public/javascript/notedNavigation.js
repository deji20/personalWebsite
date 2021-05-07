let navCont;
let navbar;
let contentWrap;
let navList;
let navListItems = [];

$(document).ready(() => {
    contentWrap = $("#contentWrapper");
    navbar = $("#navbar");
    navCont = $("#navContent");
    navItems = $("#navItems");
    navList = $("#navList");
    navCont.offset({left:-navCont.width()});

    showNotebooks();
})

let visible = true
function toggleNav(){
    navItems.toggle()
    if(visible){
        navbar.removeClass("w-56")
    }else{
        navbar.addClass("w-56")
    }
    visible = !visible;
}

async function showNotebooks(){
    let notebooks = await getNotebooks()
    console.log(notebooks)
    navItems.empty();
    navItems.append(notebooks.map((notebook) => { 
        const button = $(`<button onclick="showSections('${notebook.id}')" class="ring-0 h-12 content-center text-center w-full text-white text-xs hover:shadow-inner hover:bg-blue-800">${notebook.displayName}</button>`);
        button.on("click", () => {
            navListItems.push({name:notebook.displayName, id:notebook.id})
            updateNavList();
            showSections(notebook.id);
        })
        return button;
    }))
    navCont.offset({left:0})
}
async function showSections(notebookId){
    console.log(notebookId)
    const sections = await getSections(notebookId)
    navItems.empty();
    navItems.append(sections.map((section) => {
        const button = $(`<button class="ring-0 h-12 content-center text-center w-full text-white text-xs hover:shadow-inner hover:bg-blue-800">${section.displayName} </button>`)
        button.on("click", () => {
            navListItems.push({name:section.displayName, id:notebookId})
            showNotesList(section.id)
            updateNavList();
        })
        return button;
    }));
}
async function showNotesList(sectionId){
    const notes = await getNotesList(sectionId);

    //create and append buttons
    navItems.empty();
    navItems.append(notes.map(createNoteButton));
}
async function showNote(noteId){
    contentWrap.toggle();
    const note = await getNote(noteId)
    var iframe = document.getElementById('content');
    iframedoc = iframe.contentDocument || iframe.contentWindow.document;
    iframedoc.body.innerHTML = note;
}
function createNoteButton(note){
    let noteButtonWrapper = $("<div></div>")

    let mainButton = $("<button></button>");
    mainButton.addClass("ring-0 h-12 flex justify-center items-center text-center w-full text-white text-xs hover:shadow-inner ${backColor} hover:bg-blue-800")
    mainButton.append($(`<span class="w-full pl-3 text-left">${note.title}</span>`))
    mainButton.on("click", () => {
        
        let title=$("#title")
        title.text(note.title)
        title.removeClass("opacity-0")
        title.addClass("opacity-100");
        setTimeout(() => {
            title.addClass("opacity-0");
            title.removeClass("opacity-100");
        }, 5000)
        showNote(note.id);
    })
    
    if(note.children){
        let open = false;
        const expandable = $(`<div class="mr-2 h-full flex items-center"></div>`);
        const expandableImage = $(`<img class="object-cover h-1/2 duration-300 transform -rotate-90" src="/global/images/assets/arrow.png"/>`);
        expandable.append(expandableImage);

        let childrenWrapper = $("<div></div>");
        childrenWrapper.addClass("subsection");
        childrenWrapper.append(note.children.map(createNoteButton));
        expandable.on("click", () => {
            open = !open;
            if(open){
                expandableImage.addClass("rotate-0");
                expandableImage.removeClass("-rotate-90");
            }else{ 
                expandableImage.addClass("-rotate-90");
                expandableImage.removeClass("rotate-0");
            }
            expand(childrenWrapper);
        })
        
        mainButton.append(expandable);
        noteButtonWrapper.append(childrenWrapper);
    }
    noteButtonWrapper.prepend(mainButton);
    return noteButtonWrapper;
}
function expand(content){
    content = content[0];
    if (content.style.maxHeight){
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = navCont.css("height");
    } 
}

function updateNavList(){
    const navLevels = [showNotebooks, showSections, showNotesList];
    navList.empty();
    navList.append(navListItems.map((element, index) => {
        let listItem = $(`<div class="inline h-full hover:text-gray-500 cursor-pointer"></div>`)

        if(index){
            let divider = $(`<img class="object-fit h-3 inline transform -rotate-90" src="/global/images/assets/arrow.png"/> `)
            listItem.append(divider);
        }

        let span = $(`<span class="text-sm"> ${element.name} </span>`);
        listItem.append(span);
        listItem.on("click", () => {
            navLevels[index](element.id);
            navListItems.splice(index, navListItems.length);
            console.log(navListItems);
            updateNavList()
        })
        
        return listItem;
    }))
}



