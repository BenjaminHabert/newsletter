angular
  .module('app')
  .component('app', {
    templateUrl: 'app/hello.html',
    controller: helloController
  });

function helloController() {
  this.hello = 'Coucou le monde!';
  var unObjet = {
    title: 'Je suis un titre',
    text: 'Ce texte pourrait être plus long. Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.Ce texte pourrait être plus long.',
    date: '2017-03-24',
    infos: "pas d'infos pour le moment"
  };
  this.news = [];
  for (var i = 0; i < 20; i++) {
    var newObject = angular.copy(unObjet);
    newObject.title += " " + i;
    this.news.push(newObject);
  }
}
