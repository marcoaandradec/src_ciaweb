
Ext.ns('com.punto.pen');

com.punto.pen.PanelPagoVacunas = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.url = (argumentos.url==null ? contexto + "/Vacuna" : argumentos.url);
    this.border = (argumentos.border==null ? true : argumentos.border);   
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);   
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var fechaActual = new Date();
    var situacion = argumentos.situacion == null ? "todo" : argumentos.situacion;

    var storeBuscadorVacunas = new Ext.data.Store({
        autoLoad: false,
        baseParams:{
            bnd:4,
            'idCnt':idCnt,
            situacion:situacion,
            modulo:modulo
        },reader :new Ext.data.JsonReader({
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordPagoVacunas()),
        proxy :new Ext.data.HttpProxy({
            url : contexto+'/Vacuna?bnd=4',
            timeout: 300000
        })
    });

    this.pbarBuscarVacunas = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 5,
        store       : storeBuscadorVacunas,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Solicitud(es) de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    Ext.ux.IFrameComponent = Ext.extend(Ext.BoxComponent, {
        onRender: function(ct, position){
            this.el = ct.createChild({
                tag: 'iframe',
                id: this.id,
                frameBorder: 0,
                src: this.url
            });
        }
    });


    var panelFormPagoVacunas= new Ext.form.FormPanel({
        id: 'FormPagoVacunas2',
        title:this.titulo,
        url: this.url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:this.border,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: true,
        items:[
        {
            xtype           :"grid",
            id              : "gridBuscadorPagoVacunasMedicas",
            title           : "",
            region          :'center',
            columnWidth     : 0.7,
            height          : 200,
            store           : storeBuscadorVacunas,
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
            border          : false,
            bbar            : this.pbarBuscarVacunas,
            columns         : [new Ext.grid.RowNumberer(),
            {
                header: "Folio",
                width: 50,
                sortable: true,
                dataIndex: 'id'
            },
            {
                header: "Fecha de Solicitud",
                sortable: true,
                dataIndex: 'd1'
            },
            {
                header: "Vacuna",
                sortable: true,
                dataIndex: 'd2'
            },
            {
                header: "Cantidad",
                sortable: true,
                dataIndex: 'd3'
            },
            {
                header: "Pago",
                sortable: true,
                dataIndex: 'd4'
            },
            {
                header: "Forma de Pago",
                sortable: true,
                dataIndex: 'd6'
            },
            {
                header: "Estatus",
                sortable: true,
                dataIndex: 'd7'
            }],
            listeners: {
                'rowclick':function(grid){
                    var record =grid.getSelectionModel().getSelected();
                    if(modulo == 2 && situacion == "pagar"){
                        Ext.getCmp("idLinkImprimir").setVisible(true);
                        Ext.getCmp("idDatosPago").setVisible(true);
                        Ext.getCmp("idLoadDatosPago").load({
                            url:contexto+'/Vacuna',
                            params:{
                                bnd:6,
                                idSolic:record.get("id")
                            },
                            text:'Cargando datos...'
                        });
                    }else if(modulo == 2 && situacion == "aplicar"){
                        Ext.getCmp("idAplicarVacuna").setVisible(true);
                    }else{
                        if(record.get("d7") == "Pagado y entregado"){
                            Ext.MessageBox.alert("Aviso","Esta solicitud ya fue pagada y entregada");
                        }else{
                            VisibleFormularios(record, situacion);
                        }
                    }
                }
            }
        },{
            border:false,
            height:20
        },{
            xtype:"hidden",
            name:"hidenIdSolicitud",
            id:"idHidenIdSolicitud",
            value:0
        },{
            xtype:"hidden",
            name:"hidenFormaPago",
            id:"idHidenFormaPago",
            value:0
        },
        new Ext.form.FieldSet({
            xtype:"fieldset",
            title:'Formulario',
            layout:"form",
            labelAlign:"left",
            autoHeight:true,
            items:[{
                id:"idDT",
                xtype:"fieldset",
                title:"Pago con Depósito",
                autoHeight:true,
                layout:"column",
                labelAlign:"left",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Folio",
                        name:"folio_dt",
                        id:"idFolio_dp",
                        width:100,
                        readOnly:true
                    },{
                        xtype:"datefield",
                        fieldLabel:"Fecha",
                        id:'idFecha_dt',
                        name:"fecha_dt",
                        width:100,
                        emptyText:"dd/mm/yyyy",
                        value:fechaActual,
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        }
                    },{
                        xtype:"numberfield",
                        fieldLabel:"Folio Banco",
                        name:"folioB_dt",
                        id:"idFolioB_dt",
                        width:100,
                        maxLength:12,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:12
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Monto Pago $",
                        name:"pago_dt",
                        id:"idPago_dt",
                        width:120,
                        maxlength:6,
                        readOnly:true,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:6
                        }
                    },{
                        xtype:"textfield",
                        fieldLabel:"Banco",
                        name:"banco_dt",
                        id:"idBanco_dt",
                        width:200
                    },{
                        xtype:"textfield",
                        fieldLabel:"Sucursal",
                        name:"sucursal_dt",
                        id:"idSucursal_dt",
                        width:100
                    }]
                }]
            },{
                id:"idTC",
                xtype:"fieldset",
                title:"Pago con Tarjeta de Crédito",
                autoHeight:true,
                layout:"column",
                labelAlign:"left",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    labelWidth:140,
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Folio",
                        name:"folio_tc",
                        id:"idFolio_tc",
                        width:100,
                        readOnly:true
                    },{
                        xtype:"datefield",
                        fieldLabel:"Fecha",
                        id:'idFecha_tc',
                        name:"fecha_tc",
                        width:100,
                        emptyText:"dd/mm/yyyy",
                        value:fechaActual,
                        autoCreate:{
                            tag:"input",
                            maxlength:10
                        }
                    },{xtype:"hidden",name:"tipTarjeta",id:"idTipTarjeta"},
                    new com.punto.pen.ComboBox({
                        id:"idTipo_tc",
                        etiqueta:"Tipo de Tarjeta",
                        allowBlank:false,
                        name:"tipo_tc",
                        prm:{
                            campo:"tipoTc",
                            idCampo:'idTipoTc',
                            autoCarga:true,
                            bnd:5,
                            qry:113
                        },
                        evt:{
                            select:function(cmb){
                               Ext.getCmp("idTipTarjeta").setValue(cmb.getValue());
                            }
                        }
                    }),
//                    {
//                        xtype:"combo",
//                        id:"idTipo_tc",
//                        fieldLabel:"Tipo de Tarjeta",
//                        width:125,
//                        mode:"local",
//                        name:"tipo_tc",
//                        triggerAction:'all',
//                        store:["Visa","MasterCard","Discover","American Express"]
//                    },
//                    {
//                        xtype:"numberfield",
//                        fieldLabel:"No. Verificador (3 Dígitos)",
//                        name:"verificador_tc",
//                        id:"idVerificador_tc",
//                        width:100,
//                        maxLength:4,
//                        autoCreate:{
//                            tag:"input",
//                            autocomplete:"off",
//                            maxlength:4
//                        }
//                    },
                    {
                        xtype:"numberfield",
                        fieldLabel:"No. Autorización",
                        name:"autentificacion_tc",
                        id:"idAutentificacion_tc",
                        width:100,
                        maxLength:12,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:12
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Ultimos 4 digitos",
                        name:"tarjeta_tc",
                        id:"idTarjeta_tc",
                        width:100,
                        maxLength:4,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off"
                        }
                    },{
                        xtype:"numberfield",
                        fieldLabel:"Monto Pago $",
                        name:"pago_tc",
                        id:"idPago_tc",
                        width:120,
                        maxlength:6,
                        readOnly:true,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:6
                        }
                    },
                    new Ext.Panel({
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"left",
                        labelWidth:50,
                        items:[{
                            xtype: 'radiogroup',
                            fieldLabel: 'Aceptada',
                            id:"idAceptada_tc",
                            labelWidth:50,
                            columns: 2,
                            items: [{
                                boxLabel: 'Si',
                                name:'aceptada_tc',
                                inputValue:true
                            },{
                                boxLabel: 'No',
                                name:'aceptada_tc',
                                inputValue:false
                            }]
                        }]
                    })]
                }
                ]
            },{
//                href='javascript:imprimirComprobante()'
                id:"idLinkImprimir",
                html:"<table width=100%><tr><td align=right><a href='javascript:imprimirComprobante()'>Imprimir comprobante</a></td></tr></table>",
                border:false
            },{
                id:"idDatosPago",
                xtype:"fieldset",
                title:"Datos de pago",
                autoHeight:true,
                layout:"fit",
                items:[{
                    id:"idLoadDatosPago",
                    align:"center",
                    border:false,
                    autoLoad:{
                        url:contexto+'/Vacuna',
                        params:{
                            bnd:6
                        },
                        text:'Cargando datos...'
                    }
                }]
            },{
                id:"idAplicarVacuna",
                xtype:"fieldset",
                title:"Aplicar vacuna",
                autoHeight:true,
                layout:"form",
                labelWidth:20,
                items:[
                {
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    items:[{
                        xtype:"button",
                        text:"Imprimir consentimiento",
                        handler:function abrirConcentimiento(){
                            var variable1 = 'Consentimientos Informados';
                            var mireporte = new Ext.Window({
                                renderTo: document.body,
                                title:'Consentimientos Informados',
                                layout: 'fit',
                                width: 800,
                                height: 550,
                                constrainHeader :true,
                                constrain :true,
                                resizable : false,
                                maximizable: true,
                                maximized: false,
                                animateTarget: 'mostrar-btn',
                                closeAction: 'hide',
                                items: new Ext.ux.IFrameComponent({
                                    id: 'ConsentimientoPdf',
                                    url: contexto+'/archivos/CONSENTIMIENTO_VACUNA_INFLUENZA.pdf'
                                }),
                                listeners: {
                                    restore: function(){
                                        this.center();
                                    }
                                }
                            }).show();
                        }
                    },{
                        xtype:"panel",
                        width:"200",
                        border:false,
                        items:[{
                            html:"&nbsp;",
                            border:false
                        }]
                    },{
                        html:"<a href = 'javascript:subirFirmado(" + idCnt + ",313)'>Subir consentimiento firmado</a>",
                        border:false
                    }]
                }
//                {
//                    html:"<table width=100%><tr><td align=right><a href='javascript:abrirConcentimiento(" + Ext.ux.IFrameComponent + ")'>Imprimir concentimiento</a></td></tr></table>",
//                    border:false
//                }
                ,{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    items:[{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        width:120,
                        items:[{
                            xtype:"label",
                            text:"Firmó concentimiento:"
                        }]
                    },{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        width:50,
                        items:[{
                            id:"idRadioSICons",
                            xtype:"radio",
                            fieldLabel:"Si",
                            name:"consintio",
                            listeners:{
                                check:function(e,rd){
                                    if(rd == true)Ext.getCmp("idBtnAplicacion").enable();
                                }
                            }
                        }]
                    },{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        width:50,
                        items:[{
                            id:"idRadioNOCons",
                            xtype:"radio",
                            fieldLabel:"No",
                            name:"consintio",
                            listeners:{
                                check:function(e,rd){
                                    if(rd == true)Ext.getCmp("idBtnAplicacion").disable();
                                }
                            }
                        }]
                    }]
                },{
                    id:"idTxtObsConsentimiento",
                    xtype:"textarea",
                    hideLabel:true,
                    style:'text-transform: uppercase;',
                    width:650
                }]
            }
            ]
        })]
    });

    Ext.getCmp("idDT").setVisible(false);
    Ext.getCmp("idTC").setVisible(false);
    Ext.getCmp("idLinkImprimir").setVisible(false);
    Ext.getCmp("idDatosPago").setVisible(false);
    Ext.getCmp("idAplicarVacuna").setVisible(false);

    return panelFormPagoVacunas;
}

