package io.pzhu.portal.service;

import io.pzhu.portal.entity.User;

import java.util.List;

public interface UserService {
    User addUser(User user);

    User findByName(String name);

    List<User> findAll();

    User findById(Long id);

    User updateUser(User user);

    void deleteUserById(Long id);
}
