/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelModuloSelector = function(argumentos){
    
    this.id = (argumentos.id==null ? '' : argumentos.id);
    this.region = (argumentos.region==null ? '' : argumentos.region);
    this.anchor = (argumentos.anchor==null ? null : argumentos.anchor);
    this.titulo = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.border = (argumentos.border==null ? true : argumentos.border);
    this.height = (argumentos.height==null ? null : argumentos.height);
    this.frame  = (argumentos.frame==null ? false : argumentos.frame);

    var Xtype = (argumentos.isForm==null ? Ext.Panel : (argumentos.isForm==true ? Ext.form.FormPanel: Ext.Panel));
    
    var pnl = new Xtype({
        id:this.id,
        title:this.titulo,
        region:this.region,
        anchor:this.anchor,
        border:this.border,
        height: this.height,
        hideMode: 'offsets',
        frame: this.frame,
        bodyStyle: 'padding: 5px;',
        layout:'form',
        items:[
            {html:'Seleccione los módulos disponibles para este usuario',border:false,style:'font-family: Arial;font-size:12px;'},
            new com.punto.pen.ComboBox({etiqueta:'Módulos'}),
            new Ext.ux.ItemSelector({
                name:"itemselector",
                id:'itemselector',
                fieldLabel:"ItemSelector",
                dataFields:["code", "desc"],
                fromData:[[123,"One Hundred Twenty Three"],
                        ["1", "One"], ["2", "Two"], ["3", "Three"], ["4", "Four"], ["5", "Five"],
                        ["6", "Six"], ["7", "Seven"], ["8", "Eight"], ["9", "Nine"]],
                toData:[["10", "Ten"]],
                msWidth:250,
                msHeight:230,
                valueField:"code",
                displayField:"desc",
                //imagePath:"ext-ux/multiselect",
                //switchToFrom:true,
                fromLegend:"Acciones Disponibles",
                toLegend:"Acciones Asignadas",
                toTBar:[
                    {
                        text:"Limpiar",
                        handler:function(){
                            var i=Ext.getCmp("itemselector");
                            i.reset.call(i);
                        }
                    }
                ]
            })
        ]
    });
    return pnl;
}