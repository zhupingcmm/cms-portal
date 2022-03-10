package zula.netty.inbound.test;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

public class ProducerAndConsumerV1 {
    private static final AtomicInteger atomicInteger = new AtomicInteger();
    public volatile boolean flag = true;
    public static final int MAX_SIZE = 10;
    public static final List<Integer> pool = new ArrayList<>();

    public void produce () {
        while (flag) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (pool) {
                if (pool.size() == MAX_SIZE) {
                    try {
                        System.out.println("pool is full, waiting");
                        pool.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }

                pool.add(atomicInteger.incrementAndGet());
                System.out.println(Thread.currentThread().getName() + " produce number:" + atomicInteger.get() + "\t" + "current size:" + pool.size());
                pool.notifyAll();
            }
        }
    }

    public void consume () {
        while (flag) {
            try {
                Thread.sleep(100);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            synchronized (pool) {
                if (pool.size() == 0) {
                    try {
                        System.out.println("pool is empty, waiting...");
                        pool.wait();
                    } catch (Exception e) {

                    }
                }
                int temp = pool.get(0);
                pool.remove(0);
                System.out.println(Thread.currentThread().getName() + " cousume number:" + temp + "\t" + "current size:" + pool.size());
                //通知
                pool.notifyAll();
            }
        }
    }

    public void stop() {
        flag = false;
    }

    public static void main(String[] args) {
        ProducerAndConsumerV1 v1 = new ProducerAndConsumerV1();
        new Thread(v1::consume, "c1").start();
        new Thread(v1::produce,"p1").start();
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        v1.stop();


    }

}
