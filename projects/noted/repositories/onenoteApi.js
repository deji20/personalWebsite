const axios = require("axios");

let config = {
    headers:{
        Accept:"application/json"
    }
}

class onenoteApi{
    async send(endpoint){
        console.log("sending")
        console.log(endpoint);
        try{
            let res = await axios.get(endpoint, config);
            return res;
        }catch(err){
            console.log(err.data);
            return err;
        }
    };

    set accessToken(token) {
        config.headers.Authorization = `${token.token_type} ${token.access_token}`
    }
}

module.exports = new onenoteApi();


