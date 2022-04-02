
import { settings } from './defaultSettings.js'

class CheckButtons {
  constructor(group, names) {
    this.group = group;
    let e = "<input type='checkbox' onClick='menu.update([nameId]);' id='[name]' name='[group]'><p id='checkTxt'>[name]</p></input>";
    var all_elements = '';
    names.forEach((n) => {
      name = n;
      n = e.replaceAll("[name]", name);
      n = n.replace("[nameId]", '"' + name + '"');
      n = n.replace("[group]", group);
      all_elements = all_elements + n;
    });

    this.e = "<div id='rbox'><h2>[group]</h2><div id='rboxcontent' group='[group]'>[field]</div></div>".replace('[field]', all_elements).replaceAll('[group]', group);
    this.name = name;
  }
  state() {
    let buttons = document.getElementsByName(this.group);
    let states = [];
    buttons.forEach((i) => {
      if (i.checked) {
        states.push(i.id);
      }
    });
    return [this.group, states];
  }
  toggle() {
    let node =  document.getElementById(this.name);
    console.log(node.value);
    if (node.value === 'on') {
      node.value = 'off';
    } else {
      node.value = 'on';
    }
  }
}

class RadioButtons {
  constructor(group, names) {
    let e = "<div id='radiocont'><input type='radio' onChange='menu.update([nameId]);' id='[name]' name='[group]'checked /><label for='[name]'>[name]</label></div>";
    var all_elements = '';
    let first = true;
    names.forEach((n) => {
      name = n;
      n = e.replaceAll("[name]", name);
      n = n.replace("[nameId]", '"' + name + '"');
      n = n.replace("[group]", group);
      all_elements = all_elements + n;
    });

    this.e = "<div id='rbox'><h2>[group]</h2><div id='rboxcontent'><fieldset>[field]</field></div>".replace('[field]', all_elements).replace('[group]', group);
    this.group = group;
    this.names = names;
    this.name = name;
    this.t = 'check';
  }
  state() {
    let buttons = document.getElementsByName(this.group);
    let state = {};
    buttons.forEach((i) => {
      if (i.checked) {
        state = i.id;
      }
    });
    return [this.group, state];
  }
}

class UserMenu {
  constructor(container) {

    this.node = document.getElementById(container);
    var elements = []
    Object.keys(settings).forEach(function(key) {
      let t = Object.keys(settings[key])[0].toString();
      let o;
      if (t === 'radio') {
        o = new RadioButtons(key, settings[key][t]);
      } else {
        o = new CheckButtons(key, settings[key][t]);
      }
      elements.push(o);
    });
    this.elements = elements.reverse();
    this.elements.forEach((i) => {
      this.node.insertAdjacentHTML('afterBegin', i.e);
    });
    this.node.insertAdjacentHTML('afterBegin', '<h1>Pandemic Simulator</h1>')
  } getSettings() {
    let settings = []
    this.elements.forEach((e) => {
      let s = e.state();
      settings.push(s);
    });
    // test the settings!
    console.log('User Settings');
    console.log('-----------');
    console.log(settings);
    return settings;
  }
}

var menu = new UserMenu('userMenu');
menu.getSettings();
