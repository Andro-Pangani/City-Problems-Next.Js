const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
const multer = require("multer");
const path = require("path");

exports.minimize = async (req, res, next) => {
  (async () => {
    const files1 = await imagemin(["./uploads/*.{jpg,png}"], {
      destination: _url,
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

//                * * * firebase storage * * *

const _url = path.join(process.cwd(), "/uploads/");

const myStorage = multer.diskStorage({
  // if FUNCTIONS HERE '/tmp/uploads/

  destination: function (req, file, cb) {
    // console.log(req, file, " < < < multer");
    cb(null, _url);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const myMulter = multer({
  storage: myStorage,
});
// - - -

//                   * * * firebase storage end initialization * * *

// - limiting files
exports.multerMiddleware = myMulter.array("MyFile", 3);
