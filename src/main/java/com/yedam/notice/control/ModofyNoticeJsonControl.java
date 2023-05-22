package com.yedam.notice.control;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.common.Control;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;

public class ModofyNoticeJsonControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		//id, title, subject 받아와서 값 변경
		NoticeVO vo = new NoticeVO();
		
		String nid = req.getParameter("nid");
		String title = req.getParameter("title");
		String subject = req.getParameter("subject");
		
		vo.setNoticeId(Integer.parseInt(nid));
		vo.setNoticeTitle(title);
		vo.setNoticeSubject(subject);
		
		// id를 기준으로 한 건 변경된 값을 조회
		
		NoticeService service = new NoticeServiceImpl();
		Map<String, Object> map = new HashMap<>();
		Gson gson = new GsonBuilder().create();

		if(service.modifiyNotice(vo)) {
			map.put("retCode", "Success");
			map.put("retVal", service.getNoticeVo(Integer.parseInt(nid)));
		}else {
			map.put("retCode", "Fail");
			map.put("retVal", "알 수 없는 에러발생");
		}
		gson.toJson(map);
		return gson.toJson(map) + ".json";
	}

}
