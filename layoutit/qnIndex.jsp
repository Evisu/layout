<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<!DOCTYPE html>
<html>
  <head>
    
    <title>问卷设计</title>
    
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/layoutit.css" rel="stylesheet">
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
	<style>
	.T_edit {
		height:20;
		width:150;	
	}
	
	.T_edit:hover{
		background:#FDF9CD;
	}
	</style>

  </head>
  
  <body class="edit">
     <header class="navbar navbar-inverse navbar-fixed-top bs-docs-nav">
  		<div class="container">
    		<div class="btn-group">
              <button type="button" id="edit" class="btn btn-primary active"><span class="glyphicon glyphicon-edit"></span>编辑</button>
              <button type="button" class="btn btn-default btn-primary" id="devpreview"><span class="glyphicon glyphicon-eye-close"></span>布局编辑</button>
              <button type="button" class="btn btn-default btn-primary" id="sourcepreview"><span class="glyphicon glyphicon-eye-open"></span>预览</button>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-default btn-primary" data-target="#downloadModal" rel="/build/downloadModal" role="button" data-toggle="modal"><i class="glyphicon glyphicon-chevron-down"></i>下载</button>
              <button class="btn btn-default btn-primary" href="/share/index" role="button" data-toggle="modal" data-target="#shareModal"><i class="glyphicon glyphicon-share"></i>保存</button>
              <button class="btn btn-default btn-primary" href="#clear" id="clear"><i class="glyphicon glyphicon-trash"></i>清空</button>
            </div>
            <div class="btn-group">
								<button class="btn btn-default btn-primary" href="#undo" id="undo" ><i class="glyphicon glyphicon-arrow-left"></i>撤销</button>
								<button class="btn btn-default btn-primary" href="#redo" id="redo" ><i class="glyphicon glyphicon-arrow-right"></i>重做</button>
								<button class="btn btn-default btn-primary" href="#redo" onclick="getDataProblems();" ><i class="glyphicon glyphicon-arrow-right"></i>数据</button>
								<button class="btn btn-default btn-primary" href="#redo" onclick="getDataProblems();" ><i class="glyphicon glyphicon-arrow-right"></i>数据1</button>
								
								
			</div>
    	 	</div>
	</header>
  
  
  <div class="container">
  <div class="row">
     
      <div class="sidebar-nav">
        <ul class="nav nav-list accordion-group">
          <li class="nav-header">
            <div class="pull-right popover-info"><i class="glyphicon glyphicon-question-sign"></i>
              <div class="popover fade right">
                <div class="arrow"></div>
                <h3 class="popover-title">功能</h3>
                <div class="popover-content">在这里设置你的栅格布局, 栅格总数默认为12, 用空格分割每列的栅格值, 如果您需要了解更多信息，请访问<a target="_blank" href="http://twitter.github.io/bootstrap/scaffolding.html#gridSystem">Bootstrap栅格系统.</a></div>
              </div>
            </div>
            <i class="glyphicon glyphicon-plus"></i> 布局设置 </li>
          <li style="display: list-item;" class="rows" id="estRows">
            <div class="lyrow ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default label-default"><i class="glyphicon glyphicon-move"></i>拖动</span>
              <div class="preview">
                <input value="12" type="text">
              </div>
              <div class="view">
                <div class="row clearfix">
                  <div class="span12 column"></div>
                </div>
              </div>
            </div>
            </li>
        </ul>
        
        
        <ul class="nav nav-list accordion-group">
          <li class="nav-header"><i class="glyphicon glyphicon-plus"></i> 基本CSS
            <div class="pull-right popover-info"><i class="glyphicon glyphicon-question-sign"></i>
              <div class="popover fade right">
                <div class="arrow"></div>
                <h3 class="popover-title">帮助</h3>
                <div class="popover-content">这里提供了一系列基本元素样式，你可以通过区块右上角的编辑按钮修改样式设置。如需了解更多信息，请访问<a target="_blank" href="http://twitter.github.io/bootstrap/base-css.html">基本CSS.</a></div>
              </div>
            </div>
          </li>
          <li style="display: none;" class="boxes" id="elmBase">
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> 
            	 <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">对齐 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="text-left">靠左</a></li>
                <li class=""><a href="#" rel="text-center">居中</a></li>
                <li class=""><a href="#" rel="text-right">靠右</a></li>
              </ul>
              </span> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">标记 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="muted">禁用</a></li>
                <li class=""><a href="#" rel="text-warning">警告</a></li>
                <li class=""><a href="#" rel="text-error">错误</a></li>
                <li class=""><a href="#" rel="text-info">提示</a></li>
                <li class=""><a href="#" rel="text-success">成功</a></li>
              </ul>
              </span> </span>
              <div class="preview">标题栏</div>
              <div class="view">
                <h3 contenteditable="true">h3. 这是一套可视化布局系统.</h3>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">对齐 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="text-left">靠左</a></li>
                <li class=""><a href="#" rel="text-center">居中</a></li>
                <li class=""><a href="#" rel="text-right">靠右</a></li>
              </ul>
              </span> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">标记 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="muted">禁用</a></li>
                <li class=""><a href="#" rel="text-warning">警告</a></li>
                <li class=""><a href="#" rel="text-error">错误</a></li>
                <li class=""><a href="#" rel="text-info">提示</a></li>
                <li class=""><a href="#" rel="text-success">成功</a></li>
              </ul>
              </span> <a class="btn btn-default btn-xs" href="#" rel="lead">Lead</a> </span>
              <div class="preview">段落</div>
              <div class="view" contenteditable="true">
                <p><em>Git</em>是一个分布式的版本控制系统，最初由<b>Linus Torvalds</b>编写，用作Linux内核代码的管理。在推出后，Git在其它项目中也取得了很大成功，尤其是在Ruby社区中。 </p>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span>
              <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button></span>
              <div class="preview">地址</div>
              <div class="view">
                <address contenteditable="true">
                <strong>Twitter, Inc.</strong><br>
                795 Folsom Ave, Suite 600<br>
                San Francisco, CA 94107<br>
                <abbr title="Phone">P:</abbr> (123) 456-7890
                </address>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"> <a class="btn btn-default btn-xs" href="#" rel="pull-right">右对齐</a> </span>
              <div class="preview">引用块</div>
              <div class="view clearfix">
                <blockquote contenteditable="true">
                  <p>github是一个全球化的开源社区.</p>
                  <small>关键词 <cite title="Source Title">开源</cite></small> </blockquote>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <a class="btn btn-default btn-xs" href="#" rel="unstyled">无样式</a> <a class="btn btn-default btn-xs" href="#" rel="inline">嵌入</a> </span>
              <div class="preview">无序列表</div>
              <div class="view">
                <ul contenteditable="true">
                  <li>新闻资讯</li>
                  <li>体育竞技</li>
                  <li>娱乐八卦</li>
                  <li>前沿科技</li>
                  <li>环球财经</li>
                  <li>天气预报</li>
                  <li>房产家居</li>
                  <li>网络游戏</li>
                </ul>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <a class="btn btn-default btn-xs" href="#" rel="unstyled">无样式</a> <a class="btn btn-default btn-xs" href="#" rel="inline">嵌入</a> </span>
              <div class="preview">有序列表</div>
              <div class="view">
                <ol contenteditable="true">
                  <li>新闻资讯</li>
                  <li>体育竞技</li>
                  <li>娱乐八卦</li>
                  <li>前沿科技</li>
                  <li>环球财经</li>
                  <li>天气预报</li>
                  <li>房产家居</li>
                  <li>网络游戏</li>
                </ol>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <a class="btn btn-default btn-xs" href="#" rel="dl-horizontal">竖向对齐</a> </span>
              <div class="preview">详细描述</div>
              <div class="view">
                <dl contenteditable="true">
                  <dt>Rolex</dt>
                  <dd>劳力士创始人为汉斯.威尔斯多夫，1908年他在瑞士将劳力士注册为商标。</dd>
                  <dt>Vacheron Constantin</dt>
                  <dd>始创于1775年的江诗丹顿已有250年历史，</dd>
                  <dd>是世界上历史最悠久、延续时间最长的名表之一。</dd>
                  <dt>IWC</dt>
                  <dd>创立于1868年的万国表有“机械表专家”之称。</dd>
                  <dt>Cartier</dt>
                  <dd>卡地亚拥有150多年历史，是法国珠宝金银首饰的制造名家。</dd>
                </dl>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">样式 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="table-striped">条纹</a></li>
                <li class=""><a href="#" rel="table-bordered">边框</a></li>
              </ul>
              </span> <a class="btn btn-default btn-xs" href="#" rel="table-hover">鼠标指示</a> <a class="btn btn-default btn-xs" href="#" rel="table-condensed">紧凑</a> </span>
              <div class="preview">表格</div>
              <div class="view">
                <table class="table" contenteditable="true">
                  <thead>
                    <tr>
                      <th>编号</th>
                      <th>产品</th>
                      <th>交付时间</th>
                      <th>状态</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>TB - Monthly</td>
                      <td>01/04/2012</td>
                      <td>Default</td>
                    </tr>
                    <tr class="success">
                      <td>1</td>
                      <td>TB - Monthly</td>
                      <td>01/04/2012</td>
                      <td>Approved</td>
                    </tr>
                    <tr class="error">
                      <td>2</td>
                      <td>TB - Monthly</td>
                      <td>02/04/2012</td>
                      <td>Declined</td>
                    </tr>
                    <tr class="warning">
                      <td>3</td>
                      <td>TB - Monthly</td>
                      <td>03/04/2012</td>
                      <td>Pending</td>
                    </tr>
                    <tr class="info">
                      <td>4</td>
                      <td>TB - Monthly</td>
                      <td>04/04/2012</td>
                      <td>Call in to confirm</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <a class="btn btn-default btn-xs" href="#" rel="form-inline">嵌入</a> </span>
              <div class="preview">提交表单</div>
              <div class="view">
				<form>
					<fieldset>
					<legend contenteditable="true">表单项</legend>
					<label contenteditable="true">表签名</label>
					<input type="text" placeholder="Type something…">
					<span class="help-block" contenteditable="true">这里填写帮助信息.</span>
					<label class="checkbox" contenteditable="true">
					<input type="checkbox"> 勾选同意
					</label>
					<button type="submit" class="btn" contenteditable="true">提交</button>
					</fieldset>
				</form>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button> <a class="btn btn-default btn-xs" href="#" rel="form-inline">嵌入</a> </span>
              <div class="preview">搜索框</div>
              <div class="view">
                <form class="form-search">
                  <input class="input-medium search-query" type="text">
                  <button type="submit" class="btn" contenteditable="true">查找</button>
                </form>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"> </span>
              <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button></span>
              <div class="preview">纵向表单</div>
              <div class="view">
                <form class="form-horizontal">
                  <div class="control-group">
                    <label class="control-label" for="inputEmail" contenteditable="true">邮箱</label>
                    <div class="controls">
                      <input id="inputEmail" placeholder="Email" type="text">
                    </div>
                  </div>
                  <div class="control-group">
                    <label class="control-label" for="inputPassword" contenteditable="true">密码</label>
                    <div class="controls">
                      <input id="inputPassword" placeholder="Password" type="password">
                    </div>
                  </div>
                  <div class="control-group">
                    <div class="controls">
                      <label class="checkbox" contenteditable="true">
                        <input type="checkbox">
                        Remember me </label>
                      <button type="submit" class="btn" contenteditable="true">登陆</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">样式 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="btn-primary">重点</a></li>
                <li class=""><a href="#" rel="btn-info">信息</a></li>
                <li class=""><a href="#" rel="btn-success">成功</a></li>
                <li class=""><a href="#" rel="btn-warning">提醒</a></li>
                <li class=""><a href="#" rel="btn-danger">危险</a></li>
                <li class=""><a href="#" rel="btn-inverse">反转</a></li>
                <li class=""><a href="#" rel="btn-link">链接</a></li>
              </ul>
              </span> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">尺寸 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class=""><a href="#" rel="btn-lg">大</a></li>
                <li class="active"><a href="#" rel="">中</a></li>
                <li class=""><a href="#" rel="btn-sm">小</a></li>
                <li class=""><a href="#" rel="btn-xs">微型</a></li>
              </ul>
              </span> <a class="btn btn-default btn-xs" href="#" rel="btn-block">通栏</a> <a class="btn btn-default btn-xs" href="#" rel="disabled">禁用</a> </span>
              <div class="preview">按钮</div>
              <div class="view">
                <button class="btn" type="button" contenteditable="true">按钮</button>
              </div>
            </div>
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"> <span class="btn-group"> <a class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" href="#">样式 <span class="caret"></span></a>
              <ul class="dropdown-menu">
                <li class="active"><a href="#" rel="">默认</a></li>
                <li class=""><a href="#" rel="img-rounded">圆角</a></li>
                <li class=""><a href="#" rel="img-circle">圆圈</a></li>
                <li class=""><a href="#" rel="img-polaroid">相框</a></li>
              </ul>
              </span> </span>
              <div class="preview">图片</div>
              <div class="view"> <img alt="140x140" src="img/a.jpg"> </div>
            </div>
          </li>
        </ul>
        
        
        
         <ul class="nav nav-list accordion-group">
          <li class="nav-header"><i class="glyphicon glyphicon-plus"></i> 题型
            <div class="pull-right popover-info"><i class="glyphicon glyphicon-question-sign"></i>
              <div class="popover fade right">
                <div class="arrow"></div>
                <h3 class="popover-title">帮助</h3>
                <div class="popover-content">拖放题型到布局框内. 拖入后你可以设置组件样式. 查看这里获取更多帮助 <a target="_blank" href="http://twitter.github.io/bootstrap/components.html">Components.</a></div>
              </div>
            </div>
          </li>
         <li style="display: none;" class="boxes" id="elmComponents">
         
         	 <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><span class="glyphicon glyphicon-remove"></span>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button>
             </span>
              <div class="preview">单选题</div>
              <div class="view" problemType="radioType"> 
              <textarea class="form-control" rows="1" placeholder="题目"></textarea>
			  
              <div class="radio">
            		<input type="radio"> <textarea class="form-control" rows="1">选项</textarea><a href="#close" class="removeOption label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a>
        	  </div>
        	  
        	   <a href="#close" class="addOption label label-default label-danger"><i class="glyphicon glyphicon-add"></i>添加</a>
              
            </div>
           	
           </div>
           
           
           
            <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><span class="glyphicon glyphicon-remove"></span>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button>
             </span>
              <div class="preview">复选题</div>
              <div class="view" problemType="checkbox"> 
               <textarea class="form-control" rows="1" placeholder="题目"></textarea>
              <div class="checkbox">
              		<span class="dd"><a href="#close" class="removeOption label label-default label-danger"><i class="glyphicon glyphicon-remove"></i></a></span>
            		<span><input type="checkbox"> <textarea class="form-control" rows="1">选项</textarea></span> 
        	  </div>
        	  
        	   <a href="#close" class="addOption label label-default label-danger"><i class="glyphicon glyphicon-add"></i>添加</a>
              
            </div>
           	
           </div>
           
           
           <div class="box box-element ui-draggable"> <a href="#close" class="remove label label-default label-danger"><span class="glyphicon glyphicon-remove"></span>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button>
             </span>
              <div class="preview">填空题</div>
              <div class="view" problemType="completion"> 
              <textarea class="form-control" rows="1" placeholder="题目"></textarea>
              <textarea class="form-control" rows="1" placeholder="题目"></textarea>
            </div>
           	
           </div>
           
           
           
           
         
         </li>
        </ul>
        
        
        
        </div>
        
        <div id="editDiv" style="min-height: 590px;" class="demo ui-sortable" ng-app ng-controller="questionnaire">
        	
        	<div class="lyrow ui-draggable"> <a href="#close" class="remove label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a> <span class="drag label label-default label-default"><i class="glyphicon glyphicon-move"></i>拖动</span>
              <div class="preview">
                <input value="12" type="text">
              </div>
              <div class="view">
                <div class="row clearfix">
                  <div class="span12 column">
                  
                  			
        	 <div class="box box-element ui-draggable" ng-repeat="problem in problems"> <a href="#close" class="remove label label-default label-danger"  ng-click="removeProblem(problem.sort)"><span class="glyphicon glyphicon-remove"></span>删除</a> <span class="drag label label-default"><i class="glyphicon glyphicon-move"></i>拖动</span> <span class="configuration"><button type="button" class="btn btn-default btn-xs" data-target="#editorModal" role="button" data-toggle="modal">编辑</button>
             </span>
              <div class="preview"></div>
              
              <div class="view" ng-if="problem.type == 'title'"> 
              	<span class="T_edit"  contenteditable="true" onmouseout="focus();" onclick="edit();" onblur="editout();">
              	aasd
              	</span>
              	<input type="hidden" id="aa" value="{{problem.sort}}">
              	<script type="text/javascript">
              	function edit(){
              		$('.T_edit').each(function(){
              		
              			$(this).attr('contenteditable','true');
              			$(this).css('border-style','solid');
              			$(this).css('border-color','black');
              		})
              	}
              	
              	function editout(){
              		$('.T_edit').each(function(){
              			$(this).attr('contenteditable','false');
              			$(this).css('border-style','');
              			$(this).css('border-color','');
              			console.log($(this).html());
              			modProblem($('#aa').val(),$(this).html());
              			
              		})
              	}
              	
              	</script>
              </div>
              
              
              <!-- 单选题-->
              <div class="view" ng-if="problem.type == 'radio'"> 
              		<textarea class="form-control" rows="1" ng-model="problem.name">{{problem.name}}</textarea>
			  <div ng-repeat="option in problem.options">
              <div class="radio">
            		<input type="radio"> <textarea class="form-control" rows="1" ng-model="option.name">{{option.name}}</textarea><a href="#close" class="label label-default label-danger" ng-click="removeOption(problem.sort,option.sort)"><i class="glyphicon glyphicon-remove"></i>删除</a>
        	  </div>
        	  </div>
        	   <a href="#close" class="label label-default label-danger" ng-click="addOption(problem.sort)"><i class="glyphicon glyphicon-add"></i>添加</a>
              		
              </div>
            
             <!-- 复选题-->
             <div class="view" ng-if="problem.type == 'checkbox'"> 
              		<textarea class="form-control" rows="1" ng-model="problem.name">{{problem.name}}</textarea>
			  <div ng-repeat="option in problem.options">
              <div class="checkbox">
            		<input type="checkbox"> <textarea class="form-control" rows="1" ng-model="option.name">{{option.name}}</textarea><a href="#close" class="label label-default label-danger" ng-click="removeOption(problem.sort,option.sort)"><i class="glyphicon glyphicon-remove"></i>删除</a>
        	  </div>
        	  </div>
        	   <a href="#close" class="label label-default label-danger" ng-click="addOption(problem.sort)"><i class="glyphicon glyphicon-add"></i>添加</a>
              		
            </div>	
            
            <!--填空题-->
            
            <div class="view" ng-if="problem.type == 'completion'"> 
              		<textarea class="form-control" rows="1" ng-model="problem.name">{{problem.name}}</textarea>
			  <div ng-repeat="option in problem.options">
			   <div class="checkbox">
               <textarea class="form-control" rows="1"></textarea>
                </div>
        	  </div>
              		
            </div>	
            
           	
           </div>
                  
                  
                  </div>
                </div>
              </div>
            </div>
        	
        	
        	
        	
        	
        
        
        </div>
        
      </div>
  </div>
  
  <div style="display:none;">
  
  	 <div id="radioProblemTemplate"> 
              		
              		<textarea class="form-control" rows="1" ng-model="problem.name">{{problem.name}}</textarea>
			  <div ng-repeat="option in problem.options">
              <div class="radio">
            		<input type="radio"> <textarea class="form-control" rows="1">{{option.name}}</textarea><a href="#close" class="removeOption label label-default label-danger"><i class="glyphicon glyphicon-remove"></i>删除</a>
        	  </div>
        	  </div>
        	   <a href="#close" class="label label-default label-danger" ng-click="add()"><i class="glyphicon glyphicon-add"></i>添加</a>
              		
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
  
  
  


<div class="modal hide fade" role="dialog" id="downloadModal">
  <div class="modal-header"> <a class="close" data-dismiss="modal">×</a>
    <h3>下载</h3>
  </div>
  <div class="modal-body">
    <p>已在下面生成干净的HTML, 可以复制粘贴代码到你的项目.</p>
    <div class="btn-group">
      <button type="button" id="fluidPage" class="active btn btn-info"><i class="glyphicon-fullscreen"></i> 自适应宽度</button>
      <button type="button" class="btn btn-default btn-info" id="fixedPage"><i class="glyphicon-screenshot"></i> 固定宽度</button>
    </div>
    <br>
    <br>
    <p>
      <textarea></textarea>
    </p>
  </div>
  <div class="modal-dialog"> <a class="btn" data-dismiss="modal">关闭</a> </div>
</div>
 
 
 <div class="modal fade" id="shareModal" tabindex="-1" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
        <h4 class="modal-title">保存</h4>
      </div>
      <div class="modal-body">
        <p>保存成功</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div>
  
  
  </body>
</html>
