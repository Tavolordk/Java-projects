var polizaC = (function(){
	var liquidacion = 0
	var idReciboRehabilitado
	var lstRecibosCancelar = {}
	var idCertifica;
	
	/*** FUNCION PARA MOSTRAR FECHA ACTUAL ***/
	var fechaActual = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		
		var fecha = d.getFullYear()
		    + '-' + (month < 10 ? '0' : '') + month
		    + '-' + (day   < 10 ? '0' : '') + day;
		
		return fecha
	}
	
	/*** FUNCION PARA MOSTRAR POLIZAS A CANCELAR ***/
	var lstaPolizasCancelar = function(estRecibo, estCertif){
		
		var fechaRecibo = $('#txtFechaFin').val()
		
		if(fechaRecibo === undefined || fechaRecibo === ''){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Seleccionar una Fecha');
		}
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/busca/cancelar/polizas/"+estRecibo+"/"+estCertif+"/"+fechaRecibo,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				console.log('POLIZAS A CANCELAR')
				console.log(dataSet.dataExtra)
					
				if(dataSet.mensaje === 'OK'){
					if(dataSet.dataExtra.length > 0){
						var columnas = [
								
								{title: "Poliza",          data:"numPoliza"},
								{title: "Num_Credito",     data:"numCredito"},
								{title: "Recibo",    	   data:"numRecibo"},
								{title: "Inicio Vigencia", data:"inicioVigencia"},
								{title: "Dias_Retraso",    data:"diasRetraso"},
								{title: "Estatus", 		   data:"descEstatus"},
								{title: "Fecha Estatus",   data:"fechaEstatus"},
								];
							
							tabla.iniciarTablaExport("#tableCancPoliza", dataSet.dataExtra, columnas,'Polizas Canceladas al ' + fechaActual(),'');
							$('#lbCancPoliza').css('display','block');
							$('#idTableCancPoliza').css('display','block')
							$('#idCancelaRecibo').css('display','block')
							$('#idCancelaRecibo').removeAttr('disabled')
							lstRecibosCancelar = dataSet.dataExtra
							
						}else{
							$('#lbCancPoliza').css('display','none');
							$('#idTableCancPoliza').css('display','none');
							$('#idCancelaRecibo').css('display','none')
						}
					
				}else{
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
					$('#lbCancPoliza').css('display','none');
					$('#idTableCancPoliza').css('display','none');
					$('#idCancelaRecibo').css('display','none')
				}
				
			},
			statusCode: {
				404: function () {
					console.log("Error Al Buscar Polizas para Cancelar");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
	}
	
	/*** FUNCION PARA MOSTRAR POLIZAS A REHABILITAR ***/
	var lstaPolizasRehabilitar = function(estRecibo, estCertif, tipoRehabilita){
			var numPoliza = $('#numeroPoliza').val()
			var ramo      = $('#ramo option:selected').text()
			var idRamo    = $('#ramo option:selected').val()
			
			if(idRamo === '0'){
				return mensajes.modalAlert('warning','Informacion','Es Necesario Seleccionar Ramo')
			}
			
			if(numPoliza === ''){
				return mensajes.modalAlert('warning','Informacion','Es Necesario Capturar Numero de Poliza')
			}
			
		$.ajax({
			
			url         : "capturaLiquidacionesC/busca/rehabilita/polizas/"+estRecibo+"/"+estCertif+"/"+numPoliza+"/"+ramo,
			type   	    : "GET",
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				if(dataSet.mensaje === 'OK'){
					var columnas = []
					var btnRehabilitaRecibo = "btnRehabilitaRecibo"
						
					if(dataSet.dataExtra.length > 0){
						console.log(dataSet.dataExtra)
						if(tipoRehabilita === 1){
							columnas = [
								{title: "Poliza",          data:"numPoliza"},
								{title: "Num_Credito",     data:"numCredito"},
								{title: "Endoso",    	   data:"endoso"},
								{title: "Recibo",    	   data:"numRecibo"},
								{title: "Inicio Vigencia", data:"inicioVigencia"},
								{title: "Dias_Retraso",    data:"diasRetraso"},
								{title: "Estatus", 		   data:"descEstatus"},
								{title: "Fecha Estatus",   data:"fechaEstatus"},
								];
						}else{
							columnas = [
								{title: "Poliza",          data:"numPoliza"},
								{title: "Num_Credito",     data:"numCredito"},
								{title: "Recibo",    	   data:"numRecibo"},
								{title: "Inicio Vigencia", data:"inicioVigencia"},
								{title: "Dias_Retraso",    data:"diasRetraso"},
								{title: "Estatus", 		   data:"descEstatus"},
								{title: "Fecha Estatus",   data:"fechaEstatus"},
								
								{title : "",
								 data : null,
								 defaultContent : "<button id='idGuardar' type='button' class=' "+btnRehabilitaRecibo+" btn btn-primary'>Rehabilitar</button>",
//								 defaultContent : "<span data-toggle='collapse' class='"+btnRehabilitaRecibo+"'><i class='fas fa-edit'></i><i class='fas fa-trash-alt'></span>",
									}
								];
						}
							
							tabla.iniciarTablaExport("#tableCancPoliza", dataSet.dataExtra, columnas,'Polizas Canceladas al ' + fechaActual());
							$('#lbCancPoliza').css('display','block');
							$('#idTableCancPoliza').css('display','block');
							$('#idCancelaRecibo').css('display','block')
							lstRecibosCancelar = dataSet.dataExtra
							rehabilitarSinPago()
							
						}else{
							$('#lbCancPoliza').css('display','none');
							$('#idTableCancPoliza').css('display','none');
							$('#idCancelaRecibo').css('display','none')
						}
					
				}else{
					$('#lbCancPoliza').css('display','none');
					$('#idTableCancPoliza').css('display','none');
					$('#idCancelaRecibo').css('display','none')
					mensajes.modalAlert('warning','Informacion',dataSet.detalleMensaje);
				}
				
			},
			statusCode: {
				404: function () {
					console.log("Error Al Buscar Poliza para Rehabilitar");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		})
		
	}
	
	/*** FUNCION CANCELA RECIBOS Y MUESTRA RECIBOS CANCELADOS ***/
	var cancelarRecibos = function(){
		
		$.when(cancelacionRecibosCertificado()).then(function(lstRecibos){
			console.log('RECIBOS A CANCELAR')	
			console.log(lstRecibos)
				if(lstRecibos.dataExtra.length > 0){
					mensajes.modalAlert('success','Informacion',lstRecibos.detalleMensaje);
					recibosCancelados(lstRecibos)
					$('#idCancelaRecibo').attr('disabled','true')
				}else{
					mensajes.modalAlert('warning','Informacion',lstRecibos.detalleMensaje);
				}
				
		})
		
	}
	
	/*** FUNCION PARA CANCELAR CERTIFICADOS Y RECIBOS VENCIDOS ***/
	var cancelacionRecibosCertificado = function(){
		
		console.log('RECIBOS A CANCELAR')
		console.log(lstRecibosCancelar)
		
		var fechaRecibo = $('#txtFechaFin').val()
		
		if(fechaRecibo === undefined || fechaRecibo === ''){
			return mensajes.modalAlert('warning','Informacion','Es Necesario Seleccionar una Fecha');
		}
		
		if(lstRecibosCancelar.length === 0){
			return mensajes.modalAlert('warning','Informacion','No Existen Recibos a Cancelar');
		}
		
		
		return($.ajax({
			
			url         : "capturaLiquidacionesC/cancelar/recibos/"+ fechaRecibo,
			type   	    : "POST",
			data		: JSON.stringify(lstRecibosCancelar),
			dataType    : "json",
			contentType : "application/json",
			beforeSend  : function(){
				util.loadingStart();
			},
			success : function(dataSet){
				
			},
			
			statusCode: {
				404: function () {
					console.log("Error Al Buscar Polizas para Cancelar");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
			
		}))
		
	}

	/*** FUNCION PARA MOSTRAR RECIBOS CANCELADOS ***/
	var recibosCancelados = function(lstRecibos){
		console.log('RECIBOS CANCELADOS')
		console.log(lstRecibos.dataExtra)
		if(lstRecibos.dataExtra.length > 0){
			var columnas = [
					
					{title: "Poliza",          data:"polizaBean.numeroPoliza"},
					{title: "Num_Credito",     data:"certificadoBean.numeroCredito", defaultContent:""},
					{title: "Recibo",    	   data:"recibo"},
					{title: "Inicio Vigencia", data:"inicioVigencia"},
					{title: "Estatus", 		   data:"estatusRecibo.ct2Descripcion", defaultContent:""},
					{title: "Fecha Estatus",   data:"fechaEstatus"},
					];
				
				tabla.iniciarTablaExport("#tableCancPoliza", lstRecibos.dataExtra, columnas,'Recibos Cancelados al ' + fechaActual());
				$('#lbCancPoliza').css('display','block');
				$('#idTableCancPoliza').css('display','block');
				
			}else{
				$('#lbCancPoliza').css('display','none');
				$('#idTableCancPoliza').css('display','none');
			}
		
	}
	
	/********** METODO PARA MOSTRAR TABLE EDITABLE DE MOVIMIENTOS *********/
	var editarMovimientos = function(mostrar){
		var campoFecha = "6";
		var columnas = [
				
			{title: "Ramo", "width": "20%"},
			{title: "Poliza"},
			{title: "Num. Recibo"},
			{title: "Endoso"},
			{title: "T.Endoso"},
			{title: "Suc"},
			{title: "Fecha Pago","width": "15%"},
			{title: "Prima Total"},
			{title: "Prima"},
			{
				title : "<span class='add-table' style ='width: auto;cursor: pointer'><i class='fas fa-plus-circle'></i></span>",
				defaultContent : "<span class='movRemove' onClick='polizaC.eliminaMovimiento()' style ='cursor: pointer'><i class='fas fa-trash-alt'></i></span>",
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
	
	/********** METODO PARA MOSTRAR TABLE EDITABLE DE FORMAS DE PAGO *********/
	var editarFormasPago = function(mostrar){
			var campoFecha = "0";
			var columnas = [
				{title: "Forma Pago","width": "20%"},
				{title: "Guia","width": "20%"},
				{title: "Num Recibo","width": "20%"},
				{title: "Sub_Guia"},
				{title: "Referencia"},
				{title: "Concepto"},
				{title: "Importe"},
				{
					title : "<span class='add-table' style ='width: auto;cursor: pointer'><i class='fas fa-plus-circle'></i></span>",
					defaultContent : "<span class='pagoRemove' onClick='polizaC.eliminaFormaPago()' style ='cursor: pointer'><i class='fas fa-trash-alt'></i></span>",
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
	
	/***** METODO PARA CARGAR CATALOGO DE RAMOS ****/
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
	
	/***** METODO PARA CARGAR CATALOGO FORMAS DE PAGO ****/
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
	
	/***** METODO PARA VALIDAR MOVIMIENTO CON RECIBOS *********/
	var validaRecibos = function(fila){
		
		console.log('EVENTO PARA VALIDAR MOVIMIENTO');

		var ramo;
		var poliza;
		var endoso;
		var numRecibo;
		
		$(fila).each(function(){
			 console.log('RECORRE FILA');
			 var item 	= $(this).find("td");
			 poliza 	= (item.filter(":eq(1)").text());
			 ramo   	= $(this).find("td option:selected").text();
			 numRecibo  = parseInt((item.filter(":eq(2)").text()));
			 endoso 	= parseInt((item.filter(":eq(3)").text()));
	
        });
		
		console.log($(this).find("td option:selected").text());
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/validaReciboCancelado",
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
					console.log('RECIBO REHABILITADO')
					console.log(dataSet.dataExtra);
					
					if(dataSet.dataExtra.estatusRecibo.cveEstatus === 2){
						mensajes.modalAlert('success', 'Información', 'Existe Recibo');
						
						$(fila).each(function(){
							 console.log('RECORRE FILA');
							 var item 	   = $(this).find("td");
							 item.filter(":eq(3)").text(dataSet.dataExtra.endoso);
							 item.filter(":eq(4)").text(dataSet.dataExtra.tipoEndoso);
							 item.filter(":eq(5)").text(dataSet.dataExtra.sucursalBean.ct19Descripcion);
							 item.filter(":eq(7)").text(dataSet.dataExtra.primaTotal);
							 item.filter(":eq(8)").text(dataSet.dataExtra.primaNeta);
						
				        });
							
						idReciboRehabilitado = dataSet.dataExtra.idRecibo
						
						if(dataSet.dataExtra.certificadoBean !== null){
							idCertifica = dataSet.dataExtra.certificadoBean.idCertificado
						}else{
							idCertifica = 0
						}
						
						$('#btnGuardarEditMov').removeAttr('disabled');
						
					}else{
						var estatus;
						
						switch(dataSet.dataExtra.estatusRecibo.cveEstatus){
						
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
	
	/*********** METODO PARA GUARDAR DATOS DE MOVIMIENTO LIQUIDACION *************/
	var guardaMovimiento = function(){
		 
		var lstModel = []
		
		/*RECORRE DATA TABLE PARA OBTENER LOS VALORES*/   
		$('#editMovimiento tbody tr').each(function(){
			
			var item = $(this).find("td");
			var itemFecha = $(this).find("td input");
			var itemRamo = $(this).find("td option:selected");
			var tipoLiqu  = $('#tipoLiquidacion').val();

			var model = {}
			
			if(item.filter(":eq(1)").attr('contenteditable') == 'true'){
				var agregar = true;

				if(item.filter(":eq(7)").text() == '' || item.filter(":eq(8)").text() == '' 
					|| item.filter(":eq(5)").text() == '' || itemFecha.val() == ''){
					
					mensajes.modalAlert('warning', 'Informacion', 'Es Necesario Capturar todos los Datos'
							+"<br>Antes de Guardar");
					agregar = false;
				  return;
				}
				
				if(agregar){
					 model['idLiquidacion'] = liquidacion;
					 model['poliza']        = (item.filter(":eq(1)").text());
					 model['ramo']          = itemRamo.val();
					 model['recibo']        = (item.filter(":eq(2)").text());
					 model['endoso']        = (item.filter(":eq(3)").text());
					 model['tipoEndoso']    = (item.filter(":eq(4)").text());
					 model['sucursal']    	= (item.filter(":eq(5)").text());
					 model['fechaPago']     = itemFecha.val();
					 model['primaTotal']    = (tipoLiqu === '1' ? (item.filter(":eq(7)").text()) : Math.abs((item.filter(":eq(7)").text())));
					 model['primaNeta']     = (tipoLiqu === '1' ? (item.filter(":eq(8)").text()) : Math.abs((item.filter(":eq(8)").text())));
					 model['liquidacion']   = $('#numeroLiquidacion').val();
					 model['idRecibo']      = idReciboRehabilitado;
					 model['idCertificado'] = idCertifica;
					 
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
					var sumaTotal = 0.0;
					$('#editMovimiento tbody tr').each(function(){
						
						var item = $(this).find("td");
						var itemFecha = $(this).find("td input");
						var itemRamo = $(this).find("td option:selected");
						
						if(item.filter(":eq(1)").attr('contenteditable') == 'true'){

							 item.filter(":eq(0)").attr('contenteditable', 'false');
							 item.filter(":eq(1)").attr('contenteditable', 'false');
							 item.filter(":eq(2)").attr('contenteditable', 'false');
							 item.filter(":eq(3)").attr('contenteditable', 'false');
							 item.filter(":eq(4)").attr('contenteditable', 'false');
							 item.filter(":eq(5)").attr('contenteditable', 'false');
							 item.filter(":eq(7)").attr('contenteditable', 'false');
							 item.filter(":eq(8)").attr('contenteditable', 'false');
							 item.filter(":eq(9)").attr('contenteditable', 'false');
//							 item.filter(":eq(9)").find('.movRemove').remove(); 
							
							 item.filter(":eq(0)").text(itemRamo.text());
							
							 itemFecha.attr('disabled', 'true');
							 
							
						}
						 sumaTotal = sumaTotal + parseFloat(item.filter(":eq(7)").text());
					 });
					
					console.log('SUMA TOTAL MOVIMIENTOS');
					console.log(parseFloat(sumaTotal));
					
					$('#totalMovimientos').val(parseFloat(sumaTotal.toFixed(2)));
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
	
	/************* METODO PARA GUARDAR FORMAS DE PAGO ***********************/
	var guardaFormaPago = function(){
		
	var lstModel = []
		
		/*RECORRE DATA TABLE PARA OBTENER LOS VALORES*/   
		$('#tablaEditFormasPago tbody tr').each(function(){
			
			 var item 	       = $(this).find("td");
			 var itemFecha 	   = $(this).find("td input");
			 var itemFormaPago = $(this).find("td #formaDePago option:selected");
			 var itemBanco     = $(this).find("td #catBancos option:selected");
			 var idRecibo      = $(this).find("td #idRecibo option:selected");
			 var model = {}

		if(item.filter(":eq(3)").attr('contenteditable') == 'true'){
			var agregar = true;
			
			console.log('VALOR DE LA CELDA PRIMA NETA');
			if(item.filter(":eq(6)").text() == '' || item.filter(":eq(5)").text() == '' || item.filter(":eq(4)").text() == ''){
				mensajes.modalAlert('warning', 'Informacion', 'Es Necesario Caturar todos los Datos' +"<br>Antes de Guardar");
				agregar = false;
				return;
			}
			
			if(agregar){
				 model['idLiquidacion']     = liquidacion;
				 model['sucursal']    		= $('#sucursal').val();
				 model['numeroLiquidacion'] = $('#numeroLiquidacion').val();
				 model['consecutivo'] 		= '1';
				 model['formaPago']			= itemFormaPago.text();
				 model['guia']        		= itemBanco.val();
				 model['idRecibo']          = idRecibo.val();
				 model['subGuia']     		= (item.filter(":eq(3)").text());
				 model['referencia']  		= (item.filter(":eq(4)").text());
				 model['concepto']    		= (item.filter(":eq(5)").text());
				 model['importe']     		= (item.filter(":eq(6)").text());
				 
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
					 
					 var totalRecibo  = $('#totalMovimientos').val();
					 var diferencia   = 0;
					 var sumaTotal    = 0;
					 var mensajeDif   = '';
					
					 $('#tablaEditFormasPago tbody tr').each(function(){
						
						 var item 	       = $(this).find("td");
						 var itemFecha 	   = $(this).find("td input");
						 var itemFormaPago = $(this).find("td #formaDePago option:selected");
						 var itemBanco     = $(this).find("td #catBancos option:selected");
						 var idRecibo      = $(this).find("td #idRecibo option:selected");
						 
					if(item.filter(":eq(3)").attr('contenteditable') == 'true'){
						
						 item.filter(":eq(2)").attr('contenteditable', 'false');
						 item.filter(":eq(3)").attr('contenteditable', 'false');
						 item.filter(":eq(4)").attr('contenteditable', 'false');
						 item.filter(":eq(5)").attr('contenteditable', 'false');
						 item.filter(":eq(6)").attr('contenteditable', 'false');
						 
//						 item.filter(":eq(6)").find('.pagoRemove').remove(); 
						 item.filter(":eq(0)").find('.lstFormaPago').remove();
						 item.filter(":eq(0)").text(itemFormaPago.text());
						 
						 item.filter(":eq(1)").find('.lstBancos').remove();
						 item.filter(":eq(1)").text(itemBanco.text());
						 
						 item.filter(":eq(2)").find('.lstRecibos').remove();
						 item.filter(":eq(2)").text(idRecibo.text());
						 
						 $(this).find("td select").attr('disabled', 'true');
						
					}
					 sumaTotal = (sumaTotal) + (parseFloat(item.filter(":eq(6)").text()));
					 console.log('SUMA TOTAL RECIBO')
					 console.log(parseFloat(totalRecibo))
					 
					 console.log('SUMA TOTAL PAGOS')
					 console.log(sumaTotal)
						 
				});
					 diferencia = Math.abs(totalRecibo) - sumaTotal
					 
					 if(diferencia !== 0){
						 mensajeDif = '<br>Existe diferencia de $' + diferencia.toFixed(2) + ' Para Aplicar Liquidacion'
					 }
					 
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje + mensajeDif);
					$('#totalFormaPago').val(parseFloat(sumaTotal.toFixed(2)));
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
	
	/*********** METODO PARA VALIDAR SI CUADRA UNA LIQUIDACION ************/
	var validaCuadrarLiq = function(){
		
		return($.ajax({
			
			url  		: "capturaLiquidacionesC/aplicarLiqRehabilitar",
			type 		: "GET",
			data 		: {idLiquidacion : liquidacion, 
						   fechaEstatus: fechaActual(), 
						   idRecibo : idReciboRehabilitado
						   },
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
					
//					$('#idCambioLiq').attr('disabled','true');
					$('#idCuadrar').removeAttr('disabled');
//					$('#idCargaPagos').attr('disabled','true');
					$('#idMovimientos').removeAttr('disabled');
					
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
	
	/*********** METODO PARA GUARDAR DATOS DE UNA LIQUIDACION *************/
	var guardaLiquidacion = function(){
		
		var model = {}

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

	/***** METODO PARA CARGAR CATALOGO DE SUCURSALES ****/
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
	
	/***** METODO PARA CARGAR CATALOGO DE CONDUCTOS COBRO ****/
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
	
	/******** GENERA NUMERO LIQUIDACION POR SUCURSAL(CONSECUTIVO) ******/
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
	
	var rehabilitarSinPago = function(){
		var table        = $("#tableCancPoliza").DataTable();
		
		$('#tableCancPoliza tBody').on('click','.btnRehabilitaRecibo', function(){
			
			var datos = table.row($(this).parents('tr')).data()
			
			console.log('ENTRA A REHABILITACION DE RECIBO')
			console.log(datos)
			
			$.ajax({
				url  : "capturaLiquidacionesC/rehabilitaTemp",
				data :{		idPoliza     : datos.idPoliza,
					   		fechaEstatus : fechaActual(),
					   		idCertificado: datos.idcertificado
					   },
				type : "GET",
				dataType: 'json',
				contentType: 'application/json',
				beforeSend: function(){
					util.loadingStart();
				},
				success: function(dataSet){
					if(dataSet.mensaje == 'OK'){
						mensajes.modalAlert('success', 'Información', dataSet.detalleMensaje);
					}else{
						mensajes.modalAlert('warning', 'Información', dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("No Se Pudo Generar Rehabilitar Recibo");
					}
				},
				complete: function(){
					polizaC.lstaPolizasRehabilitar(2,2,2)
					util.loadingEnd();
				}
			})
			
		})
	}
	
	/************************************************/
	/***** METODO PARA CARGAR CATALOGO DE BANCOS ****/
	/************************************************/
	var catalogoBancos = function(){
		
		$.ajax({
			
			url         : "capturaLiquidacionesC/bancoCatalogo",
			type        : "GET",
			dataType    : 'json',
			contentType : 'application/json',
			beforeSend  : function(){
				util.loadingStart();
				
			},
			success: function(dataSet){
				console.log(dataSet.dataExtra);
				if(dataSet.mensaje === "OK"){
					$('.lstBancos').html("");
					
					$('.lstBancos').append('<option value="0" selected disabled>Seleccione Banco...</option>');
					
					$.each(dataSet.dataExtra, function(i, v) {
						$('.lstBancos').append('<option value="' + v.id + '">' + v.nombreCorto + '</option>');
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
	
	/***************************************/
	/*** METODO PARA ELIMINAR FORMA DE PAGO ***/
	/******************************************/
	var eliminaFormaPago = function(){
			
			 var formaPago
			 var importe
			 var numLiquidacion
             var table = $('#tablaEditFormasPago').DataTable();
			
			$('#tablaEditFormasPago tbody').on('click', '.pagoRemove', function() {
				
				/*** SI ESTATUS DE LA LIQUIDACION ES APLICADA NO PERMITE ELIMINAR  ***/
				var estatus = $('#estatusLiquidacion').val();
				console.log('PAGOS')
				console.log(estatus)
				
				if(estatus !== 'CAPTURADA'){
					return mensajes.modalAlert('warning', 'Informacion', 'Liquidacion con Estatus ' 
							+ estatus + '<br>No es Posible Eliminar Pago');
				}
				
				/*** RECORRE FILA SELECCIONADA PARA OBTENER LOS VALORES ***/   
				var item = $(this).parents("tr").find("td");
				
				formaPago      = (item.filter(":eq(0)").text());
				importe        = (item.filter(":eq(6)").text())
				numLiquidacion = $('#numeroLiquidacion').val();
			
				 if(item.filter(":eq(3)").attr('contenteditable') !== undefined && 
			        item.filter(":eq(3)").attr('contenteditable') === 'true'){
					 
					 /*** SOLO ELIMINA FILA SELECCIONADA DE LA VISTA ***/
					 table.row($(this).parents('tr')).remove().draw();
					 
					 if(table.data().count() > 0){
							var sumaTotal = 0.0
							$('#tablaEditFormasPago tbody tr').each(function(){

								var item = $(this).find("td");
								
								/*** REALIZA SUMA TOTAL DE MOVIMIENTOS  ***/
								 sumaTotal = sumaTotal + parseFloat(item.filter(":eq(6)").text());
							 });
							
							console.log('SUMA TOTAL PAGOS ELIMINA');
							console.log(parseFloat(sumaTotal));
							
							$('#totalFormaPago').val(parseFloat(sumaTotal.toFixed(2)));
						}else{
							 $('#totalFormaPago').val('');
						}
					 return
				 }
				 
				 /*** ELIMINA FILA SELECCIONADA ***/
					table.row($(this).parents('tr')).remove().draw(); 
				
				/*** VALIDA CATIDAD DE FILAS EN LA TABLE  ***/
				if(table.data().count() > 0){
					var sumaTotal = 0.0
					$('#tablaEditFormasPago tbody tr').each(function(){

						var item = $(this).find("td");
						
						/*** REALIZA SUMA TOTAL DE MOVIMIENTOS  ***/
						 sumaTotal = sumaTotal + parseFloat(item.filter(":eq(6)").text());
					 });
					
					$('#totalFormaPago').val(parseFloat(sumaTotal.toFixed(2)));
				}else{
					 $('#totalFormaPago').val('');
				}
			
			
				$.ajax({
					
					url         : "capturaLiquidacionesC/eliminaPagoCaptura/" + numLiquidacion +"/"+ importe +"/"+ formaPago,
					type        : "POST",
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
				
				});
			})
		}
	
	/************************************************/
	/*** METODO PARA MOSTRAR ELIMINAR MOVIMIENTOS ***/
	/************************************************/
	var eliminaMovimiento = function(){
		
		var poliza
		var ramo  
		var recibo
		var liquidacion
		var table = $('#editMovimiento').DataTable()
		
		$('#editMovimiento tbody').on('click', '.movRemove', function() {
			
			var estatus = $('#estatusLiquidacion').val();
			console.log('MOVIMIENTOS')
			console.log(estatus)
			
			/*** SI ESTATUS DE LA LIQUIDACION ES APLICADA NO PERMITE ELIMINAR  ***/
			if(estatus !== 'CAPTURADA'){
				return mensajes.modalAlert('warning', 'Informacion', 'Liquidacion con Estatus ' 
						+ estatus + '<br>No es Posible Eliminar Movimiento');
			}
			
			
			/*** RECORRE FILA SELECCIONADA PARA OBTENER LOS VALORES ***/   
				var item = $(this).parents("tr").find("td");
				
				 poliza      = (item.filter(":eq(1)").text());
				 ramo        = (item.filter(":eq(0)").text())
				 recibo      = (item.filter(":eq(2)").text());
				 liquidacion = $('#numeroLiquidacion').val();
			
				 if(item.filter(":eq(1)").attr('contenteditable') !== undefined && 
			        item.filter(":eq(1)").attr('contenteditable') === 'true'){
					 
					 /*** SOLO ELIMINA FILA SELECCIONADA DE LA VISTA ***/
					 table.row($(this).parents('tr')).remove().draw();
					 
						if(table.data().count() > 0){
							var sumaTotal = 0.0
							$('#editMovimiento tbody tr').each(function(){

								var item = $(this).find("td");
								var itemFecha = $(this).find("td input");
								
								if(item.filter(":eq(0)").attr('contenteditable') == 'true'){
									
									 if(item.filter(":eq(8)").text().length > 0){
										 $('#btnGuardarEditMov').removeAttr('disabled');
									 }
								}
								
								/*** REALIZA SUMA TOTAL DE MOVIMIENTOS  ***/
								 sumaTotal = sumaTotal + parseFloat(item.filter(":eq(7)").text());
							 });
							
							console.log('SUMA TOTAL MOVIMIENTOS ELIMINA');
							console.log(parseFloat(sumaTotal));
							
							$('#totalMovimientos').val(parseFloat(sumaTotal.toFixed(2)));
//							$('#btnGuardarEditMov').removeAttr('disabled');
						}else{
							
							 $('#btnGuardarEditMov').removeAttr('disabled');
							 $('#totalMovimientos').val('');
						}
						
					 return
				 }
				 
				 /*** ELIMINA FILA SELECCIONADA ***/
				  table.row($(this).parents('tr')).remove().draw(); 
				
				/*** VALIDA CATIDAD DE FILAS EN LA TABLE  ***/
				if(table.data().count() > 0){
					var sumaTotal = 0.0
					$('#editMovimiento tbody tr').each(function(){

						var item = $(this).find("td");
						var itemFecha = $(this).find("td input");
						
						if(item.filter(":eq(0)").attr('contenteditable') == 'true'){
							
							 if(item.filter(":eq(8)").text().length > 0){
								 $('#btnGuardarEditMov').removeAttr('disabled');
							 }
						}
						
						/*** REALIZA SUMA TOTAL DE MOVIMIENTOS  ***/
						 sumaTotal = sumaTotal + parseFloat(item.filter(":eq(7)").text());
					 });
					
					console.log('SUMA TOTAL MOVIMIENTOS ELIMINA');
					console.log(parseFloat(sumaTotal));
					
					$('#totalMovimientos').val(parseFloat(sumaTotal.toFixed(2)));
				}else{
					
					 $('#btnGuardarEditMov').removeAttr('disabled');
					 $('#totalMovimientos').val('');
				}
			
			
			$.ajax({
				
				url         : "capturaLiquidacionesC/eliminaMovCaptura/" + liquidacion +"/" + recibo +"/" + ramo +"/" + poliza ,
				type        : "POST",
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
			
			});
			
		})
		
	}
	
	/*** METODO PARA OBTENER RECIBOS POR LIQUIDACION ***/
	var listaRecibosLiq = function(){
		
	   var idLiquidacion = $('#numeroLiquidacion').val()
		$.ajax({
					
					url         : "capturaLiquidacionesC/recibosLiqu/" + idLiquidacion,
					type        : "GET",
					dataType    : 'json',
					beforeSend  : function(){
						util.loadingStart();
						
					},
					success: function(dataSet){
						console.log('RECIBOS POR LIQUIDACION')
						console.log(dataSet.dataExtra);
						if(dataSet.mensaje === "OK"){
							$('.lstRecibos').html("");
							
							$('.lstRecibos').append('<option value="0" selected disabled>Seleccione Recibo...</option>');
							
							$.each(dataSet.dataExtra, function(i, v) {
								$('.lstRecibos').append('<option value="' + v.idRecibo + '">' + v.recibo + '</option>');
							});
							
						}else{
							$('.lstRecibos').append('<option value="0" selected disabled>No Existen Recibos...</option>');
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
	
	return{
			lstaPolizasCancelar    : lstaPolizasCancelar,
			cancelarRecibos        : cancelarRecibos,
			editarMovimientos      : editarMovimientos,
			editarFormasPago       : editarFormasPago,
			catalogoFormasPago     : catalogoFormasPago,
			llenaCatalogoRamo      : llenaCatalogoRamo,
			validaRecibos          : validaRecibos,
			guardaMovimiento       : guardaMovimiento, 
			guardaFormaPago        : guardaFormaPago,
			validaCuadrarLiq       : validaCuadrarLiq,
			guardaLiquidacion      : guardaLiquidacion,
			llenaSelectSucursal    : llenaSelectSucursal,
			catalogoConductosCobro : catalogoConductosCobro,
			numeroLiquidacion      : numeroLiquidacion,
			lstaPolizasRehabilitar : lstaPolizasRehabilitar,
			catalogoBancos         : catalogoBancos,
			eliminaMovimiento      : eliminaMovimiento,
			eliminaFormaPago       : eliminaFormaPago,
			listaRecibosLiq        : listaRecibosLiq
			
 	}
	
})();