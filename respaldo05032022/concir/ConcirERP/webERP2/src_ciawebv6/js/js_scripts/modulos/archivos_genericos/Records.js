/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('com.punto.pen');
com.punto.pen.EnvioAlmacen = function(){
    var record = Ext.data.Record.create([
       {name: 'indice'},
       {name: 'idEnvio'},
       {name: 'origen'},
       {name: 'direccion', type: 'string'},
       {name: 'observacion', type: 'string'},
       {name: 'fecha', type: 'string'},
       {name: 'nombre', type: 'string'},
       {name: 'telCasa', type: 'string'},
       {name: 'tipoEnvio', type: 'string'},
       {name: 'mensajeria', type: 'string'},
       {name: 'noCliente', type: 'string'},
       {name: 'telCel', type: 'string'},
       {name: 'calle', type: 'string'},
       {name: 'nExterior', type: 'string'},
       {name: 'nInterior', type: 'string'},
       {name: 'colonia', type: 'string'},
       {name: 'delMun', type: 'string'},
       {name: 'edo', type: 'string'},
       {name: 'cp', type: 'string'},
       {name: 'calle1', type: 'string'},
       {name: 'calle2', type: 'string'},
       {name: 'ref1', type: 'string'},
       {name: 'ref2', type: 'string'},
       {name: 'idc', type:'string'},
       {name: 'fechaEnvio', type: 'string'},
       {name: 'fechaEntrega', type: 'string'},
       {name: 'fechaEstimada', type: 'string'},
       {name: 'numGuia', type: 'string'},
       {name: 'quienRecibio', type: 'string'},
       {name: 'parentesco', type: 'string'},
       {name: 'obsPendiente', type: 'string'},
       {name: 'obsCancelado', type: 'string'},
       {name: 'status', type: 'string'},
       {name: 'cobertura', type: 'string'},
       {name: 'obsDevuelto', type: 'string'},
       {name: 'obsCanaliza', type: 'string'},
       {name: 'parentDir', type: 'string'},
       {name: 'nombreCont', type: 'string'},
       {name: 'entregar_a', type: 'string'},
       {name: 'envio_clasif', type: 'string'},
       {name: 'prodEntregar', type: 'string'},
       {name: 'cantidad', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorPaciente = function(){
    var record = Ext.data.Record.create([
    {name: 'nombre', type: 'string'},
       {name: 'apaterno', type: 'string'},
       {name: 'amaterno', type: 'string'},
       {name: 'telefono', type: 'int'},
       {name: 'fecha_nac', type: 'string'},
       {name: 'fecha_reg', type: 'string'},
       {name: 'tipo_paciente', type: 'string'},
       {name: 'medicamento', type: 'string'},
       {name: 'statusProd', type: 'string'},
       {name: 'estado', type: 'string'},
       {name: 'es_activo', type: 'string'},
       {name: 'status', type: 'string'},
       {name: 'idTipoPaciente', type: 'string'},
       {name: 'statusTipo', type: 'string'},
       {name: 'foliomedico', type: 'string'}
       ]);
    return record;
}

com.punto.pen.RecordBuscadorFactura1 = function(){
    var record = Ext.data.Record.create([ 
       {name: 'elegir', type: 'string'},
       {name: 'estatus', type: 'string'},
       {name: 'factura', type: 'string'},
       {name: 'referencia', type: 'string'},
       {name: 'envio', type: 'string'},
       {name: 'numCliente', type: 'string'},
       {name: 'nombCliente', type: 'string'},
       {name: 'destino', type: 'string'},
       {name: 'numCajas', type: 'string'},
       {name: 'importe', type: 'string'},
       {name: 'fechFactura', type: 'string'},
       {name: 'fechIngreso', type: 'string'},
       {name: 'cita', type: 'string'},
       {name: 'fechEmbarq', type: 'string'},
       {name: 'fechEntreg', type: 'string'},
       {name: 'comentarios', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordConsExistencia = function(){
    var record = Ext.data.Record.create([
       {name: 'elegir', type: 'string'},
       {name: 'clvProducto', type: 'string'},
       {name: 'decripcion', type: 'string'},
       {name: 'linea', type: 'string'},
       {name: 'familia', type: 'string'},
       {name: 'uniAlmacenado', type: 'string'},
       {name: 'existReal', type: 'string'},
       {name: 'existReservada', type: 'string'},
       {name: 'existDisponible', type: 'string'},
       {name: 'almacen', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBitacoraPaciente = function(){
    var record = Ext.data.Record.create([
       {name: 'idBitacora'},
       {name: 'fecha', type: 'string'},
       {name: 'idProducto', type: 'string'},
       {name: 'campania', type: 'string'},
       {name: 'producto', type: 'string'},
       {name: 'idLugar', type: 'string'},
       {name: 'lugar', type: 'string'},
       {name: 'idActividad', type: 'string'},
       {name: 'actividad', type: 'string'},
       {name: 'quien_atendio', type: 'string'},
       {name: 'observacion', type: 'string'},
       {name: 'idGenerico', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordCodPostal = function(){
    var record = Ext.data.Record.create([
       {name: 'idCodigo'},
       {name: 'codigoPostal', type: 'string'},
       {name: 'colonia', type: 'string'},
       {name: 'delmnpo', type: 'string'},
       {name: 'estado', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorMedico = function(){
    var record = Ext.data.Record.create([
       {name: 'idMedico',type:'string'},
       {name: 'cedula',type:'string'},
       {name: 'nombre', type: 'string'},
       {name: 'apaterno', type: 'string'},
       {name: 'amaterno', type: 'string'},
       {name: 'estado', type: 'string'},
       {name: 'datos', type: 'string'},
       {name: 'elegir', type: 'string'},

       {name: 'calleMed', type: 'string'},
       {name: 'numExtMed', type: 'string'},
       {name: 'numIntMed', type: 'string'},
       {name: 'entreCalle1Med', type: 'string'},
       {name: 'entreCalle2Med', type: 'string'},
       {name: 'ref1Med', type: 'string'},
       {name: 'ref2Med', type: 'string'},
       {name: 'edoMed', type: 'string'},
       {name: 'delMunMed', type: 'string'},
       {name: 'coloniaMed', type: 'string'},
       {name: 'cpMed', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorFv = function(){
    var record = Ext.data.Record.create([
       {name: 'idFV',type:'string'},
       {name: 'folio',type:'string'},
       {name: 'nombre', type: 'string'},
       {name: 'apaterno', type: 'string'},
       {name: 'amaterno', type: 'string'},
       {name: 'estado', type: 'string'},
       {name: 'linea', type: 'string'},
       {name: 'email', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorReceta = function(){
    var record = Ext.data.Record.create([
       {name: 'idReceta',type:'string'},
       {name: 'activo',type:'string'},
       {name: 'editar',type:'string'},
       {name: 'cliente', type: 'string'},
       {name: 'club', type: 'string'},
       {name: 'medico', type: 'string'},
       {name: 'fechaReceta', type: 'string'},
       {name: 'comentario', type: 'string'},
       {name: 'indicaciones', type: 'string'},
       {name: 'fechaAlta', type: 'string'},
       {name: 'archivo', type: 'string'}

    ]);
    return record;
}

com.punto.pen.RecordBuscadorUsuario = function(){
    var record = Ext.data.Record.create([
        {name: 'id_usr',mapping: 'id_usr'},
        {name: 'fecha_reg',mapping: 'fecha_reg'},
        {name: 'fecha_nac',mapping: 'fecha_nac'},
        {name: 'pnt_atn',mapping: 'pnt_atn'},
        {name: 'pnt_cnt',mapping: 'pnt_cnt'},
        {name: 'puesto',mapping: 'puesto'},
        {name: 'nombre',mapping: 'nombre'},
        {name: 'apaterno',mapping: 'apaterno'},
        {name: 'amaterno',mapping: 'amaterno'},
        {name: 'username',mapping: 'username'},
        {name: 'telefono',mapping: 'telefono'},
        {name: 'telcel',mapping: 'telcel'},
        {name: 'email',mapping: 'email'},
        {name: 'idpnt_cnt',mapping: 'idpnt_cnt'},
        {name: 'pnt_cnt',mapping: 'pnt_cnt'},
        {name: 'idpuesto',mapping: 'idpuesto'},
        {name: 'puesto',mapping: 'puesto'},
        {name: 'acceso',mapping: 'acceso'},
        {name: 'habilitado',mapping: 'habilitado'}

    ]);
    return record;
}

com.punto.pen.RecordBuscadorDesintometria = function(){
    var record = Ext.data.Record.create([
       {name: 'idDensitometria',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'restscore',type:'string'},
       {name: 'resultado', type: 'string'},
       {name: 'medicamentoHuesos', type: 'string'},
       {name: 'nombreMedicamento', type: 'string'},
       {name: 'otroMedicamento', type: 'string'},
//       {name: 'status', type: 'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorHemoglobina = function(){
    var record = Ext.data.Record.create([
       {name: 'idHemoglobina',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'restscore',type:'string'},
//       {name: 'producto1', type: 'string'},
//       {name: 'producto2', type: 'string'},
//       {name: 'producto3', type: 'string'},
//       {name: 'statusGeneral', type: 'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorGlucometria = function(){
    var record = Ext.data.Record.create([
       {name: 'idGlucometria',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'tipoEstudio', type: 'string'},
       {name: 'restscore',type:'string'},
       {name: 'resultado', type: 'string'},
       {name: 'medicamento', type: 'string'},
       {name: 'medicamento1', type: 'string'},
       {name: 'medicamento2', type: 'string'},
       {name: 'medicamento3', type: 'string'},
       {name: 'estudio', type: 'string'},
       {name: 'observaciones', type: 'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorMapa = function(){
    var record = Ext.data.Record.create([
       {name: 'idMapa',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'presionArterial',type:'string'},
//       {name: 'status', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
} 

com.punto.pen.RecordBuscadorDoppler = function(){
    var record = Ext.data.Record.create([
       {name: 'idDoppler',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'resultadoIzq', type: 'string'},
       {name: 'valorIzq',type:'string'},
       {name: 'resultadoDer', type: 'string'},
       {name: 'valorDer',type:'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorTrigliceridos = function(){
    var record = Ext.data.Record.create([
       {name: 'idTrigliceridos',type:'string'},
       {name: 'resultado', type: 'string'},
       {name: 'valoracion',type:'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorUroflujometria = function(){
    var record = Ext.data.Record.create([
       {name: 'idUroflujometria',type:'string'},
       {name: 'resultadoFM', type: 'string'},
       {name: 'resultadoPF', type: 'string'},
       {name: 'valoracion',type:'string'},
       {name: 'observaciones', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorPesoTalla = function(){
    var record = Ext.data.Record.create([
       {name: 'idPesoTalla',type:'string'},
       {name: 'peso', type: 'string'},
       {name: 'estatura',type:'string'},
       {name: 'imc', type: 'string'},
       {name: 'observaciones', type: 'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorPCM = function(){
    var record = Ext.data.Record.create([
       {name: 'idPcm',type:'string'},
//       {name: 'cliente', type: 'string'},
       {name: 'peso', type: 'string'},
       {name: 'estatura',type:'string'},
       {name: 'imc', type: 'string'},
       {name: 'cirucunferencia',type:'string'},
       {name: 'presionArterial', type: 'string'},
       {name: 'glucosaAyuno',type:'string'},
       {name: 'chdl', type: 'string'},
       {name: 'cldl',type:'string'},
       {name: 'colesterolTotal', type: 'string'},
       {name: 'trigliceridos',type:'string'},
       {name: 'porcentajeGrasa', type: 'string'},
       {name: 'observaciones',type:'string'},
       {name: 'fechaEstudio',type:'string'},
       {name: 'fechaRegistro', type: 'string'},
       {name: 'tipoEstudio', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordAgendaDia = function(){
    var record = Ext.data.Record.create([
       {name: 'id_cita',type:'string'},
       {name: 'id_usuario',type:'string'},
       {name: 'id_paciente', type: 'string'},
       {name: 'paciente',type:'string'},
       {name: 'fecha_actividad', type: 'string'},
       {name: 'hora', type: 'string'},
       {name: 'hora_inicio', type: 'string'},
       {name: 'hora_fin', type: 'string'},
       {name: 'id_producto', type: 'string'},
       {name: 'producto',type:'string'},
       {name: 'id_tipo_actividad', type: 'string'},
       {name: 'tipo_actividad',type:'string'},
       {name: 'id_actividad', type: 'string'},
       {name: 'actividad',type:'string'},
       {name: 'id_tema', type: 'string'},
       {name: 'tema',type:'string'},
       {name: 'habilitado',type:'string'},
       {name: "lugar", type:"string"},
       {name: "tipoPx", type:"string"},
       {name: "asunto", type:"string"},
       {name: "observaciones", type:"string"},
       {name: "duracion", type:"string"},

       {name: 'status'}
    ]);
    return record;
}

com.punto.pen.RecordBitacoraPacientePCM = function(){
    var record = Ext.data.Record.create([
       {name: 'idBitacora'},
       {name: 'fecha', type: 'string'},
       {name: 'idProducto', type: 'string'},
       {name: 'producto', type: 'string'},
       {name: 'idLugar', type: 'string'},
       {name: 'lugar', type: 'string'},
       {name: 'idActividad', type: 'string'},
       {name: 'actividad', type: 'string'},
       {name: 'quien_atendio', type: 'string'},
       {name: 'observacion', type: 'string'},
       {name: 'idGenerico', type: 'string'},
       {name: 'cliente', type: 'string'},
       {name: 'idcliente', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorPacienteMapin = function(){
    var record = Ext.data.Record.create([
       {name: 'folio', mapping: 'folio'},
       {name: 'elegir',mapping: 'elegir'},
       {name: 'nombre', mapping: 'nombre'},
       {name: 'apaterno',mapping: 'apaterno'},
       {name: 'amaterno',mapping: 'amaterno'},
       {name: 'telefono',mapping: 'telefono'},
       {name: 'fecha_nac',mapping: 'fecha_nac'},
       {name: 'fecha_reg',mapping: 'fecha_reg'},
       {name: 'tipo_paciente',mapping: 'tipo_paciente'},
       {name: 'medicamento', mapping: 'medicamento'},
       {name: 'es_activo', mapping: 'es_activo'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorTalleresGroup = function(){
    var record = Ext.data.Record.create([
       {name: 'folio',type: 'string'},
       {name: 'elegir',type: 'string'},
       {name: 'nombre', type: 'string'},
       {name: 'apaterno',type: 'string'},
       {name: 'amaterno',type: 'string'},
       {name: 'telefono',type: 'string'},
       {name: 'fecha_nac',type: 'string'},
       {name: 'fecha_reg',type: 'string'},
       {name: 'tipo_paciente',type: 'string'},
       {name: 'medicamento', type: 'string'},
       {name: 'es_activo', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordAgendaLlamada = function(){
    var record = Ext.data.Record.create([
       {name: 'elegir',type:'string'},
       {name: 'tipoActividad',type:'string'},
       {name: 'referente',type:'string'},
       {name: 'nombre',type:'string'},
       {name: 'telCasa',type:'string'},
       {name: 'telCelular',type:'string'},
       {name: 'telOficina',type:'string'},
       {name: 'extOficina',type:'string'},
       {name: 'fechaLlamada',type:'string'},
       {name: 'previaLlamada',type:'string'},
       {name: 'posteriorLlamada',type:'string'},
       {name: 'prioridad',type:'string'},
       {name: 'estatus',type:'string'}
    ]);
    return record;
}

com.punto.pen.RecordInformacionProducto = function(){
    var record = Ext.data.Record.create([
        {name: 'elegir',mapping: 'elegir'},
        {name: 'id_producto',mapping: 'id_producto'},
        {name: 'nombreproducto',mapping: 'nombreproducto'},
        {name: 'nombrefranquisia',mapping: 'nombrefranquisia'},
        {name: 'descripcion',mapping: 'descripcion'},
        {name: 'aplicacanje',mapping: 'aplicacanje'},
        {name: 'vigencia',mapping: 'vigencia'}
    ]);
    return record;
}

com.punto.pen.RecordPreguntasProducto = function(){
    var record = Ext.data.Record.create([
        {name: 'seleccion',mapping: 'seleccion'},
        {name: 'id_pregunta',mapping: 'id_pregunta'},
        {name: 'id_producto',mapping: 'id_producto'},
        {name: 'nombreProducto',mapping: 'nombreProducto'},
        {name: 'textPregutna',mapping: 'textPregutna'},
        {name: 'textRespuesta',mapping: 'textRespuesta'},
        {name: 'status',mapping: 'status'},
        {name: 'id_usuarioAlta',mapping: 'id_usuarioAlta'}
    ]);
    return record;
}

com.punto.pen.RecordInboundFarmacovigilancia = function(){
    var record = Ext.data.Record.create([
        {name: 'elegir',mapping: 'elegir'},
        {name: 'folioUsu',mapping: 'folioUsu'},
		{name: 'folioSis',mapping: 'folioSis'},
        {name: 'cliente',mapping: 'cliente'},
        {name: 'telefono',mapping: 'telefono'},
		{name: 'direccion',mapping: 'direccion'},
		{name: 'estado',mapping: 'estado'},
        {name: 'caso',mapping: 'caso'},
        {name: 'medicamento',mapping: 'medicamento'},
        {name: 'fechaCreacion',mapping: 'fechaCreacion'},
        {name: 'tipoLlamada',mapping: 'tipoLlamada'},
        {name: 'medioLlamada',mapping: 'medioLlamada'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorPacienteAgenda = function(){
    var record = Ext.data.Record.create([
       {name: 'folio'},
       {name: 'elegir'},
       {name: 'nombre', type: 'string'},
       {name: 'apaterno', type: 'string'},
       {name: 'amaterno', type: 'string'},
       {name: 'telefono', type: 'int'},
       {name: 'fecha_nac', type: 'string'},
       {name: 'fecha_reg', type: 'string'},
       {name: 'tipo_paciente', type: 'string'},
       {name: 'medicamento', type: 'string'},
       {name: 'es_activo', type: 'string'},
       {name: 'status', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordProductosEnvio = function(){
    var record = Ext.data.Record.create([
       {name: 'idProd',type:'string'},
       {name: 'producto',type:'string'},
       {name: 'cantidad', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordListadoSelect = function(){
    var record = Ext.data.Record.create([
       {name: 'idProd',mapping:1},
       {name: 'Producto',mapping:2}
    ]);
    return record;
}


com.punto.pen.RecordArchivos = function(){
    var record = Ext.data.Record.create([
       {name: 'verArchivo',mapping:'verArchivo'},
       {name: 'idSegArchivo',mapping:'idSegArchivo'},
       {name: 'nombreArchivo',mapping:'nombreArchivo'},
       {name: 'direccion',mapping:'direccion'}

    ]);
    return record;
}
com.punto.pen.RecordPreguntasWeb = function(){
    var record = Ext.data.Record.create([
        {name: 'elegir',mapping: 'elegir'},
        {name: 'id_paciente',mapping: 'id_paciente'},
        {name: 'nombre_cnt',mapping: 'nombre_cnt'},
        {name: 'telefono',mapping: 'telefono'},
        {name: 'id_usuario',mapping: 'id_usuario'},
        {name: 'nombre_usr',mapping: 'nombre_usr'},
        {name: 'id_pregunta',mapping: 'id_pregunta'},
        {name: 'pregunta_snap',mapping: 'pregunta_snap'},
        {name: 'pregunta',mapping: 'pregunta'},
        {name: 'respuesta_snap',mapping: 'respuesta_snap'},
        {name: 'respuesta',mapping: 'respuesta'},
        {name: 'fecha_registro',mapping: 'fecha_registro'},
        {name: 'fecha_contesta',mapping: 'fecha_contesta'},
        {name: 'status',mapping: 'status'},
        {name: 'status_letra',mapping: 'status_letra'},
        {name: 'id_origen',mapping: 'id_origen'},
        {name: 'origen',mapping: 'origen'}
    ]);
    return record;
}

com.punto.pen.RecordResumenActNC = function(){
    var record = Ext.data.Record.create([
//        {name: 'id_usuario',mapping: 'id_usuario'},
//        {name: 'nombre_usuario',mapping: 'nombre_usuario'},
//        {name: 'fecha_alta',mapping: 'fecha_alta'},
//        {name: 'fecha_actividad',mapping: 'fecha_actividad'},
//        {name: 'id_actividad',mapping: 'id_actividad'},
//        {name: 'nombre_actividad',mapping: 'nombre_actividad'},
//        {name: 'cantidad_pacientes',mapping: 'cantidad_pacientes'},
//        {name: 'id_origen',mapping: 'id_origen'},
//        {name: 'nombre_origen',mapping: 'nombre_origen'},
//        {name: 'id_area',mapping: 'id_area'},
//        {name: 'nombre_area',mapping: 'nombre_area'}
        {name: 'nombre_area',mapping: 'nombre_area'},
        {name: 'nombre_origen',mapping: 'nombre_origen'},
        {name: 'nombre_nutriologa',mapping: 'nombre_nutriologa'},
        {name: 'nombre_actividad',mapping: 'nombre_actividad'},
        {name: 'no_contactos',mapping: 'no_contactos'}
    ]);
    return record;
}

com.punto.pen.RecordBuscadorArchivos = function(){
    var record = Ext.data.Record.create([
       {name: 'idArchivo',type:'string'},
       {name: 'tipoArchivo',type:'string'},
       {name: 'nombreArchivo',type:'string'},
       {name: 'fecha',type:'string'}

    ]);
    return record;
}

com.punto.pen.RecordBuscadorEncuaestaDts = function(){
    var record = Ext.data.Record.create([
       {name: 'idEncuaesta'},
       {name: 'p1', type: 'string'},
       {name: 'p2', type: 'string'},
       {name: 'p3', type: 'string'},
       {name: 'p4', type: 'string'},
       {name: 'p5', type: 'string'},
       {name: 'p6', type: 'string'},
       {name: 'p7', type: 'string'},
       {name: 'p8', type: 'string'},
       {name: 'p9', type: 'string'},
       {name: 'p10', type: 'string'},
       {name: 'p10_1', type: 'string'},
       {name: 'p11', type: 'string'},
       {name: 'p11_1', type: 'string'},
       {name: 'p12', type: 'string'},
       {name: 'p12_1', type: 'string'},
       {name: 'p13', type: 'string'},
       {name: 'p14', type: 'string'},
       {name: 'p15', type: 'string'},
       {name: 'dispositivo', type: 'string'},
       {name: 'p16', type: 'string'},
       {name: 'p17', type: 'string'},
       {name: 'p18', type:'string'},
       {name: 'p19', type: 'string'},
       {name: 'p20', type: 'string'},
       {name: 'p21', type: 'string'},
       {name: 'p22', type: 'string'},
       {name: 'p23', type: 'string'},
       {name: 'fechaEncuesta', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordCanjes = function(){
    var record = Ext.data.Record.create([
        {name: 'idProd'},
        {name: 'accion', type: 'string'},
        {name: 'tipodir', type: 'string'},
        {name: 'calle', type: 'string'},
        {name: 'colonia', type: 'string'},
        {name: 'municipio', type: 'string'},
        {name: 'estado', type: 'string'},
        {name: 'idStatus', type: 'string'},
        {name: 'parentesco', type: 'string'},

        {name: 'nombre', type: 'string'},
        {name: 'apaterno', type: 'string'},
        {name: 'amaterno', type: 'string'},
        {name: 'nExt', type: 'string'},
        {name: 'nInt', type: 'string'},
        {name: 'calle1', type: 'string'},
        {name: 'calle2', type: 'string'},
        {name: 'ref1', type: 'string'},
        {name: 'ref2', type: 'string'},
        {name: 'cp', type: 'string'},
        {name: 'horaDe', type: 'string'},
        {name: 'horaA', type: 'string'},
        {name: 'tipTel', type: 'string'},
        {name: 'lada', type: 'string'},
        {name: 'telefono', type: 'string'}

    ]);
    return record;
}


com.punto.pen.RecordAsesoriaNutricional = function(){
    var record = Ext.data.Record.create([
       {name: 'idAsesoria',type:'string'},
       {name: 'tipoAsesoria', type: 'string'},
       {name: 'peso',type:'string'},
       {name: 'talla', type: 'string'},
       {name: 'imc', type: 'string'},
       {name: 'pgrasa', type: 'string'},
       {name: 'pmusculo', type: 'string'},
       {name: 'pagua', type: 'string'},
       {name: 'poseo', type: 'string'},
       {name: 'tmetabolismo',type:'string'},
       {name: 'observaciones', type: 'string'},
       {name: 'fechaAsesoria', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordAsesoriaPsicologica = function(){
    var record = Ext.data.Record.create([
       {name: 'idAsesoria',type:'string'},
       {name: 'observaciones', type: 'string'},
       {name: 'fechaAsesoria', type: 'string'}
    ]);
    return record;
}

com.punto.pen.RecordBusqProducto = function(){
    var record = Ext.data.Record.create([
       {name: 'cvProducto', type: 'string'},
       {name: 'descripcion', type: 'string'}
    ]);
    return record;
}
