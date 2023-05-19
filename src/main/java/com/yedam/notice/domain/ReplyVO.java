package com.yedam.notice.domain;

import java.sql.Date;

import lombok.Data;

@Data
public class ReplyVO {
	
	private int replyId;
	private int noticeId;
	private String reply;
	private String replyWriter;
	private Date replyDate;

}
  