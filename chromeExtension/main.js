(function main(){

    function Sidebar(){
        this.$el = $("#watch7-sidebar");
        this.margintop = this.$el.css("margin-top");
        
        this.move = function(){
            this.$el.css({
                "margin-top": "0"
            });
        };

        this.restore = function(){
            this.$el.css({
                "margin-top": this.margintop
            });
        };
    }

    function Header(){
        this.$el = $("#masthead-positioner");

        this.move = function(){
            $("#masthead-positioner-height-offset").hide();
            $("#watch7-container").prepend(this.$el);
            this.$el.css("position", "static");
        };

        this.restore = function(){
            $("#masthead-positioner-height-offset").show();
            $("#page-container").prepend(this.$el);
            this.$el.css("position", "fixed");
        };
    }

    $(document).ready(function(){
        var $window = $(window),
            $video = $(".player-api"),
            $player = $("#player"),
            aspectRatio_HoW = $video.height() / $video.width(),
            aspectRatio_WoH = 1.0/aspectRatio_HoW,
            targetWidth,
            header = new Header(),
            sidebar = new Sidebar(),
            targetHeight, maxTargetHeight;

        console.log(aspectRatio_HoW, aspectRatio_WoH);

        $player.css("max-width", "auto");

        function applyResize(){
            targetWidth = $window.width();

            maxTargetHeight = $window.height() - $player.offset().top;
            console.log("max height:", maxTargetHeight);                
            console.log("apply resize", targetWidth);

            targetHeight = targetWidth*aspectRatio_HoW;
            if(targetHeight > maxTargetHeight){
                targetHeight = maxTargetHeight;
                targetWidth = targetHeight * aspectRatio_WoH;
            }

            $video.css({
                width: targetWidth,
                height: targetHeight
            });

            $player.css({
                "min-width": targetWidth
            });
        }

        sidebar.move();
        header.move();
        $window.resize(applyResize);
        applyResize();
        
    });

})();