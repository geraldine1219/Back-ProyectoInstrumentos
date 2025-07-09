
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { ClaseInterfaz } from "../interfaces/clase.interfaces";

// export const guardarClase = async (clase: ClaseInterfaz) => {

//     const { 
//         idAsignatura, idProfesor, idInstrumento , fechaRegistro, fechaActualizacion, 
//     } = clase;

//     const query = `
//         INSERT INTO clases (
//             idAsignatura, idProfesor, idInstrumento , fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         idAsignatura, idProfesor, idInstrumento, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarClase = async (clase: ClaseInterfaz) => {
  const {
    idAsignatura,
    idProfesor,
    idInstrumento,
    fechaRegistro,
    fechaActualizacion
  } = clase;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('idAsignatura', sql.Int, idAsignatura)
      .input('idProfesor', sql.Int, idProfesor)
      .input('idInstrumento', sql.Int, idInstrumento)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO clases (
          idAsignatura, idProfesor, idInstrumento, fechaRegistro, fechaActualizacion
        ) VALUES (
          @idAsignatura, @idProfesor, @idInstrumento, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar clase:', error);
    throw error;
  }
};

// export const ObtenerClase = async (idClase:number) => {

//     let query = `
//         SELECT 
//             clases.idClase,        
//             asignaturas.nombreAsignatura,
//             profesores.nombre,
//             profesores.apellido,
//             profesores.email,
//             profesores.dni,
//             instrumentos.nombreInstrumento,
//             instrumentos.tipo,
//             instrumentos.edadRecomendada,
//             instrumentos.perteneceAlInstituto,
//             clases.fechaRegistro,
//             clases.fechaActualizacion
//         FROM clases
//         LEFT JOIN asignaturas ON clases.idAsignatura = asignaturas.idAsignatura
//         LEFT JOIN profesores ON clases.idProfesor = profesores.idProfesor
//         LEFT JOIN instrumentos ON clases.idInstrumento = instrumentos.idInstrumento
//         WHERE 1=1
//     `;
    
//     const params: any[] = [];

//     if (idClase) {
//         query += " AND clases.idClase = ?";
//         params.push(idClase);
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

export const ObtenerClase = async (idClase: number) => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        clases.idClase,        
        asignaturas.nombreAsignatura,
        profesores.nombre,
        profesores.apellido,
        profesores.email,
        profesores.dni,
        instrumentos.nombreInstrumento,
        instrumentos.tipo,
        instrumentos.edadRecomendada,
        instrumentos.perteneceAlInstituto,
        clases.fechaRegistro,
        clases.fechaActualizacion
      FROM clases
      LEFT JOIN asignaturas ON clases.idAsignatura = asignaturas.idAsignatura
      LEFT JOIN profesores ON clases.idProfesor = profesores.idProfesor
      LEFT JOIN instrumentos ON clases.idInstrumento = instrumentos.idInstrumento
      WHERE clases.idClase = @idClase
    `;

    const result = await db.request()
      .input('idClase', sql.Int, idClase)
      .query(query);

    const data = result.recordset;

    return data.length ? data[0] : null;
  } catch (error) {
    console.error('❌ Error al obtener clase:', error);
    return {};
  }
};


// export const ListarClases = async (): Promise<ClaseInterfaz[] | null> => {
//     try {
//         let query = `SELECT * FROM clases`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }
// }

export const ListarClases = async (): Promise<ClaseInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `SELECT * FROM clases`;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar clases:', error);
    return null;
  }
};

// export const ListarClaseNameId = async (): Promise<ClaseInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idClase, idAsignatura FROM clases limit 10`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarClaseNameId = async (): Promise<ClaseInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT TOP 10 idClase, idAsignatura 
      FROM clases
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar clases (Name & ID):', error);
    return null;
  }
};