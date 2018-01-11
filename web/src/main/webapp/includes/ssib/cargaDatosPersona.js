var ssib =
	ssib || {};

ssib.cargaDatosPersona =
	ssib.cargaDatosPersona || {};

if (ssib.cargaDatosPersona.funciones == null) {

	// Funciones de conversion de los datos que vienen de JSON al formato para Form.
	ssib.cargaDatosPersona.funciones = 
		{};

	ssib.cargaDatosPersona.funciones.normal =
		function (
			campos,
			respuesta,
			nombreCampo) {

			document.getElementById(campos[nombreCampo]).value =
				respuesta[nombreCampo];
		};

	ssib.cargaDatosPersona.funciones.sexo =
		function (
			campos,
			respuesta,
			nombreCampo) {

			var sexo =
				respuesta[nombreCampo];
			if (sexo) {
				var valor =
					sexo.toLowerCase();
				document.getElementById(campos[nombreCampo]).value =
					valor;
			}
		};

	ssib.cargaDatosPersona.funciones.nombreCompleto =
		function (
			campos,
			respuesta,
			nombreCampo) {

			var nombreCompleto =
				respuesta['nombre'];
			if (respuesta['apellido1'] != null) {
				nombreCompleto +=
					" " + respuesta['apellido1'];
			}
			if (respuesta['apellido2'] != null) {
				nombreCompleto +=
					" " + respuesta['apellido2'];
			}
			document.getElementById(campos[nombreCampo]).value =
				nombreCompleto;
		};

	ssib.cargaDatosPersona.funciones.anyoNacimiento =
		function (
			campos,
			respuesta,
			nombreCampo) {

			var fecha =
				respuesta['fechaNacimiento'];

			var anyo =
				null;
			if (fecha) {
				anyo =
					year(fecha);
			}
			document.getElementById(campos[nombreCompleto]).value =
				anyo;
		};
}

// Lista de campos que se pueden obtener del JSON.
ssib.cargaDatosPersona.relacionCampos =
	ssib.cargaDatosPersona.relacionCampos
		|| { 
			'anyoNacimiento' : ssib.cargaDatosPersona.funciones.anyoNacimiento,
			'fechaNacimiento' : ssib.cargaDatosPersona.funciones.normal,
			'dni':  ssib.cargaDatosPersona.funciones.normal,
			'cipAut':  ssib.cargaDatosPersona.funciones.normal,
			'nombre':  ssib.cargaDatosPersona.funciones.normal,
			'apellido1':  ssib.cargaDatosPersona.funciones.normal,
			'apellido2':  ssib.cargaDatosPersona.funciones.normal,
			'nombreCompleto': ssib.cargaDatosPersona.funciones.nombreCompleto,
			'sexo':  ssib.cargaDatosPersona.funciones.sexo,
			'mensajeError':  ssib.cargaDatosPersona.funciones.normal};


ssib.cargaDatosPersona.esStatusOk =
	function(
		status) {

		return (status >= 200) && (status < 300);
	};

ssib.cargaDatosPersona.procesarRespuesta =
	function(
		campos,
		xmlHttp) {

		var respuesta =
			JSON.parse(
				xmlHttp.responseText);
		if (!ssib.cargaDatosPersona.esStatusOk(xmlHttp.status)) {
			alert("Error obtenint dades: " + respuesta['mensajeError']);
			return;
		}
		if (respuesta['mensajeError'] !== null) {
			alert(
				"El servidor retorna un missatge d'error: "
					+ respuesta['mensajeError']);
			return;
		}

		for (var clave in campos) {
			if (!campos.hasOwnProperty(clave)) {
				continue;
			}
			if (!campos[clave]) {
				continue;
			}
			var func =
				ssib.cargaDatosPersona.relacionCampos[clave];

			if (func) {
				func(
					campos,
					respuesta,
					clave);
			} else {
				if (window.console && window.console.log) {
					console.log("Campo " + clave + " desconocido");
				}
			}
		}
        };

ssib.cargaDatosPersona.porCipAut =
	function (
		cipAut,
		campos) {

		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() {

			if (window.console && window.console.log) {
				console.log(
					"Procesando respuesta "
						+ xmlHttp.readyState
						+ " - "
						+ xmlHttp.status);
                	}
        
			if (xmlHttp.readyState == XMLHttpRequest.DONE) {
				ssib.cargaDatosPersona.procesarRespuesta(
					campos,
					xmlHttp);
			}
		}



		xmlHttp.open(
			"GET",
			"/OpenClinica/pages/ssib/empi/byId/json/" + cipAut + "/2",
			true)
		xmlHttp.send();
	};

