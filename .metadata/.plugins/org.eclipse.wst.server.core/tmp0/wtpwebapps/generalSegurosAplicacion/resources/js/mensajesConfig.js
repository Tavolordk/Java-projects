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
		
		$('body').append('<div class="modal" tabindex="-1" role="dialog" id="alertModal">'+
						'  <div class="modal-dialog" role="document">'+
						'    <div class="modal-content">'+
						'      <div class="modal-header ' + headClass + '">'+
						'        <h5 class="modal-title" id="alertModalLongTitle">' + mensajeAlert + '</h5>'+
						'        <button type="button" class="close" data-dismiss="modal" aria-label="Close">'+
						'          <span aria-hidden="true">&times;</span>'+
						'        </button>'+
						'      </div>'+
						'      <div class="modal-body">'+
						'        <p>' + detalleMensajeAlert + '</p>'+
						'      </div>'+
						'      <div class="modal-footer">'+
						'        <button type="button" class="btn btn-' + typeAlert + '" data-dismiss="modal" id="okModalDialog">Ok</button>'+
						'      </div>'+
						'    </div>'+
						'  </div>'+
						'</div>');
		
		$('#alertModal').modal('show').on('hidden.bs.modal', function (e) {
			$('#alertModal').remove();
			
			util.verificarModales();
		});
		$('#okModalDialog').focus();
	}
	
	return {
		mensajeAlert : mensajeAlert,
		modalAlert : modalAlert
	}
})();