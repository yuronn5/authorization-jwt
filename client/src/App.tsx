import { useContext, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import { useState } from "react";
import UserService from "./services/UserService";

function App() {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, []);

  async function getUsers() {
    try {
      const responce = await UserService.fetchUsers();
      setUsers(responce.data);
    } catch (error) {
      console.log(error);
    }
  }

  if (store.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div>
      <h1>
        {store.isAuth
          ? `User ${store.user.email} authorized`
          : "Not authorized"}
      </h1>
      <h1>{store.user.isActivated ? "Account Activated" : "Account Not activated"}</h1>
      <button onClick={() => store.logout()}>Logout</button>
      <div>
        <button onClick={getUsers}>Get users</button>
      </div>
      {users.map((u) => (
        <div key={u.email}>{u.email}</div>
      ))}
    </div>
  );
}

export default observer(App);
