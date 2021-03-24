const axios = require("axios");
const { URLSearchParams } = require("url");
const querystring = require("querystring");
const router = require("express").Router();

let queryParams = {
  client_id: process.env.ONENOTE_CLIENT_ID,
  client_secret: process.env.ONENOTE_CLIENT_SECRET,
  response_type:"code",
  redirect_uri:process.env.ONENOTE_REDIRECT_URI,
  response_mode:"query",
  scope:"notes.read user.read notes.read.all",
  state:12345,
}

let url = process.env.ONENOTE_AUTH_ENDPOINT + querystring.stringify(queryParams);
router.get("/", (req, res) => {
  axios.post(url)
  .then((response) => {
    res.redirect(response.config.url);
  })
  .catch(err => {
    console.log(err)
  });
});

router.get("/success", (req, res) => {
  console.log("success");
  res.redirect("/");
});

module.exports = router