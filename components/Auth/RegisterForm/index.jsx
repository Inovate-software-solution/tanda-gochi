import React from "react";
import { useEffect, useState } from "react";

export default function RegisterForm() {
  const [registeredUser, setRegisteredUser] = useState(false);
  const [formValue, setFormValue] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const baseURL = process.env.BACKEND_API;
  const handleValueChange = (e) => {
    e.preventDefault();
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <div>
          <label className="text-primary-100 font-bold">Username:</label>
          <br />
          <input type="text" name="username" onChange={handleValueChange} />
          <br />
          <label className="text-primary-100 font-bold">Password:</label>
          <br />
          <input type="password" name="password" onChange={handleValueChange} />
          <br />
        </div>

        <div className="flex justify-center mt-10">
          <button
            className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-headline-small text-tertiary-100 "
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
