$(document).ready(function() {	
	$( "#ocupacion-error" ).hide();
});
$('#btnCargarGrupo').click(function(){
	jQuery.validator.messages.required = 'Esta campo es obligatorio.';
	  var validado = $("#formCapturaGruposAP").valid();
	  if(validado){
		   if($("#ocupacion").val() == 0){
			   $("#ocupacion-error").html('Esta campo es obligatorio.')
			   $( "#ocupacion-error" ).show();
		   }else{
			   gruposC.guardarGrupo();
		   }          
	  }
});
$('.input_upper').on('input', function(evt) {
  $(this).val(function(_, val) {
    return val.toUpperCase();
  });
});
$(".riesgo").keypress(function (key) {
    console.log(key.charCode)
    if ((key.charCode < 97 || key.charCode > 99))
        return false;
});

$('#btnCargarGrupoE').click(function(){
	gruposC.guardarGrupo();
});

$('#btnCargarGruposPrueba').click(function(){
	gruposC.obtenerGrupos();
});

$('#tabGrupos').click(function(){
	gruposC.obtenerGruposSolicitud();
});

$('#btnEliminarGrupoE').click(function(){
	personalesC.eliminarCensoGrupo();
});

$('#btnEliminarGrupoB').click(function(){
	gruposC.eliminarTodoGrupo();
});







