//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.post("/success", function (req, res) {
    res.redirect("/");
});

app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const yourUrl = "your Url";
    const options = {
        method: "POST",
        auth: "txt:yourAPI_KEY"
    };
    const request = https.request(yourUrl, options, function (response) {

        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }

    });

    request.write(jsonData);
    request.end();
});


app.listen(process.env.PORT ||  4000, function () {
    console.log("Server is running on port 4000");
});