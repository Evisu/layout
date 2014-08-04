/**
 * Created by Administrator on 2014/7/24.
 * {"id":'orgUnitWindow',"callBack":"setIds","filedIdValue":$scope.ids,"singleSelected":true}
 */
var  orgUnitWindowModule = angular.module("orgUnitWindowModule",[]);




orgUnitWindowModule.directive('orgunitwindow',function(){
    return {
        restrict : 'E',
        templateUrl : 'selectOrgUnit.html',
        replace : true,
        scope : {option:'='},
        link : function(scope,iElement){
            scope.checkItems = new Array();
            scope.orgUnits = [{"id" : "1","name" : "北京"},{"id" : "2","name" : "天津"}];
            $(document).on('mousedown', function (e) {
                // Clicked outside the datetimepicker, hide it
                if ($(e.target).closest('.orgUnitWindow').length === 0) {
                    $(iElement).hide();
                }
            });
            /**
             * 条目复选框选择
             * @param id
             */
            scope.clickItem = function (id){
                if(scope.option.singleSelected){
                    scope.singleSelected(id);
                }
                scope.re();
            }

            /**
             * 全部复选框选择
             * @param id
             */
            scope.selectAllClick = function (){
                for(var i = 0;i<scope.orgUnits.length;i++){
                    scope.orgUnits[i].checked =  scope.selectAll;
                }
                scope.re();

            }
            /**
             * 单选清除
             * @param id
             */
            scope.singleSelected = function(id){
                for(var i = 0;i<scope.orgUnits.length;i++) {
                    if(id != scope.orgUnits[i].id){
                        scope.orgUnits[i].checked = false;
                    }
                }
            }
            /**
             * 刷新数据
             */
            scope.re = function(){
                var flag = false;
                for(var i = 0;i<scope.orgUnits.length;i++) {
                    flag = true;
                    for(var j = 0;j<scope.checkItems.length;j++){
                        if(scope.orgUnits[i].id == scope.checkItems[j].id){
                            flag = false;
                            if(!scope.orgUnits[i].checked){
                                  scope.checkItems.splice(j,1);
                                break;
                            }
                        }

                    }
                    if(flag && scope.orgUnits[i].checked){
                        scope.checkItems.push(scope.orgUnits[i]);
                    }


                }
                eval('scope.$parent.'+scope.option.callBack+'(scope.checkItems)');
            }
        }
    };
})




function showOrgUnitWindow(id,element){
    var divShow = $("#"+id);
    var eOff = $(element).offset();
    var left = eOff.left;
    divShow.top =  eOff.top;
    if(left + divShow.outerWidth()> document.body.clientWidth){
        left = document.body.clientWidth-divShow.outerWidth();
    }
    divShow.css({
        top:top,
        left:left
    });
    divShow.show();
}


