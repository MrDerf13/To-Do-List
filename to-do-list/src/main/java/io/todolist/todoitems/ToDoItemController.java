package io.todolist.todoitems;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.todolist.exceptions.NotFoundException;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/items")
public class ToDoItemController {
	
	@Autowired
	private ToDoItemService toDoItemService;
	
	@PostMapping
	public ResponseEntity<ToDoItem> createItem(@Valid @RequestBody CreateToDoItemDTO data) {
		ToDoItem createdItem = this.toDoItemService.createItem(data);
		return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
		 
	}
	
	@GetMapping
	public ResponseEntity<List<ToDoItem>> getAllItems() {
		List<ToDoItem> allItems = this.toDoItemService.getAll();
		return new ResponseEntity<>(allItems, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ToDoItem> getPostById(@PathVariable Long id) throws NotFoundException{
		Optional<ToDoItem> maybeItem = this.toDoItemService.findById(id);
		ToDoItem foundCard = maybeItem.orElseThrow(()-> new NotFoundException(ToDoItem.class, id));
		return new ResponseEntity<>(foundCard, HttpStatus.OK);
	}
	
	@PatchMapping("/{id}")
	public ResponseEntity<ToDoItem> updateToDoItemById(@Valid @RequestBody UpdateToDoItemDTO data, @PathVariable Long id) throws NotFoundException{
		Optional<ToDoItem> maybeUpdatedCard = this.toDoItemService.updateById(data, id);
		ToDoItem updatedCard = maybeUpdatedCard.orElseThrow(()-> new NotFoundException(ToDoItem.class, id));
		return new ResponseEntity<>(updatedCard, HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<ToDoItem> deleteCardById(@PathVariable Long id) throws NotFoundException{
		boolean deleted = this.toDoItemService.deletePostById(id);
		if(!deleted) {
			throw new NotFoundException(ToDoItem.class, id);
		}
		return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
	}
	
	
}
