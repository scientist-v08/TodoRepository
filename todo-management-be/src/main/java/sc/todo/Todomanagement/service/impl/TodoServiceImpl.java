package sc.todo.Todomanagement.service.impl;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import sc.todo.Todomanagement.dto.TodoDto;
import sc.todo.Todomanagement.entity.Todo;
import sc.todo.Todomanagement.exception.ResourceNotFoundException;
import sc.todo.Todomanagement.mapper.TodoMapper;
import sc.todo.Todomanagement.repository.TodoRepository;
import sc.todo.Todomanagement.service.TodoService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private final TodoRepository todoRepository;

    @Override
    public TodoDto addTodo(TodoDto todoDto) {

        Todo todo = TodoMapper.mapToTodo(todoDto);

        Todo savedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(savedTodo);
    }

    @Override
    public TodoDto getTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id:" + id));

        return TodoMapper.mapToTodoDto(todo);
    }

    @Override
    public List<TodoDto> getAllTodos() {

        List<Todo> todos = todoRepository.findAll();

        return todos.stream().map(TodoMapper::mapToTodoDto)
                .collect(Collectors.toList());
    }

    @Override
    public TodoDto updateTodo(TodoDto todoDto, Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        Todo updatedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public void deleteTodo(Long id) {

        todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todo.setCompleted(Boolean.TRUE);

        Todo updatedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(updatedTodo);
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo not found with id : " + id));

        todo.setCompleted(Boolean.FALSE);

        Todo updatedTodo = todoRepository.save(todo);

        return TodoMapper.mapToTodoDto(updatedTodo);
    }
}
