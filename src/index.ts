import express from 'express';
import dotenv from 'dotenv';

import { testDBConnection } from './db';
import alumnoRoutes from "./routes/alumno.routes";
import asignaturaRoutes from "./routes/asignatura.routes";
import instrumentoRoutes from "./routes/instrumento.routes";
import claseRoutes from "./routes/clase.routes";
import profesorRoutes from "./routes/profesor.routes";
import adminRoutes from "./routes/admin.routes";
import edificioRoutes from "./routes/edificio.routes";
import aulasRoutes from "./routes/aulas.routes";
import pensulRoutes from "./routes/pensul.routes";
import horarioRoutes from "./routes/horario.routes";
import alumnoHorarioRoutes from "./routes/alumnoHorario.routes";
import morgan from 'morgan';
import cors from 'cors';


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', async (_req, res) => {
//   try {
//     const [rows] = await db.query('SELECT NOW() AS now');
//     res.status(200).json({rows});
//   } catch (error) {
//     res.status(500).json({ error: 'Error al consultar la base de datos' });
//   }
// });

app.use("/api/alumno", alumnoRoutes);
app.use("/api/asignatura", asignaturaRoutes);
app.use("/api/instrumento", instrumentoRoutes);
app.use("/api/clase", claseRoutes);
app.use("/api/profesor", profesorRoutes);
app.use("/api/administrador", adminRoutes);
app.use("/api/edificio", edificioRoutes);
app.use("/api/aula", aulasRoutes);
app.use("/api/pensul", pensulRoutes);
app.use("/api/horario", horarioRoutes);
app.use("/api/alumnoHorario", alumnoHorarioRoutes);

(async () => {
  const connected = await testDBConnection();
  if (connected) {
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } else {
    console.error('💥 No se pudo iniciar el servidor por fallo en la base de datos.');
    process.exit(1); // Finaliza el proceso
  }
})();