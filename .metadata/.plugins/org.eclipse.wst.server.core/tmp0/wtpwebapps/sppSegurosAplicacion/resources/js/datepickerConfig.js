var datepicker = (function() {

	var datepicker = $.fn.datepicker.noConflict();
	var customConfig = function() {
		$.fn.bootstrapDP = datepicker;
		
		$('.date').bootstrapDP({
			language: 'es',
			format: 'yyyy-mm-dd',
			todayHighlight: true,
			autoclose : true
		});
		
		$('.currentDate').bootstrapDP('setDate', new Date());
	}
	
	var fechaEndosos = function() {
		$.fn.bootstrapDP = datepicker;
		
		$('.date-endosos').bootstrapDP({
			language: 'es',
			format: 'yyyy-mm-dd',
			todayHighlight: true,
			autoclose : true,
			startDate : '-15d',
			endDate : '+15d'
		});
		
		$('.currentDate').bootstrapDP('setDate', new Date());
	}
	
	var yearConfig = function() {
		$.fn.bootstrapDP = datepicker;
		
		$('.dateYear').bootstrapDP({
			language: 'es',
			format: "yyyy",
		    viewMode: "years", 
		    minViewMode: "years"
		});
	}

	return {
		customConfig : customConfig,
		yearConfig : yearConfig,
		fechaEndosos : fechaEndosos
	}
})();