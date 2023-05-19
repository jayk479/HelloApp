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


public class LoginControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// MemberService / MemberServiceImpl / MemberMapper.java(xml)
		// service : MemberVO loginCheck(MemberVO vo)
		// mapper : MemberVO loginCheck(MemberVO vo)
		String email = req.getParameter("email");
		String password = req.getParameter("pass");
		
		MemberVO vo = new MemberVO();
		vo.setEmail(email);
		vo.setPassword(password);
		
		MemberService service = new MemberServiceImpl();
		vo = service.checkLogin(vo);

		if(vo != null) {
			HttpSession session = req.getSession();
			session.setAttribute("memberInfo", vo);
			session.setAttribute("id", vo.getEmail());
			session.setAttribute("name", vo.getName());
			
			return "noticeList.do";			
		}
		return "loginForm.do";
	}
}
