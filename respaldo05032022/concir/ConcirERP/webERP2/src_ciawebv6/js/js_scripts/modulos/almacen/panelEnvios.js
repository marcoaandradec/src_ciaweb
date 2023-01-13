/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("com.punto.pen");

var envSelecs;
var cons;

function asignarCons(consul){
    cons = consul;
}

com.punto.pen.panelEnvioAlmacen = function(parametros){
    this.id = (parametros.id==null ? '' : parametros.id);    
    this.titulo = (parametros.titulo==null ? 'Almacen' : parametros.titulo);
    var cerrados = (parametros.cerrados == null ? false : parametros.cerrados);
    var idc = (parametros.idc == null ? 0 : parametros.idc);
    var btnVis = (parametros.btnVis == null ? true : parametros.btnVis);
    var sttus = (parametros.sttus == null ? 0 : parametros.sttus);    
    var consul = (parametros.consul == null ? 0 : parametros.consul);
    var canalizar = (parametros.canalizar == null ? true : parametros.canalizar);
    var idTree = (parametros.idTree == null ? 'pnlTreeAccionesCASA' : parametros.idTree);
    var mnsg = (parametros.mnsg == null ? 'C.A.S.A' : parametros.mnsg);
    var valStatus = "";
    var cf = "";
    var filtro = "";
    var reim = true;
    var qry = 53;

    var datos = [];    

    var rt = Ext.data.Record.create([
           {name: 'indice'},//0
           {name: 'idEnvio'},//1
           {name: 'origen'},//2
           {name: 'direccion', type: 'string'},//3
           {name: 'observacion', type: 'string'},//4
           {name: 'fecha', type: 'string'},//5
           {name: 'nombre', type: 'string'},//6
           {name: 'telCasa', type: 'string'},//7
           {name: 'tipoEnvio', type: 'string'},//8
           {name: 'mensajeria', type: 'string'},//9
           {name: 'noCliente', type: 'string'},//10
           {name: 'telCel', type: 'string'},//11
           {name: 'calle', type: 'string'},//12
           {name: 'nExterior', type: 'string'},//13
           {name: 'nInterior', type: 'string'},//14
           {name: 'colonia', type: 'string'},//15
           {name: 'delMun', type: 'string'},//16
           {name: 'edo', type: 'string'},//17
           {name: 'cp', type: 'string'},//18
           {name: 'calle1', type: 'string'},//19
           {name: 'calle2', type: 'string'},//20
           {name: 'ref1', type: 'string'},//21
           {name: 'ref2', type: 'string'},//22
           {name: 'idc', type:'string'},//23
           {name: 'fechaEnvio', type: 'string'},//24
           {name: 'fechaEntrega', type: 'string'},//25
           {name: 'fechaEstimada', type: 'string'},//26
           {name: 'numGuia', type: 'string'},//27
           {name: 'quienRecibio', type: 'string'},//28
           {name: 'parentesco', type: 'string'},//29
           {name: 'obsPendiente', type: 'string'},//30
           {name: 'obsCancelado', type: 'string'},//31
           {name: 'status', type: 'string'},//32
           {name: 'cobertura', type: 'string'},//33
           {name: 'obsDevuelto', type: 'string'},
           {name: 'obsCanaliza', type: 'string'}
       ]
    );

    var myStore = new Ext.data.Store({
        // explicitly create reader
        reader: new Ext.data.ArrayReader(
            {
                idIndex: 0  // id for each record will be the first element
            },
            rt // recordType
        )
    });    

    myStore.loadData(datos);
    
    
    if(cerrados == true){
        valStatus = "Cerrado";
        reim = false;
        consul = (consul != 3 ? 1 : consul);
        if(idc == 0){
            consul = (consul != 3 ? 2 : consul);
        }
        qry = 70;
    }
    asignarCons(consul);
       

    var store = new Ext.data.Store({
        autoLoad : false,
        baseParams : this.prm,
        reader : new Ext.data.JsonReader(
        {
            totalProperty : 'total',
            root : 'records',
            idProperty : 'idEnvio'
        },
        new com.punto.pen.EnvioAlmacen()),
        proxy : new Ext.data.HttpProxy({           
            url : contexto+'/Almacen',
            timeout:360000
        }),
        listeners:{
            'loadexception':function(){
                store.removeAll();
            },            
            'beforeload':function(st){
                var cmb = Ext.getCmp('idComboStatusEnvio');
                if(cmb != undefined){
                    st.baseParams = {
                        opc:1,
                        idStatus:sttus,
                        consul:consul,
                        idc:idc,                       
                        cf:cf
                    };
                }               
            },
            'load':function(st,rec,op){
                if(cerrados == true){
                    if(Ext.getCmp("idComboStatusEnvio").getValue() == 16 || Ext.getCmp("idComboStatusEnvio").getRawValue() == "Cerrado"){
                        Ext.getCmp("idStatusCancelado").setVisible(true);
                    }
                }                
            }
        }        
    });

    this.pbarAlmacen = new Ext.PagingToolbar({
        id          : 'pgrid',
        pageSize    : 20,
        store       : store,
        displayInfo : true,
        displayMsg  : 'Mostrando {0} - {1} Clientes de {2}',
        emptyMsg    : "No hay datos para mostrar"
    });
    
    var sm = new Ext.grid.CheckboxSelectionModel({    
    singleSelect:false,   
    listeners: {
        beforerowselect: function (sm,row_index, keepExisting, record) {
            sm.suspendEvents();
            if (sm.isSelected(row_index)) {
                sm.deselectRow(row_index);
                record.set('cantidad','0');
            } else {
                sm.selectRow(row_index, true);
            }
            sm.resumeEvents();

            var grd = Ext.getCmp(id);
            var records = grd.getSelectionModel().getSelections(); 

//            if(Ext.getCmp("idComboStatusEnvio").getValue()==1 || Ext.getCmp("idComboStatusEnvio").getValue()==2){
//            }else{
//                sm.clearSelections(false);
//            }

            //return false;
           
        },
        selectionchange:function(sm){
            var grd = Ext.getCmp(id);
            var records = grd.getSelectionModel().getSelections();
            var arrayHabs0 = new Array(true,true,true,true,true,true,true,true,true,true,true,true);
            var arrayHabs1 = new Array(false,false,false,false,false,false,false,false,false,false,false,false);
            var arrayHabs1Mas = new Array(false,false,true,true,true,true,true,false,true,false,true,false);

            if(records.length == 0){
                habilitarBotones(arrayHabs0);
            }else if(records.length == 1){
                habilitarBotones(arrayHabs1);
            }else if(records.length > 1){
                habilitarBotones(arrayHabs1Mas);
            }
            envSelecs = "";

            for(var i = 0; i < records.length; i++){
                envSelecs += records[i].get('idEnvio') + ",";
            }
            //alert(envSelecs);
        }
      }
    });    

    var panel = new Ext.Panel({
        id: "idPanelGridsAlmacen",        
        layout:"accordion",
        frame: true,
        anchor:"100%",
        items:[new Ext.grid.EditorGridPanel({           
            id              : id,
            tbar            :[{
                text:'Regresar',
                hidden:btnVis,
                iconCls:'icn-back',
                handler:function(){
                    IniciarAccion(idTree,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({
                        msg:mnsg
                    }));
                }
            },'-',{
                xtype:"label",
                text:"Status:"
            },
        new com.punto.pen.ComboBox({
            id:"idComboStatusEnvio",
            etiqueta:"Ver Estados de Envio",
            allowBlank:false,
            name:"statusEnvio",
            value:valStatus,
            evt:{
                'select':function(cmb){
                    MnsWaiting();
                    var grid = Ext.getCmp(id);
                    var store = grid.getStore();
                    sttus=cmb.getValue();
                    cf = "";
                    filtro = "";                   

                    store.load({
                        params:{
                            start:0,
                            limit:20
                        }
                    });
                    var arrVis1 = new Array(true,true,true,false,false,false,false,canalizar,canalizar,true,false,false,false);
                    //var arrVis2 = new Array(false,false,true,true,false,false,false,false,false,true,false,true);
                    var arrVis2 = new Array(true,false,true,true,false,false,false,canalizar,canalizar,true,false,true,false);
                    var arrVis4 = new Array(true,false,true,false,true,false,false,false,false,false,false,false,true);
                    var arrVis5 = new Array(true,false,false,false,false,true,false,false,false,false,false,false,false);
                    var arrVis7o16 = new Array(true,false,false,false,false,false,false,false,false,false,false,false,false);
                    var arrReimp = new Array(true,false,false,false,false,false,true,false,false,false,false,false,false);
                    var arrVisV1 = new Array(true,false,true,false,false,false,false,canalizar,canalizar,false,true,false,false);
                    var arrVisV18 = new Array(false,false,false,false,false,false,false,false,false,false,false,false,false);

                    if(cmb.getValue()=='1'){
                        visualizarBotones(arrVis1);
                    }else if(cmb.getValue() == '2'){
                        visualizarBotones(arrVis2);
                    }else if(cmb.getValue() == '4'){
                        visualizarBotones(arrVis4);
                    }else if(cmb.getValue() == '5'){
                        visualizarBotones(arrVis5);
                    }else if(cmb.getValue() == '7' || cmb.getValue() == '16' || cmb.getValue() == '6'){
                        visualizarBotones(arrVis7o16);
                    }else if(cmb.getValue() == '8'){
                        visualizarBotones(arrVisV1);
                    }else if(cmb.getValue() == '18'){
                        visualizarBotones(arrVisV18);
                    }
                    MnsWaiting().hide();
                }
            },
            prm:{
                campo:"status",
                idCampo:"idStatusEnvio",
                autoCarga:true,
                bnd:5,
                qry:qry
            }
        }),'-',{
                xtype:"label",
                text:"Filtrar:"
        },{
                xtype:"combo",
                id:"idcmbCriterioFiltro",
                width:100,
                mode:"local",
                name:"cmbCriterioFiltro",
                autoSelect:true,
                triggerAction:'all',
                store:[["idEnvio","Folio"],["idc","No. paciente"],["origen","Origen orden"],["nombre","Nombre"],["direccion","Direccion"],["observacion","Observación"],["noguia","No. de guia"]]
        },{
                xtype:"textfield",
                id:"idTxtFiltrar",
                enableKeyEvents:true,
                width:90,
                style:'text-transform: uppercase;',
                listeners:{
                    'keypress':function(txt,e){
                        if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                                    e.stopEvent();
                                }
                        if(e.keyCode==13){
                            sttus = (cerrados == true ? 16 : Ext.getCmp("idComboStatusEnvio").getValue());

                            if(sttus == ""){
                                var arrVis7o16 = new Array(false,false,false,false,false,false,false,false,false,false,false);
                                visualizarBotones(arrVis7o16);
                            }
                            
                            filtro = Ext.getCmp("idcmbCriterioFiltro").getValue();
                            
                            if(filtro == "idEnvio"){
                                cf = " AND e.eIdEnvio = " + txt.getValue();
                            }else if(filtro == "idc"){
                                cf = " AND e.eIdCliente.cIdCliente = " + txt.getValue();
                            }else if(filtro == "origen"){
                                cf = " AND e.eIdSucursalOrigen.oNombreOrigen like '%" + txt.getValue() + "%'";
                            }else if(filtro == "nombre"){
                                cf = " AND CONCAT(e.eIdCliente.cNombre,' ',e.eIdCliente.cApellidoPaterno,' ',e.eIdCliente.cApellidoMaterno) like '%" + txt.getValue() + "%'";
                            }else if(filtro == "direccion"){
                                cf = " AND concat(e.eIdDireccion.cdEstado,' ',e.eIdDireccion.cdDelegacionMunicipio,' ',e.eIdDireccion.cdColonia,' ',e.eIdDireccion.cdCalle) like '%" + txt.getValue() + "%'";
                            }else if(filtro == "observacion"){
                                cf = " AND e.eObservaciones like '%" + txt.getValue() + "%'";
                            }else if(filtro == "noguia"){
                                cf = " AND e.eNumeroGuia = '" + txt.getValue() + "'";
                            }else{
                                cf = "";
                            }
                            
                            var grid = Ext.getCmp(id);
                            var store = grid.getStore();
//                            var criterio = Ext.getCmp("idcmbCriterioFiltro");
//                            grid.store.filter(criterio.getValue(),txt.getValue());//

                            store.load({
                                params:{
                                    start:0,
                                    limit:20
                                }
                            });
                        }

                    }
//                    'keyup':function(txt,e){
//                        var grid = Ext.getCmp(id);
//                        var criterio = Ext.getCmp("idcmbCriterioFiltro");
//                        grid.store.filter(criterio.getValue(),txt.getValue());
//                    }

                }

        },{
            xtype:"button",
            text:'Buscar',
            iconCls:'icn-busquedaDos',
            handler:function(){
                sttus = (cerrados == true ? 16 : Ext.getCmp("idComboStatusEnvio").getValue());

                if(sttus == ""){
                    var arrVis7o16 = new Array(false,false,false,false,false,false,false,false,false,false,false);
                    visualizarBotones(arrVis7o16);
                }
                
                filtro = Ext.getCmp("idcmbCriterioFiltro").getValue();
                var txt = Ext.getCmp("idTxtFiltrar");

                if(filtro == "idEnvio"){
                    cf = " AND e.eIdEnvio = " + txt.getValue();
                }else if(filtro == "idc"){
                    cf = " AND e.eIdCliente.cIdCliente = " + txt.getValue();
                }else if(filtro == "origen"){
                    cf = " AND e.eIdSucursalOrigen.oNombreOrigen like '%" + txt.getValue() + "%'";
                }else if(filtro == "nombre"){
                    cf = " AND CONCAT(e.eIdCliente.cNombre,' ',e.eIdCliente.cApellidoPaterno,' ',e.eIdCliente.cApellidoMaterno) like '%" + txt.getValue() + "%'";
                }else if(filtro == "direccion"){
                    cf = " AND concat(e.eIdDireccion.cdEstado,' ',e.eIdDireccion.cdDelegacionMunicipio,' ',e.eIdDireccion.cdColonia,' ',e.eIdDireccion.cdCalle) like '%" + txt.getValue() + "%'";
                }else if(filtro == "observacion"){
                    cf = " AND e.eObservaciones like '%" + txt.getValue() + "%'";
                }else if(filtro == "noguia"){
                    cf = " AND e.eNumeroGuia = '" + txt.getValue() + "'";
                }else{
                    cf = "";
                }

                var grid = Ext.getCmp(id);
                var store = grid.getStore();
//                            var criterio = Ext.getCmp("idcmbCriterioFiltro");
//                            grid.store.filter(criterio.getValue(),txt.getValue());//

                store.load({
                    params:{
                        start:0,
                        limit:20
                    }
                });
               
            }

        },'-',
        {
            xtype:'button',
            id:'idImprimirEnviosAbiertos',
            text:'Imprimir',
            iconCls:'icn-imprimir',
            hidden:true,
            disabled:true,
            handler:function(){
                MnsWaiting();
                var grid = Ext.getCmp(id);
                var cmb = Ext.getCmp('idComboStatusEnvio');
                if(cerrados == true || cmb.getValue() != '1'){

                    document.frmPdfEnvio.idEnvio.value = envSelecs;

                    //alert(document.frmPdfEnvio.idEnvio.value);

                    var formulario = document.frmPdfEnvio;
                    needToConfirm=false;
                    formulario.submit();
                }
                if(cmb.getValue()=='1'){
                    imprimirPapeleta(grid);
                }
                MnsWaiting().hide();
            }
        },'-',{
            xtype:'button',
            id:'idStatusEnProceso',
            text:'En proceso',
            iconCls:'icn-habilita',
            hidden:true,
            disabled:true,
            handler:function(){
                var valido = true;
                var grd = Ext.getCmp(id);
                var records = grd.getSelectionModel().getSelections();
                for(var i = 0; i < records.length; i ++){
                    if(records[i].get("mensajeria") == "<i>Sin especificar</i>" || records[i].get("cobertura") == "<i>Sin especificar</i>" || records[i].get("tipoEnvio") == "Personal"){
                        valido = false;
                        break;
                    }
                }
                if(valido == true){
                    cambiarStatusEnvios(id,2,"En proceso");
                }else{
                    Ext.Msg.show({
                        title:'En proceso',
                        msg: 'A uno o mas registros no se le a especificado Tipo de envio y/o mensajeria.',
                        buttons: Ext.Msg.OK
                    });
                }
            }
        },'-',{
            xtype:'button',
            id:'idStatusPendiente',
            text:'Pendiente',
            iconCls:'icn-deshabilita',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,8,"Pendiente");
            }
        },'-',{
            xtype:'button',
            id:'idStatusCancelado',
            text:'Cancelar envio',
            iconCls:'icn-cancela',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,7,"Cancelado");
            }
        },'-',{
            xtype:'button',
            id:'idStatusEnviado',
            text:'Enviar',
            iconCls:'icn-habilita',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,4,"Enviado");
            }
        },'-',{
            xtype:'button',
            id:'idStatusConfirmEntrega',
            text:'Confirmar entrega',
            iconCls:'icn-habilita',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,5,"Confirmado de entregado");
            }
        },'-',{
            xtype:'button',
            id:'idStatusCerrarEnvio',
            text:'Cerrar envio',
            iconCls:'icn-habilita',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,16,"Cerrado");
            }
        },{
            xtype:'button',
            id:'idReimprimir',
            text:'Reimprimir',
            iconCls:'icn-imprimir',
            hidden:reim,
            handler:function(){
                var grid = Ext.getCmp(id);
                var record = grid.getSelectionModel().getSelected();
                if(record == undefined){
                    exit();
                }
                document.frmPdfEnvio.idEnvio.value = record.get('idEnvio');

                var formulario = document.frmPdfEnvio;
                needToConfirm = false;
                formulario.submit();
            }
        },'-',{
            xtype:"label",
            id:"idLabelCanalizar",
            text:"Canalizar:",
            hidden:true
        },new com.punto.pen.ComboBox({
                hidden:true,
                id:"idCmbCanalizar",
                etiqueta:"Canalizar envio",
                disabled:true,
                name:"cmbDestino",
                prm:{
                    campo:"destino",
                    idCampo:'idDestino',
                    autoCarga:true,
                    bnd:5,
                    qry:57
                },
                evt:{
                'select':function(cmb){
                    var grid = Ext.getCmp(id);
                    var record = grid.getSelectionModel().getSelected();
                     ventanaObservacionEnvio({
                        grid:grid,
                        record:record,
                        newSt:0,
                        strStatus:"Canalizado",
                        titulo:"Canalizar",
                        txtButon:"Canalizar",
                        params:{
                            opc:4,
                            idEnv:record.get('idEnvio'),
                            idSuc:cmb.getValue()
                        },
                        msg:'¿Confirma  que quiere canalizar el envio a ' + cmb.getRawValue() + '?'
                    });
                    
//                     Ext.Msg.show({
//                        title:'Status envio',
//                        msg: '¿Confirma  que quiere canalizar el envio a ' + cmb.getRawValue() + '?',
//                        buttons: Ext.Msg.YESNO,
//                        //animEl: 'elId',
//                        icon: Ext.MessageBox.WARNING,
//                        fn: function(btn){
//                            if(btn == 'no'){
//                            }
//                            if(btn == 'yes'){
//                               MnsWaiting();
//                               var grid = Ext.getCmp(id);
//                               var record = grid.getSelectionModel().getSelected();
//
//                               Ext.Ajax.request({
//                                    url : contexto+'/Almacen',
//                                    params:{
//                                        opc:4,
//                                        idEnv:record.get('idEnvio'),
//                                        idSuc:cmb.getValue()
//                                    },
//                                    success:function(rsp){
//                                        var store = grid.getStore();
//                                        store.load({
//                                            params:{
//                                                start:0,
//                                                limit:20
//            //                                    opc:1,
//            //                                    idStatus:cmb.getValue()
//                                            }
//                                        });
//                                        MnsWaiting().hide();
//
//                                    },
//                                    failure:function(rsp){
//
//                                    }
//                                });
//
//                               MnsWaiting().hide();
//                           }
//                       }
//                   })
                  
                }
            }
            }),'-',{
            xtype:'button',
            id:'idStatusVolverAbrir',
            text:'Volver abrir',
            iconCls:'icn-habilita',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,1,"Abierto");
            }
        },{
            xtype:"button",
            id:"idButonGeneraExcel",
            text:'Preparar Excel',
            iconCls:'icn-excel',
            hidden:true,
            disabled:true,
            handler:function(){
                var grid = Ext.getCmp(id);
                //var record = grid.getSelectionModel().getSelected();
                var record = grid.getSelectionModel().getSelections();

                for(var i = 0; i < record.length; i++){
                    var registro = [
                        record[i].get("indice"),
                        record[i].get("idEnvio"),
                        record[i].get("origen"),
                        record[i].get("direccion"),
                        record[i].get("observacion"),
                        record[i].get("fecha"),
                        record[i].get("nombre"),
                        record[i].get("telCasa"),
                        record[i].get("tipoEnvio"),
                        record[i].get("mensajeria"),
                        record[i].get("noCliente"),
                        record[i].get("telCel"),
                        record[i].get("calle"),
                        record[i].get("nExterior"),
                        record[i].get("nInterior"),
                        record[i].get("colonia"),
                        record[i].get("delMun"),
                        record[i].get("edo"),
                        record[i].get("cp"),
                        record[i].get("calle1"),
                        record[i].get("calle2"),
                        record[i].get("ref1"),
                        record[i].get("ref2"),
                        record[i].get("idc"),
                        record[i].get("fechaEnvio"),
                        record[i].get("fechaEntrega"),
                        record[i].get("fechaEstimada"),
                        record[i].get("numGuia"),
                        record[i].get("quienRecibio"),
                        record[i].get("parentesco"),
                        record[i].get("obsPendiente"),
                        record[i].get("obsCancelado"),
                        record[i].get("status"),
                        record[i].get("cobertura"),
                        record[i].get("entregar_a")
                    ];
                    datos.splice(datos.length,0,registro);                    
                }
                sm.clearSelections(false);
                myStore.loadData(datos);
                Ext.Msg.show({
                    title:'Aviso',
                    msg: "Se prepararon " + record.length + " registros para mandar a Excel.",
                    buttons: Ext.Msg.OK
                });

            }

        },'-',{
            xtype:'button',
            id:'idStatusDevuelto',
            text:'Devuelto',
            iconCls:'icn-regresar',
            hidden:true,
            disabled:true,
            handler:function(){
                cambiarStatusEnvios(id,6,"Devuelto");
            }
        }
