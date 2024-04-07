import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment.development";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Todo, TodosInterface } from "../types/todos.interface";
import { ResponseInterface } from "../types/response.interface";

@Injectable({providedIn:'root'})
export class TodoService{

  private URL:string=environment.URL;
  private http = inject(HttpClient);

  public getAllTodos(): Observable<TodosInterface>{
    const Url = this.URL + "todos";
    return this.http.get<TodosInterface>(Url);
  }

  public completeTodo(id:number) :Observable<Todo>{
    const Url = this.URL + "todos/" + id.toString() + "/complete";
    return this.http.patch<Todo>(Url,{});
  }

  public inCompleteTodo(id:number) :Observable<Todo>{
    const Url = this.URL + "todos/" + id.toString() + "/in-complete";
    return this.http.patch<Todo>(Url,{});
  }

  public deletetodo(id:number) :Observable<ResponseInterface>{
    const Url = this.URL + "todos/" + id.toString();
    return this.http.delete<ResponseInterface>(Url);
  }

  public addTodo(data:{title: string, description: string, completed: boolean}) :Observable<Todo>{
    const Url = this.URL + "todos";
    return this.http.post<Todo>(Url,data);
  }

  public getTodoById(id:number): Observable<Todo>{
    const Url = this.URL + "todos/" + id.toString();
    return this.http.get<Todo>(Url);
  }

  public editTodo(data:Todo):Observable<Todo>{
    const Url = this.URL + "todos/" + data.id.toString();
    return this.http.put<Todo>(Url,data);
  }

}
