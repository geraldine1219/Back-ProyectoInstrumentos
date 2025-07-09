
// import { db } from "../db";

import { getDB } from '../db';
import sql from 'mssql';

import { AlumnoHorarioInterfaz } from "../interfaces/alumnoHorario.interfaces";

// export const guardarAlumnoHorario = async (alumnoHorario: AlumnoHorarioInterfaz) => {

//     const { 
//         idAlumno, idHorario, fechaRegistro, fechaActualizacion, 
//     } = alumnoHorario;

//     const query = `
//         INSERT INTO alumnoHorario (
//             idAlumno, idHorario, fechaRegistro, fechaActualizacion
//         ) VALUES (?, ?, ?, ?)
//     `;

//     const [result] = await db.execute(query, [
//         idAlumno, idHorario, fechaRegistro, fechaActualizacion
//     ]);

//     return result;

// }

export const guardarAlumnoHorario = async (alumnoHorario: AlumnoHorarioInterfaz) => {
  const {
    idAlumno,
    idHorario,
    fechaRegistro,
    fechaActualizacion
  } = alumnoHorario;

  try {
    const db = await getDB();

    const result = await db.request()
      .input('idAlumno', sql.Int, idAlumno)
      .input('idHorario', sql.Int, idHorario)
      .input('fechaRegistro', sql.DateTime, fechaRegistro || new Date())
      .input('fechaActualizacion', sql.DateTime, fechaActualizacion || new Date())
      .query(`
        INSERT INTO alumnoHorario (
          idAlumno, idHorario, fechaRegistro, fechaActualizacion
        ) VALUES (
          @idAlumno, @idHorario, @fechaRegistro, @fechaActualizacion
        )
      `);

    return result;
  } catch (error) {
    console.error('❌ Error al guardar alumnoHorario:', error);
    throw error;
  }
};

// export const getHorarioAlumnoNameId = async (idAlumno:string): Promise<AlumnoHorarioInterfaz[] | null> => {
    
//     try {

//         const query = `
//             SELECT alumhor.idHorario, dia, hour, nombreAsignatura, 
//                     horasRequeridas, prof.nombre as nombreProfesor, 
//                     apellido as apellidoProfesor, email as emailProfesor, 
//                     telefonoContacto as telefonoContactoProfesor, 
//                     profesorescol as especialidadProfesor,
//                     aul.nombre as nombreAula,
//                     aul.disponibilidadOrdenador,
//                     edif.direccion,
//                     aul.tipo
//                 FROM alumnoHorario alumhor 
//                     INNER JOIN 
//                     horarios hor
//                     ON hor.idHorario = alumhor.idHorario
//                 INNER JOIN 
//                     aulas aul
//                 ON aul.idAula = hor.idAula
//                 INNER JOIN 
//                     clases class
//                 ON class.idClase = hor.idClase
//                 INNER JOIN 
//                     asignaturas asing
//                 ON asing.idAsignatura = class.idAsignatura
//                 INNER JOIN 
//                     profesores prof
//                 ON class.idProfesor = prof.idProfesor
//                 INNER JOIN 
//                     edificios edif
//                 ON aul.idEdificio = edif.idEdificio
//                 WHERE alumhor.idAlumno = ?`;
//         const [rows] = await db.execute(query, [idAlumno]);
//         // const [rows] = await db.execute(query);

//         console.log(rows)

//         const data = rows as any[];
//         return data.length ? data : null;

//     } catch (error) {
//         console.log(error)
//         return null;
//     }

// }

export const getHorarioAlumnoNameId = async (idAlumno: string): Promise<AlumnoHorarioInterfaz[] | null> => {
  try {
    const db = await getDB();

    const query = `
      SELECT 
        alumhor.idHorario,
        dia,
        hour,
        nombreAsignatura,
        horasRequeridas,
        prof.nombre AS nombreProfesor,
        prof.apellido AS apellidoProfesor,
        prof.email AS emailProfesor,
        prof.telefonoContacto AS telefonoContactoProfesor,
        prof.profesorescol AS especialidadProfesor,
        aul.nombre AS nombreAula,
        aul.disponibilidadOrdenador,
        edif.direccion,
        aul.tipo
      FROM alumnoHorario alumhor
        INNER JOIN horarios hor ON hor.idHorario = alumhor.idHorario
        INNER JOIN aulas aul ON aul.idAula = hor.idAula
        INNER JOIN clases class ON class.idClase = hor.idClase
        INNER JOIN asignaturas asing ON asing.idAsignatura = class.idAsignatura
        INNER JOIN profesores prof ON class.idProfesor = prof.idProfesor
        INNER JOIN edificios edif ON aul.idEdificio = edif.idEdificio
      WHERE alumhor.idAlumno = @idAlumno
    `;

    const result = await db.request()
      .input('idAlumno', sql.Int, parseInt(idAlumno)) // Asumiendo que es un INT en la DB
      .query(query);

    const data = result.recordset;

    return data.length ? data : null;
  } catch (error) {
    console.error('❌ Error al obtener horario del alumno:', error);
    return null;
  }
};