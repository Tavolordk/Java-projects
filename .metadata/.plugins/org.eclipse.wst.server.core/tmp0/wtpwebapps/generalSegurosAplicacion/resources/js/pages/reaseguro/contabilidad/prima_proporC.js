var prima_proporC = (function() {
	var validaciones = function() {
		if($('#contratos').val()==0){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Contratos.');
		}
		if($('#desde').val().trim()==""){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Desde.');
		}
		if($('#hasta').val().trim()==""){
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Hasta.');
		}
		if(new Date($('#desde').val().trim())>new Date($('#hasta').val().trim())){
			return mensajes.modalAlert('warning', 'Información', 'Fecha "Desde" debe ser menor o igual a fecha "Hasta".');
		}
		
		var model = {};
		model["contratos"] = $('#contratos').find(':selected').text();
		model["desde"] = $('#desde').val().trim();
		model["hasta"] = $('#hasta').val().trim();
		$.ajax({
			url : "reaseguro/validacionContabilidadPrimaProporcional",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				if (dataSet.mensaje === 'OK') {
					var contenido;
					contenido = "<h2>Datos de ejemplo</h2>";
					contenido += "<table  class='table table-sm table-hover table-bordered estiloTablas dataTable no-footer'>";
						contenido += "<tr>";
							contenido += "<td><b>Agrupador</b></td>";
							contenido += "<td><b>Contratante</b></td>";
							contenido += "<td><b>Poliza</b></td>";
							contenido += "<td><b>Asegurado</b></td>";
						contenido += "</tr>";
						contenido += "<tr>";
							contenido += "<td>INFONAVIT</td>";
							contenido += "<td>OCTAVIO ALFREDO RUIZ</td>";
							contenido += "<td>00001</td>";
							contenido += "<td></td>";
						contenido += "</tr>";
						contenido += "<tr>";
							contenido += "<td></td>";
							contenido += "<td>OCTAVIO ALFREDO RUIZ</td>";
							contenido += "<td>00002</td>";
							contenido += "<td></td>";
						contenido += "</tr>";
						contenido += "<tr>";
							contenido += "<td></td>";
							contenido += "<td></td>";
							contenido += "<td>PATRIA - REASEGURADORA PATRIA, S.A.B.</td>";
							contenido += "<td></td>";
						contenido += "</tr>";
					contenido += "</table>";
					
					//$('#contenidoTabla').html(dataSet.dataExtra);
					$('#contenidoTabla').html(contenido);
					$( "#btnContabilidad" ).prop( "disabled", false );
				}
				else funcionesAjax.successAjax(dataSet);
			},
			complete : function() {
				util.loadingEnd();
			}
		})
		.fail(funcionesAjax.failAjax);
	}

	return {
		validaciones : validaciones
	}
})();