import link from './player.js';

let showHideQuestsFunc = () => {
  let show = true;
  return () => {
    if (show) {
      let quests = link.quests.forEach(quest => {
        let li = $('<li></li>').text(quest);
        $('#quests-div ul').append(li);
      });
      show = !show;
    } else {
      $('#quests-div ul').empty();
      show = !show;
    }
  };
};

let showHideQuests = showHideQuestsFunc();

export default showHideQuests;
