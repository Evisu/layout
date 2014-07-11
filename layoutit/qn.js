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
			addProblem(index,createProblem(index,type,qnObj.questionnaireId));
			});
		}
	});
	initContainer();
	
	
	$(".SeniorEdit[href='#editorModal']").click(function() {
		var sort1 = $('#sort1').val();
        var sort2 = $('#sort2').val();
		if(sort2 == -1){
		contenthandle.setData(problems[sort1].title);
	     }else{
	 	contenthandle.setData(problems[sort1].options[sort2].optionName);
	 	}
		
	});
	
	
		$("#savecontent").click(function() {
		var sort1 = $('#sort1').val();
        var sort2 = $('#sort2').val();
		if(sort2 == -1){
			problems[sort1].title = contenthandle.getData();

	 }else{
            problems[sort1].options[sort2].optionName = contenthandle.getData();
	
	 	}
		
		
		
	});


    $("#saveOption").click(function() {
        var sort1 = $('#sort1').val();
        var sort2 = $('#sort2').val();
        var isChecked = $('#isInputCheckBox').is(":checked");
        if(sort2 != -1){
            problems[sort1].options[sort2].isInput = isChecked;
        }
    });

    $("#saveTextOption").click(function() {
        var sort1 = $('#sort1').val();
        var sort2 = $('#sort2').val();
        if(sort2 != -1){
            problems[sort1].options[sort2].height = $('#text_row').val();
            problems[sort1].options[sort2].width = $('#text_col').val();
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

    function createProblem(orderNum,problemType,questionnaireId){
        var problem = {
            "problemId" : "",
            "title" : "",
            "problemType" : problemType,
            "questionnaireId" : questionnaireId,
            "orderNum" : 0,
            "displayNum" : 1}
        if(problemType == 'radio'){
            problem.title = "单选题";
            problem.options = [
                {
                    "qsOptionsId" : "",
                    "optionName" : "选项1",
                    "isInput" : false,
                    "problemId" : "",
                    "orderNum" : 0
                }
                ,
                {
                    "qsOptionsId" : "",
                    "optionName" : "选项2",
                    "isInput" : false,
                    "problemId" : "",
                    "orderNum" : 1
                }
            ]
        }else if(problemType == 'checkbox'){
            problem.title = "多选题";
            problem.options = [
                {
                    "qsOptionsId" : "",
                    "optionName" : "选项1",
                    "isInput" : false,
                    "problemId" : "",
                    "orderNum" : 0
                }
                ,
                {
                    "qsOptionsId" : "",
                    "optionName" : "选项2",
                    "isInput" : false,
                    "problemId" : "",
                    "orderNum" : 1
                }
            ]
        }else if(problemType == 'completion'){
            problem.title = "填空题";
            problem.options = [
                {
                    "qsOptionsId" : "",
                    "optionName" : "",
                    "isInput" : true,
                    "problemId" : "",
                    "orderNum" : 0,
                    "height" : 1,
                    "width" : 40
                }

            ]
        }else if(problemType == 'text'){
            problem.title = "段落说明";
        }else if(problemType == 'paging'){
            problem.title = "分页";
        }

       return problem;
    }