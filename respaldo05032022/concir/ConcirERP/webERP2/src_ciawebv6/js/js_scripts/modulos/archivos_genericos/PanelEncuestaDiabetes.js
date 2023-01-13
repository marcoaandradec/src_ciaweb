/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.PanelEncuestaDiabetes = function(params){
    var ancho=(params.ancho==null ? 550 : params.ancho);
    var titulo = (params.titulo == null ? "" : params.titulo);

    var panelDiabetes = new Ext.FormPanel({
    xtype:"form",
    title:titulo,
    url: contexto + '/Diabetes',
    autoScroll:true,
    items:[{
        xtype:"panel",
        title:"",
        layout:"form",
        labelWidth:ancho,
        autoScroll:false,
        items:[
            saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idComboTipoDiabetes",
                etiqueta:"1.- ¿Usted sabe qué tipo de diabetes tiene?",
                name:"cmbTipoDiab",
                prm:{campo:"TipoD",idCampo:'idTipoD',autoCarga:true,bnd:5,qry:23}
             }),
            saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idComboMedicoReceto",
                etiqueta:"2.- ¿Su médico le entregó una receta médica?",
                name:"cmbMedicoReceto",
                prm:{campo:"MedRec",idCampo:'idMedRec',autoCarga:true,bnd:5,qry:24}
             }),
            saltoLine(1),
            {
                border:false,
                autoLoad:{
                    url:contexto+'/Diabetes',
                    params:{
                        bnd:1,qry:1,name:'slcIncluidos',ancho:ancho,
                        func:"aIn=verTruesIn(this)",
                        preg:"<span style='font-size:12.3px'>3.- ¿Que medicamentos estan incluidos en su receta medica?</span>"
                    },
                    text:'Cargando lista de medicamentos...'
                }
            },
            saltoLine(1),
            {
                border:false,
                autoLoad:{
                    url:contexto+'/Diabetes',
                    params:{
                        bnd:1,qry:2,name:'slcAdemas',ancho:ancho,
                        func:"aAd=verTruesAd(this)",
                        preg:"<span style='font-size:12.3px'>4.- ¿Que medicamentos toma usted ademas de los incluidos en su receta?</span>"
                    },
                    text:'Cargando lista de medicamentos...'
                }
            },{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                autoScroll:false,
                border:false,
                id:"idPanelCheckBox",
                items:[{
                    xtype:"checkbox",
                    id:"idCheckContinuar",
                    fieldLabel:"Continuar",
                    boxLabel:"Si",
                    name:"checkContinuar",
                    handler:continuarCuestionario
                }]
            },
            saltoLine(1),
            ]
      }]
    });

    function pregunta5(){
        var preg5 = new Ext.Panel({
            xtype:"panel",
            title:"",
            id:"idPanelPreg5",
            layout:"form",
            labelWidth:ancho,
            autoScroll:false,
            border:false,
            items:[]
        });

        preg5.add({
                html:"<span style='font-size:12.3px'>5.- ¿Cuanto tiempo lleva tomando este medicamento?</span>",
                border:false
            },saltoLine(1));
       
        for(var i=0;i<aIn.length;i++){            
            preg5.add({
                xtype:"datefield",
                fieldLabel:aIn[i],
                name:"datevalu"
            });
        }
        return preg5;
    }
    function pregunta6(){
        var preg6 = new Ext.Panel({
            xtype:"panel",
            title:"",
            id:"idPanelPreg6",
            layout:"form",
            labelWidth:ancho,
            autoScroll:false,
            border:false,
            items:[]
        });

        preg6.add({
                html:"<span style='font-size:12.3px'>6.- ¿Durante que tiempo llevara este tratamiento?</span>",
                border:false
            },saltoLine(1));

        for(var i=0;i<aIn.length;i++){
            preg6.add({
                xtype:"combo",
                fieldLabel:aIn[i],
                name:"combovalue",
                hiddenName:"combovalue"
            });
        }        
        return preg6;
    }
    
    function pregunta7y8(){
         var preg7y8 = new Ext.Panel({
            xtype:"panel",
            title:"",
            id:"idPanelPreg7y8",
            layout:"form",
            labelWidth:ancho,
            autoScroll:false,
            border:false,
            items:[]
        });
        if(aIn.indexOf("Amaryl")!=-1 || aIn.indexOf("Metamaryl")!=-1){
            preg7y8.add({
                html:"<span style='font-size:12.3px'>7.- ¿Cuántas tabletas le indicó su médico?</span>",
                border:false
            },saltoLine(1));

            if(aIn.indexOf("Amaryl")!=-1){
                preg7y8.add({
                    xtype:"textfield",
                    fieldLabel:"Amaryl",
                    name:"txtAmaryl"                    
                });
            }

            if(aIn.indexOf("Metamaryl")!=-1){
                preg7y8.add({
                    xtype:"textfield",
                    fieldLabel:"Metamaryl",
                    name:"txtMetamaryl"
                });
            }
        }

        if(aIn.indexOf("Lantus")!=-1 || aIn.indexOf("Shorant")!=-1){
            preg7y8.add(saltoLine(1),{
                html:"<span style='font-size:12.3px'>8.- ¿Cuantas aplicaciones de insulina se realiza al dia?</span>",
                border:false
            },saltoLine(1));

            if(aIn.indexOf("Lantus")!=-1){
                preg7y8.add(
                new com.punto.pen.ComboBox({
                    id:"idAplicsLantus",
                    etiqueta:"Lantus",
                    name:"cmbAplicsLantus",
                    prm:{campo:"apLantus",idCampo:'idApLantus',autoCarga:true,bnd:5,qry:30},
                    evt:{
                        'select':function(){
                            var noAp = Ext.getCmp("idAplicsLantus").getValue()-98;
                            preg7y8.remove("idPanelPreg91",true);
                            preg7y8.add(pregunta9(noAp,"Lantus","idPanelPreg91"));
                            preg7y8.doLayout();
                        }}
                }));
            }

            if(aIn.indexOf("Shorant")!=-1){
                preg7y8.add(
                new com.punto.pen.ComboBox({
                    id:"idAplicsShorant",
                    etiqueta:"Shorant",
                    name:"cmbAplicsShorant",
                    prm:{campo:"apShorant",idCampo:'idApShorant',autoCarga:true,bnd:5,qry:30},
                    evt:{
                        'select':function(){
                            var noAp = Ext.getCmp("idAplicsShorant").getValue()-98;
                            preg7y8.remove("idPanelPreg92",true);
                            preg7y8.add(pregunta9(noAp,"Shorant","idPanelPreg92"));
                            preg7y8.doLayout();
                        }}
                }));
            }
        }
        return preg7y8;
    }
    function pregunta9(nAp,med,id){
        var preg9 = new Ext.Panel({
            xtype:"panel",
            title:"",
            id:id,
            layout:"form",
            labelWidth:ancho,
            autoScroll:false,
            border:false,
            items:[saltoLine(1),{
                html:"<span style='font-size:12.3px'>9.- ¿Cuantas unidades por aplicacion? " + med + ":</span>",
                border:false
            },
            saltoLine(1)
        ]});
        for(var i=0;i<nAp;i++){
            preg9.add({
                xtype:"textfield",
                fieldLabel:i+1 + "a Aplicación",
                name:"textvalue"
            });
        }
        return preg9;
    }

    function continuarEnc(){
        var contEnc={
            xtype:"panel",
            title:"",
            id:"idPanelContEnc",
            layout:"form",
            labelWidth:ancho,
            autoScroll:false,
            border:false,
            items:[
            saltoLine(1),
            pregunta5(),
            saltoLine(1),
            pregunta6(),
            saltoLine(1),
            pregunta7y8(),
            saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg10",
                    fieldLabel:"10.- ¿Cual es la cifra que su medico le indico como meta de control de glucosa en ayunas?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg10"),Ext.getCmp("idTextPreg10"));
                        }
                    }

                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    fieldLabel:"",
                    id:"idTextPreg10",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp x mg/dl",
                    border:false
                  }]
              }]
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg101",
                    fieldLabel:"10.1.- ¿Cual fue su ultimo resultado de glucosa en ayunas?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg101"),Ext.getCmp("idTextPreg101"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg101",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp x mg/dl",
                    border:false
                  }]
              }]
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg11",
                    fieldLabel:"11.- ¿Cual fue la cifra que su medico le indico como meta de control de glucosa 2hrs despues de los alimentos?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg11"),Ext.getCmp("idTextPreg11"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg11",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp x mg/dl",
                    border:false
                  }]
              }]
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg111",
                    fieldLabel:"11.1.- ¿Cual fue su ultimo resultado de glucosa 2 hrs. despues de los alimentos?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg111"),Ext.getCmp("idTextPreg111"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg111",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp x mg/dl",
                    border:false
                  }]
              }]
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg12",
                    fieldLabel:"12.- ¿Cual es la cifra que su medico le indico como meta de control de hemoglobina glucosilada?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg12"),Ext.getCmp("idTextPreg12"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg12",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp % Hba1c",
                    border:false
                  }]
              }]
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg121",
                    fieldLabel:"12.1.- ¿Cual fue su ultimo resultado de hemoglobina glucosilada?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg121"),Ext.getCmp("idTextPreg121"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg121",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  },{
                    html:"&nbsp % Hba1c",
                    border:false
                  }]
              }]
          },
          saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idCmbActFisica",
                etiqueta:"13.- ¿Su medico le indico realizar algun tipo de actividad fisica?",
                name:"cmbActFisica",
                prm:{campo:"ActFisica",idCampo:'idActFisica',autoCarga:true,bnd:5,qry:24}
            }),
          saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idCmbCamAlimentacion",
                etiqueta:"14.- ¿Su medico le indico realizar algun cambio en su alimentación?",
                name:"cmbCamAlimentacion",
                prm:{campo:"CamAlimentacion",idCampo:'idCamAlimentacion',autoCarga:true,bnd:5,qry:24}
            }),
          saltoLine(1),
            new com.punto.pen.ComboBox({
                id:"idCmbModifInsulina",
                etiqueta:"15.- ¿Se ha modificado el numero de tabletas/unidades de insulina desde el momento en que inicio el tratamiento?",
                name:"cmbModifInsulina",
                prm:{campo:"ModifInsulina",idCampo:'idModifInsulina',autoCarga:true,bnd:5,qry:24}
            }),
          saltoLine(1),{
            xtype:"combo",
            fieldLabel:"16.- ¿Quien le entrego el dispositivo?",
            name:"combovalue",
            hiddenName:"combovalue"
          },
          saltoLine(1),{
            xtype:"datefield",
            fieldLabel:"17.- Fecha de entrega del dispositivo",
            name:"datevalue"
          },
          saltoLine(1),{
            xtype:"combo",
            fieldLabel:"18.- ¿Que tipo de dispositivo le entregaron?",
            name:"combovalue",
            hiddenName:"combovalue"
          },
          saltoLine(1),{
            xtype:"panel",
            title:"",
            layout:"column",
            labelWidth:ancho,
            border:false,
            items:[{
                xtype:"panel",
                title:"",
                layout:"form",
                labelWidth:ancho,
                border:false,
                items:[{
                    xtype:"checkbox",
                    id:"idCheckPreg19",
                    fieldLabel:"19.- ¿Puede darme el numero de lote de su dispositivo?",
                    boxLabel:"No indicó",
                    name:"checkbox",
                    inputValue:"cbvalue",
                    checked:true,
                    listeners:{
                        'check':function(){
                            habilitarText(Ext.getCmp("idCheckPreg19"),Ext.getCmp("idTextPreg19"));
                        }
                    }
                  }]
              },{
                xtype:"panel",
                title:"",
                layout:"column",
                labelAlign:"right",
                border:false,
                items:[{
                    xtype:"textfield",
                    id:"idTextPreg19",
                    fieldLabel:"",
                    name:"textvalue",
                    disabled:true
                  }]
              }]
          },
          saltoLine(1),
          new com.punto.pen.ComboBox({
                id:"idCmbNivGlucosa",
                etiqueta:"20.- ¿Cuantas vecez al dia se mide sus niveles de glucosa?",
                name:"cmbNivGlucosa",
                prm:{campo:"NivGlucosa",idCampo:'idNivGlucosa',autoCarga:true,bnd:5,qry:31}
            })
          ]}
          return contEnc;
    }

    
    function habilitarText(check,text){        
        if(check.getValue()==true){
            text.disable();
        }
        if(check.getValue()==false){
            text.enable();
        }
    }
    function continuarCuestionario(){
        var check=Ext.getCmp("idCheckContinuar");
        var panelCheck=Ext.getCmp("idPanelCheckBox");

        if(check.getValue()==true){
            try{
                if(aIn[0]!=undefined){
                    panelCheck.add(continuarEnc());
                    panelCheck.doLayout();
                }else{
                    Ext.Msg.show({
                        title:'Error',
                        msg: '<center>¡Debe seleccionar al menos un medicamento de su receta medica!</center>',
                        buttons: Ext.Msg.OK
                    });
                }
            }catch(e){
                Ext.Msg.show({
                    title:'Error',
                    msg: '<center>¡Debe seleccionar al menos un medicamento de su receta medica!</center>',
                    buttons: Ext.Msg.OK
                });
            }
        }else if(check.getValue()==false){
            panelCheck.remove(Ext.getCmp("idPanelContEnc"));            
        }        
    }
    return panelDiabetes;
}

var aIn;
var aAd;

function verTruesIn(obj){
    var arrIn = new Array();    
    for(var i=0;i<obj.length;i++){
        if(obj[i].selected==true){
            arrIn.push(obj[i].value);
        }
    }    
    return arrIn;
}

function verTruesAd(obj){
    var arrAd = new Array();    
    for(var i=0;i<obj.length;i++){
        if(obj[i].selected==true){
            arrAd.push(obj[i].value);
        }
    }    
    return arrAd;
}