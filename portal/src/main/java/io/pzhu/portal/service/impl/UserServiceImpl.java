package io.pzhu.portal.service.impl;

import io.pzhu.portal.dao.UserDao;
import io.pzhu.portal.entity.User;
import io.pzhu.portal.jwt.JwtConfig;
import io.pzhu.portal.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@CacheConfig(cacheNames = "users")
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtConfig jwtConfig;


    @Override
    @CachePut(key = "#user.username", value = "userCache")
    public User addUser(User user) {
        try {
            String token = jwtConfig.createToken(user.getUsername());
            user.setToken(token);
            log.info("save {} info to db and redis", user.getUsername());
            return userDao.save(user);
        } catch (Exception e) {
            log.error("Failed to add {}", user);
            throw new RuntimeException(e);
        }

    }

    @Override
    @Cacheable(key = "#name", value = "userCache", unless = "#result == null ")
    public User findByName(String name) {
        try {
            return userDao.findByUsername(name);
        }catch (Exception e) {
            log.error("Failed to get user info by {}", name);
            throw new RuntimeException(e);
        }
    }

    @Override
//    @Cacheable(key = "methodName", value = "userCache")
    public List<User> findAll() {
        try {
            return userDao.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public User findById(Long id) {
        try {
            Optional<User> result =userDao.findById(id);
            return result.get();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public User updateUser(User user) {
        try {

            return userDao.save(user);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void deleteUserById(Long id) {
        try {
            userDao.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


}
