var qnObj = {};
var problems = new Array();
qnObj = {id: '1', title: '2014年巴西世界杯调查问卷',pages:1, problems: problems};


angular.module('qn', ['contenteditable'])
    .controller('questionnaire', function ($scope) {
        $scope.problems = problems;
        $scope.qnObj = qnObj;
        $scope.problemTypes = problemTypes;

        $scope.problems.push({name: '您在看2014年巴西世界杯吗？', sort: 0, type: 'radio', options: [
            {name: '看', sort: 0, value: true, inputValue: false},
            {name: '不看', sort: 1, value: true, inputValue: false}
        ]});
        $scope.problems.push({name: '您喜爱哪个球队？', sort: 1, type: 'checkbox', options: [
            {name: '巴西', sort: 0, inputValue: true},
            {name: '阿根廷', sort: 1, inputValue: true},
            {name: '荷兰', sort: 2, inputValue: true},
            {name: '德国', sort: 3, inputValue: true}
        ]});
        $scope.problems.push({name: '您认为哪个球队能夺得冠军,及为什么？', sort: 2, type: 'completion', options: [
            {inputValue: ''}
        ]});


        $scope.addOption = function (sort1) {
            $scope.problems[sort1].options.push({name: '选项' + ($scope.problems[sort1].options.length + 1), sort: ($scope.problems[sort1].options.length)});
        }
        $scope.removeOption = function (sort1, sort2) {
            $scope.problems[sort1].options.splice(sort2, 1);
        }

        $scope.removeProblem = function (sort1) {
            $scope.problems.splice(sort1, 1);
            updateProblemSort($scope.problems);
        }

        $scope.upProblem = function (sort1) {
            if (sort1 != 0) {
                sortTable(sort1 - 1, sort1);
            }
        }

        $scope.downProblem = function (sort1) {
            if (sort1 != $scope.problems.length - 1) {
                sortTable(sort1 + 1, sort1);
            }
        }

        $scope.problemNameEditShow = function (sort1) {
            $('#sort1').val(sort1);
            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].name);
            problemNameEdit.css("left", $('#problemName' + sort1).offset().left);
            problemNameEdit.css("top", $('#problemName' + sort1).offset().top);
            problemNameEdit.show();
            problemNameEdit.find('.add_edit')[0].focus();
            editDiv(false);
            var optionNameEdit = $('#optionNameEdit');
            optionNameEdit.hide();
        }


        $scope.optionNameEditShow = function (sort1, sort2) {
            $('#sort1').val(sort1);
            $('#sort2').val(sort2);
            var optionNameEdit = $('#optionNameEdit');

            optionNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].options[sort2].name);
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

        setInterval(function () {
            $scope.$apply();
        }, 1000)

    })

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
    for (var i = 0; i < problems.length; i++) {
        problems[i].sort = i;
        if(problems[i].type == 'paging'){
            qnObj.pages++;
            index++;
            problems[i].options[0].sort = index;
            if(isAdd){
                problems[i].options[0].total = $('.paging').length+1;
            }else{
                problems[i].options[0].total = $('.paging').length;
            }
        }
    }
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
        problems[$('#sort1').val()].name = $(target).html();
    } else {
        qnObj.title = $(target).html();
    }
}

/**
 * 设置选项名称
 * @param target
 */
function setOptionName(target) {
    problems[$('#sort1').val()].options[$('#sort2').val()].name = $(target).html();
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
        options[i].sort = i;
    }
}

