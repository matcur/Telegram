import {useUserActivity} from "../../hooks/useUserActivity";
import {useTimer} from "../../hooks/useTimer";
import {classNames} from "../../utils/classNames";
import React from "react";

export const ActivityStatus = ({userId}: {userId: number}) => {
  const userActivity = useUserActivity(userId)
  const secondsAgo = useTimer(
    (new Date().getTime() - userActivity.lastActivity.getTime()) / 1000
  )
  let displayedActivity: string;
  if (userActivity.state === "online") {
    displayedActivity = "online"
  } else {
    displayedActivity = secondsAgo < 60 ? "was recently" : Math.floor(secondsAgo / 60) + " minutes ago"
  }

  return (
    <div className={classNames(
      "activity-status",
      userActivity.state === "online" && "active-status",
      userActivity.state === "offline" && "offline-status",
    )}>
      {!userActivity.loading && displayedActivity}
    </div>
  )
}