//        ,
//        {                   // <-- Add the action directly to a toolbar
//                text: 'Cambiar status',
//                menu: [new Ext.Action({
//                            text:'En proceso',
//                            iconCls:'icn-habilita',
//                            handler: function(){
//                                var valido = true;
//                                var grd = Ext.getCmp(id);
//                                var records = grd.getSelectionModel().getSelections();
//                                for(var i = 0; i < records.length; i ++){
//                                    if(records[i].get("mensajeria") == "<i>Sin especificar</i>" || records[i].get("cobertura") == "<i>Sin especificar</i>" || records[i].get("tipoEnvio") == "Personal"){
//                                        valido = false;
//                                        break;
//                                    }
//                                }
//                                if(valido == true){
//                                    cambiarStatusEnvios(id,2,"En proceso");
//                                }else{
//                                    Ext.Msg.show({
//                                        title:'En proceso',
//                                        msg: 'A uno o mas registros no se le a especificado Tipo de envio y/o mensajeria.',
//                                        buttons: Ext.Msg.OK
//                                    });
//                                }
//                            }
//        //iconCls: 'blist'
//                        }),new Ext.Action({
//                            text: 'Action 2',
//                            handler: function(){
//                                //Ext.example.msg('Click','You clicked on "Action 1".');
//                            }
//        //iconCls: 'blist'
//                        })]          // <-- Add the action directly to a menu
//            }
            ,'->',{
            xtype:"button",
            id:"idButonDetalles",
            text:'Ver detalle',
            iconCls:'icn-busquedaUno',
            disabled:true,
            handler:function(){
                var grid = Ext.getCmp(id);
                var record = grid.getSelectionModel().getSelected();
                getDetalleEnvio(record);
            }

        }],
        title           : this.titulo,
        store           : store,
        stripeRows      : true,
        sm              : sm,
