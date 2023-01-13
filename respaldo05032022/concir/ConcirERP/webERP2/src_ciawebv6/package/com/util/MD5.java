package com.util;

import java.security.MessageDigest;

public class MD5 {

    /**
     * Encripta un String con el algoritmo MD5.
     * @return String
     * @throws Exception
     */
    private static String encrypt(String clear) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] b = md.digest(clear.getBytes());

        int size = b.length;
        StringBuffer h = new StringBuffer(size);
        for (int i = 0; i < size; i++) {
            int u = b[i] & 255; // unsigned conversion
            if (u < 16) {
                h.append("0" + Integer.toHexString(u));
            } else {
                h.append(Integer.toHexString(u));
            }
        }
        return h.toString();
    }

    /**
     * Encripta un String con el algoritmo MD5.
     * @return String
     * @throws Exception
     */
    public static String getMD5(String palabra)/*throws Exception */ {
        String pe = "";
        try {
            pe = encrypt(palabra);
        } catch (Exception e) {
            //throw new Error("<strong>Error: Al encriptar el password</strong>");    
            e.printStackTrace();
        }
        System.out.println("palabra: " + palabra + " || md5(palabra): " + pe);
        return pe;
    }
}
