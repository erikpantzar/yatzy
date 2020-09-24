import { Selector } from 'testcafe';

fixture `Getting Started`
    .page `http://epantzar.se/yatzy-caddee/`;

test('My first test', async t => {  
      const string = 'Roll'
      // Obtain the text of the article header
      await t.expect(Selector('.button-roller').innerText).eql(string);
});