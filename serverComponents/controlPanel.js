import { useEffect, useRef, useState } from "react";
import {
  changeAdminsName,
  changeAdminsPassword,
  createNewAdmin,
  getAllAdmins,
  deleteAdmin,
} from "../Csr/Components/functions/loginUser";

// ADMIN LIST ITEM COMPONENT ==> ==> ==>
const AdminItemComponent = ({ admin }) => {
  const handleDeleteAdmin = (e) => {
    e.preventDefault();
    console.log(admin);
    deleteAdmin(admin.id).then((response) => {
      console.log(admin, "input <-> res", response);
    });
  };

  return (
    <form onSubmit={handleDeleteAdmin}>
      <span className="name">Name</span>
      <span className="name_value">{admin.name}</span>
      <span className="">
        <input type="hidden" value={admin.id} />
        <input type="submit" value="delete" />
      </span>
    </form>
  );
};
// <== <== <==

export const ChangeCredentials = ({ profile, updatePage }) => {
  const cred_InputNameRef = useRef(null);
  const cred_InputPasswordRef = useRef(null);

  const [usersList, setUsersList] = useState({
    admins: [],
    error: "",
  });

  const [currentProfile, setCurrentProfile] = useState({
    name: "",
    id: "",
  });

  // [HANDLE CHANGE CREDENTIALS] <START>
  // ==> ==> ==> ==> ==> ==> ==>

  const [newName, setNewName] = useState({ value: "" });

  const [newPassword, setNewPassword] = useState({ value: "" });

  const [credInputs, setCredInputValues] = useState({
    name: {
      active: false,
    },
    password: {
      active: false,
    },
  });

  const handleChangeCredentials = (e) => {
    console.log(e.target.name, " target");
    if (e.target.name === "name") {
      setCredInputValues({
        ...credInputs,
        name: { active: true },
      });
      setNewName({
        value: e.target.value,
      });
    }

    if (e.target.name === "password") {
      setNewPassword({
        value: e.target.value,
      });
    }
  };

  const handleChangeNameSubmit = (e) => {
    e.preventDefault();
    changeAdminsName(newName.value, currentProfile.id).then((res) => {
      console.log(res, " RESPONSE FROM CHANGE NAME HANDLER");
      updatePage();
      cred_InputNameRef.current.value = "";
    });
    console.log(newName);
  };

  const handleChangePasswordSubmit = (e) => {
    e.preventDefault();
    changeAdminsPassword(newPassword.value, currentProfile.id).then((res) => {
      console.log(res, " RESPONSE FROM CHANGE PASSWORD HANDLER");
      updatePage();

      cred_InputPasswordRef.current.value = "";
    });
    console.log(newPassword);
  };

  //  <== <== <== <== <== <==
  // HANDLE CHANGE CREDENTIALS <END>

  // /////- CREATE NEW ADMIN - <START>
  // ==> ==> ==> ==> ==> ==> ==>

  const [newAdmin, setNewAdmin] = useState({
    name: "",
    password: "",
  });

  const handleChangeNewAdmin = (e) => {
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const handleNewAdminSubmit = (e) => {
    e.preventDefault();
    createNewAdmin(newAdmin.name, newAdmin.password).then((response) => {
      console.log(response, " ### from create new admin front");
    });
  };
  // <== <== <== <== <== <==

  //  DELETE ADMIN
  // ==> ==> ==> ==> ==> ==> ==>

  // <== <== <==

  useEffect(() => {
    if (currentProfile !== profile) {
      setCurrentProfile(profile);
    }

    console.log("########## USEFFECT FROM CONTROL PANEL");
  }, [profile]);

  const getAllAdminsHandler = () => {
    if (currentProfile.status === "creator") {
      getAllAdmins(currentProfile.id).then((response) => {
        console.log(" ######## CREATOR", response.data);
        setUsersList({
          admins: response.data.admins,
          error: response.data.error,
        });
      });
    }
  };

  return (
    <div className="change_credentials_component">
      <div className="change_credentials_container">
        <ul className="change_credentials_list">
          <li className="change_credentials_list-item">
            {/* CHANGE CREDENTIALS NAME */}
            <form onSubmit={handleChangeNameSubmit}>
              <span className="change_credentials-name">Name</span>
              <span className="change_credentials-name_input">
                <input
                  onChange={handleChangeCredentials}
                  type="text"
                  placeholder="enter new name"
                  name="name"
                  ref={cred_InputNameRef}
                />
              </span>
              <span className="change_credentials-name_button">
                <input type="submit" value="change" />
              </span>
            </form>
          </li>
          <li className="change_credentials_list-item">
            {/* CHANGE CREDENTIALS PASSWORD */}
            <form onSubmit={handleChangePasswordSubmit}>
              <span className="change_credentials-password">Password</span>
              <span className="change_credentials-password_input">
                <input
                  onChange={handleChangeCredentials}
                  type="text"
                  placeholder="enter new password"
                  name="password"
                  ref={cred_InputPasswordRef}
                />
              </span>
              <span className="change_credentials-password_change">
                <input type="submit" value="change" />
              </span>
            </form>
          </li>
        </ul>
      </div>

      {currentProfile.status === "creator" ? (
        <div className="creators_admin_panel">
          {/* ALL ADMINS SECTION */}

          <header className="creator_panel_header">
            <h2 className="creator_panel_title">List of admins</h2>
            <input
              type="button"
              value="Get all admins"
              onClick={getAllAdminsHandler}
            />
          </header>

          {usersList.admins.length !== 0 ? (
            <ul className="admins_list">
              {usersList.admins.map((admin, index) => {
                return (
                  <li key={index} className="admins_list_item">
                    {/* ALL ADMINS FORM */}

                    <AdminItemComponent admin={admin} />
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className="generate_section">
            <div className="title">Create new Admin</div>
            {/* CREATE NEW ADMIN SECTION */}
            <form onSubmit={handleNewAdminSubmit}>
              <ul className="generate_list">
                <li className="generate_list-item">
                  <span>Name</span>
                  <input
                    onChange={handleChangeNewAdmin}
                    name="name"
                    type="text"
                  />
                </li>
                <li className="generate_list-item">
                  <span>Password</span>
                  <input
                    onChange={handleChangeNewAdmin}
                    name="password"
                    type="password"
                  />
                </li>
              </ul>
              <input type="submit" value="create" />
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};
