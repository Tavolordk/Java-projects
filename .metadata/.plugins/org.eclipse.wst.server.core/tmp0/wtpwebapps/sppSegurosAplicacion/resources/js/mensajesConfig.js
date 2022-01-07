var mensajes = (function(){
	
	var mensajeAlert = function(mostrarEn, tipoMensaje, mensaje){
		$(mostrarEn).html();
		$(mostrarEn).html('<div class="alert ' + tipoMensaje +' alert-dismissible">' +
					'<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>'+
					mensaje + '</div>');
	};
	
	var modalAlert = function(typeAlert, mensajeAlert, detalleMensajeAlert){
		var headClass = "alert-secondary";
		switch(typeAlert){
		case "success":
			headClass = "alert-success";
			break;
			
		case "danger":
			headClass = "alert-danger";
			break;
			
		case "warning":
			headClass = "alert-warning";
			break;
			
		}
		
		$('body').append('<div class="modal fade" id="alertModal" tabindex="-1" role="dialog" aria-labelledby="alertModalLongTitle" aria-hidden="true">' +
						'<div class="modal-dialog modal-dialog-centered" role="document">' +
						'<div class="modal-content">' +
							'<div class="modal-header ' + headClass + '">' +
								'<h5 class="modal-title" id="alertModalLongTitle">' + mensajeAlert + '</h5>' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							'</div>' +
							'<div class="modal-body">' +
									'<div class="row">' +
										'<div class="form-group col-md-12">' + detalleMensajeAlert + '</div>' +
									'</div>' +
								'<button type="button" class="btn btn-' + typeAlert + '" data-dismiss="modal" style="float:right">OK</button>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'</div>'
					);
		
		$('#alertModal').modal('show').on('hidden.bs.modal', function (e) {
			$('#alertModal').remove();
			
			util.verificarModales();
		});
	}
	
	return {
		mensajeAlert : mensajeAlert,
		modalAlert : modalAlert
	}
})();