package zula.config;

import lombok.extern.slf4j.Slf4j;

import java.io.InputStream;
import java.util.Properties;

@Slf4j
public class Config {
    private Properties properties = null;
    public Config () {
        properties = new Properties();
    }

    public void init () {
        try {
            log.info("Init config service.");
            InputStream in = Config.class.getClassLoader().getResourceAsStream("config/config.properties");
            properties.load(in);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public String getValueByKey (String key) {
        log.debug("Get {} from config service.", key);
        return properties.getProperty(key);
    }

    public void destroy () {
        log.info("Destroy the config service.");
        properties.clear();
    }
}
