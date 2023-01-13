/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dao;

import com.util.ContextPathServer;
import com.util.ReadProps;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Properties;
import org.json.*;

/**
 *
 * @author mandrade
 */
public class RequestPostApi {

    public String getPost(String service, String content) throws IOException {
        String request = "", strKey = "";
        ReadProps prop = new ReadProps();
        URL url = new URL(service);
        HttpURLConnection http = (HttpURLConnection) url.openConnection();
        http.setRequestMethod("POST");
        http.setDoOutput(true);
        strKey = prop.getValueProp("key");
        String encoder = Base64.getEncoder().encodeToString(strKey.getBytes());
        http.setRequestProperty("Authorization", "Basic " + encoder);
        http.setRequestProperty("Content-Type", "application/json");
        String data = content;
        byte[] out = data.getBytes(StandardCharsets.UTF_8);
        OutputStream stream = http.getOutputStream();
        stream.write(out);
        stream.flush();
        stream.close();
        int status = http.getResponseCode();

        BufferedReader in = new BufferedReader(new InputStreamReader(http.getInputStream()));
        String inputLine;
        StringBuilder contentz = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            contentz.append(inputLine);
        }
        request = contentz.toString();
        System.out.println(http.getResponseCode() + " " + http.getResponseMessage());
        http.disconnect();
        return request;

    }
}
