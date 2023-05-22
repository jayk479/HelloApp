package com.yedam.notice.service;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.yedam.common.DataSource;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.mapper.NoticeMapper;


public class NoticeServiceImpl implements NoticeService{
	SqlSession session = DataSource.getInstance().openSession(true);
	NoticeMapper mapper = session.getMapper(NoticeMapper.class);
	// NoticeMapper인터페이스 객체 형태로 NoticeMapper.xml??
	
	@Override
	public List<NoticeVO> noticeList(int page) {
		//return mapper.noticeList();
		return mapper.noticeWithPage(page);
	}
	
	@Override
	public List<NoticeVO> noticeListJson() {
		return mapper.noticeList();
	}
	
	@Override
	public boolean addNotice(NoticeVO vo) {
		return mapper.insertNotice(vo) == 1;
	}

	@Override
	public boolean modifiyNotice(NoticeVO vo) {
		return mapper.updateNotice(vo) == 1;
	}

	@Override
	public boolean removeNotice(int noticeId) {
		return mapper.deleteNotice(noticeId) == 1;
	}

	@Override
	public NoticeVO getNoticeVo(int noticeId) {
		//조회수증가를 시키고 한 건 조회ㅇㅇ
		mapper.updateCount(noticeId);
		return mapper.searchNotice(noticeId);
	}

	@Override
	public int totalCount() {
		return mapper.getCount();
	}

	@Override
	public boolean modifiyNoticeFile(NoticeVO vo) {
		// TODO Auto-generated method stub
		return mapper.updateNoticeFile(vo) == 1;
	}

}
