package io.pzhu.portal.vo;

import io.pzhu.portal.entity.Board;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class BoardRequest {
    private Long id;

    private String name;

    public Board toBoard () {
        return Board.builder()
                .id(id)
                .name(name)
                .build();
    }
}
