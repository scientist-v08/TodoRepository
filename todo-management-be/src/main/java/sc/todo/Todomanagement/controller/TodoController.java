package sc.todo.Todomanagement.controller;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import sc.todo.Todomanagement.dto.GetAllTodoDto;
import sc.todo.Todomanagement.dto.MessageDto;
import sc.todo.Todomanagement.dto.TodoDto;
import sc.todo.Todomanagement.service.TodoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/todos")
@AllArgsConstructor
public class TodoController {

    private final TodoService todoService;

    // Build Add Todo REST API
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping
    public ResponseEntity<TodoDto> addTodo(@RequestBody TodoDto todoDto){

        TodoDto savedTodo = todoService.addTodo(todoDto);

        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }

    // Build Get Todo REST API
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping("/{id}")
    public ResponseEntity<TodoDto> getTodo(@PathVariable("id") Long todoId){
        TodoDto todoDto = todoService.getTodo(todoId);
        return new ResponseEntity<>(todoDto, HttpStatus.OK);
    }

    // Build Get All Todos REST API
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @GetMapping
    public ResponseEntity<GetAllTodoDto> getAllTodos(){
        List<TodoDto> todos = todoService.getAllTodos();
        GetAllTodoDto getAllTodoDto = new GetAllTodoDto();
        getAllTodoDto.setAllTodo(todos);
        return ResponseEntity.ok(getAllTodoDto);
    }

    // Build Update Todo REST API
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<TodoDto> updateTodo(@RequestBody TodoDto todoDto, @PathVariable("id") Long todoId){
        TodoDto updatedTodo = todoService.updateTodo(todoDto, todoId);
        return ResponseEntity.ok(updatedTodo);
    }

    // Build Delete Todo REST API
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<MessageDto> deleteTodo(@PathVariable("id") Long todoId){
        todoService.deleteTodo(todoId);
        MessageDto deleteDto = new MessageDto("Todo deleted successfully!.");
        return ResponseEntity.ok(deleteDto);
    }

    // Build Complete Todo REST API
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PatchMapping("/{id}/complete")
    public ResponseEntity<TodoDto> completeTodo(@PathVariable("id") Long todoId){
        TodoDto updatedTodo = todoService.completeTodo(todoId);
        return ResponseEntity.ok(updatedTodo);
    }

    // Build In Complete Todo REST API
    @PreAuthorize("hasAnyRole('ROLE_ADMIN', 'ROLE_USER')")
    @PatchMapping("/{id}/in-complete")
    public ResponseEntity<TodoDto> inCompleteTodo(@PathVariable("id") Long todoId){
        TodoDto updatedTodo = todoService.inCompleteTodo(todoId);
        return ResponseEntity.ok(updatedTodo);
    }

}
