/**
 * Created by Administrator on 2014/7/24.
 */



!function ($) {

    var employeeWindow = function(element,options){
        this.element = $(element);
        this.container = options.container || 'body';
        this.format =  this.element.data('date-format');
        this.filter = options.filter;
    }

}(window.jQuery);

