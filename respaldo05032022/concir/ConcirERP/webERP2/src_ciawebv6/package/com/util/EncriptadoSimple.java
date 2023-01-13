/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.util;

import javax.swing.Timer;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 *
 * @author marco
 */
public class EncriptadoSimple {

    static int time = 0;
    static ActionListener al = new ActionListener() {

        public void actionPerformed(ActionEvent e) {
            time += 1;
        }
    };

    public EncriptadoSimple() {
    }

    public static String ClaveToString(String encriptado) {
        String palabra = "";
        time = 0;
        Timer tiempo = new Timer(1, al);
        tiempo.start();
        if (!encriptado.equals("")) {
            int encriptLength = encriptado.length() / 2;
            for (int i = 0, x = 0; i < encriptLength; i++, x = i * 2) {
                String token = encriptado.substring(x, (x + 2));
                for (int j = 0; j < StringUtilities.claves.length; j++) {
                    String clave = StringUtilities.claves[j];
                    if (clave.equals(token)) {
                        palabra += StringUtilities.letras[j];
                    }
                }
            }
            tiempo.stop();
        }
        return palabra.toLowerCase();
    }

    public static String StringToClave(String palabra) {
        String encriptado = "";
        time = 0;
        Timer tiempo = new Timer(1, al);
        tiempo.start();
        if (!palabra.equals("")) {
            int palabraLength = palabra.length();
            for (int i = 0; i < palabraLength; i++) {
                String token = palabra.substring(i, (i + 1));
                for (int j = 0; j < StringUtilities.letras.length; j++) {
                    String letra = StringUtilities.letras[j];
                    if (letra.equals(token)) {
                        encriptado += StringUtilities.claves[j];
                    }
                }
            }
            System.out.println("Tiempo de conversión: " + time);
            tiempo.stop();
            System.out.println("Clave: " + encriptado.toLowerCase());
        }
        return encriptado;
    }
}

