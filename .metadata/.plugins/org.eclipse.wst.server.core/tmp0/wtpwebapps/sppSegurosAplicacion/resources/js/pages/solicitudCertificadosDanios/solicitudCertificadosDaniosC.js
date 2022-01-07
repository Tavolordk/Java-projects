var solicitudCertificadosDaniosC = (function(){
	
	var guardarSolicitudCertificadosDanios = function() {
		var numSolTitle=$('#numSolicitud').text();
		
		var tipoSol=window.location.pathname;
		
		var j=tipoSol.indexOf("CapturaSolicitudManualAP");
		
		var formData = {};
		
		var nsF=numSolTitle.split(": ");
		$.each($('input, select', '#formCapturaCertificado'),function(k, v){
			if($(this).attr("name")!== undefined){
				if($(this).attr("name")=="codigoPostal"){
					val=$(this).val();
					var res=val.split(" - ");
					
					formData["codigoPostal"] = res[0];
					formData["colonia"] = res[1];
				}else{
					formData[$(this).attr("name")] = $(this).val();
				}					
			}
	    });

		formData["numeroSolicitud"] = nsF[1];
		formData["idRamo"] = $("#idRamo").val();
		formData["idSucursal"] = $("#idSucursal").val();
		console.log(JSON.stringify(formData));
		console.log("guardado nuevo");
		console.log(JSON.stringify(formData));
		
		$.ajax({
			url : "SolicitudCertificadosDaniosC/guardarSolicitudCertificadoDanios",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){	
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					obtenerSolicitudCertificadosDanios();
					$("#formCapturaCertificado")[0].reset();
				}
			},			
			error: function (request, status, error) {
                console.log(request.responseText);
            },
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
			
	}
	
	var obtenerSolicitudCertificadosDanios = function() {	
		var numSolTitle=$('#numSolicitud').text();
		//console.log("busqueda");	
		var nsF=numSolTitle.split(": ");
			//daños
			$.ajax({
				url : "SolicitudCertificadosDaniosC/obtenerTodosSolicitudCabeceraByNumeroSolicitud/" + parseInt(nsF[1]),
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					console.log(dataSet);
					
					$.each($(dataSet.dataExtra),function(k, v){
						if($("#numPoliza").text()){
							v.editarCobertura = '';
							
						}else{
							v.editarCobertura = null;
							
						}
				    });
					
					var columnas = [ 
						{
							title : "Numero de Solicitud",
							data : "numeroSolicitud"
						},	
						{
							title : "Asegurado",
							data : "asegurado"
						},	
						{
							title : "Certificado",
							data : "inciso"
						},
												
						{
							title : "Calle",
							data : "calle"
						},
						{
							title : "Numero Exterior",
							data : "numeroexterior"
						},
						{
							title : "Numero interior",
							data : "numerointerior"
						},
						{
							title : "Colonia",
							data : "colonia"
						},
						{
							title : "CodigoPostal",
							data : "codigoPostal"
						},	
						{
							title : "Avance de la Obra",
							data : "avanceobra"
						},	
						{
							title : "Cuv",
							data : "cuv"
						},
						{
							title : "Editar",
							data : "editarCobertura",
							defaultContent : "<span data-toggle='collapse' class='btnEditarCertificados' id='editarCertificados'><i class='fas fa-edit'></i></span>",
							orderable : false
						}];			
					var properties = [
					    {
					        targets: [1,2,3,4,5,6,7,8,9],
					        className: 'text-center'
					    }
					  ];
					if (dataSet.mensaje === "OK") {
						tabla.iniciarTablaGrupos("#resultadoCertificados", dataSet.dataExtra,columnas,properties);
						$('.background-tabla').css('display', 'block');						
						tablaSolicitudCertificados();
						
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

	var tablaSolicitudCertificados = function() {
		
		var table = $("#resultadoCertificados").DataTable();
				
		$('#resultadoCertificados tbody').on('click', '.btnEditarCertificados', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
						
			
			
			
			$("#idCertificadoActualiza").html(data.inciso)
			//$("#estadoActualiza").val(data.idEstado);
			console.log(data.idEstado);
			sepomexC.estadosActualizaCertificado(data.idEstado,data.idMunicipio);
			$("#calleActualiza").val(data.calle);
			$("#numeroExteriorActualiza").val(data.numeroexterior);
			$("#numeroInteriorActualiza").val(data.numerointerior);
			$("#avanceObraActualiza").val(data.avanceobra);
			$("#codigoPostalActualiza").val(data.codigoPostal + " - " + data.colonia);
			$("#aseguradoActualiza").val(data.asegurado);
			$("#cuvActualiza").val(data.cuv);
			$("#cuvActualiza").attr("disabled", "disabled");
			$('#EditarCertificadoModal').modal('show');
		});
		
		$("#resultadoCertificados").css("width", "100%");
	}
		
	var actualizaSolicitudCertificadosDanios = function() {
		var numSolTitle=$('#numSolicitud').text();			
		
		var formData = {};
		
		var nsF=numSolTitle.split(": ");
		
		$.each($('input, select', '#formEditarCertificado'),function(k, v){
			if($(this).attr("name")!== undefined){
				if($(this).attr("name")=="codigoPostalActualiza"){
					val=$(this).val();
					var res=val.split(" - ");
					
					formData["codigoPostalActualiza"] = res[0];
					formData["coloniaActualiza"] = res[1];
				}else{
					formData[$(this).attr("name")] = $(this).val();
				}					
			}
	    });

		formData["numeroSolicitud"] = nsF[1];
		formData["idRamo"] = $("#idRamo").val();
		formData["idSucursal"] = $("#idSucursal").val();
		formData["inciso"]=$('#idCertificadoActualiza').text();
		//console.log("Actualiza Certificado");
		//console.log($('#idCertificadoActualiza').val());
		
		
		console.log(JSON.stringify(formData));
		
		$.ajax({
			url : "SolicitudCertificadosDaniosC/actualizaSolicitudCertificadoDanios",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){	
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#EditarCertificadoModal').modal('hide');
					solicitudCertificadosDaniosC.obtenerSolicitudCertificadosDanios();
				}
			},			
			error: function (request, status, error) {
                console.log(request.responseText);
            },
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},				
			complete: function(){
				util.loadingEnd();
			}
		});
			
	}
	$('.input_upper').on('input', function(evt) {
	  $(this).val(function(_, val) {
	    return val.toUpperCase();
	  });
	});
		
	return {
		guardarSolicitudCertificadosDanios :guardarSolicitudCertificadosDanios,
		obtenerSolicitudCertificadosDanios :obtenerSolicitudCertificadosDanios,
		actualizaSolicitudCertificadosDanios : actualizaSolicitudCertificadosDanios
	}
})();
