import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function LoginForm(props) {
  return (
    <div className="">
      <form>
        <div>
          {/* Email section */}
          <div>
            <label className="text-primary-100 font-bold">Email:</label>
            <br />
            <input
              className="w-full p-1 border-1 border-black"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              disabled={loggingIn}
            />
          </div>
          {/* Password section */}
          {loggingIn ? (
            <div>
              <br />
              <label className="text-primary-100 font-bold">Password:</label>
              <br />
              <input
                className="w-full p-1 border-1 border-black"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          ) : null}

          <br />
        </div>
      </form>
      {/* Check the user Email if it is valid */}

      <div className="flex justify-center mt-10">
        {loggingIn ? (
          <button
            className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
            onClick={() => {
              setLoggingIn(false);
            }}
          >
            Back
          </button>
        ) : null}

        <button
          className="bg-tertiary-60 hover:bg-tertiary-40 p-1 px-4 rounded text-lg font-bold text-tertiary-100 mx-4"
          onClick={() => {
            setLoggingIn(true);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
