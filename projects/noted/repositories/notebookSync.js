const onenoteApi = require("./onenoteApi");

module.exports = async function sync(){
    let res = await onenoteApi.send("https://graph.microsoft.com/v1.0/me/onenote/pages?pagelevel=true");
    return res.data;
}