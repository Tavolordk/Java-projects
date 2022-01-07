var tabla = (function() {
	
	var myGlyph = new Image();
	myGlyph.src = 'resources/img/Logotipo.png';
	

	var iniciarTablaEmpty = function(nombreTabla, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			columns : columnas
		});
	}
	
	var iniciarTablaSimple = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas
		});
	}
	
	var iniciarTabla = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			rowCallback: function(row, data, index){
	          for(item in data){
	          //	$(row).css('background-color', '#F3829E');
	          	$(row).find('td:empty').css('background-color', '#7DE1E1');
	          }
			},
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas
		});
	}
	var iniciarTablaTriangulo = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			
			rowCallback: function(row, data, index){
	          for(item in data){
	          	$(row).css('background-color', '#F3829E');
	          	$(row).find('td:empty(0)').css('background-color', '#7DE1E1');
	          }
			}, 	
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas
		});
	}
	
	
	var iniciarTablaVarilacionNulos = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			"scrollX": true,
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas
		});
	}
	
	var iniciarTablaExport = function(nombreTabla, dataSet, columnas, nombreArchivo, nombrePeriodo) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data     : dataSet,
			columns  : columnas,
			dom      : 'Bfrtip',
		    buttons  : [{ extend     :'excelHtml5', 
		    			  text       :'Exportar Excel',
		    			  title      : nombreArchivo,
		    			  messageTop : nombrePeriodo,
		    			  customize: function( xlsx ) {
		    				 var sheet = xlsx.xl.worksheets['sheet1.xml'];
								//Aplicar estilo a titulos
		    				  $('row:eq(0) c', sheet).attr('s','2');
		    				  $('row:eq(1) c', sheet).attr('s','2');
		    				  xlsx.xl.media = [
		    			        	{
		    			        		name:"image1.jpg",
		    			        		data:getBase64Image(myGlyph).split(',')[1]
		    			        	}
		    			      ];
		    			  }
		    			}]
		});
		
	}
	
	var iniciarTablaNoHeader = function(nombreTabla, dataSet, columnas, noHeader) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : false,
			data : dataSet,
			columns : columnas,
			searching: false, paging: false, info: false
		});
	
	}
	
	var iniciarTablaNoHeaderNoOrderExporToExcel = function(nombreTabla, dataSet, columnas, nombreArchivo, subTitulo) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : false,
			data : dataSet,
			columns : columnas,
			pageLength : 100,
			searching: false, paging: true, info: false,
			dom      : 'Bfrtip',
		    buttons  : [{ extend  :'excelHtml5', 
		    			  text    :'Exportar Excel',
		    			  title   : nombreArchivo,
		    			  messageTop : subTitulo,
		    			  customize: function(xlsx) {
		    				  var sheet = xlsx.xl.worksheets['sheet1.xml'];
		    				  $('row:eq(0) c', sheet).attr('s','2');
		    				  $('row:eq(1) c', sheet).attr('s','2');
		    				  xlsx.xl.media = [
		    					  {
		    						  name:"image1.jpg",
		    						  data:getBase64Image(myGlyph).split(',')[1]
		    					  }];
		    			  },
		    			  exportOptions : {
		    				  stripHtml: false
		    			  }
		    }]
		});
	}
	
	function getBase64Image(img) {
	    var canvas = document.createElement("canvas");
	    canvas.width = img.width;
	    canvas.height = img.height;
	    var ctx = canvas.getContext("2d");
	    ctx.drawImage(img, 0, 0);
	    return canvas.toDataURL("image/jpeg");
	}

	var iniciarTablaEdit = function(nombreTabla, columnas) {

		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		var t = $(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			columns : columnas
		});

		/** *************************************************** */
		/** ** EVENTO PARA AGREGAR UNA NUEVA FILA A LA TABLA ** */
		/** *************************************************** */
		
		var agregar = true;
		var reasegurador = "<input type='text' id = 'reasegurador' class='form-control tipoReasegurador clean'/>";
		var nombre       = "<input type='text' id = 'nombre'       class='form-control' placeholder='Nombre' disabled />";
		var porcentaje   = "<input type='text' id = 'porcentaje'   class='form-control lengPorcentaje numberClass' placeholder='Porcentaje' />";
		var dato = [];
		dato.push(reasegurador)
		dato.push(nombre)
		dato.push(porcentaje)
		
			$(nombreTabla + ' thead').on('click','.add-table',function() {
				var agregar = true;
				
//				if(numCellFecha > 0){
					
					/*** VALIDACION PARA EVITAR QUE SE AGREGUEN FILAS SIN HABER CAPTURADO LA ANTERIOR ***/
					if(t.data().count() > 0){
					  
						$(nombreTabla + ' tbody tr').each(function() {
							var item         = $(this).find("td");
							var reasegurador = $(this).find("td #reasegurador");
							var nombre       = $(this).find("td #nombre");
							var porcentaje   = $(this).find("td #porcentaje");
							
							if((reasegurador.val() === '' || nombre.val() === '' || porcentaje.val() === '')){
								
								mensajes.modalAlert('warning', 'Informacion', 'Para Agregar otro Registro<br>Es necesario Capturar el Actual');
								agregar = false;
							}
						});
						
						/*** FUNCION PARA LIMITA CANTIDAD DE CARACTERES ***/
						$(".lengPorcentaje").keypress(function(e) {
							var cadena = $(this).val().length
							if(cadena >= 3){return false;}
						});
						
						/*** FUNCION PARA LIMITA CARACTERES SOLO NUMERICO ***/
						$(".numberClass").keypress(function(e) {
							if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
								return false;
							}
						});
						
						$('.lengPorcentaje').change(function(){
							var sumaPorcentaje = 0
							console.log('Evento Porcentaje')
							
							$('#reaseguradores tbody tr').each(function(){
		
								var porcentaje = $(this).find("td #porcentaje");
									
								/*** REALIZA SUMA TOTAL PORCENTAJES ***/
								sumaPorcentaje = sumaPorcentaje + parseInt(porcentaje.val());
									
							 });
								
							$('#totalParticipacion').val(sumaPorcentaje);
							
							if(sumaPorcentaje <= 0 || sumaPorcentaje > 100){
								$('#guardaContrato').attr('disabled', true)
								return mensajes.modalAlert('warning', 'Información', 'La suma de Participacion debe ser igual a 100%');
								
							}else{
								$('#guardaContrato').attr('disabled', false)
							}
							
						});
						
					}else{
						agregar = true;
					}
				
				if(agregar){
					
					/*** AGREGA FILA A DATA TABLE MOVIMIENTOS ***/
					t.row.add([dato[0],dato[1],dato[2]]).draw().node();
					
					/*** AGREGA ATRIBUTO POR CELDA PARA QUE SEA EDITABLE ***/
					t.cells().every(function() {
						
						/*** VALIDACION PARA HACER EDITABLES SOLO LAS NUEVAS CELDAS ***/
						if($(this.node()).attr('contenteditable') == undefined){
							$(this.node()).attr('contenteditable','false');
						}

					});

					/*** FUNCION PARA LIMITA CANTIDAD DE CARACTERES ***/
					$(".lengPorcentaje").keypress(function(e) {
						var cadena = $(this).val().length
						if(cadena >= 3){return false;}
					});
					
					/*** FUNCION PARA LIMITA CARACTERES SOLO NUMERICO ***/
					$(".numberClass").keypress(function(e) {
						if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
							return false;
						}
					});
					
					$('.lengPorcentaje').change(function(){
						var sumaPorcentaje = 0
						console.log('Evento Porcentaje')
						
						$('#reaseguradores tbody tr').each(function(){
	
							var porcentaje = $(this).find("td #porcentaje");
								
							/*** REALIZA SUMA TOTAL PORCENTAJES ***/
							sumaPorcentaje = sumaPorcentaje + parseInt(porcentaje.val());
								
						 });
							
						$('#totalParticipacion').val(sumaPorcentaje);
						
						if(sumaPorcentaje <= 0 || sumaPorcentaje > 100){
							$('#guardaContrato').attr('disabled', true)
							return mensajes.modalAlert('warning', 'Información', 'La suma de Participacion debe ser igual a 100%');
							
						}else{
							$('#guardaContrato').attr('disabled', false)
						}
						
					});
					
				 $('.tipoReasegurador').focusin(function(){
					 reaseguroContrato.autoCompletReasegurador(); 
				 })
//					reaseguroContrato.catReaseguradores();
				}
		});

		/***************************************************/
		/**** EVENTO PARA ELIMINAR UNA FILA DE LA TABLA ****/
		/***************************************************/
		$(nombreTabla + ' tbody').on('click', '.table-remove', function() {
			
			t.row($(this).parents('tr')).remove().draw();

			if(t.data().count() > 0){	
				var sumaPorcentaje = 0
				
				$('#reaseguradores tbody tr').each(function(){
					
					var porcentaje = $(this).find("td #porcentaje");
						
					/*** REALIZA SUMA TOTAL PORCENTAJES ***/
					sumaPorcentaje = sumaPorcentaje + parseInt(porcentaje.val());
						
				 });
					
				$('#totalParticipacion').val(sumaPorcentaje);
			}else{
				 $('#totalParticipacion').val(sumaPorcentaje);
				 $('#btnGuardarEditMov').removeAttr('disabled');
			}
		});

	}
	
	var iniciarTablaGrupos = function(nombreTabla, dataSet, columnas, properties) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas,
			columnDefs: properties
		});
	}
	var borrarTabla =  function(nombreTabla, dataSet){
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}
		$(nombreTabla).empty();
	}
	
	var iniciarTablaPerfiles = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		return $(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			//autoWidth: false,
			data : dataSet,
			columns : columnas
		});
	}
	
	var iniciarTablaUsuarios = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		return $(nombreTabla).DataTable({
			language : {
				url : 'resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas,
			rowCallback: function (row, data, rowIndex) {
				if(data.activo === false){
					$('td', row).css('background-color', '#F2F3F4');
				$('td', row).css('color', '#979A9A');
				}
			},
			
		});
	}

	return {
		iniciarTabla         : iniciarTabla,
		iniciarTablaEdit     : iniciarTablaEdit,
		iniciarTablaNoHeader : iniciarTablaNoHeader,
		iniciarTablaGrupos   : iniciarTablaGrupos,
		borrarTabla          : borrarTabla,
		iniciarTablaExport   :iniciarTablaExport,
		iniciarTablaNoHeaderNoOrderExporToExcel : iniciarTablaNoHeaderNoOrderExporToExcel,
		iniciarTablaPerfiles : iniciarTablaPerfiles,
		iniciarTablaUsuarios : iniciarTablaUsuarios,
		iniciarTablaSimple   : iniciarTablaSimple,
		iniciarTablaEmpty    : iniciarTablaEmpty,
		iniciarTablaVarilacionNulos    :  iniciarTablaVarilacionNulos,
		iniciarTablaTriangulo: iniciarTablaTriangulo
	}
})();