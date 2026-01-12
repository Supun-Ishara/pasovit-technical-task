import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer bg-dark text-light mt-5">
      <div className="container p-4">

        <div className="row">

          {/* Company Info */}
          <div className="col-md-3">
            <h5>Clothing Store</h5>
            <p>Your one-stop destination for fashionable clothing for men, women, and kids.</p>
            <div>
              <span>📘 </span>
              <span>📷 </span>
              <span>🐦 </span>
              <span>📺</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/products?category=men">Men's Collection</Link></li>
              <li><Link to="/products?category=women">Women's Collection</Link></li>
              <li><Link to="/products?category=kids">Kids' Collection</Link></li>
              <li><Link to="/products">All Products</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li>Track Order</li>
              <li>Returns & Exchange</li>
              <li>Shipping Info</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h5>Contact Us</h5>
            <p>📍 123 Fashion Street, Colombo 1001</p>
            <p>📧 support@clothingstore.com</p>
            <p>📞 +94 (71) 567-8901</p>
            <p>🕐 Mon-Fri: 9AM - 8PM</p>
          </div>
        </div>

        <hr className="bg-secondary" />

        {/* Bottom Bar */}
        <div className="d-flex justify-content-between">
          <p>© {new Date().getFullYear()} Clothing Store. All rights reserved.</p>
          <div>
            <Link to="/">Privacy Policy</Link> |{' '}
            <Link to="/">Terms & Conditions</Link> |{' '}
            <Link to="/">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
