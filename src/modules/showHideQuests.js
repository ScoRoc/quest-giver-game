import player1 from './Player.js';
import { questGiverInstance } from '../app.js';
import KillQuest from './npc/quests/KillQuest.js';

const ul = $('#quests-div ul');

let showQuests = () => {
  const lq = player1.quests;
  if (lq.length === 0) {
    ul.text('no current quests');
  } else {
    ul.text('');
    lq.forEach(quest => {
      let li = $('<li></li>').text(quest.text);
      if (quest.kills < quest.killsToComplete) {
        let sub = $(`<ul>
                      <li>Progress</li>
                      <li>${quest.kills}/${quest.killsToComplete}</li>
                    </ul>`);
        li.append(sub);
      } else {
        li.append($('<li>COMPLETED</li>'))
      }
      li.click(() => {
        // placeholder quest stuff...clean up later
        lq.splice(lq.indexOf(quest), 1);
        ul.empty();
        questGiverInstance.availableQuests.push(new KillQuest());
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
        $('.quests-div p').text('Click to abandon quests');
        showQuests();
        showHideQuests.flip();
      } else {
        $('#quests-div button').text('Show');
        $('.quests-div p').text('');
        ul.text('quests hidden');
        showHideQuests.flip();
      }
    }
  }
};

let showHideQuests = showHideQuestsFunc();

export { showHideQuests, showQuests };
