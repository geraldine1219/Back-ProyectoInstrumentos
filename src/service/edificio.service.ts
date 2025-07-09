
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { EdificioInterfaz } from "../interfaces/edificio.interfaces";

// export const guardarEdificio = async (edificio: EdificioInterfaz) => {

//     const { 
//         direccion, fechaRegistro, fechaActualizacion, 
//     } = edificio;

//     const query = `
//         INSERT INTO edificios (
//             direccion, fechaRegistro, fechaActualizacion 
//         ) VALUES (?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         direccion, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarEdificio = async (edificio: EdificioInterfaz) => {
  const {
    direccion,
    fechaRegistro,
    fechaActualizacion,
  } = edificio;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('direccion', sql.VarChar(45), direccion)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO edificios (
          direccion, fechaRegistro, fechaActualizacion
        ) VALUES (
          @direccion, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar edificio:', error);
    throw error;
  }
};

// export const ObtenerEdifico = async (idEdificio:number) => {
   
//     try {

//         let query = "SELECT * FROM edificios WHERE 1=1";
//         const params: any[] = [];

//         if (idEdificio) {
//             query += " AND dni = ?";
//             params.push(idEdificio);
//         }

//         const [rows] = await db.execute(query);
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

export const obtenerEdificio = async (idEdificio: number): Promise<EdificioInterfaz | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT * 
      FROM edificios 
      WHERE idEdificio = @idEdificio
    `;

    const result = await db.request()
      .input('idEdificio', sql.Int, idEdificio)
      .query(query);

    const data = result.recordset;

    return data.length > 0 ? data[0] : null;

  } catch (error) {
    console.error('❌ Error al obtener edificio:', error);
    return null;
  }
};



// export const ListarEdificios = async (): Promise<EdificioInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT direccion, fechaRegistro, fechaActualizacion FROM edificios`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarEdificios = async (): Promise<EdificioInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT direccion, fechaRegistro, fechaActualizacion 
      FROM edificios
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;

  } catch (error) {
    console.error('❌ Error al listar edificios:', error);
    return null;
  }
};

type ListarEdificioSinFecha = Omit<EdificioInterfaz, "fechaRegistro" | "fechaActualizacion">;

// export const ListarEdificiosNameId = async (): Promise<ListarEdificioSinFecha[] | null> => {
    
//     try {
//         let query = `SELECT idEdificio, direccion FROM edificios limit 10`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarEdificiosNameId = async (): Promise<ListarEdificioSinFecha[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT TOP 10 idEdificio, direccion 
      FROM edificios
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar edificios (Name & ID):', error);
    return null;
  }
};