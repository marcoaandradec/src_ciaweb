/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * author: m@rco.@ndrade
 */
Ext.Loader.setConfig({
    enabled: true
});

Ext.Loader.setPath('Ext.ux', contexto+'/js/build7/packages/ux');
Ext.require([
    'Ext.tip.QuickTipManager',
    'Ext.container.Viewport',
    'Ext.layout.*',
    'Ext.form.*',    
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.tree.*',
    'Ext.selection.*',
    'Ext.tab.Panel',
    'Ext.ux.layout.Center',
    'Ext.util.*',
    'Ext.state.*'    
    ]);
// This is the main layout definition.

Ext.onReady(function(){
    //Ext.tip.QuickTipManager.init();

    // This is an inner body element within the Details panel created to provide a "slide in" effect
    // on the panel body without affecting the body's box itself.  This element is created on
    // initial use and cached in this var for subsequent access.
    // Gets all layouts examples
    var layoutExamples = [];
    Ext.Object.each(getModuloFacturas2(), function(name, example){
        layoutExamples.push(example);
    });
    // This is the main content center region that will contain each example layout panel.
    // It will be implemented as a CardLayout since it will contain multiple panels with
    // only one being visible at any given time.
    var contentPanel = {
        id: 'content-panel',
        region: 'center', // this is what makes this panel into a region within the containing layout
        layout: 'card',
        margins: '2 5 5 0',
        activeItem: 0,
        border: false,
        items: layoutExamples
    };
   
    Ext.create('Ext.container.Viewport',{
        layout: 'border',
        title: 'Ext Layout Browser',
        items: [
            Ext.create('Ext.toolbar.Toolbar', {
            region: 'north',
            height: 32, // give north and south regions a height
//            layout: {
//                overflowHandler: 'Menu'
//            },
            items: [
            '<label id="ext-comp-1008" style="color: rgb(45, 139, 255); font-weight: bold; font-size: 12px;">Bienvenid@ : </label>',
            '<label id="ext-comp-1011" style="color: rgb(45, 139, 255); font-weight: normal;">Tus Modulos :</label>',            
                    ,'->',Scriptjs[0],Scriptjs[1],Scriptjs[2],Scriptjs[3],Scriptjs[4],Scriptjs[5],
            Scriptjs[6],Scriptjs[7],Scriptjs[8],Scriptjs[9],Scriptjs[10],
            Scriptjs[11],Scriptjs[12],Scriptjs[13],Scriptjs[14],Scriptjs[15],
            Scriptjs[16],Scriptjs[17],Scriptjs[18],Scriptjs[19],Scriptjs[20],
            Scriptjs[21],Scriptjs[22],Scriptjs[23],Scriptjs[24],Scriptjs[25],
            Scriptjs[26],Scriptjs[27],Scriptjs[28],Scriptjs[29],Scriptjs[30],
            Scriptjs[31],Scriptjs[32],Scriptjs[33],Scriptjs[34],Scriptjs[35],
            Scriptjs[36],Scriptjs[37],Scriptjs[38],Scriptjs[39],Scriptjs[40],
            {
                xtype:'button',
                text:'Cerrar Sesión',
                //iconCls:'icn-cerrarSession',
                //scale:'small',
                handler:function(){
                    closeSession();
                }
            }]
        }),
        Ext.create('Ext.tree.Panel', {
            id: 'tree-panel',
            title: 'Menu',
            region:'west',
            split: true,
            width: 200,
            minWidth: 175,
            maxWidth: 250,
            rootVisible: false,
            lines: false,
            autoScroll: true,
            collapsible: true,
            collapsed :true,
            animCollapse: true,
            collapseFirst   : true,
            disabled :false,
            collapseMode    : 'mini',
            margins: '0 0 0 5',
            useArrows: true,
            store: store
        }),
        contentPanel,
        Ext.create('Ext.toolbar.Toolbar', {
            region: 'south',
            height: 32,
            items: [ '->',{
                xtype:'label',
                html:'Copyright @ 2023. Todos los derechos reservados por Argomex.',
                style:'color: black;'
            },'-','<a href="https://www.argomex.com/" target="_blank"><img  src="'+contexto+'/img/iconArgo.png" width="25" height="25"></a>','-']
        })],
        renderTo: Ext.getBody()
    });
    var treePanel=Ext.getCmp('tree-panel');
    treePanel.getSelectionModel().on('select', function(selModel, record) {
        if (record.get('leaf')) {
       console.log(record.getId());
            if(record.getId()=='3'){
//                var win = Ext.create('MyApp.Consultas');
//                win.show();
//            }else{
              //  FunItemReset(Ext.getCmp(record.getId()));
                //Ext.getCmp('content-panel').layout.setActiveItem(record.getId());
                Ext.getCmp('content-panel').layout.setActiveItem('idMenu300');
                inhabilitar();
            }
        }
        treePanel.getSelectionModel().deselectAll(true);
    });
});
 var store = Ext.create('Ext.data.TreeStore', {
        root: {
            expanded: true
        },
        proxy: {
            type: 'ajax',
            url: contexto+'/Usuario?bnd=3'            
        },
        folderSort: true
    });
function LoadMenu(modulo){
    var Menu = Ext.getCmp('tree-panel');
    var store = Menu.getStore();
    var lastOptions = store.lastOptions,
    lastParams = Ext.clone(lastOptions.params);
    lastParams.parametro=modulo;
   // console.log(lastParams.parametro);
    store.reload({
        params :lastParams
    });
    habilitar();
}
function closeSession(){
    Ext.MessageBox.show({
        title:'Terminar Sesion?',
        msg: '¿Desea terminar la sesion?',
        buttons: Ext.MessageBox.YESNO,
        fn: function(btn){
            if(btn == 'no'){
            }
            if(btn == 'yes'){
                Ext.MessageBox.show({
                    msg: 'Cerrando la sesion, espere por favor...',
                    progressText: 'Guardando...',
                    width:300,
                    wait:true,
                    waitConfig: {
                        interval:200
                    },
                    icon:'ext-mb-download', //custom class in msg-box.html
                    animEl: 'mb7'
                });
                goToUrl(contexto+'/CerrarSesion');
            }
        },
        icon: Ext.MessageBox.QUESTION
    });
}
var coorX = 0;
var coorY = 0;
var toltip = null;
function coordenadasMouse(e){
    if (!e) var e = window.event;
    if (e.pageX || e.pageY){
        coorX = e.pageX;
        coorY = e.pageY;
    }else if (e.clientX || e.clientY){
        coorX = e.clientX;
        coorY = e.clientY;
    }
}