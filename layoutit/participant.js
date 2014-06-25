
var qnObj = {};
var problems = new Array();
qnObj = {id:'1',title:'调查对象与参与人关系维护',problems:problems};


//定义qn模块，并把控制器函数questionnaire传递给controller控制器
angular.module('qn', [])
    .controller('questionnaire',function($scope){
        $scope.problems = problems;
        $scope.qnObj = qnObj;

        //默认加载三条数据
        var options = new Array();
        for(var i = 0;i < 50;i++){
            options.push({name:'郑成功',sort:i});
        }
        $scope.problems.push({name:'青岛局',sort:0,type:'respondent',options:options});
        $scope.problems.push({name:'烟台局',sort:1,type:'respondent'});
        $scope.problems.push({name:'荣成局',sort:2,type:'respondent'});




        $scope.addOption = function(sort1){
            $scope.problems[sort1].options.push({name:'选项'+($scope.problems[sort1].options.length+1),sort:($scope.problems[sort1].options.length)});
        }
        //删除参与人
        $scope.removeOption = function(sort1,sort2){
            $scope.problems[sort1].options.splice(sort2,1);
        }
        //删除调查对象
        $scope.removeProblem = function(sort1){
            $scope.problems.splice(sort1,1);
            for(var i = 0;i< $scope.problems.length;i++){
                problems[i].sort = i;
            }
        }
        //向上移动调查对象
        $scope.upProblem = function(sort1){
            if(sort1 != 0){
                sortTable(sort1-1,sort1);
            }
        }
        //向下移动调查对象
        $scope.downProblem = function(sort1){
            if(sort1 != $scope.problems.length-1){
                sortTable(sort1+1,sort1);
            }
        }


        setInterval(function() {
            $scope.$apply();
            initContainer();
        }, 1000)

    })

//调查对象排序
function sortTable(oldIndex,newIndex){
    problems.splice(newIndex, 0,problems.splice(oldIndex, 1)[0]);
    for(var i = 0;i<problems.length;i++){
        problems[i].sort = i;
    }
}

/**
 * 添加调查对象
 * 索引
 * 调查对象
 */
function addProblem(index,problem){
    problems.splice(index, 0,problem);
    for(var i = 0;i<problems.length;i++){
        problems[i].sort = i;
    }
}

/**
 * 添加参与人
 * sort1 调查对象的索引
 * sort2 参与人的索引
 * id 参与人的id
 * name 参与人的名称
 */
function addOption(sort1,sort2,id,name){
    if(!problems[sort1].options){
        problems[sort1].options = new Array();
    }
    problems[sort1].options.push({name:name,sort:sort2});
}


function getData(){

    alert(JSON.stringify(qnObj));

}

function getProblems(){

    return JSON.stringify(problems);

}


function upOption(){
    var sort2 = $('#sort2').val();
    var sort1 = $('#sort1').val();
    if(sort2 != 0){
        sortOption(sort2-1,sort2);
        $('#sort2').val(sort2-1);
        var optionNameEdit = $('#optionNameEdit');
        optionNameEdit.css("left",$('#optionName_'+sort1+'_'+(sort2-1)).offset().left);
        optionNameEdit.css("top",$('#optionName_'+sort1+'_'+(sort2-1)).offset().top);
    }
}

function downOption(){
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();
    if(sort2 != problems[sort1].options.length){
        sortOption(sort2+1,sort2);
        $('#sort2').val(sort2+1);
        var optionNameEdit = $('#optionNameEdit');
        optionNameEdit.css("left",$('#optionName_'+sort1+'_'+(sort2+1)).offset().left);
        optionNameEdit.css("top",$('#optionName_'+sort1+'_'+(sort2+1)).offset().top);
    }
}

function deleteOption(){
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();

    problems[sort1].options.splice(sort2,1);

    for(var i = 0;i<problems[sort1].options.length;i++){
        problems[sort1].options[i].sort = i;
    }


    setTimeout(function() {
        $('#optionNameEdit').hide();
    }, 100)


}

function sortOption(newIndex,oldIndex){
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();

    problems[sort1].options.splice(newIndex, 0,problems[sort1].options.splice(oldIndex, 1)[0]);
    for(var i = 0;i<problems[sort1].options.length;i++){
        problems[sort1].options[i].sort = i;
    }
}

/*******************************************************************************************/
/**
 * 注册事件
 */
function initContainer(){
    $(".dragwen").sortable({
        connectWith: ".dragwen",
        opacity: .35,
        start: function(e,t) {
            t.item.oldIndex = t.item.index();
        },
        stop: function(e,t) {
            var flag = true;
            $('.topic_type[name="curProblem"]').each(function(){
                flag = false;
                $(this).attr("dragIndex",t.item.index());
            });
            if(flag){
                sortTable(t.item.oldIndex,t.item.index());
            }
        }
    });

    $(".unstyled").sortable({
        connectWith: ".unstyled",
        dropOnEmpty:false,
        opacity: .35,
        start: function(e,t) {
            t.item.oldIndex = t.item.index();
        },
        stop: function(e,t) {
            var flag = true;
            $('.topic_type[name="curParticipant"]').each(function(){
                flag = false;
                $(this).attr("dragIndex",t.item.index());
            });
            $('#sort1').val($(this).attr('sort1'));
            if(flag){
                sortOption(t.item.index(),t.item.oldIndex);
            }
        }
    });
}

$(document).ready(function() {
    $("#respondentUL li").draggable({
        connectToSortable: ".dragwen",
        helper: "clone",
        start: function(e,t) {
            t.helper.find('a').each(function(){
                $(this).remove();
            })


            $(this).find('.topic_type').attr('name','curProblem');

        },
        drag: function(e, t) {
            t.helper.width(400);
        },
        stop: function() {
            $(this).find('.topic_type').attr('name','');
            $('.topic_type[name="curProblem"]').each(function(){
                var index = $(this).attr("dragIndex");
                var type = $(this).attr("problemType");
                var respondentId = $(this).attr("respondentId");
                var respondentName = $(this).attr("respondentName");
                $(this).parent().remove();
                addProblem(index,{name:respondentName,sort:index,type:'respondent'});
            });
        }
    });

    $("#particUL li").draggable({
        connectToSortable: ".unstyled",
        scroll: true,
        helper: "clone",
        start: function(e,t) {
            t.helper.find('a').each(function(){
                $(this).remove();
            })

            $(this).find('.topic_type').attr('name','curParticipant');

        },
        drag: function(e, t) {
            t.helper.width(100);
        },
        stop: function() {
            $(this).find('.topic_type').attr('name','');
            $('.topic_type[name="curParticipant"]').each(function(){
                //参与人的索引
                var index = $(this).attr("dragIndex");
                var type = $(this).attr("problemType");
                var particId = $(this).attr("particId");
                var particName = $(this).attr("particName");
                //调查对象的索引
                var sort1 =$('#sort1').val();

                $(this).parent().remove();
                addOption(sort1,index,particId,particName);
            });
        }
    });



    initContainer();


    $(".SeniorEdit[href='#editorModal']").click(function() {
        var sort1 = $('#sort1').val();
        if(sort1 != -1){
            contenthandle.setData(problems[sort1].name);
        }else{
            contenthandle.setData(qnObj.title);
        }

    });


    $("#savecontent").click(function() {
        var sort1 = $('#sort1').val();

        if(sort1 != -1){
            problems[sort1].name = contenthandle.getData();
        }else{
            alert(contenthandle.getData());
            qnObj.title = contenthandle.getData();

        }

    });




})

