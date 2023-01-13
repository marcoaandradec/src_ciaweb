/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelResumenActividad = function(argumentos){
    this.titulo     = (argumentos.titulo == null ? "" : argumentos.titulo);
    this.autoScroll = (argumentos.scroll==null ? true : argumentos.scroll);
    var id          = (argumentos.id==null ? '' : argumentos.id);
    var idAcc       = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    var idTree      = (argumentos.idTree==null ? '' : argumentos.idTree);
    var casa      = (argumentos.casa==null ? '0' : argumentos.casa);
    var tipoRep     = (argumentos.tipoRep==null ? '0' : argumentos.tipoRep);
    var MensaReturn      = (argumentos.casa==null ? 'Nutrición de Campo' : 'Módulo C.A.S.A.');


    var exportButton;
    var contador=0;
    var value_org = 0;

    var storeResumen = new Ext.data.Store({
        autoLoad: false,//(tipoRep==3),
        baseParams: {'bnd':2,'grd':id,'tipoRep':tipoRep,'casa':casa},
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordResumenActNC()),
        proxy :new Ext.data.HttpProxy({
            url : contexto+'/NutricionCampo',
            timeout:60000
        }),
        listeners:{
            'load':function(){
                //Ext.getCmp('idBtnExcel').enable();
            },
            'loadexception':function(){
                storeResumen.removeAll();
                //Ext.getCmp('idBtnExcel').disable();
            }
        }
    });
    
    var Resumentbar = new Ext.Toolbar({
        id: 'resumenTbar',
        items: [
            {xtype:'button',text:'Regresar',iconCls:'icn-back',
                handler:function(){
                    IniciarAccion(idTree,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:MensaReturn}));
                }
            },
            '-',
            {xtype:'label',text:'Del:'},
            {xtype:'datefield',id:'idFechaIni',value:new Date(2010,0,1)},
            {xtype:'label',text:'Al:'},
            {xtype:'datefield',id:'idFechaFin',value:new Date()},
            '-',
            new com.punto.pen.ComboBox({
                id:'cmbOrgNC',etiqueta:'Origen Nutriólog@s',name:'name_org_nc',hiddenName:'org_nc',allowBlank:false,emptyText:'Seleccione un origen',
                prm:{idCampo:'idOrgNC',campo:'org_nc','bnd':12,qry:42,autoCarga:((tipoRep==1)||(tipoRep==2)),url:contexto+'/ComboLoader',prm1:3,index:1},hidden:!((tipoRep==1)||(tipoRep==2)),
                evt:{
                    'select':function(cmb){
                        var grd = Ext.getCmp(id);
                        var c1 = Ext.getCmp('cmbIdCasasNC');
                        var valor = cmb.getValue();
                        value_org = valor;
                        if(tipoRep==2){
                            if(cmb.getValue()!=0){
                                c1.enable();
                                //grd.getBottomToolbar().bind(storeResumen);
                                //grd.reconfigure(storeResumen,getColumnAct(3));
                                c1.clearValue();
                                c1.getStore().load({
                                    params:{prm1:valor,index:1}
                                });
                                grd.getStore().removeAll();
                            }
    //                        else{
    //                            c1.disable();
    //                            //grd.getBottomToolbar().bind(storeResumen);
    //                            grd.reconfigure(storeResumen,getColumnAct(1));
    //                            storeResumen.load({
    //                                params:{tipoRep:1,fechaIni:Ext.getCmp('idFechaIni'),fechaFin:Ext.getCmp('idFechaFin'),idUsrOrg:valor}
    //                            });
    //                        }
                        }else{
                            if ((navigator.appName != 'Microsoft Internet Explorer')) {
                                storeResumen.load({
                                    params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y'),idUsrOrg:valor}
                                });
                                crearLinkButton(storeResumen);
                                if(contador==0){
                                    contador+=1;
                                    grd.getTopToolbar().add(exportButton);
                                }
                            }else{
                                storeResumen.load({
                                    params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y'),idUsrOrg:valor}
                                });
                            }
                        }
                    }
                },
                evtStore:{
                    'load':function(st,rc){
                        //st.load({idOrgNC:'0',org_nc:'Todos'},true);
                        //st.add([{idOrgNC:'0',org_nc:'Todos'}]);
                        //st.insert(0,[{idOrgNC:'0',org_nc:'Todos'}]);
                        //Ext.getCmp('cmbOrgNC').setValue('0');
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:'cmbIdCasasNC',etiqueta:'Nutriólog@s',name:'name_nc',hiddenName:'nc',allowBlank:false,emptyText:'Seleccione un(a) nutriólog@',
                prm:{idCampo:'idNC',campo:'nc','bnd':12,qry:59,autoCarga:false,url:contexto+'/ComboLoader'},hidden:(tipoRep!=2),
                evt:{
                    'select':function(cmb){
                        if(cmb.isValid()){
                            var grd = Ext.getCmp(id);
                            var valor = cmb.getValue();
                            value_org = valor;
                            if ((navigator.appName != 'Microsoft Internet Explorer')) {
                                storeResumen.load({
                                    params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y'),idUsrOrg:valor}
                                });
                                crearLinkButton(storeResumen);
                                if(contador==0){
                                    contador+=1;
                                    grd.getTopToolbar().add(exportButton);
                                }
                             }else{
                                 storeResumen.load({
                                     params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y'),idUsrOrg:valor}
                                 });
                             }
//                            if(valor==0){
                                //grd.reconfigure(storeResumen,getColumnAct(2));
                                
//                            }
//                            else{
//                                grd.reconfigure(storeResumen,getColumnAct(3));
//                                storeResumen.load({
//                                    params:{tipoRep:3,fechaIni:Ext.getCmp('idFechaIni'),fechaFin:Ext.getCmp('idFechaFin'),idUsrOrg:valor}
//                                });
//                            }
                        }else{
                            Ext.Msg.alert("","Debe seleccionar un(a) Nutriólog@ para continuar");
                        }
                    }
                },
                evtStore:{
                    'load':function(st,rc){
                        //st.load({idNC:'0',nc:'Todos'},true);
                        //Ext.getCmp('cmbIdCasasNC').setValue('0');
                    }
                }
            }),
            '-',
            {xtype:'button',text:'Generar',iconCls:'icn-contestarPregunta',
                handler:function(){
                    if(tipoRep==3){
                        storeResumen.load({
                            params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y')}
                        });
                    }else{
                        storeResumen.reload({
                            params:{fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y'),idUsrOrg:value_org}
                        });
                    }
                }
            },
            '-',
//            new Ext.ux.Exporter.Button({
//               store:storeResumen,
//               iconCls:'icn-excel',
//               title:'Exporta a Excel'
//            })
            {xtype:'button',text:'Descargar Excel',id:'idExportar',iconCls:'icn-excel',
                handler:function(){
                    Ext.ux.Grid2Excel.Save2Excel(Ext.getCmp(id));
                }
            }
        ]
    });

//    var Resumenpbar = new Ext.PagingToolbar({
//        id          : 'ResumenPgrid',
//        pageSize    : 25,
//        store       : storeResumen,
//        displayInfo : true,
//        displayMsg  : 'Mostrando Resumen {0} - {1} of {2}',
//        emptyMsg    : "No hay Resumen para mostrar"
//    });
    this.grd = new Ext.grid.GridPanel({
        title       : this.titulo,
        id          : id,
        forceLayout : true,
        store       : storeResumen,
        colModel    : getColumnAct(tipoRep),
        tbar        : Resumentbar,
        //bbar        : Resumenpbar,
        sm          : new Ext.grid.RowSelectionModel({singleSelect:true}),
        stripeRows  : true,
        loadMask    : true,
        viewConfig  : {autoFill: true, forceFit: true},
        autoWidth   : true,
        enableHdMenu: true,
        autoScroll  : this.autoScroll,
        frame       : false,
        border      : false,
        listeners   : {
            'render':function(grd){
                if(tipoRep==3){
                     if ((navigator.appName != 'Microsoft Internet Explorer')) {
                        storeResumen.load({
                             params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y')}
                        });
                        crearLinkButton(storeResumen);
                        if(contador==0){
                            contador+=1;
                            grd.getTopToolbar().add(exportButton);
                        }
                     }else{
                         storeResumen.load({
                             params:{tipoRep:tipoRep,fechaIni:Ext.getCmp('idFechaIni').getValue().format('d/m/Y'),fechaFin:Ext.getCmp('idFechaFin').getValue().format('d/m/Y')}
                         });
                     }
                }
            },
            'rowdblclick':function(grd){
            }
        }
    });
    
    
    function crearLinkButton(strExp){
        if ((navigator.appName != 'Microsoft Internet Explorer')) {
            exportButton = new Ext.ux.Exporter.Button({
              store:strExp,
              iconCls:'icn-excel',
              title:"Resumen de Actividades"
            });
            Ext.getCmp('idExportar').hide();
        }
    }

    return this.grd;
}

