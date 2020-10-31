import { Selector } from 'testcafe'

fixture`Getting Started`.page`http://127.0.0.1:8080/`

test('My first test', async (t) => {
  const string = 'Roll'
  // Obtain the text of the article header
  await t.expect(Selector('.button-roller').innerText).eql(string)
})
