const onenoteApi = require("./onenoteApi");

class noteRepository{

    async getById(id){
        try{
            let res = await onenoteApi.send(`https://graph.microsoft.com/v1.0/users/me/onenote/pages/${id}/content`)
            return res.data;
        }catch(err){
            return err;
        }
    };
}

module.exports = new noteRepository();