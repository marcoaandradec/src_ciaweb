package com.sql;

import java.text.SimpleDateFormat;
import java.util.Date;

public class SQLCliente {

    public static String BuscarPacientes(int folio, String nombre, String apaterno, String amaterno, String telCasa, Date fecha, String estado, String med, String tabs, String tabW) {
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        String and = "", order = " Order By c.cNombre,c.cApellidoPaterno,c.cApellidoMaterno";
        String fech = fmt.format(fecha);
        String hayFolio = (folio == 0 ? "" : "And c.cIdCliente = " + folio + " ");
        String hayFecha = (fech.equals("2200-01-01") ? "" : "And c.cFechaNacimiento='" + fech + "' ");
        String cd = "''", cd2 = "", cdEstado = "";
        String stnombre = "";
        String stapaterno = "";
        String stamaterno = "";
        String sttelCasa = "";

        if (!estado.trim().equals("'%%'")) {
            cd = "cd ";
            cd2 = ", ClienteDireccion cd ";
            cdEstado = " And c.cIdDireccion=cd.cdIdDirCliente AND cd.cdStatus='Paciente' And cd.cdEstado Like '%" + estado.replaceAll("%", "").replaceAll("'", "") + "%' ";
        }
        if (!med.equals(",'' ") && !med.equals("")) {
            and = "  ";
            order = " Order By m.mNombre,m.mApellidoPaterno,m.mApellidoMaterno,c.cNombre,c.cApellidoPaterno,c.cApellidoMaterno";
        }

        if (nombre.replaceAll("%", "").replaceAll("'", "").trim().length() > 0) {
            stnombre = " and c.cNombre like '%" + nombre.replaceAll("%", "").replaceAll("'", "") + "%' ";
        }
        if (apaterno.replaceAll("%", "").replaceAll("'", "").trim().length() > 0) {
            stapaterno = " and c.cApellidoPaterno like '%" + apaterno.replaceAll("%", "").replaceAll("'", "") + "%' ";
        }
        if (amaterno.replaceAll("%", "").replaceAll("'", "").trim().length() > 0) {
            stamaterno = " and c.cApellidoMaterno like '%" + amaterno.replaceAll("%", "").replaceAll("'", "") + "%' ";
        }
        if (telCasa.replaceAll("%", "").replaceAll("'", "").trim().length() > 0) {
            sttelCasa = " and c.cTelCasa like '%" + telCasa.replaceAll("%", "").replaceAll("'", "") + "%' ";
        }


        return "Select c," + cd + med + " "
                + " From Cliente c " + cd2 + tabs
                + " Where c.cStatus in (1,2,3,4,5) " + tabW + and
                + stnombre
                + stapaterno
                + stamaterno
                + sttelCasa
                + hayFolio
                + hayFecha
                + cdEstado
                + order;
    }

    public static String BuscarFacturas(String fecha, String tipoCliente, String estatus, int idEmpresa) {
        return "select le.embestatus,le.embtiporechazo,le.embref,le.embenvio,le.embcliente,lc.clinombre,lp.pobclave,lp.pobnombre,le.embcajas,le.embvalor "
                + " ,le.embfechafac,le.embfecharec,le.embfechaprog,le.embfecembarque,le.embfecentrega,le.embcoms "
                + " from liembarques le,liclientes lc,lipoblaciones lp "
                + " where (lp.pobclave=le.embpoblacion) and (lc.clinumero=le.embcliente and lc.cliempresa=le.embempresa)  "
                + fecha
                + tipoCliente
                + estatus
                + " and le.embempresa=" + idEmpresa
                + "  order by le.embref";
    }

    public static String BuscarBitacoraPaciente() {
        return "Select c From ClienteBitacora c Where c.cbiIdPadre=0 and c.cbiIdCliente.cIdCliente=?1 Order By c.cbiFechaActividad desc,c.cbiIdClienteBitacora desc";
    }

    public static String BuscarBitacoraPacienteCompleta() {
        return "Select c From ClienteBitacora c  Where c.cbiIdCliente.cIdCliente=?1 Order By c.cbiFechaActividad desc,c.cbiIdClienteBitacora desc";
    }

    public static String BuscarPacienteProducto_Receta() {
        return "SELECT "
                + "  (select p.pNombreProducto from Producto p where p.pIdProducto=cs.csIdProducto),"
                + "  (select (m.mNombre || ' ' || m.mApellidoPaterno) from Medico m where m.mIdMedico=cs.csIdMedico.mIdMedico),"
                + "  cs.csFechaVencimiento,"
                + "  (select MAX(rm.rmIdReceta) from RecetaMedica rm where rm.rmIdCliente=cs.csIdCliente.cIdCliente AND rm.rmIdProductoFamilia=cs.csIdProducto.pIdProductoFamilia AND rm.rmActiva=1 AND rm.rmVencido=0 AND rm.rmStatusBaja=1 ),"
                + "  cs.csIdProducto.pIdProducto"
                + " FROM ClienteStatus cs"
                + " WHERE cs.csStatus=1"
                + " AND cs.csIdCliente.cIdCliente=?1";
    }

