/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.entity;

import java.util.ArrayList;

/**
 *
 * @author mandrade
 */
public class ConfigUsuario {

    public ArrayList<Item> items;
    public ArrayList<Empresa> empresas;
    public ArrayList<Almacene> almacenes;

    public static class Item {
        public int usuid;
        public String usumail;
        public int umomodid;
        public String modnombre;
        public String modcontexto;
        public int umoacceso;
        public int modorden;
        public int modpadre;
    }

    public static class Empresa {
        public int empid;
        public String empnomcorto;
    }

    public static class Almacene {
        public String almid;
        public String almnombre;
    }
}
