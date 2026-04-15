import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersNotificationAction } from "../../../State/Customers/Orders/Action";
import { Card } from "@mui/material";
import './Notifications.css';

const Notifications = () => {
  const dispatch = useDispatch();

  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUsersNotificationAction());
  }, []);

  return (
    <div className="Notification-Con">
      <h1 className="Notification-Head">Notifications</h1>
      {order.notifications.map((item) => (
        <Card className="Notification-Card">
          <p>{item.message}</p>
        </Card>
      ))}
    </div>
  );
};

export default Notifications;