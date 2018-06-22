var jQueryEjecutado = 0;

var ssib = ssib || {};

ssib.uppSelector2 = ssib.uppSelector2 || {};

// A rellenar en el formulario.
ssib.uppSelector2.columnas = [];

ssib.uppSelector2.actualizarFila =
	function(elementoTr) {
		jQuery(elementoTr).find("td").each(function (index, elementoTd) {
			if (ssib.uppSelector2.columnas.indexOf(index) != -1) {
				jQuery(elementoTd).find("select:visible").each(function(index2, elementoSelect) {
					jQuery(elementoSelect).select2();
					elementoSelect.style.display = 'none';
				});
			}
		});
	};

ssib.uppSelector2.encontrarTabla = function() {
	var div = document.getElementsByName("ssib_selector2")[0];

	if (div == null) {
		alert("No se ha encontrado elemento con id ssib_selector2");
	}
	
	return div.
		parentElement. // TH
		parentElement. // TR
		parentElement. // THEAD
		parentElement; // TABLE
	};

ssib.uppSelector2.actualizarTodo = function(elementoTabla) {
        var elementoTabla =
                ssib.uppSelector2.encontrarTabla();
        jQuery(elementoTabla).find("tr").each( function(index, elementoTr) {
		if (index > 0) {
	                ssib.uppSelector2.actualizarFila(elementoTr);
		}
        });
};

	

jQuery(document).ready(function($) {

	if (jQueryEjecutado == 1) {
		return;
	}
	jQueryEjecutado = 1;

	//Cargar estilos select2
	$("<link>").attr({
		rel: "stylesheet",
		type: "text/css",
		href: "includes/select2/css/select2.css"}).
		appendTo("head");

	ssib.uppSelector2.actualizarTodo();

	jQuery("[stype='add']").each(function(index, elemento) {
		jQuery(elemento).on('click', function() {
				alert('Add pulsado');
				ssib.uppSelector2.actualizarTodo();
			});

		});

/* jQuery("[name='ssib_selector2']").each(function (index, elemento) {
			                var selects = jQuery(elemento).parent().parent().parent().parent().find("select");
			                for (var i = 0; i < (selects.length); i++) {
						if (selects[i].style.display != 'none') {
				                        jQuery(selects[i]).select2();
                	        			selects[i].style.display = 'none';
						}
			                }
			        });
			});
*/
});