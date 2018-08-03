import link from './player.js';

let showHideQuestsFunc = () => {
  let show = true;
  return () => {
    if (show) {
      let lq = link.quests;
      let quests = lq.forEach(quest => {
        let li = $('<li></li>').text(quest);
        li.click(() => {
          lq.splice(lq.indexOf(quest), 1)
        })
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
