import { SIGN_IN_USER } from "@/constant/api";
import { postFetch } from "@/lib/api";
import { useState } from "react";
import { useMutation } from "react-query";

export default function Test() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, mutate } = useMutation<
    any,
    any,
    { email: string; password: string }
  >((data) =>
    postFetch({
      url: SIGN_IN_USER,
      body: data,
    }),
  );

  const handleFetchData = () => {
    mutate({
      email,
      password,
    });
  };

  console.log("data", data);

  return (
    <div>
      <h1>test</h1>
      <label htmlFor="email">email</label>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
        id="email"
        name="email"
      />
      <label htmlFor="password">password</label>
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        value={password}
        id="password"
        name="password"
      />
      {data && <p>{data.user.email} user successfully signed in</p>}

      <button onClick={handleFetchData}>fetch data</button>
    </div>
  );
}
