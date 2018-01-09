$.noConflict();
var escalas_braden = escalas_braden || {};

escalas_braden.funcionesConversion = new Array();
console.log("Uno");
escalas_braden.escalaActiva = 'Braden';

escalas_braden.funcionesConversion['Braden'] = function(valorNumerico, edad) {
	var mayor75 = edad >= 75;
        switch (valorNumerico) {
	case 0:
	case 1:
	case 2:
	case 3:
	case 4:
	case 5:
	case 6:
	case 7:
	case 8:
	case 9:
	case 10:
	case 11:
	case 12:
		return "Riesgo alto";
	case 13:
	case 14:
		return "Riesgo moderado";
	case 15:
	case 16:
		return "Riesgo bajo";
	case 17:
	case 18:
		return mayor75 ? "Riesgo bajo" : "Sin riesgo";
	case 19:
	case 20:
	case 21:
	case 22:
	case 23:
		return "Sin riesgo";
	}
	return "Error";
};

escalas_braden.funcionesConversion['Braden_Q'] = function(valorNumerico, edad) {
	return (valorNumerico > 16) ? 'Sin riesgo' : 'Con riesgo'; 
};

escalas_braden.funcionesConversion['Braden_Neonatos'] = function (valorNumerico, edad) {
	return (valorNumerico > 17) ? 'Neonato sin riesgo' : 'Neonato con riesgo';
}

console.log("DOS");

escalas_braden.calcularEdad = function(fechaNacimiento) {

	var fechaSplit =
		fechaNacimiento.split("/");

	var fechaFormateada = fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0];
	console.log("La fecha es " + fechaFormateada);	
	var hoy = new Date();
	var dateNacimiento = new Date(fechaFormateada);
	var edad = hoy.getFullYear() - dateNacimiento.getFullYear();
	var difMes = hoy.getMonth() - dateNacimiento.getMonth();

	if (difMes < 0) {
		edad--;
	}

	if (difMes == 0 && hoy.getDate() < dateNacimiento.getDate()) {
		edad--;
	}

	return edad;
}	

escalas_braden.crearEscala = (function (nombreEscala, nombreCampoCalculado, idCampoDescripcion, nombreCampoNacimiento, nombreCampos) {

	var elObj = {};
	elObj.nombreEscala = nombreEscala;
	console.log("Buscando calculado " + jQuery("#" + nombreCampoCalculado).parent().parent().find("input").length);
	elObj.campoCalculado = jQuery("#" + nombreCampoCalculado).parent().parent().find("input")[0];
	elObj.campoCalculado.readonly = true;
	elObj.campoCalculadoDesc = document.getElementById(idCampoDescripcion);
	elObj.campoFechaNacimiento = jQuery("#" + nombreCampoNacimiento).parent().parent().find("input")[0];
	elObj.nombreCampos = nombreCampos;
	elObj.campos = new Array();

	elObj.calcular = function() {
		console.log("Calculando");
		var faltaValor = false;
		var total = 0;
		var descripcion = "";
		for (var i = 0; i < elObj.campos.length; i++) {
			if (elObj.campos[i].value.length > 0) {
				console.log("Iterando, acumulado " + total);
				total += Number(elObj.campos[i].value);
			} else {
				faltaValor = true;
			}
		}
		var fechaNacimiento = elObj.campoFechaNacimiento.value;
		console.log("Fecha nacimiento " + fechaNacimiento);
		if (fechaNacimiento.length != 10) {
			faltaValor = true;
		}

		if (faltaValor) {
			total = "";
		} else {
			var edad = escalas_braden.calcularEdad(fechaNacimiento);
			console.log("Edad " + edad);
			descripcion = escalas_braden.funcionesConversion[nombreEscala](total, edad);
		}
		
		elObj.campoCalculado.value = total;
		elObj.campoCalculadoDesc.value = descripcion;
	}
	
	elObj.limpiar = function() {
		for (var i = 0; i < elObj.campos.length; i++) {
			elObj.campos[i].value = null;
		}
	};

	elObj.registrar = function (campo) {
		elObj.campos[elObj.campos.length] = campo;
		campo.onchange = elObj.calcular;
	}

	for (var i = 0; i < nombreCampos.length; i++) {
		var campo = jQuery("#" + elObj.nombreCampos[i]).parent().parent().find("select");
		console.log("campo es " + campo.length);
		if (campo.length == 1) {
			console.log("campo id es : " + campo[0].id);
			elObj.registrar(campo[0]);
		} else {
			console.log("No encontrado " + elObj.nombreCampos[i]);
		}
	}

	elObj.calcular();

	return elObj;

});

