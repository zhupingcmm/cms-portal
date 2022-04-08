package io.pzhu.portal.dao;

import io.pzhu.portal.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardDao extends JpaRepository<Board, Long> {

}
