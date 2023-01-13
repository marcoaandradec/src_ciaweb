Ext.ns("com.punto.pen");

com.punto.pen.PanelEncuestaCorporativa= function(argumentos){
    var idPnl = (argumentos.id==null ? "" : argumentos.id);
    this.reg = (argumentos.region==null ? "" : argumentos.region);
    var url = (argumentos.url==null ? "" : argumentos.url);
    this.alto = (argumentos.alto==null ? 0 : argumentos.alto);
    this.autoAlto = (this.alto==0 ? true : false);
    var idCnt = (argumentos.idCnt==null ? '1' : argumentos.idCnt);
    var titulo = (argumentos.titulo==null ? "" : argumentos.titulo);


    var PanelEncuestaCorporativa =  new Ext.Panel({
        id:'idPanelECorp',
        xtype:"panel",
        layout:"form",              
        border:false,
        items:[{
            xtype:"fieldset",
            title:"Encuesta",
            autoHeight:true,
            layout:"form",
            labelWidth:300,
            items:[{
                xtype: 'radiogroup',
                fieldLabel: '¿Me permite hacerle unas preguntas en relación a su padecimiento?',
                name:"cpPrg1",
                id:'idcpPrg1',
                allowBlank:false,
                labelWidth:50,
                columns: 2,
                items: [
                       {id:'idcpPrg1Si',boxLabel: 'Si', name:'cpPrg1Si',inputValue:true,
                           listeners:{'check':function(){
                                  DesabilitarRabioNo(Ext.getCmp("idcpPrg1Si"),"idcpPrg1Si","idcpPrg1No");
                                  visible(true);
                        }}},
                       {id:'idcpPrg1No',boxLabel: 'No', name:'cpPrg1No',inputValue:true,
                           listeners:{'check':function(){
                                  DesabilitarRabioSi(Ext.getCmp("idcpPrg1No"),"idcpPrg1Si","idcpPrg1No");
                                  visible(false);
                        }}}
                ]
            },{
              xtype:"hidden",
              name:"hidenContador",
              id:"idHidenContador",
              value:"0"
            }]
        },{
            xtype:"fieldset",
            title:"Seguro/Institución",
            id:'P2',
            autoHeight:true,
            layout:"form",
            labelWidth:310,
            items:[{
                xtype: 'radiogroup',
                fieldLabel: '¿Tiene IMSS o algún otro seguro  de gastos médicos?',
                name:"cpPrg2",
                id:'idcpPrg2',
                labelWidth:50,
                columns: 2,
                items: [
                       {id:'idcpPrg2Si',boxLabel: 'Si', name:'cpPrg2Si',inputValue:true,
                           listeners:{'check':function(){
                                  DesabilitarRabioNo(Ext.getCmp("idcpPrg2Si"),"idcpPrg2Si","idcpPrg2No");
                        }}},
                       {id:'idcpPrg2No',boxLabel: 'No', name:'cpPrg2No',inputValue:true,
                           listeners:{'check':function(){
                                  DesabilitarRabioSi(Ext.getCmp("idcpPrg2No"),"idcpPrg2Si","idcpPrg2No");
                        }}}
                ]
            }]
        },{
            xtype:"fieldset",
            title:"Patología",
            autoHeight:true,
            id:'P3',
            layout:"form",
            labelWidth:310,
            items:[
                new com.punto.pen.ComboBox({
                        id:"idCpPrg3diagnostico",
                        etiqueta:"¿Qué le diagnosticó su médico?",                        
                        name:"cpPrg3diagnostico",
                        width:150,
                        prm:{campo:"diagnostico",idCampo:"iddiagnostico",autoCarga:true,bnd:10,qry:44},
                        evt:{
                        'select':function(cmb,rec,idx){
                            var cp = Ext.getCmp('idCpPrg3diagnostico');
                              Ext.getCmp('idHidenCpPrg3diagnostico').setValue(cp.getValue())
                        }
                    }
                    }),{
                    xtype:"hidden",
                    name:"hidenCpPrg3diagnostico",
                    id:"idHidenCpPrg3diagnostico",
                    value:"0"
                    }
            ]
        },{
            xtype:"fieldset",
            title:"Inicio del Padecimiento",
            id:'P4',
            autoHeight:true,
            layout:"form",
            labelWidth:310,
            items:[
                new com.punto.pen.ComboBox({
                        id:"idCpPrg4AnPadecimiento",
                        etiqueta:"¿En que año inició con este padecimiento?",
                        width:100,
                        name:"cpPrg4AnPadecimiento",
                        prm:{campo:"AnPadecimiento",idCampo:"idAnPadecimiento",autoCarga:true,bnd:16}
                    })
            ]
        },{
            xtype:"fieldset",
            title:"Producto Utilizado",
            autoHeight:true,
            layout:"form",
            labelWidth:310,
            id:'P5',
            items:[
                new com.punto.pen.ComboBox({
                        id:"idCpPrg5MedicaActual",
                        etiqueta:"¿Cuál es el medicamento que toma actualmente?",
                        name:"cpPrg5MedicaActual", width:150,
                        prm:{campo:"MedicaActual",idCampo:"idMedicaActual",autoCarga:true,url:contexto+'/Corporativo?bnd=2&idCnt='+idCnt},
                        evt:{
                        'select':function(cmb,rec,idx){
                            var cp = Ext.getCmp('idCpPrg5MedicaActual');
                              Ext.getCmp('idHidenCpPrg5MedicaActual').setValue(cp.getValue())
                        }
                    }
                    }),{
                    xtype:"hidden",
                    name:"hidenCpPrg5MedicaActual",
                    id:"idHidenCpPrg5MedicaActual",
                    value:"0"
                    }
            ]
        },{
            xtype:"fieldset",
            title:"Inicio de Tratamiento",
            autoHeight:true,
            labelWidth:310,
            id:'P6',
            layout:"form",
            items:[{
                xtype:"datefield",
                fieldLabel:"¿En que fecha inicio su tratamiento?",
                name:"cpPrg6FechaInicio",
                id:"idCpPrg6FechaInicio",
                        enableKeyEvents:true,
                        listeners:{
                        'blur':function(){
                        var valid=Validafecha('idCpPrg6FechaInicio');
                        if(valid==false){
                        Ext.MessageBox.alert('Error en Fecha',"La fecha de inicio de tratamiento ("+Ext.getCmp('idCpPrg6FechaInicio').getValue().format('d/m/Y')+") no puede ser mayor al día de hoy");
                        Ext.getCmp('idCpPrg6FechaInicio').setValue("");
                           }
                         }
                      },
                   width:100,
                autoCreate:{
                  tag:"input",
                  maxlength:10
                }
            }]
        },{
            xtype:"fieldset",
            title:"Producto Anterior",
            autoHeight:true,
            layout:"form",
            id:'P7',
            labelWidth:310,
            items:[
                new com.punto.pen.ComboBox({
                        id:"idCpPrg7MedicaAnterior",
                        etiqueta:"¿Qué medicamento estaba tomando antes de éste?",
                        name:"cpPrg7MedicaAnterior",
                        width:150,
                        prm:{campo:"MedicaAnterior",idCampo:"idMedicaAnterior",autoCarga:true,bnd:10,qry:49},
                        evt:{
                        'select':function(cmb,rec,idx){
                            var cp = Ext.getCmp('idCpPrg7MedicaAnterior');
                              Ext.getCmp('idHidenCpPrg7MedicaAnterior').setValue(cp.getValue())
                        }
                    }
                    }),{
                    xtype:"hidden",
                    name:"hidenCpPrg7MedicaAnterior",
                    id:"idHidenCpPrg7MedicaAnterior",
                    value:"0"
                    }
            ]
        }
        ]
    });


    var panelFormEncuestaCorporativa= new Ext.FormPanel({
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

    this.crearEncuestaCorporativa = function(){
        panelFormEncuestaCorporativa.add(PanelEncuestaCorporativa);
        panelFormEncuestaCorporativa.doLayout();
        visible(false);
        return panelFormEncuestaCorporativa;
    }
}

function DesabilitarRabioNo(check,preg1,preg2){
        if(check.getValue()==true){
            Ext.getCmp(preg1).check=true;
            Ext.getCmp(preg2).setValue(false);
        }
    }
     function DesabilitarRabioSi(check,preg1,preg2){
        if(check.getValue()==true){
            Ext.getCmp(preg2).check=true;
            Ext.getCmp(preg1).setValue(false);
        }
    }

function visible(bool){
        if(bool==true){
            Ext.getCmp("P2").setVisible(true);
            Ext.getCmp("P3").setVisible(true);
            Ext.getCmp("P4").setVisible(true);
            Ext.getCmp("P5").setVisible(true);
            Ext.getCmp("P6").setVisible(true);
            Ext.getCmp("P7").setVisible(true);
            Ext.getCmp("idcpPrg2").allowBlank=false;
            Ext.getCmp("idCpPrg3diagnostico").allowBlank=false;
            Ext.getCmp("idCpPrg4AnPadecimiento").allowBlank=false;
            Ext.getCmp("idCpPrg5MedicaActual").allowBlank=false;
            Ext.getCmp("idCpPrg6FechaInicio").allowBlank=false;
            Ext.getCmp("idCpPrg7MedicaAnterior").allowBlank=false;

            Ext.getCmp("idFormEncuestaCorporativa").setHeight(350);          

        }else if(bool==false){
            Ext.getCmp("P2").setVisible(false);
            Ext.getCmp("P3").setVisible(false);
            Ext.getCmp("P4").setVisible(false);
            Ext.getCmp("P5").setVisible(false);
            Ext.getCmp("P6").setVisible(false);
            Ext.getCmp("P7").setVisible(false);
            Ext.getCmp("idcpPrg2").allowBlank=true;
            Ext.getCmp("idCpPrg3diagnostico").allowBlank=true;
            Ext.getCmp("idCpPrg4AnPadecimiento").allowBlank=true;
            Ext.getCmp("idCpPrg5MedicaActual").allowBlank=true;
            Ext.getCmp("idCpPrg6FechaInicio").allowBlank=true;
            Ext.getCmp("idCpPrg7MedicaAnterior").allowBlank=true;
            Ext.getCmp("idFormEncuestaCorporativa").setHeight(90);            
        }
    }