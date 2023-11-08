DELIMITER $$
CREATE PROCEDURE `COUNT_ACCIONES_ACTIVAS`()
BEGIN
SELECT count(A.ID_ACCION) FROM acciones as A
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H 
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as PM
    ON H.ID_PLAN_MEJORAMIENTO = PM.ID_PLAN_MEJORAMIENTO
    WHERE PM.ESTADO_PLAN != 'Inactivo';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ACCIONES_POR_PLAN`(in_id_plan VARCHAR(80))
BEGIN
	SELECT count(A.ID_ACCION) FROM acciones as A
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H 
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    WHERE H.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ACCIONES_POR_PROCESO`(in_id_proceso INT)
BEGIN
	SELECT count(A.ID_ACCION) FROM acciones as A
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H 
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as P
    ON H.ID_PLAN_MEJORAMIENTO = P.ID_PLAN_MEJORAMIENTO
    WHERE P.ID_PROCESO = in_id_proceso AND P.ESTADO_PLAN != 'Inactivo';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ACTIVIDADES_ACTIVAS`()
BEGIN
SELECT AC.id_actividad, AC.periodicidad, AC.indicador,
    AC.tipo_unidad, AC.valor_unidad, AC.recurso, AC.estado,
    AC.fechaEjecucion, AC.fechaSeguimiento, AC.id_accion, AC.id_responsable,
    AC.fechaTerminacion, AC.descripcionActividad, AC.avance, AC.cumplimiento , AC.tipoEvidencia
    FROM actividades as AC
	INNER JOIN acciones as A
    ON AC.ID_ACCION = A.ID_ACCION
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H 
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as PM
    ON H.ID_PLAN_MEJORAMIENTO = PM.ID_PLAN_MEJORAMIENTO
    WHERE PM.ESTADO_PLAN != 'Inactivo';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_CUMPLIMIENTO_ACTIVIDADES`(in_id_plan VarChar(80))
BEGIN
	SELECT COUNT(ac.ID_ACTIVIDAD) AS CANTIDAD
    FROM planes_de_mejoramiento pm
    INNER JOIN hallazgos h
    ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
    INNER JOIN causas c
    ON h.ID_HALLAZGO = c.ID_HALLAZGO
    INNER JOIN acciones a
    ON c.ID_CAUSA = a.ID_CAUSA
    INNER JOIN actividades ac
    ON a.ID_ACCION = ac.ID_ACCION
    WHERE pm.ID_PLAN_MEJORAMIENTO = in_id_plan and ac.cumplimiento = "SI"; 
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ESTADO_ACTIVIDADES`()
BEGIN
	SELECT COUNT(ID_ACTIVIDAD) as CANTIDAD, ESTADO
    FROM actividades
    GROUP BY ESTADO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ESTADO_PLANES_PROCESO`(in_id_proceso INT)
BEGIN
	SELECT COUNT(ID_PLAN_MEJORAMIENTO) AS CANTIDAD, ESTADO_PLAN AS ESTADO
    FROM planes_de_mejoramiento
    WHERE ID_PROCESO = in_id_proceso
    GROUP BY ESTADO_PLAN;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ESTADOS_ACTIVIDADES_PLAN`(in_id_plan VarChar(80))
BEGIN
	SELECT COUNT(ac.ID_ACTIVIDAD) AS CANTIDAD, ac.ESTADO AS ESTADO
    FROM planes_de_mejoramiento pm
    INNER JOIN hallazgos h
    ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
    INNER JOIN causas c
    ON h.ID_HALLAZGO = c.ID_HALLAZGO
    INNER JOIN acciones a
    ON c.ID_CAUSA = a.ID_CAUSA
    INNER JOIN actividades ac
    ON a.ID_ACCION = ac.ID_ACCION
    WHERE pm.ID_PLAN_MEJORAMIENTO = in_id_plan
    GROUP BY ac.ESTADO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `COUNT_ESTADOS_ACTIVIDADES_PROCESO`(in_id_proceso INT)
BEGIN
	SELECT COUNT(act.ID_ACTIVIDAD) AS CANTIDAD, act.ESTADO AS ESTADO
    FROM actividades as act
    INNER JOIN acciones as A
    ON act.ID_ACCION = A.ID_ACCION
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as P
    ON H.ID_PLAN_MEJORAMIENTO = P.ID_PLAN_MEJORAMIENTO
    WHERE P.ID_PROCESO = in_id_proceso AND P.ESTADO_PLAN != 'Inactivo'
    group by act.ESTADO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_ACTIVIDAD_POR_IDPLAN`(in_id_plan VarChar(80))
