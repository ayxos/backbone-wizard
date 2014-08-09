Backbone-wizard
===================

A tool for create dinamic Wizards using Backbone

Based on malandrew's gist: https://gist.github.com/malandrew/1112194

using:
- bower (to get deps)
- Grunt (generate index.html/Css files and jade-js converter)
- require
- jade (as template engine)
- jquery
- Backbone
- window.wizard (in order to get a singleton reference to add/remove slides dynamically)

![ScreenShot](http://oi61.tinypic.com/122nepx.jpg)



On your View just list your steps views in an array and create a Wizard using this array.

```
  var Wizard = require('common/wizard/views/wizardBaseView');
  
  //Steps
  var WizardSteps = [
      { view: require('apps/Wizard/steps/finish/view'), title:'finish', intro:'lolo'}
    , { view: require('apps/Wizard/steps/init/view'), title:'init', intro:'jojo'}
    , { view: require('apps/Wizard/steps/process/view'), title:'process', intro:'baba'}
    , { view: require('apps/Wizard/steps/random/view'), title:'choose', intro:'wiii'}
  ];
  
  .
  .
  .
  
  window.wizard = new Wizard({
    el: self.$el.find('#wizard'),
    steps: WizardSteps
  });
  
  
```

If you need to create dynamic wizard using Json just go to the step view and run the following code:

```
  var g = {
    view: require('apps/Wizard/steps/summary/view'),
    title:'3g',
    intro:'3ggg'
  };

  .
  .
  .
  window.wizard.addStep(g);
```

