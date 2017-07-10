package es.ssib.otic.epona.openclinica.restful;

import java.net.MalformedURLException;
import java.net.URL;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.context.annotation.Scope;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import es.ssib.otic.empi.proxy.DatosProxy;
import es.ssib.otic.empi.proxy.iface.ICargaDatosProxy;
import es.ssib.otic.empi.proxy.iface.IDatosProxy;

import es.ssib.otic.epona.openclinica.restful.dto.PersonDto;

/**
 * Obtiene la información administrativa de un paciente.
 *
 * @author SJM.
 */
@Controller
@RequestMapping("/ssib/empi")
@Scope("prototype")
public class EMPiSsibResource 
	implements InitializingBean {

	private static final Logger LOGGER =
		LoggerFactory.getLogger(
			"org.akaza.openclinica.ssib.EMPiSsibResource");
//			EMPiSsibResource.class);

	public static final int TYPE_ID_UIP =
		1;
	public static final int TYPE_ID_CIPAUT =
		2;
	public static final int TYPE_ID_DNI =
		3;

	@Autowired
	private ICargaDatosProxy cargaDatosProxy;

	public ICargaDatosProxy getCargaDatosProxy() {
		return
			this.cargaDatosProxy;
	}

	public void setCargaDatosProxy(
		ICargaDatosProxy cargaDatosProxy) {

		this.cargaDatosProxy =
			cargaDatosProxy;
	}

	// TODO Configurar
	private URL urlProxy;
	private String centroProxy;
	private String usuarioProxy;
	

	public void afterPropertiesSet()
		throws Exception {

		try {
			LOGGER.warn(
				"Asignando valor a la URL de CargaProxy");
			this.urlProxy =
				new URL(
					"http://proxy.ssib.es:9080/porpacCorp/services/ProxyService.wsdl");
		} catch (MalformedURLException mue) {
			LOGGER.warn(
				"Excepción instanciando URL",
				mue);
			throw
				new Exception(
					"Excepción inesperada inicializando PersonWs",
					mue);
		}	
	}

	@RequestMapping(
		value = "/byId/json/{personId}/{idType}",
		method = RequestMethod.GET)
	public ResponseEntity<PersonDto> getPersonData(
		@PathVariable("personId") String personId,
		@PathVariable("idType") int idType)
			throws Exception {

		LOGGER.debug(
			"Requesting administrative data for subject with ID of type "
			+ idType
			+ " and value "
			+ personId);

		try {
			IDatosProxy datosProxy =
				null;
			switch (idType) {
			case TYPE_ID_UIP:
			case TYPE_ID_CIPAUT:
				datosProxy =
					this.cargaDatosProxy.
						obtenerDatos(
							null,
							personId,
							"19");
//					this.obtenerProxy().
//						obtenerDatos(
//							null,
//							personId,
//							"19");
				break;
			case TYPE_ID_DNI:
			default:
				LOGGER.warn(
					"Unrecognized id type "
						+ idType
						+ " when looking for administrative data for subject with id value "
						+ personId);
				return
					new ResponseEntity<PersonDto>(
						new PersonDto(
							"Error en la petición REST: No hay ningún tipo de identificación con ID "
								+ idType),
						HttpStatus.INTERNAL_SERVER_ERROR);
								
			}

			return
				new ResponseEntity<PersonDto>(
					this.fromDatosProxy(
						datosProxy),
					HttpStatus.OK);
		} catch (Exception e) {
			LOGGER.warn(
				"Excepción inesperada obteniendo datos administrativos de persona con ID tipo "
					+ idType
					+ " y valor "
					+ personId,
				e);
			return
				new ResponseEntity<PersonDto>(
					new PersonDto(
						"Error obteniendo datos administrativos"),
					HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
/*
	private CargaDatosProxy obtenerProxy() 
		throws Exception {

		LOGGER.warn("Obteniendo proxy; URL: " + this.urlProxy);

		return
			new CargaDatosProxy(
				this.urlProxy,
				this.centroProxy,
				this.usuarioProxy);
	}
*/
	private PersonDto fromDatosProxy(
		IDatosProxy datosProxy) {

		if (datosProxy == null) {
			return null;
		}

		String nombreCompleto =
			datosProxy.getNombre()
			+ (datosProxy.getApellido1() == null ? "" : " " + datosProxy.getApellido1())
			+ (datosProxy.getApellido2() == null ? "" : " " + datosProxy.getApellido2());

		String sexo =
			null;
		if (datosProxy.getSexo() != null) {
			switch (datosProxy.getSexo()) {
				case HOMBRE:
					sexo =
						"M";
					break;
				case MUJER:
					sexo =
						"F";
					break;
				default:
					LOGGER.warn(
						"Se ha recibido un valor de Sexo de "
							+ datosProxy.getSexo()
							+ " que no se puede convertir para el paciente "
							+ nombreCompleto);
			}
		}				
	
		return
			new PersonDto(
				datosProxy.getFechaNacimiento(),
				datosProxy.getDni(),
				datosProxy.getCipAutonomico(),
				datosProxy.getNombre(),
				datosProxy.getApellido1(),
				datosProxy.getApellido2(),
				sexo);
	}
		
}
