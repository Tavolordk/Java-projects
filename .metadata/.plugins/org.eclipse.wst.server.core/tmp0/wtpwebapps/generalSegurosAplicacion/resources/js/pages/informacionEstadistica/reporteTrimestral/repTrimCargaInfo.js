//fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["zip"]);

$(document).ready(function () {
	var currentPage = window.location.pathname;
//	var currentPage = (window.location.pathname.split('/'))[2];
	//SELECT TIPO INSERCIÓN
//	$('#datosEspecificos').prop('hidden', true);
//	$('#btnCargaArchivo').prop('disabled', true);
	console.log('Saludos desde el nuevo metodo de caga ZIP');
	$('#btnCargaArchivo').click(
		function () {
debugger;
			console.log('Saludos desde el nuevo metodo de caga ZIP');
			repTrimCargaInfoConfig.cargarArchivoZip();
		});
//
//	$('#fileInput').on('fileselect', function (event, numFiles, label) {
//		$('#datosEspecificos').prop('hidden', false);
//		$('#btnCargaArchivo').prop('disabled', false);
//	});
//
//	$('#fileInput').on('fileclear', function (event) {
//		$('#btnCargaArchivo').prop('disabled', true);
//	});
		
});