#!/bin/bash
kill $(ps aux | grep 'todo' | awk '{print $2}')

echo "todo iniciado"
todo
