package sc.todo.Todomanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import sc.todo.Todomanagement.entity.UserMenuItem;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserMenuItemDto {
    private List<UserMenuItem> menuItems;
    private List<Long> roleIDs;
}
