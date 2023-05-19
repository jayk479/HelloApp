package com.yedam.notice.control;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.yedam.common.Control;
import com.yedam.notice.domain.NoticeVO;
import com.yedam.notice.service.NoticeService;
import com.yedam.notice.service.NoticeServiceImpl;

public class GetNoticeControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// param : nid
		
		String nid = req.getParameter("nid");
		String page = req.getParameter("page");
		NoticeService service = new NoticeServiceImpl();
		NoticeVO vo = service.getNoticeVo(Integer.parseInt(nid));
		req.setAttribute("noticeInfo", vo);
		req.setAttribute("pageNum", page);
		
		if(vo.getAttachFile() != null) {
			String imgPath = req.getServletContext().getRealPath("images");
			Path file = Paths.get(imgPath + "/" + vo.getAttachFile());
			System.out.println(imgPath);
			System.out.println(file);
			System.out.println(Files.probeContentType(file));
			// impge/jpg, image/png, text/plain
			String fileType = Files.probeContentType(file);
			req.setAttribute("fileType", fileType.substring(0, fileType.indexOf("/")));
					
		}
		
		return "notice/noticeGet.tiles";
	}

}
