import 'dotenv/config';
import express from 'express';
import payload from 'payload';

const app = express();

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin');
});

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'super-secret-payload-key-change-in-production',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  // Add your own express routes here
  
  // Health check endpoint
  app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  const PORT = process.env.PORT || 3001;

  app.listen(PORT, () => {
    payload.logger.info(`Server listening on port ${PORT}`);
    payload.logger.info(`Admin panel: http://localhost:${PORT}/admin`);
  });
};

start().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
