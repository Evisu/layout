
var qnObj = {};
var problems = new Array();
qnObj = {id:'1',title:'调查对象与参与人关系维护',problems:problems};


//定义qn模块，并把控制器函数questionnaire传递给controller控制器
angular.module('qn', [])
    .controller('questionnaire',function($scope){
        $scope.problems = problems;
        $scope.qnObj = qnObj;

        initData($scope.problems);

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
        //上移调查对象
        $scope.upProblem = function(sort1){
            if(sort1 != 0){
                sortTable(sort1-1,sort1);
            }
        }
        //下移调查对象
        $scope.downProblem = function(sort1){
            if(sort1 != $scope.problems.length-1){
                sortTable(sort1+1,sort1);
            }
        }

        //显示或隐藏删除参与人按钮
        $scope.showDel = function(sort1,sort2){
            if( $('#del'+sort1+'_'+sort2).attr('style').indexOf('block') > 0){
                $('#del'+sort1+'_'+sort2).attr('style','display:none');
            }else{
                $('#del'+sort1+'_'+sort2).attr('style','display:block');
            }

            //隐藏其他调查对象的参与人删除项
            for(var i = 0 ; i <  problems.length;i++){
                if(i != sort1){
                    if(problems[i].options){
                        for(var j = 0 ; j < problems[i].options.length; j++){
                            if( $('#del'+i+'_'+j).attr('style').indexOf('block') > 0){
                                $('#del'+i+'_'+j).attr('style','display:none');
                            }
                        }
                    }
                }
            }

            $('#sort1').val(sort1);
            $('#sort2').val(sort2);
        }


        setInterval(function() {
            $scope.$apply();
            initContainer();
        }, 1000)

    })

function initData(problems){
    problems.length = 0;

    //初始化数据

    $('.topic_type[problemType="respondent"]').each(function(index,element){

        var options = new Array();

        $('.topic_type[problemType="partic"]').each(function(sort,element){
            options.push({id:$(this).attr('particId'),name:$(this).attr('particName'),sort:sort,type:$(this).attr('problemType')});
        });

        problems.push({id:$(this).attr('respondentId'),name:$(this).attr('respondentName'),sort:index,type:$(this).attr('problemType'),options:options});

    });
}


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
    for(var i = 0;i<problems.length;i++){
        if(problems[i].id == problem.id){
            alert('不能重复添加');
            return false;
        }
    }
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

    for(var i = 0;i<problems[sort1].options.length;i++){
        if(problems[sort1].options[i].id == id){
            alert('不能重复添加');
            return false;
        }
    }

    problems[sort1].options.push({id:id,name:name,sort:sort2});

    for(var i = 0;i<problems[sort1].options.length;i++){
        problems[sort1].options[i].sort = i;
    }
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

/**
 * 删除某个参与人
 */
function deleteOption(){
    var sort1 = $('#sort1').val();
    var sort2 = $('#sort2').val();
    if(sort2){

        problems[sort1].options.splice(sort2,1);

        for(var i = 0;i<problems[sort1].options.length;i++){
            problems[sort1].options[i].sort = i;
        }
    }
}

/**
 * 删除多个参与人
 */
function deleteOptions(){
    var sort1 = $('#sort1').val();
    if(sort1){
        var length = problems[sort1].options.length;
        for(var i = 0 ; i < length;i++){
            if( $('#del'+sort1+'_'+i).attr('style').indexOf('block') != -1){
                for(var j = 0 ; j < problems[sort1].options.length;j++){
                    if(problems[sort1].options[j].sort == i){
                        problems[sort1].options.splice(j,1);
                    }
                }
            }
        }
        for(var i = 0;i<problems[sort1].options.length;i++){
            problems[sort1].options[i].sort = i;
        }
    }
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
                addProblem(index,{id:respondentId,name:respondentName,sort:index,type:'respondent'});
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
            //t.helper表示当前被拖放的元素的JQuery对象
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