function VisibleFormularios(record, situacion){

    Ext.getCmp("idHidenIdSolicitud").setValue(record.get('id'));
    Ext.getCmp("idHidenFormaPago").setValue(record.get('d5') == 432 ? 1 : 2);

    if(modulo == 2 && situacion == "pagar"){
        Ext.getCmp("idDT").setVisible(false);
        Ext.getCmp("idTC").setVisible(false);
        Ext.getCmp("idLinkImprimir").setVisible(true);
        Ext.getCmp("idDatosPago").setVisible(true);

    }else if(record.get('d5') == 432){
        Ext.getCmp("idTC").setVisible(false);
        Ext.getCmp("idDT").setVisible(true);
         Ext.getCmp("idLinkImprimir").setVisible(false);
        Ext.getCmp("idDatosPago").setVisible(false);

        Ext.getCmp("idFolio_dp").allowBlank = false;
        Ext.getCmp("idFolio_dp").setValue(record.get("id"));

        Ext.getCmp("idFecha_dt").allowBlank = false;
        Ext.getCmp("idFolioB_dt").allowBlank = false;
        Ext.getCmp("idPago_dt").allowBlank = false;
        Ext.getCmp("idPago_dt").setValue(record.get("d4"));

        Ext.getCmp("idBanco_dt").allowBlank=false;
        Ext.getCmp("idSucursal_dt").allowBlank=false;

        Ext.getCmp("idFolio_tc").allowBlank=true;
        Ext.getCmp("idFecha_tc").allowBlank=true;
        //Ext.getCmp("idVerificador_tc").allowBlank=true;
        Ext.getCmp("idAutentificacion_tc").allowBlank=true;
        Ext.getCmp("idTarjeta_tc").allowBlank=true;
        Ext.getCmp("idPago_tc").allowBlank=true;
        Ext.getCmp("idTipo_tc").allowBlank=true;
        Ext.getCmp("idAceptada_tc").allowBlank=true;
        Ext.getCmp("idDT").doLayout();
        Ext.getCmp("idTC").doLayout();
    }else{
        Ext.getCmp("idDT").setVisible(false);
        Ext.getCmp("idTC").setVisible(true);
         Ext.getCmp("idLinkImprimir").setVisible(true);
        Ext.getCmp("idDatosPago").setVisible(false);

        Ext.getCmp("idFolio_dp").allowBlank=true;
        Ext.getCmp("idFecha_dt").allowBlank=true;
        Ext.getCmp("idFolioB_dt").allowBlank=true;
        Ext.getCmp("idPago_dt").allowBlank=true;

        Ext.getCmp("idBanco_dt").allowBlank=true;
        Ext.getCmp("idSucursal_dt").allowBlank=true;

        Ext.getCmp("idFolio_tc").allowBlank=false;
        Ext.getCmp("idFolio_tc").setValue(record.get("id"));

        Ext.getCmp("idFecha_tc").allowBlank=false;
        //Ext.getCmp("idVerificador_tc").allowBlank=false;
        Ext.getCmp("idAutentificacion_tc").allowBlank=false;
        Ext.getCmp("idTarjeta_tc").allowBlank=false;
        Ext.getCmp("idPago_tc").allowBlank=false;
        Ext.getCmp("idPago_tc").setValue(record.get("d4"));

        Ext.getCmp("idTipo_tc").allowBlank=false;
        Ext.getCmp("idAceptada_tc").allowBlank=false;
        Ext.getCmp("idDT").doLayout();
        Ext.getCmp("idTC").doLayout();
    }

}

