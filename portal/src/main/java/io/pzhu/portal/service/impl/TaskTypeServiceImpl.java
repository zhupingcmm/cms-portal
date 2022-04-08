package io.pzhu.portal.service.impl;

import io.pzhu.portal.dao.TaskTypeDao;
import io.pzhu.portal.entity.TaskType;
import io.pzhu.portal.service.TaskTypeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class TaskTypeServiceImpl implements TaskTypeService {

    @Autowired
    private TaskTypeDao taskTypeDao;

    @Override
    public TaskType addTaskType(TaskType taskType) {
        try {
            return taskTypeDao.save(taskType);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<TaskType> findAll() {
        try {
            return taskTypeDao.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
