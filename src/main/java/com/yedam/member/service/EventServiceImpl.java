package com.yedam.member.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.yedam.common.DataSource;
import com.yedam.member.domain.EventVO;
import com.yedam.member.mapper.EventMapper;

public class EventServiceImpl implements EventService{
	SqlSession session = DataSource.getInstance().openSession(true);
	EventMapper mapper = session.getMapper(EventMapper.class);
	
	
	@Override
	public List<EventVO> events() {
		return mapper.eventList();
	}


	@Override
	public boolean addEvent(EventVO event) {
		return mapper.insertEvent(event) == 1;
	}


	@Override
	public boolean removeEvent(String title) {
		return mapper.deleteEvent(title) == 1;
	}


	@Override
	public EventVO getEvent(String title) {
		return mapper.searchEvent(title);
	}


	

}
