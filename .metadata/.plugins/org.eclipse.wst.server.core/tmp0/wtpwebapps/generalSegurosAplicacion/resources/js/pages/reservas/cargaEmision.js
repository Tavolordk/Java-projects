
fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["xlsx"]);

$(document).ready(function () {
	var currentPage = (window.location.pathname.split('/'))[2];
	$('#btnCargaArchivoEmision').prop('disabled', true);
	$('#btnCargaArchivoEmision').click(
		function () {
			cargaEmisionC.cargarArchivoEmision();
		});

	$('#fileInput').on('fileselect', function (event, numFiles, label) {
		$('#btnCargaArchivoEmision').prop('disabled', false);
	});

	$('#fileInput').on('fileclear', function (event) {
		$('#btnCargaArchivoEmision').prop('disabled', true);
	});
		
});