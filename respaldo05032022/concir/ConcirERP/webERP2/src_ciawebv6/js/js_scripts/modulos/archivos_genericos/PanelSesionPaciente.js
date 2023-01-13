Ext.ns('com.punto.pen');
    
function getActPx(idCnt,idAccion,idArbol,fnEvtTreeActNde,fnEvtTreeActLdl,fnEvtTreeActPnl,nomb,apP,apM,tipo){    
    Ext.Ajax.request({
        url : contexto+'/Usuario',
        params:{
            bnd:12,
            'idCnt':idCnt,
            'idAcc':idAccion,
            'idTree':idArbol,
            'evtTreeNde':fnEvtTreeActNde,
            'evtTreeLdl':fnEvtTreeActLdl,
            'evtTreePnl':fnEvtTreeActPnl,
            "contexto":contexto                
        },
        success:function(rsp){
                                
            actCmpPxPr= eval("("+rsp.responseText+")");
            IniciarAccion(idArbol,true,true,'pnlCenter',new com.punto.pen.PanelSesionPaciente({
                id:'pnlSesionPaciente',
                'idCnt':idCnt,
                region:'center',
                'idAcc':idAccion,
                'idTree':idArbol,
                'nameCnt':nomb+' '+apP+' '+apM,
                'TipoPac':tipo
            }));            
           
        },
        failure:function(rsp){
            Ext.MessageBox.alert('¡¡Alerta!!',"Problemas de conexión");
        }
    })
}

var mostrarLoad     = false;
com.punto.pen.PanelSesionPaciente = function(argumentos){
    mostrarLoad     = false;
    var id = (argumentos.id==null ? '' : argumentos.id);
    this.idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    var idContenedor = (argumentos.idContenedor==null ? 'pnlCenter' : argumentos.idContenedor);

    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);

    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);

    var nameCnt = (argumentos.nameCnt==null ? '' : argumentos.nameCnt);
    var TipoPac = (argumentos.TipoPac==null ? '' : argumentos.TipoPac);

    var pnlBack         = (argumentos.pnlBack==null ? com.punto.pen.PanelBuscadorPaciente : argumentos.pnlBack);
    var prmBack         = (argumentos.prmBack==null ? {
        id:'pnlBuscadorPaciente',
        'idAcc':idAcc,
        'idTree':idTree
    } : argumentos.prmBack);

    var mostrarBack     = (argumentos.mostrarBack==null ? false : argumentos.mostrarBack);
    mostrarLoad     = (argumentos.mostrarLoad==null ? false : argumentos.mostrarLoad);
    
    var pnlTreeAct = 'pnlTreeActividades';
    var pnlTreePrd = 'pnlTreeProductosAct';

    var fnEvtTreeActLdl = (argumentos.fnEvtTreeActLdl==null ? {} : argumentos.fnEvtTreeActLdl);
    var fnEvtTreeActNde = (argumentos.fnEvtTreeActNde==null ? {} : argumentos.fnEvtTreeActNde);
    var fnEvtTreeActPnl = (argumentos.fnEvtTreeActPnl==null ? {} : argumentos.fnEvtTreeActPnl);

    this.pnlSesionPaciente = new Ext.Panel({
        id: id,
        title:"",
        layout:"border",
        region:this.region,
        border:false,
        items:[
        new Ext.Panel({
            region:'west',
            border:true,
            id:'idAccordionActPx',
            layout:'accordion',
            autoScroll  : true,
            collapsible : true,
            collapseMode: 'mini',
            split       : true,
            hidden      :mostrarLoad,
            width       : 200,
            minSize     : 200,
            maxSize     : 250,
            items:[actCmpPxPr,
            new com.punto.pen.TreePanel({
                'id':pnlTreePrd,
                'url':contexto+'/Usuario',
                'prm':{
                    'idCnt':idCnt,
                    'bnd':5,
                    'idTM':2,
                    'idAcc':idAcc,
                    'idTree':idTree
                },
                'titulo':'Productos.',
                'border':false
            })]
        }),{
            xtype:"panel",
            region:'center',
            layout:'border',
            border:false,
            items:[
            {
                id:"pnlInfoGeneral",
                xtype:"panel",
                title:"",
                region:'north',
                layout:'column',
                border:true,
                height:193,
                bodyStyle:"padding: 1px;font-family:Arial;font-size:11px;",
                autoLoad:{
                    url:contexto+'/Cliente',
                    params:{
                        bnd:2,
                        'idCnt':idCnt
                    },
                    text:'Cargando información del paciente...',
                    timeout:600000
                },
                autoScroll:true,
                tbar : new Ext.Toolbar({
                    items:[
                    {
                        text:'Guardar y Regresar',
                        iconCls:'icn-back',
                        handler:function(){
                            IniciarAccion(idTree,true,true,'pnlCenter',new pnlBack(prmBack));
                        },
                        hidden:mostrarBack
                    },
                    '-',
                    //{xtype:'button',text:'Paciente/Cliente:',style:'font-weight:bold;font-size:12;',handleMouseEvents:false,handler:null},
                    //{xtype:'label',html:'&nbsp;'},
                    {
                        xtype:'button',
                        id:'idNomCnt',
                        text:'<b>'+TipoPac+': '+nameCnt+'</b>',
                        style:'font-weight:bold; font-size:12; text-transform:uppercase;',
                        handleMouseEvents:false,
                        handler:null
                    },'->',
                    {
                        text:'Actualizar Información',
                        iconCls:'icn-refresh',
                        hidden:mostrarLoad,
                        handler:function(){
                            ActualizarSesionPaciente({
                                'id':id ,
                                'idCnt':idCnt,
                                'idAcc':idAcc,
                                'idContenedor':idContenedor,
                                'mostrarBack':mostrarBack,
                                'mostrarLoad':mostrarLoad,
                                'idTree':idTree,
                                'nameCnt':nameCnt,
                                'TipoPac':TipoPac
                            });
                        }
                    }
                    ]//fin
                })
            },
            {
                xtype:'panel',
                id:'pnlShowActividad',
                region:'center',
                border:true,
                layout:'fit',
                autoScroll  : true,
                items:[
                new com.punto.pen.PanelBitacoraPaciente({
                    id:'grdBitacoraPaciente',
                    'idCnt':idCnt,
                    border:false
                })
                //new com.punto.pen.TreePanel({url:'',titulo:'Actividades Grales.',region:'center'}),

                ]
            },{
                xtype:'tabpanel',
                region:'east',
                border:true,
                title:'Campañas',
                collapsible     : true,
                hidden          :mostrarLoad,
                collapseMode    : 'mini',
                split           : true,
                width           : 150,
                minSize         : 200,
                maxSize         : 250,
                id              : "idPanelTabsUsr",
                deferredRender  : false,
                //layout          : 'form',
                activeTab       : 0,
                autoScroll      : true,
                enableTabScroll : true,
                //resizeTabs      : true,
                bodyStyle   : 'font-family: Arial;font-size: 11px;',
                items       : [
                {
                    xtype:'panel',
                    region:'east',
                    border:true,
                    title:'Campañas',
                    id          : "idPanelNotasAnte",
                    layout      : 'form',
                    autoScroll  : true,
                    bodyStyle   : 'font-family: Arial;font-size: 11px;',
                    autoLoad:{
                        url:contexto+'/Usuario',
                        params:{
                            bnd:13,
                            'idCnt':idCnt
                        },
                        text:'Cargando información del paciente...',
                        timeout:600000
                    }
                }
                ]
            }
            ]
        }
        ]
    });
    
    return this.pnlSesionPaciente;
}

