const app = {
    metrikaId: 96330055,
    bindTopBannerBtn: function(){
        let self = this;
        $(document).on("click", "[data-test-slider] [data-slide='test_v'] .btn", function(){
            self.reachGoal('terraces-start');
        })
    },

    bindBlock4Btn: function(){
        let self = this;
        $(document).on("click", "[data-test-slider] [data-slide='test_2'] .btn", function(){
            self.reachGoal('button-rasschitat');
        })
    },

    reachGoal: function(name){
        console.log('reached ' + name + ' ' + this.metrikaId);
        ym(this.metrikaId, 'reachGoal', name);
    },

    getVarioqubFlags: function(){
        let self = this;
        ymab(
            'metrika.' + self.metrikaId,
            'getFlags',
            function (flags) {
                self.processFlags(flags);
            }
        );
    },
    processFlags: function(flags){
        console.log('flags process');
        console.log(flags);
        /*
        switch(true) {
            case flags.first_slide !== "undefined":
                $(document).find("[data-test-slider] [data-slide='1'] .fancybox.btn")
                    .css({
                        'backgroundColor': '#559955',
                        'fontSize': '20px',
                        'fontWeight': '700',
                    });
                break;
            default:
                break;
        }
        */
    },

    initVarioqub: function(){
        //this.getVarioqubFlags();
        this.bindTopBannerBtn();
        this.bindBlock4Btn();
    },
    init: function(){
        this.initVarioqub();
        console.log('app init');
    }
};

$(document).ready(function(){
    app.init();
})