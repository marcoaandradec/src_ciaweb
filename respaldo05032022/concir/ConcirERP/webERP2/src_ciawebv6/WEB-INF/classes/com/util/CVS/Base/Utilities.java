/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

import com.dao.EventManager;
//import com.entity.CtlActividad;
import com.entity.Liempresas;
import com.entity.Liusuarios;
//import com.entity.Usuario;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Properties;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 *
 * @author marco
 */
public class Utilities {

    /**
     *
     * @param file
     * @return
     */
    public static Properties getDatosPropieties(String file) {
        ContextPathServer p = new ContextPathServer();
        String realContextPath = p.getContextPath().toString();
        Properties props = new Properties();
        try {
            InputStream in = new java.io.FileInputStream(realContextPath + "classes/com/util/properties/" + file);
            props.load(in);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
            props = null;
        }
        return props;
    }

    /**
     *
     * @param fecha_inicio
     * @param fechaSalida
     * @return
     */
    public static String obtenDuracionSesion(Date fecha_inicio, Date fechaSalida) {
        String duracion = "";

        long entrada = fecha_inicio.getTime();
        long salida = fechaSalida.getTime();
        long auxDuracion = (salida - entrada);

        // obtenemos los segundos
        long segundos = auxDuracion / 1000;

        // obtenemos las horas
        long horas = segundos / 3600;

        // restamos las horas para continuar con minutos
        segundos -= horas * 3600;

        // igual que el paso anterior
        long minutos = segundos / 60;

        segundos -= minutos * 60;
        duracion = String.valueOf(horas) + ":" + String.valueOf(minutos) + ":" + String.valueOf(segundos);
        return duracion;
    }

    /**
     *
     * @param request
     * @param name_parameter
     * @return
     */
    public static String obtenParametro(HttpServletRequest request, String name_parameter) {
        String dato = "";
        if (request.getParameter(name_parameter) != null) {
            dato = request.getParameter(name_parameter);
        } else if (request.getAttribute(name_parameter) != null) {
            dato = (String) request.getAttribute(name_parameter);
        }
        return dato;
    }

    /**
     *
     * @param obj
     * @return
     */
    public static Object validaNull(Object obj) {
        Object o = "";
        if (obj != null) {
            o = obj;
        }
        return o;
    }

    /**
     * 
     * @param lstAct - Lista que contiene todas las actividades
     * @param arrayOpt - Lista que contiene las actividades a borrar
     * @param clase - La clase a Utilizar
     * @param metodo - Método a utilizar para obtener el dato de la clase.
     * @param tpoDato - Tipo de dato a recibir por el método.
     * @return lstAct - Regresa la lista de todas las actividades ya con las actividades borradas y las actividas que se borraron.
     */
    /* public static ArrayList borrarActividadDeLista(List lstAct, ArrayList arrayOpt, Class clase, String metodo, Class tpoDato) {
    //public static ArrayList borrarActividadDeLista(List lstAct, ArrayList arrayOpt,String c,String metodo) {
    ArrayList arrayReturn = new ArrayList();
    for (int i = 0; i < arrayOpt.size(); i++) {
    //            Object act = tpoDato.cast(arrayOpt.get(i));
    int act = Integer.parseInt(arrayOpt.get(i).toString());
    for (int y = 0; y < lstAct.size(); y++) {
    try {
    Object[] obj = (Object[]) lstAct.get(y);
    CtlActividad ca = (CtlActividad) obj[0];
    int rs = ca.getAIdActividad();
    //                    Object[] arrayObj = (Object[])lstAct.get(y);
    //                    Object obj = clase.cast(arrayObj[0]);
    //                    Method metodoGet = obj.getClass().getMethod(metodo, new Class[]{tpoDato});
    //                    Object rs = tpoDato.cast(metodoGet.invoke(obj, new Object[0]));
    if (act == rs) {
    lstAct.remove(obj);
    arrayReturn.add(obj);
    }
    } catch (Exception e) {
    e.printStackTrace();
    }
    }
    }
    arrayReturn.add(0, lstAct);
    return arrayReturn;
    }*/
    public static String getRFC(String n, String ap, String am, Date d) {
        String rfc = "";
        int mes = 0;
        int dia = 0;
        Calendar cal = Calendar.getInstance();
        cal.setTime(d);

        rfc += ap.substring(0, 2);
        rfc += am.substring(0, 1);
        rfc += n.substring(0, 1);

        String anio = String.valueOf(cal.get(Calendar.YEAR));
        rfc += anio.substring((anio.length() - 2), anio.length());
        mes = Integer.parseInt("" + cal.get(Calendar.MONTH)) + 1;
        dia = Integer.parseInt("" + cal.get(Calendar.DAY_OF_MONTH));
        if (mes < 10) {
            rfc += "0" + mes;
        } else {
            rfc += "" + mes;
        }
        if (dia < 10) {
            rfc += "0" + dia;
        } else {
            rfc += "" + dia;
        }

        return rfc;
    }

