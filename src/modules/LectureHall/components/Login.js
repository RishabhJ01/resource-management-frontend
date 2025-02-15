import { Redirect } from "react-router";
import { useRef } from "react";

export default function Login({ setIsLoggedIn, setIsAdmin }) {
  const emailInputRef = useRef();
  const passInputRef = useRef();

  const handleLogin = async (e) => {
    e.preventDefault();
    fetch("https://lecture-hall-backend.herokuapp.com/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: emailInputRef.current.value,
        password: passInputRef.current.value,
      }),
    }).then((data) => {
      console.log(data);
      if (data.status === 200) {
        setIsLoggedIn(true);
        setIsAdmin(false);
      }
      if (data.status === 201) {
        setIsLoggedIn(true);
        setIsAdmin(true);
      }
    });
  };

  return (
    <div className="w-full max-w-xs m-auto mt-64">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleLogin}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email id
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="email"
            ref={emailInputRef}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            ref={passInputRef}
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
