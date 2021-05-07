const onenoteApi = require("./onenoteApi");

class notebookRepository{

    async getAll(){
        try{
            let res = await onenoteApi.send("https://graph.microsoft.com/v1.0/me/onenote/notebooks/");
            return res.data.value;
        }catch(err){
            return err;
        }
    };

    async getSections(notebookId){
        try{
            let res = await onenoteApi.send(`https://graph.microsoft.com/v1.0/users/me/onenote/notebooks/${notebookId}/sections?$select=displayName,id`);
            return res.data.value;
        }catch(err){
            return err;
        }
    };

    async getById(id){
        try{
            let res = await onenoteApi.send(`https://graph.microsoft.com/v1.0/users/me/onenote/notebooks/${id}`)
            return res.data;
        }catch(err){
            return err;
        }
    };
}

module.exports = new notebookRepository();