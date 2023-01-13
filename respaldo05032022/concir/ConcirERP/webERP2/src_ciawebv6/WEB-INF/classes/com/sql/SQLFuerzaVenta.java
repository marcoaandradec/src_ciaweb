package com.sql;

public class SQLFuerzaVenta {

    public static String BuscarFuerzaDeVentas(String strIdfdv) {
        return "Select m From FuerzaDeVentas m Where  m.fdvNombre Like ?1"
                + "  And m.fdvApellidoPaterno Like ?2"
                + "  And m.fdvApellidoMaterno Like ?3 "
                + "  And m.fdvCiudad Like ?4 " + strIdfdv 
                + "  And m.fdvIdStatus.csIdStatus=1"
                + " Order By m.fdvNombre,m.fdvApellidoPaterno,m.fdvApellidoMaterno";
    }

    public static String getCorreoElectronico() {
        return "Select f From FuerzaDeVentas f Where f.fdvEmail = ?1";
    }

    public static String getNoEmpleado() {
        return "Select f From FuerzaDeVentas f Where f.fdvNoEmpleado = ?1";
    }
}