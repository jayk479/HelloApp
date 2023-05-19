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
import com.yedam.notice.domain.ReplyVO;
import com.yedam.notice.service.ReplyService;
import com.yedam.notice.service.ReplyServiceImpl;

public class AddReplyControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 이걸 Ajax가 함
		// 댓글 등록 컨트롤 ing
		String id = req.getParameter("id");
		String reply = req.getParameter("reply");
		String noticeId = req.getParameter("noticeId");
		
		ReplyVO vo = new ReplyVO();
		vo.setReplyWriter(id);
		vo.setReply(reply);
		vo.setNoticeId(Integer.parseInt(noticeId));
		
		ReplyService service = new ReplyServiceImpl();
		boolean result = service.addReply(vo);
		
		String json = "";
		
		Map<String, Object> map = new HashMap<>();
		
		if(result) {
			//{"retCode":"Success"}
			json = "{\"retCode\":\"Success\"}";
			// {"retCode":"Success", "data":vo} //map타입 key:value
			map.put("retCode", "Success");
			map.put("data", vo);
		}else {
			//{"retCode":"Fail"}
			//json = "{\"retCode\":\"Fail\"}";
			map.put("retCode", "Fail");
			
		}
		
		Gson gson = new GsonBuilder().create();
		json = gson.toJson(map);
		return json + ".json";
	}

}
