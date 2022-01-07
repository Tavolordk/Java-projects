//personalC.actualizarAgrupador();
fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["xls"]);
fileinput.inicializarFileinputUploadOnClick(null, "#fileInputHabitabilidad", ["xls", "xlsx"]);
$(document).ready(function () {
	var currentPage = (window.location.pathname.split('/'))[2];
	
	if(currentPage === 'censoAP'){
		productoC.extraerProducto();
		
		$('#formArchivoPersonales .desarrollador').focusin(function(){
			personalesC.autocompletarDesarrollador("formArchivoPersonales");
		});
		
	}
	
		$('#btnCargarArchivoPersonales').prop('disabled', true);
		
		$('#btnCargarArchivoPersonales').click(function () {
				if ($('#desarrollador').val() === '0') {
					mensajes.modalAlert('danger', 'ERROR',"Debe seleccionar un cliente");
					$('#desarrollador').addClass("is-invalid");
					$('#desarrollador').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
				}  else {
					personalesC.cargarArchivoAP();
				}
			});

		$('#fileInput').on('fileselect', function (event, numFiles, label) {
			$('#btnCargarArchivoPersonales').prop('disabled', false);
		});

		$('#fileInput').on('fileclear', function (event) {
			$('#btnCargarArchivoPersonales').prop('disabled', true);
		});

});

