/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

/**
 *
 * @author Marco Andrade
 */
public class ContextPathServer {
   
    public String getContextPath() {
        String str = this.getClass().getResource("").getPath();
        str = str.substring(0, str.indexOf("WEB-INF"));
        str = str.replaceAll("%20", " ");
        return str;

    }
}
