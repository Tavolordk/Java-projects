var fileinput = (function() {
	var inicializarFileinput = function(uploadUrl, idFileinput, extensionArchivo){
		var configFileInput = {
				uploadUrl : uploadUrl,
				language : 'es',
				theme : 'fa',
				showPreview : false,
				showUpload : true,
				showRemove : false,
				showCancel : false,
				previewFileType : 'any',
				allowedFileExtensions : extensionArchivo,
				elErrorContainer : "#errorBlock",
				uploadAsync : false,
				layoutTemplates : {
			        progress: '',
				}
			};
		
		$(idFileinput).fileinput(configFileInput);

		$(idFileinput).on('filepreajax', function(event, previewId, index) {
			util.loadingStart();
		});
		
		$(idFileinput).on('filebatchuploadsuccess',function(event, data) {
			var form = data.form, files = data.files, extra = data.extra, response = data.response, reader = data.reader;
			
			$(idFileinput).fileinput('destroy');
			$(idFileinput).fileinput(configFileInput).fileinput('enable')
			
			if(response.mensaje === 'OK'){
				mensajes.modalAlert('success', response.mensaje, response.detalleMensaje);
			}else{
				mensajes.modalAlert('danger', response.mensaje, response.detalleMensaje);
			}
			
			util.loadingEnd();
		});
	}
	
	var inicializarFileinputCliente = function(uploadUrl, idFileinput, extensionArchivo){
		var configFileInput = {
				uploadUrl : uploadUrl,
				language : 'es',
				theme : 'fa',
				showPreview : false,
				showUpload : false,
				showRemove : false,
				showCancel : false,
				previewFileType : 'any',
				allowedFileExtensions : extensionArchivo,
				elErrorContainer : "#errorBlock",
				uploadAsync : false
			};
		
		$(idFileinput).fileinput(configFileInput);
	}
	
	var inicializarFileinputUploadOnClick= function(uploadUrl, idFileinput, extensionArchivo){
		var configFileInput = {
				uploadUrl : uploadUrl,
				language : 'es',
				theme : 'fa',
				showPreview : false,
				showUpload : false,
				showRemove : false,
				showCancel : false,
				previewFileType : 'any',
				allowedFileExtensions : extensionArchivo,
				elErrorContainer : "#errorBlock",
				uploadAsync : false
			};
		
		$(idFileinput).fileinput(configFileInput);
	}
	
	var inicializarFileinputSiniestros = function(uploadUrl, idFileinput, extensionArchivo){
		var configFileInput = {
				uploadUrl : uploadUrl,
				allowedFileExtensions : extensionArchivo,
				language : 'es',
				theme : 'fa',
				showPreview : false,
				showUpload : false,
				showRemove : false,
				showCancel : false,
				dropZoneEnabled: false,
				previewFileType : 'any',
				elErrorContainer : "#errorBlock",
				uploadAsync : false
			};
		
		$(idFileinput).fileinput(configFileInput);
	}
	
	return{
		inicializarFileinput : inicializarFileinput,
		inicializarFileinputCliente : inicializarFileinputCliente,
		inicializarFileinputUploadOnClick : inicializarFileinputUploadOnClick,
		inicializarFileinputSiniestros : inicializarFileinputSiniestros
	}
})();