BEGIN
    SELECT ac.id_actividad, ac.descripcionActividad
    FROM planes_de_mejoramiento pm
    INNER JOIN hallazgos h
    ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
    INNER JOIN causas c
    ON h.ID_HALLAZGO = c.ID_HALLAZGO
    INNER JOIN acciones a
    ON c.ID_CAUSA = a.ID_CAUSA
    INNER JOIN actividades ac
    ON a.ID_ACCION = ac.ID_ACCION
    WHERE pm.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_ACTIVIDADES_ACTIVAS`()
BEGIN
SELECT AC.id_actividad, AC.periodicidad, AC.indicador,
    AC.tipo_unidad, AC.valor_unidad, AC.recurso, AC.estado,
    AC.fechaEjecucion, AC.fechaSeguimiento, AC.id_accion, AC.id_responsable,
    AC.fechaTerminacion, AC.descripcionActividad, AC.avance, AC.cumplimiento 
    FROM actividades as AC
	INNER JOIN acciones as A
    ON AC.ID_ACCION = A.ID_ACCION
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H 
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as PM
    ON H.ID_PLAN_MEJORAMIENTO = PM.ID_PLAN_MEJORAMIENTO
    WHERE PM.ESTADO_PLAN != 'Inactivo';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_ACTIVIDADES_POR_PROCESO`(in_id_proceso INT)
BEGIN
	SELECT act.ID_ACTIVIDAD, act.ESTADO, act.AVANCE FROM actividades as act
    INNER JOIN acciones as A
    ON act.ID_ACCION = A.ID_ACCION
    INNER JOIN causas as C
    ON A.ID_CAUSA = C.ID_CAUSA
    INNER JOIN hallazgos as H
    ON C.ID_HALLAZGO = H.ID_HALLAZGO
    INNER JOIN planes_de_mejoramiento as P
    ON H.ID_PLAN_MEJORAMIENTO = P.ID_PLAN_MEJORAMIENTO
    WHERE P.ID_PROCESO = in_id_proceso AND P.ESTADO_PLAN != 'Inactivo';
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_ALL_ACTIVIDADES_POR_PLAN`(in_id_plan VarChar(80))
BEGIN
    SELECT ac.id_actividad, ac.periodicidad, ac.indicador,
    ac.tipo_unidad, ac.valor_unidad, ac.recurso, ac.estado,
    ac.fechaEjecucion, ac.fechaSeguimiento, ac.id_accion, ac.id_responsable,
    ac.fechaTerminacion, ac.descripcionActividad, ac.avance, ac.cumplimiento, ac.tipoEvidencia
    FROM planes_de_mejoramiento pm
    INNER JOIN hallazgos h
    ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
    INNER JOIN causas c
    ON h.ID_HALLAZGO = c.ID_HALLAZGO
    INNER JOIN acciones a
    ON c.ID_CAUSA = a.ID_CAUSA
    INNER JOIN actividades ac
    ON a.ID_ACCION = ac.ID_ACCION
    WHERE pm.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_AUDITOR_RESPONSABLE_ACTIVIDAD`(in_id_actividad INT)
BEGIN
    declare ID_AUDITOR int;
    SELECT plan.ID_PERSONA into ID_AUDITOR
    FROM planes_de_mejoramiento plan
    LEFT JOIN hallazgos hallazgo 
    ON plan.ID_PLAN_MEJORAMIENTO = hallazgo.ID_PLAN_MEJORAMIENTO
    LEFT JOIN causas causa 
    ON hallazgo.ID_HALLAZGO = causa.ID_HALLAZGO
    LEFT JOIN acciones accion 
    ON causa.ID_CAUSA = accion.ID_CAUSA
    LEFT JOIN actividades actividad 
    ON accion.ID_ACCION = actividad.ID_ACCION
    WHERE	actividad.ID_ACTIVIDAD = in_id_actividad;        
    select *
    from personas PER
    where PER.ID_PERSONA = ID_AUDITOR;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_EVIDENCIAS_POR_IDACTIVIDAD`(in_id_actividad INT)
BEGIN
	SELECT a.ID_ACTIVIDAD, e.ID_EVIDENCIA, s.ID_SOPORTE, eva.ID_EVALUACION, e.EVIDENCIA, e.fechaCargue, e.linkEvidencia,
	eva.ESTADO estadoEvaluacion, eva.OBSERVACION FROM actividades a 
	INNER JOIN evidencias e 
	ON a.ID_ACTIVIDAD = e.ID_ACTIVIDAD
	left JOIN soportes s 
	ON s.ID_EVIDENCIA = e.ID_EVIDENCIA
	INNER JOIN evaluaciones eva 
	ON eva.ID_EVIDENCIA = e.ID_EVIDENCIA
	WHERE	a.ID_ACTIVIDAD = in_id_actividad;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_FECHA_ULTIMO_SEGUIMIENTO_PLAN`(in_id_plan VARCHAR(80))
