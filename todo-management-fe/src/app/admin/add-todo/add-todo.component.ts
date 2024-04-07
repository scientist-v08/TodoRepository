import { CommonModule } from "@angular/common";
import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef
} from '@angular/material/dialog';
import { Subject, takeUntil } from "rxjs";
import { TodoService } from "../../shared/services/todo.service";

@Component({
  standalone:true,
  imports:[
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    CommonModule
  ],
  selector:'todo-add',
  templateUrl:'./add-todo.component.html'
})
export class AddTodoComponent implements OnInit,OnDestroy{

  addTodoForm!:FormGroup;
  private unsubscribe$ = new Subject<void>();
  private todoService = inject(TodoService);
  private dialogRef = inject(MatDialogRef<AddTodoComponent>);

  ngOnInit(): void {
    this.formInitialization();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInitialization(): void{
    this.addTodoForm = new FormGroup({
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      completed: new FormControl(false)
    });
  }

  addTodo():void{
    const addTodo = {
      title: this.addTodoForm.get('title')?.value,
      description: this.addTodoForm.get('description')?.value,
      completed: this.addTodoForm.get('completed')?.value
    }
    this.todoService.addTodo(addTodo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ()=>this.dialogRef.close(true),
        error: ()=>this.dialogRef.close(false)
      });
  }

}