function getColumnAct(tipoCol){
    var colModel = null;
    if(tipoCol==1){
        colModel = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            {header: "Origen", width: 150, sortable: true, resizable: false,dataIndex: 'nombre_origen'},
            {header: "Actividad", width: 100, sortable: true, resizable: false,dataIndex: 'nombre_actividad'},
            {header: "No. Contactos", width: 100, sortable: true, resizable: false,dataIndex: 'no_contactos'}
        ]);
    }else if(tipoCol==2){
        colModel = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            {header: "Origen", width: 150, sortable: true, resizable: false,dataIndex: 'nombre_origen'},
            {header: "Nutriólog@", width: 150, sortable: true, resizable: false,dataIndex: 'nombre_nutriologa'},
            {header: "Actividad", width: 100, sortable: false, resizable: false,dataIndex: 'nombre_actividad'},
            {header: "No. Contactos", width: 100, sortable: false, resizable: false,dataIndex: 'no_contactos'}
        ]);
    }else if(tipoCol==3){
        colModel = new Ext.grid.ColumnModel([
            new Ext.grid.RowNumberer(),
            {header: "Nutriólog@", width: 150, sortable: true, resizable: false,dataIndex: 'nombre_nutriologa'},
            {header: "Actividad", width: 100, sortable: false, resizable: false,dataIndex: 'nombre_actividad'},
            {header: "No. Contactos", width: 100, sortable: false, resizable: false,dataIndex: 'no_contactos'}
        ]);
    }
    return colModel;
}

//        {name: 'id_usuario',mapping: 'id_usuario'},
//        {name: 'nombre_usuario',mapping: 'nombre_usuario'},
//        {name: 'fecha_alta',mapping: 'fecha_alta'},
//        {name: 'fecha_actividad',mapping: 'fecha_actividad'},
//        {name: 'id_actividad',mapping: 'id_actividad'},
//        {name: 'nombre_actividad',mapping: 'nombre_actividad'},
//        {name: 'cantidad_pacientes',mapping: 'cantidad_pacientes'},
//        {name: 'id_origen',mapping: 'id_origen'},
//        {name: 'nombre_origen',mapping: 'nombre_origen'},
//        {name: 'id_area',mapping: 'id_area'},
//        {name: 'nombre_area',mapping: 'nombre_area'}