const express = require('express');
const fs = require('fs');
const nodemailer = require('nodemailer');
const twilio = require('twilio');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const REVIEWS_FILE = path.join(__dirname, 'reviews-store.json');

function readReviewsStore() {
  try {
    return JSON.parse(fs.readFileSync(REVIEWS_FILE, 'utf8'));
  } catch (error) {
    return {};
  }
}

function writeReviewsStore(store) {
  fs.writeFileSync(REVIEWS_FILE, JSON.stringify(store, null, 2));
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/reviews', (req, res) => {
  const reviews = readReviewsStore();
  res.json({ reviews });
});

app.post('/api/reviews', (req, res) => {
  const { productId, name, title, text } = req.body || {};

  if (!productId || !name || !title || !text) {
    return res.status(400).json({ success: false, message: 'Review details are incomplete.' });
  }

  const reviewsStore = readReviewsStore();
  const safeProductId = String(productId);
  const existingReviews = Array.isArray(reviewsStore[safeProductId]) ? reviewsStore[safeProductId] : [];

  existingReviews.unshift({
    name: String(name),
    title: String(title),
    text: String(text),
    createdAt: new Date().toISOString()
  });

  reviewsStore[safeProductId] = existingReviews;
  writeReviewsStore(reviewsStore);

  res.json({ success: true, reviews: existingReviews });
});

app.post('/api/orders', async (req, res) => {
  const { name, number, items, total } = req.body;

  if (!name || !number || !items?.length) {
    return res.status(400).json({ success: false, message: 'Missing order details.' });
  }

  const itemSummary = items.map((item) => `${item.qty} × ${item.name} (${item.size})`).join(', ');
  const emailText = `New Mono order\nCustomer: ${name}\nMobile: ${number}\nItems: ${itemSummary}\nTotal: ₹${total}`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER,
      subject: 'New Mono Order',
      text: emailText
    });
  } catch (emailError) {
    console.error('Email send failed:', emailError);
  }

  if (process.env.TWILIO_SID && process.env.TWILIO_TOKEN && process.env.TWILIO_TO) {
    const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
    try {
      await client.messages.create({
        body: `New Mono order from ${name} (${number}). Items: ${itemSummary}. Total: ₹${total}`,
        from: process.env.TWILIO_FROM,
        to: process.env.TWILIO_TO
      });
    } catch (smsError) {
      console.error('SMS send failed:', smsError);
    }
  }

  res.json({ success: true, message: 'Order received. We will contact you shortly.' });
});

app.listen(PORT, () => {
  console.log(`Mono shop server running on http://localhost:${PORT}`);
});