BEGIN
	SELECT MAX(ac.fechaSeguimiento) as FECHA  
    FROM planes_de_mejoramiento pm
    INNER JOIN hallazgos h
    ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
    INNER JOIN causas c
    ON h.ID_HALLAZGO = c.ID_HALLAZGO
    INNER JOIN acciones a
    ON c.ID_CAUSA = a.ID_CAUSA
    INNER JOIN actividades ac
    ON a.ID_ACCION = ac.ID_ACCION
    WHERE pm.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_RESUMEN_PLAN_MEJORAMIENTO`(in_id_plan VarChar(80))
BEGIN
	SELECT	PM.ID_PLAN_MEJORAMIENTO,PM.ID_PERSONA AS ID_RESPONSABLE,
	PM.NOMBRE_PLAN,
	CONCAT(RESPONSABLE.NOMBRES, ' ', RESPONSABLE.APELLIDOS) as responsable,
	PM.FECHA_FIN AS FECHA_CIERRE,
	IFNULL(max(eva.fecha_evaluacion), PM.FECHA_INICIO) as fecha_ultima_modificacion,
	PM.ESTADO_PLAN, O.DESCRIPCION 
	FROM planes_de_mejoramiento PM
	INNER JOIN personas RESPONSABLE
	ON PM.ID_PERSONA = RESPONSABLE.ID_PERSONA
	LEFT JOIN observaciones O
	ON O.ID_PLAN_MEJORAMIENTO = PM.ID_PLAN_MEJORAMIENTO
	INNER JOIN hallazgos h 
	ON PM.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c 
	ON h.ID_HALLAZGO = c.ID_HALLAZGO
	INNER JOIN acciones a 
	ON c.ID_CAUSA = a.ID_CAUSA
	INNER JOIN actividades ac 
	ON a.ID_ACCION = ac.ID_ACCION
	INNER JOIN evidencias e 
	ON ac.ID_ACTIVIDAD = e.ID_ACTIVIDAD
	INNER JOIN evaluaciones eva 
	ON e.ID_EVIDENCIA = eva.ID_EVIDENCIA
	WHERE PM.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_RESUMEN_PLAN_MEJORAMIENTO_MEJORADA`(in_id_plan VarChar(80))
