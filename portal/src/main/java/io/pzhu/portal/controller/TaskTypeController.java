package io.pzhu.portal.controller;

import io.pzhu.portal.entity.TaskType;
import io.pzhu.portal.service.TaskTypeService;
import io.pzhu.portal.vo.TaskTypeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskTypeController {

    @Autowired
    private TaskTypeService taskTypeService;

    @PostMapping("/tasktype")
    public ResponseEntity<TaskType> addTaskType (@RequestBody TaskTypeRequest request) {
        return ResponseEntity.ok(taskTypeService.addTaskType(request.toType()));
    }

    @GetMapping("/tasktypes")
    public ResponseEntity<List<TaskType>> getAllTaskType() {
        return ResponseEntity.ok(taskTypeService.findAll());
    }
}
