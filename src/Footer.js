import React from 'react';

const Footer = () => {
    const date = new Date();
    return (
        <footer>
            <h1> Today is: {date.getDay().toString() + '.'+ date.getMonth().toString() + '.' +date.getFullYear().toString()}</h1>
        </footer>
    );
};

export default Footer;
