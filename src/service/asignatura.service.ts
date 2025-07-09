
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { AsignaturaInterfaz } from "../interfaces/asignatura.interfaces";

// export const guardarAsignatura = async (asignatura: AsignaturaInterfaz) => {

//     const { nombreAsignatura, horasRequeridas, fechaRegistro, fechaActualizacion, } = asignatura;

//     const query = `
//         INSERT INTO asignaturas (
//             nombreAsignatura, horasRequeridas, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         nombreAsignatura, horasRequeridas, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarAsignatura = async (asignatura: AsignaturaInterfaz) => {
  const {
    nombreAsignatura,
    horasRequeridas,
    fechaRegistro,
    fechaActualizacion
  } = asignatura;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('nombreAsignatura', sql.VarChar(45), nombreAsignatura)
      .input('horasRequeridas', sql.Int, horasRequeridas)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO asignaturas (
          nombreAsignatura, horasRequeridas, fechaRegistro, fechaActualizacion
        ) VALUES (
          @nombreAsignatura, @horasRequeridas, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar asignatura:', error);
    throw error;
  }
};

// export const ObtenerAsignatura = async (idAsignatura:number) => {

//     let query = "SELECT * FROM asignaturas WHERE 1=1";
//     const params: any[] = [];

//     if (idAsignatura) {
//         query += " AND idAsignatura = ?";
//         params.push(idAsignatura);
//     }

//     try {

//         const [rows] = await db.execute(query, params);
//         const data = rows as any[];

//         if (data.length === 0) {
//             return null; 
//         }

//         return data[0];
//     } catch (error) {
//         console.log(error)
//         return {}
//     }

// }

export const ObtenerAsignatura = async (idAsignatura: number) => {
  try {
    const db = await getDB();

    const query = `
      SELECT * 
      FROM asignaturas 
      WHERE idAsignatura = @idAsignatura
    `;

    const result = await db.request()
      .input('idAsignatura', sql.Int, idAsignatura)
      .query(query);

    const data = result.recordset;

    return data.length ? data[0] : null;
  } catch (error) {
    console.error('❌ Error al obtener asignatura:', error);
    return {};
  }
};


// export const ListarAsignatura = async (): Promise<AsignaturaInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT nombreAsignatura, horasRequeridas, 
//         fechaRegistro, fechaActualizacion FROM asignaturas`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAsignatura = async (): Promise<AsignaturaInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        nombreAsignatura, 
        horasRequeridas, 
        fechaRegistro, 
        fechaActualizacion 
      FROM asignaturas
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar asignaturas:', error);
    return null;
  }
};

// export const ListarAsignaturaNameId = async (): Promise<AsignaturaInterfaz[] | null> => {

//     try {
//         let query = `SELECT idAsignatura, nombreAsignatura FROM asignaturas`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAsignaturaNameId = async (): Promise<AsignaturaInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idAsignatura, nombreAsignatura 
      FROM asignaturas
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar asignaturas (name & id):', error);
    return null;
  }
};