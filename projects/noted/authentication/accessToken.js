const axios = require("axios");
const querystring = require("querystring");
const router = require("express").Router();
const onenoteConfig = require("../noted.development.settings.json").OnenoteConfig;
const fs =  require("fs")
let token = require("./token.json");


let queryParams = {
  client_id: onenoteConfig.ClientId,
  client_secret: onenoteConfig.ClientSecret,
  response_type:"code",
  redirect_uri:onenoteConfig.RedirectUri,
  response_mode:"query",
  scope:"notes.read user.read notes.read.all",
  state:12345,
}

router.getToken = () => {
  let token = JSON.parse(fs.readFileSync(__dirname + "/token.json"))
  if(token.access_token && Date.now() < token.expiration_time){
    return token;
  }else{
    throw new Error("Invalid Token");
  }
}
router.get("/", (req, res) => {
  let url = onenoteConfig.AuthEndpoint + querystring.stringify(queryParams);
  
  axios.get(url)
  .then((response) => {
    res.redirect(response.config.url);
  })
  .catch((err) => {
    res.send(err);
  });
});

router.get("/success", (req, res) => {
    getAccessToken(req.query.code)
    .then((response) => {
      response.data.expiration_time = Date.now() + response.data.expires_in * 1000
      fs.writeFileSync(__dirname +"/token.json", JSON.stringify(response.data));
      res.redirect("/noted");
    })
    .catch((err) => {
      res.send(err)
    });
});


function getAccessToken(accessCode) {
  return new Promise((resolve, reject) => {
    let queryParams = {
      client_id: onenoteConfig.ClientId,
      client_secret: onenoteConfig.ClientSecret,
      response_type:"code",
      redirect_uri:onenoteConfig.RedirectUri,
      response_mode:"query",
      grant_type:"authorization_code",
      code:accessCode,
      scope:"notes.read user.read notes.read.all",
      state:12345,
    }
    let url = onenoteConfig.TokenEndpoint;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios.post(url, querystring.stringify(queryParams), config)
    .then((response) => {
      resolve(response);
    })
    .catch((err) => {
      reject(err.response.data)
    })
  }
);
}


module.exports = router