package sc.todo.Todomanagement.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import sc.todo.Todomanagement.entity.Role;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);

    @Query("select r.id from Role r where name in ?1")
    List<Long> findRolesIDsByNameIn(List<String> roleNames);

}
