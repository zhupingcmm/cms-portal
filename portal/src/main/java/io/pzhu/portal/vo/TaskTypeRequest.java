package io.pzhu.portal.vo;

import io.pzhu.portal.entity.TaskType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskTypeRequest {

    private Long id;

    private String name;

    public TaskType toType () {
        return TaskType.builder()
                .id(id)
                .name(name)
                .build();
    }

}
