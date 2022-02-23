package zula.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import zula.sevice.BeanResolver;

@Configuration
@Slf4j
public class AppConfig {
    @Bean(initMethod = "init", destroyMethod = "destroy")
    public Config createConfig(){
        return new Config();
    }

    @Autowired
    private BeanResolver beanResolver;

    public Config getConfig () {
        return beanResolver.getBean(Config.class);
    }
}
