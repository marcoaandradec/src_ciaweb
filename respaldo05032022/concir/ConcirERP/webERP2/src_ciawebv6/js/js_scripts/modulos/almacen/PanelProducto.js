/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */
function getModuloFacturas2() {
function BtnBusqExistncs() {        
        var idEmpresa = "";
        var param;
        if (Ext.getCmp('idCmbAlmacen').getRawValue() == '') {
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe Seleccionar alguna empresa para realizar la Consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            if (Ext.getCmp('idCmbAlmacen').getValue() != '')
                idalmacen = Ext.getCmp('idCmbAlmacen').getValue();
            param = {                
                idEmpresa: "'" + idEmpresa + "'",
                busqBnd: 1
            };
            BuscarProducto(param);
        }
    }
    function BuscarProducto(prm) {
        var grd = Ext.getCmp('gridBuscadorExistencias');
        var store = grd.getStore();
        store.removeAll(true);
        store.reload({
            params: prm
        });
        var myMaskgrd = grd.setLoading("Cargando...", true);
        setTimeout(function () {
            myMaskgrd.destroy();
        }, 11000);
    }
    function BtnLimpBuscExist() {
        Ext.getCmp('idCvProducto').setValue("");
        Ext.getCmp('idCmbAlmacen').setValue("");
        var storeGridBuscEx = Ext.getCmp('gridBuscadorExistencias').getStore();
        storeGridBuscEx.load({
            url: contexto + '/Factura?bnd=6'
        });
    }
     Ext.define('ModelExistenciasProd1', {
        extend: 'Ext.data.Model',
        fields: ['elegir', 'prdid', 'prdclave','prdupc', 'prdclaveext', 'prdnombre', 'prdempid','prdestatus', 'prdlinid', 'plinombre',
                 'prdfamid','pfanombre','prdtprid','ptinombre','prdinventario','prdventa','prdcompuesto','prdcosto','prdmoncosto','prdprecio','prdmonprecio','prdualid','ualnombre',
                 'prdinner','prdpeso','prdunipeso','prdvolumen','prdunivol','prdopc1','prdopc2','prdopc3','prdopc4','prdopc5' ],
        idProperty: 'clvProducto'
    });
    var storeExistProd = Ext.create('Ext.data.Store', {
        id: 'storeExistProd',
        model: 'ModelExistenciasProd1',
        remoteSort: true,
        leadingBufferZone: 300,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 100,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: contexto + '/Producto?bnd=1',
            reader: {
                rootProperty: 'records',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        sorters: [{
                property: 'elegir',
                direction: 'DESC'
            }],
        listeners: {
            datachanged: function () {
                var grdBusExis = Ext.getCmp('gridBuscadorExistencias');
                var myMask = grdBusExis.setLoading("Cargando...", true);
                setTimeout(function () {
                    myMask.destroy();
                }, 2000);
            }
        }
    });


    return{
        start: {
            id: 'start-panel',
            deferredRender: false,
            autoScroll: true,
            activeTab: 0, // first tab initially active
            html: '<table align=\"center\" style=\"width:100%;height:100%\">' +
                    '<tr><td align=\"center\" valign=\"top\">&nbsp;</td></tr>' +
                    '<tr><td align=\"center\">' +
                    '<div><img src=\"' + contexto + '/img/logoArgo2.png\" width="180" height="180"></div>' +
                    '</td></tr>' +
                    '<tr><td align=\"center\" valign=\"top\">' +
                    '<b>Bienvenido al Sistema ARGO Logística...<br>' +
                    '</td></tr>' +
                    '</table>'
        },
        formPnlProducto: {
            xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
            id: 'idMenu300',
            labelWidth: 75,
            title: 'Consulta de Productos',
            bodyStyle: 'padding:15px',
            width: 350,
            labelPad: 20,
            autoScroll: true,
            items: [{
                    xtype: 'fieldset',
                    title: 'Parametros de Consulta',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
                    layout: 'fit',
                    items: [{
                            xtype: 'panel',
                            border: false,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [{
                                    xtype: 'container',
                                    msgTarget: 'side',
                                    height: 35,
                                    defaults: {
                                        labelWidth: 70,
                                        flex: 1
                                    },
                                    items: [{
                                            xtype: 'combobox',
                                            id: "idCmbAlmacen",
                                            name: "cmbAlmacen",
                                            fieldLabel: 'Empresa',
                                            flex: 1,
                                            width: 250,
                                            store: createStore('idTAlmacen', 'tipAlmacen', 1, 1),
                                            valueField: 'empid',
                                            displayField: 'empnomcorto',
                                            queryMode: 'remote',
                                            emptyText: 'Seleccione Empresa',
                                            typeAhead: true,
                                            allowBlank: true
                                        }]
                                }]
                        }]
                }, {
                    xtype: "panel",
                    msgTarget: 'side',
                    border: false,
                    height: 35,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    items: [{
                            xtype: 'container',
                            items: [{
                                    xtype: 'button',
                                    text: 'Regresar',
                                    iconCls: 'icn-back',
                                    width: 90,
                                    handler: function () {
                                        habilitar();
                                    }
                                }, {
                                    xtype: 'label',
                                    html: '&nbsp;&nbsp;&nbsp;'
                                }, {
                                    xtype: 'button',
                                    text: 'Buscar',
                                    arrowAlign: 'center',
                                    iconCls: 'icn-busquedaDos',
                                    handler: BtnBusqExistncs,
                                    width: 90
                                }, {
                                    xtype: 'label',
                                    html: '&nbsp;&nbsp;&nbsp;'
                                }, {
                                    xtype: 'button',
                                    text: 'Limpiar',
                                    arrowAlign: 'center',
                                    iconCls: 'icn-limpiarBusqueda',
                                    handler: BtnLimpBuscExist,
                                    width: 90
                                }]
                        }]
                }, Ext.create('Ext.grid.Panel', {
                    id: "gridBuscadorExistencias",
                    height: 290,
                    title: ' Productos',
                    store: storeExistProd,
                    selModel: {
                        pruneRemoved: false
                    },
                    multiSelect: true,
                    viewConfig: {
                        loadMask: false,
                        trackOver: false
                    },
                    // grid columns
                    columns: [{
                            xtype: 'rownumberer',
                            width: 50,
                            sortable: false
                        }, {
                            text: "Elegir",
                            dataIndex: 'elegir',
                            width: 70,
                            sortable: false
                        }, {
                            text: "Clave Producto",
                            dataIndex: 'prdclave',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Nombre",
                            dataIndex: 'prdnombre',
                            width: 250,
                            sortable: true
                        }, {
                            text: "Linea de Negocio",
                            dataIndex: 'prdlinid',
                            align: 'center',
                            width: 100,
                            sortable: true
                        }, {
                            text: "Clasificacion",
                            dataIndex: 'prdfamid',
                            align: 'center',
                            width: 80,
                            sortable: true
                        }, {
                            text: "Tipo de Producto",
                            dataIndex: 'prdtprid',
                            align: 'center',
                            width: 105,
                            sortable: true
                        }, {
                            text: "Unidad",
                            dataIndex: 'prdualid',
                            align: 'center',
                            width: 95,
                            sortable: true
                        }, {
                            text: "Inner",
                            dataIndex: 'prdinner',
                            align: 'center',
                            width: 115,
                            sortable: true
                        }, {
                            text: "Estatus",
                            dataIndex: 'prdestatus',
                            align: 'center',
                            width: 115,
                            sortable: true
                        }]
                })]
        }
    };
}