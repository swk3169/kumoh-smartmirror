import { NewspeedPageModule } from './newspeed-page.module';

describe('NewspeedPageModule', () => {
  let newspeedPageModule: NewspeedPageModule;

  beforeEach(() => {
    newspeedPageModule = new NewspeedPageModule();
  });

  it('should create an instance', () => {
    expect(newspeedPageModule).toBeTruthy();
  });
});
