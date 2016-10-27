define(['jade'], function(jade){
  return function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="container"><section id="typeahead"><div class="page-header"><h1>Wizard for Backbone<small style="margin:1%;">backbone-wizard.js</small></h1></div><div class="row"><h2>Live demo</h2><div style="margin-bottom: 4%; border: solid 1px rgb(219, 219, 219); padding:3%;" class="col-md-12"><div id="wizardContainer"></div></div><div class="col-md-3"><h3>Based on</h3><p>Based on malandrew\'s gist: </p><a href="https://gist.github.com/malandrew/1112194">https://gist.github.com/malandrew/1112194</a><h3>Author</h3><p>Marco Antonio Pajares</p><a href="http://ayxos.com/backbone-wizard/">http://ayxos.com/</a><br/><a href="https://github.com/cybermarkus1/backbone-wizard">github code</a><h3>About</h3><p>Create a custom backbone-wizard.</p><ul><li>must be used as a requireJS component.</li><li>if you want to use tree, d3 lib is needed.</li></ul><p><a href="public/js/common/backbone-wizard.js" target="_blank" class="btn btn-primary">backbone-wizard.js</a></p><p><a href="public/backbone-wizard.min.js" target="_blank" class="btn btn-primary">backbone-wizard.min.js</a></p><h3>Change log</h3><dl><dt>v@1.4.1</dt><dt>27/08/2014</dt><dd>Add tree actions (Drag, move, click and hover).</dd></dl><dl><dt>v@1.4.0</dt><dt>20/08/2014</dt><dd>Add tree feature.</dd></dl><dl><dt>v@1.3.0</dt><dt>13/08/2014</dt><dd>Add css code, rename lib.</dd></dl><dl><dt>v@1.2.0</dt><dt>09/08/2014</dt><dd>Fixed bower path, uglify js in a single file.</dd></dl></div><div class="col-md-9"><hr/><h2>New Tree Feature, new tree actions! Drag, move, click and hover</h2><p>if you dont set tree, by default is set to false</p><pre class="prettyprint linenums">window.wizard = new Backbone_wizard({\n  el: self.$el.find(\'#wizardContainer\'),\n  steps: WizardSteps,\n  tree:{\n    render: true,\n    // could be rect || circle, circle buy default if its not defined.\n    shape:\'circle\'\n  }\n});\n</pre><hr/><h2>RequireJs Config file</h2><pre class="prettyprint linenums">...\n\nd3          : \'path/to/d3/lib\'\n\n...\n\nshim: {\n    \'path/to/backbone-wizard/lib\':{\n      deps:[\'underscore\', \'backbone\', \'d3\']\n    }\n}\n\n...\n</pre><hr/><h2>Backbone View code</h2><pre class="prettyprint linenums">var Backbone_wizard = require(\'common/wizard/views/backbone-wizard\')\n//Steps\nvar WizardSteps = [\n    { view: require(\'apps/WizardExample/steps/init/view\'), title:\'init\', intro:\'init slide\'}\n, { view: require(\'apps/WizardExample/steps/process/view\'), title:\'process\', intro:\'process slide\'}\n  , { view: require(\'apps/WizardExample/steps/random/view\'), title:\'choose\', intro:\'choose slide\'}\n  , { view: require(\'apps/WizardExample/steps/finish/view\'), title:\'finish\', intro:\'finish slide\'}\n  \n]\n\nreturn Backbone.View.extend({\n\n  render:function () {\n    console.log(\'rendering....\' );\n    var self = this;\n    $(this.el).html(this.template() );\n    \n    window.wizard = new Backbone_wizard({\n      el: self.$el.find(\'#wizardContainer\'),\n      steps: WizardSteps,\n      tree:{\n        render: true,\n        // could be rect || circle, circle buy default if its not defined.\n        shape:\'circle\'\n      }\n    });\n    \n    return this;\n  }\n  \n});</pre><hr/><h2>Tree style code</h2><a href="http://tutorials.jenkov.com/svg/svg-and-css.html">Style SVG</a><hr/><h2>Style Css code</h2><pre class="prettyprint linenums">#wizard{\n  padding: 2%;\n  label{\n    padding: 1% 2%;\n    \n    title{\n      display:block;\n    }\n    span{\n      border-radius: 50%;\n      width: 20px;\n      height: 20px;\n      background-color: rgb(140, 219, 140);\n      margin: auto auto;\n      display: block;\n      text-align: center;\n    }\n    &amp;:hover{\n      background: #5bc0de;\n      border-radius:10px;\n    }\n  }\n  \n  button{\n    margin: 1%;\n  }\n  \n  #buttons{\n    float:right;\n    margin-right: 4%;\n    min-width: 300px;\n  }\n  \n  button#showTree {\n    margin-top: 100px;\n  }\n  \n  #tree{\n    background: gainsboro;\n    width: 90%;\n    margin: auto auto;\n    border: solid 1px;\n    margin: 4%;\n    .node circle {\n      fill: #fff;\n      stroke: steelblue;\n      stroke-width: 3px;\n    }\n    \n    .node text { font: 12px sans-serif; }\n    \n    .link {\n      fill: none;\n      stroke: #ccc;\n      stroke-width: 2px;\n    }\n  }\n}\n</pre><hr/><h2>Get backbone-wizard.js</h2><p>Get the backbone-wizard via bower:</p><pre class="prettyprint linenums">bower install backbone-wizard\n</pre><h3>Options</h3><table class="table table-bordered table-striped"><thead><tr><th style="width: 100px;">Name</th><th style="width: 50px;">type</th><th style="width: 100px;">example</th><th>description</th></tr></thead><tbody><tr><td>el</td><td>div</td><td>\'this.$el.find(#div-name-to-print-wizard)\'</td><td>div to render wizard.</td></tr><tr><td>steps</td><td>array</td><td>[{view:view;title:\'title\';intro:\'intro\'}]</td><td>array with slides views</td></tr><tr><td>steps.view</td><td>path</td><td>\'apps/WizardExample/steps/init/view\'</td><td>set the slide view path.</td></tr><tr><td>steps.title</td><td>string</td><td>\'firs step title\'</td><td>set a slide title</td></tr><tr><td>steps.intro</td><td>string</td><td>\'intro first step\'</td><td>set a slide intro</td></tr><tr><td>tree.render</td><td>boolean</td><td>false</td><td>set if create a tree or not</td></tr><tr><td>tree.shape</td><td>String</td><td>\'circle\'</td><td>set if show nodes as circles or as rectangles</td></tr></tbody></table><h3>Markup</h3><p>Format a component.</p><pre class="prettyprint linenums">&lt;div id=&quot;wizardContainer&quot;&gt;&lt;/div&gt;\n</pre><h3>Methods</h3><h4>.addStep(step)</h4><pre class="prettyprint linenums">.addStep({\n  view: require(\'apps/WizardExample/steps/summary/view\'),\n  title:\'B option\',\n  intro:\'you choose option B\'\n})</pre><p>add a step.</p><h3>License</h3><h4>MIT LICENSE</h4><p>The MIT License (MIT)</p><pre class="prettyprint linenums">Copyright (c) 2014 marco\n\nPermission is hereby granted, free of charge, to any person obtaining a copy\nof this software and associated documentation files (the &quot;Software&quot;), to deal\nin the Software without restriction, including without limitation the rights\nto use, copy, modify, merge, publish, distribute, sublicense, and/or sell\ncopies of the Software, and to permit persons to whom the Software is\nfurnished to do so, subject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,\nFITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER\nLIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,\nOUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE\nSOFTWARE.</pre></div></div></section></div>');
}
return buf.join("");
};
});