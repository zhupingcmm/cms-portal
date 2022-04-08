package io.pzhu.portal.vo;

import io.pzhu.portal.entity.Task;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskRequest {
    private Long id;

    private String name;

    private Long userId;

    private Long boardId;

    public Task toTask() {
        return Task.builder()
                .id(id)
                .name(name)
                .userId(userId)
                .boardId(boardId)
                .build();
    }
}
