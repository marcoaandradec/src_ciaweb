/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelQSC = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);

    this.url = (argumentos.url==null ? '' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);

    this.height = (argumentos.height==null ? 0 :  argumentos.height);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);

    this.region = (argumentos.region==null ? '' : argumentos.region);
    
    var pnlQSC = new Ext.form.FormPanel({
        id:this.id,
        border:this.border,
        url: this.url,
        title:this.titulo,
        region: this.region,
        layout:"form",
        labelAlign:"top",
        width:600,
        bodyStyle:"padding:5px",
        height:this.height,
        autoHeight:this.autoAlto,
        autoScroll:this.autoScroll,
        items:[
//        {
//            xtype:"combo",
//            fieldLabel:"Tipo",
//            name:"combovalue",
//            hiddenName:"combovalue"
//        }
        new com.punto.pen.ComboBox({
            id:"idComboTipoQueja",
            etiqueta:"Tipo",
            name:"cmbTipoQueja",
            prm:{campo:'tipo',idCampo:'idTipo',autoCarga:true,bnd:1,qry:6},
            evt:{
                'select':function(cmb,rec,idx){
                    var dm = Ext.getCmp('idComboTemaQueja');
                   accionCmbUbicacion(dm,['idComboTemaQueja','idComboSubTema'],{edo:cmb.getRawValue()}, true)
                }
            }
        })
        ,{
            xtype:"panel",
            border:false,
            layout:"table",
            layoutConfig:{
                columns:2
            },
            items:[{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                width:180,
                items:[
//                {
//                    xtype:"combo",
//                    fieldLabel:"Tema",
//                    name:"combovalue",
//                    hiddenName:"combovalue"
//                }
                new com.punto.pen.ComboBox({
                    id:"idComboTemaQueja",
                    etiqueta:"Tema",
                    name:"cmbTemaQueja",
                    prm:{campo:'tema',idCampo:'idTema',bnd:1,qry:7,autoCarga:false},
                    evt:{
                        'select':function(cmb,rec,idx){
                            var tipo = Ext.getCmp('idComboTipoQueja');
                            var cl = Ext.getCmp('idComboSubTema');
                            accionCmbUbicacion(cl,['idComboSubTema'],{'tipo':tipo.getRawValue(),'tema':cmb.getRawValue()}, true)
                        }
                    }
                })
            ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                items:[]
            }]
        },{
            xtype:"panel",
            border:false,
            layout:"table",
            layoutConfig:{
                columns:2
            },
            items:[{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                width:180,
                items:[
//                {
//                    xtype:"combo",
//                    fieldLabel:"Subtema",
//                    name:"combovalue",
//                    hiddenName:"combovalue"
//                }
                {
                  xtype:"hidden",
                  name:"hidenIdQueja",
                  id:"idHidenQueja",
                  value:"0"
                },
                {
                  xtype:"hidden",
                  name:"hidenIdCliente",
                  id:"idHidenIdCliente",
                  value:"0"
                },
                new com.punto.pen.ComboBox({
                    id:"idComboSubTema",
                    etiqueta:"Subtema",
                    name:"cmbSubTema",
                    prm:{campo:'subTema',idCampo:'idSubTema',bnd:9,qry:8,autoCarga:false},
                     evt:{
                        'select':function(){
                           Ext.getCmp("idHidenQueja").setValue(Ext.getCmp("idComboSubTema").getValue());
                           Ext.getCmp("idHidenIdCliente").setValue(com.punto.pen.RegresaIdC());
                        }
                    }
                })
                ]
            },{
                xtype:"panel",
                layout:"form",
                border:false,
                labelAlign:"top",
                items:[]
            }]
        },{
            xtype:"textarea",
            fieldLabel:"Nota",
            name:"txtQueja",
            width:500,
            height:200,
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
    });
    
    return pnlQSC;
}