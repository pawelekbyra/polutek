#!/bin/bash
cd out && python3 -m http.server 3000 &
SERVER_PID=$!
sleep 5
python3 verify_homepage.py
kill $SERVER_PID
