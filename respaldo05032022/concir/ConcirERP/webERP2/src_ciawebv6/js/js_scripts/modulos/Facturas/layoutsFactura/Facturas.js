/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
function getModuloFacturas() {
    Ext.define('ModelFacturasEst', {
        extend: 'Ext.data.Model',
        fields: ['elegir', 'estatus', 'factura',
            'referencia', 'envio', 'numCliente', 'nombCliente',
            'destino', 'numCajas', 'importe', 'fechFactura',
            'fechIngreso', 'cita', 'fechEmbarq', 'fechEntreg', 'comentarios'],
        idProperty: 'factura'
    });
    // create the Data Store
    var Facturas = Ext.create('Ext.data.Store', {
        id: 'store',
        model: 'ModelFacturasEst',
        remoteSort: true,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 200,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: contexto + '/Factura?bnd=2',
            reader: {
                rootProperty: 'records',
                totalProperty: 'total'
            },
            // sends single sort as multi parameter
            simpleSortMode: true
        },
        //groupField: 'estatus','referencia',
        sorters: [{
                property: 'elegir',
                direction: 'DESC'
            }],
        listeners: {
            datachanged: function () {
                var grdBusFact = Ext.getCmp('gridBuscadorFactura');
                var myMask1 = grdBusFact.setLoading("Cargando...", true);
                setTimeout(function () {
                    myMask1.destroy();
                }, 2000);
            }
        }
    });
    function clickBtnBusqEstatus() {
        var date1 = "dd/mm/yyyy";
        var date2 = "dd/mm/yyyy";
        var tipoCli = "";
        var estatus = "";
        var IdStatus = "";
        var param;
        if ((Ext.getCmp('idFechaIni').getRawValue() == '') && (Ext.getCmp('idFechaFin').getRawValue() == '')) {
            Ext.Msg.show({
                title: 'Datos Incompletos',
                msg: 'Debe llenar al menos el rango de fecha para realizar la consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            if (Ext.getCmp('idFechaIni').getRawValue() != '')
                date1 = Ext.getCmp('idFechaIni').getRawValue(); //.format('d/m/Y');
            if (Ext.getCmp('idFechaFin').getRawValue() != '')
                date2 = Ext.getCmp('idFechaFin').getRawValue(); //.format('d/m/Y');
            if (Ext.getCmp('idcmbTipoCliente').getRawValue() != '')
                tipoCli = Ext.getCmp('idcmbTipoCliente').getValue();
            if (Ext.getCmp('idCmbEstatus').getRawValue() != '')
                estatus = Ext.getCmp('idCmbEstatus').getRawValue();
            IdStatus = Ext.getCmp('idCmbEstatus').getValue();
            if (Ext.getCmp('idFechaIni').getRawValue() != '' && Ext.getCmp('idFechaFin').getRawValue() != '') {
                param = {
                    'fechaIni': "'" + date1 + "'",
                    'fechaFin': "'" + date2 + "'",
                    'tipoCliente': "'" + tipoCli + "'",
                    'estatus': "'" + estatus + "'",
                    'idestatus': "'" + IdStatus + "'",
                    'busqBnd': '1'
                };
                BuscarFacturas1(param);
            } else {
                Ext.Msg.show({
                    title: 'Datos Incompletos',
                    msg: 'Debe completar el rango de fecha a consultar.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    }
    function clickBtnExcel() {
        var date1 = "dd/mm/yyyy";
        var date2 = "dd/mm/yyyy";
        var idTipoCli = "";
        var tipoCli = "";
        var estatus = "";
        var IdStatus = "";
        if ((Ext.getCmp('idFechaIni').getRawValue() == '') && (Ext.getCmp('idFechaFin').getRawValue() == '') &&
                (Ext.getCmp('idcmbTipoCliente').getRawValue() == '') && (Ext.getCmp('idCmbEstatus').getRawValue() == '')) {
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe llenar al menos el rango de fecha para realizar la consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            if (Ext.getCmp('idFechaIni').getRawValue() != '')
                date1 = Ext.getCmp('idFechaIni').getRawValue();
            if (Ext.getCmp('idFechaFin').getRawValue() != '')
                date2 = Ext.getCmp('idFechaFin').getRawValue();
            if (Ext.getCmp('idcmbTipoCliente').getRawValue() != '')
                idTipoCli = Ext.getCmp('idcmbTipoCliente').getValue();
            tipoCli = Ext.getCmp('idcmbTipoCliente').getRawValue();
            if (Ext.getCmp('idCmbEstatus').getRawValue() != '')
                estatus = Ext.getCmp('idCmbEstatus').getRawValue();
            IdStatus = Ext.getCmp('idCmbEstatus').getValue();
            if (Ext.getCmp('idFechaIni').getRawValue() != '' && Ext.getCmp('idFechaFin').getRawValue() != '') {
                document.frmExportExcel.fInicio.value = date1;
                document.frmExportExcel.fFin.value = date2;
                document.frmExportExcel.idTipoCli.value = idTipoCli;
                document.frmExportExcel.TipoCli.value = tipoCli;
                document.frmExportExcel.status.value = estatus;
                document.frmExportExcel.idStatus.value = IdStatus;
                document.frmExportExcel.submit();
            } else {
                Ext.MessageBox.show({
                    title: 'Datos Incompletos',
                    msg: 'Debe completar el rango de fecha a consultar.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.INFO
                });
            }
        }
    }
    function BuscarFacturas1(prm) {
        var gridBuscFact = Ext.getCmp('gridBuscadorFactura');
        var store = gridBuscFact.getStore();
        store.removeAll(true);
        store.load({
            //  url: contexto+'/Factura?bnd=2',
            params: prm
        });
        var myMaskBuscFact = gridBuscFact.setLoading("Cargando...", true);
        setTimeout(function () {
            myMaskBuscFact.destroy();
        }, 11000);
    }
    function clickBtnLimpiarParts() {
        Ext.getCmp('idFechaIni').setValue("");
        Ext.getCmp('idFechaFin').setValue("");
        Ext.getCmp('idcmbTipoCliente').setValue("");
        Ext.getCmp('idCmbEstatus').setValue("");
        var storeGridBuscFact = Ext.getCmp('gridBuscadorFactura').getStore();
        storeGridBuscFact.load({
            url: contexto + '/Factura?bnd=6'
        });
    }
//--------------------------------------------------------------------------funciones Existencias Prodcutos Almacen------------------------------------------------------------------------------------------------//
    Ext.define('ModelExistenciasProd', {
        extend: 'Ext.data.Model',
        fields: ['elegir', 'clvProducto', 'decripcion',
            'linea', 'familia', 'uniAlmacenado', 'existReal',
            'existReservada', 'existDisponible', 'almacen'],
        idProperty: 'clvProducto'
    });
    // create the Data Store
    var storeExistProd = Ext.create('Ext.data.Store', {
        id: 'storeExistProd',
        model: 'ModelExistenciasProd',
        remoteSort: true,
        leadingBufferZone: 300,
        // allow the grid to interact with the paging scroller by buffering
        buffered: true,
        pageSize: 100,
        proxy: {
            // load using script tags for cross domain, if the data in on the same domain as
            // this page, an HttpProxy would be better
            type: 'jsonp',
            url: contexto + '/Factura?bnd=3',
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
    function BtnBusqExistncs() {
        var idProducts = "";
        var idalmacen = "";
        var param;
        if (Ext.getCmp('idCmbAlmacen').getRawValue() == '') {
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe Seleccionar Almacen para realizar la Consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            if (Ext.getCmp('idCvProducto').getValue() != '')
                idProducts = Ext.getCmp('idCvProducto').getValue();
            if (Ext.getCmp('idCmbAlmacen').getValue() != '')
                idalmacen = Ext.getCmp('idCmbAlmacen').getValue();
            param = {
                'idProducts': "'" + idProducts + "'",
                'idAlmacen': "'" + idalmacen + "'",
                'busqBnd': 1
            };
            BuscarExistencias(param);
        }
    }
    function BuscarExistencias(prm) {
        var grd = Ext.getCmp('gridBuscadorExistencias');
        var store = grd.getStore();
        store.removeAll(true);
        store.load({
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
    function BtnBusqExistncsExcel() {
        var idProducts = "";
        var nomProduct = "";
        var idalmacen = "";
        var nomAlmacen = "";
        if (Ext.getCmp('idCmbAlmacen').getRawValue() == '') {
            Ext.MessageBox.show({
                title: 'Datos Incompletos',
                msg: 'Debe Seleccionar Almacen para realizar la Consulta.',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO
            });
        } else {
            if (Ext.getCmp('idCvProducto').getValue() != '')
                idProducts = Ext.getCmp('idCvProducto').getValue();
            nomProduct = Ext.getCmp('idCvProducto').getRawValue();
            if (Ext.getCmp('idCmbAlmacen').getValue() != '')
                idalmacen = Ext.getCmp('idCmbAlmacen').getValue();
            nomAlmacen = Ext.getCmp('idCmbAlmacen').getRawValue();
            document.frmExpExlExist.idProducts.value = idProducts;
            document.frmExpExlExist.nomProduct.value = nomProduct;
            document.frmExpExlExist.idalmacen.value = idalmacen;
            document.frmExpExlExist.nomAlmacen.value = nomAlmacen;
            document.frmExpExlExist.submit();
        }
    }
    return {
//Panel Inicio
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
        //Panel Consulta por Factura

        form: {
            xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
            id: 'idMenu156',
            labelWidth: 80,
            title: 'Plantilla Prueba',
            bodyStyle: 'padding:15px',
            width: 350,
            labelPad: 20,
            autoScroll: true,
            items: [
                {
                    xtype: 'fieldset',
                    title: 'Datos Generales',
                    collapsible: false,
                    defaults: {
                        anchor: '100%'
                    },
//                    layout: 'fit',
                    items: [{
                            xtype: 'panel',
                            border: false,
                            width: 800,
                            height: 250,
                            layout: {
                                type: 'table',
//                                align: 'stretch',
                                columns: 3
                            },
                            defaults: {
                                // applied to each contained panel
                                bodyStyle: 'padding:30px'
                            },
                            items: [
                                {
                                    xtype: 'textfield',
                                    name: 'Concepto',
                                    fieldLabel: 'Concepto',
                                    allowBlank: false,
                                    readOnly: true,
                                    width: 250,
                                    colspan: 2,
                                    value: '3 Salida por venta'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'folio',
                                    fieldLabel: 'Folio',
                                    allowBlank: false,
                                    width: 200,
                                    readOnly: true,
                                    value: '55508'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'referencia1',
                                    fieldLabel: 'Referencia 1',
                                    allowBlank: false,
                                    width: 200,
                                    readOnly: true,
                                    value: 'RA22928'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'referencia1',
                                    fieldLabel: 'Referencia 2',
                                    allowBlank: false,
                                    readOnly: true,
                                    width: 200,
                                    value: 'A18485'
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'venta',
                                    fieldLabel: 'Venta',
                                    allowBlank: false,
                                    width: 200,
                                    readOnly: true,
                                    value: ''
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'cliente',
                                    fieldLabel: 'Cliente',
                                    allowBlank: false,
                                    width: 350,
                                    colspan: 2,
                                    readOnly: true,
                                    value: '2057 FARJADO OLVERA ANTONIA'
                                },
                                {
                                    xtype: 'container',
                                    msgTarget: 'side',
                                    height: 35,
                                    defaults: {
                                        labelWidth: 80,
                                        flex: 1
                                    },
                                    items: [{
                                            xtype: 'combobox',
                                            id: "idcmbTipoCliente",
                                            name: "cmbTipoCliente",
                                            fieldLabel: 'Estatus',
                                            flex: 1,
                                            width: 200,
                                            store: createStore('idTCliente', 'tipCliente', 5, 5),
                                            valueField: 'idTCliente',
                                            displayField: 'tipCliente',
                                            queryMode: 'local',
                                            emptyText: 'En Proceso',
                                            // typeAhead: true,
                                            allowBlank: true
                                        }]
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'consignado',
                                    fieldLabel: 'Consignado',
                                    allowBlank: false,
                                    width: 250,
                                    readOnly: true,
                                    colspan: 2,
                                    value: '2697 FAJARDO OLVERA ANTONIA'
                                },
                                {
                                    xtype: 'datefield',
                                    width: 200,
                                    fieldLabel: 'Fecha Captura',
                                    name: 'to_date',
                                    value: new Date()  // defaults to today
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'destino',
                                    fieldLabel: 'Destino',
                                    allowBlank: false,
                                    width: 250,
                                    readOnly: true,
                                    colspan: 2,
                                    value: '565 Queretaro'
                                },
                                {
                                    xtype: 'datefield',
                                    width: 200,
                                    fieldLabel: 'Fecha Documento',
                                    name: 'to_date2',
                                    value: new Date()  // defaults to today
                                },
                                {
                                    xtype: 'textfield',
                                    name: 'comentarios',
                                    fieldLabel: 'Comentarios',
                                    allowBlank: false,
                                    width: 500,
                                    readOnly: true,
                                    colspan: 2,
                                    value: 'NUMEROS DE CONTACTO (442) 2090120 Y 2092889'
                                },
                                {
                                    xtype: 'datefield',
                                    width: 200,
                                    fieldLabel: 'Fecha Entrega',
                                    name: 'to_date3',
                                    value: new Date()  // defaults to today
                                },
                                {
                                    xtype: 'datefield',
                                    width: 200,
                                    fieldLabel: 'Fecha Surtido',
                                    name: 'to_date3',
                                      colspan: 2,
                                    value: new Date()  // defaults to today
                                },                                {
                                    xtype: 'textfield',
                                    name: 'importe',
                                    fieldLabel: 'Importe',
                                    allowBlank: false,
                                    width: 250,
                                    readOnly: true,
                                    colspan: 2,
                                    value: '$23,032.44'
                                }
//                                {
//                                    xtype: 'container',
//                                    defaultType: 'datefield',
//                                    msgTarget: 'side',
//                                    height: 35,
//                                    layout: 'hbox',
//                                    defaults: {
//                                        labelWidth: 30,
//                                        width: 150
//                                    },
//                                    items: [{
//                                            id: 'idFechaIni',
//                                            name: 'fechaIni',
//                                            fieldLabel: 'De',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            listeners: {
//                                                'keypress':
//                                                        function (txtField, e) {
//                                                            if (e.keyCode == 13) {
//                                                            }
//                                                        }
//                                            }
//                                        }, {
//                                            id: 'idFechaFin',
//                                            name: 'fechaFin',
//                                            fieldLabel: 'Al',
//                                            allowBlank: false,
//                                            enableKeyEvents: true,
//                                            listeners: {
//                                                'keypress':
//                                                        function (txtField, e) {
//                                                            if (e.keyCode == 13) {
//                                                            }
//                                                        }
//                                            }
//                                        }]
//                                }, 
//                                {
//                                    xtype: 'container',
//                                    msgTarget: 'side',
//                                    height: 35,
//                                    defaults: {
//                                        labelWidth: 70,
//                                        flex: 2
//                                    },
//                                    items: [{
//                                            xtype: 'combobox',
//                                            id: "idCmbEstatus",
//                                            name: "cmbEstatus",
//                                            fieldLabel: 'Estatus',
//                                            flex: 1,
//                                            width: 300,
//                                            store: createStore('idEstatus', 'tipEstatus', 5, 7),
//                                            valueField: 'idEstatus',
//                                            displayField: 'tipEstatus',
//                                            queryMode: 'local',
//                                            emptyText: 'Seleccione Estatus',
//                                            typeAhead: true,
//                                            allowBlank: true
//                                        }]
//                                }
                            ]
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
                                    handler: clickBtnBusqEstatus,
                                    width: 90
                                }, {
                                    xtype: 'label',
                                    html: '&nbsp;&nbsp;&nbsp;'
                                }, {
                                    xtype: 'button',
                                    text: 'Exportar a Excel',
                                    arrowAlign: 'center',
                                    iconCls: 'icn-excel',
                                    handler: clickBtnExcel,
                                    width: 115
                                }, {
                                    xtype: 'label',
                                    html: '&nbsp;&nbsp;&nbsp;'
                                }, {
                                    xtype: 'button',
                                    text: 'Limpiar',
                                    arrowAlign: 'center',
                                    iconCls: 'icn-limpiarBusqueda',
                                    handler: clickBtnLimpiarParts,
                                    width: 90
                                }]
                        }]
                }, Ext.create('Ext.grid.Panel', {
                    id: "gridBuscadorFactura",
                    height: 280,
                    title: ' Registros Encontrados',
                    store: Ext.data.StoreManager.lookup('store'),
                    clearRemovedOnLoad: false,
                    selModel: {
                        pruneRemoved: false
                    },
                    multiSelect: true,
                    viewConfig: {
                        loadMask: false,
                        trackOver: false
                    },
                    features: [{
                            ftype: 'grouping',
                            groupByText: 'Agrupar',
                            showGroupsText: 'ver en grupos'
                        }],
                    // grid columns
                    columns: [{
                            xtype: 'rownumberer',
                            width: 50,
                            sortable: false
                        }, {
                            id: 'elegir',
                            text: "Elegir",
                            dataIndex: 'elegir',
                            width: 90,
                            sortable: false,
                            groupable: false
                        }, {
                            text: "Clave",
                            dataIndex: 'estatus',
                            align: 'center',
                            width: 95,
                            sortable: true
                        }, {
                            text: "Descripcion",
                            dataIndex: 'factura',
                            align: 'center',
                            width: 250,
                            sortable: true
                        }, {
                            text: "Piezas X Caja",
                            dataIndex: 'referencia',
                            align: 'center',
                            width: 150,
                            sortable: true
                        }, {
                            text: "Almacen",
                            dataIndex: 'envio',
                            align: 'center',
                            width: 100,
                            sortable: true
                        }, {
                            text: "Palet",
                            dataIndex: 'numCliente',
                            align: 'center',
                            width: 70,
                            sortable: true
                        }, {
                            text: "Lote",
                            dataIndex: 'nombCliente',
                            // align: 'center',
                            width: 100,
                            sortable: true
                        }, {
                            text: "Ubicacion",
                            dataIndex: 'destino',
                            //   align: 'center',
                            width: 100,
                            sortable: true
                        }, {
                            text: "Cantidad",
                            dataIndex: 'numCajas',
                            align: 'center',
                            width: 100,
                            sortable: true
                        }/*, {
                            text: "Importe",
                            dataIndex: 'importe',
                            align: 'center',
                            width: 70,
                            sortable: true
                        }, {
                            text: "Fecha Factura",
                            dataIndex: 'fechFactura',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Fecha Ingreso",
                            dataIndex: 'fechIngreso',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Cita",
                            dataIndex: 'cita',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Fecha Embarque",
                            dataIndex: 'fechEmbarq',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Fecha Entrega",
                            dataIndex: 'fechEntreg',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Comentarios",
                            dataIndex: 'comentarios',
                            width: 250,
                            sortable: true,
                            groupable: false
                        }*/]
                })
            ]
        },
        //panel Consulta de existencia de productos
        formPnlConEst: {
            xtype: 'form', // since we are not using the default 'panel' xtype, we must specify it
            id: 'idMenu157',
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
                                            store: createStore('idTAlmacen', 'tipAlmacen', 5, 6),
                                            valueField: 'idTAlmacen',
                                            displayField: 'tipAlmacen',
                                            queryMode: 'local',
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
                            dataIndex: 'clvProducto',
                            align: 'center',
                            width: 90,
                            sortable: true
                        }, {
                            text: "Nombre",
                            dataIndex: 'decripcion',
                            width: 250,
                            sortable: true
                        }, {
                            text: "Linea de Negocio",
                            dataIndex: 'linea',
                            align: 'center',
                            width: 100,
                            sortable: true
                        }, {
                            text: "Clasificacion",
                            dataIndex: 'familia',
                            align: 'center',
                            width: 80,
                            sortable: true
                        }, {
                            text: "Tipo de Producto",
                            dataIndex: 'uniAlmacenado',
                            align: 'center',
                            width: 105,
                            sortable: true
                        }, {
                            text: "Unidad",
                            dataIndex: 'existReal',
                            align: 'center',
                            width: 95,
                            sortable: true
                        }, {
                            text: "Inner",
                            dataIndex: 'existReservada',
                            align: 'center',
                            width: 115,
                            sortable: true
                        }, {
                            text: "Estatus",
                            dataIndex: 'existDisponible',
                            align: 'center',
                            width: 115,
                            sortable: true
                        }]
                })]
        }
    };
}