import React, { useState, useEffect } from 'react';
import LogItem from './LogItem'
import Clock from './Clock'

const Timer = () => {
    
    const [startTime, setStartTime] = useState('');//for calculating starttime
    const [start, setStart] = useState('');//for display start time
    const [endTime, setEndTime] = useState('');//for calculating endtime
    const [end, setEnd] = useState('');//for displaying end time
    const [duration, setDuration] = useState(0);//for calculating duration
    const [timerLog, setTimerLog] = useState([]);//for storing duration
    const [flag,setFlag] = useState(false);//for setting clock running flag 

    //When window loads 
    useEffect(()=>{
        console.clear();
        console.log('Window Loaded..')
    },[])

    //will run everytime start is pressed - set start time
    useEffect(()=>{
        return (startTime === '') ? (null) : (console.log(`Start Time: ${startTime}`),setStart(startTime.toLocaleTimeString()))
    },[startTime]);

    //will run everytime stop is pressed - set end time and calculate duration
    useEffect(()=>{
        return (endTime === '') ? (null) : (console.log(`End Time: ${endTime}`),calculateDuration(endTime),setEnd(endTime.toLocaleTimeString()))
    },[endTime]);

    //will run everytime duration is updated - update timerLog
    useEffect(()=>{
        return (duration <= 0) ? (null) : (console.log(`Duration: ${duration}`),updateTimerLog())
    },[duration]);

    //will run everytime timerLog is updated - console.log timerLog
    useEffect(()=>{
        return (timerLog.length === 0) ? (null): console.log(timerLog)
    },[timerLog])

    //will run after duration is calculated
    const updateTimerLog = ()=>{
        let temp = timerLog.length;
        setTimerLog([...timerLog, {
            id: temp+1,
            value: duration
        }]);
    }

    //will run after start button is pressed
    const onStart = () => {
        setStartTime(new Date());
        setFlag(true); //flag for clock running
    }
    
    const onStop = () => {
        setFlag(false); //to stop the clock
        return (flag===true)?setEndTime(new Date()):(alert(`Please start the Clock`)); //to ask the user to start clock every time before stopping
    }
    
    //Reset Button will reset everything 
    const onReset = () => {
        console.log(`Reset button clicked`);
        setStartTime('');
        setStart('');
        setEndTime('');
        setEnd('');
        setTimerLog([]);
        setFlag(false);
    }

    //Algo to calculate duration
    const calculateDuration = function(endTime) {
        var millisec = endTime - startTime;
        var seconds = Math.floor(millisec / 1000);
        var minutes = Math.floor(millisec / (1000 * 60));
    
        if(minutes > 0) // calculate offset
            seconds = Math.abs(seconds - (minutes * 60));
    
    
        const duration = "Duration => minutes: " + minutes + " " + "seconds: " + seconds;
        
        setDuration(duration);
    }


    return ( 
        <>
        <div className="container"> 
            <table id="timerTable">
                <tbody>
                    <tr>
                        <td>
                            <span>Start Time:</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input value={start} id="txtStartTime" type="text"   readOnly/> 
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <Clock flag={flag}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span>End Time:</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input value={end} id="txtEndTime" type="text"  readOnly/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={onStart} id="btnStart" type="button">Start</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={onStop} id="btnStop" type="button">Stop</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={onReset} id="btnReset" type="button">Reset</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <LogItem items={timerLog} />
        </div>
        </>
    )
    
}
 
export default Timer;
