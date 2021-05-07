const axios = require("axios");
const querystring = require("querystring");
const router = require("express").Router();
const onenoteConfig = require(`${__basedir}/appsetting.development.json`).Noted.OnenoteApi;
const fs =  require("fs")


let queryParams = {
  client_id: onenoteConfig.ClientId,
  client_secret: onenoteConfig.ClientSecret,
  response_type:"code",
  redirect_uri:onenoteConfig.RedirectUri,
  response_mode:"query",
  scope:"notes.read user.read notes.read.all offline_access",
  state:12345,
}

router.getToken = async () => {
  let token = JSON.parse(fs.readFileSync(__dirname + "/token.json"))
  if(token.access_token && Date.now() < token.expiration_time){
    return token;
  }else if(token.refresh_token){
    token = await refreshToken(token)
    fs.writeFileSync(__dirname +"/token.json", JSON.stringify(token));
    return token;
  }else{
    throw new Error("Invalid Token");
  }
}
router.get("/", async (req, res) => {
  let url = onenoteConfig.AuthEndpoint + querystring.stringify(queryParams);
  
  let response = await axios.get(url)
  res.redirect(response.config.url)
});

router.get("/success", async (req, res) => {
    let response = await getAccessToken(req.query.code)
    
    response.data.expiration_time = Date.now() + response.data.expires_in * 1000
    fs.writeFileSync(__dirname +"/token.json", JSON.stringify(response.data));
    res.redirect("/noted");
});


async function getAccessToken(accessCode) {
    let queryParams = {
      client_id: onenoteConfig.ClientId,
      client_secret: onenoteConfig.ClientSecret,
      response_type:"code",
      redirect_uri:onenoteConfig.RedirectUri,
      response_mode:"query",
      grant_type:"authorization_code",
      code:accessCode,
      scope:"notes.read user.read notes.read.all offline_access",
      state:12345,
    }
    let url = onenoteConfig.TokenEndpoint;
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    let response = await axios.post(url, querystring.stringify(queryParams), config)
    return response 
}

async function refreshToken(token){
  console.log("refreshing Token")
  let queryParams = {
    grant_type:"refresh_token",
    client_id: onenoteConfig.ClientId,
    client_secret: onenoteConfig.ClientSecret,
    redirect_uri:onenoteConfig.RedirectUri,
    refresh_token:token.refresh_token
  }
  let url = onenoteConfig.RefreshEndpoint;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  let response = await axios.post(url, querystring.stringify(queryParams), config);
  response.data.expiration_time = Date.now() + response.data.expires_in * 1000
  return response.data;
};

module.exports = router