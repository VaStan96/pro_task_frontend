
function setupLogging(){
    window.onerror = function (message, source, lineno, colno, error){
        const logEntry = {
            "@timestamp": new Date().toISOString(),
            "service": "Frontend-Service",
            "level": "error",
            "message": message,
            "logger": "frontend",
            "funcName": "window.onerror",
            "source": source,
            "lineno": lineno,
            "colno": colno,
            "stack": error?.stack || null
        };

        fetch("/log", {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(logEntry),
        });
        console.error("System Error: ", logEntry);
    };

    const originalConsoleError = console.error;
    console.error = function(...args){
        sendLog("error", args);
        originalConsoleError.apply(console, args);
    };

    const originalConsoleWarn = console.warn;
    console.warn = function (...args) {
      sendLog("warn", args);
      originalConsoleWarn.apply(console, args);
    };

    const originalConsoleInfo = console.info;
    console.info = function (...args) {
      sendLog("info", args);
      originalConsoleInfo.apply(console, args);
    };

    function sendLog(type, message){
        const logEntry = {
            "@timestamp": new Date().toISOString(),
            "service": "Frontend-Service",
            "level": type,
            "message": message.join(" "),
            "logger": "frontend",
            "funcName": "console." + type
        };
        fetch("/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logEntry),
        });
    };
}
export default setupLogging;