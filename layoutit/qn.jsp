<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
  <head>
    
    <title>问卷设计</title>
    
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/public.css" rel="stylesheet">
	<link href="css/style.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="js/jquery.htmlClean.js"></script>
	<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="ckeditor/config.js"></script>
	<script type="text/javascript" src="js/angular.min.js"></script>
	
	<script type="text/javascript" src="js/angular-contenteditable.js"></script>
	<script type="text/javascript" src="js/angularComponent.js"></script>
	<script type="text/javascript" src="qn.js"></script>

  </head>
  
  <body ng-app="qn" ng-controller="questionnaire">
  	
    <div class="wjContent">
<div class="container-fluid clear">
<div class="row-fluid">
<!--wentop-->
<div class="wentop">
<ul class="nav1 nav2-tabs" id="myTab">
<li class="active">
<a href="#design" data-toggle="tab">问卷设计</a>
</li>
</ul>
<h4 class="h4st1">
滿意度調查
</h4>
<div class="tab2-content" id="myTabContent">
<div class="tab-pane fade in active" id="design">
<ul class="fr">
<li>
<a id="appearset" href="javascript:getDataProblems();"> <i class="design-set1-icon active"></i>
保存问卷
</a>
</li>
<li>
<a href="javascript:window.open('qnView.html');void(0);" >
<i class="design-set4-icon"></i>
预览问卷
</a>
</li>
<li>
<a onclick="publish_proj_confirm();return false;" href="#" target="_blank">
<i class="design-set5-icon"></i>
发布问卷
</a>
</li>
</ul>
</div>
</div>
<!--/.tab2-content--> </div>
<!--/.wentop-->
<div class="rows1">
<div class="well sidebar-nav affix-top" id="accordion1">
<div class="accordion-group">
<h4 class="tc">
<a href="javascript:;">
基本题型
<i class="icon_on"></i>
</a>
</h4>
<ul class="ul-tool">
<li class="moduleL ui-draggable">
<a href="javascript:;">
<i class="basic-too11-icon-active"></i>
单选题
</a>

	<div class="topic_type" problemType="radio" >
<div class="topic_type_con">
<div class="Drag_area">
	单选题
</div>
<ul class="unstyled ">
<li><input  type="radio"><label class="T_edit_min">选项1</label></li>
<li><input type="radio"><label class="T_edit_min" name="option">选项2</label></li>
</ul>

</div>
</div>





</li>
<li class="moduleL ui-draggable" >
<a href="javascript:;">
<i class="basic-too12-icon-active"></i>
多选题
</a>


	<div class="topic_type" problemType="checkbox">
<div class="topic_type_con">
<div class="Drag_area">
	多选题
</div>
<ul class="unstyled ">
<li><input  type="checkbox"><label class="T_edit_min">选项1</label></li>
<li><input type="checkbox"><label class="T_edit_min" name="option">选项2</label></li>
</ul>

</div>
</div>




</li>
<li class="moduleL ui-draggable">
<a href="javascript:;">
<i class="basic-too13-icon-active"></i>
填空题
</a>

<div class="topic_type">
<div class="topic_type_menu">
</div>
<div class="topic_type_con">
<div class="Drag_area">
	填空题
</div>
<ul class="unstyled">
<li>
<div class="option_Fill">
<textarea rows="1" cols="40" type="text"></textarea>
</div>
</li>
</ul>

</div>
</div>



</li>
</ul>
</div>
</div>
</div>
<!--/.rows1-->
<div class="rows2 well2 Tj">
	
<h4 class="h4-bg T_edit p_title">11</h4>




<ul class="dragwen ui-sortable" >
	
<!-- 题目的html放这里 --> 
<li class="module" ng-repeat="problem in problems">


	

		<!--单选题-->
<div class="topic_type">
<div class="topic_type_menu">
<div class="setup-group">
<h4>Q{{problem.sort+1}}</h4>
<a title="题目删除"  href="javascript:;" ng-click="removeProblem(problem.sort)"><i class="del2-icon-active"></i></a>
</div></div>
<div class="topic_type_con">
<div class="Drag_area" contenteditable="true" ng-model="problem.name" strip-br="true" ng-blur="synProblemName($event.target,problem.sort)">
</div>

<ul class="unstyled " ng-if="problem.type == 'radio'">
<li ng-repeat="option in problem.options"><input  type="radio" ><label class="T_edit_min" contenteditable="true" ng-model="option.name" strip-br="true"></label></li>
</ul>


<ul class="unstyled " ng-if="problem.type == 'checkbox'">
<li ng-repeat="option in problem.options"><input  type="checkbox" ><label class="T_edit_min">{{option.name}}</label></li>
</ul>

<ul class="unstyled" ng-if="problem.type == 'completion'">
<li>
<div class="option_Fill">
<textarea rows="1" cols="40" type="text"></textarea>
</div>
</li>
</ul>


<div class="operationH" ng-if="problem.type == 'radio' || problem.type == 'checkbox'"><a  href="javascript:;" ng-click="addOption(problem.sort)">
<i title="添加选项" class="add-icon-active"></i></a>
</div>
</div>
</div>




<div class="updown" >
<a href="javascript:;" ng-click="upProblem(problem.sort)"><i title="上移本题" class="up-icon-active"></i></a><a href="javascript:;" ng-click="downProblem(problem.sort)"><i title="下移本题" class="down-icon-active"></i></a>
</div>
</li>

</ul>
<!--/.rows2--> </div>
<!--/.row-fluid--> </div>
<!--/container-fluid-->
</div>
  
  
  
    <!-- 编辑 -->
  
  <div class="modal fade" id="editorModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">编辑</h4>
      </div>
      <div class="modal-body">
        <p>  <textarea id="contenteditor"></textarea></p>
      </div>
      <div class="modal-footer">
        <button id="savecontent" type="button" class="btn btn-default btn-primary" data-dismiss="modal">保存</button>
        <button type="button" class="btn btn-default btn-primary" data-dismiss="modal">关闭</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
  
  
  
  
  
  
  </body>
</html>
