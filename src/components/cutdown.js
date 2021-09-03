import clsx from "clsx";
import * as React from "react"


export const Cutdown = ( { vertical, className }) => {
  const { timeLeft, days, hours, minutes, seconds } = useTime()
  return (
    <>
      {
        timeLeft > 0 ?(
        <div className={clsx("flex items-end", className,{
          "flex-col": vertical
        })}>
          <div className="text-8xl">{days}J{!vertical && "-  "}</div>
          <div className="text-7xl text-gray">{hours}H{!vertical && "-  "}</div>
          <div className="text-6xl text-gray">{minutes}M{!vertical && "-  "}</div>
          <div className="text-5xl text-gray">{seconds}S</div>
        </div>
        ) : (
          null
        )
      }
    </>
  )
}


export const useTime = () => {
  var countDownDate = new Date("Oct 9, 2021 09:45:00").getTime();
  const [timeLeft, setTimeLeft] = React.useState(0)
  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  var hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  var x = setInterval(function() {

    var now = new Date().getTime();

    setTimeLeft(countDownDate - now)

    if (timeLeft < 0) {
      clearInterval(x);
    }
  }, 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    timeLeft,
  }
}