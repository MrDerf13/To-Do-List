package io.todolist.todoitems;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class ToDoItemService {

	@Autowired
	private ToDoItemRepository repository;
	
	@Autowired
	private ModelMapper mapper;
	
	public ToDoItem createItem(@Valid CreateToDoItemDTO data) {
		ToDoItem newItem = mapper.map(data, ToDoItem.class);
		newItem.setCreatedAt(new Date());
		return this.repository.save(newItem);
	}

	public List<ToDoItem> getAll() {
		return this.repository.findAll();
	}

	public Optional<ToDoItem> findById(Long id) {
		return this.repository.findById(id);
	}

	public boolean deletePostById(Long id) {
		Optional<ToDoItem> maybeItem = this.repository.findById(id);
		if(maybeItem.isEmpty()) {
			return false;
		}
		this.repository.delete(maybeItem.get());
		return true;
	}

	public Optional<ToDoItem> updateById(@Valid UpdateToDoItemDTO data, Long id) {
		Optional<ToDoItem> maybeItem = this.findById(id);
		if (maybeItem.isEmpty()) {
			return maybeItem;
		}
		ToDoItem foundItem = maybeItem.get();
		mapper.map(data, foundItem);
		ToDoItem updated = this.repository.save(foundItem);
		return Optional.of(updated);
	}

	
}
