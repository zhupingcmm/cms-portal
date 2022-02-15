package io.pzhu.portal.redis;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.Date;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Component
@Slf4j
public class RedisOperator <K,V>{
    @Autowired
    private RedisTemplate<K,V> redisTemplate;


    /**
     * @Desc get the cache
     * @param K key
     * @return V value
     */
    public V get(K key) {
        return key == null ? null : redisTemplate.opsForValue().get(key);
    }

    /**
     *
     * @param key
     * @param value
     * @return true or false
     */
    public Boolean set(K key, V value) {
        try {
            redisTemplate.opsForValue().set(key, value);
            return true;
        } catch (Exception e) {
            log.info(e.getMessage(), e);
            return false;
        }
    }

    /**
     *
     * @param key
     * @return set keys
     */
    public Set<K> keys (K key) {
        return redisTemplate.keys(key);
    }

    /**
     *
     * @param key
     * @param time (seconds)
     * @return
     */
    public Boolean expire(K key, long time) {
        try {
            if (time > 0) {
                return redisTemplate.expire(key, time, TimeUnit.SECONDS);
            }
            return false;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    /**
     *
     * @param key
     * @param date
     * @return
     */
    public Boolean expireAt(K key, Date date) {
        try {
            if (date != null) {
                return redisTemplate.expireAt(key, date);
            }
            return false;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    public void del(K ...key) {
        if (key != null && key.length > 0) {
            if (key.length == 1) {
                redisTemplate.delete(key[0]);
            } else {
                redisTemplate.delete((K) CollectionUtils.arrayToList(key));
            }

        }
    }

    public Boolean hasKey(K key) {
        try {
            return redisTemplate.hasKey(key);
        }catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    /**
     *
     * @param key
     * @param value
     * @param time
     * @return
     */
    public Boolean setNX(K key, V value, long time) {
        try{
            Boolean result = redisTemplate.opsForValue().setIfAbsent(key, value);
            if (Boolean.TRUE.equals(result) && time > 0) {
                expire(key, time);
            }
            return result;
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            return false;
        }
    }

    public Long increment(K key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("must rather than 0");
        }
        return redisTemplate.opsForValue().increment(key, delta);
    }


    /**
     * 递减
     *
     * @param key   键
     * @param delta 要减少几(小于0)
     * @return
     */
    public Long decr(K key, long delta) {
        if (delta < 0) {
            throw new RuntimeException("递减因子必须大于0");
        }
        return redisTemplate.opsForValue().increment(key, -delta);
    }
}
