package com.yedam.domain;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import com.yedam.member.mapper.MemberMapper;

//import com.yedam.common.NoticeMapper;
//import com.yedam.domain.Employee;
//import com.yedam.notice.domain.NoticeVO;

public class SampleExe2 {
	public static void main(String[] args) {
		SqlSessionFactory sqlSessionFactory = com.yedam.common.DataSource.getInstance();

		try (SqlSession session = sqlSessionFactory.openSession(true)) {
			  MemberMapper mapper = session.getMapper(MemberMapper.class);

			  List<Map<String, Object>> list = mapper.memberByDept();
			  // [{Adminstration, 1}, {Accounting, 2}, ...{}]
//			  for(Map<String, Integer> map : list) {
//				  Set<String> set = map.keySet();
//				  System.out.println(map.get("DEPARTMENT_NAME") + ", " + map.get("CNT"));
//			  	}
			  for(Map<String, Object> map : list) {
				  Set<String> set = map.keySet(); // keySet() : key값만 set collection에 넣음ㅇㅇ 
				  //for(String key : set) {
					  //System.out.println(key + " : " + map.get(key)); 
					  System.out.println(map.get("DEPARTMENT_NAME") + ", " + map.get("CNT"));
					  
					  
				  //}
			  }
			  
//			  Employee emp1 = new Employee();
//			  emp1.setEmployeeId(304);
//			  emp1.setLastName("Hong");
//			  emp1.setEmail("gildong4");
//			  emp1.setJobId("IT_PROG");
//			  mapper.addEmp(emp1);
//			  session.commit();
//			  
//			  Employee emp = mapper.getEmp(303);
//			  System.out.println(emp);
			}
//		
//		try (SqlSession session = sqlSessionFactory.openSession(true)) {
//			NoticeMapper mapper = session.getMapper(NoticeMapper.class);
//
//			// insert, update
//			NoticeVO nvo = new NoticeVO();
//			//nvo.setNoticeWriter("user04");
//			nvo.setNoticeTitle("123");
//			nvo.setNoticeSubject("세번째 글 내용입니다.123");
//			nvo.setNoticeId(4);
//			//mapper.insertNotice(nvo);
//
//			// delete
//			mapper.deleteNotice(4);
//			mapper.updateNotice(nvo);
//
//			// list
//			for (NoticeVO vo : mapper.noticeList()) {
//				System.out.println(vo);
//			}
//
//		}

	}

}
