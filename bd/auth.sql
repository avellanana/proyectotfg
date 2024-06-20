create database auth;
use auth;

select * from usuario;
select * from constelaciones;
select * from meditation;
select * from constelaciones_desbloqueadas;

create table usuario (
    id int auto_increment primary key,
    nombreusuario varchar(50) not null,
    password varchar(50) not null,
    email varchar(100) not null
);

create table constelaciones(
id int auto_increment primary key,
constelacion varchar(50),
nombre_archivo varchar(50),
descripcion varchar(200),
estrellas_constelacion int
);

create table constelaciones_desbloqueadas (
    id int auto_increment primary key,
    usuario_id int not null,
    const_id int not null,
    fecha_desbloqueo datetime not null,
    estrellas_desbloqueadas int not null
);

create table meditation(
id int auto_increment primary key,
usuario_id int not null,
fecha datetime not null,
tiempo int not null
);

INSERT INTO constelaciones_desbloqueadas (usuario_id, const_id, fecha_desbloqueo, estrellas_desbloqueadas) values 
(2, 3, '2024-06-07 01:36:13',4);

INSERT INTO meditation (usuario_id, fecha, tiempo) values (1,'2024-06-19 02:42:02',2);
INSERT INTO meditation (usuario_id, fecha, tiempo) values (1,'2024-06-19 02:52:02',2);
INSERT INTO meditation (usuario_id, fecha, tiempo) values (1,'2024-06-19 03:42:02',2);
INSERT INTO meditation (usuario_id, fecha, tiempo) values (1,'2024-06-19 03:45:02',2);
INSERT INTO meditation (usuario_id, fecha, tiempo) values (1,'2024-06-19 02:49:02',2);

INSERT INTO constelaciones (constelacion, nombre_archivo, descripcion, estrellas_constelacion) values 
('Andrómeda', 'andromeda', 'Símbolo de liberación y transformación, encarna la liberación de las cadenas de la opresión.', 15),
('Acuario', 'acuario', 'Portador de sabiduría y conocimiento, representa la purificación y renovación del espíritu.', 13),
('Aries', 'aries', 'Guerrero indomable, simboliza el comienzo de un nuevo ciclo y el despertar de la fuerza interior.', 4),
('Cancer', 'cancer', 'Protector del hogar y la familia, refleja la sensibilidad y la conexión emocional profunda.', 5),
('Capricornio', 'capricornio',  'Vincula lo terrenal con lo divino, ejemplifica la ambición y la superación espiritual.', 9),
('Casiopea', 'casiopea',  'Figura de confianza y orgullo, encarna la sabiduría y la resiliencia ante las adversidades.', 5),
('Centauro', 'centauro', 'Guardían del conocimiento oculto, representa la dualidad entre lo humano y lo divino.', 14),
('Cefeus', 'cefeus',  'Regente celestial, simboliza la justicia y la autoridad espiritual.', 5),
('Cetus', 'cetus', 'Emblema del inconsciente y las emociones profundas, refleja el poder de enfrentar y superar los miedos.', 8),
('Géminis', 'geminis', 'Unidad en la dualidad, representa la armonía entre opuestos y la conexión espiritual entre almas gemelas.', 10),
('Hércules', 'hercules', 'Encarnación del heroísmo y la inmortalidad, simboliza la victoria sobre las pruebas de la vida.', 14),
('Leo', 'leo', 'Fuerza y nobleza, representa el coraje y la autoconfianza para liderar con el corazón.', 11),
('Libra', 'libra', 'Balanza del equilibrio y la justicia, refleja la búsqueda de armonía y verdad en la vida.', 6),
('Orión', 'orion', 'Cazador celestial, simboliza la búsqueda y la conquista de los sueños más elevados.', 10),
('Osa Mayor', 'osamayor', 'Guía nocturna, representa la protección y la conexión eterna con el cosmos.', 15),
('Osa Menor', 'osamenor', 'Guardiana del norte, refleja la constancia y la guía espiritual en tiempos de oscuridad.', 7),
('Pegaso', 'pegaso', 'Libertad y elevación, simboliza la inspiración y la capacidad de superar las limitaciones terrenales.', 12),
('Perseo', 'perseo', 'Héroe y salvador, representa la valentía para enfrentar y superar los desafíos con determinación.', 9),
('Piscis', 'piscis', 'Flujo de la vida y la intuición, simboliza la unión espiritual y el viaje hacia el autoconocimiento.', 14),
('Sagitario', 'sagitario', 'Arquero de la verdad, representa la búsqueda incesante del conocimiento y la expansión espiritual.', 8);



drop table usuario;