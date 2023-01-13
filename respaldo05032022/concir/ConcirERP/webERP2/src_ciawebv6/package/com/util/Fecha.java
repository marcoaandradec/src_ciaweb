package com.util;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.text.SimpleDateFormat;

/**
 * Clase que contiene varias funciones que pueden ser de utilidad al área.
 * <br>Por ejemplo:
 * <pre>
 *       String fecha_normal = Fecha.getFechaActual();
 *       String fecha_sql    = Fecha.getFechaActualSQL();
 * </pre>
 *
 * @author  marco
 * @version 1.6
 */
public class Fecha {

    Locale aLocale = new Locale("es", "MX");
    Calendar cal = Calendar.getInstance(aLocale);
    String fecha_sql = "0000-00-00";
    String fecha_normal = "00-00-0000";
    int dia = 01, mes = 01, anio = 1900;

    /**
     * Constructor que inicializa la fecha como la fecha actual
     */
    public Fecha() {
        this.cal = Calendar.getInstance(aLocale);
        //System.out.println("Clase Fecha(): " + this.toString());
    }

    /**
     *
     * @param date
     */
    public Fecha(Date date) {
        this.cal.setTime(date);
        //System.out.println("Clase Fecha(date): " + this.toString());
    }

    /**
     * 
     * @param calendario
     */
    public Fecha(Calendar calendario) {
        this.setFecha(calendario);
        //System.out.println("Clase Fecha(calendar): " + this.toString());
    }

    /**
     * Constructor que inicializa la fecha con los paramétros pasados.
     *
     * @param day
     * @param month 
     * @param year
     */
    public Fecha(int day, int month, int year) {
        this.cal.set(year, month, day);
        //Locale.setDefault(aLocale);
        //System.out.println("Clase Fecha(dia,mes,año): " + this.toString());
    }

    /**
     * Constructor que inicializa la fecha con los paramétros pasados.
     *
     * @param day
     * @param month
     * @param year
     * @param hour
     * @param mins
     */
    public Fecha(int day, int month, int year, int hour, int mins) {
        cal.set(year, month, day, hour, mins);
        //Locale.setDefault(aLocale);
        //System.out.println("Clase Fecha(dia,mes,año,hour,mins): " + this.toString());
    }

    /**
     * Constructor que inicializa la fecha mediante la fecha dada.
     *
     * @param     fecha Fecha con el formato dd-mm-aaaa/aaaa-mm-dd.
     * @param     tipo Especifica que formato tiene la fecha.<br>-- 0  --> Formato dd-mm-aaaa<br>-- 1  --> Formato aaaa-mm-dd
     */
//    public Fecha(String fecha, int tipo) {
//        //Locale.setDefault(aLocale);
//        setFecha(fecha, tipo);
//        //System.out.println("Clase Fecha(fecha,tipo): " + this.toString());
//    }
    /**
     * Constructor que inicializa la fecha mediante la fecha dada, permite especificar si la fecha proviene de javascript.
     *
     * @param     fecha Fecha con el formato dd-mm-aaaa/aaaa-mm-dd.
     * @param     tipo Especifica que formato tiene la fecha.<br>-- 0  --> Formato dd-mm-aaaa<br>-- 1  --> Formato aaaa-mm-dd
     * @param     esJS Especifica si la fecha proviene de javascript
     */
    public Fecha(String fecha, int tipo, boolean esJS) {
        //Locale.setDefault(aLocale);
        setFecha(fecha, tipo, esJS);
        //System.out.println("Clase Fecha(fecha,tipo): " + this.toString());
    }

    /**
     * Método para comparar dos objetos de esta clase.
     * 
     * @param Fecha fecha -- Objeto de esta clase.
     * @return Un entero representando 3 tipos de valor. 0 si es igual, menor a 0 si es esta clase es menor al parametro pasado 
     * y mayor a 0 si esta clase es mayor al parametro pasado
     */
    public int comparaFechas(Fecha fecha) {
        return this.cal.compareTo(fecha.getCalendar());
    }

    /**
     * Método que establece una fecha específica.
     *
     * @param day
     * @param month
     * @param year
     */
    public void setFecha(int day, int month, int year) {
        this.cal.set(year, month, day);
    }

