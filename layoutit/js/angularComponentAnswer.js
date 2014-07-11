
var problems = new Array();
var qnObj = {};
var curProblem = new Array();
var page = 1;
var qindex = 0;

var answerModule = angular.module('qn', []);

answerModule.service('answerService',['$http',function($http){
    this.query =  function(params){
        return $http({method:"get",url:"answerQn.json",params:params});
    }
}])

answerModule.controller('questionnaire',['$scope','answerService',function($scope,answerService){

    answerService.query().success(function(data,status ){
        $scope.qnObj = data;
        problems = data.problems;
        qnObj = data;
        $scope.labels = data.labels;

        curProblem = data.problems;
        $scope.next();
    })





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

    /**
     * 填空题设置checked
     */
        $scope.setCheckedToText = function(sort1,sort2){
            if(!$scope.problems[sort1].options[sort2].inputValue){
                $scope.problems[sort1].options[sort2].checked = false;
            }else{
                $scope.problems[sort1].options[sort2].checked = true;
            }

        }
    }]);

function getData(){

    alert(JSON.stringify(curProblem));

}







/**
 * Created by Administrator on 2014/7/11.
 */
