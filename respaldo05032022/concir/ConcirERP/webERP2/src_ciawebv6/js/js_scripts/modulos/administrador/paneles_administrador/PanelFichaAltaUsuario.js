/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns('com.punto.pen');

com.punto.pen.PanelFichaAltaUsuario = function(argumentos){
    this.id      = (argumentos.id==null ? '' : argumentos.id);
    this.region  = (argumentos.region==null ? '' : argumentos.region);
    this.titulo  = (argumentos.titulo==null ? '' : argumentos.titulo);
    this.frame   = (argumentos.frame==null ? true : argumentos.frame);
    this.idTree  = (argumentos.idTree==null ? '' : argumentos.idTree);
    this.url     = (argumentos.url==null ? '' : argumentos.url);
    var prm      = (argumentos.prm==null ? {bnd:7} : argumentos.prm);
    this.evt     = (argumentos.evt==null ? '' : argumentos.evt);
    this.botones = (argumentos.botones==null ? [
        {text:'Registrar',iconCls:'icn-addusr',
            handler:function(){
                submitFormulario(pnl,prm);
            }
        },{text:'Cancelar',iconCls:'icn-cross',
            handler:function(){
                pnl.getForm().reset();
                IniciarAccion(idArbol,false,false,'pnlCenter',new com.punto.pen.PanelBienvenida({msg:'Administrador'}));
            }
        }
    ] : argumentos.botones);
    var idArbol = this.idTree;

    var pnl = new Ext.form.FormPanel({
        id:this.id,
        url: this.url,
        title:this.titulo,
        region:this.region,
        layout:'anchor',
        autoScroll:true,
        bodyStyle: 'padding:5px;',//background-color:#000000;
        frame:this.frame,
        border:false,
        buttons:this.botones,
        items:[
            {xtype:'hidden',name:'id_usr',value:''},
            new com.punto.pen.PanelInfoUsuario({anchor:'100%',frame:false}),
            {
                xtype:'tabpanel',id:'tbpanelUsr',deferredRender:false,layoutOnTabChange:true,anchor:'100%',
                activeTab:0,border:false,plain:true,
                items:[
                    new com.punto.pen.PanelInfoUsuarioAd({titulo:'Información Adicional',height:310,anchor:'100%'}),
                    new com.punto.pen.PanelModuloSelector({titulo:'Asignación de Módulos',height:310,border:false})
                    //new com.punto.pen.PanelHorarioSelector({titulo:'Asignación de Horarios',height:310,border:false,anchor:'100%'})
                ]
            }
//
        ],
        listeners:this.evt
    });

    return pnl;
}