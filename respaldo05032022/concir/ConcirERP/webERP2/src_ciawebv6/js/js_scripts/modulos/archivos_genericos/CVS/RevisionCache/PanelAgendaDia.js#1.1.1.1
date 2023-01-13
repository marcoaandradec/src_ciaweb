/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

var bandera = 3;
var mnsSIP="";

com.punto.pen.PanelAgendaPrs = function(argumentos){
    mnsSIP="";
    var id         = (argumentos.id==null ? '' : argumentos.id);
    this.titulo     = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.prm        = (argumentos.prm==null ? {} : argumentos.prm);
    this.region     = (argumentos.region==null ? '' : argumentos.region);
    this.border     = (argumentos.border==null ? false : argumentos.border);
    this.tbar       = (argumentos.tbar==null ? '' : argumentos.tbar);
    this.height     = (argumentos.height==null ? 470 : argumentos.height);
    this.hideMode   = (argumentos.hideMode==null ? 'display' : argumentos.hideMode);
    this.colWidth   = (argumentos.colWidth==null ? 1 : argumentos.colWidth);

    var idCnt       = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    var tpoWnd      = (argumentos.tpoWnd==null ? 1 : argumentos.tpoWnd);
    var idAcc       = (argumentos.idAcc==null ? 0 : argumentos.idAcc);
    var idTree      = (argumentos.idTree==null ? '' : argumentos.idTree);

    var idOrg  = (argumentos.idOrg==null ? '' : argumentos.idOrg);
    
    var store = new Ext.data.Store({
        autoLoad : false,
        baseParams : this.prm,
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'id'
        },
        new com.punto.pen.RecordAgendaDia()
            ),
        proxy : new Ext.data.HttpProxy( {
            url : contexto+'/Agenda?bnd='+bandera,
            //url: contexto + '/Agenda?bnd=12',
            timeout:120000
        }),
        listeners:{
            'loadexception':function(){
                store.removeAll();
            },
            'update':function(st,rcd,op){
                if(op==Ext.data.Record.COMMIT){
                    if(rcd.get('status')==2){
                        st.reload();
                    }
                }else if(op==Ext.data.Record.REJECT){
                    Ext.Msg.alert('','Hubo un error en el servidor');
                }
            }
        }
    });

    //this.panel = new Ext.grid.GridPanel({
    var panel = new Ext.grid.EditorGridPanel({
        id              : id,
        region          : this.region,
        title           : this.titulo,
        store           : store,
        hideMode        : this.hideMode,
        columnWidth     : this.colWidth,
        stripeRows      : true,
        sm              : new Ext.grid.RowSelectionModel({
            singleSelect:true
        }),
        loadMask        : true,
        viewConfig      : {
            autoFill: true,
            forceFit: true
        },
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        border          : this.border,
        height          : this.height,
        clicksToEdit    : 1,
        columns         : [
        new Ext.grid.RowNumberer({
            width:20
        }),

        {
            header: "Hora",
            width: 70,
            sortable: true,
            dataIndex: 'hora',
            fixed:true
        },

        {
            header:'Actividad',
            sortable: true,
            dataIndex: 'actividad',
            fixed:false
        },

        {
            header:"Lugar",
            sortable:true,
            dataIndex:"lugar",
            fixed:false
        },

        {
            header:'Paciente',
            sortable: true,
            dataIndex: 'paciente',
            fixed:false
        },
        {
            header:'Observaciones',
            sortable: true,
            dataIndex: 'observaciones',
            fixed:false
        },
        {
            header:'Status',
            width:80,
            fixed:true,
            sortable: true,
            dataIndex: 'status',
            editable: (idAcc == 146 ? false : true),
            renderer:function(val){
                var s = "";
                if(val == ""){
                    s = "";
                }else if(val == 1){
                    s = "<b><font color=\"#86B51F\">Abierta</font></b>";
                }else if(val == 2){
                    s = "<b><font color=\"#F75828\">Cerrada</font></b>";
                }else if(val == 3){
                    s = "<b><font color=\"#FF9700\">Modificada</font></b>";
                }else if(val == 4){
                    s = "<b><font color=\"#428BDD\">Re-Agendada</font></b>";
                }
                return s;
            },
            editor:new com.punto.pen.ComboBox({
                id:'idCmbStatus',
                listClass:'x-combo-list-small',
                width:100,
                prm:{
                    bnd:5,
                    qry:54,
                    autoCarga:true,
                    idCampo:'idStatus',
                    campo:'status'
                },
                evt:{
                    'beforeselect':function(cmb){
                        if(cmb.getValue()==""){
                            cmb.fireEvent('blur');
                            return false;
                        }else{
                            return true;
                        }
                    },
                    'select':function(cmb){
                        //alert(cmb.getValue());
                        cmb.fireEvent('blur');
                    }
                }
            })
        }
        ],
        tbar            : this.tbar,
        listeners       : {
            'rowdblclick':function(grid){
                //alert("nos quedamos aqui");
                var record = grid.getSelectionModel().getSelected();
                if(record.get('id_cita')=='0'){
                    //                    var wnd = new com.punto.pen.WndAgendaActividad({'bnd':4,'record':record,'idCnt':idCnt,'grid':grid,'actividad_bitacora':40,'tpoWnd':tpoWnd});
                    //                    wnd.show();
                    if(idAcc==18||idAcc==20||idAcc==17||idAcc==1||idAcc==4||idAcc==84||idAcc==2 || idAcc == 3){
                        var wnd1 = new com.punto.pen.WndAgendaActividad({
                            'bnd':4,
                            'record':record,
                            'idCnt':idCnt,
                            'grid':grid,
                            'actividad_bitacora':40,
                            'tpoWnd':tpoWnd
                        });
                        wnd1.show();
                    }else if(idAcc==70||idAcc==68||idAcc==72){
                        var wnd2 = new com.punto.pen.WndAgendaActividadNC({
                            'bnd':9,
                            'record':record,
                            'idCnt':idCnt,
                            'grid':grid,
                            'actividad_bitacora':40,
                            'tpoWnd':1
                        });
                        wnd2.show();
                    }
                }else{
                    if(idAcc==18){
                        //                        Ext.Msg.show({
                        //                            title:'Ir a la actividad',
                        //                            msg: '¿Desea ir al expediente de '+ record.get('paciente') + ' para realizar la actividad ?',
                        //                            buttons: Ext.Msg.YESNO,
                        //                            animEl: 'elId',
                        //                            fn: function(btn){
                        //                                if(btn == 'no'){
                        //                                }
                        //                                if(btn == 'yes'){
                        //                                    Ext.Ajax.request({
                        //                                        url:contexto+'/Agenda',
                        //                                        params:{'bnd':6,'idCnt':record.get('id_paciente'),'idCts':record.get('id_cita'),'status':2},
                        //                                        success:function(){
                        //                                           IrASesion(record,idAcc,idTree,idOrg);
                        //                                        },
                        //                                        failure:function(){
                        //                                            Ext.Msg.alert("Error de Conexión","Hubo un error en el servidor, inténtelo de nuevo.");
                        //                                        }
                        //                                    });
                        //                                }
                        //                            },
                        //                            icon: Ext.MessageBox.WARNING
                        //                        });
                        IrASesion(record,idAcc,idTree,idOrg);
                        mnsSIP=record.get('observaciones');                        
                    }else{
                        if(modulo!= 3 && idAcc != 146){
                            Ext.Msg.alert("","Este horario ya está ocupado");
                        }else{
                            if(toltip!=null){
                                toltip.destroy()
                                }
                            toltip=new Ext.Tip({
                                html: "<table>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Asunto:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get('asunto') + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Observaciones:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get('observaciones') + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Lugar:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get('lugar') + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td align=center><h4>Hora inicio</h4></td>\n\
                                    <td align=center><h4>Hora fin</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td align=center>" + record.get("hora_inicio") + "</td>\n\
                                    <td align=center>" + record.get("hora_fin") + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Duracion:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get("duracion") + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Tipo actividad:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get("tipo_actividad") + "</td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2><h4>Actividad:</h4></td>\n\
                                    </tr>\n\
                                    <tr>\n\
                                    <td colspan=2>" + record.get("actividad") + "</td>\n\
                                    </tr>\n\
                                    </table>",
                                title: "Datos de actividad",
                                autoHide: false,
                                closable: true,
                                draggable:true
                            });
                            toltip.showAt([coorX,coorY]);
                        }
                        
                    }
                }
            },
            'afteredit':function(obj){
                //                grid - This grid
                //                record - The record being edited
                //                field - The field name being edited
                //                value - The value being set
                //                originalValue - The original value for the field, before the edit.
                //                row - The grid row index
                //                column - The grid column index
                if(obj.value=='2'){
                    var wnd = new Ext.Window({
                        id:'wndActualizaCita',
                        title:'Cancelar cita',
                        layout:'fit',
                        modal:true,
                        width:310,
                        height:185,
                        bodyStyle:'padding:5px;',
                        items:[
                        {
                            xtype:'form',
                            id:'frmActualizaCita',
                            name:'observaciones',
                            url:contexto+'/Agenda',
                            labelAlign:'top',
                            bodyStyle:'padding:5px;',
                            width:300,
                            height:185,
                            items:[
                            {
                                xtype:'textarea',
                                fieldLabel:'Escriba el motivo de la cancelación, por favor.',
                                width:270,
                                enableKeyEvents:true,
                                style:'text-transform: uppercase;',
                                listeners: {
                                    'keyup' : function(elem, e){
                                        elem.setValue(elem.getValue().toUpperCase());
                                    },
                                    'keypress':function(txtField,e){
                                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                            e.stopEvent();
                                        }
                                    }
                                }
                            }
                            ]
                        }
                        ],
                        buttons:[
                        {
                            text:'Actualizar',
                            handler:function(){
                                var frm = Ext.getCmp('frmActualizaCita').getForm();
                                if(frm.isValid()){
                                    frm.submit({
                                        params:{
                                            'bnd':6,
                                            'idCnt':obj.record.get('id_paciente'),
                                            'idCts':obj.record.get('id_cita'),
                                            'status':obj.value
                                        },
                                        success:function(form,action){
                                            obj.grid.getStore().commitChanges();
                                            wnd.close();
                                        },
                                        failure:function(form,action){
                                            Ext.Msg.alert('Error en Servidor',action.result.msg);
                                        }
                                    });
                                }else{
                                    Ext.Msg.alert('','Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)');
                                }
                            }
                        },
                        {
                            text:'Cancelar',
                            handler:function(){
                                obj.grid.getStore().rejectChanges();
                                wnd.close();
                            }
                        }
                        ]
                    });
                    wnd.show();
                }
            //                Ext.Ajax.request({
            //                    url:contexto+'/Agenda',
            //                    params:{'bnd':6,'idCnt':obj.record.get('id_paciente'),'idCts':obj.record.get('id_cita'),'status':obj.value},
            //                    success:function(){
            //                        obj.grid.getStore().commitChanges();
            //                    },
            //                    failure:function(){
            //                       obj.grid.getStore().rejectChanges();
            //                    }
            //                });
            }
        }
    });
    return panel;
}
var coorX = 0;
var coorY = 0;
var toltip = null;
function coordenadasMouse(e){

    if (!e) var e = window.event;
    if (e.pageX || e.pageY){
        coorX = e.pageX;
        coorY = e.pageY;

    }else if (e.clientX || e.clientY){
        coorX = e.clientX;
        coorY = e.clientY;
        
    }
}
