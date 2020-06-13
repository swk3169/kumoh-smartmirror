import { NewspeedNavModule } from './newspeed-nav.module';

describe('NewspeedNavModule', () => {
  let newspeedNavModule: NewspeedNavModule;

  beforeEach(() => {
    newspeedNavModule = new NewspeedNavModule();
  });

  it('should create an instance', () => {
    expect(newspeedNavModule).toBeTruthy();
  });
});