function getCnt2(idCnt,tipo){
    var formAct =new com.punto.pen.regPaciente({
        id:'idActPacFrm',
        url:contexto+'/Cliente',
        'idCnt':idCnt,
        alto:465,
        obsTF:false,
        border:false,
        tipoCntModificar:tipo,
        valEmail:2
    }).crearFichaClienteUpdate(tipo);
    banBuscDup=false;
  
    var wnd = new  Ext.Window({
        id:'idTabPanelInfo',
        width:1050,
        height:550,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        title:'Actualizar Información',
        items:[
        formAct
        ],
        buttons:[ {
            text:'Actualizar',
            hidden:mostrarLoad,
            handler:function(){
                banBuscDup=true                
                submitFormulario(formAct,{
                    url:contexto+'/Cliente',
                    'idCnt':idCnt,
                    bnd:6,
                    wnd:'idTabPanelInfo'
                });
            }
        },{
            text:'Cancelar',
            handler:function(){
                banBuscDup=true;
                wnd.close();

            }
        }
        ],
        tools:[{
            id:'close',
            qtip: 'Cerrar',
            handler: function(event, toolEl, panel){
                banBuscDup=true;
                wnd.close();
            }
        }
        ]
    });
    wnd.show();
    loadFormulario(formAct,{
        url:contexto+'/Cliente',
        'idCnt':idCnt,
        bnd:5
    });
    
    if(tipo==1){
        Ext.getCmp('idPanelEmailSend').setVisible(true);
    }
    
}
function getCnt7(idCnt,Producto,tipo,idReceta){

    var formRect = new com.punto.pen.PanelRecetas({
        alto:420,
        id:'pnlRecetas',
        url:contexto+'/Recetas',
        'idCnt':idCnt,
        bnd:6,
        border:false,
        idPro:Producto
    }).crearFichaNuevaReceta(idCnt,Producto,tipo,idReceta);

    var grd = Ext.getCmp('gridBuscadorRecetasMedicas');
    var store = grd.getStore();

    var wnd = new  Ext.Window({
        id:'idTabPanelInfoRecetas',
        width:1000,
        height:500,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        title:'Recetas',
        items:[
        formRect
        ]
        ,
        buttons:[{
            text:'Cancelar Modificación'
            ,
            id:'botonesModificar2',
            hidden:true,
            handler:function(){
                LoadNuevaReceta(idCnt,Producto);
            }
        },

        {
            text:'Modificar',
            id:'botonesModificar',
            hidden:true,
            handler:function(){
                var panel2 = Ext.getCmp('FormRecetas');
                submitFormulario2(panel2,{
                    url:contexto+'/Recetas',
                    'idCnt':idCnt,
                    bnd:4,
                    wnd:'idTabPanelInfoRecetas'
                });
            }
        },{
            text:'Guardar',
            id:'botonesGuardar',
            handler:function(){
                Ext.getCmp('idHidenComen').setValue("1");
                var panel = Ext.getCmp('FormRecetas');
                if(Producto >= 291 && Producto <= 293){
                    Ext.Msg.show({
                        title:'Aviso',
                        msg:'Verifique la duracion del tratamiento ya que este no podra ser modificado ¿Continuar?',
                        buttons: Ext.Msg.YESNO,
                        fn:function(btn){
                            if(btn == 'yes'){
                                submitFormulario2(panel,{
                                    url:contexto+'/Recetas',
                                    'idCnt':idCnt,
                                    bnd:2,
                                    idPrd:Producto
                                });
                            }
                        }
                    });
                }else{
                    submitFormulario2(panel,{
                        url:contexto+'/Recetas',
                        'idCnt':idCnt,
                        bnd:2,
                        idPrd:Producto
                    });
                }
            }
        },

        {
            text:'Salir',
            id:'idBotonSalir',
            handler:function(){
                var wnd2 = Ext.getCmp('idTabPanelInfoRecetas');
                wnd2.close();
            }
        }]
    });
    wnd.show();
    store.load({
        params:{
            start:0,
            limit:5
        }
    });
      
}

