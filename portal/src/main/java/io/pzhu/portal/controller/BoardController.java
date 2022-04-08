package io.pzhu.portal.controller;

import io.pzhu.portal.entity.Board;
import io.pzhu.portal.service.BoardService;
import io.pzhu.portal.vo.BoardRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping("/boards")
    public ResponseEntity<List<Board>> getAllBoards() {

        return ResponseEntity.ok(boardService.findAllBoards());
    }

    @PostMapping("/board")
    public ResponseEntity<Board> addBoard(@RequestBody BoardRequest request) {
        return ResponseEntity.ok(boardService.addBoard(request.toBoard()));
    }
}
