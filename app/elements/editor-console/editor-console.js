/**
 * Created by Paul on 7/20/2015.
 */
Polymer({
  is: 'editor-console',
  properties:{
    editor: {
      type: Object,
      reflectToAttribute: true,
      notify: true
    }
  },
  observers: [
    'afterPropertiesSet(editor)'
  ],
  afterPropertiesSet: function(){
    this.setLanguage();
  },
  ready: function(){
    this.$.console.textarea.value = 'Console';
//       setTimeout(this.setLanguage(), 1);
  },
  runCode: function(){
    this.$.ajaxRequest.method='POST';
    this.$.ajaxRequest.body = JSON.stringify({'code': this.getCode(), 'language': this.getSelectedLanguage()});
    this.$.ajaxRequest.url='http://localhost:8080/testRoute';
    this.$.ajaxRequest.generateRequest();
  },
  onResponse: function(request){
    console.log(request.detail.response);
    //TODO: dont forget to actually update this when i get a real response
    this.$.console.textarea.value = request.detail.response.code;
  },
  getCode: function(){
    return this.editor.getValue();
  },
  getSelectedLanguage: function(){
    return this.$.language.options[this.$.language.selectedIndex].value;
  },
  setLanguage: function(){
    console.log('Setting language to ' + this.getSelectedLanguage());
    switch(this.getSelectedLanguage()){
      case 'python2.7':
        this.setMode('ace/mode/python');
        this.setDefaultCodeTemplate();
        break;
      case 'python3.4':
        this.setMode('ace/mode/python');
        this.setDefaultCodeTemplate();
        break;
      case 'java':
        this.setMode('ace/mode/java');
        this.setDefaultCodeTemplate();
        break;
      case 'cpp':
        this.setMode('ace/mode/c_cpp');
        this.setDefaultCodeTemplate();
        break;
      case 'javascript':
        this.setMode('ace/mode/javascript');
        this.setDefaultCodeTemplate();
        break;
    }
  },
  setMode: function(mode){
    this.editor.getSession().setMode({
      path: mode,
      v: Date.now()
    });
  },
  setDefaultCodeTemplate: function(template){
    //the code template will always come from the server
      this.editor.setValue('printf(\'Hi\')');
  }
});