//        new Ext.grid.RowSelectionModel({
//            singleSelect:true
//        }),
        loadMask        : true,
        viewConfig      : {
            autoFill: true,
            forceFit: true
        },
        enableHdMenu    : true,
        autoScroll      : true,
        frame           : false,
        border          : false,
        height          : 300,
        bbar            : this.pbarAlmacen,
//        columns         : [
//        new Ext.grid.RowNumberer(),
        cm              :new Ext.grid.ColumnModel([
           
			 sm,
        {
            header: "Folio",
            width: 65,
            sortable: true,
            dataIndex: 'idEnvio',
            fixed:true
        },
        {
            header:'Fecha Orden',
            width: 120,
            sortable: true,
            dataIndex: 'fecha',
            fixed:true
        },

        {
            header:'Origen Orden',
            width: 120,
            sortable: true,
            dataIndex: 'origen',
            fixed:true
        },

         {
            header:'No paciente',
            width: 35,
            sortable: true,
            dataIndex: 'idc'

        },

        {
            header:'Nombre',
            width: 100,
            sortable: true,
            dataIndex: 'nombre'
            
        },
//        {
//            header:'Direccion',
//            width: 120,
//            sortable: true,
//            dataIndex: 'direccion'
//        },
        {
            header:'Mensajeria',
            width: 50,
            sortable: true,
            dataIndex: 'mensajeria'
        },
        {
            header:'Cobertura',
            width: 50,
            sortable: true,
            dataIndex: 'cobertura'
        },
        {
            header:'Producto Entregar',
            width: 100,
            sortable: true,
            dataIndex: 'prodEntregar'
        },
        {
            header:'Cantidad',
            width: 30,
            sortable: true,
            dataIndex: 'cantidad'
        },
//        {
//            header:'Observacion',
//            width: 120,
//            sortable: true,
//            dataIndex: 'observacion'
//        }
//        ,
        {
            header:'Fecha de envio',
            width: 60,
            sortable: true,
            dataIndex: 'fechaEnvio'
        }
        ,
        {
            header:'Fecha de entrega',
            width: 60,
            sortable: true,
            dataIndex: 'fechaEntrega'
        }
        ]),
        listeners       : {

            'rowdblclick':function(grid){
                //MnsWaiting();
                var cmb = Ext.getCmp('idComboStatusEnvio');
                if(cerrados == true || cmb.getValue() != '1'){
                    //var record = grid.getSelectionModel().getSelected();
                    var record = grid.getSelectionModel().getSelected();

                    document.frmPdfEnvio.idEnvio.value = record.get('idEnvio');
                    
                    var formulario = document.frmPdfEnvio;
                    needToConfirm=false;
                    formulario.submit();
                }
                if(cmb.getValue()=='1'){
                    imprimirPapeleta(grid,"abierto");
                }                
            }
        }
    }),new Ext.grid.GridPanel({
        title   :"Registros para excel",
        store   :myStore,
        sm      :new Ext.grid.RowSelectionModel({
                    singleSelect:false
                }),
        tbar:[{
            xtype:"button",
            text:'Mandar a excel',
            iconCls:'icn-excel',
            handler:function(){
                var cadenaEnviar = "";
                document.frmExcelEnvio.numEnvio.value = "";

                for(var i = 0; i < datos.length; i++){
                   cadenaEnviar += datos[i][10] + "&%\n\
                                " + datos[i][34] + "&%\n\
                                " + datos[i][12] + "&%\n\
                                " + datos[i][13] + "&%\n\
                                " + datos[i][14] + "&%\n\
                                " + datos[i][15] + "&%\n\
                                " + datos[i][16] + "&%&%\n\
                                " + datos[i][17] + "&%\n\
                                " + "MX" + "&%\n\
                                " + "MEXICO" + "&%\n\
                                " + datos[i][7] + "&%\n\
                                " + datos[i][18] + "&%\n\
                                " + datos[i][1] + "&%\n\
                                " + datos[i][6] + "&%\n\
                                " + datos[i][19] + "&%\n\
                                " + datos[i][20] + "&%\n\
                                " + datos[i][21] + "&%\n\
                                " + datos[i][22] + "&%";

                }

                document.frmExcelEnvio.numEnvio.value = cadenaEnviar;
                document.frmExcelEnvio.submit();
            }
        },{
            xtype:"button",
            text:'Limpiar',
            iconCls:'icn-deshabilita',
            handler:function(){
                myStore.loadData(datos);
                Ext.Msg.show({
                    title:'Aviso',
                    msg: "¿Confirma que quiere limpiar la lista?",
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.MessageBox.WARNING,
                    fn: function(btn){
                        if(btn == 'no'){
                        }
                        if(btn == 'yes'){
                            datos = [];
                            myStore.loadData(datos);
                        }
                    }
                });
                
            }
        }],
        columns: [
            new Ext.grid.RowNumberer(),
        {header:"Folio", width:65, sortable:true, dataIndex:'idEnvio', fixed:true},
        {header:'Fecha Orden', width:120, sortable:true, dataIndex:'fecha', fixed:true},
        {header:'Origen Orden', width:120, sortable:true, dataIndex:'origen', fixed:true},
        {header:'No paciente', width:35, sortable:true, dataIndex:'idc'},
        {header:'Nombre', width:100, sortable:true, dataIndex:'nombre'},
        {header:'Mensajeria', width:50, sortable:true, dataIndex:'mensajeria'},
        {header:'Cobertura', width:50, sortable:true, dataIndex:'cobertura'},
        {header:'Observacion', width:120, sortable:true, dataIndex:'observacion'},
        {header:'Fecha de envio', width:60, sortable:true, dataIndex:'fechaEnvio'},
        {header:'Fecha de entrega', width:60, sortable:true, dataIndex:'fechaEntrega'}
        ],
        viewConfig      : {
            autoFill: true,
            forceFit: true
        }
        
    })]
    });
    
    if(cerrados == true){
        //Ext.getCmp("idStatusCancelado").setDisabled(true);
        //Ext.getCmp("idComboStatusEnvio").setDisabled(true);
        var grid2 = Ext.getCmp(id);
        var store2 = grid2.getStore();
        
        store2.load({
            params:{
//                opc:1,
//                idStatus:16,
//                consul:consul,
//                idc:idc,
                start:0,
                limit:20
            }
            });
            
        
    }

    

    return panel;

};



