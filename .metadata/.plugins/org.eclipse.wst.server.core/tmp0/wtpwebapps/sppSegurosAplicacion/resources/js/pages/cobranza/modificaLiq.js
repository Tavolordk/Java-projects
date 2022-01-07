$(document).ready(function(){
	
	/*** VARIABLE PARA IDENTIFICAR MOVIMIENTO (0 = ALTA LIQUIDACION, 1 = BUSCA LIQUIDACION) ***/
	var cambioPantalla = $('#pantalla').text();
	modificaLiqC.llenaSelectSucursal();
	modificaLiqC.catalogoConductosCobro();
	modificaLiqC.llenaCatalogoRamo();
	modificaLiqC.catalogoFormasPago();
	modificaLiqC.catalogoBancos();
	
	$('#importe').numeric()
	/******************************************************/
	/*** CAMBIO DE PANTALLA PARA BUSCAR UNA LIQUIDACION ***/
	/******************************************************/
	
	/**** DESHABILITA BOTONES  ****/
	$('#idCambioLiq').attr('disabled','true');
	$('#idCuadrar').attr('disabled','true');
	$('#idCargaPagos').attr('disabled','true');
	$('#idMovimientos').attr('disabled','true');
	
	
	/**** LIMPIA TODOS LOS INPUTS Y SELECT EXCEPTO EL CAMPO DE LA FECHA ****/
	$('#formLiquidaciones :input').not("[name='fechaCaptura']").each(function(){
        $(this).val('');
    });
	
	if(cambioPantalla.includes('MODIFICA')){
		
		/**** MUESTRA BUTTON BUSCAR Y OCULTA BUTTON GUARDAR****/
		$('#idBuscar').css('display', 'block');
		$('#idGuardar').css('display', 'none');
		
		/**** DESHABILITA CAMPOS LIQUIDACION (TIPO LIQUIDACION, CONDUCT COBRO) ****/
		$('#tipoLiquidacion').css('disabled','true');
		$('#conductoCobro').css('disabled','true');
		
		
		/**** HABILITA CAMPOS DE LIQUIDACION (SUCURSAL, NUEMRO LIQUIDACION) ****/
		$('#numeroLiquidacion').removeAttr('disabled'); 
		$('#sucursal').removeAttr('disabled');
		
	}
	
	/*** CAMBIA A PANTALLA PARA ALTA DE LIQUIDACION ***/
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
	
	/***EVENTO PARA GUARDAR UNA LIQUIDACION NUEVA ***/
	$('#idGuardar').click(function(){
		modificaLiqC.guardaLiquidacion();
	
	})
//	
//	/******************************************************************/
//	/*** EVENTO MUESTRA TABLAS MOVIMIENTOS Y FORMA PAGO (EDITABLES) ***/
//	/******************************************************************/
//	$('#idMovimientos').click(function(){
//		
//		$('#cargaPagos').css('display','none');
//		$('#lbArchivoPagos').css('display','none');
//		$('#txtCargaPagos').css('display','none');
//		
//		modificaLiqC.editarMovimientos(true);
//		modificaLiqC.editarFormasPago(true);
//	})
//	
	/***EVENTO HABILITA CAMPOS PARA ACTUALIZAR LIQUIDACION ***/
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
	
	/*** EVENTO PARA OBTENER NUMERO DE LIQUIDACION POR SUCURSAL ***/
//	$('#sucursal').change(function(){
//		if(cambioPantalla.includes('CAPTURA') || cambioPantalla.includes('PRIMAS')){
//			modificaLiqC.numeroLiquidacion();
//		}
//	})
	
	/*** EVENTO PARA ACTUALIZAR DATOS DE LIQUIDACION ***/
	$('#idActualizaLiq').click(function(){
		modificaLiqC.actualizaLiquidacion();
	})
	
	/*** EVENTO PARA GUARDAR MOVIMIENTOS DE LIQUIDACION ***/
	$('#btnGuardarEditMov').click(function(){
		modificaLiqC.guardaMovimiento();
	})
	
	/*** EVENTO PARA GUARDAR FORMAS DE PAGO DE UNA LIQUIDACION ***/
	$('#btnGuardarEditPago').click(function(){
		modificaLiqC.guardaFormaPago();
	})

	/***************************************************/
	/*** EVENTO PARA MOSTRAR CAMPO PARA CARGAR EXCEL ***/
	/***************************************************/
//	$('#idCargaPagos').click(function(){
//		
//		$('#cargaPagos').css('display','block');
//		$('#lbArchivoPagos').css('display','block');
//		$('#txtCargaPagos').css('display','block');
//		
//		modificaLiqC.editarMovimientos(false);
//		modificaLiqC.editarFormasPago(false);
//	})
	
	/*** EVENTO PARA CARGAR EXCEL DEL PAGOS BANCO ***/
	$('#idCargarPagos').click(function(){
		modificaLiqC.cargaPagos();
	})
	
	/*=================================================================================================================*/
	/*================================== EVENTOS PARA LA PANTALLA MODIFICA LIQUIDACION ================================*/
	/*=================================================================================================================*/

	/******************************************/
	/*** EVENTO PARA BUSCAR UNA LIQUIDACION ***/
	/******************************************/
	$('#idBuscar').click(function(){
		modificaLiqC.muestraLiquidacion();
	});
	
	/*** EVENTO PARA ACTUALIZAR MOVIMIENTOS ***/
	$('#actualizarMovimientos').click(function(){
		modificaLiqC.actualiaDatosMovimiento();
	})
	
	/*** EVENTO PARA ACTUALIZAR FORMA PAGO ***/
	$('#actualizaFormaPago').click(function(){
		modificaLiqC.actualizaDatosFormaPago();
	})
	
	/*** EVENTO PARA AGREGAR MOVIMIENTOS ***/
	$('#idMovimientosEdit').click(function(){
		modificaLiqC.modalAgregaMovimiento();
	})
	
	/*** EVENTO PARA AGREGAR FORMA PAGO ***/
	$('#idFormaPagoEdit').click(function(){
		modificaLiqC.modalAgregaPagos();
	})
	
    /*============================================================================================================*/
	/*================================= EVENTOS GENERALES DE UNA LIQUIDACION =====================================*/
	/*============================================================================================================*/
	
	/*******************************************/
	/*** EVENTO PARA APLICAR UNA LIQUIDACION ***/
	/*******************************************/
	$('#idCuadrar').click(function(){
		modificaLiqC.validaCuadrarLiq();
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
		modificaLiqC.llenaSelectSucursal();
		modificaLiqC.catalogoConductosCobro();
	})
	
})