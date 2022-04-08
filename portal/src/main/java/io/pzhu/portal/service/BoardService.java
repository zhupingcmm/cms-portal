package io.pzhu.portal.service;

import io.pzhu.portal.entity.Board;

import java.util.List;

public interface BoardService {
    List<Board> findAllBoards();

    Board addBoard (Board board);
}