    public static String BuscarRecetas() {
        return "SELECT r FROM RecetaMedica r WHERE r.rmActiva=true AND r.rmVencido=false AND r.rmIdCliente.cIdCliente=?1 and r.rmStatusBaja=1 Order by r.rmFechaAlta desc";
    }

    public static String DetalleBitacoraPaciente() {
        /*     return "Select c,a,p,u,o " +
        "From ClienteBitacora c, CtlActividad a, Producto p, Usuario u, CtlOrigen o  " +
        "Where c.cbiIdActividad.aIdActividad=a.aIdActividad " +
        "and c.cbiIdProducto.pIdProducto=p.pIdProducto " +
        "and c.cbiIdUsuarioGenera.uIdUsuario=u.uIdUsuario  " +
        "and c.cbiIdOrigen.oIdOrigen=o.oIdOrigen " +
        "and c.cbiIdClienteBitacora=?1";
         */
        return "Select c From ClienteBitacora c Where c.cbiIdClienteBitacora=?1";
    }

    public static String datosPacientes() {
        return "Select c,cd From Cliente c,ClienteDireccion cd Where c.cIdDireccion=cd.cdIdDirCliente and c.cIdCliente=?1 AND cd.cdStatus='Paciente' ";
    }

    public static String direccionContacto() {
        return "Select cd From ClienteDireccion cd Where cd.cdIdCliente.cIdCliente=?1 AND cd.cdStatus='Contacto'";
    }

    public static String getBuscarCodPostal() {
        /* 130 */ return "Select cp From Lictlcodigospostales cp Where cp.cpscodigopostal=?1";
    }

    public static String getNotasAnteriores() {
        return "Select c "
                + "From ClienteBitacora c "
                + "Where c.cbiIdCliente.cIdCliente = ?1 "
                + "and c.cbiIdPadre=0 "
                + "Order by c.cbiFechaActividad desc";
    }

    public static String getProductosPaciente() {
        /*        return "Select p,s " +
        "From ClieProdMedi p, ClienteStatus s " +
        "Where p.cpmIdClieProdMed = s.csIdClieProdMed.cpmIdClieProdMed " +
        "and p.cpmIdCliente.cIdCliente=?1 " +
        "order by s.csIdStatusCliente asc";*/
        return "Select s "
                + "From ClienteStatus s "
                + "Where s.csIdCliente.cIdCliente=?1 "
                + "order by s.csIdStatusCliente asc";
    }

    public static String getProductos() {
        return "Select s From ClienteStatus s Where"
                + " s.csIdCliente.cIdCliente=?1"
                + " and s.csMostrar=true"
                + " and s.csStatus=1";
    }

    public static String getClienteProductos() {
        return "Select s From ClienteStatus s "
                + "Where s.csIdCliente.cIdCliente=?1 "
                + "and s.csStatus=1";
    }

    public static String getPacientesDuplicados(String strNombre, String strApaterno, String strAmaterno, String strTel) {
        return "select c, cd.cdColonia, cd.cdCalle "
                + "from Cliente c, ClienteDireccion cd "
                + "WHERE  ((c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cTelCasa = '" + strTel + "') OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1 and c.cTelCasa = '" + strTel + "') OR " + "(c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1 and c.cTelCasa = '" + strTel + "') OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%') OR " + "(c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1)OR " + "(c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cTelCasa = '" + strTel + "') OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strApaterno + "%' and c.cFechaNacimiento =?1 and c.cTelCasa = '" + strTel + "')OR " + "(c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1 and c.cTelCasa = '" + strTel + "')OR " + "(c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1 and c.cTelCasa = '" + strTel + "')) " + "AND c.cIdDireccion=cd.cdIdDirCliente ";
    }

    public static String BuscarRecetasXProducto() {
        /* return "SELECT r " +
        "FROM ClienteStatus cs, ClieProdMedi cp, Producto p,RecetaMedica r " +
        "WHERE cp.cpmIdFamilia.pfaIdProductoFamilia=r.rmIdProductoFamilia.pfaIdProductoFamilia  " +
        "and cs.csIdCliente.cIdCliente=r.rmIdCliente.cIdCliente  " +
        "and cs.csStatus=1 and r.rmStatus='Activa'  " +
        "AND cs.csIdProducto.pIdProducto=p.pIdProducto " +
        "AND cs.csIdClieProdMed.cpmIdClieProdMed=cp.cpmIdClieProdMed " +
        "AND cs.csIdCliente.cIdCliente=?1 and cs.csIdProducto.pIdProducto=?2 " +
        "and r.rmStatusBaja=1 Order by r.rmIdReceta desc";*/
        return "SELECT r "
                + "FROM ClienteStatus cs, Producto p,RecetaMedica r "
                + "WHERE p.pIdProductoFamilia.pfaIdProductoFamilia = r.rmIdProductoFamilia.pfaIdProductoFamilia "
                + "and cs.csIdCliente.cIdCliente=r.rmIdCliente.cIdCliente  "
                + "and cs.csStatus=1 and r.rmStatus='Activa'  "
                + "AND cs.csIdProducto.pIdProducto=p.pIdProducto "
                + "AND cs.csIdCliente.cIdCliente=?1 and cs.csIdProducto.pIdProducto=?2 "
                + "and r.rmStatusBaja=1 Order by r.rmIdReceta desc";
    }

