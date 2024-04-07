package sc.todo.Todomanagement.mapper;

import sc.todo.Todomanagement.dto.TodoDto;
import sc.todo.Todomanagement.entity.Todo;

public class TodoMapper {
    public static TodoDto mapToTodoDto(Todo todo){
        TodoDto todoDto = new TodoDto();
        todoDto.setId(todo.getId());
        todoDto.setCompleted(todo.isCompleted());
        todoDto.setTitle(todo.getTitle());
        todoDto.setDescription(todo.getDescription());
        return todoDto;
    }
    public static Todo mapToTodo(TodoDto todoDto){
        Todo todo = new Todo();
        todo.setId(todoDto.getId());
        todo.setCompleted(todoDto.isCompleted());
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        return todo;
    }
}
