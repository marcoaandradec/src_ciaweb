/*
 * SendFiles.java
 *
 * Created on 17 de octubre de 2006, 06:12 PM
 */
package com.util.transferencia;

import java.net.*;
import java.io.*;
import com.util.ContextPathServer;

/**
 *
 * @author  mruiz
 */
public class SendFiles {

    /** Creates a new instance of SendFiles */
    ContextPathServer cps = new ContextPathServer();
    String realContextPath = cps.getContextPath();

    public SendFiles() {
    }

    public boolean sendFile(String url, String dir_server, String file_name, String dir_local) {
        try {
            URLConnection con = new URL(url).openConnection();
            con.setDoOutput(true);
            con.setDoInput(true);
            //set the file name
            con.setRequestProperty("file_name", dir_server + "/" + file_name);
            //set the content type
            con.setRequestProperty("content-type", "binary/data");
            //(content type is a standerd header that many servers wil read so better to put it there)
            //now write the data
            File file = new File(file_name);
            FileInputStream fin = new FileInputStream(realContextPath + dir_local + "/" + file);
            String aux = String.valueOf(fin.available());
            con.setRequestProperty("length", aux);
            OutputStream out = con.getOutputStream();
            byte buffer[] = new byte[fin.available()];
            int i = 0;
            while ((i = fin.read(buffer)) != -1) {
                out.write(buffer, 0, i);
            }
            fin.close();
            out.close();
            //Now read the response
            InputStream in = con.getInputStream();
            //while ((i = in.read(buffer)) != -1);
            in.close();
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void sendFile(String url, String dir_server, String file_name, InputStream fin) {
        try {
            URLConnection con = new URL(url).openConnection();
            con.setDoOutput(true);
            con.setDoInput(true);
            //set the file name
            con.setRequestProperty("file_name", dir_server + "/" + file_name);
            //set the content type
            con.setRequestProperty("content-type", "binary/data");
            //(content type is a standerd header that many servers wil read so better to put it there)
            //now write the data
            String aux = String.valueOf(fin.available());
            con.setRequestProperty("length", aux);
            OutputStream out = con.getOutputStream();
            byte buffer[] = new byte[fin.available()];
            int i = 0;
            while ((i = fin.read(buffer)) != -1) {
                out.write(buffer, 0, i);
            }
            fin.close();
            out.close();
            //Now read the response
            InputStream in = con.getInputStream();
            while ((i = in.read(buffer)) != -1);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void sendFiles(String url, String dir_server, String file_name, String dir_local, String str_noms) {
        try {
            URLConnection con = new URL(url).openConnection();
            con.setDoOutput(true);
            con.setDoInput(true);
            //set the file name
            con.setRequestProperty("directorio", dir_server + "/");
            con.setRequestProperty("file_names", str_noms);
            //set the content type
            con.setRequestProperty("content-type", "binary/data");
            //(content type is a standerd header that many servers wil read so better to put it there)
            //now write the data
            File file = new File(file_name);//
            FileInputStream fin = new FileInputStream(realContextPath + dir_local + "/" + file);
            String aux = String.valueOf(fin.available());
            con.setRequestProperty("length", aux);
            OutputStream out = con.getOutputStream();
            byte buffer[] = new byte[fin.available()];
            int i = 0;
            while ((i = fin.read(buffer)) != -1) {
                out.write(buffer, 0, i);
            }
            fin.close();
            out.close();
            //Now read the response
            InputStream in = con.getInputStream();
            while ((i = in.read(buffer)) != -1);
            in.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
