package zula.netty.inbound.httpclint;

import org.springframework.stereotype.Component;

import java.util.concurrent.ConcurrentLinkedQueue;

@Component
public class RequestQueue<T> {
    private final ConcurrentLinkedQueue<T> queue = new ConcurrentLinkedQueue<>();

    public void produce (T msg) {
        queue.offer(msg);
    }

    public T consume(){
        return (T) queue.poll();
    }

    public ConcurrentLinkedQueue<T> getQueue() {
        return queue;
    }

    public int size () {
        return queue.size();
    }
}
