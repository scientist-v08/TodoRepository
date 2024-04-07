import { CommonModule } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { Subject, takeUntil } from "rxjs";
import { TodoService } from "../../shared/services/todo.service";
import { Todo } from "../../shared/types/todos.interface";

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
  selector:'todo-edit',
  templateUrl:'./edit-todo.component.html'
})
export class EditTodoComponent implements OnInit,OnDestroy{

  editTodoForm!:FormGroup;
  private unsubscribe$ = new Subject<void>();
  private todoService = inject(TodoService);
  private dialogRef = inject(MatDialogRef<EditTodoComponent>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { _id:number },
  ) {}

  ngOnInit(): void {
    this.formInitialization();
    this.setFormValue();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private formInitialization(): void{
    this.editTodoForm = new FormGroup({
      id: new FormControl(0),
      title: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      completed: new FormControl(false)
    });
  }

  private setFormValue(): void{
    this.todoService.getTodoById(this.data._id)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res:Todo)=>{
        this.editTodoForm.setValue({
          id: res.id,
          title: res.title,
          description: res.description,
          completed: res.completed
        })
      })
  }

  editTodo():void{
    const editTodo = {
      id: this.editTodoForm.get('id')?.value,
      title: this.editTodoForm.get('title')?.value,
      description: this.editTodoForm.get('description')?.value,
      completed: this.editTodoForm.get('completed')?.value
    }
    this.todoService.addTodo(editTodo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: ()=>this.dialogRef.close(true),
        error: ()=>this.dialogRef.close(false)
      });
  }

}
