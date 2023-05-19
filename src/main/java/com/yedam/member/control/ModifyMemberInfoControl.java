package com.yedam.member.control;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.yedam.common.Control;
import com.yedam.member.domain.MemberVO;
import com.yedam.member.service.MemberService;
import com.yedam.member.service.MemberServiceImpl;

public class ModifyMemberInfoControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	
		HttpSession session = req.getSession();
		MemberService service = new MemberServiceImpl();
//		
//		String id = (String) session.getAttribute("email");
////		String pw = (String) session.getAttribute("password");
////		String phone = (String) session.getAttribute("phone");
////		String address = (String) session.getAttribute("address");
//		String updatePw = req.getParameter("pass");
//		String updatePhone = req.getParameter("phone");
//		String updateAddress = req.getParameter("address");
//		
//		
//		MemberVO vo = new MemberVO();
//		vo.setEmail(id);
//		vo.setPassword(updatePw);
//		vo.setPhone(updatePhone);
//		vo.setAddress(updateAddress);
//		
//		boolean result = service.modifyMember(vo);
//		
//			if(result) {
//				MemberVO updateMember = service.checkLogin(vo);
//				session.setAttribute("memberInfo", updateMember);
//				return "noticeList.do";
//			}else {
//				
//				return "modifyMemberInfo.do";
//			}
		
		
		if(req.getMethod().equals("GET")){
			String id = (String) session.getAttribute("email");
			String pw = (String) session.getAttribute("password");
			String phone = (String) session.getAttribute("phone");
			String address = (String) session.getAttribute("address");
			
			MemberVO vo = new MemberVO();
			vo.setEmail(id);
			vo.setPassword(pw);
			vo.setPhone(phone);
			vo.setAddress(address);
			vo = service.checkLogin(vo);
			//req.setAttribute("memberInfo", vo);
			
			return "member/modifyMemberInfoForm.tiles";
		}else if(req.getMethod().equals("POST")) {
			MemberVO vo = new MemberVO();
			
			String id = req.getParameter("id");
			
			String pw = req.getParameter("pass");
			String phone = req.getParameter("phone");
			String address = req.getParameter("address");
			
			vo.setEmail(id);
			vo.setPassword(pw);
			vo.setPhone(phone);
			vo.setAddress(address);
			
			boolean result = service.modifyMember(vo);
				if(result) {
					MemberVO updateMember = service.checkLogin(vo);
					session.setAttribute("memberInfo", updateMember);
				}else {
					return "member/modifyMemberInfoForm.tiles";
				}
			
			
		}
		
		return "noticeList.do";

	}

}
