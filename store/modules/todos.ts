import { Body } from "nuxt/dist/head/runtime/components";
import { defineStore } from "pinia";
import { TodoItem } from "~~/types/index";
const selectedIndex = ref("");


export const useTodoStore = defineStore("todos", {
  state: () => ({ todos: [] as TodoItem[] }),

  actions: {
    async fetchTodos() {
      const response = await $fetch<TodoItem[]>(
        "https://jsonplaceholder.typicode.com/todos"
      );

      this.todos = response;
    },

    async addTodo(title: string, completed: boolean) {
      console.log("fetching");
    

      const res = await $fetch<TodoItem>(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "POST",
          body: {
            title: title,
            completed: completed,
          },
        }
      );
    

      this.todos.unshift(res);
     
    },

    async deleteTodo(id: number) {
      

      const response = await $fetch<TodoItem>(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        { method: "DELETE" }
      );

      this.todos = this.todos.filter((todo) => todo.id !== id);
    },

    async filterTodos(e) {
      const limit = parseInt(e.target.value);
      const response = await $fetch(
        `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
      );
      this.todos = response;
    },

    async updateTodo(updTodo) {
      const response = await $fetch<TodoItem>(
        `https://jsonplaceholder.typicode.com/todos/${updTodo.id}`,
        {
          method: "PUT",
          body: {
            title: updTodo.title,
            completed: updTodo.completed,
          },
        }
      );

      var index = this.todos.findIndex((todo) => todo.id === updTodo.id);
      if (index !== -1) {
        this.todos.splice(index, 1, updTodo);
      }
    },
  },
});
