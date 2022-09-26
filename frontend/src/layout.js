import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Import pages & components
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar";
import { Footer } from "./components/footer";

// Import app context
import injectContext from "./store/appContext";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
          <Navbar />

          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<div className="text-center"><h1>404: Not found!</h1></div>} path="*"/>
          </Routes>

          <Footer />
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);