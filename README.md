For launch on localhost need run this command:

```bash
dcoker build -t yobble-frontend .
docker run --name yobble-frontend -p 80:80 yobble-frontend
```

---

Also we use script ./deploy.bash

If script does not launch that launch this command:

```bash
sudo chmod +x ./deploy.bash
```

And

```bash
./deploy.bash
```

---

Go to `localhost:80`
