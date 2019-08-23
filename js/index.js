var coolppt = {
    $wrapper: $('.wrapper'),
    $ppt: $('.ppt'),
    len: $('.ppt').length,
    nowIndex: 0,
    lastIndex: '',
    flag:true,
    pptTimer: undefined,
    init: function(){
        if(this.len>1){
            this.creatDom(this.len);
            this.bindEvent();
            this.autoPlay();
        }
    },
    creatDom: function(len){
        var strCircle = '';
        for(var i = 0; i<len;i++){
            if(i==0){
                strCircle += '<li class ="active"></li>';
            }else {
                strCircle += '<li></li>';
            }
        }
        strCircle = '<div class="circle-list"><ul>' + strCircle + '</ul></div>';
     
        this.$wrapper.append(strCircle);
        this.$wrapper.append('<div class="btn">\
        <div class="left-btn"></div>\
        <div class="right-btn"></div>\
        </div>');
    },
    bindEvent: function(){
        var _this = this;
        $('.left-btn').add($('.right-btn')).add($('.circle-list li')).on('click',function(){
            if($(this).attr('class') == 'left-btn'){
                _this.toolClickFunc('left');
            }else if($(this).attr('class') == 'right-btn'){
                _this.toolClickFunc('right');
            } else{
                var index = $(this).index();
                _this.toolClickFunc(index);
            }
           
        });
        this.$ppt.on('go',function(){
            $(this).fadeOut(300).find('p').animate({fontSize:'16px'});
        })
        this.$ppt.on('come',function(){
            $(this).delay(300).fadeIn(300)
                    .find('p').animate({fontSize:'20px'},function(){
                        _this.flag = true;
                    });
        })
    },
    getIndex: function(decrition){
        this.lastIndex = this.nowIndex;
        if(decrition == 'left' || decrition == 'right'){
            if(decrition == 'left'){
                this.nowIndex = this.nowIndex == 0? this.len-1:this.nowIndex-1;
            }else{
                this.nowIndex = this.nowIndex == this.len-1? 0:this.nowIndex+1;
            }
        }else{
            this.nowIndex = decrition;
        }

    },
    nowCircleStyle: function(index){
        $('.active').removeClass('active');
        $('.circle-list li').eq(index).addClass('active');
    },
    autoPlay: function(){
        var _this = this;
        clearTimeout(this.pptTimer);
        this.pptTimer = setTimeout(function(){
            _this.toolClickFunc('right');
        },3000);
    },
    toolClickFunc: function(decrition){
        if(this.flag){
            this.getIndex(decrition);
            if(this.lastIndex != this.nowIndex){
                this.flag = false;
                this.$ppt.eq(this.lastIndex).trigger('go');
                this.$ppt.eq(this.nowIndex).trigger('come');
                this.nowCircleStyle(this.nowIndex);
                this.autoPlay();
            }
        }    
    }
}
coolppt.init();