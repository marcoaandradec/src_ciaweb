 /*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sql;

import java.util.List;

/**
 *
 * @author marco
 */
public class SQLCombo {

    public static String obtenComboEdo() {
        return "Select e.cpsestado From Lictlcodigospostales e Group by e.cpsestado Order by e.cpsestado asc";
    }

    public static String obtenComboDelMun() {
        return "Select e.cpsmunicipio From Lictlcodigospostales e Where e.cpsestado = ?1 GROUP BY e.cpsmunicipio Order by e.cpsmunicipio asc";
    }

    public static String obtenComboColonia() {
        return "Select e.cpscolonia From Lictlcodigospostales e Where e.cpsestado = ?1 And e.cpsmunicipio = ?2 GROUP BY e.cpscolonia Order by e.cpscolonia asc";
    }

    public static String obtenComboCP() {
        return "Select e.cpscodigopostal From Lictlcodigospostales e Where e.cpsestado = ?1 And e.cpsmunicipio = ?2 And e.cpscolonia = ?3 GROUP BY e.cpscodigopostal";
    }

    public static String obtenComboEstadoCivil() {
        return "SELECT op.coidcomboopcion,op.conombrecomboopc FROM Licomboopciones op WHERE op.coidcombo=3 AND op.cohabilitado=1  ORDER BY op.coorden asc";
    }

    public static String obtenStatusCliente() {
        return "SELECT sc.csIdStatus,sc.csNombreStatus FROM CtlStatus sc";
    }
   
    public static String obtenNombreCombo() {
        return "SELECT c.ccidcombo, c.ccNombreCombo FROM CtlCombo c";
    }



    public static String obtenAreasAtencion() {
        return "Select aa.caaidareaatencion,aa.caanombrearea From Lictlareasatencion aa Where aa.caahabilitado = 1";
    }

    public static String obtenPuntosContacto() {
        return "Select co.oidorigen,co.onombreorigen From Lictlorigen co Where co.oidareaatencion.caaidareaatencion = ?1 And co.ohabilitado = 1";
    }

    public static String obtenPuestos() {
        return "Select up.upidpuesto,up.upnombrepuesto From Lipuestoorigen po, Liusuariopuesto up "
                + "Where po.poidpuesto.upidpuesto=up.upidpuesto "
                + "And po.poidorigen.oidorigen = ?1 "
                + "And up.uphabilitado = 1";
    }

