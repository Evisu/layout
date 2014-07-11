var qnObj = {};
var problems = new Array();

var qnModule = angular.module('qn', ['contenteditable']);
/**
 * 问卷设计服务
 */
qnModule.service('qnService',['$http',function($http){
    this.query =  function(params){
        return $http({method:"get",url:"qn.json",params:params});
    }
}])

/**
 * 问卷设计控制器
 */
 qnModule.controller('questionnaire',['$scope','qnService', function ($scope,qnService) {
    qnService.query().success(function(data,status ){
                $scope.qnObj = data;
                $scope.problems = data.problems;
                problems = data.problems;
                qnObj = data;
    })
    $scope.problemTypes = problemTypes;


     /**
      * 添加选项
      * @param sort1
      */
        $scope.addOption = function (sort1) {
            $scope.problems[sort1].options.push({ "qsOptionsId" : "","optionName" : "选项" + ($scope.problems[sort1].options.length + 1),"isInput" : false,"problemId" : "1",
                "orderNum" : ($scope.problems[sort1].options.length)
            });
        }

     /**
      * 移除选项
      * @param sort1
      * @param sort2
      */
        $scope.removeOption = function (sort1, sort2) {
            $scope.problems[sort1].options.splice(sort2, 1);
            updatOptionSort($scope.problems[sort1].options);
        }

     /**
      * 移除题目
      * @param sort1
      */
        $scope.removeProblem = function (sort1) {
            $scope.problems.splice(sort1, 1);
            updateProblemSort($scope.problems);
        }

     /**
      * 上移题目
      * @param sort1
      */
        $scope.upProblem = function (sort1) {
            if (sort1 != 0) {
                sortTable(sort1 - 1, sort1);
            }
        }

     /**
      * 下移题目
      * @param sort1
      */
        $scope.downProblem = function (sort1) {
            if (sort1 != $scope.problems.length - 1) {
                sortTable(sort1 + 1, sort1);
            }
        }

     /**
      * 题目主题编辑
      * @param sort1
      */
        $scope.problemNameEditShow = function (sort1) {
            $('#sort1').val(sort1);
            $('#sort2').val(-1);
            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].title);
            problemNameEdit.css("left", $('#problemName' + sort1).offset().left);
            problemNameEdit.css("top", $('#problemName' + sort1).offset().top);
            problemNameEdit.show();
            problemNameEdit.find('.add_edit')[0].focus();
            editDiv(false);
            var optionNameEdit = $('#optionNameEdit');
            optionNameEdit.hide();
        }

     /**
      * 选项名编辑
      * @param sort1
      */
        $scope.optionNameEditShow = function (sort1, sort2) {
            $('#sort1').val(sort1);
            $('#sort2').val(sort2);
            var optionNameEdit = $('#optionNameEdit');

            optionNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].options[sort2].optionName);
            optionNameEdit.css("left", $('#optionName_' + sort1 + '_' + sort2).offset().left);
            optionNameEdit.css("top", $('#optionName_' + sort1 + '_' + sort2).offset().top);
            optionNameEdit.show();
            optionNameEdit.find('.add_edit')[0].focus();

            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.hide();

            editDiv(false);

        }


        $scope.titleEditShow = function () {
            $('#sort1').val(-1);
            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.find('div[contenteditable="true"]').html($scope.qnObj.title);
            problemNameEdit.css("left", $('#titleEdit').offset().left);
            problemNameEdit.css("top", $('#titleEdit').offset().top);
            problemNameEdit.show();
            problemNameEdit.find('.add_edit')[0].focus();
            $('.menu_edit').hide();
            var optionNameEdit = $('#optionNameEdit');
            optionNameEdit.hide();
        }

        $scope.textOptionShow = function (sort1,sort2){
         $('#sort1').val(sort1);
         $('#sort2').val(sort2);
         $('#text_row').val(problems[sort1].options[sort2].height);
         $('#text_col').val(problems[sort1].options[sort2].width);
     }

        setInterval(function () {
            $scope.$apply();
        }, 1000)

    }])

