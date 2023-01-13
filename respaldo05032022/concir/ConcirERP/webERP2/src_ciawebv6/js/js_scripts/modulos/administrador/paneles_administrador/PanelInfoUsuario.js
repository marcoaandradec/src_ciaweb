/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelInfoUsuario = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.anchor = (argumentos.anchor==null ? '' : argumentos.anchor);
    this.frame = (argumentos.frame==null ? false : argumentos.frame);

    var Xtype = (argumentos.isForm==null ? Ext.Panel : (argumentos.isForm==true ? Ext.form.FormPanel: Ext.Panel));

    var pnl = new Xtype({
        id:this.id,
        title:this.titulo,
        region:this.region,
        autoScroll:true,
        anchor:this.anchor,
        layout:'column',
        border:false,
        bodyStyle: 'padding: 5px;',
        frame: this.frame,
        items:[
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Nombre',
                        name:'nombre',
                        value:'',
                        allowBlank:false,width:200
                    }
                ]
            },
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Apellido Paterno',
                        name:'apaterno',
                        value:'',
                        allowBlank:false,width:200
                    }
                ]
            },
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    {
                        xtype:'textfield',
                        fieldLabel:'Apellido Materno',
                        name:'amaterno',
                        value:'',
                        allowBlank:false,width:200
                    }
                ]
            },
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    new com.punto.pen.ComboBox({
                        etiqueta:'Punto de Atención',name:'pnt_atn',value:'',width:200,allowBlank:false,id:'idPntAtn',
                        prm:{bnd:5,qry:27,idCampo:'idAtn',campo:'atn','autoCarga':true},
                       'hiddenName':'pnt_atn',
                        evt:{
                            'select':function(combo){
                                //alert('valor: '+this.getRawValue() + ' otro val: ' + this.getValue());
                                Ext.getCmp('idPntCnt').getStore().removeListener('load',fOne);
                                getPntCnt();
                            }
                        }
                    })
                ]
            },
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    new com.punto.pen.ComboBox({
                        etiqueta:'Punto de Contacto',name:'pnt_cnt',value:'',width:200,allowBlank:false,id:'idPntCnt',
                        prm:{ bnd:12,qry:28,idCampo:'idCnt',campo:'cnt',autoCarga:false},hiddenName:'pnt_cnt',
                        evt:{
                            'select':function(combo){
                                Ext.getCmp('idPst').getStore().removeListener('load',fTwo);
                                getPuesto();
                            }
                        }
                    })
                ]
            },
            {xtype:'panel',layout:'form',labelAlign:'top',border:false,columnWidth:.33,
                items:[
                    new com.punto.pen.ComboBox({
                        etiqueta:'Puesto',name:'puesto',value:'',width:200,allowBlank:false,id:'idPst',
                        prm:{bnd:12,qry:29,idCampo:'idPst',campo:'pst',autoCarga:false},
                        hiddenName:'puesto'
                    })
                ]
            }
        ]
    });
    return pnl;
}
function getPntCnt(){
    var atn = Ext.getCmp('idPntAtn');
    var pnt = Ext.getCmp('idPntCnt');
    var pst = Ext.getCmp('idPst');
    pnt.clearValue();
    pst.clearValue();
    pst.reset();
    pnt.getStore().load({
        params:{'index':1,'prm1':atn.getValue()}
    });
}
function getPuesto(){
    var pnt = Ext.getCmp('idPntCnt');
    var pst = Ext.getCmp('idPst');
    pst.clearValue();
    pst.getStore().load({
        params:{'index':1,'prm1':pnt.getValue()}
    });
}