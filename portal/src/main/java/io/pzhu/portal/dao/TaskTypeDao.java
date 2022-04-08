package io.pzhu.portal.dao;

import io.pzhu.portal.entity.TaskType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeDao extends JpaRepository<TaskType, Long> {
}
