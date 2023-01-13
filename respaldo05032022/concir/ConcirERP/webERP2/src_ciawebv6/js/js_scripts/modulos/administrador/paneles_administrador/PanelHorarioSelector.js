/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelHorarioSelector = function(argumentos){
    
    this.id         = (argumentos.id==null ? '' : argumentos.id);
    this.region     = (argumentos.region==null ? '' : argumentos.region);
    this.anchor     = (argumentos.anchor==null ? null : argumentos.anchor);
    this.titulo     = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border     = (argumentos.border==null ? true : argumentos.border);
    this.height     = (argumentos.height==null ? true : argumentos.height);
    this.frame      = (argumentos.frame==null ? false : argumentos.frame);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);
    var Xtype       = (argumentos.isForm==null ? Ext.Panel : (argumentos.isForm==true ? Ext.form.FormPanel: Ext.Panel));
    
    var pnl = new Xtype({
        id:this.id,
        title:this.titulo,
        region:this.region,
        anchor:this.anchor,
        border:this.border,
        height:this.height,
        frame: this.frame,
        autoScroll: this.autoScroll,
        bodyStyle: 'padding: 5px;',
        layout:'form',
        items:[
            {html:'Selecciones los horarios del usuario',border:false,style:'font-family: Arial;font-size:12px;'},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',height:50,//width:600,
                        items:[
                            {xtype:'combo',fieldLabel:'Lunes',name:'hr_Lunes',hiddenName:'hrLunes',id:'cmbLunes',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),//width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbLunes');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsLunes'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',height:50,//width:600,
                        items:[
                            {xtype:'combo',fieldLabel:'Martes',name:'hr_Martes',hiddenName:'hrMartes',id:'cmbMartes',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),//width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbMartes');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsMartes'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',width:600,height:50,
                        items:[
                            {xtype:'combo',fieldLabel:'Miércoles',name:'hr_Miercoles',hiddenName:'hrMiercoles',id:'cmbMiercoles',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbMiercoles');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsMiercoles'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',width:600,height:50,
                        items:[
                            {xtype:'combo',fieldLabel:'Jueves',name:'hr_Jueves',hiddenName:'hrJueves',id:'cmbJueves',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbJueves');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsJueves'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',width:600,height:50,
                        items:[
                            {xtype:'combo',fieldLabel:'Viernes',name:'hr_Viernes',hiddenName:'hrViernes',id:'cmbViernes',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbViernes');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsViernes'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',width:600,height:50,
                        items:[
                            {xtype:'combo',fieldLabel:'Sábado',name:'hr_Sabado',hiddenName:'hrSabado',id:'cmbSabado',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbSabado');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsSabado'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'panel',layout:'column',height:30,//width:1000,
                items:[
                    {xtype:'panel',columnWidth: .6,layout:'form',bodyStyle:'padding:1px 0 0',width:600,height:50,
                        items:[
                            {xtype:'combo',fieldLabel:'Domingo',name:'hr_Domingo',hiddenName:'hrDomingo',id:'cmbDomingo',
                                displayField: 'hrs',store: new com.punto.pen.StoreCombo({}),width:400,
                                valueField: 'idHrs',readOnly: false,mode: 'local',triggerAction: 'all',
                                allowBlank:true,forceSelection:true,listWidth:400,lazyRender:false,lazyInit:false,
                                tpl: '<tpl for="."><div ext:qtip="{hrs}" class="x-combo-list-item">{hrs}</div></tpl>'
                            }
                        ],
                    border:false},
                    {xtype:'panel',columnWidth: .3,layout:'form',bodyStyle:'padding:1px 0 0',width:400,
                        items:[
                            {xtype:'checkbox',labelSeparator:'---',handler:function(){var cmb = Ext.getCmp('cmbDomingo');if(this.checked==true){cmb.disable();}else{cmb.enable();}},boxLabel:'Descanso',name:'dsDomingo'}
                        ],
                    border:false}
                ],
            border:false},
            {xtype:'button',text:'Agregar Nuevo Horario',
                handler:function(){
                    var w = new Ext.Window({
                        id:'wndAgrHr',
                        title:'Agregar Nuevo Horario',
                        modal:true,
                        width:245,
                        height:175,
                        closeAction:'close',
                        items:[
                            {xtype:'form',id:'frmHorarioAlta',url:contexto+'/Usuario?bnd=2&accion=agregar',layout:'table',layoutConfig:{columns:9},width:247,border:false,bodyStyle:'padding:5px 5px 5px 5px',
                                items:[
                                    {xtype:'label',html:'<center><b>Hora Entrada</b></center>',colspan:3},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'<center><b>Hora Salida</b></center>',colspan:3},

                                    {xtype:'combo',width:50,name:'hr_entrada',
                                        displayField: 'horas',valueField: 'idHoras',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'<center>:</center>'},
                                    {xtype:'combo',width:50,name:'min_entrada',
                                        displayField: 'mins',valueField: 'idMins',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'combo',width:50,name:'hr_salida',
                                        displayField: 'horas',valueField: 'idHoras',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'<center>:</center>'},
                                    {xtype:'combo',width:50,name:'min_salida',
                                        displayField: 'mins',valueField: 'idMins',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },

                                    {xtype:'label',html:'&nbsp;<hr>',colspan:9},

                                    {xtype:'label',html:'<center><b>Hora de Comida</b></center>',colspan:9},

                                    {xtype:'combo',width:50,name:'hr_cm_salida',
                                        displayField: 'horas',valueField: 'idHoras',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'<center>:</center>'},
                                    {xtype:'combo',width:50,name:'min_cm_salida',
                                        displayField: 'mins',valueField: 'idMins',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'label',html:'a'},
                                    {xtype:'label',html:'&nbsp;'},
                                    {xtype:'combo',width:50,name:'hr_cm_entrada',
                                        displayField: 'horas',valueField: 'idHoras',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    },
                                    {xtype:'label',html:'<center>:</center>'},
                                    {xtype:'combo',width:50,name:'min_cm_entrada',
                                        displayField: 'mins',valueField: 'idMins',mode:'local',readOnly:true,listWidth:100,
                                        store:new com.punto.pen.StoreCombo({}),triggerAction: 'all',allowBlank:true,forceSelection:true
                                    }
                                ]
                            }
                        ],
                        buttons:[
                            {xtype:'button',text:'Agregar',
                                handler:function(){
                                    var frm = Ext.getCmp('frmHorarioAlta').getForm();
                                    if(frm.isValid()==true){
                                        frm.submit({
                                            waitMsg: 'Espere un segundo, estamos actualizando la información',
                                            clientValidation: true,
                                            success:function(form,action){
                                                Ext.Msg.alert("Success", action.result.msg);
                                                Ext.getCmp('cmbLunes').getStore().load();
                                                Ext.getCmp('cmbMartes').getStore().load();
                                                Ext.getCmp('cmbMiercoles').getStore().load();
                                                Ext.getCmp('cmbJueves').getStore().load();
                                                Ext.getCmp('cmbViernes').getStore().load();
                                                Ext.getCmp('cmbSabado').getStore().load();
                                                Ext.getCmp('cmbDomingo').getStore().load();
                                                w.close();
                                            },
                                            failure:function(form,action){
                                                Ext.Msg.alert("Error", action.result.msg);
                                            }
                                        });
                                    }else{
                                        Ext.Msg.alert("Error", "Debe llenar toda la información requerida, revise los campos marcados con rojo.");
                                    }
                                }
                            },
                            {xtype:'button',text:'Cancelar',
                                handler:function(){
                                    w.close();
                                }
                            }
                        ]
                    });
                    w.show();
                }
            }
        ]
    });
    return pnl;
}