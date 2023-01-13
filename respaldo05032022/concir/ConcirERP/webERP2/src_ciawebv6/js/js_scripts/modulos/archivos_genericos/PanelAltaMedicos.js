/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.PanelAltaMedico= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;

    var fieldSetDatosGrlMed={
        xtype:"fieldset",
        title:"Alta de Médico",
        autoHeight:true,
        layout:"column",
        collapsed:false,
        collapsible:false,
        items:[{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            id:"panel1",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Nombre",
                allowBlank:false,
                name:"medNombre",
                    enableKeyEvents:true,
                tabIndex:101,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"combo",
                fieldLabel:"Sexo",
                width:100,
                allowBlank:false,
                forceSelection:true,
                mode:"local",
                name:"medSexo",
                store:["MASCULINO","FEMENINO"],
                tabIndex:105
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                bodyStyle:"padding:1px",
                items:[{
                    xtype:"panel",
                    columnWidth:0.25,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        id:"idLadaMed",
                        xtype:"numberfield",
                        fieldLabel:"Lada",
                        width:33,
                        tabIndex:109,
                        maxLength:3,
                        minLength:2,
                        name:"medLada",
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:3,
                            minlength:2
                        }
                    }
                    ,{
                        xtype:"button",
                        text:"Lada",
                        handler:function(){
                            var wnd = new Ext.Window({
                                title:"Lada",
                                id:"idWndsLada",
                                width:270,
                                height:300,
                                constrainHeader :true,
                                modal:true,
                                border:false,
                                autoScroll:false,
                                draggable:true,
                                resizable:false,
                                items:[getPanelLada2()],
                                buttons:[
                                {
                                    text:'Aceptar',
                                    handler:function(){
                                        enviaValores([Ext.getCmp('idLadaMed'),Ext.getCmp('idTelefonoMed')],[Ext.getCmp('idLadaGenerada').getValue(),Ext.getCmp('idTelefonoGenerado').getValue()],Ext.getCmp('idWndsLada'));
                                    }
                                },
                                {
                                    text:'Cancelar',
                                    handler:function(){
                                        wnd.close();
                                    }
                                }
                                ]
                            });
                            wnd.show();
                        }
                    }
                    ]
                },{
                    xtype:"panel",
                    columnWidth:0.55,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Teléfono",
                        width:80,
                        maxlength:9,
                        minlength:6,
                        name:"medTelefono",
                        id:'idTelefonoMed',
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            tabIndex:110,
                            autocomplete:"off",
                            maxlength:8,
                            minlength:6
                        }
                    }]
                }]
            }]
        },{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Apellido Paterno",
                allowBlank:false,
//                vtype:"alpha",
                name:"medApellidoPaterno",
                    enableKeyEvents:true,
                tabIndex:102,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                bodyStyle:"padding:1px",
                items:[{
                    xtype:"panel",
                    columnWidth:0.8,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Institución",
                        width:130,
                        tabIndex:106,
                        name:"medInstitucion",
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
                    }]
                }]
            },{
                xtype:"numberfield",
                fieldLabel:"Fax",
                width:80,
                maxlength:8,
                minlength:6,
                tabIndex:111,
                name:"medFax",
                autoCreate:{
                    tag:"input",
                    type:"text",
                    autocomplete:"off",
                    maxlength:8,
                    minlength:6
                }
            }]
        },{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Apellido Materno",
                allowBlank:false,
//                vtype:"alpha",
                name:"medApellidoMaterno",
                    enableKeyEvents:true,
                tabIndex:103,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            }, {
                xtype:"hidden",
                name:"hidenEspecialidad",
                id:"idHidenEspe",
                value:"0"
            },
            new com.punto.pen.ComboBox({
                id:"idComboEspecialidadMed",
                tabIndex:107,
                etiqueta:"Especialidad",
                name:"medEspecialidad",
                allowBlank:false,
                prm:{
                    campo:'edo',
                    idCampo:'idEdo',
                    bnd:5,
                    qry:10,
                    autoCarga:true
                },
                evt:{
                    'select':function(){
                        Ext.getCmp("idHidenEspe").setValue(Ext.getCmp("idComboEspecialidadMed").getValue());
                    }
                }
            })
            ,{
                xtype:"textfield",
                fieldLabel:"Correo Electrónico",
                vtype:"email",
                tabIndex:112,
                name:"medCorreoElectronico"
            }]
        },{
            xtype:"panel",
            columnWidth:0.25,
            border:false,
            frame:false,
            layout:"form",
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"datefield",
                fieldLabel:"Fecha Nacimiento",
                height:0,
                id:'idFechaNacMedico',
                emptyText:"dd/mm/yyyy",
                name:"medFechaNacimiento",
                allowBlank:false,
                tabIndex:104,
                width:100,
                autoCreate:{
                 tag:"input",
                 maxlength:10
               },enableKeyEvents:true,
                listeners:{
                    'blur':function(){
                        var valid=Validafecha('idFechaNacMedico');
                        if(valid==false){
                            Ext.MessageBox.alert('Error en Fecha',"La fecha de nacimiento ("+Ext.getCmp('idFechaNacMedico').getValue().format('d/m/Y')+") no puede ser mayor a la fecha actual");
                            Ext.getCmp('idFechaNacMedico').setValue("");
                        }
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.keyCode==13){
                                clickBtnBuscar2();
                            }
                            if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                               e.stopEvent();
                           }
                        }
                }
            },{
                xtype:"panel",
                columnWidth:0.47,
                layout:"form",
                labelAlign:"top",
                border:false,
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Cedula",
                    name:"medCedula",
                    tabIndex:108,
                    maxlength:17,
                    autoCreate:{
                        tag:"input",
                        type:"text",
                        autocomplete:"off",
                        maxlength:17
                    }
                }]
            }]
        }]
    };

    var fieldSetDireccionMed={
        xtype:"fieldset",
        title:"Dirección",
        autoHeight:true,
        layout:"column",
        items:[{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Calle",
                width:176,
                name:"medCalle",
                allowBlank:false,
                tabIndex:113,
                    enableKeyEvents:true,
                allowBlank:false,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"textfield",
                fieldLabel:"Entre Calle 2",
                width:176,
                tabIndex:117,
                name:"medEntreCalle2",
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },
            new com.punto.pen.ComboBox({
                id:"idComboEstadoMed",
                etiqueta:"Estado",
                allowBlank:false,
                tabIndex:121,
                name:"medEstado",
                prm:{
                    campo:'edo',
                    idCampo:'idEdo',
                    bnd:1,
                    qry:1,
                    autoCarga:true
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var dm = Ext.getCmp('idComboDelMed');
                        accionCmbUbicacion(dm,['idComboDelMed',"idComboColMed","idComboCplMed"],{
                            edo:cmb.getRawValue()
                        }, true)
                    }
                }
            })]
        },{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Num. Exterior",
                name:"medNumExt",
                maxlength:15,
                minlength:1,
                tabIndex:114,
                autoCreate:{
                    tag:"input",
                    type:"text",
                    autocomplete:"off",
                    maxlength:15,
                    minlength:1
                },
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"textfield",
                fieldLabel:"Referencia 1",
                width:176,
                tabIndex:118,
                    enableKeyEvents:true,
                name:"medReferencia1",
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },
            new com.punto.pen.ComboBox({
                id:"idComboDelMed",
                etiqueta:"Delg./Mpo.",
                allowBlank:false,
                tabIndex:122,
                name:"medDelegacionMunicipio",
                prm:{
                    campo:'dm',
                    idCampo:'idDM',
                    bnd:1,
                    qry:2,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoMed');
                        var cl = Ext.getCmp('idComboColMed');
                        accionCmbUbicacion(cl,["idComboColMed","idComboCplMed"],{
                            'edo':edo.getRawValue(),
                            'dm':cmb.getRawValue()
                        }, true)
                    }
                }
            })]
        },{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Num. Interior",
                name:"medNumInt",
                maxlength:15,
                minlength:1,
                tabIndex:115,
                autoCreate:{
                    tag:"input",
                    type:"text",
                    autocomplete:"off",
                    maxlength:15,
                    minlength:1
                },
                    enableKeyEvents:true,
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"textfield",
                fieldLabel:"Referencia 2",
                width:176,
                tabIndex:119,
                    enableKeyEvents:true,
                name:"medReferencia2",
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },
            new com.punto.pen.ComboBox({
                id:"idComboColMed",
                etiqueta:"Colonia",
                allowBlank:false,
                name:"medColonia",
                tabIndex:122,
                prm:{
                    campo:'cl',
                    idCampo:'idCl',
                    bnd:1,
                    qry:3,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoMed');
                        var dm = Ext.getCmp('idComboDelMed');
                        var cp = Ext.getCmp('idComboCplMed');
                        accionCmbUbicacion(cp,["idComboCplMed"],{
                            'edo':edo.getRawValue(),
                            'dm':dm.getRawValue(),
                            'cl':cmb.getRawValue()
                        }, true)
                    }
                }
            })]
        },{
            xtype:"panel",
            columnWidth:0.25,
            border:false,
            frame:false,
            layout:"form",
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Entre Calle 1",
                width:176,
                tabIndex:116,
                    enableKeyEvents:true,
                name:"medEntreCalle1",
                    style:'text-transform: uppercase;',
                    listeners:{
                         blur:function(el){
                        el.setValue(el.getValue().trim());
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            },{
                xtype:"panel",
                border:false,
                layout:"form",
                height:47,
                items:[{
                    border:false,
                    height:17
                },{
                    xtype:"button",
                    tabIndex:120,
                    text:"Buscar Por Código Postal",
                    handler:function(){
                        var wnd = new Ext.Window({
                            title:"Codigo postal",
                            id:"idWndCpMed",
                            width:600,
                            height:400,
                            constrainHeader :true,
                            modal:true,
                            border:false,
                            autoScroll:false,
                            draggable:true,
                            resizable:false,
                            layout:'fit',
                            items:[getPanelCp()],
                            buttons:[
                            {
                                text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorCp');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        enviaValores([Ext.getCmp('idComboEstadoMed'),Ext.getCmp('idComboDelMed'),Ext.getCmp('idComboColMed'),Ext.getCmp('idComboCplMed')],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpMed'));
                                    }else{
                                        Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar un Campo.");
                                    }
                                }
                            },
                            {
                                text:'Cancelar',
                                handler:function(){
                                    wnd.close();
                                }
                            }
                            ]
                        });
                        wnd.show();
                    }
                }]
            },
            new com.punto.pen.ComboBox({
                id:"idComboCplMed",
                etiqueta:"Código Postal",
                allowBlank:false,
                tabIndex:123,
                name:"medCp",
                prm:{
                    campo:'cp',
                    idCampo:'idCp',
                    bnd:1,
                    qry:4,
                    autoCarga:false
                },
                evt:{
                    'select':function(){
                    //accionCmbUbicacion(cmb,cmpToClean,prm, borrar)
                    }
                }
            })]
        },{
            xtype:"panel",
            columnWidth:0.2,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px"
        }]
    };

    var panelRegMedico= new Ext.FormPanel({
        //title:"REGISTRO DE PACIENTE",
        id: idPnl,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        url: url,
        height: this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearFichaMedico = function(){
        panelRegMedico.add(fieldSetDatosGrlMed);
        panelRegMedico.add(fieldSetDireccionMed);
        return panelRegMedico;
    }
    this.crearFichaNuevoMedico = function(){
        panelRegMedico.add(fieldSetDatosGrlMed);
        panelRegMedico.add(fieldSetDireccionMed);
        return panelRegMedico;
    }

    /*********************************************************************/
    /**************funciones para pantalla para generar Lada**************/
    /*********************************************************************/
    /**************funciones para pantalla para generar Lada**************/
    function getFieldSetGeneraLada2(){
        var fieldSetGeneraLada={
            xtype:"fieldset",
            title:"Generar lada",
            height:200,
            width:240,
            layout:"column",
            collapsed:false,
            collapsible:false,
            items:[{
                xtype:"panel",
                columnWidth:1,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[
                    new com.punto.pen.ComboBox({
                    id:"idComboEstadoLada",
                    etiqueta:"Estado",
                    allowBlank:false,
                    name:"cdrLadaEstado",
                    prm:{
                        campo:'edo',
                        idCampo:'idEdo',
                        bnd:1,
                        qry:1,
                        autoCarga:true
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            var dm = Ext.getCmp('idComboDelLada');
                            accionCmbUbicacion(null,["idLadaGenerada","idTelefonoGenerado","idDigitosLada"],{}, true);
                            accionCmbUbicacion(dm,['idComboDelLada'],{
                                edo:cmb.getRawValue()
                            }, true)
                        }
                    }
                }),new com.punto.pen.ComboBox({
                    id:"idComboDelLada",
                    etiqueta:"Delg./Mpo.",
                    allowBlank:false,
                    name:"cdrDelegacionMunicipio",
                    prm:{
                        campo:'dm',
                        idCampo:'idDM',
                        bnd:1,
                        qry:2,
                        autoCarga:false
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            accionCmbUbicacion(null,["idLadaGenerada","idTelefonoGenerado","idDigitosLada"],{}, true);
                            var edo = Ext.getCmp('idComboEstadoLada');
                            new Ajax.Request(contexto+'/ComboLoader', {
                                method: 'post',
                                onComplete:function(objeto){
                                    var res=null;
                                    try{
                                        res=objeto.responseText.evalJSON();
                                    }catch(e){

                                    }
                                    if(res!=null && res.succes){
                                        Ext.getCmp('idLadaGenerada').setValue(res.lada);
                                        Ext.getCmp('idDigitosLada').setValue(res.digitos);
                                    }
                                },
                                parameters:{
                                    bnd:7,
                                    nomMpo:cmb.getRawValue(),
                                    nomEdo:edo.getRawValue()
                                }
                            });
                        }
                    }
                }),{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    frame:false,
                    bodyStyle:"padding:1px",
                    items:[{
                        xtype:"panel",
                        columnWidth:0.2,
                        layout:"form",
                        labelAlign:"top",
                        border:false,
                        items:[{
                            id:"idLadaGenerada",
                            xtype:"textfield",
                            fieldLabel:"Lada",
                            width:33,
                            maxLength:3,
                            minLength:2,
                            readOnly:true
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.3,
                        layout:"form",
                        labelAlign:"top",
                        border:false,
                        items:[{
                            xtype:"textfield",
                            id:"idDigitosLada",
                            fieldLabel:"Digitos",
                            readOnly:true,
                            width:30
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.5,
                        layout:"form",
                        labelAlign:"top",
                        border:false,
                        items:[{
                            xtype:"numberfield",
                            fieldLabel:"Telefono",
                            id:"idTelefonoGenerado",
                            width:80,
                            maxLength:8,
                            minLength:7,
                            autoCreate:{
                                tag:"input",
                                type:"text",
                                autocomplete:"off",
                                maxlength:8,
                                minlength:7,
                                name:"medTelefono"
                            }
                        }]
                    }]
                }]
            }]
        }
        return fieldSetGeneraLada;
    }

    function getPanelLada2(){
        var panelLada = new Ext.FormPanel({
            id:'idPanelLada',
            bodyStyle: "padding:5px 5px 0",
            height: 220,
            autoScroll: true,
            items:[getFieldSetGeneraLada2()]
        });
        return panelLada;
    }
    /********************************************/
    function getPanelCp(){
        return new com.punto.pen.codPostal();
    }

}