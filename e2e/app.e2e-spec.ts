import { CarrotPanelPage } from './app.po';

describe('carrot-panel App', () => {
  let page: CarrotPanelPage;

  beforeEach(() => {
    page = new CarrotPanelPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
