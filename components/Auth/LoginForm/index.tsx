import { use, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/store/store";
import { setUserData } from "@/store/reducers/userSlice";
import axios from "axios";

interface FormValues {
  username: string;
  password: string;
}

export default function LoginForm() {
  const [formValue, setFormValue] = useState<FormValues>({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const baseURL = process.env.BACKEND_API;
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted with formValue:", formValue);
    const user = {
      username: formValue.username,
      password: formValue.password,
      companyid: 1,
    };

    console.log(baseURL);
    axios
      .post(`${baseURL}/login`, user)
      .then((res) => {
        console.log(res.data);
        console.log(user);
        console.log(user.username);
        dispatch(setUserData(user.username));
        sessionStorage.setItem("username", user.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const testing = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(setUserData("Something"));
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
