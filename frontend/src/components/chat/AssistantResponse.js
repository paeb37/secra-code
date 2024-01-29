import React, { useState, useEffect } from 'react';

function AssistantResponse(props) {
    const response = props.response; // text response ("generating" or the actual returned value, which includes "")
   
    const [loadingText, setLoadingText] = useState("Generating response.");

    useEffect(() => {
        let intervalId;

        if (response === "generating") {
            intervalId = setInterval(() => {
                setLoadingText(prev => { 
                    const dotCount = (prev.match(/\./g) || []).length;
                    if (dotCount < 3) {
                        return prev + ".";
                    } else {
                        return "Generating response";
                    }
                });
            }, 600);
        }

        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [response]);

    return (
        <div id="response">

            <h3>Assistant Response</h3>
            
            {response === "generating" ? 
                loadingText :
                response}
        </div>
    );
}

export default AssistantResponse;
