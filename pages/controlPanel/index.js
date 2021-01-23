export default function Login() {
  return (
    <div className="login_component">
      <form className="admin_login_form">
        <ul className="admin_login_form_items_list">
          <li className="admin_login_form_item">
            <label for="user_name">User</label>
            <input type="text" name="user_name" placeholder="username" />
          </li>
          <li className="admin_login_form_item">
            <label for="user_password">Pasword</label>
            <input type="text" name="user_password" placeholder="password" />
          </li>
          <input type="submit" />
        </ul>
      </form>
    </div>
  );
}
