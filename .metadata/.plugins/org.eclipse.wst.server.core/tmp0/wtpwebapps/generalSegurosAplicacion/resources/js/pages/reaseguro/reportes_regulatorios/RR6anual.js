$(document).ready(function(){	
	$("#anyo").datepicker({
		autoclose: true,
	    format: "yyyy",
	    viewMode: "years", 
	    minViewMode: "years",
	    startDate: '1950',
	    endDate: new Date()
	});
	
	$('#btnGenerar').click(
			function () {
				RR6anualC.validaciones();
			});
	
	$('#btnPrueba').click(
			function () {
				RR6anualC.prueba();
			});
});