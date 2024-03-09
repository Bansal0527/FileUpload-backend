const mongoose = require("mongoose");
const nodemailer = require("nodemailer")
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
    },
    imageURL: {
        type:String,
    },
    tags: {
        type:String,
    }
});

//post middleware
fileSchema.post("save", async function(doc) {
    try {
        console.log("DOC",doc);

        //transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        //send mail
        let info = await transporter.sendMail({
            from:`Mayank`,
            to:doc.email,
            subject:"New file Uploaded on Cloudinary",
            html:`<h2>Hello</h2> <p>File Uploaded</p>`,
        })

        console.log("INFO: ", info);
    } catch (error) {
        console.log(error);
    }
})
  
const File = mongoose.model("File", fileSchema);

module.exports = File;
