var coberturaC = (function() {
	var numeroCenso;
	var grupoDataSet;
	var limiteSumaAsegurada;
	
	var gruposCobertura = function() {
	
		$('.background-tabla-C').css('display', 'none');
		$('.background-btn-Cobertura').css('display', 'none');
		$( ".ocultarAlerta" ).hide();
		
		obtenerGruposSinCoberturas(function(grupos) {
			var dataSet = grupos;
			grupoDataSet = grupos;
			console.log(dataSet)
			if (dataSet.mensaje === 'OK') {
				$('#grupoCobertura').html("");
				$('#grupoCobertura').append('<option value="0">Seleccione Grupo...</option>');
				$.each(dataSet.dataExtra, function(i, v) {
					$('#grupoCobertura').append('<option value="' + v.idSoLGrupoAP + '">' + v.nombreGrupo + '</option>');
				});
			}
		});
	}

	$("#grupoCobertura").on('change',function() {
		var idGrupoCobertura = $("#grupoCobertura").val();

		var grupo = $.grep(grupoDataSet.dataExtra, function(e) {
			return e.idSoLGrupoAP == idGrupoCobertura;
		});
	
		var idProducto = grupo[0].producto;
		numeroCenso = grupo[0].grupo;
		
		if(numeroCenso > 0){
			$( ".ocultarAlerta" ).hide();
			console.log(idProducto, 'producto');
			obtenerCobertura(idProducto);
		}else{
			limpiarTablas();
			$( ".ocultarAlerta" ).show();
		}				
	});
	var obtenerGruposSinCoberturas = function(callback){
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		
		if(numeroSolicitud === undefined){console.log('NO HAY NUMERO SOLICITUD (obtenerTodosGruposSinCoberturaPorSolicitud)'); return}
		
		$.ajax({
			url : " solicitudGrupoC/obtenerTodosGruposSinCoberturaPorSolicitud/" + numeroSolicitud,
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
	var obtenerCobertura = function(cveProducto) {
		$(".descripcionCobertura").remove();
		console.log('clave_producto_AP -->', cveProducto)
		$.ajax({
					url : "solicitudCoberturasC/obtenerCoberturaProducto/" + cveProducto,
					method : "get",
					dataType : 'json',
					contentType : 'application/json',
					success : function(dataSet) {
						console.log(dataSet.dataExtra, 'lo que va en la tabla')
						$.each(dataSet.dataExtra.coberturas,function(i, v) {
							if(v.millar){
								v.primaNeta = (v.sumaAseguradaMinima / (v.millar ? 1000 : 1)) * (v.tarifa) * (numeroCenso);
								v.primaNeta =  v.primaNeta.toFixed(2);
							}else{
								v.primaNeta = (v.tarifa) * (numeroCenso);
								v.primaNeta = v.primaNeta.toFixed(2);
							}
							
						});
						var columnas = [ 
							{ title : "Id",	            data : "idCoberturaProducto"},
							{ title : "Cobertura",      data : "descripcion"},
							{ title : "Suma Asegurada", data : "sumaAseguradaMinima"},
							{ title : "Deducible",   	data : "deducible"},
							{ title : "Coaseguro",		data : "coaseguro"},
							{ title : "Prima Neta",		data : "primaNeta"}
						];
						
						var properties = [ ];
						
						console.log(dataSet);
						
						if (dataSet.mensaje === 'OK') {
							tabla.iniciarTablaGrupos("#resultadoCoberturasPorGrupo",dataSet.dataExtra.coberturas, columnas, properties);
							var table = $("#resultadoCoberturasPorGrupo").DataTable();
							$('.background-tabla-C').css('display', 'block');
							$('.background-btn-Cobertura').css('display','block');
						}
					},
					statusCode : {
						404 : function() {
							console.log("page not found");
						}
					}
				});
	}
	
	$('#btnCargarCobertura').on('click',function() {
				var table = $("#resultadoCoberturasPorGrupo").DataTable();
				guardarCoberturas(table);
	});
	
	var guardarCoberturas = function(table) {
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
					var data = this.data();
					var formData = new FormData();
					formData.append("idSucursal", new Blob([ JSON.stringify($('#idSucursal').val()) ], {
						type : 'application/json'
					}));
					formData.append("grupoCobertura", new Blob([ JSON.stringify($('#grupoCobertura').val()) ], {
						type : 'application/json'
					}));
					formData.append("idSolCobertura", new Blob([ JSON.stringify(0) ], {
						type : 'application/json'
					}));
					formData.append("idRamo", new Blob([ JSON.stringify($('#idRamo').val()) ], {
						type : 'application/json'
					}));
					formData.append("idCoberturaProducto", new Blob([ JSON.stringify(data.idCoberturaProducto) ], {
						type : 'application/json'
					}));
					formData.append("sumaAsegurada", new Blob([ JSON.stringify(data.sumaAseguradaMinima) ], {
						type : 'application/json'
					}));
					formData.append("deducible", new Blob([ JSON.stringify(data.deducible) ], {
						type : 'application/json'
					}));
					formData.append("coaseguro", new Blob([ JSON.stringify(data.coaseguro) ], {
						type : 'application/json'
					}));
					formData.append("primaNeta", new Blob([ JSON.stringify(data.primaNeta) ], {
						type : 'application/json'
					}));
					guardarCobertura(formData);
				})
	}
	
	var editaCoberturas = function(table){
		table.rows().every(function(rowIdx, tableLoop, rowLoop) {
			var data = this.data();
			var formData = new FormData();
			
			formData.append("idSucursal", new Blob([ JSON.stringify($('#idSucursal').val()) ], {
				type : 'application/json'
			}));
			
			formData.append("grupoCobertura", new Blob([ JSON.stringify(data.idGrupo) ], {
				type : 'application/json'
			}));
			
			formData.append("idSolCobertura", new Blob([ JSON.stringify(data.idSolCobertura) ], {
				type : 'application/json'
			}));
			formData.append("idRamo", new Blob([ JSON.stringify($('#idRamo').val()) ], {
				type : 'application/json'
			}));
			formData.append("idCoberturaProducto", new Blob([ JSON.stringify(data.cobertura) ], {
				type : 'application/json'
			}));
			formData.append("sumaAsegurada", new Blob([ JSON.stringify(data.sumaAsegurada) ], {
				type : 'application/json'
			}));
			formData.append("deducible", new Blob([ JSON.stringify(data.deducible) ], {
				type : 'application/json'
			}));
			formData.append("coaseguro", new Blob([ JSON.stringify(data.coaseguro) ], {
				type : 'application/json'
			}));
			formData.append("primaNeta", new Blob([ JSON.stringify(data.primaNeta) ], {
				type : 'application/json'
			}));
			guardarCobertura(formData);
		})
	}
	var guardarCobertura = function(formData) {
		$.ajax({
			url : "solicitudCoberturasC/guardarSolicitudCoberturas",
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
				mensajes.modalAlert('success', dataSet.mensaje,	dataSet.detalleMensaje);
				limpiarTablas();
				solicitudCabeceraC.obtenerCalculosSolicitud();
				obtenerCoberturas();
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
	var limpiarTablas = function(){
		gruposCobertura();
		$('.background-btn-Cobertura').css('display', 'none');
		var dataSet = [];
		tabla.borrarTabla("#resultadoCoberturasPorGrupo", dataSet);
	}

	var obtenerCoberturas = function(idGrupo) {	
		coberturas(function(dataSet){
			$.each($(dataSet.dataExtra),function(k, v){
				if($("#numPoliza").text()){
					v.editarCobertura = '';
				
				}else{
					v.editarCobertura = null;
					
				}
		    });
			
			var columnas = [
				{ title : "Id Grupo",     data : "idGrupo"},
				{ title : "Nombre Grupo", data : "grupo"},
				{ title : "Ver", 
				  Sdata : null,
				  defaultContent : "<span data-toggle='collapse' class='btnVerGrupoCobertura text-center' data-toggle='modal' data-target='#verGrupoCoberturaModal'><i class='fas fa-eye'></i></span>",
					orderable : false
				} ];
			var properties = [ {
				targets : [ 2, -1 ],
				className : 'text-center'
			} ];
			    console.log(dataSet);
				tabla.iniciarTablaGrupos("#resultadoGrupoCoberturas", dataSet.dataExtra, columnas, properties);
				$('.background-tabla-GC').css('display', 'block');
				tablaGrupoCobertura();
		})
		
	}
	var coberturas = function(callback){
		var numeroSolicitudTitulo = $("#numSolicitud").text();
		var splitnumero = numeroSolicitudTitulo.split(" ");
		var numeroSolicitud =splitnumero[2];
		
		if(numeroSolicitud === undefined){console.log('NO HAY NUMERO DE SOLICITUD(obtenerSolCobertuaGrupoPorSolicitud)'); return}
		
		$.ajax({
			url : "solicitudCoberturasC/obtenerSolCobertuaGrupoPorSolicitud/" + numeroSolicitud,
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				console.log(dataSet)
				callback(dataSet)
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
	var tablaGrupoCobertura = function(){
		
		var table = $("#resultadoGrupoCoberturas").DataTable();
	
		$('#resultadoGrupoCoberturas tbody').on('click', '.btnEditarGrupoCobertura', function(){
			
			var data = table.row( $(this).parents('tr') ).data();
			
			$('#editarCoberturaModal').modal('show');
			
			$.ajax({
				url : "solicitudCoberturasC/obtenerSolicitudCobertua/" + data.idGrupo,
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					$.each(dataSet.dataExtra,function(i, v) {
					   v.primaNeta = (v.sumaAsegurada / (v.millar ? 1000 : 1)) * (v.numeroPersonas) * (v.tarifa);		
					   v.primaNeta=v.primaNeta.toFixed(2);
					});
					var columnas = [ 
						{ title : "Id",	            data : "idSolCobertura"},
						{ title : "Cobertura",      data : "descripcionCobertura"},
						{ title : "Suma Asegurada",	data : "sumaAsegurada"},
						{ title : "Deducible",      data : "deducible"},
						{ title : "Coaseguro",  	data : "coaseguro"},
						{ title : "Prima Neta",		data : "primaNeta"}
					];
					var properties = [ {
						targets : [ 2, 3, 4 ],
						render : function(data, type, row) {
							return '<input class="form-control prueba" id="Markup" name="Markup" type="text"  value = '	+ data + '  >';
						}
					} ];
					console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTablaGrupos("#resultadoCoberturasPorGrupoE",dataSet.dataExtra, columnas, properties);
						var table = $("#resultadoCoberturasPorGrupoE").DataTable();
						
						$('.background-tabla-CE').css('display', 'block');
						
						$("#resultadoCoberturasPorGrupoE tbody").on("keyup",'td',function() {
							var colIdx = table.cell(this).index().column;
							var rowIdx = table.cell(this).index().row;
							var data = table.row(rowIdx).data();
							var $row = table.row(rowIdx).nodes().to$()
							var row = table.row(rowIdx).node();
						
							if (colIdx == 2) {
								var sumaAseguradaRow = ($row.find('td:eq(2) input').val() / (data.millar ? 1000 : 1)) * (data.numeroPersonas) * (data.tarifa)
								table.cell(row, 5).data(sumaAseguradaRow.toFixed(2)).draw();
								$row.find('td:eq(2) input').focus();
							}

						});						
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
		});
		
		$('#resultadoGrupoCoberturas tbody').on('click', '.btnVerGrupoCobertura', function(){
			var data = table.row( $(this).parents('tr') ).data();
			$('#verCoberturaModal').modal('show');
			console.log('EVENTO VER COBERTURAS POR GRUPOS')
			$.ajax({
				url : "solicitudCoberturasC/obtenerSolicitudCobertua/" + data.idGrupo,
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					console.log('coberturas')
					console.log(dataSet)
					$.each(dataSet.dataExtra,function(i, v) {
						
						if(v.millar){
							v.primaNeta = (v.sumaAsegurada / (v.millar ? 1000 : 1)) * (v.tarifa) * (v.numeroPersonas);
							v.primaNeta =  v.primaNeta.toFixed(2);
						}else{
							v.primaNeta = (v.tarifa) * (v.numeroPersonas);
							v.primaNeta = v.primaNeta.toFixed(2);
						}
						
					});
					
					var columnas = [ 
							{ title : "Id",	            data : "idSolCobertura"},
							{ title : "Cobertura",      data : "descripcionCobertura"},
							{ title : "Suma Asegurada",	data : "sumaAsegurada"},
							{ title : "Deducible",		data : "deducible"},
							{ title : "Coaseguro",		data : "coaseguro"},
							{ title : "Prima Neta",		data : "primaNeta"}
						];
					console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTabla("#resultadoCoberturasPorGrupoV",	dataSet.dataExtra, columnas);
						
						var table = $("#resultadoCoberturasPorGrupoV").DataTable();
						
						$('.background-tabla-CE').css('display', 'block');					
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
		});
	}
	$('#btnCargarCoberturaE').on('click',function() {
		var table = $("#resultadoCoberturasPorGrupoE").DataTable();
		table.rows().every(function(rowIdx,	tableLoop, rowLoop) {
			var row = table.row(rowIdx).node();
			var $row = table.row(rowIdx).nodes().to$(), 
			    sumaAseguradaRow = $row.find('td:eq(2) input').val(), 
			    deducible = $row.find('td:eq(3) input').val(), 
			    coaseguro = $row.find('td:eq(4) input').val()
			table.cell(row, 2).data(sumaAseguradaRow).draw();
			table.cell(row,	3).data(deducible).draw();
			table.cell(row,	4).data(coaseguro).draw();
		});
				editaCoberturas(table);
	});
	
	var limiteSumaAsegurada = function(){
		$.ajax({
			url : "solicitudCoberturasC/obtenerLimiteSumaAseguradaAP",
			method : "GET",
			beforeSend : function() {
				util.loadingStart();
			},
			success : function(dataSet) {
				limiteSumaAsegurada = dataSet.dataExtra;
				console.log(limiteSumaAsegurada, 'QUE LIMITE SERA');
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
		gruposCobertura      : gruposCobertura,
		guardarCoberturas    : guardarCoberturas,
		obtenerCoberturas    : obtenerCoberturas,
		coberturas           : coberturas,
	    limiteSumaAsegurada  : limiteSumaAsegurada
	}
})();