    public static String obtenFrecuenciaGlucosa() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=30 order by o.coorden asc";
    }

    public static String obtenComboTipoEstudioGlucometria() {
        return "SELECT op.coidcomboopcion, op.conombrecomboopc FROM Licomboopciones op WHERE op.coidcombo=31 AND op.cohabilitado=1 ORDER BY op.coorden asc";
    }



    public static String obtenComboTemasTalleres() {
        return "select a.aIdActividad,a.aNombreActividad from CtlActividad a"
                + " where a.aIdTipoActividad.atiIdTipoActividad=6 ORDER BY a.aNombreActividad asc";
    }

    public static String getCombotipoConsumo() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=32 order by o.coorden asc";
    }

    public static String getComboCantidadDosis() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=33 order by o.coorden asc";
    }

    public static String getComboNumeroTickets() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=34 order by o.coorden asc";
    }

    public static String getComboTipoMovimiento() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=35 order by o.coorden asc";
    }

    public static String getComboCasas() {
        return "Select o.oIdOrigen, o.oNombreOrigen " +
                "from CtlOrigen o " +
                "where o.oIdAreaAtencion.caaIdAreaAtencion=2";
    }



    public static String obtenProductoFamiliaNo(List lista) {
        String consulta = "Select f.pfaIdProductoFamilia, f.pfaNombreFamilia From ProductoFamilia f where f.pfaIdProductoFamilia not in (1) and ";
        for (int i = 0; i < lista.size(); i++) {
            consulta += "f.pfaIdProductoFamilia <> " + lista.get(i) + " and ";
        }
        consulta = consulta.substring(0, consulta.length() - 4);
        return consulta;
    }

    public static String obtenComboProductoNo(List lista) {
        String consulta = "Select p.pIdProducto, CONCAT(p.pNombreProducto,' Dosis:',p.pDosis,' Present:',p.pPresentacion) " +
                "From Producto p " +
                "Where p.pIdProductoFamilia.pfaIdProductoFamilia=?1 and p.pStatus = 'Activo' and ";
        for (int i = 0; i < lista.size(); i++) {
            consulta += "p.pIdProducto <> " + lista.get(i) + " and ";
        }
        consulta = consulta.substring(0, consulta.length() - 4);
        return consulta;
    }

    public static String obtenPuntoAtencion() {
        return "Select co.oIdOrigen,co.oNombreOrigen From CtlOrigen co Where co.oIdAreaAtencion.caaIdAreaAtencion = ?1 And co.oHabilitado = True";
    }



    public static String obtenComboTiempoMedicamento() {
        return "Select o.coidcomboopcion, o.conombrecomboopc from Licomboopciones o where o.coidcombo.ccidcombo=37 order by o.coorden asc";
    }

    public static String obtenComboStatusEnvio() {
        return "SELECT es.esIdEnvioStatus, es.esNombre FROM EnvioStatus es WHERE es.esStatus='Activo' Order by es.esOrden asc";
    }

    public static String obtenStatusCitas() {
        return "Select acs.aasIdCatStatus,acs.aasNombreStatus From AgendaCategoriaStatus acs Where acs.assStatus = 1";
    }

    public static String obtenOrigenGeneral() {
        return "Select co.oIdOrigen,co.oNombreOrigen From CtlOrigen co Where co.oHabilitado = True order by co.oNombreOrigen";
    }
     public static String obtenOrigenGeneralyPaciente() {
        return "Select co.oIdOrigen,co.oNombreOrigen From CtlOrigen co Where co.oHabilitado = True or co.oIdOrigen=34 order by co.oNombreOrigen";
    }

    public static String obtenComboMovimientosEnvio() {
        return "SELECT op.coidcomboopcion,op.conombrecomboopc FROM Licomboopciones op WHERE op.coidcombo=38 AND op.cohabilitado=1  ORDER BY op.coorden asc";
    }

    public static String obtenDestinos() {
        return "Select o.oIdOrigen, o.oNombreOrigen From CtlOrigen o where o.oIdAreaAtencion.caaIdAreaAtencion = 2 or o.oIdAreaAtencion.caaIdAreaAtencion = 5";
    }

    public static String obtenComboTipoProductosMateriales() {
        return "Select pm.pmtIdProductosMaterialesTipo,pm.pmtDescripcion From ProductosMaterialesTipo pm ORDER BY pm.pmtDescripcion asc";
    }

    public static String obtenUsuariosPntCnt() {
        return "Select u.uIdUsuario,u.uNombre "
                + "From Usuario u "
                + "Where u.uIdOrigen.oIdOrigen = ?1 And u.uHabilitado = True";
    }

    public static String obtenTipoTelContacto() {
        return "SELECT op.coidcomboopcion,op.conombrecomboopc "
                + "FROM Licomboopciones op "
                + "WHERE op.coidcombo=7 "
                + "      AND op.cohabilitado=1  "
                + "ORDER BY op.coorden asc";
    }

    public static String getTipoEnvio() {
        return "Select et.etIdEnvioTipo, et.etNombre From EnvioTipo et Where et.etIdEnvioTipo <> 3";
    }

    public static String getMensajeria() {
         return "Select m.mIdMensajeria, m.mNombreMensajeria " +
               "From Mensajeria m " +
               "Where m.mIdMensajeria <> 7 " +
               "    And m.mIdEnvioTipo.etIdEnvioTipo = ?1 " +
               "    And m.mActivo = true " +
               "Order by m.mOrden asc";
    }

    public static String obtenComboMedicamentosDiabeticosYOtros() {
        return "select p.pfaIdProductoFamilia,p.pfaNombreFamilia from ProductoFamilia p where p.pfaIdProductoFranquicia.cpfIdProductoFranquicia=4 and p.pfaNombreFamilia<>'Optipen' "
                + " and p.pfaNombreFamilia<>'Autopen' or p.pfaNombreFamilia='Otros' Group by p.pfaIdProductoFamilia,p.pfaNombreFamilia ORDER BY p.pfaIdProductoFamilia,p.pfaNombreFamilia asc";
    }

    public static String getTemasExtJS() {
        return "SELECT op.conombrecomboopc,op.conombrecomboopc FROM Licomboopciones op WHERE op.coidcombo = 41 AND op.cohabilitado = 1 ORDER BY op.coorden asc";
    }

    public static String getActividadTipo(){
        return "SELECT atiIdTipoActividad,atiNombreTipo FROM ActividadTipo";
    }

    public static String getActividad(){
        return "SELECT aIdActividad,aNombreActividad FROM CtlActividad WHERE aIdActividad=?1 ORDER BY aNombreActividad";
    }
    /*CONSULTA QUE OBTIENE FRANQUICIAS*/
    public static String obtenerProductoFranquicia(){
    return "SELECT cpfIdProductoFranquicia,cpfNombreFranquicia FROM CtlProductoFranquicia ORDER BY cpfNombreFranquicia";
    }
    /*CONSULTA QUE OBTIENE PRODUCTOS DE LA FAMILIA*/
    public static String ObtenerProductoFamilia(){
    return "SELECT PF.pfaIdProductoFamilia,PF.pfaNombreFamilia FROM ProductoFamilia PF,CtlProductoFranquicia PFR WHERE PFR.cpfIdProductoFranquicia=PF.pfaIdProductoFranquicia AND PFR.cpfIdProductoFranquicia=?1 AND PF.pfaIdProductoFamilia not in(1) ORDER BY PF.pfaNombreFamilia";
    }
    /*METODO QUE OBTIENE PRODUCTOS*/
    public static String obtenerproductos(){
    return "SELECT P.pIdProducto,P.pNombreProducto FROM ProductoFamilia PF,Producto P WHERE PF.pfaIdProductoFamilia=P.pIdProductoFamilia AND PF.pfaIdProductoFamilia=?1 AND PF.pfaIdProductoFamilia<>1 ORDER BY P.pNombreProducto";
    }
    public static String getStatusCASAS(){
        return "SELECT es.esIdEnvioStatus, es.esNombre FROM EnvioStatus es WHERE es.esStatus='Activo' and es.esIdEnvioStatus in (7,16)";
    }
    public static String ObtenerAreasAtencion(){
        return "SELECT caaIdAreaAtencion,caaNombreArea FROM CtlAreasAtencion WHERE caaHabilitado=1 order by caaNombreArea" ;
    }
    
    public static String ObtenerOrigen(){
        return "SELECT O.oIdOrigen,O.oNombreOrigen FROM CtlAreasAtencion AAT,CtlOrigen O WHERE O.oHabilitado=1 AND O.oIdAreaAtencion=AAT.caaIdAreaAtencion AND AAT.caaIdAreaAtencion=?1";
    }

    public static String ObtenerActividad(){
        return "SELECT atiIdTipoActividad,atiNombreTipo FROM ActividadTipo ORDER BY atiNombreTipo";
    }

    public static String ObtenerActividadtipo(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM ActividadTipo AT,CtlActividad CA WHERE AT.atiIdTipoActividad=CA.aIdTipoActividad AND AT.atiIdTipoActividad=?1 ORDER BY CA.aNombreActividad";
    }

    public static String getDispositivos(){
        return "Select p.pIdProducto, p.pNombreProducto From Producto p Where p.pIdProductoUnidad.punIdProductoUnidad = 16 And p.pStatus = 'Activo'";
    }

    public static String getCoberturas(){
        return "Select co.coidcomboopcion, co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 42";
    }

    public static String ObtnerUsuarios(){
        return "select U.uIdUsuario,(U.uNombre+' '+U.uApellidoPaterno+' '+U.uApellidoMaterno) from Usuario  u, CtlOrigen  CTO WHERE U.uIdOrigen=CTO.oIdOrigen and CTO.oIdOrigen=?1 and U.uNombre IS NOT NULL AND U.uApellidoPaterno <> 'Vacante' AND U.uHabilitado = 1 ";
    }

    public static String ObtenerAsesoriasNuticionales(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM CtlActividad CA WHERE CA.aIdActividad=5 or CA.aIdActividad=6 ORDER BY CA.aNombreActividad";
    }

    public static String ObtenerEncuestaCalidadP134(){
        return "Select co.coidcomboopcion, co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 43 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerEncuestaCalidadP2(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 44 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerEncuestaCalidadMedicamentoEntregado(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 45 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerEncuestaCalidadBonificacionProductoCompra(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where (co.coidcombo.ccidcombo = 12 AND co.cohabilitado = 1) or (co.coidcombo.ccidcombo = 48 AND co.cohabilitado = 1) ORDER BY co.coorden asc";
    }

    public static String ObtenerEncuestaCalidadEmpaqueCondicionesMedicamento(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 47 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerEncuestaCalidadSolicitoCanje(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 46 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerComboUroflujometria(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 49 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }
    public static String obtenerFamiliaDiab(){
        return "SELECT PF.pfaIdProductoFamilia,PF.pfaNombreFamilia FROM ProductoFamilia PF WHERE PF.pfaIdProductoFamilia in(50,31) ORDER BY PF.pfaNombreFamilia";
    }
    public static String obtnerTipoclienteActividad(){
        return "SELECT cctIdClienteTipo,cctNombreTipo FROM CtlClienteTipo WHERE cctIdClienteTipo IN(1,2)";
    }

    public static String obtnerTipoArchivo(){
        return "SELECT c.coidcomboopcion, c.conombrecomboopc FROM Licomboopciones c WHERE c.coidcombo.ccidcombo=40";
    }

    public static String ObtenerActividadesNutriologasCampo(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM CtlActividad CA WHERE CA.aIdTipoActividad.atiIdTipoActividad=7 or CA.aIdActividad=161 ORDER BY CA.aOrden";
    }

    public static String ObtenerActividadesCapacitacion(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM CtlActividad CA WHERE CA.aIdTipoActividad.atiIdTipoActividad=8 ORDER BY CA.aOrden";
    }

    public static String ObtenerActividadesReCapacitacion(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM CtlActividad CA WHERE CA.aIdTipoActividad.atiIdTipoActividad=8 ORDER BY CA.aOrden";
    }

    public static String ObtenerCambioDispositivo(){
        return "Select co.coidcomboopcion,co.conombrecomboopc From Licomboopciones co where co.coidcombo.ccidcombo = 50 AND co.cohabilitado = 1 ORDER BY co.coorden asc";
    }

    public static String ObtenerTipoVisitas(){
        return "SELECT CA.aIdActividad,CA.aNombreActividad FROM CtlActividad CA WHERE CA.aIdActividad=161 or CA.aIdActividad=200 ORDER BY CA.aNombreActividad";
    }
    /*CONSULTA QUE OBTIENE PRODUCTOS DE LA FAMILIA SIN PEDIR NINGUN PARAMETRO*/
    public static String ObtenerFamilia(){
        return "SELECT PF.pfaIdProductoFamilia,PF.pfaNombreFamilia FROM ProductoFamilia PF WHERE PF.pfaIdProductoFamilia NOT IN(1) GROUP BY PF.pfaIdProductoFamilia,PF.pfaNombreFamilia ORDER BY PF.pfaNombreFamilia";
    }
    public static String ObtenerAreasAtencionRPA(){
        return "SELECT caaIdAreaAtencion,caaNombreArea FROM CtlAreasAtencion WHERE caaHabilitado=1 and caaIdAreaAtencion not in(10,5) order by caaNombreArea";
    }
    public static String ObtenerProductoFamiliaReXPr(){
        return "SELECT PF.pfaIdProductoFamilia,PF.pfaNombreFamilia FROM ProductoFamilia PF,CtlProductoFranquicia PFR WHERE PFR.cpfIdProductoFranquicia=PF.pfaIdProductoFranquicia AND PFR.cpfIdProductoFranquicia=?1 AND PF.pfaIdProductoFamilia not in(1,68,66) ORDER BY PF.pfaNombreFamilia";
    }
    public static String getActividadesNC(String tipo){
        return "Select a.aIdActividad, a.aNombreActividad from CtlActividad a where a.aTipoActividadNc = '" + tipo + "' order by a.aNombreActividad asc";
    }
   public static String ObtenerAreasAtencionRPAActporPunAt(){
    return "SELECT caaIdAreaAtencion,caaNombreArea FROM CtlAreasAtencion WHERE caaHabilitado=1 and caaIdAreaAtencion not in(10,5,11,9) order by caaNombreArea";
    }
    public static String ObtenerOrigenActporPunAt(){
        return "SELECT O.oIdOrigen,O.oNombreOrigen FROM CtlAreasAtencion AAT,CtlOrigen O WHERE O.oHabilitado=1 AND O.oIdAreaAtencion=AAT.caaIdAreaAtencion AND O.oIdOrigen NOT IN (20,21) AND AAT.caaIdAreaAtencion=?1";
    }
    public static String ObtenerTipoCliente(){
    return "select t.tclclave,t.tcldescripcion from Litipocliente t order by t.tcldescripcion";
    }
    public static String ObtenerAlmacenCIA(){
    return "select la.almclave,la.almnombre from Lialmacenes la where la.almestatus=1 order by la.almclave";
    }
    public static String obtEstEmbarque(){
    return "select les.leecvestatus,les.leenomestatus from Liestatusembarque les where les.leehabilitado=1";
    }
}
