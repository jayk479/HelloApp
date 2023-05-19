package com.yedam.common;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MainControl implements Control {
	
	@Override
	public String execute(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		req.setAttribute("myName", "HongGildong");
		//setAttribute로 넣은 값을 표현식으로 읽을 수 있음.
		//cuz frontControl에서 viewPage에서 forward하도록 설정했고
		//main.jsp에서 표현식으로 접근? 했음ㅇㅇ
		return "product/productList.tiles";
	}

}