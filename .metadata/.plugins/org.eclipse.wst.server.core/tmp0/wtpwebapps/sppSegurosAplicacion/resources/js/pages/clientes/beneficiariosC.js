var beneficiarioC = (function () {
	
	var archivosBeneficiario = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputCliente(null, "input[type='file']", extensions);
	};
	
	var obtenerActividadEconomica = function() {				

		$.ajax({
			url : "beneficiariosC/obtenerActividadEconomicaLst",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$(".actividadObjeto").html('');
					$(".actividadObjeto").append('<option value="">Seleccione Actividad...</option>');
					
					$.each(dataSet.dataExtra, function(k, v){
						var actividad = v.actividadEconomicaNombre;
						
						if(v.actividadEconomicaNombre.length > 25){
							actividad = v.actividadEconomicaNombre.substring(0, 35);
						}
						
						$(".actividadObjeto").append('<option value="' + v.actividadEconomicaClave +'" class="wrap" title="' +  v.actividadEconomicaNombre + '">' 
								+ actividad + '</option>');
					})
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},

			error : function(request, status, error) {
				console.log(request.responseText);
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}
		
	var autoCompletarCodigoPostal = function(appendTo){
		
		$(".codigoPostal").autocomplete({
//			appendTo: $('#' + appendTo),
			minLength: 5,
			source : function(request, response) {
				$.ajax({
					url : 'coloniasC/obtenerColoniasByCP',
					dataType : 'json',
					type: "GET",
					data : {codigoPostal : request.term},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
								label: v.codigoPostal + " - " + v.nombreColonia,
								value: v.codigoPostal + " - " + v.nombreColonia,
								data : v
							};
						}));
					}
				});
			},
			select: function (event, ui) {
				$('.municipio').html();
				$('.estado').val(ui.item.data.municipio.estado.idEstado);
				$('.municipio').html("<option value=" + ui.item.data.municipio.idMunicipio + " selected>" + ui.item.data.municipio.nombreMunicipio + "</option>");
				$(this).val(ui.item.label);
				return true;
		  }
		});
	}
	
	var guardaBeneficiario = function(){
		var formData = new FormData();
		var tipoCliente = $("input[name=fisicoMoral]:checked").val();
		var beneficiarioSiniestroModel = {fisicoMoral : tipoCliente}
		
		console.log('TIPO CLIENTE --> ', tipoCliente)
		
		var errorDocumentos = [];

		$.each($('input, select', $('#formBeneficiario')), function (k, v) {
			var filename = $(this).attr("id");
			
			if (v.type === 'file') {
				
				if (v.files.length > 0) {
					formData.append("documentos[]", v.files[0], filename);
//					console.log('Nombre Archivo ->',v.files[0],' : ', filename)
				}
				
			} else {
				
				if ($(this).attr("name") !== undefined) {
				
					if($(this).attr("name") !== "fisicoMoral"){
						console.log('Campo -> ', $(this).attr("name"))
						beneficiarioSiniestroModel[$(this).attr("name")] = $(this).val();
					
					}
				}
			}
		});
	
//		beneficiarioSiniestroModel['idBeneficiario'] = 0
		formData.append("beneficiarioSiniestroModel", new Blob([JSON.stringify(beneficiarioSiniestroModel)], { type: 'application/json' }));
		
		console.log('Beneficiario Model', beneficiarioSiniestroModel)
		console.log('Beneficiario Model', formData)
		
		$.ajax({
			
			url  : "beneficiariosC/guardaBeneficiario",
			type : "POST",
			data : formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				
				if (dataSet.mensaje === 'OK') {
					var extras = "";
					if(dataSet.dataExtra != null){
						
						$.each( dataSet.dataExtra, function(k, v){
							switch (k) {
							case "_entrevistaCliente":
								k = "Entrevista con el Cliente";
								break;
								
							case "_curp":
								k = "CURP";
								break;
								
							case "_calidadMigratoria":
								k = "Acred. Calidad Migratoria";
								break;
								
							case "_formatoClientes":
								k = "Formato id Clientes";
								break;
								
							case "_identificacionOficial":
								k = "Identificacion Oficial";
								break;
								
							case "_comprobanteDomicilio":
								k = "Comprobante de Domicilio";
								break;
								
							case "_rfc":
								k = "RFC";
								break;
								
							case "_validacionListaNegra":
								k = "Resultado de validación de listas negras";
								break;
								
							case "_firmaElectronicaAvanzada":
								k = "Firma Electrónica Avanzada";
								break;

							default:
								break;
							}
							extras += "<br/>" + k + " : " + v;
						});
					}
					dataSet.detalleMensaje += extras;
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					
					$('#formBeneficiario')[0].reset();
					documentosCargados = 0;
				} else {
					
					console.log('Errores -> ', dataSet.dataExtra)
					
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					
					$.each(dataSet.dataExtra, function(k, v){
						var campo = $('#formBeneficiario' + ' [name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		});
		
	}
	
	return {
		archivosBeneficiario : archivosBeneficiario,
		obtenerActividadEconomica : obtenerActividadEconomica,
		autoCompletarCodigoPostal : autoCompletarCodigoPostal,
		guardaBeneficiario        : guardaBeneficiario,
	}
})();


