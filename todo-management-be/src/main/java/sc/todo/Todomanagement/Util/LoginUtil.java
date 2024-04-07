package sc.todo.Todomanagement.Util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import sc.todo.Todomanagement.repository.RoleRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LoginUtil {

    private final RoleRepository roleRepository;

    public LoginUtil(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Long> getLoggedInRoleIds() {
        if (isContextNotNullAndIsAuthenticated()) {
            List<String> roleList = new ArrayList<>();
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            authentication.getAuthorities().stream().map(roleName ->
                    roleList.add((roleName).toString())
            ).collect(Collectors.toList());
            return roleRepository.findRolesIDsByNameIn(roleList);
        }
        return Collections.emptyList();
    }

    private boolean isContextNotNullAndIsAuthenticated() {
        SecurityContext context = SecurityContextHolder.getContext();
        if (context == null) {
            return false;
        }
        Authentication authentication = context.getAuthentication();
        if (authentication == null) {
            return false;
        }
        return authentication.isAuthenticated();
    }

}
