const File = require("../models/File");


exports.localFileUpload = async (req, res) => {
    try {
        
        //fetch file
        const file = req.files.file;
        console.log("File aagyi", file)

        //kis path pr store krna chate ho server pr
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;

        file.mv(path, (err) => {  //kha move krna h
            console.log(err);
        });
        
        res.json({
            success:true,
            message:'Local file uploaded successfully'
        })
        
    } catch (error) {
        console.log(error);
    }
}
