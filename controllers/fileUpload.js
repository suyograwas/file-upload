const File = require("../models/file");
const cloudinary = require("cloudinary").v2;

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.status(500).json({
        status: "fail",
        message: "file format is not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload");

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      status: "success",
      data: {
        fileData,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while storing the image.",
    });
  }
};

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.videoFile;
    console.log("file", file);
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.status(500).json({
        status: "fail",
        message: "file format is not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload");

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      status: "success",
      data: {
        fileData,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while storing the video.",
    });
  }
};

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;

    file.mv(path);

    res.status(200).json({
      status: "success",
      message: "File successfully stored on server.",
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: "Facing issue while storing the file on local storage.",
    });
  }
};

exports.imageReducerUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png", "M4A"];
    const fileType = file.name.split(".").pop().toLowerCase();

    if (!isFileTypeSupported(fileType, supportedTypes)) {
      res.status(500).json({
        status: "fail",
        message: "file format is not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "FileUpload", 30);

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });
    res.status(200).json({
      status: "success",
      data: {
        fileData,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong while storing the reducer file.",
    });
  }
};
