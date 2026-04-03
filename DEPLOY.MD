## Docker Commands

```bash
# Build and run
sudo docker compose build
sudo docker compose up -d

# Rebuild without cache and recreate containers
sudo docker compose build --no-cache
sudo docker compose up -d --force-recreate

# View logs
sudo docker compose logs -f yobble-messenger-frontend

# Stop
sudo docker compose down
```