    public static String BuscarBitacoraCount() {
        return "Select count(c.cbiIdCliente)AS Contactos "
                + "From ClienteBitacora c "
                + "Where c.cbiIdCliente.cIdCliente=?1 "
                + "and c.cbiIdPadre=0";
    }

    public static String getMedicoProspecto() {
        /*      return "Select m " +
        "From ClieProdMedi p,Medico m " +
        "Where p.cpmIdMedico.mIdMedico=m.mIdMedico " +
        "and p.cpmIdCliente.cIdCliente=?1";*/
        return "Select cs "
                + "From ClienteStatus cs"
                + "Where cs.csIdCliente.cIdCliente = ?1";
    }

    public static String modificarMedicoProspecto() {
        /* 189  return "SELECT cs FROM ClieProdMedi cs " +
        "WHERE cs.cpmIdCliente.cIdCliente=?1";*/
        return "SELECT cs FROM ClienteStatus cs "
                + "WHERE cs.csIdCliente.cIdCliente = ?1";
    }

    public static String modificarStatusProductoProspecto() {
        /* 193 */ return "SELECT cs FROM ClienteStatus cs WHERE cs.csStatus=1 AND cs.csIdCliente.cIdCliente=?1";
    }

    public static String datosCliente() {
        return "Select c,'' From Cliente c Where c.cIdCliente=?1";
    }

    public static String getProductoContacto() {
        /* 203 */ return "";
    }

    public static String getCorreoElectronicoUsuarioWeb() {
        /* 210 */ return "Select c From Cliente c "
                + "Where c.cUsuarioWeb = ?1";
    }

    public static String getCorreoElectronico() {
        /* 214 */ return "Select c From Cliente c Where c.cCorreoElectronico = ?1";
    }

    public static String getCorreoElectronicoYCorreoElectronicoUsuarioWeb() {
        /* 218 */ return "Select c From Cliente c Where c.cCorreoElectronico = ?1 or c.cUsuarioWeb = ?1";
    }

    public static String getDuplicados(String strNombre, String strApaterno, String strAmaterno) {
        /* 223 */ return "select c from Cliente c WHERE ( (c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%') OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno = '" + strAmaterno + "') OR " + "(c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cApellidoPaterno like '%" + strApaterno + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cNombre like '%" + strNombre + "%' and c.cFechaNacimiento =?1) OR " + "(c.cApellidoPaterno like '%" + strApaterno + "%' and c.cFechaNacimiento =?1) OR " + "(c.cApellidoMaterno like '%" + strAmaterno + "%' and c.cFechaNacimiento =?1) " + ") Order by c.cNombre,c.cApellidoPaterno,c.cApellidoMaterno";
    }

    public static String getProductosSin1() {
        /* 239 */ return "Select s From ClienteStatus s Where s.csIdCliente.cIdCliente=?1 and s.csMostrar=true and s.csStatus=1 and s.csIdProducto.pIdProducto<>1";
    }

    public static String getProductosMedicoClientes(int cnt) {
        return "Select s  From  ClienteStatus s  Where s.csIdProducto.pIdProducto<>1 and s.csIdCliente.cIdCliente=" + cnt
                + " order by s.csIdStatusCliente asc";
    }

    public static String BuscarPacienteAvanzada(int folio, Date fecha, String cd, String cd2, String cdwhere, String cdBwhere2, String med, String tabs, String tabW) {
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        String and = "", and2 = "", order = " Order By c.cNombre,c.cApellidoPaterno,c.cApellidoMaterno";
        String fech = fmt.format(fecha);
        String hayFolio = (folio == 0 ? "" : "And c.cIdCliente = " + folio + " ");
        String hayFecha = (fech.equals("2200-01-01") ? "" : "And c.cFechaNacimiento='" + fech + "' ");

        if (!cd.equals(",'' ") && !cd.equals("")) {
            and = " And ";
        }
        if (!med.equals(",'' ") && !med.equals("")) {
            and2 = " And ";
            order = " Order By m.mNombre,m.mApellidoPaterno,m.mApellidoMaterno,c.cNombre,c.cApellidoPaterno,c.cApellidoMaterno";
        }

        return "Select c" + cd + med + " From Cliente c " + cd2 + tabs
                + "Where " + cdwhere + and + tabW + and2
                + " c.cNombre Like ?1 "
                + " AND c.cApellidoPaterno Like ?2 AND c.cApellidoMaterno Like ?3 "
                + " AND c.cTelCasa Like ?4 AND c.cCorreoElectronico Like ?5 "
                + " AND c.cTelOficina Like ?6 AND c.cCelular Like ?7"
                + " AND c.cStatus in (1,2,4,5) "
                + hayFolio
                + hayFecha
                + cdBwhere2
                + order;
    }
}
