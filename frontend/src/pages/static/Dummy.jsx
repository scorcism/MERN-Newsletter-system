import React, { useState } from "react";

const Dummy = () => {
  const [cred, setCred] = useState({
    name: "",
    email: "",
  });
  const [message, setMessage]  = useState("");

  const handleChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  

  return (
    <div>
      <Header />
      <section className="flex flex-row justify-between items-center w-[100vw] py-10">
        <div className="flex-1 px-24 flex items-center justify-center">
          <h1 className="text-xl font-bold leading-10">
            Welcome to the Newsletters of the <br />
            <span className="text-red-900 text-[60px] font-extrabold underline">
              Developers
            </span>{" "}
          </h1>
        </div>
        <div className="flex-1 w-[60vw] h-[60vh]">
          <img
            src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="unsplash image"
            className="h-[100%] "
          />
        </div>
      </section>
      <hr className="text-primary" />
      <section
        className="form h-[600px] flex flex-row items-center justify-center"
        w-full
      >
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
          {
            message &&
            <p className="text-primary border-2 border-red-900 bg-red-300 w-full rounded-lg px-3 py-2">{message}</p>
          }
          <button
            type="submit"
            className="bg-primary w-full py-3 px-3 text-accent rounded-lg"
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
    <nav className="flex flex-row items-center h-10 justify-center bg-black/60">
      <h1 className="text-accent">Dummy NewsLetter Page Header</h1>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="flex flex-row items-center h-10 justify-center bg-black/60">
      <h1 className="text-accent">Dummy NewsLetter Page Footer</h1>
    </footer>
  );
};

export default Dummy;
