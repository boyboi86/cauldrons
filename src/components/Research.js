import React from 'react';
import AppHead from './AppHead';
import ResearchComponent from './researchcomponent/ResearchComponent';
import gar_iv_vix from './researchcomponent/Volatility/gar_iv_vix.png';
import local_stocha from './researchcomponent/Volatility/local_stocha.png';

const Research = () => {
    return (
    <div>
    <AppHead subject="Research"/>
        <div className='description'>
            <ResearchComponent 
            timestamp= '19 Oct 2019'
            lastmodified= '09 Feb 2020'
            cat= 'Classifier/ Signal'
            investstyle= 'Volatility' 
            assets= 'OTC & Exotic Options'
            freq= 'Mid (Daily)'
            benchmark= 'CBOE VIX'
            summary1 = 'Modified BSM implied volatility to reflect Moneyness, while combined with Garch(1,1) to mimic local stochastic volatility'
            summary2 = 'To produced long or short signal for options or related derivative class'
            content1 = 'After ADF & KPSS stationary test, different Time-Series Model was compared for Goodness of fit. 
                        Eventually Garch(1,1) was used with the best overall AIC and BIC score.
                        Black Scholes Merton model was employed to derive At-The-Money Call price.
                        After which Modified Implied Volatility was derived.
                        (Comparison shown below )'
            imgsrc1 = {gar_iv_vix}
            content2 = 'A linear regression was plotted and the result was tested for MSE, MAPE, MAD.
                        Combined volatility (See below graph) has the lowest error for all sample.
                        Trading rules were created and SVM classifier was used.
                        Confusion Matrix and Classification Report is in line with expected outcome.' 
            imgsrc2 = {local_stocha}
            />
        </div>
        </div>
    );
}

export default Research;