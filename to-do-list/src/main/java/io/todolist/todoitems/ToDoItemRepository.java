package io.todolist.todoitems;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoItemRepository extends JpaRepository<ToDoItem, Long> {

}
