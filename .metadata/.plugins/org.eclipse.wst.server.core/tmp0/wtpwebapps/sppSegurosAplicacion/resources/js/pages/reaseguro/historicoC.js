var historicoC = (function(){
	
	var btnEdithistorico = "btnEdithistorico";
	var idhistorico = 0;
	
	var archivos = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputSiniestros(null, "input[type='file']", extensions);
	};
	
	var obtenerhistorico = function() {
		$.ajax({
			url : "reporteHistorico",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {console.log(dataSet);
				var columnas = [
					
					{	title : "tipoCobertura", data : "tipoContrato.tipoCobertura" },					
					{	title : "tipoContrato", data : "tipoContrato.descripcion" },
					{	title : "tipoProteccion", data : "tipoContrato.tipoProteccion" },					
					{	title : "tipoReaseguro", data : "tipoContrato.tipoReaseguro" },
					{	title : "anioSuscripcion", data : "anioSuscripcion" },					
					{	title : "calculaPB", data : "calculoUtilidades" },
					{	title : "capacidadMaxima", data : "capacidadMaxima" },					
					{	title : "claveMoneda", data : "claveMoneda" },
					{	title : "contratoRR6CNSF", data : "contratoRR6CNSF" },					
					{	title : "estatus", data : "estatus.ct2Descripcion" },
					{	title : "fechaAutorizacion", data : "fechaAutorizacion" },					
					{	title : "finVigencia", data : "finVigencia" },
					{	title : "inicioVigencia", data : "inicioVigencia" },					
					{	title : "limiteContrato", data : "limiteContrato" },
					{	title : "moneda", data : "moneda" },					
					{	title : "montoCesionImporte", data : "montoCesionImporte" },
					{	title : "montoCesionPorcentaje", data : "montoCesionPorcentaje" },
					{	title : "montoRetencionImporte", data : "montoRetencionImporte" },					
					{	title : "montoRetencionPorcentaje", data : "montoRetencionPorcentaje" },
					{	title : "nombreContrato", data : "nombreContrato" },					
					{	title : "pdmImporte", data : "pdmImporte" },
					{	title : "pendienteAutorizacion", data : "pendienteAutorizacion" },					
					{	title : "periodicidadBerderaux", data : "periodicidadBerderaux" },
					{	title : "periodicidadPerfilCartera", data : "periodicidadPerfilCartera" },					
					{	title : "polizaFacultativo", data : "polizaFacultativo" },
					{	title : "porcentajeComisionReaseguroPrimaCedida", data : "porcentajeComisionReaseguroPrimaCedida" },					
					{	title : "porcentajeTasaPrima", data : "porcentajeTasaPrima" },
					{	title : "tipoFactorTasaPrima", data : "tipoFactorTasaPrima" },					
					{	title : "fechaAutorizacionFacultativo", data : "fechaAutorizacionFacultativo" },
					{	title : "factorAjuste", data : "factorAjuste" },					
					{	title : "idRamo", data : "idRamo" }
					
					];
								
				tabla.iniciarTablaExport('#historico', dataSet.dataExtra, columnas, 'historico', '' )
				$('#tablaHistorico').css('display', 'block');
			},
			statusCode: {
				404: function () {
					console.log("No encuentra historico.");
				},
				
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	return {
			obtenerhistorico:obtenerhistorico
		}
	
})();

