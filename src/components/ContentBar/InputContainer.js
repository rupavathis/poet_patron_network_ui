import React, { useState, useEffect } from 'react';
import './InputContainer.css'; 

export default function InputContainer(props) {

    const [poem, setPoems] = useState([]);
    useEffect(() => {
        initialSetPoets();
    }, []);
    
    async function initialSetPoets() {
        let r = await fetch('/poems')
        let rjson= await r.json();
      //  setPoems(rjson);
        console.log({rjson});
    }
    
    return (
        <div className="InputContainer">
           <div className="formControls">
                <div className="itemsLabelFlex">
                    {poem}
                    </div>
                <div className="itemsFlex">
                    <div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

