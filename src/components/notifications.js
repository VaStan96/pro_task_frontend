import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  // Загружаем список задач
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/notifications");

        if (response.ok) {
            const data = await response.json();
            setNotifications(data);
        } else {
            setError("Failed to fetch notifications.");
        }
      } catch (err) {
            setError("An error occurred while fetching notifications.");
            console.error(err);
      }
    };

    fetchNotifications();
  }, []);

  // Маркировка уведомления как прочитанного
  const markAsRead = async (notificationID) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${notificationID}/read`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification.id === notificationID ? { ...notification, read: true } : notification
          )
        );
      } else {
        alert("Failed to mark notification as read.");
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification) => (
          <li 
            key={notification.id} 
            style={{textDecoration: notification.read ? "line-through" : "none",}}
          >
            {notification.message}
            {!notification.read && (
              <button 
                style={{marginLeft: "10px"}}
                onClick={() => markAsRead(notification.id)}
              >
                Mark as Read
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;
