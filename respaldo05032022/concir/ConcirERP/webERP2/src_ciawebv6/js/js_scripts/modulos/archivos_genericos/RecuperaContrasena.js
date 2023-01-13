/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');
com.punto.pen.RecuperaContrasena = function(argumentos){
    var wnd = new Ext.Window({
        title:'Ayuda de Cuentas',
        id:'idWndRecuContra',
        name:'idWndRecuContra',
        width:666,
        height:198,
        modal:true,
        border:false,
        autoScroll:false,
        draggable:true,
        constrainHeader:true,
        layout: 'fit',
        items: new Ext.FormPanel({
            id:'idFrmRecuContra',
            name:'idFrmRecuContra',
            url: contexto+'/RestablecerContrasena',
            layout:'form',
            layoutConfig: {
                align: 'stretch'
            },
            frame:true,
            defaultType:'textfield',
            monitorValid:true,
            items: [{
                xtype:'fieldset',
                title: 'Problemas para acceder a su cuenta',
                autoHeight:true,
                layout:"form",
                collapsed:false,
                collapsible:false,
                items :[
                    {
                        xtype:'panel',
                        name:'panel1',
                        border:false,
                        width:800,
                        layout:'form',
                        items:[
                            {
                                xtype:'radiogroup',
                                fieldLabel:'Selecciona tu problema',
                                layout:'form',
                                labelAlign:'top',
                                labelStyle:'font-weight:bold;',
                                labelWidth:150,
                                height:50,
                                id:'rd_CRM01_6',
                                name:'rd_CRM01_6',
                                items:[
                                {
                                    xtype:'radio',
                                    name:'rd_CRM01_6',
                                    boxLabel:'He olvidado mi nombre de usuario',
                                    inputValue:'Si',
                                    inputType:'radio',
                                    id:'rd_CRM_Pen_Si',
                                    checked : true,
                                    handler:showHidePanel
                                },

                                {
                                    xtype:'radio',
                                    name:'rd_CRM01_6',
                                    boxLabel:'He olvidado mi contraseña',
                                    inputValue:'No',
                                    inputType:'radio',
                                    id:'rd_CRM_Pen_No',
                                    handler:showHidePanel
                                }
                                ]
                            },
                            {
                                xtype:'panel',
                                name:'txtAux',
                                id:'txtAux',
                                border:false,
                                layout:'column'
                            },
                            {
                                xtype:'panel',
                                name:'panelUsuario',
                                id:'panelUsuario',
                                border:false,
                                layout:'form',
                                hidden: true,
                                labelWidth:250,
                                width:800,
                                items:[{
                                    xtype:'textfield',
                                    fieldLabel:'Introduce tu nombre de usuario',
                                    id:'nameusuario',
                                    name:'nameusuario',
                                    width:200,
                                    labelStyle:'font-weight:bold',
                                    disabled:true,
                                    allowBlank:false
                                }]
                            },

                            {
                                xtype:'panel',
                                name:'panelContrasena',
                                id:'panelContrasena',
                                border:false,
                                layout:'form',
                                labelWidth:250,
                                width:800,
                                items:[
                                    {
                                        xtype:'textfield',
                                        fieldLabel:'Introduce tu correo electrónico',
                                        id:'email',
                                        name:'email',
                                        vtype:'email',
                                        width:200,
                                        labelStyle:'font-weight:bold',
                                        disabled:false,
                                        allowBlank:false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }],
            buttons:[{
                text:"Enviar",
                id:'btnEnviar',
                handler:function(){
                    submitFormulario(Ext.getCmp('idFrmRecuContra'),{wnd:'idWndRecuContra'});
                    //setTimeout("Ext.getCmp('idWndRecuContra').close();",6000);
                }
            },
            {
                text:"Cancelar",
                id:'btnCancelar',
                handler:function(){
                    wnd.close();
                }
            }]
        })
    });
    return wnd;
}
function showHidePanel(){
    var v = Ext.getCmp('rd_CRM_Pen_Si').checked;
    if(v){
        Ext.getCmp('panelUsuario').setVisible(false);
        Ext.getCmp('panelContrasena').setVisible(true);
        Ext.getCmp('nameusuario').setDisabled(true);
        Ext.getCmp('email').setDisabled(false);
    }else{
        Ext.getCmp('panelUsuario').setVisible(true);
        Ext.getCmp('panelContrasena').setVisible(false);
        Ext.getCmp('nameusuario').setDisabled(false);
        Ext.getCmp('email').setDisabled(true);
    }
}