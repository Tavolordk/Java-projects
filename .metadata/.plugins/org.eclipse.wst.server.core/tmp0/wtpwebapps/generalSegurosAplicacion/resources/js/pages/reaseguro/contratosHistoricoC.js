var contratosHistoricosC = (function(){
	
	var contratosHistoricos = function(){
		 
		$.ajax({
			
			url         : "reaseguro/contratosHistorico",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('Contratos Historicos: ',dataSet.dataExtra)
				if(dataSet.mensaje === "OK"){
					var columnas = [
						{title: "Identif. Contrato",      data:"identifContrato"},
						{title: "Tipo Contrato",          data:"tipoContrato"},
						{title: "Inicio Vigencia",        data:"inicioVig"},
						{title: "Fin Vigencia",           data:"finVig"},
						{title: "Capas Linea",            data:"capasLinea"},
						{title: "Retencion Prioridad",    data:"retencionPrioridad"},
						{title: "Limite Responsabilidad", data:"limiteResponsabilidad"},
						{title : "Cancelación",           data:"estatus.descEstatus"} 
					];
				
					tabla.iniciarTablaSimple("#contratosHist", dataSet.dataExtra, columnas);
					$('#idContratosHist').css('display', 'block');
				}else{
					var columnas = [
						{title: "Identif. Contrato"},
						{title: "Tipo Contrato"},
						{title: "Inicio Vigencia"},
						{title: "Fin Vigencia"},
						{title: "Capas Linea"},
						{title: "Retencion Prioridad"},
						{title: "Limite Responsabilidad"}
						
					];
				
					tabla.iniciarTablaEmpty("#contratosHist", columnas);
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
	
	}
	
	return {
		
		contratosHistoricos :contratosHistoricos
	}
})();