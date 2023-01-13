/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dao;

import com.dao.util.HibernateUtil;
import java.util.ArrayList;
import java.util.List;
import java.util.Vector;
import javax.persistence.EntityManager;
import javax.persistence.Query;

/**
 *
 * @author desarrollo-16
 */
public class EventManager {

    public EventManager() {
    }

    /**
     * Metodo ejecuta una consulta con parametros
     * @param query sentencia sql, los parametros se escriben con ?1, ?2.. etc
     * @param arrayParameter en cada posicion del arreglo se pone el parametro de la sentencia sql
     * @return List
     *
     */
    public static List getArrayParameter(String query, Vector arrayParameter) {
        List array = new ArrayList(0);
        array.clear();
        try {

            EntityManager em = HibernateUtil.getEntityManager();
            Query q = em.createQuery(query);
            for (int i = 0; i < arrayParameter.size(); i++) {
                q.setParameter(i + 1, arrayParameter.get(i));
            }
            array = (List) q.getResultList();
            return array;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Metodo ejecuta una consulta con parametros
     * @param query sentencia sql, los parametros se escriben con ?1, ?2.. etc
     * @param arrayParameter en cada posicion del arreglo se pone el parametro de la sentencia sql
     * @return Object
     *
     */
    public static Object getRegistroParameter(String query, Vector arrayParameter) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            if (!em.getTransaction().isActive()) {
                em.getTransaction().begin();
            }
            Query q = em.createQuery(query);
            for (int i = 0; i < arrayParameter.size(); i++) {
                q.setParameter(i + 1, arrayParameter.get(i));
            }
            Object entidad = (Object) q.getSingleResult();

            return entidad;
        } catch (Exception e) {

            e.printStackTrace();
            return null;
        } finally {
        }



    }

    /**
     * Metodo que ejecuta una consulta sql sin parametros
     * @param query consulta sql
     * @return Object
     *
     */
    public static Object getRegistro(String query) {

        try {
            EntityManager em = HibernateUtil.getEntityManager();
            Object entidad = (Object) em.createQuery(query).getSingleResult();
            return entidad;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }


    }

    /**
     * Metodo que ejecuta una consulta sql sin parametros
     * @param query consulta sql
     * @return List
     *
     */
    public static List getArray(String query) {
        EntityManager em = HibernateUtil.getEntityManager();
        try {
            List array = em.createQuery(query).getResultList();
            return array;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Metodo para buscar una entidad
     * @param clase class del objeto
     * @param Id Id del objeto
     * @return Object
     *
     */
    public static Object getSingleList(Class clase, Integer Id) {
        Object obj = null;
        try {
            EntityManager em = HibernateUtil.getEntityManager();
            obj = new Object();
            obj = em.find(clase, Id);
        } catch (Exception e) {
            e.printStackTrace();
            obj = null;
        }
        return obj;
    }

    /**
     * Metodo ejecuta una consulta con parametros
     * @param query sentencia sql, los parametros se escriben con ?1, ?2.. etc
     * @param arrayParameter en cada posicion del arreglo se pone el parametro de la sentencia sql
     * @return List
     *
     */
    public static List getArrayParameterLimit(String query, Vector arrayParameter, int start, int limit) {
        List array = new ArrayList(0);
        array.clear();
        try {

            EntityManager em = HibernateUtil.getEntityManager();
            Query q = em.createQuery(query);
            for (int i = 0; i < arrayParameter.size(); i++) {
                q.setParameter(i + 1, arrayParameter.get(i));
            }
            q.setFirstResult(start);
            q.setMaxResults(limit);
            array = (List) q.getResultList();
            return array;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public static List getArrayParameterLimit(String query, int start, int limit) {
        List array = new ArrayList(0);
        array.clear();
        try {
            EntityManager em = HibernateUtil.getEntityManager();
            Query q = em.createQuery(query);
            q.setFirstResult(start);
            q.setMaxResults(limit);
            array = (List) q.getResultList();
            return array;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
