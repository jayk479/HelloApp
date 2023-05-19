package com.yedam.notice.control;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.oreilly.servlet.MultipartRequest;
import com.oreilly.servlet.multipart.DefaultFileRenamePolicy;
import com.yedam.common.Control;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;

public class AddNoticeControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 파일업로드, db입력처리, 목록이동
		String job = req.getParameter("job");
		job = job == null ? "multi" : "ajax";

		if (job.equals("ajax")) {
			String title = req.getParameter("title");
			String subject = req.getParameter("subject");
			String writer = req.getParameter("writer");
			String attach = req.getParameter("attach");
			// input:file타입일 경우 그냥 getParameter로 받으면 db에 null로 담김

			// 사용자의 입력값을 NoticeVO 에 입력
			NoticeVO vo = new NoticeVO();
			vo.setAttachFile(attach);
			vo.setNoticeSubject(subject);
			vo.setNoticeTitle(title);
			vo.setNoticeWriter(writer);

			NoticeService service = new NoticeServiceImpl();
			// 정상처리 -> 목록, 아니면 메인으로 이동
			// map => {retCode:Success, retVal:vo}
			// map => {retCode:Fail, retVal:null}
			Map<String, Object> map = new HashMap();
			Gson gson = new GsonBuilder().create();
			if (service.addNotice(vo)) {
				map.put("retCode", "Succes");
				map.put("retVal", vo);
				// return "Success.json";
			} else {
				map.put("retCode", "Fail");
				map.put("retVal", "알 수 없는 에러발생");
				// return "Fail.json";
			}
			gson.toJson(map);
			// java의 객체가 json문자열로 변경되도록 함
			return gson.toJson(map) + ".json"; //객체 => json문자열로
		} else{

			// 멀티파트요청 : 요청정보, 저장경로, 최대파일사이즈, 인코딩, 리네임정책인스턴스,
			String saveDir = req.getServletContext().getRealPath("images"); // 서버상실행되는위치에서images찾아옴ㅇㅇ
			int maxSize = 5 * 1024 * 1024; // 5mb
			String encoding = "UTF-8";
			DefaultFileRenamePolicy rn = new DefaultFileRenamePolicy();
			MultipartRequest multi = new MultipartRequest(req, saveDir, maxSize, encoding, rn);
			
			//job = multi.getParameter("job");
			String writer = multi.getParameter("writer");
			String subject = multi.getParameter("subject");
			String title = multi.getParameter("title");
			String attach = multi.getFilesystemName("attach");

			// 사용자의 입력값을 NoticeVO 에 입력
			NoticeVO vo = new NoticeVO();
			vo.setAttachFile(attach);
			vo.setNoticeSubject(subject);
			vo.setNoticeTitle(title);
			vo.setNoticeWriter(writer);

			NoticeService service = new NoticeServiceImpl();
			// 정상처리 -> 목록, 아니면 메인으로 이동
//			if (service.addNotice(vo)) {
//				return "noticeList.do";
//				
//				
//			} else {
//				return "main.do";
//			}
			
			Map<String, Object> map = new HashMap<>();
			Gson gson = new GsonBuilder().create();
			if (service.addNotice(vo)) {
				map.put("retCode", "Success");
				map.put("retVal", vo);
				// return "Success.json";
			} else {
				map.put("retCode", "Fail");
				map.put("retVal", "알 수 없는 에러발생");
				// return "Fail.json";
			}
			gson.toJson(map);
			// java의 객체가 json문자열로 변경되도록 함
			return gson.toJson(map) + ".json"; //객체 => json문자열로
		} // end of job()

	} // end of method()

}// end of class
