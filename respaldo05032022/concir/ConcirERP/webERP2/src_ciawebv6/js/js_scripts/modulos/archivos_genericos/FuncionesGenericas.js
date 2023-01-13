/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
function inhabilitar(){
    var Menu = Ext.getCmp('tree-panel');
    Menu.collapse();
    Menu.setDisabled(true);
}
function habilitar(){
    Ext.getCmp('content-panel').layout.setActiveItem('start-panel');
    var Menu = Ext.getCmp('tree-panel');
    Menu.expand(true);
    Menu.setDisabled(false);
}
/* Propiedades y funciones de Combo*/
var states = [{
    "abbr":"AL",
    "name":"Alabama",
    "slogan":"The Heart of Dixie"
},{
    "abbr":"AK",
    "name":"Alaska",
    "slogan":"The Land of the Midnight Sun"
},{
    "abbr":"AZ",
    "name":"Arizona",
    "slogan":"The Grand Canyon State"
} ];
function createStore(id,nom,bnd,qry) {    
    var objCombo =Ext.create('Ext.data.Store', {
        autoDestroy: true,
        autoLoad: true,
       // model: 'datosCombo',
        proxy: {
            type: 'ajax',
            url: contexto+'/ComboLoader?bnd='+bnd+'&qry='+qry+'&idCampo='+id+'&campo='+nom,
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: 'records'
            }
        }
    }); 
            
//           Ext.create('Ext.data.Store', {
//    fields: ['idTAlmacen', 'tipAlmacen'],
//    data: [{
//        "idTAlmacen": 1,
//        "tipAlmacen": "Concir"
//    }, {
//        "idTAlmacen": 2,
//        "tipAlmacen": "Argomex"
//    }, {
//        "idTAlmacen": 3,
//        "tipAlmacen": "Nestle"
//    }]
//});
return objCombo;
    // The data store holding the states; shared by each of the ComboBox examples below
    /*return Ext.create('Ext.data.Store', {
        autoDestroy: true,
        autoLoad: true,
        model: 'datosCombo',
        proxy: {
            type: 'ajax',
            url: contexto+'/ComboLoader?bnd='+bnd+'&qry='+qry+'&idCampo='+id+'&campo='+nom,
            reader: {
                type: 'json',
                successProperty: 'success',
                rootProperty: 'records'
            }
        }
    });*/
}
//carga de datos de  formularios
function loadFormulario(formulario,parametros){
    var prm = (parametros==null ? {} : parametros);
    var url = (prm.url==null ? '' : prm.url);
    var msg = (prm.msg==null ? 'Cargando, Espere por favor' : prm.msg);
    var form = formulario.getForm();
    form.load({
        url:url,
        params:prm,
        waitTitle:'Espere un momento por favor...',
        timeout:150000,
        waitMsg:msg,
        success:function (form, action){
            if(action.result.tieneRadChk == true){
                doSeleccionRadioChecks(action.result.funciones);
            }else{
        }
        },
        failure:function(form, action){
            if(action.result.accion1=='false'){
                var w = Ext.getCmp(action.result.wnd);
                w.close();
                Ext.MessageBox.show({
                    title: 'Información',
                    msg: 'No existe la Informacion Solicitada.',
                    buttons: Ext.MessageBox.OK,
                    icon: Ext.MessageBox.WARNING
                });
            }
            if(action.result.sesion!=null){
                getSession();
            }
        }
    });
}
function doSeleccionRadioChecks(arrayFunc){
    for(var i = 0; i < arrayFunc.length; i++){
        var json = arrayFunc[i];
        json.funcion(json.prm1,json.prm2);
    }
}
function FunItemReset(cmp){
    if(cmp.items!=null || cmp.items!=undefined){
        for(var i = 0; i<cmp.items.length;i++){
            var cm = cmp.getComponent(i);
            if(cm.getXType()=='panel' || cm.getXType()=='fieldset'||cm.getXType()=='container'||cm.getXType()=='gridview'){
                FunItemReset(cm);
            }else
            if(cm.getXType()=='textfield'){
                cm.reset();
            }else
            if(cm.getXType()=='textarea'){
                cm.reset();
            }else
            if(cm.getXType()=='combobox'){
                cm.reset();
            }else
            if(cm.getXType()=='combo'){
                cm.reset();
            }else
            if(cm.getXType()=='radio'){
                cm.reset();
            }else
            if(cm.getXType()=='radiogroup'){
                cm.reset();
            }else
            if(cm.getXType()=='checkbox'){
                cm.reset();
            }else
            if(cm.getXType()=='numberfield'){
                cm.reset();
            }else
            if(cm.getXType()=='datefield'){
                cm.reset();
            }else
            if(cm.getXType()=='gridpanel'){
                var store= cm.getStore();
                store.load({
                    url: contexto+'/Factura?bnd=6'
                    });               
            }
        }
    }
}