/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * autor: m@rco.@ndr@de
 */

Ext.require([
    'Ext.form.*',
    'Ext.Img',
    'Ext.tree.*',
    'Ext.data.*',
    'Ext.tip.*'
    ]);

Ext.onReady(function() {
    Ext.QuickTips.init();
    var form = Ext.create('Ext.form.Panel', {
        id:'formLogin',
        renderTo: 'divLogin',
        frame: true,
        height: 250,
        width: 350,
        bodyPadding: 10,
        bodyBorder: true,
        autoHeight: true,
        title: '- Bienvenido CIA WEB -',
        items: [
		{
        	xtype:'image',
		ColumnWidth:0.60,			
        	src:contexto+'/img/logoArgo2.png',
        	width:100,
        	height:100,
        	left:200
        	},        
        {
            xtype: 'textfield',
            name: 'username',
            fieldLabel: 'Usuario',
              emptyText: 'Usario',
            allowBlank: false,
            enableKeyEvents: true
        }, {
            xtype: 'textfield',
            name: 'password',
            inputType: 'password',
              emptyText: 'password',
            fieldLabel: 'Contrase&ntilde;a',
            allowBlank: false,
            enableKeyEvents: true,
            cls: 'password'
        }      
    ]
        ,buttons: [{
            xtype: 'button',
            id:'btnEntrar',
            text: 'Enviar',
            width: 95,
            handler: function() {
               accesar();
            }
        },{
            xtype:'button',
            text:'Limpiar',
            width:95,
            handler:function(){                
               this.up('form').getForm().reset();
               Ext.getCmp('btnEntrar').enable();
            }
        }]
    });
});

function accesar(){
    var form=Ext.getCmp('formLogin').getForm();
    if (form.isValid()) {
        Ext.getCmp('btnEntrar').disable();
        form.submit({
            clientValidation: true,
            url:  contexto+'/Usuario?bnd=1',
            success: function(form, action) {
                var dir=action.result.url;
                var user=action.result.usua;
//                alert(user);
//                window.location =  contexto+dir;
                document.getElementById("usuario").value=user;
                document.formLog.submit();
            },
            failure: function(form, action) {
                var msg1="";
                console.log(form);
                msg1=action.result.msg;          
                Ext.Msg.show({
                    title: 'Datos Incorrectos',
                    msg: msg1,
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
        });
    }else{
        Ext.Msg.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar todos los campos !',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    }
}

