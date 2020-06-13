import { NewspeedModule } from './newspeed.module';

describe('NewspeedModule', () => {
  let newspeedModule: NewspeedModule;

  beforeEach(() => {
    newspeedModule = new NewspeedModule();
  });

  it('should create an instance', () => {
    expect(newspeedModule).toBeTruthy();
  });
});
