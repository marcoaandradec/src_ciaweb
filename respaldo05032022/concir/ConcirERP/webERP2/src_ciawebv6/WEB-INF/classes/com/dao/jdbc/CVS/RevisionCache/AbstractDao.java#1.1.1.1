package com.dao.jdbc;

import com.util.ContextPathServer;
import java.io.InputStream;
import java.sql.*;
import java.util.*;
import java.io.*;

public abstract class AbstractDao {

    /** Creates a new instance of AbstractDao */
    protected String driver = "", dbname = "", usr = "", pass = "", url = "";
    File path;
    ContextPathServer cps = new ContextPathServer();
    String realContextPath = cps.getContextPath();

    protected AbstractDao() {
        try {
            Properties props = new Properties();
            InputStream in = new java.io.FileInputStream(realContextPath + "WEB-INF/classes/com/dao/jdbc/Conexion.props");
            props.load(in);
            in.close();
            driver = props.getProperty("driver");
            url = props.getProperty("url");
            usr = props.getProperty("usr");
            pass = props.getProperty("pass");
            // props.load(getClass().getResourceAsStream("admcontenido/Conexion.props"));
        } catch (Exception e) {
            System.out.println("Error en ConexionBD:" + e);
            e.printStackTrace();
        }

    }

    public abstract Connection getConnection();

    public abstract boolean testConnection();
}
