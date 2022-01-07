$(document).ready(function(){

	var tipoReporte = $('#reporte').val()
	ramoC.ramo(null,null)
	
	$('#btnReporteOperaciones').click(function(){
		
		if(tipoReporte === '1'){
			
			reportesOperacionesC.reporteRelevanteOperaciones(tipoReporte)
			
		}else if(tipoReporte === '2'){
			
			var numReporte = $.trim($('#numeroPoliza').val())
			var ramo = $.trim($('#ramo').val())
			var razon = $.trim($('#razon').val())
			var descOperacion = $.trim($('#descOperacion').val())
			reportesOperacionesC.reporteOperacionesInusuales(tipoReporte,numReporte,razon, ramo, descOperacion);
		}
	})
	
	/*** METODO PARA MOSTRAR COMPONENTES DEPENDIENDO EL REPORTE A GENERAR ***/
	$('#reporte').change(function(){
		tipoReporte = $('#reporte').val()
		
		if(tipoReporte === '2'){
			
			$('#btnReporteOperaciones').attr('disabled','true')
			$('#idTablerOperaciones').css('display', 'none');
	 		$('#lbReporteOperaiones').css('display', 'none');
	 		$('#tableReporteOperaciones').css('display', 'none'); 
	 		
			$('#divRamo').css('display','block')
			$('#divCliente').css('display','block')
			$('#divRazon').css('display','block')
			$('#divPoliza').css('display','block')
			$('#divDescOperacion').css('display','block')
		}else{
			
			$('#btnReporteOperaciones').attr('disabled','true')
			$('#idTablerOperaciones').css('display', 'none');
	 		$('#lbReporteOperaiones').css('display', 'none');
	 		$('#tableReporteOperaciones').css('display', 'none'); 
	 		
			$('#divRamo').css('display','none')
			$('#divCliente').css('display','none')
			$('#divRazon').css('display','none')
			$('#divPoliza').css('display','none')
			$('#divDescOperacion').css('display','none')
			
			$('#numeroPoliza').val('')
			$('#razon').val('')
			$('#cliente').val('')
			$('.ramo').html("");
			ramoC.ramo(null,null);
		}
	})
	
  /*** METODO PARA MOSTRAR COMPONENTES DEPENDIENDO EL REPORTE A GENERAR ***/
   $('#btnBuscaPoliza').click(function(){
//	   reportesOperacionesC.busquedaPoliza()
   })
   
   /*** METODO PARA GENERAR LOS DIFERENTRES REPORTES DE CFDI ***/
   $('#btnReporteCFDI').click(function(){
	   reportesOperacionesC.reporteCFDI();
   })
   
   /*** DETECTA INFORACION PARA REPORTES ***/
   $('#btnBuscaOperaciones').click(function(){
	   tipoReporte = $('#reporte').val()
		
		if(tipoReporte === '1'){
			reportesOperacionesC.muestraOpRelevantes()
		}else if(tipoReporte === '2'){
			reportesOperacionesC.muestraOpInusuales()
			
		}
   })
})

