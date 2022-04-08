package io.pzhu.portal.service;

import io.pzhu.portal.entity.TaskType;

import java.util.List;

public interface TaskTypeService {
    TaskType addTaskType(TaskType taskType);

    List<TaskType> findAll();
}
