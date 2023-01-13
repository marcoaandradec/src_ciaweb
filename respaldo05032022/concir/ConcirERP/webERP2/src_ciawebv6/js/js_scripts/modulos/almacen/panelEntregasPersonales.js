/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
function accionEntregasPersonales(){
    IniciarAccion(
        'pnlTreeAccionesAlmacen',
        true,
        true,
        'pnlCenter',
        new com.punto.pen.PanelEntregasPersonales({
    //        btnVis:false,
            idTree:'pnlTreeAccionesAlmacen'
    //        mnsg:'Módulo almacen',
    //        id:'idGridEnvio',
    //        titulo:'Listado de Envios'
        })
    );
}

com.punto.pen.PanelEntregasPersonales = function(parametros){
    var idTree = (parametros.idTree == null ? 'pnlTreeAccionesCASA' : parametros.idTree);

    var rt = Ext.data.Record.create([
           {name: 'indice'},//0
           {name: 'idEnvio'},
           {name: 'observacion', type: 'string'},
           {name: 'fecha', type: 'string'}
       ]
    );

    var store = new Ext.data.Store({
        //autoLoad : true,
        baseParams : {
            opc:12
            //idStatus:18,
            //consul:0,
            //idc:0,
            //cf:""
        },
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'idEnvio'
        },
        new com.punto.pen.EnvioAlmacen()),
        proxy : new Ext.data.HttpProxy({
            url : contexto+'/Almacen',
            timeout:360000
        }),
        listeners:{

        }
    });

    var pbarAlmacen = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 100,
        store       : store,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    var sm = new Ext.grid.CheckboxSelectionModel({
    singleSelect:false,
    listeners: {
        beforerowselect: function (sm,row_index, keepExisting, record) {
            sm.suspendEvents();
            if (sm.isSelected(row_index)) {
                sm.deselectRow(row_index);
                record.set('cantidad','0');
            } else {
                sm.selectRow(row_index, true);
            }
            sm.resumeEvents();

            var grd = Ext.getCmp("idGridEntregasPersonales");
            var records = grd.getSelectionModel().getSelections();

//            if(Ext.getCmp("idComboStatusEnvio").getValue()==1 || Ext.getCmp("idComboStatusEnvio").getValue()==2){
//            }else{
//                sm.clearSelections(false);
//            }

            //return false;

        },
        selectionchange:function(sm){
            var grd = Ext.getCmp("idGridEntregasPersonales");
            var records = grd.getSelectionModel().getSelections();         

            
            envSelecs = "";

            for(var i = 0; i < records.length; i++){
                envSelecs += records[i].get('idEnvio') + ",";
            }
            //alert(envSelecs);
        }
      }
    });  

    var panel = new Ext.Panel({
        id: "idPanelEntregasPersonales",
        layout:"fit",
        frame: true,
        anchor:"100%",
        items:[new Ext.grid.EditorGridPanel({
            id      :"idGridEntregasPersonales",
            title   :"Entregas personales",
            store   :store,
            sm      :sm,
//                new Ext.grid.RowSelectionModel({
//                        singleSelect:false,
//                        listeners:{
//                            rowselect:function(sm,index,rec){
//                                var records = sm.getSelected();
//                                envSelecs = "";
////                                Ext.getCmp("idDarVoBo").enable();
////                                Ext.getCmp("idCancelarEnvio").enable();
//                                envSelecs = records.get("idEnvio");
//                            }
//                        }
//                    }),
            tbar:[{
                text:"Regresar",
                iconCls:"icn-back",
                handler:function(){
                    IniciarAccion(idTree,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                        msg:"Módulo almacen"
                    }));
                }
            },'-',new com.punto.pen.ComboBox({
                    id:"idCmbCASAS",
                    etiqueta:"C.A.S.A.",
                    allowBlank:false,
                    name:"cmbCASAS",
                    prm:{
                        campo:"casa",
                        idCampo:'idCasa',
                        autoCarga:true,
                        bnd:5,
                        qry:111
                    }
            }),'-',{
                xtype:"datefield",
                id:"idFechaDe",
                emptyText:"Fecha de:"
            },'-',{
                xtype:"datefield",
                id:"idFechaA",
                emptyText:"Fecha a:"
            },'-',{
                xtype:"button",
                text:"Buscar",
                iconCls:'icn-busquedaDos',
                handler:function(){
                    var grid = Ext.getCmp("idGridEntregasPersonales");
                    var store = grid.getStore();

//                    store.load({
//                        params:{
//                            start:0,
//                            limit:20,
//                            idStatus:16,
//                            idCASA:Ext.getCmp("idCmbCASAS").getValue(),
//                            fechade:Ext.getCmp("idFechaDe").getValue(),
//                            fechaa:Ext.getCmp("idFechaA").getValue()
//                        }
//                    });
                    store.on('beforeload', function(){
                       store.baseParams = {
                           opc:12,
                           idStatus:16,
                            idCASA:Ext.getCmp("idCmbCASAS").getValue(),
                            fechade:Ext.getCmp("idFechaDe").getRawValue(),
                            fechaa:Ext.getCmp("idFechaA").getRawValue()
                       } 
                    });
                    store.load({params:{start:0,limit:100}});

                }
            },'-',{
                xtype:'button',
                id:'idImprimirEnviosAbiertos',
                text:'Imprimir',
                iconCls:'icn-imprimir',
                handler:function(){
                    MnsWaiting();
                    var grid = Ext.getCmp("idGridEntregasPersonales");
                    var cmb = Ext.getCmp('idComboStatusEnvio');
//                    if(cerrados == true || cmb.getValue() != '1'){

                        document.frmPdfEnvio.idEnvio.value = envSelecs;

                        //alert(document.frmPdfEnvio.idEnvio.value);

                        var formulario = document.frmPdfEnvio;
                        needToConfirm=false;
                        formulario.submit();
//                    }
//                    if(cmb.getValue()=='1'){
//                        imprimirPapeleta(grid);
//                    }
                    MnsWaiting().hide();
                }
            }
//            ,{
//                id:"idDarVoBo",
//                text:"Dar Vo Bo",
//                disabled:true,
//                iconCls:'icn-habilita',
//                handler:function(){
//                    cambiarStatusEnvios("idGridsAlmacenVoBo",1,"Abierto");
//                }
//            },'-',{
//                id:"idCancelarEnvio",
//                text:"Cancelar envio",
//                disabled:true,
//                iconCls:'icn-cancela',
//                handler:function(){
//                    cambiarStatusEnvios("idGridsAlmacenVoBo",7,"Cancelado");
//                }
//            }
            ],
//            columns: [
//                new Ext.grid.RowNumberer(),
            cm:new Ext.grid.ColumnModel([
             sm,
            {header:"Folio", width:65, sortable:true, dataIndex:'idEnvio', fixed:true},            
            {header:'Observacion', width:120, sortable:true, dataIndex:'observacion'},
            {header:'Fecha', width:100, sortable:true, dataIndex:'fecha'},
            ]),
            viewConfig      : {
                autoFill: true,
                forceFit: true
            },
            listeners:{
                rowdblclick:function(grid){
                    imprimirPapeleta(grid,"VoBo");
                }
            },
            bbar    :pbarAlmacen
        })]
    });

    return panel;
}


