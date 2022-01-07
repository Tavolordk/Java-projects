$(document).ready(function(){
	
	$('#btnSesaInsendio').click(function(){
		//////alert("Hello! I am an alert box!!");
		sesaIncendioC.reporteAnualIncendio()
	})
	
	$("select[name=seleccionAccion]").change(function(){		
		var calcula= $('#tipoDes').val()
		if(calcula === 'CD'){			
			return mensajes.modalAlert('warning', 'Información', "Confirme que desea generar y descargar Sesa, esto puede tardar varios minutos");			
		}
      });	
});