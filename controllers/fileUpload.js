const File = require("../models/File");
const cloudinary = require("cloudinary").v2

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

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};

    if(quality) {
        options.quality = quality;
    }

    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}
//image upload ka handler

exports.imageUpload = async (req, res) => {
    try {
        const {name, tags, email} = req.body;

        const file = req.files.imageFile; // here imageFile represents the key 
        console.log(file);

        //Validation
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }

        //file format supported
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

          //db mei entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageURL:response.secure_url,
          });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'File uploaded to cloudinary successfully',
          });

    } catch (error) {
        return res.status(400).json({
                success:false,
                message:'Something went wrong'
            });
    }
}


exports.videoUpload = async (req, res) => {
    try {
        const {name, tags, email} = req.body;

        const file = req.files.videoFile;

        console.log(file);

        //Validation
        const supportedTypes = ["mp4", "mov"];
        const fileType = file.name.split('.')[1].toLowerCase();

        //Add uperlimit of 5MB
        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }

        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

          //db mei entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            videoUrl:response.secure_url,
          });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'Video uploaded to cloudinary successfully',
          });


    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something went wrong'
        });
    }
}

exports.imageSizeReducer = async (req, res) => {
    try {
        const {name, tags, email} = req.body;

        const file = req.files.imageFile; // here imageFile represents the key 
        console.log(file);

        //Validation
        const supportedTypes = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success:false,
                message:'File format not supported'
            });
        }

        //file format supported
        const response = await uploadFileToCloudinary(file, "codehelp", 30);
        console.log(response);

          //db mei entry save krni h
        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl:response.secure_url,
          });

        res.json({
            success:true,
            imageUrl:response.secure_url,
            message:'File uploaded to cloudinary successfully',
          });



    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something went wrong'
        });
    }
}