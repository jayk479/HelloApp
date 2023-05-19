package com.yedam.notice.control;

import java.io.IOException;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.notice.domain.ReplyVO;
import com.yedam.notice.service.ReplyService;
import com.yedam.notice.service.ReplyServiceImpl;

public class ReplyListControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// json 데이터 생성, 반환ㅇㅇ
		// [{"replyId" : 5, "noticeId":98, "reply":"98번에대한댓글",...},{},...]
		// 이 모양으로 만들거임ㅇㅇ 근데 만들기만 할 거임 근데 정상적으로 잘 되어야 parse할 때 오류 안 남ㅇㅇ
		String nid = req.getParameter("nid");
		ReplyService service = new ReplyServiceImpl();
		
		String json = "[";
		List<ReplyVO> list = service.getReplies(Integer.parseInt(nid));
		for(int i = 0; i < list.size(); i++) {
			json += "{\"replyId\":" + list.get(i).getReplyId() + ",";
			json +="\"noticeId\":"+list.get(i).getNoticeId()+",";
			json +="\"reply\":\""+list.get(i).getReply()+"\",";
			json +="\"replyWriter\":\""+list.get(i).getReplyWriter()+"\",";
			json +="\"replyDate\":\""+list.get(i).getReplyDate()+"\"}";
			
			if(i+1 != list.size()){
				json += ",";
			}
		}
		json += "]";
		return json + ".json";
	}

}
