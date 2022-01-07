var coberturaDaniosC = (function() {
	var limiteSumaAsegurada;
    var certificadosSinCobertura = function() {
    	$('.background-tabla-C').css('display', 'none');
        $('.background-btn-Cobertura').css('display', 'none');

        obtenerCertificadosSinCoberturas(function(grupos) {
            var dataSet = grupos;
            console.log(dataSet)
            if (dataSet.mensaje === 'OK') {
                $('#certificadosCobertura').html("");
                $('#certificadosCobertura').append(
                    '<option value="0">Seleccione Certificado...</option>');
                $.each(dataSet.dataExtra, function(i, v) {
                    $('#certificadosCobertura').append(
                        '<option value="' + v.inciso + '">' +
                        v.inciso +' - '+ v.asegurado  + '</option>');
                });
            }
            
        });
    }
    $("#certificadosCobertura").on('change', function() {
        console.log($('#producto').val());
        obtenerCobertura($('#producto').val());

    });

    var obtenerCertificadosSinCoberturas = function(callback) {
        var numeroSolicitudTitulo = $("#numSolicitud").text();
        var splitnumero = numeroSolicitudTitulo.split(" ");
        var numeroSolicitud = splitnumero[2];
        $.ajax({
            url: " SolicitudCertificadosDaniosC/obtenerTodosSolicitudCabeceraSinCoberturaByNumeroSolicitud/" + numeroSolicitud,
            method: "GET",
            beforeSend: function() {
                util.loadingStart();
            },
            success: function(dataSet) {
                callback(dataSet);
            },
            statusCode: {
                404: function() {
                    console.log("page not found");
                }
            },

            error: function(request, status, error) {
                console.log(request.responseText);
            },
            complete: function() {
                util.loadingEnd();
            }
        });
    }

    var obtenerCobertura = function(cveProducto) {
        $(".descripcionCobertura").remove();
        $.ajax({
            url: "solicitudCoberturasC/obtenerCoberturaProducto/" + cveProducto,
            method: "get",
            dataType: 'json',
            contentType: 'application/json',
            success: function(dataSet) {
            	
                console.log(dataSet.dataExtra.coberturas, 'lo que va en la tabla')
                
                $.each(dataSet.dataExtra.coberturas, function(i, v) {
                        v.primaNeta = (v.sumaAseguradaMinima / 1000) * (v.tarifa) * (1);
                        v.primaNeta=v.primaNeta.toFixed(2);
                });
                
                var columnas = [
                	{ title: "Id",             data: "idCoberturaProducto"},
                    { title: "Cobertura",      data: "descripcion"},
                    { title: "Suma Asegurada", data: "sumaAseguradaMinima"},
                    { title: "Deducible",      data: "deducible"},
                    { title: "Coaseguro",      data: "coaseguro"},
                    { title: "Prima Neta",     data: "primaNeta"}
                ];
                
                var properties = [{
                    targets: [2],
                    render: function(data, type, row) {
                        return '<input class="form-control prueba" id="Markup" name="Markup" type="text"  maxlength="8" value = ' + data + '  >';
                    }
                }];
                console.log(dataSet);
                if (dataSet.mensaje === 'OK') {
                    tabla.iniciarTablaGrupos("#resultadoCoberturasPorGrupo", dataSet.dataExtra.coberturas, columnas, properties);
                    var table = $("#resultadoCoberturasPorGrupo").DataTable().order( [ 1, 'asc' ]);
                    
                    $('.background-tabla-C').css('display', 'block');
                    $('.background-btn-Cobertura').css('display', 'block');
                    
                    $("#resultadoCoberturasPorGrupo tbody").on("keyup", 'td', function() {
                		var dataRow;
                		var dataP  = table.row(this).data();
                        var colIdx = table.cell(this).index().column;
                        var rowIdx = table.cell(this).index().row;
                        var data   = table.row(rowIdx).data();
                        var $row   = table.row(rowIdx).nodes().to$()
                        var row    = table.row(rowIdx).node();   
                        var suma   = 0; 
                        
                        if (colIdx == 2) {
                        	if(($row.find('td:eq(2) input').val() <= limiteSumaAsegurada) || dataSet.dataExtra.PermisoSA){
                        		var sumaAseguradaRow; 
                        		    suma = $row.find('td:eq(2) input').val();
                        		var primerNumero = suma.toString().charAt(0);
                        		    suma = suma.replace(/^0*/, '');                                		
                        		
                        		    console.log('celda seleccionada SAM')
                        		    console.log(table.row(rowIdx).data().sumaAseguradaMinima)
                        		    
                        		    console.log('Celda Seleccionada SUMA')
                        		    console.log(suma)

                        		    table.rows().every( function (rowIdx_2, tableLoop, rowLoop) {                                				
                        				if(rowIdx_2 != rowIdx || primerNumero == 0){
                        					var rowP = table.row(rowIdx_2).node();
                        					dataRow  = table.row(rowIdx_2).data();
                        					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                                			table.cell(rowP, 2).data(suma).draw();
                                			table.cell(rowP, 5).data(sumaAseguradaRow.toFixed(2)).draw(); 
                                			table.row(rowIdx_2).data().sumaAseguradaMinima = suma
                                			
                                			console.log('EVENTO KEYUP')
                                			console.log(table.row(rowIdx_2).data())
                        				}else if(rowIdx_2 == rowIdx && primerNumero != 0){
                        					dataRow = table.row(rowIdx_2).data();
                        					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                        					table.cell(rowIdx, 5).data(sumaAseguradaRow.toFixed(2)).draw();
                        				}                               			
                            			                          			
                            		} );
                        		$row.find('td:eq(2) input').focus();
                        	}else{
                        		console.log($row.find('td:eq(2) input').val())
                        		var sumaAseguradaRow = $row.find('td:eq(2) input').val().substring(0,$row.find('td:eq(2) input').val().length-1);
                                
                                table.rows().every( function (rowIdx_2, tableLoop, rowLoop ) {

                                	var $row = table.row(rowIdx_2).nodes().to$();
                    				dataRow = table.row(rowIdx_2).data();
                    					
                    				table.cell(rowIdx_2, 2).data(limiteSumaAsegurada).draw();
                    					
                    				table.row(rowIdx_2).data().sumaAseguradaMinima = suma
                    				sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                            		table.cell(rowIdx_2, 5).data(sumaAseguradaRow.toFixed(2)).draw(); 
                            		console.log(table.row(rowIdx_2).data())
                    			                                			                          			
                        		} );

                                console.log('SOY MAYOR', sumaAseguradaRow)
                        		mensajes.modalAlert('warning', 'Alerta', 'La suma asegurada no debe ser mayor de ' + limiteSumaAsegurada);

                        	}
                            
                        }    
	                });
                }
            },
            statusCode: {
                404: function() {
                    console.log("page not found");
                }
            }
        });
    }
    
    var guardarCoberturasCertificados = function(table) {
        console.log(table);
        console.log($('#resultadoCoberturasPorGrupo'));
        
        table.rows().every(function(rowIdx, tableLoop, rowLoop) {
                var data = this.data();
                var formData = new FormData();
                
                formData.append("idSucursal", new Blob([JSON.stringify($('#idSucursal').val())], {
                    type: 'application/json'
                }));
                
                console.log(formData);
                formData.append("grupoCobertura", new Blob([JSON.stringify($('#certificadosCobertura').val())],{
                	type: 'application/json' 
                }));
                
                formData.append("idSolCobertura", new Blob([JSON.stringify(0)], {
                    type: 'application/json'
                }));
                
                formData.append("idRamo", new Blob([JSON.stringify($('#idRamo').val())], {
                    type: 'application/json'
                }));
                
                formData.append("idCoberturaProducto", new Blob([JSON.stringify(data.idCoberturaProducto)], {
                    type: 'application/json'
                }));
                
                formData.append("sumaAsegurada", new Blob([JSON.stringify(data.sumaAseguradaMinima)], {
                    type: 'application/json'
                }));
                
                formData.append("deducible", new Blob([JSON.stringify(data.deducible)], {
                    type: 'application/json'
                }));
                
                formData.append("coaseguro", new Blob([JSON.stringify(data.coaseguro)], {
                    type: 'application/json'
                }));
                
                formData.append("coaseguro", new Blob([JSON.stringify(data.coaseguro)], {
                    type: 'application/json'
                }));
                
                formData.append("primaNeta", new Blob([JSON.stringify(data.primaNeta)], {
                    type: 'application/json'
                }));
                
                console.log(formData);
                guardarCobertura(formData);
            })
    }

    var guardarCobertura = function(formData) {
        //console.log("guardar certificado cobertura");
        //console.log(formData);
        $.ajax({
            url: "solicitudCoberturasC/guardarSolicitudCoberturasCertificado",
            method: "POST",
            data: formData,
            enctype: 'multipart/form-data',
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function() {
                util.loadingStart();
            },
            success: function(dataSet) {
                console.log(dataSet.mensaje);
                mensajes.modalAlert('success', dataSet.mensaje,
                    dataSet.detalleMensaje);
                limpiarTablas();
                obtenerCoberturas();
                solicitudCabeceraC.obtenerCalculosSolicitud();
                certificadosSinCobertura();
                $('#editarCertificadoModal').modal('hide');
            },
            statusCode: {
                404: function() {
                    console.log("page not found");
                }
            },

            error: function(request, status, error) {
                console.log(request.responseText);
            },
            complete: function() {
                util.loadingEnd();
            }
        });

    }

    var limpiarTablas = function() {
        $('.background-btn-Cobertura').css('display', 'none');
        var dataSet = [];
        tabla.borrarTabla("#resultadoCoberturasPorGrupo", dataSet);
    }

    var obtenerCoberturas = function(idGrupo) {
        var numeroSolicitudTitulo = $("#numSolicitud").text();
        var splitnumero = numeroSolicitudTitulo.split(" ");
        var numeroSolicitud = splitnumero[2];
        $.ajax({
            url: "solicitudCoberturasC/obtenerSolCobertuaCertificadoPorSolicitud/" + numeroSolicitud,
            method: "GET",
            beforeSend: function() {
                util.loadingStart();
            },
            success: function(dataSet) {
                console.log("certificados",dataSet)
                $.each($(dataSet.dataExtra),function(k, v){
				if($("#numPoliza").text()){
						v.editarCobertura = '';
				
					}else{
						v.editarCobertura = null;
						
					}
                });
                var columnas = [{
                        title: "Certificado",
                        data: "inciso"
                    },
                    {
                        title: "Asegurado",
                        data: "asegurado"
                    },
                    {
                        title: "Editar",
                        data: "editarCobertura",
                        defaultContent: "<span data-toggle='collapse' class='btnEditarCertificadoCobertura' id='editarCertificadoCobertura'><i class='fas fa-edit'></i></span>",
                        orderable: false
                    },
                    {
                        title: "Ver",
                        data: null,
                        defaultContent: "<span data-toggle='collapse' class='btnVerCertificadoCobertura text-center' data-toggle='modal' data-target='#verCertificadoCoberturaModal'><i class='fas fa-eye'></i></span>",
                        orderable: false
                    }
                ];
                var properties = [{
                    targets: [2, -1],
                    className: 'text-center'
                }];
                console.log(dataSet);
                tabla.iniciarTablaGrupos("#resultadoGrupoCoberturas", dataSet.dataExtra, columnas, properties);
                $('.background-tabla-GC').css('display', 'block');
                tablaGrupoCobertura();
            },
            statusCode: {
                404: function() {
                    console.log("page not found");
                }
            },

            error: function(request, status, error) {
                console.log(request.responseText);
            },
            complete: function() {
                util.loadingEnd();
            }
        });
    }

    var coberturas = function(callback) {
        var numeroSolicitudTitulo = $("#numSolicitud").text();
        var splitnumero = numeroSolicitudTitulo.split(" ");
        var idSolicitud = splitnumero[2];
        
        $.ajax({
            url: "solicitudCoberturasC/obtenerDatosPrimaCabeceraDanios/" + idSolicitud,
            method: "GET",
            beforeSend: function() {
                util.loadingStart();
            },
            success: function(dataSet) {
                console.log(dataSet)
                callback(dataSet)
            },
            statusCode: {
                404: function() {
                    console.log("page not found");
                }
            },

            error: function(request, status, error) {
                console.log(request.responseText);
            },
            complete: function() {
                util.loadingEnd();
            }
        });
    }

	var tablaGrupoCobertura = function(){
		
		var table = $("#resultadoGrupoCoberturas").DataTable().order( [ 1, 'asc' ]);
		
		$('#resultadoGrupoCoberturas tbody').on('click', '.btnEditarCertificadoCobertura', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data.inciso);
			$('#editarCertificadoModal').modal('show');
			
			$.ajax({
				url : "solicitudCoberturasC/obtenerSolicitudCoberturaCertificadoDanios/" + data.inciso,
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					$.each(dataSet.dataExtra.coberturas,function(i, v) {
						
						v.primaNeta = (v.sumaAsegurada / 1000) * (v.numeroPersonas) * (v.tarifa);
						v.primaNeta = v.primaNeta.toFixed(2); });
					
					var columnas = [ 
						{ title : "Id",             data : "idSolCobertura"}, 
						{ title : "Cobertura",      data : "descripcionCobertura"},
						{ title : "Suma Asegurada", data : "sumaAsegurada"},
						{ title : "Deducible",      data : "deducible"},
						{ title : "Coaseguro",      data : "coaseguro"},
						{ title : "Prima Neta",     data : "primaNeta"}
					];
					
					var properties = [ {
						targets : [ 2, 3, 4 ],
						render : function(data, type, row) {
							return '<input class="form-control prueba" id="Markup" name="Markup" type="text" maxlength ="8" value = '	+ data + '  >';
						}
					} ];
					
//					console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTablaGrupos("#resultadoCoberturasPorGrupoE", dataSet.dataExtra.coberturas, columnas, properties);
						
						var table = $("#resultadoCoberturasPorGrupoE").DataTable().order( [ 1, 'asc' ]);
						
						$('.background-tabla-CE').css('display', 'block');
						
						$("#resultadoCoberturasPorGrupoE tbody").on("keyup",'td', function() {
							var dataRow;
							var dataP = table.row(this).data();
                            var colIdx = table.cell(this).index().column;
                            var rowIdx = table.cell(this).index().row;
                            var data = table.row(rowIdx).data();
                            var $row = table.row(rowIdx).nodes().to$()
                            var row = table.row(rowIdx).node();   
                            var suma = 0; 
                            
                            if (colIdx == 2) {
                            	if(($row.find('td:eq(2) input').val() <= limiteSumaAsegurada) || dataSet.dataExtra.PermisoSA){
                            		var sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (data.tarifa) * (1)
                            		suma = $row.find('td:eq(2) input').val();
                            		
                            		var primerNumero = suma.toString().charAt(0);
                            		suma = suma.replace(/^0*/, '');                                		
                            		
//                            		if(table.row(rowIdx).data().sumaAseguradaMinima != suma){
                            			table.rows().every( function ( rowIdx_2, tableLoop, rowLoop ) {
                            				if(rowIdx_2 != rowIdx || primerNumero == 0){
                            					var rowP = table.row(rowIdx_2).node();
                            					dataRow = table.row(rowIdx_2).data();
                            					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                                    			table.cell(rowP, 2).data(suma).draw();
                                    			table.cell(rowP, 5).data(sumaAseguradaRow.toFixed(2)).draw(); 
                                    			table.row(rowIdx_2).data().sumaAseguradaMinima = suma
                                    			console.log(table.row(rowIdx_2).data())
                            				}else if(rowIdx_2 == rowIdx && primerNumero != 0){
                            					dataRow = table.row(rowIdx_2).data();
                            					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                            					table.cell(rowIdx, 5).data(sumaAseguradaRow.toFixed(2)).draw();
                            				}                               			
                                			                          			
                                		} );
//                            		}   
                            		$row.find('td:eq(2) input').focus();
                            	} else {
//                            		console.log($row.find('td:eq(2) input').val())
//                            		var sumaAseguradaRow = $row.find('td:eq(2) input').val().substring(0,$row.find('td:eq(2) input').val().length-1);
////                            		table.cell(row, 2).data(limiteSumaAsegurada).draw();
////                                    $row.find('td:eq(2) input').focus();
//                                    
//                                    table.rows().every( function ( rowIdx_2, tableLoop, rowLoop ) {
////                        				if(rowIdx_2 != rowIdx || primerNumero == 0){
//                        					var rowP = table.row(rowIdx_2).node();
//                        					dataRow = table.row(rowIdx_2).data();
//                        					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
//                                			table.cell(rowIdx_2, 2).data(limiteSumaAsegurada).draw();
//                                			table.cell(rowIdx_2, 5).data(sumaAseguradaRow.toFixed(2)).draw(); 
//                                			table.row(rowIdx_2).data().sumaAseguradaMinima = suma
//                                			console.log(table.row(rowIdx_2).data())
//                        				}else if(rowIdx_2 == rowIdx && primerNumero != 0){
//                        					dataRow = table.row(rowIdx_2).data();
//                        					sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
//                        					table.cell(rowIdx_2, 5).data(sumaAseguradaRow.toFixed(2)).draw();
//                        				}
                                			
                                	console.log($row.find('td:eq(2) input').val())
                                	var sumaAseguradaRow = $row.find('td:eq(2) input').val().substring(0,$row.find('td:eq(2) input').val().length-1);
                                
                                	table.rows().every( function (rowIdx_2, tableLoop, rowLoop ) {

                                	var $row = table.row(rowIdx_2).nodes().to$();
                    				dataRow = table.row(rowIdx_2).data();
                    					
                    				table.cell(rowIdx_2, 2).data(limiteSumaAsegurada).draw();
                    					
                    				table.row(rowIdx_2).data().sumaAseguradaMinima = suma
                    				sumaAseguradaRow = ($row.find('td:eq(2) input').val() / 1000) * (dataRow.tarifa) * (1);
                            		table.cell(rowIdx_2, 5).data(sumaAseguradaRow.toFixed(2)).draw(); 
                            		console.log(table.row(rowIdx_2).data())
                            			                          			
                            		} );
                            		console.log('SOY MAYOR', sumaAseguradaRow)
                            		mensajes.modalAlert('warning', 'Alerta', 'La suma asegurada no debe ser mayor de ' + limiteSumaAsegurada);
                            	}
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

		$('#resultadoGrupoCoberturas tbody').on('click', '.btnVerCertificadoCobertura', function(){
			var data = table.row( $(this).parents('tr') ).data();
			console.log(data.inciso);
			$('#verCertificadoModal').modal('show');
			$.ajax({
				url : "solicitudCoberturasC/obtenerSolicitudCoberturaCertificadoDanios/" + data.inciso,
				method : "GET",
				beforeSend : function() {
					util.loadingStart();
				},
				success : function(dataSet) {
					$.each(dataSet.dataExtra.coberturas,function(i, v) {
								v.primaNeta = (v.sumaAsegurada / 1000) * (v.numeroPersonas) * (v.tarifa);
								v.primaNeta=v.primaNeta.toFixed(2);	
					});
					var columnas = [ 
							{ title : "Id",		        data : "idSolCobertura"},
							{ title : "Cobertura",      data : "descripcionCobertura"},
							{ title : "Suma Asegurada", data : "sumaAsegurada"},
							{ title : "Deducible",		data : "deducible"},
							{ title : "Coaseguro",		data : "coaseguro"},
							{ title : "Prima Neta",		data : "primaNeta"}
						];
					console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						tabla.iniciarTabla("#resultadoCoberturasPorGrupoV",dataSet.dataExtra.coberturas, columnas);
						var table = $("#resultadoCoberturasPorGrupoV").DataTable().order( [ 1, 'asc' ]);
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
		var table = $("#resultadoCoberturasPorGrupoE").DataTable().order( [ 1, 'asc' ]);
		table.rows().every(function(rowIdx,tableLoop,rowLoop) {
			var row = table.row(rowIdx).node();
			var $row = table.row(rowIdx).nodes().to$(), 
			sumaAseguradaRow = $row.find('td:eq(2) input').val(),
			deducible = $row.find('td:eq(3) input').val(),
			coaseguro = $row.find('td:eq(4) input').val()
			table.cell(row,2).data(sumaAseguradaRow).draw();
			table.cell(row,3).data(deducible).draw();
			table.cell(row,4).data(coaseguro).draw();
			});
			  editaCoberturas(table);
			});	

	var editaCoberturas = function(table){
		
		table.rows().every(
		function(rowIdx, tableLoop, rowLoop) {
			var data = this.data();
			console.log(data);
			var formData = new FormData();
			formData.append("idSucursal", new Blob([JSON.stringify($('#idSucursal').val()) ], {
				type : 'application/json'
			}));
			
			formData.append("grupoCobertura", new Blob([JSON.stringify(data.inciso) ], {
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
	var limiteSumaAsegurada = function(){
		$.ajax({
			url : "solicitudCoberturasC/obtenerLimiteSumaAseguradaDanios",
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
        certificadosCobertura: certificadosCobertura,
        guardarCoberturasCertificados: guardarCoberturasCertificados,
        obtenerCoberturas: obtenerCoberturas,
        coberturas: coberturas,
        certificadosSinCobertura: certificadosSinCobertura,
        limiteSumaAsegurada: limiteSumaAsegurada
    }
})();