function imprimirPapeleta(grid, status){

    var record = grid.getSelectionModel().getSelected();
   
    document.frmPdfEnvio.idEnvio.value = record.get('idEnvio');
   
    var wndVistaEnv = new com.punto.pen.WndActividades({
        titulo:"Vista previa de envio",
        width:710,
        height:470,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:800,
            height:432,
            autoScroll:true,
            items:[
            {
                xtype:"fieldset",
                layout:"form",
                title:"Datos de envio",
                width:665,
                height:(status == "abierto" ? 175 : 100),
                items:[{
                    width:640,
                    border:false,
                    html:"<table width='100%'>\n\
                                   <tr>\n\
                                    <td colspan='4' align='center'><h4>DATOS ENVIO</h4></td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td width='15%'>Envio:</td>\n\
                                    <td>" + record.get('idEnvio') + "</td>\n\
                                    <td width='15%'>No.Cliente:</td>\n\
                                    <td width='10%'>" + record.get('noCliente') + "</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Nombre:</td>\n\
                                    <td colspan='3'>"+record.get('nombre')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Tel. Casa:</td>\n\
                                    <td>"+record.get('telCasa')+"</td>\n\
                                    <td>Tel. celular:</td>\n\
                                    <td>"+record.get('telCel')+"</td>\n\
                                   </tr>\n\
                                  </table>"

                },(status == "abierto" ? new com.punto.pen.ComboBox({
                    id          :"idComboTipEnvi",
                    etiqueta    : 'Tipo de envio',
                    allowBlank  : false,
                    name        : 'cmbTipoEnv',
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 5,
                        qry: 62,
                        autoCarga: true
                    },
                    evt:{
                        'select':function(cmb,rec,idx){
                            var dm =Ext.getCmp("idComboMnsjra");
                            accionCmbUbicacion(dm,["idComboMnsjra"],{
                                prd:cmb.getValue()
                            }, true);
                            if(cmb.getValue() == 1){
                                Ext.getCmp("idComboCobertura").setVisible(false);
                            }else if(cmb.getValue() == 2){
                                Ext.getCmp("idComboCobertura").setVisible(true);
                            }                            
                        }
                    }
                }) : {border:false,html:""}),
                (status == "abierto" ? new com.punto.pen.ComboBox({
                    id          :"idComboMnsjra",
                    etiqueta    : 'Mensajeria',
                    allowBlank  : false,
                    name        : 'cmbMensajra',
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 19,
                        qry: 63,
                        autoCarga: false
                    }
                }) : {border:false,html:""}),
                (status == "abierto" ? new com.punto.pen.ComboBox({
                    id          :"idComboCobertura",
                    etiqueta    : 'Cobertura',
                    allowBlank  : false,
                    name        : 'cmbCobertura',
                    hidden      : true,
                    prm         : {
                        campo: 'prd',
                        idCampo: 'idPrd',
                        bnd: 5,
                        qry: 79,
                        autoCarga: true
                    }
                }) : {border:false,html:""})


                
//                ,
//                new com.punto.pen.ComboBox({
//                    id          :"idComboMnsjra",
//                    etiqueta    : 'Mensajeria',
//                    allowBlank  : false,
//                    name        : 'prdMotivo',
//                    prm         : {
//                        campo: 'prd',
//                        idCampo: 'idPrd',
//                        bnd: 5,
//                        qry: 63,
//                        autoCarga: true
//                    }
//                })
                ]
            },
            {
                xtype:"fieldset",
                layout:"column",
                title:"Domicilio del cliente",
                width:665,
                height:200,
                items:[{
                    width:640,
                    border:false,
                    html:"<table width='100%'>\n\
                                   <tr>\n\
                                    <td colspan='4' align='center'><h4>DOMICILIO CLIENTE (" + record.get('parentDir') + ")</h4></td>\n\
                                   </tr>\n\
                                   " + getNombreCont(record.get("nombreCont")) + "\n\
                                   <tr>\n\
                                    <td width='15%'>Calle:</td>\n\
                                    <td colspan='3'>" + record.get('calle') + "</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Numero exterior:</td>\n\
                                    <td>"+record.get('nExterior')+"</td>\n\
                                    <td width='15%'>Numero interior:</td>\n\
                                    <td>"+record.get('nInterior')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Colonia:</td>\n\
                                    <td colspan='3'>"+record.get('colonia')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Deleg/Mun:</td>\n\
                                    <td colspan='3'>"+record.get('delMun')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Estado:</td>\n\
                                    <td>"+record.get('edo')+"</td>\n\
                                    <td>Cp:</td>\n\
                                    <td>"+record.get('cp')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Entre calle 1:</td>\n\
                                    <td colspan='3'>"+record.get('calle1')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Entre calle 2:</td>\n\
                                    <td colspan='3'>"+record.get('calle2')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Referencia 1:</td>\n\
                                    <td colspan='3'>"+record.get('ref1')+"</td>\n\
                                   </tr>\n\
                                   <tr>\n\
                                    <td>Referencia 2:</td>\n\
                                    <td colspan='3'>"+record.get('ref2')+"</td>\n\
                                   </tr>\n\
                                  </table>"
                }]
            },
            {
                xtype:"fieldset",
                layout:"column",
                title:"Observaciones",
                width:665,
                height:100,
                items:[{
                    width:640,
                    border:false,
                    html:"<table width='100%'>\n\
                                   <tr>\n\
                                    <td>" + record.get('observacion') + "</td>\n\
                                   </tr>\n\
                                  </table>"
                }]
            },record.get('envio_clasif') == 1 ? {
                xtype:"fieldset",
                layout:"fit",
                title:"Requisitos",
                width:665,
                height:150,
                items:[{
                    align:"center",
                    border:false,
                    autoLoad:{
                        url:contexto+'/Almacen',
                        params:{
                            opc:5,
                            idEnv:record.get("idEnvio")
                        },
                        text:'Cargando requisitos...'
                    }
                }]
            } : {border:false,html:""},{
                xtype:"fieldset",
                layout:"fit",
                title:"Detalle de envio",
                width:665,
                height:150,
                items:[{
                    id:"idDetallesEnvio",
                    align:"center",
                    border:false,
                    autoLoad:{
                        url:contexto+'/Almacen',
                        params:{
                            opc:6,
                            idEnv:record.get("idEnvio")
                        },
                        text:'Cargando requisitos...'
                    }
                }]
            },{
                xtype:"fieldset",
                layout:"fit",
                title:"Productos que actalmente toma el paciente",
                width:665,
                height:150,
                items:[{
                    id:"idDetallesProductos",
                    align:"center",
                    border:false,
                    autoLoad:{
                        url:contexto+'/Almacen',
                        params:{
                            opc:10,
                            idc:record.get('noCliente')
                        },
                        text:'Cargando requisitos...'
                    }
                }]
            }]
        }),
        botones:(status == "abierto" ? [{
            text:"Imprimir",
            handler:function(){
                MnsWaiting();
                var cmbTipo = Ext.getCmp("idComboTipEnvi");
                var cmbMns = Ext.getCmp("idComboMnsjra");
                var cmbCob = "";
                if(Ext.getCmp("idComboCobertura").isVisible() == true){
                    cmbCob = Ext.getCmp("idComboCobertura").getRawValue();
                           
                    if(cmbTipo.isValid() == true && cmbMns.isValid() == true && Ext.getCmp("idComboCobertura").isValid() == true){

                        Ext.Ajax.request({
                            url : contexto+'/Almacen',
                            params:{
                                opc:2,
                                idEnv:record.get('idEnvio'),
                                tip:cmbTipo.getValue(),
                                mns:cmbMns.getValue(),
                                cob:cmbCob
                            },
                            success:function(rsp){
                                var formulario = document.frmPdfEnvio;
                                needToConfirm=false;
                                formulario.submit();
                                MnsWaiting().hide();

                                var grid = Ext.getCmp(id);
                                var store = grid.getStore();
                                var ind = parseInt(record.get('indice'));
                                var start = ind - ind % 20;
                                store.load({
                                    params:{
                                        start:start,
                                        limit:20
//                                                    opc:1,
//                                                    idStatus:cmb.getValue()
                                    }
                                });

                            },
                            failure:function(rsp){

                            }
                        });
                    }else{
                        Ext.Msg.show({
                            title:'Imprimir envio',
                            msg: 'Faltan datos para continuar',
                            buttons: Ext.Msg.OK
                        });
                    }
                }else{
                    cmbCob = "LOCAL";

                    if(cmbTipo.isValid() == true && cmbMns.isValid() == true){

                        Ext.Ajax.request({
                            url : contexto+'/Almacen',
                            params:{
                                opc:2,
                                idEnv:record.get('idEnvio'),
                                tip:cmbTipo.getValue(),
                                mns:cmbMns.getValue(),
                                cob:cmbCob
                            },
                            success:function(rsp){
                                var formulario = document.frmPdfEnvio;
                                needToConfirm=false;
                                formulario.submit();
                                MnsWaiting().hide();

                                var grid = Ext.getCmp(id);
                                var store = grid.getStore();
                                var ind = parseInt(record.get('indice'));
                                var start = ind - ind % 20;
                                store.load({
                                    params:{
                                        start:start,
                                        limit:20
//                                                    opc:1,
//                                                    idStatus:cmb.getValue()
                                    }
                                });

                            },
                            failure:function(rsp){

                            }
                        });
                    }else{
                        Ext.Msg.show({
                            title:'Imprimir envio',
                            msg: 'Faltan datos para continuar',
                            buttons: Ext.Msg.OK
                        });
                    }
                }
                
            }
        },{
            text:"Salir",
            handler:function(){
                wndVistaEnv.close();
            }
        }] : [{
            text:"Dar Vo Bo",
            handler:function(){
                cambiarStatusEnvios("idGridsAlmacenVoBo",1,"Abierto");
                wndVistaEnv.close();
            }
        },{
            text:"Cancelar envio",
            handler:function(){
                cambiarStatusEnvios("idGridsAlmacenVoBo",7,"Cancelado");
                wndVistaEnv.close();
            }
        },{
            text:"Salir",
            handler:function(){
                wndVistaEnv.close();
            }
        }])
    });
    wndVistaEnv.show();

    var tipEnv = record.get("tipoEnvio");
    var mens = record.get("mensajeria");
    var cob = record.get("cobertura");
    var cmbTipo = Ext.getCmp("idComboTipEnvi");
    var cmbMens = Ext.getCmp("idComboMnsjra");
    var cmbCob = Ext.getCmp("idComboCobertura");

    var valMens = 0;

    switch (mens){
        case "MENSAJERO PEN": valMens = 1; break;
        case "DHL": valMens = 3; break;
        case "SEPOMEX": valMens = 6; break;
        case "TODALAPRENSA": valMens = 8; break;
        case "MENSAJERO SANOFI": valMens = 9; break;
        case "ESTAFETA": valMens = 10; break;
        case "OTRO": valMens = 11; break;
        case "<i>Sin especificar</i>": valMens = 0; break;
    }
    
    if(tipEnv == "Personal"){
    }else{
        cmbTipo.setValue(tipEnv == "Mensajeria" ? 1 : 2);
        cmbTipo.setRawValue(tipEnv);
        cmbMens.setValue(valMens);
        cmbMens.setRawValue(mens == "<i>Sin especificar</i>" ? "" : mens);
        if(tipEnv == "Mensajeria Especializada"){
            cmbCob.setVisible(true);
            cmbCob.setValue(cob == 'LOCAL' ? 400 : (cob == 'FORANEO' ? 401 : 430));
            cmbCob.setRawValue(cob);
            var dm = Ext.getCmp("idComboMnsjra");
            accionCmbUbicacion(dm,["idComboMnsjra"],{
                                prd:2
                            }, true);
        }
    }
}

