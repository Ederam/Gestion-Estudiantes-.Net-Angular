CREATE DATABASE GESTION_ESTUDIANTES;

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ESTUDIANTES]') AND type in (N'U'))
DROP TABLE [dbo].[ESTUDIANTES]
GO
CREATE TABLE dbo.ESTUDIANTES (
    ID_ESTUDIANTE INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ID_CLASE INT NOT NULL,
	NOMBRE VARCHAR(100),  
	--CONSTRAINT FK_ESTUDIANTE_CLASE FOREIGN KEY (ID_CLASE) REFERENCES CLASES (ID_CLASE), 
);
--QUITAR COLUMNA DE ID_CLASE EN TABLA ESTUDIANTES Y CONSTRAINT
ALTER TABLE dbo.ESTUDIANTES   
DROP CONSTRAINT FK_ESTUDIANTE_CLASE;  
GO
ALTER TABLE ESTUDIANTES drop column ID_CLASE;
SELECT * FROM ESTUDIANTES;

ALTER TABLE dbo.CLASES   
DROP CONSTRAINT FK_CLASE_MATERIA;  
GO
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[MATERIAS]') AND type in (N'U'))
DROP TABLE [dbo].[MATERIAS]
GO
CREATE TABLE dbo.MATERIAS (
    ID_MATERIA INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ID_PROFESOR INT,
	NOMBRE VARCHAR(100),
    CREDITOS INT NULL,    
);
--AGREGAR COLUMNA DE ID_PROFESOR
ALTER TABLE MATERIAS ADD ID_PROFESOR INT;
ALTER TABLE MATERIAS ADD FOREIGN KEY (ID_PROFESOR) REFERENCES PROFESORES(ID_PROFESOR);

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CLASES]') AND type in (N'U'))
DROP TABLE [dbo].[CLASES]
GO
CREATE TABLE dbo.CLASES (
    ID_CLASE INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	ID_MATERIA INT NOT NULL ,
	NOMBRE VARCHAR(100),
	HORARIO VARCHAR(50),
    CONSTRAINT FK_CLASE_MATERIA FOREIGN KEY (ID_MATERIA) REFERENCES MATERIAS (ID_MATERIA), 
);
--AGREGAR COLUMNA DE ID_PROFESOR
ALTER TABLE CLASES ADD FOREIGN KEY (ID_PROFESOR) REFERENCES PROFESORES(ID_PROFESOR);
--AGREGAR COLUMNA ID_ESTUDIANTE
ALTER TABLE CLASES ADD ID_ESTUDIANTE INT;
ALTER TABLE CLASES ADD FOREIGN KEY (ID_ESTUDIANTE) REFERENCES ESTUDIANTES(ID_ESTUDIANTE);
SELECT * FROM CLASES;

IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PROFESORES]') AND type in (N'U'))
DROP TABLE [dbo].[PROFESORES]
GO
CREATE TABLE dbo.PROFESORES (
    ID_PROFESOR INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	--ID_MATERIA INT NOT NULL ,
	NOMBRE VARCHAR(100),
    --CONSTRAINT FK_PROFESOR_MATERIA FOREIGN KEY (ID_MATERIA) REFERENCES MATERIAS (ID_MATERIA), 
);
INSERT INTO PROFESORES (NOMBRE) VALUES ('PEDRO PABLO PEREZ PUERTAS');
INSERT INTO PROFESORES (NOMBRE) VALUES ('CARLOS ANDRES GONZALEZ');
INSERT INTO PROFESORES (NOMBRE) VALUES ('ADRIANA ROJAS DAVILA');
INSERT INTO PROFESORES (NOMBRE) VALUES ('ANDRES ADRIAN MORALES GOMEZ');
INSERT INTO PROFESORES (NOMBRE) VALUES ('MARTINA ALEJANDRA GARCIA');
SELECT * FROM PROFESORES;


