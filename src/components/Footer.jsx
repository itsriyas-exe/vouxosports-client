import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-title">Vouxo Sports</h2>
        <ul className="footer-links">
          <li>
            <Link to={'/notifications'} className="logolink"><a href="/notifications" className="footer-link">Notifications</a></Link>
          </li>
          <li>
            <Link to={'/news'} className="logolink"><a href="/news" className="footer-link">News</a></Link>
          </li>
          <li>
            <Link to={'/plans'} className="logolink"><a href="/popular" className="footer-link">Subscription</a></Link>
          </li>
          <li>
            <a href="/aboutus" className="footer-link">About Us</a>
          </li>
        </ul>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Vouxo Sports. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
