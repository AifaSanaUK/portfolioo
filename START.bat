@echo off
echo Starting Portfolio Server and Client...
echo.
echo Make sure MongoDB is running first!
echo.
echo Starting server on port 5000...
start "Portfolio Server" cmd /k "cd server && npm start"
timeout /t 3 /nobreak >nul
echo.
echo Starting client on port 3000...
start "Portfolio Client" cmd /k "cd client && npm start"
echo.
echo Both servers are starting...
echo Server: http://localhost:5000
echo Client: http://localhost:3000
echo.
echo The website will open automatically in your browser!
pause

