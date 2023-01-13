Ext.ns("com.punto.pen");

com.punto.pen.PanelNewEncuestaDiabete= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);
    var carga=true;
    var mns;
    Ext.form.Field.prototype.msgTarget = 'side';

    var PaneNewlEncuestaDiabete =  new Ext.Panel({
        id:'idPanelECorp',
        xtype:"panel",
        layout:"form",
        border:false,
        items:[ /*{
                html:"<div align=right><u><a onClick='getHistorialEncuasta(" + idCnt + ")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
                Height:20,
                border:false
            },*/
        {
            xtype:"hidden",
            name:"HidenIdEncuesta",
            value:"0"
        },{
            xtype:"hidden",
            id:"idHidenDispositivo",
            name:"HidenDispositivo",
            value:"0"
        },{
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelP1",
            items:[{
                html:"<span style='text-align: right; color: #36C; font-size:11px;'>Para seleccionar más de un medicamento deje presionada la tecla Ctrl y de clic en los medicamentos.</span>",
                border:false
            },{
                xtype:"multiselect",
                fieldLabel:"1.- ¿Que medicamentos Sanofi le prescribió su médico?",
                id:"idDbP1",
                name:"dbP1",
                allowBlank:false,
                dataFields:["idProd", "Producto"],
                store:new com.punto.pen.StoreCombo({
                    prm:{
                        idCampo:'idProd',
                        campo:'Producto',
                        'bnd':5,
                        qry:46,
                        autoCarga:carga,
                        url:contexto+'/ComboLoader'
                    }
                }),
                valueField:"idProd",
                displayField:"Producto",
                width:250,
                height:130,
                legend:"Seleccione"
            },{
                xtype:"hidden",                        
                name:"hiddenDbP1_b",
                value:""
            }
            ]
        },{
            xtype:"panel",
            id:"idPanelP2",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[{
                html:"<span style='text-align: right; color: #36C; font-size:11px;'>Para seleccionar más de un medicamento deje presionada la tecla Ctrl y de clic en los medicamentos.</span>",
                border:false
            },{
                xtype:"multiselect",
                fieldLabel:"2.- ¿Que otro medicamento toma usted?",
                id:"idDbP2",
                name:"dbP2",
                dataFields:["idProd2", "Producto2"],
                store:new com.punto.pen.StoreCombo({
                    prm:{
                        idCampo:'idProd2',
                        campo:'Producto2',
                        bnd: 5,
                        qry: 124,
                        autoCarga:carga,
                        url:contexto+'/ComboLoader'
                    }
                }),
                valueField:"idProd2",
                displayField:"Producto2",
                width:250,
                height:120,
                legend:"Seleccione"
            },{
                xtype:"hidden",
                name:"hiddenDbP2_b",
                value:""
            }
            ]
        },{
            xtype:"panel",
            id:"idPanelP3",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[                    
            new com.punto.pen.ComboBox({
                id:"idDbP3",
                etiqueta:"3.- ¿Donde le recetaron su medicamento?",
                name:"dbP3",
                allowBlank:false,
                valueField:"idMedRec",
                hiddenName :"HidenDbP3",
                prm:{
                    campo:"MedRec",
                    idCampo:'idMedRec',
                    autoCarga:carga,
                    bnd:5,
                    qry:125
                }
            })
            ]
        },{
            xtype:"panel",
            id:"idPanelP4",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[{
                html:"<span style='text-align: right; color: #36C; font-size:11px;'>Para seleccionar más de un medicamento deje presionada la tecla Ctrl y de clic en los medicamentos.</span>",
                border:false
            },{
                xtype:"multiselect",
                fieldLabel:"4.- ¿Qué medicamento tomaba anteriormente?",
                id:"idDbP4",
                name:"dbP4",
                dataFields:["idProd2", "Producto2"],
                store:new com.punto.pen.StoreCombo({
                    prm:{
                        idCampo:'idProd2',
                        campo:'Producto2',
                        'bnd':10,
                        qry:49,
                        autoCarga:carga,
                        url:contexto+'/ComboLoader'
                    }
                }),
                valueField:"idProd2",
                displayField:"Producto2",
                width:250,
                height:120,
                legend:"Seleccione"
            },{
                xtype:"hidden",
                name:"hiddenDbP4_b",
                value:""
            }
            ]
        }, 
        {
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelP5",
            items:[
            new com.punto.pen.ComboBox({
                id:"idDbP5",
                etiqueta:"5.- ¿Tipo de diabetes?",
                name:"dbP5",
                allowBlank:false,
                valueField:"idTipoD",
                hiddenName :"HidenDbP5",
                prm:{
                    campo:"TipoD",
                    idCampo:'idTipoD',
                    autoCarga:carga,
                    bnd:5,
                    qry:23
                }
            })
            ]
        },
        {
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelP6",
            items:[{
                xtype: 'radiogroup',
                fieldLabel: '6.- ¿Sabe cual es su meta de tratamiento?',
                id:'idDbP6',
                allowBlank:false,
                labelWidth:50,
                columns: 2,
                items: [
                {
                    boxLabel: 'Si', 
                    name:'dbP6',
                    inputValue:true
                },

                {
                    boxLabel: 'No', 
                    name:'dbP6',
                    inputValue:false
                }
                ]
            }
            ]
        },
        {
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelP7",
            items:[{
                xtype: 'radiogroup',
                fieldLabel: '7.- ¿Cuenta con un medidor de glucosa?',
                id:'idDbP7',
                allowBlank:false,
                labelWidth:50,
                columns: 2,
                items: [
                {
                    boxLabel: 'Si', 
                    name:'dbP7',
                    inputValue:true
                },

                {
                    boxLabel: 'No', 
                    name:'dbP7',
                    inputValue:false
                }
                ]
            }
            ]
        },
        {
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelContinuar",
            items:[{
                xtype:"checkbox",
                id:"idCheckContinuar",
                fieldLabel:"Continuar",
                boxLabel:"Si",
                inputValue:true,
                name:"checkContinuar",
                handler:continuarCuestionarioDiabetes
            }]
        },
        {
            html:"<hr>",
            height:20,
            border:false
        },
        {
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            id:"idPanelP8",
            items:[{
                xtype: 'radiogroup',
                fieldLabel: '8.- ¿Es la primera vez que utiliza insulina?',
                id:'idDbP8',
                labelWidth:50,
                columns: 2,
                items: [
                {
                    boxLabel: 'Si', 
                    name:'dbP8',
                    inputValue:true
                },

                {
                    boxLabel: 'No', 
                    name:'dbP8',
                    inputValue:false
                }
                ]
            }
            ]
        }
        ]
    });

    var panelFormEncuestaDiabete= new Ext.form.FormPanel({
        id:'idFormEncuestaDiabetes',
        title:titulo,
        url: url,
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        height: this.alto,
        autoHeight: this.autoAlto,
        monitorValid : true,
        autoScroll: (!this.autoAlto),
        items:[]
    });

    this.crearEncuestaDiabetes = function(){
        panelFormEncuestaDiabete.add(PaneNewlEncuestaDiabete);       
        panelFormEncuestaDiabete.doLayout();        
        Ext.getCmp("idPanelP8").setVisible(false);
        return panelFormEncuestaDiabete;
    }


    function Preg9(num,valor){

        var PanelP9 =  new Ext.Panel({
            id:"idPanelP9",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });
        var inc=0;

        var d = new Array();
        var c = new Array();
        PanelP9.add({
            html:"<span style='font-size:12.3px'>9.- ¿Cuánto tiempo lleva tomando este medicamento?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            c=Texto(d[i]).split(",");
            PanelP9.add(
                new com.punto.pen.ComboBox({
                    id          : "idDbP9_"+c[0],
                    etiqueta    : c[1],
                    allowBlank  : false,
                    name        : "dbP9_a_"+c[0],
                    hiddenName  : "dbP9_"+c[0],
                    width       : 150,
                    valueField:"idPrd",
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 5,
                        qry: 121,
                        autoCarga: true
                    }
                }));
        }
        PanelP9.add(saltoLinea());        
        PanelP9.doLayout();
        return PanelP9;
    }
        
    function Preg10(num,valor){
        var PanelP10 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP10",
            layout:"form",
            labelWidth:580,
            border:false,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP10.add({
            html:"<span style='font-size:12.3px'>10.- ¿Cuántas tabletas le indicó su médico?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg7(d[i]);
            if(valor=="si"){
                c=Texto(d[i]).split(",");
                PanelP10.add({
                    xtype:"numberfield",
                    id:"idDbP10_"+c[0],
                    allowBlank:false,
                    fieldLabel:c[1],
                    name:"dbP10_"+c[0],
                    width:100,
                    maxLength:3,
                    tabIndex:100,
                    autoCreate:{
                        tag:"input",
                        autocomplete:"off",
                        maxlength:3
                    }
                });
            }
        }
        PanelP10.add(saltoLinea());
        PanelP10.doLayout();

        return PanelP10;
    }

    function Preg11(num,valor){
        var PanelP11 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP11",
            border:false,
            layout:"form",
            labelWidth:580,
            items:[]
        });

        var a = new Array();
        var c = new Array();
        var d = new Array();
        PanelP11.add({
            html:"<span style='font-size:12.3px'>11.- ¿Cuántas aplicaciones de insulina se realiza al día?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg8_9(d[i]);
            a=valor.split(",");
            if(a[0]=="si"){
                if(a[1]=="Lantus"){
                    c=Texto(d[i]).split(",");
                    PanelP11.add(new com.punto.pen.ComboBox({
                        id:"idDbP11Lantus",
                        etiqueta:c[1],
                        allowBlank:false,
                        name:"dDbP11_"+c[0],
                        prm:{
                            campo:"apLantus",
                            idCampo:'idApLantus',
                            autoCarga:true,
                            bnd:5,
                            qry:30
                        }
                        ,
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP11Lantus").getValue()-98;
                                Ext.getCmp('idHidenP11_Lantus').setValue(aplic);
                                if(aplic!=0){
                                    PanelP11.remove("idPanelP12Lantus",true);
                                    PanelP11.add(pregunta12(aplic,"Lantus","idPanelP12Lantus","La"));
                                    PanelP11.doLayout();
                                }else{
                                    PanelP11.remove("idPanelP12Lantus",true);
                                }
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP11_"+c[0],
                        id:"idHidenP11_Lantus",
                        value:"0"
                    });
                }
                if(a[1]=="Shorant"){
                    c=Texto(d[i]).split(",");
                    PanelP11.add(new com.punto.pen.ComboBox({
                        id:"idDbP11Shorant",
                        etiqueta:c[1],
                        allowBlank:false,
                        name:"dDbP11_"+c[0],
                        prm:{
                            campo:"apLantus",
                            idCampo:'idApLantus',
                            autoCarga:true,
                            bnd:5,
                            qry:30
                        }
                        ,
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP11Shorant").getValue()-98;
                                Ext.getCmp('idHidenP11_Shorant').setValue(aplic);
                                if(aplic!=0){
                                    PanelP11.remove("idPanelP12Shorant",true);
                                    PanelP11.add(pregunta12(aplic,"Shorant","idPanelP12Shorant","Sh"));
                                    PanelP11.doLayout();
                                }else{
                                    PanelP11.remove("idPanelP12Shorant",true);
                                }
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP11_"+c[0],
                        id:"idHidenP11_Shorant",
                        value:"0"
                    });
                }
            }
        }
        PanelP11.add(saltoLinea());
        PanelP11.doLayout();
        return PanelP11;
    }

    function pregunta12(aplic,med,id2,tipo){
        PanelP12 = new Ext.Panel({
            xtype:"panel",
            id:id2,
            border:false,
            layout:"form",
            labelWidth:580,
            items:[{
                html:"<span style='font-size:12.3px'>12.- ¿Cuantas unidades por aplicacion? &nbsp; &nbsp; " + med + ":</span>",
                border:false
            },
            saltoLinea()]
        });
        for(var i=0;i<aplic;i++){
            PanelP12.add({
                xtype:"numberfield",
                id:"idDbP12"+tipo+"_"+i,
                fieldLabel:"Aplicación "+(i+1),
                allowBlank:false,
                name:"dbP12"+tipo+"_"+i,
                width:100,
                maxLength:3,
                tabIndex:100,
                autoCreate:{
                    tag:"input",
                    autocomplete:"off",
                    maxlength:3
                }
            });
        }
        PanelP12.add(saltoLinea());
        return PanelP12;
    }

    function Preg13(num,valor){
        var PanelP13 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP13",
            layout:"form",
            labelWidth:580,
            border:false,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP13.add({
            html:"<span style='font-size:12.3px'>13.- Fecha de entrega del dispositivo</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg16_19(d[i]);
            if(valor=="si"){
                c=Texto(d[i]).split(",");
                PanelP13.add({
                    xtype:"datefield",
                    id:"idDbP13_"+c[0],
                    fieldLabel:c[1],
                    allowBlank:false,
                    name:"dbP13_"+c[0],
                    emptyText:'dd/mm/yyyy',
                    width:100,
                    autoCreate:{
                        tag:"input",
                        maxlength:10
                    }
                });
            }
        }
        PanelP13.add(saltoLinea());
        PanelP13.doLayout();
        return PanelP13;
    }


    function Preg14(num,valor){
        var PanelP14 =  new Ext.Panel({
            id:"idPanelP14",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP14.add({
            html:"<span style='font-size:12.3px'>14.- ¿Qué tipo de dispositivo le entregaron?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg16_19b(d[i]);
            var a=valor.split(",");

            if(a[0]=="si"){
                c=Texto(d[i]).split(",");
                if(a[1]=="Lantus"){
                    PanelP14.add(new com.punto.pen.ComboBox({
                        id:"idDbP14_Lan",
                        etiqueta:c[1],
                        width:120,
                        name:"dbP14_"+c[0],
                        allowBlank:false,
                        valueField:"idApLantus",
                        hiddenName :"HidenP14_"+c[0],
                        prm:{
                            campo:"apLantus",
                            idCampo:'idApLantus',
                            autoCarga:true,
                            bnd:5,
                            qry:52
                        }
                    }));
                }

                if(a[1]=="Shorant"){
                    PanelP14.add(new com.punto.pen.ComboBox({
                        id:"idDbP14_Sho",
                        etiqueta:c[1],
                        name:"dbP14_"+c[0],
                        allowBlank:false,
                        width:120,
                        valueField:"idApShorant",
                        hiddenName :"HidenP14_"+c[0],
                        prm:{
                            campo:"apShorant",
                            idCampo:'idApShorant',
                            autoCarga:true,
                            bnd:5,
                            qry:52
                        }
                    })
                    );
                }

            }
        }
        PanelP14.add(saltoLinea());
        PanelP14.doLayout();
        return PanelP14;
    }

    function Preg15(num,valor){
        var PanelP15 =  new Ext.Panel({
            xtype:"panel",
            layout:"form",
            border:false,
            id:"idPanelP15",
            items:[{
                html:"<span style='font-size:12.3px'>15.- ¿Puede darme el número de lote de su dispositivo?</span>",
                height:20,
                border:false
            },{
                xtype:"panel",
                border:false,
                layout:'form',
                id:'idPanelP15Subfijos',
                labelWidth:580,
                items:[]
            }]
        });

        var panelP15Sub=Ext.getCmp("idPanelP15Subfijos");
        var a = new Array();
        var d = new Array();
        var c = new Array();
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg16_19b(d[i]);
            a=valor.split(",");

            if(a[0]=="si"){
                if(a[1]=="Lantus"){
                    c=Texto(d[i]).split(",");
                    panelP15Sub.add({
                        id:"idDbP15aLan",
                        xtype:"checkbox",
                        fieldLabel:c[1],
                        boxLabel:"No indico",
                        name:"dbP15a_"+c[0],
                        inputValue:false,
                        checked:true,
                        listeners:{
                            'check':function(){
                                habilitaText(Ext.getCmp("idDbP15aLan"),Ext.getCmp("idDbP15bLan"));
                            }
                        }
                    });

                    panelP15Sub.add({
                        id:"idDbP15bLan",
                        xtype:"textfield",
                        labelSeparator:"",
                        name:"dbP15b_"+c[0],
                        width:100,
                        disabled:true,
                        maxLength:11,
                        tabIndex:100,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:11
                        }
                    });
                }

                if(a[1]=="Shorant"){
                    c=Texto(d[i]).split(",");
                    panelP15Sub.add({
                        id:"idDbP15aSho",
                        xtype:"checkbox",
                        fieldLabel:c[1],
                        boxLabel:"No indico",
                        name:"dbP15a_"+c[0],
                        inputValue:false,
                        checked:true,
                        listeners:{
                            'check':function(){
                                habilitaText(Ext.getCmp("idDbP15aSho"),Ext.getCmp("idDbP15bSho"));
                            }
                        }
                    });

                    panelP15Sub.add({
                        id:"idDbP15bSho",
                        xtype:"textfield",
                        labelSeparator:"",
                        name:"dbP15b_"+c[0],
                        width:100,
                        disabled:true,
                        maxLength:15,
                        tabIndex:100,
                        autoCreate:{
                            tag:"input",
                            autocomplete:"off",
                            maxlength:15
                        }
                    });
                }

            }
        }
        PanelP15.add(saltoLinea());
        PanelP15.doLayout();
        return PanelP15;
    }

    function continuarCuestionarioDiabetes(){
        var panelFormEncuestaDiabete=Ext.getCmp('idFormEncuestaDiabetes');
        var check=Ext.getCmp("idCheckContinuar");
        var idDbP1=Ext.getCmp("idDbP1");
        Ext.getCmp("idPanelP8").setVisible(false);

        if(check.getValue()==true){
            if(Ext.getCmp("idDbP1").getValue()!=""){
                
                mns=Ext.MessageBox.show({
                    msg: 'Generando Encuesta...',
                    title:'Espere por favor...',
                    width:250,
                    wait:true,
                    waitConfig: {
                        interval:30
                    },
                    animEl: 'mb7'
                });
                setTimeout(function(){
                    mns.hide();
                }, 3000);
                 
                var valid=validacionProducto(Ext.getCmp("idDbP1").getValue());
                if(valid==""){
                    idDbP1.disable();
                    panelFormEncuestaDiabete.add(PreguntasAdd());
                    panelFormEncuestaDiabete.doLayout();
                }else{
                    Ext.Msg.show({
                        title:'Error de Selección',
                        msg: valid,
                        buttons: Ext.Msg.OK
                    });
                    idDbP1.setValue("");
                    check.check=true;
                    check.setValue(false);
                }
                Ext.getCmp("idBotGuardar").enable();
            }else{
                
                Ext.Msg.show({
                    title:'Error',
                    msg: '<center>¡Debe seleccionar al menos un medicamento de la Pregunta 1!</center>',
                    buttons: Ext.Msg.OK
                });
                check.check=true;
                check.setValue(false);
                Ext.getCmp("idBotGuardar").disable();
            }
        }else if(check.getValue()==false){
            check.check=true;
            check.setValue(false);
            idDbP1.enable();
            Ext.getCmp("idBotGuardar").disable();
            panelFormEncuestaDiabete.remove(Ext.getCmp("idPreguntasRestantes"));
        }
    }

    function PreguntasAdd(){
        var d = new Array();
        d = Ext.getCmp("idDbP1").getValue().split(",");
            
        Ext.getCmp("idPanelP8").setVisible(false);
        
        var num=d.length;
        
        var PanelPreguntasRestantes =  new Ext.Panel({
            id:'idPreguntasRestantes',
            xtype:"panel",
            border:false,
            layout:"form",
            monitorValid : true,
            items:[
            Preg9(num,Ext.getCmp("idDbP1").getValue()),
            Preg10(num,Ext.getCmp("idDbP1").getValue()),
            Preg11(num,Ext.getCmp("idDbP1").getValue()),
            Preg13(num,Ext.getCmp("idDbP1").getValue()),
            Preg14(num,Ext.getCmp("idDbP1").getValue()),
            Preg15(num,Ext.getCmp("idDbP1").getValue())
            ]
        });
        PregVisible(Ext.getCmp("idDbP1").getValue());
        Ext.getCmp("idBotGuardar").disable();
        PanelPreguntasRestantes.doLayout();
        return PanelPreguntasRestantes;
    }

    function Texto(num){
        var tex="";
        if(num==20){
            tex="Am,Amaryl 2mg";
        }else if(num==21){
            tex="Am,Amaryl 3mg";
        }else if(num==22){
            tex="Am,Amaryl 4mg";
        }else if(num==23){
            tex="Am,Amaryl M 2mg/1000mg";
        }else if(num==24){
            tex="Am,Amaryl M 4mg/1000mg";
        }else if(num==117){
            tex="La,Lantus Cartucho 1x3ml";
        }else if(num==118){
            tex="La,Lantus Cartucho 5x3ml";
        }else if(num==119){
            tex="La,Lantus Vial 1x10ml";
        }else if(num==120){
            tex="La,Lantus Solostar 1x3ml";
        }else if(num==121){
            tex="La,Lantus Solostar 5x3ml";
        }else if(num==145){
            tex="Me,Metamaryl 2mg";
        }else if(num==146){
            tex="Me,Metamaryl 4mg";
        }else if(num==318){
            tex="Me,Metamaryl 850/4 c/15";
        }else if(num==319){
            tex="Me,Metamaryl 500/2 c/15";
        }else if(num==320){
            tex="Me,Metamaryl 850/4 c/4";
        }else if(num==321){
            tex="Me,Metamaryl 500/2 c/15";
        }else if(num==216){
            tex="Sh,Shorant Cartucho 5x3ml";
        }else if(num==217){
            tex="Sh,Shorant Cartucho 1x3ml";
        }else if(num==218){
            tex="Sh,Shorant Vial 10ml";
        }else if(num==219){
            tex="Sh,Shorant Solostar 5x3ml";
        }else if(num==220){
            tex="Sh,Shorant Solostar 1x3ml";
        }else if(num==322){
            tex="Sh,Shorant 3/4";
        }else if(num==324){
            tex="Sh,Shorant Solostar 3ml/1";
        }else if(num==325){
            tex="Sh,Shorant Solostar 3ml/5";
        }else if(num==337){
            tex="Am,Amaryl Sin Detalle";
        }else if(num==382){
            tex="La,Lantus Sin Detalle";
        }else if(num==406){
            tex="Me,Metamaryl Sin Detalle";
        }else if(num==449){
            tex="Sh,Shorant Sin Detalle";
        }else if(num==483){
            tex="Mi,Mifelar 500 mg";
        }else if(num==484){
            tex="Mi,Mifelar 850 mg";
        }else{
            tex="Er,Error";
        }

        return tex;
    }

    function validacionProducto(varP3){
        var mns="";
        var d = new Array();
        d = varP3.split(",");
        if(d.length==1){
            mns="";
        }else{
            var amaryMMeta=1;
            var amary=1;
            var lantus=1;
            var metaAmary=1;
            var shoran=1;            
            var mifelar=1;
            
            for(var i=0;i<d.length;i++){
                if((d[i]>=20 && d[i]<=24) || d[i]==337){
                    amary++;
                }
                if((d[i]>=117 && d[i]<=121) || d[i]==382){
                    lantus++;
                }
                if(d[i]==145 || d[i]==146 || d[i]==406 || (d[i]>=318 && d[i]<=321)){
                    metaAmary++;
                }
                if((d[i]>=216 && d[i]<=220) || (d[i]>=322 && d[i]<=325) || d[i]==449){
                    shoran++;
                }
                if(d[i]==23 || d[i]==24 || d[i]==145 || d[i]==146 || d[i]==406 || (d[i]>=318 && d[i]<=321)){
                    amaryMMeta++;
                }
                if(d[i]==483 || d[i]==484){
                    mifelar++;
                }
            }
            if(amaryMMeta>2 && metaAmary>2){
                mns="¡No se Puede seleccionar más de una presentación de Metamatyl!";
            }else
            if(amaryMMeta>2){
                mns="¡No puede seleccionar Metamaryl y Amaryl M Juntos!";
            }else if(amary>2){
                mns="¡No se Puede seleccionar más de una presentación de Amaryl!";
            }else if(lantus>2){
                mns="¡No se Puede seleccionar más de una presentación de Lantus!";
            }else if(metaAmary>2){
                mns="¡No se Puede seleccionar más de una presentación de Metamatyl!";
            }else if(shoran>2){
                mns="¡No se Puede seleccionar más de una presentación de Shoran!";
            }else if(mifelar>2){
                mns="¡No se Puede seleccionar más de una presentación de Mifelar!";
            }
        }
        return mns;
    }

    function PregVisible(varP3){
        var d = new Array();
        d = varP3.split(",");
        if(d.length==1){
            visiblePanelesOne(varP3);
        }else{
           var amaryMeta=1;
            var lantSho=1;
            var lantShoTod=1;
            for(var i=0;i<d.length;i++){
                if((d[i]>=20 && d[i]<=24) || d[i]==145 || d[i]==146 || d[i]==337  || d[i]==406  || (d[i]>=318 && d[i]<=321)){
                    amaryMeta++;
                }else if(d[i]==119 || d[i]==218 || d[i]==322 || d[i]==382 || d[i]==449){
                    lantSho++;
                }else if(d[i]==117 || d[i]==118 || d[i]==120 || d[i]==121 ||
                    d[i]==216 || d[i]==217 || d[i]==219 || d[i]==220 ||
                    d[i]==324 || d[i]==325){
                    lantShoTod++;
                }
            }
            visiblePanelesMult(amaryMeta,lantSho,lantShoTod);
        }
    }

    function visiblePanelesMult(amary,lantSho,lantShoTod){       

        if(amary>1 && lantSho>1 && lantShoTod>1){            
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idDbP8").allowBlank=false;    
            Ext.getCmp("idPanelP11").setVisible(true);
            Ext.getCmp("idPanelP13").setVisible(true);
            Ext.getCmp("idPanelP14").setVisible(true);
            Ext.getCmp("idPanelP15").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary==1 && lantSho>1 && lantShoTod>1){
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idDbP8").allowBlank=false;    
            Ext.getCmp("idPanelP11").setVisible(true);
            Ext.getCmp("idPanelP13").setVisible(true);
            Ext.getCmp("idPanelP14").setVisible(true);
            Ext.getCmp("idPanelP15").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary>1 && lantSho==1 && lantShoTod>1){            
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idDbP8").allowBlank=false;    
            Ext.getCmp("idPanelP11").setVisible(true);
            Ext.getCmp("idPanelP13").setVisible(true);
            Ext.getCmp("idPanelP14").setVisible(true);
            Ext.getCmp("idPanelP15").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary>1 && lantSho>1 && lantShoTod==1){
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(false);
            Ext.getCmp("idDbP8").allowBlank=true;    
            Ext.getCmp("idPanelP11").setVisible(false);
            Ext.getCmp("idPanelP13").setVisible(false);
            Ext.getCmp("idPanelP14").setVisible(false);
            Ext.getCmp("idPanelP15").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }else if(amary>1 && lantSho==1 && lantShoTod==1){
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(false);
            Ext.getCmp("idDbP8").allowBlank=true;    
            Ext.getCmp("idPanelP11").setVisible(false);
            Ext.getCmp("idPanelP13").setVisible(false);
            Ext.getCmp("idPanelP14").setVisible(false);
            Ext.getCmp("idPanelP15").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }else if(amary==1 && lantSho>1 && lantShoTod==1){
           Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(false);
            Ext.getCmp("idDbP8").allowBlank=true;    
            Ext.getCmp("idPanelP11").setVisible(false);
            Ext.getCmp("idPanelP13").setVisible(false);
            Ext.getCmp("idPanelP14").setVisible(false);
            Ext.getCmp("idPanelP15").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }
    }

    function VerificarPreg6(val){
        var mns="no";
        if((val>=20 && val<=24) || val==337){
            mns="Amaryl";
        }else if((val>=117 && val<=121) || val==382){
            mns="Lantus";
        }else if(val==145 || val==146 || val==406 || (val>=318 && val<=321)){
            mns="MetaAmaryl";
        }else if((val>=216 && val<=220) || val==449 || (val>=322 && val<=325)){
            mns="Shorant";
        }else if(val == 483 || val == 484){
            mns="Mifelar";
        }
        return mns;
    }

    function VerificarPreg8_9(reg){    
        var mns="no";
        if((reg>=117 && reg<=121) || reg==382){
            mns="si,Lantus";
        }
        if((reg>=216 && reg<=220) || reg==449 || (reg>=322 && reg<=325)){
            mns="si,Shorant";
        }
        return mns;
    }
    function VerificarPreg7(reg){
        var mns="no";
        if((reg>=20 && reg<=24) || reg==145 || reg==146  || reg==337 || reg==406 || (reg>=318 && reg<=321) || reg==483 || reg==484 ){
            mns="si";
        }
        return mns;
    }
    function VerificarPreg16_19(reg){
        var mns="no";
        if(reg==117 || reg==118 || reg==120 || reg==121
            || reg==216 || reg==217 || reg==219 || reg==220 || reg==324 || reg==325){
            mns="si";
        }
        return mns;
    }

    function VerificarPreg16_19b(reg){
        var mns="no";
        if(reg==117 || reg==118 || reg==120 || reg==121){
            mns="si,Lantus";
        }
        if(reg==216 || reg==217 || reg==219 || reg==220 || reg==324 || reg==325){
            mns="si,Shorant";
        }
        return mns;
    }

    function visiblePanelesOne(varP3){
        if((varP3>=20 && varP3<=24) || varP3==145 || varP3==146 || varP3==337 || varP3==406 || (varP3>=318 && varP3<=321)
            || varP3 == 483 || varP3 == 484){  //Amaryl, Metamaryl y Mifelar//
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(true);
            Ext.getCmp("idPanelP8").setVisible(false);
            Ext.getCmp("idDbP8").allowBlank=true;    
            Ext.getCmp("idPanelP11").setVisible(false);
            Ext.getCmp("idPanelP13").setVisible(false);
            Ext.getCmp("idPanelP14").setVisible(false);
            Ext.getCmp("idPanelP15").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }
        if(varP3==119 || varP3==218 || varP3==382 || varP3==449 || varP3==117 || varP3==118 || varP3==120 || varP3==121 ||
            varP3==216 || varP3==217 || varP3==219 || varP3==220 || varP3==324 || varP3==325){    //Lantus y Shoran Cartucho-Solostar            
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idDbP8").allowBlank=false;    
            Ext.getCmp("idPanelP9").setVisible(true);
            Ext.getCmp("idPanelP10").setVisible(false);
            Ext.getCmp("idPanelP11").setVisible(true);
            Ext.getCmp("idPanelP13").setVisible(true);
            Ext.getCmp("idPanelP14").setVisible(true);
            Ext.getCmp("idPanelP15").setVisible(true);    
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }
    }

    function saltoLinea(){
        var br="";
        for(var i=0;i<1;i++){
            br+="<br>";
        }
        var line={
            html:br,
            border:false
        }
        return line;
    }

    function habilitaText(check,text){
        if(check.getValue()==true){
            text.allowBlank=true;
            text.setValue("");
            text.disable();
            
        }
        if(check.getValue()==false){
            text.enable();
            text.allowBlank=false;
        }
    }

}