import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Todo, TodosInterface } from "../shared/types/todos.interface";
import { Subject, takeUntil } from "rxjs";
import { TodoService } from "../shared/services/todo.service";
import { MatCardModule } from '@angular/material/card';
import { AddTodoComponent } from "./add-todo/add-todo.component";
import { MatDialog } from "@angular/material/dialog";
import { EditTodoComponent } from "./edit-todo/edit-todo.component";
import { CommonModule } from "@angular/common";

@Component({
  standalone: true,
  imports: [MatCardModule,CommonModule],
  selector:'todo-admin',
  templateUrl:"./admin.component.html",
  styles:`
  .btn-custom {
    background-color: #FFB6C1;
  }
  `
})
export default class AdminComponent implements OnInit,OnDestroy{

  todoItems:Todo[]=[];
  private unsubscribe$ = new Subject<void>();
  private todoService = inject(TodoService);
  private dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAllTodos();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getAllTodos(): void{
    this.todoService.getAllTodos()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (res:TodosInterface)=>this.todoItems=res.allTodo,
        error: ()=>console.log("Error")
      })
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

  deleteTodo(id:number):void{
    this.todoService.deletetodo(id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(()=>this.getAllTodos());
  }

  addTodo(): void {
    const dialogRef = this.dialog.open(AddTodoComponent);
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res=>{
        if(res===true) this.getAllTodos()
      });
  }

  editTodo(id:number):void{
    const dialogRef = this.dialog.open(EditTodoComponent,{data:{_id:id}});
    dialogRef.afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res=>{
        if(res===true) this.getAllTodos()
      });
  }

}
