import { NewspeedBModule } from './newspeed-b.module';

describe('NewspeedBModule', () => {
  let newspeedBModule: NewspeedBModule;

  beforeEach(() => {
    newspeedBModule = new NewspeedBModule();
  });

  it('should create an instance', () => {
    expect(newspeedBModule).toBeTruthy();
  });
});
