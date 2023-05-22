package com.yedam.notice.control;

import java.io.IOException;
import java.util.Enumeration;

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

public class ModifyNoticeFileControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// 멀티파트요청 : 요청정보, 저장경로, 최대파일사이즈, 인코딩, 리네임정책인스턴스,
		String saveDir = req.getServletContext().getRealPath("images"); // 서버상실행되는위치에서images찾아옴ㅇㅇ
		int maxSize = 5 * 1024 * 1024; // 5mb
		String encoding = "UTF-8";
		DefaultFileRenamePolicy rn = new DefaultFileRenamePolicy();
		MultipartRequest multi = new MultipartRequest(req, saveDir, maxSize, encoding, rn);

		String nid = multi.getParameter("nid");
		String attach = "";
		Enumeration<?> enu = multi.getFileNames();
		while (enu.hasMoreElements()) {
			String file = (String) enu.nextElement();
			System.out.println("file: " + file);
			attach = multi.getFilesystemName(file);
		}		
		NoticeVO vo = new NoticeVO();
		vo.setNoticeId(Integer.parseInt(nid));
		vo.setAttachFile(attach);
		
		//공지사항 글번호와 해당되는 이미지를 변경
		String json = "";
		Gson gson = new GsonBuilder().create();
		
		NoticeService service = new NoticeServiceImpl();
		if(service.modifiyNoticeFile(vo)) {
			json = gson.toJson(vo);
		}
		//System.out.println(nid);
		
		return json + ".json";
	}

}
