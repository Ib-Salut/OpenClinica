var jQueryEjecutado = 0;

jQuery(document).ready(function($) {

	if (jQueryEjecutado == 1) {
		return;
	}
	jQueryEjecutado = 1;


	if (document.createStyleSheet) {
		document.createStyleSheet("includes/chosen/chosen.css");
	} else {
		$("<link>").attr({
			rel: "stylesheet",
			type: "text/css",
			href: "includes/chosen/chosen.css"}).
			appendTo("head");
	}

	jQuery("[name='ssib_selector2']").each(function (index, elemento) {
		var select = jQuery(elemento).parent().parent().find("select")[0];
//		jQuery(select).chosen();

//		selects[i].style.display = 'none';

		if ((select.options != null) && (select.options.length > 1)) {
			if (select.options[1].textContent.includes('_')) {

				console.log('procesando');
				var valorAnterior = ' ';
				var optionGroup;
				var estructura = [];
				for (var i = 1; i < select.options.length; i++) {
					var partes = select.options[i].textContent.split('_');
					var opt = document.createElement('OPTION');
					opt.textContent = partes[1];
					opt.value = select.options[i].value;
					opt.selected = select.options[i].selected;

					if (valorAnterior != partes[0]) {
						optionGroup = document.createElement('OPTGROUP');
						optionGroup.label = partes[0];
						valorAnterior = partes[0];
						estructura.push(optionGroup);
					}
					optionGroup.appendChild(opt);
				}

				console.log('vamos a borrar');
				while (select.options.length > 1) {
					select.remove(select.options.length - 1);
				}

				
				for (var i = 0; i < estructura.length; i++) {
					select.appendChild(estructura[i]);
				}
			}
		}
		jQuery(select).chosen();
	});
});
