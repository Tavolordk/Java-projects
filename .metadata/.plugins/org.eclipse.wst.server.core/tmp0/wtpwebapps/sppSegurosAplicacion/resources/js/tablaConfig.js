var tabla = (function() {
	
	var myGlyph = new Image();
	myGlyph.src = util.getPath()+'/resources/img/LogoExcel.png';
	
	var iniciarTabla = function(nombreTabla, dataSet, columnas) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : util.getPath() + '/resources/js/dataTables1.10/Spanish.json'
			},
			ordering : true,
			data : dataSet,
			columns : columnas,
			drawCallback: function() {
                $('.oficialAutorizacion').popover({
                	html:true,
                	content: "�Desea realizar autorizaci�n? </br></br> <button type='button' class='btn btn-primary ml-4 btn-aut-s'> S� </button>" + 
                				"<button type='button' class='btn btn-danger ml-5 btn-aut-n'> No </button>"
                });
            }
		});
	}
	
	var iniciarTablaExport = function(nombreTabla, dataSet, columnas, nombreArchivo, nombrePeriodo) {
		if ($.fn.DataTable.isDataTable(nombreTabla)) {
			$(nombreTabla).DataTable().destroy();
		}

		$(nombreTabla).empty();

		$(nombreTabla).DataTable({
			language : {
				url : util.getPath() + '/resources/js/dataTables1.10/Spanish.json'
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
		    			  },
					customizeData : function(data) {
						for (var i = 0; i < data.body.length; i++) {
							for (var j = 0; j < data.body[i].length; j++) {
								if (data.header[j] == "Cuv") {
									data.body[i][j] = "'" + data.body[i][j] + "'";
								}
							}
						}
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
				url : util.getPath() + '/resources/js/dataTables1.10/Spanish.json'
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
				url : util.getPath() + '/resources/js/dataTables1.10/Spanish.json'
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

	var iniciarTablaEdit = function(nombreTabla, columnas, numCellFecha) {

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
		var dato = [];
		var agregar = true;
		var fecha     = "<input type='text' name ='fecha' class='form-control' placeholder='aaaa-mm-dd' />";
		var formaPago = "<select id= 'formaDePago' class= 'form-control lstFormaPago' name='formaPago' required> </select>";
		var catRamo   = "<select id= 'catRamo'     class= 'form-control lstRamos'     name='ramo' required> </select>";
		var catBancos = "<select id= 'catBancos'   class= 'form-control lstBancos'    name='bancos' required> </select>";
		var lstRecibo = "<select id= 'idRecibo'    class= 'form-control lstRecibos'   name='recibos' required> </select>";
		var numColumnas = columnas.length;
		
		if(numCellFecha == 0 ){
			fecha = '';
			catRamo = '';
		}else{
			formaPago = '';
		}
		console.log('NUMERO DE COLUMNAS')
		console.log(numColumnas)
		
		/*** DETERMINA NUMERO COLUMNAS A AGREGAR***/
		 /*** 10 = MOVIMIENTOS, 7 = FORMA PAGO ***/
		for (i = 0; i < numColumnas; i++) {
			var columna = {};
			
			if (i > 0 && i == numCellFecha) {
				columna = fecha;
			} else if ( i == 0 && numColumnas == 10){
				columna = catRamo;
			} else if (i == 0 && numColumnas == 8){
				columna = formaPago;
			} else if (i == 1 && numColumnas == 8){
				columna = catBancos;
			} else if (i == 2 && numColumnas == 8){
				columna = lstRecibo;
			}else{
				columna='';
			}
			
			dato.push(columna);
		}
	
			$(nombreTabla + ' thead').on('click','.add-table',function() {
				var agregar = true;
				
				if(numCellFecha > 0){
					
					/*** VALIDACION PARA EVITAR QUE SE AGREGUEN FILAS SIN HABER CAPTURADO LA ANTERIOR ***/
					if(t.data().count() > 0){
						
					  if($('#estatusLiquidacion').val() === 'APLICADA'){
							mensajes.modalAlert('warning', 'Informacion', 'Liquidacion con Estatus: ' + $('#estatusLiquidacion').val()
									+'<br>No es posible Agregar Movimientos');
							return;
					  }
					  
						$(nombreTabla + ' tbody tr').each(function() {
							var item = $(this).find("td");
							
							console.log('VALOR DE LA CELDA PRIMA NETA');
							console.log(item.filter(":eq(1)").attr('contenteditable'))
							if((item.filter(":eq(7)").text() == '' || item.filter(":eq(8)").text() == '' || item.filter(":eq(5)").text() == '')
									|| item.filter(":eq(1)").attr('contenteditable') == 'true'){
								
								mensajes.modalAlert('warning', 'Informacion', 'Para Agregar otro Registro<br>Es necesario Capturar/Guardar el Actual');
								agregar = false;
							}
						});
					}else{
						agregar = true;
					}
				
				if(agregar){
					
					/*** AGREGA FILA A DATA TABLE MOVIMIENTOS ***/
					t.row.add([
						dato[0],dato[1],dato[2],dato[3],dato[4],dato[5],dato[6],dato[7],dato[8]
					]).draw().node();
					
					/*** CARGA CATALOGO DE RAMOS Y BANCOS ***/
			
				     try{
					      cobranzaC.llenaCatalogoRamo();
					      cobranzaC.catalogoBancos()
					}catch(e){
						if (e instanceof ReferenceError) {
							 polizaC.llenaCatalogoRamo();
							 polizaC.catalogoBancos();
					    }
					}
					
					
					/*** AGREGA ATRIBUTO POR CELDA PARA QUE SEA EDITABLE ***/
					t.cells().every(function() {
						
						/*** VALIDACION PARA HACER EDITABLES SOLO LAS NUEVAS CELDAS ***/
						if($(this.node()).attr('contenteditable') == undefined){
							$(this.node()).attr('contenteditable','true');
						}
						
						/*** AGREGA FORMATO DE FECHA A UNA CELDA ESPECIFICA ***/
						$(nombreTabla + ' tbody tr').each(function() {
							var item = $(this).find("td");
							item.filter(":eq("+ numCellFecha+ ")").attr('editor','DateEditor')
							item.filter(":eq(0)").removeAttr('contenteditable')
							item.filter(":eq(6)").removeAttr('contenteditable')
							item.filter(":eq(7)").removeAttr('contenteditable')
							item.filter(":eq(8)").removeAttr('contenteditable')
							
							/*** SE AGREGA EVENTO PARA VALIDAR MOVIMIENTO CON RECIBOS ***/
							try{
								cobranzaC
								console.log('TIPO DE LIQUIDACION')
								console.log($('#tipoLiquidacion').val())
								
								if($('#tipoLiquidacion').val() === '1'){
									item.filter(":eq(3)").attr('onBlur','cobranzaC.validaRecibos(this.parentElement)');
								}else{
									item.filter(":eq(3)").attr('onBlur','cobranzaC.validaNotasCredito(this.parentElement)');
								}
								
							}catch(e){
								if (e instanceof ReferenceError) {
									item.filter(":eq(3)").attr('onBlur','polizaC.validaRecibos(this.parentElement)');
							    }
							}
							
						});
					});
		
						var editor = $('[name=fecha]');
						editor.datepicker({
							dateFormat : "yy-mm-dd"
						});
		
						$(fecha).on("change", function() {
							var selected = $(this).val();
							cell.trigger("editval", editor.val());
							editor.val(selected);
						});
				}
					
				}else{
					
					/*** VALIDACION PARA EVITAR QUE SE AGREGUEN FILAS SIN HABER CAPTURADO LA ANTERIOR***/
					if(t.data().count() > 0){
						
						if($('#estatusLiquidacion').val() === 'APLICADA'){
							mensajes.modalAlert('warning', 'Informacion', 'Liquidacion con Estatus: ' +$('#estatusLiquidacion').val()
									+'<br>No es posible Agregar Forma de Pago');
							return;
					    }
						
						$(nombreTabla + ' tbody tr').each(function() {
							var item = $(this).find("td");
							
							if((item.filter(":eq(6)").text() == '' || item.filter(":eq(5)").text() == '' || item.filter(":eq(4)").text() == '')
									|| item.filter(":eq(3)").attr('contenteditable') == 'true'){
								
								mensajes.modalAlert('warning', 'Informacion', 'Para Agregar otro Registro<br>Es necesario Capturar el Actual');
								agregar = false;
							}
						});
					}else{
						agregar = true;
					}
					
					if(agregar){
						/*** AGREGA FILA A DATA TABLE FORMA PAGO ***/
						t.row.add([
							dato[0],dato[1],dato[2],dato[3],dato[4],dato[5],dato[6]
						]).draw().node();
						
						/*** CARGA CATALOGO FORMAS PAGO ***/
						try{
							cobranzaC.catalogoFormasPago();
							cobranzaC.catalogoBancos();
							cobranzaC.listaRecibosLiq();
						}catch(e){
							if (e instanceof ReferenceError) {
								polizaC.catalogoFormasPago();
								polizaC.catalogoBancos();
								polizaC.listaRecibosLiq();
						    }
						}
				
						t.cells().every(function() {
							
							/*** VALIDACION PARA HACER EDITABLES SOLO LAS NUEVAS CELDAS ***/
							if($(this.node()).attr('contenteditable') == undefined){
								$(this.node()).attr('contenteditable','true');
							}
						});
						
						/***** AGREGA CLASE PARA ADMITIR SOLO NUMEROS EN CAMPO DE MONTO *****/
						 	/***** AGREGA CLASES PARA LIMITAR LOS CARACTERES *****/
						$(nombreTabla + ' tbody tr').each(function() {
							var item = $(this).find("td");	
							
//							item.filter(":eq(1)").addClass('lengthGuia')
							item.filter(":eq(3)").addClass('lengthGuia')
							item.filter(":eq(4)").addClass('lengthGuia')
							item.filter(":eq(5)").addClass('lengthGuia')
							item.filter(":eq(6)").addClass('lengthImporte');
							item.filter(":eq(6)").numeric()
							item.filter(":eq(0)").removeAttr('contenteditable')
							item.filter(":eq(1)").removeAttr('contenteditable')
							item.filter(":eq(2)").removeAttr('contenteditable')
						});
						
						/*** FUNCION PARA LIMITA CANTIDAD DE CARACTERES EN FORMAS DE PAGO***/
						$(".lengthGuia").keypress(function(e) {
							var cadena = $(this).text().length
							if(cadena >= 21){
								return false;
							}
						});
						
						/*** FUNCION PARA LIMITA CANTIDAD DE CARACTERES EN FORMAS DE PAGO***/
						$(".lengthImporte").keypress(function(e) {
							var cadena = $(this).text().length

							if(cadena >= 14){
								return false;
							}
							
						});
						
						/*** FUNCION PARA LIMITA CARACTERES SOLO NUMERICO ***/
						$(".numberClass").keypress(function(e) {
							if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
								return false;
							}
						});
					}
				}
		});

		/***************************************************/
		/**** EVENTO PARA ELIMINAR UNA FILA DE LA TABLA ****/
		/***************************************************/
		$(nombreTabla + ' tbody').on('click', '.table-remove', function() {
			
			t.row($(this).parents('tr')).remove().draw();

			if(t.data().count() > 0){	
				$('#editMovimiento tbody tr').each(function(){
					
					var item = $(this).find("td");
					var itemFecha = $(this).find("td input");
					
					if(item.filter(":eq(0)").attr('contenteditable') == 'true'){
						
						 if(item.filter(":eq(8)").text().length > 0){
							 $('#btnGuardarEditMov').removeAttr('disabled');
						 }
					}
				 });
			}else{
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
		iniciarTablaUsuarios : iniciarTablaUsuarios
	}
})();