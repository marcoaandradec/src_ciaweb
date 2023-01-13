package com.dao.jdbc;

import java.sql.*;
import java.util.*;
import java.io.*;

public class MysqlDao extends AbstractDao {
    
    public MysqlDao() {
    }
    
    public final boolean testConnection() {
        boolean status = false;   
        Connection conn = getConnection();
        try {
            if(status = conn!=null) {
                conn.close();  
            }  
        } catch (SQLException ex){
            System.out.println("Error TESTCONNECTION ");
        } 
        return(status); 
    } 
      
    public final Connection getConnection(){
        Connection conn = null;  
        try {
            Class.forName( driver );
                try{
                    conn = DriverManager.getConnection( url, usr, pass );
                }
                catch(SQLException error)  {
                    System.out.println( "No se puede conectar"+ error);
                    if(conn != null){
                        try{
                            conn.close();
                        }
                        catch(SQLException err){
                            System.out.println( "Conexion sin cerrar"+ err);
                        }
                    }
                }    
        } catch (Exception ex) {
            System.out.println( "Error al Cargar DB"+ ex);
        }         
        return(conn);
    }
    public final void closeConnection(Connection conn){
         try{
            if (conn != null)
                conn.close();
          }catch (Exception e){
        }
    }
}
