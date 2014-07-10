/**
 * Created by gc on 2014/7/7.
 */

var questions = new Array();
var questionTitle = '';

var anListModule = angular.module('qnList', []);

anListModule.service('qnService',['$http',function($http){
    this.query =  function(){
            return $http({method:"get",url:"qnList.json"});

    }
}])


anListModule .controller('qnListContr', function ($scope,qnService) {
        qnService.query().success(function(data,status ){
            $scope.questions = data.data;
        })


        $scope.questionTitle = questionTitle;



        /* 新建问卷 */
        $scope.addQuesttion = function () {

            $scope.questions.push({id: ($scope.questions.length+1), sort: ($scope.questions.length), name: $scope.questionTitle, state: '1', createDate: new Date().format('yyyy-MM-dd')});

            $scope.questionTitle = "";


        }
        /* 删除问卷 */
        $scope.deleteQuestion = function (sort) {

            $scope.questions.splice(sort, 1);

            updateSort($scope.questions);

        }
        /* 更改状态 */
        $scope.changeState = function (sort) {
            alert('第' + ( sort + 1 ) + '行状态已更改');

        }
        $scope.validate = function (validate) {

            if(!validate){
                $('#modal-body').addClass('has-error');
                $('#titleMsg').removeClass('sr-only');
                $('#saveBtn').removeAttr('data-dismiss');
                return false;
            }else{
                $('#modal-body').removeClass('has-error');
                $('#titleMsg').addClass('sr-only');
                $scope.addQuesttion();
                $('#saveBtn').attr('data-dismiss','modal');
                return true;
            }
        }


    });


function updateSort(questions){

    for(var i = 0;i < questions.length;i++){
        questions[i].sort = i;
    }

}
