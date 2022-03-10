package zula.netty.inbound.test;

import java.util.Objects;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class ProducerAndConsumerV2 {

    private volatile boolean flag = true;

    private final Lock lock = new ReentrantLock();
    private static Integer count = 0;
    private static final Integer FULL = 10;

    private final Condition notFull = lock.newCondition();
    private final Condition notEmpty = lock.newCondition();

    private void producer () {
        while (flag) {
            for (int i = 0; i < 10; i++) {
//                try {
//                    Thread.sleep(3000);
//                } catch (InterruptedException e) {
//                    e.printStackTrace();
//                }
                lock.lock();
                try {
                    if (Objects.equals(FULL, count)) {
                        notFull.await();
                    }
                    count++;
                    System.out.println(Thread.currentThread().getName() + " current total count is:" + count);
                    notEmpty.signalAll();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }
            }
        }
    }


    private void consume () {
        while (flag) {
            for (int i = 0; i < 10; i++) {
                try {
                    Thread.sleep(3000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                lock.lock();
                try {
                    if (count == 0) {
                        notEmpty.wait();
                    }
                    count--;
                    System.out.println(Thread.currentThread().getName() + " current total count is:" + count);
                    notFull.signalAll();
                } catch (Exception e) {
                    e.printStackTrace();
                } finally {
                    lock.unlock();
                }


            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        ProducerAndConsumerV2 v2 = new ProducerAndConsumerV2();
        new Thread(v2::producer, "p1").start();
        new Thread(v2::consume, "c1").start();

        Thread.sleep(10000);
    }



}