    /**
     * Método que establece una fecha específica.
     *
     * @param     fecha Fecha con el formato dd-mm-aaaa/aaaa-mm-dd.
     * @param     tipo Especifica que formato tiene la fecha.<br>-- 0  --> Formato dd-mm-aaaa<br>-- 1  --> Formato aaaa-mm-dd
     */
    public void setFecha(String fecha, int tipo) {
        try {
            if (tipo != 1) {
                int day = Integer.parseInt(fecha.substring(0, 2));
                int month = Integer.parseInt(fecha.substring(3, 5));
                int year = Integer.parseInt(fecha.substring(6, 10));
                this.cal.set(year, month, day);
            } else {
                int day = Integer.parseInt(fecha.substring(8, 10));
                int month = Integer.parseInt(fecha.substring(5, 7));
                int year = Integer.parseInt(fecha.substring(0, 4));
                this.cal.set(year, month, day);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            ////JOptionPane.showMessageDialog(null, "<html><center>Por favor introduzca el formato de fecha correcto<br><b>Formato: dd-mm-aaaa</b></center></html>");
        }
    }

    /**
     * Método que establece una fecha específica.
     *
     * @param     fecha Fecha con el formato dd-mm-aaaa/aaaa-mm-dd.
     * @param     tipo Especifica que formato tiene la fecha.<br>-- 0  --> Formato dd-mm-aaaa<br>-- 1  --> Formato aaaa-mm-dd
     */
    public void setFecha(String fecha, int tipo, boolean esJS) {
        //System.out.println("Fecha: " + fecha + " tipo: " + tipo + " esJS: " + esJS);
        try {
            if (tipo != 1) {
                int day = Integer.parseInt(fecha.substring(0, 2));
                int month = Integer.parseInt(fecha.substring(3, 5));
                int year = Integer.parseInt(fecha.substring(6, 10));
                this.cal.set(year, (esJS == true ? (month - 1) : month), day);
            } else {
                int day = Integer.parseInt(fecha.substring(8, 10));
                int month = Integer.parseInt(fecha.substring(5, 7));
                int year = Integer.parseInt(fecha.substring(0, 4));
                this.cal.set(year, (esJS == true ? (month - 1) : month), day);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            ////JOptionPane.showMessageDialog(null, "<html><center>Por favor introduzca el formato de fecha correcto<br><b>Formato: dd-mm-aaaa</b></center></html>");
        }
    }

    /**
     * Método que establece una fecha específica.
     *
     * @param     fecha Fecha del tipo Date.
     */
    public void setFecha(Date fecha) {
        try {
            this.cal.setTime(fecha);
        } catch (Exception ex) {
            ex.printStackTrace();
            ////JOptionPane.showMessageDialog(null, "<html><center>Por favor introduzca el formato de fecha correcto<br><b>Formato: dd-mm-aaaa</b></center></html>");
        }
    }

    /**
     * Método que establece una fecha específica.
     *
     * @param calendario
     */
    public void setFecha(Calendar calendario) {
        try {
            this.cal = calendario;
        } catch (Exception ex) {
            ex.printStackTrace();
            ////JOptionPane.showMessageDialog(null, "<html><center>Por favor introduzca el formato de fecha correcto<br><b>Formato: dd-mm-aaaa</b></center></html>");
        }
    }

    /**
     * Método que establece el día.
     *
     * @param day
     *
     */
    public void setDia(int day) {
        this.cal.set(Calendar.DAY_OF_MONTH, day);
    }

    /**
     * Método que establece el mes.
     *
     * @param month
     *
     */
    public void setMes(int month) {
        this.cal.set(Calendar.DAY_OF_MONTH, month);
    }

    /**
     * Método que establece el año.
     *
     * @param year
     *
     */
    public void setAnio(int year) {
        this.cal.set(Calendar.YEAR, year);
    }

    /**
     * Método que establece la hora.
     *
     * @param hour
     *
     */
    public void setHour(int hour) {
        this.cal.set(Calendar.HOUR_OF_DAY, hour);
    }

    /**
     * Método que establece los minutos.
     *
     * @param mins
     *
     */
    public void setMins(int mins) {
        this.cal.set(Calendar.MINUTE, mins);
    }

    /**
     * Método que establece el segundo.
     *
     * @param mins
     *
     */
    public void setSecs(int secs) {
        this.cal.set(Calendar.SECOND, secs);
    }

    /**
     * Método que regresa el valor del campo (field) que le especifiques.
     *
     * @return Un entero de las variables del Field Summary de la Clase Calendar que se refiera al campo Ej. Calendar.DAY_OF_MONTH.
     *
     */
    public int getCampo(int campo) {
        return this.cal.get(campo);
    }

    /**
     * Método que regresa el día de la Clase.
     *
     * @return     Entero que representa el dia del mes.
     *
     */
    public int getDia() {
        return this.cal.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * Método que regresa el calendario que contiene esta Clase.
     *
     * @return     Calendar cal.
     *
     */
    public Calendar getCalendar() {
        return this.cal;
    }

    /**
     * Método que regresa el mes de la Clase.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    public int getMes() {
        return this.cal.get(Calendar.MONTH);
    }

    /**
     * Método que regresa el año de la Clase.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    @SuppressWarnings("static-access")
    public int getAnio() {
        return this.cal.get(Calendar.YEAR);
    }

    /**
     * Método que regresa la hora de la Clase.
     *
     * @return    Entero representando la hora.
     *
     */
    @SuppressWarnings("static-access")
    public int getHour() {
        return this.cal.get(Calendar.HOUR_OF_DAY);
    }

    /**
     * Método que regresa los minutos de la Clase.
     *
     * @return     Entero representando los minutos.
     *
     */
    @SuppressWarnings("static-access")
    public int getMins() {
        return this.cal.get(Calendar.MINUTE);
    }

    /**
     * Método que regresa los segundo de la Clase.
     *
     * @return     Entero representando los segundos.
     *
     */
    @SuppressWarnings("static-access")
    public int getSecs() {
        return this.cal.get(Calendar.SECOND);
    }

    /**
     * Método que regresa el primer día del mes tomando en cuenta la fecha <br>
     * de la Clase en formato dd-mm-aaaa.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    public int getMinimosDiasPrimerSemana() {
        return this.cal.getMinimalDaysInFirstWeek();
    }

    /**
     *
     * @return
     */
    public int getPrimerDiaMesSemana() {
        Calendar c = this.cal;
        c.set(Calendar.DAY_OF_MONTH, 1);
        return c.get(Calendar.DAY_OF_WEEK);
    }

    /**
     * Método que regresa el ultimo día del mes tomando en cuenta la fecha <br>
     * de la Clase en formato dd-mm-aaaa.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    public int getUltimoDiaMes() {
        return this.cal.getActualMaximum(Calendar.DAY_OF_MONTH);
    }

    /**
     * Método que regresa un tipo de dato Date representando la fecha de la clase.
     *
     * @return     Un objeto DATE() representando la fecha de la clase.
     *
     */
    public Date getDate() {
        return this.cal.getTime();
    }

    /**
     * Método que regresa un tipo de dato Date con la fecha dada.
     *
     * @param fecha
     * @return     Fecha en formato DATE().
     *
     */
    public static Date getDate(String fecha) {
        Date date = new Date();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        if (fecha.equals("")) {
            fecha = "1900-01-01";
        }
        try {
            date = fmt.parse(fecha);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     * Método que regresa un tipo de dato Date con la fecha dada.
     *
     * @param fecha
     * @param charOrigen 
     * @param charDestino
     * @return     Fecha en formato DATE().
     *
     */
    public static String getDateExtJSSQL(String fecha, String charOrigen, String charDestino) {
        String f = "";
        if (fecha.equals("")) {
            f = "1900-01-01";
        }
        try {
            String[] d = fecha.split(charOrigen);

            f += d[2].length() < 2 ? "0" + d[2] : d[2];
            f += charDestino;
            f += d[1].length() < 2 ? "0" + d[1] : d[1];
            f += charDestino;
            f += d[0].length() < 2 ? "0" + d[0] : d[0];
        } catch (Exception e) {
            e.printStackTrace();
        }
        return f;
    }

    /**
     *
     * @param fecha
     * @return
     */
    public static Date getDateExtJS(String fecha) {
        Date date = new Date();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        if (fecha.equals("")) {
            fecha = "01/01/1900";
        }
        try {
            String[] d = fecha.split("/");
            String f = "";
            f += d[2].length() < 2 ? "0" + d[2] : d[2];
            f += "-";
            f += d[1].length() < 2 ? "0" + d[1] : d[1];
            f += "-";
            f += d[0].length() < 2 ? "0" + d[0] : d[0];
            date = fmt.parse(f);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     *
     * @param fecha
     * @param split
     * @return
     */
    public static Date getDateExtJS(String fecha, String split) {
        Date date = new Date();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        if (fecha.equals("")) {
            fecha = "1900-01-01";
        }
        try {
            String[] d = fecha.split((split == null ? "/" : split));
            String f = "";
            f += d[2].length() < 2 ? "0" + d[2] : d[2];
            f += "-";
            f += d[1].length() < 2 ? "0" + d[1] : d[1];
            f += "-";
            f += d[0].length() < 2 ? "0" + d[0] : d[0];
            date = fmt.parse(f);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     *
     * @param fecha
     */
    public void setCalendarExtJS(String fecha) {
        Date date = new Date();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        if (fecha.equals("")) {
            fecha = "1900-01-01";
        }
        try {
            String[] d = fecha.split("/");
            String f = "";
            f += d[2].length() < 2 ? "0" + d[2] : d[2];
            f += "-";
            f += d[1].length() < 2 ? "0" + d[1] : d[1];
            f += "-";
            f += d[0].length() < 2 ? "0" + d[0] : d[0];
            date = fmt.parse(f);
        } catch (Exception e) {
            e.printStackTrace();
        }
        cal.setTime(date);
    }

    public static Date getFechaExtJS(String fecha) {
        Date date = new Date();
        if (fecha.equals("")) {
            fecha = "01/01/1900";
        }
        try {

            SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");
            SimpleDateFormat fmt2 = new SimpleDateFormat("yyyy-MM-dd");
            Date FechaN = fmt.parse(fecha);
            String fech = fmt2.format(FechaN);
            date = fmt2.parse(fech);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    public static Date getFechaExtJSRegis(String fecha) {
        Date date = new Date();
        SimpleDateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
        if (fecha.equals("")) {
            fecha = "1900-01-01";
        }

        try {
            String[] d = fecha.split("/");
            String f = "";
            f += d[2].length() < 2 ? "0" + d[2] : d[2];
            f += "-";
            f += d[0].length() < 2 ? "0" + d[0] : d[0];
            f += "-";
            f += d[1].length() < 2 ? "0" + d[1] : d[1];
            date = fmt.parse(f);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return date;
    }

    /**
     *
     * @param fecha
     * @param es_cmp
     * @return
     */
    public static String getDateToExtJS(Date fecha, boolean es_cmp) {
        String date = "";

        java.text.SimpleDateFormat sdf = new java.text.SimpleDateFormat("dd/MM/yyyy");
        if (es_cmp != true) {
            sdf = new java.text.SimpleDateFormat("dd/MM/yyyy hh:mm a");
        }

        if (fecha == null) {
            date = "1900-01-01";
        } else {
            try {
                date = sdf.format(fecha);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return date;
    }

    /**
     * Método que regresa la fecha de la Clase en formato dd-mm-aaaa.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    public String getFecha() {
        String[] date_array = setCalendarToFecha(this.cal.get(Calendar.DAY_OF_MONTH), this.cal.get(Calendar.MONTH), this.cal.get(Calendar.YEAR));
        return date_array[0] + "-" + date_array[1] + "-" + date_array[2];
    }

    /**
     * Método que regresa la fecha de la Clase en formato aaaa-mm-dd.
     *
     * @return     Fecha en formato aaaa-mm-dd.
     */
    public static String getFechaSQL() {
        Calendar c = Calendar.getInstance(new Locale("es", "MX"));
        String[] date_array = setCalendarToFecha(c.get(Calendar.DAY_OF_MONTH), c.get(Calendar.MONTH), c.get(Calendar.YEAR));
        return date_array[2] + "-" + date_array[1] + "-" + date_array[0];
    }

    /**
     * Método que a partir de una fecha con formato aaaa-mm-dd regresa la fecha en formato dd-mm-aaaa.
     * <br>En pocas palabras, convierte una fecha MySQL al formato normal.
     *
     * @param fecha_sql
     * @return     Fecha en formato dd-mm-aaaa.
     *
     */
    public static String getFecha(String fecha_sql) {
        int day = Integer.parseInt(fecha_sql.substring(8, 10));
        int month = Integer.parseInt(fecha_sql.substring(5, 7));
        int year = Integer.parseInt(fecha_sql.substring(0, 4));
        String[] date_array = setCalendarToFecha(day, month, year);
        return date_array[0] + "-" + date_array[1] + "-" + date_array[2];
    }

    /**
     * Método que a partir de una fecha con formato dd-mm-aaaa regresa la fecha en formato aaaa-mm-dd.
     * <br>En pocas palabras, convierte una fecha normal al formato MySQL.
     *
     * @param fecha_normal
     * @return     Fecha en formato aaaa-mm-dd.
     *
     */
    public static String getFechaSQL(String fecha_normal) {
        int day = Integer.parseInt(fecha_normal.substring(0, 2));
        int month = Integer.parseInt(fecha_normal.substring(3, 5));
        int year = Integer.parseInt(fecha_normal.substring(6, 10));
        String[] date_array = setCalendarToFecha(day, month, year);
        return date_array[2] + "-" + date_array[1] + "-" + date_array[0];
    }

    /**
     * Método que regresa la fecha de hoy en el formato dd-mm-aaaa.
     *
     * @return     Fecha en formato dd-mm-aaaa.
     */
    public static String getFechaActual() {
        Calendar calendar = Calendar.getInstance();
        String normal_fecha;
        String[] date_array = setCalendarToFecha(calendar.get(Calendar.DAY_OF_MONTH), calendar.get(Calendar.MONTH), calendar.get(Calendar.YEAR));
        normal_fecha = date_array[0] + "-" + date_array[1] + "-" + date_array[2];
        return normal_fecha;
    }

    /**
     * Método que regresa la fecha de hoy en el formato aaaa-mm-dd.
     *
     * @return     Fecha en formato aaaa-mm-dd.
     */
    public static String getFechaActualSQL() {
        Calendar calendar = Calendar.getInstance(new Locale("es", "MX"));
        String sql_fecha;
        String[] date_array = setCalendarToFecha(calendar.get(Calendar.DAY_OF_MONTH), calendar.get(Calendar.MONTH), calendar.get(Calendar.YEAR));
        sql_fecha = date_array[2] + "-" + date_array[1] + "-" + date_array[0];
        return sql_fecha;
    }

    /**
     * Método que regresa la fecha de hoy en el formato aaaa-mm-dd.
     *
     * @return     Fecha en formato aaaa-mm-dd hh:mm:ss.
     */
    public static String getFechaTimeActualSQL() {
        Calendar calendar = Calendar.getInstance(new Locale("es", "MX"));
        String sql_fecha;
        String[] date_array = setCalendarToFecha(calendar.get(Calendar.DAY_OF_MONTH), calendar.get(Calendar.MONTH), calendar.get(Calendar.YEAR));
        sql_fecha = date_array[2] + "-" + date_array[1] + "-" + date_array[0] + " " + getHoraActual();
        return sql_fecha;
    }

    /**
     * Método que regresa la hora actual.
     *
     * @return     Hora en formato HH:mm:s.
     */
    public static String getHoraActual() {
        String hour = "", mins = "";
        int hora = 0, min = 0;
        Calendar calendar = Calendar.getInstance(new Locale("es", "MX"));
        hora = calendar.get(Calendar.HOUR_OF_DAY);
        min = calendar.get(Calendar.MINUTE);
        if (hora < 10) {
            hour = "0" + hora;
        } else {
            hour = String.valueOf(hora);
        }
        if (min < 10) {
            mins = "0" + min;
        } else {
            mins = String.valueOf(min);
        }
        String tiempo = hour + ":" + mins + ":00";

        return tiempo;
    }

    /**
     * Método que suma un mes a la fecha actual
     */
    public void addDay() {
        this.cal.add(Calendar.DAY_OF_MONTH, 1);
    }

    /**
     * Método que suma un determinado número de días a la fecha actual
     * @param days
     */
    public void addDay(int days) {
        this.cal.add(Calendar.DAY_OF_MONTH, days);
    }

    /**
     * Método que resta un día a la fecha actual
     */
    public void sustDay() {
        this.cal.add(Calendar.DAY_OF_MONTH, -1);
    }

    /**
     * Método que resta un determinado número de días a la fecha actual
     * @param days 
     */
    public void sustDay(int days) {
        this.cal.add(Calendar.DAY_OF_MONTH, -days);
    }

    /**
     * Método que suma un mes a la fecha actual
     */
    public void addMonth() {
        this.cal.add(Calendar.MONTH, 1);
    }

    /**
     * Método que suma un determinado número de meses a la fecha actual
     * @param months
     */
    public void addMonth(int months) {
        this.cal.add(Calendar.MONTH, months);
    }

    /**
     * Método que resta un mes a la fecha actual
     */
    public void sustMonth() {
        this.cal.add(Calendar.MONTH, -1);
    }

    /**
     * Método que resta un determinado número de meses a la fecha actual
     * @param months
     */
    public void sustMonth(int months) {
        this.cal.add(Calendar.MONTH, -months);
    }

    /**
     * Método que suma un año a la fecha actual
     */
    public void addYear() {
        this.cal.add(Calendar.YEAR, 1);
    }

    /**
     * Método que suma un determinado número de años a la fecha actual
     * @param years
     */
    public void addYear(int years) {
        this.cal.add(Calendar.YEAR, years);
    }

    /**
     * Método que resta un año a la fecha actual
     */
    public void sustYear() {
        this.cal.add(Calendar.YEAR, -1);
    }

    /**
     * Método que resta un determinado número de años a la fecha actual
     * @param years
     */
    public void sustYear(int years) {
        this.cal.add(Calendar.YEAR, -years);
    }

    /**
     * Método que suma una hora a la fecha actual
     */
    public void addHour() {
        this.cal.add(Calendar.HOUR_OF_DAY, 1);
    }

    /**
     * Método que suma un determinado número de horas a la fecha actual
     * @param hour
     */
    public void addHours(int hour) {
        this.cal.add(Calendar.HOUR_OF_DAY, hour);
    }

    /**
     * Método que resta una hora a la fecha actual
     */
    public void sustHour() {
        this.cal.add(Calendar.HOUR_OF_DAY, -1);
    }

    /**
     * Método que resta un determinado número de horas a la fecha actual
     * @param hour
     */
    public void sustHours(int hour) {
        this.cal.add(Calendar.HOUR_OF_DAY, -hour);
    }

    /**
     * Método que suma un minuto a la fecha actual
     */
    public void addMin() {
        this.cal.add(Calendar.MINUTE, 1);
    }

    /**
     * Método que suma un determinado número de minutos a la fecha actual
     * @param mins
     */
    public void addMins(int mins) {
        this.cal.add(Calendar.MINUTE, mins);
    }

    /**
     * Método que resta un minuto a la fecha actual
     */
    public void sustMins() {
        this.cal.add(Calendar.MINUTE, -1);
    }

    /**
     * Método que resta un determinado número de minuyos a la fecha actual
     * @param mins
     */
    public void sustMins(int mins) {
        this.cal.add(Calendar.MINUTE, -mins);
    }

    /**
     * Método que regresa la fecha de este calendario en letra con el siguiente formato.<br>
     * <b><i>Nombre del Día</i>, <i>día</i> de <i>mes</i>, <i>año</i></b>
     *
     * @return     Fecha en formato <b>Lunes, 01 de Enero, 1900</b>.
     */
    public String getFechaCalendarioLetra() {
        String fecha_letra = obtenDia(this.cal.get(Calendar.DAY_OF_WEEK))
                + ", " + this.cal.get(Calendar.DAY_OF_MONTH)
                + " de " + obtenMes(this.cal.get(Calendar.MONTH), 1)
                + ", " + this.cal.get(Calendar.YEAR);
        return fecha_letra;
    }

    /**
     * Método que regresa la fecha actual en letra con el siguiente formato.<br>
     * <b><i>Nombre del Día</i>, <i>día</i> de <i>mes</i>, <i>año</i></b>
     *
     * @return     Fecha en formato <b>Lunes, 01 de Enero, 1900</b>.
     */
    public static String getFechaActualLetra() {
        Calendar calendar = Calendar.getInstance();
        String fecha_letra = obtenDia(calendar.get(Calendar.DAY_OF_WEEK))
                + ", " + calendar.get(Calendar.DAY_OF_MONTH)
                + " de " + obtenMes(calendar.get(Calendar.MONTH), 1)
                + ", " + calendar.get(Calendar.YEAR);
        return fecha_letra;
    }

    /**
     * Método que regresa la fecha en letra con el siguiente formato.<br>
     * <b><i>Nombre del Día</i>, <i>día</i> de <i>mes</i>, <i>año</i></b>
     *
     * @param fecha_normal
     * @return     Fecha en formato <b>Lunes, 01 de Enero, 1900</b>.
     */
    public static String getFechaLetra(String fecha_normal) {
        if (fecha_normal.length() == 10) {
            String fecha_letra;
            Calendar calendar = Calendar.getInstance();
            calendar.set(Calendar.DAY_OF_MONTH, Integer.parseInt(fecha_normal.substring(0, 2)));
            calendar.set(Calendar.MONTH, Integer.parseInt(fecha_normal.substring(3, 5)));
            calendar.set(Calendar.YEAR, Integer.parseInt(fecha_normal.substring(6, 10)));
            //fecha_letra = obtenPalabra(calendar.getDisplayName(Calendar.DAY_OF_WEEK, Calendar.LONG, aLocale)) +
            fecha_letra = obtenDia(calendar.get(Calendar.DAY_OF_WEEK))
                    + ", " + calendar.get(Calendar.DAY_OF_MONTH)
                    + " de " + obtenMes(calendar.get(Calendar.MONTH), 1)
                    + ", " + calendar.get(Calendar.YEAR);
            return fecha_letra;
        } else {
            //JOptionPane.showMessageDialog(null, "<html><center>Por favor asegúrese de haber escrito correctamente la fecha<br><b>Existe un error en esta.</b></center></html>");
            return "Formato Incorrecto";
        }
    }

    /**
     * Método que regresa el mes en letra con el siguiente formato.<br>
     * <b><i>Mes</i></b>
     *
     * @return Mes en formato <b>Enero</b>.
     */
    public String getMesCalendarioLetra() {
        return obtenMes(this.cal.get(Calendar.MONTH), 1);
    }

    /**
     * Método que regresa el mes en letra con el siguiente formato.<br>
     * <b><i>Mes</i></b>
     *
     * @return Mes en formato <b>Enero</b>.
     */
    public static String getMesActualLetra() {
        Calendar calendar = Calendar.getInstance();
        return obtenMes(calendar.get(Calendar.MONTH), 1);
    }

    /**
     * Método toString de la clase que regresa anio - mes - dia;
     *
     * @return Fecha en formato aaaa-mm-dd.
     */
    @Override
    public String toString() {
        String[] date_array = setCalendarToFecha(this.cal.get(Calendar.DAY_OF_MONTH), (this.cal.get(Calendar.MONTH) + 1), this.cal.get(Calendar.YEAR));
        return date_array[2] + "-" + date_array[1] + "-" + date_array[0] + " " + this.cal.get(Calendar.HOUR_OF_DAY) + ":" + this.cal.get(Calendar.MINUTE) + ":" + this.cal.get(Calendar.SECOND);
    }

    private static String[] setCalendarToFecha(int day, int month, int year) {
        String[] date_array = new String[3];
        if (day <= 9) {
            date_array[0] = "0" + day;
        } else {
            date_array[0] = String.valueOf(day);
        }
        if (month <= 9) {
            date_array[1] = "0" + month;
        } else {
            date_array[1] = String.valueOf(month);
        }
        date_array[2] = String.valueOf(year);
        return date_array;
    }

    private static String[] setTimeToTiempo(int hora, int minutos, int segundos) {
        String[] hour_array = new String[3];
        if (hora <= 9) {
            hour_array[0] = "0" + hora;
        } else {
            hour_array[0] = String.valueOf(hora);
        }
        if (minutos <= 9) {
            hour_array[1] = "0" + minutos;
        } else {
            hour_array[1] = String.valueOf(minutos);
        }
        if (segundos <= 9) {
            hour_array[2] = "0" + segundos;
        } else {
            hour_array[2] = String.valueOf(segundos);
        }
        return hour_array;
    }

    private static String obtenPalabra(String cadena) {
        String palabra_nueva = "";
        String[] buffer = cadena.split("\\s");
        int tamBuffer = buffer.length - 1;
        for (int i = 0; i < buffer.length; i++) {
            if (buffer[i].endsWith(".")) {
                if (i == tamBuffer) {
                    palabra_nueva += buffer[i];
                } else {
                    palabra_nueva += buffer[i] + " ";
                }
            } else if (buffer[i].length() < 3) {
                if (i == tamBuffer) {
                    palabra_nueva += buffer[i].toLowerCase();
                } else {
                    palabra_nueva += buffer[i].toLowerCase() + " ";
                }
            } else {
                int tamanio = buffer[i].length();
                if (i == tamBuffer) {
                    palabra_nueva += buffer[i].substring(0, 1).toUpperCase() + buffer[i].substring(1, tamanio).toLowerCase();
                } else {
                    palabra_nueva += buffer[i].substring(0, 1).toUpperCase() + buffer[i].substring(1, tamanio).toLowerCase() + " ";
                }
            }
        }
        return palabra_nueva;
    }

    /**
     *
     * @param i
     * @param inc
     * @return
     */
    public static String obtenMes(int i, int inc) {
        i = i + inc;
        String mesL = "";
        switch (i) {
            case 1:
                mesL = "Enero";
                break;
            case 2:
                mesL = "Febrero";
                break;
            case 3:
                mesL = "Marzo";
                break;
            case 4:
                mesL = "Abril";
                break;
            case 5:
                mesL = "Mayo";
                break;
            case 6:
                mesL = "Junio";
                break;
            case 7:
                mesL = "Julio";
                break;
            case 8:
                mesL = "Agosto";
                break;
            case 9:
                mesL = "Septiembre";
                break;
            case 10:
                mesL = "Octubre";
                break;
            case 11:
                mesL = "Noviembre";
                break;
            case 12:
                mesL = "Diciembre";
                break;
        }
        return mesL;
    }

    /**
     *
     * @param i
     * @return
     */
    public static String obtenMesShort(int i) {
        i = i + 1;
        String mesL = "";
        switch (i) {
            case 1:
                mesL = "Ene";
                break;
            case 2:
                mesL = "Feb";
                break;
            case 3:
                mesL = "Mar";
                break;
            case 4:
                mesL = "Abr";
                break;
            case 5:
                mesL = "May";
                break;
            case 6:
                mesL = "Jun";
                break;
            case 7:
                mesL = "Jul";
                break;
            case 8:
                mesL = "Ago";
                break;
            case 9:
                mesL = "Sep";
                break;
            case 10:
                mesL = "Oct";
                break;
            case 11:
                mesL = "Nov";
                break;
            case 12:
                mesL = "Dic";
                break;
        }
        return mesL;
    }

    private static String obtenDia(int i) {
        String diaL = "";
        switch (i) {
            case 1:
                diaL = "Domingo";
                break;
            case 2:
                diaL = "Lunes";
                break;
            case 3:
                diaL = "Martes";
                break;
            case 4:
                diaL = "Miércoles";
                break;
            case 5:
                diaL = "Jueves";
                break;
            case 6:
                diaL = "Viernes";
                break;
            case 7:
                diaL = "Sábado";
                break;
        }
        return diaL;
    }

    /**
     *
     * @param fecha
     * @return
     */
    public static String obtenCalendario(Fecha fecha) {
        String calendario = "";
        calendario = getCalendario();


        calendario = calendario.replace("%FechaActual%", fecha.getFechaCalendarioLetra());
        calendario = calendario.replace("%Mes%", fecha.getMesCalendarioLetra());

        calendario = asignaDias(fecha, calendario);

        return calendario;
    }

    /**
     *
     * @param fecha
     * @param calendario
     * @return
     */
    public static String asignaDias(Fecha fecha, String calendario) {
        int em = 0;
        int dom = 0;
        int num_dias = fecha.getUltimoDiaMes();

        Calendar c = Calendar.getInstance(new Locale("es", "MX"));
        c.set(fecha.getAnio(), fecha.getMes(), 1);

        for (int sm = 1; sm <= 6; sm++) {
            int diasemana = 0;
            for (int ds = 1; ds <= 7; ds++) {
                if (dom < num_dias) {
                    diasemana = c.get(Calendar.DAY_OF_WEEK);
                    dom = c.get(Calendar.DAY_OF_MONTH);
                    if (em == 0) {
                        ds = diasemana;
                        em = 1;
                    }
                    //Parametros de semana y dia semama
                    String prm = "%d-" + sm + "-" + diasemana + "%";
                    //Estilo para resaltar el día de hoy
                    String estilo = (fecha.getDia() == dom ? "<font color=\"red\">%estilo%</font>" : "%estilo%");
                    //Remplazo de estilo por la accion
                    String rpl = estilo.replace("%estilo%", "<a onClick=gotoAgendaPSP(" + c.get(Calendar.YEAR) + "," + c.get(Calendar.MONTH) + "," + dom + ") style='cursor:pointer;'>" + String.valueOf(dom) + "</a>");
                    //Remplazo de parametros por la accion
                    calendario = calendario.replace(prm, rpl);
                    c.add(Calendar.DAY_OF_MONTH, 1);
                }
            }
        }
        return cleanCalendario(calendario);
    }

    private static String cleanCalendario(String calendario) {
        for (int sm = 1; sm <= 6; sm++) {
            for (int ds = 1; ds <= 7; ds++) {
                String prm1 = "%d-" + sm + "-" + ds + "%";
                calendario = calendario.replace(prm1, "");
                String prm2 = "%a-" + sm + "-" + ds + "%";
                calendario = calendario.replace(prm2, "");
            }
        }
        return calendario;
    }

//    table.sample {
//	border-width: 1px; border-spacing: 2px; border-style: none; border-color: gray;	border-collapse: collapse; background-color: white;
//}
//table.sample th {
//	border-width: 1px;
//	padding: 1px;
//	border-style: inset;
//	border-color: gray;
//	background-color: white;
//	-moz-border-radius: 0px 0px 0px 0px;
//}
//table.sample td {
//	border-width: 1px;
//	padding: 1px;
//	border-style: inset;
//	border-color: gray;
//	background-color: white;
//	-moz-border-radius: 0px 0px 0px 0px;
//}
    private static String getCalendario() {
        String calendario = ""
                + "<center>"
                + "<br>"
                + "<br>"
                + "<table width=\"500\" border=\"1\" style=\"border-collapse:collapse;\">"
                + "<tr align=\"center\">"
                + "<td colspan=\"7\">%FechaActual%</td>"
                + "</tr>"
                + "<tr align=\"center\">"
                + "<td colspan=\"7\">%Mes%</td>"
                + "</tr>"
                + "<tr height=\"20\" align=\"center\">"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">D</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">L</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">M</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">M</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">J</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">V</td>"
                + "<td width=\"50\" height=\"20\" style=\"font-weight:bold;\">S</td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-1-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-1-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-2%</b></div><div align=\"center\">%a-1-2%</div></td>"
                + "<td id=\"idtd-1-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-3%</b></div><div align=\"center\">%a-1-3%</div></td>"
                + "<td id=\"idtd-1-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-4%</b></div><div align=\"center\">%a-1-4%</div></td>"
                + "<td id=\"idtd-1-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-5%</b></div><div align=\"center\">%a-1-5%</div></td>"
                + "<td id=\"idtd-1-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-6%</b></div><div align=\"center\">%a-1-6%</div></td>"
                + "<td id=\"idtd-1-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-1-7%</b></div><div align=\"center\">%a-1-7%</div></td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-2-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-2%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-3%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-4%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-5%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-6%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-2-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-2-7%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-3-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-2%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-3%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-4%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-5%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-6%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-3-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-3-7%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-4-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-2%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-3%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-4%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-5%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-6%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-4-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-4-7%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-5-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-2%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-3%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-4%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-5%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-6%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-5-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-5-7%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "</tr>"
                + "<tr height=\"50\" align=\"center\">"
                + "<td id=\"idtd-6-1\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-1%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-2\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-2%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-3\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-3%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-4\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-4%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-5\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-5%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-6\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-6%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "<td id=\"idtd-6-7\" width=\"50\" height=\"50\"><div class=\"font-size:12;font-weight:bold;\" align=\"center\"><b>%d-6-7%</b></div><div align=\"center\">%a-1-1%</div></td>"
                + "</tr>"
                + "</table>"
                + "</center>";
        return calendario;
    }
}
