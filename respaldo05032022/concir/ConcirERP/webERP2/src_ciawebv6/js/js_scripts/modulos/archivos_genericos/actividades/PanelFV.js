/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelFarmacoVigilancia = function(argumentos){
    this.id = (argumentos.id==null ? '' : argumentos.id);

    this.url = (argumentos.url==null ? '' : argumentos.url);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    
    this.height = (argumentos.height==null ? 0 : argumentos.height);
    this.autoAlto = (this.height==0 ? true : false);
    this.autoScroll = (argumentos.autoScroll==null ? false : argumentos.autoScroll);

    this.region = (argumentos.region==null ? '' : argumentos.region);

    var pnlFV = new Ext.form.FormPanel({
        id:this.id,
        border:this.border,
        url: this.url,
        title:this.titulo,
        bodyStyle:"padding:5px",
        labelWidth:180,
        frame:false,
        region: this.region,
        height:this.height,
        autoHeight:this.autoAlto,
        autoScroll:this.autoScroll,
        items:[
//            {
//            xtype:"combo",
//            title:"Datos del Paciente",
//            autoHeight:true,
//            fieldLabel:"¿Quién notificó la reacción?"
//        },
        new com.punto.pen.ComboBox({
            id:"idComboQuienNotifico",
            etiqueta:"¿Quién notificó la reacción?",
            name:"cmbQuienNotifico",
            prm:{campo:"Quien",idCampo:'idQuien',autoCarga:true,bnd:1,qry:11}
        }),

        {
            xtype:"fieldset",
            title:"Nota",
            autoHeight:true,
            items:[{
                xtype:"panel",
                layout:"form",
                border:false,
                frame:false,
                hideLabels:true,
                items:[{
                    xtype:"htmleditor",
                    name:"editorNota",
                    id:"idEditorNota",
                    hideLabels:true,
                    width:900
                }]
            }]
        },{
            xtype:"fieldset",
            title:"Información de Medicamento",
            autoHeight:true,
            items:[{
                xtype:"panel",
                layout:"column",
                border:false,
                frame:false,
                items:[{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:0.5,
                    items:[
//                    {
//                        xtype:"combo",
//                        fieldLabel:"Medicamento"
//                    }
                    new com.punto.pen.ComboBox({
                        id:"idComboMedicamento",
                        etiqueta:"Medicamento",
                        name:"cmbMedicamento",
                        prm:{campo:"Medicamento",idCampo:"idMedicamento",autoCarga:true,bnd:5,qry:5},
                        width:250,
                        hiddenName:"cmbMedicamento"
                    })]
                },{
                    xtype:"panel",
                    layout:"form",
                    border:false,
                    frame:false,
                    columnWidth:0.5,
                    items:[
//                    {
//                        xtype:"combo",
//                        fieldLabel:"Tipo de Evento"
//                    }
                     new com.punto.pen.ComboBox({
                            id:"idComboTipoEv",
                            etiqueta:"Tipo de evento",
                            name:"cmbTipoEvento",
                            prm:{campo:"tipoEvento",idCampo:"idTipoEvento",autoCarga:true,bnd:5,qry:12},
                            evt:{
                                'select':function(){
                                   Ext.getCmp("idHidenTipoEv").setValue(Ext.getCmp("idComboTipoEv").getValue());
                                }
                            }
                        }),
                    {
                      xtype:"hidden",
                      name:"hidenTipoEv",
                      id:"idHidenTipoEv",
                      value:"0"
                    }]
                }]
            }]
        }]
    });
    return pnlFV;
}