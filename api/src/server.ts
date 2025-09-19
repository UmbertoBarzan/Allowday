import dotenv from 'dotenv';
import app from './app.js';
import prisma from './lib/prisma.js';

dotenv.config();

const port = Number.parseInt(process.env.PORT ?? '4000', 10);

async function start() {
  try {
    await prisma.$connect();
    app.listen(port, () => {
      console.log(`Allowday API in ascolto su http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Errore di avvio API', error);
    process.exit(1);
  }
}

start();
