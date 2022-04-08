package io.pzhu.portal.service;

import io.pzhu.portal.entity.Task;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TaskServiceTest {
    @Autowired
    private TaskService taskService;

    @Test
    public void getAllTask() {
        List<Task> tasks = taskService.findAllTasks();
        tasks.forEach(task -> {
            System.out.println("===========" + task.getName());
        });
    }

    @Test
    public void addTask() {
       Task task =  taskService.addTask(Task.builder()
                        .boardId(1L)
                        .userId(1L)
                        .name("ut task")
                        .build());

       assert (task.getName()).equals("ut test");
    }
}
