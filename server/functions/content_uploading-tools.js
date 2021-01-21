const imagemin = require("imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imageminMozjpeg = require("imagemin-mozjpeg");
var ffmpeg = require("ffmpeg");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.minimizeVideo = (req, res, next) => {
  try {
    if (fs.existsSync(_url_videos)) {
      fs.readdirSync(_url_videos).forEach((file) => {
        console.log(
          _url_videos,
          file,
          '##<-path->####>-file-################|"||||||||||#### File from videos'
        );

        //minimizer
        try {
          let process = new ffmpeg(path.join(_url_videos, file));

          process.then((video) => {
            console.log(" @@@@@@@@@@@@ VIDEO IS REDY ");
            // FFmpeg configuration
            console.log(" @@@@@@@@@@@@ VIDEO IS REDY  - end -");
            video
              .setVideoBitRate(1024)
              .save(path.join(_url_videos, file), (error, file) => {
                if (error) {
                  console.log("@@@@@@@ ERROR FROM FMPEG SAVE", error);
                }
              });
          });
        } catch (err) {
          console.log(err, " @@@@@@@@@@@ errror from ffmpeg");
        }
      });
    } else {
      console.log('||||||| folder doesn exist bro "" from video minim');
    }

    next();
  } catch (err) {
    console.log(err, " ####### error form video minimizer content uploading");
    next();
  }
};

exports.minimize = async (req, res, next) => {
  (async () => {
    const files1 = await imagemin(["./uploads/images/*.{jpg,png}"], {
      destination: _url_images,
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

let _url_images = path.join(process.cwd(), "/uploads/images/");
let _url_videos = path.join(process.cwd(), "/uploads/videos/");
let _url = _url_images;

const myStorage = multer.diskStorage({
  // if FUNCTIONS HERE '/tmp/uploads/

  destination: function (req, file, cb) {
    switch (file.mimetype) {
      case "image/jpeg":
      case "image/png":
      case "image/jpg":
        _url = _url_images;
        break;
      case "video/mp4":
        _url = _url_videos;
        break;
      default:
        break;
    }
    // console.log(file, " < < < ###################### REQ, FILE FROM MULTER,");
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
