package com.yedam.notice.service;

import java.util.List;

import com.yedam.notice.domain.NoticeVO;

public interface NoticeService {
	//CreatReadUpdateDelete
	
	public List<NoticeVO> noticeList(int page);
	
	public boolean addNotice(NoticeVO vo);
	public boolean modifiyNotice(NoticeVO vo);
	public boolean removeNotice(int noticeId);
	public NoticeVO getNoticeVo(int noticeId);
	public int totalCount();
	
	//json
	public List<NoticeVO> noticeListJson();
}
