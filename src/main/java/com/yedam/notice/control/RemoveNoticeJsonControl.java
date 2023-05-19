package com.yedam.notice.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;

public class RemoveNoticeJsonControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		NoticeService service = new NoticeServiceImpl();
		String nid = req.getParameter("nid");
		//System.out.println(nid);
		
		String json = "Fail";
		if(service.removeNotice(Integer.parseInt(nid))) {
			json = "Success";
		}
		return json + ".json";
	}
}
