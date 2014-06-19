<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
  <head>
    
    <title>问卷设计</title>
    
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
	<script type="text/javascript" src="js/bootstrap.min.js"></script>
	<script type="text/javascript" src="js/jquery-ui.js"></script>
	<script type="text/javascript" src="js/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="js/jquery.htmlClean.js"></script>
	<script type="text/javascript" src="ckeditor/ckeditor.js"></script>
	<script type="text/javascript" src="ckeditor/config.js"></script>
	<script type="text/javascript" src="js/jquery.autosize.min.js"></script>
	<script type="text/javascript" src="js/angular.min.js"></script>
	<script type="text/javascript" src="js/angularComponent.js"></script>
	<script type="text/javascript" src="js/scripts.js"></script>

  </head>
  
  <body>
  			<header class="navbar">
  		<div class="container">
              <button type="button" id="edit" class="btn btn-primary active"><span class="glyphicon glyphicon-edit"></span>编辑</button>
              <button type="button" class="btn btn-default btn-primary" id="devpreview"><span class="glyphicon glyphicon-eye-close"></span>布局编辑</button>
              <button type="button" class="btn btn-default btn-primary" id="sourcepreview"><span class="glyphicon glyphicon-eye-open"></span>预览</button>
              <button type="button" class="btn btn-default btn-primary" data-target="#downloadModal" rel="/build/downloadModal" role="button" data-toggle="modal"><i class="glyphicon glyphicon-chevron-down"></i>下载</button>
              <button class="btn btn-default btn-primary" href="/share/index" role="button" data-toggle="modal" data-target="#shareModal"><i class="glyphicon glyphicon-share"></i>保存</button>
              <button class="btn btn-default btn-primary" href="#clear" id="clear"><i class="glyphicon glyphicon-trash"></i>清空</button>
								<button class="btn btn-default btn-primary" href="#undo" id="undo" ><i class="glyphicon glyphicon-arrow-left"></i>撤销</button>
								<button class="btn btn-default btn-primary" href="#redo" id="redo" ><i class="glyphicon glyphicon-arrow-right"></i>重做</button>
								<button class="btn btn-default btn-primary" href="#redo" onclick="getDataProblems();" ><i class="glyphicon glyphicon-arrow-right"></i>数据</button>
								<button class="btn btn-default btn-primary" href="#redo" onclick="getDataProblems();" ><i class="glyphicon glyphicon-arrow-right"></i>数据1</button>
								
								
    	 	</div>
	</header>
  
  <div class="container">
  	<div class="row">
  		
  		
  		
  		<div class="panel-group span3" id="accordion2">
  <div class="panel panel-default">
    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne"> <a class="accordion-toggle" >潮流服饰</a> </div>
    <div id="collapseOne" class="panel-collapse collapse" style="height: 0px;">
      <div class="panel-body">俄罗斯超模茱茱·艾凡雅克(Juju Ivanyuk)为乌克兰版《时尚芭莎》拍摄时尚大片。该系列大片由知名摄影师Federica Putelli掌镜，茱茱·艾凡雅克全力配合，海边大片诠释异域风情，超模完美身材性感至极。</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion2" href="#collapseTwo"> <a class="accordion-toggle">美容护肤</a> </div>
    <div id="collapseTwo" class="panel-collapse collapse" style="height: 0px;">
      <div class="panel-body">找到一款适合的发型，方脸型也能很有气质。那方脸女生又适合什么样的发型呢？下面的发型图片将给你答案。各位爱美的美眉赶快一起来看看吧。</div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" data-toggle="collapse" data-parent="#accordion2" href="#collapseThree"> <a class="accordion-toggle">健康养生</a> </div>
    <div id="collapseThree" class="panel-collapse in" style="height: auto;">
      <div class="panel-body">说起食物我们每天都离不开，我们每天都接触而有些我们却不了解，食物中的营养是非常丰富的，不同的食物有着不同的营养，我们对这些生活中常见的有哪些了解呢？</div>
    </div>
  </div>
</div>




  	</div>
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