function cambiarStatusEnvios(id,newSt,strStatus){
    var oldSt;
    var grid = Ext.getCmp(id);
    var record = grid.getSelectionModel().getSelected();

    switch (record.get("status")){
        case "ABIERTO":oldSt = 1; break;
        case "EN PROCESO":oldSt = 2; break;
        case "ENVIADO":oldSt = 4; break;
        case "CONFIRMACION DE ENTREGADO":oldSt = 5; break;
        case "DEVUELTO":oldSt = 6; break;
        case "CANCELADO":oldSt = 7; break;
        case "PENDIENTE":oldSt = 8; break;
        case "CERRADO":oldSt = 16; break;
        case "ESPERA VO. BO.":oldSt = 18;break;
    }    
    
    if(newSt == 4 ){
        ventanaEnviando(grid,record,newSt,strStatus,oldSt);
    }else if(newSt == 7){
        ventanaObservacionEnvio({
            grid:grid,
            record:record,
            newSt:newSt,
            oldSt:oldSt,
            strStatus:strStatus
        });
    }else if(newSt == 8){
        ventanaObservacionEnvio({
            grid:grid,
            record:record,
            newSt:newSt,
            oldSt:oldSt,
            strStatus:strStatus,
            titulo:"Dejar pendiente",
            txtButon:"Pendiente"
        });
    }else if(newSt == 6){
        ventanaObservacionEnvio({
            grid:grid,
            record:record,
            newSt:newSt,
            oldSt:oldSt,
            strStatus:strStatus,
            titulo:"Devuelto",
            txtButon:"Devolver"
        });
    }else if(newSt == 5){
        ventanaConfirmarEntrega(grid,record,newSt,strStatus,oldSt);
    }else{
        Ext.Msg.show({
            title:'Status envio',
            msg: '¿Confirma que desea cambiar el estatus de este envio a ' + strStatus + '?',
            buttons: Ext.Msg.YESNO,
            //animEl: 'elId',
            icon: Ext.MessageBox.WARNING,
            fn: function(btn){
                if(btn == 'no'){
                }
                if(btn == 'yes'){
                    MnsWaiting();
                    var ind = parseInt(record.get('indice'));
                    var start = ind - ind % 20;
                    Ext.Ajax.request({
                        url : contexto+'/Almacen',
                        params:{
                            opc:3,
                            newSt:newSt,
                            oldSt:oldSt,
                            idEnv:envSelecs,
                            //idEnv:record.get('idEnvio'),
                            idc:record.get('idc'),
                            obs:"",
                            fechEs:"",
                            numGuia:0
                        },
                        success:function(rsp){
                            var store = grid.getStore();
                            var cmb = Ext.getCmp("idComboStatusEnvio");
                            store.load({
                                params:{
                                    start:start,
                                    limit:20
//                                    opc:1,
//                                    idStatus:cmb.getValue()
                                }
                            });
                            MnsWaiting().hide();

                        },
                        failure:function(rsp){
                            MnsWaiting().hide();

                        }
                    });
                }
            }
        });
    }

}

