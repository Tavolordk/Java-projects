$(document).ready(function(){
	usuarios.obtenerUsuarios();
	
	var correctPass = false;
	
	$("#nuevoUsuarioModal").click(function(){
		$('.titleEditUsuario').text("Nuevo usuario");
		$('#editarUsuarioModal').modal({show:true, backdrop:'static'});
		$('#formUsuarioEditar')[0].reset();
		$('.nuevoUsuario').addClass('d-inline');
		perfil.obtenerPerfilesCombo();
	});
	
	$('#btnGuardarUsuario').click(function(){
		usuarios.guardarUsuario();
		correctPass = false;
		$('.feed').html('');
		$('#password').removeClass('is-valid').removeClass('is-invalid');
	});
	
	$('#formUsuarioEditar #password').keyup(function(){
		var pass = $('#password').val();
		var passCompare = $('#confirmarPassword').val();
		$('.feed').html('').removeClass('valid-feedback, invalid-feedback');
		$('#password').removeClass('is-valid, is-invalid')
		
		if(pass.trim() !== ''){
			
			correctPass = usuarios.validarPassword(pass);
			
			if(correctPass){
				$('.feed').addClass('valid-feedback');
				$('#password').addClass('is-valid');
				$('.feed').append('Contraseña válida');
			}else{
				$('.feed').addClass('invalid-feedback');
				$('#password').addClass('is-invalid');
				$('.feed').append('Contraseña no válida');
			}
			
			if(usuarios.confirmarPassword(pass, passCompare)){
				$('#btnGuardarUsuario').attr('disabled', false);
			}else{
				$('#btnGuardarUsuario').attr('disabled', true);
			}
		}else{
			$('#confirmarPassword').val('');
		}
	});
	
	$('#formUsuarioEditar #confirmarPassword').keyup(function(){
		var pass = $('#confirmarPassword').val();
		var passCompare = $('#password').val();
		$('.feedConfirm').html('').removeClass('valid-feedback, invalid-feedback');
		$('#confirmarPassword').removeClass('is-valid').removeClass('is-invalid');
		
		if(pass.trim() !== ''){
			usuarios.confirmarPassword(pass, passCompare);
			
			if(usuarios.confirmarPassword(pass, passCompare) && correctPass){
				$('#btnGuardarUsuario').attr('disabled', false);
				$('.feedConfirm').addClass('valid-feedback');
				$('#confirmarPassword').addClass('is-valid');
				$('.feedConfirm').append('Contraseña correcta');
			}else{
				$('#btnGuardarUsuario').attr('disabled', true);
				$('.feedConfirm').addClass('invalid-feedback');
				$('#confirmarPassword').addClass('is-invalid');
				$('.feedConfirm').append('Contraseña no coincide');
			}
		}
	});
	
	$('#btnAceptar').click(function(){
		usuarios.estatusUsuario('aceptar');
	});
	
	$('#password, #nuevaContra').popover({
		  trigger: 'focus',
		  content: 'Minimo 8 carácteres, al menos:' + 
			  '<ul> <li> 1 número </li>' + 
			  '<li>1 letra mayúscula</li>' +
			  '<li>1 carácter especial </br>(<b>? = . * @ # $ & ! ¡ -</b>)',
		  placement: 'bottom',
		  html: true,
		  template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header">sdadads</h3><div class="popover-body"></div></div>'
		})
		
	$('#btnRecuperarContra').click(function(){
		usuarios.resetPass();
		correctPass = false;
		$('.feed').html('');
		$('#nuevaContra').removeClass('is-valid').removeClass('is-invalid');
	});
	
	$('#nuevaContra').keyup(function(){
		var pass = $('#nuevaContra').val();
		var passCompare = $('#confirmarContra').val();
		$('.feed').html('').removeClass('valid-feedback, invalid-feedback');
		$('#nuevaContra').removeClass('is-valid, is-invalid')
		
		if(pass.trim() !== ''){
			
			correctPass = usuarios.validarPassword(pass);
			
			if(correctPass){
				$('.feed').addClass('valid-feedback');
				$('#nuevaContra').addClass('is-valid');
				$('.feed').append('Contraseña válida');
			}else{
				$('.feed').addClass('invalid-feedback');
				$('#nuevaContra').addClass('is-invalid');
				$('.feed').append('Contraseña no válida');
			}
			
			if(usuarios.confirmarPassword(pass, passCompare)){
				$('#btnRecuperarContra').attr('disabled', false);
			}else{
				$('#btnRecuperarContra').attr('disabled', true);
			}
		}else{
			$('#confirmarContra').val('');
		}
	});
	
	$('#confirmarContra').keyup(function(){
		var pass = $('#confirmarContra').val();
		var passCompare = $('#nuevaContra').val();
		$('.feedConfirm').html('').removeClass('valid-feedback, invalid-feedback');
		$('#confirmarContra').removeClass('is-valid').removeClass('is-invalid');
		
		if(pass.trim() !== ''){
			usuarios.confirmarPassword(pass, passCompare);
			
			if(usuarios.confirmarPassword(pass, passCompare) && correctPass){
				$('#btnRecuperarContra').attr('disabled', false);
				$('.feedConfirm').addClass('valid-feedback');
				$('#confirmarContra').addClass('is-valid');
				$('.feedConfirm').append('Contraseña correcta');
			}else{
				$('#btnRecuperarContra').attr('disabled', true);
				$('.feedConfirm').addClass('invalid-feedback');
				$('#confirmarContra').addClass('is-invalid');
				$('.feedConfirm').append('Contraseña no coincide');
			}
		}
	});
});