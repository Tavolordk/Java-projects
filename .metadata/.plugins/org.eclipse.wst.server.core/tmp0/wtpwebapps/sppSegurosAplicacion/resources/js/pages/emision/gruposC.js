var gruposC = (function() {

	var guardarGrupo = function() {
		
		var grupo = $("#idGrupoE").html();
		console.log('GRUPO A GUARDAR')
		console.log(grupo)
		var idGrupo;
		var formData = new FormData();
		var ocupacion;
		var sucursal;
		var producto;
		var numeroSolicitud;
		var anioPoliza;
		var sumaAsegurada;
		var nivelRiesgo;
		var nombreGrupo;
		var ramo;	
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		
		if(grupo){
			console.log('ENTRA A GRABAR GRUPO OPCION 1')
			ocupacion = $('#ocupacionE').val();
			sucursal = $('#idSucursal').val();
			producto = $('#producto').val();
			numeroSolicitud = numeroSolicitud;
			anioPoliza = 1;
			sumaAsegurada = 1;
			nivelRiesgo = $('#nivelRiesgoE').val();;
			nombreGrupo = $('#nombreGrupoE').val();
			ramo = $('#idRamo').val();
			idGrupo = grupo;
		}else{
			
			console.log('ENTRA A GRABAR GRUPO OPCION 2')
			ocupacion = $('#ocupacion').val();
			sucursal = $('#idSucursal').val();
			producto = $('#producto').val();
			numeroSolicitud = numeroSolicitud;
			anioPoliza = 1;
			sumaAsegurada = 1;
			nivelRiesgo = $('#nivelRiesgo').val();;
			nombreGrupo = $('#nombreGrupo').val();
			ramo = $('#idRamo').val();
			idGrupo = 0;
		}
		
		//var idGrupo = $

		formData.append("ocupacion", new Blob([ JSON.stringify(ocupacion) ], {
			type : 'application/json'
		}));
		formData.append("sucursal", new Blob([ JSON.stringify(sucursal) ], {
			type : 'application/json'
		}));
		formData.append("producto", new Blob([ JSON.stringify(producto) ], {
			type : 'application/json'
		}));
		formData.append("numeroSolicitud", new Blob([ JSON
				.stringify(numeroSolicitud) ], {
			type : 'application/json'
		}));
		formData.append("anioPoliza", new Blob([ JSON.stringify(anioPoliza) ],
				{
					type : 'application/json'
				}));
		formData.append("sumaAsegurada", new Blob([ JSON
				.stringify(sumaAsegurada) ], {
			type : 'application/json'
		}));
		formData.append("nivelRiesgo", new Blob(
				[ JSON.stringify(nivelRiesgo) ], {
					type : 'application/json'
				}));
		formData.append("nombreGrupo", new Blob(
				[ JSON.stringify(nombreGrupo) ], {
					type : 'application/json'
				}));
		formData.append("ramo", new Blob([ JSON.stringify(ramo) ], {
			type : 'application/json'
		}));
		formData.append("idGrupo", new Blob([ JSON.stringify(idGrupo) ], {
			type : 'application/json'
		}));

		$.ajax({
			url : "solicitudGrupoC/guardarSolicitudGrupo",
			method : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet.mensaje);
				$("#formCapturaGruposAP")[0].reset();
				obtenerGruposSolicitud();
				mensajes.modalAlert('success', dataSet.mensaje,	dataSet.detalleMensaje);

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

	var obtenerGrupos = function(idSolicitud,idGrupo) {
		//				
		var formData = new FormData();
		var numeroSolicitud = idSolicitud;
		var grupo = idGrupo;
		
		console.log('METODO OBTENER GRUPOS POR ID')
		console.log(idGrupo)
		
		$.ajax({
			url : "solicitudGrupoC/obtenerGruposPorId/" + grupo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log('EVENTO OBTENER GRUPOD POR ID')
				console.log(dataSet.dataExtra);
				$("#idGrupoE").html(idGrupo)
				$("#nombreGrupoE").val(dataSet.dataExtra[0].nombreGrupo);
				$("#nivelRiesgoE").val(dataSet.dataExtra[0].nivelRiesgo);
				ocupacionC.ocupacionGrupo(dataSet.dataExtra[0].ocupacion);
				extraerProductoE(dataSet.dataExtra[0].idRamo, dataSet.dataExtra[0].producto);
				personalesC.obtenerGrupoCenso();
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},

			error : function(request, status, error) 	{
				console.log(request.responseText);
			},
			complete : function() {
				util.loadingEnd();
			}
		});
	}
	
	var obtenerGruposSolicitud = function() {		
		var formData = new FormData();
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		//var grupo = 8;

		if(numeroSolicitud === undefined){console.log('NO HAY NUMERO DE SOLICITUD(obtenerTodosGruposPorSolicitud)'); return}
		
		$.ajax({
			url : "solicitudGrupoC/obtenerTodosGruposPorSolicitud/" + numeroSolicitud,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log('EVENTO PARA OBTENER GRUPOS POR NUMERO SOLICITUD')
				console.log(dataSet.dataExtra)
				
				$.each($(dataSet.dataExtra),function(k, v){
					
					if(v.grupo == 0){
						v.grupo = null;
					}else{
						v.grupo = '';
					}
					
					if($("#numPoliza").text()){
						v.editarGrupo = '';
						v.eliminarGrupo = '';
						
					}else{
						v.editarGrupo = null;
						v.eliminarGrupo = null;
						
					}
			    });
//				console.log(dataSet,'Soy el resultado de la Solicitud Grupos ');
//				mensajes.modalAlert('success', dataSet.mensaje,
//						dataSet.detalleMensaje);
				var columnas = [ 
					{ title : "Id Grupo", data : "idSoLGrupoAP"},
     				{ title : "Nombre Grupo",data : "nombreGrupo"},
					{ title : "Cargar",	
     				   data : "grupo",
     				  defaultContent : "<span data-toggle='collapse' class='btnSubirGrupo' id='subirGrupo'><i class='fas fa-upload'></i></span>",
					  orderable : false},
					{
						title : "Editar",
						data : "editarGrupo",
						defaultContent : "<span data-toggle='collapse' class='btnEditarGrupo' id='editarGrupo'><i class='fas fa-edit'></i></span>",
						orderable : false
					},
				
					{
						title : "Eliminar",
						data : "eliminarGrupo",
						defaultContent : "<span data-toggle='collapse' class='btnEliminarGrupo text-center' data-toggle='modal' data-target='#eliminarGrupoModal'><i class='fas fa-trash'></i></span>",
						orderable : false
					},
				
					{
						title : "Ver",
						data : null,
						defaultContent : "<span data-toggle='collapse' class='btnVerGrupo text-center' data-toggle='modal' data-target='#verGrupoModal'><i class='fas fa-eye'></i></span>",
						orderable : false
					}];
				var properties = [
				    { targets: [2,3,4,-1],
				      className: 'text-center'
				    }
				  ];
				
				console.log('GRUPOS ANTES DE MOSTRAR TABLA')
				console.log(dataSet.dataExtra);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTablaGrupos("#resultadoGrupos", dataSet.dataExtra,	columnas,properties);
					$('.background-tabla').css('display', 'block');
					tablaCenso();
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
	
	var obtenerGruposSolicitudG = function(callback){
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		$.ajax({
			url : "solicitudGrupoC/obtenerTodosGruposPorSolicitud/" + numeroSolicitud,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
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
	
	var tablaCenso = function() {
		console.log("METODO TABLA CENSO");
		var table = $("#resultadoGrupos").DataTable();
		
		$('#resultadoGrupos tbody').on('click', '.btnSubirGrupo', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log('EVENTO SUBIR GRUPO')
			console.log(data);
			$('#SubirGrupoModal').modal('show');
			$("#idGrupo").html(data.idSoLGrupoAP);
			$("#nombreGrupoU").html(data.nombreGrupo);
			personalesC.obtenerGrupoCenso(data.idSoLGrupoAP);
		});
		
		$('#resultadoGrupos tbody').on('click', '.btnEditarGrupo', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log('EVENTO EDITAR GRUPO')
			console.log(data);
			$('#EditarGrupoModal').modal('show');
			obtenerGrupos(data.numeroSolicitud,data.idSoLGrupoAP);
			$('#nombreGrupoE').prop('disabled', false);
			$('#ocupacionE').prop('disabled', false);
			$('#nivelRiesgoE').prop('disabled', false);
			$('#productoE').prop('disabled', false);
			$( "#btnEliminarGrupoE" ).show();
			$( "#btnCargarGrupoE" ).show();
			
			
			$('#EditarGrupoModal').on('hidden.bs.modal', function (e) {
				$("#idGrupoE").html('');
			})
		});
		
		
		
		$('#resultadoGrupos tbody').on('click', '.btnEliminarGrupo', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log('EVENTO ELIMINAR GRUPO')
			console.log(data);
			$('#EliminarGrupoModal').modal('show');
			$("#idGrupoB").html(data.idSoLGrupoAP);
			$("#nombreGrupoB").html(data.nombreGrupo);
			
			$('#EliminarGrupoModal').on('hidden.bs.modal', function (e) {
				$("#idGrupoE").html('');
				/** CALCULA PRIMA TOTAL DE POLIZA **/
				solicitudCabeceraC.obtenerCalculosSolicitud();
			})
		});
		
		$('#resultadoGrupos tbody').on('click', '.btnVerGrupo', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log('EVENTO VER GRUPO')
			console.log(data);
			$('#EditarGrupoModal').modal('show');
			obtenerGrupos(data.numeroSolicitud,data.idSoLGrupoAP);
			$('#nombreGrupoE').prop('disabled', true);
			$('#ocupacionE').prop('disabled', true);
			$('#nivelRiesgoE').prop('disabled'	, true);
			$('#productoE').prop('disabled', true);
			$( "#btnEliminarGrupoE" ).hide();
			$( "#btnCargarGrupoE" ).hide();
			
			$('#EditarGrupoModal').on('hidden.bs.modal', function (e) {
				$("#idGrupoE").html('');
			})
		});
	}
	
	var extraerProductoE = function(ramo,idProducto){		
		$.ajax({
			url: "productoC/id/" + ramo,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				$('#productoE').html("");
				if(dataSet.mensaje === 'OK'){
					$.each(dataSet.dataExtra, function(i, v){
						$('#productoE').append('<option data-plazo="' + v.plazoPlan +'" value="' + v.cveProducto +'">' + v.nombre + '</option>');
					});
					
					$("#productoE").val(idProducto);
				}
			},
			error: function (request, status, error) {
		        console.log(request.responseText);
		    },
			statusCode: {
				404: function (a, b, c){
			        console.log("Error:", a, b, c);
					console.log("No encuentra.");
					console.log(this.url);
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});		
	}
	
	var eliminarTodoGrupo = function(){
		console.log('EVENTO ELIMINAR TODO EL GRUPO')
		
		eliminaCenso(function(response) {
			var dataSet = response;
			if(dataSet.mensaje == 'OK'){
				
				eliminarGrupo(function(res){
					dataSet = res;
					if(dataSet.mensaje == 'OK'){
						$('#EliminarGrupoModal').modal('hide');
						obtenerGruposSolicitud();
						mensajes.modalAlert('success', dataSet.mensaje,	dataSet.detalleMensaje);
					}else{
						$('#EliminarGrupoModal').modal('hide');
						mensajes.modalAlert('danger', dataSet.mensaje,dataSet.detalleMensaje);
					}
				});
			}else{
				mensajes.modalAlert('danger', dataSet.mensaje,	dataSet.detalleMensaje);
			}
		});
	}
	var eliminaCenso = function(callback){
		var idGrupo = $("#idGrupoB").html();
		console.log('METODO ELIMINAR CENSO DE UN GRUPO')
		console.log(idGrupo)
		$.ajax({
			url : "archivoAPC/eliminarCensoGrupos/" + idGrupo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
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
	var eliminarGrupo = function(callback){
		var idGrupo = $("#idGrupoB").html();
		
		console.log('METODO ELIMINAR UN GRUPO')
		console.log(idGrupo)
		
		$.ajax({
			url : "solicitudGrupoC/eliminarGrupos/" + idGrupo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				callback(dataSet);				
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
		guardarGrupo : guardarGrupo,
		obtenerGrupos : obtenerGrupos,
		obtenerGruposSolicitud : obtenerGruposSolicitud,
		eliminarTodoGrupo : eliminarTodoGrupo,
		obtenerGruposSolicitudG : obtenerGruposSolicitudG

	}
})();