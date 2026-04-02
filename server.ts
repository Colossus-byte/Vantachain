import express from 'express';
import { createServer as createViteServer } from 'vite';
import { google } from 'googleapis';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Google Sheets Setup
  const getSheetsClient = () => {
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    
    if (!clientEmail || !process.env.GOOGLE_PRIVATE_KEY) {
      console.error('Missing Google Sheets credentials in environment variables.');
      return null;
    }

    const privateKey = process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.split(String.raw`\n`).join('\n')
      : undefined;

    try {
      const auth = new google.auth.GoogleAuth({
        credentials: {
          client_email: clientEmail,
          private_key: privateKey,
        },
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });

      return { sheets: google.sheets({ version: 'v4', auth }), auth };
    } catch (err) {
      console.error('Error initializing Google Sheets client:', err);
      return null;
    }
  };

  // API Routes
  app.get('/api/waitlist/count', async (req, res) => {
    try {
      const client = getSheetsClient();
      const sheetId = process.env.GOOGLE_SHEET_ID;
      
      if (!client || !sheetId) {
        return res.json({ count: 0, configured: false });
      }

      const { sheets, auth } = client;

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'A:A',
        auth: auth,
      });

      const rows = response.data.values || [];
      // Assuming first row is header
      const count = Math.max(0, rows.length - 1);
      
      res.json({ count, configured: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error.message || 'Unknown error';
      console.error('Google Sheets API Error (Count):', errorMessage);
      res.status(500).json({ error: 'Failed to fetch count', details: errorMessage });
    }
  });

  app.post('/api/waitlist', async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      const client = getSheetsClient();
      const sheetId = process.env.GOOGLE_SHEET_ID;

      if (!client || !sheetId) {
        // Mock success if not configured yet so the UI works during development
        return res.status(200).json({ success: true, mock: true });
      }

      const { sheets, auth } = client;

      // Check for duplicates
      const getResponse = await sheets.spreadsheets.values.get({
        spreadsheetId: sheetId,
        range: 'A:A',
        auth: auth,
      });

      const rows = getResponse.data.values || [];
      const emails = rows.map(row => row[0]);

      if (emails.includes(email)) {
        return res.status(409).json({ error: 'Email already on the waitlist' });
      }

      // Append new email
      await sheets.spreadsheets.values.append({
        spreadsheetId: sheetId,
        range: 'A:B',
        valueInputOption: 'USER_ENTERED',
        auth: auth,
        requestBody: {
          values: [[email, new Date().toISOString()]],
        },
      });

      res.status(200).json({ success: true });
    } catch (error: any) {
      const errorMessage = error?.response?.data?.error?.message || error.message || 'Unknown error';
      console.error('Google Sheets API Error (Add):', errorMessage);
      res.status(500).json({ error: 'Failed to join waitlist', details: errorMessage });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
