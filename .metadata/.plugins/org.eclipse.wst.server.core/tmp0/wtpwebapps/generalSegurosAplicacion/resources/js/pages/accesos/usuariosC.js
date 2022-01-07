var usuarios = (function(){
	var $idUsuario = 0;
	var $table;
	var $usuario = 0;
	var $activo = true;
	
	/***GUARDAR USUARIOS***/
	var guardarUsuario = function($formulario){
		var formData = {};
		var $perfil = {};
		var $permisosArray = [];
		
    	//iterate over form elements   
		$.each($('input, select', $formulario),function(k, v){
			if ($(this).attr("name") !== undefined && $(this).attr("name") !== "select_all" && $(this).attr("name") !== "tablaUsuarios_length") {
				
				if(!$(this).is(":checkbox")){
					formData[$(this).attr("name")] = $(this).val();
				}
				
				if($(this).is(":checkbox") && $(this).is(":checked")){
					$permisosArray.push($(this).attr("name"));
				}
			}
	    });
		
		formData['permisos'] = $permisosArray;
		
		$perfil['idPerfil'] = $('#perfil').val();
		formData['idUsuario'] = $idUsuario;
		formData['perfilModel'] = $perfil;
		
		$.ajax({
			url: "usuariosC/guardarUsuario",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$($formulario)[0].reset();
					$('#editarUsuarioModal').modal('hide');
					
					obtenerPerfilUsuarioOUsuarios();
					
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$( '#formUsuarioEditar' ).parsley();
					/*$.each( dataSet.dataExtra, function(k, v){
						var campo = "";
						campo = $($formulario + ' [name=' + k + ']').removeClass("is-invalid");
						campo = $($formulario + ' [name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
						
						if(k === 'perfil'){
							var campo1 = $($formulario + ' .perfil').removeClass("is-invalid");
							campo1 = $($formulario + ' .perfil').addClass("is-invalid");
							$(campo1).parent().append('<div class="invalid-tooltip">' + v + '</div>');
						}
					});*/
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
				$idUsuario = 0;
			}
		});
	};
	
	/***OBTENER USUARIOS***/
	var obtenerUsuarios = function(){

		$.ajax({
			url: "usuariosC/obtenerUsuarios",
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
			var $perm = dataSet.dataExtra.permisos;
				if (dataSet.mensaje === 'OK') {
					var columnas = [
						{ title: "Nombre", data: "nombreUsuario"},
						{ title: "Ap. Paterno", data: "apePaterno"},
						{ title: "Ap. Materno", data: "apeMaterno"},
						{ title: "Usuario", data: "username"},
						{ title: "Estatus", data: "activo",  width: '10%',
							render : function(data, type, row, index){
								return data === true ? 'Activo' : 'Inactivo';
							},
						},
						{ title: "Fecha alta", data: "fechaAlta", width: '10%'},
						{ title: "", orderable: false, className: 'text-center', 
							 width: '10%', data : 'activo', render: function(data, type, row, index){
								 var $tipoOperacion = '';
								 var $color = '';
								 data === true ? ($tipoOperacion = 'glyphicon-ok') : ($tipoOperacion = 'glyphicon-remove');
								 data === true ? ($color =  '#2ECC71') : ($color = '#E74C3C');
								 
								 var $botones = "<span data-toggle='collapse' class='btnEditUsuario p-1' " +
					        		"style='color: #F39C12;margin-right: 10px;'><i class='glyphicon glyphicon-edit'></i></span>" +
					        		
					        		"<span data-toggle='collapse' class='btnCancelarUsuario p-1' " +
					        		"style='margin-right: 10px;color: " + $color +"'><i class='glyphicon " + $tipoOperacion + "'></i></span>";
								 
								 //if(data === true && $perm.indexOf("recuperarContra") != -1 ){
									$botones += "<span data-toggle='collapse' class='btnResetPass p-1' " +
						        		"style='color: #D0C70C;margin-right: 10px;'><i class='glyphicon glyphicon-asterisk'></i></span>";
								 //}
							return  $botones;
							
						}},
					];
					
					tabla.iniciarTablaUsuarios("#tablaUsuarios", dataSet.dataExtra.usuariosLst, columnas);
					editarUsuarios();
					estatusUsuario('preguntar');
					obtenerUsuario();
					
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***EDITAR USUARIOS***/
	var editarUsuarios = function() {
		var $_table = $("#tablaUsuarios").DataTable();
		
		$('#tablaUsuarios tbody').on('click', '.btnEditUsuario', function(){
			var _table = $_table.row( $(this).parents('tr') ).data();
			$idUsuario = _table.idUsuario;
			$('#formUsuarioEditar #nombreUsuario').val(_table.nombreUsuario);
			$('#formUsuarioEditar #apePaterno').val(_table.apePaterno);
			$('#formUsuarioEditar #apeMaterno').val(_table.apeMaterno);
			perfil.obtenerPerfilesCombo(_table.perfilModel.idPerfil);
			//$('#formUsuarioEditar .perfil').val();
			
			$('#formUsuarioEditar #username').val(_table.username).prop('disable');
			$('#formUsuarioEditar #password').val(_table.password).prop('disable');
			
			$.each($('input:checkbox', '#formUsuarioEditar'),function(k, v){
				var $thisCheck = $(this);
				$.each(_table.permisosVista, function(k, v){
					if($thisCheck.attr("name") === v){
						$thisCheck.prop( "checked", true );
					}
				});
		    });
			
			$('.nuevoUsuario').addClass('d-none').removeClass('d-inline');
			
			$('.titleEditUsuario').text("Editar usuario");
			$('#editarUsuarioModal').modal({show:true, backdrop:'static'});
			$('#btnGuardarUsuario').attr('disabled', false);
		});
		
		$('#editarUsuarioModal').on('hidden.bs.modal', function (e) {
			$idUsuario = 0;
			$('.feed, .feedConfirm').html('');
			$('#password, #confirmarPassword').removeClass('is-valid').removeClass('is-invalid');
			util.resetInvalidTooltip();
			$('#btnGuardarUsuario').attr('disabled', true);
		})
	}
	
	/***VALIDAR PASSWORD***/
	var validarPassword = function(password){
		var regularExpression = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[?=.*@#$&!¡-]).*$/;
		
		return regularExpression.test(password);
	}
	
	/***CONFIRMAR PASSWORD***/
	var confirmarPassword = function(passwordSend, passwordCompare){
		return (passwordSend === passwordCompare);
	}
	
	/***CANCELAR USUARIO***/
	var estatusUsuario = function(confirmacion){		

		if(confirmacion === 'preguntar'){
			$('#tablaUsuarios tbody').on('click', '.btnCancelarUsuario', function(){
				$table = $("#tablaUsuarios").DataTable();
				var data = $table.row( $(this).parents('tr') ).data();
				$usuario = data.idUsuario;
				
				$('#bajaUsuarioModal').modal({show:true, backdrop:'static'});
				$('#cancelarUsuarioTitle').html(data.nombreUsuario + ' ' + data.apePaterno + ' ' + data.apeMaterno);
				
				if(data.activo === false){
					$('#bajaUsuarioModal .modal-header, #btnAceptar').addClass('bg-success, btn-success').removeClass('bg-danger, btn-danger');
					$('#bajaUsuarioModal .modal-body').html('¿Quiere continuar con la activación de usuario?');
					$activo = true;
				}else{
					$('#bajaUsuarioModal .modal-header, #btnAceptar').addClass('bg-danger, btn-danger').removeClass('bg-success, btn-success');
					$('#bajaUsuarioModal .modal-body').html('¿Quiere continuar con la cancelación de usuario?');
					$activo = false;
				}
			});
		}else if(confirmacion === 'aceptar'){
			$('#bajaUsuarioModal').modal('hide');
			$.ajax({
				url: "usuariosC/cancelarUsuario/" + $usuario + "/" + $activo,
				method: "POST",
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {
					if (dataSet.mensaje === 'OK') {
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
						$('#bajaUsuarioModal').modal('hide');
						obtenerUsuarios();
					}else{
						mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					}
				},
				statusCode: {
					404: function () {
						console.log("page not found");
					}
				},
				complete: function(){
					util.loadingEnd();
					$idUsuario = 0;
				}
			});
		}
	};
	
	
	/***OBTENER USUARIO***/
	var obtenerUsuario = function() {
		var $_table = $("#tablaUsuarios").DataTable();

		$('#tablaUsuarios tbody').on('click', '.btnResetPass', function(){
			var _table = $_table.row( $(this).parents('tr') ).data();
			$idUsuario = _table.idUsuario;
			
			$('.recuperarContraTitle').text("Recuperar contraseña");
			$('#recuperarContraModal').modal({show:true, backdrop:'static'});
		});
		
		$('#recuperarContraModal').on('hidden.bs.modal', function (e) {
			$idUsuario = 0;
			$('.feed, .feedConfirm').html('');
			$('#nuevaContra, #confirmarContra').removeClass('is-valid').removeClass('is-invalid');
			util.resetInvalidTooltip();
		})
	}
	
	var resetPass = function(){
		var $nuevaContra = $('#nuevaContra').val();
		
		if($nuevaContra.trim() === ''){
			return mensajes.modalAlert('danger', 'ERROR', 'Campo Nueva contraseña es requerido');
		}
		
		$('#confimarNuevaContra').val();
		
		$.ajax({
			url: "usuariosC/recuperarContrasenia",
			method: "POST",
			data:{
				nuevaContra : $nuevaContra,
				idUsuario : $idUsuario
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#recuperarContraModal').modal('hide');
					$('#recuperarContraForm')[0].reset();
					obtenerUsuarios();
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
				$idUsuario = 0;
			}
		});
	}
	
	/***OBTENER PERFIL DE USUARIO***/
	var obtenerPerfilUsuario = function(){
		$.ajax({
			url: "usuariosC/obtenerUsuario",
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					var $usr = dataSet.dataExtra;
					perfil.obtenerPerfilesCombo($usr.perfil.idPerfil);
					$('#formPerfilUsuario #nombreUsuario').val($usr.nombre).attr('disabled', 'disabled');
					$('#formPerfilUsuario #apePaterno').val($usr.apePaterno).attr('disabled', 'disabled');
					$('#formPerfilUsuario #apeMaterno').val($usr.apeMaterno).attr('disabled', 'disabled');
					$('#formPerfilUsuario #perfil').attr('disabled', 'disabled');
					$('#formPerfilUsuario #username').val($usr.username).attr('disabled', 'disabled');
					$idUsuario = $usr.idUsuario;
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
				}
			},
			statusCode: {
				404: function () {
					console.log("page not found");
				}
			},
			complete: function(){
				util.loadingEnd();
			}
		});
	};
	
	/***OBTENER PERFIL DE USUARIO U OBTENER USUARIOS***/
	var obtenerPerfilUsuarioOUsuarios = function(){
		var $esPantallaPerfilUsuario = $('#perfilUsuario').length;
		
		if($esPantallaPerfilUsuario > 0){
			obtenerPerfilUsuario();
		}else{
			obtenerUsuarios();
		}
	};
	
	return{
		guardarUsuario : guardarUsuario,
		obtenerUsuarios : obtenerUsuarios,
		editarUsuarios : editarUsuarios,
		validarPassword : validarPassword,
		confirmarPassword : confirmarPassword,
		estatusUsuario : estatusUsuario,
		resetPass : resetPass,
		obtenerPerfilUsuario : obtenerPerfilUsuario,
		obtenerPerfilUsuarioOUsuarios : obtenerPerfilUsuarioOUsuarios
	}
})();