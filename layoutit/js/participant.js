
var qnObj = {};
var problems = new Array();
qnObj = {id:'1',title:'2014山东检验检疫局调查问卷',problems:problems};




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
}


angular.module('qn', ['contenteditable'])
    .controller('questionnaire',function($scope){
        $scope.problems = problems;
        $scope.qnObj = qnObj;


        $scope.problems.push({name:'青岛局',sort:0,type:'radio',options:[{name:'11',sort:1}]});
        $scope.problems.push({name:'烟台局',sort:1,type:'checkbox',options:[]});
        $scope.problems.push({name:'荣成局',sort:2,type:'completion',options:[]});




        $scope.addOption = function(sort1){
            $scope.problems[sort1].options.push({name:'选项'+($scope.problems[sort1].options.length+1),sort:($scope.problems[sort1].options.length)});
        }
        $scope.removeOption = function(sort1,sort2){
            $scope.problems[sort1].options.splice(sort2,1);
        }

        $scope.removeProblem = function(sort1){
            $scope.problems.splice(sort1,1);
        }

        $scope.upProblem = function(sort1){
            if(sort1 != 0){
                sortTable(sort1-1,sort1);
            }
        }

        $scope.downProblem = function(sort1){
            if(sort1 != $scope.problems.length-1){
                sortTable(sort1+1,sort1);
            }
        }

        $scope.problemNameEditShow = function(sort1){
            $('#sort1').val(sort1);
            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].name);
            problemNameEdit.css("left",$('#problemName'+sort1).offset().left);
            problemNameEdit.css("top",$('#problemName'+sort1).offset().top);
            problemNameEdit.show();
            problemNameEdit.find('.add_edit')[0].focus();
            var optionNameEdit = $('#optionNameEdit');
            optionNameEdit.hide();
        }


        $scope.optionNameEditShow = function(sort1,sort2){
            $('#sort1').val(sort1);
            $('#sort2').val(sort2);
            var optionNameEdit = $('#optionNameEdit');

            optionNameEdit.find('div[contenteditable="true"]').html($scope.problems[sort1].options[sort2].name);
            optionNameEdit.css("left",$('#optionName_'+sort1+'_'+sort2).offset().left);
            optionNameEdit.css("top",$('#optionName_'+sort1+'_'+sort2).offset().top);
            optionNameEdit.show();
            optionNameEdit.find('.add_edit')[0].focus();

            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.hide();

            $('.fast_machine').show();

        }



        $scope.titleEditShow = function(){
            $('#sort1').val(-1);
            var problemNameEdit = $('#problemNameEdit');
            problemNameEdit.find('div[contenteditable="true"]').html($scope.qnObj.title);
            problemNameEdit.css("left",$('#titleEdit').offset().left);
            problemNameEdit.css("top",$('#titleEdit').offset().top);
            problemNameEdit.show();
            problemNameEdit.find('.add_edit')[0].focus();
            var optionNameEdit = $('#optionNameEdit');
            optionNameEdit.hide();
        }

        setInterval(function() {
            $scope.$apply();
        }, 1000)

    })


function sortTable(oldIndex,newIndex){
    problems.splice(newIndex, 0,problems.splice(oldIndex, 1)[0]);
    for(var i = 0;i<problems.length;i++){
        problems[i].sort = i;
    }
}

function addProblem(index,problem){
    problems.splice(index, 0,problem);
    for(var i = 0;i<problems.length;i++){
        problems[i].sort = i;
    }
}

function addOption(sort1){

    problems[sort1].options.push({name:'张三'+(problems[sort1].options.length+1),sort:(problems[sort1].options.length)});


}


function getData(){

    alert(JSON.stringify(qnObj));

}

function getProblems(){

    return JSON.stringify(problems);

}

function setProblemName(target){
    if($('#sort1').val() != -1){
        problems[$('#sort1').val()].name = $(target).html();
    }else{
        qnObj.title = $(target).html();
    }
}

function setOptionName(target){
    problems[$('#sort1').val()].options[$('#sort2').val()].name = $(target).html();
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
$(document).ready(function() {
    $(".ul-tool .ui-draggable").draggable({
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
                $(this).parent().remove();
                if(type == 'radio'){
                    addProblem(index,{name:'青岛局',sort:index,type:'radio',options:[]});
                }else if(type == 'checkbox'){
                    addProblem(index,{name:'烟台局',sort:index,type:'checkbox',options:[]});
                }else if(type == 'completion'){
                    addProblem(index,{name:'荣成局',sort:index,type:'completion',options:[]});
                }else{
                    addOption(index);

                }
            });
        }
    });

    $(".ul-tool .ui-draggable1").draggable({
        connectToSortable: ".unstyled",
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
                $(this).parent().remove();
                if(type == 'radio'){
                    addProblem(index,{name:'青岛局',sort:index,type:'radio',options:[]});
                }else if(type == 'checkbox'){
                    addProblem(index,{name:'烟台局',sort:index,type:'checkbox',options:[]});
                }else if(type == 'completion'){
                    addProblem(index,{name:'荣成局',sort:index,type:'completion',options:[]});
                }else{
                    addOption(index);

                }
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

    $(document).bind('click',function(){
        $("#problemNameEdit").hide();
        $("#optionNameEdit").hide();
        $('.menu_edit').hide();
    });

    $('.T_edit,.T_edit_min,.min_an').bind('click',function(e){

        stopPropagation(e);
    });


    $('.Drag_area,.max_an').bind('click',function(e){
        stopPropagation(e);
    });





})

