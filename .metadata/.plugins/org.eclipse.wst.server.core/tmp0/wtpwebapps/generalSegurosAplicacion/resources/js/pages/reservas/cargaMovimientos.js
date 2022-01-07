
fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["xlsx"]);

$(document).ready(function () {
	var currentPage = (window.location.pathname.split('/'))[2];
	$('#btnCargaMovimientos').prop('disabled', true);
	$('#btnCargaMovimientos').click(
		function () {
			cargaMovimientosC.cargarArchivoMovimientos();
		});

	$('#fileInput').on('fileselect', function (event, numFiles, label) {
		$('#btnCargaMovimientos').prop('disabled', false);
	});

	$('#fileInput').on('fileclear', function (event) {
		$('#btnCargaMovimientos').prop('disabled', true);
	});
		
});