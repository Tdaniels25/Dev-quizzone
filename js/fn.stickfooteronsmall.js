SEMICOLON.Core.getVars.fn.stickfooteronsmall=e=>{var t=SEMICOLON.Core;if((e=t.getSelector(e,!1)).length<1)return!0;t.getVars.elFooter.style.marginTop="";var e=t.viewport().height,r=t.getVars.elWrapper.offsetHeight;!t.getVars.elBody.classList.contains("sticky-footer")&&"undefined"!==t.getVars.elFooter&&t.getVars.elWrapper.contains(t.getVars.elFooter)&&r<e&&(t.getVars.elFooter.style.marginTop=e-r+"px"),t.getVars.resizers.stickfooter=()=>SEMICOLON.Base.stickFooterOnSmall()};