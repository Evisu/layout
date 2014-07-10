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
				addProblem(index,{id:'radio1',name:'题目',sort:index,type:'radio',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
			}else if(type == 'checkbox'){
				addProblem(index,{id:'checkbox1',name:'题目',sort:index,type:'checkbox',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
			}else if(type == 'completion'){
				addProblem(index,{id:'completion1',name:'题目',sort:index,type:'completion',options:[{name:'',sort:0,isInput:true}]});
			}else if(type == 'paging'){
				addProblem(index,{id:'paging1',name:'页码',sort:index,type:'paging',options:[{sort:($('.paging').length+1),total:($('.paging').length+1),isInput:true}]});
			}else if(type == 'text'){
                addProblem(index,{id:'paging1',name:'段落说明',sort:index,type:'text',options:[{sort:($('.paging').length+1),total:($('.paging').length+1),isInput:true}]});
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
	 	qnObj.title = contenthandle.getData();
	
	 	}
		
		
		
	});


    $(document).bind("click",function(e){

        var target = $(e.target).parents("#problemNameEdit");
        if(!target.html()){
            target = $(e.target).parents("#optionNameEdit");
        }

        if(!target.html()){
            if($(e.target).attr('contenteditable') == 'true'){
                target = $(e.target);
            }

        }
        if(!target.html()){

                target = $(e.target).parents("[contenteditable=true]");


        }

        if(!target.html()){

                $('#problemNameEdit').hide();
                $('#optionNameEdit').hide();
            }


    });

	
	/*$(document).bind("click",function(e){
     var target = $(e.target);
     if($(target).attr('class')){
    if($(target).attr('class').indexOf('Drag_area') != -1 || $(target).attr('class').indexOf('max_an') != -1 || $(target).attr('id') == 'problemNameEditDiv' || $(target).attr('id') == 'titleEdit'){
    	
    }else if($(target).attr('class').indexOf('T_edit_min') != -1 || $(target).attr('class').indexOf('min_an') != -1 || $(target).attr('id') == 'optionNameEditDiv'){
    
    
    }else{
    
    	$('#problemNameEdit').hide();
    	$('#optionNameEdit').hide();
    }
     }else{

         $('#problemNameEdit').hide();
         $('#optionNameEdit').hide();
     }
   
   });  */
 
    
  /*
		$('.T_edit,.T_edit_min,.min_an').bind('click',function(e){ 
			alert();
			stopPropagation(e); 
		});      
		
		
		$('.Drag_area,.max_an,#problemNameEditDiv').bind('click',function(e){ 
			alert();
			stopPropagation(e); 
		}); 
		
	*/	
	
	
	
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
    alert();
	if(show){

		$('.fast_machine').show();
        alert();
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