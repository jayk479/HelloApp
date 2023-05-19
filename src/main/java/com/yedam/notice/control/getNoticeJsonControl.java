package com.yedam.notice.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.common.Control;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;

public class getNoticeJsonControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//id조회해서 json결과반환
		NoticeService service = new NoticeServiceImpl();
		String nid = req.getParameter("nid");
		NoticeVO notice = service.getNoticeVo(Integer.parseInt(nid));
		Gson gson = new GsonBuilder().create();
		
		return gson.toJson(notice) + ".json";
	}

}
