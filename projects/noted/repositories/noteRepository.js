const axios = require("axios");

let config = {
    headers:{
        Accept:"application/json"
    }
}

class noteRepository{

    async getAllBySection(sectionId){
        try{
            let res = await axios.get(`https://graph.microsoft.com/v1.0/me/onenote/sections/${sectionId}/pages`, config);
            return res.data.value;
        }catch(err){
            return err;
        }
    };

    async getById(id){
        try{
            let res = await axios.get(`https://graph.microsoft.com/v1.0/users/me/onenote/pages/${id}`, config)
            console.log(res);
            return res.data += `<link rel="stylesheet" type="text/css" href="/noted/styling/note.css"/>`;
        }catch(err){
            return err;
        }
    };

    set accessToken(token){
        config.headers.Authorization = `${token.token_type} ${token.access_token}`
    }
}

module.exports = new noteRepository();