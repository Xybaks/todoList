(this.webpackJsonptodoList=this.webpackJsonptodoList||[]).push([[0],{63:function(e,t,a){e.exports=a(75)},73:function(e,t,a){},74:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),c=a(7),r=a.n(c),l=a(25),o=a(41),s=a(13),d=a(117),u={};var m=a(31),f=[];var T=Object(m.b)({tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TASK":var a=Object(s.a)({},e);return a[t.todoListId]=a[t.todoListId].filter((function(e){return e.id!==t.taskId})),a;case"ADD-TASK":var n=Object(s.a)({},e);return n[t.todoListId]=[{id:Object(d.a)(),title:t.title,isDone:!1}].concat(Object(o.a)(n[t.todoListId])),n;case"CHANGE-TASK-STATUS":return Object(s.a)({},e,Object(l.a)({},t.todoListId,e[t.todoListId].map((function(e){return e.id===t.taskId?Object(s.a)({},e,{isDone:t.isDone}):e}))));case"CHANGE-TASK-TITLE":return Object(s.a)({},e,Object(l.a)({},t.todoListId,e[t.todoListId].map((function(e){return e.id===t.taskId?Object(s.a)({},e,{title:t.title}):e}))));case"ADD-TODOLIST":return Object(s.a)({},e,Object(l.a)({},t.todoListId,[]));case"REMOVE-TODOLIST":var i=Object(s.a)({},e);return delete i[t.id],i;default:return e}},todoLists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:f,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE-TODOLIST":return e.filter((function(e){return e.id!==t.id}));case"ADD-TODOLIST":var a={id:t.todoListId,title:t.title,filter:"all"};return[a].concat(Object(o.a)(e));case"CHANGE-TODOLIST-TITLE":var n=e.map((function(e){return e.id===t.id?Object(s.a)({},e,{title:t.title}):e}));return n;case"CHANGE-TODOLIST-FILTER":return e.map((function(e){return e.id===t.id?Object(s.a)({},e,{filter:t.filter}):e}));default:return e}}}),b=Object(m.c)(T);window.store=b;var O=a(28);a(73),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(74);var k=a(53),E=a(29),p=a(115),v=a(105),g=a(106),L=i.a.memo((function(e){console.log("AddItemForm was called");var t=Object(n.useState)(""),a=Object(E.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(null),o=Object(E.a)(l,2),s=o[0],d=o[1],u=function(){var t=c.trim();t?e.addItem(t):d("Title is required "),r("")};return i.a.createElement("div",null,i.a.createElement(p.a,{variant:"outlined",value:c,onChange:function(e){r(e.currentTarget.value),d(null)},onKeyPress:function(e){null!==s&&d(null),"Enter"===e.key&&u()},error:!!s,helperText:s,label:"Title"}),i.a.createElement(v.a,{color:"primary",onClick:u},i.a.createElement(g.a,null)," "))}));function j(e){var t=Object(n.useState)(!1),a=Object(E.a)(t,2),c=a[0],r=a[1],l=Object(n.useState)(e.title),o=Object(E.a)(l,2),s=o[0],d=o[1];return c?i.a.createElement(p.a,{onBlur:function(){r(!1),s.trim()&&e.changeTitle(s)},autoFocus:!0,value:s,onChange:function(e){return d(e.currentTarget.value)}}):i.a.createElement("span",{onDoubleClick:function(){return r(!0)}}," ",s)}var I=a(108),h=a(107),y=a(116),D=i.a.memo((function(e){return i.a.createElement("li",{className:e.task.isDone?"is-done":""},i.a.createElement(y.a,{onChange:function(t){e.changeTaskStatus(e.task.id,t.currentTarget.checked,e.todoListId)},checked:e.task.isDone}),i.a.createElement(j,{title:e.task.title,changeTitle:function(t){e.changeTaskTitle(e.task.id,t,e.todoListId)}}),i.a.createElement(v.a,{size:"small",onClick:function(){e.removeTask(e.task.id,e.todoListId)}},i.a.createElement(h.a,{color:"primary"})))})),C=i.a.memo((function(e){var t=e.addTask,a=e.id,c=e.title,r=e.changeFilter,l=e.removeDodoList,o=e.changeDodoListTitle,s=Object(k.a)(e,["addTask","id","title","changeFilter","removeDodoList","changeDodoListTitle"]);console.log("TodoList was rendered");var d=Object(n.useCallback)((function(){r("all",a)}),[r,a]),u=Object(n.useCallback)((function(){r("active",a)}),[r,a]),m=Object(n.useCallback)((function(){r("completed",a)}),[r,a]),f=Object(n.useCallback)((function(){l(a)}),[l,a]),T=Object(n.useCallback)((function(e){t(e,a)}),[t,a]),b=Object(n.useCallback)((function(e){o(e,a)}),[o,a]),O=s.tasks;return"active"===s.filter&&(O=s.tasks.filter((function(e){return!e.isDone}))),"completed"===s.filter&&(O=s.tasks.filter((function(e){return e.isDone}))),i.a.createElement("div",null,i.a.createElement("h3",{style:{textAlign:"center"}},i.a.createElement(j,{title:c,changeTitle:b}),i.a.createElement(v.a,{size:"small",onClick:f},i.a.createElement(h.a,{color:"secondary"}))),i.a.createElement(L,{addItem:T}),i.a.createElement("div",{style:{marginTop:"10px"}},i.a.createElement(I.a,{style:{margin:"3px"},size:"small",variant:"all"===s.filter?"contained":"outlined",color:"all"===s.filter?"secondary":"primary",onClick:d},"All"),i.a.createElement(I.a,{style:{margin:"3px"},size:"small",variant:"active"===s.filter?"contained":"outlined",color:"active"===s.filter?"secondary":"primary",onClick:u},"Active"),i.a.createElement(I.a,{style:{margin:"3px"},size:"small",variant:"completed"===s.filter?"contained":"outlined",color:"completed"===s.filter?"secondary":"primary",onClick:m},"Completed")),i.a.createElement("ul",{style:{listStyle:"none",padding:"0"}},O.map((function(e){return i.a.createElement(D,{key:e.id,changeTaskTitle:s.changeTaskTitle,changeTaskStatus:s.changeTaskStatus,removeTask:s.removeTask,todoListId:a,task:e})}))))})),S=a(109),A=a(110),w=a(112),x=a(113),N=a(114),K=a(76),R=a(111);var G=function(){var e=Object(O.c)((function(e){return e.todoLists})),t=Object(O.c)((function(e){return e.tasks})),a=Object(O.b)(),c=Object(n.useCallback)((function(e){a(function(e){return{type:"ADD-TODOLIST",title:e,todoListId:Object(d.a)()}}(e))}),[a]),r=Object(n.useCallback)((function(e){a({type:"REMOVE-TODOLIST",id:e})}),[a]),l=Object(n.useCallback)((function(e,t){a({type:"CHANGE-TODOLIST-TITLE",id:e,title:t})}),[a]),o=Object(n.useCallback)((function(e,t){a({type:"REMOVE-TASK",taskId:e,todoListId:t})}),[a]),s=Object(n.useCallback)((function(e,t){a({type:"CHANGE-TODOLIST-FILTER",id:t,filter:e})}),[a]),u=Object(n.useCallback)((function(e,t){a(function(e,t){return{type:"ADD-TASK",title:e,todoListId:t}}(e,t))}),[a]),m=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-STATUS",todoListId:e,taskId:t,isDone:a}}(n,e,t))}),[a]),f=Object(n.useCallback)((function(e,t,n){a(function(e,t,a){return{type:"CHANGE-TASK-TITLE",todoListId:e,taskId:t,title:a}}(n,e,t))}),[a]);return i.a.createElement("div",{className:"App"},i.a.createElement(S.a,{position:"static"},i.a.createElement(A.a,{style:{display:"flex",justifyContent:"space-between"}},i.a.createElement(v.a,{edge:"start",color:"inherit","aria-label":"menu"},i.a.createElement(R.a,null)),i.a.createElement("div",{style:{display:"flex"}},i.a.createElement(w.a,{variant:"h6",style:{margin:"20px"}},"News"),i.a.createElement(w.a,{variant:"h6",style:{margin:"20px"}},"About")),i.a.createElement(I.a,{color:"inherit"},"Login"))),i.a.createElement(x.a,{fixed:!0},i.a.createElement(N.a,{container:!0,style:{padding:"10px",background:"greenyellow",borderRadius:"10px"}},i.a.createElement(L,{addItem:c})),i.a.createElement(N.a,{container:!0,spacing:3},e.map((function(e){return i.a.createElement(N.a,{item:!0,key:e.id},i.a.createElement(K.a,{elevation:10,style:{margin:"10px",padding:"30px",background:"lightskyblue",borderRadius:"10px"}},i.a.createElement(C,{id:e.id,title:e.title,filter:e.filter,tasks:t[e.id],addTask:u,removeTask:o,changeFilter:s,changeTaskStatus:m,removeDodoList:r,changeTaskTitle:f,changeDodoListTitle:l})))})))))};r.a.render(i.a.createElement(O.a,{store:b},i.a.createElement(G,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[63,1,2]]]);
//# sourceMappingURL=main.bf3cdd83.chunk.js.map