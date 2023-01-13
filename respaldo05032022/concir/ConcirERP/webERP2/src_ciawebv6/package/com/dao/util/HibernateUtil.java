/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.dao.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.EntityExistsException;

/**
 *
 * @author Marco Andrade
 */
public class HibernateUtil {

    private static final ThreadLocal threadSession = new ThreadLocal();
    private static EntityManagerFactory entityFactory;

    static {
        try {
            entityFactory = Persistence.createEntityManagerFactory("Argo");
        } catch (Throwable ex) {
            ex.printStackTrace(System.out);
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static EntityManager getEntityManager() {
        EntityManager e = (EntityManager) threadSession.get();
        try {
            if (e == null) {
                e = entityFactory.createEntityManager();
                threadSession.set(e);
            }
        } catch (EntityExistsException ex) {
            throw new EntityExistsException(ex);
        }
        return e;
    }

//    public static EntityManager getEntityManager2() {
//        EntityManager e = null;
//        try {
//            e = entityFactory.createEntityManager();
//        } catch (EntityExistsException ex) {
//            throw new EntityExistsException(ex);
//        }
//        //refreshConexion(e);
//        return e;
//    }

    public static void closeSessionFactory() {
        try {
            entityFactory.close();
        } catch (EntityExistsException ex) {
        }
    }

    public static void closeSession() {
        try {
            EntityManager e = (EntityManager) threadSession.get();
            threadSession.remove();
            threadSession.set(null);
            if (e != null) {
                if(e.getTransaction().isActive()){
                    e.getTransaction().rollback();
                }
                e.clear();
                e.close();
                e=null;
                

            }
        } catch (EntityExistsException ex) {
        }
    }

//    public static void closeSession2(EntityManager e) {
//        try {
//            if (e != null && e.isOpen()) {
//                //8  e.flush();
//                if (e.getTransaction().isActive()) {
//                    e.getTransaction().rollback();
//                }
//                e.clear();
//                e.close();
//
//                e = null;
//
//
//            }
//        } catch (EntityExistsException ex) {
//        }
//    }


}
