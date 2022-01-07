var historicosC = (function(){
	
	function createDataHistorico(tipoCobertura,tipoContrato,tipoProteccion,tipoReaseguro,anioSuscripcion,calculoPB,capacidadMaxima,claveMoneda,contratoRR6CNSF,estatus,fechaAutorizacion,finVigencia,inicioVigencia,limiteContrato,moneda,montoCesionImporte,montoCesionPorcentaje,montoRetencionImporte,montoRetencionPorcentaje,nombreContrato,pdmImporte,pendienteAutorizacion,periocidadBerderaux,periocidadPerfilCartera,polizaFacultativo,porcentajeComisionReaseguroPrimaCedida,porcentajeTasaPrima,tipoFactorTasaPrima,fechaAutorizacionFacultativo,factorAjuste,idRamo){
		return {tipoCobertura,tipoContrato,tipoProteccion,tipoReaseguro,anioSuscripcion,calculoPB,capacidadMaxima,claveMoneda,contratoRR6CNSF,estatus,fechaAutorizacion,finVigencia,inicioVigencia,limiteContrato,moneda,montoCesionImporte,montoCesionPorcentaje,montoRetencionImporte,montoRetencionPorcentaje,nombreContrato,pdmImporte,pendienteAutorizacion,periocidadBerderaux,periocidadPerfilCartera,polizaFacultativo,porcentajeComisionReaseguroPrimaCedida,porcentajeTasaPrima,tipoFactorTasaPrima,fechaAutorizacionFacultativo,factorAjuste,idRamo};
	}
	var llenarTablaHistoricos = function(){
		var columnas = [
			{title:"tipoCobertura",data:"tipoCobertura"},
			{title:"tipoContrato",data:"tipoContrato"},
			{title:"tipoProteccion",data:"tipoProteccion"},
			{title:"tipoReaseguro",data:"tipoReaseguro"},
			{title:"anioSuscripcion",data:"anioSuscripcion"},
			{title:"calculoPB",data:"calculoPB"},
			{title:"capacidadMaxima",data:"capacidadMaxima"},
			{title:"claveMoneda",data:"claveMoneda"},
			{title:"contratoRR6CNSF",data:"contratoRR6CNSF"},
			{title:"estatus",data:"estatus"},
			{title:"fechaAutorizacion",data:"fechaAutorizacion"},
			{title:"finVigencia",data:"finVigencia"},
			{title:"inicioVigencia",data:"inicioVigencia"},
			{title:"limiteContrato",data:"limiteContrato"},
			{title:"moneda",data:"moneda"},
			{title:"montoCesionImporte",data:"montoCesionImporte"},
			{title:"montoCesionPorcentaje",data:"montoCesionPorcentaje"},
			{title:"montoRetencionImporte",data:"montoRetencionImporte"},
			{title:"montoRetencionPorcentaje",data:"montoRetencionPorcentaje"},
			{title:"nombreContrato",data:"nombreContrato"},
			{title:"pdmImporte",data:"pdmImporte"},
			{title:"pendienteAutorizacion",data:"pendienteAutorizacion"},
			{title:"periocidadBerderaux",data:"periocidadBerderaux"},
			{title:"periocidadPerfilCartera",data:"periocidadPerfilCartera"},
			{title:"polizaFacultativo",data:"polizaFacultativo"},
			{title:"porcentajeComisionReaseguroPrimaCedida",data:"porcentajeComisionReaseguroPrimaCedida"},
			{title:"porcentajeTasaPrima",data:"porcentajeTasaPrima"},
			{title:"tipoFactorTasaPrima",data:"tipoFactorTasaPrima"},
			{title:"fechaAutorizacionFacultativo",data:"fechaAutorizacionFacultativo"},
			{title:"idRamo",data:"idRamo"}
		];
		
		var listaHistorico = [];
		listaHistorico.push(createDataHistorico("AUTOMATICO","CUOTA PARTE","RIESGO","PROPORCIONAL","2020","NO","10000000","10","PRUEBA2020NQS","VIGENTE","2020-05-27","2020-12-31","2020-01-01","","","2200000","22","7800000","78","PRUEBAPROP_VIDA",""	,"NO","12","12","","","","","","","1"));
		console.log(listaHistorico);
		tabla.iniciarTablaExport('#tblHistoricoContratos', listaHistorico, columnas, 'historico', '' )
	}
	
	
	return {
		llenarTablaHistoricos :llenarTablaHistoricos
	};	
}());
