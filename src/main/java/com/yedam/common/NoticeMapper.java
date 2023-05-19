package com.yedam.common;

import java.util.List;

import com.yedam.domain.Employee;

public interface NoticeMapper {
	
	public Employee getEmp(int empId);
	public List<Employee> empList();
	public int dellEmp(int empId);
	public int addEmp(Employee emp);
}
