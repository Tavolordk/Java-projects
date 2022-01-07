var RR6anualC = (function() {
	var validaciones = function() {
		if($('#anyo').val().trim()==""){
			//alert("Llenar el campo Año.");
			return mensajes.modalAlert('warning', 'Información', 'Es necesario llenar el campo Año.');
		}
		
		var model = {};
		model["anyo"] = $('#anyo').val().trim();
		$.ajax({
			url : "reaseguro/validacionReporteRegulatorioRR6anual",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : funcionesAjax.successAjax,
			complete : function() {
				util.loadingEnd();
			}
		})
		.fail(funcionesAjax.failAjax);
	}
	
	var prueba = function() {
		$('#loadingModal').css({"pointer-events": "none"});
		$('#showProgress').show();
		$('#progressPercentaje').val(0);
		$('#progressPercentajeText').text("0%");
		$('#progressPercentajeExtraInfo').html("Realizando preproceso.<br>Puede tardar unos minutos, espere por favor.");
		var model = {};
		model["currLine"]  = 1;
		iteracion(model);
	}
	
	var iteracion = function(model){
		$.ajax({
			url : "reaseguro/muestraPorcentaje",
			type : "POST",
			data        : JSON.stringify(model),
			dataType    : 'json',
			contentType : 'application/json',

			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet){
				//funcionesAjax.successAjax(dataSet);
				if(dataSet.dataExtra.iteracion==-1)
					$('#progressPercentajeExtraInfo').text("Iniciando...");
				if(dataSet.dataExtra.iteracion==0){
					$('#progressPercentajeExtraInfo').text("");
				}
				if(dataSet.dataExtra.iteracion==100){
					$('#loadingModal').css({"pointer-events": "auto"});
					$('#showProgress').hide();
					util.loadingEnd();
				}
				else{
					if(dataSet.dataExtra.correcto==false){
						$('#loadingModal').css({"pointer-events": "auto"});
						$('#progressPercentajeExtraInfo').text("");
						$('#showProgress').hide();
						util.loadingEnd();
						return mensajes.modalAlert('warning', 'Información', 'Ha ocurrido un error en el proceso.' +
								'<br>Porcentaje completado: ' + dataSet.dataExtra.iteracion);
					}
					else{
						var porcentaje = dataSet.dataExtra.iteracion+1;
						$('#progressPercentaje').val(porcentaje);
						$('#progressPercentajeText').text(porcentaje + "%");
						
						var model = {};
						model["currLine"]  = dataSet.dataExtra.currLine+dataSet.dataExtra.tamBloque;
						model["iteracion"] = porcentaje;
						model["tamBloque"] = dataSet.dataExtra.tamBloque;
						model["fileNumberLines"] = dataSet.dataExtra.fileNumberLines;
						iteracion(model);
					}
				}
			}
		})
		.fail(function(jqXHR, textStatus, errorThrown) {
				$('#loadingModal').css({"pointer-events": "auto"});
				$('#progressPercentajeExtraInfo').text("");
				$('#showProgress').hide();
				util.loadingEnd();
				funcionesAjax.failAjax(jqXHR, textStatus, errorThrown);
			}
		)
	}

	return {
		validaciones : validaciones,
		prueba: prueba
	}
})();