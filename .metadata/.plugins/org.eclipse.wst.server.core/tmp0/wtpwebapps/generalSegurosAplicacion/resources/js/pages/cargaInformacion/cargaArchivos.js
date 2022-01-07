fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["txt"]);

$(document).ready(function () {
	
	cargaArchivosC.cifrasControl()
	var currentPage = (window.location.pathname.split('/'))[2];
	//SELECT TIPO INSERCIÓN
	///////////////mensual
	//$('#datosEspecificos').prop('hidden', true);
	//$('#btnCargaArchivo').prop('disabled', true);
	$('#btnCargaArchivo').click(
		function () {
			cargaArchivosC.cargarArchivoZip('#fileInput', '#insercionM', '#fecDesde', '#fecHasta');
		});
	$('#btnCargaArchivoAnual').click(
			function () {
				cargaArchivosC.cargarArchivoZip('#fileInput2', '#insercionM2', '#fecDesde2', '#fecHasta2');
			});
	$('#btnTabla').click(
			function () {
				cargaArchivosC.cargaBulk();
				//cargaArchivosC.divideTablas($('#seleccionTabla').val());
			});
	
	$('#fileInput').on('fileselect', function (event, numFiles, label) {
		$('#datosEspecificos').prop('hidden', false);
		$('#btnCargaArchivo').prop('disabled', false);
	});

	$('#fileInput').on('fileclear', function (event) {
		$('#btnCargaArchivo').prop('disabled', true);
	});
	///////////////FIN MENSUAL	

	///////////////ANUAL
	$('#datosEspecificos2').prop('hidden', true);
	$('#btnCargaArchivo2').prop('disabled', true);
	$('#btnCargaArchivo2').click(
		function () {
			cargaArchivosC.cargarArchivoZip();
		});

	$('#fileInput2').on('fileselect', function (event, numFiles, label) {
		$('#datosEspecificos2').prop('hidden', false);
		$('#btnCargaArchivo2').prop('disabled', false);
	});

	$('#fileInput2').on('fileclear', function (event) {
		$('#btnCargaArchivo2').prop('disabled', true);
	});
	///////////////FIN ANUAL	
	////Cifras control
	$('#btnCifrasControl').click(
			function () {
				cargaArchivosC.cifrasControl();
			});
	//////
	$('#btnLista').click(function(){
		//////alert("Hello! I am an alert box!!");
		cargaArchivosC.Lista()
	})
	
	
	
	$('#btnCargaArchivoxls').click(function(){

		cargaArchivosC.cargarArchivoxls('#fileInputXLS')
	})
	
	
});