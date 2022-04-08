package io.pzhu.portal.service;

import io.pzhu.portal.entity.Task;

import java.util.List;

public interface TaskService {
    List<Task> findAllTasks();

    Task addTask (Task task);
}
