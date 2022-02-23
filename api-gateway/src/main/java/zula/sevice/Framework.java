package zula.sevice;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import zula.netty.NettyServer;

import javax.annotation.PostConstruct;

@Slf4j
@Service
public class Framework {
    @Autowired
    private NettyServer nettyServer;

    @PostConstruct
    public void start(){
        nettyServer.start();
    }
}
