
var problems = new Array();
var qnObj = {};

angular.module('qn', [])
.controller('questionnaire',function($scope){
    problems = eval(opener.getProblems().replace(/\$/g,''));

    qnObj = eval("("+opener.getQNObj().replace(/\$/g,'')+")");

    $scope.qnObj = qnObj;

    $scope.problems = problems;

    $scope.reset = function(sort1,sort2){

        for(var i = 0;i < $scope.problems[sort1].options.length;i++){
            if(i != sort2){
                $scope.problems[sort1].options[i].inputValue = false;
            }
        }

    }


});

function getData(){

    alert(JSON.stringify(problems));

}







