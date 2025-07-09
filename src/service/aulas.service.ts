
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { AulaInterfaz } from "../interfaces/aula.interfaces";

// export const guardarAula = async (aula: AulaInterfaz) => {

//     const { idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador, fechaRegistro, fechaActualizacion } = aula;

//     const query = `
//         INSERT INTO aulas (
//             idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarAula = async (aula: AulaInterfaz) => {
  const {
    idEdificio,
    nombre,
    tipo,
    capacidadAlumnos,
    disponibilidadOrdenador,
    fechaRegistro,
    fechaActualizacion
  } = aula;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('idEdificio', sql.VarChar(45), idEdificio) // Cambia a sql.Int si es entero
      .input('nombre', sql.VarChar(45), nombre)
      .input('tipo', sql.VarChar(45), tipo)
      .input('capacidadAlumnos', sql.Int, capacidadAlumnos)
      .input('disponibilidadOrdenador', sql.Bit, disponibilidadOrdenador)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO aulas (
          idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador, fechaRegistro, fechaActualizacion
        ) VALUES (
          @idEdificio, @nombre, @tipo, @capacidadAlumnos, @disponibilidadOrdenador, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar aula:', error);
    throw error;
  }
};

// export const ObtenerAula = async (idAula:string) => {

//     let query = "SELECT * FROM aulas WHERE 1=1";
//     const params: any[] = [];

//     if (idAula) {
//         query += " AND idAsignatura = ?";
//         params.push(idAula);
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

export const ObtenerAula = async (idAula: string) => {
  try {
    const db = await getDB();

    const query = `
      SELECT * 
      FROM aulas 
      WHERE idAula = @idAula
    `;

    const result = await db.request()
      .input('idAula', sql.Int, parseInt(idAula)) // Usa sql.VarChar si no es numérico
      .query(query);

    const data = result.recordset;

    return data.length ? data[0] : null;

  } catch (error) {
    console.error('❌ Error al obtener aula:', error);
    return {};
  }
};

// export const ListarAula = async (): Promise<AulaInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idAula, idEdificio, nombre, tipo, capacidadAlumnos, disponibilidadOrdenador, fechaRegistro, fechaActualizacion FROM aulas`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAula = async (): Promise<AulaInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        idAula, 
        idEdificio, 
        nombre, 
        tipo, 
        capacidadAlumnos, 
        disponibilidadOrdenador, 
        fechaRegistro, 
        fechaActualizacion 
      FROM aulas
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar aulas:', error);
    return null;
  }
};

// export const ListarAulaNameId = async (): Promise<AulaInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idAula, nombre FROM aulas limit 10`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarAulaNameId = async (): Promise<AulaInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT TOP 10 idAula, nombre 
      FROM aulas
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar aulas (Name & ID):', error);
    return null;
  }
};