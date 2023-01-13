/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 *
 * @author marco
 */
public class StringUtilities {

    /**
     *Toma un string y convierte a mayúscula la primera letra y 
     * las demás letras las convierte a minúscula.
     * (Método para nombres y apellidos)
     *@params String palabra La palabra a convertir
     *@return String palabara_nueva La palabra convertida.
     **/
    public static String obtenPalabra(String cadena) {
        String palabra_nueva = "";
        if (!cadena.equals("")) {
            String[] buffer = cadena.split("\\s");
            int tamBuffer = buffer.length - 1;
            for (int i = 0; i < buffer.length; i++) {
                if (buffer[i].endsWith(".")) {
                    if (i == tamBuffer) {
                        palabra_nueva += buffer[i];
                    } else {
                        palabra_nueva += buffer[i] + " ";
                    }
                } else if (buffer[i].length() < 3) {
                    if (i == tamBuffer) {
                        palabra_nueva += buffer[i].toLowerCase();
                    } else {
                        palabra_nueva += buffer[i].toLowerCase() + " ";
                    }
                } else {
                    int tamanio = buffer[i].length();
                    if (i == tamBuffer) {
                        palabra_nueva += buffer[i].substring(0, 1).toUpperCase() + buffer[i].substring(1, tamanio).toLowerCase();
                    } else {
                        palabra_nueva += buffer[i].substring(0, 1).toUpperCase() + buffer[i].substring(1, tamanio).toLowerCase() + " ";
                    }
                }
            }
        }
        return palabra_nueva;
    }
    static String[] claves = new String[]{"00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61",};

    public static String getDate(Date fecha) {
        java.text.SimpleDateFormat formatterTx = new java.text.SimpleDateFormat("yyyy-MM-dd");
        String str_dat = formatterTx.format(fecha);

        GregorianCalendar fechaCalendario = new GregorianCalendar();
        fechaCalendario.setGregorianChange(fecha);
        //int int_dia = fechaCalendario.get(Calendar.DAY_OF_WEEK);
        int int_dia = fecha.getDay();
        String str_mes[] = new String[12];
        str_mes[0] = " de Enero ";
        str_mes[1] = " de Febrero ";
        str_mes[2] = " de Marzo ";
        str_mes[3] = " de Abril ";
        str_mes[4] = " de Mayo ";
        str_mes[5] = " de Junio ";
        str_mes[6] = " de Julio ";
        str_mes[7] = " de Agosto ";
        str_mes[8] = " de Septiembre ";
        str_mes[9] = " de Octubre ";
        str_mes[10] = " de Noviembre ";
        str_mes[11] = " de Diciembre ";

        String str_dia[] = new String[7];
        str_dia[0] = " Domingo, ";
        str_dia[1] = " Lunes, ";
        str_dia[2] = " Martes, ";
        str_dia[3] = " Miércoles, ";
        str_dia[4] = " Jueves, ";
        str_dia[5] = " Viernes, ";
        str_dia[6] = " Sábado, ";
        return str_dia[int_dia] + str_dat.substring(8, 10) + str_mes[Integer.parseInt(str_dat.substring(5, 7)) - 1] + str_dat.substring(0, 4);
    }
    static String[] letras = new String[]{"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",};

    public static int calcularEdad(String fecha) {
        java.text.SimpleDateFormat formatterTx = new java.text.SimpleDateFormat("dd-MM-yyyy");
        String datetext = fecha;
        try {
            Calendar birth = new GregorianCalendar();
            Calendar today = new GregorianCalendar();
            int age = 0;
            int factor = 0;

            Date birthDate = formatterTx.parse(datetext);
            Date currentDate = new Date(); //current date
            birth.setTime(birthDate);
            today.setTime(currentDate);
            if (today.get(Calendar.MONTH) <= birth.get(Calendar.MONTH)) {
                if (today.get(Calendar.MONTH) == birth.get(Calendar.MONTH)) {
                    if (today.get(Calendar.DATE) > birth.get(Calendar.DATE)) {
                        factor = -1; //Aun no celebra su cumplea?os
                    }
                } else {
                    factor = -1; //Aun no celebra su cumplea?os
                }
            }
            age = (today.get(Calendar.YEAR) - birth.get(Calendar.YEAR)) + factor;
            return age;
        } catch (Exception e) {
            return -1;
        }
    }

    
}
