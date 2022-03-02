package zula.netty.inbound.test;

public class SynchronizedTest {
    public void method () {
        synchronized (this) {
            System.out.println("method 1 start");
        }
    }
}
