/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

function verHistorialPuntos(idc){
    new com.punto.pen.WndHistorialPnts({idc:idc});
}

com.punto.pen.WndHistorialPnts = function(prms){
    
    var wndHistorial = new com.punto.pen.WndActividades({
        titulo:"Historial de puntos del paciente: " + prms.idc,
        width:1100,
        height:400,
        pnl:new com.punto.pen.gridHistorialPnts({idc:prms.idc}),
        botones:[{
            text:"Cerrar",
            handler:function(){
                wndHistorial.close();
            }
        }]
    });
    wndHistorial.show();

    var grid = Ext.getCmp("idGridHistorialPuntos");
    var store = grid.getStore();

    store.load({params:{start:0,limit:20}});
}

com.punto.pen.gridHistorialPnts = function(params){
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
        autoLoad : false,
        baseParams : this.prm,
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'idEnvio'
        },
        new com.punto.pen.HistorialPuntos()),
        proxy : new Ext.data.HttpProxy({
            url : contexto+'/Puntos',
            timeout:360000
        }),
        listeners:{
            'loadexception':function(){
                store.removeAll();
            },
            'beforeload':function(st){
                st.baseParams = {
                    bnd:1,
                    idc:idc
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
            xtype:"textfield",
            id:"idTxtFiltrarHist",
            enableKeyEvents:true,
            width:90,
            listeners:{
                'keypress':function(txt,e){
                    if(e.keyCode==13){
                        var valor = txt.getValue();

                        cf = (valor == "" ? "" : " And e.eIdEnvio = " + valor);

                        var grid = Ext.getCmp("idGridHistorialPuntos");
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

                var grid = Ext.getCmp("idGridHistorialPuntos");
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
        id      :"idGridHistorialPuntos",
        store   :store,
        sm      :sm,
        bbar    :bbar,
        //tbar    :tbar,
        columns : [
            new Ext.grid.RowNumberer(),
        {
            header: "No.",
            width: 65,
            sortable: true,
            dataIndex: 'noMov',
            fixed:true
        },
        {
            header:"Paciente",
            width:150,
            sortable:true,
            dataIndex:'cliente'
        },
        {
            header:"Premio",
            width:300,
            sortable:true,
            dataIndex:'premio'
        },
        {
            header:"Regla",
            width:300,
            sortable:true,
            dataIndex:'regla'
        },
        {
            header:"Pnts",
            width:70,
            sortable:true,
            dataIndex:'pntsAcumulados'
        },
        {
            header:"Fecha",
            width:150,
            sortable:true,
            dataIndex:'fecha'
        },
        {
            header:"Usuario",
            width:250,
            sortable:true,
            dataIndex:'quienGenero'
        },
        {
            header:"Movimiento",
            width:150,
            sortable:true,
            dataIndex:'movimiento'
        },
        {
            header:"Total",
            width:100,
            sortable:true,
            dataIndex:'totPnts'
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

com.punto.pen.HistorialPuntos = function(){
    var record = Ext.data.Record.create([
       {name: 'indice'},
       {name: 'noMov'},
       {name: 'cliente', type: 'string'},
       {name: 'premio', type: 'string'},
       {name: 'regla', type: 'string'},
       {name: 'pntsAcumulados', type: 'string'},
       {name: 'fecha', type: 'string'},
       {name: 'quienGenero', type: 'string'},
       {name: 'movimiento', type: 'string'},
       {name: 'totPnts', type: 'string'}
    ]);
    return record;
}