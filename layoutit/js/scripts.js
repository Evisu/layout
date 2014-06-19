
function configurationElm(e, t) {
	$(".demo").delegate(".configuration > a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
	$(".demo").delegate(".configuration .dropdown-menu a", "click", function(e) {
		e.preventDefault();
		var t = $(this).parent().parent();
		var n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		var r = "";
		t.find("a").each(function() {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}


var currentDocument = null;
var currenteditor = null;
$(window).resize(function() {
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160)
});


function initContainer(){
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function(e,t) {
			t.item.oldIndex = t.item.index();
		},
		stop: function(e,t) {
			var flag = true;
			$('.view [id="curProblem"]').each(function(){
				flag = false;
				$(this).attr("dragIndex",t.item.index());
			});
			if(flag){
				sortTable(t.item.oldIndex,t.item.index());
			}
		}
	});
	configurationElm();
}
$(document).ready(function() {
	CKEDITOR.disableAutoInline = true;
	var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
		language: 'zh-cn',
		contentsCss: ['css/bootstrap-combined.min.css'],
		allowedContent: true
	});
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160);
	$(".sidebar-nav .lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			
		},
		drag: function(e, t) {
			t.helper.width(400)
		},
		stop: function(e, t) {
			
		}
	});
	$(".sidebar-nav .box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function(e,t) {
			$(this).find('.view').attr('id','curProblem');
		},
		drag: function(e, t) {
			t.helper.width(400);
		},
		stop: function() {
			$('.form-control').autosize();
			$(this).find('.view').attr('id','');
			$('.view [id="curProblem"]').each(function(){
			var index = $(this).attr("dragIndex");
			var type = $(this).attr("problemType");
			$(this).parent().remove();
			if(type == 'radioType'){
				addProblem(index,{name:'题目',sort:index,type:'radio',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
			}else if(type == 'checkbox'){
				addProblem(index,{name:'题目',sort:index,type:'checkbox',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
			}else if(type == 'completion'){
				addProblem(index,{name:'题目',sort:index,type:'completion',options:[{name:'',sort:0,isInput:true}]});
			}
			});
		}
	});
	initContainer();
	$('body.edit .demo').on("click","[data-target=#editorModal]",function(e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		var eText = currenteditor.html();
		contenthandle.setData(eText);
	});
	$("#edit").click(function() {
		$("body").removeClass("devpreview sourcepreview");
		$("body").addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#devpreview").click(function() {
		$("body").removeClass("edit sourcepreview");
		$("body").addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#sourcepreview").click(function() {
		$("body").removeClass("edit");
		$("body").addClass("devpreview sourcepreview");
		$(this).addClass("active");
		return false
	});
	$("#fluidPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$("#fixedPage").click(function(e) {
		e.preventDefault();
		changeStructure("container", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$(".nav-header").click(function() {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown()
	});
	
	
	 $('.form-control').autosize();   
})

