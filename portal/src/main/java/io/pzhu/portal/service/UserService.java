package io.pzhu.portal.service;

import io.pzhu.portal.entity.User;

import java.util.List;

public interface UserService {
    User addUser(User user);

    User findByName(String name);

    List<User> findAll();
}
