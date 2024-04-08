import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Todo, TodosInterface } from "../shared/types/todos.interface";
import { Observable, Subject, takeUntil } from "rxjs";
import { TodoService } from "../shared/services/todo.service";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";

@Component({
  standalone:true,
  imports:[MatCardModule,CommonModule],
  selector:'todo-user',
  templateUrl:'./user.component.html'
})
export default class UserComponent implements OnInit,OnDestroy{

  todoItems$ = new Observable<TodosInterface>;
  private unsubscribe$ = new Subject<void>();
  private todoService = inject(TodoService);

  ngOnInit(): void {
    this.getAllTodos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllTodos(): void{
    this.todoItems$ = this.todoService.getAllTodos();
  }

  completeOrInComplete(data:Todo):void{
    if(data.completed===false){
      this.todoService.completeTodo(data.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: ()=>this.getAllTodos()
        });
    }
    else if(data.completed===true){
      this.todoService.inCompleteTodo(data.id)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe({
          next: ()=>this.getAllTodos()
        });
    }
  }

}
