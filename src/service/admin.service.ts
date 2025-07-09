// import { db } from "../db";

// Report
import { getDB } from '../db';
import sql from 'mssql';

import { AdminInterfaz } from "../interfaces/admin.interfaces";

// export const guardarAdmin = async (admin: AdminInterfaz) => {

//     const {
//         nombre, apellido, email, contraseña, fechaRegistro, fechaActualizacion
//      } = admin;

//     const query = `
//         INSERT INTO admins (
//             nombre, apellido, email, contraseña, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         nombre, apellido, email, contraseña, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarAdmin = async (admin: AdminInterfaz) => {
  const {
    nombre,
    apellido,
    email,
    contraseña,
    fechaRegistro,
    fechaActualizacion
  } = admin;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('nombre', sql.VarChar(45), nombre)
      .input('apellido', sql.VarChar(45), apellido)
      .input('email', sql.VarChar(45), email)
      .input('contraseña', sql.VarChar(90), contraseña)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO admins (
          nombre, apellido, email, contraseña, fechaRegistro, fechaActualizacion
        ) VALUES (
          @nombre, @apellido, @email, @contraseña, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar admin:', error);
    throw error;
  }
};


// export const ObtenerAdmin = async (dni?:string, email?:string) => {

//     let query = "SELECT * FROM admins WHERE 1=1";
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

export const ObtenerAdmin = async (dni?: string, email?: string) => {
  let query = "SELECT * FROM admins WHERE 1=1";
  const inputs: { name: string, type: sql.ISqlType, value: any }[] = [];

  if (dni) {
    query += " AND dni = @dni";
    inputs.push({ name: 'dni', type: sql.VarChar(45), value: dni });
  }

  if (email) {
    query += " AND email = @email";
    inputs.push({ name: 'email', type: sql.VarChar(45), value: email });
  }

  try {
    const db = await getDB();
    const request = db.request();

    // Agrega los parámetros dinámicos
    inputs.forEach(param => {
      request.input(param.name, param.type, param.value);
    });

    const result = await request.query(query);
    const data = result.recordset;

    return data.length > 0 ? data[0] : null;

  } catch (error) {
    console.error('❌ Error al obtener admin:', error);
    return null;
  }
};

