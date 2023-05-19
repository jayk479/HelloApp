package com.yedam.notice.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.yedam.notice.domain.ReplyVO;

public interface ReplyMapper {
	public List<ReplyVO> replyList(int noticeId);
	//댓글등록
	public int insertReply(ReplyVO vo);
	public int deleteReply(int replyId);
	//public int updateReply(@Param("replyId") int replyId, @Param("reply") String reply);
	public int updateReply(ReplyVO vo);
	//한 건 조회 
	public ReplyVO searchReply(int replyId);
}
