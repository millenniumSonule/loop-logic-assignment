import React from 'react';
import './ContactPage.css';
import NavbarCP from './NavbarCP';

const ContactPage = () => {
  return (
    <div className="contact-page-container">
      <div className="nav-container">
        <NavbarCP />
      </div>
      <div className="cp-title">
        <h2>GET IN TOUCH</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta excepturi dolorem quae amet quasi delectus adipisci aspernatur? Necessitatibus odio vitae natus culpa voluptate nostrum. Fuga doloremque quas doloribus sunt neque.</p>
      </div>
      <div className="contact-form">
        <form className="form">
         
          <p>Contact Form</p>
          
          <div className="input-group">
            <div className="input-container">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="6"></textarea>
          </div>
          <button type="submit" className="send-button">Send</button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
