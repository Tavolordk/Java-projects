$(document).ready(function(){
	$('#btnCargaArchivo').click(function () {
		facSaludC.cargaInflacion('#fileInput');
	});  
	
	$('#desPhiM').click(function() {
		facSaludC.descargaPhiM();
	}); 
	
	 $('#obtTriSalFac').click(function(){
		facSaludC.obtenerTriangulosSaludFac();
	 }); 
	 
	 $('#btnExcelInflacion').click(function(){
		facSaludC.generarExcelInflacion();
	 });
 
})