BEGIN
	SELECT 	h.ID_HALLAZGO,h.HALLAZGO,
	c.ID_CAUSA, c.CAUSA, a.ID_ACCION,
	a.ACCION as TIPO_ACCION, a.DESCRIPCION,
	ac.ID_ACTIVIDAD, ac.INDICADOR,
	ac.VALOR_UNIDAD, ac.PERIODICIDAD,
	ac.RECURSO,
	CONCAT(RESPONSABLE.NOMBRES, ' ', RESPONSABLE.APELLIDOS) as responsable
	FROM planes_de_mejoramiento PM
	LEFT JOIN hallazgos h 
	ON PM.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
	LEFT JOIN causas c 
	ON h.ID_HALLAZGO = c.ID_HALLAZGO
	LEFT JOIN acciones a 
	ON c.ID_CAUSA = a.ID_CAUSA
	LEFT JOIN actividades ac 
	ON a.ID_ACCION = ac.ID_ACCION
	LEFT JOIN personas RESPONSABLE
	ON ac.ID_RESPONSABLE = RESPONSABLE.ID_PERSONA
	WHERE h.ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_TABLA_AUDITOR`(in_id_persona INT)
BEGIN
    SELECT pm.ID_PLAN_MEJORAMIENTO as id_plan,
	CONCAT(responsable.NOMBRES, ' ', responsable.APELLIDOS) as responsable,
	CONCAT(auditor.NOMBRES, ' ', auditor.APELLIDOS) as auditor,
	pm.nombre_plan,
	pm.ESTADO_PLAN,
	IFNULL(max(eva.fecha_evaluacion), pm.fecha_inicio) as fecha_ultima_modificacion,
	pm.FECHA_FIN,
	pm.cumplimiento as efectividad,
	pm.avance as porcentaje_avance
	FROM planes_de_mejoramiento pm
	INNER JOIN personas auditor
	ON pm.ID_PERSONA = auditor.ID_PERSONA
    INNER JOIN personas responsable 
	ON pm.PER_ID_PERSONA = responsable.ID_PERSONA
	LEFT JOIN hallazgos h 
	ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
	LEFT JOIN causas c 
	ON h.ID_HALLAZGO = c.ID_HALLAZGO
	LEFT JOIN acciones a 
	ON c.ID_CAUSA = a.ID_CAUSA
	LEFT JOIN actividades ac 
	ON a.ID_ACCION = ac.ID_ACCION
	LEFT JOIN evidencias e 
	ON ac.ID_ACTIVIDAD = e.ID_ACTIVIDAD
	LEFT JOIN evaluaciones eva 
	ON e.ID_EVIDENCIA = eva.ID_EVIDENCIA
	WHERE	pm.ID_PERSONA = in_id_persona
	GROUP BY pm.ID_PLAN_MEJORAMIENTO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_TABLA_AUDITOR_todo`(in_id_persona INT)
