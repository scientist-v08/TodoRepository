package sc.todo.Todomanagement.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import sc.todo.Todomanagement.Util.LoginUtil;
//import sc.todo.Todomanagement.entity.Role;
//import sc.todo.Todomanagement.entity.User;
import sc.todo.Todomanagement.dto.UserMenuItemDto;
import sc.todo.Todomanagement.entity.UserMenuItem;
//import sc.todo.Todomanagement.repository.RoleRepository;
import sc.todo.Todomanagement.repository.UserMenuItemRepository;
//import sc.todo.Todomanagement.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
//import java.util.Optional;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserItemsController {

    private final UserMenuItemRepository userMenuItemRepository;
//    Use this only if you uncomment the below commented method
//    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;
    private final LoginUtil loginUtil;

    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/user/items")
    public UserMenuItemDto getUserMenuItems(){
        List<Long> roles = loginUtil.getLoggedInRoleIds();
        List<UserMenuItem> res = new ArrayList<>();
        for (Long role:roles ) {
            res.addAll(userMenuItemRepository.findByRoleId(role));
        }
        if (res.isEmpty()) return null;
        UserMenuItemDto userMenuItemDto = new UserMenuItemDto();
        userMenuItemDto.setMenuItems(res);
        userMenuItemDto.setRoleIDs(roles);
        return userMenuItemDto;
    }

//    Use the below method only when you want to add a role to a given user. For the scope of this project it is unnecessary
//    @PostMapping
//    public String addUserRoleByEmail(@RequestParam String email, @RequestParam String roleName) {
//        Optional<User> optionalUser = userRepository.findByEmail(email);
//        if (optionalUser.isPresent()) {
//            User user = optionalUser.get();
//            Optional<Role> role = roleRepository.findByName(roleName);
//            if (role.isPresent()) {
//                Role obtainedRole = role.get();
//                user.getRoles().add(obtainedRole);
//                userRepository.save(user);
//            }
//        }
//        return "Role added successfully";
//    }

}
