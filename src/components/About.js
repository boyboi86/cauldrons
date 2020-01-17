import React from 'react';
import AppHead from './AppHead';

const About = () => {
    return (
    <div>
    <AppHead subject="About Cauldron"/>
        <div className='description'>
            <p>
            Cauldrons is an educational research project which represents the idea 
            to create new profitable quantamental strategies
            </p>
            <p>
            Hence the name "Cauldrons"
            </p>
            <p>
            Research focus on improving volatility forecast accuracy, 
            asset price momentum signals as well as assessment of value fundamentals through 
            macroeconomic factors and traditional financial analysis
            </p>
            <p>
            Utilising the most suitable method to produce profitable quantamental strategies and 
            investment analytics tools to assist in decision making process
            </p>
        </div>
    </div>
    );
}

export default About;