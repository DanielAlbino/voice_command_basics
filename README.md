# Voice Command App - Basic code
This is the most basic code for you to start developing your voice controller app.

The Javascript API for speech recognition makes the voice manipulation easier for web pages. The only requirement for that and especially when using google chrome browser is the web page should be served in a secure protocol (HTTPs).

#Installation

First of all lets create our folder

```bash
  mkdir voice_command
```

Now that we have our folder created lets go and use Node.js to creade our secure localhost

**Initialize the npm**

```bash
  npm init
```

now let's install express and https

```bash
  npm install https express
```

**Create private keys**

we have to generate the **privatekey.pem** and **certificate.pem** files. for that you must have Openssl in your computer.
if you don't have just go to: https://www.openssl.org/ and download the tar.gz file and extracted, than you have to go to your prompt and go to the folder where you have your opensll files e.g **cd c/openssl/bin** than you can use the following commands:

```bash
  openssl genrsa -out privatekey.pem 1024 
  openssl req -new -key privatekey.pem -out certrequest.csr 
  openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```

# Creating the server

Now let's create our server, first you have to create the **server.js** file and than insert the following code

```bash
var fs = require("fs");
var https = require('https');
var express = require('express');


var app = express();
app.use(express.static(__dirname + '/public'));


var privateKey = fs.readFileSync('privatekey.pem').toString();
var certificate = fs.readFileSync('certificate.pem').toString();

var httpOptions = {key: privateKey, cert: certificate};

https.createServer(httpOptions, app).listen(8000, () => {
console.log(">> Serving on " + 8000);
console.log("link: https://localhost:8000");
});
  app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

```
now that we have our server file created we now need to create the **public** folder and than create the file **index.html** inside.
In the **index.html** we will create our main page and call the js files that we are going to create next.

```bash 
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Speech recognition video control</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>
    Configured commands to say: <br>
    - Google <br>
    - Facebook <br>
    <script src='main.js'></script>
  </body>
</html>
```

# Creating JS files

Like I said previously we need to create the **main.js** file

**main.js**

```bash
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      if (event.results[i][0].transcript.trim().toLowerCase() == "google") {
        window.open('https://www.google.pt/', '_blank');
      }
      if (event.results[i][0].transcript.trim().toLowerCase() == "facebook") {
        window.open('https://www.facebook.com/', '_blank');
      }
      console.info(`You said : ${event.results[i][0].transcript}`);
      alert(`You said : ${event.results[i][0].transcript}`)
    }
  }
};
```
now that you have your app created let's start the app.

```bash
  node server.js
```

