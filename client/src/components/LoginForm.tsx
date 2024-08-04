import React, { FC } from "react";
import { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        value={email}
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={() => console.log(email, password)}>Login</button>
      <button onClick={() => console.log(email, password)}>Register</button>
    </div>
  )
};

export default LoginForm;
