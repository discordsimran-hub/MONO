# Mono Site

Simple static site with a small Express server to send order notifications via email (Nodemailer) and optionally SMS (Twilio).

Quick setup

1. Install dependencies:

```
npm install
```

2. Create a `.env` from the example and fill in values:

```
cp .env.example .env
# edit .env and set EMAIL_USER, EMAIL_PASS, etc.
```

3. Start the server:

```
npm start
```

Notes & recommendations
- `server.js` uses environment variables for email and Twilio credentials. Keep `.env` out of git (already in `.gitignore`).
- The checkout flow now opens WhatsApp directly after validating the cart and form fields.
- Consider adding a production-grade email service or queue for reliability.

Support

If you want, I can:

- Add a `.gitignore` (done)
- Add `.env.example` (done)
- Validate that all referenced images exist (checked)
- Create a minimal health-check route or add basic tests

ssap :- Simran@discord_meet1