--insert materia
DBCC CHECKIDENT('MATERIAS' , RESEED, 0)
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('LITERATURA',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('FISICA CUANTICA',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('PROGRAMACION LINEAL',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('INFORMATICA',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('DIBUJO TECNICO',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('MATEMATICA',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('QUIMICA',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('ETICA PROFESIONAL',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('PENSAMIENTO',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('INGLES',3);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('LECTURA',4);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('SOCIALES',5);
INSERT INTO MATERIAS (NOMBRE, CREDITOS) VALUES('NATURALES',4);

SELECT * FROM MATERIAS;
DELETE FROM MATERIAS WHERE ID_MATERIA = 1;

--insert clase
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(1,'LIT1_D','DIURNO',1,1);
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(1,'LIT1_D','DIURNO',1,2);
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(1,'LIT1_N','DIURNO',2,3);
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(6,'MAT1_D','DIURNO',2,1);
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(5,'DIB1_D','DIURNO',3,1);
INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(7,'QUI1_D','DIURNO',3,3);
DELETE FROM CLASES;
DBCC CHECKIDENT('CLASES' , RESEED, 0)
SELECT * FROM CLASES;
SELECT * FROM CLASES WHERE ID_ESTUDIANTE = 1 AND ID_PROFESOR=4;
DELETE FROM CLASES WHERE ID_ESTUDIANTE = 1 AND ID_PROFESOR IN (3,4,5);

--insert estudiante
INSERT INTO ESTUDIANTES (ID_CLASE,NOMBRE) VALUES(1,'CAMILO RAMIREZ');
INSERT INTO ESTUDIANTES (ID_CLASE,NOMBRE) VALUES(1,'SEBASTIAN ROMERO');
INSERT INTO ESTUDIANTES (ID_CLASE,NOMBRE) VALUES(2,'DUVAN HERNANDEZ');
SELECT * FROM ESTUDIANTES;
--RESETEAR EL ID
DBCC CHECKIDENT('ESTUDIANTES' , RESEED, 0)
DELETE FROM ESTUDIANTES WHERE ID_ESTUDIANTE=1002; 

--EL ESTUDIANTE SE ADHIERE A UN PROGRAMA DE CREDITOS
--CLASES DE UN ESTUDIANTE
SELECT * FROM ESTUDIANTES;

SELECT * FROM CLASES;

--MATERIAS REGISTRADAS
SELECT * FROM MATERIAS;
--EL ESTUDIANTE SOLO PODRA SELECCIONAR 3 MATERIAS
SELECT E.NOMBRE NOMBRE_ESTUDIANTE,M.NOMBRE MATERIA, P.NOMBRE NOMBRE_PROFESOR 
FROM ESTUDIANTES E 
INNER JOIN CLASES C ON E.ID_ESTUDIANTE=C.ID_ESTUDIANTE
INNER JOIN MATERIAS M ON C.ID_MATERIA=M.ID_MATERIA 
INNER JOIN PROFESORES P ON P.ID_PROFESOR=C.ID_PROFESOR
WHERE E.ID_ESTUDIANTE=1;

--HAY 5 PROFESORES QUE DICTAN 2 MATERIAS CADA 1
SELECT P.NOMBRE NOMBRE_PROFESOR,M.NOMBRE MATERIA FROM PROFESORES P
--RIGHT JOIN CLASES C ON P.ID_PROFESOR=C.ID_PROFESOR
INNER JOIN MATERIAS M ON M.ID_PROFESOR=P.ID_PROFESOR
ORDER BY P.NOMBRE

--CADA ESTUDIANTES PUEDE VER EN LINEA LOS REGISTROS DE OTROS ESTUDIANTES
SELECT E.NOMBRE, M.NOMBRE FROM ESTUDIANTES E
INNER JOIN CLASES C ON E.ID_ESTUDIANTE=C.ID_ESTUDIANTE
INNER JOIN MATERIAS M ON C.ID_MATERIA=M.ID_MATERIA WHERE M.NOMBRE='LITERATURA'

--CREACION DE SP'S

--CARGA DE TODOS LOS ESTUDIANTES
CREATE PROCEDURE SP_ESTUDIANTES
AS 
BEGIN 
SELECT E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE
FROM ESTUDIANTES E
END 
EXEC SP_ESTUDIANTES

--CARGA INFORMACION DE LAS MATERIAS POR ID DE ESTUDIANTE
ALTER PROCEDURE SP_CARGAR_ESTUDIANTE @ID_ESTUDIANTE INT
AS 
BEGIN 
SELECT E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE
FROM ESTUDIANTES E  WHERE ID_ESTUDIANTE = @ID_ESTUDIANTE
END 
EXEC SP_CARGAR_ESTUDIANTE 1

--CARGA INFORMACION DE LAS MATERIAS POR ID DE ESTUDIANTE
ALTER PROCEDURE SP_CARGAR_MATERIAS_X_ESTUDIANTE @ID_ESTUDIANTE INT output  
AS 
BEGIN 
SELECT E.ID_ESTUDIANTE,E.NOMBRE NOMBRE_ESTUDIANTE,M.NOMBRE MATERIA, P.NOMBRE NOMBRE_PROFESOR 
FROM ESTUDIANTES E 
INNER JOIN CLASES C ON E.ID_ESTUDIANTE=C.ID_ESTUDIANTE
INNER JOIN MATERIAS M ON C.ID_MATERIA=M.ID_MATERIA 
INNER JOIN PROFESORES P ON P.ID_PROFESOR=C.ID_PROFESOR
WHERE E.ID_ESTUDIANTE=@ID_ESTUDIANTE;
END 
--EJECUCION DE SP
EXEC SP_CARGAR_MATERIAS_X_ESTUDIANTE 1

--CARGA DE INFORMACION DE LAS MATERIAS DE LOS PROFESORES
ALTER PROCEDURE SP_CARGAR_INFO_PROFESORES 
AS 
BEGIN 

SELECT P.ID_PROFESOR,P.NOMBRE NOMBRE_PROFESOR,M.ID_MATERIA, M.NOMBRE MATERIA FROM PROFESORES P
INNER JOIN MATERIAS M ON M.ID_PROFESOR=P.ID_PROFESOR
ORDER BY P.NOMBRE;

END 

--EJECUCION DE SP
EXEC SP_CARGAR_INFO_PROFESORES
SELECT * FROM PROFESORES;
SELECT * FROM MATERIAS;

--CREAR ESTUDIANTE
CREATE PROCEDURE SP_CREAR_ESTUDIANTE @NOMBRE_COMPLETO VARCHAR(50)
AS 
BEGIN 

INSERT INTO ESTUDIANTES (NOMBRE) VALUES(@NOMBRE_COMPLETO);

END 
EXEC SP_CREAR_ESTUDIANTE 'VLACHO';
SELECT * FROM ESTUDIANTES;

--ELIMINAR ESTUDIANTE
CREATE PROCEDURE SP_ELIMINAR_ESTUDIANTE @ID_ESTUDIANTE INT
AS 
BEGIN 

DELETE FROM ESTUDIANTES WHERE ID_ESTUDIANTE=@ID_ESTUDIANTE;

END
EXEC SP_ELIMINAR_ESTUDIANTE 1001;
SELECT * FROM ESTUDIANTES;

--EDITAR ESTUDIANTE
CREATE PROCEDURE SP_EDITAR_ESTUDIANTE @ID_ESTUDIANTE INT, @NOMBRE_ESTUDIANTE VARCHAR(50)
AS 
BEGIN 

UPDATE ESTUDIANTES SET NOMBRE=@NOMBRE_ESTUDIANTE WHERE ID_ESTUDIANTE=@ID_ESTUDIANTE;

END
EXEC SP_EDITAR_ESTUDIANTE 1007,'GIOVANNY HERNANDES';
SELECT * FROM ESTUDIANTES;

--SP CREAR CLASE
CREATE PROCEDURE SP_CREAR_CLASE @IDMATERIA INT,@NOMBRECLASE VARCHAR(50),@HORARIO VARCHAR(50),@IDPROFESOR INT,@IDESTUDIANTE INT
AS 
BEGIN 

INSERT INTO CLASES(ID_MATERIA,NOMBRE,HORARIO,ID_PROFESOR,ID_ESTUDIANTE) VALUES(@IDMATERIA,@NOMBRECLASE,@HORARIO,@IDPROFESOR,@IDESTUDIANTE);

END 
EXEC SP_CREAR_CLASE 8,'XXX1_D','DIURNO',4,1;
SELECT * FROM CLASES;

-------MATERIAS O CURSOS 

--CARGA DE INFORMACION DE LAS MATERIAS DE LOS PROFESORES
CREATE PROCEDURE SP_CARGAR_MATERIAS
AS 
BEGIN 

SELECT ID_MATERIA, NOMBRE, CREDITOS FROM MATERIAS;

END 

--EJECUCION DE SP
EXEC SP_CARGAR_MATERIAS
SELECT * FROM MATERIAS;

--LISTAR INFORMACION DE MATERIAS
CREATE PROCEDURE SP_INFO_MATERIAS
AS 
BEGIN 

SELECT M.ID_MATERIA, M.NOMBRE, M.CREDITOS, P.NOMBRE PROFESOR
FROM MATERIAS M
INNER JOIN PROFESORES P ON M.ID_PROFESOR = P.ID_PROFESOR;

END 

--EJECUCION DE SP
EXEC SP_INFO_MATERIAS
SELECT * FROM MATERIAS;

--CREAR MATERIAS
CREATE PROCEDURE SP_CREAR_MATERIA @NOMBRE_MATERIA VARCHAR(50),@CREDITOS INT,@ID_PROFESOR INT
AS 
BEGIN 

INSERT INTO MATERIAS(NOMBRE,CREDITOS,ID_PROFESOR) VALUES(@NOMBRE_MATERIA,@CREDITOS,@ID_PROFESOR);

END 
EXEC SP_CREAR_MATERIA 'TEOLOGIA',1,1;
SELECT * FROM MATERIAS;

--EDITAR MATERIAS
CREATE PROCEDURE SP_EDITAR_MATERIA @ID_MAT INT, @NOMBRE_MATERIA VARCHAR(50), @CRED INT, @ID_PROFESOR INT
AS 
BEGIN 

UPDATE MATERIAS SET NOMBRE=@NOMBRE_MATERIA,CREDITOS = @CRED, ID_PROFESOR = @ID_PROFESOR 
WHERE ID_MATERIA=@ID_MAT;

END
EXEC SP_EDITAR_MATERIA 2,'FISICA',4,2;
SELECT * FROM MATERIAS;

--ELIMINAR MATERIA
CREATE PROCEDURE SP_ELIMINAR_MATERIA @ID_MATERIA INT
AS 
BEGIN 

DELETE FROM MATERIAS WHERE ID_MATERIA=@ID_MATERIA;

END
EXEC SP_ELIMINAR_MATERIA 5;
SELECT * FROM MATERIAS;


-------PROFESORES

--INSERTAR PROFESOR
CREATE PROCEDURE SP_CREAR_PROFESOR @NOMBRE_PROFESOR VARCHAR(50)
AS 
BEGIN 

INSERT INTO PROFESORES(NOMBRE) VALUES(@NOMBRE_PROFESOR);

END 
EXEC SP_CREAR_PROFESOR 'GILDARDO MONCADA';
SELECT * FROM PROFESORES;

--EDITAR PROFESOR
CREATE PROCEDURE SP_EDITAR_PROFESOR @ID_PROFESOR INT, @NOMBRE_PROFESOR VARCHAR(50)
AS 
BEGIN 

UPDATE PROFESORES SET NOMBRE=@NOMBRE_PROFESOR WHERE ID_PROFESOR=@ID_PROFESOR;

END
EXEC SP_EDITAR_PROFESOR 6,'GILDARDO NIETO';
SELECT * FROM PROFESORES;

--ELIMINAR PROFESOR
CREATE PROCEDURE SP_ELIMINAR_PROFESOR @ID_PROFESOR INT
AS 
BEGIN 

DELETE FROM PROFESORES WHERE ID_PROFESOR=@ID_PROFESOR;

END
EXEC SP_ELIMINAR_PROFESOR 6;
SELECT * FROM PROFESORES;

--CARGA INFORMACION DE PROFESOR POR ID
CREATE PROCEDURE SP_CARGAR_PROFESOR @ID_PROFESOR INT
AS 
BEGIN 
SELECT E.ID_PROFESOR,E.NOMBRE NOMBRE_PROFESOR
FROM PROFESORES E  WHERE ID_PROFESOR = @ID_PROFESOR
END 
EXEC SP_CARGAR_PROFESOR 1

---------------CALIFICACIONES

--CREACION DE LA TABLA PARA CALIFICACIONES
CREATE TABLE dbo.CALIFICACIONES (
    ID_CALIFICACION INT IDENTITY(1,1) NOT NULL PRIMARY KEY,
	VALOR_CALIFICACION FLOAT NOT NULL,
	STATUS INT NOT NULL,
	ID_MATERIA INT NOT NULL,
	ID_ESTUDIANTE INT NOT NULL,	
	CONSTRAINT FK_CAL_MATERIA FOREIGN KEY (ID_MATERIA) REFERENCES MATERIAS (ID_MATERIA), 
	CONSTRAINT FK_CAL_EST FOREIGN KEY (ID_ESTUDIANTE) REFERENCES ESTUDIANTES (ID_ESTUDIANTE), 
	
);

SELECT * FROM MATERIAS;
SELECT * FROM CALIFICACIONES;

--INSERTAR CALIFICACION
ALTER PROCEDURE SP_CREAR_CALIFICACION @NOTA FLOAT,@ID_MATERIA INT, @ID_ESTUDIANTE INT
AS 
BEGIN 
DECLARE @STATUS FLOAT =0;
IF (@NOTA >= 3)  
 SET @STATUS = 1;

INSERT INTO CALIFICACIONES(VALOR_CALIFICACION,STATUS,ID_MATERIA,ID_ESTUDIANTE) VALUES(@NOTA,@STATUS,@ID_MATERIA,@ID_ESTUDIANTE);

END 
EXEC SP_CREAR_CALIFICACION 3,2,2;
SELECT * FROM CALIFICACIONES;

--EDITAR CALIFICACION
ALTER PROCEDURE SP_EDITAR_CALIFICACION @ID_CAL INT, @VALOR FLOAT
AS 
BEGIN 

DECLARE @STATUS FLOAT =0;
IF (@VALOR >= 3)  
 SET @STATUS = 1;

UPDATE CALIFICACIONES SET VALOR_CALIFICACION=@VALOR, STATUS=@STATUS WHERE ID_CALIFICACION=@ID_CAL;

END
EXEC SP_EDITAR_CALIFICACION 1,4;
SELECT * FROM CALIFICACIONES;

--ELIMINAR CALIFICACION
CREATE PROCEDURE SP_ELIMINAR_CALIFICACION @ID_CAL INT
AS 
BEGIN 

DELETE FROM CALIFICACIONES WHERE ID_CALIFICACION=@ID_CAL;

END
EXEC SP_ELIMINAR_CALIFICACION 2;
SELECT * FROM CALIFICACIONES;

--CARGA INFORMACION DE LAS CALIFICACIONES
ALTER PROCEDURE SP_INFO_CALIFICACIONES @ID_CAL INT
AS 
BEGIN 

SELECT C.ID_CALIFICACION, C.VALOR_CALIFICACION, C.STATUS,
	CASE C.STATUS WHEN 0 THEN 'PERDIDO' ELSE 'APROBADO' END ESTADO_FINAL, 
	M.NOMBRE MATERIA, P.NOMBRE PROFESOR, E.NOMBRE ESTUDIANTE
FROM CALIFICACIONES C 
INNER JOIN MATERIAS M ON M.ID_MATERIA = C.ID_MATERIA
INNER JOIN PROFESORES P ON P.ID_PROFESOR = M.ID_PROFESOR
INNER JOIN ESTUDIANTES E ON E.ID_ESTUDIANTE= C.ID_ESTUDIANTE
WHERE C.ID_CALIFICACION = @ID_CAL;
--SELECT * FROM ESTUDIANTES;
--SELECT * FROM MATERIAS;
--SELECT * FROM PROFESORES;


--SELECT E.ID_PROFESOR,E.NOMBRE NOMBRE_PROFESOR
--FROM PROFESORES E  WHERE ID_PROFESOR = @ID_PROFESOR
END 
EXEC SP_INFO_CALIFICACIONES 1

----CALIFICACIONES
