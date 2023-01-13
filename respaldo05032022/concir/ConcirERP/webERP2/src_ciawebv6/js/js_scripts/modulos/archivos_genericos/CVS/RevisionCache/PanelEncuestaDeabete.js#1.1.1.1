Ext.ns("com.punto.pen");

com.punto.pen.PanelEncuestaDiabete= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);
    //    var carga = (argumentos.carga==null ? true : argumentos.carga);
    var carga=true;
    var mns;
    Ext.form.Field.prototype.msgTarget = 'side';

    var PanelEncuestaDiabete =  new Ext.Panel({
        id:'idPanelECorp',
        xtype:"panel",
        layout:"form",
        border:false,
        items:[ {
                html:"<div align=right><u><a onClick='getHistorialEncuasta(" + idCnt + ")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
                Height:20,
                border:false
            },{
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
                items:[
                    new com.punto.pen.ComboBox({
                        id:"idDbP1",
                        etiqueta:"1.\t¿Usted sabe qué tipo de diabetes tiene?",
                        name:"dbP1",
                        allowBlank:false,
                        prm:{
                            campo:"TipoD",
                            idCampo:'idTipoD',
                            autoCarga:carga,
                            bnd:5,
                            qry:23
                        } ,
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP1").getValue();
                                Ext.getCmp('idHidenDbP1').setValue(aplic);
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenDbP1",
                        id:"idHidenDbP1",
                        value:"0"
                    }
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                labelWidth:580,
                id:"idPanelP2",
                items:[
                    new com.punto.pen.ComboBox({
                        id:"idDbP2",
                        etiqueta:"2.\t¿Su médico le entrego una receta médica?",
                        name:"dbP2",
                        allowBlank:false,
                        prm:{
                            campo:"MedRec",
                            idCampo:'idMedRec',
                            autoCarga:carga,
                            bnd:5,
                            qry:24
                        }
                    })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                labelWidth:580,
                id:"idPanelP3",
                items:[{
                        html:"<span style='text-align: right; color: #36C; font-size:11px;'>Para seleccionar más de un medicamento deje presionada la tecla Ctrl y de clic en los medicamentos.</span>",
                        border:false
                    },{
                        xtype:"multiselect",
                        fieldLabel:"3.- ¿Que medicamentos estan incluidos en su receta medica?",
                        id:"idDbP3",
                        name:"dbP3",
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
                        name:"hiddenDbP3_b",
                        //                    id:"idHidenP6Lantus",
                        value:""
                    }
                    //                ,new com.punto.pen.ComboBox({
                    //                id:"idDbP3_b",
                    //                etiqueta:"¿Qué le diagnosticó su médico?",
                    //                name:"dbP3_b",
                    //                hiddenName  : 'hiddenDbP3_b',
                    //                width       : 150,
                    //                valueField:"iddiagnostico",
                    //                prm:{
                    //                    campo:"diagnostico",
                    //                    idCampo:"iddiagnostico",
                    //                    autoCarga:true,
                    //                    bnd:10,
                    //                    qry:44
                    //                }
                    //            })
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
                        fieldLabel:"4.- ¿Que medicamentos toma usted ademas de los incluidos en su receta?",
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
                        //                    id:"idHidenP6Lantus",
                        value:""
                    }
                    //                ,new com.punto.pen.ComboBox({
                    //                id:"idDbP4_b",
                    //                etiqueta:"¿Qué le diagnosticó su médico?",
                    //                name:"dbP4_b",
                    //                hiddenName  : 'hiddenDbP4_b',
                    //                width       : 150,
                    //                valueField:"iddiagnostico",
                    //                prm:{
                    //                    campo:"diagnostico",
                    //                    idCampo:"iddiagnostico",
                    //                    autoCarga:true,
                    //                    bnd:10,
                    //                    qry:44
                    //                }
                    //            })
                ]
            },{
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
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                labelWidth:580,
                id:"idBotonLoad",
                hidden:true,
                buttons:[{
                        id:'idCargar',
                        text:"Cargar Información",
                        iconCls:'icn-refresh',
                        handler:function(){
                            var prod=Ext.getCmp('idDbP3').getValue();///////Productos de la receta
                            Ext.Ajax.request({
                                url:contexto+'/Diabetes',
                                params:{
                                    'idCnt':idCnt,
                                    'bnd':7,
                                    'dbP3':prod
                                },
                                success:function(rsp){
                                    var idBot=Ext.getCmp('idCargar');
                                    idBot.disable();
                                    var array = eval("("+rsp.responseText+")");
                                    if(array.msg==null){
                                        for(var i=0;i<array.idnombres.length;i++){
                                            if(i!=0){
                                                var cmp = Ext.getCmp(array.idnombres[i]);
                                                cmp.setValue(array.contenido[i]);
                                                if(cmp.getXType()=='combo'){
                                                    cmp.fireEvent('select');
                                                }
                                            }
                                        }
                                    }else{
                                        Ext.MessageBox.alert('¡¡Alerta!!',array.msg);
                                        idBot.enable();
                                    }
                                },
                                failure:function(rsp){
                                    var array2 = eval("("+rsp.responseText+")");
                                    Ext.MessageBox.alert('¡¡Alerta!!',array2.msg);
                                }
                            }
                        );



                        }
                    }]
            },{
                html:"<hr>",
                height:20,
                border:false
            }]
    });

    var panelFormEncuestaDiabete= new Ext.form.FormPanel({
        id:idPnl,
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

    this.crearEncuestaDiabetes = function(tipoload,idEnc){//      this.crearEncuestaDiabetes = function(){
        panelFormEncuestaDiabete.add(PanelEncuestaDiabete);
        if(tipoload==2){
            var panel=Ext.getCmp('idFormEncuestaDiabetes');
            loadFormulario(panel,{
                url:contexto+'/Diabetes',
                'idEnc':idEnc,
                'bnd':5
            });
        }
        if(tipoload==3){
            var panel2=Ext.getCmp('idFormEncuestaDiabetes');
            loadFormulario(panel2,{
                url:contexto+'/Diabetes',
                'idEnc':idEnc,
                'bnd':6
            });
            var botonLoad=Ext.getCmp('idBotonLoad');
            botonLoad.setVisible(true);
        }
        panelFormEncuestaDiabete.doLayout();
        Ext.getCmp("idCargar").disable();
        return panelFormEncuestaDiabete;
    }


    function Preg5(num,valor){

        var PanelP5 =  new Ext.Panel({
            id:"idPanelP5",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP5.add({
            html:"<span style='font-size:12.3px'>5.\t¿Cuánto tiempo lleva tomando este medicamento?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            c=Texto(d[i]).split(",");
            PanelP5.add({
                xtype:"datefield",
                id:"idDbP5_"+c[0],
                fieldLabel:c[1],
                allowBlank:false,
                name:"dbP5_"+c[0],
                emptyText:'dd/mm/yyyy',
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                }
            });
        }
        PanelP5.add(saltoLinea());
        PanelP5.doLayout();

        return PanelP5;
    }

    function Preg6(num,valor){
        var PanelP6 =  new Ext.Panel({
            xtype:"panel",
            layout:"form",
            border:false,
            id:"idPanelP6",
            items:[{
                    html:"<span style='font-size:12.3px'>6.\t¿Durante qué tiempo llevará este tratamiento?</span>",
                    height:20,
                    border:false
                },{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    items:[{
                            xtype:"panel",
                            border:false,
                            labelWidth:580,
                            columnWidth:.83,
                            layout:"form",
                            id:'idPanelP6Sub1',
                            items:[]
                        },{
                            xtype:"panel",
                            id:'idPanelP6Sub2',
                            border:false,
                            labelWidth:1,
                            columnWidth:0.15,
                            layout:"form",
                            items:[]
                        }]
                }]
        });

        var PanelP61=Ext.getCmp("idPanelP6Sub1");
        var PanelP62=Ext.getCmp("idPanelP6Sub2");


        var a = new Array();
        var d = new Array();
        var c = new Array();
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg6(d[i]);

            if(valor=="Lantus"){
                c=Texto(d[i]).split(",");

                PanelP61.add(new com.punto.pen.ComboBox({
                    id:"idDbP6aLantus",
                    etiqueta:c[1],
                    name:"dbP6_"+c[0],
                    width:90,
                    allowBlank:false,
                    prm:{
                        campo:"apLantus",
                        idCampo:'idApLantus',
                        autoCarga:true,
                        bnd:5,
                        qry:50
                    }
                    ,
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP6aLantus").getValue();
                            Ext.getCmp('idHidenP6Lantus').setValue(aplic);
                            if(aplic=="147"){
                                Ext.getCmp("idPanelDbP6bLantus").setVisible(true);
                                Ext.getCmp("idDbP6bLantus").allowBlank=false;
                            }else{
                                Ext.getCmp("idPanelDbP6bLantus").setVisible(false);
                                Ext.getCmp("idDbP6bLantus").allowBlank=true;
                                Ext.getCmp("idDbP6bLantus").setValue("");
                            }
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenP6_"+c[0],
                    id:"idHidenP6Lantus",
                    value:"0"
                });

                PanelP62.add({
                    xtype:"panel",
                    id:'idPanelDbP6bLantus',
                    border:false,
                    labelWidth:1,
                    columnWidth:0.2,
                    layout:"form",
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP6bLantus",
                            labelSeparator:"",
                            allowBlank:false,
                            name:"dbP6b"+c[0],
                            width:50,
                            prm:{
                                campo:"apLantus",
                                idCampo:'idApLantus',
                                autoCarga:true,
                                bnd:18
                            }
                        })]
                });
                var panL= Ext.getCmp("idPanelDbP6bLantus");
                panL.setVisible(false);
            }

            if(valor=="Shorant"){
                c=Texto(d[i]).split(",");

                PanelP61.add(new com.punto.pen.ComboBox({
                    id:"idDbP6aShorant",
                    etiqueta:c[1],
                    name:"dbP6_"+c[0],
                    width:90,
                    allowBlank:false,
                    prm:{
                        campo:"apShorant",
                        idCampo:'idShorant',
                        autoCarga:true,
                        bnd:5,
                        qry:50
                    }
                    ,
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP6aShorant").getValue();
                            Ext.getCmp('idHidenP6Shorant').setValue(aplic);
                            if(aplic=="147"){
                                Ext.getCmp("idPanelDbP6bShorant").setVisible(true);
                                Ext.getCmp("idDbP6bShorant").allowBlank=false;
                            }else{
                                Ext.getCmp("idPanelDbP6bShorant").setVisible(false);
                                Ext.getCmp("idDbP6bShorant").allowBlank=true;
                                Ext.getCmp("idDbP6bShorant").setValue("");
                            }
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenP6_"+c[0],
                    id:"idHidenP6Shorant",
                    value:"0"
                });
              
                PanelP62.add({
                    xtype:"panel",
                    id:'idPanelDbP6bShorant',
                    border:false,
                    labelWidth:1,
                    columnWidth:0.2,
                    layout:"form",
                    visible:false,
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP6bShorant",
                            labelSeparator:"",
                            allowBlank:false,
                            name:"dbP6b"+c[0],
                            width:50,
                            prm:{
                                campo:"apShorant",
                                idCampo:'idApShorant',
                                autoCarga:true,
                                bnd:18
                            }
                        })]
                });
                var panSh = Ext.getCmp("idPanelDbP6bShorant");
                panSh.setVisible(false);
            }

            if(valor=="Amaryl"){
                c=Texto(d[i]).split(",");

                PanelP61.add(new com.punto.pen.ComboBox({
                    id:"idDbP6aAmaryl",
                    etiqueta:c[1],
                    name:"dbP6_"+c[0],
                    width:90,
                    allowBlank:false,
                    prm:{
                        campo:"apAmaryl",
                        idCampo:'idAmaryl',
                        autoCarga:true,
                        bnd:5,
                        qry:50
                    }
                    ,
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP6aAmaryl").getValue();
                            Ext.getCmp('idHidenP6Amaryl').setValue(aplic);
                            if(aplic=="147"){
                                Ext.getCmp("idPanelDbP6bAmaryl").setVisible(true);
                                Ext.getCmp("idDbP6bAmaryl").allowBlank=false;
                            }else{
                                Ext.getCmp("idPanelDbP6bAmaryl").setVisible(false);
                                Ext.getCmp("idDbP6bAmaryl").allowBlank=true;
                                Ext.getCmp("idDbP6bAmaryl").setValue("");
                            }
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenP6_"+c[0],
                    id:"idHidenP6Amaryl",
                    value:"0"
                });
                PanelP62.add({
                    xtype:"panel",
                    id:'idPanelDbP6bAmaryl',
                    border:false,
                    labelWidth:1,
                    columnWidth:0.2,
                    layout:"form",
                    visible:false,
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP6bAmaryl",
                            labelSeparator:"",
                            name:"dbP6b"+c[0],
                            allowBlank:false,
                            width:50,
                            prm:{
                                campo:"apAmaryl",
                                idCampo:'idApAmaryl',
                                autoCarga:true,
                                bnd:18
                            }
                        })]
                });
                var panA = Ext.getCmp("idPanelDbP6bAmaryl");
                panA.setVisible(false);
            }

            if(valor=="MetaAmaryl"){
                c=Texto(d[i]).split(",");

                PanelP61.add(new com.punto.pen.ComboBox({
                    id:"idDbP6aMetaAmaryl",
                    etiqueta:c[1],
                    name:"dbP6_"+c[0],
                    width:90,
                    allowBlank:false,
                    prm:{
                        campo:"apMetaAmaryl",
                        idCampo:'idMetaAmaryl',
                        autoCarga:true,
                        bnd:5,
                        qry:50
                    }
                    ,
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP6aMetaAmaryl").getValue();
                            Ext.getCmp('idHidenP6MetaAmaryl').setValue(aplic);
                            if(aplic=="147"){
                                Ext.getCmp("idPanelDbP6bMetaAmaryl").setVisible(true);
                                Ext.getCmp("idDbP6bMetaAmaryl").allowBlank=false;
                            }else{
                                Ext.getCmp("idPanelDbP6bMetaAmaryl").setVisible(false);
                                Ext.getCmp("idDbP6bMetaAmaryl").allowBlank=true;
                                Ext.getCmp("idDbP6bMetaAmaryl").setValue("");
                            }
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenP6_"+c[0],
                    id:"idHidenP6MetaAmaryl",
                    value:"0"
                });
                PanelP62.add({
                    xtype:"panel",
                    id:'idPanelDbP6bMetaAmaryl',
                    border:false,
                    labelWidth:1,
                    columnWidth:0.2,
                    layout:"form",
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP6bMetaAmaryl",
                            labelSeparator:"",
                            name:"dbP6b"+c[0],
                            allowBlank:false,
                            width:50,
                            prm:{
                                campo:"apMetaAmaryl",
                                idCampo:'idApMetaAmaryl',
                                autoCarga:true,
                                bnd:18
                            }
                        })]
                });
                var panMA = Ext.getCmp("idPanelDbP6bMetaAmaryl");
                panMA.setVisible(false);
            }

            if(valor=="Mifelar"){
                c=Texto(d[i]).split(",");

                PanelP61.add(new com.punto.pen.ComboBox({
                    id:"idDbP6aMifelar",
                    etiqueta:c[1],
                    name:"dbP6_"+c[0],
                    width:90,
                    allowBlank:false,
                    prm:{
                        campo:"apMifelar",
                        idCampo:'idMifelar',
                        autoCarga:true,
                        bnd:5,
                        qry:50
                    }
                    ,
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP6aMifelar").getValue();
                            Ext.getCmp('idHidenP6Mifelar').setValue(aplic);
                            if(aplic=="147"){
                                Ext.getCmp("idPanelDbP6bMifelar").setVisible(true);
                                Ext.getCmp("idDbP6bMifelar").allowBlank=false;
                            }else{
                                Ext.getCmp("idPanelDbP6bMifelar").setVisible(false);
                                Ext.getCmp("idDbP6bMifelar").allowBlank=true;
                                Ext.getCmp("idDbP6bMifelar").setValue("");
                            }
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenP6_"+c[0],
                    id:"idHidenP6Mifelar",
                    value:"0"
                });
                PanelP62.add({
                    xtype:"panel",
                    id:'idPanelDbP6bMifelar',
                    border:false,
                    labelWidth:1,
                    columnWidth:0.2,
                    layout:"form",
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP6bMifelar",
                            labelSeparator:"",
                            name:"dbP6b"+c[0],
                            allowBlank:false,
                            width:50,
                            prm:{
                                campo:"apMifelar",
                                idCampo:'idApMifelar',
                                autoCarga:true,
                                bnd:18
                            }
                        })]
                });
                var panMi = Ext.getCmp("idPanelDbP6bMifelar");
                panMi.setVisible(false);
            }

        }

        PanelP6.add(saltoLinea());
        PanelP6.doLayout();
        return PanelP6;
    }
        
    function Preg7(num,valor){
        var PanelP7 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP7",
            layout:"form",
            labelWidth:580,
            border:false,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP7.add({
            html:"<span style='font-size:12.3px'>7.\t¿Cuántas tabletas le indicó su médico?</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg7(d[i]);
            if(valor=="si"){
                c=Texto(d[i]).split(",");
                PanelP7.add({
                    xtype:"numberfield",
                    id:"idDbP7_"+c[0],
                    allowBlank:false,
                    fieldLabel:c[1],
                    name:"dbP7_"+c[0],
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
        PanelP7.add(saltoLinea());
        PanelP7.doLayout();

        return PanelP7;
    }

    function Preg8(num,valor){
        var PanelP8 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP8",
            border:false,
            layout:"form",
            labelWidth:580,
            items:[]
        });

        var a = new Array();
        var c = new Array();
        var d = new Array();
        PanelP8.add({
            html:"<span style='font-size:12.3px'>8.\t¿Cuántas aplicaciones de insulina se realiza al día?</span>",
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
                    PanelP8.add(new com.punto.pen.ComboBox({
                        id:"idDbP8Lantus",
                        etiqueta:c[1],
                        allowBlank:false,
                        name:"dDbP8_"+c[0],
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
                                var aplic = Ext.getCmp("idDbP8Lantus").getValue()-98;
                                Ext.getCmp('idHidenP8_Lantus').setValue(aplic);
                                if(aplic!=0){
                                    PanelP8.remove("idPanelP9Lantus",true);
                                    PanelP8.add(pregunta9(aplic,"Lantus","idPanelP9Lantus","La"));
                                    PanelP8.doLayout();
                                }else{
                                    PanelP8.remove("idPanelP9Lantus",true);
                                }
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP8_"+c[0],
                        id:"idHidenP8_Lantus",
                        value:"0"
                    });
                }
                if(a[1]=="Shorant"){
                    c=Texto(d[i]).split(",");
                    PanelP8.add(new com.punto.pen.ComboBox({
                        id:"idDbP8Shorant",
                        etiqueta:c[1],
                        allowBlank:false,
                        name:"dDbP8_"+c[0],
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
                                var aplic = Ext.getCmp("idDbP8Shorant").getValue()-98;
                                Ext.getCmp('idHidenP8_Shorant').setValue(aplic);
                                if(aplic!=0){
                                    PanelP8.remove("idPanelP9Shorant",true);
                                    PanelP8.add(pregunta9(aplic,"Shorant","idPanelP9Shorant","Sh"));
                                    PanelP8.doLayout();
                                }else{
                                    PanelP8.remove("idPanelP9Shorant",true);
                                }
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP8_"+c[0],
                        id:"idHidenP8_Shorant",
                        value:"0"
                    });
                }
            }
        }
        PanelP8.add(saltoLinea());
        PanelP8.doLayout();
        return PanelP8;
    }

    function pregunta9(aplic,med,id2,tipo){
        PanelP9 = new Ext.Panel({
            xtype:"panel",
            id:id2,
            border:false,
            layout:"form",
            labelWidth:580,
            items:[{
                    html:"<span style='font-size:12.3px'>9.\t¿Cuantas unidades por aplicacion? &nbsp; &nbsp; " + med + ":</span>",
                    border:false
                },
                saltoLinea()]
        });
        for(var i=0;i<aplic;i++){
            PanelP9.add({
                xtype:"numberfield",
                id:"idDbP9"+tipo+"_"+i,
                fieldLabel:"Aplicación "+(i+1),
                allowBlank:false,
                name:"dbP9"+tipo+"_"+i,
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
        PanelP9.add(saltoLinea());
        return PanelP9;
    }


    function pregunta10_15(){
        var pregunta10_15 =  new Ext.Panel({
            xtype:"panel",
            border:false,
            layout:"form",
            items:[{
                    xtype:"panel",
                    layout:"column",
                    id:"idPanelP10",
                    border:false,
                    items:[
                        {
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            items:[{
                                    html:"<span style='font-size:12.3px'>10.\t¿Cuál es la cifra que su médico le indicó como meta de control  de glucosa en ayunas?</span>",
                                    height:20,
                                    border:false
                                }]
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            labelWidth:90,
                            columnWidth:.4,
                            items:[{
                                    id:"idDbP10a",
                                    xtype:"checkbox",
                                    boxLabel:"No indico",
                                    labelSeparator:"",
                                    name:"dbP10a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP10a"),Ext.getCmp("idDbP10b"));
                                        }
                                    }
                                }
                                ,{
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            labelWidth:90,
                                            columnWidth:.63,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP10b",
                                                    xtype:"numberfield",
                                                    labelSeparator:"",
                                                    name:"dbP10b",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                ValidarAyuno(Ext.getCmp("idDbP10b").getValue(),Ext.getCmp("idDbP10b"));
                                                            }
                                                        },
                                                        'blur':function(){
                                                            ValidarAyuno(Ext.getCmp("idDbP10b").getValue(),Ext.getCmp("idDbP10b"));
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:.15,
                                            layout:"form",
                                            items:[{
                                                    html:"&nbsp x mg/dl",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    id:"idPanelP10_1",
                    items:[{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            items:[{
                                    html:"<span style='font-size:12.3px'>10.1.\t¿Cuál fue su último resultado de glucosa en ayunas?</span>",
                                    height:20,
                                    border:false
                                }]
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            labelWidth:264,
                            columnWidth:.6,
                            items:[{
                                    id:"idDbP10_1a",
                                    xtype:"checkbox",
                                    labelSeparator:"",
                                    boxLabel:"No indico",
                                    name:"dbP10_1a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP10_1a"),Ext.getCmp("idDbP10_1b"));
                                        }
                                    }
                                },
                                {
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            labelWidth:264,
                                            columnWidth:0.76,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP10_1b",
                                                    xtype:"numberfield",
                                                    labelSeparator:"",
                                                    name:"dbP10_1b",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                ValidarAyuno(Ext.getCmp("idDbP10_1b").getValue(),Ext.getCmp("idDbP10_1b"));
                                                            }
                                                        },
                                                        'blur':function(){
                                                            ValidarAyuno(Ext.getCmp("idDbP10_1b").getValue(),Ext.getCmp("idDbP10_1b"));
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:.12,
                                            layout:"form",
                                            items:[{
                                                    html:"&nbsp x mg/dl",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"column",
                    id:"idPanelP11",
                    border:false,
                    items:[{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            items:[{
                                    html:"<span style='font-size:12.3px'>11.\t¿Cuál fue la cifra que su médico le indicó como meta de control de glucosa 2 hrs. después<br> de los alimentos?</span>",
                                    height:45,
                                    border:false
                                }]
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            columnWidth:.37,
                            labelWidth:65,
                            items:[{
                                    id:"idDbP11a",
                                    xtype:"checkbox",
                                    boxLabel:"No indico",
                                    labelSeparator:"",
                                    name:"dbP11a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP11a"),Ext.getCmp("idDbP11b"));
                                        }
                                    }
                                },{
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.6,
                                            labelWidth:65,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP11b",
                                                    xtype:"numberfield",
                                                    labelSeparator:"",
                                                    name:"dbP11b",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                Validar2Horas(Ext.getCmp("idDbP11b").getValue(),Ext.getCmp("idDbP11b"));
                                                            }
                                                        },
                                                        'blur':function(){
                                                            Validar2Horas(Ext.getCmp("idDbP11b").getValue(),Ext.getCmp("idDbP11b"));
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.15,
                                            layout:"form",
                                            items:[{
                                                    html:"&nbsp x mg/dl",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"column",
                    id:"idPanelP11_1",
                    border:false,
                    items:[{
                            html:"<span style='font-size:12.3px'>11.1.\t¿Cuál fue su último resultado de glucosa 2 hrs. después de los alimentos?</span>",
                            height:20,
                            border:false
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            columnWidth:.85,
                            labelWidth:145,
                            items:[{
                                    id:"idDbP11_1a",
                                    labelSeparator:"",
                                    xtype:"checkbox",
                                    boxLabel:"No indico",
                                    name:"dbP11_1a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP11_1a"),Ext.getCmp("idDbP11_1b"));
                                        }
                                    }
                                },{
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.76,
                                            labelWidth:145,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP11_1b",
                                                    xtype:"numberfield",
                                                    labelSeparator:"",
                                                    name:"dbP11_1b",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                Validar2Horas(Ext.getCmp("idDbP11_1b").getValue(),Ext.getCmp("idDbP11_1b"));
                                                            }
                                                        },
                                                        'blur':function(){
                                                            Validar2Horas(Ext.getCmp("idDbP11_1b").getValue(),Ext.getCmp("idDbP11_1b"));
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.15,
                                            layout:"form",
                                            items:[{
                                                    html:"&nbsp x mg/dl",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    id:"idPanelP12",
                    items:[{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            items:[{
                                    html:"<span style='font-size:12.3px'>12.\t¿Cuál fue la cifra que su médico le indicó como meta  de control de hemoglobina glucosilada?</span>",
                                    height:20,
                                    border:false
                                }]
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            columnWidth:.37,
                            labelWidth:50,
                            items:[{
                                    id:"idDbP12a",
                                    xtype:"checkbox",
                                    labelSeparator:"",
                                    boxLabel:"No indico",
                                    name:"dbP12a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP12a"),Ext.getCmp("idDbP12b"));
                                        }
                                    }
                                },{
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            labelWidth:50,
                                            columnWidth:0.58,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP12b",
                                                    xtype:"numberfield",
                                                    name:"dbP12b",
                                                    labelSeparator:"",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                var ht=Ext.getCmp('idDbP12b').getValue();
                                                                if(ht>0.1 && ht<=20.0){}else{
                                                                    Ext.getCmp('idDbP12b').setValue("");
                                                                    Ext.Msg.show({
                                                                        title:'Alerta!!',
                                                                        msg: "Verifique la meta de control de hemoglobina, el valor no es correcto",
                                                                        buttons: Ext.Msg.OK
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        'blur':function(){
                                                            var ht=Ext.getCmp('idDbP12b').getValue();
                                                            if(ht>0.1 && ht<=20.0){}else{
                                                                Ext.getCmp('idDbP12b').setValue("");
                                                                Ext.Msg.show({
                                                                    title:'Alerta!!',
                                                                    msg: "Verifique la meta de control de hemoglobina, el valor no es correcto",
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.15,
                                            layout:"form",
                                            items:[{
                                                    html:" % Hba1c",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"column",
                    border:false,
                    id:"idPanelP12_1",
                    items:[{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            items:[{
                                    html:"<span style='font-size:12.3px'>12.1.\t¿Cuál fue su último resultado de hemoglobina glucosilada?</span>",
                                    height:20,
                                    border:false
                                }]
                        },{
                            xtype:"panel",
                            border:false,
                            layout:"form",
                            labelWidth:230,
                            columnWidth:.55,
                            items:[{
                                    id:"idDbP12_1a",
                                    xtype:"checkbox",
                                    labelSeparator:"",
                                    boxLabel:"No indico",
                                    name:"dbP12_1a",
                                    inputValue:false,
                                    checked:true,
                                    listeners:{
                                        'check':function(){
                                            habilitaText(Ext.getCmp("idDbP12_1a"),Ext.getCmp("idDbP12_1b"));
                                        }
                                    }
                                },{
                                    xtype:"panel",
                                    layout:"column",
                                    border:false,
                                    items:[{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.77,
                                            labelWidth:230,
                                            layout:"form",
                                            items:[{
                                                    id:"idDbP12_1b",
                                                    xtype:"numberfield",
                                                    name:"dbP12_1b",
                                                    labelSeparator:"",
                                                    width:100,
                                                    disabled:true,
                                                    maxLength:5,
                                                    tabIndex:100,
                                                    autoCreate:{
                                                        tag:"input",
                                                        autocomplete:"off",
                                                        maxlength:5
                                                    },
                                                    listeners:{
                                                        'specialkey': function(edTobilloDer, e){
                                                            if (e.keyCode==9 || e.keyCode==13) {
                                                                var ht=Ext.getCmp('idDbP12_1b').getValue();
                                                                if(ht>0.1 && ht<=20.0){}else{
                                                                    Ext.getCmp('idDbP12_1b').setValue("");
                                                                    Ext.Msg.show({
                                                                        title:'Alerta!!',
                                                                        msg: "Verifique el último resultado de hemoglobina, el valor no es correcto",
                                                                        buttons: Ext.Msg.OK
                                                                    });
                                                                }
                                                            }
                                                        },
                                                        'blur':function(){
                                                            var ht=Ext.getCmp('idDbP12_1b').getValue();
                                                            if(ht>0.1 && ht<=20.0){}else{
                                                                Ext.getCmp('idDbP12_1b').setValue("");
                                                                Ext.Msg.show({
                                                                    title:'Alerta!!',
                                                                    msg: "Verifique el último resultado de hemoglobina, el valor no es correcto",
                                                                    buttons: Ext.Msg.OK
                                                                });
                                                            }
                                                        }
                                                    }
                                                }]
                                        },{
                                            xtype:"panel",
                                            border:false,
                                            columnWidth:0.1,
                                            layout:"form",
                                            items:[{
                                                    html:" % Hba1c",
                                                    border:false
                                                }]
                                        }]
                                }
                            ]
                        }]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"form",
                    labelWidth:580,
                    border:false,
                    id:"idPanelP13",
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP13",
                            etiqueta:"13.\t¿Su médico le indicó realizar algún tipo de actividad física?",
                            name:"dbP13",
                            allowBlank:false,
                            prm:{
                                campo:"ActFisica",
                                idCampo:'idActFisica',
                                autoCarga:true,
                                bnd:5,
                                qry:24
                            }
                        })
                    ]
                },saltoLinea(),{
                    id:"idPanelP14",
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    labelWidth:580,
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP14",
                            etiqueta:"14.\t¿Su médico le indicó que realizará algún cambio en su alimentación?",
                            name:"dbP14",
                            allowBlank:false,
                            prm:{
                                campo:"CamAlimentacion",
                                idCampo:'idCamAlimentacion',
                                autoCarga:true,
                                bnd:5,
                                qry:24
                            }
                        })
                    ]
                },saltoLinea(),{
                    xtype:"panel",
                    layout:"form",
                    id:"idPanelP15",
                    border:false,
                    labelWidth:580,
                    items:[
                        new com.punto.pen.ComboBox({
                            id:"idDbP15",
                            etiqueta:"15.\t¿Se ha modificado el número de tabletas / unidades de insulina desde el momento en que inicio este tratamiento?",
                            name:"dbP15",
                            allowBlank:false,
                            prm:{
                                campo:"ModifInsulina",
                                idCampo:'idModifInsulina',
                                autoCarga:true,
                                bnd:5,
                                qry:24
                            }
                        })
                    ]
                },saltoLinea()]
        });
        return pregunta10_15;
    }

    function PregAntP16(){
        var PanelAntP16 =  new Ext.Panel({
            id:"idPanelAntP16",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });
        PanelAntP16.add({
            xtype: 'radiogroup',
            fieldLabel: '¿Como se aplica la Insulina?',
            name:"dbAntP16",
            id:'idDbAntP16',
            columns: 1,
            labelWidth:350,
            items: [{
                    id:'idDbAntP16Si',
                    width:800,
                    boxLabel:'Dispositivo',
                    name:'dbAntP16Si',
                    inputValue:true,
                    checked:true,
                    listeners:{
                        'check':function(){
                            DesRabioNo(Ext.getCmp("idDbAntP16Si"),"idDbAntP16Si","idDbAntP16No");
                        }
                    }
                },

                {
                    id:'idDbAntP16No',
                    boxLabel: 'Jeringa',
                    name:'dbAntP16No',
                    inputValue:true,
                    listeners:{
                        'check':function(){
                            DesRabioSi(Ext.getCmp("idDbAntP16No"),"idDbAntP16Si","idDbAntP16No");
                        }
                    }
                }
            ]
        });
        PanelAntP16.add(saltoLinea());
        PanelAntP16.doLayout();
        return PanelAntP16;
    }

    function Preg16(num,valor){
        var PanelP16 =  new Ext.Panel({
            id:"idPanelP16",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP16.add({
            html:"<span style='font-size:12.3px'>16.\t¿Quién le entrego el dispositivo?</span>",
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
                    PanelP16.add(new com.punto.pen.ComboBox({
                        id:"idDbP16_Lan",
                        etiqueta:c[1],
                        width:120,
                        name:"dbP16_"+c[0],
                        allowBlank:false,
                        prm:{
                            campo:"apLantus",
                            idCampo:'idApLantus',
                            autoCarga:true,
                            bnd:5,
                            qry:66
                        },
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP16_Lan").getValue();
                                Ext.getCmp('idHidenP16_Lantus').setValue(aplic);
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP16_"+c[0],
                        id:"idHidenP16_Lantus",
                        value:"0"
                    });
                }

                if(a[1]=="Shorant"){
                    PanelP16.add(new com.punto.pen.ComboBox({
                        id:"idDbP16_Sho",
                        etiqueta:c[1],
                        width:120,
                        name:"dbP16_"+c[0],
                        allowBlank:false,
                        prm:{
                            campo:"apShorant",
                            idCampo:'idApShorant',
                            autoCarga:true,
                            bnd:5,
                            qry:66
                        },
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP16_Sho").getValue();
                                Ext.getCmp('idHidenP16_Shorant').setValue(aplic);
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP16_"+c[0],
                        id:"idHidenP16_Shorant",
                        value:"0"
                    });
                }
            
            }
        }
        PanelP16.add(saltoLinea());
        PanelP16.doLayout();
        return PanelP16;
    }

    function Preg17(num,valor){
        var PanelP17 =  new Ext.Panel({
            xtype:"panel",
            id:"idPanelP17",
            layout:"form",
            labelWidth:580,
            border:false,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP17.add({
            html:"<span style='font-size:12.3px'>17.\tFecha de entrega del dispositivo</span>",
            height:20,
            border:false
        });
        d = valor.split(",");
        for(var i=0;i<num;i++){
            var valor=VerificarPreg16_19(d[i]);
            if(valor=="si"){
                c=Texto(d[i]).split(",");
                PanelP17.add({
                    xtype:"datefield",
                    id:"idDbP17_"+c[0],
                    fieldLabel:c[1],
                    allowBlank:false,
                    name:"dbP17_"+c[0],
                    emptyText:'dd/mm/yyyy',
                    width:100,
                    autoCreate:{
                        tag:"input",
                        maxlength:10
                    }
                    //                ,enableKeyEvents:true,
                    //                    listeners:{
                    //                        'blur':function(){
                    //                            var valid=ValidarfechaMayor(Ext.getCmp("idDbP17_"+i).getValue());
                    //                            if(valid==false){
                    //                                Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp("idDbP17_"+i).getValue().format('d/m/Y')+") no puede ser menor al día de hoy");
                    //                                Ext.getCmp("idDbP17_"+i).setValue("");
                    //                            }
                    //                        }
                    //                    }
                });
            }
        }
        PanelP17.add(saltoLinea());
        PanelP17.doLayout();
        return PanelP17;
    }


    function Preg18(num,valor){
        var PanelP18 =  new Ext.Panel({
            id:"idPanelP18",
            xtype:"panel",
            layout:"form",
            border:false,
            labelWidth:580,
            items:[]
        });

        var d = new Array();
        var c = new Array();
        PanelP18.add({
            html:"<span style='font-size:12.3px'>18.\t¿Qué tipo de dispositivo le entregaron?</span>",
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
                    PanelP18.add(new com.punto.pen.ComboBox({
                        id:"idDbP18_Lan",
                        etiqueta:c[1],
                        width:120,
                        name:"dbP18_"+c[0],
                        allowBlank:false,
                        prm:{
                            campo:"apLantus",
                            idCampo:'idApLantus',
                            autoCarga:true,
                            bnd:5,
                            qry:52
                        },
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP18_Lan").getValue();
                                Ext.getCmp('idHidenP18_Lantus').setValue(aplic);
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP18_"+c[0],
                        id:"idHidenP18_Lantus",
                        value:"0"
                    });
                }

                if(a[1]=="Shorant"){
                    PanelP18.add(new com.punto.pen.ComboBox({
                        id:"idDbP18_Sho",
                        etiqueta:c[1],
                        name:"dbP18_"+c[0],
                        allowBlank:false,
                        width:120,
                        prm:{
                            campo:"apShorant",
                            idCampo:'idApShorant',
                            autoCarga:true,
                            bnd:5,
                            qry:52
                        },
                        evt:{
                            'select':function(){
                                var aplic = Ext.getCmp("idDbP18_Sho").getValue();
                                Ext.getCmp('idHidenP18_Shorant').setValue(aplic);
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"HidenP18_"+c[0],
                        id:"idHidenP18_Shorant",
                        value:"0"
                    });
                }

            }
        }
        PanelP18.add(saltoLinea());
        PanelP18.doLayout();
        return PanelP18;
    }

    function Preg19(num,valor){
        var PanelP19 =  new Ext.Panel({
            xtype:"panel",
            layout:"form",
            border:false,
            id:"idPanelP19",
            items:[{
                    html:"<span style='font-size:12.3px'>19.\t¿Puede darme el número de lote de su dispositivo?</span>",
                    height:20,
                    border:false
                },{
                    xtype:"panel",
                    border:false,
                    layout:'form',
                    id:'idPanelP19Subfijos',
                    labelWidth:580,
                    items:[]
                }]
        });

        var panel19Sub=Ext.getCmp("idPanelP19Subfijos");
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
                    panel19Sub.add({
                        id:"idDbP19aLan",
                        xtype:"checkbox",
                        fieldLabel:c[1],
                        boxLabel:"No indico",
                        name:"dbP19a_"+c[0],
                        inputValue:false,
                        checked:true,
                        listeners:{
                            'check':function(){
                                habilitaText(Ext.getCmp("idDbP19aLan"),Ext.getCmp("idDbP19bLan"));
                            }
                        }
                    });

                    panel19Sub.add({
                        id:"idDbP19bLan",
                        xtype:"textfield",
                        labelSeparator:"",
                        name:"dbP19b_"+c[0],
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
                    panel19Sub.add({
                        id:"idDbP19aSho",
                        xtype:"checkbox",
                        fieldLabel:c[1],
                        boxLabel:"No indico",
                        name:"dbP19a_"+c[0],
                        inputValue:false,
                        checked:true,
                        listeners:{
                            'check':function(){
                                habilitaText(Ext.getCmp("idDbP19aSho"),Ext.getCmp("idDbP19bSho"));
                            }
                        }
                    });

                    panel19Sub.add({
                        id:"idDbP19bSho",
                        xtype:"textfield",
                        labelSeparator:"",
                        name:"dbP19b_"+c[0],
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
        PanelP19.add(saltoLinea());
        PanelP19.doLayout();
        return PanelP19;
    }

    function Preg20(num,valor){
        var PanelP20 =  new Ext.Panel({
            xtype:"panel",
            layout:"form",
            border:false,
            id:"idPanelP20",
            labelWidth:580,
            items:[
                new com.punto.pen.ComboBox({
                    id:"idDbP20",
                    etiqueta:"20.\t¿Cuántas veces al día se mide sus niveles de glucosa?",
                    name:"dbP20",
                    allowBlank:false,
                    prm:{
                        campo:"NivGlucosa",
                        idCampo:'idNivGlucosa',
                        autoCarga:true,
                        bnd:5,
                        qry:31
                    },
                    evt:{
                        'select':function(){
                            var aplic = Ext.getCmp("idDbP20").getValue();
                            Ext.getCmp('idHidenDbP20').setValue(aplic);
                        }
                    }
                }),{
                    xtype:"hidden",
                    name:"HidenDbP20",
                    id:"idHidenDbP20",
                    value:"0"
                }
            ]
        });
        
        PanelP20.add(saltoLinea());
        PanelP20.doLayout();
        return PanelP20;
    }

    function continuarCuestionarioDiabetes(){
        var panelFormEncuestaDiabete=Ext.getCmp('idFormEncuestaDiabetes');
        var check=Ext.getCmp("idCheckContinuar");
        var idDbP3=Ext.getCmp("idDbP3");

        if(check.getValue()==true){
            if(Ext.getCmp("idDbP3").getValue()!=""){
                //                Ext.MessageBox.alert('¡¡Alerta!!',"La Encuesta se esta generando....");
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
                 
                var valid=validacionProducto(Ext.getCmp("idDbP3").getValue());
                if(valid==""){
                    idDbP3.disable();
                    panelFormEncuestaDiabete.add(PreguntasAdd());
                    panelFormEncuestaDiabete.doLayout();
                }else{
                    Ext.Msg.show({
                        title:'Error de Selección',
                        msg: valid,
                        buttons: Ext.Msg.OK
                    });
                    idDbP3.setValue("");
                    check.check=true;
                    check.setValue(false);
                }
                Ext.getCmp("idCargar").enable();
            }else{
                Ext.Msg.show({
                    title:'Error',
                    msg: '<center>¡Debe seleccionar al menos un medicamento de su receta medica!</center>',
                    buttons: Ext.Msg.OK
                });
                check.check=true;
                check.setValue(false);
            }
        }else if(check.getValue()==false){
            check.check=true;
            check.setValue(false);
            idDbP3.enable();
            Ext.getCmp("idCargar").disable();
            panelFormEncuestaDiabete.remove(Ext.getCmp("idPreguntasRestantes"));
        }
    }

    function PreguntasAdd(){
        var d = new Array();
        d = Ext.getCmp("idDbP3").getValue().split(",");
        var num=d.length;
        
        var PanelPreguntasRestantes =  new Ext.Panel({
            id:'idPreguntasRestantes',
            xtype:"panel",
            border:false,
            layout:"form",
            monitorValid : true,
            items:[
                Preg5(num,Ext.getCmp("idDbP3").getValue()),
                Preg6(num,Ext.getCmp("idDbP3").getValue()),
                Preg7(num,Ext.getCmp("idDbP3").getValue()),
                Preg8(num,Ext.getCmp("idDbP3").getValue()),
                pregunta10_15(),
                PregAntP16(),
                Preg16(num,Ext.getCmp("idDbP3").getValue()),
                Preg17(num,Ext.getCmp("idDbP3").getValue()),
                Preg18(num,Ext.getCmp("idDbP3").getValue()),
                Preg19(num,Ext.getCmp("idDbP3").getValue()),
                Preg20()
            ]
        });
        //        Ext.getCmp("idPanelP16").setVisible(false);       Ext.getCmp("idPanelP17").setVisible(false);
        //        Ext.getCmp("idPanelP18").setVisible(false);       Ext.getCmp("idPanelP19").setVisible(false);
        PregVisible(Ext.getCmp("idDbP3").getValue());
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
        Ext.getCmp("idPanelP5").setVisible(true);
        Ext.getCmp("idPanelP6").setVisible(true);
        Ext.getCmp("idPanelP10").setVisible(true);
        Ext.getCmp("idPanelP10_1").setVisible(true);
        Ext.getCmp("idPanelP11").setVisible(true);
        Ext.getCmp("idPanelP11_1").setVisible(true);
        Ext.getCmp("idPanelP12").setVisible(true);
        Ext.getCmp("idPanelP12_1").setVisible(true);
        Ext.getCmp("idPanelP13").setVisible(true);
        Ext.getCmp("idPanelP14").setVisible(true);
        Ext.getCmp("idPanelP15").setVisible(true);
        Ext.getCmp("idPanelP20").setVisible(true);

        if((varP3>=20 && varP3<=24) || varP3==145 || varP3==146 || varP3==337 || varP3==406 || (varP3>=318 && varP3<=321)
        || varP3 == 483 || varP3 == 484){  //Amaryl, Metamaryl y Mifelar//
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(false);
            Ext.getCmp("idPanelP17").setVisible(false);
            Ext.getCmp("idPanelP18").setVisible(false);
            Ext.getCmp("idPanelP19").setVisible(false);
            Ext.getCmp("idPanelP8").setVisible(false);
            Ext.getCmp("idPanelAntP16").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }
        if(varP3==119 || varP3==218 || varP3==382 || varP3==449){      //Lantus y Shoran
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(false);
            Ext.getCmp("idPanelP17").setVisible(false);
            Ext.getCmp("idPanelP18").setVisible(false);
            Ext.getCmp("idPanelP19").setVisible(false);
            Ext.getCmp("idPanelP7").setVisible(false);
            Ext.getCmp("idPanelAntP16").setVisible(false);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }
        if(varP3==117 || varP3==118 || varP3==120 || varP3==121 ||
            varP3==216 || varP3==217 || varP3==219 || varP3==220 || varP3==324 || varP3==325){    //Lantus y Shoran Cartucho-Solostar
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(true);
            Ext.getCmp("idPanelP17").setVisible(true);
            Ext.getCmp("idPanelP18").setVisible(true);
            Ext.getCmp("idPanelP19").setVisible(true);
            Ext.getCmp("idPanelP7").setVisible(false);
            Ext.getCmp("idPanelAntP16").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }
    }

    function visiblePanelesMult(amary,lantSho,lantShoTod){
        //        alert(amary+","+lantSho+","+lantShoTod);
        Ext.getCmp("idPanelP5").setVisible(true);
        Ext.getCmp("idPanelP6").setVisible(true);
        Ext.getCmp("idPanelP10").setVisible(true);
        Ext.getCmp("idPanelP10_1").setVisible(true);
        Ext.getCmp("idPanelP11").setVisible(true);
        Ext.getCmp("idPanelP11_1").setVisible(true);
        Ext.getCmp("idPanelP12").setVisible(true);
        Ext.getCmp("idPanelP12_1").setVisible(true);
        Ext.getCmp("idPanelP13").setVisible(true);
        Ext.getCmp("idPanelP14").setVisible(true);
        Ext.getCmp("idPanelP15").setVisible(true);
        Ext.getCmp("idPanelP20").setVisible(true);

        if(amary>1 && lantSho>1 && lantShoTod>1){
            //            alert(1);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(true);
            Ext.getCmp("idPanelP17").setVisible(true);
            Ext.getCmp("idPanelP18").setVisible(true);
            Ext.getCmp("idPanelP19").setVisible(true);
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idPanelAntP16").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary==1 && lantSho>1 && lantShoTod>1){
            //            alert(2);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(true);
            Ext.getCmp("idPanelP17").setVisible(true);
            Ext.getCmp("idPanelP18").setVisible(true);
            Ext.getCmp("idPanelP19").setVisible(true);
            Ext.getCmp("idPanelP7").setVisible(false);
            Ext.getCmp("idPanelAntP16").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary>1 && lantSho==1 && lantShoTod>1){
            //            alert(3);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelP16").setVisible(true);
            Ext.getCmp("idPanelP17").setVisible(true);
            Ext.getCmp("idPanelP18").setVisible(true);
            Ext.getCmp("idPanelP19").setVisible(true);
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idPanelAntP16").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(1);
        }else if(amary>1 && lantSho>1 && lantShoTod==1){
            //            alert(4);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelAntP16").setVisible(false);
            Ext.getCmp("idPanelP16").setVisible(false);
            Ext.getCmp("idPanelP17").setVisible(false);
            Ext.getCmp("idPanelP18").setVisible(false);
            Ext.getCmp("idPanelP19").setVisible(false);
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }else if(amary>1 && lantSho==1 && lantShoTod==1){
            //            alert(5);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelAntP16").setVisible(false);
            Ext.getCmp("idPanelP16").setVisible(false);
            Ext.getCmp("idPanelP17").setVisible(false);
            Ext.getCmp("idPanelP18").setVisible(false);
            Ext.getCmp("idPanelP19").setVisible(false);
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(0);
        }else if(amary==1 && lantSho>1 && lantShoTod==1){
            //            alert(6);
            Ext.getCmp("idPanelP8").setVisible(true);
            Ext.getCmp("idPanelAntP16").setVisible(false);
            Ext.getCmp("idPanelP16").setVisible(false);
            Ext.getCmp("idPanelP17").setVisible(false);
            Ext.getCmp("idPanelP18").setVisible(false);
            Ext.getCmp("idPanelP19").setVisible(false);
            Ext.getCmp("idPanelP7").setVisible(true);
            Ext.getCmp("idHidenDispositivo").setValue(0);
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
    
    function VisibleCombo(text){
        text.setVisible(false);
        text.allowBlank=true;
    }

    function Validar2Horas(val,text){
        if(val>=50.0 && val<=800.0){}else{
            Ext.Msg.show({
                title:'Alerta!!',
                msg: "El valor de la Glucosa 2 horas despues de los alimentos no es valido verifique...",
                buttons: Ext.Msg.OK
            });
            text.setValue("");
        }
    }
    function ValidarAyuno(val,text){
        if(val>=30.0 && val<=800.0){}else{
            Ext.Msg.show({
                title:'Alerta!!',
                msg: "El valor de la Glucosa en ayuno no es valido verifique...",
                buttons: Ext.Msg.OK
            });
            text.setValue("");
        }
    }

}
function getSelectP(idP,valores,select){
    var p=Ext.getCmp(idP);
    p.store.loadData(valores,false);
    p.setValue(select);
    var idDbP1=Ext.getCmp("idDbP1");
    var idDbP2=Ext.getCmp("idDbP2");
    var idDbP3=Ext.getCmp("idDbP3");
    var idDbP4=Ext.getCmp("idDbP4");
    var checkCon=Ext.getCmp('idCheckContinuar');
    idDbP1.disable();
    idDbP2.disable();
    idDbP3.disable();
    idDbP4.disable();
    checkCon.check=true;
    checkCon.setValue(true);
    checkCon.disable();
}

function getSelectLoad(idP,valores,select){
    var p=Ext.getCmp(idP);
    p.store.loadData(valores,true);
    p.setValue(select);
    var checkCon=Ext.getCmp('idCheckContinuar');
    checkCon.check=true;
    checkCon.setValue(true);
}

function DesRabioNo(check,preg1,preg2){
    if(check.getValue()==true){
        Ext.getCmp(preg1).check=true;
        Ext.getCmp(preg2).setValue(false);
        Ext.getCmp("idPanelP16").setVisible(true);
        Ext.getCmp("idPanelP17").setVisible(true);
        Ext.getCmp("idPanelP18").setVisible(true);
        Ext.getCmp("idPanelP19").setVisible(true);
        Ext.getCmp("idHidenDispositivo").setValue(1);
    }
}
function DesRabioSi(check,preg1,preg2){
    if(check.getValue()==true){
        Ext.getCmp(preg2).check=true;
        Ext.getCmp(preg1).setValue(false);
        Ext.getCmp("idPanelP16").setVisible(false);
        Ext.getCmp("idPanelP17").setVisible(false);
        Ext.getCmp("idPanelP18").setVisible(false);
        Ext.getCmp("idPanelP19").setVisible(false);
        Ext.getCmp("idHidenDispositivo").setValue(1);
    }
}


///////////////////////////////  ********** grid de historial de encuaste *************

com.punto.pen.PanelGridEncuaesta = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.url = (argumentos.url==null ? '' : argumentos.url);
    var titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '' : argumentos.idCnt);
    
    var storeBuscadorEncuaesta = new Ext.data.GroupingStore({
        autoLoad: false,
        baseParams: {
            bnd:8,
            'idCnt':idCnt
        },
        reader :new Ext.data.JsonReader( {
            totalProperty: 'total',
            root :'records',
            idProperty: 'id'
        },new com.punto.pen.RecordBuscadorEncuaestaDts()),
        proxy :new Ext.data.HttpProxy( {
            url : contexto+'/Diabetes?bnd=8',
            timeout:180000
        })
        //        ,
        //        sortInfo:{
        //            field: 'idEncuaesta',
        //            direction: "DESC"
        //        },
        //        groupField:'idEncuaesta'
    });

    var pbarBuscarEncuaesta = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : storeBuscadorEncuaesta,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Encuesta de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });

    var panelGridEncuaesta= new Ext.Panel({
        bodyStyle: "padding:5px 5px 0",
        region: this.reg,
        border:false,
        url: this.url,
        height: 420,
        autoHeight: this.autoAlto,
        autoScroll: (!this.autoAlto),
        id: "idPanelGridsEncuaesta",
        layout:"accordion",
        frame: true,
        anchor:"100%",
        items:[new Ext.grid.GridPanel({
                id              : "gridEncuaestaGeneral",
                title  : "Encuestas",
                region          :'center',
                iconCls:'icn-detalles',
                columnWidth     : 0.7,
                height          : 345,
                store           : storeBuscadorEncuaesta,
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
                bbar            : pbarBuscarEncuaesta,
                columns         :  [
                    new Ext.grid.RowNumberer(),
                    {
                        id:'idEncuaesta',
                        header: "Folio Encuesta",
                        width: 50,
                        sortable: true,
                        dataIndex: 'idEncuaesta'
                    },

                    {
                        header: "Tipo de diabetes",
                        width: 70,
                        sortable: true,
                        dataIndex: 'p1'
                    },

                    {
                        header: "Médico entrego receta",
                        width: 75,
                        sortable: true,
                        dataIndex: 'p2'
                    },

                    {
                        header: "Medicamentos incluidos en receta",
                        width:120,
                        sortable: true,
                        dataIndex: 'p3'
                    },

                    {
                        header: "Medicamentos que toma de más",
                        width:120,
                        sortable: true,
                        dataIndex: 'p4'
                    },

                    {
                        header: "Fecha Encuesta",
                        width: 50,
                        sortable: true,
                        dataIndex: 'fechaEncuesta'
                    }],
                listeners: {
                    'rowdblclick':function(grid){
                        var mns=GridEncuestaColores(grid);
                        var mns2=GridEncuestaSinColores(grid);
                        var wnd = new Ext.Window({
                            title:'Detalle Encuesta',
                            width:700,
                            height:450,
                            constrainHeader :true,
                            constrain :true,
                            modal:true,
                            border:false,
                            draggable:true,
                            resizable:false,
                            bodyStyle:"padding: 1px;font-family:Arial;font-size:11px;",
                            region : 'center',
                            iconCls:'icn-warning',
                            autoScroll: true,
                            layout:"form",
                            anchor:"100%",
                            items:[{
                                    border:false,
                                    html:"<div id='idEncuestaDet2'></div>"
                                }]
                        });
                        wnd.show();
                        document.getElementById("idEncuestaDet2").innerHTML = mns2;
                        document.getElementById("idEncuestaDet").innerHTML = mns;
                    }
                }
            })
            ,
            new Ext.Panel({
                id     : "PanelEncuaestaPreguntas",
                title  : "Ver Detalle",
                region : 'center',
                bodyStyle: "padding:5px 5px 0",
                border:false,
                height: 420,
                iconCls:'icn-warning',
                autoScroll: true,
                layout:"form",
                anchor:"100%",
                items:[{
                        border:false,
                        html:"<div id='idEncuestaDet'></div>"
                    }]
            })

        ]
    });

    return panelGridEncuaesta;
}

function getHistorialEncuasta(idCnt){
    var formEstudio = new com.punto.pen.PanelGridEncuaesta({
        id:'pnlGeneralEstudios',
        url:contexto+'/Diabetes',
        'idCnt':idCnt,
        bnd:8
    });

    var grd = Ext.getCmp('gridEncuaestaGeneral');
    var store = grd.getStore();

    var wnd = new  Ext.Window({
        id:'idEncuaestaGeneralesSelect',
        width:1000,
        height:500,
        constrainHeader :true,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        resizable:false,
        bodyStyle: 'padding:5px;',
        title:'Detalle Encuestas',
        items:[
            formEstudio
        ],
        buttons:[{
                text:'Salir',
                handler:function(){
                    wnd.close();
                }
            }]
    });
    wnd.show();
    store.load({
        params:{
            start:0,
            limit:20
        }
    });

    document.getElementById("idEncuestaDet").innerHTML = "<br><br><center><b style='color:red;'>Seleccione una Encuesta para ver su detalle.<br>Para ello de 2 Clicks en la Encuesta.</b></center>";
}

function GridEncuestaColores(grid){
    var mns= "<table width='48%' border='0' cellpadding='0' cellspacing='0' align='center'>"
        +"  <tr>"
        +"    <td colspan='5' align='center' style='font-weight: bold;'>Medicamentos (Colores Representativos)</td>"
        +"  </tr>"
        +"  <tr>"
        +"    <td bgcolor='#FFFF00' height='20' align='center'>&nbsp;Amaryl&nbsp;</td>"
        +"    <td bgcolor='#66CC00' height='20' align='center' style='color:#FFF'>&nbsp;Metamaryl&nbsp;</td>"
        +"    <td bgcolor='#3399FF' height='20' align='center' style='color:#FFF'>&nbsp;Lantus&nbsp;</td>"
        +"    <td bgcolor='#FF3300' height='20' align='center' style='color:#FFF'>&nbsp;Shorant&nbsp;</td>"
        +"    <td bgcolor='#8C32FA' height='20' align='center' style='color:#FFF'>Lantus/Shorant (Cartucho o Solostar)</td>"
        +"  </tr>"
        +"</table>"
        +"<br>"
        +"<center><b style='color:red;'>Folio Encuesta: </b><b style='color:#0C0204;'>"+ grid.getSelectionModel().getSelected().get('idEncuaesta')+ "</b> &nbsp; &nbsp; &nbsp; &nbsp; <b style='color:red;'>Fecha Encuesta: </b><b style='color:#0C0204;'>"+grid.getSelectionModel().getSelected().get('fechaEncuesta')+"</b></center>"
        +"<br>"
        +"<table width='100%' border='0' align='center'>"
        +"  <tr>"
        +"    <td style='font-weight: bold;' align='center'>Preguntas</td>"
        +"    <td style='font-weight: bold;' align='center'>Medicamento que aplica:</td>"
        +"  </tr>"
        +"  <tr>"
        +"    <td>1 <b style='color:#0C0204;'>¿Usted sabe qué tipo de diabetes tiene?</b><br>"+ grid.getSelectionModel().getSelected().get('p1')+ "<br><br></td>"
        +"    <td align='center'>No aplica<br></td>"
        +"  </tr>"
        +"  <tr>"
        +"    <td>2 <b style='color:#0C0204;'>¿Su médico le entrego una receta médica?</b><br>"+ grid.getSelectionModel().getSelected().get('p2')+ "<br><br></td>"
        +"    <td align='center'>No aplica<br></td>"
        +"  </tr>"
        +"  <tr>"
        +"  <td>3 <b style='color:#0C0204;'>¿Qué medicamento están incluidos en su receta médica?</b><br>"+ grid.getSelectionModel().getSelected().get('p3')+ "<br><br></td>"
        +"  <td align='center'>No aplica<br></td>"
        +" </tr>"

    //    +"  <tr>"
    //    +"  <td> <b style='color:#0C0204;'>¿Qué le diagnosticó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p22')+ "<br><br></td>"
    //    +"  <td align='center'>No aplica<br></td>"
    //    +" </tr>"

        +" <tr>"
        +"   <td>4 <b style='color:#0C0204;'>¿Que medicamentos toma usted ademas de los incluidos en su receta?</b><br>"+ grid.getSelectionModel().getSelected().get('p4')+ "<br><br></td>"
        +"   <td align='center'>No aplica<br></td>"
        +" </tr>";

    //    +"  <tr>"
    //    +"  <td> <b style='color:#0C0204;'>¿Qué le diagnosticó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p23')+ "<br><br></td>"
    //    +"  <td align='center'>No aplica<br></td>"
    //    +" </tr>";
    if(grid.getSelectionModel().getSelected().get('p5')!="X"){
        mns+=" <tr>"
            +"<td>5 <b style='color:#0C0204;'>¿Cuánto tiempo lleva tomando este medicamento?</b><br>"+ grid.getSelectionModel().getSelected().get('p5')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>6 <b style='color:#0C0204;'>¿Durante qué tiempo llevará este tratamiento?</b><br>"+ grid.getSelectionModel().getSelected().get('p6')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>";
        if(grid.getSelectionModel().getSelected().get('p7')!=""){
            mns+=" <tr>"
                +"<td>7 <b style='color:#0C0204;'>¿Cuántas tabletas le indicó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p7')+ "<br></td>"
                +"   <td><table width='100%' border='0'>"
                +"     <tr>"
                +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
                +"       <td bgcolor='#66CC00'>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"     </tr>"
                +"   </table></td>"
                +" </tr>";
        }
        if( grid.getSelectionModel().getSelected().get('p8')!=""){
            mns+=" <tr>"
                +"   <td>8 <b style='color:#0C0204;'>¿Cuántas aplicaciones de insulina se realiza al día?</b><br>"+ grid.getSelectionModel().getSelected().get('p8')+ "<br></td>"
                +"   <td><table width='100%' border='0'>"
                +"     <tr>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td bgcolor='#3399FF'>&nbsp;</td>"
                +"       <td bgcolor='#FF3300'>&nbsp;</td>"
                +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                +"     </tr>"
                +"   </table></td>"
                +" </tr>"
                +" <tr>"
                +"   <td>9 <b style='color:#0C0204;'>¿Cuantas unidades por aplicacion?</b><br>"+ grid.getSelectionModel().getSelected().get('p9')+ "<br></td>"
                +"   <td><table width='100%' border='0'>"
                +"     <tr>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td bgcolor='#3399FF'>&nbsp;</td>"
                +"       <td bgcolor='#FF3300'>&nbsp;</td>"
                +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                +"     </tr>"
                +"   </table></td>"
                +" </tr>";
        }
        mns+=" <tr>"
            +"   <td>10 <b style='color:#0C0204;'>¿Cuál es la cifra que su médico le indicó como meta de control de glucosa en ayunas?</b><br>"+ grid.getSelectionModel().getSelected().get('p10')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>10.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de glucosa en ayunas?</b><br>"+ grid.getSelectionModel().getSelected().get('p10_1')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>11 <b style='color:#0C0204;'>¿Cuál fue la cifra que su médico le indicó como meta de control de glucosa 2 hrs. después de los alimentos?</b><br>"+ grid.getSelectionModel().getSelected().get('p11')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>11.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de glucosa 2 hrs. después de los alimentos?</b><br>"+ grid.getSelectionModel().getSelected().get('p11_1')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>12 <b style='color:#0C0204;'>¿Cuál fue la cifra que su médico le indicó como meta de control de hemoglobina glucosilada?</b><br>"+ grid.getSelectionModel().getSelected().get('p12')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>12.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de hemoglobina glucosilada?</b><br>"+ grid.getSelectionModel().getSelected().get('p12_1')+ "<br><br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>13 <b style='color:#0C0204;'>¿Su médico le indicó realizar algún tipo de actividad física?</b><br>"+ grid.getSelectionModel().getSelected().get('p13')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>14 <b style='color:#0C0204;'>¿Su médico le indicó que realizará algún cambio en su alimentación?</b><br>"+ grid.getSelectionModel().getSelected().get('p14')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>15 <b style='color:#0C0204;'>¿Se ha modificado el número de tabletas/unidades de insulina desde el momento en que inicio este tratamiento?</b><br>"+ grid.getSelectionModel().getSelected().get('p15')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>";
        if(grid.getSelectionModel().getSelected().get('dispositivo')!=""){
            mns+=" <tr>"
                +"   <td><b style='color:#0C0204;'>¿Como se aplica la Insulina?</b><br>"+ grid.getSelectionModel().getSelected().get('dispositivo')+ "<br></td>"
                +"   <td><table width='100%' border='0'>"
                +"     <tr>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td>&nbsp;</td>"
                +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                +"     </tr>"
                +"   </table></td>"
                +" </tr>";
            if(grid.getSelectionModel().getSelected().get('dispositivo')=="Dispositivo<br>"){
                mns+=" <tr>"
                    +"   <td>16 <b style='color:#0C0204;'>¿Quién le entrego el dispositivo?</b><br>"+ grid.getSelectionModel().getSelected().get('p16')+ "<br></td>"
                    +"   <td><table width='100%' border='0'>"
                    +"     <tr>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                    +"     </tr>"
                    +"   </table></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>17 <b style='color:#0C0204;'>Fecha de entrega del dispositivo</b><br>"+ grid.getSelectionModel().getSelected().get('p17')+ "<br></td>"
                    +"   <td><table width='100%' border='0'>"
                    +"     <tr>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                    +"     </tr>"
                    +"   </table></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>18 <b style='color:#0C0204;'>¿Qué tipo de dispositivo le entregaron?</b><br>"+ grid.getSelectionModel().getSelected().get('p18')+ "<br></td>"
                    +"   <td><table width='100%' border='0'>"
                    +"     <tr>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                    +"     </tr>"
                    +"   </table></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>19 <b style='color:#0C0204;'>¿Puede darme el número de lote de su dispositivo?</b><br>"+ grid.getSelectionModel().getSelected().get('p19')+ "<br></td>"
                    +"   <td><table width='100%' border='0'>"
                    +"     <tr>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td>&nbsp;</td>"
                    +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
                    +"     </tr>"
                    +"   </table></td>"
                    +" </tr>";
            }
        }
        mns+=" <tr>"
            +"   <td>20 <b style='color:#0C0204;'>¿Cuántas veces al día se mide sus niveles de glucosa?</b><br>"+ grid.getSelectionModel().getSelected().get('p20')+ "<br></td>"
            +"   <td><table width='100%' border='0'>"
            +"     <tr>"
            +"       <td bgcolor='#FFFF00'>&nbsp;</td>"
            +"       <td bgcolor='#66CC00'>&nbsp;</td>"
            +"       <td bgcolor='#3399FF'>&nbsp;</td>"
            +"       <td bgcolor='#FF3300'>&nbsp;</td>"
            +"       <td bgcolor='#8C32FA'>&nbsp;</td>"
            +"     </tr>"
            +"   </table></td>"
            +" </tr>"
            +"</table>";
    }else{

        mns+="<tr>"
            +"   <td colspan='2' align='center'><br><b style='color:red;'>Pendiente por contestar</b><br><br><br></td>"
            +" </tr>"
            +"</table>";
    }
    return mns;
}

function GridEncuestaSinColores(grid){

    var mns="<center><b style='color:0C0204;'>Preguntas</b></center><br>"
        +"<table width='100%' border='0' align='center'>"
        +"  <tr>"
        +"    <td style='font-weight: bold;' align='center'><b style='color:red;'>Folio Encuesta: </b><b style='color:#0C0204;'>"+ grid.getSelectionModel().getSelected().get('idEncuaesta')+ "</b> &nbsp; &nbsp; &nbsp; &nbsp; <b style='color:red;'>Fecha Encuesta: </b><b style='color:#0C0204;'>"+grid.getSelectionModel().getSelected().get('fechaEncuesta')+"</b></td>"
        +"  </tr>"
        +"  <tr>"
        +"    <td>1 <b style='color:#0C0204;'>¿Usted sabe qué tipo de diabetes tiene?</b><br>"+ grid.getSelectionModel().getSelected().get('p1')+ "<br><br></td>"
        +"  </tr>"
        +"  <tr>"
        +"    <td>2 <b style='color:#0C0204;'>¿Su médico le entrego una receta médica?</b><br>"+ grid.getSelectionModel().getSelected().get('p2')+ "<br><br></td>"
        +"  </tr>"
        +"  <tr>"
        +"  <td>3 <b style='color:#0C0204;'>¿Qué medicamento están incluidos en su receta médica?</b><br>"+ grid.getSelectionModel().getSelected().get('p3')+ "<br><br></td>"
        +" </tr>"
    //    +"  <tr>"
    //    +"  <td> <b style='color:#0C0204;'>¿Qué le diagnosticó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p22')+ "<br><br></td>"
    //    +" </tr>"
        +" <tr>"
        +"   <td>4 <b style='color:#0C0204;'>¿Que medicamentos toma usted ademas de los incluidos en su receta?</b><br>"+ grid.getSelectionModel().getSelected().get('p4')+ "<br><br></td>"
        +" </tr>";
    //    +"  <tr>"
    //    +"  <td> <b style='color:#0C0204;'>¿Qué le diagnosticó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p23')+ "<br><br></td>"
    //    +" </tr>";
    if(grid.getSelectionModel().getSelected().get('p5')!="X"){
        mns+=" <tr>"
            +"<td>5 <b style='color:#0C0204;'>¿Cuánto tiempo lleva tomando este medicamento?</b><br>"+ grid.getSelectionModel().getSelected().get('p5')+ "<br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>6 <b style='color:#0C0204;'>¿Durante qué tiempo llevará este tratamiento?</b><br>"+ grid.getSelectionModel().getSelected().get('p6')+ "<br></td>"
            +" </tr>"
        if(grid.getSelectionModel().getSelected().get('p7')!=""){
            mns+="<tr>"
                +"<td>7 <b style='color:#0C0204;'>¿Cuántas tabletas le indicó su médico?</b><br>"+ grid.getSelectionModel().getSelected().get('p7')+ "<br></td>"
                +" </tr>";
        }
        if( grid.getSelectionModel().getSelected().get('p8')!=""){
            mns+=" <tr>"
                +"   <td>8 <b style='color:#0C0204;'>¿Cuántas aplicaciones de insulina se realiza al día?</b><br>"+ grid.getSelectionModel().getSelected().get('p8')+ "<br></td>"
                +" </tr>"
                +" <tr>"
                +"   <td>9 <b style='color:#0C0204;'>¿Cuantas unidades por aplicacion?</b><br>"+ grid.getSelectionModel().getSelected().get('p9')+ "<br></td>"
                +" </tr>";
        }
        mns+=" <tr>"
            +"   <td>10 <b style='color:#0C0204;'>¿Cuál es la cifra que su médico le indicó como meta de control de glucosa en ayunas?</b><br>"+ grid.getSelectionModel().getSelected().get('p10')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>10.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de glucosa en ayunas?</b><br>"+ grid.getSelectionModel().getSelected().get('p10_1')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>11 <b style='color:#0C0204;'>¿Cuál fue la cifra que su médico le indicó como meta de control de glucosa 2 hrs. después de los alimentos?</b><br>"+ grid.getSelectionModel().getSelected().get('p11')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>11.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de glucosa 2 hrs. después de los alimentos?</b><br>"+ grid.getSelectionModel().getSelected().get('p11_1')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>12 <b style='color:#0C0204;'>¿Cuál fue la cifra que su médico le indicó como meta de control de hemoglobina glucosilada?</b><br>"+ grid.getSelectionModel().getSelected().get('p12')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>12.1 <b style='color:#0C0204;'>¿Cuál fue su último resultado de hemoglobina glucosilada?</b><br>"+ grid.getSelectionModel().getSelected().get('p12_1')+ "<br><br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>13 <b style='color:#0C0204;'>¿Su médico le indicó realizar algún tipo de actividad física?</b><br>"+ grid.getSelectionModel().getSelected().get('p13')+ "<br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>14 <b style='color:#0C0204;'>¿Su médico le indicó que realizará algún cambio en su alimentación?</b><br>"+ grid.getSelectionModel().getSelected().get('p14')+ "<br></td>"
            +" </tr>"
            +" <tr>"
            +"   <td>15 <b style='color:#0C0204;'>¿Se ha modificado el número de tabletas/unidades de insulina desde el momento en que inicio este tratamiento?</b><br>"+ grid.getSelectionModel().getSelected().get('p15')+ "<br></td>"
            +" </tr>";
        if(grid.getSelectionModel().getSelected().get('dispositivo')!=""){
            mns+=" <tr>"
                +"   <td><b style='color:#0C0204;'>¿Como se aplica la Insulina?</b><br>"+ grid.getSelectionModel().getSelected().get('dispositivo')+ "<br></td>"
                +" </tr>";
            if(grid.getSelectionModel().getSelected().get('dispositivo')=="Dispositivo<br>"){
                mns+=" <tr>"
                    +"   <td>16 <b style='color:#0C0204;'>¿Quién le entrego el dispositivo?</b><br>"+ grid.getSelectionModel().getSelected().get('p16')+ "<br></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>17 <b style='color:#0C0204;'>Fecha de entrega del dispositivo</b><br>"+ grid.getSelectionModel().getSelected().get('p17')+ "<br></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>18 <b style='color:#0C0204;'>¿Qué tipo de dispositivo le entregaron?</b><br>"+ grid.getSelectionModel().getSelected().get('p18')+ "<br></td>"
                    +" </tr>"
                    +" <tr>"
                    +"   <td>19 <b style='color:#0C0204;'>¿Puede darme el número de lote de su dispositivo?</b><br>"+ grid.getSelectionModel().getSelected().get('p19')+ "<br></td>"
                    +" </tr>";
            }
        }
        mns+=" <tr>"
            +"   <td>20 <b style='color:#0C0204;'>¿Cuántas veces al día se mide sus niveles de glucosa?</b><br>"+ grid.getSelectionModel().getSelected().get('p20')+ "<br><br></td>"
            +" </tr>"
            +"</table><br>";
    }else{

        mns+="<tr>"
            +"   <td colspan='2' align='center'><br><b style='color:red;'>Pendiente por contestar</b><br><br><br></td>"
            +" </tr>"
            +"</table>";
    }
    return mns;
}