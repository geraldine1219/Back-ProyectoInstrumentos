import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import sql from 'mssql'

dotenv.config();

// export const db = mysql.createPool({
//   host: process.env.DB_HOST,
//   port: Number(process.env.DB_PORT),
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

// export async function testDBConnection() {
//   try {
//     const connection = await db.getConnection();
//     await connection.ping(); // Verifica que la base de datos responda
//     console.log('✅ Conexión exitosa a la base de datos MySQL.');
//     connection.release();
//     return true;
//   } catch (error) {
//     console.error('❌ Error al conectar a la base de datos MySQL:', error);
//     return false;
//   }
// }

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER!,
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  },
  connectionTimeout: 30000
}

export const testDBConnection = async () => {
  try {
    const pool = await sql.connect(config)
    console.log('✅ Conectado correctamente a Azure SQL')

    await crearTablaAdmins(pool);
    await crearTablaAlumnoHorario(pool);
    await crearTablaAlumnos(pool);
    await crearTablaAsignaturas(pool);
    await crearTablaAulas(pool);
    await crearTablaClases(pool);
    await crearTablaEdificios(pool);
    await crearTablaHorarios(pool);
    await crearTablaInstrumentos(pool);
    await crearTablaPensuls(pool);
    await crearTablaProfesores(pool);

    // Consulta para contar las tablas
    const result = await pool.request().query(`
      SELECT COUNT(*) AS totalTables
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_TYPE = 'BASE TABLE'
    `)

    const totalTables = result.recordset[0].totalTables
    console.log(`📊 Total de tablas: ${totalTables}`)

    return pool
  } catch (err) {
    console.error('❌ Error de conexión:', err)
  }
}


let pool: sql.ConnectionPool;

export const getDB = async (): Promise<sql.ConnectionPool> => {
  if (pool) {
    return pool;
  }

  try {
    pool = await sql.connect(config);
    console.log('✅ Conexión a SQL Server establecida');
    return pool;
  } catch (err) {
    console.error('❌ Error al conectar con SQL Server:', err);
    throw err;
  }
};









const crearTablaAdmins = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'admins' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE admins (
        idAdmin INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        nombre VARCHAR(45) NOT NULL,
        apellido VARCHAR(45) NOT NULL,
        contraseña VARCHAR(90) NOT NULL,
        email VARCHAR(45) NOT NULL UNIQUE,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "admins" verificada o creada correctamente.');
};

const crearTablaAlumnoHorario = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'alumnohorario' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE alumnohorario (
        idAlumnoHorario INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        idAlumno VARCHAR(45) NOT NULL,
        idHorario VARCHAR(45) NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "alumnohorario" verificada o creada correctamente.');
};

const crearTablaAlumnos = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'alumnos' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE alumnos (
        idAlumno INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        nombre VARCHAR(45) NOT NULL,
        apellido VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        contraseña VARCHAR(90) NOT NULL,
        fechaNacimientoAlumno DATE NULL,
        telefonoContacto VARCHAR(45) NULL,
        dni VARCHAR(45) NOT NULL,
        fechaRegistro DATETIME NULL,
        fechaActualizacion DATETIME NULL,
        edad INT NULL,
        CONSTRAINT UQ_dni UNIQUE (dni)
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "alumnos" verificada o creada correctamente.');
};

const crearTablaAsignaturas = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'asignaturas' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE asignaturas (
        idAsignatura INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        nombreAsignatura VARCHAR(45) NULL,
        horasRequeridas INT NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL,
        CONSTRAINT UQ_nombreAsignatura UNIQUE (nombreAsignatura)
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "asignaturas" verificada o creada correctamente.');
};

const crearTablaAulas = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'aulas' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE aulas (
        idAula INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        idEdificio VARCHAR(45) NOT NULL,
        nombre VARCHAR(45) NOT NULL,
        tipo VARCHAR(45) NOT NULL,
        capacidadAlumnos INT NOT NULL,
        disponibilidadOrdenador BIT NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "aulas" verificada o creada correctamente.');
};

const crearTablaClases = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'clases' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE clases (
        idClase INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        idAsignatura INT NOT NULL,
        idProfesor INT NOT NULL,
        idInstrumento INT NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "clases" verificada o creada correctamente.');
};

const crearTablaEdificios = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'edificios' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE edificios (
        idEdificio INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        direccion VARCHAR(45) NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "edificios" verificada o creada correctamente.');
};

const crearTablaHorarios = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'horarios' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE horarios (
        idHorario INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        idAula INT NOT NULL,
        idClase INT NOT NULL,
        dia VARCHAR(45) NOT NULL,
        hour VARCHAR(45) NOT NULL,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "horarios" verificada o creada correctamente.');
};

const crearTablaInstrumentos = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'instrumentos' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE instrumentos (
        idInstrumento INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        nombreInstrumento VARCHAR(45) NOT NULL,
        tipo VARCHAR(45) NOT NULL,
        edadRecomendada INT NOT NULL,
        perteneceAlInstituto BIT NOT NULL DEFAULT 0,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "instrumentos" verificada o creada correctamente.');
};

const crearTablaPensuls = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'pensuls' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE pensuls (
        idPensul INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        idAlumno INT NOT NULL,
        idClase INT NOT NULL,
        nota FLOAT DEFAULT 0,
        fechaRegistro DATETIME NOT NULL,
        fechaActualizacion DATETIME NOT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "pensuls" verificada o creada correctamente.');
};

const crearTablaProfesores = async (pool: sql.ConnectionPool) => {
  const query = `
    IF NOT EXISTS (
      SELECT * FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_NAME = 'profesores' AND TABLE_SCHEMA = 'dbo'
    )
    BEGIN
      CREATE TABLE profesores (
        idProfesor INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
        nombre VARCHAR(45) NOT NULL,
        apellido VARCHAR(45) NOT NULL,
        email VARCHAR(45) NOT NULL,
        contraseña VARCHAR(90) NOT NULL,
        fechaNacimientoProfesor DATETIME NULL,
        telefonoContacto VARCHAR(45) NULL,
        dni VARCHAR(45) NOT NULL,
        profesorescol VARCHAR(45) NULL,
        fechaRegistro DATETIME NULL,
        fechaActualizacion DATETIME NULL,
        edad INT NULL
      );
    END;
  `;
  await pool.request().query(query);
  console.log('✅ Tabla "profesores" verificada o creada correctamente.');
};