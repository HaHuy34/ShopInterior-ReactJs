import React, { useEffect, useState } from "react";

const NetworkConnections = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showAlertFor3Seconds();
    };

    const handleOffline = () => {
      setIsOnline(false);
      showAlertFor3Seconds();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const showAlertFor3Seconds = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };
  const closeNetWork = () => {
    setShowAlert(false);
  };
  return (
    <div className="network-main">
      {showAlert && (
        <div className={isOnline ? "online-alert" : "offline-alert"}>
          {isOnline ? (
            <>
              <box-icon name="wifi" color="#cc4343" size="md"></box-icon>
              <span id="check-network">Bạn đang online</span>
              <div className="close-network">
                <box-icon
                  name="x"
                  color="#ffffff"
                  onClick={closeNetWork}
                  size="sm"
                ></box-icon>
              </div>
            </>
          ) : (
            <>
              <box-icon name="wifi-off" color="#827575" size="md"></box-icon>
              <span id="check-network">You are offline</span>
              <div className="close-network">
                <box-icon
                  name="x"
                  color="#ffffff"
                  size="sm"
                  onClick={closeNetWork}
                ></box-icon>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default NetworkConnections;
