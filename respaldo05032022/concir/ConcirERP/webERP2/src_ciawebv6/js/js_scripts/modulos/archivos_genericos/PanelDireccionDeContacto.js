/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("com.punto.pen");

com.punto.pen.getFormDireccionContacto = function(args){

    var habilNombreCont = false;
    var vaciosNomCont = false;

    if(args.tipContVal == "PACIENTE" || args.tipContVal == "Paciente"){
        habilNombreCont = true;
        vaciosNomCont = true;
    }    
    
    var fieldSetDatosContacto=new Ext.form.FieldSet({
        id:"idDireccionContactoCanje",
        xtype:"fieldset",
        title:"Dirección",
        autoHeight:true,
        width:this.anchos,
        layout:"column",
        items:[{
            xtype:"panel",
            columnWidth:0.25,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[new com.punto.pen.ComboBox({
                id:args.tipCont,
                value:args.tipContVal,
                etiqueta:"Tipo Contacto",
                name:"cdrTipoContacto",
                tabIndex:132,
                allowBlank:false,
                prm:{
                    campo:'tipContac',
                    idCampo:'idTipContac',
                    //tabIndex:128,
                    bnd:5,
                    qry:15,
                    autoCarga:true
                },
                width:100,
                evt:{
                    select:function(cmb,rec,idx){
                        var nom = [Ext.getCmp(args.nombre),Ext.getCmp(args.aPaterno),Ext.getCmp(args.aMaterno)];
                        if(cmb.getRawValue() == "PACIENTE"){
                            for(var i = 0; i < nom.length; i++){
                                nom[i].allowBlank = true;
                                nom[i].focus();
                            }
                            nom[0].focus();
                            for(var k = 0; k < nom.length; k++){
                                nom[k].setValue("");
                                nom[k].setDisabled(true);
                            }
                        }else{
                            for(var j = 0; j < nom.length; j++){
                                nom[j].setDisabled(false);
                                nom[j].allowBlank = false;
                            }
                        }
                    }
                }
            }),{
                xtype:"textfield",
                id:args.calle,
                value:args.calleVal,
                fieldLabel:"Calle",
                width:176,
                tabIndex:136,
                name:"cdrCalleContacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                allowBlank:false,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },{
                xtype:"textfield",
                id:args.entCalle2,
                value:args.entCalle2Val,
                fieldLabel:"Entre Calle 2",
                width:176,
                tabIndex:140,
                name:"cdrEntreCalle2Contacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },
            new com.punto.pen.ComboBox({
                id:args.edo,
                value:args.edoVal,
                etiqueta:"Estado",
                name:"cdrEstadoContacto",
                tabIndex:144,
                allowBlank:false,
                prm:{
                    campo:'edo',
                    idCampo:'idEdo',
                    bnd:1,
                    qry:1,
                    autoCarga:true
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var dm = Ext.getCmp(args.delMnpo);
                        accionCmbUbicacion(dm,[args.delMnpo,args.colonia,args.cp],{
                            edo:cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:args.horaDe,
                value:args.horaDeVal,
                etiqueta:"Hora de",
                name:"cdrHoraDeCnt",
                tabIndex:148,
                prm:{
                    campo:'hDe',
                    idCampo:'idhDe',
                    autoCarga:true,
                    bnd:6
                }
            })
            ]
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
                id:args.nombre,
                value:args.nombreVal,
                fieldLabel:"Nombre",
                name:"cdrNombreContacto",
                tabIndex:133,
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                disabled:habilNombreCont,
                //disabled:true,
                allowBlank:vaciosNomCont,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },{
                xtype:"textfield",
                id:args.nExt,
                value:args.nExtVal,
                fieldLabel:"Num. Exterior",
                name:"cdrNumExtContacto",
                maxLength:150,
                minLength:1,
                tabIndex:137,
                enableKeyEvents:true,
                allowBlank:false,
                autoCreate:{
                    tag:"input",
                    type:"text",
                    autocomplete:"off",
                    maxlength:150,
                    minlength:1
                },
                style:'text-transform: uppercase;'
                ,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    }
                //                    ,
                //                    'keypress':function(txtField,e){
                //                        if(e.getKey()!=48 && e.getKey()!=49 && e.getKey()!=50 && e.getKey()!=51 && e.getKey()!=52 && e.getKey()!=53 && e.getKey()!=54 && e.getKey()!=55 && e.getKey()!=56 && e.getKey()!=57){
                //                            e.stopEvent();
                //                        }
                //
                //                    }
                }
            },{
                xtype:"textfield",
                id:args.ref1,
                value:args.ref1Val,
                fieldLabel:"Referencia 1",
                width:176,
                tabIndex:141,
                name:"cdrReferencia1Contacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true
                ,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },
            new com.punto.pen.ComboBox({
                id:args.delMnpo,
                value:args.delMnpoVal,
                etiqueta:"Delg./Mpo.",
                name:"cdrDelegacionMunicipioContacto",
                tabIndex:145,
                allowBlank:false,
                prm:{
                    campo:'dm',
                    idCampo:'idDM',
                    bnd:1,
                    qry:2,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp(args.edo);
                        var cl = Ext.getCmp(args.colonia);
                        accionCmbUbicacion(cl,[args.colonia,args.cp],{
                            'edo':edo.getRawValue(),
                            'dm':cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:args.horaA,
                value:args.horaAVal,
                etiqueta:"Hora a",
                name:"cdrHoraACnt",
                tabIndex:149,
                prm:{
                    campo:'hDe',
                    idCampo:'idhDe',
                    autoCarga:true,
                    bnd:6
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
            enableKeyEvents:true,
            items:[{
                xtype:"textfield",
                id:args.aPaterno,
                value:args.aPaternoVal,
                fieldLabel:"Apellido Paterno",
                tabIndex:134,
                name:"cdrApellidoPatContacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                disabled:habilNombreCont,
                //disabled:true,
                allowBlank:vaciosNomCont,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }

                }
            },{
                xtype:"textfield",
                id:args.nInt,
                value:args.nIntVal,
                fieldLabel:"Num. Interior",
                name:"cdrNumIntContacto",
                maxLength:150,
                minLength:1,
                tabIndex:138,
                autoCreate:{
                    tag:"input",
                    type:"text",
                    autocomplete:"off",
                    maxlength:150,
                    minlength:1
                },
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    }
                //                    ,
                //                    'keypress':function(txtField,e){
                //
                //                        if(e.getKey()!=48 && e.getKey()!=49 && e.getKey()!=50 && e.getKey()!=51 && e.getKey()!=52 && e.getKey()!=53 && e.getKey()!=54 && e.getKey()!=55 && e.getKey()!=56 && e.getKey()!=57){
                //                            e.stopEvent();
                //                        }
                //
                //                    }
                }
            },{
                xtype:"textfield",
                id:args.ref2,
                value:args.ref2Val,
                fieldLabel:"Referencia 2",
                width:176,
                tabIndex:142,
                name:"cdrReferencia2Contacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },

                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },
            new com.punto.pen.ComboBox({
                id:args.colonia,
                value:args.coloniaVal,
                etiqueta:"Colonia",
                name:"cdrColoniaContacto",
                tabIndex:146,
                allowBlank:false,
                prm:{
                    campo:'cl',
                    idCampo:'idCl',
                    bnd:1,
                    qry:3,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp(args.edo);
                        var dm = Ext.getCmp(args.delMnpo);
                        var cp = Ext.getCmp(args.cp);
                        accionCmbUbicacion(cp,[args.cp],{
                            'edo':edo.getRawValue(),
                            'dm':dm.getRawValue(),
                            'cl':cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:args.tipTel,
                value:args.tipTelVal,
                etiqueta:"Tipo de Telefono",
                name:"cdTipoTelefonoContacto",
                valueField:"idCdTipoTel",
                prm:{
                    campo:'cdTipoTelContacto',
                    idCampo:'idCdTipoTel',
                    bnd:5,
                    qry:60,
                    autoCarga:true
                },
                width:100,
                tabIndex:150
            })]
        },{
            xtype:"panel",
            columnWidth:0.25,
            border:false,
            frame:false,
            layout:"form",
            labelAlign:"top",
            bodyStyle:"padding:5px",
            enableKeyEvents:true,
            items:[{
                xtype:"textfield",
                id:args.aMaterno,
                value:args.aMaternoVal,
                fieldLabel:"Apellido Materno",
                tabIndex:135,
                name:"cdrApellidoMatContacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                disabled:habilNombreCont,
                //disabled:true,
                allowBlank:vaciosNomCont,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }

                    }
                }
            },{
                xtype:"textfield",
                id:args.entCalle1,
                value:args.entCalle1Val,
                fieldLabel:"Entre Calle 1",
                width:176,
                tabIndex:139,
                name:"cdrEntreCalle1Contacto",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    },
                    'keypress':function(txtField,e){
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
                    text:"Buscar Por Código Postal",
                    tabIndex:143,
                    handler:function(){
                        var wnd = new Ext.Window({
                            title:"Codigo postal",
                            id:"idWndCpContacto",
                            width:600,
                            //
                            constrainHeader :true,
                            constrain :true,
                            resizable : false,
                            //
                            height:400,
                            layout:'fit',
                            modal:true,
                            border:false,
                            autoScroll:false,
                            items:[new com.punto.pen.codPostal()],
                            //items:[getPanelCpCnt()],
                            buttons:[
                            {
                                text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorCp');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        enviaValores([Ext.getCmp(args.edo),Ext.getCmp(args.delMnpo),Ext.getCmp(args.colonia),Ext.getCmp(args.cp)],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpContacto'));
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
                id:args.cp,
                value:args.cpVal,
                etiqueta:"Codigo Postal",
                name:"cdrCpContacto",
                allowBlank:false,
                tabIndex:147,
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
            }),
            {
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
                        id:args.lada,
                        value:args.ladaVal,
                        xtype:"textfield",
                        fieldLabel:"Lada",
                        width:33,
                        maxLength:3,
                        minLength:2,
                        tabIndex:151,
                        name:"cdLadaContacto",
                        enableKeyEvents:true,
                        listeners:{
                            'change':function(txt){
                                var tel = Ext.getCmp(args.tel);
                                var lada = Ext.getCmp(args.lada);

                                if((lada.getValue() == "" && tel.getValue() != "") || (lada.getValue()!="" && tel.getValue() == "")){
                                    lada.allowBlank = false;
                                    tel.allowBlank = false;
                                }else{
                                    lada.allowBlank = true;
                                    tel.allowBlank = true;
                                }
                            },
                            'keypress':function(txtField,e){
                                //                                alert(e.getKey());
                                if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39 || e.getKey()==46){}else{
                                    e.stopEvent();
                                }
                            }
                        },
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:3,
                            minlength:2
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.7,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Teléfono",
                        width:100,
                        maxLength:12,
                        id:args.tel,
                        value:args.telVal,
                        minLength:7,
                        tabIndex:152,
                        name:"cdTelContacto",
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:12,
                            minlength:7
                        },
                        enableKeyEvents:true,
                        listeners:{
                            'change':function(txt){
                                var tel = Ext.getCmp(args.tel);
                                var lada = Ext.getCmp(args.lada);

                                if((lada.getValue() == "" && tel.getValue() != "") || (lada.getValue()!="" && tel.getValue() == "")){
                                    lada.allowBlank = false;
                                    tel.allowBlank = false;
                                }else{
                                    lada.allowBlank = true;
                                    tel.allowBlank = true;
                                }
                            },
                            'keypress':function(txtField,e){
                                //                                alert(e.getKey());
                                if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                    || e.getKey()==39 || e.getKey()==46){}else{
                                    e.stopEvent();
                                }
                            }
                        }
                    }]
                }]
            }]
        }]
    });
    return fieldSetDatosContacto;
}