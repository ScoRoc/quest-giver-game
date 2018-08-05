class KillQuest {
  constructor() {
    this.text = 'Kill 2 enemies';
    this.completed = false;
    this.kills = 0;
    this.killsToComplete = 2;
    this.xp = 15;
  }

  finished() {
    this.completed = true;
    this.text = 'Completed';
  }
};

export default KillQuest;
