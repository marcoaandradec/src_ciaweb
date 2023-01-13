/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

com.punto.pen.PanelCanjeInc = function(idc,prd){

    var pnlCanjeIncompleto = new Ext.FormPanel({
        id:"idPnlDispositivos",
        bodyStyle:"padding:5px 5px 0",
        layout:"form",
        width:987,
        height:382,
        items:[{
            xtype:"fieldset",
            title:"Faltantes",
            layout:"form",
            height:110,
            items:[{
                id:"idDFFaltantes",
                xtype:"datefield",
                fieldLabel:"Fecha",
                allowBlank:false
            },{
                id:"idFaltaRec",
                xtype:"checkbox",
                fieldLabel:"Receta"
            },{
                id:"idFaltaCajas",
                xtype:"checkbox",
                fieldLabel:"Cajas"
            }]
        },{
            xtype:"fieldset",
            title:"Observaciones",
            layout:"column",
            height:120,
            items:[{
                id:"idObsCanjeInc",
                xtype:"textarea",
                allowBlank:false,
                width:300,
                height:80,
                style:'text-transform: uppercase;'
            }]
        }]
        
    });

    return pnlCanjeIncompleto;

}
function nuevoCangIncompleto(idc,prd){
    var fecha = Ext.getCmp("idDFFaltantes");
    var fltRec = Ext.getCmp("idFaltaRec").getValue();
    var fltCaja = Ext.getCmp("idFaltaCajas").getValue();
    var obs = Ext.getCmp("idObsCanjeInc");

    if(fecha.isValid() == true && obs.isValid() == true){
        Ext.Ajax.request({
            url : contexto+'/Canjes',
            params:{
                bnd:13,
                idc:idc,
                prd:prd,
                fecha:fecha.getValue(),
                fltRec:fltRec,
                fltCaja:fltCaja,
                obs:obs.getValue()
            },
            success:function(rsp){
                var bitac=Ext.getCmp("gridBuscadorBitacora");
                bitac.getStore().load();
                var nots = Ext.getCmp("idPanelNotasAnte");
                nots.load({
                    url:contexto + '/Cliente?bnd=9&idCnt='+idc
                });
                var infoGen=Ext.getCmp("pnlInfoGeneral");
                infoGen.load({
                    url:contexto + '/Cliente?bnd=2&idCnt='+idc
                });
                Ext.getCmp("idWndCanjeInc").close();
            },
            failure:function(rsp){

            }
        });
    }else{
        Ext.MessageBox.show({
            title: 'Datos Incompletos',
            msg: 'Debe completar los datos obligatorios para continuar.(Campos marcados con rojo)',
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    }

}

