import React, { useState, useEffect } from 'react';

function LoadingText() {
    const [loadingText, setLoadingText] = useState("Generating response.");

    useEffect(() => { // 
        const intervalId = setInterval(() => {
            setLoadingText(prev => { // increment the dots
                const dotCount = (prev.match(/\./g) || []).length;
                if (dotCount < 3) {
                    return prev + ".";
                } else {
                    return "Generating response.";
                }
            });
        }, 600);

        // Clear interval on component unmount (so the dots refresh)
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div id="response">
            {loadingText}
        </div>
    );
}

export default LoadingText;
