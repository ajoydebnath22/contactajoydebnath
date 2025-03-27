import React,{useState} from 'react';
import { FaCoffee } from "react-icons/fa"; // Import coffee icon
import './BuyMeACoffee.css';

const BuyMeACoffee = () =>{

   const [showCoffeePopup,setShowCoffeePopup] = useState(false);

   return (
      <>      
         {/* Floating Coffee Button */}
         <button className="coffee-btn" onClick={() => setShowCoffeePopup(true)}>
         <FaCoffee size={24} />
         </button>

         {/* Popup Modal */}
         {showCoffeePopup && (
            <div className="coffee-popup-overlay" onClick={() => setShowCoffeePopup(false)}>
            <div className="coffee-popup" onClick={(e) => e.stopPropagation()}>
              <h3 className="popup-title">Buy Me a Coffee ☕... or a Home 🏡</h3>
              <p className="popup-description">Scan the QR code below to support me. Thank you বন্ধু! ❤️</p>
              <img src="/SupportMe.png" alt="Buy Me a Coffee QR Code" className="qr-code" />
              
              <a href="/SupportMe.png" download="SupportMe.png" className="download-btn">
                  ⬇ Download QR Code
              </a>
            </div>
          </div>                        
         )}
      </>
   );
};

export default BuyMeACoffee; 