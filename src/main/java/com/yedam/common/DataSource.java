package com.yedam.common;

import java.io.IOException;
import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

public class DataSource {
	//필드선언
	private static SqlSessionFactory sqlSessionFactory;
	private DataSource() {} //생성자 but 외부접근불가
	
	public static SqlSessionFactory getInstance() {
							// 싱글톤방식ㅇㅇ
	String resource = "com/yedam/common/mybatis-config.xml";
	InputStream inputStream = null;
	try {
		inputStream = Resources.getResourceAsStream(resource);
							// 특정 파일을 읽어와서 메소드로 만들어 줌
	} catch (IOException e) {
		e.printStackTrace();
	}
	SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		return sqlSessionFactory;
	}
}
