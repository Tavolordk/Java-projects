$(document).ready(function(){
	
	reportesSesaAnualC.catalogoAnios();
	reportesSesaAnualC.catalogoRamos();
	
	$('#generarReporte').click(function(){
		
		reportesSesaAnualC.reporteAnual()
		
	})
	
	$('#generarReporteSalud').click(function(){
		
		reportesSesaAnualC.reporteAnualSalud()
		
	})
	
	
	/*$('#btnSesaInsendio').click(function(){
		
		reportesSesaAnualC.reporteAnualIncendio()
		alert("Hello! I am an alert box!!");
	})
	*/
});