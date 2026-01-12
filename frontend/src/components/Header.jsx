import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-top-content">
            <div className="header-contact">
              <span>📧 support@clothingstore.com</span>
              <span>📞 +1 234 567 8900</span>
            </div>
            <div className="header-info">
              <span>Free Shipping on Orders Over $50</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;