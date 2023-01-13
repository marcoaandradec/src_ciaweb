Ext.ns("com.punto.pen");

com.punto.pen.PanelGlucometria= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var PanelGlucometria =  new Ext.Panel({     
        id:'idPanelGlucometria',
        xtype:"panel",
        layout:"form",
        labelAlign:"top",
        border:false,
        items:[
        {     
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",4,\"Glucometria\",\"Estudio Glucometria\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
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
                layout:"column",
                items:[{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
                    items:[{
                        xtype:"textfield",
                        fieldLabel:"Nombre",
                        name:"gmNombre",
                        width:210,
                        readOnly:true
                    }]
                },{
                    xtype:"panel",
                    layout:"form",
                    columnWidth:0.5,
                    border:false,
                    frame:false,
                    labelAlign:"top",
                    bodyStyle:"padding:5px",
                    items:[{
                        height:19,
                        border:false
                    },{
                        xtype:"panel",
                        height:40,
                        border:false,
                        width:220,
                        autoLoad:{
                            url:contexto+'/Glucometria',
                            params:{
                                bnd:4,
                                'idCnt':idCnt
                            }
                        }
                    }]
                } ]
            },{
                xtype:"fieldset",
                title:"Resultados",
                autoHeight:true,
                layout:"column",
                collapsed:false,
                collapsible:false,
                items:[{
                    xtype:"panel",
                    columnWidth:0.4,
                    border:false,
                    autoHeight:false,
                    layout:"form",
                    items:[{
                        xtype:"datefield",
                        fieldLabel:"Fecha Estudio",
                        name:"gmFecha",
                        id:"idgmFecha",
                        emptyText:'dd/mm/yyyy',
                        allowBlank:false,
                        enableKeyEvents:true,
                        listeners:{
                            'blur':function(){
                                var valid=Validafecha(Ext.getCmp('idgmFecha').getValue());
                                if(valid==false){
                                    Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idgmFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                    Ext.getCmp('idgmFecha').setValue("");
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
                        xtype:"numberfield",
                        fieldLabel:"Resultado",
                        id:"idgmTScore",
                        name:"gmTScore",
                        allowBlank:false,
                        autoCreate:{
                            tag:"input",
                            maxlength:5
                        },
                        listeners:{
                            'specialkey': function(edTobilloDer, e){
                                if (e.keyCode==9 || e.keyCode==13) {
                                    clickEvalua();
                                }
                            }, 
                            'blur':function(){
                                clickEvalua();
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    columnWidth:0.5,
                    layout:"form",
                    border:false,
                    autoHeight:false,
                    items:[                
                    new com.punto.pen.ComboBox({
                        etiqueta:"Tipo de estudio",
                        id:'idgmTipEstAyuHor',
                        name:"gmTipEstAyuHor",
                        prm:{
                            campo:"tipEstAyHo",
                            idCampo:'idTipEstAyHo',
                            autoCarga:true,
                            bnd:5,
                            qry:32
                        },
                        hiddenName:"hiddenGmAyuHor",
                        allowBlank:false,
                        width:210,
                        tabIndex:130,
                        evt:{
                            'select':function(cmb,rec,idx){
                                if(cmb.getValue()==113){ //cmb.getRawValue()=="Ayuno" lo visible
                                    Ext.getCmp('idHidenTipEstAyuHor').setValue("1");
                                    Ext.getCmp('idgmResultadoGm').setValue("");
                                }else if(cmb.getValue()==114){
                                    Ext.getCmp('idHidenTipEstAyuHor').setValue("2");
                                    Ext.getCmp('idgmResultadoGm').setValue("");
                                }
                            }
                        }
                    }),{
                        xtype:"hidden",
                        name:"hideTipEstAyuHor",
                        id:'idHidenTipEstAyuHor',
                        value:"0" 
                    }
                    ,{
                        height:23,
                        border:false
                    },{
                        xtype:"textfield",
                        name:"gmResultadoGm",
                        id:'idgmResultadoGm',
                        width:200,
                        allowBlank:false,
                        hideLabel:true,
                        style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                        readOnly:true
                    }]
                }]
            }]
        },{
            xtype:"fieldset",
            title:"Observaciones",
            autoHeight:true,
            layout:"form",
            labelAlign:"top",
            items:[{
                xtype:"textarea",
                labelSeparator:"",
                tabIndex:1011,
                name:"gmObservaciones",
                id:"idObservaciones",
                width:450,
                height:70,
                enableKeyEvents:true,
                style:'text-transform: uppercase;',
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
            xtype:"fieldset",
            autoHeight:true,
            items:[{
                xtype:"panel",
                border:false,
                layout:"form",
                items:[
                {
                    xtype: 'checkboxgroup',
                    fieldLabel: '¿Toma un Medicamento para su Estudio?',
                    name:"gmboxPreg",
                    id:'idgmboxPreg',
                    allowBlank:false,
                    columns: 2,
                    items: [
                    {
                        id:'idgmPg1',
                        boxLabel: 'Si', 
                        name: 'gmPg1',
                        inputValue:true,
                        listeners:{
                            'check':function(){
                                comboLoadHabilita(Ext.getCmp("idgmPg1"));
                            }
                        }
                    },
                    {
                        id:'idgmPg2',
                        boxLabel: 'No', 
                        name: 'gmPg2',
                        inputValue:true,
                        listeners:{
                            'check':function(){
                                comboLoadDesabilita(Ext.getCmp("idgmPg2"));
                            }
                        }
                    }]
                }        
                ]

            }]
        }]
    });
    
    var fieldSetGlucometriaMedicamentos= new Ext.form.FieldSet({
        xtype:"fieldset",
        title:"Medicamentos",
        height:130,
        autoScroll: false,
        id:"idgmMedicamentos",
        hideLabels:true,
        items:[{               
            xtype:"multiselect",
            id:"idComMed",
            name:"gmMedicaDea",
            dataFields:["idMedi", "Medicamentos"],
            store:new com.punto.pen.StoreCombo({
                prm:{
                    idCampo:'idMedi',
                    campo:'Medicamentos',
                    'bnd':14,
                    qry:64,
                    autoCarga:true,
                    url:contexto+'/ComboLoader'
                }
            }),
            valueField:"idMedi",
            displayField:"Medicamentos",
            width:200,
            height:90,
            legend:"Seleccione"
        }
        ]
    });
    

    var panelFormGlucometria= new Ext.FormPanel({
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

    this.crearFichaGlucometria = function(){
        panelFormGlucometria.add(PanelGlucometria);
        panelFormGlucometria.add(fieldSetGlucometriaMedicamentos);
        panelFormGlucometria.doLayout();
        fieldSetGlucometriaMedicamentos.doLayout();
        Ext.getCmp("idgmMedicamentos").setVisible(false);
        return panelFormGlucometria;
    }

    function comboLoadHabilita(check){
        if(check.getValue()==true){
            Ext.getCmp("idgmPg1").check=true;
            Ext.getCmp("idgmPg2").setValue(false);
            Ext.getCmp("idgmMedicamentos").setVisible(true);
            Ext.getCmp("idComMed").allowBlank=false;
            Ext.getCmp("idgmMedicamentos").hideLabel=false;
        } else if(check.getValue()==false){
            Ext.getCmp("idgmMedicamentos").setVisible(false);
            Ext.getCmp("idComMed").allowBlank=true;
            Ext.getCmp("idgmMedicamentos").hideLabel=true;
        }

        Ext.getCmp("idgmMedicamentos").doLayout();
    }
    function comboLoadDesabilita(check){
        if(check.getValue()==true){
            Ext.getCmp("idgmPg2").check=true;
            Ext.getCmp("idgmPg1").setValue(false);
            Ext.getCmp("idgmMedicamentos").setVisible(false);
            Ext.getCmp("idComMed").allowBlank=true;
            Ext.getCmp("idgmMedicamentos").hideLabel=true;
        }
    }

    function clickEvalua(){
        var frm = Ext.getCmp(idPnl).getForm();
        var Mns="";
        if(frm.findField('gmTScore').getValue()!="" || frm.findField('gmTScore').getValue()==0){
            var TScore = Ext.getCmp('idgmTScore').getValue();
            if(frm.findField('hideTipEstAyuHor').getValue()=="1"){
                Mns=EvaluaAyuno(TScore);                 
            }else if(frm.findField('hideTipEstAyuHor').getValue()=="2"){
                Mns=Evalua2Horas(TScore);
            }

            if(Mns=="" || Mns=="INCORRECTO VERIFIQUE"){
                Ext.getCmp('idgmTScore').setValue("");
                Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
            }else{
                Ext.getCmp('idgmResultadoGm').setValue(Mns);
            }
        }       
        if(frm.findField('gmTScore').getValue()==""){
            Ext.getCmp('idgmResultadoGm').setValue("");
        }
    }

    function EvaluaAyuno(val){
        var mensaje="";
        //        if(val>110.0 && val<800.0){
        //            mensaje="DIABETICO";
        //        }else 
            
        if(val>100.0 && val<=800.0){
            //            mensaje="INTOLERANTE A LA GLUCOSA";
            mensaje="RIESGO";
        }else if(val>=70.0 && val<=100.0){
            mensaje="NORMAL";
        }else if(val>=1.0 && val<70.0){
            mensaje="HIPOGLUCEMIA";
        }else{
            mensaje="";
        }
        return mensaje;
    }

    function Evalua2Horas(val){
        var mensaje="";
        //    if(val>150.0 && val<=800.0){
        //        mensaje="DIABETICO";
        //    }else
        if(val>140.0 && val<=800.0){
            //        mensaje="INTOLERANCIA";
            mensaje="RIESGO";
        }else if(val>=70.0 && val<=140.0){
            mensaje="NORMAL";        
        }else if(val>=1.0 && val<70.0){
            mensaje="HIPOGLUCEMIA";
        }else{
            mensaje="INCORRECTO VERIFIQUE";
        }
        return mensaje;
    }
}

//function SelectVerTruesIn(obj){
//    var arrIn="";
//     arrIn = new Array();
//    for(var i=0;i<obj.length;i++){
//        if(obj[i].selected==true){
//            arrIn.push(obj[i].value);
//        }
//    }
//
//   Ext.getCmp('idHidenMedicGluco').setValue(arrIn);
//}


