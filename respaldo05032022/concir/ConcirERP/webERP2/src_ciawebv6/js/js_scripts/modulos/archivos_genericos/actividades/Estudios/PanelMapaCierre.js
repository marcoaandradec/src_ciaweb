Ext.ns("com.punto.pen");

com.punto.pen.PanelMapaCierre= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);
    var idMapa = (argumentos.idMapa==null ? 0 : argumentos.idMapa);
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

    var PanelMapaCierre =  new Ext.Panel({
        xtype:"panel",
        border:false,
        layout:"form",
        id:"idPanelMapaCierre",
        items:[ {
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",7,\"MAPA\",\"Estudio MAPA\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            Height:20,
            border:false
        },{
            xtype:"hidden",
            name:"hideMAPATipo",
            value:"2"
        },{
            xtype:"hidden",
            name:"hideIdMAPA",
            value:idMapa
        },{
            xtype:"fieldset",
            title:"Datos Generales",
            autoHeight:true,
            layout:"form",
            items:[{
                xtype:"panel",
                layout:"column",
                border:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Nombre",
                        name:"mpNombre",
                        width:210,
                        readOnly:true
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.5,
                    labelWidth:180,
                    items:[{
                        xtype:"datefield",
                        fieldLabel:"Fecha Cierre Estudio",
                        name:"mpFecha",
                        id:"idmpFecha",
                        emptyText:"dd/mm/yyyy",
                        allowBlank:false,
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha(Ext.getCmp('idmpcFecha').getValue());
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idmpcFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                    Ext.getCmp('idmpcFecha').setValue("");
                                }
                            },
              'keypress':function(txtField,e){
                         if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                    }
                        },
                   width:100,
                autoCreate:{
                  tag:"input",
                  maxlength:10
                }
                    }]
                }]
            },{
                xtype:"panel",
                border:false,
                layout:"column",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.32,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Hora Inicio",
                        emptyText:"00:00",
                        allowBlank:false,
                        name:"mpcHoraInicio",
                        maxLength:5,
                        tabIndex:110,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:5
                        },
                        enableKeyEvents:true,
                        listeners: {
                            'keypress':function(txtField,e){
//                                alert(e.getKey());
                                if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39 || e.getKey()==46){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.32,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Hora Fin",
                        emptyText:"00:00",
                        allowBlank:false,
                        name:"mpcHoraFin",
                        maxLength:5,
                        tabIndex:110,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:5
                        },
                        enableKeyEvents:true,
                        listeners: {
                            'keypress':function(txtField,e){
                                 if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39 || e.getKey()==46){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.32,
                    labelWidth:150,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Tiempo de Estudio",
                        emptyText:"00:00",
                        allowBlank:false,
                        name:"mpcTiempoEstudio",
                        maxLength:5,
                        tabIndex:110,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:5
                        },
                        enableKeyEvents:true,
                        listeners: {
                            'keypress':function(txtField,e){
                                 if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39 || e.getKey()==46){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.32,
                    items:[{
                        xtype:"button",
                        text:"Imprimir Consentimientos Mapa",
                        id:"mostrar-btn",
                        handler:function abrirReporte(){
                            var variable1 = 'Consentimientos Mapa';
                            var mireporte = new Ext.Window({
                                renderTo: document.body,
                                title:'Consentimientos Mapa',
                                layout: 'fit',
                                width: 800,
                                height: 550,
                                constrainHeader :true,
                                modal:true,
                                border:false,
                                autoScroll:false,
                                draggable:true,
                                resizable:false,
                                animateTarget: 'mostrar-btn',
                                closeAction: 'hide',
                                // inluir IFrameComponent para abrir nuestro PDF.
                                items: new Ext.ux.IFrameComponent({
                                    // id nuestro componente.
                                    id: 'ConsentimientoPdf',
                                    // URL y parametros del archivo a abrir
                                    url: contexto+'/archivos/CartaconsentimientoMapa.pdf?parametro1='+variable1
                                }),
                                listeners: {
                                    restore: function(){
                                        this.center();
                                    }
                                }
                            }).show();
                        }
                    }]
                }]
            }]
        },{
            xtype:"fieldset",
            title:"Limites",
            autoHeight:true,
            align:"center",
            layout:"column",
            items:[{
                xtype:"panel",
                columnWidth:0.3,
                border:false,
                items:[{
                    height:20,
                    border:false
                }]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                columnWidth:0.4,
                items:[{
                    layout:"table",
                    layoutConfig:{
                        columns:3
                    },
                    defaults:{
                        bodyStyle:"padding:2px;",
                        style:"margin:1px;"
                    },
                    border:false,
                    items:[{
                        border:false
                    },{
                        html:"<span style='font-size:12.3px'>Intervalo Día</span>",
                        border:false
                    },{
                        html:"<span style='font-size:12.3px'>Intervalo Noche</span>",
                        border:false
                    },{
                        html:"<span style='font-size:12.3px'>Sistolica</span>",
                        border:false
                    },{
                        border:false,
                        items:[{
                            xtype:"numberfield",
                            name:"mpcSistolicaD",
                            maxLength:4,
                            allowBlank:false,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:4
                            }
                        }]
                    },{
                        border:false,
                        items:[{
                            xtype:"numberfield",
                            name:"mpcSistolicaN",
                            maxLength:4,
                            tabIndex:110,
                            allowBlank:false,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:4
                            }
                        }]
                    },{
                        html:"<span style='font-size:12.3px'>Diastolica</span>",
                        border:false
                    },{
                        border:false,
                        items:[{
                            xtype:"numberfield",
                            name:"mpcDiastolicaD",
                            maxLength:4,
                            tabIndex:110,
                            allowBlank:false,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:4
                            }
                        }]
                    },{
                        border:false,
                        items:[{
                            xtype:"numberfield",
                            name:"mpcDiastolicaN",
                            maxLength:4,
                            tabIndex:110,
                            allowBlank:false,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:4
                            }
                        }]
                    }]
                }]
            },{
                xtype:"panel",
                border:false,
                columnWidth:0.3,
                items:[{
                    height:20,
                    border:false
                }]
            }]
        },{
            xtype:"fieldset",
            title:"Valores del Estudio",
            autoHeight:true,
            layout:"form",
            items:[{
                xtype:"panel",
                border:false,
                layout:"column",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    columnWidth:0.4,
                    items:[{
                        xtype:"panel",
                        border:false,
                        layout:"column",
                        items:[{
                            xtype:"panel",
                            columnWidth:0.8,
                            layout:"form",
                            border:false,
                            labelWidth:180,
                            items:[{
                                xtype:"textfield",
                                fieldLabel:"Promedio de Presión Arterial",
                                name:"mpcPrecionArterial",
                                width:100,
                                allowBlank:false,
                                maxLength:7,
                                tabIndex:110,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:7
                                },
                                enableKeyEvents:true,
                                listeners: {
                                    'keypress':function(txtField,e){
                                      if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39){}else{
                                    e.stopEvent();
                                }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.2,
                            border:false,
                            items:[{
                                html:"mmHg",
                                border:false
                            }]
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        layout:"column",
                        items:[{
                            xtype:"panel",
                            columnWidth:0.8,
                            layout:"form",
                            border:false,
                            labelWidth:180,
                            items:[{
                                xtype:"numberfield",
                                fieldLabel:"Promedio de PAM",
                                name:"mpcPam",
                                width:100,
                                maxLength:4,
                                tabIndex:110,
                                allowBlank:false,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:4
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.2,
                            border:false,
                            items:[{
                                html:"mmHg",
                                border:false
                            }]
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        layout:"column",
                        items:[{
                            xtype:"panel",
                            columnWidth:0.8,
                            layout:"form",
                            border:false,
                            labelWidth:180,
                            items:[{
                                xtype:"numberfield",
                                fieldLabel:"Promedio de Presión de Pulso",
                                name:"mpcPresionPulso",
                                width:100,
                                maxLength:6,
                                allowBlank:false,
                                tabIndex:110,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:6
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.2,
                            border:false,
                            items:[{
                                html:"mmHg",
                                border:false
                            }]
                        }]
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.6,
                    layout:"form",
                    border:false,
                    items:[{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        labelWidth:220,
                        items:[{
                            xtype:"numberfield",
                            fieldLabel:"Índice de rigidez arterial ambulatoria",
                            name:"mpcRigidezArterial",
                            width:100,
                            maxLength:6,
                            tabIndex:110,
                            allowBlank:false,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:6
                            }
                        }]
                    },{
                        xtype:"panel",
                        layout:"column",
                        border:false,
                        items:[{
                            xtype:"panel",
                            columnWidth:0.6,
                            border:false,
                            layout:"form",
                            labelWidth:220,
                            items:[{
                                xtype:"textfield",
                                fieldLabel:"Tiempo Hipertensivo Total",
                                name:"mpcHipertensivo",
                                width:100,
                                maxLength:7,
                                tabIndex:110,
                                allowBlank:false,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:7
                                },
                                enableKeyEvents:true,
                                listeners: {
                                    'keypress':function(txtField,e){
                                         if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39){}else{
                                    e.stopEvent();
                                }
                                    }
                                }
                            }]
                        },{
                            xtype:"panel",
                            columnWidth:0.4,
                            border:false,
                            items:[{
                                html:"min. / %",
                                border:false
                            }]
                        }]
                    },{
                        xtype:"panel",
                        layout:"column",
                        border:false,
                        items:[{
                            xtype:"panel",
                            layout:"form",
                            border:false,
                            columnWidth:0.25,
                            labelWidth:48,
                            items:[{
                                xtype:"numberfield",
                                fieldLabel:"Sistólico",
                                name:"mpcSistoloco",
                                width:80,
                                allowBlank:false,
                                maxLength:4,
                                tabIndex:110,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:4
                                }
                            }]
                        },{
                            xtype:"panel",
                            border:false,
                            columnWidth:0.07,
                            items:[{
                                border:false,
                                html:"min."
                            }]
                        },{
                            xtype:"panel",
                            layout:"form",
                            border:false,
                            columnWidth:0.27,
                            labelWidth:57,
                            items:[{
                                xtype:"numberfield",
                                fieldLabel:"Diastólico",
                                name:"mpcDiastolico",
                                width:80,
                                allowBlank:false,
                                maxLength:4,
                                tabIndex:110,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:4
                                }
                            }]
                        },{
                            xtype:"panel",
                            border:false,
                            columnWidth:0.07,
                            items:[{
                                border:false,
                                html:"min."
                            }]
                        },{
                            xtype:"panel",
                            layout:"form",
                            border:false,
                            columnWidth:0.27,
                            labelWidth:60,
                            items:[{
                                xtype:"numberfield",
                                fieldLabel:"Sisto-Diast",
                                name:"mpcSistoDiast",
                                width:80,
                                allowBlank:false,
                                maxLength:4,
                                tabIndex:110,
                                autoCreate:{
                                    tag:"input",
                                    autocomplete:"off",
                                    maxlength:4
                                }
                            }]
                        },{
                            xtype:"panel",
                            border:false,
                            columnWidth:0.05,
                            items:[{
                                html:"min.",
                                border:false
                            }]
                        }]
                    },{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        labelWidth:220,
                        items:[{
                            xtype:"textfield",
                            fieldLabel:"Coeficiente de Variación",
                            name:"mpcVariacion",
                            width:100,
                            allowBlank:false,
                            maxLength:10,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:10
                            },
                            enableKeyEvents:true,
                            listeners: {
                                'keypress':function(txtField,e){
                                     if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39){}else{
                                    e.stopEvent();
                                }
                                }
                            }
                        }]
                    }]
                }]
            },{
                html:"<hr>",
                height:20,
                border:false
            },{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    items:[{
                        xtype:"panel",
                        columnWidth:0.3,
                        border:false,
                        items:[{
                            height:20,
                            border:false
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.4,
                        layout:"form",
                        border:false,
                        labelWidth:200,
                        items:[{
                            xtype:"numberfield",
                            fieldLabel:"Promedio de frecuencia cardiaca",
                            name:"mpcFecuenciaCardiaca",
                            width:100,
                            allowBlank:false,
                            maxLength:4,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:4
                            }
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.3,
                        border:false,
                        items:[{
                            border:false,
                            height:20
                        }]
                    }]
                },{
                    xtype:"panel",
                    border:false,
                    layout:"column",
                    items:[{
                        xtype:"panel",
                        border:false,
                        layout:"form",
                        columnWidth:0.4,
                        labelWidth:250,
                        items:[{
                            xtype:"textfield",
                            fieldLabel:"Desvío Standard",
                            name:"mpcDesvioSatndar",
                            width:100,
                            allowBlank:false,
                            maxLength:6,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:6
                            },
                            enableKeyEvents:true,
                            listeners: {
                                'keypress':function(txtField,e){
                                     if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39){}else{
                                    e.stopEvent();
                                }
                                }
                            }
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        columnWidth:0.1,
                        items:[{
                            html:"mmHg",
                            border:false
                        }]
                    },{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        columnWidth:0.4,
                        labelWidth:250,
                        items:[{
                            xtype:"textfield",
                            fieldLabel:"Descenso Circadiano",
                            name:"mpcDescensoCirculatorio",
                            width:100,
                            allowBlank:false,
                            maxLength:11,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:11
                            },
                            enableKeyEvents:true,
                            listeners: {
                                'keypress':function(txtField,e){
                                     if((e.getKey()>=46 && e.getKey()<=57) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39){}else{
                                    e.stopEvent();
                                }
                                }
                            }
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        columnWidth:0.1,
                        items:[{
                            html:"%",
                            border:false
                        }]
                    }]
                },{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    items:[{
                        xtype:"panel",
                        layout:"form",
                        border:false,
                        columnWidth:0.4,
                        labelWidth:250,
                        items:[{
                            xtype:"numberfield",
                            fieldLabel:"Intensidad de Carga Hipertensiva Sistólica",
                            name:"mpcHipertensivaSistolica",
                            width:100,
                            allowBlank:false,
                            maxLength:6,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:6
                            }
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        columnWidth:0.1,
                        items:[{
                            html:"mmHg",
                            border:false
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.4,
                        border:false,
                        layout:"form",
                        labelWidth:250,
                        items:[{
                            xtype:"numberfield",
                            fieldLabel:"Intensidad de Carga Hipertensiva Diastólica",
                            name:"mpcHipertensivaDiastolica",
                            width:100,
                            allowBlank:false,
                            maxLength:6,
                            tabIndex:110,
                            autoCreate:{
                                tag:"input",
                                autocomplete:"off",
                                maxlength:6
                            }
                        }]
                    },{
                        xtype:"panel",
                        border:false,
                        columnWidth:0.1,
                        items:[{
                            border:false,
                            html:"mmHg"
                        }]
                    }]
                }]
            }]
        }]
    });

    var panelFormMapaCierre= new Ext.FormPanel({
        id:idPnl,
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearFichaMapaCierre = function(){
        panelFormMapaCierre.add(PanelMapaCierre);
        panelFormMapaCierre.doLayout();
        var panel=Ext.getCmp('idFormMapa');
        loadFormulario(panel,{
            url:contexto+'/Mapa',
            'idCnt':idCnt,
            'bnd':1
        });
        return panelFormMapaCierre;
    }    
}

