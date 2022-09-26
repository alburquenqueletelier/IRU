
import React from "react";
import "./styles/index.css";
import Layout from "./layout";
import { createRoot } from 'react-dom/client';
 
// importing css stylesheet to use the bootstrap class
// add this line only in this file
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<React.StrictMode>
    <Layout />
  </React.StrictMode>);
