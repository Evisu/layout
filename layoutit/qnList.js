/**
 * Created by gc on 2014/7/7.
 */

var questions = new Array();
var questionTitle = '';

angular.module('qnList', [])
    .controller('qnListContr', function ($scope) {

        $scope.questions = questions;
        $scope.questionTitle = questionTitle;

        $scope.questions.push({id: 1, sort: 0, name: '巴西世界杯调查问卷', state: '1', createDate: '2014-07-07'});
        $scope.questions.push({id: 2, sort: 1, name: '居民生活质量调查', state: '2', createDate: '2014-07-09'});

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


$(document).ready(function () {



});