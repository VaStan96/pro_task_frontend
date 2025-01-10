import React, { useEffect, useState } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [filterForCheckbox, setFilterForCheckbox] = useState(false);
  const [error, setError] = useState(null);

  // Загружаем список задач
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setError(null);
      } else {
        setError("Failed to fetch all notifications.");
        setNotifications([]);
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
      setNotifications([]);
      console.error(err);
    }
  };

  const fetchUserNotifications = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/notifications/getByUser`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
        setError(null);
      } else {
        setError("Failed to fetch users notifications.");
        setNotifications([]);
      }
    } catch (err) {
      setError("An error occurred while fetching notifications.");
      setNotifications([]);
      console.error(err);
    }
  };

  // Маркировка уведомления как прочитанного
  const markAsRead = async (notificationID) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `/api/notifications/mark/${notificationID}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // Отправляем токен в заголовке
          },
        }
      );

      if (response.ok) {
        setError(null);
        fetchNotifications();
      } else {
        alert("Failed to mark notification as read.");
      }
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const handleCheckboxChange = () => {
    setFilterForCheckbox(!filterForCheckbox);
  };

  useEffect(() => {
    if (filterForCheckbox) {
      fetchUserNotifications();
    } else {
      fetchNotifications();
    }
  }, [filterForCheckbox]);

  
  return (
    <div>
      <h2>Notifications</h2>
      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          checked={filterForCheckbox}
          onChange={handleCheckboxChange}
        />
        Уведомления только для текущего пользователя
      </label>

      {/* Display Error */}
      {error && (
        <div style={{color: "red", marginTop: "10px"}}>
          {error}
        </div>
      )}

      {/* Output table */}
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>NotificationID</th>
            <th>Message</th>
            <th>TaskName</th>
            <th>UserName</th>
            <th>CreatedAt</th>
            <th>isRead</th>
            <th>Reading</th>
          </tr>
        </thead>
        <tbody>
          {notifications.map((notif) => (
            <tr key={notif.id}>
              <td>{notif.id}</td>
              <td>{notif.message}</td>
              <td>{notif.task_name}</td>
              <td>{notif.user_name}</td>
              <td>{new Date(notif.created_at).toLocaleString()}</td>
              <td>{notif.is_read ? "Прочитано" : "Непрочитано"}</td>
              <td>
                <button onClick={() => markAsRead(notif.id)}>Reading</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {notifications.length > 0 ? (
        
      ) : (
        !error && <p>No notifications available.</p>
      )} */}
    </div>
  );
}

export default Notifications;
