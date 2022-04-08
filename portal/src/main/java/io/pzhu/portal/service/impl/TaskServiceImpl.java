package io.pzhu.portal.service.impl;

import io.pzhu.portal.dao.TaskDao;
import io.pzhu.portal.entity.Task;
import io.pzhu.portal.service.TaskService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TaskServiceImpl implements TaskService {
    @Autowired
    private TaskDao taskDao;

    @Override
    public List<Task> findAllTasks() {
        try {
            return taskDao.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Task addTask(Task task) {
        try {
            return taskDao.save(task);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
