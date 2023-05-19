package com.yedam.member.mapper;

import java.util.List;

import com.yedam.member.domain.EventVO;

public interface EventMapper {
	// 이벤트목록
	public List<EventVO> eventList();
	// 이벤트등록
	public int insertEvent(EventVO event);
	// 이벤트삭제
	public int deleteEvent(String title);
	
	public EventVO searchEvent(String title);
	
}
