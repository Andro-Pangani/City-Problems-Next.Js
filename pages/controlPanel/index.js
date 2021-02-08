import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import {
  loginUser,
  loginUserGet,
  logoutUser,
} from '../../Csr/Components/functions/loginUser';
import { ChangeCredentials } from '../../serverComponents/controlPanel';

export default function Login() {
  const [form, updateForm] = useState({
    user_name: '',
    user_password: '',
  });

  const [logged, setLogged] = useState(false);
  const [message, setMessage] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    id: undefined,
    logged: false,
    status: null,
  });

  const updatePage = () => {
    loginUserGet().then((data) => {
      let user = data.user;

      setProfile({
        name: user.name,
        id: user.id,
        logged: user.logged,
        status: user.status,
      });
      setLogged(user.logged);
    });
  };

  useEffect(() => {
    updatePage();
  }, []);

  const handleChange = (e) => {
    updateForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(form.user_name, form.user_password).then((data) => {
      console.log(data, ' RESPONSE FROM FORM DATA');
      setMessage(data.message);
      updatePage();
    });

    updateForm({
      user_name: '',
      user_password: '',
    });
  };

  const backToHomeHandler = () => {
    Router.push('/');
  };

  const logoutHandler = () => {
    logoutUser().then((data) => {
      updatePage();
    });
  };

  return (
    <div className="login_component">
      <div className="login_component_container">
        {!logged ? (
          <form className="admin_login_form" onSubmit={handleSubmit}>
            <ul className="admin_login_form_items_list">
              <li className="admin_login_form_item">
                <label>
                  USER
                  <input
                    type="text"
                    name="user_name"
                    placeholder="username"
                    onChange={handleChange}
                    value={form.user_name}
                  />
                </label>
              </li>
              <li className="admin_login_form_item">
                <label>
                  PASSWORD
                  <input
                    type="password"
                    value={form.user_password}
                    name="user_password"
                    placeholder="password"
                    onChange={handleChange}
                  />
                </label>
              </li>
              <input type="submit" value="Log in" />
            </ul>
          </form>
        ) : (
          <div className="logged_user_component">
            <h1 className="logged_user-name">Hi {profile.name} !</h1>
            <h2 className="logged_user-status">
              Status:{' '}
              <span className="user_status_value">{profile.status}</span>{' '}
            </h2>

            <ChangeCredentials profile={profile} updatePage={updatePage} />
            <div className="logout_component">
              <button className="logout_button" onClick={logoutHandler}>
                Log out
              </button>
            </div>
          </div>
        )}
        <div className="back_to_home_section">
          <button className="back_to_home_button" onClick={backToHomeHandler}>
            to Home
          </button>
        </div>
        <div className="login_page-message">{message}</div>
      </div>
    </div>
  );
}
