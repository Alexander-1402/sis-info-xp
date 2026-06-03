require('dotenv').config();
const express = require('express');
const cors = require('cors');
const crcRoutes = require('./routes/crc.routes');
const huRoutes = require('./routes/hu.routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/crc', crcRoutes);
app.use('/api/hu', huRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
