import { NewspeedAModule } from './newspeed-a.module';

describe('NewspeedAModule', () => {
  let newspeedAModule: NewspeedAModule;

  beforeEach(() => {
    newspeedAModule = new NewspeedAModule();
  });

  it('should create an instance', () => {
    expect(newspeedAModule).toBeTruthy();
  });
});