BEGIN
	declare EVALUACIONES_EFECTIVAS int;
	declare EVALUACIONES_NO_EFECTIVAS int;
	declare  EVALUACIONES_APROBADAS int;
	SELECT count(eva1.ID_EVALUACION) into EVALUACIONES_EFECTIVAS
	FROM planes_de_mejoramiento pm1
	INNER JOIN hallazgos h1 
	ON pm1.ID_PLAN_MEJORAMIENTO = h1.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c1 
	ON h1.ID_HALLAZGO = c1.ID_HALLAZGO
	INNER JOIN acciones a1 
	ON c1.ID_CAUSA = a1.ID_CAUSA
	INNER JOIN actividades ac1 
	ON a1.ID_ACCION = ac1.ID_ACCION
	INNER JOIN evidencias e1 
	ON ac1.ID_ACTIVIDAD = e1.ID_ACTIVIDAD
	INNER JOIN evaluaciones eva1 
	ON e1.ID_EVIDENCIA = eva1.ID_EVIDENCIA
	WHERE pm1.ID_PERSONA = in_id_persona
	AND eva1.ESTADO = 1
	AND eva1.FECHA_EVALUACION <= ac1.fechaEjecucion
	GROUP BY pm1.ID_PLAN_MEJORAMIENTO;
	SELECT count(eva2.ID_EVALUACION) into EVALUACIONES_NO_EFECTIVAS
	FROM planes_de_mejoramiento pm2
	INNER JOIN hallazgos h2
	ON pm2.ID_PLAN_MEJORAMIENTO = h2.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c2 
	ON h2.ID_HALLAZGO = c2.ID_HALLAZGO
	INNER JOIN acciones a2 
	ON c2.ID_CAUSA = a2.ID_CAUSA
	INNER JOIN actividades ac2
	ON a2.ID_ACCION = ac2.ID_ACCION
	INNER JOIN evidencias e2
	ON ac2.ID_ACTIVIDAD = e2.ID_ACTIVIDAD
	INNER JOIN evaluaciones eva2
	ON e2.ID_EVIDENCIA = eva2.ID_EVIDENCIA
	WHERE	pm2.ID_PERSONA = in_id_persona
	AND eva2.ESTADO = 1
	AND eva2.FECHA_EVALUACION > ac2.fechaEjecucion
	GROUP BY pm2.ID_PLAN_MEJORAMIENTO;
	SELECT count(eva3.ID_EVALUACION) into EVALUACIONES_APROBADAS
	FROM planes_de_mejoramiento pm3
	INNER JOIN hallazgos h3
	ON pm3.ID_PLAN_MEJORAMIENTO = h3.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c3 
	ON h3.ID_HALLAZGO = c3.ID_HALLAZGO
	INNER JOIN acciones a3 
	ON c3.ID_CAUSA = a3.ID_CAUSA
	INNER JOIN actividades ac3
	ON a3.ID_ACCION = ac3.ID_ACCION
	INNER JOIN evidencias e3
	ON ac3.ID_ACTIVIDAD = e3.ID_ACTIVIDAD
	INNER JOIN evaluaciones eva3
	ON e3.ID_EVIDENCIA = eva3.ID_EVIDENCIA
	WHERE pm3.ID_PERSONA = in_id_persona AND eva3.ESTADO = 1
	GROUP BY pm3.ID_PLAN_MEJORAMIENTO;
	SELECT * FROM planes_de_mejoramiento pm
	INNER JOIN personas auditor
	ON pm.ID_PERSONA = auditor.ID_PERSONA
	INNER JOIN hallazgos h 
	ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c 
	ON h.ID_HALLAZGO = c.ID_HALLAZGO
	INNER JOIN acciones a 
	ON c.ID_CAUSA = a.ID_CAUSA
	INNER JOIN actividades ac 
	ON a.ID_ACCION = ac.ID_ACCION
	INNER JOIN personas responsable 
	ON ac.ID_RESPONSABLE = responsable.ID_PERSONA
	INNER JOIN evidencias e 
	ON ac.ID_ACTIVIDAD = e.ID_ACTIVIDAD
	INNER JOIN evaluaciones eva 
	ON e.ID_EVIDENCIA = eva.ID_EVIDENCIA
	WHERE pm.ID_PERSONA = in_id_persona
	GROUP BY pm.ID_PLAN_MEJORAMIENTO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GET_TABLA_RESPONSABLE`(in_id_persona INT)
BEGIN
SELECT 	pm.ID_PLAN_MEJORAMIENTO as id_plan,
	CONCAT(auditor.NOMBRES, ' ', auditor.APELLIDOS) as auditor,
	pm.nombre_plan,
	pm.ESTADO_PLAN,
	IFNULL(max(eva.fecha_evaluacion), pm.fecha_inicio) as fecha_ultima_modificacion,
	pm.FECHA_FIN,
	ac.ESTADO as estado_actividad,
	pm.avance as porcentaje_avance,
	a.DESCRIPCION,
	ac.ID_ACCION
	FROM planes_de_mejoramiento pm
	INNER JOIN personas auditor
	ON pm.ID_PERSONA = auditor.ID_PERSONA
	INNER JOIN hallazgos h 
	ON pm.ID_PLAN_MEJORAMIENTO = h.ID_PLAN_MEJORAMIENTO
	INNER JOIN causas c 
	ON h.ID_HALLAZGO = c.ID_HALLAZGO
	INNER JOIN acciones a 
	ON c.ID_CAUSA = a.ID_CAUSA
	INNER JOIN actividades ac 
	ON a.ID_ACCION = ac.ID_ACCION
	LEFT JOIN evidencias e 
	ON ac.ID_ACTIVIDAD = e.ID_ACTIVIDAD
	LEFT JOIN evaluaciones eva 
	ON e.ID_EVIDENCIA = eva.ID_EVIDENCIA
	WHERE ac.ID_RESPONSABLE = in_id_persona
	AND pm.ESTADO_PLAN != 'Inactivo'
	GROUP BY ac.ID_ACCION, ac.ESTADO
	order by pm.ID_PLAN_MEJORAMIENTO;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UPDATE_AVANCE_ACTIVIDAD`(in_id_actividad int, in_avance double)
BEGIN
	UPDATE ACTIVIDADES SET AVANCE = in_avance
	WHERE ID_ACTIVIDAD = in_id_actividad;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `UPDATE_CUMPLIMIENTO_ACTIVIDAD`()
BEGIN
	UPDATE ACTIVIDADES SET AVANCE = in_avance
	WHERE ID_ACTIVIDAD = in_id_actividad;
END$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `update_estado_plan`(in_estado_plan VarChar(20), in_id_plan VarChar(80))
BEGIN
	UPDATE PLANES_DE_MEJORAMIENTO SET ESTADO_PLAN = in_estado_plan
	WHERE ID_PLAN_MEJORAMIENTO = in_id_plan;
END$$
DELIMITER ;
