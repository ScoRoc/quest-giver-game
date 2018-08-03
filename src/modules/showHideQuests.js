import link from './player.js';

const ul = $('#quests-div ul');

let showQuests = () => {
  const lq = link.quests;
  if (lq.length === 0) {
    ul.text('no current quests');
  } else {
    ul.text('');
    lq.forEach(quest => {
      let li = $('<li></li>').text(quest);
      li.click(() => {
        lq.splice(lq.indexOf(quest), 1);
        ul.empty();
        showQuests();
      });
      ul.append(li);
    });
  }
};

let showHideQuestsFunc = () => {
  let showing = false;
  return {
    showing: () => showing,
    flip: () => showing = !showing,
    showHide: () => {
      if (!showHideQuests.showing()) {
        $('#quests-div button').text('Hide');
        showQuests();
        showHideQuests.flip();
      } else {
        $('#quests-div button').text('Show');
        ul.text('quests hidden');
        showHideQuests.flip();
      }
    }
  }
};

let showHideQuests = showHideQuestsFunc();

export { showHideQuests, showQuests };
