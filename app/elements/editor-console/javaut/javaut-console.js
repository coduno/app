Polymer({
  is: 'javaut-console',
  properties:{
    editor: {
      type: Object,
      reflectToAttribute: true,
      notify: true
    },
    selectedConsole:{
      type: String
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
    this.initMode();
  },
  ready: function(){
    this.selectedConsole = "0";
  },
  runCode: function(){
    this.$.ajaxRequest.method='POST';
    this.$.ajaxRequest.body = JSON.stringify({'codeBase': this.getCode(), 'language': 'javaut'});
    this.$.ajaxRequest.url = engine_url + '/api/run/start/unittest';
    this.$.ajaxRequest.generateRequest();
    this.selectedConsole = "1";
  },
  onResponse: function(request){
    this.selectedConsole = "2";
    this.runOutput = request.detail.response;
  },
  getCode: function(){
    return this.editor.getValue();
  },
  initMode: function(){
    this.editor.getSession().setMode({
      path: "ace/mode/java",
      v: Date.now()
    });
  }
});
