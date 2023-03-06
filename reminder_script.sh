#!/bin/bash
messages=$(cat reminders.txt)
numlines=$(wc -l reminders.txt | awk '{print $1}')
rand=$((RANDOM%numlines+1))
message=$(echo "$messages" | sed -n "${rand}p")
terminal-notifier -message "$message" -title "Reminder"