
var qnObj = {};
var problems = new Array();
qnObj = {id:'1',title:'2014年巴西世界杯调查问卷',problems:problems};







angular.module('qn', ['contenteditable'])
.controller('questionnaire',function($scope){
	$scope.problems = problems;
	$scope.qnObj = qnObj;
	
	for(var i = 0;i<50;i++){
    }
        $scope.problems.push({name:'您在看2014年巴西世界杯吗？',sort:0,type:'radio',options:[{name:'看',sort:0,value:true,inputValue:false},{name:'不看',sort:1,value:true,inputValue:false}]});
        $scope.problems.push({name:'您喜爱哪个球队？',sort:1,type:'checkbox',options:[{name:'巴西',sort:0,inputValue:true},{name:'阿根廷',sort:1,inputValue:true},{name:'荷兰',sort:2,inputValue:true},{name:'德国',sort:3,inputValue:true}]});
        $scope.problems.push({name:'您认为哪个球队能夺得冠军,及为什么？',sort:2,type:'completion',options:[{inputValue:''}]});

	
	
	
 $scope.addOption = function(sort1){
	$scope.problems[sort1].options.push({name:'选项'+($scope.problems[sort1].options.length+1),sort:($scope.problems[sort1].options.length)}); 
 }
 $scope.removeOption = function(sort1,sort2){
	$scope.problems[sort1].options.splice(sort2,1); 
 }
 
 $scope.removeProblem = function(sort1){
	$scope.problems.splice(sort1,1); 
 }
 
 $scope.upProblem = function(sort1){
 	if(sort1 != 0){
 		sortTable(sort1-1,sort1);
 		}
 }
 
 $scope.downProblem = function(sort1){
		if(sort1 != $scope.problems.length-1){
			sortTable(sort1+1,sort1);
 		}
 }
 
 $scope.problemNameEditShow = function(sort1){
 		$('#sort1').val(sort1);
 		var problemNameEdit = $('#problemNameEdit');
 		problemNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].name);
 		problemNameEdit.css("left",$('#problemName'+sort1).offset().left);
		problemNameEdit.css("top",$('#problemName'+sort1).offset().top);
 		problemNameEdit.show();
 		problemNameEdit.find('.add_edit')[0].focus();
 		var optionNameEdit = $('#optionNameEdit');
 		optionNameEdit.hide();
 	}
 	
 	
  $scope.optionNameEditShow = function(sort1,sort2){
    $('#sort1').val(sort1);
    $('#sort2').val(sort2);
    var optionNameEdit = $('#optionNameEdit');

    optionNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].options[sort2].name);
    optionNameEdit.css("left",$('#optionName_'+sort1+'_'+sort2).offset().left);
    optionNameEdit.css("top",$('#optionName_'+sort1+'_'+sort2).offset().top);
    optionNameEdit.show();
    optionNameEdit.find('.add_edit')[0].focus();

    var problemNameEdit = $('#problemNameEdit');
    problemNameEdit.hide();

    $('.fast_machine').show();

 }
 		
 
 
 $scope.titleEditShow = function(){
 		$('#sort1').val(-1);
 		var problemNameEdit = $('#problemNameEdit');
 		problemNameEdit.find('div[contenteditable="true"]').html($scope.qnObj.title);
 		problemNameEdit.css("left",$('#titleEdit').offset().left);
		problemNameEdit.css("top",$('#titleEdit').offset().top);
 		problemNameEdit.show();
 		problemNameEdit.find('.add_edit')[0].focus();
        var optionNameEdit = $('#optionNameEdit');
        optionNameEdit.hide();
 	}
 
 setInterval(function() {
		$scope.$apply();
	}, 1000)
	
	})


function sortTable(oldIndex,newIndex){
	problems.splice(newIndex, 0,problems.splice(oldIndex, 1)[0]);
	for(var i = 0;i<problems.length;i++){
		problems[i].sort = i;
	}
}

function addProblem(index,problem){
	problems.splice(index, 0,problem);
	for(var i = 0;i<problems.length;i++){
		problems[i].sort = i;
	}
}


function getData(){

alert(JSON.stringify(qnObj));

}

function getProblems(){

return JSON.stringify(problems);

}
function getQNObj(){

return JSON.stringify(qnObj);

}

function setProblemName(target){
	if($('#sort1').val() != -1){
problems[$('#sort1').val()].name = $(target).html();
}else{
	qnObj.title = $(target).html();
	}
}

function setOptionName(target){
problems[$('#sort1').val()].options[$('#sort2').val()].name = $(target).html();
}


function upOption(){
	var sort2 = $('#sort2').val();
	 var sort1 = $('#sort1').val();
	if(sort2 != 0){
		sortOption(sort2-1,sort2);
		$('#sort2').val(sort2-1);
		var optionNameEdit = $('#optionNameEdit');
	  optionNameEdit.css("left",$('#optionName_'+sort1+'_'+(sort2-1)).offset().left);
		optionNameEdit.css("top",$('#optionName_'+sort1+'_'+(sort2-1)).offset().top);
	}
}

function downOption(){
	 var sort1 = $('#sort1').val();
	var sort2 = $('#sort2').val();
	if(sort2 != problems[sort1].options.length){
		sortOption(sort2+1,sort2);
		$('#sort2').val(sort2+1);
		var optionNameEdit = $('#optionNameEdit');
	  optionNameEdit.css("left",$('#optionName_'+sort1+'_'+(sort2+1)).offset().left);
		optionNameEdit.css("top",$('#optionName_'+sort1+'_'+(sort2+1)).offset().top);
	}
}

function deleteOption(){
	 var sort1 = $('#sort1').val();
 	 var sort2 = $('#sort2').val();
	
	problems[sort1].options.splice(sort2,1);
	
	for(var i = 0;i<problems[sort1].options.length;i++){
		problems[sort1].options[i].sort = i;
	}
	
	
	 setTimeout(function() {
		$('#optionNameEdit').hide();
	}, 100)
	
	
}

function sortOption(newIndex,oldIndex){
	 var sort1 = $('#sort1').val();
 	 var sort2 = $('#sort2').val();
	
	problems[sort1].options.splice(newIndex, 0,problems[sort1].options.splice(oldIndex, 1)[0]);
	for(var i = 0;i<problems[sort1].options.length;i++){
		problems[sort1].options[i].sort = i;
	}
}

