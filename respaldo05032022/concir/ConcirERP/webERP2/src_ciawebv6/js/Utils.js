function calcular_edad(fecha){ 
    //actualmente la funcion esta dise�ada para recibir una fecha en formato : 1981-06-25 00 00 00
    var date=fecha.substring(0,10);
    var edad;
    //calculo la fecha de hoy
    hoy=new Date()
    //alert(hoy)    
    //calculo la fecha que recibo
    //La descompongo en un array
    var array_fecha = date.split("-")
    //si el array no tiene tres partes, la fecha es incorrecta
    if (array_fecha.length!=3) {
        edad='Fecha de Nacimiento No Valida';
    }
    //compruebo que los ano, mes, dia son correctos
    var ano
    ano = parseInt(array_fecha[0]);
    if (isNaN(ano)) {
        edad='Fecha de Nacimiento No Valida';
    }
    var mes
    mes = parseInt(array_fecha[1]);
    if (isNaN(mes)) {
        edad='Fecha de Nacimiento No Valida';
    }
    var dia
    dia = parseInt(array_fecha[2]);
    if (isNaN(dia)) {
        edad='Fecha de Nacimiento No Valida';
    }    
    //si el a�o de la fecha que recibo solo tiene 2 cifras hay que cambiarlo a 4
    if (ano<=99) {
        ano +=1900
    }        
    //resto los a�os de las dos fechas
    edad=hoy.getYear()- ano - 1; //-1 porque no se si ha cumplido a�os ya este a�o
    //si resto los meses y me da menor que 0 entonces no ha cumplido a�os. Si da mayor si ha cumplido
    if (hoy.getMonth() + 1 - mes < 0) //+ 1 porque los meses empiezan en 0
    {
        return edad
    }
    if (hoy.getMonth() + 1 - mes > 0)
    {
        return edad+1
    }
    //entonces es que eran iguales. miro los dias
    //si resto los dias y me da menor que 0 entonces no ha cumplido a�os. Si da mayor o igual si ha cumplido
    if (hoy.getUTCDate() - dia >= 0) {
        return edad + 1
    }
    if(edad<=0){
        edad='Fecha de Nacimiento No Valida';
    }        
    return edad;
} //calcular la edad// JavaScript Document
function canalizarLlamada(params){
    var cmbCanEsp=Ext.getCmp('idCmboCanEsp');
    var stGeneral = new Ext.data.Store( {
        reader :new Ext.data.JsonReader( {
            fields : [ 'text', 'value' ],
            root :'records'
        }),
        proxy :new Ext.data.HttpProxy( {
            url : context+'/LlenarCombo?paramCombo=7'
				
        })
    });
    var combo = new Ext.form.ComboBox({
        fieldLabel:'Motivo de la llamada',
        id:'cmbllamadaCanExp',
        name:'motivo2',
        store: stGeneral,
        valueField :'value',
        allowBlank: false,
        displayField:'text',
        mode: 'local',
        forceSelection:true,
        triggerAction: 'all',
        emptyText:'Selecciona una opci�n...'
    });
    if(cmbCanEsp.isValid()){
        combo.store.load({
            params:{
                idRol:params.idRol
            }
        });
        var winCanEsp= new Ext.Window({
            layout      : 'form',
            modal       : true,
            border      : false,
            frame       : true,
            labelAlign  : 'top',
            title       : 'Canalizar a especialista',
            closable    : false,
            closeAction :'hide',
            width       : 350,
            items       : [combo,
            {
                xtype:'textarea',
                id:'idLmdObservacionesCanEsp',
                name:'LmdObservaciones',
                width:338,
                height:200,
                fieldLabel:'Haga una breve descripci�n',
                allowBlank:false
            }],
            buttons     : [ {
                id:'idBtnCanalizar',
                text:'Canalizar',
                handler:canalizarPac
            },{
                text:'Cancelar',
                handler:function(){
                    winCanEsp.destroy()
                }
            }]
        });
        winCanEsp.show();
    }else{
        alert('Seleccione una especialidad');
    }
    function canalizarPac(){
        var elemtTxt=Ext.getCmp('idLmdObservacionesCanEsp');
        var elemtCmb=Ext.getCmp('cmbllamadaCanExp')
        if(elemtTxt.isValid() && elemtCmb.isValid()){
            Ext.getCmp('idBtnCanalizar').setDisabled(true);
            var text=elemtTxt.getValue();
            var idMotivo=elemtCmb.getValue()
            params.textObsv=text;
            params.motivoLl=idMotivo;
            new Ajax.Request(context+'/AccionLlamada',{
                method: 'post',
                onComplete:proCanalizarEsp ,
                parameters:params
            })
        }else{
            alert('Los campos son obligatorios');
        }
  
    }
    function proCanalizarEsp(objeto){
        var objRes=eval("("+objeto.responseText+")");
        if(objRes.res){
            Ext.getCmp('idBtnCanalizar').setDisabled(false);
            Ext.MessageBox.show({
                title: 'Resultado',
                msg: objRes.mensaje,
                buttons: Ext.MessageBox.OK,
                fn:function(btn){
                    if(btn=="ok"){
                        parent.hideBtnTermLl();
                        needToConfirm=false;
                        parent.DetenerCrono();
                        window.location=context+ruta_rol
                    }
                },
                icon: Ext.MessageBox.INFO
            });
        }
    }
}

