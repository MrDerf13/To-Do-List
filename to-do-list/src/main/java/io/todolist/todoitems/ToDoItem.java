package io.todolist.todoitems;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name ="to_do_list_items")
public class ToDoItem {
	// id, title, details, completed-bool, dateStarted, completeBy/ completeAfter, archive-bool, priority-int
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column
	private String title;
	
	@Column(columnDefinition="longtext")
	private String details;
	
	@Column
	private Boolean completed;
	
	@Column
	private Date createdAt;
	
	@Column
	private Integer daysToComplete;
	
	public Long getId() {
		return id;
	}
	
	public String getTitle() {
		return title;
	}

	public String getDetails() {
		return details;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public Integer getDaysToComplete() {
		return daysToComplete;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public void setCompleted(Boolean completed) {
		this.completed = completed;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public void setDaysToComplete(Integer daysToComplete) {
		this.daysToComplete = daysToComplete;
	}
	
	
}
