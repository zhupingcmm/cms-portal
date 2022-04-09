package io.pzhu.portal.controller;

import io.pzhu.portal.entity.Board;
import io.pzhu.portal.response.Response;
import io.pzhu.portal.service.BoardService;
import io.pzhu.portal.vo.BoardRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

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

    @GetMapping("boards/{userid}")
    public ResponseEntity<List<Board>> getBoardsByUserId(@PathVariable String userid) {

       List<Board> result = boardService.findAllBoards().stream()
               .filter(board -> "oob".equals(board.getType()) || Long.valueOf(userid).equals(board.getUserId()))
               .collect(Collectors.toList());
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/board/{id}")
    public ResponseEntity<Response> deleteBoardById(@PathVariable String id) {
        boardService.deleteBoardById(Long.valueOf(id));
        return ResponseEntity.ok(Response.builder().message("delete success").build());
    }
}
