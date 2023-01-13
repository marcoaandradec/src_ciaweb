/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.control.usuario;

import com.dao.EventManager;
import com.dao.RequestPostApi;
import com.dao.util.HibernateUtil;
import com.entity.Child;
import com.entity.Liadminacciones;
import com.entity.Liadminmodulo;
import com.entity.Lictlareasatencion;
import com.entity.Lictlorigen;
import com.entity.Liusuariopuesto;
import com.entity.Liusuarios;
import com.entity.Usuario;
import com.entity.ErrorExt;
import com.entity.ConfigUsuario;
import com.entity.ConfigUsuario.Item;
import com.entity.ExitoLogin;
import com.entity.Menu;
import com.sql.SQLControl;
import com.sql.SQLUsuarios;
import com.util.EncriptadoSimple;
import com.util.Fecha;
import com.util.GotoPage;
import com.util.Utilities;
import com.util.manejo_Cookies;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.Vector;
import jakarta.persistence.EntityManager;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.util.ReadProps;
import jakarta.servlet.annotation.WebServlet;

/**
 *
 * @author m@rco.@andrade
 */
public class CtrlUsuario extends HttpServlet {

    RequestPostApi requetPost = new RequestPostApi();
    ReadProps props = new ReadProps();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        response.setContentType("UTF-8");
        response.setHeader("Cache-Control", "no-cache"); //HTTP 1.1
        response.setHeader("Pragma", "no-cache"); //HTTP 1.0
        response.setDateHeader("Expires", 0);
        PrintWriter out = response.getWriter();
        String bnd = Utilities.obtenParametro(request, "bnd");
        String q = "";
        try {
            switch (bnd) {
                case "1":
                    out.print(obtenUsuarioValido(request, response));
                    break;
                case "2":
//                    out.print(this.obtenModulosUsuario(request));
                    break;
                case "3":
                    out.print(this.obtenAccionesUsuario(request));
                    break;

                case "4":
                    break;
                case "5":
                    break;
                case "6":
                    q = this.obtenBuscarUsuario(request);
                    out.print(q);
                    break;
                case "7":
                    q = this.setNuevoUsuario(request);
                    out.print(q);
                    break;
                case "8":
                    q = this.obtenInfoUsuario(request);
                    out.print(q);
                    break;
                case "9":
                    q = this.setModificaUsuario(request);
                    out.print(q);
                    break;
                case "10":
                    q = this.setConvierteContrasenas(request);
                    out.print(q);
                    break;
                case "11":
                    out.print(this.recuperarUsuarioValido(request, response));
                    break;
                case "12":
                    out.print(this.getActividadesPxCampania(request));
                    break;
                case "13":
                    this.redireccionValido(request, response);
                    break;
                case "14":
                    out.print(this.getMenu(request));
                    break;
                default:
                    break;
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            out.close();
        }

    }

// <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    public String obtenUsuarioValido(HttpServletRequest request, HttpServletResponse response) {
        String strJson = "";
        ErrorExt _error = new ErrorExt();
        ExitoLogin login = new ExitoLogin();
        _error.success = false;
        _error.msg = "El usuario no existe o la informacion es incorrecta.";
        try {
            strJson = new ObjectMapper().writeValueAsString(_error);
            String strTema = Utilities.obtenParametro(request, "tema");
            String direccion = "/jsp_general/login.jsp";
            HttpSession session = request.getSession(true);
            Usuario usuario = new Usuario();
            usuario.nombre = Utilities.obtenParametro(request, "username");
            usuario.clave = Utilities.obtenParametro(request, "password");
            String service = props.getValueProp("ServiceLogin");
            String content = new ObjectMapper().writeValueAsString(usuario);
            String repuesta = requetPost.getPost(service, content);
            ConfigUsuario configUsuario = new ObjectMapper().readValue(repuesta, ConfigUsuario.class);

            Integer idUsuario = this.obtenUsuario(request);
            if (idUsuario != null) {
                session.setAttribute("usuario", idUsuario);
                manejo_Cookies.set_Cookie("idUsuario", idUsuario.toString(), 60 * 60 * 24 * 1, response);
                session.setAttribute("modulos", this.obtenModulosUsuario(configUsuario));
                session.setAttribute("Menu", configUsuario.items);
                session.setAttribute("Empresa", configUsuario.empresas);
                login.success = true;
                login.url = direccion;
                login.usua = idUsuario;
                strJson = new ObjectMapper().writeValueAsString(login);

            }
        } catch (Exception e) {
            _error.success = false;
            _error.msg = "Error Sistema. " + e.getMessage();
            strJson = new ObjectMapper().writeValueAsString(_error);
            e.printStackTrace();
        } finally {
            //HibernateUtil.closeSession();
            return strJson;
        }
    }

    public void redireccionValido(HttpServletRequest request, HttpServletResponse response) {
        try {
            String idUsuario = Utilities.obtenParametro(request, "usuario");
            HttpSession session = request.getSession(true);
            String direccion = "/jsp_general/principal.jsp";
            GotoPage.gotoPage(direccion, request, response, this.getServletContext());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            //HibernateUtil.closeSession();
        }
    }

    private void setBitacora(HttpSession session, Integer idUsuario) throws ServletException, IOException {
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        try {

            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
//            String duracionSession = "0";
//            Date fechaIngreso = new Date();
//            AdminBitacoraAcceso acceso = new AdminBitacoraAcceso();
//            Usuario usuario = em.getReference(Usuario.class, idUsuario);
//            acceso.setIdUsuario(usuario);
//            acceso.setIdFechaIngreso(fechaIngreso);
//            acceso.setIdFechaSalida(null);
//            acceso.setDuracion(duracionSession);
//            em.persist(acceso);

//            if (acceso.getIdAdminBitacoraAcceso() != null) {
//                session.setAttribute("idAcceso", acceso.getIdAdminBitacoraAcceso());
//            }
//            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
        }
    }

    private Integer obtenUsuario(HttpServletRequest request) {
        Integer usrU = null;
        try {
            String strUsername = Utilities.obtenParametro(request, "username");
            String strPassword = Utilities.obtenParametro(request, "password");
            usrU = 300;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return usrU;
    }

    /* Metodo: ExtJS 4.1*/
    private String obtenModulosUsuario(ConfigUsuario usuario) {
        String nameUSer = "";
        String welcome = "{xtype:'label',html:' Usuario @usuario           ',style:'color: black;font-weight: bold; font-size: 12px;'},";
        String strModulos = "";// "[" + welcome + "{text:'Modulo Prueba',iconCls:'icn-portafolio',scale:'small',handler:function(){LoadMenu(5);}}]";
        try {
            if (usuario.items != null) {
                strModulos = "[" + welcome;
                for (Item item : usuario.items) {
                    if (item.modpadre == 0) {
                        nameUSer = item.usumail;
                        strModulos += "{text:'" + item.modnombre + "',iconCls:'icn-portafolio',scale:'small',handler:function(){LoadMenu(" + item.umomodid + ");}},";
                    }
                }
                strModulos += "]";
                strModulos = strModulos.replaceAll(",]", "]").replaceAll("@usuario", nameUSer);
            }
        } catch (Exception e) {
            e.printStackTrace();
            strModulos = "[" + welcome + "{xtype:'label', html:'No tiene modulos asignados',style:'color:#fea438;font-weight:bold;'}]";
        }
        return strModulos;
    }

    private String obtenAccionesUsuario(HttpServletRequest request) {
        String strAcciones = "";
        try {
            //strAcciones = "[{id:\'idMenu156\',text: \'Consulta Pruebas\',cls: \'feeds-node\',iconCls:\'icn-Bayer\',leaf: true,expanded:true,children: []}]";
            HttpSession session = request.getSession(true);
            String modulo=Utilities.obtenParametro(request, "parametro");
            if (!modulo.isEmpty()) {                
                ArrayList<Menu> listMenu = new ArrayList<Menu>();
                if (session.getAttribute("Menu") != null) {
                    ArrayList<Item> modulos = (ArrayList<Item>) session.getAttribute("Menu");
                    ArrayList<Child> children = new ArrayList<Child>();
                    Menu menu = new Menu();
                    for (Item item : modulos) {
                        if (item.modpadre == Integer.parseInt(modulo)) {
                            menu.id = item.umomodid;
                            Child child = new Child();
                            child.id=item.umomodid;
                            child.text = item.modnombre;
                            child.iconCls = "icn-Bayer";
                            child.leaf = true;
                            children.add(child);
                            menu.children=children;
                        }
                    }
                    strAcciones= new ObjectMapper().writeValueAsString(menu);
                }
            }
            
        } catch (Exception e) {
            e.printStackTrace();
            strAcciones = "[]";
        } finally {
//            HibernateUtil.closeSession();
        }
        return strAcciones;
    }

    private void agregarActividadUsuario(Integer u) {
    }

    private String obtenArbolAcciones(int idPadre, List lst, ArrayList arrayReplace, int origen) {
        String jsonArbol = "";
        for (int i = 0; i < lst.size(); i++) {
            Object[] obj = (Object[]) lst.get(i);
            Liadminacciones aa = (Liadminacciones) obj[0];
            String script = Utilities.validaNull(obj[1]).toString();

            if (arrayReplace != null) {
                for (int y = 0; y < arrayReplace.size(); y++) {
                    Hashtable hash = (Hashtable) arrayReplace.get(y);
                    script = script.replace(hash.get("prm").toString(), hash.get("var").toString());
                }
            }

            //int aaIdPadre = (aa.getAaIdPadre() == null ? 0 : aa.getAaIdPadre());
            int aaIdPadre = (aa.getAaidpadre() == null ? 0 : aa.getAaidpadre());
            if (idPadre == aaIdPadre) {
                boolean hidden = true;
                if (aa.getAaidacciones() != 144) {
                    hidden = false;
                } else if (origen == 29 || origen == 35 || origen == 1 || origen == 19 || origen == 21 || origen == 30) {
                    hidden = false;
                }
                jsonArbol += "{id:'idMenu" + aa.getAaidacciones() + "',text: '" + aa.getAanombreacciones() + "',cls: 'feeds-node',iconCls:'" + (aa.getAaiconocls() == null ? "icn-Bayer" : aa.getAaiconocls()) + "',leaf: " + (aa.getAaidpadre() == 0 ? "true" : "true") + ",expanded:true,";
                jsonArbol += "children: [" + obtenArbolAcciones(aa.getAaidacciones(), lst, arrayReplace, origen) + "]},";

            }
        }
        return jsonArbol;
    }

    private String obtenArbolActividades(int idPadre, List lst, ArrayList arrayReplace, String difPrm, String idAcc, HttpServletRequest request, boolean into) {
        String jsonArbol = "";
        String d = (difPrm == null ? "" : difPrm);
        HttpSession s = request.getSession();
        int modul = Integer.parseInt(s.getAttribute("modulo").toString());

        try {

            for (int i = 0; i < lst.size(); i++) {
                Object[] obj = (Object[]) lst.get(i);
//                CtlActividad ca = (CtlActividad) obj[0];
                String script = Utilities.validaNull(obj[1]).toString();

                int idReceta = 0;
                Hashtable hashPrd2 = new Hashtable();
                hashPrd2.clear();
                hashPrd2.put("prm", "%idRect%");
                hashPrd2.put("var", idReceta);
                arrayReplace.add(hashPrd2);

                if (arrayReplace != null) {
                    for (int y = 0; y < arrayReplace.size(); y++) {
                        Hashtable hash = (Hashtable) arrayReplace.get(y);
                        script = script.replace(hash.get("prm").toString(), hash.get("var").toString());
                    }
                    arrayReplace.remove(hashPrd2);
                }

            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return jsonArbol;
    }

    public String obtenBuscarUsuario(HttpServletRequest request) {
        String json = "{total:0,records:[]}";
        try {
            String usrname = Utilities.obtenParametro(request, "username") + "%";
            String nombres = "%" + Utilities.obtenParametro(request, "nombre") + "%";
            String apaterno = "%" + Utilities.obtenParametro(request, "apaterno") + "%";
            String amaterno = "%" + Utilities.obtenParametro(request, "amaterno") + "%";
            //String telefono = "%" + Utilities.obtenParametro(request, "telefono") + "%";

            Vector vUsr = new Vector();
            vUsr.add(usrname);
            vUsr.add(nombres);
            vUsr.add(apaterno);
            vUsr.add(amaterno);
            //vUsr.add(telefono);

            List lstUsr = EventManager.getArrayParameter(SQLUsuarios.obtenUsuarios(), vUsr);
            if (lstUsr != null && !lstUsr.isEmpty()) {
                json = "{total:" + lstUsr.size() + ",records:[";
                for (int i = 0; i < lstUsr.size(); i++) {
                    Liusuarios u = (Liusuarios) lstUsr.get(i);
                    json += "{";
                    json += "id_usr:'" + u.getUsuclave() + "',";
                    json += "fecha_reg:'" + Fecha.getDateToExtJS(u.getUsufechaalta(), false) + "',";
                    json += "fecha_nac:'" + Fecha.getDateToExtJS(u.getUsufechanac(), true) + "',";
                    json += "nombre:'" + u.getUsunombre() + "',";
                    json += "apaterno:'" + u.getUsupaterno() + "',";
                    json += "amaterno:'" + u.getUsumaterno() + "',";
                    json += "username:'" + u.getUsulogin() + "',";
                    json += "telefono:'" + u.getUsutelefono() + "',";
                    json += "telcel:'55',";
                    json += "email:'NA',";
                    json += "idpnt_cnt:'" + u.getUsuidorigen().getOidorigen() + "',";
                    json += "pnt_cnt:'" + u.getUsuidorigen().getOnombreorigen() + "',";
                    json += "idpuesto:'" + u.getUsuidpuesto().getUpidpuesto() + "',";
                    json += "puesto:'" + u.getUsuidpuesto().getUpnombrepuesto() + "',";
                    json += "habilitado:'" + u.getUsuestatus() + "'";
//                    json += "acceso:" + u.getUsudepartamento().getDepdescripcion() + "";
                    json += "},";
                }
                json = json.substring(0, json.length() - 1) + "]}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            json = "{total:0,records:[]}";
        } finally {
            HibernateUtil.closeSession();
        }
        return json;
    }

    public String setNuevoUsuario(HttpServletRequest request) {
        String strUsr = "";
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        Liusuarios usr = Utilities.ReactivarSession(request);

        try {
            if (usr != null) {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                Liusuarios u = new Liusuarios();

                u.setUsunombre(Utilities.obtenParametro(request, "nombre"));
                u.setUsupaterno(Utilities.obtenParametro(request, "apaterno"));
                u.setUsumaterno(Utilities.obtenParametro(request, "amaterno"));

                u.setUsulogin(Utilities.obtenParametro(request, "username"));
                u.setUsupassword(EncriptadoSimple.StringToClave(Utilities.obtenParametro(request, "password")));
//                u.setUsuestatus(Utilities.obtenParametro(request, "habilitado").equals("") ? true : Boolean.valueOf(Utilities.obtenParametro(request, "habilitado")));
//                String hab = Utilities.obtenParametro(request, "habilitado");
//                u.setUAcceso(hab.equals("") ? true : Boolean.valueOf(hab));

                u.setUsufechaalta(new Date());
                String fecha = Utilities.obtenParametro(request, "fecha_nac");
                if (!fecha.equals("")) {
                    u.setUsufechanac(Fecha.getDateExtJS(fecha));
                }
                u.setUsusexo(Utilities.obtenParametro(request, "sexo"));

                u.setUsutelefono(Utilities.obtenParametro(request, "telefono"));
//                u.setUCelular(Utilities.obtenParametro(request, "tel_cel"));
//                u.setUCorreoElectronico(Utilities.obtenParametro(request, "email"));

                u.setUsudireccion(Utilities.obtenParametro(request, "calle"));
                u.setUsunumext(Utilities.obtenParametro(request, "no_ext"));
                u.setUsunumint(Utilities.obtenParametro(request, "no_int"));

                u.setUsuestado(Utilities.obtenParametro(request, "estado"));
                u.setUsudelegmunip(Utilities.obtenParametro(request, "del_mun"));
                u.setUsucolonia(Utilities.obtenParametro(request, "colonia"));
                u.setUsucp(Utilities.obtenParametro(request, "codpost"));

//                u.setUIdUsuarioAlta(usr.getUsuclave());
                int area = Integer.parseInt(Utilities.obtenParametro(request, "pnt_atn").equals("") ? "0" : Utilities.obtenParametro(request, "pnt_atn"));
                Lictlareasatencion aat = em.getReference(Lictlareasatencion.class,
                        area);

                int origen = Integer.parseInt(Utilities.obtenParametro(request, "pnt_cnt").equals("") ? "0" : Utilities.obtenParametro(request, "pnt_cnt"));
                Lictlorigen org = em.getReference(Lictlorigen.class,
                        origen);

                int puesto = Integer.parseInt(Utilities.obtenParametro(request, "puesto").equals("") ? "0" : Utilities.obtenParametro(request, "puesto"));
                Liusuariopuesto pst = em.getReference(Liusuariopuesto.class,
                        puesto);
                u.setUsuestatus("A");
                u.setUsutipo("A");
                u.setUsuidareaatencion(aat);
                u.setUsuidorigen(org);
                u.setUsuidpuesto(pst);

                // Region r = em.getReference(Region.class, 1);
////                u.setUIdRegion(1);
//                CtlActividad ca = em.getReference(CtlActividad.class, 1);
                // u.setUIdActividad(1);
                //UsuarioHorario ha = em.getReference(UsuarioHorario.class, 1);
//                u.setUIdUsuarioHorario(1);
                em.persist(u);

                /*  if (origen != 3) {
                UsuarioHorarioVariable uhv1 = new UsuarioHorarioVariable();
                uhv1.setUhvIdUsuario(u);
                uhv1.setUhvNomDiaSemana("Lunes");
                uhv1.setUhvNumDiaSemana(1);
                uhv1.setUhvIdHorario(em.getReference(UsuarioHorario.class, 1));
                em.persist(uhv1);
                UsuarioHorarioVariable uhv2 = new UsuarioHorarioVariable();
                uhv2.setUhvIdUsuario(u);
                uhv2.setUhvNomDiaSemana("Martes");
                uhv2.setUhvNumDiaSemana(2);
                uhv2.setUhvIdHorario(em.getReference(UsuarioHorario.class, 1));
                em.persist(uhv2);
                UsuarioHorarioVariable uhv3 = new UsuarioHorarioVariable();
                uhv3.setUhvIdUsuario(u);
                uhv3.setUhvNomDiaSemana("Mi�rcoles");
                uhv3.setUhvNumDiaSemana(3);
                em.persist(uhv3);
                uhv3.setUhvIdHorario(em.getReference(UsuarioHorario.class, 1));
                UsuarioHorarioVariable uhv4 = new UsuarioHorarioVariable();
                uhv4.setUhvIdUsuario(u);
                uhv4.setUhvNomDiaSemana("Jueves");
                uhv4.setUhvNumDiaSemana(4);
                uhv4.setUhvIdHorario(em.getReference(UsuarioHorario.class, 1));
                em.persist(uhv4);
                UsuarioHorarioVariable uhv5 = new UsuarioHorarioVariable();
                uhv5.setUhvIdUsuario(u);
                uhv5.setUhvNomDiaSemana("Viernes");
                uhv5.setUhvNumDiaSemana(5);
                uhv5.setUhvIdHorario(em.getReference(UsuarioHorario.class, 1));
                em.persist(uhv5);
                UsuarioHorarioVariable uhv6 = new UsuarioHorarioVariable();
                uhv6.setUhvIdUsuario(u);
                uhv6.setUhvNomDiaSemana("S�bado");
                uhv6.setUhvNumDiaSemana(6);
                uhv6.setUhvIdHorario(em.getReference(UsuarioHorario.class, 4));
                em.persist(uhv6);
                } else {
                UsuarioHorarioVariable uhv1 = new UsuarioHorarioVariable();
                uhv1.setUhvIdUsuario(u);
                uhv1.setUhvNomDiaSemana("Lunes");
                uhv1.setUhvNumDiaSemana(1);
                uhv1.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));
                em.persist(uhv1);
                UsuarioHorarioVariable uhv2 = new UsuarioHorarioVariable();
                uhv2.setUhvIdUsuario(u);
                uhv2.setUhvNomDiaSemana("Martes");
                uhv2.setUhvNumDiaSemana(2);
                uhv2.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));
                em.persist(uhv2);
                UsuarioHorarioVariable uhv3 = new UsuarioHorarioVariable();
                uhv3.setUhvIdUsuario(u);
                uhv3.setUhvNomDiaSemana("Mi�rcoles");
                uhv3.setUhvNumDiaSemana(3);
                em.persist(uhv3);
                uhv3.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));
                UsuarioHorarioVariable uhv4 = new UsuarioHorarioVariable();
                uhv4.setUhvIdUsuario(u);
                uhv4.setUhvNomDiaSemana("Jueves");
                uhv4.setUhvNumDiaSemana(4);
                uhv4.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));
                em.persist(uhv4);
                UsuarioHorarioVariable uhv5 = new UsuarioHorarioVariable();
                uhv5.setUhvIdUsuario(u);
                uhv5.setUhvNomDiaSemana("Viernes");
                uhv5.setUhvNumDiaSemana(5);
                uhv5.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));
                em.persist(uhv5);
                UsuarioHorarioVariable uhv6 = new UsuarioHorarioVariable();
                uhv6.setUhvIdUsuario(u);
                uhv6.setUhvNomDiaSemana("S�bado");
                uhv6.setUhvNumDiaSemana(6);
                uhv6.setUhvIdHorario(em.getReference(UsuarioHorario.class, 3));//3
                em.persist(uhv6);
                }*/
                em.getTransaction().commit();
                strUsr = "{success:true,msg:'El usuario se registr� con Exito',funcion:IniciarAccion('pnlTreeAccionesADM',false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:'Administrador'}))}";
            }

        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
            strUsr = "{success:false,msg:'Hubo un error en el servidor, int�ntelo de nuevo.'}";
        } finally {
            HibernateUtil.closeSession();
        }
        return strUsr;
    }

    public String obtenInfoUsuario(HttpServletRequest request) {
        String json = "{success:false,data:{}}";
        try {
            int id_usr = Integer.parseInt(Utilities.obtenParametro(request, "id_usr").equals("") ? "0" : Utilities.obtenParametro(request, "id_usr"));
            Liusuarios u = (Liusuarios) EventManager.getSingleList(Liusuarios.class,
                    id_usr);
            if (u != null) {
                json = "{success:true,data:{";

                json += "id_usr:'" + u.getUsuclave() + "',";
                json += "nombre:'" + u.getUsunombre() + "',";
                json += "apaterno:'" + u.getUsupaterno() + "',";
                json += "amaterno:'" + u.getUsumaterno() + "',";
                json += "pnt_atn:'" + u.getUsuidareaatencion().getCaaidareaatencion() + "',";
                json += "pnt_cnt:'" + u.getUsuidorigen().getOidorigen() + "',";
                json += "puesto:'" + u.getUsuidpuesto().getUpidpuesto() + "',";
                json += "username:'" + u.getUsulogin() + "',";
                json += "password:'" + EncriptadoSimple.ClaveToString(u.getUsupassword()) + "',";
                json += "sexo:'" + u.getUsusexo() + "',";
                json += "fecha_nac:'" + Fecha.getDateToExtJS(u.getUsufechanac(), true) + "',";
                json += "habilitado:'" + u.getUsuestatus() + "',";
                json += "lada:'',";
                json += "telefono:'" + u.getUsutelefono() + "',";
                json += "tel_cel:'55555555',";
                json += "email:'prueba@argomex.com',";
                json += "calle:'" + u.getUsudireccion() + "',";
                json += "no_ext:'" + u.getUsunumext() + "',";
                json += "no_int:'" + u.getUsunumint() + "',";
                json += "estado:'" + u.getUsuestado() + "',";
                json += "del_mun:'" + u.getUsudelegmunip() + "',";
                json += "colonia:'" + u.getUsucolonia() + "',";
                json += "codpost:'" + u.getUsucp() + "'";

                json += "}}";
            }
        } catch (Exception e) {
            e.printStackTrace();
            json = "{success:false,data:{}}";

        } finally {
            HibernateUtil.closeSession();
        }
        return json;
    }

    public String setModificaUsuario(HttpServletRequest request) {
        String json = "{success:false,msg:'Hubo un error en el servidor, int�ntelo de nuevo.'}";
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        String id_usr = "";
        try {
            id_usr = Utilities.obtenParametro(request, "id_usr").equals("") ? "0" : Utilities.obtenParametro(request, "id_usr");

            if (!id_usr.equals("0")) {
                Liusuarios u = (Liusuarios) EventManager.getSingleList(Liusuarios.class,
                        Integer.parseInt(id_usr));
                if (u != null) {
                    if (!em.getTransaction().isActive()) {
                        em.getTransaction().begin();
                    }
                    u.setUsunombre(Utilities.obtenParametro(request, "nombre"));
                    u.setUsupaterno(Utilities.obtenParametro(request, "apaterno"));
                    u.setUsumaterno(Utilities.obtenParametro(request, "amaterno"));
                    u.setUsulogin(Utilities.obtenParametro(request, "username"));
                    u.setUsupassword(EncriptadoSimple.StringToClave(Utilities.obtenParametro(request, "password")));
//                    String hab = Utilities.obtenParametro(request, "habilitado");
//                    u.setUAcceso(hab.equals("") ? true : Boolean.valueOf(hab));
                    u.setUsufechanac(Fecha.getDateExtJS(Utilities.obtenParametro(request, "fecha_nac")));
                    u.setUsusexo(Utilities.obtenParametro(request, "sexo"));
                    u.setUsutelefono(Utilities.obtenParametro(request, "telefono"));
//                    u.setUCelular(Utilities.obtenParametro(request, "tel_cel"));
//                    u.setUCorreoElectronico(Utilities.obtenParametro(request, "email"));
                    u.setUsudireccion(Utilities.obtenParametro(request, "calle"));
                    u.setUsunumext(Utilities.obtenParametro(request, "no_ext"));
                    u.setUsunumint(Utilities.obtenParametro(request, "no_int"));
                    u.setUsuestado(Utilities.obtenParametro(request, "estado"));
                    u.setUsudelegmunip(Utilities.obtenParametro(request, "del_mun"));
                    u.setUsucolonia(Utilities.obtenParametro(request, "colonia"));
                    u.setUsucp(Utilities.obtenParametro(request, "codpost"));
                    int area = Integer.parseInt(Utilities.obtenParametro(request, "pnt_atn").equals("") ? "0" : Utilities.obtenParametro(request, "pnt_atn"));
                    Lictlareasatencion aat = em.getReference(Lictlareasatencion.class,
                            area);
                    int origen = Integer.parseInt(Utilities.obtenParametro(request, "pnt_cnt").equals("") ? "0" : Utilities.obtenParametro(request, "pnt_cnt"));
                    Lictlorigen org = em.getReference(Lictlorigen.class,
                            origen);
                    int puesto = Integer.parseInt(Utilities.obtenParametro(request, "puesto").equals("") ? "0" : Utilities.obtenParametro(request, "puesto"));
                    Liusuariopuesto pst = em.getReference(Liusuariopuesto.class,
                            puesto);
                    u.setUsuidareaatencion(aat);
                    u.setUsuidorigen(org);
                    u.setUsuidpuesto(pst);

                    //Region r = em.getReference(Region.class, 1);
//                    u.setUIdRegion(1);
                    //CtlActividad ca = em.getReference(CtlActividad.class, 1);
//                    u.setUIdActividad(1);
                    //UsuarioHorario ha = em.getReference(UsuarioHorario.class, 1);
//                    u.setUIdUsuarioHorario(1);
                    em.merge(u);

                    em.getTransaction().commit();
                }
                json = "{" + "success:true,msg:'Se actualiz� la informaci�n con Exito'," + "wnd:'" + Utilities.obtenParametro(request, "wnd") + "'," + "funcion:" + Utilities.obtenParametro(request, "fnc") + "" + "}";
            }
        } catch (Exception e) {
            em.getTransaction().rollback();
            e.printStackTrace();
            json = "{success:false,msg:'Hubo un error en el servidor, int�ntelo de nuevo.'}";
        } finally {
            HibernateUtil.closeSession();
        }
        return json;
    }

    public String setConvierteContrasenas(HttpServletRequest request) {
        String json = "0";
        EntityManager em = (EntityManager) HibernateUtil.getEntityManager();
        String pssw = Utilities.obtenParametro(request, "pssw");
        try {
            if (!pssw.equals("")) {
                if (!em.getTransaction().isActive()) {
                    em.getTransaction().begin();
                }
                List lst = EventManager.getArray("SELECT u FROM Usuario u");
                if (lst != null) {
                    if (!lst.isEmpty()) {
                        for (int i = 0; i < lst.size(); i++) {
                            Liusuarios u = (Liusuarios) lst.get(i);
                            u.setUsupasswordweb(EncriptadoSimple.StringToClave(Utilities.validaNull(u.getUsupasswordweb()).toString()));
                            em.merge(u);
                        }
                    }
                }
                em.getTransaction().commit();
            }
            json = "1";
        } catch (Exception e) {
            e.printStackTrace();
            em.getTransaction().rollback();
            json = "0";
        } finally {
            HibernateUtil.closeSession();
        }
        return json;
    }

    public String recuperarUsuarioValido(HttpServletRequest request, HttpServletResponse response) {
        String strJson = "{success: false,msg: 'El usuario no existe o la informaci�n es incorrecta.'}";
        try {
            HttpSession session = request.getSession(true);
            Integer idUsuario = this.obtenUsuario(request);
            if (idUsuario != null) {
                session.setAttribute("usuario", idUsuario);
//                session.setAttribute("modulos", this.obtenModulosUsuario(request));
                strJson = "{success: true,msg: 'Se recupero la Sesi�n con Exito.'}";
            }
        } catch (Exception e) {
            strJson = "{success: false,msg: 'El usuario no existe o la informaci�n es incorrecta.'}";
            e.printStackTrace();
        } finally {
            HibernateUtil.closeSession();
        }
        return strJson;
    }

    private String getActividadesPxCampania(HttpServletRequest request) {

        String strActividades = "";
        String idAcc = Utilities.obtenParametro(request, "idAcc");
        String idTree = Utilities.obtenParametro(request, "idTree");
        String idCnt = Utilities.obtenParametro(request, "idCnt");
        String fnEvtTreeActNde = Utilities.obtenParametro(request, "fnEvtTreeActNde");
        String fnEvtTreeActLdl = Utilities.obtenParametro(request, "fnEvtTreeActLdl");
        String fnEvtTreeActPnl = Utilities.obtenParametro(request, "fnEvtTreeActPnl");
        Liusuarios usr = Utilities.ReactivarSession(request);

        if (usr != null) {
            try {
                List lst = EventManager.getArray("SELECT cm FROM CtlCampanias cm where cm.ccStatus.csIdStatus=1 order by cm.ccNombre");
                if (lst != null && !lst.isEmpty()) {
                    for (int i = 0; i < lst.size(); i++) {
//                        CtlCampanias objC = (CtlCampanias) lst.get(i);
//                        strActividades += "new com.punto.pen.TreePanel({"
//                                + " 'id':'pnlTreeAct" + i + "',"
//                                + " 'url':'" + Utilities.obtenParametro(request, "contexto") + "/Usuario',"
//                                + "  'prm':{"
//                                + "    'idCnt':" + idCnt + ","
//                                + "    'bnd':4,"
//                                + "    'idTM':1,"
//                                + "    'idAcc':" + idAcc + ","
//                                + "    'idTree':'" + idTree + "',"
//                                + "    'idCampPxPrd':" + objC.getCcIdCampania()
//                                + "  },"
//                                + "  'titulo':'" + objC.getCcNombre() + "',"
//                                + "  'border':false,"
//                                + "  'evtTreeNde':" + (fnEvtTreeActNde.equals("") ? "{}" : fnEvtTreeActNde) + ","
//                                + "  'evtTreeLdl':" + (fnEvtTreeActLdl.equals("") ? "{}" : fnEvtTreeActLdl) + ","
//                                + "  'evtTreePnl':" + (fnEvtTreeActPnl.equals("") ? "{}" : fnEvtTreeActPnl) + ""
//                                + "  }),";
                    }
                    strActividades = strActividades.substring(0, strActividades.length() - 1);
                }
            } catch (Exception e) {
                e.printStackTrace();
                strActividades = "{success: false,msg: 'Error de conexion'}";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return strActividades;
    }

    public String getMenu(HttpServletRequest request) {
        String idCnt = Utilities.obtenParametro(request, "mdl"), strMenu = "";
        Liusuarios usr = Utilities.ReactivarSession(request);
        if (usr != null) {
            try {
                strMenu = "[{text: 'Remodel Project',cls: 'folder',leaf: false,expanded:true,children: [{}]}";
            } catch (Exception e) {
                e.printStackTrace();
                strMenu = "";
            } finally {
                HibernateUtil.closeSession();
            }
        }
        return strMenu;
    }
}
