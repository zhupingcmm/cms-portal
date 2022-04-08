package io.pzhu.portal.service;

import io.pzhu.portal.entity.TaskType;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TaskTypeServiceTest {

    @Autowired
    private TaskTypeService service;
    @Test
    public void addTaskType () {
       TaskType taskType = service.addTaskType(TaskType.builder()
                        .name("feature")
                .build());
       assert (taskType.getName()).equals("feature");

    }
}
