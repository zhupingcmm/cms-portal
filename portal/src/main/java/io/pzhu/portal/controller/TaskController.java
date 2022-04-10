package io.pzhu.portal.controller;

import io.pzhu.portal.entity.Task;
import io.pzhu.portal.jwt.PassToken;
import io.pzhu.portal.response.Response;
import io.pzhu.portal.service.TaskService;
import io.pzhu.portal.vo.TaskRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@Slf4j
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping("/tasks")
    @PassToken
    public ResponseEntity<List<Task>> getAllTasks () {
        log.info("Try to get all takes");
        return ResponseEntity.ok(taskService.findAllTasks());
    }

    @PostMapping("/task")
    public ResponseEntity<Task> addTask (@RequestBody TaskRequest taskRequest) {
        log.info("Try to add a task {}", taskRequest.getName());
        return ResponseEntity.ok(taskService.addTask(taskRequest.toTask()));
    }

    @GetMapping("/tasks/{userid}")
    public ResponseEntity<List<Task>> getTaskByUserId (@PathVariable String userid) {
        List<Task> tasks = taskService.findAllTasks();
        List<Task> result = tasks.stream().filter(task -> task.getUserId().equals(Long.valueOf(userid))).collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/task/{id}")
    public ResponseEntity<Response> deleteTaskById(@PathVariable String id) {
        taskService.deleteTaskById(Long.valueOf(id));
        return ResponseEntity.ok(Response.builder().message("delete success").build());
    }

    @PatchMapping("/task")
    public ResponseEntity<Task> editTask(@RequestBody TaskRequest request) {
        return ResponseEntity.ok(taskService.updateTask(request.toTask()));
    }
}
