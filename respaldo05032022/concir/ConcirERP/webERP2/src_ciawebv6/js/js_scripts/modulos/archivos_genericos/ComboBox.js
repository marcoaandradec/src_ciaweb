/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.ComboBox = function(argumentos){
    this.id          = (argumentos.id==null ? "" : argumentos.id);
    var name         = (argumentos.name==null ? "" : argumentos.name);
    var etiqueta     = (argumentos.etiqueta==null ? "" : argumentos.etiqueta);
    var titulo     = (argumentos.titulo==null ? "" : argumentos.titulo);
    var allowBlank   = (argumentos.allowBlank==null ? true : argumentos.allowBlank);
    var valor        = (argumentos.value==null ? '' : argumentos.value);
    var tabIndex     = (argumentos.tabIndex==null ? null : argumentos.tabIndex);
    var mode         = (argumentos.mode == null ? 'local' : argumentos.mode);
    var forceSelect  = (argumentos.forceSelection == null ? true : argumentos.forceSelection);
    this.emptyText   = (argumentos.emptyText==null ? null : argumentos.emptyText);
    this.hidden      = (argumentos.hidden==null ? false : argumentos.hidden);
    this.hideLabel   = (argumentos.hideLabel==null ? false : argumentos.hideLabel);
    this.listClass   = (argumentos.listClass==null ? '' : argumentos.listClass);
    this.disabled    = (argumentos.disabled==null ? false : argumentos.disabled);
    this.readOnly    = (argumentos.readOnly==null ? false : argumentos.readOnly);
    this.hideTrigger = (argumentos.hideTrigger==null ? false : argumentos.hideTrigger);


    var ancho        = (argumentos.width==null ? 150 : argumentos.width);
    var autoAncho    = (ancho==0 ? true : false);
    this.columnWidth = (argumentos.columnWidth==null ? 1 : argumentos.columnWidth);

    var activarKeyEvents = (argumentos.activarKeyEvents== null ? false : argumentos.activarKeyEvents);
    var evt              = (argumentos.evt== null ? {} : argumentos.evt);
    var hiddenName       = (argumentos.hiddenName==null ? '' : argumentos.hiddenName);

    var store       = (argumentos.store==null ? null : argumentos.store);
    var campo       = (argumentos.campo==null ? "campo" : argumentos.campo);
    var idCampo     = (argumentos.idCampo==null ? "idCampo" : argumentos.idCampo);
    if(store==null){
        var prm         = (argumentos.prm == null ? null : argumentos.prm);
        var evtStore    = (argumentos.evtStore== null ? {} : argumentos.evtStore);
        if(prm!=null){
            campo   = (prm.campo==null ? campo : prm.campo);
            idCampo = (prm.idCampo==null ? idCampo : prm.idCampo);
        }

        //store = new com.punto.pen.StoreCombo({'bnd':bnd,'idCampo':idCampo,'campo':campo,'qry':qry,'autoLoad':autoCarga,'url':url,'prmIdC':prmIdC});
        store = new com.punto.pen.StoreCombo({
            'prm':prm,
            evt:evtStore
        });
    }

    this.combo = new Ext.form.ComboBox({
        'id'                : this.id,
        'width'             : ancho,
        'listWidth'         : ancho,
        'autoWidth'         : autoAncho,
        'name'              : name,
        'title'             : titulo,
        'fieldLabel'        : etiqueta,
        'store'             : store,
        'displayField'      : campo,
        'valueField'        : idCampo,
        'mode'              : mode,
        'allowBlank'        : allowBlank,
        'triggerAction'     : 'all',
        'forceSelection'    : forceSelect,
        'lazyRender'        : false,
        'lazyInit'          : false,
        'enableKeyEvents'   : activarKeyEvents,
        'listeners'         : evt,
        'hidden'            : this.hidden,
        'hiddenName'        : hiddenName,
        'value'             : valor,
        'columnWidth'       : this.columnWidth,
        'emptyText'         : this.emptyText,
        'tpl'               : '<tpl for="."><div ext:qtip="{' + campo + '}" class="x-combo-list-item">{' + campo + '}</div></tpl>',
        'tabIndex'          : tabIndex,
        'hideLabel'         : this.hideLabel,
        'listClass'         : this.listClass,
        'disabled'          : this.disabled,
        'readOnly'          : this.readOnly,
        'hideTrigger'       : this.hideTrigger
    });
    
    return this.combo;
}