function selectRadioCheckGpo(id,valor,variable){
    var grupo = Ext.getCmp(id);
    if(grupo != undefined){
        if(grupo.getXType()=='radiogroup'){
            resetRadioButtons(grupo);
            for(var r = 0 ; r < grupo.items.length; r++){
                var cmpr = grupo.items.itemAt(r);
                if(cmpr.getXType()=='radio'){
                    if(cmpr.getRawValue()==valor){
                        cmpr.setValue(true);
                    }
                }
            }
        }else if(grupo.getXType()=='checkboxgroup'){
            for(var c = 0 ; c < grupo.items.length; c++){
                var op = valor.split(variable);
                for(var y=0;y<(op.length-1);y++){
                    var cmpc = grupo.items.itemAt(c);
                    if(cmpc.getXType()=='checkbox'){
                        if(cmpc.getRawValue()==op[y]){
                            cmpc.setValue(true);
                        }
                    }
                }
            }
        }
    }
}

function resetRadioButtons(btnGp){
    if(btnGp != undefined){
        for(i = 0 ; i < btnGp.items.length; i++){
            var array = btnGp.items;
            var rb = array.itemAt(i);
            if(rb.getXType()=='radio'){
                rb.setValue(false);
            }
        }
    }
}
function doSeleccionRadioChecks(arrayFunc){
    for(var i = 0; i < arrayFunc.length; i++){
        var json = arrayFunc[i];
        json.funcion(json.prm1,json.prm2);
    }
}
function replaceCode(texto){
    texto = texto.replace(/�/g,"&aacute;");
    texto = texto.replace(/�/g,"&eacute;");
    texto = texto.replace(/�/g,"&iacute;");
    texto = texto.replace(/�/g,"&oacute;");
    texto = texto.replace(/�/g,"&uacute;");
    texto = texto.replace(/�/g,"&ntilde;");
    texto = texto.replace(/�/g,"&Aacute;");
    texto = texto.replace(/�/g,"&Eacute;");
    texto = texto.replace(/�/g,"&Iacute;");
    texto = texto.replace(/�/g,"&Oacute;");
    texto = texto.replace(/�/g,"&Uacute;");
    texto = texto.replace(/�/g,"&Ntilde;");
    texto = texto.replace(/�/g, "&Aacute;");
    texto = texto.replace(/�/g, "&Eacute;");
    texto = texto.replace(/�/g, "&Iacute;");
    texto = texto.replace(/�/g, "&Oacute;");
    texto = texto.replace(/�/g, "&Uacute;");
    texto = texto.replace(/�/g,"&aacute;");
    texto = texto.replace(/�/g,"&eacute;");
    texto = texto.replace(/�/g,"&iacute;");
    texto = texto.replace(/�/g,"&oacute;");
    texto = texto.replace(/�/g,"&uacute;");
    return texto;
}
function replaceAcentosCode(texto){
    texto = texto.replace(/�/g,"a");
    texto = texto.replace(/�/g,"e");
    texto = texto.replace(/�/g,"i");
    texto = texto.replace(/�/g,"o");
    texto = texto.replace(/�/g,"u");
    texto = texto.replace(/�/g,"n");
    texto = texto.replace(/�/g,"A");
    texto = texto.replace(/�/g,"E");
    texto = texto.replace(/�/g,"I");
    texto = texto.replace(/�/g,"O");
    texto = texto.replace(/�/g,"U");
    texto = texto.replace(/�/g,"N");
    texto = texto.replace(/�/g, "A");
    texto = texto.replace(/�/g, "E");
    texto = texto.replace(/�/g, "I");
    texto = texto.replace(/�/g, "O");
    texto = texto.replace(/�/g, "U");
    texto = texto.replace(/�/g,"a");
    texto = texto.replace(/�/g,"e");
    texto = texto.replace(/�/g,"i");
    texto = texto.replace(/�/g,"o");
    texto = texto.replace(/�/g,"u");
    return texto;
}
function replaceUnCode(texto){
    texto = texto.replace("&aacute;","�");
    texto = texto.replace("&eacute;","�");
    texto = texto.replace("&eacute;","�");
    texto = texto.replace("&oacute;","�");
    texto = texto.replace("&uacute;","�");
    texto = texto.replace("&ntilde;","�");
    texto = texto.replace("&Aacute;","�");
    texto = texto.replace("&Eacute;","�");
    texto = texto.replace("&Iacute;","�");
    texto = texto.replace("&Oacute;","�");
    texto = texto.replace("&Uacute;","�");
    texto = texto.replace("&Ntilde;","�");
    texto = texto.replace("&Aacute;","�");
    texto = texto.replace("&Eacute;","�");
    texto = texto.replace("&Iacute;","�");
    texto = texto.replace("&Oacute;","�");
    texto = texto.replace("&Uacute;","�");
    texto = texto.replace("&aacute;","�");
    texto = texto.replace("&eacute;","�");
    texto = texto.replace("&iacute;","�");
    texto = texto.replace("&oacute;","�");
    texto = texto.replace("&uacute;","�");
    return texto;
}
function trim(s){  /////////////de la aouroria de moreno
    s = s.replace(/\s+/gi, ' '); //sacar espacios repetidos dejando solo uno
    s = s.replace(/^\s+|\s+$/gi, ''); //sacar espacios blanco principio y final
    return s;
}
function removeSpaces(string,indOne,indTwo) {
    return string.split(indOne).join(indTwo);
}

