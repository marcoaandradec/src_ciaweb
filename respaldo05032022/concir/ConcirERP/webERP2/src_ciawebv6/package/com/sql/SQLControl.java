package com.sql;

public class SQLControl {

    public static String getBuscarCodPostal() {
        /* 14 */ return "Select cp From CtlCodigosPostales cp Where cp.cpsCodigoPostal=?1";
    }

    public static String obtenModulos() {
//     return "Select am,um," +
//                        "(Select ams.amsScript " +
//                        "From AdminModuloScript ams " +
//                        "Where ams.amsIdModulo=am.amIdModulo) " +
//                    "From AdminModulo am,AdminRolModulo um " +
//                    "WHERE am.amIdModulo = um.armIdAdminModulo " +
//                    "And um.armIdPuesto = ?1 Order By am.amOrden";
//        return "Select am,arm, "
//                + "(Select ams.amsScript "
//                + "From AdminModuloScript ams "
//                + "Where ams.amsIdModuloScript=am.amIdModulo) "
//                + "From AdminModulo am,AdminRolModulo arm "
//                + "WHERE am.amIdModulo = arm.armIdAdminModulo "
//                + "And arm.armIdPuesto = ?1 "
//                + "Order By am.amOrden ";
        return "Select am,arm,(Select ams.amsscript "
               +"From Liadminmoduloscript ams "
               +"Where ams.amsidmoduloscript=am.amidmodulo) "
               +"From Liadminmodulo am,Liadminrolmodulo arm "
               +"WHERE am.amidmodulo = arm.armidadminmodulo "
               +"And arm.armidpuesto = ?1 "
               +"Order By am.amorden";
    }

    public static String obtenAcciones() {
//        return "Select aa,"
//                + "(Select aas.aasScript "
//                + "From AdminAccionScript aas "
//                + "Where aas.aasIdAccion.aaIdAcciones = aa.aaIdAcciones) "
//                + "FROM AdminRolModuloAcciones arma, "
//                + "AdminModuloAcciones ama,"
//                + "AdminAcciones aa "
//                + "WHERE arma.armIdModuloAcciones.amaIdModuloAcciones = ama.amaIdModuloAcciones "
//                + "And ama.amaIdAcciones.aaIdAcciones = aa.aaIdAcciones "
//                + "And ama.amaIdModulo.amIdModulo = ?2 "
//                + "And arma.armIdPuesto = ?1 "
//                + "And aa.aaHabilitado=1 "
//                + "Order By aa.aaIdPadre,aa.aaOrden";
                return "Select aa,"
                + "(Select aas.aasscript "
                + "From Liadminaccionscript aas "
                + "Where aas.aasidaccion.aaidacciones = aa.aaidacciones) "
                + "FROM Liadminrolmoduloacciones arma, "
                + "Liadminmoduloacciones ama,"
                + "Liadminacciones aa "
                + "WHERE arma.armidmoduloacciones.amaidmoduloacciones = ama.amaidmoduloacciones "
                + "And ama.amaidacciones.aaidacciones = aa.aaidacciones "
                + "And aa.aaidacciones = 156 "
//                + "And arma.armidpuesto = ?1 "
//                + "And aa.aahabilitado=1 "
                + "Order By aa.aaidpadre,aa.aaorden";
    }

    public static String obtenActividades() {
        return "Select ca,"
                + "(Select aas.acsScript From AdminActividadScript aas Where aas.acsIdActividad.acIdActividadCampania=ac.acIdActividadCampania)"
                + " From AdminAccionesActividades aaa, CtlActividad ca, ActividadCampania ac "
                + " Where aaa.accIdActividades=ca.aIdActividad "
                + " And ca.aIdActividad=ac.acIdActividad.aIdActividad "
                + " And ca.aStatusActividad = 1 "
                + " And ca.aTipoPaciente <= ?1 "
                + " And ca.aTipoMostrar = ?2 "
                + " And aaa.accIdAcciones.aaIdAcciones = ?3 "
                + " And ac.acIdCampania.ccIdCampania = ?4 "
                + " And ac.acStatus.csIdStatus=1 "
                + " Order By ca.aIdPadre,ca.aOrden ";
    }

    public static String obtenProductosPaciente() {
//     return "Select cpm,cs,p " +
//                    "From ClieProdMedi cpm, ClienteStatus cs, Producto p " +
//                    "Where cpm.cpmIdClieProdMed = cs.csIdClieProdMed.cpmIdClieProdMed " +
//                    "And cs.csIdProducto.pIdProducto=p.pIdProducto " +
//                    "And cpm.cpmIdCliente.cIdCliente=?1 " +
//                    "And cs.csStatus = 1";
        return "Select cs "
                + "From ClienteStatus cs "
                + "Where cs.csIdCliente.cIdCliente = ?1 "
                + "And cs.csStatus = 1";
    }
}