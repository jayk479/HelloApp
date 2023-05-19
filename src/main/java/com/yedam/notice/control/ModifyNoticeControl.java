package com.yedam.notice.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;


public class ModifyNoticeControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
		NoticeService service = new NoticeServiceImpl();
		if (req.getMethod().equals("GET")) {
			String nid = req.getParameter("nid");
			NoticeVO vo = service.getNoticeVo(Integer.parseInt(nid));
			req.setAttribute("noticeInfo", vo);
			
			return "notice/noticeModify.tiles";
			
		} else if (req.getMethod().equals("POST")) {
			
			
			
			NoticeVO vo = new NoticeVO();
			String nid = req.getParameter("nid");

			String title = req.getParameter("title");
			String subject = req.getParameter("subject");
			vo.setNoticeId(Integer.parseInt(nid));
			vo.setNoticeTitle(title);
			vo.setNoticeSubject(subject);
			
			service.modifiyNotice(vo);
			 
			String page = req.getParameter("page");
			String url = "noticeList?page="+page;
			
			return "noticeList.do";
			
		}
		return null;
	}
}


