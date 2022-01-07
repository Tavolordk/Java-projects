var primasC = (function(){
	 var idMovimiento = 0;
	 var id_FormaPago = 0;
	 var liquidacion = 0;
	 var datosMovimientos;
	 var datosFormaPago;
	 var listaPrimasDep = {};
	 var listaPrimasTotales = {};
	 
	 
	 /*** OBTIENE FECHA ACTUAL ***/
	 var fechaActual = function(){
			var d = new Date();
			var month = d.getMonth()+1;
			var day = d.getDate();
			
			var fecha = d.getFullYear()
			    + '-' + (month < 10 ? '0' : '') + month
			    + '-' + (day   < 10 ? '0' : '') + day;
			
			return fecha
		}
	 
	/**********************************************************************/
	/**** METODO PARA MOSTRAR MOVIMIENTOS CAPTURADOS DE LA LIQUIDACION ****/
	/**********************************************************************/
	var muestraLiquidacion = function() {
	
		$.when(buscaLiquidacion()).then(function(respuestaBusca){
			console.log('muestra primas manuales')
			console.log(respuestaBusca.dataExtra)
		if(respuestaBusca.dataExtra !== null){
			var btnEditMov = "btnEditMov";
			if(respuestaBusca.dataExtra.movimientosLiqLst.length > 0 ){
					var columnasMovimientos =[
						{title: "Poliza", 	  data: "poliza.numeroPoliza"},
						{title: "Ramo", 	  data: "ramo.cT8Descripcion"},
						{title: "Num. Recibo",data: "recibo"},
						{title: "Endoso", 	  data: "endoso"},
						{title: "Suc", 		  data: "sucursal.ct19Descripcion"},												
						{title: "Tipo Endoso",data: "tipoEndoso"},						
						{title: "Fecha Pago", data: "fechaPago"},
						{title: "Prima Total",data: "primaTotal", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
						{title: "Prima Neta", data: "primaNeta",  render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
						
						{title : "",
						 data : null,
						 defaultContent : "<span data-toggle='collapse' class='"+btnEditMov+"'><i class='fas fa-edit'></i></span>",
						}
					];
					
					
					console.log(respuestaBusca.dataExtra.movimientosLiqLst);
					tabla.iniciarTabla("#tableMovimientos", respuestaBusca.dataExtra.movimientosLiqLst, columnasMovimientos);
					$('#lbMovimientos').css('display','block');
					$('#idHistMovimientos').css('display','block');
					
					var sumaMov = 0.0;
					
					$.each(respuestaBusca.dataExtra.movimientosLiqLst, function(i,v){
						sumaMov =  (parseFloat(sumaMov)) + (parseFloat(v.primaTotal));
					});
					
					console.log(sumaMov);
					$('#totalMovimientosHist').val(sumaMov.toFixed(2));
					
					modalEditMovimiento();
				}
	
				if(respuestaBusca.dataExtra.formaPagoLiq.length  > 0){
						var columnasFormaPago = [
							    {title: "Forma Pago", data: "formaPago.ct18Descripcion"},
								{title: "Guia",       data: "guia"},
								{title: "Sub_Guia",   data: "subGuia"},
								{title: "Referencia", data: "referencia"},
								{title: "Concepto",   data: "concepto"},
								{title: "Importe",    data: "importe", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )},
								
								{title : "",
								 data : null,
								 defaultContent : "<span data-toggle='collapse' class='"+btnEditMov+"'><i class='fas fa-edit'></i></span>",
								}
							];
						
						tabla.iniciarTabla("#tablaFormasPago", respuestaBusca.dataExtra.formaPagoLiq, columnasFormaPago);

						$('#lbFormasPago').css('display','block');
						$('#idHistFormaPago').css('display','block');
						
						var sumaPago = 0.0;
						
						$.each(respuestaBusca.dataExtra.formaPagoLiq, function(i,v){
							sumaPago = (parseFloat(sumaPago)) + (parseFloat(v.importe));
						});
						
						console.log(sumaPago);
						$('#totalFormaPagoHist').val(sumaPago.toFixed(2));
						
						modalEditPagos();
				}
		  }

		});
	}
	
	/**********************************************************************/
	/********** METODO PARA MOSTRAR TABLE EDITABLE DE MOVIMIENTOS *********/
	/**********************************************************************/
	var editarMovimientos = function(mostrar){
			var campoFecha = "6";
			var columnas = [
					
				{title: "Poliza"},
				{title: "Ramo", "width": "20%"},
				{title: "Num. Recibo"},
				{title: "Endoso"},
				{title: "T.Endoso"},
				{title: "Suc"},
				{title: "Fecha Pago","width": "15%"},
				{title: "Prima Total"},
				{title: "Prima"},
				{
					title : "<span class='add-table' style ='width: auto;cursor: pointer'><i class='fas fa-plus-circle'></i></span>",
					defaultContent : "<span class='table-remove movRemove' style ='cursor: pointer'><i class='fas fa-trash-alt'></i></span>",
					orderable : false
				} ];
			
			tabla.iniciarTablaEdit("#editMovimiento", columnas, campoFecha);
			
			if(mostrar){
				$('#lbFormasPago').css('display', 'none');
				$('#idHistFormaPago').css('display', 'none'); 
				$('#lbEditMovimientos').css('display','block');
				$('#idEditMovimientos').css('display', 'block');
			}else{
				$('#lbFormasPago').css('display', 'none');
				$('#idHistFormaPago').css('display', 'none'); 
				$('#lbEditMovimientos').css('display','none');
				$('#idEditMovimientos').css('display', 'none');
				
			}
			
	
	}
	
	/*************************************************************************/
	/********** METODO PARA MOSTRAR TABLE EDITABLE DE FORMAS DE PAGO *********/
	/*************************************************************************/
	var editarFormasPago = function(mostrar){
				var campoFecha = "0";
				var columnas = [
						
				{title: "Forma Pago"},
				{title: "Guia"},
				{title: "Sub_Guia"},
				{title: "Referencia"},
				{title: "Concepto"},
				{title: "Importe"},
				{
					title : "<span class='add-table' style ='width: auto;cursor: pointer'><i class='fas fa-plus-circle'></i></span>",
					defaultContent : "<span class='table-remove pagoRemove' style ='cursor: pointer'><i class='fas fa-trash-alt'></i></span>",
					orderable : false
				} ];
				
				if(mostrar){
					tabla.iniciarTablaEdit("#tablaEditFormasPago", columnas, campoFecha);
					$('#lbFormasPago').css('display', 'none');
					$('#idHistFormaPago').css('display', 'none'); 
					$('#lbEditFormasPago').css('display', 'block');
					$('#idEditFormaPago').css('display', 'block');
				}else{
					
					$('#lbFormasPago').css('display', 'none');
					$('#idHistFormaPago').css('display', 'none'); 
					$('#lbEditFormasPago').css('display', 'none');
					$('#idEditFormaPago').css('display', 'none');
					
				}
				

	}
	
	/************************************************************************/
	/************* METODO PARA MOSTRAR HISTORIAL FORMAS DE PAGO *************/
	/************************************************************************/
	var tviewFormaPago = function(lstFormaPago) {

		var columnas = [
				
			{title: "Guia",       data: "guia"},
			{title: "Sub_Guia",   data: "subGuia"},
			{title: "Referencia", data: "referencia"},
			{title: "Concepto",   data: "concepto"},
			{title: "Importe",    data: "importe", render: $.fn.dataTable.render.number( ',', '.', 2, '$' )}
			];
		
		tabla.iniciarTabla("#tablaFormasPago", lstFormaPago, columnas);
		$('#lbEditFormasPago').css('display', 'none');
		$('#idEditFormaPago').css('display', 'none');
		$('#lbFormasPago').css('display', 'block');
		$('#idHistFormaPago').css('display', 'block'); 
	}
	
	/**********************************************************************/
	/*********** METODO PARA GUARDAR DATOS DE UNA LIQUIDACION *************/
	/**********************************************************************/
	var guardaLiquidacion = function(){
		
		var model = {}
		var cambioPantalla = $('#pantalla').text();
		
		/*RECORRE FORMULARIO PARA OBTENER LOS VALORES*/   
			$.each($('input, select', "#formLiquidaciones"), function (k, v) {
				if ($(this).attr("name") !== undefined) {
					model[$(this).attr("name")] = $(this).val();
				}
			});			

		$.ajax({
			
			url : "capturaLiquidacionesC/guardarLiquidacion",
			type : "POST",
			data : JSON.stringify(model),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet);
				if(dataSet.mensaje === "OK"){
					
					liquidacion = dataSet.dataExtra.idLiquidacion;
					console.log(liquidacion);
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
				
			if(cambioPantalla.includes('CAPTURA')){	
					$('#formLiquidaciones :input').not("[name='fechaCaptura'],[type='button'],[name='file']").each(function(){
				        $(this).attr('disabled','true');
				    });
					
					$('#idMovimientos').removeAttr('disabled');
					$('#idCambioLiq').removeAttr('disabled');
					$('#idAplicacion').removeAttr('disabled');
					$('#idCargaPagos').removeAttr('disabled');
					$('#idGuardar').attr('disabled','true');
					$('#sucursal').attr('disabled','true');
					$('#idCuadrar').removeAttr('disabled');
			} else if (cambioPantalla.includes('PRIMAS')){
				
				$('#formPrimasDeposito :input').not("[name='fechaCaptura'],[type='button'],[name='file']").each(function(){
			        $(this).attr('disabled','true');
			    });
				
				$('#idCargaPagos').removeAttr('disabled');
				$('#idGuardar').attr('disabled','true');
				$('#sucursal').attr('disabled','true');
				$('#idCuadrar').removeAttr('disabled');
				
				
			}
			
					
				} else {
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('[name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		})
	}
	
	/************************************************************************/
	/************* METODO PARA GUARDAR FORMAS DE PAGO ***********************/
	/************************************************************************/
	var guardaFormaPago = function(){
		
	var lstModel = []
		
		/*RECORRE DATA TABLE PARA OBTENER LOS VALORES*/   
		$('#tablaEditFormasPago tbody tr').each(function(){
			
			 var item 	       = $(this).find("td");
			 var itemFecha 	   = $(this).find("td input");
			 var itemFormaPago = $(this).find("td option:selected");
			 var model = {}

		if(item.filter(":eq(1)").attr('contenteditable') == 'true'){
			var agregar = true;
			
			if(item.filter(":eq(5)").text() == '' || item.filter(":eq(4)").text() == '' || item.filter(":eq(3)").text() == ''){
				mensajes.modalAlert('warning', 'Informacion', 'Es Necesario Caturar todos los Datos'
						+"<br>Antes de Guardar");
				agregar = false;
				return;
			}
			
			if(agregar){
				 model['idLiquidacion']     = liquidacion;
				 model['sucursal']    		= $('#sucursal').val();
				 model['numeroLiquidacion'] = $('#numeroLiquidacion').val();
				 model['consecutivo'] 		= '1';
				 model['formaPago']			= itemFormaPago.text();
				 model['guia']        		= (item.filter(":eq(1)").text());
				 model['subGuia']     		= (item.filter(":eq(2)").text());
				 model['referencia']  		= (item.filter(":eq(3)").text());
				 model['concepto']    		= (item.filter(":eq(4)").text());
				 model['importe']     		= (item.filter(":eq(5)").text());
				 
				 lstModel.push(model);
			}
		}
	});
	
		if(lstModel.push.length == 0 ){
			mensajes.modalAlert('warning','Informacion' , 'No Existen Nuevas Formas de Pagos para Guardar');
			return;
		}
		
		$.ajax({
			
			url : "capturaLiquidacionesC/pagoLiquidacion",
			type : "POST",
			data : JSON.stringify(lstModel),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					 var sumaTotal = 0;
					$('#tablaEditFormasPago tbody tr').each(function(){
						
						 var item 	       = $(this).find("td");
						 var itemFecha 	   = $(this).find("td input");
						 var itemFormaPago = $(this).find("td option:selected");
						 
					if(item.filter(":eq(1)").attr('contenteditable') == 'true'){
						
						 item.filter(":eq(1)").attr('contenteditable', 'false');
						 item.filter(":eq(2)").attr('contenteditable', 'false');
						 item.filter(":eq(3)").attr('contenteditable', 'false');
						 item.filter(":eq(4)").attr('contenteditable', 'false');
						 item.filter(":eq(5)").attr('contenteditable', 'false');
						 item.filter(":eq(6)").attr('contenteditable', 'false');
						 
						 item.filter(":eq(6)").find('.pagoRemove').remove(); 
						 item.filter(":eq(0)").find('.lstFormaPago').remove();
						 item.filter(":eq(0)").text(itemFormaPago.text());
						 $(this).find("td select").attr('disabled', 'true');
						
					}
					 sumaTotal = sumaTotal + item.filter(":eq(5)").text();
						 
				});
					$('#totalFormaPago').val(parseFloat(sumaTotal));
				}else{
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
				} 
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		})
		
	}
	
	/*******************************************************************/
	/******** GENERA NUMERO LIQUIDACION POR SUCURSAL(CONSECUTIVO) ******/
	/*******************************************************************/
	var numeroLiquidacion = function(){
		
		$.ajax({
			url : "capturaLiquidacionesC/numeroLiquidacion",
			type : "GET",
			data: { sucursal : $('#sucursal').val()},
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet);
				
				if(dataSet.mensaje === 'OK'){
					$('#numeroLiquidacion').val((dataSet.dataExtra + 1))
				}else{
					dataSet.dataExtra = 0;
					$('#numeroLiquidacion').val((dataSet.dataExtra + 1))
				} 
				$('#estatusLiquidacion').val('CAPTURADA');
			},
			statusCode: {
				404: function () {
					console.log("No Se Pudo Generar Numero de Liquidacion");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		})
	}
	
	/*****************************************************************************/
	/*********** METODO PARA GUARDAR DATOS DE MOVIMIENTO LIQUIDACION *************/
	/*****************************************************************************/
	var guardaMovimiento = function(){
		 
		var lstModel = []
		
		/*RECORRE DATA TABLE PARA OBTENER LOS VALORES*/   
		$('#editMovimiento tbody tr').each(function(){
			
			var item = $(this).find("td");
			var itemFecha = $(this).find("td input");
			var itemRamo = $(this).find("td option:selected");

			var model = {}
			
			if(item.filter(":eq(0)").attr('contenteditable') == 'true'){
				var agregar = true;
				
				if(item.filter(":eq(7)").text() == '' || item.filter(":eq(8)").text() == '' || item.filter(":eq(5)").text() == ''){
					mensajes.modalAlert('warning', 'Informacion', 'Es Necesario Capturar todos los Datos'
							+"<br>Antes de Guardar");
					agregar = false;
				  return;
				}
				
				if(agregar){
					 model['idLiquidacion'] = liquidacion;
					 model['poliza']        = (item.filter(":eq(0)").text());
					 model['ramo']          = itemRamo.val();
					 model['recibo']        = (item.filter(":eq(2)").text());
					 model['endoso']        = (item.filter(":eq(3)").text());
					 model['tipoEndoso']    = (item.filter(":eq(4)").text());
					 model['sucursal']    	= (item.filter(":eq(5)").text());
					 model['fechaPago']     = itemFecha.val();
					 model['primaTotal']    = (item.filter(":eq(7)").text());
					 model['primaNeta']     = (item.filter(":eq(8)").text());
					 model['liquidacion']   = $('#numeroLiquidacion').val();
					 
					 lstModel.push(model);
				}
			}
		 }); 
		
		if(lstModel.length == 0){
			mensajes.modalAlert('warning','Informacion' , 'No Existen Nuevos Movimientos para Guardar');
			return;
		}
		
		$.ajax({
			
			url : "capturaLiquidacionesC/movLiquidacion",
			type : "POST",
			data : JSON.stringify(lstModel),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function(dataSet){
				
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					var sumaTotal = 0;
					$('#editMovimiento tbody tr').each(function(){
						
						var item = $(this).find("td");
						var itemFecha = $(this).find("td input");
						var itemRamo = $(this).find("td option:selected");
						
						if(item.filter(":eq(0)").attr('contenteditable') == 'true'){

							 item.filter(":eq(0)").attr('contenteditable', 'false');
							 item.filter(":eq(1)").attr('contenteditable', 'false');
							 item.filter(":eq(2)").attr('contenteditable', 'false');
							 item.filter(":eq(3)").attr('contenteditable', 'false');
							 item.filter(":eq(4)").attr('contenteditable', 'false');
							 item.filter(":eq(5)").attr('contenteditable', 'false');
							 item.filter(":eq(7)").attr('contenteditable', 'false');
							 item.filter(":eq(8)").attr('contenteditable', 'false');
							 item.filter(":eq(9)").attr('contenteditable', 'false');
							 item.filter(":eq(9)").find('.movRemove').remove(); 
							
							 item.filter(":eq(1)").text(itemRamo.text());
							 
							 itemFecha.attr('disabled', 'true');
							 
							
						}
						 sumaTotal = sumaTotal + item.filter(":eq(7)").text();
					 });
					
					console.log('SUMA TOTAL MOVIMIENTOS');
					console.log(parseFloat(sumaTotal));
					
					$('#totalMovimientos').val(parseFloat(sumaTotal));
				} 
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		})
			
	}
	
	/************************************************************/
	/*********** METODO PARA BUSCAR UNA LIQUIDACION *************/
	/************************************************************/
	var buscaLiquidacion = function(){
		var sucursal 		  = $('#sucursal').val()
		var numeroLiquidacion = parseInt($('#numeroLiquidacion').val());
		var respuesta;
		
		 return ($.ajax({
			
			url         : "capturaLiquidacionesC/buscaLiquidacion",
			type        : "GET",
			data        : { sucursal : sucursal, numLiquidacion : numeroLiquidacion},
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('BUSCA LIQUIDACION')
				console.log(dataSet);				
				if(dataSet.mensaje === "OK"){

					if(dataSet.dataExtra !== null && dataSet.dataExtra !== undefined){
						liquidacion = dataSet.dataExtra.idLiquidacion;
						
						$('#tipoLiquidacion').val(dataSet.dataExtra.tipoLiquidacion);
						$('#conductoCobro').val(dataSet.dataExtra.conductoCobro);
						$('#estatusLiquidacion').val(dataSet.dataExtra.estatus);
						$('#fechaLiquidacion').val(dataSet.dataExtra.fechaCaptura);
						$('#idBuscar').attr('disabled','true');
					
						
						$('#formLiquidaciones :input').not("[type='button']").each(function(){
					        $(this).attr('disabled','true');
					    });
					
						if($('#estatusLiquidacion').val() == 'CAPTURADA'){
							$('#idCambioLiq').removeAttr('disabled');
							$('#idAplicacion').removeAttr('disabled');
							$('#idCuadrar').removeAttr('disabled');
						}
						
					}else{
						mensajes.modalAlert('warning', 'Información', 'No existe Registro de la Liquidacion: ' + $('#numeroLiquidacion').val());
					}
				} 
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		}));
	}
	
	/************************************************************/
	/*********** METODO PARA BUSCAR UNA LIQUIDACION *************/
	/************************************************************/
	var busquedaCuadrarLiquidacion = function(){
		var sucursal 		  = $('#sucursal').val()
		var numeroLiquidacion = parseInt($('#numeroLiquidacion').val());
		var respuesta;
		
		 return ($.ajax({
			
			url         : "capturaLiquidacionesC/buscaLiquidacion",
			type        : "GET",
			data        : { sucursal : sucursal, numLiquidacion : numeroLiquidacion},
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet);				
				if(dataSet.mensaje === "OK"){
					liquidacion = dataSet.dataExtra.idLiquidacion;
				} 
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		}));
	}
	
	/************************************************************/
	/******* METODO PARA ACTUALIZAR UNA LIQUIDACION *************/
	/************************************************************/
	var actualizaLiquidacion = function(){
		
		    var model = {}
				
		    /*** RECORRE FORMULARIO PARA OBTENER LOS VALORES ***/   
			$.each($('input, select', "#formLiquidaciones"), function (k, v) {
				if (($(this).attr("name") !== undefined) && 
					($(this).attr("name") !== 'editMovimiento_length' &&
					 $(this).attr("name") !== 'tablaEditFormasPago_length' &&
					 $(this).attr("name") !== 'tablaFormasPago_length' &&
					 $(this).attr("name") !== 'tableMovimientos_length' &&
					 $(this).attr("name") !== 'fecha')) {
					model[$(this).attr("name")] = $(this).val();
				}
			});
			
			model['idLiquidacion'] = parseInt(liquidacion);
			console.log("Id Liquidacion: " + liquidacion);
			console.log("ACTUALIZA LIQUIDACION");
			console.log(model);
				
				$.ajax({
					
					url       	: "capturaLiquidacionesC/actualizaLiq",
					type      	: "POST",
					data 		: JSON.stringify(model),
					dataType  	: "json",
					contentType : "application/json",
					beforeSend  : function(){
						util.loadingStart();
					},
					
					success : function(dataSet){
						
						if(dataSet.mensaje === "OK"){
							mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
						}else{
							mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
						}
					},
					statusCode: {
						404: function () {
							console.log("No Se Pudo Actualizar Liquidacion");
						}
					},
					complete: function(){
						util.loadingEnd();
					}
				});
			
	}
	
	/**********************************************************************/
	/*********** METODO PARA VALIDAR SI CUADRA UNA LIQUIDACION ************/
	/**********************************************************************/
	var validaCuadrarLiq = function(){
		
		console.log("Liquidacion para Actualizar: " + liquidacion);
		return($.ajax({
			
			url  		: "capturaLiquidacionesC/aplicarLiq",
			type 		: "GET",
			data 		: {idLiquidacion : liquidacion},
			dataType  	: "json",
			contentType : "application/json",
			
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log(dataSet.dataExtra);
				if(dataSet.dataExtra){
					$('#estatusLiquidacion').val('APLICADA');
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					
					$('#idCambioLiq').attr('disabled','true');
					$('#idCuadrar').attr('disabled','true');
					$('#idCargaPagos').attr('disabled','true');
					$('#idMovimientos').attr('disabled','true');
					
				}else{
					$('#estatusLiquidacion').val('CAPTURADA');
					mensajes.modalAlert('warning', dataSet.mensaje, dataSet.detalleMensaje);
			    }
			},
			statusCode: {
				404: function () {
					console.log("Error Al Cuadrar Liquidacion");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		}));
		
	}
	
	/******************************************************************/
	/*********** METODO MUESTRA PANTALLA PARA EDITAR MOVIMIENTOS ******/
	/******************************************************************/
	var modalEditMovimiento =  function(){
		var table   = $("#tableMovimientos").DataTable();
		var estatus = $('#estatusLiquidacion').val();
		 
		$('#tableMovimientos tBody').on('click','.btnEditMov', function(){
			estatus = $('#estatusLiquidacion').val();
			
			if(estatus == 'CAPTURADA'){
				datosMovimientos = table.row($(this).parents('tr')).data();
				
				console.log('MODAL MOVIMIENTO')
				console.log(datosMovimientos);
				
				$('#editarMovimientoModal').modal({show:true, backdrop:'static'});
				
				if(datosMovimientos.id_movimiento != null){
					idMovimiento = datosMovimientos.id_movimiento;
				}

			$.each(datosMovimientos, function(key, value){
					if(key == 'poliza'){
						$("#formEditarMovimiento *[name=" + key +"]").val(value.numeroPoliza);
					} else if(key == 'ramo'){
						$('#editarMovimientoModal #ramo').val(value.cveRamo);
					} else if(key == 'sucursal'){
						$('#editarMovimientoModal #sucursal').val(value.idSucursal);
					} else{
						$("#formEditarMovimiento *[name=" + key +"]").val(value);
					}
					
				});
				
			}else{
				mensajes.modalAlert('warning', 'Informacion', 'Liquidaciono con Estatus ' + estatus + '<br>No es Posible Modificar Movimiento');
			}
		});
		
	}
	
	/*******************************************************************/
	/*********** METODO MUESTRA PANTALLA PARA EDITAR FORMAS PAGOS ******/
	/*******************************************************************/
	var modalEditPagos =  function(){
		var table   = $("#tablaFormasPago").DataTable();
		var estatus = $('#estatusLiquidacion').val();
		
		$('#tablaFormasPago tBody').on('click','.btnEditMov', function(){

			estatus = $('#estatusLiquidacion').val();
			
			if(estatus == 'CAPTURADA'){
				datosFormaPago = table.row($(this).parents('tr')).data();
				
				$('#editarFormaPagoModal').modal({show:true, backdrop:'static'});
				
				if(datosFormaPago.idFormaPago != null){
					id_FormaPago = datosFormaPago.idFormaPago;
				}
				
				$.each(datosFormaPago, function(key, value){
					if(key == 'formaPago'){
						$('#editarFormaPagoModal #formaDePago').val(value.ct18Cve);
					}else{
						$("#formEditarFormaPago *[name=" + key +"]").val(value);
					}
				});
			}else{
				mensajes.modalAlert('warning', 'Informacion', 'Liquidaciono con Estatus ' + estatus + '<br>No es Posible Modificar Forma de Pago');
			}
		});
		
	}
	
	/********************************************************************/
	/*********** METODO MUESTRA PANTALLA PARA AGREGAR FORMAS PAGOS ******/
	/********************************************************************/
	var modalAgregaPagos =  function(){
		var estatus = $('#estatusLiquidacion').val();
		
			if(estatus == 'CAPTURADA'){
				 
				$('#editarFormaPagoModal :input').not("[name='fechaPago']").each(function(){
				        $(this).val('');
				  });
				
				 $('#editarFormaPagoModal #formaDePago').val('0');
				
				 id_FormaPago = 0;
				
				$('#editarFormaPagoModal').modal({show:true, backdrop:'static'});
				
			}else{
				mensajes.modalAlert('warning', 'Informacion', 'Liquidaciono con Estatus ' + estatus + '<br>No es Posible Modificar Forma de Pago');
			}
	}
	
	/******************************************************************/
	/*********** METODO MUESTRA PANTALLA PARA AGREGAR MOVIMIENTOS *****/
	/******************************************************************/
	var modalAgregaMovimiento =  function(){
		var estatus = $('#estatusLiquidacion').val();
		
			if(estatus == 'CAPTURADA'){
                 
				 
                 $('#editarMovimientoModal :input').not("[name='fechaPago']").each(function(){
				        $(this).val('');
				  });
                  
				 $('#editarMovimientoModal #ramo').val('0');
				 $('#editarMovimientoModal #sucursal').val('0');
				 
				 idMovimiento = 0;
				
				 $('#editarMovimientoModal').modal({show:true, backdrop:'static'});
			}else{
				mensajes.modalAlert('warning', 'Informacion', 'Liquidaciono con Estatus ' + estatus + '<br>No es Posible Agregar Movimiento');
			}
		
	}
	
	/***********************************************/
	/*** METODO PARA ACTUALIZAR MOVIMIENTO *********/
	/***********************************************/
	var actualizaMovimiento = function(){
		var datosEditMovimientos = {};
		
		/*RECORRE FORMULARIO PARA OBTENER LOS VALORES*/   
		$.each($('input, select', "#formEditarMovimiento"), function (k, v) {
			var name = $(this).attr("name");
			
			if (name !== undefined) {
				datosEditMovimientos[$(this).attr("name")] = $(this).val();
			}
		});
		
		datosEditMovimientos['id_movimiento'] = idMovimiento;
		datosEditMovimientos['idLiquidacion'] = liquidacion;
		datosEditMovimientos['liquidacion']   = $('#numeroLiquidacion').val();
		
		console.log('DATOS PARA GUARDAR MOVIMIENTO');
		console.log(datosEditMovimientos);
		return($.ajax({
			
			url  		: "capturaLiquidacionesC/actualizaMovimientos",
			type 		: "POST",
			data 		: JSON.stringify(datosEditMovimientos),
			dataType  	: "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("Error Al Actualizar Liquidación");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		}));
	}

	var actualiaDatosMovimiento = function(){
			
			$.when(actualizaMovimiento()).then(function(respuestaActualiza){
				
				if(respuestaActualiza.mensaje === "OK"){
							mensajes.modalAlert('success', 'Información', respuestaActualiza.detalleMensaje);
							muestraLiquidacion();
							$('#editarMovimientoModal').modal('hide');
				}else{
					mensajes.modalAlert('danger', respuestaActualiza.mensaje, respuestaActualiza.detalleMensaje);
					$.each(respuestaActualiza.dataExtra, function(k, v){
						var campo = $('#formEditarMovimiento [name=' + k + ']').addClass("is-invalid");
						
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
				
//				else{
//					mensajes.modalAlert('warning', 'Información', respuestaActualiza.detalleMensaje);
//				}
			});
	}
	
	/**************************************************/
	/*** METODO PARA ACTUALIZAR FORMA DE PAGO *********/
	/**************************************************/
	var actualizarFormaPago = function(){

		var datosEditFormaPago = {};
		
		$.each($('input, select', "#formEditarFormaPago"), function (k, v) {
			if ($(this).attr("name") !== undefined) {
				datosEditFormaPago[$(this).attr("name")] = $(this).val();
			}
		});
			
		datosEditFormaPago['idFormaPago']       = id_FormaPago;
		datosEditFormaPago['idLiquidacion']     = liquidacion;
		datosEditFormaPago['numeroLiquidacion'] = $('#numeroLiquidacion').val();
		
		console.log("DATOS FORMA PAGO: ");
		console.log(datosEditFormaPago);
		
		 return ($.ajax({
			
			url  		: "capturaLiquidacionesC/actualizaFormaPago",
			type 		: "POST",
			data 		: JSON.stringify(datosEditFormaPago),
			dataType  	: "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje === 'OK'){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("Error Al Actualizar Liquidación");
				}
			},
			complete: function(){
				muestraLiquidacion();
				util.loadingEnd();
			}
			
		}));
	}
	
	var actualizaDatosFormaPago = function(){
		
		$.when(actualizarFormaPago()).then(function(respuestaActualiza){
			if(respuestaActualiza.mensaje === 'OK'){
				mensajes.modalAlert('success', 'Información', respuestaActualiza.detalleMensaje);
				$('#editarFormaPagoModal').modal('hide');
			}else{
				if(respuestaActualiza.dataExtra.length === 0){
					mensajes.modalAlert('warning', 'Información', respuestaActualiza.detalleMensaje);
				}else{
					mensajes.modalAlert('danger', respuestaActualiza.mensaje, respuestaActualiza.detalleMensaje);
					$.each(respuestaActualiza.dataExtra, function(k, v){
						var campo = $('#formEditarFormaPago [name=' + k + ']').addClass("is-invalid");
						
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
				}
				
			}
		});
	}
	
	/**********************************************************/
	/***** METODO PARA VALIDAR MOVIMIENTO CON RECIBOS *********/
	/**********************************************************/
	var validaRecibos = function(fila){
		
		console.log('EVENTO PARA VALIDAR MOVIMIENTO');

		var ramo;
		var poliza;
		var endoso;
		var numRecibo;
		
		$(fila).each(function(){
			 console.log('RECORRE FILA');
			 var item 	= $(this).find("td");
			 poliza 	= (item.filter(":eq(0)").text());
			 ramo   	= $(this).find("td option:selected").text();
			 numRecibo  = parseInt((item.filter(":eq(2)").text()));
			 endoso 	= parseInt((item.filter(":eq(3)").text()));
	
        });
		console.log($(this).find("td option:selected").text());
		$.ajax({
			
			url         : "capturaLiquidacionesC/validaMovimientos",
			type        : "GET",
			data        : { poliza    : poliza, 
							ramo      : ramo,
							endoso    : endoso,
							numRecibo : numRecibo
							},
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet);				
				if(dataSet.mensaje === "OK"){
				
					console.log(dataSet.dataExtra);
					
					if(dataSet.dataExtra.estatusRecibo === 1 || dataSet.dataExtra.estatusRecibo === 2){
						mensajes.modalAlert('success', 'Información', 'Existe Recibo');
						$(fila).each(function(){
							 console.log('RECORRE FILA');
							 var item 	   = $(this).find("td");
							 item.filter(":eq(4)").text(dataSet.dataExtra.tipoEndoso);
							 item.filter(":eq(5)").text(dataSet.dataExtra.sucursalBean.ct19Descripcion);
							 item.filter(":eq(7)").text(dataSet.dataExtra.primaTotal);
							 item.filter(":eq(8)").text(dataSet.dataExtra.primaNeta);
						
				        });
						
						$('#btnGuardarEditMov').removeAttr('disabled');
					}else{
						var estatus;
						
						switch(dataSet.dataExtra.estatusRecibo){
						
							case 3: estatus = 'PAGADO';
								break;
							
							case 5: estatus = 'CANCELADO';
								break;
							
							case 9: estatus = 'REHABILITADO';
								break;
							
							default:
								break;
						}
						
						mensajes.modalAlert('warning', 'Información', 'Recibo con Estatus: ' + estatus
								+ '<br/>No es posible Registrar Movimiento');
						$('#btnGuardarEditMov').attr('disabled','true');	
					}
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					$('#btnGuardarEditMov').attr('disabled','true');
				}
			},
			statusCode: {
				404: function () {
					console.log("");
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
	
	/**********************************************************/
	/***** METODO PARA VALIDAR MOVIMIENTO CON RECIBOS *********/
	/**********************************************************/
	var validaRecibosModal = function(){
		
		console.log('EVENTO PARA VALIDAR MOVIMIENTO');

			var poliza 	= $('#poliza').val();
			var ramo   	= $('#ramo option:selected').text();
			var numRecibo  = $('#recibo').val();
			var endoso 	= parseInt($('#endoso').val());

		$.ajax({
			
			url         : "capturaLiquidacionesC/validaMovimientos",
			type        : "GET",
			data        : { poliza    : poliza, 
							ramo      : ramo,
							endoso    : endoso,
							numRecibo : numRecibo
							},
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('VALIDA MODAL MOVIMIENTO');
				console.log(dataSet);				
				if(dataSet.mensaje === "OK"){
				
					console.log(dataSet.dataExtra);
					
					if(dataSet.dataExtra.estatusRecibo === 1 || dataSet.dataExtra.estatusRecibo === 2){
						mensajes.modalAlert('success', 'Información', 'Existe Recibo');
						
						$('#editarMovimientoModal #tipoEndoso').val(dataSet.dataExtra.tipoEndoso);
						$('#editarMovimientoModal #sucursal').val(dataSet.dataExtra.sucursalBean.idSucursal);
						$('#editarMovimientoModal #primaTotal').val(dataSet.dataExtra.primaTotal);
						$('#editarMovimientoModal #primaNeta').val(dataSet.dataExtra.primaNeta);

						
					}else{
						var estatus;
						
						switch(dataSet.dataExtra.estatusRecibo){
						
							case 3: estatus = 'PAGADO';
								break;
							
							case 5: estatus = 'CANCELADO';
								break;
							
							case 9: estatus = 'REHABILITADO';
								break;
							
							default:
								break;
						}
						
						mensajes.modalAlert('warning', 'Información', 'Recibo con Estatus: ' + estatus
								+ '<br/>No es posible Registrar Movimiento');
						$('#btnGuardarEditMov').attr('disabled','true');	
					}
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					$('#btnGuardarEditMov').attr('disabled','true');
				}
			},
			statusCode: {
				404: function () {
					console.log("");
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
	
	/*************************************************/
	/***** METODO PARA CARGAR ARCHIVO PAGOS BANCO ****/
	/*************************************************/
	var cargaPagos = function(){
		
		console.log('ID LIQUIDACION')
		console.log(liquidacion)
		var formData = new FormData();
		formData.append('file', $('#fileInputPagos')[0].files[0]);
		formData.append("idLiquidacion", new Blob([JSON.stringify(liquidacion)], { type: 'application/json' }));
		formData.append("fechaEstatus", new Blob([JSON.stringify(fechaActual())], { type: 'application/json' }));
		
		$.ajax({
			
			url : "capturaLiquidacionesC/primas/manuales",
				type: "POST",
				data: formData,
				enctype: 'multipart/form-data',
				processData: false,
				contentType: false,
				cache: false,
				beforeSend: function(){
					util.loadingStart();
				},
				
				success: function (dataSet) {
					console.log('RESPUESTA CARGA PRIMAS');
					console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
						
//						$('#idMovimientos').attr('disabled','true');
						$('#estatusLiquidacion').val('APLICADA');
						
//						if(dataSet.dataExtra != null){
//							tablaPrimasDeposito(dataSet.dataExtra);
							
							$('#cargaPagos').css('dispaly','none');
							$('#lbArchivoPagos').css('display','none');
							$('#cargaPagos').css('display','none');
							
							muestraLiquidacion();
							
//						}
						
							$('#idCambioLiq').attr('disabled','true');
							$('#idCuadrar').attr('disabled','true');
							$('#idCargaPagos').attr('disabled','true');
							$('#idMovimientos').attr('disabled','true');
					}else{
						
						if(dataSet.dataExtra != null){
							tablaPrimasDeposito(dataSet.dataExtra);
							$('#cargaPagos').css('display','none');
							$('#lbArchivoPagos').css('display','none');
							$('#txtCargaPagos').css('display','none');
						}
						mensajes.modalAlert('danger', 'Información', dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("");
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
	
	/****************************************************/
	/***** METODO PARA CARGAR CATALOGO DE SUCURSALES ****/
	/****************************************************/
	var llenaSelectSucursal = function(){
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/sucursales",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('.lstSucursal').html("");
					
					$('.lstSucursal').append('<option value="0" selected disabled>Seleccione Sucursal...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.lstSucursal').append('<option value="' + v.idSucursal + '">' + v.ct19Descripcion + '</option>');
					});
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
		
	}
	
	/***********************************************/
	/***** METODO PARA CARGAR CATALOGO DE RAMOS ****/
	/***********************************************/
	var llenaCatalogoRamo = function(){
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/ramoCatalogo",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){

				if(dataSet.mensaje === "OK"){
					$('.lstRamos').html("");
					
					$('.lstRamos').append('<option value="0" selected disabled>Seleccione Ramo...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.lstRamos').append('<option value="' + v.cveRamo + '">' + v.cT8Descripcion + '</option>');
					});
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
	}
	
	/*****************************************************/
	/***** METODO PARA CARGAR CATALOGO FORMAS DE PAGO ****/
	/****************************************************S*/
	var catalogoFormasPago = function(){
	$.ajax({
				
				url         : "capturaLiquidacionesC/formaPagosCatalogo",
				type        : "GET",
				dataType    : 'json',
				contentType : 'application/json',
				beforeSend  : function(){
					util.loadingStart();
				},
				success: function(dataSet){
	
					if(dataSet.mensaje === "OK"){
						$('.lstFormaPago').html("");
						
						$('.lstFormaPago').append('<option value="0" selected disabled>Seleccione Forma Pago...</option>');
						
						$.each(dataSet.dataExtra, function(i, v) {
							$('.lstFormaPago').append('<option value="' + v.ct18Cve + '">' + v.ct18Descripcion + '</option>');
						});
						
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("");
					}
				},
				error: function (xhr, status, error) {
					var err = xhr.responseText;
					console.log(xhr);
				},
				complete: function(){
					util.loadingEnd();
				}
				
			})
	}
	
	/*********************************************************/
	/***** METODO PARA CARGAR CATALOGO DE CONDUCTOS COBRO ****/
	/*********************************************************/
	var catalogoConductosCobro = function(){
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/conductos",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log(dataSet.dataExtra);
				if(dataSet.mensaje === "OK"){
					$('.lstConductos').html("");
					
					$('.lstConductos').append('<option value="0" selected disabled>Seleccione Conducto...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.lstConductos').append('<option value="' + v.idConducto + '">' + v.descripcion + '</option>');
					});
					
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
		
	}
	
	/*********************************************************************/
	/********** METODO PARA MOSTRAR REGISTROS PRIMAS EN DEPOSITO *********/
	/*********************************************************************/
	
	var muestraPtimasTotal = function(){
		
		$.when(buscaPrimasDeposito()).then(function(listaPrimas){
			
			if(listaPrimas.mensaje === 'OK'){
				tablaPrimasDeposito(listaPrimas.dataExtra)
				listaPrimasTotales = listaPrimas.dataExtra;
				
			}else{
				mensajes.modalAlert('warning', 'Información', listaPrimas.detalleMensaje);
				listaPrimasDep = listaPrimas.dataExtra;
			}
			
		})
		
	}

	var buscaPrimasDeposito = function(){
		
		return($.ajax({
			
			url         : "capturaLiquidacionesC/buscaPrimas",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
			
		}))
		
	}
	
	var tablaPrimasDeposito = function(primasDeposito){
		
		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();
		
		var fecha = d.getFullYear()
		    + '-' + (month < 10 ? '0' : '') + month
		    + '-' + (day   < 10 ? '0' : '') + day;

		var columnas = [
					
				{title: "Cuenta",      		data:"cuentaPrima", render: function ( data, type, row ) {
											return data.toString();
			    }},
				{title: "Fecha",       		data:"fechaPagoPrima"},
				{title: "Sucursal",    		data:"sucursalPrima" },
				{title: "Descripcion", 		data:"descripcionPrima"},
				{title: "Importe",     		data:"importePrima"},
				{title: "Referencia",  		data:"referenciaPrima"},
				{title: "Concepto",    		data:"conceptoPrima"},
				{title: "Referencia Banco", data:"refBancoPrima"},
//				{title: "Archivo",          data:"nombreArchivoPrima"},

				];
			
			tabla.iniciarTablaExport("#tablePrimasDeposito", primasDeposito, columnas,'PRIMAS_DEPOSITO_' + fecha);
			$('#lbPrimasDeposito').css('display','block');
			$('#idTablePrimasDeposito').css('display','block');
	}
	
	/*********************************************************************/
	/*** METODO PARA MOSTRAR REGISTROS PRIMAS EN DEPOSITO PARA APLICAR ***/
	/*********************************************************************/
	var listaPrimasAplicar = function(){
		
		$.ajax({
			url         : "capturaLiquidacionesC/primasPendientes",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				console.log('LISTA DE PRIMAS APPLICAR')
				console.log(dataSet.dataExtra);
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					
					tablaPrimasDeposito(dataSet.dataExtra);
					
					listaPrimasDep = dataSet.dataExtra;
					
					$('#formPrimasDeposito :input').not("[name='fechaPago'],[name='fechaCaptura']," +
							"[name='numeroLiquidacion'],[name='estatusLiquidacion'],[id='btnAplicaPrimas']").each(function(){
				        $(this).removeAttr('disabled');
				  });
										
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
	}
	
	/*********************************************************************/
	/*** METODO PARA MOSTRAR REGISTROS PRIMAS EN DEPOSITO PARA APLICAR ***/
	/*********************************************************************/
	var aplicarPrimas = function(){
		
		return($.ajax({
			url         : "capturaLiquidacionesC/aplicarPrimas/" + liquidacion +"/"+ fechaActul(),
			type        : "POST",
			data 		: JSON.stringify(listaPrimasDep),
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				
				if(dataSet.mensaje === "OK"){
					mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
				}else{
					mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		}))
	}
	
	var muestraPrimasAplicadas = function(){
		 if(liquidacion !== 0){
			$.when(aplicarPrimas()).then(function(respuesta){
				muestraLiquidacion();
				$('#idTablePrimasDeposito').css('display','none')
			})
		}else{
			mensajes.modalAlert('warning', 'Información', 'Para Aplical Primas en Deposito<br>Es Necesario Crear una Liquidacion');
		}
	}
	
	/*******************************************/
	/*** METODO PARA EXPORTAR PRIMAS TOTALES ***/
	/*******************************************/
	var exportarPrimasTotales = function(listaPrimasDep){
		console.log(listaPrimasTotales)
		$.ajax({
			url         : "capturaLiquidacionesC/exportarPrimasDeposito",
			type        : "POST",
			data        : JSON.stringify(listaPrimasTotales),
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
			},
			success: function(dataSet){
				if(dataSet.mensaje === 'OK'){
						mensajes.modalAlert('succes', 'Información', dataSet.detalleMensaje)
				}else{
					mensajes.modalAlert('danger', 'Información', dataSet.detalleMensaje)
				}
				
			},
			statusCode: {
				404: function () {
					console.log("");
				}
			},
			error: function (xhr, status, error) {
				var err = xhr.responseText;
				console.log(xhr);
			},
			complete: function(){
				util.loadingEnd();
			}
		})
		
		
		
	}
	
	return {
		    muestraLiquidacion 	     : muestraLiquidacion,
			guardaLiquidacion 	     : guardaLiquidacion,
			numeroLiquidacion 	     : numeroLiquidacion,
			editarMovimientos 	     : editarMovimientos,
			guardaMovimiento  	     : guardaMovimiento,
//			editarFormasPago  	     : editarFormasPago,
//			guardaFormaPago   	     : guardaFormaPago,
			buscaLiquidacion  	     : buscaLiquidacion,
//			actualizaLiquidacion     : actualizaLiquidacion,
//			validaCuadrarLiq	 	 : validaCuadrarLiq,
//			actualiaDatosMovimiento  : actualiaDatosMovimiento,
//			actualizaDatosFormaPago  : actualizaDatosFormaPago,
//			validaRecibos            : validaRecibos,
//			validaRecibosModal		 : validaRecibosModal,
			cargaPagos				 : cargaPagos,
			llenaSelectSucursal      : llenaSelectSucursal,
			catalogoConductosCobro   : catalogoConductosCobro, 
			catalogoFormasPago       : catalogoFormasPago,
//			modalAgregaPagos         : modalAgregaPagos,
//			modalAgregaMovimiento    : modalAgregaMovimiento,
			llenaCatalogoRamo        : llenaCatalogoRamo,
			listaPrimasAplicar	     : listaPrimasAplicar,
			muestraPrimasAplicadas   : muestraPrimasAplicadas,
			muestraPtimasTotal       : muestraPtimasTotal,
			exportarPrimasTotales    : exportarPrimasTotales
		}
	
})();