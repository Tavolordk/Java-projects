fileinput.inicializarFileinputUploadOnClick(null,fileInputPagos,["xls","xlsx"]);
$(document).ready(function(){
	
	primasC.llenaSelectSucursal();
	primasC.catalogoConductosCobro();
	primasC.llenaCatalogoRamo();
	primasC.catalogoFormasPago();
	
	/*** EVENTO MUESTRA TODAS LAS PRIMAS EN DEPOSITO ***/ 
	$('#idBuscarPrimasDep').click(function(){
		primasC.muestraPtimasTotal();
	})
	
	/*** EVENTO PARA EXTRAER PRIMAS A EXCEL ***/
//	$('#idExportPrimas').click(function(){
//		primasC.exportarPrimasTotales();
//		
//	})
	
	/***EVENTO PARA GUARDAR UNA LIQUIDACION NUEVA ***/
	$('#idGuardar').click(function(){
		primasC.guardaLiquidacion();
	})
	
	/*** EVENTO PARA OBTENER NUMERO DE LIQUIDACION POR SUCURSAL ***/
	$('#sucursal').change(function(){
		primasC.numeroLiquidacion();
	})
	
	/*** EVENTO PARA CARGAR ARCHIVO DE PRIMAS MANUALES ***/ 
	$('#idCargarPagos').click(function(){
		primasC.cargaPagos();
	})
	
	
})