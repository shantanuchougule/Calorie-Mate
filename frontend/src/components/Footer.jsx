import React from "react";

const Footer = () => {
  return (
    <footer className="footer-custom text-center text-white bg-primary">
        <h2 className="developer text-center"><a className="text-light" href="https://shantanuchougule.vercel.app/">Developed by Shantanu Chougule</a></h2>
      <p>© {new Date().getFullYear()} Shantanu Chougule | All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
