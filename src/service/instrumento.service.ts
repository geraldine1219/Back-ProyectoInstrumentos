
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { InstrumentoInterfaz } from "../interfaces/instrumentos.interfaces";

// export const guardarInstrumento = async (instrumento: InstrumentoInterfaz) => {

//     const { 
//         nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
//         fechaRegistro, fechaActualizacion 
//     } = instrumento;

//     const query = `
//         INSERT INTO instrumentos (
//             nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
//             fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
//         fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarInstrumento = async (instrumento: InstrumentoInterfaz) => {
  const {
    nombreInstrumento,
    tipo,
    edadRecomendada,
    perteneceAlInstituto,
    fechaRegistro,
    fechaActualizacion,
  } = instrumento;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('nombreInstrumento', sql.VarChar(45), nombreInstrumento)
      .input('tipo', sql.VarChar(45), tipo)
      .input('edadRecomendada', sql.Int, edadRecomendada)
      .input('perteneceAlInstituto', sql.Bit, perteneceAlInstituto)
      .input('fechaRegistro', sql.DateTime, fechaRegistro)
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion)
      .query(`
        INSERT INTO instrumentos (
          nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
          fechaRegistro, fechaActualizacion
        ) VALUES (
          @nombreInstrumento, @tipo, @edadRecomendada, @perteneceAlInstituto, 
          @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar instrumento:', error);
    throw error;
  }
};

// export const ObtenerInstrumento = async (idInstrumento:number) => {

//     let query = "SELECT * FROM instrumentos WHERE 1=1";
//     const params: any[] = [];

//     if (idInstrumento) {
//         query += " AND idInstrumento = ?";
//         params.push(idInstrumento);
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

export const ObtenerInstrumento = async (idInstrumento: number): Promise<InstrumentoInterfaz | null | {}> => {
  try {
    const db = await getDB();

    const query = `
      SELECT *
      FROM instrumentos
      WHERE idInstrumento = @idInstrumento
    `;

    const result = await db.request()
      .input('idInstrumento', sql.Int, idInstrumento)
      .query(query);

    const data = result.recordset;

    return data.length ? data[0] : null;
  } catch (error) {
    console.error('❌ Error al obtener instrumento:', error);
    return {};
  }
};

// export const ListarInstrumento = async (): Promise<InstrumentoInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
//             fechaRegistro, fechaActualizacion FROM instrumentos`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarInstrumento = async (): Promise<InstrumentoInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT nombreInstrumento, tipo, edadRecomendada, perteneceAlInstituto, 
             fechaRegistro, fechaActualizacion
      FROM instrumentos
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar instrumentos:', error);
    return null;
  }
};

// export const ListarInstrumentoNameId = async (): Promise<InstrumentoInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idInstrumento, nombreInstrumento FROM instrumentos`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }
 
// }

export const ListarInstrumentoNameId = async (): Promise<{ idInstrumento: number; nombreInstrumento: string }[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idInstrumento, nombreInstrumento
      FROM instrumentos
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar instrumentos (NameId):', error);
    return null;
  }
};