import React from 'react';
import PageHead from './pagecomponent/PageHead';

const content = ([
             "Each quantamental strategy has distinct effectiveness in generating superior return under different situations"
             ,"Therefore employing suitable strategies on specific asset class for each situation, combined with varying durations could potentially reap the optimal reward market could offer"
             ,"In a nutshell, quantamental focuses on overall strategies' compatibility under different market conditions"
             ,"Most quantitative methods derived from econometrics, experimental mathematics & machine-learning focus on derivatives"
             ,"Global equities and some ETFs will most likely utilise portfolio analytics & microecononmics"
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