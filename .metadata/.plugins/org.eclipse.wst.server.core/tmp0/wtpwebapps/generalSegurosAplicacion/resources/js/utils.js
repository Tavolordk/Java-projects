var util = (function() {
	var loadingStart = function() {
		$('#loadingModal').css({"pointer-events": "none"});
		$('#loadingModal').modal('show');
		
	}

	var loadingEnd = function() {
		$('#loadingModal').modal('hide');
		$('#loadingModal').css({"pointer-events": "auto"});
		verificarModales();
		
	}
	
	var resetInvalidTooltip = function(){
		$.each($('input, select, radio'), function(k, v){
			if ($(this).hasClass('is-invalid')) {
				$(this).removeClass('is-invalid');
				$(this).parent().find('.invalid-tooltip').remove();
			}
		});
	}
	
	var currencyValidator = function() {
		$(".currency").keypress(function(e) {
			if (e.which != 46 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
				return false;
			}
		})
	}
	
	var verificarModales = function(){
	
		var modals = $('body').find('.modal.show');
		if(modals.length > 0){
			$('body').addClass('modal-open');
		}
	}
	
	var formatoMoneda = function(){
		$('.moneda').inputmask("numeric", {
		    radixPoint: ".",
		    groupSeparator: ",",
		    digits: 2,
		    autoGroup: true,
		    prefix: '$',
		    rightAlign: false,
		    oncleared: function () { self.Value(''); }
		});
	};
	
	var fechaActual = function(){
		var d = new Date();
		var month = d.getMonth()+1;
		var day = d.getDate();
		
		var fecha = d.getFullYear()
		    + '-' + (month < 10 ? '0' : '') + month
		    + '-' + (day   < 10 ? '0' : '') + day;
		
		return fecha
	}
	
	var getPath = function(){
		var $pathArray = window.location.pathname.split("/");
		var path = window.location.protocol + "//" + window.location.host + "/" + $pathArray[1];
		return path;
	}

	return {
		loadingStart : loadingStart,
		loadingEnd : loadingEnd,
		resetInvalidTooltip : resetInvalidTooltip,
		currencyValidator : currencyValidator,
		verificarModales : verificarModales,
		formatoMoneda : formatoMoneda,
		fechaActual : fechaActual,
		getPath : getPath
	}
	
})();