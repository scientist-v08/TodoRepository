package sc.todo.Todomanagement.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import sc.todo.Todomanagement.dto.AuthDto;
import sc.todo.Todomanagement.entity.Role;
import sc.todo.Todomanagement.entity.User;
import sc.todo.Todomanagement.exception.TodoAPIException;
import sc.todo.Todomanagement.repository.RoleRepository;
import sc.todo.Todomanagement.repository.UserRepository;
import sc.todo.Todomanagement.security.JwtTokenProvider;
import sc.todo.Todomanagement.service.AuthService;

import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public String login(AuthDto loginDto) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getUsernameOrEmail(), loginDto.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }

    @Override
    public String register(AuthDto registerDto) {

        // add check for email exists in database
        if(userRepository.existsByEmail(registerDto.getUsernameOrEmail())){
            throw new TodoAPIException(HttpStatus.BAD_REQUEST, "Email already exists!.");
        }

        User user = new User();
        user.setEmail(registerDto.getUsernameOrEmail());
        user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

        Set<Role> roles = new HashSet<>();
        Role userRole = roleRepository.findByName("ROLE_USER").get();
        roles.add(userRole);
        user.setRoles(roles);

        userRepository.save(user);

        return "User registered successfully!.";
    }
}
