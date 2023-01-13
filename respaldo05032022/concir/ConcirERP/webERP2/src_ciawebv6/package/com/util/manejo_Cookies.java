/*
 * manejo_Cookies.java
 *
 * Created on 12 de diciembre de 2006, 04:47 PM
 */

package com.util;
import jakarta.servlet.http.*;
/**
 *
 * @author  mruiz
 */
public class manejo_Cookies {
               
    /** Esta función busca el valor de una Cookie
     * @Param  String              str_busq nombre del valor a buscar
     * @Param  HttpServletRequest  request del servlet que lo llama
     * @Return String              str_res  regresa el valor
     */
    public static String get_Cookie(String str_busq,HttpServletRequest request){
        String str_res = "";
        Cookie cookie_co[] = request.getCookies();
        if(cookie_co!=null)
            for(int i = 0; i< cookie_co.length; i++){
                String nombreCookie = cookie_co[i].getName();
                if(nombreCookie.compareTo(str_busq) == 0){
                    str_res = cookie_co[i].getValue();
                    break;
                }
            }
        return str_res; 
    }
    
    /** Esta función crea una cookie
     * @Param  String              str_nom nombre del valor a insertar
     * @Param  String              str_val valor a insertar
     * @Param  int                 int_age duración de la cookie en segundos, 0 para eliminar, -1 para cookie de sesión
     * @Param  HttpServletResponse response del servlet que lo llama
     */
    public static void set_Cookie(String str_nom,String str_val,int int_age,HttpServletResponse response){
        Cookie cookie_w = new Cookie(str_nom,str_val);
        if(int_age >= 0)
            cookie_w.setMaxAge(int_age);
        response.addCookie(cookie_w);
    }

    
}