function visualizarBotones(arrayVisible){
    Ext.getCmp('idImprimirEnviosAbiertos').setVisible(arrayVisible[0]);
    Ext.getCmp('idStatusEnProceso').setVisible(arrayVisible[1]);
    Ext.getCmp('idStatusCancelado').setVisible(arrayVisible[2]);
    Ext.getCmp('idStatusEnviado').setVisible(arrayVisible[3]);
    Ext.getCmp('idStatusConfirmEntrega').setVisible(arrayVisible[4]);
    Ext.getCmp('idStatusCerrarEnvio').setVisible(arrayVisible[5]);
    Ext.getCmp('idReimprimir').setVisible(arrayVisible[6]);
    Ext.getCmp('idLabelCanalizar').setVisible(arrayVisible[7]);
    Ext.getCmp('idCmbCanalizar').setVisible(arrayVisible[8]);
    Ext.getCmp("idStatusPendiente").setVisible(arrayVisible[9]);
    Ext.getCmp("idStatusVolverAbrir").setVisible(arrayVisible[10]);
    Ext.getCmp("idButonGeneraExcel").setVisible(arrayVisible[11]);
    Ext.getCmp("idStatusDevuelto").setVisible(arrayVisible[12]);
}
function habilitarBotones(arrayHabilitados){
    Ext.getCmp("idImprimirEnviosAbiertos").setDisabled(arrayHabilitados[0]);
    Ext.getCmp("idStatusEnProceso").setDisabled(arrayHabilitados[1]);
    Ext.getCmp("idStatusPendiente").setDisabled(arrayHabilitados[2]);
    Ext.getCmp("idStatusCancelado").setDisabled(arrayHabilitados[3]);
    Ext.getCmp("idCmbCanalizar").setDisabled(arrayHabilitados[4]);
    Ext.getCmp("idButonDetalles").setDisabled(arrayHabilitados[5]);
    Ext.getCmp("idStatusEnviado").setDisabled(arrayHabilitados[6]);
    Ext.getCmp("idButonGeneraExcel").setDisabled(arrayHabilitados[7]);
    Ext.getCmp("idStatusConfirmEntrega").setDisabled(arrayHabilitados[8]);
    Ext.getCmp("idStatusCerrarEnvio").setDisabled(arrayHabilitados[9]);
    Ext.getCmp("idStatusDevuelto").setDisabled(arrayHabilitados[10]);
    Ext.getCmp("idStatusVolverAbrir").setDisabled(arrayHabilitados[11]);
}
//////////////////FORMULARIO DE CONFIRMACION DE ENTREGA//////////////////////
function formConfirmarEntrega(){

    var frmConfirmEntrega = new Ext.FormPanel({
        bodyStyle: "padding:5px 5px 0",
        layout:'form',
        width:20,
        height:20,
        //autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"Fecha de entrega",
            width:320,
            height:60,
            items:[{
                xtype:"datefield",
                fieldLabel:"Fecha entrega",
                id:'idFechaEntregaEnv',
                allowBlank:false,
                emptyText:'dd/mm/yyyy',
                tabIndex:104,
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                }
            }]
        },{
            xtype:"fieldset",
            title:"Quien recibió",
            width:320,
            height:100,
            items:[{
                xtype:"textfield",
                fieldLabel:"Quien recibió",
                id:'idtxtQuienRec',
                allowBlank:false
            },new com.punto.pen.ComboBox({
                id:"idComboParentRec",
                etiqueta:"Parentesco",
                name:"cdrTipoContacto",
                tabIndex:128,
                prm:{
                    campo:'tipContac',
                    idCampo:'idTipContac',
                    tabIndex:128,
                    bnd:5,
                    qry:15,
                    autoCarga:true
                },
                width:100
            })]
        }]
    });
    return frmConfirmEntrega;
}
///////////////FORMULARIO PARA CANCELAR ENVIO//////////////////
function formObservacionEnvio(){

    var frmCancelaEnvio = new Ext.FormPanel({
        bodyStyle: "padding:5px 5px 0",
        layout:'column',
        width:20,
        height:20,
        //autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"Observaciones",
            width:440,
            height:130,
            layout:"column",
            items:[{
                xtype:"textarea",
                fieldLabel:"",
                id:'idtxtAreaObserCancEnv',
                allowBlank:false,  
                width:418,
                height:95,
                style:'text-transform: uppercase;',
                enableKeyEvents:true,
                    listeners: {
                        'keyup' : function(elem, e){
                            elem.setValue(elem.getValue().toUpperCase());
                        },
                    'keypress':
                        function(txtField,e){
                            if(e.getKey()==225 || e.getKey()==233 || e.getKey()==237 || e.getKey()==243 || e.getKey()==250 || e.getKey()==193 || e.getKey()==201 || e.getKey()==205 || e.getKey()==211 || e.getKey()==218 || e.getKey()==180){
                            e.stopEvent();
                           }
                        }
                    }
            }]
        }]
    });
    return frmCancelaEnvio;
}
/////////////////FORMULARIO ENVIANDO////////////////
function formEnviando(){

    var frmEnviando = new Ext.FormPanel({
        bodyStyle: "padding:5px 5px 0",
        layout:'form',
        width:20,
        height:20,
        //autoScroll:true,
        items:[{
            xtype:"fieldset",
            title:"Fecha estimada de entrega",
            width:320,
            height:60,
            items:[{
                xtype:"datefield",
                fieldLabel:"Fecha estimada",
                id:'idFechaEstimada',
                allowBlank:false,
                emptyText:'dd/mm/yyyy',
                tabIndex:104,
                width:100,
                autoCreate:{
                    tag:"input",
                    maxlength:10
                }
            }]
        },{
            xtype:"fieldset",
            title:"Numero de guia",
            width:320,
            height:60,
            items:[{
                xtype:"textfield",
                fieldLabel:"Numero de guia",
                id:'idtxtNumGuia',
                allowBlank:false
            }]
        }]
    });
    return frmEnviando;
}

