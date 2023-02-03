import React, { useState } from "react";
import { useApplicationState } from "../context/AppContext";

export interface IProfileProps {}

export default function Profile(props: IProfileProps) {
  const Provider = useApplicationState();
  const { changeBackground, updateUserName } = Provider;
  const handleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateUserName(name);
  };
  const [name,setName] = useState<string>("");
  return (
    <div className="full_main_screen">
      <form onSubmit={handleOnClick}>
        <div>
          <label htmlFor="changeColor">Change background color:</label>
          <input
            type="color"
            id="changeColor"
            onChange={(e) => changeBackground(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            id="userName"
            placeholder="Kobe Bryant"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button disabled={name === ""} type="submit">Change name</button>
      </form>
    </div>
  );
}
