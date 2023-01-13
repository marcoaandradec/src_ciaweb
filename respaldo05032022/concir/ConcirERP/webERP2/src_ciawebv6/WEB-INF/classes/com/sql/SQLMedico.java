/*    */ package com.sql;
/*    */ 
/*    */ import java.text.SimpleDateFormat;
/*    */ import java.util.Date;
/*    */ 
/*    */ public class SQLMedico
/*    */ {
/*    */   public static String BuscarMedicos(String strIdMedico)
/*    */   {
/* 17 */     return "Select m From Medico m Where  m.mNombre Like ?1  And m.mApellidoPaterno Like ?2  And m.mApellidoMaterno Like ?3  And m.mEstado Like ?4  And m.mCedula Like ?5  And m.mIdStatus.csIdStatus=1 " + strIdMedico + " Order By m.mNombre,m.mApellidoPaterno,m.mApellidoMaterno";
/*    */   }
/*    */ 
/*    */   public static String BuscarMedicosDuplicados(Date fecha)
/*    */   {
/* 29 */     SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
/* 30 */     String fech = fmt.format(fecha);
/* 31 */     String FechaN = "And m.mFechaNacimiento='" + fech + "' ";
/* 32 */     return "Select m From Medico m Where  m.mNombre Like ?1  And m.mApellidoPaterno Like ?2  And m.mApellidoMaterno Like ?3  And m.mEstado Like ?4 " + FechaN + " And m.mIdStatus.csIdStatus=1 " + " Order By m.mNombre,m.mApellidoPaterno,m.mApellidoMaterno";
/*    */   }
/*    */ 
/*    */   public static String DatosMedicoFarmatel(int idPrdt, int idCnt)
/*    */   {
///* 44 */     return "SELECT m.mIdMedico,  m.mNombre,  m.mApellidoPaterno,  " +
//                    "m.mApellidoMaterno,  m.mSexo,  m.mCalle,  m.mColonia, " +
//                    "m.mDelegacionMunicipio,  m.mCiudad,  m.mEstado,  m.mCp, " +
//                    " m.mFechaNacimiento, m.mTelefono,  m.mCedula,  me.meIdEspecialidad  " +
//                    "FROM ClienteStatus cs, ClieProdMedi cpm, Medico m, MedicoEspecialidad me " +
//                    "WHERE cs.csIdClieProdMed = cpm.cpmIdClieProdMed  " +
//                    "AND cpm.cpmIdMedico = m.mIdMedico  " +
//                    "AND m.mIdEspecialidad = me.meIdEspecialidad  " +
//                    "AND cs.csIdProducto = " + idPrdt + " " +
//                    "AND cs.csIdCliente = " + idCnt + " AND cs.csStatus = 1";
             return "SELECT m.mIdMedico,  m.mNombre,  m.mApellidoPaterno,  " +
                    "m.mApellidoMaterno,  m.mSexo,  m.mCalle,  m.mColonia, " +
                    "m.mDelegacionMunicipio,  m.mCiudad,  m.mEstado,  m.mCp, " +
                    "m.mFechaNacimiento, m.mTelefono,  m.mCedula,  me.meIdEspecialidad  " +
                    "FROM ClienteStatus cs, Medico m, MedicoEspecialidad me " +
                    "WHERE cs.csIdMedico.mIdMedico  = m.mIdMedico "+
                    "AND m.mIdEspecialidad = me.meIdEspecialidad  " +
                    "AND cs.csIdProducto = " + idPrdt + " " +
                    "AND cs.csIdCliente = " + idCnt + " AND cs.csStatus = 1";
/*    */   }
/*    */ }

