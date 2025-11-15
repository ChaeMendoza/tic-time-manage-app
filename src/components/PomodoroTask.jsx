import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function PomodoroTask ({ task, onClose }) {
    const [secondsLeft, setSecondsLeft] = useState(task.pomodoro?.timePerCycle * 60 || 1500);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setSecondsLeft((s) => {
                    if (s <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        playSound();
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const playSound = () => {
        new Audio("/sound/beep.mp3").play().then(r => console.log("KTA", r));
    };

    const formatTime = () => {
        const m = Math.floor(secondsLeft / 60);
        const s = secondsLeft % 60;
        return `${m}:${s < 10 ? "0" : ""}${s}`;
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-xl w-96">
                <h2 className="text-2xl font-bold mb-4">{task.title}</h2>

                <p className="text-gray-600 mb-3">Objetivo: {task.goal || "Sin objetivo definido"}</p>

                <div className="text-center text-5xl font-bold mb-4">{formatTime()}</div>

                <button
                    onClick={() => setIsRunning(!isRunning)}
                    className="w-full py-2 bg-green-500 text-white rounded-lg mb-3"
                >
                    {isRunning ? "Pausar" : "Iniciar"}
                </button>

                <button
                    onClick={onClose}
                    className="w-full py-2 bg-gray-300 rounded-lg"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
}

PomodoroTask.propTypes = {
    task: PropTypes.shape({
        title: PropTypes.string.isRequired,
        goal: PropTypes.string,
        pomodoro: PropTypes.shape({
            timePerCycle: PropTypes.number.isRequired,
        }).isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default PomodoroTask;