com.punto.pen.RecordPagoVacunas = function(){
    var record = Ext.data.Record.create([
    {
        name: 'id',
        type:'string'
    },

    {
        name: 'd1',
        type:'string'
    },

    {
        name: 'd2',
        type:'string'
    },

    {
        name: 'd3',
        type:'string'
    },

    {
        name: 'd4',
        type:'string'
    },

    {
        name: 'd5',
        type:'string'
    },

    {
        name: 'd6',
        type:'string'
    },

    {
        name: 'd7',
        type:'string'
    },

    {
        name: 'd8',
        type:'string'
    },

    {
        name: 'd9',
        type:'string'
    },

    {
        name: 'd10',
        type:'string'
    },

    {
        name: 'd11',
        type:'string'
    }
    ]);
    return record;
}

function guardarEntregaVacuna(idc,wnd){
    var form = Ext.getCmp("FormPagoVacunas2").getForm();
    if(form.isValid()){        
        form.submit({
            params:{
                bnd:5,
                idc:idc
            },
            success:function(form,action){
                if(action.result.success == true){
                    Ext.Msg.show({
                        title:'Aviso',
                        msg: "Se guardaron los datos con exito",
                        buttons: Ext.Msg.OK,
                        fn:function(btn){
                            if(btn == 'ok'){
                                var bitac=Ext.getCmp("gridBuscadorBitacora");
                                bitac.getStore().load();
                                var nots = Ext.getCmp("idPanelNotasAnte");
                                nots.load({
                                    url:contexto + '/Cliente?bnd=9&idCnt='+idc
                                });
                                var infoGen=Ext.getCmp("pnlInfoGeneral");
                                infoGen.load({
                                    url:contexto + '/Cliente?bnd=2&idCnt='+idc
                                });
                                wnd.close();
                            }
                        }
                    });
                    //Ext.MessageBox.alert("Aviso","Se guardaron los datos con exito");
                }else{
                    Ext.MessageBox.alert("Aviso","Hubo un problema en el servidor");
                }
            }
        });
    }else{
        Ext.MessageBox.alert("Aviso","Faltan datos por completar");
    }
}

