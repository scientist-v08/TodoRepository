package sc.todo.Todomanagement.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sc.todo.Todomanagement.dto.AuthDto;
import sc.todo.Todomanagement.dto.LoginResponseDto;
import sc.todo.Todomanagement.dto.MessageDto;
import sc.todo.Todomanagement.service.AuthService;

@RestController
@AllArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping(value = {"/login", "/signin"})
    public ResponseEntity<LoginResponseDto> login(@RequestBody AuthDto loginDto){
        String token = authService.login(loginDto);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setAccessToken(token);

        return ResponseEntity.ok(loginResponseDto);
    }

    @PostMapping(value = {"/register", "/signup"})
    public ResponseEntity<MessageDto> register(@RequestBody AuthDto registerDto){
        String response = authService.register(registerDto);
        MessageDto messageDto = new MessageDto(response);
        return new ResponseEntity<>(messageDto, HttpStatus.CREATED);
    }
}
