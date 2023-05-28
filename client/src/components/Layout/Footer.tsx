import React from 'react';
import { FaInstagram, FaTelegram, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4" style={{ position: 'fixed', bottom: '0px', width: '100%' }}>
            <div className="bg-gray-900 text-white py-2 text-center">
                <div className="container mx-auto px-4">
                    <span className="text-sm opacity-50">© 2023 Все права защищены</span>
                    <div className="mt-2" style={{ display: "flex", justifyContent: 'center' }}>
                        <a href="#" className="text-white hover:text-blue-300 mx-3">
                            <FaInstagram size={23} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-300 mx-3">
                            <FaTelegram size={23} />
                        </a>
                        <a href="#" className="text-white hover:text-blue-300 mx-3">
                            <FaEnvelope size={23} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
