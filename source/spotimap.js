/*
 * jScrollPane - v2.0.20 - 2014-10-23
 * http://jscrollpane.kelvinluck.com/
 *
 * Copyright (c) 2014 Kelvin Luck
 * Dual licensed under the MIT or GPL licenses.
 */
(function(c,b){var a=function(d){return c(d,b)};if(typeof define==="function"&&define.amd){define(["jquery"],a)}else{if(typeof exports==="object"){module.exports=a}else{a(jQuery)}}}(function(b,a,c){b.fn.jScrollPane=function(e){function d(D,O){var ay,Q=this,Y,aj,v,al,T,Z,y,q,az,aE,au,i,I,h,j,aa,U,ap,X,t,A,aq,af,am,G,l,at,ax,x,av,aH,f,L,ai=true,P=true,aG=false,k=false,ao=D.clone(false,false).empty(),ac=b.fn.mwheelIntent?"mwheelIntent.jsp":"mousewheel.jsp";if(D.css("box-sizing")==="border-box"){aH=0;f=0}else{aH=D.css("paddingTop")+" "+D.css("paddingRight")+" "+D.css("paddingBottom")+" "+D.css("paddingLeft");f=(parseInt(D.css("paddingLeft"),10)||0)+(parseInt(D.css("paddingRight"),10)||0)}function ar(aQ){var aL,aN,aM,aJ,aI,aP,aO=false,aK=false;ay=aQ;if(Y===c){aI=D.scrollTop();aP=D.scrollLeft();D.css({overflow:"hidden",padding:0});aj=D.innerWidth()+f;v=D.innerHeight();D.width(aj);Y=b('<div class="jspPane" />').css("padding",aH).append(D.children());al=b('<div class="jspContainer" />').css({width:aj+"px",height:v+"px"}).append(Y).appendTo(D)}else{D.css("width","");aO=ay.stickToBottom&&K();aK=ay.stickToRight&&B();aJ=D.innerWidth()+f!=aj||D.outerHeight()!=v;if(aJ){aj=D.innerWidth()+f;v=D.innerHeight();al.css({width:aj+"px",height:v+"px"})}if(!aJ&&L==T&&Y.outerHeight()==Z){D.width(aj);return}L=T;Y.css("width","");D.width(aj);al.find(">.jspVerticalBar,>.jspHorizontalBar").remove().end()}Y.css("overflow","auto");if(aQ.contentWidth){T=aQ.contentWidth}else{T=Y[0].scrollWidth}Z=Y[0].scrollHeight;Y.css("overflow","");y=T/aj;q=Z/v;az=q>1;aE=y>1;if(!(aE||az)){D.removeClass("jspScrollable");Y.css({top:0,left:0,width:al.width()-f});n();E();R();w()}else{D.addClass("jspScrollable");aL=ay.maintainPosition&&(I||aa);if(aL){aN=aC();aM=aA()}aF();z();F();if(aL){N(aK?(T-aj):aN,false);M(aO?(Z-v):aM,false)}J();ag();an();if(ay.enableKeyboardNavigation){S()}if(ay.clickOnTrack){p()}C();if(ay.hijackInternalLinks){m()}}if(ay.autoReinitialise&&!av){av=setInterval(function(){ar(ay)},ay.autoReinitialiseDelay)}else{if(!ay.autoReinitialise&&av){clearInterval(av)}}aI&&D.scrollTop(0)&&M(aI,false);aP&&D.scrollLeft(0)&&N(aP,false);D.trigger("jsp-initialised",[aE||az])}function aF(){if(az){al.append(b('<div class="jspVerticalBar" />').append(b('<div class="jspCap jspCapTop" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragTop" />'),b('<div class="jspDragBottom" />'))),b('<div class="jspCap jspCapBottom" />')));U=al.find(">.jspVerticalBar");ap=U.find(">.jspTrack");au=ap.find(">.jspDrag");if(ay.showArrows){aq=b('<a class="jspArrow jspArrowUp" />').bind("mousedown.jsp",aD(0,-1)).bind("click.jsp",aB);af=b('<a class="jspArrow jspArrowDown" />').bind("mousedown.jsp",aD(0,1)).bind("click.jsp",aB);if(ay.arrowScrollOnHover){aq.bind("mouseover.jsp",aD(0,-1,aq));af.bind("mouseover.jsp",aD(0,1,af))}ak(ap,ay.verticalArrowPositions,aq,af)}t=v;al.find(">.jspVerticalBar>.jspCap:visible,>.jspVerticalBar>.jspArrow").each(function(){t-=b(this).outerHeight()});au.hover(function(){au.addClass("jspHover")},function(){au.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);au.addClass("jspActive");var s=aI.pageY-au.position().top;b("html").bind("mousemove.jsp",function(aJ){V(aJ.pageY-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});o()}}function o(){ap.height(t+"px");I=0;X=ay.verticalGutter+ap.outerWidth();Y.width(aj-X-f);try{if(U.position().left===0){Y.css("margin-left",X+"px")}}catch(s){}}function z(){if(aE){al.append(b('<div class="jspHorizontalBar" />').append(b('<div class="jspCap jspCapLeft" />'),b('<div class="jspTrack" />').append(b('<div class="jspDrag" />').append(b('<div class="jspDragLeft" />'),b('<div class="jspDragRight" />'))),b('<div class="jspCap jspCapRight" />')));am=al.find(">.jspHorizontalBar");
G=am.find(">.jspTrack");h=G.find(">.jspDrag");if(ay.showArrows){ax=b('<a class="jspArrow jspArrowLeft" />').bind("mousedown.jsp",aD(-1,0)).bind("click.jsp",aB);x=b('<a class="jspArrow jspArrowRight" />').bind("mousedown.jsp",aD(1,0)).bind("click.jsp",aB);if(ay.arrowScrollOnHover){ax.bind("mouseover.jsp",aD(-1,0,ax));x.bind("mouseover.jsp",aD(1,0,x))}ak(G,ay.horizontalArrowPositions,ax,x)}h.hover(function(){h.addClass("jspHover")},function(){h.removeClass("jspHover")}).bind("mousedown.jsp",function(aI){b("html").bind("dragstart.jsp selectstart.jsp",aB);h.addClass("jspActive");var s=aI.pageX-h.position().left;b("html").bind("mousemove.jsp",function(aJ){W(aJ.pageX-s,false)}).bind("mouseup.jsp mouseleave.jsp",aw);return false});l=al.innerWidth();ah()}}function ah(){al.find(">.jspHorizontalBar>.jspCap:visible,>.jspHorizontalBar>.jspArrow").each(function(){l-=b(this).outerWidth()});G.width(l+"px");aa=0}function F(){if(aE&&az){var aI=G.outerHeight(),s=ap.outerWidth();t-=aI;b(am).find(">.jspCap:visible,>.jspArrow").each(function(){l+=b(this).outerWidth()});l-=s;v-=s;aj-=aI;G.parent().append(b('<div class="jspCorner" />').css("width",aI+"px"));o();ah()}if(aE){Y.width((al.outerWidth()-f)+"px")}Z=Y.outerHeight();q=Z/v;if(aE){at=Math.ceil(1/y*l);if(at>ay.horizontalDragMaxWidth){at=ay.horizontalDragMaxWidth}else{if(at<ay.horizontalDragMinWidth){at=ay.horizontalDragMinWidth}}h.width(at+"px");j=l-at;ae(aa)}if(az){A=Math.ceil(1/q*t);if(A>ay.verticalDragMaxHeight){A=ay.verticalDragMaxHeight}else{if(A<ay.verticalDragMinHeight){A=ay.verticalDragMinHeight}}au.height(A+"px");i=t-A;ad(I)}}function ak(aJ,aL,aI,s){var aN="before",aK="after",aM;if(aL=="os"){aL=/Mac/.test(navigator.platform)?"after":"split"}if(aL==aN){aK=aL}else{if(aL==aK){aN=aL;aM=aI;aI=s;s=aM}}aJ[aN](aI)[aK](s)}function aD(aI,s,aJ){return function(){H(aI,s,this,aJ);this.blur();return false}}function H(aL,aK,aO,aN){aO=b(aO).addClass("jspActive");var aM,aJ,aI=true,s=function(){if(aL!==0){Q.scrollByX(aL*ay.arrowButtonSpeed)}if(aK!==0){Q.scrollByY(aK*ay.arrowButtonSpeed)}aJ=setTimeout(s,aI?ay.initialDelay:ay.arrowRepeatFreq);aI=false};s();aM=aN?"mouseout.jsp":"mouseup.jsp";aN=aN||b("html");aN.bind(aM,function(){aO.removeClass("jspActive");aJ&&clearTimeout(aJ);aJ=null;aN.unbind(aM)})}function p(){w();if(az){ap.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageY-aO.top-I,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageY-aR.top-A/2,aP=v*ay.scrollPagePercent,aQ=i*aP/(Z-v);if(aM<0){if(I-aQ>aS){Q.scrollByY(-aP)}else{V(aS)}}else{if(aM>0){if(I+aQ<aS){Q.scrollByY(aP)}else{V(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}if(aE){G.bind("mousedown.jsp",function(aN){if(aN.originalTarget===c||aN.originalTarget==aN.currentTarget){var aL=b(this),aO=aL.offset(),aM=aN.pageX-aO.left-aa,aJ,aI=true,s=function(){var aR=aL.offset(),aS=aN.pageX-aR.left-at/2,aP=aj*ay.scrollPagePercent,aQ=j*aP/(T-aj);if(aM<0){if(aa-aQ>aS){Q.scrollByX(-aP)}else{W(aS)}}else{if(aM>0){if(aa+aQ<aS){Q.scrollByX(aP)}else{W(aS)}}else{aK();return}}aJ=setTimeout(s,aI?ay.initialDelay:ay.trackClickRepeatFreq);aI=false},aK=function(){aJ&&clearTimeout(aJ);aJ=null;b(document).unbind("mouseup.jsp",aK)};s();b(document).bind("mouseup.jsp",aK);return false}})}}function w(){if(G){G.unbind("mousedown.jsp")}if(ap){ap.unbind("mousedown.jsp")}}function aw(){b("html").unbind("dragstart.jsp selectstart.jsp mousemove.jsp mouseup.jsp mouseleave.jsp");if(au){au.removeClass("jspActive")}if(h){h.removeClass("jspActive")}}function V(s,aI){if(!az){return}if(s<0){s=0}else{if(s>i){s=i}}if(aI===c){aI=ay.animateScroll}if(aI){Q.animate(au,"top",s,ad)}else{au.css("top",s);ad(s)}}function ad(aI){if(aI===c){aI=au.position().top}al.scrollTop(0);I=aI||0;var aL=I===0,aJ=I==i,aK=aI/i,s=-aK*(Z-v);if(ai!=aL||aG!=aJ){ai=aL;
aG=aJ;D.trigger("jsp-arrow-change",[ai,aG,P,k])}u(aL,aJ);Y.css("top",s);D.trigger("jsp-scroll-y",[-s,aL,aJ]).trigger("scroll")}function W(aI,s){if(!aE){return}if(aI<0){aI=0}else{if(aI>j){aI=j}}if(s===c){s=ay.animateScroll}if(s){Q.animate(h,"left",aI,ae)}else{h.css("left",aI);ae(aI)}}function ae(aI){if(aI===c){aI=h.position().left}al.scrollTop(0);aa=aI||0;var aL=aa===0,aK=aa==j,aJ=aI/j,s=-aJ*(T-aj);if(P!=aL||k!=aK){P=aL;k=aK;D.trigger("jsp-arrow-change",[ai,aG,P,k])}r(aL,aK);Y.css("left",s);D.trigger("jsp-scroll-x",[-s,aL,aK]).trigger("scroll")}function u(aI,s){if(ay.showArrows){aq[aI?"addClass":"removeClass"]("jspDisabled");af[s?"addClass":"removeClass"]("jspDisabled")}}function r(aI,s){if(ay.showArrows){ax[aI?"addClass":"removeClass"]("jspDisabled");x[s?"addClass":"removeClass"]("jspDisabled")}}function M(s,aI){var aJ=s/(Z-v);V(aJ*i,aI)}function N(aI,s){var aJ=aI/(T-aj);W(aJ*j,s)}function ab(aV,aQ,aJ){var aN,aK,aL,s=0,aU=0,aI,aP,aO,aS,aR,aT;try{aN=b(aV)}catch(aM){return}aK=aN.outerHeight();aL=aN.outerWidth();al.scrollTop(0);al.scrollLeft(0);while(!aN.is(".jspPane")){s+=aN.position().top;aU+=aN.position().left;aN=aN.offsetParent();if(/^body|html$/i.test(aN[0].nodeName)){return}}aI=aA();aO=aI+v;if(s<aI||aQ){aR=s-ay.horizontalGutter}else{if(s+aK>aO){aR=s-v+aK+ay.horizontalGutter}}if(!isNaN(aR)){M(aR,aJ)}aP=aC();aS=aP+aj;if(aU<aP||aQ){aT=aU-ay.horizontalGutter}else{if(aU+aL>aS){aT=aU-aj+aL+ay.horizontalGutter}}if(!isNaN(aT)){N(aT,aJ)}}function aC(){return -Y.position().left}function aA(){return -Y.position().top}function K(){var s=Z-v;return(s>20)&&(s-aA()<10)}function B(){var s=T-aj;return(s>20)&&(s-aC()<10)}function ag(){al.unbind(ac).bind(ac,function(aM,aN,aK,aI){if(!aa){aa=0}if(!I){I=0}var aJ=aa,s=I,aL=aM.deltaFactor||ay.mouseWheelSpeed;Q.scrollBy(aK*aL,-aI*aL,false);return aJ==aa&&s==I})}function n(){al.unbind(ac)}function aB(){return false}function J(){Y.find(":input,a").unbind("focus.jsp").bind("focus.jsp",function(s){ab(s.target,false)})}function E(){Y.find(":input,a").unbind("focus.jsp")}function S(){var s,aI,aK=[];aE&&aK.push(am[0]);az&&aK.push(U[0]);Y.focus(function(){D.focus()});D.attr("tabindex",0).unbind("keydown.jsp keypress.jsp").bind("keydown.jsp",function(aN){if(aN.target!==this&&!(aK.length&&b(aN.target).closest(aK).length)){return}var aM=aa,aL=I;switch(aN.keyCode){case 40:case 38:case 34:case 32:case 33:case 39:case 37:s=aN.keyCode;aJ();break;case 35:M(Z-v);s=null;break;case 36:M(0);s=null;break}aI=aN.keyCode==s&&aM!=aa||aL!=I;return !aI}).bind("keypress.jsp",function(aL){if(aL.keyCode==s){aJ()}return !aI});if(ay.hideFocus){D.css("outline","none");if("hideFocus" in al[0]){D.attr("hideFocus",true)}}else{D.css("outline","");if("hideFocus" in al[0]){D.attr("hideFocus",false)}}function aJ(){var aM=aa,aL=I;switch(s){case 40:Q.scrollByY(ay.keyboardSpeed,false);break;case 38:Q.scrollByY(-ay.keyboardSpeed,false);break;case 34:case 32:Q.scrollByY(v*ay.scrollPagePercent,false);break;case 33:Q.scrollByY(-v*ay.scrollPagePercent,false);break;case 39:Q.scrollByX(ay.keyboardSpeed,false);break;case 37:Q.scrollByX(-ay.keyboardSpeed,false);break}aI=aM!=aa||aL!=I;return aI}}function R(){D.attr("tabindex","-1").removeAttr("tabindex").unbind("keydown.jsp keypress.jsp")}function C(){if(location.hash&&location.hash.length>1){var aK,aI,aJ=escape(location.hash.substr(1));try{aK=b("#"+aJ+', a[name="'+aJ+'"]')}catch(s){return}if(aK.length&&Y.find(aJ)){if(al.scrollTop()===0){aI=setInterval(function(){if(al.scrollTop()>0){ab(aK,true);b(document).scrollTop(al.position().top);clearInterval(aI)}},50)}else{ab(aK,true);b(document).scrollTop(al.position().top)}}}}function m(){if(b(document.body).data("jspHijack")){return}b(document.body).data("jspHijack",true);b(document.body).delegate("a[href*=#]","click",function(s){var aI=this.href.substr(0,this.href.indexOf("#")),aK=location.href,aO,aP,aJ,aM,aL,aN;if(location.href.indexOf("#")!==-1){aK=location.href.substr(0,location.href.indexOf("#"))}if(aI!==aK){return}aO=escape(this.href.substr(this.href.indexOf("#")+1));
aP;try{aP=b("#"+aO+', a[name="'+aO+'"]')}catch(aQ){return}if(!aP.length){return}aJ=aP.closest(".jspScrollable");aM=aJ.data("jsp");aM.scrollToElement(aP,true);if(aJ[0].scrollIntoView){aL=b(a).scrollTop();aN=aP.offset().top;if(aN<aL||aN>aL+b(a).height()){aJ[0].scrollIntoView()}}s.preventDefault()})}function an(){var aJ,aI,aL,aK,aM,s=false;al.unbind("touchstart.jsp touchmove.jsp touchend.jsp click.jsp-touchclick").bind("touchstart.jsp",function(aN){var aO=aN.originalEvent.touches[0];aJ=aC();aI=aA();aL=aO.pageX;aK=aO.pageY;aM=false;s=true}).bind("touchmove.jsp",function(aQ){if(!s){return}var aP=aQ.originalEvent.touches[0],aO=aa,aN=I;Q.scrollTo(aJ+aL-aP.pageX,aI+aK-aP.pageY);aM=aM||Math.abs(aL-aP.pageX)>5||Math.abs(aK-aP.pageY)>5;return aO==aa&&aN==I}).bind("touchend.jsp",function(aN){s=false}).bind("click.jsp-touchclick",function(aN){if(aM){aM=false;return false}})}function g(){var s=aA(),aI=aC();D.removeClass("jspScrollable").unbind(".jsp");D.replaceWith(ao.append(Y.children()));ao.scrollTop(s);ao.scrollLeft(aI);if(av){clearInterval(av)}}b.extend(Q,{reinitialise:function(aI){aI=b.extend({},ay,aI);ar(aI)},scrollToElement:function(aJ,aI,s){ab(aJ,aI,s)},scrollTo:function(aJ,s,aI){N(aJ,aI);M(s,aI)},scrollToX:function(aI,s){N(aI,s)},scrollToY:function(s,aI){M(s,aI)},scrollToPercentX:function(aI,s){N(aI*(T-aj),s)},scrollToPercentY:function(aI,s){M(aI*(Z-v),s)},scrollBy:function(aI,s,aJ){Q.scrollByX(aI,aJ);Q.scrollByY(s,aJ)},scrollByX:function(s,aJ){var aI=aC()+Math[s<0?"floor":"ceil"](s),aK=aI/(T-aj);W(aK*j,aJ)},scrollByY:function(s,aJ){var aI=aA()+Math[s<0?"floor":"ceil"](s),aK=aI/(Z-v);V(aK*i,aJ)},positionDragX:function(s,aI){W(s,aI)},positionDragY:function(aI,s){V(aI,s)},animate:function(aI,aL,s,aK){var aJ={};aJ[aL]=s;aI.animate(aJ,{duration:ay.animateDuration,easing:ay.animateEase,queue:false,step:aK})},getContentPositionX:function(){return aC()},getContentPositionY:function(){return aA()},getContentWidth:function(){return T},getContentHeight:function(){return Z},getPercentScrolledX:function(){return aC()/(T-aj)},getPercentScrolledY:function(){return aA()/(Z-v)},getIsScrollableH:function(){return aE},getIsScrollableV:function(){return az},getContentPane:function(){return Y},scrollToBottom:function(s){V(i,s)},hijackInternalLinks:b.noop,destroy:function(){g()}});ar(O)}e=b.extend({},b.fn.jScrollPane.defaults,e);b.each(["arrowButtonSpeed","trackClickSpeed","keyboardSpeed"],function(){e[this]=e[this]||e.speed});return this.each(function(){var f=b(this),g=f.data("jsp");if(g){g.reinitialise(e)}else{b("script",f).filter('[type="text/javascript"],:not([type])').remove();g=new d(f,e);f.data("jsp",g)}})};b.fn.jScrollPane.defaults={showArrows:false,maintainPosition:true,stickToBottom:false,stickToRight:false,clickOnTrack:true,autoReinitialise:false,autoReinitialiseDelay:500,verticalDragMinHeight:0,verticalDragMaxHeight:99999,horizontalDragMinWidth:0,horizontalDragMaxWidth:99999,contentWidth:c,animateScroll:false,animateDuration:300,animateEase:"linear",hijackInternalLinks:false,verticalGutter:4,horizontalGutter:4,mouseWheelSpeed:3,arrowButtonSpeed:0,arrowRepeatFreq:50,arrowScrollOnHover:false,trackClickSpeed:0,trackClickRepeatFreq:70,verticalArrowPositions:"split",horizontalArrowPositions:"split",enableKeyboardNavigation:true,hideFocus:false,keyboardSpeed:0,initialDelay:300,speed:30,scrollPagePercent:0.8}},this));
/*! Copyright (c) 2013 Brandon Aaron (http://brandon.aaron.sh)
 * Licensed under the MIT License (LICENSE.txt).
 *
 * Version: 3.1.9
 *
 * Requires: jQuery 1.2.2+
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS style for Browserify
        module.exports = factory;
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    var toFix  = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ( 'onwheel' in document || document.documentMode >= 9 ) ?
                    ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice  = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;

    if ( $.event.fixHooks ) {
        for ( var i = toFix.length; i; ) {
            $.event.fixHooks[ toFix[--i] ] = $.event.mouseHooks;
        }
    }

    var special = $.event.special.mousewheel = {
        version: '3.1.9',

        setup: function() {
            if ( this.addEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.addEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = handler;
            }
            // Store the line height and page height for this particular element
            $.data(this, 'mousewheel-line-height', special.getLineHeight(this));
            $.data(this, 'mousewheel-page-height', special.getPageHeight(this));
        },

        teardown: function() {
            if ( this.removeEventListener ) {
                for ( var i = toBind.length; i; ) {
                    this.removeEventListener( toBind[--i], handler, false );
                }
            } else {
                this.onmousewheel = null;
            }
        },

        getLineHeight: function(elem) {
            return parseInt($(elem)['offsetParent' in $.fn ? 'offsetParent' : 'parent']().css('fontSize'), 10);
        },

        getPageHeight: function(elem) {
            return $(elem).height();
        },

        settings: {
            adjustOldDeltas: true
        }
    };

    $.fn.extend({
        mousewheel: function(fn) {
            return fn ? this.bind('mousewheel', fn) : this.trigger('mousewheel');
        },

        unmousewheel: function(fn) {
            return this.unbind('mousewheel', fn);
        }
    });


    function handler(event) {
        var orgEvent   = event || window.event,
            args       = slice.call(arguments, 1),
            delta      = 0,
            deltaX     = 0,
            deltaY     = 0,
            absDelta   = 0;
        event = $.event.fix(orgEvent);
        event.type = 'mousewheel';

        // Old school scrollwheel delta
        if ( 'detail'      in orgEvent ) { deltaY = orgEvent.detail * -1;      }
        if ( 'wheelDelta'  in orgEvent ) { deltaY = orgEvent.wheelDelta;       }
        if ( 'wheelDeltaY' in orgEvent ) { deltaY = orgEvent.wheelDeltaY;      }
        if ( 'wheelDeltaX' in orgEvent ) { deltaX = orgEvent.wheelDeltaX * -1; }

        // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
        if ( 'axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS ) {
            deltaX = deltaY * -1;
            deltaY = 0;
        }

        // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
        delta = deltaY === 0 ? deltaX : deltaY;

        // New school wheel delta (wheel event)
        if ( 'deltaY' in orgEvent ) {
            deltaY = orgEvent.deltaY * -1;
            delta  = deltaY;
        }
        if ( 'deltaX' in orgEvent ) {
            deltaX = orgEvent.deltaX;
            if ( deltaY === 0 ) { delta  = deltaX * -1; }
        }

        // No change actually happened, no reason to go any further
        if ( deltaY === 0 && deltaX === 0 ) { return; }

        // Need to convert lines and pages to pixels if we aren't already in pixels
        // There are three delta modes:
        //   * deltaMode 0 is by pixels, nothing to do
        //   * deltaMode 1 is by lines
        //   * deltaMode 2 is by pages
        if ( orgEvent.deltaMode === 1 ) {
            var lineHeight = $.data(this, 'mousewheel-line-height');
            delta  *= lineHeight;
            deltaY *= lineHeight;
            deltaX *= lineHeight;
        } else if ( orgEvent.deltaMode === 2 ) {
            var pageHeight = $.data(this, 'mousewheel-page-height');
            delta  *= pageHeight;
            deltaY *= pageHeight;
            deltaX *= pageHeight;
        }

        // Store lowest absolute delta to normalize the delta values
        absDelta = Math.max( Math.abs(deltaY), Math.abs(deltaX) );

        if ( !lowestDelta || absDelta < lowestDelta ) {
            lowestDelta = absDelta;

            // Adjust older deltas if necessary
            if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
                lowestDelta /= 40;
            }
        }

        // Adjust older deltas if necessary
        if ( shouldAdjustOldDeltas(orgEvent, absDelta) ) {
            // Divide all the things by 40!
            delta  /= 40;
            deltaX /= 40;
            deltaY /= 40;
        }

        // Get a whole, normalized value for the deltas
        delta  = Math[ delta  >= 1 ? 'floor' : 'ceil' ](delta  / lowestDelta);
        deltaX = Math[ deltaX >= 1 ? 'floor' : 'ceil' ](deltaX / lowestDelta);
        deltaY = Math[ deltaY >= 1 ? 'floor' : 'ceil' ](deltaY / lowestDelta);

        // Add information to the event object
        event.deltaX = deltaX;
        event.deltaY = deltaY;
        event.deltaFactor = lowestDelta;
        // Go ahead and set deltaMode to 0 since we converted to pixels
        // Although this is a little odd since we overwrite the deltaX/Y
        // properties with normalized deltas.
        event.deltaMode = 0;

        // Add event and delta to the front of the arguments
        args.unshift(event, delta, deltaX, deltaY);

        // Clearout lowestDelta after sometime to better
        // handle multiple device types that give different
        // a different lowestDelta
        // Ex: trackpad = 3 and mouse wheel = 120
        if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
        nullLowestDeltaTimeout = setTimeout(nullLowestDelta, 200);

        return ($.event.dispatch || $.event.handle).apply(this, args);
    }

    function nullLowestDelta() {
        lowestDelta = null;
    }

    function shouldAdjustOldDeltas(orgEvent, absDelta) {
        // If this is an older event and the delta is divisable by 120,
        // then we are assuming that the browser is treating this as an
        // older mouse wheel event and that we should divide the deltas
        // by 40 to try and get a more usable deltaFactor.
        // Side note, this actually impacts the reported scroll distance
        // in older browsers and can cause scrolling to be slower than native.
        // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
        return special.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
    }

}));


LoadMore = Backbone.View.extend({

  className: "LoadMore",
  events: {
    "click .js-load-more": "_onClick"
  },

  template: _.template('<a href="#" class="js-load-more">Load more songs</div></a>'),

  initialize: function(options) {

  },

  _onClick: function(e) {

    e.preventDefault();
    e.stopPropagation();

    this.trigger("onClick", this);

  },

  render: function() {

    this.$el.append(this.template());

    return this;

  }

});

SongView = Backbone.View.extend({

  tagName: "li",
  className: "SongItem",

  events: {
    "click .js-play": "_onClickPlay"
  },

  template: _.template('<a href="#" class="js-play"><div class="title"><strong><%= song %></strong>, <%= author %></div><div class="error"></div><div class="info"></div></a>'),

  initialize: function(options) {

    this.model = options.model;
    this.model.on("change:selected", this._onChangeSelected, this);
    this.model.on("change:error", this._onChangeError, this);

  },

  _onChangeError: function() {

    if (this.model.get("error")) {
      this.$el.addClass("has-error");
    } else {
      this.$el.removeClass("has-error");
    }

  },

  _onChangeSelected: function() {

    if (this.model.get("selected")) {
      this.$el.addClass("is-selected");
    } else {
      this.$el.removeClass("is-selected");
    }

  },

  _onClickPlay: function(e) {

    e.preventDefault();
    e.stopPropagation();

    this.model.set("selected", true);
    this.trigger("onClick", this.model, this);

  },

  render: function() {

    this.$el.append(this.template(this.model.attributes));

    return this;

  }

});

Song = Backbone.Model.extend({
});

Songs = Backbone.Collection.extend({
  model: Song
});

Player = Backbone.View.extend({

  className: "Player",

  events: {
    "click .js-back": "_onClickBack",
    "click .js-about": "_onClickAbout",
    "click .js-close": "_onClickAboutClose"
  },

  template: _.template('<div class="PlayerHeader"><strong>Spotimap</strong> a map of songs about cities<a href="#back" class="back js-back">back</a><div class="spinner"></div></div><div class="SongPlayer"><iframe width="100%" height="80px" frameborder="0" allowtransparency="true"></iframe></div><div class="Pane"><ul class="SongList"></ul></div><div class="PlayerSearch"></div><div class="PlayerFooter"><div class="inner"><div class="info">Source: <a href="http://en.wikipedia.org/wiki/List_of_songs_about_cities">Wikipedia</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#about" class="js-about">About this project</a>&nbsp;&nbsp;|&nbsp;&nbsp;Created by <a href="http://twitter.com/javier">Javier Arce</a></div><div class="stats"><span></span> <a href="#close" class="close js-close">close</a></div></div></div>'),

  initialize: function(options) {


    _.bindAll(this, "_invalidateSong");

    this.options = _.extend({ zoomed: false, loading: false }, options);

    this.offsets = {};
    this.currentCity = "";

    this.songs = new Songs();
    this.audio = new Audio();

    this.model = new Backbone.Model(this.options);

    this.model.on("change:loading", this._onChangeLoading, this);
    this.model.on("change:zoomed", this._onChangeZoomed, this);
    this.model.on("change:show_loader", this._onChangeShowLoader, this);
    this.model.on("change:show_about", this._onChangeShowAbout, this);
    this.model.on("change:stats", this._onChangeStats, this);

    this.songs.on("reset", this._renderSongList, this);

    var self = this;

    var query = "SELECT COUNT(songs.cartodb_id) FROM spotimap_songs songs, spotimap_cities cities WHERE songs.city = cities.city AND available IS NOT false GROUP by songs.cartodb_id ORDER by songs.song ASC";

    var onError = function(errors) {
      // self._stopLoading();
    };

    var onSuccessQuery = function(data) {

      if (data && data.rows) {
        self.model.set("stats", "<strong>" + data.rows.length + "</strong> songs, <strong>212 cities</strong> | <a href='https://github.com/javierarce/spotimap'>Source code</a>");
      }

    };

      new cartodb.SQL({ user: this.options.username })
      .execute(query)
      .done(onSuccessQuery)
      .error(onError);


  },

  _onClickAbout: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.model.set("show_about", true);
  },

  _onClickAboutClose: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.model.set("show_about", false);
  },

  _onClickBack: function(e) {
    e.preventDefault();
    e.stopPropagation();

    this.trigger("onClickBack", this);
  },

  _onChangeShowAbout: function() {

    if (this.model.get("show_about")) {
      this.$el.addClass("show-about");
    } else {
      this.$el.removeClass("show-about");
    }

  },

  _onChangeStats: function() {
    this.$el.find(".PlayerFooter .stats span").append(this.model.get("stats"));
  },

  _onChangeShowLoader: function() {

    if (this.model.get("show_loader")) {
      this.$el.addClass("show-loader");
    } else {
      this.$el.removeClass("show-loader");
    }

  },

  _onChangeZoomed: function() {

    if (this.model.get("zoomed")) {
      this.$el.addClass("is-zoomed");
    } else {
      this.$el.removeClass("is-zoomed");
    }

  },

  _onChangeLoading: function() {

    if (this.model.get("loading")) {
      this._loading();
    } else {
      this._stopLoading();
    }

  },

  zoomIn: function() {
    this.model.set("zoomed", true);
  },

  zoomOut : function() {
    this.model.set("zoomed", false);
    this.$el.find(".Pane").fadeOut(200);
    this.$el.find('.PlayerSearch input[type="text"]').val("");
  },

  loading: function() {
    this.model.set("loading", true);
  },

  stopLoading : function() {
    this.model.set("loading", false);
  },

  _loading: function() {
    this.$el.addClass("is-loading");
  },

  _stopLoading : function() {
    this.$el.removeClass("is-loading");
  },

  search: function(query, callback) {

    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: query,
        type: 'track'
      },
      success: callback
    });

  },

  loadSongs: function(reset, songs) {

    if (reset) {
      this.$el.find(".SongList").empty();
      this.songs.reset([]);
    }

    this.songs.reset(songs);
    this.stopLoading();

    if (songs.length > 0) {
      this.$el.find(".Pane").fadeIn(200);
    }

    this._refreshPane();

  },

  _loadPlayer: function(spotify_url) {

    var url = "https://embed.spotify.com/?uri=" + spotify_url + "&view=coverart";
    this.$el.find(".SongPlayer").fadeIn(200);
    this.$el.find(".SongPlayer iframe").attr("src", url);

  },

  _play: function(song) {

    var song_name = song.get("song") + ", " + song.get("author");

    var self = this;

    this.search(song_name, function(response) {

      var tracks = response.tracks.items;

      if (tracks.length) {
        self._loadPlayer(tracks[0].uri);
      } else {
        song.set("error", true);
        self._invalidateSong(song);
      }

    });

  },

  _invalidateSong: function(song) {

    if (this.model.get("api_key")) {

      var query = "UPDATE spotimap_songs SET available = false WHERE cartodb_id = " + song.get("cartodb_id");

      new cartodb.SQL({ user: this.options.username, api_key: this.model.get("api_key") })
      .execute(query)
      .done(function() { 
        console.log(song.get("song") + " was invalidated.");
      })
      .error(function() { 
        console.log("Error making " + song.get("song") + "unavailable.");
      });

    }

  },

  _refreshPane: function() {

    var self = this;

    if (this.api) {
      setTimeout(function() {
        self.api.reinitialise();
      }, 300);
    }
  },

  goToCity: function(city) {

    if (!city) return;

    this.$el.find(".PlayerSearch input[type='text']").val(city);
    this.$el.find(".PlayerSearch input[type='submit']").click();

  },

  renderSearch: function() {

    if (this.vis) {
      var v = cdb.vis.Overlay.create('search', this.vis, {});
      v.show();
      this.$el.find(".PlayerSearch").append(v.render().el);
      v.$el.find('input[type="text"]').attr('placeholder', "Search for a city");
    }

  },

  _loadMoreSongs: function() {
    this._getSongsFor(this.currentCity);
  },

  _onCityClick: function(e, latlng, pos, data, layerNumber) {

    var self = this;

    this.map.panTo({ lat: data.latitude, lon: data.longitude });

    this.zoomIn();

    if (history) {
      history.pushState({}, "city", "http://" + window.location.hostname + window.location.pathname + "?city=" + data.city);
    }

    setTimeout(function() {
      self.map.setZoom(10);
    }, 500);

    this._getSongsFor(data.city);

  },

  _getSongsFor: function(city) {

    if (!city) return;

    var self = this;

    var reset = false;

    if (this.currentCity && city != this.currentCity) {
      reset = true;
      this.offsets[city] = 0;
    }

    if (!this.offsets[city]) this.offsets[city] = 0;

    this.currentCity = city;

    var query = "SELECT songs.cartodb_id, songs.song, songs.city, songs.author, cities.country, cities.the_geom_webmercator FROM spotimap_songs songs, spotimap_cities cities WHERE songs.city = cities.city AND cities.city = '" + city + "' AND available IS NOT false ORDER by songs.song ASC LIMIT 100 OFFSET " + this.offsets[city];

    var onError = function(errors) {
      // self._stopLoading();
    };

    var onSuccessQuery = function(data) {

      if (data && data.rows) {

        if (data.rows.length >= 100) {
          self.model.set("show_loader", true);
        } else {
          self.model.set("show_loader", false);
        }

        self.offsets[self.currentCity] += data.rows.length;
        self.loadSongs(reset, data.rows);
      }

    };

    setTimeout(function() {

      self.loading();

      new cartodb.SQL({ user: self.options.username })
      .execute(query)
      .done(onSuccessQuery)
      .error(onError);
    } , 600);

  },

  _onClickSong: function(song) {

    this._play(song);

    this.songs.each(function(s) { 

      if (s.get("cartodb_id") !== song.get("cartodb_id")) {
        s.set("selected", false); 
      }

    });

    this._refreshPane();

  },

  _renderSongList: function() {

    var self = this; 

    this.songs.each(function(song) {

      var item = new SongView({ model: song });

      item.bind("onClick", this._onClickSong, this);

      this.$el.find(".SongList").append(item.render().$el);

    }, this);


    this.api = this.$el.find(".Pane").jScrollPane({
      showArrows: true
    }).data("jsp");

  },

  render: function() {

    this.$el.append(this.template());
    this.renderSearch();

    var item = new LoadMore();

    item.bind("onClick", this._loadMoreSongs, this);
    this.$el.find(".Pane").append(item.render().$el);

    return this;

  }

});

App = Backbone.View.extend({

  defaults: {
    center: [40.0, 0.0],
    zoom: 2
  },

  el: "body",

  initialize: function(options) {

    _.bindAll(this, "_onCreatedVis");

    this.player = new Player({ username: "arce", api_key: this._getURLParam("api_key") });

    this.player.bind("onClickBack", this._onClickBack, this);
    this.player.bind("onClickAbout", this._onClickAbout, this);

    cartodb.createVis('map', "http://arce.cartodb.com/api/v2/viz/52aa5404-9d9a-11e4-99c0-0e4fddd5de28/viz.json", {
      center: this.defaults.center,
      zoom: this.defaults.zoom,
      search:false
    }).done(this._onCreatedVis);

    this.render();

  },

  _getURLParam: function(sParam) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');

    for (var i = 0; i < sURLVariables.length; i++) {
      var sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] == sParam) {
        return decodeURIComponent(sParameterName[1]);
      }
    }

  },

  _onClickBack: function() {

    var self = this;

    this.map.panTo({ lat: this.defaults.center[0], lon: this.defaults.center[1] });
    setTimeout(function() {
      self.map.setZoom(self.defaults.zoom);
      self.player.zoomOut();
    }, 500);

  },

  _onCreatedVis: function(vis, layers){

    var cartoDBLayer = layers[1];

    this.titlesLayer     = cartoDBLayer.getSubLayer(1);

    this._addCursorInteraction(vis, cartoDBLayer);

    this.titlesLayer.set({ 'interactivity': ['city', 'country', 'latitude', 'longitude', 'cartodb_id'] });

    var self = this;

    this.map = vis.getNativeMap();

    this.player.vis = vis;
    this.player.map = this.map;
    this.player.renderSearch();
    this.player.goToCity(this._getURLParam("city"));

    cartoDBLayer.on('featureClick',  this.player._onCityClick, this.player);

  },

  _addCursorInteraction: function(viz, layer) {

    var hovers = [];
    var mapView = viz.mapView;

    layer.bind('featureOver', function(e, latlon, pxPos, data, layer) {
      hovers[layer] = 1;
      if(_.any(hovers))
        mapView.setCursor('pointer');
    }, mapView);

    layer.bind('featureOut', function(m, layer) {
      hovers[layer] = 0;
      if(!_.any(hovers))

        mapView.setCursor('auto');
    }, mapView);
  },

  render: function() {
    this.$el.append(this.player.render().$el);
  }

});

$(function(){
  window.app = new App();
});
