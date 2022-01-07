$(document).ready(function(){
	perfil.obtenerPerfiles();
	
	$("#nuevoPerfilModal").click(function(){
		$('#formPerfilEditar')[0].reset();
		perfil.llenarTablaOpcionesMenu(false);
		$('.titleEditPerfil').text("Nuevo perfil");
	});
	
	$("#btnGuardarPerfil").click(function(){
		perfil.guardarPerfil();
	});
});