package sc.todo.Todomanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sc.todo.Todomanagement.entity.Todo;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo, Long> {

    @Query("SELECT td FROM Todo td ORDER BY td.id")
    List<Todo> findAll();

}
