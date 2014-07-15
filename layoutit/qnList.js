/**
 * Created by gc on 2014/7/7.
 */

var questions = new Array();
var questionTitle = '';

var qnListModule = angular.module('qnList', []);

qnListModule.service('qnService',['$http',function($http){
    this.query =  function(){
            return $http({method:"get",url:"qnList.json"});

    }
}])




qnListModule .controller('qnListContr', function ($scope,qnService) {
    qnService.query().success(function(data,status ){
            questions = data.data;
            $scope.questions = data.data;

            webPage.initWebPage({data:data});

            $scope.webPage = webPage;

            $scope.loadData();
        })

        $scope.questionTitle = questionTitle;
        $scope.queryState = "";


        /* 改变分页最大记录数 */
        $scope.changePage = function(){
            $scope.webPage.curPage = 1;
            $scope.webPage.initWebPage();
            $scope.loadData();
        }

        /* 加载数据 */
        $scope.loadData = function(){
            $scope.questions = questions.concat().splice($scope.webPage.curPage * $scope.webPage.limit- $scope.webPage.limit, $scope.webPage.limit);
        }
        /* 按状态查询 */
        $scope.queryStateFn = function(state){
            if(!state)
                $scope.queryState = "";
            else
                $scope.queryState = state;
        }

        /* 下一页 */
        $scope.nextPage = function(){
            if(($scope.webPage.curPage + 1)  <= $scope.webPage.pageTotal.length){
                $scope.webPage.curPage =  $scope.webPage.curPage + 1;
            }
            $scope.loadData();
        }

        /* 上一页 */
        $scope.lastPage = function(){
            if(($scope.webPage.curPage - 1)  >= 1){
                $scope.webPage.curPage =  $scope.webPage.curPage -1;
            }
            $scope.loadData();
        }

        /* 当前页 */
        $scope.clickPage = function(page){
            $scope.webPage.curPage =  page;
            $scope.loadData();

        }

        /* 新建问卷 */
        $scope.addQuesttion = function () {

            $scope.questions.push({id: ($scope.questions.length+1), sort: ($scope.questions.length), title: $scope.questionTitle, state: '1', createDate: new Date().format('yyyy-MM-dd')});

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

$(document).ready(function() {



})
