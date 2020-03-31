import React from 'react';
import PageHead from './pagecomponent/PageHead';

const content = ([
                  'Part-time cashier & Night-time Quantamental Practitioner'
                  ,'Self-taught Technologist in Node.js, Python and Linux OS'
                  ,'Applied research on Volatility & Macroeconomic Investment Strategy'
                  ,'While using remaining time to read books with good review'
                    ])

const Profile = () => {
    return (
    <div>
        <PageHead 
            subject= 'About me'
            contents = {content}
             />
        </div>
    );
}

export default Profile;