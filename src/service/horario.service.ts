
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { HorarioInterfaz } from "../interfaces/horario.interfaces";

// export const guardarHorario = async (horario: HorarioInterfaz) => {

//     const { 
//         idClase, idAula, dia, hour, fechaRegistro, fechaActualizacion, 
//     } = horario;

//     const query = `
//         INSERT INTO horarios (
//             idClase, idAula, dia, hour, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         idClase, idAula, dia, hour, fechaRegistro, fechaActualizacion, 
//     ]);

//     return result;

// }

export const guardarHorario = async (horario: HorarioInterfaz) => {
  const {
    idClase,
    idAula,
    dia,
    hour,
    fechaRegistro,
    fechaActualizacion,
  } = horario;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('idClase', sql.VarChar(45), idClase) // Ajusta tipo si es INT
      .input('idAula', sql.VarChar(45), idAula)   // Ajusta tipo si es INT
      .input('dia', sql.VarChar(45), dia)
      .input('hour', sql.VarChar(45), hour)
      .input('fechaRegistro', sql.DateTime, fechaRegistro)
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion)
      .query(`
        INSERT INTO horarios (
          idClase, idAula, dia, hour, fechaRegistro, fechaActualizacion
        ) VALUES (
          @idClase, @idAula, @dia, @hour, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar horario:', error);
    throw error;
  }
};

// export const ListarHorarios = async (): Promise<HorarioInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT * FROM horarios`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarHorarios = async (): Promise<HorarioInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `SELECT * FROM horarios`;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar horarios:', error);
    return null;
  }
};

// export const ListarHorarioNameId = async (): Promise<HorarioInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idHorario, idClase, hour, dia FROM horarios limit 10`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarHorarioNameId = async (): Promise<HorarioInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT TOP 10 idHorario, idClase, hour, dia
      FROM horarios
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar horarios (NameId):', error);
    return null;
  }
};