////////////////VENTANA ENVIANDO////////////////////
function ventanaEnviando(grid,record,newSt,strStatus,oldSt){
    var wndEnviando = new com.punto.pen.WndActividades({
            titulo:"Mandar envio",
            width:350,
            height:210,
            pnl:formEnviando(),
            botones:[{
                text:"Mandar envio",
                handler:function(){
                    
                    var fechEs = Ext.getCmp("idFechaEstimada");
                    var numGuia = Ext.getCmp("idtxtNumGuia");

                    if(fechEs.isValid() == true && numGuia.isValid() == true){
                        Ext.Msg.show({
                            title:'Status envio',
                            msg: '¿Confirma que desea cambiar el estatus de este envio a ' + strStatus,
                            buttons: Ext.Msg.YESNO,
                            //animEl: 'elId',
                            icon: Ext.MessageBox.WARNING,
                            fn: function(btn){
                                if(btn == 'no'){
                                    wndEnviando.close();
                                }
                                if(btn == 'yes'){
                                    MnsWaiting();
                                    var ind = parseInt(record.get('indice'));
                                    var start = ind - ind % 20;
                                    Ext.Ajax.request({
                                        url : contexto+'/Almacen',
                                        params:{
                                            opc:3,
                                            newSt:newSt,
                                            oldSt:oldSt,
                                            idEnv:record.get('idEnvio'),
                                            idc:record.get('idc'),
                                            obs:"",
                                            fechEs:fechEs.getValue(),
                                            numGuia:numGuia.getValue()

                                        },
                                        success:function(rsp){
                                            var store = grid.getStore();
                                            var cmb = Ext.getCmp("idComboStatusEnvio");
                                            store.load({
                                                params:{
                                                    start:start,
                                                    limit:20
//                                                    opc:1,
//                                                    idStatus:cmb.getValue()
                                                }
                                            });
                                            MnsWaiting().hide();
                                            wndEnviando.close();
                                        },
                                        failure:function(rsp){

                                        }
                                    });
                                }
                            }
                        });

                    }else{
                        Ext.Msg.show({
                            title:'Cancelar envio',
                            msg: 'Faltan datos para continuar',
                            buttons: Ext.Msg.OK
                        })
                    }


                }

            },{
                text:"Salir",
                handler:function(){
                    wndEnviando.close();
                }
            }]
        });
        wndEnviando.show();
}
/////////VENTANA CANCELAR ENVIO/////////////////
function ventanaObservacionEnvio(prms){
    
    var grid = prms.grid;
    var record = (prms.record == null ? grid.getSelectionModel().getSelected() : prms.record);
    var newSt = (prms.newSt == null ? 7 : prms.newSt);
    var strStatus = (prms.strStatus == null ? "Cancelado" : prms.strStatus);
    var titulo = (prms.titulo == null ? "Cancelar envio" : prms.titulo);
    var txtButon = (prms.txtButon == null ? "Cancelar envio" : prms.txtButon);
    var oldSt = (prms.oldSt == null ? 0 : prms.oldSt);
    
    
    var wndObservacionEnvio = new com.punto.pen.WndActividades({
            titulo:titulo,
            width:450,
            height:200,
            pnl:formObservacionEnvio(),
            botones:[{
                text:txtButon,
                handler:function(){
                    var obs = Ext.getCmp("idtxtAreaObserCancEnv");
                    var params;

                    if(prms.params == null){
                        params = {opc:3,newSt:newSt,idEnv:record.get('idEnvio'),idc:record.get('idc'),obs:obs.getValue(),fechEs:"",numGuia:0,oldSt:oldSt};
                    }else{
                        params = prms.params;
                        prms.params.obs = obs.getValue();
                        //alert(prms.params.obs);
                    }
                     
                    var msg = (prms.msg == null ? "¿Confirma que desea cambiar el estatus de este envio a " + strStatus : prms.msg);
                                        
                    if(obs.isValid() == true){
                        Ext.Msg.show({
                            title:'Status envio',
                            msg: msg,
                            buttons: Ext.Msg.YESNO,
                            //animEl: 'elId',
                            icon: Ext.MessageBox.WARNING,
                            fn: function(btn){
                                if(btn == 'no'){
                                    wndObservacionEnvio.close();
                                }
                                if(btn == 'yes'){
                                    MnsWaiting();
                                    var ind = parseInt(record.get('indice'));
                                    var start = ind - ind % 20;
                                    Ext.Ajax.request({
                                        url : contexto+'/Almacen',
                                        params:params,
                                        success:function(rsp){
                                            var store = grid.getStore();
                                            var cmb = Ext.getCmp("idComboStatusEnvio");
                                            if(cons == 1){
                                                var bitac=Ext.getCmp("gridBuscadorBitacora");
                                                bitac.getStore().load();
                                                var infoGen=Ext.getCmp("pnlInfoGeneral");
                                                infoGen.load({
                                                    url:contexto + '/Cliente?bnd=2&idCnt='+record.get('idc')
                                                });
                                            }
                                            
                                            store.load({
                                                params:{
                                                    start:start,
                                                    limit:20
//                                                    opc:1,
//                                                    idStatus:cmb.getValue()
                                                }
                                            });
                                            MnsWaiting().hide();
                                            wndObservacionEnvio.close();
                                        },
                                        failure:function(rsp){

                                        }
                                    });
                                }
                            }
                        });

                    }else{
                        Ext.Msg.show({
                            title:'Cancelar envio',
                            msg: 'Faltan datos para continuar',
                            buttons: Ext.Msg.OK
                        })
                    }


                }

            },{
                text:"Salir",
                handler:function(){
                    wndObservacionEnvio.close();
                }
            }]
        });
        wndObservacionEnvio.show();
}
///////////////////////VENTANA CONFIRMAR ENTREGA////////////
function ventanaConfirmarEntrega(grid,record,newSt,strStatus,oldSt){
    var wndConfEntrega = new com.punto.pen.WndActividades({
            titulo:"Confirmar entrega",
            width:350,
            height:250,
            pnl:formConfirmarEntrega(),
            botones:[{
                text:"Confirmar entrega",
                handler:function(){
                    var fecha = Ext.getCmp("idFechaEntregaEnv");
                    var quien = Ext.getCmp("idtxtQuienRec");
                    var parent = Ext.getCmp("idComboParentRec");

                    if(fecha.isValid() == true && quien.isValid() == true){
                        Ext.Msg.show({
                            title:'Status envio',
                            msg: '¿Confirma que desea cambiar el estatus de este envio a ' + strStatus,
                            buttons: Ext.Msg.YESNO,
                            //animEl: 'elId',
                            icon: Ext.MessageBox.WARNING,
                            fn: function(btn){
                                if(btn == 'no'){
                                    wndConfEntrega.close();
                                }
                                if(btn == 'yes'){
                                    MnsWaiting();
                                    var ind = parseInt(record.get('indice'));
                                    var start = ind - ind % 20;
                                    Ext.Ajax.request({
                                        url : contexto+'/Almacen',
                                        params:{
                                            opc:3,
                                            newSt:newSt,
                                            oldSt:oldSt,
                                            idEnv:record.get('idEnvio'),
                                            fecha:fecha.getValue(),
                                            quien:quien.getValue(),
                                            parent:parent.getRawValue(),
                                            idc:record.get('idc'),
                                            obs:""
                                        },
                                        success:function(rsp){
                                            var store = grid.getStore();
                                            var cmb = Ext.getCmp("idComboStatusEnvio");
                                            store.load({
                                                params:{
                                                    start:start,
                                                    limit:20
//                                                    opc:1,
//                                                    idStatus:cmb.getValue()
                                                }
                                            });
                                            MnsWaiting().hide();
                                            wndConfEntrega.close();
                                        },
                                        failure:function(rsp){

                                        }
                                    });
                                }
                            }
                        });

                    }else{
                        Ext.Msg.show({
                            title:'Confirmar entrega',
                            msg: 'Faltan datos para continuar',
                            buttons: Ext.Msg.OK
                        })
                    }


                }

            },{
                text:"Cancelar",
                handler:function(){
                    wndConfEntrega.close();
                }
            }]
        });
        wndConfEntrega.show();
}
function getDetalleEnvio(record){
    var wndDetalleEnvio = new com.punto.pen.WndActividades({
        titulo:"Detalles de envio no. " + record.get("idEnvio"),
        width:400,
        height:500,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:20,
            height:20,
            autoScroll:true,
            items:[{
                xtype:"fieldset",
                title:"Status",
                width:370,
                height:50,
                items:[{
                        border:false,
                        html:"<table align='center'>\n\
                               <tr>\n\
                                <td><h4>" + record.get('status') + "</h4></td>\n\
                               </tr>\n\
                              </table>"
                }]
            },{
                xtype:"fieldset",
                title:"Datos de envio",
                width:370,
                height:150,
                items:[{
                        border:false,
                        html:"<table width='100%'>\n\
                               <tr>\n\
                                <td><h4>Tipo de envio:</h4></td>\n\
                                <td>" + (record.get("tipoEnvio") == 'Personal' && record.get('status') != 'CERRADO' ? "<i>Sin especificar</i>" : record.get("tipoEnvio")) + "</td>\n\
                               </tr>                              \n\
                               <tr>\n\
                                <td><h4>Mensajeria:</h4></td>\n\
                                <td>" + (record.get("tipoEnvio") == 'Personal' && record.get('status') != 'CERRADO' ? "<i>Sin especificar</i>" : record.get("mensajeria")) + "</td>\n\
                               </tr>\n\
                               <tr>\n\
                                <td><h4>Fecha estimada entrega:</h4></td>\n\
                                <td>" + (record.get("fechaEstimada") == 'null' ? "<i>Sin especificar</i>" : record.get("fechaEstimada")) + "</td>\n\
                               </tr>\n\
                               <tr>\n\
                                <td><h4>Numero de guia:</h4></td>\n\
                                <td>" + (record.get("numGuia") == 'null' ? "<i>Sin especificar</i>" : record.get("numGuia")) + "</td>\n\
                               </tr>\n\
                               <tr>\n\
                                <td><h4>Fecha real entrega:</h4></td>\n\
                                <td>" + (record.get("fechaEntrega") == 'Sin entregar' ? "<i>Sin especificar</i>" : record.get("fechaEntrega")) + "</td>\n\
                               </tr>\n\
                               <tr>\n\
                                <td><h4>Quien recibió:</h4></td>\n\
                                <td>" + (record.get("quienRecibio") == 'null' ? "<i>Sin especificar</i>" : record.get("quienRecibio")) + "</td>\n\
                               </tr>\n\
                               <tr>\n\
                                <td><h4>Parentesco:</h4></td>\n\
                                <td>" + (record.get("parentesco") == 'null' ? "<i>Sin especificar</i>" : record.get("parentesco")) + "</td>\n\
                               </tr>\n\
                              </table>"
                }]
            },{
                xtype:"fieldset",
                title:"Observación pendiente",
                width:370,
                height:90,
                items:[{
                        border:false,
                        html:(record.get("obsPendiente") == 'null' ? "<i>Sin especificar</i>" : record.get("obsPendiente"))
                }]
            },{
                xtype:"fieldset",
                title:"Observación cancelado",
                width:370,
                height:90,
                items:[{
                        border:false,
                        html:(record.get("obsCancelado") == 'null' ? "<i>Sin especificar</i>" : record.get("obsCancelado"))
                }]
            },{
                xtype:"fieldset",
                title:"Observacion devolución",
                width:370,
                height:90,
                items:[{
                        border:false,
                        html:(record.get("obsDevuelto") == 'null' ? "<i>Sin especificar</i>" : record.get("obsDevuelto"))
                }]
            },{
                xtype:"fieldset",
                title:"Observacion canalizado",
                width:370,
                height:90,
                items:[{
                        border:false,
                        html:(record.get("obsCanaliza") == 'null' ? "<i>Sin especificar</i>" : record.get("obsCanaliza"))
                }]
            }]
        }),
        botones:[{
            text:"Cerrar",
            handler:function(){
                wndDetalleEnvio.close();
            }
        }]
    });
    
    wndDetalleEnvio.show();

}

