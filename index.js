const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const dbConnect = require("./config/database");
const cloudinaryConnect = require("./config/cloudinary");
const cookieParser = require("cookie-parser");
const fileUploadRoutes = require("./routes/fileUploadRoutes");
require("dotenv").config();

dbConnect();
cloudinaryConnect();
app.use(express.json());
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

app.use("/api/v1/upload", fileUploadRoutes);
