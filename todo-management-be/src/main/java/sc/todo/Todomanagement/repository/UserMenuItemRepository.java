package sc.todo.Todomanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sc.todo.Todomanagement.entity.UserMenuItem;

import java.util.List;

public interface UserMenuItemRepository extends JpaRepository<UserMenuItem, Long> {
    @Query("select items from UserMenuItem items where role_id=?1")
    List<UserMenuItem> findByRoleId(Long id);
}
