const axios = require("axios");
const accessToken = require("../authentication/accessToken");

let config = {
    headers:{
        Accept:"application/json"
    }
}

class sectionRepository{

    async getAllByNotebook(notebookId){
        try{
            let res = await axios.get(`https://graph.microsoft.com/v1.0/users/me/onenote/notebooks/${notebookId}/sections?$select=displayName,id`, config);
            return res.data.value
        }catch(err){
            return err;
        }
    };

    async getById(id){
        try{
            let res = await axios.get(`https://graph.microsoft.com/v1.0/users/me/onenote/sections/${id}/pages/delta`, config)
            return res.data;
        }catch(err){
            return err;
        }
    };

    set accessToken(token){
        config.headers.Authorization = `${token.token_type} ${token.access_token}`
    }
}

module.exports = new sectionRepository();