/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("com.punto.pen");

com.punto.pen.PanelBusquedaAvanzada= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);
    var enviaFarma = (argumentos.enviaFarma==null ? '0' : argumentos.enviaFarma);


    var panelFormBusquedaAvanzada= new Ext.FormPanel({
        id:'idPanelBusquedaAvanzada',
        url: contexto+'/Cliente',
        bodyStyle: "padding:5px 5px 0",
        region: 'center',
        border:false,
        autoHeight: true,
        autoScroll:false,
        items:[{
            id:'idPanelECalidad',
            xtype:"panel",
            layout:"form",
            border:false,
            items:[
            new Ext.form.FieldSet({
                title:"Datos del Paciente",
                autoHeight:true,
                width:this.anchos,
                layout:"form",
                collapsed:false,
                collapsible:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    bodyStyle:"padding:5px",
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Folio Paciente",
                        width:150,
                        maxlength:9,
                        minlength:6,
                        name:"folioPac",
                        id:'idBAzfolioPac',
                        tabIndex:2116,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:10,
                            minlength:1
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
                    items:[{
                        xtype:"panel",
                        columnWidth:0.25,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        items:[{
                            xtype:"textfield",
                            id:'idBAzNombrePac',
                            fieldLabel:"Nombre",
                            name:"clnNombre",
                            tabIndex:2100,
                            width:190,
                            style:'text-transform: uppercase;',
                            enableKeyEvents:true,
                            listeners: {
                                blur:function(el){
                                    el.setValue(el.getValue().trim());
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
                        {
                            xtype:"textfield",
                            fieldLabel:"Tel. Oficina",
                            id:'idBAzTelefonoOfPac',
                            width:100,
                            maxLength:8,
                            minLength:6,
                            tabIndex:2104,
                            autoCreate:{
                                tag:"input",
                                type:"text",
                                autocomplete:"off",
                                maxlength:8,
                                minlength:6,
                                name:"clnTelOficina"
                            },
                            enableKeyEvents:true,
                            listeners:{
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
                        columnWidth:0.25,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        enableKeyEvents:true,
                        items:[{
                            xtype:"textfield",
                            fieldLabel:"Apellido Paterno",
                            id:'idBAzAPaternoPac',
                            name:"clnApellidoPaterno",
                            width:190,
                            tabIndex:2101,
                            style:'text-transform: uppercase;',
                            enableKeyEvents:true,
                            listeners: {
                                blur:function(el){
                                    el.setValue(el.getValue().trim());
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
                            id:'idBAzCorreoElect',
                            fieldLabel:"Correo Electrónico",
                            vtype:"email",
                            width:190,
                            tabIndex:2105,
                            name:"clnCorreoElectronico"
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
                            id:'idBAzAMaternoPac',
                            name:"clnApellidoMaterno",
                            tabIndex:2102,
                            width:190,
                            style:'text-transform: uppercase;',
                            enableKeyEvents:true,
                            listeners: {
                                blur:function(el){
                                    el.setValue(el.getValue().trim());
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
                            fieldLabel:"Teléfono",
                            width:100,
                            maxLength:12,
                            id:'idBAzTelCasaPac',
                            minLength:7,
                            tabIndex:2106,
                            name:"clnTelCasa",
                            autoCreate:{
                                tag:"input",
                                type:"text",
                                autocomplete:"off",
                                maxlength:12,
                                minlength:7
                            },
                            enableKeyEvents:true,
                            listeners:{
                                'keypress':function(txtField,e){
                                    //                                alert(e.getKey());
                                    if((e.getKey()>=48 && e.getKey()<=58) || e.getKey()==8 || e.getKey()==9 || e.getKey()==37
                                        || e.getKey()==39 || e.getKey()==46){}else{
                                        e.stopEvent();
                                    }
                                }
                            }
                        }
                        ]
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
                            id:'idBAzFechaNacPac',
                            emptyText:'dd/mm/yyyy',
                            tabIndex:2103,
                            width:100,
                            autoCreate:{
                                tag:"input",
                                maxlength:10
                            },
                            readOnly:false,
                            name:"clnFechaNacimiento",
                            enableKeyEvents:true,
                            listeners:{
                                'keypress':function(txtField,e){
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
                                id:'idBAzTelCelularPac',
                                fieldLabel:"Tel. Celular",
                                emptyText:"10 Dígitos",
                                width:110,
                                name:"clnCelular",
                                maxLength:10,
                                minLength:10,
                                tabIndex:2107,
                                autoCreate:{
                                    tag:"input",
                                    type:"text",
                                    autocomplete:"off",
                                    maxlength:10,
                                    minlength:10
                                },
                                enableKeyEvents:true,
                                listeners:{
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

            }),/////////////////////////direccion Paciente            
            new Ext.form.FieldSet({
                title:"Dirección del Paciente",
                autoHeight:true,
                width:this.anchos,
                id:'idFieldSerDireccionPac',
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
                        id:'idBAzCallePac',
                        width:200,
                        tabIndex:2108,
                        name:"cdrCalle",                        
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
                        id:"idBAzComboEstadoCln",
                        etiqueta:"Estado",                        
                        name:"cdrEstado",
                        width:180,
                        tabIndex:2112,
                        prm:{
                            campo:'edo',
                            idCampo:'idEdo',
                            bnd:1,
                            qry:1,
                            autoCarga:true
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var dm = Ext.getCmp('idBAzComboDelCln');
                                accionCmbUbicacion(dm,['idBAzComboDelCln',"idBAzComboColCln","idBAzComboCpCln"],{
                                    edo:cmb.getRawValue()
                                }, true)
                            }
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
                        id:'idBAzNumExtPac',
                        fieldLabel:"Num. Exterior",
                        name:"cdrNumExt",
                        maxLength:150,
                        tabIndex:2109,
                        minLength:1,
                        enableKeyEvents:true,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:150,
                            minlength:1
                        },
                        style:'text-transform: uppercase;',
                        listeners: {
                            blur:function(el){
                                el.setValue(el.getValue().trim())
                            },
                            'keyup' : function(elem, e){
                                elem.setValue(elem.getValue().toUpperCase());
                            }
                        }
                    },
                    new com.punto.pen.ComboBox({
                        id:"idBAzComboDelCln",
                        etiqueta:"Delg./Mpo.",                        
                        tabIndex:2113,
                        name:"cdrDelegacionMunicipio",
                        width:180,
                        prm:{
                            campo:'dm',
                            idCampo:'idDM',
                            bnd:1,
                            qry:2,
                            autoCarga:false
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var edo = Ext.getCmp('idBAzComboEstadoCln');
                                var cl = Ext.getCmp('idBAzComboColCln');
                                accionCmbUbicacion(cl,["idBAzComboColCln","idBAzComboCpCln"],{
                                    'edo':edo.getRawValue(),
                                    'dm':cmb.getRawValue()
                                }, true)
                            }
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
                        fieldLabel:"Num. Interior",
                        id:'idBAzNumIntPac',
                        name:"cdrNumInt",
                        maxLength:150,
                        tabIndex:2110,
                        minLength:1,
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
                        }

                    },
                    new com.punto.pen.ComboBox({
                        id:"idBAzComboColCln",
                        etiqueta:"Colonia",                        
                        name:"cdrColonia",
                        tabIndex:2114,
                        width:180,
                        prm:{
                            campo:'cl',
                            idCampo:'idCl',
                            bnd:1,
                            qry:3,
                            autoCarga:false
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var edo = Ext.getCmp('idBAzComboEstadoCln');
                                var dm = Ext.getCmp('idBAzComboDelCln');
                                var cp = Ext.getCmp('idBAzComboCpCln');
                                accionCmbUbicacion(cp,["idBAzComboCpCln"],{
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
                    enableKeyEvents:true,
                    items:[{
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
                            tabIndex:2111,
                            handler:function(){
                                var wnd = new Ext.Window({
                                    title:"Codigo postal",
                                    id:"idWndCpCliente",
                                    width:600,
                                    height:400,
                                    //
                                    constrainHeader :true,
                                    constrain :true,
                                    resizable : false,
                                    //
                                    modal:true,
                                    border:false,
                                    autoScroll:false,
                                    layout:'fit',
                                    items:[new com.punto.pen.codPostal()],
                                    buttons:[
                                    {
                                        text:'Aceptar',
                                        handler:function(){
                                            var grd = Ext.getCmp('gridBuscadorCp');
                                            var record = grd.getSelectionModel().getSelected();
                                            if(record!=null){
                                                enviaValores([Ext.getCmp('idBAzComboEstadoCln'),Ext.getCmp('idBAzComboDelCln'),Ext.getCmp('idBAzComboColCln'),Ext.getCmp('idBAzComboCpCln')],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpCliente'));
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
                        id:"idBAzComboCpCln",
                        etiqueta:"Código Postal",                        
                        name:"cdrCp",
                        tabIndex:2115,
                        prm:{
                            campo:'cp',
                            idCampo:'idCp',
                            bnd:1,
                            qry:4,
                            autoCarga:false
                        }
                    })]
                }]
            }),{
                        xtype:"hidden",
                        name:'enviaFarma',
                        id:'enviaFarma',
                        value:enviaFarma
                    }
            ,{////////////////////////////Medico
                xtype:"fieldset",
                title:"Médico",
                autoHeight:true,
                layout:"form",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    bodyStyle:"padding:5px",
                    items:[{
                        xtype:"numberfield",
                        fieldLabel:"Folio Médico",
                        width:120,
                        maxlength:9,
                        minlength:6,
                        name:"medfolio",
                        id:'idBAzfolioMed',
                        tabIndex:2116,
                        autoCreate:{
                            tag:"input",
                            type:"text",
                            autocomplete:"off",
                            maxlength:10,
                            minlength:1
                        }
                    }]
                },{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
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
                            id:'idBAznombreMed',
                            fieldLabel:"Nombre",
                            name:"medNombre",
                            width:190,
                            enableKeyEvents:true,
                            tabIndex:2116,
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
                            xtype:"numberfield",
                            fieldLabel:"Teléfono",
                            width:80,
                            maxlength:9,
                            minlength:6,
                            name:"medTelefono",
                            id:'idBAzTelefonoMed',
                            tabIndex:2120,
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
                            id:'idBAzAPatMed',
                            fieldLabel:"Apellido Paterno",
                            name:"medApellidoPaterno",
                            enableKeyEvents:true,
                            tabIndex:2117,
                             width:190,
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
                            xtype:"numberfield",
                            id:'idBAzFaxMed',
                            fieldLabel:"Fax",
                            width:80,
                            maxlength:8,
                            minlength:6,
                            tabIndex:2121,
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
                            id:'idBAzAMatMed',
                            xtype:"textfield",
                            fieldLabel:"Apellido Materno",
                            name:"medApellidoMaterno",
                            enableKeyEvents:true,
                            tabIndex:2118,
                             width:190,
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
                            id:"idBAzComboEspecialidadMed",
                            tabIndex:2122,
                            etiqueta:"Especialidad",
                            name:"medEspecialidad",
                            valueField:"idEdo",
                            width:180,
                            hiddenName:"hidenEspecialidad",
                            prm:{
                                campo:'edo',
                                idCampo:'idEdo',
                                bnd:5,
                                qry:10,
                                autoCarga:true
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
                            xtype:"datefield",
                            fieldLabel:"Fecha Nacimiento",
                            height:0,
                            id:'idBAzFechaNacMed',
                            emptyText:"dd/mm/yyyy",
                            name:"medFechaNacimiento",
                            width:100,
                            tabIndex:2119,
                            autoCreate:{
                                tag:"input",
                                maxlength:10
                            },
                            enableKeyEvents:true,
                            listeners:{
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
                                id:'idBAzCedulaMed',
                                name:"medCedula",
                                tabIndex:2123,
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
                }]
            },{////////////////////////////// Direccion Medico
                xtype:"fieldset",
                title:"Dirección del Médico",
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
                        id:'idBAzCalleMed',
                        fieldLabel:"Calle",
                        width:200,
                        name:"medCalle",
                        tabIndex:2124,
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
                        id:"idBAzComboEstadoMed",
                        etiqueta:"Estado",
                        tabIndex:2128,
                        name:"medEstado",
                        width:180,
                        prm:{
                            campo:'edo',
                            idCampo:'idEdo',
                            bnd:1,
                            qry:1,
                            autoCarga:true
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var dm = Ext.getCmp('idBAzComboDelMed');
                                accionCmbUbicacion(dm,['idBAzComboDelMed',"idBAzComboColMed","idBAzComboCplMed"],{
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
                        id:'idBAzNumExtMed',
                        name:"medNumExt",
                        maxlength:15,
                        minlength:1,
                        tabIndex:2125,
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
                    },
                    new com.punto.pen.ComboBox({
                        id:"idBAzComboDelMed",
                        etiqueta:"Delg./Mpo.",                       
                        name:"medDelegacionMunicipio",
                        tabIndex:2129,
                        width:180,
                        prm:{
                            campo:'dm',
                            idCampo:'idDM',
                            bnd:1,
                            qry:2,
                            autoCarga:false
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var edo = Ext.getCmp('idBAzComboEstadoMed');
                                var cl = Ext.getCmp('idBAzComboColMed');
                                accionCmbUbicacion(cl,["idBAzComboColMed","idBAzComboCplMed"],{
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
                        id:'idBAzNumIntMed',
                        name:"medNumInt",
                        maxlength:15,
                        minlength:1,
                        tabIndex:2126,
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
                    },
                    new com.punto.pen.ComboBox({
                        id:"idBAzComboColMed",
                        etiqueta:"Colonia",
                        name:"medColonia",
                        tabIndex:2130,
                        width:180,
                        prm:{
                            campo:'cl',
                            idCampo:'idCl',
                            bnd:1,
                            qry:3,
                            autoCarga:false
                        },
                        evt:{
                            'select':function(cmb,rec,idx){
                                var edo = Ext.getCmp('idBAzComboEstadoMed');
                                var dm = Ext.getCmp('idBAzComboDelMed');
                                var cp = Ext.getCmp('idBAzComboCplMed');
                                accionCmbUbicacion(cp,["idBAzComboCplMed"],{
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
                        xtype:"panel",
                        border:false,
                        layout:"form",
                        height:47,
                        items:[{
                            border:false,
                            height:17
                        },{
                            xtype:"button",
                            tabIndex:2127,
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
                                    items:[new com.punto.pen.codPostal()],
                                    buttons:[
                                    {
                                        text:'Aceptar',
                                        handler:function(){
                                            var grd = Ext.getCmp('gridBuscadorCp');
                                            var record = grd.getSelectionModel().getSelected();
                                            if(record!=null){
                                                enviaValores([Ext.getCmp('idBAzComboEstadoMed'),Ext.getCmp('idBAzComboDelMed'),Ext.getCmp('idBAzComboColMed'),Ext.getCmp('idBAzComboCplMed')],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpMed'));
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
                        id:"idBAzComboCplMed",
                        etiqueta:"Código Postal",
                        tabIndex:2131,
                        name:"medCp",
                        prm:{
                            campo:'cp',
                            idCampo:'idCp',
                            bnd:1,
                            qry:4,
                            autoCarga:false
                        }
                    })]
                }]
            }
            ]
        }]
    });
    return panelFormBusquedaAvanzada;
}