// Get your Search from AddSearch.com - Copyright AddSearch Ltd. All rights reserved.
var addsearch_custdata = {"active":"1","key":"ebc194c06f94d3874adcb3ae820c94e1","script_version":"v2","custom_css_version":"4","field_css":"font-size: 16px; cursor: wait; background-color: #fff; background-image: url( //addsearch.com/logo/AAAAAA-20.png ); background-repeat: no-repeat; background-position: 95% 50%;","cache_purge":"196","search_shard":"s7"};
var AddSearchAsync={i:function(){if(addsearch_custdata&&addsearch_custdata.active&&addsearch_custdata.active!="1")return;var ex=false;var els=document.getElementsByTagName("input");if(els&&els.length>0)for(var i=0;i<els.length;i++){var cn=els[i].className.toLowerCase();if(cn=="addsearch"||cn.match(" addsearch$")||cn.match("^addsearch ")||cn.match(" addsearch ")){ex=true;els[i].setAttribute("data-addsearch-field","true")}}var css="font-size: 16px; cursor: wait; background-color: #fff; background-image: url( //addsearch.com/logo/AAAAAA-20.png ); background-repeat: no-repeat; background-position: 95% 50%;";
if(addsearch_custdata.field_css!="")css=addsearch_custdata.field_css;if(!ex)document.write('<input type="text" value="" style="'+css+'" disabled="disabled" class="addsearch addsearch-written" data-addsearch-field="true" />');var s=document.createElement("script");s.type="text/javascript";s.async=true;var p="";var v=addsearch_custdata.script_version;var hash=window.location.hash;if(hash&&hash.indexOf("addsearch_script=")!=-1){v=hash.substring(hash.indexOf("addsearch_script=")+
17);p="&skipCache=true"}s.src="https://addsearch.com/searchui/"+v+"/?key="+addsearch_custdata.key+"&i="+document.referrer+p;document.body.appendChild(s)}};AddSearchAsync.i();