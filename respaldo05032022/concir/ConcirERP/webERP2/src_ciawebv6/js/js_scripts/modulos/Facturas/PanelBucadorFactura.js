/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelBuscarFactura = function(argumentos){
    var idPnl = (argumentos.id==null ? '' : argumentos.id);
    var url = (argumentos.url==null ? '' : argumentos.url);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    var idFact = (argumentos.idFact==null ? '1' : argumentos.idFact);
    var bndFact=(argumentos.bndFact==null ? '' : argumentos.bndFact);
    var record = Ext.data.Record.create([
    {
        name: 'elegir',
        type:'string'
    },
    {
        name: 'numFactura',
        type: 'string'
    },
    {
        name: 'fechFactura',
        type: 'string'
    },
    {
        name: 'numEnvio',
        type: 'string'
    }
    ]);

    var storeBuscadorFact = new Ext.data.Store({
        autoLoad: true, //true para q carge al inicio de session, false no haga nada
        baseParams: {
            'bnd':4,
            'idFact':idFact
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },record),
        proxy :new Ext.data.HttpProxy( {
            url :contexto+'/Factura' //contexto+'/BitacoraTransaccion'
        })
    });
    

    var pnlBusFact = new Ext.grid.GridPanel({
        id              : 'idGridBusqFactura',
        region          : this.region,
        anchor          : this.anchor,
        columnWidth     : this.columnWidth,
        height          : 210,
        border:false,
        store           : storeBuscadorFact,
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
        columns         : [
        new Ext.grid.RowNumberer(),

        {
            header: "Elegir",
            align: 'center',
            width: 75,
            sortable: true,
            dataIndex: 'elegir'
        },
        {
            header: "Número de Factura",
            align: 'center',
            width: 75,
            sortable: true,
            dataIndex: 'numFactura'
        },

        {
            header: "Fecha de Factura",
            align: 'center',
            width: 75,
            sortable: true,
            dataIndex: 'fechFactura'
        },

        {
            header: "Número de Envio",
            align: 'center',
            width: 75,
            sortable: true,
            dataIndex: 'numEnvio'
        }
        ]
    });

    var PanelBuscarFactura = new Ext.FormPanel({
        id:idPnl,
        url: url,
        style: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        labelWidth:150,
        items:[pnlBusFact]
    });
    return PanelBuscarFactura;
}