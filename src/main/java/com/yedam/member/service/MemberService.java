package com.yedam.member.service;

import java.util.Map;

import com.yedam.member.domain.MemberVO;

public interface MemberService {
	public MemberVO checkLogin(MemberVO vo);
	public boolean modifyMember(MemberVO vo);
	
	//차트
	public Map<String, Object> memberByDept();
	
}
