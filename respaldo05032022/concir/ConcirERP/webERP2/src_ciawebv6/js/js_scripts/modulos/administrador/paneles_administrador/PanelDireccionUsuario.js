/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelDireccionUsuario = function(argumentos){
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
            
        ]
     });
     return pnl;
}

