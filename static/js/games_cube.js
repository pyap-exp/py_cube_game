(function(){
     var global={
        "active":"true",
        "count":9,
        "oncomplete":function(){
          
        }
     };
        
    function main_dom(dom,option){

       this.document=dom;
       this.option=option;
     
       
       this.createOutput=function(){
          var ranges=_pf.range(option.count,1);
          var shuffle=_pf.shuffle(ranges);
          var main_elem="";
          var sub_elem="";

          main_elem+='<table class="cls_table_main">';
          for (var i=0;i<parseInt(option.count/3);i++) {
         
            var sub_splice=shuffle.splice(0,3);
             sub_elem+="<tr>";
            _pf.each(sub_splice,function(k,v){
                sub_elem+="<td><div class='cls_div_box' ref_id='"+v+"'>";
                 sub_elem+=v;
                 sub_elem+="<input type='hidden' class='cls_multiple_data' value='"+v+"'>";
                 sub_elem+="</div></td>";
            });
             sub_elem+="</tr>";
          }
          main_elem+=sub_elem;
           main_elem+='</table>';
           pf$(this.document).html(main_elem);
       }
       
         if (option.count>=9 && parseInt(option.count/3)>=3 && (option.count/3)%1===0) {
        //code
        this.createOutput();
       }else{
          alert("The box count is not valid, it must be 9 above and divisible by 3");
       }
    }
    main_dom.prototype.events=function(doms){
    
          var bools=false;
          var dom_box;
          var output_variable={};
          var elem_top;
          var elem_left;
          var elem_cur;
            var ranges=_pf.range(this.option.count,1);
            var oncomplete=this.option.oncomplete;
            var is_mobile_event1=pf("agenttype").checkmobile()?"click,touchstart":"mousedown";
          pf$(".cls_div_box").on(is_mobile_event1,function(e){
           
              dom_box=this;
               pf$(".cls_div_box_hover").remove();
             pf$(this).append("<div class='cls_div_box_hover'>"+pf$(this).html()+"</div>");
         
         
          if(typeof(e.targetTouches)==="object"){
		var touch = e.targetTouches[0];
		}else{
		var touch = e;
		}

          
           elem_top=touch.clientY;
         elem_left=touch.clientX;
         elem_cur=pf$(this).getallattr();
          pf$(this).addclass("cls_div_box_prp");
           pf$(".cls_div_box").each(function(elem_k,elem_v){
            
               var get_arrt=pf$(elem_v[elem_k]).getallattr();
               
                  output_variable[get_arrt.ref_id]={
                    "dimension":pf$(elem_v[elem_k]).getElementDimension(),
                    "element":pf$(elem_v[elem_k]).getElementOffSet(),
                  }
           });
            });
     
     var elem_main_post_top=0;
     elem_main_post_left=0;
             pf$('.cls_table_main').on("mousemove,touchmove",function(e){

             if (_pf.has(dom_box) && dom_box!==null) {
                //code
         
           var eleme_post=output_variable[elem_cur.ref_id]['element'];
  
          
          if(typeof(e.targetTouches)==="object"){
		var touch = e.targetTouches[0];
		}else{
		var touch = e;
		}
       
       
                  var cX = touch.clientX;
                var sX = touch.screenX;
               var cY = touch.clientY;
               var sY = touch.screenY;

 var pos_x=cX+ document.body.scrollLeft - document.body.clientLeft;
 var pos_y=cY+ document.body.scrollTop - document.body.scrollTop;

  
  var main_post_grip_top=0;
    var main_post_grip_left=0;
  if (Math.abs(eleme_post.top-pos_y)<95) {
    //code
    main_post_grip_top=pos_y;
  }else{
     main_post_grip_top=eleme_post.top+((eleme_post.top<pos_y)?+110:-95);
  }
  
   if (Math.abs(eleme_post.left-pos_x)<95) {
    //code
    main_post_grip_left=pos_x;
  }else{
     main_post_grip_left=eleme_post.left+((eleme_post.left<pos_x)?+110:-95);
  }
  
  var post_direction_use={};
if (Math.abs(eleme_post.top-pos_y)>Math.abs(eleme_post.left-pos_x)) {
    //code
  
    post_direction_use['left']=(eleme_post.left+5)+"px";
    post_direction_use['top']=(main_post_grip_top+90)+"px";
     
}else {
    //code

     post_direction_use['top']=(eleme_post.top+95)+"px";
     post_direction_use['left']=(main_post_grip_left-10)+"px";
}

  elem_main_post_top=parseFloat(post_direction_use['top']);
elem_main_post_left=parseFloat(post_direction_use['left']);
               pf$(".cls_div_box_hover").css(post_direction_use);
               
                 }
          
            }).on("mouseup",function(){
         
                 _pf.each(output_variable,function(ok,ov){
                    var elemes=ov['element'];
                    var dimension=ov['dimension'];
  
            
            var element_mouse_up=pf$("div[ref_id="+ok+"]").getElementOffSet();
 
                    if (elemes.top<=elem_main_post_top && elemes.top>=elem_main_post_top-(dimension.height*1.6) && elem_main_post_left-(dimension.height*.4)<=elemes.left && elem_main_post_left+(dimension.height*.4)>=elemes.left) {
                        //code
           
                       var s1=pf$("div[ref_id="+elem_cur.ref_id+"]").html();
                       var s2=pf$("div[ref_id="+ok+"]").html();
                       pf$("div[ref_id="+ok+"]").html(s1);
                       pf$("div[ref_id="+elem_cur.ref_id+"]").html(s2);
                      
                       elem_main_post_top=0;
                      elem_main_post_left=0;
                         pf$(".cls_div_box_hover").remove();
                       pf$('.cls_div_box').removeclass("cls_div_box_prp");
                    }
                 });
                   pf$(".cls_div_box_hover").remove();
                       pf$('.cls_div_box').removeclass("cls_div_box_prp");
                    bools=false;
                    dom_box=null;
                 
                    var value_check=pf$(".cls_multiple_data").val();
                    var ctt=0;
                    _pf.each(ranges,function(rk,rv){
                         if (parseInt(rv)===parseInt(value_check[rk])) {
                    
                            ctt++;
                         }
                    });
                    
                    if (_pf.count(ranges)===ctt) {
                        //code
                        oncomplete();
                    }
               });
             
     
    }
    
        
        
    pf.module.games_cube=function(variable){
          var glb_var=_pf.isJSONVariableNotExist(variable,global);
      
pf$(this.dom).html(" ");
          var main=new main_dom(this.dom,glb_var);
          main.events(this.dom);
    }
    
})(window);