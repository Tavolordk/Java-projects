var perfil = (function(){
	
	var $table;
	var $selecciones = [];
	var array = [];
	var $idPerfil = 0;
	
	/***OBTENER PERFILES***/
	var obtenerPerfiles = function(){
		
		$.ajax({
			url: "perfilC/obtenerPerfiles",
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					var columnas = [
						{ title: "Nombre", data: "nombrePerfil"},
						{
							data: null,
							searchable: false,
					        orderable: false,
					        className: 'dt-body-center',
					        defaultContent: "<span data-toggle='collapse' class='btnEditPerfil'><i class='glyphicon glyphicon-edit'></i></span>",
						}
					];
					
					$table = tabla.iniciarTablaPerfiles("#tablaPerfiles", dataSet.dataExtra, columnas);
					editarPerfil();
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
	
	var llenarTablaOpcionesMenu = function(mostrarPermisos){
		
		$.ajax({
			url: "perfilC/obtenerListaItems/" + $idPerfil,
			method: "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {
				if (dataSet.mensaje === 'OK') {
					
						var columnas = [
							{ title: "Menú", data : null, render : function(data, type, row){
								if(data.menusN0 == null){
									return "";
								}
								return data.menusN0.nombre;
							}},
							{ title: "Opción", data: "nombre" },
							{
								title: "<input type='checkbox' name='select_all' value='1' id='seleccion'></input>",
								data: null,
								searchable: false,
						        orderable: false,
						        width: '1%',
						        className: 'dt-body-center',
						        render: function (data){
						        	var $input = '<input type="checkbox">';
						        	if(data.acceso && mostrarPermisos){
						        		$input = '<input type="checkbox" checked>';
						        		if(!$selecciones.includes(data)){
						        			$selecciones.push(data);
						        			array.push(data.idItem);
						        		}
						        	}
						            return $input;
						        }
							}
						];
						
						$table = tabla.iniciarTablaPerfiles("#listaMenus", dataSet.dataExtra, columnas);
						$('.background-tabla').css('display', 'block');
						 //= $("#listaMenus").DataTable();
						
						//var array = [];
						/*$('#listaMenus tbody').off('click', 'tr').on('click', 'tr', function(e){
							
						      var $row = $(this).closest('tr');
						      var $check = $(this).find('input[type="checkbox"]');

						      $row.toggleClass('selected');
						      
						      // Get row data
						      var data = $table.row($row).data();
						      
						      // Get row ID
						      var rowId = data.idItem;
						      console.log("rowId", rowId);
						      // Determine whether row ID is in the list of selected row IDs
						      var index = $.inArray(rowId, array);
						      console.log("index", index);
						      if($row.hasClass('selected')){
						    	  console.log("SELECTED TRUE", $check.prop('checked'));
						    	  if(!$check.prop('checked')){
						    		  console.log("CHEKED FALSE");
						    		  $check.prop('checked', true);
						    	  }
						      } else {
						    	  console.log("SELECTED FALSE", $check.prop('checked'));
						    	  if($check.prop('checked')){
						    		  console.log("CHEKED TRUE");
						    		  $check.prop('checked', false);
						    	  }
						      }
						      
						      if($row.hasClass('selected') && index === -1){
						    	  console.log("PUSH INDEX ", index);
						    	  array.push(rowId);
						    	  $selecciones.push(data);
						       // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
						       } else if (!$row.hasClass('selected') && index !== -1){
						    	   console.log("SPLICE index", index);
						    	   array.splice(index, 1);
						    	   $selecciones.splice(index, 1);
						       }

						      // Update state of "Select all" control
						      updateDataTableSelectAllCtrl($table);

						      // Prevent click event from propagating to parent
						      e.stopPropagation();
						});*/
						
						$('#listaMenus tbody').off('click', 'input[type="checkbox"]').on('click', 'input[type="checkbox"]', function(e){
						      var $row = $(this).closest('tr');
						      // Get row data
						      var data = $table.row($row).data();
						      // Get row ID
						      var rowId = data.idItem;
						      
						      // Determine whether row ID is in the list of selected row IDs
						      var index = $.inArray(rowId, array);
						      
						      var $checked = this.checked; 
						      
						      if(this.checked && index === -1){
						    	  array.push(rowId);
						    	  $selecciones.push(data);
						       // Otherwise, if checkbox is not checked and row ID is in list of selected row IDs
						       } else if (!this.checked && index !== -1){
						    	   array.splice(index, 1);
						    	   $selecciones.splice(index, 1);
						       }
						      console.log("$selecciones -> ", $selecciones);
						      if(this.checked){
						         $row.addClass('selected');
						      } else {
						         $row.removeClass('selected');
						      }
						      
						      // Update state of "Select all" control
						      updateDataTableSelectAllCtrl($table);

						      // Prevent click event from propagating to parent
						      e.stopPropagation();
						   });
						
						   // Handle click on "Select all" control
						$('#listaMenus thead').on('click', 'input[name="select_all"]', function(e){
							  if(this.checked){
						         $('#listaMenus tbody input[type="checkbox"]:not(:checked)').trigger('click');
						      } else {
						         $('#listaMenus tbody input[type="checkbox"]:checked').trigger('click');
						      }

						      // Prevent click event from propagating to parent
						      e.stopPropagation();
						   });

						   // Handle table draw event
						$table.on('draw', function(){
						      // Update state of "Select all" control
						      updateDataTableSelectAllCtrl($table);
						   });
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
				$('#editarPerfilModal').modal({show:true, backdrop:'static'});
				$('#tablaPerfiles').css('width', '100%');
			}
		});
		
		
		function updateDataTableSelectAllCtrl(table){
			   var $table             = table.table().node();
			   var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
			   var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
			   var chkbox_select_all  = $('thead input[name="select_all"]', $table).get(0);
			   
			   // If none of the checkboxes are checked
			   if($chkbox_checked.length === 0){
			      chkbox_select_all.checked = false;
			      if('indeterminate' in chkbox_select_all){
			         chkbox_select_all.indeterminate = false;
			      }

			   // If all of the checkboxes are checked
			   } else if ($chkbox_checked.length === $chkbox_all.length){
			      chkbox_select_all.checked = true;
			      if('indeterminate' in chkbox_select_all){
			         chkbox_select_all.indeterminate = false;
			      }

			   // If some of the checkboxes are checked
			   } else {
			      chkbox_select_all.checked = true;
			      if('indeterminate' in chkbox_select_all){
			         chkbox_select_all.indeterminate = true;
			      }
			   }
			}
	};
	
		
	var guardarPerfil = function() {
		var formData = {};
		console.log("PERFIL ID GUARDAR -> ", $idPerfil);
		if($('#nombrePerfil').val().trim() == ''){
			mensajes.modalAlert('danger', "ERROR", "Es necesario especificar un nombre de Perfil");
			return;
		}
    	//iterate over form elements   
		$.each($('input, select', '#formPerfilEditar'),function(k, v){
			if ($(this).attr("name") !== undefined && $(this).attr("name") !== "select_all" && $(this).attr("name") !== "listaMenus_length") {
				formData[$(this).attr("name")] = $(this).val();
			}
	    });
		
		formData['accesos'] = $selecciones;
		formData['idPerfil'] = $idPerfil;
		
		$.ajax({
			url : "perfilC/guardarPerfil",
			method: "POST",
			data: JSON.stringify(formData),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				if(dataSet.mensaje==="OK"){
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formPerfilEditar')[0].reset();
					$('#editarPerfilModal').modal('hide');
					$("#listaMenus").DataTable().destroy();
					obtenerPerfiles();
					$idPerfil = 0;
					$selecciones = [];
					array = [];
				}
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},			
			complete: function(){
				util.loadingEnd();
			}
		});
	}
	
	var editarPerfil = function() {
		var $_table = $("#tablaPerfiles").DataTable();

		$('#tablaPerfiles tbody').on('click', '.btnEditPerfil', function(){
			var _table = $_table.row( $(this).parents('tr') ).data();
			$idPerfil = _table.idPerfil;
			$('#formPerfilEditar #nombrePerfil').val(_table.nombrePerfil);
			llenarTablaOpcionesMenu(true);
			$('.titleEditPerfil').text("Editar perfil");
		});
		
		$('#editarPerfilModal').on('hidden.bs.modal', function (e) {
			$idPerfil = 0;
			$('#formPerfilEditar')[0].reset();
			$("#listaMenus").DataTable().destroy();
			$selecciones = [];
			array = [];
		})
	}
	
	var obtenerPerfilesCombo = function(seleccionar) {
		$.ajax({
			url : "perfilC/obtenerPerfiles",
			method : "GET",
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				$('.perfil').html("");
				if (dataSet.mensaje === 'OK') {
					$('.perfil').append(
							'<option value="">Seleccione opción...</option>');
					$.each(dataSet.dataExtra, function(i, v) {
						$('.perfil').append(
								'<option value="' + v.idPerfil + '" title="' + v.nombrePerfil + '">'
										+ v.nombrePerfil + '</option>');
					});
					
					if(seleccionar !== null || seleccionar !== undefined){
						$('.perfil').val(seleccionar)
					}
				}
				
			},
			statusCode : {
				404 : function() {
					console.log("page not found");
				}
			},
			complete: function(){
				$('body').removeClass('modal-open');
				$('.modal-backdrop').remove();
				util.loadingEnd();
			}
		});
	}
	
	return{
		guardarPerfil : guardarPerfil,
		obtenerPerfiles : obtenerPerfiles,
		editarPerfil : editarPerfil,
		llenarTablaOpcionesMenu : llenarTablaOpcionesMenu,
		obtenerPerfilesCombo : obtenerPerfilesCombo
	}
})();