function imprimirComprobante(){
    var record = Ext.getCmp("gridBuscadorPagoVacunasMedicas").getSelectionModel().getSelected();

    Ext.Ajax.request({
        url:contexto + "/Vacuna",
        params:{
            bnd:7,
            idSolic:record.get("id")
        },
        success:function(rsp){
            var array = eval("(" + rsp.responseText + ")");

            window.open(
                contexto + "/jsp_general/reciboVacuna.jsp?datosPago=true&datos=" + array.datos + "&tipoPag=" + array.tipoPag,
                'Imprimir',
                'status=no, menubar=no, toolbars=no, scrollbars=yes,resizable=no,width=600,height=180'
            );
        }
    });    
}

function guardarAplicacionVacuna(idc,wnd){
    var record = Ext.getCmp("gridBuscadorPagoVacunasMedicas").getSelectionModel().getSelected();

    var siCons = Ext.getCmp("idRadioSICons").getValue();
    var noCons = Ext.getCmp("idRadioNOCons").getValue();
    var txtObs = Ext.getCmp("idTxtObsConsentimiento").getValue();

    Ext.Ajax.request({
        url:contexto + "/Vacuna",
        params:{
            bnd:8,
            idc:idc,
            siCons:siCons,
            txtObs:txtObs,
            idSolic:record.get("id")
        },
        success:function(rsp){
            var array = eval("(" + rsp.responseText + ")");
            if(array.success == true){
                Ext.Msg.show({
                    title:'Aviso',
                    msg: "Se guardaron los datos con exito",
                    buttons: Ext.Msg.OK,
                    fn:function(btn){
                        if(btn == 'ok'){
                            var bitac=Ext.getCmp("gridBuscadorBitacora");
                            bitac.getStore().load();
                            var nots = Ext.getCmp("idPanelNotasAnte");
                            nots.load({
                                url:contexto + '/Cliente?bnd=9&idCnt='+idc
                            });
                            var infoGen=Ext.getCmp("pnlInfoGeneral");
                            infoGen.load({
                                url:contexto + '/Cliente?bnd=2&idCnt='+idc
                            });
                            wnd.close();
                        }
                    }
                });
            }else{
                Ext.MessageBox.alert("Aviso", "Hubo un error en el servidor");
            }

        }
    });
}

function subirFirmado(idc, idPrd){
    window.open(
        contexto + "/HomeSubirArchivos?idCln=" + idc + "&idCnt=" + idc + "&tipoArch=440",
        "",
        "directories=no, resizable=0, menubar=no,location=no,scrollbars=no,status=1,height=550, width=700"
    );
    
}


