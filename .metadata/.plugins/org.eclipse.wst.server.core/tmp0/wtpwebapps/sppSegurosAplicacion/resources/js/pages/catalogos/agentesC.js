var agentesC = (function() {
	var btnEditAgente = "btnEditAgente";
	var idAgente = 0;
	
	var archivos = function () {
		var extensions = ["jpg", "png", "pdf"];
		fileinput.inicializarFileinputSiniestros(null, "input[type='file']", extensions);
	};
	
	var guardarAgentes = function() {
		var formData = new FormData();
		var model = { }
    	//iterate over form elements   
		$.each($('input, select', '#formAgente'),function(k, v){
			if($(this).attr("name")!== undefined){
				if (v.type === 'file') {
					if (v.files.length > 0) {
						for(i = 0; i<v.files.length; i++) {
							formData.append("documentos[]", v.files[i], $(this).attr("id")+"|"+v.files[i].name);
						}
					}
				} else {
					model[$(this).attr("name")] = $(this).val();
				}
			}
	    });

		model['idAgente'] = idAgente;
		formData.append("model", new Blob([JSON.stringify(model)], { type: 'application/json' }));
		$.ajax({
			url : "agentesC/guardarAgentes",
			type: "POST",
			data: formData,
			enctype: 'multipart/form-data',
			processData: false,
			contentType: false,
			cache: false,
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				if(dataSet.mensaje==="OK"){
					agentesC.obtenerAgentes();
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formAgente')[0].reset();
					$('#agenteModal').modal('hide');
					idAgente = 0;
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
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
	
	

	var obtenerAgentes = function() {
		var btnEditAgente = "btnEditAgente";
		$.ajax({
			url : "agentesC/obtenerAgentes",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
					{
						title : "Nombre",
						data : "nombre"
					},
					
					{
						title : "Apellido Paterno",
						data : "apePaterno"
					},
					
					{
						title : "Apellido Materno",
						data : "apeMaterno"
					},
					
					{
						title : "RFC",
						data : "rfc"
					},
					
					{
						title : "Telefono Celular",
						data : "telefonoCelular"
					},
					
					{
						title : "Telefono Oficina",
						data : "telefonoOficina"
					},

					{
						title : "Acciones",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='" + btnEditAgente + "'><i class='fas fa-edit'></i></span>",
						orderable : false
					}
					];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					//tabla.iniciarTabla("#tablaAgentes", dataSet.dataExtra, columnas);
					tabla.iniciarTablaExport("#tablaAgentes", dataSet.dataExtra, columnas,"Reporte_Agentes");
					$('.background-tabla').css('display', 'block');
					editarAgente();
				}
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
	
	var editarAgente = function() {
		console.log("entra... ");
		var table = $("#tablaAgentes").DataTable();
		
		$('#fechaAlta').attr('disabled','true')
		$('#formAgente :input').not("[name='fechaAlta']").each(function(){
	        $(this).val('');
	     });
		
		$('#tablaAgentes tbody').on('click', '.btnEditAgente', function() {
			
			$('#formAgente .verArchivo').remove();
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data);
			idAgente = data.idAgente;
			obtenerArchivos();
			
			$("#nomLabel").html('');
			if(data.fisicaMoral === 'M'){
				$("#nomLabel").html('<label for="nombreAgente">Razón Social:</label>');
				$("#apeM").hide();
				$("#apeP").hide();
				$('.clienteFisicoNuevo').css('display', 'block');
				$('.clienteMoralNuevo').css('display', 'none');
	            
			} else{
				$("#nomLabel").html('<label for="nombreAgente"> Nombre:</label>');
				$("#apeM").show();
				$("#apeP").show();
				$('.clienteFisicoNuevo').css('display', 'none');
				$('.clienteMoralNuevo').css('display', 'block');
	            }
			$('#agenteModal').modal({show:true, backdrop:'static'});
			var pro = $.trim(data.promotoria);
			//$('#promotoria').val(pro);
			$(".promotorias").html('');
			$.each(data, function(key, value){
				
				if("promotoria"== key){
					
						
					
					if($.trim(pro) == "")
						obtenerPromotorias();
					else
						obtenerPromotorias(pro);
				}else{
					$("#formAgente *[name=" + key + "]").val(value);
				}
					
			});
		});
		
//		$('#agenteModal').on('hidden.bs.modal', function (e) {
//			$('#formAgente')[0].reset();
//			idAgente = null;
//		})
	}
	

	var autoCompletarAgente1 = function(appendTo) {
		//console.log(appendTo);
		$(".agente1").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 2,
			source : function(request, response) {
				//console.log(request.term);
				$.ajax({
					url : 'agentesC/obtenerAgentesByNomLike',
					dataType : 'json',
					type: "GET",
					data : {
						nomAgente : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							console.log(v[1]);
							return {
//								
								label: v[0]  +' - ' + v[1],
								value: v[0]  +' - ' + v[1],
								data : v
							};
						}));
					},
					error: function (request, status, error) {
		                console.log(request.responseText);
		            }
				});
			}
		});
	}
	
	var autoCompletarAgente2 = function(appendTo){
		//console.log(appendTo);
		$(".agente2").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 2,
			source : function(request, response) {
				//console.log(request.term);
				$.ajax({
					url : 'agentesC/obtenerAgentesByNomLike',
					dataType : 'json',
					type: "GET",
					data : {
						nomAgente : request.term
					},
					success : function(data) {
						//console.log(data);
						response($.map(data, function(v,i){
							return {
//								
								label: v[0]  +' - ' + v[1],
								value: v[0]  +' - ' + v[1],
								data : v
							};
						}));
					},
					error: function (request, status, error) {
		                console.log(request.responseText);
		            }
				});
			}
		});
	}
	
	var autoCompletarAgente3 = function(appendTo){
		//console.log(appendTo);
		$(".agente3").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 2,
			source : function(request, response) {
				//console.log(request.term);
				$.ajax({
					url : 'agentesC/obtenerAgentesByNomLike',
					dataType : 'json',
					type: "GET",
					data : {
						nomAgente : request.term
					},
					success : function(data) {
						//console.log(data);
						response($.map(data, function(v,i){
							return {
//								
								label: v[0]  +' - ' + v[1],
								value: v[0]  +' - ' + v[1],
								data : v
							};
						}));
					},
					error: function (request, status, error) {
		                console.log(request.responseText);
		            }
				});
			}
		});
	}
	
	var obtenerAgentesById = function(id, agente) {				

		$.ajax({
			url : "agentesC/id/" + id,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				$('#'+ agente).val(dataSet.dataExtra.idAgente +" - " + dataSet.dataExtra.nombre + " " + dataSet.dataExtra.apePaterno + " " + dataSet.dataExtra.apeMaterno );
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

	var obtenerAgentesByCveAgente = function(id, agente) {				

		$.ajax({
			url : "agentesC/cveAgente/" + id,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					$('#'+ agente).val(dataSet.dataExtra.cveAgente +" - " + dataSet.dataExtra.nombre + " " + dataSet.dataExtra.apePaterno + " " + dataSet.dataExtra.apeMaterno );
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
	
	var autoCompletarCodigoPostal = function(appendTo) {
		$(".codigoPostal").autocomplete({
			appendTo: $('#' + appendTo),
			minLength: 5,
			source : function(request, response) {
				$.ajax({
					url : 'coloniasC/obtenerColoniasByCP',
					dataType : 'json',
					type: "GET",
					data : {
						codigoPostal : request.term
					},
					success : function(data) {
						console.log(data);
						response($.map(data, function(v,i){
							return {
								label: v.codigoPostal + " - " + v.nombreColonia,
								value: v.codigoPostal + " - " + v.nombreColonia,
								data : v
							};
						}));
					},
					statusCode: {
						404: function () {
							console.log("page not found");
						}
					},
					error: function (xhr, status, error) {
						var err = xhr.responseText;
						console.log(xhr);
					}
				});
			},
			select: function (event, ui) {
				$('.colonia').val('');
				$('.municipio').val('');
				$('.estado').val('');
				$('.colonia').val(ui.item.data.nombreColonia);
				$('.estado').val(ui.item.data.municipio.estado.nombreEstado);
				$('.municipio').val(ui.item.data.municipio.nombreMunicipio);
				$(this).val(ui.item.data.codigoPostal);
				return true;
		  }
		});
	}
	
	//privada
	var obtenerDatosDireccion = function() {
		$.ajax({
			url : 'coloniasC/obtenerColoniasByCP',
			dataType : 'json',
			type: "GET",
			data : {
				codigoPostal : $('#codigoPostal').val()
			},
			success : function(data) {
				if(data.length>0) {
					llenaHTMLDireccion(data[0].idColonia, data[0].nombreColonia, data[0].municipio.idMunicipio, data[0].municipio.nombreMunicipio, data[0].municipio.estado.idEstado, data[0].municipio.estado.nombreEstado);
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
			}
		});
	}
	
	//privada
	var llenaHTMLDireccion = function (idColonia, colonia, idMunicipio, municipio, idEstado, estado) {
		$('.colonia').html();
		$('.municipio').html();
		$('.estado').html();
		$('.colonia').html("<option value=" + idColonia + " selected>" + colonia+ "</option>");
		$('.estado').html("<option value=" + idEstado + " selected>" + estado + "</option>");
		$('.municipio').html("<option value=" + idMunicipio + " selected>" + municipio + "</option>");
	}
	
	//privada
	var obtenerArchivos = function() {
		$.ajax({
			url : 'agentesC/documentos',
			dataType : 'json',
			type: "GET",
			data : {
				idAgente : idAgente
			},
			success : function(data) {
				$.each(data, function(key, value) {
					
					$('#formAgente #' + value.tipoDocumento+'Bloque').append('<a class="verArchivo" href="agentesC/documentos/archivo/' + value.id + '" target="_blank">Ver documento: '+value.nombreDocumento+'</a>');
					$('#formAgente #' + value.tipoDocumento).find('.btn').addClass('disabled');
					$('#formAgente #' + value.tipoDocumento + ', .file-caption-name').attr('disabled', 'true');
					
//					$('#'+value.tipoDocumento+'Bloque').empty();
//					var labelArchivo = '';
//					if(value.tipoDocumento==='contrato') {
//						labelArchivo = $('<label for="contrato">Contrato con aseguradora:</label>');
//					} else if(value.tipoDocumento==='cedula') {
//						labelArchivo = $('<label for="cedula">Cedula:</label>');
//					} else if(value.tipoDocumento==='domicilio') {
//						labelArchivo = $('<label for="domicilio">Comprobante Domicilio:</label>');
//					} else if(value.tipoDocumento==='rfc') {
//						labelArchivo = $('<label for="rfc">RFC:</label>');
//					} else if(value.tipoDocumento==='polizaRC') {
//						labelArchivo = $('<label for="polizaRC">Poliza RC:</label>');
//					}
//					var aArchivo = $('<a class="verArchivo" href="archivo/' + value.id + '" target="_blank">Ver documento: '+value.nombreDocumento+'</a>');
//					$('#'+value.tipoDocumento+'Bloque').append(labelArchivo);
//					$('#'+value.tipoDocumento+'Bloque').append('<br>');
//					$('#'+value.tipoDocumento+'Bloque').append(aArchivo);
				});
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			}
		});
	}
	
	var btnNuevoAgente = function() {
		var table = $("#tablaAgentes").DataTable();
		idAgente = null
		$('#formAgente .verArchivo').remove();
		$('#formAgente input:file').removeAttr('disabled');
		$('#fechaAlta').attr('disabled','true')
//		$('#formAgente')[0].reset();
		idAgente = 0;
		
		$('#formAgente :input').not("[name='fechaAlta']").each(function(){
	        $(this).val('');
	     });
		
		$('.currentDate').bootstrapDP('setDate', new Date());
		$('#agenteModal').modal({show:true, backdrop:'static'});
		
//		$('#agenteModal').on('hidden.bs.modal', function (e) {
//			$('#formAgente')[0].reset();
//		})
	}
	var obtenerPromotorias = function(param = null) {				

		$.ajax({
			url : "agentesC/obtenerPromotorias",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					$(".promotorias").html('');
					$(".promotorias").append('<option value=""> --- Seleccione --- </option>');
					
					$.each(dataSet.dataExtra, function(k, v){
						var select = "";
						if(param == v.nombreCliente || param == v.denominacion){
							select = "selected";
							//$(".promotorias option[value='"+param+"']").attr("selected", true);
						}
						if(v.nombreCliente != ""){
							$(".promotorias").append('<option value="' + v.nombreCliente +'" ' +select+' class="wrap" title="' +  v.nombreCliente + '">' 
									+ v.nombreCliente + '</option>');
						}else if(v.denominacion != ""){
							$(".promotorias").append('<option value="' + v.denominacion +'" ' +select+' class="wrap" title="' +  v.denominacion + '">' 
									+ v.denominacion + '</option>');
						}
						
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
	
	return {
		guardarAgentes : guardarAgentes,
		obtenerAgentes : obtenerAgentes,
		autoCompletarAgente1 : autoCompletarAgente1,
		autoCompletarAgente2 : autoCompletarAgente2,
		autoCompletarAgente3 : autoCompletarAgente3,
		obtenerAgentesById : obtenerAgentesById,
		autoCompletarCodigoPostal : autoCompletarCodigoPostal,
		obtenerAgentesByCveAgente :obtenerAgentesByCveAgente,
		archivos : archivos,
		btnNuevoAgente : btnNuevoAgente,
		obtenerPromotorias:obtenerPromotorias
	}
})();