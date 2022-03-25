const express = require("express");
const router = express.Router();
const venom = require("venom-bot");
let qrCode = null;

venom
  .create(
    //session
    "sessionName",
    (base64Qrimg) => {
      qrCode = base64Qrimg;
    },
    (statusSession, session) => {
      console.log("Status Session: ", statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
      //Create session wss return "serverClose" case server for close
      console.log("Session name: ", session);
    },
    {
      puppeteerOptions: { args: ["--no-sandbox", "--disable-setuid-sandbox"] }, // Will be passed to puppeteer.launch
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}

router.get("/", async (req, res) => {
  try {
    res.send(qrCode);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
