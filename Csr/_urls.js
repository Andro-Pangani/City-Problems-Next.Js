// local Server urls

const _url_local = {
  main: "http://localhost:3000/main",
  getSingleCase: "http://localhost:3000/getSingleCase",
  delete: "http://localhost:3000/delete",
  admin: "http://localhost:3000/admin",
  approove: "http://localhost:3000/approove",
  aqi: "http://localhost:3000/aqi",
  getUnverified: "http://localhost:3000/api/getUnverified",
  alternative: {
    upload: "http://localhost:3000/alternative/upload",
    single: {
      approove: "http://localhost:3000/alternative/singleApproove",
      delete: "http://localhost:3000/alternative/singleDelete",
    },
  },
  upload: {
    case: "http://localhost:3000/file/upload",
  },
  share: "http://localhost:3000/share",
};

const domain = "powerful-thicket-90466.herokuapp.com";

const _url_global = {
  main: `https://${domain}/main`,
  getSingleCase: `https://${domain}/getSingleCase`,
  delete: `https://${domain}/delete`,
  admin: `https://${domain}/admin`,
  approove: `https://${domain}/approove`,
  aqi: `https://${domain}/aqi`,
  getUnverified: `https://${domain}/api/getUnverified`,
  alternative: {
    upload: `https://${domain}/alternative/upload`,
    single: {
      approove: `https://${domain}/alternative/singleApproove`,
      delete: `https://${domain}/alternative/singleDelete`,
    },
  },
  upload: {
    case: `https://${domain}/file/upload`,
  },
  share: `https://${domain}/share`,
};

const dev = process.env.NODE_ENV !== "production" ? true : false;
console.log(process.env.NODE_ENV, "############################## node env");

// changes from master branch ;)1.

export const _url = _url_global;
// export const _url = _url_local;

// export const _url = {
//   main: "https://hiddenwood.herokuapp.com/main",
//   delete: "http://localhost:5000/delete",
//   admin: "http://localhost:5000/admin",
//   approove: "http://localhost:5000/approove",
//   aqi: "https://hiddenwood.herokuapp.com/aqi",
//   alternative: {
//     upload: "http://localhost:5000/alternative/upload",
//     single: {
//       approove: "http://localhost:5000/alternative/singleApproove",
//       delete: "http://localhost:5000/alternative/singleDelete",
//     },
//   },
//   upload: {
//     case: "http://localhost:5000/file/upload",
//   },
// };
