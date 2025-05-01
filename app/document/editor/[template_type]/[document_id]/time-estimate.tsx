"use client";

import { useEffect, useState } from "react";

const ESTIMATED_TIME_TO_COMPLETE = 8;

export default function TimeEstimate({ step }: { step: number }) {
  const [remainingTime, setRemainingTime] = useState(0);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  let timeString;

  useEffect(() => {
    const completionPercentage = (step * 100) / 24 / 100;
    setRemainingTime(
      ESTIMATED_TIME_TO_COMPLETE - ESTIMATED_TIME_TO_COMPLETE * completionPercentage
    );
    setCompletionPercentage(Math.floor(completionPercentage * 100));
  }, [step]);

  timeString = `${completionPercentage}% complete `;
  timeString = remainingTime
    ? timeString + `(about ${convertDecimalToMinutesSeconds(remainingTime)} left)`
    : timeString;

  return <p className="text-sm pb-2">{timeString}</p>;
}

function convertDecimalToMinutesSeconds(decimalMinutes: number) {
  const minutes = Math.floor(decimalMinutes);
  const seconds = Math.round((decimalMinutes - minutes) * 60);
  let str = minutes ? `${minutes} min ` : "";
  str = seconds ? `${str} ${seconds} sec` : str;
  return str;
}
