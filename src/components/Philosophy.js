import React from 'react';
import PageHead from './pagecomponent/PageHead';

const content = ([
             "Each quantamental strategy has distinct effectiveness in generating superior return under different situations"
             ,"Therefore employing suitable strategy on specific asset class for each situation under different time span could potentially reap the optimal reward market could offer"
             ,"In a nutshell, quantamental focuses on overall strategies' compatibility under different market conditions"
             ,"Applied method includes econometrics, experimental mathematics, machine-learning, financial analysis & behavioral economics et cetera"
                ])

const Philosophy = () => {
    return (
            <div>
            <PageHead 
            subject= 'Investment Philosophy'
            contents = {content}
            />
        </div>
    );
}

export default Philosophy;