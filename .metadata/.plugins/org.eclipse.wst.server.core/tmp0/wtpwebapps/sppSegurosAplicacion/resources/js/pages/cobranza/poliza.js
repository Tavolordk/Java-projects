$(document).ready(function(){
	
	var pantalla = $('#pantalla').text()
	console.log(pantalla)
	
	if(pantalla.includes('REHABILITACIÓN')){
		ramoC.ramo(null,null)
	}

	/*** CARGA CATALOGOS DE LA PAGINA **/
	polizaC.llenaSelectSucursal();
	polizaC.catalogoConductosCobro();
	
	/*** EVENTO BUSCAR RECIBOS A CANCELAR ***/
	$('#idBuscaPolizas').click(function(){
	
		polizaC.lstaPolizasCancelar(1,16)
		
	})
	
	/*** EVENTO PARA CANCELAR RECIBOS VENCIDOS ***/
	$('#idCancelaRecibo').click(function(){
		polizaC.cancelarRecibos()
	})
	
	/*** EVENTO BUSCAR RECIBOS A CANCELAR O CANCELADOS  ***/
	$('#btnBuscaReciboCanc').click(function(){
		
	 if($('#pantalla').text().includes('CON PAGO')){
		 polizaC.lstaPolizasRehabilitar(2,2,1) 
	 }else{
		 polizaC.lstaPolizasRehabilitar(2,2,2) 
	 }
		
		$('#idLiquidacion').css('display','block')
		
	})
	
	/*** EVENTO PARA GUARDAR MOVIMIENTOS DE LIQUIDACION ***/
	$('#btnGuardarEditMov').click(function(){
		polizaC.guardaMovimiento();
	})
	
	/*** MUESTRA TABLES PARA AGREGAR MOVIMIENTO Y FORMA DE PAGO ***/ 
	 $('#idMovimientos').click(function(){
		  
		var estatus = $('#estatusLiquidacion').val()
		 
		if(estatus !== 'APLICADA'){
			polizaC.editarMovimientos(true);
            polizaC.editarFormasPago(true);
		}else{
			 mensajes.modalAlert('warning','Informacion','La Liquidacion ya esta ' + estatus);
		}	 
		  
	 })
	
	/*** EVENTO PARA GUARDAR FORMAS DE PAGO DE UNA LIQUIDACION ***/
	$('#btnGuardarEditPago').click(function(){
		polizaC.guardaFormaPago();
	})
	
	/***EVENTO PARA GUARDAR UNA LIQUIDACION NUEVA ***/
	$('#idGuardar').click(function(){
		polizaC.guardaLiquidacion();
	})
	
	/*** EVENTO PARA OBTENER NUMERO DE LIQUIDACION POR SUCURSAL ***/
	$('#sucursal').change(function(){
		polizaC.numeroLiquidacion();
	})
	
	/*** EVENTO PARA APLICAR LIQUIDACION Y REHABILITAR RECIBOS ***/
	$('#idCuadrar').click(function(){
	  var estatus = $('#estatusLiquidacion').val()
	 
	  if(estatus !== 'APLICADA'){
		 polizaC.validaCuadrarLiq(); 
	  }else{
		  mensajes.modalAlert('warning','Informacion','La Liquidacion ya esta ' + estatus);
	  }
		
	})
	
})