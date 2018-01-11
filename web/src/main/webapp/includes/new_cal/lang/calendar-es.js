// ** I18N

// Calendar EN language
// Author: Mihai Bazon, <mihai_bazon@yahoo.com>
// Encoding: any
// Distributed under the same terms as the calendar itself.

// For translators: please use UTF-8 if possible.  We strongly believe that
// Unicode is the answer to a real internationalized world.  Also please
// include your contact information in the header, as can be seen above.

// full day names
Calendar._DN = new Array
("Domingo",
"Lunes",
"Martes",
"Miércoles",
"Jueves",
"Viernes",
"Sábado",
"Domingo");

// Please note that the following array of short day names (and the same goes
// for short month names, _SMN) isn't absolutely necessary.  We give it here
// for exemplification on how one can customize the short day names, but if
// they are simply the first N letters of the full name you can simply say:
//
//   Calendar._SDN_len = N; // short day name length
//   Calendar._SMN_len = N; // short month name length
//
// If N = 3 then this is not needed either since we assume a value of 3 if not
// present, to be compatible with translation files that were written before
// this feature.

// short day names
Calendar._SDN = new Array
("Dom",
"Lun",
"Mar",
"Mié",
"Jue",
"Vie",
"Sáb",
"Dom");

// First day of the week. "0" means display Sunday first, "1" means display
// Monday first, etc.
Calendar._FD = 1;

// full month names
Calendar._MN = new Array
("Enero",
"Febrero",
"Marzo",
"Abril",
"Mayo",
"Junio",
"Julio",
"Agosto",
"Setiembre",
"Octubre",
"Noviembre",
"Diciembre");

// short month names
Calendar._SMN = new Array
("Ene",
"Feb",
"Mar",
"Abr",
"May",
"Jun",
"Jul",
"Ago",
"Set",
"Oct",
"Nov",
"Dic");

// tooltips
Calendar._TT = {};
Calendar._TT["INFO"] = "Acerca del calendario";

Calendar._TT["ABOUT"] =
"DHTML Selectori Fecha/Hora\n" +
"(c) dynarch.com 2002-2005 / Author: Mihai Bazon\n" + // don't translate this this ;-)
"For latest version visit: http://www.dynarch.com/projects/calendar/\n" +
"Distributed under GNU LGPL.  See http://gnu.org/licenses/lgpl.html for details." +
"\n\n" +
"Selection de Fecha:\n" +
"- Use los botones \xab, \xbb para escoger el año\n" +
"- Use los botones " + String.fromCharCode(0x2039) + ", " + String.fromCharCode(0x203a) + " para escoger el mes\n" +
"- Haga click con el ratón en cualquiera de los botones superiores para una selección más rápida.";
Calendar._TT["ABOUT_TIME"] = "\n\n" +
"Selección de hora::\n" +
"- Click en cualquiera de los componentes de hora para incrementarlo\n" +
"- o Shift-click para disminuirlo\n" +
"- o click y arrastrar para selección más rápida.";

Calendar._TT["PREV_YEAR"] = "Año ant. (mantener para menú)";
Calendar._TT["PREV_MONTH"] = "Mes ant. (mantener para menú)";
Calendar._TT["GO_TODAY"] = "Hoy";
Calendar._TT["NEXT_MONTH"] = "Próx. mes (mantener para menú)";
Calendar._TT["NEXT_YEAR"] = "Próx. año (mantener para menú)";
Calendar._TT["SEL_DATE"] = "Escoger fecha";
Calendar._TT["DRAG_TO_MOVE"] = "Arrastrar para mover";
Calendar._TT["PART_TODAY"] = " (hoy)";

// the following is to inform that "%s" is to be the first day of week
// %s will be replaced with the day name.
Calendar._TT["DAY_FIRST"] = "Semana empieza por %s";

// This may be locale-dependent.  It specifies the week-end days, as an array
// of comma-separated numbers.  The numbers are from 0 to 6: 0 means Sunday, 1
// means Monday, etc.
Calendar._TT["WEEKEND"] = "0,6";

Calendar._TT["CLOSE"] = "Cerrar";
Calendar._TT["TODAY"] = "Hoy";
Calendar._TT["TIME_PART"] = "(Shift-)Click o arrastrar para cambiar valor";

// date formats
Calendar._TT["DEF_DATE_FORMAT"] = "%Y-%m-%d";
Calendar._TT["TT_DATE_FORMAT"] = "%a, %b %e";

Calendar._TT["WK"] = "Sem";
Calendar._TT["TIME"] = "Hora:";
