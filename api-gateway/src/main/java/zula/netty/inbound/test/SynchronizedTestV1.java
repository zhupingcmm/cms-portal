package zula.netty.inbound.test;

public class SynchronizedTestV1 {
    public static synchronized void method1 () {
        System.out.println("method 1 start");
        try{
            System.out.println("method 1 execute");
            Thread.sleep(300);
        } catch (Exception e) {

        }
        System.out.println("method 1 end");
    }
    public static synchronized void method2 () {
        System.out.println("method 2 start");
        try{
            System.out.println("method 2 execute");
            Thread.sleep(100);
        } catch (Exception e) {

        }
        System.out.println("method 2 end");
    }

    public static void main(String[] args) {
//        final SynchronizedTestV1 v1 = new SynchronizedTestV1();
//        final SynchronizedTest v2 = new SynchronizedTest();
        new Thread(SynchronizedTestV1::method1).start();
        new Thread(SynchronizedTestV1::method2).start();
    }
}
