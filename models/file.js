const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    // console.log("document", doc);

    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: "suyog-rawas",
      to: doc.email,
      subject: "New file uploaded on clodinary",
      html: `<h1>File successfully uploaded <h1/> File Uploaded View Here:  <a href=${doc.imageUrl}> ${doc.imageUrl}<a/>`,
    });
    // console.log("INFO", info);
  } catch (err) {
    console.log(err);
  }
});

module.exports = mongoose.model("File", fileSchema);
