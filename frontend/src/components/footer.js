import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import "../styles/footer.css";

export const Footer = () => {
  const [fixPosition, setFixPosition] = useState(false);
  let location = useLocation();
  useEffect(() => {
    if (window.innerHeight > document.querySelector('body').offsetHeight){
      setFixPosition(true);
    } else {
      setFixPosition(false);
    }
  }, [[],location]);

  return (
    <div id="footer" className={fixPosition ? "pb-1 fixed-bottom" : "pb-1"}>
      <h2 className="text-center">Siguenos en nuestras redes sociales</h2>
      <div className="row justify-content-center">
        <div className="col-auto">
          <a href="https://www.instagram.com/irollyou_cinnamon/" rel="noreferrer" target="_blank"><img style={{ width: "30px", margin: "auto" }} src="https://cdn-icons-png.flaticon.com/512/3955/3955024.png" alt="insta" /></a>
        </div>
        <div className="col-auto">
          <a href="https://www.tiktok.com/@irollyou_cinnamon" rel="noreferrer" target="_blank"><img style={{ width: "30px", margin: "auto" }} src="https://cdn-icons-png.flaticon.com/512/3670/3670132.png" alt="insta" /></a>
        </div>
      </div>
    </div>
  );
};