    public static String getRFC(String n, String ap, String am) {
        String rfc = "";

        rfc += ap.substring(0, 2);
        rfc += am.substring(0, 1);
        rfc += n.substring(0, 1);
        rfc += "000000";
        return rfc;
    }

    public static void RegistraActividadDiaria(EntityManager em, Hashtable hash) {
    }

    public static Liusuarios ReactivarSession(HttpServletRequest request) {
        HttpSession s = request.getSession(false);
        Liusuarios usr = null;
        if (s != null) {
            Integer idUsuario = (Integer) s.getAttribute("usuario");
            usr = (Liusuarios) EventManager.getSingleList(Liusuarios.class, idUsuario);
            s.setAttribute("usuario", idUsuario);

        }
        return usr;
    }

    public static String getIDEstado(String estado) {
        String id = "0";

        if (estado.toUpperCase().equals("AGUASCALIENTES")) {
            id = "1";
        } else if (estado.toUpperCase().equals("B.C.NORTE")) {
            id = "2";
        } else if (estado.toUpperCase().equals("B.C.SUR")) {
            id = "3";
        } else if (estado.toUpperCase().equals("CAMPECHE")) {
            id = "4";
        } else if (estado.toUpperCase().equals("COAHUILA")) {
            id = "5";
        } else if (estado.toUpperCase().equals("COLIMA")) {
            id = "6";
        } else if (estado.toUpperCase().equals("CHIAPAS")) {
            id = "7";
        } else if (estado.toUpperCase().equals("CHIHUAHUA")) {
            id = "8";
        } else if (estado.toUpperCase().equals("DISTRITO FEDERAL")) {
            id = "9";
        } else if (estado.toUpperCase().equals("DURANGO")) {
            id = "10";
        } else if (estado.toUpperCase().equals("GUANAJUATO")) {
            id = "11";
        } else if (estado.toUpperCase().equals("GUERRERO")) {
            id = "12";
        } else if (estado.toUpperCase().equals("HIDALGO")) {
            id = "13";
        } else if (estado.toUpperCase().equals("JALISCO")) {
            id = "14";
        } else if (estado.toUpperCase().equals("MICHOACAN")) {
            id = "15";
        } else if (estado.toUpperCase().equals("MORELOS")) {
            id = "16";
        } else if (estado.toUpperCase().equals("NAYARIT")) {
            id = "17";
        } else if (estado.toUpperCase().equals("NUEVO LEON")) {
            id = "18";
        } else if (estado.toUpperCase().equals("OAXACA")) {
            id = "19";
        } else if (estado.toUpperCase().equals("PUEBLA")) {
            id = "20";
        } else if (estado.toUpperCase().equals("QUERETARO")) {
            id = "21";
        } else if (estado.toUpperCase().equals("QUINTANA ROO")) {
            id = "22";
        } else if (estado.toUpperCase().equals("SAN LUIS POTOSI")) {
            id = "23";
        } else if (estado.toUpperCase().equals("SINALOA")) {
            id = "24";
        } else if (estado.toUpperCase().equals("SONORA")) {
            id = "25";
        } else if (estado.toUpperCase().equals("TABASCO")) {
            id = "26";
        } else if (estado.toUpperCase().equals("TAMAULIPAS")) {
            id = "27";
        } else if (estado.toUpperCase().equals("TLAXCALA")) {
            id = "28";
        } else if (estado.toUpperCase().equals("VERACRUZ")) {
            id = "29";
        } else if (estado.toUpperCase().equals("YUCATAN")) {
            id = "30";
        } else if (estado.toUpperCase().equals("ZACATECAS")) {
            id = "31";
        } else if (estado.toUpperCase().equals("ESTADO DE MEXICO")) {
            id = "32";
        } else {
            id = "0";
        }

        return id;
    }

