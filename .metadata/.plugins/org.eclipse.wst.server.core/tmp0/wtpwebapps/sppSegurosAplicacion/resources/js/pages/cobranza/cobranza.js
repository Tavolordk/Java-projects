fileinput.inicializarFileinputUploadOnClick(null,fileInputPagos,["xls","xlsx"]);
$(document).ready(function(){
	
	/*** VARIABLE PARA IDENTIFICAR MOVIMIENTO (0 = ALTA LIQUIDACION, 1 = BUSCA LIQUIDACION) ***/
	var cambioPantalla = $('#pantalla').text();
	cobranzaC.llenaSelectSucursal();
	cobranzaC.catalogoConductosCobro();
	cobranzaC.llenaCatalogoRamo();
	cobranzaC.catalogoFormasPago();
	
	console.log('Pantalla Cobranza', cambioPantalla)
	
	/******************************************************/
	/*** CAMBIO DE PANTALLA PARA BUSCAR UNA LIQUIDACION ***/
	/******************************************************/
	
	/****** OCULTA ESPACIO PARA CARGAR ARCHIVO DE PAGO *****/
	$('#cargaPagos').css('dispaly','none');
	$('#lbArchivoPagos').css('display','none');
	$('#cargaPagos').css('display','none');
	
	/**** DESHABILITA BOTONES  ****/
	$('#idCambioLiq').attr('disabled','true');
//	$('#idAplicacion').attr('disabled','true');
	$('#idCuadrar').attr('disabled','true');
	$('#idCargaPagos').attr('disabled','true');
	$('#idMovimientos').attr('disabled','true');
	
	
	/**** LIMPIA TODOS LOS INPUTS Y SELECT EXCEPTO EL CAMPO DE LA FECHA ****/
	$('#formLiquidaciones :input').not("[name='fechaCaptura']").each(function(){
        $(this).val('');
    });
	
	if(cambioPantalla.includes('Modificar')){
		
		/**** MUESTRA BUTTON BUSCAR Y OCULTA BUTTON GUARDAR****/
		$('#idBuscar').css('display', 'block');
		$('#idGuardar').css('display', 'none');
		
		/**** DESHABILITA CAMPOS LIQUIDACION (TIPO LIQUIDACION, CONDUCT COBRO) ****/
		$('#tipoLiquidacion').css('disabled','true');
		$('#conductoCobro').css('disabled','true');
		
		
		/**** HABILITA CAMPOS DE LIQUIDACION (SUCURSAL, NUEMRO LIQUIDACION) ****/
		$('#numeroLiquidacion').removeAttr('disabled'); 
		$('#sucursal').removeAttr('disabled');
		
	}else{
		
		/**** OCULTA BOTONES  ****/
		$('#btnGuardarMov').css('display', 'none');
		$('#btnGuardarFormPago').css('display', 'none');
		$('#idActualizaLiq').css('display', 'none');
		$('#idBuscar').css('display', 'none');
		
		/**** OCULTA LABEL DE LAS TABLE  ****/
		$('#lbMovimientos').css('display','none')
		$('#lbFormasPago').css('display', 'none')
		$('#lbEditMovimientos').css('display','none');
		$('#lbEditFormasPago').css('display', 'none');
		
	}
	
	/**************************************************/
	/*** CAMBIA A PANTALLA PARA ALTA DE LIQUIDACION ***/
	/**************************************************/
	$('#idAltaLiq').click(function(){
		
		/**** OCULTA TABLE DATA, BUTTON BUSCAR Y BUTTON ACTUALIZAR ****/
		$('.background-tabla').css('display', 'none');
		$('#idActualizaLiq').css('display', 'none');
		$('#idBuscar').css('display', 'none');
		$('#lbMovimientos').css('display','none')
		$('#lbFormasPago').css('display', 'none')
		
		/**** DESHABILITA CAMPOS DE LA LIQUIDACION ****/
		$('#idMovimientos').attr('disabled','true');
		$('#idCambioLiq').attr('disabled','true');
		$('#idAplicacion').attr('disabled','true');
		$('#numeroLiquidacion').attr('disabled','true');
		$('#estatusLiquidacion').attr('disabled','true');
		
		/**** MUESTRA Y DESHABILITA BUTTON GUARDAR ****/
		$('#idGuardar').css('display', 'block');
		$('#idGuardar').removeAttr('disabled');
		$('#sucursal').removeAttr('disabled');
		
		
		/**** LIMPIA TODOS LOS INPUTS Y SELECT EXCEPTO EL CAMPO DE LA FECHA ****/
		$('#formLiquidaciones :input').not("[name='fechaCaptura']").each(function(){
	        $(this).val('');
	    });
		
	});
	
	/************************************************/
	/***EVENTO PARA GUARDAR UNA LIQUIDACION NUEVA ***/
	/************************************************/
	$('#idGuardar').click(function(){
		cobranzaC.guardaLiquidacion();
	
	})
	
	/******************************************************************/
	/*** EVENTO MUESTRA TABLAS MOVIMIENTOS Y FORMA PAGO (EDITABLES) ***/
	/******************************************************************/
	$('#idMovimientos').click(function(){
		
		$('#cargaPagos').css('display','none');
		$('#lbArchivoPagos').css('display','none');
		$('#txtCargaPagos').css('display','none');
		
		cobranzaC.editarMovimientos(true);
		cobranzaC.editarFormasPago(true);
	})
	
	/*********************************************************/
	/***EVENTO HABILITA CAMPOS PARA ACTUALIZAR LIQUIDACION ***/
	/*********************************************************/
	$('#idCambioLiq').click(function(){
		var estatus = $('#estatusLiquidacion').val();
		 
		/*** VALIDA EL ESTATUS DE LA LIQUIDACION ***/
		if(estatus.includes('CAPTURADA') || estatus.includes('CUADRADA')){
			
			/*** HABILITA SELECT (TIPO LIQUIDACION Y CONDUCTO COBRO) ***/
			$('#formLiquidaciones :input').not("[name='fechaCaptura'],[name='estatusLiquidacion'],[name='numeroLiquidacion'],[name='sucursal']").each(function(){
		        $(this).removeAttr('disabled');
		    });
			
			/*** OCULTA BUTTON GUARDAR Y BUSCAR, MUESTRA BUTTON ACTUALIZAR ***/
			$('#idGuardar').css('display', 'none');
			$('#idBuscar').css('display', 'none');
			$('#idActualizaLiq').css('display', 'block');
		}else{
			mensajes.modalAlert('warning', 'Información', 'No es Posible Modificar Liquidación con Estatus: ' + estatus);
			$('#idMovimientos').css('disabled','true');
		}
		
	})
	
	/**************************************************************/
	/*** EVENTO PARA OBTENER NUMERO DE LIQUIDACION POR SUCURSAL ***/
	/**************************************************************/
	$('#sucursal').change(function(){
		if(cambioPantalla.includes('Captura') || cambioPantalla.includes('Primas')){
			cobranzaC.numeroLiquidacion();
		}
	})
	
	/***************************************************/
	/*** EVENTO PARA ACTUALIZAR DATOS DE LIQUIDACION ***/
	/***************************************************/
	$('#idActualizaLiq').click(function(){
		cobranzaC.actualizaLiquidacion();
	})
	
	/******************************************************/
	/*** EVENTO PARA GUARDAR MOVIMIENTOS DE LIQUIDACION ***/
	/******************************************************/
	$('#btnGuardarEditMov').click(function(){
		cobranzaC.guardaMovimiento();
	})
	
	/*************************************************************/
	/*** EVENTO PARA GUARDAR FORMAS DE PAGO DE UNA LIQUIDACION ***/
	/*************************************************************/
	$('#btnGuardarEditPago').click(function(){
		cobranzaC.guardaFormaPago();
	})

	/***************************************************/
	/*** EVENTO PARA MOSTRAR CAMPO PARA CARGAR EXCEL ***/
	/***************************************************/
	$('#idCargaPagos').click(function(){
		
		$('#cargaPagos').css('display','block');
		$('#lbArchivoPagos').css('display','block');
		$('#txtCargaPagos').css('display','block');
		
		cobranzaC.editarMovimientos(false);
		cobranzaC.editarFormasPago(false);
	})
	
	/************************************************/
	/*** EVENTO PARA CARGAR EXCEL DEL PAGOS BANCO ***/
	/************************************************/
	$('#idCargarPagos').click(function(){
		cobranzaC.cargaPagos();
	})
	
	/*=================================================================================================================*/
	/*================================== EVENTOS PARA LA PANTALLA MODIFICA LIQUIDACION ================================*/
	/*=================================================================================================================*/

	/******************************************/
	/*** EVENTO PARA BUSCAR UNA LIQUIDACION ***/
	/******************************************/
	$('#idBuscar').click(function(){
		cobranzaC.muestraLiquidacion();
	});
	
	/*** EVENTO PARA ACTUALIZAR MOVIMIENTOS ***/
	$('#actualizarMovimientos').click(function(){
		cobranzaC.actualiaDatosMovimiento();
	})
	
	/*** EVENTO PARA ACTUALIZAR FORMA PAGO ***/
	$('#actualizaFormaPago').click(function(){
		cobranzaC.actualizaDatosFormaPago();
	})
	
	/*** EVENTO PARA AGREGAR MOVIMIENTOS ***/
	$('#idMovimientosEdit').click(function(){
		cobranzaC.modalAgregaMovimiento();
	})
	
	/*** EVENTO PARA AGREGAR FORMA PAGO ***/
	$('#idFormaPagoEdit').click(function(){
		cobranzaC.modalAgregaPagos();
	})
	
	/*============================================================================================================*/
	/*====================================== EVENTOS PARA PRIMAS EN DEPOSITO =====================================*/
	/*============================================================================================================*/
	
	$('#idBuscarPrimasDep').click(function(){
		cobranzaC.listaPrimasAplicar();
	})
	
		
	$('#btnAplicaPrimas').click(function(){
		cobranzaC.muestraPrimasAplicadas();
	})
	
	/*============================================================================================================*/
	/*================================= EVENTOS GENERALES DE UNA LIQUIDACION =====================================*/
	/*============================================================================================================*/
	
	/*******************************************/
	/*** EVENTO PARA APLICAR UNA LIQUIDACION ***/
	/*******************************************/
	$('#idCuadrar').click(function(){
		cobranzaC.validaCuadrarLiq();
	})
	
	/************************************/
	/*** EVENTO PARA LIMPIAR PANTALLA ***/
	/************************************/
	$('#idLimpiar').click(function(){
		
		/**** LIMPIA TODOS LOS INPUTS Y SELECT EXCEPTO EL CAMPO DE LA FECHA ****/
	    $('#formLiquidaciones :input').not("[name='fechaCaptura']").each(function(){
	        $(this).val('');
	    });
		
		$('#lbFormasPago').css('display', 'none');
		$('#idHistFormaPago').css('display', 'none'); 
		$('#lbEditFormasPago').css('display', 'none');
		$('#idEditFormaPago').css('display', 'none');
		
		$('#lbFormasPago').css('display', 'none');
		$('#idHistFormaPago').css('display', 'none'); 
		$('#lbEditMovimientos').css('display','none');
		$('#idEditMovimientos').css('display', 'none');
		
		$('#cargaPagos').css('display','none')
		cobranzaC.llenaSelectSucursal();
		cobranzaC.catalogoConductosCobro();
	})
	
	
	
})