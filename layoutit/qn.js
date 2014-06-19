function initContainer(){
	$(".dragwen").sortable({
		connectWith: ".dragwen",
		opacity: .35,
		start: function(e,t) {
			t.item.oldIndex = t.item.index();
		},
		stop: function(e,t) {
			var flag = true;
			$('.topic_type[name="curProblem"]').each(function(){
				flag = false;
				$(this).attr("dragIndex",t.item.index());
			});
			if(flag){
				sortTable(t.item.oldIndex,t.item.index());
			}
		}
	});
}



$(document).ready(function() {
	CKEDITOR.disableAutoInline = true;
	var contenthandle = CKEDITOR.replace( 'contenteditor' ,{
		language: 'zh-cn',
		contentsCss: ['css/bootstrap.min.css'],
		allowedContent: true
	});
	$(".ul-tool .ui-draggable").draggable({
		connectToSortable: ".dragwen",
		helper: "clone",
		start: function(e,t) {
		t.helper.find('a').each(function(){
			$(this).remove();
		})
		
		
		$(this).find('.topic_type').attr('name','curProblem');
		
		},
		drag: function(e, t) {
			t.helper.width(400);
		},
		stop: function() {
			$(this).find('.topic_type').attr('name','');
			$('.topic_type[name="curProblem"]').each(function(){
			var index = $(this).attr("dragIndex");
			var type = $(this).attr("problemType");
			$(this).parent().remove();
			if(type == 'radio'){
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
})