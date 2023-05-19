package com.yedam.domain;

import java.util.List;

import com.yedam.notice.domain.ReplyVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;
import com.yedam.notice.service.ReplyService;
import com.yedam.notice.service.ReplyServiceImpl;

public class SampleExe3 {
	public static void main(String[] args) {
		//NoticeService service = new NoticeServiceImpl();

		// 여기 다른 기능 구현해보기!!

		// insert
//		NoticeVO nvo = new NoticeVO();
//		nvo.setNoticeTitle("aaaa");
//		nvo.setNoticeWriter("bbb");
//		nvo.setNoticeSubject("ccc");
//		service.addNotice(nvo);
//		System.out.println(nvo);

		// update
//		NoticeVO nvo = new NoticeVO();
//		nvo.setNoticeTitle("네번째 글");
//		nvo.setNoticeSubject("ccc");
//		nvo.setNoticeId(4);

		// delete
//		service.removeNotice(64);

		// list 목록조회
//		for (NoticeVO vo : service.noticeList()) {
//			System.out.println(vo);
//		}
		
		// 단건조회
//		System.out.println(service.getNoticeVo(62));
		//NoticeService service = new NoticeServiceImpl();
//		SqlSessionFactory sqlSessionFactory = com.yedam.common.DataSource.getInstance();
//		try (SqlSession session = sqlSessionFactory.openSession(true)) {//openSession(true) 자동커밋
//			NoticeMapper mapper = session.getMapper(NoticeMapper.class);
//			
//			List<NoticeVO> list = mapper.noticeWithPage(1);
//			for(NoticeVO vo : list) {
//				System.out.println(vo);
//			}
//		}
		ReplyService service = new ReplyServiceImpl();
		List<ReplyVO> list = service.getReplies(98);
		for(ReplyVO vo : list) {
			System.out.println(vo);
		}
		
	}
}
