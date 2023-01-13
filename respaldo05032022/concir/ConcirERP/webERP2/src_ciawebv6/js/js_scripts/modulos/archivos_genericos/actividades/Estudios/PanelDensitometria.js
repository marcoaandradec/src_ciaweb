Ext.ns("com.punto.pen");

com.punto.pen.PanelDensitometria= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var PanelDensitometria =  new Ext.Panel({
        id:'idPanelDensitometria',
        xtype:"panel",
        layout:"form",
        labelAlign:"top",
        border:false,
        items:[ {
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",2,\"Densitometria\",\"Estudio Densitometria\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            //         "<u><a onClick='Prueba(" + idCnt + ")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>subir</a></u>",
            Height:20,
            border:false
        },
        {
            xtype:"panel",
            layout:"form",
            border:false,
            items:[{
                xtype:"fieldset",
                title:"Información",
                autoHeight:true,
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Nombre",
                    name:"dntNombre",
                    width:210,
                    readOnly:true
                }]
            },{
                xtype:"fieldset",
                title:"Resultados",
                autoHeight:true,
                layout:"column",
                collapsed:false,
                collapsible:false,
                items:[{
                    xtype:"panel",
                    columnWidth:0.5,
                    border:false,
                    autoHeight:false,
                    layout:"form",
                    items:[{
                        xtype:"datefield",
                        fieldLabel:"Fecha Estudio",
                        name:"dntFecha",
                        id:"iddntFecha",
                        emptyText:'dd/mm/yyyy',
                        allowBlank:false,
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha(Ext.getCmp('iddntFecha').getValue());
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('iddntFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                    Ext.getCmp('iddntFecha').setValue("");
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
                    },{
                        height:10,
                        border:false
                    },{
                        xtype:"textfield",
                        name:"dntResultadoDnt",
                        id:'iddntResultadoDnt',
                        width:200,
                        allowBlank:false,
                        hideLabel:true,
                        style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                        readOnly:true
                
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.3,
                    layout:"form",
                    border:false,
                    autoHeight:false,
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Resultado T-Score",
                        id:"iddntTScore",
                        name:"dntTScore",
                        allowBlank:false,
                        autoCreate:{
                            tag:"input",
                            maxlength:5
                        },
                        enableKeyEvents:true,
                        listeners:{
                            'keypress':function(txtField,e){
                                if((e.getKey()>=45 && e.getKey()<=57) || e.getKey()==9 || e.getKey()==8){}else{
                                    e.stopEvent();
                                }
                            },
                            'specialkey': function(edTobilloDer, e){
                                if (e.keyCode==9 || e.keyCode==13) {
                                    clickEvaluaTscoreHuesos();
                                }
                            },
                            'blur':function(){
                                clickEvaluaTscoreHuesos();
                            }
                        }               
                    }]
                }]
            }]
        },{
            xtype:"fieldset",
            autoHeight:true,
            items:[{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '¿Toma un Medicamento para sus Huesos?',
                    name:"dntboxPreg",
                    id:'iddntboxPreg',
                    allowBlank:false,
                    columns: 2,
                    items: [
                    {
                        id:'iddntPg1',
                        boxLabel: 'Si',
                        name: 'dntPg1',
                        inputValue:true,
                        listeners:{
                            'check':function(){
                                comboLoadHabilitaHuesos(Ext.getCmp("iddntPg1"));
                            }
                        }
                    },
                    {
                        id:'iddntPg2',
                        boxLabel: 'No',
                        name: 'dntPg2',
                        inputValue:true,
                        listeners:{
                            'check':function(){
                                comboLoadDesabilitaHuesos(Ext.getCmp("iddntPg2"));
                            }
                        }
                    }]
                }
                ]

            }]
        }]
    });

    var fieldSetDensitometriaMedicamentos= new Ext.form.FieldSet({
        xtype:"fieldset",
        title:"Medicamentos",
        height:120,
        id:"iddntMedicamentos",
        items:[{
            xtype:"panel",
            layout:"form",
            border:false,
            height:110,
            hideLabels:true,
            items:[{
                xtype:"multiselect",
                id:"iddntMediHuesos",
                name:"dntMediHuesos",
                dataFields:["idMedi", "Medicamentos"],
                store:new com.punto.pen.StoreCombo({
                    prm:{
                        idCampo:'idMedi',
                        campo:'Medicamentos',
                        'bnd':14,
                        qry:35,
                        autoCarga:true,
                        url:contexto+'/ComboLoader'
                    }
                }),
                valueField:"idMedi",
                displayField:"Medicamentos",
                width:200,
                height:82,
                legend:"Seleccione"
            }
            //                ,{
            //                border:false,
            //                id:'iddntMediHuesos',
            //                autoLoad:{
            //                    url:contexto+'/Densitometria',
            //                    params:{
            //                        bnd:3,
            //                        name:'dntMedicaHus',
            //                        ancho:300,
            //                        func:"SelectMediHues(this);"
            //                    },
            //                    text:'Cargando lista de medicamentos...'
            //                }
            //            },{
            //                xtype:"hidden",
            //                name:"hideDntMedicaHus",
            //                id:'idHideDntMedicaHus',
            //                value:"0"
            //            }
            ]
        }
        ]
    });

    var panelFormDensitometria= new Ext.FormPanel({
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

    this.crearFichaDensitometria = function(){
        panelFormDensitometria.add(PanelDensitometria);
        panelFormDensitometria.add(fieldSetDensitometriaMedicamentos);
        panelFormDensitometria.doLayout();
        Ext.getCmp("iddntMedicamentos").setVisible(false);
        return panelFormDensitometria;
    }

    function comboLoadHabilitaHuesos(check){
        if(check.getValue()==true){
            Ext.getCmp("iddntPg1").check=true;
            Ext.getCmp("iddntPg2").setValue(false);
            Ext.getCmp("iddntMedicamentos").setVisible(true);
            Ext.getCmp("iddntMediHuesos").allowBlank=false;
        } else if(check.getValue()==false){
            Ext.getCmp("iddntMedicamentos").setVisible(false);
            Ext.getCmp("iddntMediHuesos").allowBlank=true;
        //            Ext.getCmp("iddntMedicamentos").hideLabel=true;
        }
    }
    function comboLoadDesabilitaHuesos(check){
        if(check.getValue()==true){
            Ext.getCmp("iddntPg2").check=true;
            Ext.getCmp("iddntPg1").setValue(false);
            Ext.getCmp("iddntMedicamentos").setVisible(false);
            Ext.getCmp("iddntMediHuesos").allowBlank=true;
            Ext.getCmp("iddntMedicamentos").hideLabel=true;
        }
    }

    function clickEvaluaTscoreHuesos(){
        var frm = Ext.getCmp(idPnl).getForm();
        var Mns="";
        if(frm.findField('dntTScore').getValue()!=""){
            var TScore = Ext.getCmp('iddntTScore').getValue();
            Mns=EvaluaHuesosTscore(TScore);
            Ext.getCmp('iddntResultadoDnt').setValue(Mns);
        }
        if(frm.findField('dntTScore').getValue()==""){
            Ext.getCmp('iddntResultadoDnt').setValue("");
        }
    }

    function EvaluaHuesosTscore(val1){
        var mensaje="";
        var val=parseFloat(val1);
        if(val>=-1.0 && val<=5.0){
            mensaje="Normal";
        }else if(val<=-1.1 && val>=-2.5){
            mensaje="OSTEOPENIA";
        }else if(val<=-2.6 && val>=-9.5){
            mensaje="OSTEOPOROSIS";
        }else {
            mensaje="INCORRECTO VERIFIQUE";
            Ext.getCmp('iddntTScore').setValue("");
            Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
        }
        return mensaje;
    }
}

//function SelectMediHues(obj){
//    var arrIn="";
//     arrIn = new Array();
//    for(var i=0;i<obj.length;i++){
//        if(obj[i].selected==true){
//            arrIn.push(obj[i].value);
//        }
//    }
//
//   Ext.getCmp('idHideDntMedicaHus').setValue(arrIn);
//}


//function Prueba(idCnt){
//    var wnd = new  Ext.Window({
//        id:'idbusquedaAvanzada',
//        title:'Agregar Archivos',
//        width:480,
//        height:450,
//        constrainHeader :true,
//        modal:true,
//        border:false,
//        autoScroll:true,
//        draggable:true,
//        resizable:false,
//        bodyStyle: 'padding:5px;',
//        items:[
//        new com.punto.pen.PanelSubirArchivos({
//            url:contexto+'/Cliente',
//            bnd:1,'idCnt':idCnt
//        })
//        ],
//        buttons:[{
//            text:'Subir',
//            tabIndex:3003,
//            handler:function(){
//            }
//        },{
//            text:'Salir',
//            tabIndex:3004,
//            handler:function(){
//                wnd.close();
//            }
//        }]
//    });
//    wnd.show();
//}