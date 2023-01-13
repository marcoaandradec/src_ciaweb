/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
function getDetalleFact(idfact,idRadio){
    var form = Ext.widget('form', {
        // layout:'column',
        id:'idActPacFrm',
        border: false,
        autoScroll:true,
        bodyPadding: 10,
        width: 680,
        // height :1000,
        //fieldDefaults: {labelWidth: 110},
        items: [{
            xtype:'fieldset',
            title: 'Datos Generelaes',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            layout: 'fit',
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                height: 50,
                defaults: {
                    labelWidth: 30,
                    width: 150,
                    labelAlign:'top'
                },
                items: [{
                    name: 'factura',
                    fieldLabel: 'Factura',
                    componentCls  : 'LineVerde',
                    readOnly :true
                },{
                    fieldLabel:'Referecia',
                    componentCls  : 'LineVerde',
                    name:'referencia',
                    readOnly :true
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    width: 150,
                    labelAlign:'top'
                },
                items: [{
                    name: 'fchfactura',
                    fieldLabel: 'Fecha Factura',
                    readOnly :true
                },{
                    fieldLabel:'Fecha Pedido',
                    name:'fchpedido',
                    readOnly :true
                },{
                    fieldLabel:'No. Envio',
                    name:'noenvio',
                    readOnly :true
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Cliente',
                    name:'nocliente',
                    readOnly :true,
                    width:310
                },{
                    fieldLabel:'Destino',
                    name:'destino',
                    readOnly :true,
                    width:310
                    
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    width: 150,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Cajas',
                    name:'nocajas',
                    readOnly :true
                },{
                    fieldLabel:'Kilos',
                    name:'kilos',
                    readOnly :true
                },{
                    fieldLabel:'Importe',
                    name:'importe',
                    readOnly :true
                }]
            },{
                xtype: 'container',
                defaultType: 'textareafield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Comentarios',
                    name:'Comentarios',
                    allowBlank: false,
                    grow      : true ,
                    width:220,
                    height:60,
                    readOnly :true
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Datos de Recibo',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            layout: 'fit',
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    width: 150,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Folio Entrada',
                    name:'folentrada',
                    readOnly :true
                },{
                    fieldLabel:'Fecha Recibo',
                    name:'fchrecibo',
                    readOnly :true
                },{
                    fieldLabel:'Guia Empresa',
                    name:'guiaempr',
                    readOnly :true
                },{
                    fieldLabel:'Ubicaci�n',
                    name:'ubicacion',
                    readOnly :true
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    //labelWidth: 100,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Entregar',
                    name:'entregar',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Fecha de Cancelaci�n',
                    name:'fechcancel',
                    readOnly :true,
                    width:150
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Datos de Embarque',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            layout: 'fit',
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Folio Embarque',
                    name:'folembarque',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Fecha Embarque',
                    name:'fchembarque',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Chofer',
                    name:'nombchofer',
                    readOnly :true,
                    width:220
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Datos de Entrega',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            layout: 'fit',
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Fecha Entrega',
                    name:'folentrega',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Pzas F.O.',
                    name:'piezas',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'A.R.',
                    name:'ar',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Tipo Rechazo',
                    name:'tiprechazo',
                    readOnly :true,
                    width:120
                }]
            },{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Tipo Rechazo',
                    name:'tiprechazo',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Motivo',
                    name:'motivo',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Accion',
                    name:'accion',
                    readOnly :true,
                    width:120
                }]
            }]
        },{
            xtype:'fieldset',
            title: 'Datos de Devoluci�n de Documentos',
            collapsible: false,
            defaults: {
                anchor: '100%'
            },
            layout: 'fit',
            items :[{
                xtype: 'container',
                defaultType: 'textfield',
                msgTarget : 'side',
                layout: 'hbox',
                defaults: {
                    labelWidth: 30,
                    labelAlign:'top'
                },
                items: [{
                    fieldLabel:'Folio dev. de docs.',
                    name:'foldevdocs',
                    readOnly :true,
                    width:120
                },{
                    fieldLabel:'Fecha dev. de docs.',
                    name:'fchdevdocs',
                    readOnly :true,
                    width:120
                }]
            }]
        }],
        buttons: [{
            text: 'Salir',
            handler: function() {
                this.up('window').destroy();
            }
        }]
    });
    Ext.define('MyApp.PanelDetFactura',
    {
        extend: 'Ext.Window',
        title: 'Informacion Factura ',
        closable: true,
        closeAction: 'destroy',
        height: 500,
        width: 700,
        modal:true,
        constrain: true,
        layout: 'fit',
        resizable: true,
        autoScroll:true,
        initComponent: function() {
            this.items = [form]
            this.callParent(arguments);
        }
    });
    var win1 = Ext.create('MyApp.PanelDetFactura');
    win1.show();
    loadFormulario(form,{
        url:contexto+'/Factura',
        'idCnt':idfact,
        'bndFact':idRadio,
        bnd:1
    });
}

function getGridDetFact(idfact,idRadio){
    Ext.define('ModelGridFactura', {
        extend: 'Ext.data.Model',
        fields: ['elegir','numFactura','fechFactura',
        'numEnvio']
    //,idProperty: 'numFactura'
    });
    var storeGridFactura = Ext.create('Ext.data.JsonStore', {
        id: 'storeGridFactura',
        model: 'ModelGridFactura',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: contexto+'/Factura?bnd=4&idFact='+idfact+'&bndFact='+idRadio,
            reader: {
                type: 'json',
                root: 'records'
            }
         }
    });
 //  storeGridFactura.load();
    var formFacturas = Ext.widget('form', {
        id:'idFormFacturas',
        border: false,
        //autoScroll:true,
        bodyPadding: 10,
        // width: 680,
        items: [Ext.create('Ext.grid.Panel', {
            id: "gridFacturas",
            height: 200,
          //  title: 'Facturas Encontradas',
            store: storeGridFactura,
            loadMask: true,
            selModel: {
                pruneRemoved: false
            },
            multiSelect: true,
            viewConfig: {
                trackOver: false
            },
            columns:[{
                xtype: 'rownumberer',
                width: 30,
                sortable: false
            },{                
                text: "elegir",
                dataIndex: 'elegir',
                width: 50,
                sortable: false
            },{
                id:'numFactura',
                text: "N�mero de Factura",
                dataIndex: 'numFactura',
                align: 'center',
                width: 130,
                sortable: true
            },{
                text: "Fecha de Factura",
                dataIndex: 'fechFactura',
                align: 'center',
                width: 120,
                sortable: true
            },{
                text: "N�mero de Envio",
                dataIndex: 'numEnvio',
                align: 'center',
                width: 120,
                sortable: true
            }]
        })]
    });
    Ext.define('MyApp.PanelGridFactura',
    {
        extend: 'Ext.Window',
        title: 'Facuras Encontradas',
        closable: true,
        closeAction: 'destroy',
        height: 250,
        width: 500,
        modal:true,
        constrain: true,
        layout: 'fit',
        resizable: false,
        //autoScroll:true,
        initComponent: function() {
            this.items = [formFacturas]
            this.callParent(arguments);
        }
    });
    var wingf = Ext.create('MyApp.PanelGridFactura');
    wingf.show();
}