/**
 * 题目排序
 * @param oldIndex
 * @param newIndex
 */
function sortTable(oldIndex, newIndex) {
    problems.splice(newIndex, 0, problems.splice(oldIndex, 1)[0]);
    updateProblemSort(problems);
}

/**
 * 添加题目
 * @param index
 * @param problem
 */
function addProblem(index, problem) {
    problems.splice(index, 0, problem);
    updateProblemSort(problems,true);
}

/**
 * 更新题目sort
 * @param problems
 * @param isAdd 是否是添加
 */
function updateProblemSort(problems,isAdd) {
    var index = 0;
    var problemNum = 1;
    var pageNum = 1;
    var textNum = 1;
    for (var i = 0; i < problems.length; i++) {
        problems[i].orderNum = i;
        if(problems[i].problemType == 'paging'){
            problems[i].displayNum = pageNum;
            pageNum++;
        }else if(problems[i].problemType == 'text'){
            problems[i].displayNum = textNum;
            textNum++;
        }else{
            problems[i].displayNum = problemNum;
            problemNum++;
        }
    }
}

function setInputToModa(){
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();
    $('#isInputCheckBox').prop('checked',problems[sort1].options[sort2].isInput);

}

function getData() {

    alert(JSON.stringify(qnObj));

}

function getProblems() {

    return JSON.stringify(problems);

}
function getQNObj() {

    return JSON.stringify(qnObj);

}

/**
 * 设置题目名称
 * @param target
 */
function setProblemName(target) {
    if ($('#sort1').val() != -1) {
        problems[$('#sort1').val()].title = $(target).html();
    } else {
        qnObj.title = $(target).html();
    }
}

/**
 * 设置选项名称
 * @param target
 */
function setOptionName(target) {
    if($(target).html()){
        problems[$('#sort1').val()].options[$('#sort2').val()].optionName = $(target).html();
    }else{
        problems[$('#sort1').val()].options.splice($('#sort2').val(), 1);
        updateOptionSort(problems[$('#sort1').val()].options);
    }

}

/**
 * 上移选项
 */
function upOption() {
    var sort2 = $('#sort2').val();
    var sort1 = $('#sort1').val();
    if (sort2 != 0) {
        sortOption(sort2 - 1, sort2);
        $('#sort2').val(sort2 - 1);
        var optionNameEdit = $('#optionNameEdit');
        optionNameEdit.css("left", $('#optionName_' + sort1 + '_' + (sort2 - 1)).offset().left);
        optionNameEdit.css("top", $('#optionName_' + sort1 + '_' + (sort2 - 1)).offset().top);
    }
}

/**
 * 下移选项
 */
function downOption() {
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();
    if (sort2 != problems[sort1].options.length) {
        sortOption(sort2 + 1, sort2);
        $('#sort2').val(sort2 + 1);
        var optionNameEdit = $('#optionNameEdit');
        optionNameEdit.css("left", $('#optionName_' + sort1 + '_' + (sort2 + 1)).offset().left);
        optionNameEdit.css("top", $('#optionName_' + sort1 + '_' + (sort2 + 1)).offset().top);
    }
}

/**
 * 删除选项
 */
function deleteOption() {
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();
    problems[sort1].options.splice(sort2, 1);

    updateOptionSort(problems[sort1].options);

    setTimeout(function () {
        $('#optionNameEdit').hide();
    }, 100)


}

/**
 * 选项排序
 * @param newIndex
 * @param oldIndex
 */
function sortOption(newIndex, oldIndex) {
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();

    problems[sort1].options.splice(newIndex, 0, problems[sort1].options.splice(oldIndex, 1)[0]);
    updateOptionSort(problems[sort1].options);
}

/**
 * 更新选项sort
 * @param options
 */
function updateOptionSort(options) {
    for (var i = 0; i < options.length; i++) {
        options[i].orderNum = i;
    }
}

