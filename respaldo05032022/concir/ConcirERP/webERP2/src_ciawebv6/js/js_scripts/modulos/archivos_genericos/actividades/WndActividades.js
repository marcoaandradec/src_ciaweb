/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.WndActividades = function(argumentos){
    var titulo      = (argumentos.titulo == null ? "" : argumentos.titulo);
    this.autoScroll = (argumentos.scroll == null ? false : argumentos.scroll);
    this.id         = (argumentos.id == null ? '' : argumentos.id);
    var prm         = (argumentos.prm == null ? '' : argumentos.prm);
    var panel       = (argumentos.pnl == null ? {html:'No hay opciones asignadas.',frame:true,border:false} : argumentos.pnl);
    this.drag       = (argumentos.drag == null ? true : argumentos.drag);
    this.modal      = (argumentos.modal == null ? false : argumentos.modal);
    this.width      = (argumentos.width == null ? 1000 : argumentos.width);
    this.height     = (argumentos.height == null ? 300 : argumentos.height);
    this.buttons    = (argumentos.botones == null ? [{text:'Guardar Actividad',handler:function(){submitFormulario(panel,prm);}},{text:'Cancelar',handler:function(){wnd.close();}}] : argumentos.botones);
    this.html       = (argumentos.html == null ? '' : argumentos.html);
    var autoAlto    = (argumentos.autoAlto == null ? false : argumentos.autoAlto);
    var autoAncho   = (argumentos.autoAncho == null ? false : argumentos.autoAncho);
    this.layout     = (argumentos.layout == null ? 'fit' : argumentos.layout);
    this.tbar       = (argumentos.tbar == null ? '' : argumentos.tbar);
    this.resize     = (argumentos.resize == null ? false : argumentos.resize);
    this.frame      = (argumentos.frame == null ? false : argumentos.frame);
    this.closable   = (argumentos.closable == null ? true : argumentos.closable);

    var wnd = new Ext.Window({
        id                  : this.id,
        title               : titulo,
        layout              : this.layout,
        width               : this.width,
        height              : this.height,
        modal               : true,
        constrainHeader     : true,
        draggable           : true,
        html                : this.html,
        buttons             : this.buttons,
        autoScroll          : this.autoScroll,
        autoHeight          : autoAlto,
        autoWidth           : autoAncho,
        tbar                : this.tbar,
        resizable           : this.resize,
        closable            : this.closable,
        items               : [panel]
    });
    return wnd;
}

//var wnd = new com.punto.pen.WndActividades({    id:'wndActividad',width:1000,height:300,    pnl:new com.punto.pen.PanelQSC({id:'',url:'',titulo:'',border:false}),    prm:{'idCnt':'%px%','bnd':0,'wnd':wnd.getId()}});wnd.show();

