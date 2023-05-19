package com.yedam.domain;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public class SampleExe {

	public static void main(String[] args) {
		SqlSessionFactory sqlSessionFactory = com.yedam.common.DataSource.getInstance();
		try (SqlSession session = sqlSessionFactory.openSession(true)) {//openSession(true) 자동커밋
			//Employee emp = session.selectOne("com.yedam.common.NoticeMapper.getEmp", 100); //단건조회
			Employee emp1 = new Employee();
			emp1.setEmployeeId(302);
			emp1.setLastName("Hong");
			emp1.setEmail("gildong2");
			emp1.setJobId("IT_PROG");
			session.insert("com.yedam.common.NoticeMapper.addEmp", emp1);
			List<Employee> emp = session.selectList("com.yedam.common.NoticeMapper.empList");
			System.out.println(emp);
			session.delete("com.yedam.common.NoticeMapper.delEmp", 215);			
		}
	}
}
