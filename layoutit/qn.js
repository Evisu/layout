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
	
	
	$(".SeniorEdit[href='#editorModal']").click(function() {
		var sort1 = $('#sort1').val();
		if(sort1 != -1){
		contenthandle.setData(problems[sort1].name);
	 }else{
	 	contenthandle.setData(qnObj.title);
	 	}
		
	});
	
	
		$("#savecontent").click(function() {
		var sort1 = $('#sort1').val();
		
		if(sort1 != -1){
			problems[sort1].name = contenthandle.getData();
	 }else{
	 	alert(contenthandle.getData());
	 	qnObj.title = contenthandle.getData();
	
	 	}
		
		
		
	});
	
	
	
 
            
           
	
	
	
	
	/*
	$(".Drag_area,.max_an,#titleEdit").click(function(){
				
                $("#problemNameEdit").show();
                 $("#optionNameEdit").hide();
                return false;//关键是这里，阻止冒泡
            });
            
            $(document).click(function(){
                $("#problemNameEdit").hide();
				$('.menu_edit').hide();
            });
            
            
            
    $("#optionNameEdit , .T_edit_min").click(function(){
				
                $("#optionNameEdit").show();
                 $("#problemNameEdit").hide();
                return false;//关键是这里，阻止冒泡
            });
            $("#optionNameEdit").click(function(){
                return false;
            });
            $(document).click(function(){
                $("#optionNameEdit").hide();
				$('.fast_machine').hide();
            });   
            
      */      
                 
	
	
})


function editDiv(show){
	if(show){
		$('.menu_edit').show();
	}else{
		$('.menu_edit').hide();
	}
}

function fast_machine(show){
	if(show){
		$('.fast_machine').show();
	}else{
		$('.fast_machine').hide();
	}
	
	}
	
	
	
	function stopPropagation(e) {
					
                if (e.stopPropagation) 
                    e.stopPropagation();
                else 
                    e.cancelBubble = true;
            }
           ;