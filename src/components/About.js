import React from 'react';
import PageHead from './pagecomponent/PageHead';

const content = ([
                "An educational project representing the idea to create profitable quantamental strategies by utilising a suitable mix of methods and assets"
                ,'Since most returns are made when situation is characterized as "unstable with intense emotions"'
                ,'Hence the name "Cauldrons"'
                ,"Research scope will not be limited to derivatives only and would be extended to other assets classes (Global Equities, FX & ETFs) for strategy diversification & portfolio optimization"
                ])

const About_Cauldrons = () => {
    return (
    <div>
        <PageHead
            subject = 'Cauldrons'
            contents = {content}
        />
    </div>
    );
}

export default About_Cauldrons;