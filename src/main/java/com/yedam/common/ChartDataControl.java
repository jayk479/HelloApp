package com.yedam.common;

import java.io.IOException;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.yedam.member.service.MemberService;
import com.yedam.member.service.MemberServiceImpl;

public class ChartDataControl implements Control {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		MemberService service = new MemberServiceImpl();
		Map<String, Object> map = service.memberByDept();
		// 꼭 이런 타입 아니어도 됨. chartVO해도 할 수 있음
		
		Gson gson = new GsonBuilder().create();
		String json = gson.toJson(map);
		
		
		return json + ".json";
	}

}
