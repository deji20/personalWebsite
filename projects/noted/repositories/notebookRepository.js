const axios = require("axios");
const accessToken = require("../authentication/accessToken");
const notebook = require("../models/section");

let config = {
    headers:{
        Accept:"application/json"
    }
}

class notebookRepository{

    async getAll(){
        try{
            let res = await axios.get("https://graph.microsoft.com/v1.0/me/onenote/notebooks/", config);
            let sections = res.data.value.map((item) => parse(item));
            return sections
        }catch(err){
            return err;
        }
    };

    async getById(id){
        try{
            let res = await axios.get(`https://graph.microsoft.com/v1.0/users/me/onenote/notebooks/${id}`, config)
            return res.data;
        }catch(err){
            return err;
        }
    };

    set accessToken(token){
        config.headers.Authorization = `${token.token_type} ${token.access_token}`
    }
}

function parse(unparsed){
    return new notebook(unparsed.displayName, unparsed.id);
}

module.exports = new notebookRepository();