(function(pf_window){
	
	
	
	
	function pf_core_load(func){


		if(pf("agenttype").useragent({browser:'msie'})==true){	
			try{
		var te=setInterval(function(){
		console.log(document.readyState);
			if(document.readyState=="complete"){
				if(typeof(func)!="undefined"){
					func();
					clearInterval(te);
				}

			}
		},150);
			}catch(e){
				console.log(e);
			}
		}else{
			try{
			 pf('dom_ready',function(){
			if(typeof(func)!="undefined"){
					func();
				}
					});		
			}catch(e){
				console.log(e);
			}
		}
			
	
}
 
	var pf_ui_core_library={
	    set_tag_as_review_active:function(d){
		var arry=[];
		_pf.each(d,function(ek,ev){
		    var getattrreview=pf$(ev).getattr("pf-ui-is-review")||false;
		    var getattrall=pf$(ev).getattr("pf-ui-is-review")||false;
		    if (getattrreview==false || getattrreview=="false") {
			  arry.push({"dom":ev,"attr":getattrall});
			  pf$(ev).setattr({"pf-ui-is-review":true});
		    }else{
			 arry.push({"dom":ev,"attr":getattrall});

			}
		});
		return arry;
	    },
	    element_delay:function(func,typ,delay,mobile){
			var glb={};
			var s_delay=delay||1000;
			glb.loaddelay=mobile||pf("agenttype").checkmobile();
			if(typeof(func)=="function"){
			if(glb.loaddelay==false){
				if(typ=="interval"){
				
					glb.delayfunc=setInterval(function(){
							func(glb);
							},s_delay);
				}
				if(typ=="timeout"){
					glb.delayfunc=setTimeout(function(){
							func(glb);
							},s_delay);
				}	
			 }else{
				glb.delayfunc=null;
				func(glb);


			}
		   }
		},
		element_each:function(doms,meth){
			var str="";
			_pf.each(doms,function(dk,dv){
				
				str+=pf$(dv.dom).domview(meth);
			});
			return str;
		},
		if_method_exist:function(cls,method,para,glb_val,val){
			
			if(glb_val==val){ 
				cls[method](para);
			}
			
		},
		if_variable_exist_func:function(glb_val,val,func){
			if(glb_val==val && _pf.getJSONtypeof(func)=="function" ){
				func();
			}
		}		
		
	};
	
	function pf_internal_library(dom_main){
		this.dom=dom_main;
	
		this.background_opacity=function(dms,bools){
				var body_length=pf$(".pf-js-body-append-body-bckgrnd").getlength();
			
			if(body_length==0){
				
				pf$(document.body).prepend("<div class='pf-js-body-append-body-bckgrnd'></div>");
				pf$(".pf-js-body-append-body-bckgrnd").fadeto(dms.opacity);
			
			}
		
			
			pf("element").EventScrollResize(function(){
					var body_content=pf$(".pf-js-body-append-body-bckgrnd").getlength();
				if(body_content>0){
				
					var body_dime=pf$("body").getElementDimension();
			
					pf$(".pf-js-body-append-body-bckgrnd").css({"height":body_dime.height+"px"});
				}			
			});
			
		}
		
		
	}
	
	
	function pf_ui_main(dom){
		this.main_dom=dom;
		this.internal_lib=new pf_internal_library(dom);
	}
	
	
	pf_ui_main.prototype.header=function(glb,doms){
		var glb_s=glb||{};
		console.log(doms);
	}
	pf_ui_main.prototype.test=function(glb){
		alert("pf_ui_internal");
	}
	
	pf_ui_main.prototype.slide_box=function(glb){
		var glb_s=glb||{};
		
		var glb_i=_pf.isJSONVariableNotExist({},{header:"",content:"",footer:""});
		var glb_var=_pf.isJSONVariableNotExist(glb_s,{"background_active":true,
													  								"background_event_close":false,
		   					  "opacity":700,
							 "is_header":true,				  							"is_content":true,
													  "is_footer":false,
													  "slide_title":"Untitled",
													  "slide_content":"Untitled",
													  "slide_footer":"",
													  "slide_width":"auto",
													  "slide_height":"auto",
													  "is_position":false,
													  "slide_delay":100,
													  "delay_active":pf("agenttype").checkmobile()
													  });
	pf$(".pf-js-body-append-body-content,.pf-js-body-append-body-bckgrnd").remove();
	this.internal_lib.background_opacity(glb_var);
		var body_content_lenght=pf$(".pf-js-body-append-body-content").getlength();
		pf_ui_core_library.if_variable_exist_func(glb_var.is_header,true,function(){ glb_i.header="<div class='pf-js-body-append-title'><span>"+(glb_var.slide_title)+"</span><span id='pf-dialog-close"+body_content_lenght+"' style='float:right'>X</span></div>" });
		 glb_i.content="<div class='pf-js-body-append-body'>"+glb_var.slide_content+"</div>" 
		pf_ui_core_library.if_variable_exist_func(glb_var.is_footer,true,function(){ glb_i.footer="<div class='pf-js-body-append-footer'>-</div>" });
		
		var scrol_dim=pf("element").ScrollPosition();
		pf$(".pf-js-body-append-body-bckgrnd").before("<div id='pf-js-body-id"+body_content_lenght+"' style='top:"+scrol_dim.top+"px' class='pf-js-body-append-body-content'>"+glb_i.header+""+glb_i.content+""+glb_i.footer+"</div>");
		pf$(".pf-js-body-append-body-content").css({"width":glb_var.slide_width,"height":glb_var.slide_height});
		
	//?	var getElemDim=pf$(".pf-js-body-append-body-content").getElementDimension();
	//?	var elem_scroll_pos=pf("element").ScrollPosition();
	//?	console.log(elem_scroll_pos)
	//?	pf$(".pf-js-body-append-body-content").css({top:(elem_scroll_pos.top-getElemDim.height)+"px"});
	
				
	
		pf$("#pf-dialog-close"+body_content_lenght).on("click,touchstart",function(){
					pf$(".pf-js-body-append-body-content,.pf-js-body-append-body-bckgrnd").remove();
					
				
				pf$("#pf-js-body-id"+body_content_lenght).remove();
				pf_ui_core_library.if_variable_exist_func(pf$(".pf-js-body-append-body-content").getlength(),0,function(){
					pf$(".pf-js-body-append-body-bckgrnd").remove();
			//?		this.internal_lib.background_opacity(glb_var,true);
				});
			});
		
		pf_ui_core_library.if_variable_exist_func(glb_var.background_event_close,true,function(){
			pf$(".pf-js-body-append-body-bckgrnd").click(function(){
				pf$(".pf-js-body-append-body-content,.pf-js-body-append-body-bckgrnd").remove();
			});
			
		});
		var ctt=1;

	}
	
	pf_ui_main.prototype.toggle_display=function(glb){


	}
	pf_ui_main.prototype.pop_label=function(glb){
		var glb_s=glb||{};
//glb_var.pop_width_grip_index
		var glb_var=_pf.isJSONVariableNotExist(glb_s,{"pf_event":"click",
													  "toggle_type":"toggle",
													  "pop_delay":1000,
													  "pop_disable":false,
													  "pop_content":"Untitled",
													  "pop_position_on_top":70,
													  "pop_width_grip_index":2,
													  "pop_delay_active":pf("agenttype").checkmobile()
													  });
		var body_dime=pf$("body").getElementDimension();											  
													  
		pf_ui_core_library.if_variable_exist_func(glb_var.pop_disable,false,function(){
			var get_length=pf$(".pf-js-pop-label").getlength();
			var elem_scroll_pos=pf("element").ScrollPosition();
			var ctt=1;
			var z_ind=99999999;
			pf$(".pf-js-pop-label").each(function(ek,ev){
			
				var elem_dime=pf$(ev[ek]).getElementDimension();
				var elem_attr=pf$(ev[ek]).getcss(['z-index']);
				pf$(ev[ek]).setattr({"pf_pos_top":(((glb_var.pop_position_on_top))-(15*((get_length+2)-ctt))),"pf_pos_ini_top":(((glb_var.pop_position_on_top))-(15*((get_length+2)-ctt)))}).css({"top":(((elem_scroll_pos.top+glb_var.pop_position_on_top))-(15*((get_length+2)-ctt)))+"px","z-index":(parseInt(elem_attr['z-index'])+ctt)+"px"});
				
				ctt++;
			});
			
			var uniq=_pf.getUniq();
			pf$("body").append("<div class='pf-js-pop-label' id='pf_js_pop"+uniq+"'>"+glb_var.pop_content+"</div>");
			var id_elem=pf$("#pf_js_pop"+uniq)
			id_elem.css({left:((((body_dime.width/glb_var.pop_width_grip_index)-parseInt(id_elem.getwidth())/glb_var.pop_width_grip_index)/body_dime.width)*100)+"%",top:(elem_scroll_pos.top+(glb_var.pop_position_on_top+20))+"px","z-index":z_ind+ctt});
			id_elem.setattr({"pf_pos_top":((glb_var.pop_position_on_top+20))});
			id_elem.setattr({"pf_pos_ini_top":((glb_var.pop_position_on_top+20))});
			pf_ui_core_library.element_delay(function(glb){
				
				id_elem.fadein(glb_var.pop_delay*2,function(){
				pf$("#pf_js_pop"+uniq).remove();
				});
				},"timeout",glb_var.pop_delay,glb_var.pop_delay_active);
		});
		
	}
	var bootstrap={
		dom_func:function(d){
			
		
			return bootstrap.external_library(pf$(d).element);
		},
		element_render:function(){
//?			if(pf_ui.disable_dom_scanning==false){ //s
		var body_e=pf_ui_core_library.set_tag_as_review_active(pf$("all:[pf-ui-method]").element);
		
		_pf.each(body_e,function(ek,ev){
		var pf_method=pf$(ev.dom).getattr("pf-ui-method");
			var t=bootstrap.external_library(ev.dom);
			
			if(ev.attr==false){
				if (typeof(t[pf_method])!="undefined") {
				    t[pf_method](pf$(ev.dom).getallattr());
				}
			}
		});
//?	    } //s
		},
		external_library:function(dom){
	
			var ui_main=new pf_ui_main(dom);
			var ui_intrnl=pf_ui.fn;
				
				for (var ink in ui_intrnl){
					
					ui_main[ink]=ui_intrnl[ink];
				}
			
				return ui_main;
			}
	};
	window.pf_ui={};
	window.pf_ui.fn={};
	
	window.pf_ui.disable_dom_scanning=true;
	 window.pf_ui$=function(d){
        return bootstrap["dom_func"](d);
    };
	 
	 pf_core_load(function(){
       bootstrap["element_render"]();
        pf$(document.body).on("mouseover,click,touchstart,touchmove,touchend",function(e){
	    
	    bootstrap["element_render"](); 
	});
        
    });
	
})(window)
