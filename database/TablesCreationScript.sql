CREATE TABLE `cargos` (
  `ID_CARGO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_CARGO` varchar(100) NOT NULL,
  `ID_DEPENDENCIA` int DEFAULT '0',
  PRIMARY KEY (`ID_CARGO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `dependencias` (
  `ID_DEPENDENCIA` int NOT NULL AUTO_INCREMENT,
  `DEPENDENCIA` varchar(80) NOT NULL,
  PRIMARY KEY (`ID_DEPENDENCIA`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `procesos` (
  `ID_PROCESO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_PROCESO` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_PROCESO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `roles` (
  `ID_ROL` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_ROL` varchar(70) NOT NULL,
  PRIMARY KEY (`ID_ROL`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `tipo_control` (
  `ID_TIPO_CONTROL` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_TIPO_CONTROL` varchar(250) NOT NULL,
  PRIMARY KEY (`ID_TIPO_CONTROL`),
  UNIQUE KEY `NOMBRE_TIPO_CONTROL` (`NOMBRE_TIPO_CONTROL`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `personas` (
  `ID_PERSONA` int NOT NULL AUTO_INCREMENT,
  `ID_CARGO` int NOT NULL,
  `NOMBRES` varchar(30) NOT NULL,
  `APELLIDOS` varchar(30) NOT NULL,
  `IDENTIFICACION` varchar(20) NOT NULL,
  `TIPO_DOCUMENTO` varchar(50) NOT NULL,
  `EMAIL` varchar(80) NOT NULL,
  PRIMARY KEY (`ID_PERSONA`),
  UNIQUE KEY `IDENTIFICACION_UNIQUE` (`IDENTIFICACION`),
  UNIQUE KEY `EMAIL_UNIQUE` (`EMAIL`),
  KEY `ID_CARGO` (`ID_CARGO`),
  CONSTRAINT `personas_ibfk_1` FOREIGN KEY (`ID_CARGO`) REFERENCES `cargos` (`ID_CARGO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `usuarios` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `ID_PERSONA` int DEFAULT NULL,
  `ID_ROL` int NOT NULL,
  `USUARIO` varchar(70) NOT NULL,
  `PASSWORD` varchar(300) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`),
  KEY `ID_ROL` (`ID_ROL`),
  KEY `ID_PERSONA` (`ID_PERSONA`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`ID_ROL`) REFERENCES `roles` (`ID_ROL`),
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `cargo_persona` (
  `ID_CARGO` int NOT NULL,
  `ID_PERSONA` int NOT NULL,
  `FECHA_INICIO` date DEFAULT NULL,
  `NRO_RESOLUCION` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ID_CARGO`,`ID_PERSONA`),
  KEY `FK_CARGO_PERSONA2` (`ID_PERSONA`),
  CONSTRAINT `FK_CARGO_PERSONA` FOREIGN KEY (`ID_CARGO`) REFERENCES `cargos` (`ID_CARGO`),
  CONSTRAINT `FK_CARGO_PERSONA2` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `ingresos` (
  `ID_INGRESO` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int DEFAULT NULL,
  `FECHA_INGRESO` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ROL_HISTORICO` varchar(20) NOT NULL,
  PRIMARY KEY (`ID_INGRESO`),
  KEY `FK_RELATIONSHIP_14` (`ID_USUARIO`),
  CONSTRAINT `FK_RELATIONSHIP_14` FOREIGN KEY (`ID_USUARIO`) REFERENCES `usuarios` (`ID_USUARIO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `planes_de_mejoramiento` (
  `ID_PLAN_MEJORAMIENTO` varchar(80) NOT NULL,
  `ID_PERSONA` int DEFAULT NULL,
  `PER_ID_PERSONA` int DEFAULT NULL,
  `NOMBRE_PLAN` varchar(150) NOT NULL,
  `FECHA_INICIO` date NOT NULL,
  `FECHA_FIN` date NOT NULL,
  `PATH_SOPORTE` varchar(120) NOT NULL,
  `PRORROGADO` tinyint(1) DEFAULT NULL,
  `ESTADO_PLAN` varchar(20) NOT NULL,
  `create_at` date NOT NULL,
  `ID_PROCESO` int DEFAULT NULL,
  `FECHA_SUSCRIPCION` date DEFAULT NULL,
  `avance` decimal(5,2) unsigned DEFAULT '0.00',
  `cumplimiento` decimal(5,2) unsigned DEFAULT '0.00',
  PRIMARY KEY (`ID_PLAN_MEJORAMIENTO`),
  KEY `FK_REL_AUDITOR_PLAN` (`ID_PERSONA`),
  KEY `FK_REL_LIDER_PROCESO_PLAN` (`PER_ID_PERSONA`),
  KEY `FK_PROCESO` (`ID_PROCESO`),
  CONSTRAINT `FK_PROCESO` FOREIGN KEY (`ID_PROCESO`) REFERENCES `procesos` (`ID_PROCESO`),
  CONSTRAINT `FK_REL_AUDITOR_PLAN` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`),
  CONSTRAINT `FK_REL_LIDER_PROCESO_PLAN` FOREIGN KEY (`PER_ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `hallazgos` (
  `ID_HALLAZGO` int NOT NULL AUTO_INCREMENT,
  `ID_PLAN_MEJORAMIENTO` varchar(80) DEFAULT NULL,
  `HALLAZGO` text NOT NULL,
  PRIMARY KEY (`ID_HALLAZGO`),
  KEY `FK_REL_HALLAZGO_PLAN` (`ID_PLAN_MEJORAMIENTO`),
  CONSTRAINT `FK_REL_HALLAZGO_PLAN` FOREIGN KEY (`ID_PLAN_MEJORAMIENTO`) REFERENCES `planes_de_mejoramiento` (`ID_PLAN_MEJORAMIENTO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `causas` (
  `ID_CAUSA` int NOT NULL AUTO_INCREMENT,
  `ID_HALLAZGO` int DEFAULT NULL,
  `CAUSA` text NOT NULL,
  PRIMARY KEY (`ID_CAUSA`),
  KEY `FK_REL_CAUSA_HALLAZGO` (`ID_HALLAZGO`),
  CONSTRAINT `FK_REL_CAUSA_HALLAZGO` FOREIGN KEY (`ID_HALLAZGO`) REFERENCES `hallazgos` (`ID_HALLAZGO`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `acciones` (
  `ID_ACCION` int NOT NULL AUTO_INCREMENT,
  `ID_CAUSA` int DEFAULT NULL,
  `ACCION` varchar(200) NOT NULL,
  `DESCRIPCION` text NOT NULL,
  PRIMARY KEY (`ID_ACCION`),
  KEY `FK_REL_ACCIONES_CAUSA` (`ID_CAUSA`),
  CONSTRAINT `FK_REL_ACCIONES_CAUSA` FOREIGN KEY (`ID_CAUSA`) REFERENCES `causas` (`ID_CAUSA`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `actividades` (
  `ID_ACTIVIDAD` int NOT NULL AUTO_INCREMENT,
  `ID_ACCION` int DEFAULT NULL,
  `PERIODICIDAD` varchar(30) NOT NULL,
  `INDICADOR` varchar(200) NOT NULL,
  `TIPO_UNIDAD` char(2) NOT NULL,
  `VALOR_UNIDAD` int NOT NULL,
  `RECURSO` varchar(100) NOT NULL,
  `ESTADO` varchar(50) DEFAULT NULL COMMENT 'Indica si la actividad fue aprobada o no con base en el total de las evidencias como aprobadas',
  `ID_RESPONSABLE` varchar(45) DEFAULT NULL,
  `fechaEjecucion` date DEFAULT NULL,
  `fechaSeguimiento` date DEFAULT NULL,
  `fechaTerminacion` date DEFAULT NULL,
  `descripcionActividad` varchar(501) DEFAULT NULL,
  `tipoEvidencia` VARCHAR(200) DEFAULT NULL,
  `avance` decimal(5,2) NOT NULL DEFAULT '0.00',
  `cumplimiento` varchar(2) NOT NULL DEFAULT '',
  PRIMARY KEY (`ID_ACTIVIDAD`),
  KEY `FK_REL_ACCCION_ACTIVIDADES` (`ID_ACCION`),
  CONSTRAINT `FK_REL_ACCCION_ACTIVIDADES` FOREIGN KEY (`ID_ACCION`) REFERENCES `acciones` (`ID_ACCION`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `evidencias` (
  `ID_EVIDENCIA` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador consecutivo de la evidencia ',
  `ID_ACTIVIDAD` int DEFAULT NULL,
  `EVIDENCIA` varchar(50) NOT NULL COMMENT 'Es el nombre de la evidencia que se carga a una actividad',
  `linkEvidencia` varchar(500) DEFAULT NULL,
  `fechaCargue` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID_EVIDENCIA`),
  KEY `FK_REL_EVIDENCIAS_ACTIVIDAD` (`ID_ACTIVIDAD`),
  CONSTRAINT `FK_REL_EVIDENCIAS_ACTIVIDAD` FOREIGN KEY (`ID_ACTIVIDAD`) REFERENCES `actividades` (`ID_ACTIVIDAD`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COMMENT='Tabla que registra las evidencias que soportan una actividad';

CREATE TABLE `evaluaciones` (
  `ID_EVALUACION` int NOT NULL AUTO_INCREMENT,
  `ID_PERSONA` int NOT NULL,
  `ID_EVIDENCIA` int DEFAULT NULL COMMENT 'Identificador consecutivo de la evidencia ',
  `OBSERVACION` text COMMENT 'Es un texto que describe lo obsevado sobre una evidencia\\\\\\\\r\\\\\\\\n            ',
  `FECHA_EVALUACION` date DEFAULT NULL COMMENT 'Es la fecha en la que se registra una evaluación sobre una evidencia cargada',
  `ESTADO` varchar(20) NOT NULL COMMENT 'Indica si la actividad fue aprobada o no con base en el total de las evidencias como aprobadas',
  PRIMARY KEY (`ID_EVALUACION`),
  KEY `FK_REL_EVALUACIONES_EVIDENCIA` (`ID_EVIDENCIA`),
  KEY `FK_RER_AUDITOR_EVALUADOR` (`ID_PERSONA`),
  CONSTRAINT `FK_RER_AUDITOR_EVALUADOR` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3 COMMENT='En esta tabla se registran las evaluaciones realizadas por u';

CREATE TABLE `observaciones` (
  `ID_OBSERVACION` int NOT NULL AUTO_INCREMENT,
  `ID_PLAN_MEJORAMIENTO` varchar(80) NOT NULL,
  `ID_PERSONA` int NOT NULL,
  `DESCRIPCION` text,
  `FECHA_REGISTRO` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ESTADO` varchar(30) NOT NULL COMMENT 'Indica si la actividad fue aprobada o no con base en el total de las evidencias como aprobadas',
  `TIPO_PLAN_MEJORA` varchar(30) DEFAULT NULL COMMENT 'Indica el tipo plan mejora al que pertenece la observacion 1:PLAN MEJORA - 2:HALLAZGOS - 3:CAUSAS - 4:ACCIONES - 5:ACTIVIDADES'
  PRIMARY KEY (`ID_OBSERVACION`,`ID_PLAN_MEJORAMIENTO`),
  KEY `FK_OBSERVACIONES2` (`ID_PERSONA`),
  KEY `FK_OBSERVACIONES` (`ID_PLAN_MEJORAMIENTO`),
  CONSTRAINT `FK_OBSERVACIONES` FOREIGN KEY (`ID_PLAN_MEJORAMIENTO`) REFERENCES `planes_de_mejoramiento` (`ID_PLAN_MEJORAMIENTO`),
  CONSTRAINT `FK_OBSERVACIONES2` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb3;

CREATE TABLE `rel_responsable_actividad` (
  `ID_PERSONA` int NOT NULL,
  `ID_ACTIVIDAD` int NOT NULL,
  PRIMARY KEY (`ID_PERSONA`,`ID_ACTIVIDAD`),
  KEY `FK_REL_RESPONSABLE_ACTIVIDAD2` (`ID_ACTIVIDAD`),
  CONSTRAINT `FK_REL_RESPONSABLE_ACTIVIDAD` FOREIGN KEY (`ID_PERSONA`) REFERENCES `personas` (`ID_PERSONA`),
  CONSTRAINT `FK_REL_RESPONSABLE_ACTIVIDAD2` FOREIGN KEY (`ID_ACTIVIDAD`) REFERENCES `actividades` (`ID_ACTIVIDAD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE `soportes` (
  `ID_EVIDENCIA` int DEFAULT NULL COMMENT 'Identificador consecutivo de la evidencia ',
  `ID_SOPORTE` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador del soporte cargado',
  `RUTA` varchar(100) DEFAULT NULL COMMENT 'Ruta lógica en la que se encuentra el archivo utilizado como evidencia',
  PRIMARY KEY (`ID_SOPORTE`),
  KEY `FK_REL_SOPORTES_EVIDENCIA` (`ID_EVIDENCIA`),
  CONSTRAINT `FK_REL_SOPORTES_EVIDENCIA` FOREIGN KEY (`ID_EVIDENCIA`) REFERENCES `evidencias` (`ID_EVIDENCIA`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COMMENT='Tabla que almacena las rutas lógicas de los soportes utiliza';

