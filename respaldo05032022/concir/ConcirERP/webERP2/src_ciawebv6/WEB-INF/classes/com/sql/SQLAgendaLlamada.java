/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sql;

/**
 *
 * @author David
 */
public class SQLAgendaLlamada {

    String sqlAgendaLlamadas = "";

    public String sqlAgendaLlamadas(int valor) {
        return this.sqlAgendaLlamadas = "SELECT ld_id_llamada_detalle, le_nombre_esquema," +
                "lp_nombre_protocolo,c_nombre,c_tel_casa,c_celular,c_tel_oficina ,c_ext_oficina," +
                "fecha_llamada ,fecha_previa ,fecha_vencimiento ,llp_nombre_prioridad," +
                " lt_nombre_tipo, ld_comentarios, lt_valor, lp_valor, lp_script_protocolo, " +
                "c_id_cliente, horario " +
                "FROM viewLlamadaAgenda " +
                "WHERE lp_valor=" + valor + " and c_status=1  order by ld_total_intento";
//        return this.sqlAgendaLlamadas = "SELECT ld_id_llamada_detalle, le_nombre_esquema,lp_nombre_protocolo,c_nombre,c_tel_casa,c_celular,c_tel_oficina ,c_ext_oficina,fecha_llamada ,fecha_previa ,fecha_vencimiento ,llp_nombre_prioridad, lt_nombre_tipo, ld_comentarios, lt_valor, lp_valor, lp_script_protocolo, c_id_cliente, horario FROM viewLlamadaAgenda WHERE lp_valor=" + valor + " and lt_valor in (15, 10, 7, 6, 12) and c_status=1  order by ld_total_intento";
    }

    public String sqlControlLlamadas(int valor, String status) {
        return this.sqlAgendaLlamadas = "SELECT TOP 1 ld_id_llamada_detalle, le_nombre_esquema,lp_nombre_protocolo,c_nombre,c_tel_casa,c_celular,c_tel_oficina ,c_ext_oficina,fecha_llamada ,fecha_previa ,fecha_vencimiento ,llp_nombre_prioridad, lt_nombre_tipo, ld_comentarios, lt_valor, lp_valor, lp_script_protocolo, c_id_cliente, horario, p_nombre_producto FROM ViewLlamadaAgendaProducto WHERE lp_valor=" + valor + " and lt_valor in (" + status + ") and horario='00:00' and c_status=1 order by ld_total_intento";
    }

    public String sqlControlLlamadasHora(int valor, String status) {
        return this.sqlAgendaLlamadas = "SELECT TOP 1 ld_id_llamada_detalle, le_nombre_esquema,lp_nombre_protocolo,c_nombre,c_tel_casa,c_celular,c_tel_oficina ,c_ext_oficina,fecha_llamada ,fecha_previa ,fecha_vencimiento ,llp_nombre_prioridad, lt_nombre_tipo, ld_comentarios, lt_valor, lp_valor, lp_script_protocolo, c_id_cliente, horario, p_nombre_producto FROM ViewLlamadaAgendaProducto WHERE lp_valor=" + valor + " and lt_valor in (" + status + ") and horario=CAST(DATEPART (hh, GETDATE()) as varchar)+':00' and c_status=1 order by ld_total_intento";
    }

    public String sqlLlamada(int idLlamada) {
        return this.sqlAgendaLlamadas = "SELECT ld_id_llamada_detalle, le_nombre_esquema,lp_nombre_protocolo,c_nombre,c_tel_casa,c_celular,c_tel_oficina ,c_ext_oficina,fecha_llamada ,fecha_previa ,fecha_vencimiento ,llp_nombre_prioridad, lt_nombre_tipo, ld_comentarios, lt_valor, lp_valor, lp_script_protocolo, c_id_cliente, horario, p_nombre_producto FROM ViewLlamadaAgendaProducto WHERE ld_id_llamada_detalle=" + idLlamada + " and c_status=1 order by ld_total_intento";
    }

    public String sqlProtocolos() {
        return this.sqlAgendaLlamadas = "SELECT lp_valor, lp_nombre_protocolo FROM llamada_protocolo";
    }

    public String sqlLlamadaTotal(int valor) {
        return this.sqlAgendaLlamadas = "SELECT COUNT(ld_id_llamada_detalle) AS LLAMADA_TOTAL  FROM viewLlamadaAgenda WHERE c_status=1 and lp_valor=" + valor;
    }

    public String sqlLlamadaNoExitosa(int valor) {
        return this.sqlAgendaLlamadas = "SELECT COUNT(ld_id_llamada_detalle) AS LLAMADA_NO_EXITOSAS  FROM viewLlamadaAgenda WHERE c_status=1 and lp_valor=" + valor + " and lt_valor in (1,3,4,5,8,9,13) ";
    }

    public String sqlLlamadaExitosa(int valor) {
        return this.sqlAgendaLlamadas = "SELECT COUNT(ld_id_llamada_detalle) AS LLAMADA_EXITOSAS  FROM viewLlamadaAgenda WHERE c_status=1 and lp_valor=" + valor + " and lt_valor in (2, 11)";
    }

    public String sqlLlamadaPendientes(int valor) {
        return this.sqlAgendaLlamadas = "SELECT COUNT(ld_id_llamada_detalle) AS LLAMADA_PENDIENTES  FROM viewLlamadaAgenda WHERE c_status=1 and lp_valor=" + valor + " and lt_valor in (15, 14,12, 10, 7, 6) ";
    }

    public String sqlScriptPromo() {
        return this.sqlAgendaLlamadas = "SELECT TOP 1 sp_script_promocional from script_promocional order by sp_id_script_promocional desc ";
    }

    public String sqlClienteDireccion(int idClilente) {
        return this.sqlAgendaLlamadas = "select TOP 1 cd_nombre_contacto+' '+cd_apellido_pat_contacto+' '+cd_apellido_mat_contacto AS NOMBRE, cd_lada_contacto, cd_telefono_contacto, cd_referencia1 from cliente_direccion where cd_id_cliente=" + idClilente + " and cd_status='Contacto'";
    }
}
