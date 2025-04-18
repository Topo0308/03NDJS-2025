#!/bin/bash

echo "🔍 Vérification de MongoDB..."
if ! docker ps | grep -q mongo; then
  echo "🚀 Démarrage de MongoDB via Docker..."
  docker start mongo 2>/dev/null || docker run -d \
    --name mongo \
    -p 27017:27017 \
    -v $(pwd)/mongodb/data:/data/db \
    mongo:6
else
  echo "✅ MongoDB est déjà en cours d'exécution."
fi

echo "🟢 Lancement de l'API Node.js..."
node server.js
