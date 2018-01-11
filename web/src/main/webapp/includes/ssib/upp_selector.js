var jQueryEjecutado = 0;

jQuery(document).ready(function($) {

	if (jQueryEjecutado == 1) {
		return;
	}
	jQueryEjecutado = 1;

	if (document.createStyleSheet) {
		document.createStyleSheet("includes/select2/css/select2.css");
	} else {
		$("<link>").attr({
			rel: "stylesheet",
			type: "text/css",
			href: "includes/select2/css/select2.css"}).
			appendTo("head");
	}

	jQuery("[name='ssib_selector2']").each(function (index, elemento) {
		var selects = jQuery(elemento).parent().parent().find("select");
		for (var i = 0; i < (selects.length / 2); i++) {
			jQuery(selects[i]).select2();
			selects[i].style.display = 'none';
		}
	});
});
