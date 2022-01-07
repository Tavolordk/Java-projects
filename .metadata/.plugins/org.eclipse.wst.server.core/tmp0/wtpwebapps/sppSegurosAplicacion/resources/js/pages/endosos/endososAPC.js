var endososAP = (function() {
	var $asegurado;
	var $table;
	var $this;
	var $beneficiarios = [];
	var $tablaBeneficiario;
	var $numeroPoliza;
	
	/***BUSCAR ASEGURADOS***/
	var buscarAseguradosAP = function(tipoEndoso){
		$numeroPoliza = $('#numeroPoliza').val();
		var $grupo = $('#grupo').val();
		var $icono;
		var $claseAccion;
		var $title;
		var $iconColor;

		if(tipoEndoso === "B"){
			$icono = "fa-edit";
			$claseAccion = "editarBeneficiario";
			$title = "Editar beneficiarios";
		}else if(tipoEndoso === "D"){
			$icono = "fa-ban";
			$claseAccion = "cancelarAseguradoAP";
			$title = "Cancelar asegruado";
			$iconColor = "tomato"
		}
		
		$.ajax({
			url : "endososC/obtenerAseguradosAP",
			method : "GET",
			data:{
				numeroPoliza : $numeroPoliza,
				grupo : $grupo
			},
			beforeSend: function(){
				util.loadingStart();
			},
			success : function(dataSet) {
				var columnas = [
						{
							title : "Nombre",
							data : "nombreAsegurado"
						},
						{
							title : "Apellido Paterno",
							data : "apellidoPaternoAsegurado"
						},
						{
							title : "Apellido Materno",
							data : "apellidoMaternoAsegurado"
						},
						{
							title : "",
							data : null,
							defaultContent : "<span data-toggle='collapse' title='" + $title + "'><i class='fas " + $icono + " " + $claseAccion + "' style='color:" + $iconColor + "'></i></span>",
							orderable : false
						}
						];
				console.log(dataSet);
				if (dataSet.mensaje === "OK") {
					tabla.iniciarTabla("#tablaAseguradosAP", dataSet.dataExtra, columnas);
					$('.background-tabla').css('display', 'block');
					if(tipoEndoso === 'D'){
						bajaAseguradoAP('preguntar');
					}else{
						infoBeneficiarios();
					}
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$('.background-tabla').css('display', 'none');
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
	};
	
	/** *BAJA DE ASEGURADO AP** */
	var bajaAseguradoAP = function(confirmacion) {
		if(confirmacion === 'preguntar'){
			$('#tablaAseguradosAP tbody').on('click', '.cancelarAseguradoAP', function(){
				$table = $("#tablaAseguradosAP").DataTable();
				var data = $table.row( $(this).parents('tr') ).data();
				$this = $(this);
				$asegurado = data;
				$('#bajaAseguradoModal').modal({show:true, backdrop:'static'});
			});
		}else if(confirmacion === 'aceptar'){
			$('#bajaAseguradoModal').modal('hide');
			$.ajax({
				url: "endososC/cancelarAseguradoAP/" + $('#fechaEfectividad').val(),
				method: "POST",
				data: JSON.stringify($asegurado),
				dataType: 'json',
				contentType: 'application/json',
				beforeSend: function(){
					util.loadingStart();
				},
				success: function (dataSet) {console.log(dataSet);
					if (dataSet.mensaje === 'OK') {
						mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
						$table.row( $this.parents('tr') ).remove().draw();
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
		}
	};
	
	/** *VISUALIZAR INFO DE BENEFICIARIOS** */
	var infoBeneficiarios = function() {
		
		$('#tablaAseguradosAP tbody').on('click', '.editarBeneficiario', function(){
			$beneficiarios = [];
			
			$table = $("#tablaAseguradosAP").DataTable();
			var data = $table.row( $(this).parents('tr') ).data();
			$this = $(this);
			$asegurado = data;
			
			var $celdas = $(this).closest('tr');
			
			$icono = "fa-edit";
			$claseAccion = "editarRegistro";
			$title = "Editar beneficiarios";
			$iconColor = "tomato";
			var columnas = [
				{
					title : "Nombre",
					data : "nombreBeneficiario",
					render : function(data, type, row) {
			              return '<input class="form-control text-uppercase" value="' + data + '" disabled>';
			          } 
				},
				{
					title : "Parentesco",
					data : "parentesco",
					render : function(data, type, row) {
			              return '<select class="form-control parentesco" value="' + data + '" disabled>' + data + '</select>';
			          } 
				},
				{
					title : "%",
					data : "porcentaje",
					render : function(data, type, row) {
						if(data == null){
							data = 0;
						}
			              return '<input class="form-control numberClass" value="' + data + '" disabled max=100>';
			          } 
				},
				{
					title : "",
					data : null,
					defaultContent : "<span data-toggle='collapse' title='" + $title + "'><i class='fas " + $icono + " " + $claseAccion + "' style='color:" + $iconColor + "'></i></span>" +
									"<span data-toggle='collapse' title='Guardar cambios' class='ml-2 d-none guardarRegistro'><i class='fas fa-save' style='color:green'></i></span>",
					orderable : false
				}
				];
			
			for(var i = 1; i <= 5; i++){
				var $beneficiario = {};
				$beneficiario['nombreBeneficiario'] = $asegurado['nombreBeneficiario' + i];
				$beneficiario['parentesco'] = $asegurado['parentesco' + i];
				$beneficiario['porcentaje'] = $asegurado['porcentaje' + i];
				$beneficiarios.push($beneficiario);
			}
			
			tabla.iniciarTablaNoHeader("#tablaBeneficiarios", $beneficiarios, columnas);
			$('.background-tabla').css('display', 'block');
			parentescoC.obtenerParentesco(function(data){
				$('.parentesco').html("");
				if(data.mensaje === 'OK'){
					$.each(data.dataExtra, function(i, v){
						$('.parentesco').append('<option value="' + v.idParentesco +'">' + v.descripcion + '</option>');
					});
				}
				
				var $tablaBene = $('#tablaBeneficiarios').DataTable();
				$tablaBene.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
					this.cell(rowIdx,1).nodes().to$().find('select').val($beneficiarios[rowIdx].parentesco);
					numberClass();
				} );
			});
			
			editarBeneficario();
			
			$('#beneficiariosModal').modal({show:true, backdrop:'static'});
		});
	};
	
	/***EDITAR REGISTROS BENEFICIARIO ***/
	var editarBeneficario = function(){
		var $rowIndex;
		var $rowAnt;
		
		$('#tablaBeneficiarios tbody').on('click', '.editarRegistro', function(){
			$tablaBeneficiario = $('#tablaBeneficiarios').DataTable();
			
			if( $rowIndex != undefined && ($rowIndex != $(this).closest('tr').index()) ){
				cancelarEdicion($rowAnt, $(this).closest('tr'));
			}
			
			$rowIndex = $(this).closest('tr').index();
			$rowAnt = $(this).closest('tr');
			
			$(this).closest('tr').find('input, select').removeAttr('disabled');
			$(this).closest('tr').find('.editarRegistro').removeClass('fa-edit editarRegistro').addClass('fa-ban cancelarEdicion');
			$(this).closest('tr').find('.guardarRegistro').removeClass('d-none');
			
			$('#btnTerminarEdicion').prop('disabled', true);
		});
		
		$('#tablaBeneficiarios tbody').on('click', '.cancelarEdicion', function(e){
			cancelarEdicion(undefined, $(this));
		});
		
		$('#tablaBeneficiarios tbody').on('click', '.guardarRegistro', function(){
			var data = $(this).closest('tr').find('td');
			$(this).closest('tr').find('input, select').attr('disabled', 'disabled');
			$(this).closest('tr').find('.guardarRegistro').addClass('d-none');
			$(this).closest('tr').find('.cancelarEdicion').removeClass('fa-ban cancelarEdicion').addClass('fa-edit editarRegistro');
			
			var $index = $tablaBeneficiario.row( $(this).closest('tr') ).index();
			$beneficiarios[$index].nombreBeneficiario = $tablaBeneficiario.row($(this).closest('tr')).cell($index,0).nodes().to$().find('input').val();
			$beneficiarios[$index].parentesco = $tablaBeneficiario.row($(this).closest('tr')).cell($index,1).nodes().to$().find('select').val();
			$beneficiarios[$index].porcentaje = $tablaBeneficiario.row($(this).closest('tr')).cell($index,2).nodes().to$().find('input').val();
			
			if($beneficiarios[$index].porcentaje === ''){
				$tablaBeneficiario.row($(this).closest('tr')).cell($index,2).nodes().to$().find('input').val(0);
			}
			$('#btnTerminarEdicion').prop('disabled', false);
		});
	};
	
	var cancelarEdicion = function($seleccionAnterior, $seleccionActual){
		var $registro;
		
		if($seleccionAnterior != undefined){
			$registro = $seleccionAnterior;
		}else{
			$registro = $seleccionActual;
		}
		
		$($registro).closest('tr').find('input, select').attr('disabled', 'disabled');
		$($registro).closest('tr').find('.guardarRegistro').addClass('d-none');
		$($registro).closest('tr').find('.cancelarEdicion').removeClass('fa-ban cancelarEdicion').addClass('fa-edit editarRegistro');
		
		var $datosOriginales = $tablaBeneficiario.row( $($registro).closest('tr') ).data();
		var $index = $tablaBeneficiario.row( $($registro).closest('tr') ).index();
		$tablaBeneficiario.row($($registro).closest('tr')).cell($index,0).nodes().to$().find('input').val($datosOriginales.nombreBeneficiario);
		$tablaBeneficiario.row($($registro).closest('tr')).cell($index,1).nodes().to$().find('select').val($datosOriginales.parentesco);
		$tablaBeneficiario.row($($registro).closest('tr')).cell($index,2).nodes().to$().find('input').val($datosOriginales.porcentaje);
		
		$('#btnTerminarEdicion').prop('disabled', false);
	};
	
	var guardarBeneficiario = function(){
		
		$tablaBeneficiario.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var $nombreBeneficiario = this.cell(rowIdx,0).nodes().to$().find('input').val();
			var $parentesco = this.cell(rowIdx,1).nodes().to$().find('select').val();
			var $porcentaje = this.cell(rowIdx,2).nodes().to$().find('input').val();
			
			$beneficiarios[rowIdx].nombreBeneficiario = $nombreBeneficiario;
			$beneficiarios[rowIdx].parentesco = $parentesco;
			$beneficiarios[rowIdx].porcentaje = $porcentaje;
		} );
		
		var valido = validarPorcentajes($beneficiarios);
		
		if(!valido){
			mensajes.modalAlert('danger', 'ERROR', 'La suma de los porcentajes debe ser 100');
			return;
		}
		
		$.each($beneficiarios, function(k, v){
			k++;
			$asegurado['nombreBeneficiario' + k] = v.nombreBeneficiario;
			$asegurado['parentesco' + k] = v.parentesco;
			$asegurado['porcentaje' + k] = v.porcentaje;
		});
		
		$.ajax({
			url: "endososC/actualizarBeneficiario",
			method: "POST",
			data: JSON.stringify($asegurado),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#beneficiariosModal').modal('hide');
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
	
	var validarPorcentajes = function($beneficiarios){
		var valido = true;
		var suma = 0;
		
		$.each($beneficiarios, function(k, v){
			console.log("porcentaje beneficiario -> ", v.porcentaje);
			suma += parseFloat(v.porcentaje);
		});

		if(parseFloat(suma) < 100 || parseFloat(suma) > 100){
			valido = false;
		}
		return valido;
	};
	
	var numberClass = function(){
		$(".numberClass").keypress(function(e) {
			if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		});
	};
	
	var nuevoBeneficiarioAP = function(){
		
	};
	
	var iniciarTablaBeneficiariosNuevo = function(){
		var columnas = [
			{
				title : "Nombre",
				data : null,
				defaultContent : '<input class="form-control text-uppercase">'
			},
			{
				title : "Parentesco",
				data : null,
				defaultContent : '<select class="form-control parentesco"></select>'
			},
			{
				title : "%",
				data : "porcentaje",
				defaultContent : '<input class="form-control numberClass">',
				width : "10%"
			}
			];
		
		tabla.iniciarTablaNoHeader("#tablaBeneficiariosNuevo", $beneficiarios, columnas);
		$('.background-tabla').css('display', 'block');
		parentescoC.llenarComboParentesco();
		
		var $table = $('#tablaBeneficiariosNuevo').DataTable();
		var i;
		for(i = 1; i <= 5; i++){
			$table.row.add([]).draw( false );
		}
		numberClass();
	};
	
	var guardarAseguradoAp = function(){
		var $tableAseguradoNuevo = $('#tablaBeneficiariosNuevo').DataTable();
		var $aseguradoModel = {};
		var $sexo = $('input[name="sexo"]:checked').val();
		
		if($sexo === undefined){
			mensajes.modalAlert('danger', 'ERROR', 'Debe seleccionar "Hombre" o "Mujer"');
		}
		
		$.each($('input, select', ('#formNuevoAseguradoAp')), function (k, v) {
			if ($(this).attr("name") !== undefined && $(this).attr("name") !== 'sexo') {
				$aseguradoModel[$(this).attr("name")] = $(this).val();
			}
		});
		
		$aseguradoModel['sexo'] = $sexo;
		var $beneficiariosGuardar = [];
		
		$tableAseguradoNuevo.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
			var $nombreBeneficiario = this.cell(rowIdx,0).nodes().to$().find('input').val();
			var $parentesco = this.cell(rowIdx,1).nodes().to$().find('select').val();
			var $porcentaje = this.cell(rowIdx,2).nodes().to$().find('input').val();
			
			if($nombreBeneficiario.trim() === ''){
				$parentesco = null;
				$porcentaje = null;
			}
			
			$aseguradoModel['nombreBeneficiario' + (rowIdx + 1)] = $nombreBeneficiario.toUpperCase();
			$aseguradoModel['parentesco' + (rowIdx + 1)] = $parentesco;
			$aseguradoModel['porcentaje' + (rowIdx + 1)] = $porcentaje;
			//$aseguradoModel['fechaEfectividad'] = $('#fechaEfectividad').val();
			
			var $beneficiario = {};
			$beneficiario['nombreBeneficiario'] = $nombreBeneficiario;
			$beneficiario['parentesco'] = $parentesco;
			if($porcentaje == undefined){
				$porcentaje = 0;
			}
			$beneficiario['porcentaje'] = $porcentaje;
			
			$beneficiariosGuardar.push($beneficiario);
		} );
		
		var valido = validarPorcentajes($beneficiariosGuardar);
		
		if(!valido){
			mensajes.modalAlert('danger', 'ERROR', 'La suma de los porcentajes debe ser 100');
			return;
		}
		
		$.ajax({
			url: "endososC/nuevoAseguradoAP",
			method: "POST",
			data: JSON.stringify($aseguradoModel),
			dataType: 'json',
			contentType: 'application/json',
			beforeSend: function(){
				util.loadingStart();
			},
			success: function (dataSet) {console.log(dataSet);
				if (dataSet.mensaje === 'OK') {
					mensajes.modalAlert('success', dataSet.mensaje, dataSet.detalleMensaje);
					$('#formNuevoAseguradoAp')[0].reset();
					util.resetInvalidTooltip();
				}else{
					mensajes.modalAlert('danger', dataSet.mensaje, dataSet.detalleMensaje);
					$.each( dataSet.dataExtra, function(k, v){
						var campo = $('#formNuevoAseguradoAp [name=' + k + ']').addClass("is-invalid");
						$(campo).parent().append('<div class="invalid-tooltip">' + v + '</div>');
					});
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

	return {
		bajaAseguradoAP : bajaAseguradoAP,
		buscarAseguradosAP : buscarAseguradosAP,
		guardarBeneficiario : guardarBeneficiario,
		nuevoBeneficiarioAP : nuevoBeneficiarioAP,
		iniciarTablaBeneficiariosNuevo : iniciarTablaBeneficiariosNuevo,
		guardarAseguradoAp : guardarAseguradoAp
	}

})();