const onenoteApi = require("./onenoteApi");

class sectionRepository{
    async getNotes(sectionId){
        try{
            let res = await onenoteApi.send(`https://graph.microsoft.com/v1.0/me/onenote/sections/${sectionId}/pages?limit=50&pagelevel=true`);
            return formatNotes(res.data.value);
        }catch(err){
            return err;
        }
    };

    async getById(id){
        try{
            let res = await onenoteApi.send(`https://graph.microsoft.com/v1.0/users/me/onenote/sections/${id}/pages/delta`)
            return res.data;
        }catch(err){
            return err;
        }
    };
}

function formatNotes(notes){
    let parentNote = notes[0];
    return notes.sort((noteA, noteB) => {
        return noteA.order - noteB.order
    }).filter((note) => {
        console.log(parentNote.level - note.level);
        //if note is direct subsection of parentNote add as child else if 
        if(parentNote.level - note.level === -1){
            if(parentNote.children){
                parentNote.children.push(note);
            }else{
                parentNote.children = [note];
            }
        }
        else if( parentNote.level - note.level < -1){
            parentNote = parentNote.children[parentNote.children.length - 1]
            if(parentNote.children){
                parentNote.children.push(note);
            }else{
                parentNote.children = [note];
            }
        }
        else{
            returnedNote = parentNote;
            parentNote = note;
            return returnedNote;
        }
    })
}

module.exports = new sectionRepository();