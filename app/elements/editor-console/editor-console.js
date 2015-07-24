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
    },
    selectedConsole:{
      type: String
    },
    availableLanguages:{
      type: Array,
      notify: true
    },
    runOutput:{
      type: Object,
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
    var NORMAL_RUN = "simple";
    var UNIT_TEST_RUN = "unittest";
    this.selectedConsole = "0";
    this.toSelect = "0";
    this.languageModes = getAceLanguageConfig();
    this.cachedCode = {};

    // TODO(victorbalan): Get these from the server
    this.availableLanguages = [
      createLanguage("Java", "java", NORMAL_RUN),
      createLanguage("Python", "py", NORMAL_RUN),
      createLanguage("C++", "cpp", NORMAL_RUN),
      createLanguage("C", "c", NORMAL_RUN),
      createLanguage("Java UT", "javaut", UNIT_TEST_RUN)
    ];

    function createLanguage(name, tag, type){
      return {name: name, tag: tag, type: type};
    }
  },
  runCode: function(){
    this.$.language.disabled = true;
    var lang = this.getSelectedLanguage()
    this.$.ajaxRequest.method='POST';
    this.$.ajaxRequest.body = JSON.stringify({'codeBase': this.getCode(), 'language': lang.tag});
    this.$.ajaxRequest.url = engine_url + '/api/run/start/' + lang.type;
    this.$.ajaxRequest.generateRequest();
    switch (lang.type){
      case "simple":
        this.toSelect = "1";
        break;
      case "unittest":
        this.toSelect = "2";
        break;
    }
    this.selectedConsole = "3";
  },
  onResponse: function(request){
    this.$.language.disabled = false;
    this.selectedConsole = this.toSelect;
    this.runOutput = request.detail.response;
  },
  getCode: function(){
    return this.editor.getValue();
  },
  getSelectedLanguage: function(){
    if(this.$.language.selectedIndex!=-1){
      return this.availableLanguages[this.$.language.selectedIndex];
    }
  },
  setLanguage: function(){
    if(this.getSelectedLanguage()!=undefined){
      this.setMode(this.languageModes[this.getSelectedLanguage().tag])
    }
  },
  setMode: function(mode){
    this.editor.getSession().setMode({
      path: mode,
      v: Date.now()
    });
  }
});

function getAceLanguageConfig(){
  languageModes = {}
  languageModes["py"]= "ace/mode/python"
  languageModes["java"]= "ace/mode/java"
  languageModes["javaut"]= "ace/mode/java"
  languageModes["cpp"]= "ace/mode/c_cpp"
  languageModes["c"]= "ace/mode/c_cpp"
  return languageModes;
}
