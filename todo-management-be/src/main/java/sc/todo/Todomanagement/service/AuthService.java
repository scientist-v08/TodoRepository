package sc.todo.Todomanagement.service;

import sc.todo.Todomanagement.dto.AuthDto;

public interface AuthService {
    String login(AuthDto loginDto);

    String register(AuthDto registerDto);
}
