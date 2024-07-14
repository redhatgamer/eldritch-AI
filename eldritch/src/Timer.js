import React, { useState, useEffect } from 'react';

const Timer = ({ initialTime, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(initialTime);
    const [warning, setWarning] = useState(false);

    useEffect(() => {
        setTimeLeft(initialTime);
        setWarning(false);
    }, [initialTime]);

    useEffect(() => {
        const timerID = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
                if (timeLeft <= 15) {
                    setWarning(true);
                }
            } else {
                onTimeUp();
                clearInterval(timerID);
            }
        }, 1000);

        return () => clearInterval(timerID);
    }, [timeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <div className={`timer ${warning ? 'warning' : ''}`}>
            Time Left: {formatTime(timeLeft)}
        </div>
    );
};

export default Timer;