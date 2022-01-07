$(document).ready(function() {
	$(document).userTimeout({
		  // ULR to redirect to, to log user out
		  logouturl: 'logout',              

		  // URL Referer - false, auto or a passed URL     
		  referer: false,            

		  // Name of the passed referal in the URL
		  refererName: 'refer',        

		  // Toggle for notification of session ending
		  notify: true,                      

		  // Toggle for enabling the countdown timer
		  timer: true,             

		  // 10 Minutes in Milliseconds, then notification of logout
		  //session: 600000,
		  session: (59 * 60000),

		  // 5 Minutes in Milliseconds, then logout
		  //force: 300000,
		  force: (60000),

		  // Model Dialog selector (auto, bootstrap, jqueryui)              
		  ui: 'bootstrap',                        

		  // Shows alerts
		  debug: false,            

		  // <a href="https://www.jqueryscript.net/tags.php?/Modal/">Modal</a> Title
		  modalTitle: 'Aviso de sesión',     

		  // Modal Body
		  modalBody: 'Su sesión está por terminar, seleccione "Terminar" o "Quedarse"',
		  // Modal log off button text
		  modalLogOffBtn: 'Terminar',  

		  // Modal stay logged in button text        
		  modalStayLoggedBtn: 'Quedarse' 
	});
	
	$('#loadingModal').modal({
		keyboard : false,
		backdrop : 'static',
		show : false
	});

	datepicker.customConfig();
	datepicker.yearConfig();
	mostrarSubmenus();
	datepicker.fechaEndosos();
	
	$('input, select, radio').click(function() {
		if ($(this).hasClass('is-invalid')) {
			$(this).removeClass('is-invalid');
			$(this).parent().find('.invalid-tooltip').remove();
		}
	});

	$(".numberClass").keypress(function(e) {
		// if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			// display error message
			// $("#errmsg").html("Digits Only").show().fadeOut("slow");
			return false;
		}
	});
	
	$(".currency").keypress(function(e) {
		if (e.which != 46 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	$(".currencyNegative").keypress(function(e) {
		if (e.which != 46 && e.which != 45 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	$(".hour").keypress(function(e) {
		if(e.target.value.length == 2 && e.which != 8) {
			var valor = e.target.value + ':';
			e.target.value = valor;
		}
		if (e.which != 58 && e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
			return false;
		}
	});
	
	$('#btnErrorAcceso').click(function(){
		window.history.back(-1);
	});
})

//Funcion para mostrar los submenus en la barra de menu
function mostrarSubmenus() {
	$('.dropdown-menu a.dropdown-toggle').on(
			'click',
			function(e) {
				var $el = $(this);
				var $parent = $(this).offsetParent(".dropdown-menu");
				if (!$(this).next().hasClass('show')) {
					$(this).parents('.dropdown-menu').first().find('.show')
							.removeClass("show");
				}
				var $subMenu = $(this).next(".dropdown-menu");
				$subMenu.toggleClass('show');

				$(this).parent("li").toggleClass('show');

				$(this).parents('li.nav-item.dropdown.show').on(
						'hidden.bs.dropdown', function(e) {
							$('.dropdown-menu .show').removeClass("show");
						});

				if (!$parent.parent().hasClass('navbar-nav')) {
					$el.next().css({
						"top" : $el[0].offsetTop,
						"left" : $parent.outerWidth() - 4
					});
				}

				return false;
			});
	
	util.formatoMoneda();
	util.formatoPorcentaje();
}