function getNombreCont(nombreCont){
    if(nombreCont == "null null null" || nombreCont ==""){
        return "";
    }else{
        return "<tr>\n\
            <td width='15%'>Nombre contacto:</td>\n\
            <td colspan='3'>" + nombreCont + "</td>\n\
           </tr>";
    }

}

function recargarDetallesEnvios(idEnv){
    Ext.getCmp("idDetallesEnvio").load({
        url:contexto+'/Almacen',
        params:{
            opc:6,
            idEnv:idEnv
        },
        text:'Cargando requisitos...'
    })
}

function wndEditarDetalle(material, cantidad, idEd, idEnv,num){
    var palabrasMat = material.split("%&");
    var newMat = "";
    for(var i = 0; i < palabrasMat.length; i++){
        newMat += palabrasMat[i] + " ";
    }

    var wndEditaDetalleEnvio = new com.punto.pen.WndActividades({
        titulo:"Editar detalle",
        width:400,
        height:160,
        pnl:new Ext.FormPanel({
            bodyStyle: "padding:5px 5px 0",
            layout:'form',
            width:20,
            height:20,
            autoScroll:true,
            items:[{
                xtype:"fieldset",
                title:"Editar detalle",
                height:70,
                layout:"column",
                items:[{
                    xtype:"panel",
                    border:false,
                    layout:"form",
                    labelWidth:60,
                    width:200,
                    items:[{
                        id:"idTxtConcepDet",
                        xtype:"textfield",
                        fieldLabel:"Concepto",
                        value:newMat,
                        enableKeyEvents:true,
                        listeners:{
                            keyup:function(txt,e){
                                var cantMat = Ext.getCmp("idTxtCantDet");
                                var btn = Ext.getCmp("idCambiosDetll");
                                if(txt.getValue() != "" && parseInt(cantMat.getValue()) > 0){
                                    btn.setDisabled(false);
                                }else{
                                    btn.setDisabled(true);
                                }
                            }
                        }
                    }]
                },{
                    xtype:"panel",
                    border:false,
                    layout:"form",
                    labelWidth:50,
                    items:[{
                        id:"idTxtCantDet",
                        xtype:"textfield",
                        fieldLabel:"Cantidad",
                        value:cantidad,
                        width:25,
                        enableKeyEvents:true,
                        listeners:{
                            keyup:function(txt,e){
                                var tipMat = Ext.getCmp("idTxtConcepDet");
                                var btn = Ext.getCmp("idCambiosDetll");
                                if(tipMat.getValue() != "" && parseInt(txt.getValue()) > 0){
                                    btn.setDisabled(false);
                                }else{
                                    btn.setDisabled(true);
                                }
                            }
                        }
                    }]
                }]
            }]
        }),
        botones:[{
            id:"idEliminarDetll",
            text:"Eliminar Concepto",
            handler:function(){
                 Ext.Msg.show({
                        title:'Status envio',
                        msg: '¿Confirma que quiere Eliminar el Concepto?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn){
                            if(btn == 'no'){
                            }
                            if(btn == 'yes'){
                               Ext.Ajax.request({
                                    url : contexto+'/Almacen',
                                    params:{
                                        opc:11,
                                        concepto:Ext.getCmp("idTxtConcepDet").getValue(),
                                        cantidad:Ext.getCmp("idTxtCantDet").getValue(),
                                        concepPrev:newMat,
                                        cantPrev:cantidad,
                                        idEd:idEd
                                    },
                                    success:function(rsp){
                                        recargarDetallesEnvios(idEnv);
                                        wndEditaDetalleEnvio.close();
                                    },
                                    failure:function(rsp){

                                    }
                               });
                            }
                        }
                 });
            }
        },{
            id:"idCambiosDetll",
            text:"Guardar cambios",
            handler:function(){
                 Ext.Msg.show({
                        title:'Status envio',
                        msg: '¿Confirma  que quiere guardar cambios?',
                        buttons: Ext.Msg.YESNO,
                        fn: function(btn){
                            if(btn == 'no'){
                            }
                            if(btn == 'yes'){
                               Ext.Ajax.request({
                                    url : contexto+'/Almacen',
                                    params:{
                                        opc:9,
                                        concepto:Ext.getCmp("idTxtConcepDet").getValue(),
                                        cantidad:Ext.getCmp("idTxtCantDet").getValue(),
                                        concepPrev:newMat,
                                        cantPrev:cantidad,
                                        idEd:idEd
                                    },
                                    success:function(rsp){
                                        recargarDetallesEnvios(idEnv);
                                        wndEditaDetalleEnvio.close();
                                    },
                                    failure:function(rsp){

                                    }
                               });
                            }
                        }
                 });                
            }
        },{
            text:"Salir",
            handler:function(){
                wndEditaDetalleEnvio.close();
            }
        }]
    });

    if(num==1){
        Ext.getCmp('idEliminarDetll').setVisible(false);
    }else{
        Ext.getCmp('idEliminarDetll').setVisible(true);
    }

    wndEditaDetalleEnvio.show();

}