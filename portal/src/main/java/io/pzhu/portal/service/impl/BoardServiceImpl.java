package io.pzhu.portal.service.impl;

import io.pzhu.portal.dao.BoardDao;
import io.pzhu.portal.entity.Board;
import io.pzhu.portal.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {

    @Autowired
    private BoardDao boardDao;

    @Override
    public List<Board> findAllBoards() {
        try {
            return boardDao.findAll();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    @Override
    public Board addBoard(Board board) {
        try {
            return boardDao.save(board);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