function getBitacoraCompleta(idCnt){
    var formBita = new com.punto.pen.PanelBitacoraPaciente({
        id:'grdBitacoraPaciente',
        'idCnt':idCnt,
        border:false,
        'Store':2,
        idBi:'idBuscadorGridBitacora',
        height:420,
        load:false
    });

    var grd = Ext.getCmp('idBuscadorGridBitacora');
    var store = grd.getStore();

    var wnd = new  Ext.Window({
        id:'idPanelBita',
        width:1000,
        height:500,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:true,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        items:[
        formBita
        ],
        buttons:[ {
            text:'Salir',
            handler:function(){
                wnd.close();

            }
        }
        ]
    });
    wnd.show();
    store.load({
        params:{
            start:0,
            limit:20
        }
    });
}
function getEditarNota(idCnt){

    var wndEditarNota = new  Ext.Window({
        id:'idEditarNota',
        title:"Editar Nota",
        width:500,
        height:180,
        constrainHeader :true,
        modal:true,
        //        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        items:[
        new Ext.form.FormPanel({
            id:'IdPanelModificarRedNote',
            url:contexto+'/Cliente',
            border:false,
            items:[{
                html:"<textarea name=\"newNota\" style=\"background-color:#D80000; color:#ffffff; width:468px; height:92px; text-transform: uppercase; font-size: 11px;font-family: Arial, Helvetica, sans-serif;\" />",
                width:475,
                height:100,
                border:false
            }]
        })],
        buttons:[{
            text:"Guardar",
            handler:function(){
                var panel=Ext.getCmp("IdPanelModificarRedNote");
                submitFormulario(panel,{
                    url:contexto+'/Cliente',
                    'idCnt':idCnt,
                    bnd:19,
                    wnd:'idEditarNota'
                });
            }
        },{
            text:"Cancelar",
            handler:function(){
                wndEditarNota.close();
            }
        }]
    });
    if(mostrarLoad==false){
        wndEditarNota.show();
    }
}

function getEstatusTarjetas(idCnt){

    var formActivarTarjeta = new com.punto.pen.PanelActivarTarjeta({
        alto:270,
        'idCnt':idCnt,
        url:contexto+'/Tarjetas',
        id:"idFormActivarTarjeta",
        validar:"no"
    });
    var wnd = new  Ext.Window({
        id:'idActivarTarjetaForm',
        title:'Activar Tarjeta',
        modal:true,
        constrainHeader :true,
        draggable:true,
        resizable:false,
        width:600,
        height:350,
        layout:'anchor',
        autoScroll:false,
        bodyStyle: 'padding:5px;',
        border:false,
        items:[formActivarTarjeta],
        buttons:[{
            text:'Activar',
            handler:function(){
                submitFormulario(formActivarTarjeta,{
                    url:contexto+'/Tarjetas',
                    'idCnt':idCnt, 
                    bnd:2,
                    pnl:"idFormActivarTarjeta",
                    wnd:'idActivarTarjetaForm',
                    LoadGroup:0,
                    validar:"no"
                });
            }
        },{
            text:'Salir',
            handler:function(){
                Ext.Msg.show({
                    title:'Cerrar',
                    msg: '¿Está seguro que desea cerrar la ventana<br>Los datos no guardados se perderán?',
                    buttons: Ext.Msg.YESNO,
                    animEl: 'elId',
                    fn: function(btn){
                        if(btn == 'no'){}
                        if(btn == 'yes'){
                            var wnd = Ext.getCmp('idActivarTarjetaForm');
                            wnd.close();
                        }
                    },
                    icon: Ext.MessageBox.WARNING
                });
            }
        }]
    });
    wnd.show();

}