/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.sql;

/**
 *
 * @author mandrade
 */
public class EmailsSql
/*    */ {
/*    */   public static String qryMensajeSust()
/*    */   {
/* 15 */     return "select * from emailmsg,emailmsgperfil where clave = ? and emailmsg.clvmsgperfil=emailmsgperfil.clvmsgperfil";
/*    */   }
/*    */ 
/*    */   public static String qryVarSust()
/*    */   {
/* 22 */     return "select * from emailvar,emailvardisp where clvmensaje = ? and emailvar.clvvardisp = emailvardisp.clvvardisp";
/*    */   }
/*    */ 
/*    */   public static String qryMensajeConfigCorreo() {
/* 26 */     return "Select vm from VistaMensaje vm Where vm.vmIdVistaMensaje = ?1";
/*    */   }
/*    */ }
