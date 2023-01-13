/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');
var idAccion;
var idArbol;
var dta;
com.punto.pen.PanelBuscadorUsuario = function(argumentos){
    var pnlId = (argumentos.id==null ? '' : argumentos.id);
    var idMod = (argumentos.idMod==null ? '0' : argumentos.idMod);
    var idAcc = (argumentos.idAcc==null ? '' : argumentos.idAcc);
    idAccion = idAcc;
    var idTree = (argumentos.idTree==null ? '' : argumentos.idTree);
    idArbol = idTree;
    var punto = '';
    this.titulo = (argumentos.titulo==null ? 'Buscador de Usuarios' : argumentos.titulo);

    /*** Métodos ***/
    function clickBtnBuscar(){
        var username = Ext.getCmp('buusrname').getValue();
        var nombre = Ext.getCmp('bunombre').getValue();
        var apaterno = Ext.getCmp('buapaterno').getValue();
        var amaterno = Ext.getCmp('buamaterno').getValue();
        var telefono = Ext.getCmp('butelefono').getValue();
        if((username=='')&&(nombre=='')&&(apaterno=='')&&(amaterno=='')&&(telefono=='')){
            Ext.MessageBox.alert('Mensaje de Error', "Debe llenar al menos un campo.");
        }else{
            var grd = Ext.getCmp('grdBU');
            var store = grd.getStore();
            store.on('beforeload', function() {
                store.baseParams = {'username':username,'nombre':nombre,'apaterno':apaterno,'amaterno':amaterno,'telefono':telefono};
            });
            store.load({params:{start:0,limit:20}});
            Ext.getCmp('buusrname').setValue('');
            Ext.getCmp('bunombre').setValue('');
            Ext.getCmp('buapaterno').setValue('');
            Ext.getCmp('buamaterno').setValue('');
            Ext.getCmp('butelefono').setValue('');
        }
    }
    function getWndAddEditUsr(rc){
        var pnl = new com.punto.pen.PanelFichaAltaUsuario({
            id:'pnlFichaAUsr',
            url:contexto+'/Usuario',
            titulo:'Editar Información de Usuario',
            frame:true,
            idTree:'pnlTreeAccionesADM',
            botones:[]
        });
        var wnd = new com.punto.pen.WndActividades({
            id:'idWndActividad',width:950,height:555,
            'pnl':pnl,
            border:false,drag:true,modal:true,
            botones:[
                {text:'Actualizar',
                    handler:function(){
                        submitFormulario(pnl,{'bnd':'9','wnd':'idWndActividad','fnc':'Ext.getCmp("grdBU").getStore().reload()'});
                    }
                },
                {text:'Cancelar',handler:function(){wnd.close();}}
            ]
        });
        wnd.show();
        pnl.getForm().load({
            waitTitle:'Espere un segundo por favor...',
            waitMsg:'Cargando...',
            url:contexto+'/Usuario',
            params:{bnd:8,'id_usr':rc.get('id_usr')},
            success:function(form,action){
                dta = action.result.data;
                var pnt = form.findField('pnt_cnt');
                var pst = form.findField('puesto');
                pnt.getStore().addListener('load',fOne);
                pst.getStore().addListener('load',fTwo);
                getPntCnt();
                wnd.setTitle('Modificar Información de ' + dta.nombre + ' ' + dta.apaterno + ' ' + dta.amaterno);
            },
            failure:function(form,action){

            }
        });
    }
    function habdeshab(val){
        if(val==true){
            return '<center><img src="'+contexto+'/img/iconos/accept.png"></center>';
        }else{
            return '<center><img src="'+contexto+'/img/iconos/delete.png"></center>';
        }
    }
    /*** Componentes ***/
        var str = new Ext.data.Store({
            autoLoad: false,
            baseParams: {start:0,limit:20},
            reader :new Ext.data.JsonReader( {
                totalProperty: 'total',
                root :'records',
                idProperty: 'id'
            },new com.punto.pen.RecordBuscadorUsuario()),
            proxy :new Ext.data.HttpProxy( {
                url : contexto+'/Usuario?bnd=6'
            })
        });
      var grd = new Ext.grid.GridPanel({
          id:'grdBU',
          title:this.titulo,
          store:str,
          columns: [
              new Ext.grid.RowNumberer(),
              {header: '<center>Activo</center>',sortable:false,dataIndex:'habilitado',renderer:habdeshab,width:35},
              {header: 'Nom. Usuario',sortable: true,dataIndex: 'username',width:50},
              {header: 'Pnt. Cnt.',sortable: true,dataIndex: 'pnt_cnt'},
              {header: 'Puesto',sortable: true,dataIndex: 'puesto'},
              {header: 'Nombre',sortable: true,dataIndex: 'nombre'},
              {header: 'Ap. Paterno',sortable: true,dataIndex: 'apaterno'},
              {header: 'Ap. Materno',sortable: true,dataIndex: 'amaterno'},
              {header: 'Telefono',sortable: true,dataIndex: 'telefono',width:50},
              {header: 'Tel. Cel.',sortable: true,dataIndex: 'telcel',width:50},
              {header: 'E-Mail',sortable: true,dataIndex: 'email'},
              {header: 'Acceso',sortable: true,dataIndex: 'acceso',renderer:habdeshab,width:35}
          ],
          tbar:[
              {xtype:'button',text:'Regresar',iconCls:'icn-back',
                  handler:function(){
                      IniciarAccion(idArbol,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:'Administrador'}));
                  }
              },
              '-',
              {xtype:'textfield',emptyText:'Nombre Usuario',id:'buusrname',enableKeyEvents:true,
                  listeners:{
                      'keypress':
                      function(txtField,e){
                          if(e.keyCode==13){
                              clickBtnBuscar();
                          }
                      }
                  }
              },
              {xtype:'textfield',emptyText:'Nombre',id:'bunombre',enableKeyEvents:true,
                  listeners:{
                      'keypress':
                      function(txtField,e){
                          if(e.keyCode==13){
                              clickBtnBuscar();
                          }
                      }
                  }
              },
              {xtype:'textfield',emptyText:'Ap. Paterno',id:'buapaterno',enableKeyEvents:true,
                  listeners:{
                      'keypress':
                      function(txtField,e){
                          if(e.keyCode==13){
                              clickBtnBuscar();
                          }
                      }
                  }
              },
              {xtype:'textfield',emptyText:'Ap. Materno',id:'buamaterno',enableKeyEvents:true,
                  listeners:{
                      'keypress':
                      function(txtField,e){
                          if(e.keyCode==13){
                              clickBtnBuscar();
                          }
                      }
                  }
              },
              {xtype:'textfield',emptyText:'Teléfono',id:'butelefono',enableKeyEvents:true,
                  listeners:{
                      'keypress':
                      function(txtField,e){
                          if(e.keyCode==13){
                              clickBtnBuscar();
                          }
                      }
                  }
              },
              '-',
              {xtype:'button',text:'Buscar',
                  handler:clickBtnBuscar
              },
//              '-',
//              {xtype:'button',text:'Alta de Nuevo Usuario',
//                  handler:function(){
//                      //getWndAddEditUsr('agregar');
//                  }
//              },
              '-',
              {xtype:'button',text:'Editar Usuario',
                  handler:function(){
                      var rc = grd.getSelectionModel().getSelected();
                      if(rc!=null){
                          getWndAddEditUsr(rc);
                      }else{
                          Ext.Msg.alert("Error","Debe seleccionar un usuario para poder editar.");
                      }
                  }
              }
//              ,'-',
//              {xtype:'button',text:'Limpiar',
//                  handler:function(){
//                      Ext.Ajax.request({
//                          url:contexto+'/Usuario',
//                          params:{bnd:10},
//                          success:function(rsp){
//                              if(rsp.responseText=="1"){
//                                  Ext.Msg.alert("","Todo salió bien, revisa la BD");
//                              }else{
//                                  Ext.Msg.alert("","Error");
//                              }
//                          },
//                          failure:function(){
//                              Ext.Msg.alert("","Error en servidor.");
//                          }
//                      });
//                  }
//              }
          ],
          bbar:new Ext.PagingToolbar({
            id          : 'pgridPU',
            pageSize    : 20,
            store       : str,
            displayInfo : true,
            displayMsg  : 'Mostrando datos {0} - {1} of {2}',
            emptyMsg    : "No hay datos para mostrar"
          }),
          sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
          stripeRows: true,
          loadMask  : true,
          viewConfig: {autoFill: true, forceFit: true},
          autoScroll: true,
          frame: false,
          border: false
      });
      grd.on('rowdblclick',function(){
          var rc = grd.getSelectionModel().getSelected();
          if(rc!=null){
              getWndAddEditUsr(rc);
          }else{
              Ext.Msg.alert("Error","Debe seleccionar un usuario para poder editar.");
          }
      });

    return grd;
}

function fOne(){
    var pnt = Ext.getCmp('idPntCnt');
    pnt.setValue(dta.pnt_cnt);
    getPuesto();
}
function fTwo(){
    var pst = Ext.getCmp('idPst');
    pst.setValue(dta.puesto);
}