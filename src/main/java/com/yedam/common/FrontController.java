package com.yedam.common;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.member.control.AddEventControl;
import com.yedam.member.control.EventListControl;
import com.yedam.member.control.LoginControl;
import com.yedam.member.control.LoginFormControl;
import com.yedam.member.control.LogoutContol;
import com.yedam.member.control.ModifyMemberForm;
import com.yedam.member.control.ModifyMemberInfoControl;
import com.yedam.member.control.RemoveEventControl;
import com.yedam.notice.control.AddNoticeControl;
import com.yedam.notice.control.AddReplyControl;
import com.yedam.notice.control.GetNoticeControl;
import com.yedam.notice.control.ModifyNoticeControl;
import com.yedam.notice.control.ModifyNoticeFileControl;
import com.yedam.notice.control.ModifyReplyControl;
import com.yedam.notice.control.NoticeAddForm;
import com.yedam.notice.control.NoticeListControl;
import com.yedam.notice.control.NoticeListJsonControl;
import com.yedam.notice.control.RemoveNoticeControl;
import com.yedam.notice.control.RemoveNoticeJsonControl;
import com.yedam.notice.control.RemoveReplyControl;
import com.yedam.notice.control.ReplyListControl;
import com.yedam.notice.control.getNoticeJsonControl;

public class FrontController extends HttpServlet{
	
	private Map<String, Control> map;
	public FrontController() {
		map = new HashMap<>();
		//꼭 안 해도 상관 없어?
	}
	String encoding;
	
	@Override
	public void init(ServletConfig config) throws ServletException {
		encoding = config.getInitParameter("enc");
		//첫페이지
		map.put("/main.do", new MainControl());
		
		//공지사항
		map.put("/noticeList.do", new NoticeListControl());
		map.put("/noticeListJson.do", new NoticeListJsonControl()); // json데이터가져오는거
		//공지사항등록 등록페이지->등록 후 list재조회
		map.put("/noticeAddForm.do", new NoticeAddForm());
		map.put("/addNotice.do", new AddNoticeControl());
		//1.단건조회
		map.put("/getNotice.do", new GetNoticeControl());
		map.put("/getNoticeJson.do", new getNoticeJsonControl());
		//2.수정
		map.put("/modifyNotice.do", new ModifyNoticeControl());
		map.put("modifyNoticeFile.do", new ModifyNoticeFileControl());
		//3.삭제
		map.put("/removeNotice.do", new RemoveNoticeControl());
		map.put("/removeNoticeJson.do", new RemoveNoticeJsonControl());
		
		//회원관련
		map.put("/loginForm.do", new LoginFormControl());
		map.put("/login.do", new LoginControl());
		map.put("/logout.do", new LogoutContol());
		map.put("/modifyMemberForm.do", new ModifyMemberForm());
		map.put("/modifyMemberInfo.do", new ModifyMemberInfoControl());
		
		
		//공지사항 댓글관련
		map.put("/replyList.do", new ReplyListControl());
		map.put("/addReply.do", new AddReplyControl());
		map.put("/removeReply.do", new RemoveReplyControl());
		map.put("/modifyReply.do", new ModifyReplyControl());
		
		
		//차트생성
		map.put("/chart.do", new ChartFormControl());
		map.put("/chartData.do", new ChartDataControl());
		
		//fullcalendar
		map.put("/fullCalendar.do", new FullCalendarControl());
		//목록,  json형태의 data
		map.put("/eventList.do", new EventListControl());
		//등록
		map.put("/addEvent.do", new AddEventControl());
		//삭제
		map.put("/removeEvent.do", new RemoveEventControl());
	}
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setCharacterEncoding(encoding);
		
		String uri = req.getRequestURI();
		String context = req.getContextPath();
		String path = uri.substring(context.length());
		System.out.println(path);
		
		Control control = map.get(path);
		String viewPage = control.execute(req, resp);
		System.out.println(viewPage);
		//control이 반환하는 값 viewPage에서 요청
		if(viewPage.endsWith(".do")){
			resp.sendRedirect(viewPage);
			return; //method종료
		}
		
		if(viewPage.endsWith(".json")) {
			resp.setContentType("text/json;charset=UTF-8");
			resp.getWriter().print(viewPage.substring(0, viewPage.length()-5));
			return;
		}
		 
		//페이지재지정
		RequestDispatcher rd = req.getRequestDispatcher(viewPage);
		rd.forward(req, resp);
		
		
	}
	
}
