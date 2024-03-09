package io.todolist.todoitems;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateToDoItemDTO {
	@NotBlank
	private String title;
	
	@NotBlank
	private String details;
	
	@NotNull
	private Boolean completed;
	
	@Min(value = 0)
	private Integer daysToComplete;

	public String getTitle() {
		return title;
	}

	public String getDetails() {
		return details;
	}

	public Boolean getCompleted() {
		return completed;
	}

	public Integer getDaysToComplete() {
		return daysToComplete;
	}	
}
