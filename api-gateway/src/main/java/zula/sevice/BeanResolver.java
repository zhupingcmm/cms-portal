package zula.sevice;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Service
public class BeanResolver implements ApplicationContextAware {
    private ApplicationContext applicationContext;

    public Set<String> getBeanNames() {
        return new HashSet<>(Arrays.asList(applicationContext.getBeanDefinitionNames()));
    }

    public Object getBean (String beanName) {
        return this.applicationContext.getBean(beanName);
    }

    public <T> T getBean(Class<T> clazz){
        return this.applicationContext.getBean(clazz);
    }
    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;

    }
}
