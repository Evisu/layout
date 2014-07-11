
var problems = new Array();
var qnObj = {};
var curProblem = new Array();
var page = 1;
var qindex = 0;

angular.module('qn', [])
.controller('questionnaire',function($scope){
//     problems = eval(opener.getProblems().replace(/\$/g,''));
    curProblem = eval(opener.getProblems().replace(/\$/g,''));


    qnObj = eval("("+opener.getQNObj().replace(/\$/g,'')+")");

    $scope.qnObj = qnObj;

    $scope.problems = problems;


    /**
     * 重置单选题选项的值
     * @param sort1
     * @param sort2
     */
    $scope.reset = function(sort1,sort2){

        $scope.problems[sort1].options[sort2].checked = true;
        for(var i = 0;i < $scope.problems[sort1].options.length;i++){
            if(i != sort2){
                $scope.problems[sort1].options[i].checked = false;
            }
        }

    }

    /**
     *  下一步
     */
    $scope.next = function(){
        $scope.problems.length = 0;
        for(var i = qindex;i < curProblem.length;i++){
            $scope.problems.push(curProblem[i]);
            if(curProblem[i].problemType == 'paging'){
                qindex = i+1;
                page++;
                break;
            }
        }


    }

        $scope.next();

});

function getData(){

    alert(JSON.stringify(curProblem));

}







