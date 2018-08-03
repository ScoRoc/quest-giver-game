import link from './player.js';

const ul = $('#quests-div ul');

const lq = link.quests;

let showQuests = () => {
  ul.empty();
  if (lq.length === 0) {
    ul.text('no current quests');
  } else {
    ul.text('');
  }
  let quests = lq.forEach(quest => {
    let li = $('<li></li>').text(quest);
    li.click(() => {
      lq.splice(lq.indexOf(quest), 1);
      ul.empty();
      showQuests();
    });
    ul.append(li);
  });
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
        $('#quests-div ul li').show();
        showHideQuests.flip();
      } else {
        $('#quests-div button').text('Show');
        ul.text('quests hidden');
        $('#quests-div ul li').hide();
        showHideQuests.flip();
      }
    }
  }
};

let showHideQuests = showHideQuestsFunc();

export { showHideQuests, showQuests };
