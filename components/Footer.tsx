import { BanIcon, Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2024 JSM Store All Rights Reserved</p>
      <p className="icons">
        <Instagram />
        <Twitter />
        <Facebook />
      </p>
    </div>
  );
};

export default Footer;
