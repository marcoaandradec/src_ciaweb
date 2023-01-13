/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');

com.punto.pen.StoreCombo = function(argumentos){
    var bnd         = (argumentos.bnd==null ? "0" : argumentos.bnd);
    var qry         = (argumentos.qry==null ? "0" : argumentos.qry);
    var prmIdC         = (argumentos.prmIdC==null ? "0" : argumentos.prmIdC);
    
    this.prm        = (argumentos.prm==null ? {} : argumentos.prm);
    this.evt        = (argumentos.evt==null ? {} : argumentos.evt);
    var campo       = (this.prm.campo==null ? "campo" : this.prm.campo);
    var idCampo     = (this.prm.idCampo==null ? "idCampo" : this.prm.idCampo);
    var autoLoad    = (this.prm.autoCarga==null ? false : this.prm.autoCarga);
    var url         = (this.prm.url==null ? contexto+'/ComboLoader' : this.prm.url);
    //var prm         = (argumentos.prm==null []);

    this.store = new Ext.data.Store({
        'autoLoad'    : autoLoad,
        //'baseParams'  : {'bnd':bnd,'idCampo':idCampo,'campo':campo,'qry':qry,'prmIdC':prmIdC},
        'baseParams'  : this.prm,
        'reader'      : new Ext.data.JsonReader( {
            'fields' : [idCampo, campo],
            'root'   : 'records'
        }),
        'proxy'       : new Ext.data.HttpProxy( {
            'url' : url
        }),
        listeners     : this.evt
    });

    return this.store;
}