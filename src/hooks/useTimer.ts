import { useEffect, useState } from "react";

function useTimer(initialTime: number) {
  const [time, setTime] = useState(initialTime);
  const [timer, setTimer] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timer) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!timer && time !== 0) {
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, time]);

  useEffect(() => {
    setTime(initialTime);
  }, [initialTime]);

  const start = () => setTimer(true);
  const stop = () => setTimer(false);

  return { time, timer, start, stop };
}

export default useTimer;
