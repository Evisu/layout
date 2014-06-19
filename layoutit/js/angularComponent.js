

var problems = new Array();





function questionnaire($scope){
	$scope.problems = problems;
	
	$scope.problems.push({name:'题目1',sort:0,type:'radio',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
	$scope.problems.push({name:'题目2',sort:1,type:'checkbox',options:[{name:'选项1',sort:0},{name:'选项2',sort:1}]});
	$scope.problems.push({name:'题目2',sort:2,type:'completion',options:[{name:'',sort:0,isInput:true}]});
	
	$scope.addOption = function(sort1){
	$scope.problems[sort1].options.push({name:'选项'+($scope.problems[sort1].options.length+1),sort:($scope.problems[sort1].options.length)}); 
 }
  $scope.removeOption = function(sort1,sort2){
	$scope.problems[sort1].options.splice(sort2,1); 
 }
 
 $scope.removeProblem = function(sort1){
	$scope.problems.splice(sort1,1); 
 }
 
 setInterval(function() {
		$scope.$apply();
	}, 1000)
}

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


function getDataProblems(){

alert(JSON.stringify(problems));

}
