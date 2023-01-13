package com.dao.jdbc;

import java.util.*;
import java.text.*;
import java.sql.*;
import java.io.*;
import java.util.Date;

public class DaoHelper extends MysqlDao {
    
    private Connection conn;
    
    public DaoHelper(){
    }
    
    private ArrayList getColumnNames(ResultSet rst){
        ArrayList arrayColumn = new ArrayList(0);
        
        try {
            ResultSetMetaData rsmd = rst.getMetaData();
            
            for(int i= 1; i<=rsmd.getColumnCount();i++)    {
                arrayColumn.add(rsmd.getColumnName(i));
            }
            
        }catch (Exception ex) {
            ex.printStackTrace();
            
        }
        return arrayColumn;
    }
    
    public String setRegister(Hashtable hash){
        ArrayList array = new ArrayList(0);
        String str = "";
        String NameTable = (String)hash.get("table");
        String query = "SELECT * FROM "+NameTable+" WHERE 1=0";
        String elemento="",valor="";
        try{
            conn = getConnection();
            Statement stm = conn.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,ResultSet.CONCUR_UPDATABLE);
            ResultSet rst = stm.executeQuery(query);
            array.addAll(getColumnNames(rst));
            rst.moveToInsertRow();
            for(int i = 0; i<array.size();i++){
                elemento = array.get(i).toString();
                if(hash.containsKey(elemento)){
                    valor = (String)hash.get(elemento);
                    if(!valor.equals(""))
                        rst.updateString(elemento,valor);
                }
            }
            rst.insertRow();
            rst.last();
            str = rst.getString(1);
        }catch(Exception exp){
            System.out.println("error: "+exp);
            str = "";
        }finally{
            closeConnection(conn);
        }
        return str;
    }
    
    public void setDelete(String query, Vector params){
        PreparedStatement pst;
        Iterator it;
        int i = 0;
        try{
            conn = getConnection();
            pst = conn.prepareStatement(query);
            it = params.iterator();
            for(i=1; it.hasNext(); i++){
                Object miO = it.next();	
                if(miO!=null){
                        if(miO instanceof Integer)
                                pst.setInt(i,((Integer)miO).intValue());
                        if(miO instanceof String)
                                pst.setString(i,(String)miO);
                        if(miO instanceof Date){
                            Timestamp miTS = new Timestamp(((Date)miO).getTime()); 
                            pst.setTimestamp(i,miTS);
                        }
                }
                else
                        pst.setObject(i,null);
            }
            pst.execute();        
        }catch(Exception ex){
            System.out.println(ex.toString());
        }finally{
            closeConnection(conn);
        }
    }
    
    public ArrayList getResultTable(String query){
        
        Hashtable hash = new Hashtable(0);
        
        ArrayList arrayResult = new ArrayList(0);
        arrayResult.clear();
        String elemento = "", Columna;
        try{
            conn = getConnection();
            Statement stm = conn.createStatement();
            ResultSet rst = stm.executeQuery(query);
            ResultSetMetaData rsmd = rst.getMetaData();

            while(rst.next()){
                for(int i = 1;i<= rsmd.getColumnCount();i++){
                    Columna = rsmd.getColumnName(i);
                    elemento = rst.getString(Columna);
                    if(elemento != null){
                        hash.put(Columna, elemento);
                    }else{
                        hash.put(Columna, "");
                    }
                }
                arrayResult.add(new Hashtable(hash));
                hash.clear();
            }
            
            
        }catch(Exception ex){
            System.out.println(ex.toString());
            arrayResult.clear();
        }finally{
            closeConnection(conn);
        }
        return arrayResult;
    }

     public ArrayList getArrayResultTable(String query){
        conn = getConnection();
        ResultSetMetaData rsmd = null;
        ResultSet rs = null;
        
        ArrayList arrayResult = new ArrayList(0); arrayResult.clear();
        try{
            PreparedStatement pstm = null;
            pstm = conn.prepareStatement(query);
            rs = pstm.executeQuery();
            rsmd = rs.getMetaData();

            while(rs.next()){
                ArrayList arrayColumnas = new ArrayList(0); arrayColumnas.clear();
                for(int i = 1;i<= rsmd.getColumnCount();i++){
                    if (rs.getString(i) == null) {
                        arrayColumnas.add("");
                    } else {
                        arrayColumnas.add(rs.getString(i));
                    }
                }
                arrayResult.add(arrayColumnas);
            }
        }catch(Exception ex){
            System.out.println(ex.toString());
        }finally{
            closeConnection(conn);
        }
        return arrayResult;
    }
    
    public ArrayList getResultTable(String query, Vector params){
        Hashtable hash = new Hashtable(0);
        ArrayList arrayResult = new ArrayList(0);
        arrayResult.clear();
        String elemento = "", Columna;
        
        PreparedStatement pst;
        Iterator it;
        int i = 0;
        try{
            conn = getConnection();
            pst = conn.prepareStatement(query);
            it = params.iterator();
            for(i=1; it.hasNext(); i++){
                Object miO = it.next();	
                if(miO!=null){
                        if(miO instanceof Integer)
                                pst.setInt(i,((Integer)miO).intValue());
                        if(miO instanceof String)
                                pst.setString(i,(String)miO);
                        if(miO instanceof Date){
                            Timestamp miTS = new Timestamp(((Date)miO).getTime()); 
                            pst.setTimestamp(i,miTS);
                        }
                }
                else
                        pst.setObject(i,null);
            }
            ResultSet rst = pst.executeQuery();
            ResultSetMetaData rsmd = rst.getMetaData();
            while(rst.next()){
                for(i = 1;i<= rsmd.getColumnCount();i++){
                    Columna = rsmd.getColumnName(i);
                    elemento = rst.getString(Columna);
                    if(elemento != null){
                        hash.put(Columna, elemento);
                    }else{
                        hash.put(Columna, "NA");
                    }
                }
                arrayResult.add(new Hashtable(hash));
                hash.clear();
            }  
        }catch(Exception ex){
            System.out.println(ex.toString());
            arrayResult.clear(); 
        }finally{
            closeConnection(conn);
        }
        return arrayResult;
    }
    public void update(String query, Vector params){
        PreparedStatement pst;
        Iterator it;
        int i = 0;
        try{
            conn = getConnection();
            pst = conn.prepareStatement(query);
            it = params.iterator();
            for(i=1; it.hasNext(); i++){
                Object miO = it.next();	
                if(miO!=null){
                        if(miO instanceof Integer)
                                pst.setInt(i,((Integer)miO).intValue());
                        if(miO instanceof String)
                                pst.setString(i,(String)miO);
                        if(miO instanceof Date){
                            Timestamp miTS = new Timestamp(((Date)miO).getTime()); 
                            pst.setTimestamp(i,miTS);
                        }
                }
                else
                        pst.setObject(i,null);
            }
            pst.execute();        
        }catch(Exception ex){
            System.out.println(ex.toString());
        }finally{
            closeConnection(conn);
        }
    }
    public boolean updateRegister(Hashtable hash){
        boolean verify = false;
        ArrayList array = new ArrayList(0);
        String id = (String)hash.get("ID");
        String idValue = (String)hash.get("IDVALUE");
        String NameTable = (String)hash.get("table");
        String query = "SELECT * FROM "+NameTable+" WHERE "+id+" = '"+idValue+"'";
        String elemento = "";
        try{
            Connection conn = getConnection();
            Statement stm = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_UPDATABLE);
       
            ResultSet rst = stm.executeQuery(query);
            //System.out.println(array);
            array.addAll(getColumnNames(rst));
            array.remove(id);
            //System.out.println(array);
            if(rst.next()){
                for(int i = 0; i<array.size();i++){
                    elemento = array.get(i).toString();
                    if(hash.containsKey(elemento)){
                        rst.updateString(elemento,(String)hash.get(elemento));
                    }
                }
                verify = true;
                rst.updateRow();
            }
        }catch(Exception ex){
            System.out.println("ERROR: "+ex);
            verify = false;
        }finally{
            closeConnection(conn);
        }
        return verify;
    }
    public boolean updateRegister(Hashtable hash, Hashtable hashW){
        boolean verify = false;
        Hashtable hashSet = new Hashtable(0);
        Hashtable hashWhere = new Hashtable(0);
        String NameTable = (String)hash.get("table");
        String querySql = "UPDATE "+NameTable+" SET ";
        String query = "SELECT * FROM "+NameTable;
        String elemento = "", valor = "";
        ArrayList array = new ArrayList(0);
        java.text.SimpleDateFormat formatterTx = new java.text.SimpleDateFormat("yyyy-MM-dd");
        
        String fechaReg = formatterTx.format(new Date());
        try{
            Connection conn = getConnection();
            Statement stm = conn.createStatement(ResultSet.TYPE_SCROLL_INSENSITIVE,ResultSet.CONCUR_UPDATABLE);
            ResultSet rst = stm.executeQuery(query);
            ResultSetMetaData rsmd = rst.getMetaData();

            for(int i= 1; i<=rsmd.getColumnCount();i++)    {
                elemento = rsmd.getColumnName(i);
                
                if(hash.containsKey(elemento)){
                    valor = (String)hash.get(elemento);
                    //System.out.println(rsmd.getColumnTypeName(i));
                    if(rsmd.getColumnTypeName(i).equals("CHAR")||rsmd.getColumnTypeName(i).equals("VARCHAR")||rsmd.getColumnTypeName(i).equals("DATE")||rsmd.getColumnTypeName(i).equals("MEDIUMBLOB")){
                        hashSet.put(elemento,"'"+valor+"'");
                    }
                    else{
                        hashSet.put(elemento,valor);
                    }
                }
                
                if(hashW.containsKey(elemento)){
                    valor = (String)hashW.get(elemento);
                    if(rsmd.getColumnTypeName(i).equals("CHAR")||rsmd.getColumnTypeName(i).equals("VARCHAR")||rsmd.getColumnTypeName(i).equals("DATE")|rsmd.getColumnTypeName(i).equals("MEDIUMBLOB")){
                        
                        hashWhere.put(elemento,"'"+valor+"'");
                    }
                    
                    else{
                        hashWhere.put(elemento,valor);
                    }
                }
            }
            querySql = querySql+hashSet.toString()+" WHERE "+hashWhere.toString().replaceAll(","," and ");
            querySql = querySql.replace('{',' ');
            querySql = querySql.replace('}',' ');
            stm.executeUpdate(querySql);
            verify = true;
        }catch(Exception ex){
            verify= false;
            ex.printStackTrace();
        }finally{
            closeConnection(conn);
        }
        return verify;
    }
    /////////////////////////////////////////////////////////////
    public int totalComentarios(String clvarticulo)   
    { int total=0;
       
       
        try{      
            Connection conn = getConnection();
            Statement stm = conn.createStatement();
            String query="Select count(*) as total from mensajes where clvarticulo="+clvarticulo;
            ResultSet rst = stm.executeQuery(query);
            rst.next();
            total=rst.getInt("total");
              
        }catch(Exception ex){
            System.out.println("ERROR: "+ex);
             
        }finally{
            closeConnection(conn);
        }
        
      return total;   
    }
    /////////////////////////////////////////////////////////////
}