package io.pzhu.portal.service;

import io.pzhu.portal.entity.Board;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BoardServiceTest {

    @Autowired
    private BoardService boardService;

    @Test
    public void addBoard(){
        Board board = boardService.addBoard(Board.builder()
                        .name("complete")
                .build());
        assert (board.getName()).equals("complete");
    }
}
