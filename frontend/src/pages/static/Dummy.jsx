import React, { useState } from "react";
import axios from "axios";

const Dummy = () => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const postData = async () => {
    try {
      let res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/root/audience-api/join`,
        cred,
        {
          headers: {
            API_KEY:
              "5b19b70015ea2d8fc719e7affa1f38bffd97a03c89f68fbc7855abcd617d1882",
          },
        }
      );
      console.log("res: ", res);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const submitForm = () => {
    // validate form
    postData();
  };

  return (
    <div>
      <Header />
      <section className="form h-[88vh] flex flex-row items-center justify-around w-full">
        <div className="flex items-center justify-center">
          <h1 className="text-xl font-bold leading-10">
            Welcome to the Newsletters of the <br />
            <span className="text-red-900 text-[60px] font-extrabold underline">
              Developers
            </span>{" "}
          </h1>
        </div>
        <div className="border-2 rounded-lg px-6 min-w-[500px] min-h-[400px] flex flex-col gap-10 items-center justify-center">
          <h1 className="text-xl font-bold text-primary/80">Dummy Heading</h1>
          <input
            type="text"
            className="text-lg outline-none rounded-lg px-5 py-2 w-full"
            placeholder="Name"
            name="name"
            value={cred.name}
            onChange={(e) => handleChange(e)}
          />
          <input
            type="email"
            className="text-lg outline-none rounded-lg px-5 py-2 w-full"
            placeholder="Email"
            name="email"
            value={cred.email}
            onChange={(e) => handleChange(e)}
          />
          {message && (
            <p className="text-primary border-2 border-red-900 bg-red-300 w-full rounded-lg px-3 py-2">
              {message}
            </p>
          )}
          <button
            type="submit"
            className="bg-primary w-full py-3 px-3 text-accent rounded-lg"
            onClick={submitForm}
          >
            Register
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

const Header = () => {
  return (
    <nav className="flex flex-row items-center h-[6vh] justify-center bg-black/60">
      <h1 className="text-accent">Dummy NewsLetter Page Header</h1>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="flex flex-row items-center h-[6vh] justify-center bg-black/60">
      <h1 className="text-accent">Dummy NewsLetter Page Footer</h1>
    </footer>
  );
};

export default Dummy;
