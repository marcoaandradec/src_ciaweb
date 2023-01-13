/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.TreePanel = function(argumentos){
    this.id             = (argumentos.id==null ? '' : argumentos.id);
    this.prm            = (argumentos.prm==null ? {} : argumentos.prm);
    this.url            = (argumentos.url==null ? '' : argumentos.url);
    this.width          = (argumentos.ancho==null ? 150 : argumentos.ancho);
    this.titulo         = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.region         = (argumentos.region==null ? '' : argumentos.region);
    this.maxSize        = (argumentos.maxTam==null ? 300 : argumentos.maxTam);
    this.minSize        = (argumentos.minTam==null ? 150 : argumentos.minTam);
    this.tbar           = (argumentos.tbar==null ? null : argumentos.tbar);
    this.border         = (argumentos.border==null ? true : argumentos.border);
    this.disabled       = (argumentos.disabled==null ? false : argumentos.disabled);
    this.useArrows      = (argumentos.useArrows==null ? true : argumentos.useArrows);
    this.collapsible    = (argumentos.collapsible==null ? true : argumentos.collapsible);
    this.collapsed      = (argumentos.collapsed==null ? false : argumentos.collapsed);
    this.evtTreeLdl     = (argumentos.evtTreeLdl==null ? {} : argumentos.evtTreeLdl);
    this.evtTreeNde     = (argumentos.evtTreeNde==null ? {} : argumentos.evtTreeNde);
    this.evtTreePnl     = (argumentos.evtTreePnl==null ? {} : argumentos.evtTreePnl);

    var tl = new Ext.tree.TreeLoader({
        dataUrl         : this.url,
        preloadChildren : true,
        baseParams      : this.prm,
        listeners       : this.evtTreeLdl
    });

    var root = new Ext.tree.AsyncTreeNode({
        text      : 'Reportes',
        draggable : false,
        id        : '0',
        listeners : this.evtTreeNde
    });

    var pnlTree = new Ext.tree.TreePanel({
        id		: this.id,
        region		: this.region,
        title		: this.titulo,
        split		: true,
        border		: this.border,
        width		: this.width,
        minSize		: this.minSize,
        maxSize		: this.maxSize,
        collapsible	: this.collapsible,
        collapsed       : this.collapsed,
        useArrows       : this.useArrows,
        frame		: false,
        rootVisible	: false,
        lines		: false,
        autoScroll	: true,
        root		: root,
        loader          : tl,
        collapseFirst   : false,
        collapseMode    : 'mini',
        anchor          : '100%',
        disabled        : this.disabled,
        tbar            : this.tbar,
        listeners       : this.evtTreePnl
    });
    
    return pnlTree;
}