import axios from "axios";

export const loginUser = async (user, password) => {
  const { data } = await axios.post("/api/login", { user, password });

  console.log(data, " from login function");
  return data;
};

export const loginUserGet = async () => {
  const { data } = await axios.get("/api/login");

  console.log(data, " from login User Get");

  return data;
};

export const logoutUser = async () => {
  const { data } = await axios.post("/api/logout", { logout: true });
  console.log(data, " from logOut function");

  return data;
};

// CHANGE CREDENTIALS ==> ==> ==>

export const changeAdminsName = async (name, id) => {
  const { data } = await axios.post("/api/changeAdminsName", {
    id: id,
    name: name,
  });

  console.log(data, "###### FROM CHANGE ADMINS name");
  return data;
};

export const changeAdminsPassword = async (password, id) => {
  const { data } = await axios.post("/api/changeAdminsPassword", {
    id: id,
    password: password,
  });

  console.log(data, "###### FROM CHANGE ADMINS password");
  return data;
};

// <== <== <==

// CREATE NEW ADMIN ==> ==> ==>
export const CreateNewAdmin = async (name, password) => {
  const { data } = await axios.post("/api/createNewAdmin", {
    name: name,
    password: password,
  });

  console.log(data, "###### FROM CREATE NEW ADMIN ");
  return data;
};
// <== <== <==

// GET ALL ADMINS =>> ==> ==>
export const getAllAdmins = async (id) => {
  const { data } = await axios.post("/api/getAllAdmins", {
    id: id,
  });

  console.log("############ data from all admins", data);
  return data;
};

// <== <== <==

// CREATE NEW ==> ==> ==>

export const createNewAdmin = async (name, password) => {
  const { data } = await axios.post("/api/admin/createNewAdmin", {
    name: name,
    password: password,
  });

  console.log("##### data from Create Admin ");

  return data;
};

// <== <== <==

// DELETE ADMIN ==> ==> ==>

export const deleteAdmin = async (id) => {
  const { data } = await axios.post("/api/admin/deleteAdmin", {
    id: id,
  });

  console.log("##### data from Create Admin ");

  return data;
};

// <== <== <==