function aleatorio(inferior,superior){
    numPosibilidades = superior - inferior;
    aleat = Math.random() * numPosibilidades;
    aleat = Math.floor(aleat);
    return parseInt(inferior) + aleat;
}

function color_aleatorio(){
    var hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F");
    var color_aleatorio = "#";
    for (i=0;i<6;i++){
        pos = aleatorio(0,hexadecimal.length);
        color_aleatorio += hexadecimal[pos];
    }
    return color_aleatorio;
}
function mesLetra(i){
    var mes = '';
    switch(i){
        case 1:
            mes = 'Enero';
            break;
        case 2:
            mes = 'Febrero';
            break;
        case 3:
            mes = 'Marzo';
            break;
        case 4:
            mes = 'Abril';
            break;
        case 5:
            mes = 'Mayo';
            break;
        case 6:
            mes = 'Junio';
            break;
        case 7:
            mes = 'Julio';
            break;
        case 8:
            mes = 'Agosto';
            break;
        case 9:
            mes = 'Septiembre';
            break;
        case 10:
            mes = 'Octubre';
            break;
        case 11:
            mes = 'Noviembre';
            break;
        case 12:
            mes = 'Diciembre';
            break;
    }
    return mes;
}
function goToUrl(url){
    try{
        needToConfirm = false;
        window.location = url;
    }catch(Err){
        Ext.Msg.alert('','Hubo un error');
        location.reload();
    }
}
/*function IniciarAccion(idTree,enable,collapse,idPnlCenter,objeto){
   
   if(contenedor==false){idPnlCenter='pnlCenter'}else{idPnlCenter='idWindowSesionPaciente'}
    setModuloAll(idPnlCenter,objeto);
    var t = Ext.getCmp(idTree);
    if(t!=undefined){
        t.setDisabled(enable);
        if(collapse==true){
            t.collapse();
        }else{
            t.expand();
        }
    }
}

function setModuloAll(idPanelPrn,objeto){
    var prn = Ext.getCmp(idPanelPrn);
    prn.removeAll();
    prn.add(objeto);
    prn.doLayout();
}
function setModulo(idPanelPrn,idPnlRemove,objeto){
    var prn = Ext.getCmp(idPanelPrn);
    prn.remove(idPnlRemove);
    prn.add(objeto);
    prn.doLayout();
}*/

//function setModuloAllHeight(idPanelPrn,objeto,height){
//    var prn = Ext.getCmp(idPanelPrn);
//    prn.removeAll();
//    prn.add(objeto);
//    prn.height=height;
//    prn.doLayout();
//}