/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package com.util;

import java.text.SimpleDateFormat;
import java.util.*;

/**
 *
 * @author Marco
 */
public class GetNameReport {
    public String obtenerNombre(){
    String nombre="";
    SimpleDateFormat fmt = new SimpleDateFormat("ddMMyyyyHHmmss");
    Calendar calendario = Calendar.getInstance();
    Date fecha = calendario.getTime();
    nombre=fmt.format(fecha);
    System.out.println(nombre);
    return nombre;
    }
}
