/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.panelHistorialEnv = function(params){
    var idc = (params.idc == null ? 0 : params.idc);
    var cf = "";

    var sm = new Ext.grid.RowSelectionModel({
                singleSelect:false
            });
            
    this.prm = {
        start:0,
        limit:20
    }

    var store = new Ext.data.Store({
        autoLoad : true,
        baseParams : this.prm,
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
            'loadexception':function(){
                store.removeAll();
            },
            'beforeload':function(st){
                

                st.baseParams = {
                    opc:7,                    
                    idc:idc,
                    cf:cf
                    
                };
                
            }
        }
    });

    var bbar = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : store,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    var tbar = [{
            xtype:"label",
            text:"Filtrar por folio: "
        },{
            xtype:"numberfield",
            id:"idTxtFiltrarHist",
            enableKeyEvents:true,
            width:90,
            style:'text-transform: uppercase;',
            listeners:{
                'keypress':function(txt,e){
//                    if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
//                                    e.stopEvent();
//                                }
                    if(e.keyCode==13){
                        var valor = txt.getValue();

                        cf = (valor == "" ? "" : " And e.eIdEnvio = " + valor);

                        var grid = Ext.getCmp("idGridHistorialEnv");
                        var store = grid.getStore();

                        store.load({
                            params:{
                                start:0,
                                limit:20
                            }
                        });
                    }
                }
            }

        },{
            xtype:"button",
            text:'Buscar',
            iconCls:'icn-busquedaDos',
            handler:function(){
                var txt = Ext.getCmp("idTxtFiltrarHist");
                var valor = txt.getValue();

                cf = (valor == "" ? "" : " And e.eIdEnvio = " + valor);

                var grid = Ext.getCmp("idGridHistorialEnv");
                var store = grid.getStore();

                store.load({
                    params:{
                        start:0,
                        limit:20
                    }
                });
            }
        }];


    var gridHistorialEnv = new Ext.grid.GridPanel({
        id      :"idGridHistorialEnv",
        store   :store,
        sm      :sm,
        bbar    :bbar,
        tbar    :tbar,
        columns : [
            new Ext.grid.RowNumberer(),
        {
            header: "Folio",
            width: 65,
            sortable: true,
            dataIndex: 'idEnvio',
            fixed:true
        },
        {
            header:"Paciente",
            width:150,
            sortable:true,
            dataIndex:'nombre'
        },
        {
            header:"Status",
            width:150,
            sortable:true,
            dataIndex:'status'
        },
        {
            header:"Observación envio",
            width:300,
            sortable:true,
            dataIndex:'observacion'
        }

        ],
        viewConfig      : {
            autoFill: true,
            forceFit: true
        },
        listeners: {
                'rowdblclick':function(grid){
                    var record = grid.getSelectionModel().getSelected();
                    var idEnv = record.get("idEnvio");
                    ventanaDetalleHistorial(idEnv);
                }
            }
    });

    return gridHistorialEnv;
    
}
function ventanaDetalleHistorial(idEnv){
    var wndDetalle = new com.punto.pen.WndActividades({
        titulo:"Detalles de envio no. " + idEnv,
        width:400,
        height:300,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            id:"pnlDetllsEnv",
            layout:'form',
            width:20,
            //height:20,
            autoHeight:true,
            autoScroll:true,
            items:[{
                align:"center",
                border:false,
                autoLoad:{
                    url:contexto+'/Almacen',
                    params:{
                        opc:8,
                        idEnv:idEnv
                    },
                    text:'Cargando detalle...',
                    callback : function(el,success,response,options){
                        if(success==true){
                            //alert();
                            wndDetalle.setHeight(Ext.getCmp("pnlDetllsEnv").getSize().height + 65);
                        }
                    }

                }
            }]
        }),
        botones:[{
            text:"Cerrar",
            handler:function(){
                wndDetalle.close();
            }
        }]
    });
    wndDetalle.show();
}


