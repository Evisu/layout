

var  respondents = new Array();
var  participants = new Array();
//定义qn模块，并把控制器函数questionnaire传递给controller控制器
var participantModule = angular.module('qn', []);

participantModule.service("participantService",['$http',function($http){
    this.query =  function(params){
        return $http({method:"get",url:"participant.json",params:params});
    }
}])

participantModule.controller('questionnaire',['$scope','participantService',function($scope,participantService){
    participantService.query().success(function(data,status ){
        respondents = data.respondents;
        participants = data.participants;
        $scope.respondents = respondents;
        $scope.participants = participants;
        $scope.respondentParticipants = data.respondentParticipants;
        $scope.questionnaireId = data.questionnaireId;
       // setTimeout(initDrag, 1000);
    })

    /**
     * 设置参与对象
     */
    $scope.optionParticipant = function(respondentOrderNum){
        $("input[name='curParticipantCheck'][type='checkbox']").each(function(){
            $(this).prop('checked',false);
        })
       var curRespondent = $scope.respondents[respondentOrderNum];
        $scope.curRespondent = $scope.respondents[respondentOrderNum];
        for(var i = 0;i < $scope.respondentParticipants.length;i++){
            if(curRespondent.respondentId == $scope.respondentParticipants[i].respondentId){
                $("input[name='curParticipantCheck'][type='checkbox']"+"[value="+$scope.respondentParticipants[i].participantId+"]").prop('checked',true);
            }
        }
    }

    /**
     * 保存参与对象
     */
    $scope.saveParticipants = function (){

        var checkParticipants = new Array();
        $("input[name='curParticipantCheck'][type='checkbox']").each(function() {
            if ($(this).is(':checked')) {
                checkParticipants.push($(this).val() );
            }

        })
        var flag = false;
        for(var i = 0;i < $scope.respondentParticipants.length;i++){
            if($scope.curRespondent.respondentId == $scope.respondentParticipants[i].respondentId){
                flag = false;
               for(var j = 0; j < checkParticipants.length;j++){
                    if(checkParticipants[j] == $scope.respondentParticipants[i].participantId){
                        flag = true;
                        checkParticipants.splice(j, 1);
                        break;
                    }
               }
                if(!flag){
                    $scope.respondentParticipants.splice(i, 1);
                    i--;
                }
            }
        }
        for(var j = 0; j < checkParticipants.length;j++){
            $scope.respondentParticipants.push({
                    "relationId" : "",
                    "participantId" : checkParticipants[j],
                    "respondentId" : $scope.curRespondent.respondentId,
                    "questionnaireId" : $scope.curRespondent.questionnaireId
            })
        }
    }

    $scope.addRespondents = function(){
        $scope.respondents.push( {
            "respondentId" :  $scope.respondents.length,
            "objName" : $scope.addRespondentsText,
            "objId" :  $scope.respondents.length,
            "objType" :  $scope.objType,
            "questionnaireId" : $scope.questionnaireId,
            "orderNum" : $scope.respondents.length
        });

    }
        .

        setInterval(function() {
            $scope.$apply();
            initContainer();
        }, 1000)

    }])

function initData(){

    for(var k = 0;k < $scope.respondents.length;k++){
    var checkParticipants = new Array();
        var curRespondent = $scope.respondents[k];
    $("input[name='curParticipantCheck'][type='checkbox']").each(function() {
            checkParticipants.push($(this).val() );

    })
    var flag = false;
    for(var i = 0;i < $scope.respondentParticipants.length;i++){
        if(curRespondent.respondentId == $scope.respondentParticipants[i].respondentId){
            flag = false;
            for(var j = 0; j < checkParticipants.length;j++){
                if(checkParticipants[j] == $scope.respondentParticipants[i].participantId){
                    flag = true;
                    checkParticipants.splice(j, 1);
                    break;
                }
            }
            if(!flag){
                $scope.respondentParticipants.splice(i, 1);
                i--;
            }
        }
    }
    for(var j = 0; j < checkParticipants.length;j++){
        $scope.respondentParticipants.push({
            "relationId" : "",
            "participantId" : checkParticipants[j],
            "respondentId" : curRespondent.respondentId,
            "questionnaireId" : curRespondent.questionnaireId
        })
    }
    }
}


//调查对象排序
function sortTableRespondents(oldIndex,newIndex){
    respondents.splice(newIndex, 0,respondents.splice(oldIndex, 1)[0]);
    for(var i = 0;i<respondents.length;i++){
        respondents[i].orderNum = i;
    }
}

/**
 * 参与对象排序
 * @param oldIndex
 * @param newIndex
 */
function sortTableParticipants(oldIndex,newIndex){
    participants.splice(newIndex, 0,participants.splice(oldIndex, 1)[0]);
    for(var i = 0;i<respondents.length;i++){
        participants[i].orderNum = i;
    }
}



/*******************************************************************************************/
/**
 * 注册事件
 */
function initContainer(){
  /*  $(".dragwen").sortable({
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
*/

    $("#respondentUL").sortable({
        connectWith: "#respondentUL",
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
                sortTableRespondents(t.item.oldIndex,t.item.index());
            }
        }
    });

   $("#particUL").sortable({
        connectWith: "#particUL",
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
                sortTableParticipants(t.item.oldIndex,t.item.index());
            }
        }
    });
}

$(document).ready(function() {

    initContainer();

})


function initDrag(){

    /*$("#respondentUL .ui-draggable").draggable({
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

    $("#particUL .ui-draggable").draggable({
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
     */
}
