import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import employeeRoutes from './routes/employee.route.js'
import personRoutes from './routes/person.route.js'

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/staff", employeeRoutes);
app.use('/api/person' , personRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
