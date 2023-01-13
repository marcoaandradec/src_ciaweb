/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelInfoUsuarioAd = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.anchor = (argumentos.anchor==null ? '' : argumentos.anchor);
    this.frame = (argumentos.frame==null ? false : argumentos.frame);
    this.height = (argumentos.height==null ? false : argumentos.height);

    var Xtype = (argumentos.isForm==null ? Ext.Panel : (argumentos.isForm==true ? Ext.form.FormPanel: Ext.Panel));

     var pnl = new Xtype({
        id:this.id,
        title:this.titulo,
        region:this.region,
        autoScroll:true,
        anchor:this.anchor,
        layout:'anchor',
        border:false,
        bodyStyle: 'padding: 5px;',
        frame: this.frame,
        height:this.height,
        items:[
            {title:'Datos Adicionales',xtype:'fieldset',height:130,layout:'column',bodyStyle: 'padding: 5px;',columnWidth:.475,anchor:'100%',
                items:[
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Usuario',
                                name:'username',
                                value:'',
                                allowBlank:false,columnWidth:.2,width:120
                            }
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {
                                xtype:'textfield',
                                fieldLabel:'Contraseña',
                                name:'password',
                                //inputType:'password',
                                value:'',
                                allowBlank:false,columnWidth:.2
                            }
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            new com.punto.pen.ComboBox({
                                etiqueta:'Género',
                                name:'name_sexo',
                                hiddenName:'sexo',
                                width:120,
                                allowBlank:true,
                                campo:'sexo',
                                idCampo:'idSexo',
                                store:new Ext.data.SimpleStore({
                                    autoLoad: true,
                                    fields:['idSexo','sexo'],
                                    data:[['Masculino','Masculino'],['Femenino','Femenino']]
                                })
                            })
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'datefield',fieldLabel:'Fecha de Nacimiento',width:120,name:'fecha_nac',olumnWidth:.2}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            new com.punto.pen.ComboBox({
                                etiqueta:'Habilitado',
                                name:'name_habilitado',
                                hiddenName:'habilitado',
                                width:120,
                                allowBlank:true,
                                campo:'hab',
                                idCampo:'idHab',
                                store:new Ext.data.SimpleStore({
                                    autoLoad: false,
                                    fields:['idHab','hab'],
                                    data:[['true','Habilitado'],['false','Deshabilitado']]
                                })
                            })
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'Lada',name:'lada',width:120}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'Teléfono',name:'telefono',width:130}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'Teléfono Celular',name:'tel_cel',width:130}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'Correo Electrónico',name:'email',width:130,vtype:'email'}
                        ]
                    }
                ]
            },
            {html:'&nbsp;',columnWidth:.05,border:false},
            {title:'Dirección',xtype:'fieldset',height:130,layout:'column',bodyStyle: 'padding: 5px;',columnWidth:.475,anchor:'100%',
                items:[
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.6,
                        items:[
                            {xtype:'textfield',fieldLabel:'Calle',name:'calle',width:500}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'No. Ext.',name:'no_ext',width:130}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.2,
                        items:[
                            {xtype:'textfield',fieldLabel:'No. Int.',name:'no_int',width:130}
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.25,
                        items:[
                            new com.punto.pen.ComboBox({
                                id:"idComboEstadoCln",
                                etiqueta:"Estado",
                                allowBlank:true,
                                name:"estado",
                                tabIndex:22,
                                width:130,
                                prm:{campo:'edo',idCampo:'idEdo',bnd:1,qry:1,autoCarga:true},
                                evt:{
                                    'select':function(cmb,rec,idx){
                                        var dm = Ext.getCmp('idComboDelCln');
                                        accionCmbUbicacion(dm,['idComboDelCln',"idComboColCln","idComboCpCln"],{
                                            edo:cmb.getRawValue()
                                        }, true)
                                    }
                                }
                            })
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.25,
                        items:[
                            new com.punto.pen.ComboBox({
                                id:"idComboDelCln",
                                etiqueta:"Delg./Mpo.",
                                allowBlank:true,
                                tabIndex:23,
                                name:"del_mun",
                                width:130,
                                prm:{campo:'dm',idCampo:'idDM',bnd:1,qry:2,autoCarga:false},
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
                            })
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.25,
                        items:[
                            new com.punto.pen.ComboBox({
                                id:"idComboColCln",
                                etiqueta:"Colonia",
                                allowBlank:true,
                                name:"colonia",
                                tabIndex:24,
                                width:130,
                                prm:{campo:'cl',idCampo:'idCl',bnd:1,qry:3,autoCarga:false},
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
                            })
                        ]
                    },
                    {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.25,
                        items:[
                            new com.punto.pen.ComboBox({
                                id:"idComboCpCln",
                                etiqueta:"Código Postal",
                                allowBlank:true,
                                name:"codpost",
                                tabIndex:25,
                                width:130,
                                prm:{campo:'cp',idCampo:'idCp',bnd:1,qry:4,autoCarga:false},
                                evt:{
                                    'select':function(){
                                    //accionCmbUbicacion(cmb,cmpToClean,prm, borrar)
                                    }
                                }
                            })
                        ]
                    }
                ]
            }
        ]
     });
     return pnl;
}