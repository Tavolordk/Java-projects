agrupadoresC.actualizarAgrupador();
fileinput.inicializarFileinputUploadOnClick(null, "#fileInput", ["xls"]);
fileinput.inicializarFileinputUploadOnClick(null, "#fileInputHabitabilidad", ["xls", "xlsx"]);
$(document).ready(function () {
	var currentPage = (window.location.pathname.split('/'))[2];
	agrupadoresC.desarrolladorChange();
	agrupadoresC.agenteChange();
	
	if(currentPage === 'archivosAgrupadores'){
		agrupadorC.comboAgrupadores(true);
		$('#claveAgrupador').change(function(){
			agrupadoresC.extraerProductoAgrupadores($(this).val());
		});
		
		$('#formArchivoAgrupador .desarrollador').focusin(function(){
			agrupadoresC.autocompletarDesarrollador("formArchivoAgrupador");
		});
		
		$('#formArchivoAgrupador .agente').focusin(function(){
			agrupadoresC.autocompletarAgente("formArchivoAgrupador");
		});
	}
	
		$('#btnCargarArchivoAgrupador').prop('disabled', true);
		$('#btnCargarArchivoAgrupador').click(
			function () {
				if ($('#claveAgrupador').val() === '0') {
					mensajes.modalAlert('danger', 'ERROR',
						"Debe seleccionar una Clave de Agrupador");
					$('#claveAgrupador').addClass("is-invalid");
					$('#claveAgrupador').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
				} else if ($('.desarrollador').val().trim() === "") {
					mensajes.modalAlert('danger', 'ERROR',
						"Debe seleccionar una Clave de Desarrollador");
					$('.desarrollador').addClass("is-invalid");
					$('.desarrollador').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
				} else if ($('.agente').val().trim() === "") {
					mensajes.modalAlert('danger', 'ERROR',
					"Debe seleccionar una Clave de Agente");
					$('.agente').addClass("is-invalid");
					$('.agente').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
				} else if ($('#claveProducto').val() === '0') {
					mensajes.modalAlert('danger', 'ERROR',
					"Debe seleccionar una Clave de Producto");
					$('#claveProducto').addClass("is-invalid");
					$('#claveProducto').parent().append('<div class="invalid-tooltip">Campo obligatorio</div>');
				} else {
					agrupadoresC.cargarArchivoAgrupador();
				}
			});

		$('#fileInput').on('fileselect', function (event, numFiles, label) {
			$('#btnCargarArchivoAgrupador').prop('disabled', false);
		});

		$('#fileInput').on('fileclear', function (event) {
			$('#btnCargarArchivoAgrupador').prop('disabled', true);
		});
		
		
		$('#btnCargarArchivoHabitabilidad').click(function(){
			agrupadoresC.cargarArchivoHabitabilidad();
		});

		$('#fileInputHabitabilidad').on('fileselect', function (event, numFiles, label) {
			$('#btnCargarArchivoHabitabilidad').prop('disabled', false);
		});

		$('#fileInputHabitabilidad').on('fileclear', function (event) {
			$('#btnCargarArchivoHabitabilidad').prop('disabled', true);
		});
});