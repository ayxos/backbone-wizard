define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<header><div id="progress_indicator"></div><h2 id="step_title"></h2><p id="step_instructions"></p></header><div class="current_step_container"></div><footer><div id="buttons"><button id="prev_step_button" class="btn btn-info">Prev:</button><button id="next_step_button" class="btn btn-info">Next:</button></div></footer>');
}
return buf.join("");
};
});