    public static String getIDEspecialidad(String esp) {
        String id = "0";

        if (esp.toUpperCase().equals("PSIQUIATRÍA")) {
            id = "1";
        } else if (esp.toUpperCase().equals("MÉDICO GENERAL")) {
            id = "2";
        } else if (esp.toUpperCase().equals("ONCOLOGÍA MÉDICA")) {
            id = "3";
        } else if (esp.toUpperCase().equals("RADIOTERAPIA ONCO.")) {
            id = "4";
        } else if (esp.toUpperCase().equals("RADIOTERAPIA")) {
            id = "5";
        } else if (esp.toUpperCase().equals("CIRUGÍA ONCOLÓGICA")) {
            id = "6";
        } else if (esp.toUpperCase().equals("HEMATO-ONCOLOGICA")) {
            id = "7";
        } else if (esp.toUpperCase().equals("GINECOLOGÍA ONCO.")) {
            id = "8";
        } else if (esp.toUpperCase().equals("ONCOLOGÍA")) {
            id = "9";
        } else if (esp.toUpperCase().equals("HEMATOLOGÍA")) {
            id = "10";
        } else if (esp.toUpperCase().equals("GINECOLOGÍA")) {
            id = "11";
        } else if (esp.toUpperCase().equals("MEDICINA INTERNA")) {
            id = "12";
        } else if (esp.toUpperCase().equals("ENDOCRINOLOGÍA")) {
            id = "13";
        } else if (esp.toUpperCase().equals("DIABETOLOGÍA")) {
            id = "14";
        } else if (esp.toUpperCase().equals("PEDIATRA ONCO.")) {
            id = "15";
        } else if (esp.toUpperCase().equals("GERIATRÍA")) {
            id = "16";
        } else if (esp.toUpperCase().equals("CARDIOLOGÍA")) {
            id = "17";
        } else if (esp.toUpperCase().equals("NEUROLOGÍA")) {
            id = "18";
        } else if (esp.toUpperCase().equals("NUTRICION")) {
            id = "19";
        } else if (esp.toUpperCase().equals("NEUROCIRUGÍA")) {
            id = "20";
        } else if (esp.toUpperCase().equals("INTENSIVISTA")) {
            id = "21";
        } else if (esp.toUpperCase().equals("TRAUMATOLOGÍA")) {
            id = "22";
        } else if (esp.toUpperCase().equals("REUMATOLOGO")) {
            id = "23";
        } else if (esp.toUpperCase().equals("ANESTESIOLOGO")) {
            id = "24";
        } else if (esp.toUpperCase().equals("DERMATOLOGÍA")) {
            id = "25";
        } else if (esp.toUpperCase().equals("ENDOCRINO-PEDIATRA")) {
            id = "26";
        } else if (esp.toUpperCase().equals("GASTROENTERÓLOGO")) {
            id = "27";
        } else if (esp.toUpperCase().equals("MÉDICO CIRUJANO")) {
            id = "28";
        } else if (esp.toUpperCase().equals("ODONTÓLOGO")) {
            id = "29";
        } else if (esp.toUpperCase().equals("ORTOPEDISTA")) {
            id = "30";
        } else if (esp.toUpperCase().equals("OTORRINOLARINGOLOGO")) {
            id = "31";
        } else if (esp.toUpperCase().equals("UROLOGÍA")) {
            id = "32";
        } else {
            id = "0";
        }

        return id;
    }

    public static String getSexo(String sexo) {
        String sex = "";
        if (sexo != null && !sexo.equals("")) {
            sex = sexo.substring(0, 1);
            sex.toUpperCase();
        } else {
            sex = "0";
        }

        return sex;
    }

    public static Liempresas ObtenerEmpresa(int idEmpresa) {
        Liempresas emp = null;
        if (idEmpresa != 0) {
            emp = (Liempresas) EventManager.getSingleList(Liempresas.class, idEmpresa);
        }
        return emp;
    }

    public static String getGridRemoveColum(HttpServletRequest request) {
        String respuesta = "";
        String callback = Utilities.obtenParametro(request, "callback").replaceAll("'", "");
        try {
            if (!callback.equals("")) {
                respuesta = callback + "({total:0,records:[]});";
            }
        } catch (Exception e) {
            e.printStackTrace();
            respuesta = callback + "({total:0,records:[]});";
        }
        return respuesta;
    }
}
