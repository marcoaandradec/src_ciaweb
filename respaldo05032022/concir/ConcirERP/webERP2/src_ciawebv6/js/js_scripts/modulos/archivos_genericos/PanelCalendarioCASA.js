/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.PanelCalendario = function(argumentos){
    
    this.id         = (argumentos.titulo==null ? '' : argumentos.id);
    this.titulo     = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.autoLoad   = (argumentos.autoLoad==null ? '' : argumentos.autoLoad);
    this.region     = (argumentos.region==null ? '' : argumentos.region);
    this.border     = (argumentos.border==null ? false : argumentos.border);
    this.tbar       = (argumentos.tbar==null ? '' : argumentos.tbar);
    this.hideMode   = (argumentos.hideMode==null ? 'display' : argumentos.hideMode);

    var idCnt       = (argumentos.idCnt==null ? '' : argumentos.idCnt);

    var panel = new Ext.Panel({
        id          : this.id,
        title       : this.titulo,
        region      : this.region,
        autoScroll  : true,
        collapsible : true,
        hideMode    : this.hideMode,
        //collapseMode: 'mini',
        split       : true,
        //margins     : '2 0 5 5',
        width       : 200,
        minSize     : 200,
        maxSize     : 250,
        autoLoad    : this.autoLoad,
        tbar        : this.tbar
        //html        : ''
    });
    return panel;
}
