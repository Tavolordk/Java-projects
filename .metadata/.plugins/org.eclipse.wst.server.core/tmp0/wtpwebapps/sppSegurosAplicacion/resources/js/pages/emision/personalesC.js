var personalesC = (function() {
	var claveDesarrollador = 0;

	var cargarArchivoAP = function() {
		var formData = new FormData();
		var idGrupo = $('#idGrupo').html();

		formData.append("grupo", new Blob([ JSON.stringify(idGrupo) ], {
			type : 'application/json'
		}));
		
		formData.append("file", $('#fileInput')[0].files[0]);
		
		console.log('METODO PARA CARGAR CENSO GRUPO AP')
		console.log(formData)
		
		$.ajax({
			url : "archivoAPC/guardarCensoAP",
			type : "POST",
			data : formData,
			enctype : 'multipart/form-data',
			processData : false,
			contentType : false,
			cache : false,
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				if (dataSet.mensaje === 'OK') {
					obtenerGrupoCenso(idGrupo);
					$("#formArchivoPersonales")[0].reset();

				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
				gruposC.obtenerGruposSolicitud();
				claveDesarrollador = 0;
			},
			error : function(request, status, error) {
				console.log(request.responseText);
			},
			complete : function() {
				$("#formArchivoPersonales")[0].reset();
				util.loadingEnd();
			}
		});
	};

	var obtenerGrupoCenso = function(grupo) {
		var idGrupo;
		var idModal;

		console.log('METODO PARA OBTENER GRUPO CENSO')
		if(grupo){
			idGrupo = grupo;
			idModal = "#resultadoCargaCenso";
		}else{
			idGrupo = $("#idGrupoE").html();
			idModal = "#CensoGrupoE";
		}
		
		console.log(grupo)
		console.log(idGrupo)
		console.log(idModal)
		
		$.ajax({
			url : "archivoAPC/obtenerCensoGruposPorId/" + idGrupo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [ {
					title : "Nombre",
					data : "nombre"
				}, {
					title : "Apellido Paterno",
					data : "apellidoPaterno"
				}, {
					title : "Apellido Materno",
					data : "apellidoMaterno"
				}, ];

				tabla.iniciarTabla(idModal,
						dataSet.dataExtra, columnas);
				setTimeout(function(){ 
					$('.background-tabla').css('display', 'block'); 
				}, 1000);
				
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
	};
	
	var eliminarCensoGrupo = function(){
		var idGrupo = $("#idGrupoE").html()
		
		console.log('ELIMINAR CENSO GRUPO')
		console.log(idGrupo)
		
		$.ajax({
			url : "archivoAPC/eliminarCensoGrupos/" + idGrupo,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				if(dataSet.mensaje == 'OK'){
					obtenerGrupoCenso();
					gruposC.obtenerGruposSolicitud();
					
					/** CALCULA PRIMA TOTAL DE POLIZA **/
					solicitudCabeceraC.obtenerCalculosSolicitud();
					
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
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
	var actualizarAgrupador = function() {
		fileinput.inicializarFileinput("archivoAgrupadorC/actualizarCuv", "#fileInputActualizaAgrupador", [ "txt" ]);
	};

	var autocompletarDesarrollador = function(appendTo) {
		console.log('METODO AUTOCOMPLETAR DESARROLLADOR')
		console.log(appendTo)
		
		$(".desarrollador").autocomplete({appendTo : $('#' + appendTo), minLength : 3, source : function(request, response) {
				$.ajax({
					url : 'clientesC/obtenerDesarrolladores',
					dataType : 'json',
					type : "GET",
					data : {termino : request.term},
					success : function(data) {
						
						response($.map(data, function(v, i) {
							var nombre;
							if (!v.nombreCliente) {
								nombre = v[1] + ' ' + v[2] + ' ' + v[3];
							} else {
								nombre = v[1];
							}
							return {
								label : v[0] + " - " + nombre,
								value : v[0] + " - " + nombre,
								data : v
							};
						}));
					}
				});
			},
			select : function(event, ui) {
				claveDesarrollador = ui.item.data[0];
				$(this).val(ui.item.label);
				return true;
			}
		});
	}

	return {
		cargarArchivoAP : cargarArchivoAP,
		actualizarAgrupador : actualizarAgrupador,
		autocompletarDesarrollador : autocompletarDesarrollador,
		obtenerGrupoCenso : obtenerGrupoCenso,
		eliminarCensoGrupo : eliminarCensoGrupo
	}
})();