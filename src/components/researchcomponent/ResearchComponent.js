import React from 'react';
import Popup from "reactjs-popup";

const ResearchComponent = props => {
    return (
            <div>
                <p>
                Date: {props.timestamp}
                </p>
                <p>
                Last Modified: {props.lastmodified}
                </p>
                <p>
                Category: {props.cat}
                </p>
                <p>
                Investment Style: {props.investstyle}
                </p>
                <p>
                Preferred Asset: {props.assets}
                </p>
                <p>
                Frequency: {props.freq}
                </p>
                <p>
                Benchmark: {props.benchmark}
                </p>
                <p>
                Summary: {props.summary1}
                 </p>
                <p>
                {props.summary2}  
                </p>
                <p>
                {props.summary3}
                </p>
                  <Popup modal trigger={<button>Short Description</button>}>
                    <p>
                    {props.content1}
                    </p>
                    <img className="researchpic" src={props.imgsrc1} alt="Research image"/>
                    <p>
                    {props.content2}
                    </p>
                    <img className="researchpic" src={props.imgsrc2} alt="Research image"/>
                  </Popup>
            </div>
    );
}

export default ResearchComponent;