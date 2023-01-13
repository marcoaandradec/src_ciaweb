<%-- 
    Document   : subirArchivos
    Created on : 28/03/2010, 08:49:56 PM
    Author     : jalbch
--%>

<%@ page contentType="text/html; charset=iso-8859-1" language="java" import="java.text.SimpleDateFormat,java.util.*,com.entity.*,com.dao.EventManager,com.dao.util.HibernateUtil,javax.persistence.EntityManager" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<%
            String strIdCliente = (request.getParameter("idCln") == null ? (String) request.getAttribute("idCln") : request.getParameter("idCln"));
            String tipoArch = request.getParameter("tipoArch") == null ? "0" : request.getParameter("tipoArch");
            String idPrd = request.getParameter("idPrd") == null ? "0" : request.getParameter("idPrd");
            if (request.getAttribute("str_h") == null) {
                response.sendRedirect("../HomeSubirArchivos?idCln=" + strIdCliente + "&tipoArch=" + tipoArch);
            }
            List lstTipoArchivo = (List) request.getAttribute("lstTipos");
            List lstArchPac = (List) request.getAttribute("lstArchPac");
            String strTipoArch  = tipoArch;


            SimpleDateFormat fmt = new SimpleDateFormat("dd-MM-yyyy");

%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
        <title>Subir Archivos</title>
        <script type="text/javascript" src="<%=request.getContextPath()%>/js/prototype.js"></script>
        <link rel="stylesheet" href="<%=request.getContextPath()%>/css/tablaArchivos.css" type="text/css">
        <script type="text/javascript">
            function valid(){
                return !($('idArchivo').value.blank())
            }            
        </script>
        <style type="text/css">
            .txr {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 14px;
                color: #14A7D8;
            }
            .txbod {
                font-family: Arial, Helvetica, sans-serif;
                font-size: 13px;
                color: #070707;
            }
        </style>
    </head>
    <body>
        <table width="80%" cellspacing="0" align="center" cellpadding="0">
            <tr>
                <td>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                            <td colspan="4" align="center">&nbsp;</td>
                        </tr>
                        <tr>
                            <td width="10%"></td>
                            <td colspan="2" align="center"><strong class="txr">Agregar Archivos</strong></td>
                            <td width="10%">&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td width="10%"></td>
                            <td colspan="2" class="txbod" align="center">
                                <%
                                            if (request.getAttribute("error") != null) {
                                                out.print("<script type='text/javascript'>alert('" + request.getAttribute("error").toString() + "')</script>");
                                            } else if (request.getAttribute("NomArchivo") != null) {
                                                String strDoc = "<script type='text/javascript'>alert('El archivo " + request.getAttribute("NomArchivo") + " se subio al servidor con exito');";
                                                if(strTipoArch.equals("427") || strTipoArch.equals("431")){
                                                    strDoc += "window.opener.generarWndCanjes(" + strIdCliente + "," + idPrd + ");";
                                                    //strDoc += "generarWndCanjes(" + strIdCliente + "," + idPrd + ");";
                                                    strDoc += " window.close();";
                                                }
                                                strDoc += "</script>";
                                                out.print(strDoc);
                                            } else if (request.getAttribute("NomArchivo2") != null) {
                                                out.print("<script type='text/javascript'>alert('" + request.getAttribute("NomArchivo2") + "')</script>");                                                
                                            }
                                %>
                            </td>
                            <td width="10%">&nbsp;</td>
                        </tr>

                        <tr>                           
                            <td>&nbsp;</td>
                            <td colspan="2" rowspan="2">
                                <form name="frmSubirArchivo" id="idFormFoto" enctype="multipart/form-data" method="post" action="<%=request.getContextPath()%>/SubirArchivos?bnd=1&tipoArch=<%=strTipoArch%>&idPrd=<%=idPrd%>" onsubmit="return valid();" >
                                    <input name="idCln" id="IdidCln" type="hidden" value="<%=strIdCliente%>"/>
                                    <input name="dir" id="idDir" type="hidden" value="/HomeSubirArchivos"/>
                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" >
                                        <tr>
                                            <td align="center" class="txbod">Tipo de Archivo
                                                <%
                                                String disabled = "";
                                                 if(strTipoArch.equals("427") || strTipoArch.equals("431") || strTipoArch.equals("440")){
                                                    disabled = "disabled='disabled'";
                                                 }
                                                %>
                                                <input type="hidden" name="hidenTipoArchivo" value="<%=strTipoArch%>" />
                                                <select name="TipoArchivo" <%=disabled%>>
                                                    <%
                                                      if (lstTipoArchivo != null && !lstTipoArchivo.isEmpty()) {
                                                           for (int i = 0; i < lstTipoArchivo.size(); i++) {
                                                                Object[] objElementos = (Object[]) lstTipoArchivo.get(i);
                                                                Integer intIdCombo = (Integer) objElementos[0];
                                                                String strNombre = (String) objElementos[1];
                                                                Integer tipoAr = 0;
                                                                String selected = "";
                                                                if(!strTipoArch.equals("0")){
                                                                    tipoAr = Integer.parseInt(strTipoArch);
                                                                }
                                                                if(intIdCombo.equals(tipoAr)){
                                                                    selected = "selected='selected'";
                                                                }
                                                            %>
                                                    <option value="<%=intIdCombo%>" <%=selected%>><%=strNombre%></option>
                                                    <%
                                                       }
                                                      }%>

                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">&nbsp;</td>
                                        </tr>
                                        <tr>
                                            <td align="center"><input name="archivo" type="file" id="idArchivo" size="50" ></td>
                                        </tr>
                                        <tr>
                                            <td><input name="btnSubir" type="submit" class="botones" value=" Subir "></td>
                                        </tr>
                                    </table>                                   
                                </form>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td colspan="2" class="txbod">Lista de Archivos del Paciente:</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td colspan="2" valign="top">
                                <form name="frmEliminarArchivo" id="idFormFotoElim" method="post" action="<%=request.getContextPath()%>/SubirArchivos?bnd=2">
                                    <input name="strIdCliente2" id="strIdCliente2" type="hidden" value="<%=strIdCliente%>"/>
                                    <input name="dir" id="idDir" type="hidden" value="/HomeSubirArchivos"/>
                                    <%
				     EntityManager em = HibernateUtil.getEntityManager();
                                       try {
                                            if (!em.getTransaction().isActive()) {
                                                 em.getTransaction().begin();
                                            }
                                    %>
                                    <table width="100%" cellpadding="0" cellspacing="0" class="Pack">
                                        <thead>
                                            <tr class="head-bck3">
                                                <th width="14%" align="center" class="Estilo5">Eliminar</th>
                                                <th width="32%" align="center" class="Estilo5">Tipo Archivo</th>
                                                <th width="38%" align="center" class="Estilo5">Descargar Archivo</th>
                                                <th width="16%" align="center" class="Estilo5">Fecha</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                           <td colspan="4">
                                            <div style='overflow:auto; height:230px;'>
                                              <table width="100%" border="0" cellpadding="0" cellspacing="0" class="Pack">
                                       <%
					int tclass = 0;
					if (lstArchPac != null && !lstArchPac.isEmpty()) {
						String color = "";
                                                 for (int i = 0; i < lstArchPac.size(); i++) {
                                                      Object[] obj = (Object[]) lstArchPac.get(i);
                                                      ArchivoEscaneo objArchivo = (ArchivoEscaneo) obj[0];
                                                      ComboOpciones objCombo = (ComboOpciones) obj[1];
                                                      tclass++;
                                                      color = (tclass % 2 == 0) ? "row1" : "row2";
                                      %>
                                                    <tr class='<%=color%>' onmouseover="this.className='on';" onmouseout="this.className='<%=color%>'">
                                                        <td align="center" width="14%"><input type="checkbox" id="id<%=tclass%>" name="Checks" value="<%=objArchivo.getAIdArchivo()%>" onclick="Eliminar.disabled=false"/></td>
                                                        <td width="32%"><%=objCombo.getCoNombreComboOpc()%></td>
                                                        <td width="38%"><a href="<%=objArchivo.getAUrl()%>/<%=objArchivo.getANombre()%>" target="_blank"><%=objArchivo.getANombre()%></a></td>
                                                        <td width="16%"><%=fmt.format(objArchivo.getAFechaRegistro())%></td>                                                         
                                                     </tr>
                                       <%        }
                                        } else {
					%>
                                                    <tfoot class="tfoot">
                                                       <tr>
                                                           <td colspan="4" align="center" height="2"><span class="Estilo4">Sin Archivos</span></td>
                                                       </tr>
                                                    </tfoot>
                                        <%
					}
					%>
                                             </table>
                                           </div>
                                          </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <input name="TotalArchivos" id="idTotalArchivos" type="hidden" value="0"/>
                                    <input name="Eliminar" disabled="disabled" type="submit" class="botones" value=" Eliminar " onclick="var checkeds='';
                                        if(Checks.length != undefined){
                                            for(var i = 0; i<Checks.length; i++){
                                                if(Checks[i].checked == true){
                                                    checkeds += Checks[i].value+',';
                                                }
                                            }
                                        }else{
                                            checkeds = Checks.value;
                                        }                
                                        TotalArchivos.value=checkeds;
                                           " >
                                    <% } catch (Exception e) {
                                                    out.print(e);
                                                    if (em.getTransaction().isActive()) {
                                                        em.getTransaction().rollback();
                                                    }
                                                } finally {
                                                    HibernateUtil.closeSession();
                                                }
                                    %>
                                </form>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr>
                            <td>&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td width="40%">&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>
                    </table> 
                </td>
            </tr>
        </table>
    </body>
</html>
