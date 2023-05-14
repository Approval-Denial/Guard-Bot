echo off
title Sky Guard
color d
cls
:a
pm2 restart ap.config.js
goto a