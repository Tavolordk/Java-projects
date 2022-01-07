$(document).ready(function(){
   
   $('#idReportePagos').click(function(){
//	   reportesOperacionesC.reportesPagos();
   })
   
   $('#idReporteTraza').click(function(){
	   reportesOperacionesC.reportesTrazabilidad()
   })
   
   $('#tipoReporte').change(function(){
	   
	   if($('#tipoReporte').val() === '1'){
		   $('#lbCertificado').css('display','none')
		   $('#numeroCertificado').css('display','none')
	   }else{
		   $('#lbCertificado').css('display','block')
		   $('#numeroCertificado').css('display','block')
	   }
	   
   })
   
})

