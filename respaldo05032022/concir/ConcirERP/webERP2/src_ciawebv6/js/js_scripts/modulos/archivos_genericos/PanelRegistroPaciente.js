/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");
var banBuscDup=true;
var msg;
var valEmail;
var nutCam=0;

com.punto.pen.regPaciente= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var obsTF = argumentos.obsTF;
    var Titulo = (argumentos.Titulo==null ? "" : argumentos.Titulo);
    tipoEstTall=(argumentos.tipoEstTall==null ? 1 : argumentos.tipoEstTall);
    nutCam=(argumentos.nutCampo==null ? 0 : argumentos.nutCampo);
    var contAsingProd=0;
    var tipoCntModificar = (argumentos.tipoCntModificar==null ? 0 : argumentos.tipoCntModificar);
    this.anchos = 1060;
    valEmail=(argumentos.valEmail==null ? 1 : argumentos.valEmail);

    //////////////////////VALORES INICIALES PARA DIRECCION DE MEDICO///////////////////////////
    var tituloDireccion = (argumentos.tituloDireccion == null ? "Dirección del paciente" : argumentos.tituloDireccion);
    var calleMed = (argumentos.calleMed == null ? "" : argumentos.calleMed);
    var numExtMed = (argumentos.numExtMed == null ? "" : argumentos.numExtMed);
    var numIntMed = (argumentos.numIntMed == null ? "" : argumentos.numIntMed);
    var entreCalle1Med = (argumentos.entreCalle1Med == null ? "" : argumentos.entreCalle1Med);
    var entreCalle2Med = (argumentos.entreCalle2Med == null ? "" : argumentos.entreCalle2Med);
    var ref1Med = (argumentos.ref1Med == null ? "" : argumentos.ref1Med);
    var ref2Med = (argumentos.ref2Med == null ? "" : argumentos.ref2Med);
    var edoMed = (argumentos.edoMed == null ? "" : argumentos.edoMed);
    var delMunMed = (argumentos.delMunMed == null ? "" : argumentos.delMunMed);
    var coloniaMed = (argumentos.coloniaMed == null ? "" : argumentos.coloniaMed);
    var cpMed = (argumentos.cpMed == null ? "" : argumentos.cpMed);
    var editarDirMed = (argumentos.editarDirMed == null ? false : argumentos.editarDirMed);
    ///////////////////////////////////////////////////////////////////////////////////////////    

    /***************************************************************PANELES DEL FORMULARIO******************************************************************************/
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
    var panelAutorizacion = new Ext.Panel({
        layout:"form",
        id:"idPnlAutorizacion",//
        labelWidth:440,
        width:this.anchos,
        bodyStyle:"padding:5px",
        items:[{
            xtype:'panel',
            layout:'column',
            width:600,
            border:false,
            labelAling:'left',
            items:[
            {
                xtype:'label',
                columnWidth:.7,
                style:'font-size:12px',
                text:'¿Esta deacuerdo en guardar su información en nuestra base de datos?'
            },

            {
                xtype:'radio',
                columnWidth:.1,
                boxLabel: 'Si',
                labelStyle:"font-size:12px",
                name: 'CntAceptaGuardar',
                inputValue:true,
                checked: true,
                tabIndex:94
            },
            {
                xtype:'radio',
                boxLabel: 'No',
                columnWidth:.1,
                labelStyle:"font-size:12px",
                name: 'CntAceptaGuardar',
                inputValue: false,
                tabIndex:95,
                listeners:{
                    'check':function(radio,checked){
                        if(checked){
                            Ext.getCmp("BotonNuevoCliente").enable();
                            Ext.getCmp("idWndRegistro").close();
                        }
                    }
                }
            }]

        }
        ,
        {
            xtype:"checkbox",
            fieldLabel:"    ¿En caso de que su médico nos solicite información, acepta compartirla con él? ",
            boxLabel:"Si",
            name:"clnCompartirDatosConMedico",
            inputValue:true,
            tabIndex:96
        },{
            xtype:"checkbox",
            fieldLabel:"¿Desea recibir información? ",
            boxLabel:"Si",
            name:"clnRecibirInformacion",
            inputValue:"si",
            tabIndex:97
        }]
    });
    
    var panelTipoCliente =new Ext.form.FieldSet({
        title:"Tipo Cliente",
        layout:"form",
        autoHeight:true,
        width:this.anchos,
        collapsed:false,
        collapsible:false,
        items:[
        new com.punto.pen.ComboBox({
            id:"idComboTipoCliente",
            etiqueta:"Tipo",
            name:"clnStatusGeneral",
            hiddenName:"clnStatusGeneral",
            valueField:"idTipCnt",
            allowBlank:false,
            prm:{
                campo:'tipCnt',
                idCampo:'idTipCnt',
                bnd:5,
                qry:14,
                autoCarga:true
            },
            tabIndex:99,
            width:100,
            evt:{
                'select':function(cmb2,rec,idx){
                    var cmb=Ext.getCmp('idComboTipoCliente');
                    Ext.getCmp("idLabelNoEmpleado").setText("");
                    Ext.getCmp("idHidenNoEmpleado").setValue("");
                    if(cmb.getValue()=="1"){//Paciente
                        ocultaFieldSet(false, true);
                        Ext.getCmp('idHidenEsPaciente').setValue("si");
                        Ext.getCmp('idRegistrarPaciente').setDisabled(false);
                        empleadosGdl(16);
                        quitarAsigProdGeneral();
                    }else if(cmb.getValue()=="2"){//Prospecto
                        ocultaFieldSet(true, false);
                        Ext.getCmp('idHidenEsPaciente').setValue("no");
                        Ext.getCmp('idRegistrarPaciente').setDisabled(false);
                        Ext.getCmp("idComboComoEntero").allowBlank = false;
                        fieldSetOtros.setVisible(true);
                        empleadosGdl(97);
                        quitarAsigProdGeneral();
                    }
                    
                    /*else if(cmb.getValue()=="3"){Contacto
                        opcionContacto();
                        Ext.getCmp('idHidenEsPaciente').setValue("no");
                        Ext.getCmp('idRegistrarPaciente').setDisabled(false);
                        empleadosGdl(16);
                        quitarAsigProdGeneral();
                    }else{
                        Ext.getCmp('idRegistrarPaciente').setDisabled(true);
                        empleadosGdl(16);
                        quitarAsigProdGeneral();
                    }*/
                }
            }
            ,
            evtStore:{
                'load':function(st){
                    var cmp=Ext.getCmp('idComboTipoCliente');
                    if(nutCam==1){
                        cmp.setValue(2);
                        cmp.fireEvent('select');
                        desabilitacombo();
                        
                    }else if(nutCam==2){
                        cmp.setValue(3);
                        cmp.fireEvent('select');
                        desabilitacombo();
                        
                    }
                }
            }
        })
        ]
										
    });
    var fieldSetDatosGrlPac= new Ext.form.FieldSet({
        title:"Datos  Generales Del Paciente",
        autoHeight:true,
        width:this.anchos,
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
            id:"panel123456789",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                id:'idNombreRegPac',
                fieldLabel:"Nombre",
                allowBlank:false,
                name:"clnNombre",
                tabIndex:100,
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
                xtype:"combo",
                fieldLabel:"Sexo",
                width:100,
                allowBlank:false,
                mode:"local",
                name:"clnSexo",
                triggerAction:'all',
                forceSelection:true,
                store:["Masculino","Femenino"],
                tabIndex:105
            }
            ,{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                bodyStyle:"padding:1px",
                items:[{
                    xtype:"panel",
                    columnWidth:0.6,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Tel. Oficina",
                        width:100,
                        maxLength:8,
                        minLength:6,
                        tabIndex:110,
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
                    columnWidth:0.4,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Ext",
                        name:"clnExtOficina",
                        width:35,
                        maxLength:5,
                        minLength:2,
                        tabIndex:111,
                        style:'text-transform: uppercase;',
                        enableKeyEvents:true,
                        listeners:{
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
                            maxlength:5,
                            minlength:2
                        }
                    }]
                }]
            }]
        },{
            xtype:"panel",
            columnWidth:0.28,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            enableKeyEvents:true,
            items:[{
                xtype:"textfield",
                fieldLabel:"Apellido Paterno",
                id:'idAPaternoRegPac',
                allowBlank:false,
                name:"clnApellidoPaterno",
                tabIndex:102,
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
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                bodyStyle:"padding:1px",
                items:[{
                    xtype:"panel",
                    columnWidth:0.78,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[
                    {
                        xtype:"combo",
                        fieldLabel:"Estado Civil",
                        width:105,
                        mode:"local",
                        name:"clnEstadoCivil",
                        triggerAction:'all',
                        forceSelection:true,
                        store:["SOLTERO(A)","CASADO(A)","DIVORCIADO(A)","UNION LIBRE","VIUDO(A)"],
                        tabIndex:106
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.22,
                    layout:"form",
                    labelAlign:"top",
                    border:false,
                    items:[{
                        html:"",
                        border:false,
                        height:18
                    },{
                        xtype:"button",
                        text:"Lada",
                        tabIndex:107,
                        handler:function(){
                            var wnd = new Ext.Window({
                                title:"Lada",
                                id:"idWndLada",
                                width:310,
                                height:280,
                                constrainHeader :true,
                                constrain :true,
                                resizable : false,
                                modal:true,
                                border:false,
                                items:[getPanelLada()],
                                buttons:[
                                {
                                    text:'Aceptar',
                                    handler:function(){
                                        enviaValores([Ext.getCmp('idLada'),Ext.getCmp('idTelCasaRegPac')],[Ext.getCmp('idLadaGenerada').getValue(),Ext.getCmp('idTelefonoGenerado').getValue()],Ext.getCmp('idWndLada'));
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
                }]
            },            
            {
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:1px",
                items:[
                {
                    xtype:"panel",
                    columnWidth:0.65,
                    layout:"form",
                    border:false,
                    frame:false,
                    items:[
                    {
                        xtype:"textfield",
                        id:'idCorreoElect',
                        fieldLabel:"Correo Electrónico",
                        vtype:"email",
                        tabIndex:112,
                        style:'text-transform: uppercase;',
                        name:"clnCorreoElectronico",
                        listeners:{
                            'change':function(txt){
                                if(txt.isValid()){

                                    if(valEmail==1){
                                        Ext.Ajax.request({
                                            url:contexto+'/Cliente?valid=1',
                                            params:{
                                                bnd:18,
                                                email:txt.getValue()
                                            },
                                            success:function(rsp){
                                                var json = eval("("+rsp.responseText+")");
                                                if(json.repetido=='1'){
                                                    txt.markInvalid();
                                                    txt.focus();
                                                    Ext.Msg.alert("¡¡Alerta!!",json.msg);
                                                }
                                            },
                                            failure:function(rsp){

                                            }
                                        });
                                    }else if(valEmail==2){
                                        Ext.Ajax.request({
                                            url:contexto+'/Cliente?valid=2',
                                            params:{
                                                bnd:18,
                                                email:txt.getValue()
                                            },
                                            success:function(rsp){
                                                var json = eval("("+rsp.responseText+")");
                                                if(json.repetido=='1'){
                                                    txt.markInvalid();
                                                    txt.focus();
                                                    Ext.Msg.alert("¡¡Alerta!!",json.msg);
                                                }
                                            },
                                            failure:function(rsp){ }
                                        });
                                    }else if(valEmail==3){
                                        Ext.Ajax.request({
                                            url:contexto+'/Cliente?valid=3',
                                            params:{
                                                bnd:18,
                                                email:txt.getValue()
                                            },
                                            success:function(rsp){
                                                var json = eval("("+rsp.responseText+")");
                                                if(json.repetido=='1'){
                                                    txt.markInvalid();
                                                    txt.focus();
                                                    Ext.Msg.alert("¡¡Alerta!!",json.msg);
                                                }
                                            },
                                            failure:function(rsp){ }
                                        });
                                    }
                                }
                            }
                        }
                    }]
                },
                {
                    xtype:"panel",
                    columnWidth:0.35,
                    id:'idPanelEmailSend',
                    hidden :true,
                    layout:"form",
                    border:false,
                    frame:false,
                    items:[
                    {                       
                        xtype:"checkbox",                        
                        fieldLabel:"Enviar Email",
                        boxLabel: 'Bienvenida',
                        labelStyle:"font-size:12px",
                        name: 'cntEnviarEmail',
                        inputValue: true
                    }]
                }
                ]
            }]
        },{
            xtype:"panel",
            columnWidth:0.22,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[{
                xtype:"textfield",
                fieldLabel:"Apellido Materno",
                id:'idAMaternoRegPac',
                allowBlank:false,
                name:"clnApellidoMaterno",
                tabIndex:103,
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
                        id:"idLada",
                        xtype:"textfield",
                        fieldLabel:"Lada",
                        width:33,
                        maxLength:3,
                        minLength:2,
                        tabIndex:107,
                        name:"clnLada",
                        enableKeyEvents:true,
                        listeners:{
                            'change':function(txt){
                                var tel = Ext.getCmp("idTelCasaRegPac");                                
                                var lada = Ext.getCmp("idLada");                                
                               
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
                        id:'idTelCasaRegPac',
                        minLength:7,
                        tabIndex:108,
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
                            'change':function(txt){
                                var tel = Ext.getCmp("idTelCasaRegPac");
                                var lada = Ext.getCmp("idLada");

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
            },{
                xtype:"hidden",
                name:"hidenEsPaciente",
                id:'idHidenEsPaciente',
                value:"si"
            },
            {
                xtype:"combo",
                fieldLabel:"Numero Deseado",
                width:100,
                allowBlank:false,
                forceSelection:true,
                mode:"local",
                name:"numero_deseado",
                triggerAction: 'all',
                store:["Casa","Trabajo","Celular","Contacto"],
                tabIndex:113
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
                id:'idFechaNacRegPac',
                allowBlank:false,
                emptyText:'dd/mm/yyyy',
                tabIndex:104,
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                },
                readOnly:false,
                name:"clnFechaNacimiento",
                enableKeyEvents:true,
                listeners:{
                    'blur':function(){
                        var valid=Validafecha('idFechaNacRegPac');
                        if(valid==false){
                            Ext.MessageBox.alert('Error en Fecha',"La fecha de nacimiento ("+Ext.getCmp('idFechaNacRegPac').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                            Ext.getCmp('idFechaNacRegPac').setValue("");
                        }
                    },
                    'keypress':function(txtField,e){
                        if((e.getKey()>=47 && e.getKey()<=57)|| e.getKey()==9 || e.getKey()==8){}else{
                            e.stopEvent();
                        }
                    }
                }	
            },{
                xtype:"panel",
                id:"idVerificarCliente",
                columnWidth:0.47,
                layout:"form",
                labelAlign:"top",
                border:false,
                items:[{
                    border:false,
                    height:18
                },{
                    xtype:"button",
                    text:"Verificar Cliente",
                    tabIndex:104,
                    id:"mostrar-btn",
                    handler:function (){
                        var nombre=Ext.getCmp('idNombreRegPac').getValue();
                        var apaterno=Ext.getCmp('idAPaternoRegPac').getValue();
                        var amaterno=Ext.getCmp('idAMaternoRegPac').getValue();
                        var fechaNac=Ext.getCmp('idFechaNacRegPac');
                        if(!nombre.blank() && !apaterno.blank() && !amaterno.blank() && fechaNac.isValid() && banBuscDup){
                            RelacionDuplicados(nombre,apaterno,amaterno,fechaNac);
                        }else{
                            Ext.MessageBox.alert('¡¡Alerta!!',"<center>Debe ingresar el nombre y apellidos así como la fecha de nacimiento,</center><center>para verificar si el Cliente ya está Registrado.</center>");
                        }
                    }
                },{
                    border:false,
                    height:10
                }]
            },{
                xtype:"panel",
                columnWidth:0.47,
                layout:"form",
                labelAlign:"top",
                border:false,
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Tel. Celular",
                    emptyText:"13 Dígitos",
                    width:100,
                    name:"clnCelular",
                    maxLength:13,
                    minLength:13,
                    tabIndex:109,
                    autoCreate:{
                        tag:"input",
                        type:"text",
                        autocomplete:"off",
                        maxlength:13,
                        minlength:13
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
	
    });
    var fieldSetDireccionPac= new Ext.form.FieldSet({
        title:tituloDireccion,
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
                id:'idCallePac',
                width:176,
                tabIndex:120,
                name:"cdrCalle",
                allowBlank:false,
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                value:calleMed,
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
                fieldLabel:"Entre Calle 2",
                width:176,
                tabIndex:123,
                name:"cdrEntreCalle2",
                id:"idEntreCalle2Pac",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                value:entreCalle2Med,
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
                id:"idComboEstadoCln",
                etiqueta:"Estado",
                allowBlank:false,
                name:"cdrEstado",
                tabIndex:127,
                value:edoMed,
                prm:{
                    campo:'edo',
                    idCampo:'idEdo',
                    bnd:1,
                    qry:1,
                    autoCarga:true
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var dm = Ext.getCmp('idComboDelCln');
                        accionCmbUbicacion(dm,['idComboDelCln',"idComboColCln","idComboCpCln"],{
                            edo:cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:"idComboHoraDe",
                etiqueta:"Hora de",
                name:"cdrHoraDe",
                tabIndex:130,
                disabled:editarDirMed,
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
                fieldLabel:"Num. Exterior",
                name:"cdrNumExt",
                id:"idNumExtPac",
                maxLength:150,
                tabIndex:121,
                minLength:1,
                enableKeyEvents:true,
                value:numExtMed,
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
            },{
                xtype:"textfield",
                fieldLabel:"Referencia 1",
                width:176,
                tabIndex:124,
                name:"cdrReferencia1",
                id:"idRef1Pac",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                value:ref1Med,
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
                id:"idComboDelCln",
                etiqueta:"Delg./Mpo.",
                allowBlank:false,
                tabIndex:128,
                name:"cdrDelegacionMunicipio",
                value:delMunMed,
                prm:{
                    campo:'dm',
                    idCampo:'idDM',
                    bnd:1,
                    qry:2,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoCln');
                        var cl = Ext.getCmp('idComboColCln');
                        accionCmbUbicacion(cl,["idComboColCln","idComboCpCln"],{
                            'edo':edo.getRawValue(),
                            'dm':cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:"idComboHoraA",
                etiqueta:"Hora a",
                name:"cdrHoraA",
                tabIndex:131,
                disabled:editarDirMed,
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
                fieldLabel:"Num. Interior",
                name:"cdrNumInt",
                id:"idNumIntPac",
                maxLength:150,
                tabIndex:122,
                minLength:1,
                value:numIntMed,
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

            },{
                xtype:"textfield",
                fieldLabel:"Referencia 2",
                width:176,
                tabIndex:125,
                name:"cdrReferencia2",
                id:"idRef2Pac",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                value:ref2Med,
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
                id:"idComboColCln",
                etiqueta:"Colonia",
                allowBlank:false,
                name:"cdrColonia",
                tabIndex:129,
                value:coloniaMed,
                prm:{
                    campo:'cl',
                    idCampo:'idCl',
                    bnd:1,
                    qry:3,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoCln');
                        var dm = Ext.getCmp('idComboDelCln');
                        var cp = Ext.getCmp('idComboCpCln');
                        accionCmbUbicacion(cp,["idComboCpCln"],{
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
                id:"idEntreCalle1",
                xtype:"textfield",
                fieldLabel:"Entre Calle 1",
                tabIndex:122,
                width:176,
                name:"cdrEntreCalle1",
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                value:entreCalle1Med,
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
                    tabIndex:126,
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
                            items:[getPanelCp()],
                            buttons:[
                            {
                                text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorCp');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        enviaValores([Ext.getCmp('idComboEstadoCln'),Ext.getCmp('idComboDelCln'),Ext.getCmp('idComboColCln'),Ext.getCmp('idComboCpCln')],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpCliente'));
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
                id:"idComboCpCln",
                etiqueta:"Código Postal",
                allowBlank:false,
                name:"cdrCp",
                tabIndex:129,
                value:cpMed,
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
    });

    
    var fieldSetDatosContacto=new Ext.form.FieldSet({
        id:"idFieldSetDatosContacto",
        xtype:"fieldset",
        title:"Datos Del Contacto (Opcional)",
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
                id:"idComboTipoContacto",
                etiqueta:"Tipo Contacto",
                name:"cdrTipoContacto",
                tabIndex:132,
                prm:{
                    campo:'tipContac',
                    idCampo:'idTipContac',
                    //tabIndex:128,
                    bnd:5,
                    qry:15,
                    autoCarga:true
                },
                width:100
            }),{
                xtype:"textfield",
                fieldLabel:"Calle",
                width:176,
                tabIndex:136,
                name:"cdrCalleContacto",
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
                xtype:"textfield",
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
                id:"idComboEstadoCnt",
                etiqueta:"Estado",
                name:"cdrEstadoContacto",
                tabIndex:144,
                prm:{
                    campo:'edo',
                    idCampo:'idEdo',
                    bnd:1,
                    qry:1,
                    autoCarga:true
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var dm = Ext.getCmp('idComboDelCnt');
                        accionCmbUbicacion(dm,['idComboDelCnt','idComboColCnt','idComboCpCnt'],{
                            edo:cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:"idComboHoraDeCnt",
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
                fieldLabel:"Nombre",
                name:"cdrNombreContacto",
                tabIndex:133,
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
                xtype:"textfield",
                fieldLabel:"Num. Exterior",
                name:"cdrNumExtContacto",
                maxLength:150,
                minLength:1,
                tabIndex:137,
                enableKeyEvents:true,
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
                    'keypress':function(txt,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }
                    },
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
                id:"idComboDelCnt",
                etiqueta:"Delg./Mpo.",
                name:"cdrDelegacionMunicipioContacto",
                tabIndex:145,
                prm:{
                    campo:'dm',
                    idCampo:'idDM',
                    bnd:1,
                    qry:2,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoCnt');
                        var cl = Ext.getCmp('idComboColCnt');
                        accionCmbUbicacion(cl,['idComboColCnt','idComboCpCnt'],{
                            'edo':edo.getRawValue(),
                            'dm':cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:"idComboHoraACnt",
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
                fieldLabel:"Apellido Paterno",
                tabIndex:134,
                name:"cdrApellidoPatContacto",
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
                xtype:"textfield",
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
                    'keypress':function(txt,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }
                    },
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
                id:"idComboColCnt",
                etiqueta:"Colonia",
                name:"cdrColoniaContacto",
                tabIndex:146,
                prm:{
                    campo:'cl',
                    idCampo:'idCl',
                    bnd:1,
                    qry:3,
                    autoCarga:false
                },
                evt:{
                    'select':function(cmb,rec,idx){
                        var edo = Ext.getCmp('idComboEstadoCnt');
                        var dm = Ext.getCmp('idComboDelCnt');
                        var cp = Ext.getCmp('idComboCpCnt');
                        accionCmbUbicacion(cp,["idComboCpCnt"],{
                            'edo':edo.getRawValue(),
                            'dm':dm.getRawValue(),
                            'cl':cmb.getRawValue()
                        }, true)
                    }
                }
            }),
            new com.punto.pen.ComboBox({
                id:"idTipoTelContacto",
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
                fieldLabel:"Apellido Materno",
                tabIndex:135,
                name:"cdrApellidoMatContacto",
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
                xtype:"textfield",
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
                            items:[getPanelCpCnt()],
                            buttons:[
                            {
                                text:'Aceptar',
                                handler:function(){
                                    var grd = Ext.getCmp('gridBuscadorCp');
                                    var record = grd.getSelectionModel().getSelected();
                                    if(record!=null){
                                        enviaValores([Ext.getCmp('idComboEstadoCnt'),Ext.getCmp('idComboDelCnt'),Ext.getCmp('idComboColCnt'),Ext.getCmp('idComboCpCnt')],[record.get('estado'),record.get('delmnpo'),record.get('colonia'),record.get('codigoPostal')],Ext.getCmp('idWndCpContacto'));
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
                id:"idComboCpCnt",
                etiqueta:"Codigo Postal",
                name:"cdrCpContacto",
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
                        id:"idLadaContacto",
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
                                var tel = Ext.getCmp("idTelContacto");
                                var lada = Ext.getCmp("idLadaContacto");

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
                        id:'idTelContacto',
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
                                var tel = Ext.getCmp("idTelContacto");
                                var lada = Ext.getCmp("idLadaContacto");

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
    var fieldSetOtros= new Ext.form.FieldSet({
        title:"Otros",
        autoHeight:true,
        width:this.anchos,
        layout:"column",
        items:[
        {
            xtype:"panel",
            columnWidth:0.2,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            new com.punto.pen.ComboBox({
                id:"idComboQuienLlamo",
                etiqueta:"¿Quién Llamó?",
                allowBlank:false,
                name:"clnQuienllamo",
                tabIndex:153,
                prm:{
                    campo:'tipQnLl',
                    idCampo:'idTipQnLl',
                    bnd:5,
                    qry:15,
                    autoCarga:true
                },
                width:110
            })]
        },{
            xtype:"panel",
            columnWidth:0.2,
            layout:"form",
            border:false,
            frame:false,
            labelAlign:"top",
            bodyStyle:"padding:5px",
            items:[
            new com.punto.pen.ComboBox({
                id:"idComboComoEntero",
                etiqueta:"¿Como se enteró?",
                allowBlank:false,
                name:"clnComoEntero",
                tabIndex:154,
                prm:{
                    campo:'tipComoEnt',
                    idCampo:'idComoEnt',
                    bnd:5,
                    qry:97,
                    autoCarga:true
                },
                evt:{
                    select:function(cmb,rec,idx){
                        if(cmb.getValue() == 424){
                            Ext.Msg.prompt('Numero de empleado', 'Escriba numero de empleado', function(btn, text){
                                if (btn == 'ok'){
                                    if(text == ""){
                                        cmb.setRawValue("");
                                        Ext.getCmp("idLabelNoEmpleado").setText("");
                                        Ext.getCmp("idHidenNoEmpleado").setValue("");
                                    }else{
                                        Ext.getCmp("idLabelNoEmpleado").setText("Empleado: " + text);
                                        Ext.getCmp("idHidenNoEmpleado").setValue(text);
                                    }
                                }
                                if (btn == 'cancel'){
                                    cmb.setRawValue("");
                                    Ext.getCmp("idLabelNoEmpleado").setText("");
                                    Ext.getCmp("idHidenNoEmpleado").setValue("");
                                }
                            });
                        }else{
                            Ext.getCmp("idLabelNoEmpleado").setText("");
                            Ext.getCmp("idHidenNoEmpleado").setValue("");
                        }
                    }
                },
                width:145
            }),{
                xtype:"label",
                name:"nameLabelNoEmpleado",
                id:"idLabelNoEmpleado",
                text:""
            },{
                xtype:"hidden",
                name:"nameHidenNoEmpleado",
                id:"idHidenNoEmpleado",
                value:""
            }]
        }
        ]
    });
    var fsAsigProd = new Ext.form.FieldSet({
        layout:"form",
        title:'Asignar Productos al Cliente',
        border:true,
        id:'idSetAsignarProducto',
        width:this.anchos,
        frame:false,
        labelAlign:"top",
        bodyStyle:"padding:5px",
        autoHeight:true,
        items:[
        new Ext.Panel({
            layout:'column',
            border:false,
            frame:false,
            region:"center",
            labelAling:'top',
            items:[
            {
                xtype:'panel',
                layout:'form',
                region:"center",
                border:false,
                frame:false,
                columnWidth:.45,
                items:[{
                    html:'&nbsp;',
                    border:false
                }]
            },
            {
                xtype:'panel',
                layout:'form',
                region:"center",
                id:"idPanelBtnAgregar",
                border:false,
                frame:false,
                columnWidth:.1,
                items:[{
                    xtype:'button',
                    text:' + ',
                    region:"center",
                    tabIndex:118,
                    handler:asignarMasProductos
                }]
            },{
                xtype:'panel',
                layout:'form',
                id:"idPanelBtnQuitar",
                border:false,
                frame:false,
                columnWidth:.1,
                items:[{
                    xtype:'button',
                    text:' - ',
                    tabIndex:119,
                    handler:quitarAsigProd
                }]
            }]
        }),
        new Ext.Panel({
            layout:'column',
            border:false,
            frame:false,
            labelAling:'top',
            items:[{
                xtype:"panel",
                columnWidth:0.13,
                layout:"form",
                id:"idPanelCmbFamilia",
                border:false,
                frame:false,
                bodyStyle:"padding:5px",
                items:[
                new com.punto.pen.ComboBox({
                    id          : 'idFamilia_0',
                    etiqueta    : 'Producto',
                    allowBlank  : true,
                    name        : 'cdrFamilia_0',
                    hiddenName  : 'cdrFamilia_0',
                    width       : 120,
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 5,
                        qry: 17,
                        autoCarga: true
                    },
                    tabIndex:114,
                    evt:{
                        'select':function(cmb,rec,idx){
                            var dm =Ext.getCmp('idProducto_0');
                            accionCmbUbicacion(dm,['idProducto_0'],{
                                prd:cmb.getValue()
                            }, true);
                            
                            if(Ext.getCmp('idFamilia_0').getValue()==79){
                                Ext.getCmp('idBtnAsignarMedico').disable();
                                Ext.getCmp('idMedicoHd_0').setValue('96991');
                                Ext.getCmp('idNomMedico_0').setValue('Medico Renagel');
                            }else{
                                Ext.getCmp('idBtnAsignarMedico').enable();
                                Ext.getCmp('idMedicoHd_0').setValue('0');
                                Ext.getCmp('idNomMedico_0').setValue('');                                
                            }
                        }
                    }
                })]
            },{
                xtype:"panel",
                columnWidth:0.2,
                layout:"form",
                id:"idPanelCmbProducto",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[
                new com.punto.pen.ComboBox({
                    id          : 'idProducto_0',
                    etiqueta    : 'Presentación',
                    allowBlank  : true,
                    name        : 'cdrProducto_0',
                    hiddenName  : 'cdrProducto_0',
                    tabIndex    :115,
                    width       : 190,
                    prm         : {
                        campo: 'prs',
                        idCampo: 'idPrs',
                        bnd: 8,
                        qry: 18,
                        autoCarga: false
                    }
                })]
            },
            {
                xtype:"panel",
                columnWidth:0.12,
                layout:"form",
                id:"idPanelCmbTiempo",
                border:false,
                frame:false,
                bodyStyle:"padding:5px",
                items:[
                new com.punto.pen.ComboBox({
                    id          : 'idDuracion_0',
                    etiqueta    : 'Tiempo',
                    allowBlank  : true,
                    name        : 'cdrDuracion_0',
                    hiddenName  : 'cdrDuracion_0',
                    width       : 110,
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 5,
                        qry: 121,
                        autoCarga: true
                    }
                })]
            },
            {
                xtype:"panel",
                columnWidth:0.18,
                layout:"form",
                id:'idPanelMostrarMedico',
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"hidden",
                    name:"hidenMedico_0",
                    id:'idMedicoHd_0',
                    value:"0"
                },
                {
                    xtype:"textfield",
                    fieldLabel:"Médico",
                    width:175,
                    name:"clnMedico_0",
                    id:'idNomMedico_0',
                    tabIndex:116,
                    allowBlank:true,
                    readOnly:true
                }]
            },{
                xtype:"panel",
                columnWidth:0.1,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[
                {
                    xtype:'panel',
                    layout:'form',
                    border:false,
                    frame:false,
                    items:[{
                        xtype:"button",
                        id:'idBtnAsignarMedico',
                        text:"Asignar Médico",
                        tabIndex:117,
                        handler:function(){
                            var formBus = new com.punto.pen.PanelBuscadorMedico({
                                id:'pnlBuscadorMedico'
                            });
                            var wnd = new Ext.Window({
                                id:'idPanelBuscarMedico',
                                width:1000,
                                height:500,
                                constrainHeader :true,
                                constrain :true,
                                resizable : false,
                                modal:true,
                                border:false,
                                autoScroll:true,
                                items:[
                                formBus
                                ],
                                buttons:[

                                {
                                    text:'Aceptar',
                                    handler:function(){
                                        var grd = Ext.getCmp('gridBuscadorMedico');
                                        var record = grd.getSelectionModel().getSelected();
                                        if(record!=null){
                                            enviaValores([Ext.getCmp('idNomMedico_0'),
                                                Ext.getCmp('idMedicoHd_0')],
                                                [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                                record.get('idMedico')],
                                                Ext.getCmp('idPanelBuscarMedico'));
                                        }else{
                                            Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Médico.");
                                        }
                                    }
                                },{
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
                }]
            },
            {
                xtype:"panel",
                columnWidth:0.18,
                layout:"form",
                id:'idPanelMostrarFV',
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[{
                    xtype:"hidden",
                    name:"idFV_0",
                    id:'idHdFV_0',
                    value:"0"
                },
                {
                    xtype:"textfield",
                    fieldLabel:"Fuerza de Venta",
                    width:175,
                    name:"nombreFV_0",
                    id:'nmFV_0',
                    tabIndex:116,
                    allowBlank:true,
                    readOnly:true
                }]
            },{
                xtype:"panel",
                columnWidth:0.09,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[
                {
                    xtype:'panel',
                    layout:'form',
                    border:false,
                    frame:false,
                    items:[{
                        xtype:"button",
                        id:'idBtnAsignarFV',
                        text:"Asignar FV",
                        tabIndex:117,
                        handler:function(){
                            var formBus = new com.punto.pen.PanelBuscadorFuerzaVenta({
                                id:'pnlBuscadorFV'
                            });
                            var wnd = new Ext.Window({
                                id:'idPanelBuscarFV',
                                width:1000,
                                height:500,
                                constrainHeader :true,
                                constrain :true,
                                resizable : false,
                                modal:true,
                                border:false,
                                autoScroll:true,
                                items:[
                                formBus
                                ],
                                buttons:[{
                                    text:'Aceptar',
                                    handler:function(){
                                        var grd = Ext.getCmp('gridBuscadorFv');
                                        var record = grd.getSelectionModel().getSelected();
                                        if(record!=null){
                                            enviaValores([Ext.getCmp('nmFV_0'),
                                                Ext.getCmp('idHdFV_0')],
                                                [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                                record.get('idFV')],
                                                wnd);
                                        }else{
                                            Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Reperesentante de F.V.");
                                        }
                                    }
                                },{
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
                }]
            }]
        })]
    });
    var panelNotas = new Ext.Panel({
        xtype:"panel",
        layout:"column",
        border:false,
        items:[{
            xtype:"panel",
            layout:"form",
            labelAlign:"top",
            columnWidth:0.5,
            border:false,
            items:[{
                xtype:"textarea",
                name:"btcObservaciones",
                fieldLabel:"Observaciones",
                width:370,
                tabIndex:155,
                height:60,
                allowBlank:obsTF,
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                listeners: {
                    blur:function(el){
                        el.setValue(el.getValue().trim())
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
        },{
            xtype:"panel",
            layout:"form",
            labelAlign:"top",
            columnWidth:0.5,
            border:false,
            style:"bgcolor:#CC0033; background-color:#CC0033;",
            items:[
            {
                xtype:'label',
                text:'Nota Importante:',
                style:'font-size:12px;',
                height:40
            },{
                xtype:"panel",
                //tabIndex:156,
                height:63,
                width:408,
                html:'<textarea tabindex="156" name="clnNotaRoja" id="idclnNotaRoja"  style="background-color:#D80000; color:#FFFFFF; font-weight:bold; width:400px; height:60px; text-transform: uppercase;" />',
                enableKeyEvents:true,
                listeners: {
                    'keypress':
                    function(txtField,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                        }
                    },
                    blur:function(el){
                        el.setValue(el.getValue().trim())
                    },
                    'keyup' : function(elem, e){
                        elem.setValue(elem.getValue().toUpperCase());
                    }
                    
                }
            }]
        }]
    });
    
    var panelRegPaciente= new Ext.FormPanel({
        id: idPnl,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        url: url,
        height:this.alto,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        hideParent:true,
        border:false,
        items:[]
    });
    
    this.crearFichaClienteUpdate = function(tipo){
        panelRegPaciente.add(panelAutorizacion);
        panelRegPaciente.add(panelTipoCliente);
        panelRegPaciente.add(fieldSetDatosGrlPac);
        panelRegPaciente.add(fieldSetDireccionPac);
        panelRegPaciente.add(fieldSetDatosContacto);
        panelRegPaciente.add(fieldSetOtros);
        panelRegPaciente.add(fsAsigProd);
        if(tipo==1){                   
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSet3();
        }
        if(tipo==2){
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSetUpdate(true, false);
        }
        if(tipo==3){
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSet2(true, false);
        }
        Ext.getCmp("idVerificarCliente").setVisible(false);
        panelRegPaciente.add(panelNotas);
        panelRegPaciente.doLayout();
        return panelRegPaciente;
    }
    
    this.crearFichaCliente = function(tipo){
        panelRegPaciente.add(panelAutorizacion);
        panelRegPaciente.add(panelTipoCliente);
        panelRegPaciente.add(fieldSetDatosGrlPac);
        panelRegPaciente.add(fieldSetDireccionPac);
        panelRegPaciente.add(fieldSetDatosContacto);
        panelRegPaciente.add(fieldSetOtros);
        panelRegPaciente.add(fsAsigProd);
        if(tipo==1){                   
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSet3();
        }
        if(tipo==2){
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSet(true, false);
        }
        if(tipo==3){
            Ext.getCmp('idComboTipoCliente').hideTrigger=true;
            Ext.getCmp('idComboTipoCliente').readOnly=true;
            ocultaFieldSet2(true, false);
        }
        Ext.getCmp("idVerificarCliente").setVisible(false);
        panelRegPaciente.add(panelNotas);
        panelRegPaciente.doLayout();
        return panelRegPaciente;
    }
    this.crearFichaNuevoCliente = function(){
        panelRegPaciente.add(panelAutorizacion);
        panelRegPaciente.add(panelTipoCliente);
        panelRegPaciente.add(fieldSetDatosGrlPac);
        panelRegPaciente.add(fsAsigProd);
        panelRegPaciente.add(fieldSetDireccionPac);
        panelRegPaciente.add(fieldSetDatosContacto);
        panelRegPaciente.add(fieldSetOtros);
        panelRegPaciente.add(panelNotas);
        panelRegPaciente.doLayout();
        return panelRegPaciente;
    }
    this.returnFieldsetDireccion = function(){
        return fieldSetDireccionPac;
    }


    function agregarNotasLoad(){

        var panelNotas2 = new Ext.Panel({
            xtype:"panel",
            layout:"column",
            border:false,
            items:[{
                xtype:"panel",
                layout:"form",
                labelAlign:"top",
                columnWidth:0.5,
                border:false,
                items:[{
                    xtype:"textarea",
                    name:"btcObservaciones",
                    fieldLabel:"Observaciones",
                    width:370,
                    tabIndex:153,
                    height:60,
                    allowBlank:obsTF,
                    style:'text-transform: uppercase;',
                    enableKeyEvents:true,
                    listeners: {
                        blur:function(el){
                            el.setValue(el.getValue().trim())
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
            },{
                xtype:"panel",
                layout:"form",
                labelAlign:"top",
                columnWidth:0.5,
                border:false,
                style:"bgcolor:#CC0033; background-color:#CC0033; color:#FFFFFF;",
                items:[
                {
                    xtype:'label',
                    text:'Nota Importante:',
                    style:'font-size:12px;',
                    height:40
                },{
                    xtype:"panel",
                    tabIndex:154,
                    height:63,
                    width:408,
                    border:false,
                    //                    autoLoad:{
                    //                        url:contexto+'/Cliente',params:{bnd:15,'idCnt':idCnt}
                    //                    },
                    listeners: {
                        blur:function(el){
                            el.setValue(el.getValue().trim())
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
        });

        return panelRegPaciente.add(panelNotas2);
        
    }

    function desabilitacombo(){
        Ext.getCmp('idComboTipoCliente').hideTrigger=true;
        Ext.getCmp('idComboTipoCliente').readOnly=true;
    }

    /************************************************************************METODOS DEL OBJETOO**************************************************************************/
	
    /*---------------------------------------------------------------FUNCIONES DE AGREGAR MAS MEDICAMENTOS----------------------------------------------------------*/
    function quitarAsigProd(){
        var obFldSetAsigProf=Ext.getCmp('idSetAsignarProducto');
        obFldSetAsigProf.remove('idPanelAsignProd_'+contAsingProd,true);
        if(contAsingProd!=0){            
            contAsingProd--;
        }
    }
    
    function quitarAsigProdGeneral(){
        var obFldSetAsigProf=Ext.getCmp('idSetAsignarProducto');
        for(i=contAsingProd;i>0;i--){
            obFldSetAsigProf.remove('idPanelAsignProd_'+i,true);
            contAsingProd=i;
        }
    }

    function asignarMasProductos(){
        if(contAsingProd<4 && Ext.getCmp('idFamilia_0').isValid() &&Ext.getCmp('idProducto_0').isValid() && Ext.getCmp('idNomMedico_0').isValid() && Ext.getCmp('idNomMedico_0').getValue()!="" && Ext.getCmp('nmFV_0').isValid() && Ext.getCmp('nmFV_0').getValue()!=""){
            contAsingProd++;

            var obFldSetAsigProf=Ext.getCmp('idSetAsignarProducto');
            obFldSetAsigProf.add(
                new Ext.Panel({
                    layout:'column',
                    border:false,
                    id:'idPanelAsignProd_'+contAsingProd,
                    frame:false,
                    labelAling:'top',
                    items:[{
                        xtype:"panel",
                        columnWidth:0.13,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[
                        new com.punto.pen.ComboBox({
                            id          : 'idFamilia_'+contAsingProd,
                            etiqueta    : 'Producto',
                            allowBlank  : true,
                            name        : 'cdrFamilia_'+contAsingProd,
                            hiddenName  : 'cdrFamilia_'+contAsingProd,
                            width       : 120,
                            prm         : {
                                campo: 'prd',
                                idCampo: 'idPrd',
                                bnd: 5,
                                qry: 17,
                                autoCarga: true
                            },
                            evt:{
                                'select':function(cmb,rec,idx){
                                    var dm =Ext.getCmp('idProducto_'+contAsingProd);
                                    accionCmbUbicacion(dm,['idProducto_'+contAsingProd],{
                                        prd:cmb.getValue()
                                    }, true);
                                
                                    if(Ext.getCmp('idFamilia_'+contAsingProd).getValue()==79){
                                        Ext.getCmp('idMedicoHd_'+contAsingProd).setValue('96991');
                                        Ext.getCmp('idNomMedico_'+contAsingProd).setValue('Medico Renagel');
                                    }else{
                                        Ext.getCmp('idMedicoHd_'+contAsingProd).setValue('0');
                                        Ext.getCmp('idNomMedico_'+contAsingProd).setValue('');
                                    }
                                },
                                'focus':function(){
                                    var cmbFamilia=Ext.getCmp('idFamilia_'+contAsingProd);
                                    cmbFamilia.store.remove(cmbFamilia.store.getAt(Ext.getCmp('idFamilia_0').selectedIndex));
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
                        bodyStyle:"padding:5px",
                        items:[
                        new com.punto.pen.ComboBox({
                            id          : 'idProducto_'+contAsingProd,
                            etiqueta    : 'Presentación',
                            allowBlank  : true,
                            name        : 'cdrProducto_'+contAsingProd,
                            hiddenName  : 'cdrProducto_'+contAsingProd,
                            width       : 190,
                            prm         : {
                                campo: 'prs',
                                idCampo: 'idPrs',
                                bnd: 8,
                                qry: 18,
                                autoCarga: false
                            }
                        })]
                    },
                
                    {
                        xtype:"panel",
                        columnWidth:0.12,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[
                        new com.punto.pen.ComboBox({
                            id          : 'idDuracion_'+contAsingProd,
                            etiqueta    : 'Tiempo',
                            allowBlank  : true,
                            name        : 'cdrDuracion_'+contAsingProd,
                            hiddenName  : 'cdrDuracion_'+contAsingProd,
                            width       : 100,
                            prm         : {
                                campo: 'prs',
                                idCampo: 'idPrs',
                                bnd: 5,
                                qry: 121,
                                autoCarga: true
                            }
                        })
                        ]
                    },
                
                    {
                        xtype:"panel",
                        columnWidth:0.18,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[{
                            xtype:"hidden",
                            name:"hidenMedico_"+contAsingProd,
                            id:'idMedicoHd_'+contAsingProd,
                            value:"0"
                        },
                        {
                            xtype:"textfield",
                            fieldLabel:"Médico",
                            width:175,
                            name:"clnMedico_"+contAsingProd,
                            id:'idNomMedico_'+contAsingProd,
                            allowBlank:false
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.1,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[ {
                            xtype:'panel',
                            layout:'form',
                            border:false,
                            frame:false,
                            items:[{
                                xtype:"button",
                                id:'idBtnAsignarMedico_'+contAsingProd,
                                text:"Asignar Médico",
                                handler:function(){
                                    var formBus = new com.punto.pen.PanelBuscadorMedico({
                                        id:'pnlBuscadorMedico'
                                    });
                                    var wnd = new Ext.Window({
                                        id:'idPanelBuscarMedico',
                                        width:1000,
                                        height:500,
                                        constrainHeader :true,
                                        constrain :true,
                                        resizable : false,
                                        modal:true,
                                        border:false,
                                        autoScroll:true,
                                        items:[
                                        formBus
                                        ],
                                        buttons:[

                                        {
                                            text:'Aceptar',
                                            handler:function(){
                                                var grd = Ext.getCmp('gridBuscadorMedico');
                                                var record = grd.getSelectionModel().getSelected();
                                                if(record!=null){
                                                    enviaValores([Ext.getCmp('idNomMedico_'+contAsingProd),
                                                        Ext.getCmp('idMedicoHd_'+contAsingProd)],
                                                        [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                                        record.get('idMedico')],
                                                        Ext.getCmp('idPanelBuscarMedico'));
                                                }else{
                                                    Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Médico.");
                                                }
                                            }
                                        },{
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
                        }]
                    }
                    ,
                    {
                        xtype:"panel",
                        columnWidth:0.18,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[{
                            xtype:"hidden",
                            name:"idFV_"+contAsingProd,
                            id:'idHdFV_'+contAsingProd,
                            value:"0"
                        },
                        {
                            xtype:"textfield",
                            fieldLabel:"Fuerza de Venta",
                            width:175,
                            name:"nombreFV_"+contAsingProd,
                            id:'nmFV_'+contAsingProd,
                            tabIndex:116,
                            allowBlank:true,
                            readOnly:true
                        }]
                    },{
                        xtype:"panel",
                        columnWidth:0.09,
                        layout:"form",
                        border:false,
                        frame:false,
                        labelAlign:"top",
                        bodyStyle:"padding:5px",
                        items:[
                        {
                            xtype:'panel',
                            layout:'form',
                            border:false,
                            frame:false,
                            items:[{
                                xtype:"button",
                                id:'idBtnAsignarFV',
                                text:"Asignar FV",
                                tabIndex:117,
                                handler:function(){
                                    var formBus = new com.punto.pen.PanelBuscadorFuerzaVenta({
                                        id:'pnlBuscadorFV'
                                    });
                                    var wnd = new Ext.Window({
                                        id:'idPanelBuscarFV',
                                        width:1000,
                                        height:500,
                                        constrainHeader :true,
                                        constrain :true,
                                        resizable : false,
                                        modal:true,
                                        border:false,
                                        autoScroll:true,
                                        items:[
                                        formBus
                                        ],
                                        buttons:[{
                                            text:'Aceptar',
                                            handler:function(){
                                                var grd = Ext.getCmp('gridBuscadorFv');
                                                var record = grd.getSelectionModel().getSelected();
                                                if(record!=null){
                                                    enviaValores([Ext.getCmp('nmFV_'+contAsingProd),
                                                        Ext.getCmp('idHdFV_'+contAsingProd)],
                                                        [record.get('apaterno')+" "+record.get('amaterno')+" "+record.get('nombre'),
                                                        record.get('idFV')],
                                                        wnd);
                                                }else{
                                                    Ext.MessageBox.alert('Mensaje de Error', "Debe seleccionar a un Reperesentante de F.V.");
                                                }
                                            }
                                        },{
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
                        }]
                    }        
                    ]
                }));

            obFldSetAsigProf.doLayout();

            Ext.getCmp('idNomMedico_'+contAsingProd).setValue(Ext.getCmp('idNomMedico_0').getValue());
            Ext.getCmp('idMedicoHd_'+contAsingProd).setValue(Ext.getCmp('idMedicoHd_0').getValue());
            Ext.getCmp('nmFV_'+contAsingProd).setValue(Ext.getCmp('nmFV_0').getValue());
            Ext.getCmp('idHdFV_'+contAsingProd).setValue(Ext.getCmp('idHdFV_0').getValue());
        }


    }
    /*---------------------------------------------------funciones para pantalla para generar Lada-------------------------------------------------------------*/
    function getFieldSetGeneraLada(){
        var fieldSetGeneraLada={
            xtype:"fieldset",
            title:"Generar lada",
            autoHeight:true,
            layout:"column",
            collapsed:false,
            items:[{
                xtype:"panel",
                columnWidth:1,
                layout:"form",
                border:false,
                frame:false,
                labelAlign:"top",
                bodyStyle:"padding:5px",
                items:[new com.punto.pen.ComboBox({
                    id:"idComboEstadoLada",
                    etiqueta:"Estado",
                    allowBlank:false,
                    name:"cdrLadaEstado",
                    tabIndex:124,
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
                    tabIndex:125,
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
                            xtype:"textfield",
                            fieldLabel:"Telefono",
                            id:"idTelefonoGenerado",
                            width:80,
                            maxLength:12,
                            minLength:7,
                            autoCreate:{
                                tag:"input",
                                type:"text",
                                autocomplete:"off",
                                maxlength:12,
                                minlength:7,
                                name:"clnTelefono"
                            },
                            enableKeyEvents:true
                        }]
                    }]
                }]
            }]
        }
        return fieldSetGeneraLada;
    }
    function getPanelLada(){
        var panelLada = new Ext.FormPanel({
            id:'idPanelLada',
            bodyStyle: "padding:5px 5px 0",
            height: 212,
            items:[getFieldSetGeneraLada()]
        });
        return panelLada;
    }
	
    function getPanelCp(){
        return (new com.punto.pen.codPostal());
    }
    function getPanelCpCnt(){
        return new com.punto.pen.codPostal();
    }
    function ocultaFieldSet(requerido, visible){
        Ext.getCmp("idComboQuienLlamo").allowBlank=requerido;
        Ext.getCmp("idComboComoEntero").allowBlank=requerido;
        Ext.getCmp("idFamilia_0").allowBlank=requerido;
        Ext.getCmp("idProducto_0").allowBlank=requerido;
        Ext.getCmp("idDuracion_0").allowBlank=requerido;
        Ext.getCmp("idNomMedico_0").allowBlank=requerido;
        Ext.getCmp("idCallePac").allowBlank=requerido;
        Ext.getCmp("idComboEstadoCln").allowBlank=requerido;
        Ext.getCmp("idComboDelCln").allowBlank=requerido;
        Ext.getCmp("idComboColCln").allowBlank=requerido;
        Ext.getCmp("idComboCpCln").allowBlank=requerido;
        
        Ext.getCmp("idFamilia_0").setValue("");
        Ext.getCmp("idProducto_0").setValue("");
        Ext.getCmp("idDuracion_0").setValue("");
        Ext.getCmp("idNomMedico_0").setValue("");

        resetPaneles(fsAsigProd.getId());
        resetPaneles(fieldSetDatosContacto.getId());
        resetPaneles(fieldSetOtros.getId());
        if(visible){
            fsAsigProd.setTitle("Asignar productos al Cliente");
        }else{
            fsAsigProd.setTitle("Asignar productos al Prospecto");
        }
        Ext.getCmp("idBtnAsignarMedico").setVisible(true);
        Ext.getCmp("idPanelMostrarMedico").setVisible(true);
        fieldSetDireccionPac.setVisible(true);
        fsAsigProd.setVisible(true);

        Ext.getCmp("idPanelCmbFamilia").setVisible(true);
        Ext.getCmp("idPanelCmbTiempo").setVisible(visible);
        Ext.getCmp("idPanelCmbProducto").setVisible(visible);
        Ext.getCmp("idPanelBtnAgregar").setVisible(visible);
        Ext.getCmp("idPanelBtnQuitar").setVisible(visible);
        fieldSetDatosContacto.setVisible(visible);
        fieldSetOtros.setVisible(visible);
    }
    
    
    function ocultaFieldSetUpdate(requerido, visible){
        Ext.getCmp("idComboQuienLlamo").allowBlank=requerido;
        Ext.getCmp("idComboComoEntero").allowBlank=requerido;
        Ext.getCmp("idFamilia_0").allowBlank=requerido;
        Ext.getCmp("idProducto_0").allowBlank=requerido;
        Ext.getCmp("idDuracion_0").allowBlank=requerido;
        Ext.getCmp("idNomMedico_0").allowBlank=requerido;
        Ext.getCmp("idCallePac").allowBlank=requerido;
        Ext.getCmp("idComboEstadoCln").allowBlank=requerido;
        Ext.getCmp("idComboDelCln").allowBlank=requerido;
        Ext.getCmp("idComboColCln").allowBlank=requerido;
        Ext.getCmp("idComboCpCln").allowBlank=requerido;
        
        Ext.getCmp("idFamilia_0").setValue("");
        Ext.getCmp("idProducto_0").setValue("");
        Ext.getCmp("idDuracion_0").setValue("");
        Ext.getCmp("idNomMedico_0").setValue("");

        resetPaneles(fsAsigProd.getId());
        resetPaneles(fieldSetDatosContacto.getId());
        resetPaneles(fieldSetOtros.getId());
        if(visible){
            fsAsigProd.setTitle("Asignar productos al Cliente");
        }else{
            fsAsigProd.setTitle("Asignar productos al Prospecto");
        }
        Ext.getCmp("idBtnAsignarMedico").setVisible(visible);
        Ext.getCmp("idPanelMostrarMedico").setVisible(visible);
        fieldSetDireccionPac.setVisible(true);

        Ext.getCmp("idPanelCmbFamilia").setVisible(visible);
        Ext.getCmp("idPanelCmbTiempo").setVisible(visible);
        Ext.getCmp("idPanelCmbProducto").setVisible(visible);
        Ext.getCmp("idPanelBtnAgregar").setVisible(visible);
        Ext.getCmp("idPanelBtnQuitar").setVisible(visible);
        fieldSetDatosContacto.setVisible(false);        
        fsAsigProd.setVisible(visible);
        fieldSetOtros.setVisible(true);
    }

    function ocultaFieldSet2(requerido, visible){
        Ext.getCmp("idComboQuienLlamo").allowBlank=requerido;
        Ext.getCmp("idComboComoEntero").allowBlank=requerido;
        Ext.getCmp("idFamilia_0").allowBlank=requerido;
        Ext.getCmp("idProducto_0").allowBlank=requerido;
        Ext.getCmp("idDuracion_0").allowBlank=requerido;
        Ext.getCmp("idNomMedico_0").allowBlank=requerido;
        Ext.getCmp("idCallePac").allowBlank=requerido;
        Ext.getCmp("idComboEstadoCln").allowBlank=requerido;
        Ext.getCmp("idComboDelCln").allowBlank=requerido;
        Ext.getCmp("idComboColCln").allowBlank=requerido;
        Ext.getCmp("idComboCpCln").allowBlank=requerido;
        
        Ext.getCmp("idFieldSerDireccionPac").setVisible(visible);
        Ext.getCmp("idSetAsignarProducto").setVisible(visible);
        
        Ext.getCmp("idPanelCmbFamilia").setVisible(visible);
        Ext.getCmp("idPanelCmbTiempo").setVisible(visible);
        Ext.getCmp("idPanelCmbProducto").setVisible(visible);
        Ext.getCmp("idPanelBtnAgregar").setVisible(visible);
        Ext.getCmp("idPanelBtnQuitar").setVisible(visible);
        fieldSetDatosContacto.setVisible(visible);
        fieldSetOtros.setVisible(visible);
    }
    function ocultaFieldSet3(){
        resetPaneles(fsAsigProd.getId());
        fsAsigProd.setVisible(false);
    }
    function opcionContacto(){
        resetPaneles(fieldSetDireccionPac.getId());
        resetPaneles(fsAsigProd.getId());
        resetPaneles(fieldSetDatosContacto.getId());
        resetPaneles(fieldSetOtros.getId());
        Ext.getCmp("idFamilia_0").allowBlank=true;
        Ext.getCmp("idProducto_0").allowBlank=true;
        Ext.getCmp("idNomMedico_0").allowBlank=true;
        Ext.getCmp("idDuracion_0").allowBlank=true;
        Ext.getCmp("idCallePac").allowBlank=true;
        Ext.getCmp("idComboEstadoCln").allowBlank=true;
        Ext.getCmp("idComboDelCln").allowBlank=true;
        Ext.getCmp("idComboColCln").allowBlank=true;
        Ext.getCmp("idComboCpCln").allowBlank=true;
        Ext.getCmp("idComboQuienLlamo").allowBlank=true;
        Ext.getCmp("idComboComoEntero").allowBlank=true;
       
        Ext.getCmp("idPanelCmbFamilia").setVisible(true);
        Ext.getCmp("idPanelCmbTiempo").setVisible(false);
        Ext.getCmp("idBtnAsignarMedico").setVisible(false);
        Ext.getCmp("idPanelMostrarMedico").setVisible(false);

        Ext.getCmp("idPanelCmbProducto").setVisible(false);
        Ext.getCmp("idPanelBtnAgregar").setVisible(false);
        Ext.getCmp("idPanelBtnQuitar").setVisible(false);
        fieldSetDireccionPac.setVisible(false);
        fsAsigProd.setVisible(true);
        fieldSetDatosContacto.setVisible(false);
        fieldSetOtros.setVisible(false);
    }

    function ocultaTipoClienteSet(){
        Ext.getCmp("idComboTipoCliente").setVisible(false);
        Ext.getCmp("idComboTipoCliente").allowBlank=false;
        Ext.getCmp("idComboTipoCliente").hideLabel=true;
    }
    function resetPaneles(idCmp){
        var cmp = Ext.getCmp(idCmp);
        for(i = 0; i<cmp.items.length;i++){
            var cm = cmp.getComponent(i);
            if(cm.getXType()=='textfield'){
                cm.reset();
            }
            if(cm.getXType()=='textarea'){
                cm.reset();
            }
            if(cm.getXType()=='combobox'){
                cm.reset();
            }
            if(cm.getXType()=='radiobutton'){
                cm.reset();
            }
            if(cm.getXType()=='checkbox'){
                cm.reset();
            }
            if(cm.getXType()=='panel'){
                for(j = 0; j<cm.items.length;j++){
                    var subCm = cm.getComponent(j);
                    if(subCm.getXType()=='textfield'){
                        subCm.reset();
                    }
                    if(subCm.getXType()=='textarea'){
                        subCm.reset();
                    }
                    if(subCm.getXType()=='combobox'){
                        subCm.reset();
                    }
                    if(subCm.getXType()=='radiobutton'){
                        subCm.reset();
                    }
                    if(subCm.getXType()=='checkbox'){
                        subCm.reset();
                    }
                    if(subCm.getXType()=='panel'){
                        for(k = 0; k<subCm.items.length;k++){
                            var subSubCm = subCm.getComponent(k);
                            if(subSubCm.getXType()=='textfield'){
                                subSubCm.reset();
                            }
                            if(subSubCm.getXType()=='textarea'){
                                subSubCm.reset();
                            }
                            if(subSubCm.getXType()=='combobox'){
                                subSubCm.reset();
                            }
                            if(subSubCm.getXType()=='radiobutton'){
                                subSubCm.reset();
                            }
                            if(subSubCm.getXType()=='checkbox'){
                                subSubCm.reset();
                            }

                        }
                    }
                }
            }
         
            
        }
    }
    function deshabilitarPanel(idCmp, habilitar){
        var cmp = Ext.getCmp(idCmp);
        for(i = 0; i<cmp.items.length;i++){
            var cm = cmp.getComponent(i);
            if(cmp.getXType()=='panel'){
                if(cm.getXType()=='textfield'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='textarea'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='combobox'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='radiobutton'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='checkbox'){
                    cm.setValue.setDisabled(habilitar);
                }
            }
            if(cmp.getXType()=='fieldset'){
                if(cm.getXType()=='textfield'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='textarea'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='combobox'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='radiobutton'){
                    cm.setValue.setDisabled(habilitar);
                }
                if(cm.getXType()=='checkbox'){
                    cm.setValue.setDisabled(habilitar);
                }
            }
        }
    }
}
function RelacionDuplicados(nombre,apaterno,amaterno,fechaNac){
    var verDup;

    var storeBuscadorDuplicados = new Ext.data.Store({
        autoLoad: false,
        baseParams: {
            bnd:22,
            clnNombre:nombre,
            clnApellidoPaterno:apaterno,
            clnApellidoMaterno:amaterno,
            clnFechaNacimiento:fechaNac.getValue().format('d/m/Y'),
            'tipoEstTall':tipoEstTall
        },
        reader :new Ext.data.JsonReader({
            totalProperty: 'total',
            root :'records',
            idProperty: 'id',
            hayDup:'hayDup'
        },new com.punto.pen.RecordBuscadorTalleresGroup()),
        proxy :new Ext.data.HttpProxy({
            url : contexto+'/Cliente',
            timeout: 300000
        }),
        listeners:{
            load: {
                fn: function(){
                    verDup=this.reader.jsonData.hayDup;
                    if(verDup==1){
                        if(msg!=null){
                            msg.hide();
                        }
                    }else if(verDup==0){
                        if(msg!=null){
                            msg.hide();
                        }
                        Ext.MessageBox.alert('¡¡Alerta!!',"<center>El Cliente no está Registrado.</center>");
                        var wnd = Ext.getCmp('idWndDuplicados');
                        wnd.hide();
                        wnd.close();
                    }
                }
            }
        }
    });

    var pbarBuscarDuplicados = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : storeBuscadorDuplicados,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    var GridDuplicados  = new Ext.grid.GridPanel({
        id              : "idGridDuplicados",
        region          :'center',
        columnWidth     : 0.7,
        height          : 370,
        store           : storeBuscadorDuplicados,
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
        bbar            : pbarBuscarDuplicados,
        columns         : [
        new Ext.grid.RowNumberer(),
        {
            header: "Elegir",
            width: 60,
            sortable: true,
            dataIndex: 'elegir'
        },

        {
            id:'folio',
            header: "Folio",
            width: 60,
            sortable: true,
            dataIndex: 'folio'
        },

        {
            header: "Nombre",
            width: 75,
            sortable: true,
            dataIndex: 'nombre'
        },

        {
            header: "Ap. Paterno",
            width: 75,
            sortable: true,
            dataIndex: 'apaterno'
        },

        {
            header: "Ap. Materno",
            width: 75,
            sortable: true,
            dataIndex: 'amaterno'
        },

        {
            header: "Fecha Nac.",
            width: 85,
            sortable: true,
            dataIndex: 'fecha_nac'
        },

        {
            header: "Fecha Reg.",
            width: 85,
            sortable: true,
            dataIndex: 'fecha_reg'
        },

        {
            header: "Tipo Cliente",
            width: 75,
            sortable: true,
            dataIndex: 'tipo_paciente'
        },

        {
            header: "Estado",
            width: 75,
            sortable: true,
            dataIndex: 'medicamento'
        },

        {
            header: "Municipio",
            width: 75,
            sortable: true,
            dataIndex: 'telefono'
        },

        {
            header: "Activo",
            width: 75,
            sortable: true,
            dataIndex: 'es_activo',
            renderer:function(val){
                var s = "";
                if(val == ""){
                    s = "";
                }else if(val == 1){
                    s = "<b><font color=\"#86B51F\">Activo</font></b>";
                }else if(val == 2){
                    s = "<b><font color=\"#F75828\">Inactivo</font></b>";
                }else if(val == 3){
                    s = "<b><font color=\"#FF9700\">Borrado</font></b>";
                }else if(val == 4){
                    s = "<b><font color=\"#428BDD\">Inactivo SM</font></b>";
                }else if(val == 5){
                    s = "<b><font color=\"#03C\">Inactivo SM</font></b>";
                }
                return s;
            }
        }
        ]
    });


    var grd = Ext.getCmp('idGridDuplicados');
    var store = grd.getStore();

    var wnd = new  Ext.Window({
        id:'idWndDuplicados',
        title:'Posibles Clientes',
        width:1000,
        height:450,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        items:[GridDuplicados]
        ,
        buttons:[{
            text:'Salir',
            handler:function(){
                wnd.close();
            }
        }
        ],
        tools:[{
            id:'close',
            qtip: 'Cerrar',
            handler: function(event, toolEl, panel){
                wnd.close();
            }
        }]
    });
    wnd.show();
    msg = Ext.MessageBox.show({
        msg: 'Procesando la Información, espere por favor...',
        progressText: 'Saving...',
        width:300,
        wait:true,
        waitConfig:{
            interval:200
        }
    });
    store.load({
        params:{
            start:0,
            limit:20
        }
    });
}

function getCntClosePrevios(idCnt,n,ap,am,t){
    var wnd = Ext.getCmp('idWndDuplicados');
    wnd.close();
    var wnd2 = Ext.getCmp('idWndRegistro');
    wnd2.close();
    getCnt(idCnt,n,ap,am,t);
}

function getCambiarWebPacienteClosePrevios(idCnt,n,ap,am,t){
    var wnd = Ext.getCmp('idWndDuplicados');
    wnd.close();
    var wnd2 = Ext.getCmp('idWndRegistro');
    wnd2.close();
    getCambiarWebPaciente(idCnt,n,ap,am,t);
}

function validaEmailNuevos(){
    valEmail=3;
}
function empleadosGdl(qry){
    Ext.getCmp("idComboComoEntero").store = new com.punto.pen.StoreCombo({
        'prm':{
            campo:'tipComoEnt',
            idCampo:'idComoEnt',
            bnd:5,
            qry:qry,
            autoCarga:true
        },
        evt:{}
    });
    Ext.getCmp("idComboComoEntero").setRawValue("");
}



