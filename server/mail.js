const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(4000, () => {
  console.log("The server started on port 4000 !!!!!!");
});

//get route
app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Wellcome to JobStorm <br><br></h1>"
  );
});

//to send mail
app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been sent and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: 'nishanth.di.m@gmail.com', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for contacting us. Our team will review your request/query and get back to you within 24 hours.</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}