escalas_braden.listenerFecha = function() {
	escalas_braden.selectorEscala('FechaNac', 'Escala');
	var escala = escalas_braden[escalas_braden.escalaActiva];
	console.log("Escala: " + escalas_braden.escalaActiva + " - " + escala);
	escala.calcular();
}

escalas_braden.selectorEscala = function(nombreCampoNacimiento, nombreCampoEscala) {
	var campoFechaNacimiento = jQuery("#" + nombreCampoNacimiento).parent().parent().find("input")[0];
	var fechaNacimiento = campoFechaNacimiento.value;
	if (fechaNacimiento.length == 0) {
		return;
	}

	var escala = 'Braden';
	var anyos = escalas_braden.calcularEdad(fechaNacimiento);

        var fechaSplit =
                fechaNacimiento.split("/");

        var fechaFormateada = fechaSplit[2] + "/" + fechaSplit[1] + "/" + fechaSplit[0];
        console.log("La fecha es " + fechaFormateada);
        var hoy = new Date();
        var dateNacimiento = new Date(fechaFormateada);

	switch (anyos) {
	case 0:
		var dias = (hoy - dateNacimiento) / (1000 * 60 * 60 * 24);
		escala = (dias < 29) ? 'Braden_Neonatos' : 'Braden_Q';
		break;
	case 1:
	case 2:
	case 3:
	case 4:
		escala = 'Braden_Q';
		break;
	case 5:
	}
		

	var campoEscala = jQuery("#" + nombreCampoEscala).parent().parent().find("select")[0];
	campoEscala.value = escala;
	escalas_braden.escalaActiva = escala;

	escalas_braden['Braden'].limpiar();
        escalas_braden['Braden_Q'].limpiar();
//        escalas_braden['Braden_Neonatos'].limpiar();

	campoEscala.onchange();
}
	
console.log("antes de ready");
jQuery(document).ready(function($) {
	console.log("Ready");
	
        var campoFechaNacimiento = jQuery("#FechaNac").parent().parent().find("input")[0];

	escalas_braden['Braden'] =
		escalas_braden.crearEscala('Braden', 'Valora_BRADEN', 'Valora_BR_Desc', 'FechaNac', ['PerSen_BR', 'ExpHum_BR', 'Activi_BR', 'Movili_BR', 'Nutri_BR', 'RocPel_BR']);
	escalas_braden['Braden_Q'] =
		escalas_braden.crearEscala('Braden_Q', 'Valora_BRADEN', 'Valora_BR_Desc', 'FechaNac', ['PerSen_BQ', 'ExpHum_BQ', 'Activi_BQ', 'Movili_BQ', 'Nutri_BQ', 'FriDes_BQ', 'PerTis_BQ']);
//	escalas_braden['Braden_Neonatos'] =
//		escalas_braden.crearEscala('Braden_Neonatos','Valora_BRADEN', 'Valora_BR_Desc', 'FechaNac', ['ConFis_NEO', 'EstMen_NEO', 'Movili_NEO', 'Activi_NEO', 'Nutri_NEO', 'Humedad_NEO']);
	console.log("Campo escala " + jQuery('#Escala').parent().parent().find("select").length);	
	campoFechaNacimiento.onchange = escalas_braden.listenerFecha;
	escalas_braden.listenerFecha();
});
