Ext.ns("com.punto.pen");

com.punto.pen.PanelMapa= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);
    var idMapa = (argumentos.idMapa==null ? 0 : argumentos.idMapa);
    var nutCampo=(argumentos.nutCampo==null ? "MAPA" : "Presión Arterial o MAPA");
    var nutCampo2=(argumentos.nutCampo==null ? 7 : 10);


    var PanelMapa =  new Ext.Panel({
        id:'idPanelMapa',
        labelAlign:"top",
        xtype:"panel",
        layout:"form",
        border:false,
        items:[
        {     
            html:"<div align=right><u><a onClick='getEstudios(" + idCnt + ",7,\""+nutCampo+"\",\"Estudio "+nutCampo+"\")' style='color:#39F' onmouseover='style.cursor=\"hand\"'>Ver Bitacora</a></u></div>",
            Height:20,
            border:false
        },{
            xtype:"hidden",
            name:"hideMAPATipo",
            value:"1"
        },{
            xtype:"hidden",
            name:"hideIdMAPA",
            value:idMapa
        },{
            xtype:"fieldset",
            title:"Información",
            autoHeight:true,
            layout:"column",
            items:[{
                xtype:"panel",
                columnWidth:0.6,
                layout:"form",
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
                columnWidth:0.4,
                layout:"form",
                border:false,
                items:[{
                    xtype:"datefield",
                    fieldLabel:"Fecha Estudio",
                    name:"mpFecha",
                    id:"idmpFecha",
                    emptyText:"dd/mm/yyyy",
                    allowBlank:false,
                    enableKeyEvents:true,
                    listeners:{
                        'blur':function(){
                            var valid=Validafecha(+Ext.getCmp('idmpFecha').getValue());
                            if(valid==false){
                                Ext.MessageBox.alert('Error en Fecha',"La fecha ("+Ext.getCmp('idmpFecha').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                                Ext.getCmp('idmpFecha').setValue("");
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
                }
            ]
        },{
            xtype:"fieldset",
            title:"Resultados",
            autoHeight:true,
            layout:"column",
            items:[{
                xtype:"panel",
                columnWidth:0.5,
                layout:"form",
                border:false,
                items:[{
                    xtype:"numberfield",
                    fieldLabel:"Promedio Sistólica",
                    name:"mpSistolica",
                    id:"idmpSistolica",
                    allowBlank:false,
                    autoCreate:{
                        tag:"input",
                        maxlength:5
                    },
                    listeners:{
                        'specialkey': function(edTobilloDer, e){
                            if (e.keyCode==9 || e.keyCode==13) {
                                var val=Ext.getCmp('idmpSistolica').getValue();
                                if(val>=50.0 && val<=300.0){
                                    clickEvaluaPrecion();
                                }else{
                                    Ext.getCmp('idmpSistolica').setValue("");
                                    Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                                }
                            }
                        }, 
                        'blur':function(){
                            var val=Ext.getCmp('idmpSistolica').getValue();
                            if(val>=50.0 && val<=300.0){
                                clickEvaluaPrecion();
                            }else{
                                Ext.getCmp('idmpSistolica').setValue("");
                                Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                            }
                        }
                    }
                },{
                    xtype:"numberfield",
                    fieldLabel:"Promedio Diastólica",
                    name:"mpDiastolica",
                    id:"idmpDiastolica",
                    allowBlank:false,
                    autoCreate:{
                        tag:"input",
                        maxlength:5
                    },
                    listeners:{
                        'specialkey': function(edTobilloDer, e){
                            if (e.keyCode==9 || e.keyCode==13) {
                                var val=Ext.getCmp('idmpDiastolica').getValue();
                                if(val>=40.0 && val<=230.0){
                                    clickEvaluaPrecion();
                                }else{
                                    Ext.getCmp('idmpDiastolica').setValue("");
                                    Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                                }
                            }
                        }, 
                        'blur':function(){
                            var val=Ext.getCmp('idmpDiastolica').getValue();
                            if(val>=40.0 && val<=230.0){
                                clickEvaluaPrecion();
                            }else{
                                Ext.getCmp('idmpDiastolica').setValue("");
                                Ext.MessageBox.alert('Error en Resultado',"Verifique el Resultado del estudio, el valor no es correcto");
                            } 
                        }
                    }
                }]
            },{
                xtype:"panel",
                layout:"form",
                columnWidth:0.4,
                border:false,
                items:[{
                    xtype:"textfield",
                    fieldLabel:"Promedio Presión Arterial",
                    name:"mpArterial",
                    allowBlank:false,
                    style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                    id:'idmpArterial',
                    readOnly:true
                },
                {
                    xtype:"textfield",
                    name:"MsnMapa",
                    id:"idMsnMapa",
                    width:170,
                    fieldLabel:"Valoración",
                    style:"font-size: 12px; font-family: Arial, Helvetica, sans-serif; background-color:#FF9; color:#06C;",
                    readOnly:true
                }]
            }]
        }]

    });

    var panelFormMapa= new Ext.FormPanel({
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

    this.crearFichaMapa = function(){
        panelFormMapa.add(PanelMapa);
        //        panelFormMapa.add(panelMapaBotones);
        panelFormMapa.doLayout();
        var panel=Ext.getCmp('idFormMapa');
        loadFormulario(panel,{
            url:contexto+'/Mapa',
            'idCnt':idCnt,
            'bnd':1
        });
        return panelFormMapa;
    }

    this.crearFichaPresionArterial = function(){
        panelFormMapa.add(PanelMapa);
        panelFormMapa.doLayout();
        return panelFormMapa;
    }
    
    function clickEvaluaPrecion(){
        var frm = Ext.getCmp(idPnl).getForm();
        var Mns="";
        if(frm.findField('mpSistolica').getValue()!="" && frm.findField('mpDiastolica').getValue()!=""){
            var Sistolica = Ext.getCmp('idmpSistolica').getValue();
            var Diastolica = Ext.getCmp('idmpDiastolica').getValue();                 
            Ext.getCmp('idmpArterial').setValue(Sistolica+"/"+Diastolica);
            Ext.getCmp('idMsnMapa').setValue(RangosMapa(Sistolica,Diastolica));
        }         
        
        if(frm.findField('mpSistolica').getValue()=="" || frm.findField('mpDiastolica').getValue()==""){
            Ext.getCmp('idmpArterial').setValue("");
            Ext.getCmp('idMsnMapa').setValue("");
        }
    }
}

function RangosMapa(val1,val2){
    var mns="NO DEFINIDA";
    if((val1>40&&val1<=120)&&(val2<80)){
        mns="OPTIMAL";
    }else if((val1>120&&val1<130)&&(val2>=80&&val2<85)){
        mns="NORMAL";
    }else if((val1>=130&&val1<140)&&(val2>=85&&val2<90)){
        mns="FRONTERIZA";
    }else if((val1>=140)&&(val2>=90)){
        mns="HIPERTENSÍON";
    }    
    return mns;    
}
