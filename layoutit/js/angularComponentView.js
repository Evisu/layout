









var problems = new Array();

angular.module('qn', ['contenteditable'])
.controller('questionnaire',function($scope){

	$scope.problems = eval(opener.getProblems().replace(/\$/g,''));
	
	
	})






