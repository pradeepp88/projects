import React, { useState, useEffect } from 'react';


const Clock = (props) => {
    
    const [time,setTime] = useState('');
    
    
    useEffect(() => {
            const interval = setInterval(() => {
                let time = new Date();
                setTime(time.toLocaleTimeString());
                }, 1000);
                return () => clearInterval(interval);
    }, []);
        
    
    return ( 
        <div className="clock-item">{(props.flag===true)?time:null}</div>//will run only if clock flag is true
    );    
}
 
export default Clock;