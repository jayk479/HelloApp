package com.yedam.member.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class MemberVO {

	private String email;
	private String password;
	private String name;
	private String phone;
	private String address;
	private String auth;
	private Date createDate;
}
