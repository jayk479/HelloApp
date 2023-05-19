package com.yedam.member.service;

import java.util.List;

import com.yedam.member.domain.EventVO;

public interface EventService {
	public List<EventVO> events();
	public boolean addEvent(EventVO event);
	public boolean removeEvent(String title);
	public EventVO getEvent(String title);
}
