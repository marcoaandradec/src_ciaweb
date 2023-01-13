/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelAyuda = function(argumentos){
    this.id =  (argumentos.id==null ? '' : argumentos.id);
    this.items =  (argumentos.items==null ? [] : argumentos.items);
    
    this.pnlPrnAyuda= new Ext.Panel({
        id:     this.id,
        layout: 'border',
        border: false,
        frame:  false,
        items:  this.items
    });
    return this.pnlPrnAyuda;
}