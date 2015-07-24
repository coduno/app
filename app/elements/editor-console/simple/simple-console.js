/**
 * Created by Paul on 7/20/2015.
 */
Polymer({
  is: 'simple-console',
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
    this.selectedConsole = "0";
    this.languageModes = getAceLanguageConfig();

    // TODO(victorbalan): Get these from the server
    this.availableLanguages = [
      createLanguage("Java", "java"),
      createLanguage("Python", "py"),
      createLanguage("C++", "cpp"),
      createLanguage("C", "c"),
      createLanguage("Java UT", "javaut")
    ];

    function createLanguage(name, tag){
      return {name: name, tag: tag};
    }
  },
  runCode: function(){
    this.$.language.disabled = true;
    var lang = this.getSelectedLanguage()
    this.$.ajaxRequest.method='POST';
    this.$.ajaxRequest.body = JSON.stringify({'codeBase': this.getCode(), 'language': lang.tag});
    this.$.ajaxRequest.url = engine_url + '/api/run/start/simple';
    this.$.ajaxRequest.generateRequest();
    this.selectedConsole = "1";
  },
  onResponse: function(request){
    this.$.language.disabled = false;
    this.selectedConsole = "2";
    var runResults = request.detail.response;
    var output = ""
    if(runResults!=undefined){
      output = runResults.err !="" && runResults.err!=undefined ? runResults.err : runResults.run
    }else{
      output = "Bad request"
    }
    this.$.output.textarea.value = output;
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
