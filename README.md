For launch on localhost need run this command:

Before launch set env variable:

```bash
VITE_REMOTE=true
```

Example:

```bash
cp .env.example .env
```

And set `VITE_REMOTE=true` in `.env`.

Then run:

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

---

## Author

- zerokqx
- Murad Shakhsinov

---

## License

MIT. See [LICENSE](./LICENSE).
