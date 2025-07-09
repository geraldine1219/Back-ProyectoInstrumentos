// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { PensulInterfaz } from "../interfaces/pensul.interfaces";

// export const guardarPensul = async (pensul: PensulInterfaz) => {

//     const {
//         idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
//      } = pensul;

//     const query = `
//         INSERT INTO pensuls (
//             idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarPensul = async (pensul: PensulInterfaz) => {
  const {
    idAlumno,
    idClase,
    nota,
    fechaRegistro,
    fechaActualizacion,
  } = pensul;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('idAlumno', sql.VarChar(45), idAlumno)
      .input('idClase', sql.VarChar(45), idClase)
      .input('nota', sql.Float, nota)
      .input('fechaRegistro', sql.DateTime, fechaRegistro)
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion)
      .query(`
        INSERT INTO pensuls (
          idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
        ) VALUES (
          @idAlumno, @idClase, @nota, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar pensul:', error);
    throw error;
  }
};


// export const ObtenerPensul = async (dni?:string, email?:string) => {

//     let query = "SELECT * FROM pensuls WHERE 1=1";
//     const params: any[] = [];

//     if (dni) {
//         query += " AND dni = ?";
//         params.push(dni);
//     }

//     if (email) {
//         query += " AND email = ?";
//         params.push(email);
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
//         return null;
//     }

// }

export const ObtenerPensul = async (idAlumno?: string, idClase?: string) => {
  try {
    const db = await getDB();

    let query = `SELECT * FROM pensuls WHERE 1=1`;
    const request = db.request();

    if (idAlumno) {
      query += ` AND idAlumno = @idAlumno`;
      request.input('idAlumno', sql.VarChar(45), idAlumno);
    }

    if (idClase) {
      query += ` AND idClase = @idClase`;
      request.input('idClase', sql.VarChar(45), idClase);
    }

    const result = await request.query(query);
    const data = result.recordset;

    return data.length ? data[0] : null;

  } catch (error) {
    console.error('❌ Error al obtener pensul:', error);
    return null;
  }
};

// export const ListarPensuls = async (): Promise<PensulInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idPensul,idAlumno, idClase, nota, fechaRegistro, fechaActualizacion FROM pensuls`;
//         const [rows] = await db.execute(query);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarPensuls = async (): Promise<PensulInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idPensul, idAlumno, idClase, nota, fechaRegistro, fechaActualizacion 
      FROM pensuls
    `;

    const result = await db.request().query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar pensuls:', error);
    return null;
  }
};

// export const ListarPensulsAlumno = async (idAlumno: string): Promise<PensulInterfaz[] | null> => {
    
//     try {
//         let query = `SELECT idPensul, idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
//             FROM pensuls
//             WHERE idAlumno = ?`;
//         const [rows] = await db.execute(query, [idAlumno]);
//         const data = rows as any[];
//         return data.length ? data : null;
//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const ListarPensulsAlumno = async (idAlumno: string): Promise<PensulInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT idPensul, idAlumno, idClase, nota, fechaRegistro, fechaActualizacion
      FROM pensuls
      WHERE idAlumno = @idAlumno
    `;

    const result = await db.request()
      .input('idAlumno', sql.VarChar(45), idAlumno)
      .query(query);

    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar pensuls por alumno:', error);
    return null;
  }
};


export const ListarPensulsAlumnosProfesor = async (idProfesor:string): Promise<PensulInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        alumn.idAlumno, 
        pen.idPensul,
        class.idClase,
        pen.nota,
        alumn.nombre as nombreAlumno,
        alumn.apellido as apellidoAlumno,
        asig.nombreAsignatura
      FROM pensuls pen
      INNER JOIN alumnos alumn ON alumn.idAlumno = pen.idAlumno
      INNER JOIN clases class ON pen.idClase = class.idClase
      INNER JOIN profesores prof ON prof.idProfesor = class.idProfesor
      INNER JOIN asignaturas asig ON asig.idAsignatura = class.idAsignatura
      WHERE prof.idProfesor = @idProfesor
    `;

    const result = await db.request()
      .input('idProfesor', sql.VarChar(45), idProfesor)
      .query(query);
    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al listar pensuls:', error);
    return null;
  }
};