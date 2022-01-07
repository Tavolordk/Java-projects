var reporteActuarioC = (function(){
	
	var reporte = function(){
		var $idRamo      = $('#idRamo').val();
		var $tipoReporte = $('#tipoReporte').val();
		var $fechaIni    = $('#fechaIni').val();
		var $fechaFin    = $('#fechaFin').val();
		
		$.ajax({
			url: "reportesActuariosC/generarExcel",
			method: "GET",
			data:{
				ramo : $idRamo,
				tipoReporte : $tipoReporte,
				fechaIni: $fechaIni,
				fechaFin: $fechaFin
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				
			if (dataSet.mensaje === 'OK') {
					var columnas = selectColumns( ($tipoReporte == "emisionCoberturas" ? "emision" : $tipoReporte), dataSet, $idRamo);
					var $nombreArchivo = dataSet.dataExtra.nombreArchivo;
					
					tabla.iniciarTablaExport("#reportePreview", dataSet.dataExtra.resultado, columnas,$nombreArchivo, ' Periodo: '+ $fechaIni +' - ' +$fechaFin);
					
					$('.background-tabla').css('display', 'block');
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	var reporteVigor = function(){
		var $idRamo    = $('#idRamo').val();
		var $fechaIni  = $('#fechaIni').val();
		var $tipoReporte = $('#tipoReporte').val()
		
		if($idRamo === '0'){
			return mensajes.modalAlert('warning','Información', 'Es Necesario seleccionar Ramo')
		}
		
		if($fechaIni === ''){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario seleccionar Fecha de Reporte')
		}
		
		
		$.ajax({
			url: "reportesActuariosC/reporteVigor",
			method: "GET",
			data:{
				ramo : $idRamo,
				fechaIni: $fechaIni,
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				console.log(dataSet);
				
			if (dataSet.mensaje === 'OK') {
					var columnas = columnasVigor(dataSet.dataExtra.resultado, $idRamo);
					var $nombreArchivo = dataSet.dataExtra.nombreArchivo;
					
					tabla.iniciarTablaExport("#reportePreview", dataSet.dataExtra.resultado, columnas,$nombreArchivo, ' Fecha Corte: '+ $fechaIni);
					$('.background-tabla').css('display', 'block');
					
				}else{
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	var columnasVigor = function(dataSet,$ramo){
		
		var columnas = [];
		
		if($ramo == '5'){
			columns = [
				{title : "Poliza",           data : "poliza"},
				{title : "Cuv",              data : "cuv"},
				{title : "Id Endoso",        data : "endoso"},
				{title : "Ramo",             data : "claveReporte"},
				{title : "SubRamo",          data : "subRamo"},
				{title : "Coberturas",       data : "coberturas"},
				{title : "Directo/Tomado",   data : "directoTomado"},
				{title : "Tipo Endoso",      data : "tipoEndoso"},
				{title : "Moneda",           data : "moneda"},
				{title : "Fecha de emision", data : "fechaEmision"},
				{title : "Estatus",          data : "estatus"},
				{title : "Inicio vigencia",  data : "inicioVigencia"},
				{title : "Fin vigencia",     data : "finVigencia"},
				{title : "Inicio endoso",    data : "inicioEndoso"},
				{title : "Fin endoso",       data : "finEndoso"},
				{title : "Fecha cancelación",data : "fechaCancelacion"},
				{title : "Entidad/Municipio",data : "entidad"},
				{title : "Prima riesgo",     data : "primaRiesgo"},
				{title : "Gastos Adm",       data : "gastosAdm"},
				{title : "Gastos Adq",       data : "gastosAdq"},
				{title : "Utilidad",         data : "utilidad"},
				{title : "Suma asegurada",   data : "sumaAsegurada"},
				{title : "Prima tarifa",     data : "primaNeta"},
				{title : "% Cesión",         data : "porcentajeCesion"},
				{title : "Indentificador producto", data : "identProducto"},
				];
		}else{
			columns = [
				{title : "Poliza",           data : "poliza"},
				{title : "Ramo",             data : "claveReporte"},
				{title : "SubRamo",          data : "subRamo"},
				{title : "Coberturas",       data : "coberturas"},
				{title : "Directo/Tomado",   data : "directoTomado"},
				{title : "Contratante",      data : "contratante"},
				{title : "No. Asegurado",    data : "numeroAsegurado"},
				{title : "Fecha nacimiento", data : "fechaNacimiento"},
				{title : "Edad asegurado",   data : "edadAsegurado"},
				{title : "Moneda",           data : "moneda"},
				{title : "Fecha de emision", data : "fechaEmision"},
				{title : "Estatus",          data : "estatus"},
				{title : "Inicio vigencia",  data : "inicioVigencia"},
				{title : "Fin vigencia",     data : "finVigencia"},
				{title : "Fecha cancelación",data : "fechaCancelacion"},
				{title : "Prima riesgo",     data : "primaRiesgo"},
				{title : "Gastos Adm",       data : "gastosAdm"},
				{title : "Gastos Adq",       data : "gastosAdq"},
				{title : "Utilidad",         data : "utilidad"},
				{title : "Suma asegurada",   data : "sumaAsegurada"},
				{title : "Prima tarifa",     data : "primaNeta"},
				{title : "% Cesión",         data : "porcentajeCesion"},
				{title : "Indentificador producto", data : "identProducto"}
				
				];
		}
		
		return columns;
		
	}
	
	var selectColumns = function(tipoReporte, dataExtra, $ramo){
		var columns = [];
		
		switch(tipoReporte){
			case "emision":
				if($ramo == 5){
					columns = [
						{title : "Poliza",           data : "poliza"},
						{title : "Certificado",      data : "certificado"},
						{title : "Ramo",             data : "claveReporte"},
						{title : "SubRamo",          data : "subRamo"},
						{title : "Coberturas",       data : "coberturas"},
						{title : "Directo/Tomado",   data : "directoTomado"},
						{title : "Moneda",           data : "moneda"},
						{title : "Fecha de emision", data : "fechaEmision"},
						{title : "Estatus",          data : "estatus"},
						{title : "Inicio vigencia",  data : "inicioVigencia"},
						{title : "Fin vigencia",     data : "finVigencia"},
						{title : "Inicio endoso",    data : "inicioEndoso"},
						{title : "Fin endoso",       data : "finEndoso"},
						{title : "Fecha cancelación",data : "fechaCancelacion"},
						{title : "Entidad/Municipio",data : "entidad"},
						{title : "Prima riesgo",     data : "primaRiesgo"},
						{title : "Gastos Adm",       data : "gastosAdm"},
						{title : "Gastos Adq",       data : "gastosAdq"},
						{title : "Utilidad",         data : "utilidad"},
						{title : "Suma asegurada",   data : "sumaAsegurada"},
						{title : "Prima tarifa",     data : "primaNeta"},
						{title : "% Cesión",         data : "porcentajeCesion"},
						{title : "Indentificador producto", data : "identProducto"},
  					];
				}else{
					columns = [
						{title : "Poliza",           data : "poliza"},
						{title : "Ramo",             data : "claveReporte"},
						{title : "SubRamo",          data : "subRamo"},
						{title : "Coberturas",       data : "coberturas"},
						{title : "Directo/Tomado",   data : "directoTomado"},
						{title : "Contratante",      data : "contratante"},
						{title : "No. Asegurado",    data : "numeroAsegurado"},
						{title : "Fecha nacimiento", data : "fechaNacimiento"},
						{title : "Edad asegurado",   data : "edadAsegurado"},
						{title : "Moneda",           data : "moneda"},
						{title : "Fecha de emision", data : "fechaEmision"},
						{title : "Estatus",          data : "estatus"},
						{title : "Inicio vigencia",  data : "inicioVigencia"},
						{title : "Fin vigencia",     data : "finVigencia"},
						{title : "Fecha cancelación",data : "fechaCancelacion"},
						{title : "Prima riesgo",     data : "primaRiesgo"},
						{title : "Gastos Adm",       data : "gastosAdm"},
						{title : "Gastos Adq",       data : "gastosAdq"},
						{title : "Utilidad",         data : "utilidad"},
						{title : "Suma asegurada",   data : "sumaAsegurada"},
						{title : "Prima tarifa",     data : "primaNeta"},
						{title : "% Cesión",         data : "porcentajeCesion"},
						{title : "Indentificador producto", data : "identProducto"}
						
						];
				}
				break;
			case "siniestro":
				columns = [
					{title : "Póliza", data : "poliza.numeroPoliza"},
					{title : "No. Siniestro", data : "numeroSiniestro"},
					{title : "Ramo", data : "poliza.ramo.claveReporte"},
					{title : "SubRamo", data : null, render : function(data, type, row){
						return "";
					}},
					{title : "No. Asegurado", data : "numeroEndoso"},
					{title : "Cobertura", data : "coberturaAfectada"},
					{title : "Directo/Tomado", data : "directoTomado"},
					{title : "Inicio vigencia", data : "inicioVigencia"},
					{title : "Fin vigencia", data : "finVigencia"},
					{title : "Fecha Ocurrido", data : "fechaOcurrenciaSiniestro"},
					{title : "Fecha registro", data : "fechaReporteSiniestro"},
					{title : "Suma Asegurada", data : "sumaAsegurada"},
					{title : "Monto movimiento", data : "montoMovimiento"},
					{title : "Tipo movimiento", data : "tipoMovimiento"},
					{title : "Entidad/Municipio", data : null, render : function(data, type, row){
						return data.estado + "/" + data.municipio;
					}},
					{title : "Moneda", data : "poliza.ct16Moneda.ct16CveMoneda"},
					{title : "% Cesión", data : "porcentajeCesion"}];
				break;
				
				default:
					break;
		}
		
		return columns;
	};
	
	return{
		reporte      : reporte,
		reporteVigor : reporteVigor
	}
})();