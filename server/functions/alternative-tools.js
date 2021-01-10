const multer = require("multer");
const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const path = require("path");

const myStorage = multer.diskStorage({
  // if FUNCTIONS HERE '/tmp/uploads/

  destination: function (req, file, cb) {
    // console.log(req, file, " < < < multer");
    cb(null, filesTempFolder);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const myMulter = multer({
  storage: myStorage,
});

// - setting Current working directory path into _url variable
const filesTempFolder = path.join(process.cwd(), "/uploads/");

//   -  -  -  EXPORTS  -  -  -

// - limiting files
exports.multerMiddleware = myMulter.array("MyFile", 3);

exports.minimize = (req, res, next) => {
  (async () => {
    const files1 = await imagemin(["./uploads/*.{jpg,png}"], {
      destination: filesTempFolder,
      plugins: [
        imageminMozjpeg({
          quality: 30,
        }),
        imageminPngquant({
          quality: [0.6, 0.8],
        }),
      ],
    }).catch((err) => {
      console.log("<<<<<<<< ERROR with Compressing files >>>>>>>", err);
    });

    next();
  })();
};
