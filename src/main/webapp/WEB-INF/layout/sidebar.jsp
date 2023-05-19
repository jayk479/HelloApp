<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="border-end bg-white" id="sidebar-wrapper">
	<div class="sidebar-heading border-bottom bg-light">StartBootstrap</div>
	<div class="list-group list-group-flush">
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="noticeList.do">공지사항목록</a> 
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="noticeAddForm.do">공지사항등록</a> 
		<c:choose>
		<c:when test="${id == null }">
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="loginForm.do">login</a>
		</c:when>
		<c:otherwise>
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="logout.do">logout</a>
		</c:otherwise>
		</c:choose>
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Events</a> 
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Profile</a> 
		<a class="list-group-item list-group-item-action list-group-item-light p-3" href="#!">Status</a>
	</div>
</div>